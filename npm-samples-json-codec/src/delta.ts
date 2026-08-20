import { JsonCodecError, type JsonCodecErrorCode } from './errors.js';
import {
	COLLECTION_KEYS,
	DEFAULT_COLLECTION_KEY,
	PRIMITIVE_LISTS,
	REQUIRED_FIELDS,
	ROOT_REQUIRED_FIELDS,
	STRUCT_FIELDS,
	VALUE_LISTS,
} from './layout.js';

/**
 * The whole codec: one `diff`, one `merge`, and the promise that they are exact
 * inverses.
 *
 * Both are pure — all the state lives in the caller (one `previous` object per
 * stream), which is why the encoder and the decoder are each about forty lines
 * and why their states cannot drift apart in a way this file could hide.
 *
 * ## The format
 *
 * A delta is a `ClientSample` with the unchanged parts left out. Nothing is
 * renamed, tagged or wrapped, so a delta is readable on its own:
 *
 * ```json
 * {
 *   "timestamp": 1756000001000,
 *   "clientId": "client-42",
 *   "peerConnections": [
 *     { "peerConnectionId": "pc-01",
 *       "inboundRtps": [ { "ssrc": 1234567890, "bytesReceived": 81234, "jitter": 0.011 } ] }
 *   ]
 * }
 * ```
 *
 * Three rules give it its shape:
 *
 * 1. **A field that did not change is omitted**, and the decoder keeps the
 *    value it already had. There is deliberately no way to say "this field is
 *    gone" — same as the protobuf codec, and the sample schema never needs one.
 * 2. **A collection lists every entry the sample has**, each carrying at least
 *    its key. Presence is the membership signal: an entry that stops appearing
 *    has left the call, so a collection cannot be omitted just because none of
 *    its entries changed.
 * 3. **`clientId` is always sent**, so a receiver can attribute a message
 *    without routing state of its own.
 */

export type JsonRecord = Record<string, unknown>;

export interface DeltaContext {
	/** Which error code a missing required field raises. */
	readonly missingFieldCode: JsonCodecErrorCode;
	/** Message for a missing required field. */
	readonly missingFieldMessage: (field: string) => string;
}

const NO_PINNED_FIELDS: ReadonlySet<string> = new Set();

/**
 * The subset of `next` that differs from `previous`, ready to serialise.
 *
 * `pinned` fields are emitted even when unchanged — always a collection's key,
 * or `clientId` at the root.
 */
export function diffRecord(
	previous: JsonRecord | undefined,
	next: JsonRecord,
	path: string,
	pinned: ReadonlySet<string> = NO_PINNED_FIELDS,
): JsonRecord {
	const delta: JsonRecord = {};

	for (const field of Object.keys(next)) {
		const value = next[field];
		if (value === undefined || value === null) continue;

		const fieldPath = `${path}.${field}`;
		const before = previous?.[field];

		if (Array.isArray(value)) {
			const entries = diffList(before, value, field, fieldPath);
			if (entries) delta[field] = entries;
			continue;
		}

		if (STRUCT_FIELDS.has(field)) {
			const nested = diffRecord(asRecord(before), value as JsonRecord, fieldPath);
			// An unchanged sub-object is simply left out.
			if (Object.keys(nested).length > 0) delta[field] = nested;
			continue;
		}

		if (typeof value === 'object') {
			// Opaque caller data — `attachments`. Compared by value, so an object
			// rebuilt with equal content every tick costs nothing, and one mutated
			// in place is still noticed.
			if (!jsonEqual(before, value)) delta[field] = cloneJson(value);
			continue;
		}

		if (typeof value === 'number' && !Number.isFinite(value)) {
			// `JSON.stringify` turns these into `null` without complaint, which
			// would silently corrupt the stream.
			throw new JsonCodecError('INVALID_VALUE', 'Expected a finite number', {
				path: fieldPath,
				received: value,
			});
		}

		if (pinned.has(field) || before !== value) delta[field] = value;
	}

	return delta;
}

/**
 * Every entry of `next`, each reduced to what changed plus its key.
 *
 * Returns `undefined` for an absent or empty collection, which the merge reads
 * as "this collection has no entries" rather than as "unchanged" — collections
 * are the one thing a delta never carries forward.
 */
function diffList(
	previous: unknown,
	next: readonly unknown[],
	field: string,
	path: string,
): unknown[] | undefined {
	if (next.length === 0) return undefined;

	if (PRIMITIVE_LISTS.has(field)) {
		// Arrays of bare primitives — `scoreReasons` — have no entry identity to
		// match across samples. Like every other collection, they are defined by
		// the newest message and written whole whenever present.
		return next.map((entry, index) => asPrimitiveOrThrow(entry, `${path}[${index}]`));
	}

	if (VALUE_LISTS.has(field)) {
		// One-off records with no identity: written whole, remembered never.
		return next.map((entry, index) =>
			diffRecord(undefined, asRecordOrThrow(entry, `${path}[${index}]`), `${path}[${index}]`),
		);
	}

	const keyField = COLLECTION_KEYS[field] ?? DEFAULT_COLLECTION_KEY;
	const pinned = new Set([keyField]);
	const before = indexByKey(previous, keyField);

	return next.map((entry, index) => {
		const entryPath = `${path}[${index}]`;
		const record = asRecordOrThrow(entry, entryPath);
		const key = record[keyField];

		if (key === undefined || key === null) {
			throw new JsonCodecError(
				'INVALID_VALUE',
				`Every entry needs a "${keyField}" to be matched against the previous sample`,
				{ path: entryPath },
			);
		}

		return diffRecord(before.get(String(key)), record, entryPath, pinned);
	});
}

/**
 * `previous` with `delta` laid over it — the full record again.
 *
 * This is what the decoder returns, and also what the encoder keeps as its own
 * state: running it on both sides is what guarantees the two cannot disagree
 * about what has already been said.
 */
export function mergeRecord(
	previous: JsonRecord | undefined,
	delta: JsonRecord,
	path: string,
	context: DeltaContext,
	required: readonly string[] = ROOT_REQUIRED_FIELDS,
): JsonRecord {
	const merged: JsonRecord = {};

	for (const field of Object.keys(previous ?? {})) {
		const value = previous![field];
		// Collections are defined by the newest message; scalars and sub-objects
		// persist until something overwrites them.
		if (Array.isArray(value)) continue;
		if (value !== undefined) merged[field] = value;
	}

	for (const field of Object.keys(delta)) {
		const value = delta[field];
		if (value === undefined || value === null) continue;

		const fieldPath = `${path}.${field}`;

		if (Array.isArray(value)) {
			merged[field] = mergeList(previous?.[field], value, field, fieldPath, context);
			continue;
		}

		if (STRUCT_FIELDS.has(field)) {
			merged[field] = mergeRecord(
				asRecord(previous?.[field]),
				value as JsonRecord,
				fieldPath,
				context,
				[],
			);
			continue;
		}

		merged[field] = typeof value === 'object' ? cloneJson(value) : value;
	}

	for (const field of required) {
		if (merged[field] !== undefined) continue;
		throw new JsonCodecError(context.missingFieldCode, context.missingFieldMessage(field), {
			path: `${path}.${field}`,
		});
	}

	return merged;
}

function mergeList(
	previous: unknown,
	delta: readonly unknown[],
	field: string,
	path: string,
	context: DeltaContext,
): unknown[] {
	const required = REQUIRED_FIELDS[field] ?? [];

	if (PRIMITIVE_LISTS.has(field)) {
		return delta.map((entry, index) => asPrimitiveOrThrow(entry, `${path}[${index}]`));
	}

	if (VALUE_LISTS.has(field)) {
		return delta.map((entry, index) =>
			mergeRecord(
				undefined,
				asRecordOrThrow(entry, `${path}[${index}]`),
				`${path}[${index}]`,
				context,
				required,
			),
		);
	}

	const keyField = COLLECTION_KEYS[field] ?? DEFAULT_COLLECTION_KEY;
	const before = indexByKey(previous, keyField);

	return delta.map((entry, index) => {
		const entryPath = `${path}[${index}]`;
		const record = asRecordOrThrow(entry, entryPath);
		const key = record[keyField];

		if (key === undefined || key === null) {
			throw new JsonCodecError(
				context.missingFieldCode,
				`Entry is missing its "${keyField}", so it cannot be matched to a known entry`,
				{ path: entryPath },
			);
		}

		return mergeRecord(before.get(String(key)), record, entryPath, context, required);
	});
}

function indexByKey(value: unknown, keyField: string): Map<string, JsonRecord> {
	const index = new Map<string, JsonRecord>();
	if (!Array.isArray(value)) return index;

	for (const entry of value) {
		const record = asRecord(entry);
		const key = record?.[keyField];
		if (key !== undefined && key !== null) index.set(String(key), record!);
	}
	return index;
}

function asRecord(value: unknown): JsonRecord | undefined {
	return typeof value === 'object' && value !== null && !Array.isArray(value)
		? (value as JsonRecord)
		: undefined;
}

function asPrimitiveOrThrow(value: unknown, path: string): string | number | boolean {
	if (typeof value === 'number') {
		if (!Number.isFinite(value)) {
			throw new JsonCodecError('INVALID_VALUE', 'Expected a finite number', {
				path,
				received: value,
			});
		}
		return value;
	}
	if (typeof value === 'string' || typeof value === 'boolean') return value;
	throw new JsonCodecError('MALFORMED_INPUT', 'Expected a primitive value', {
		path,
		received: value,
	});
}

function asRecordOrThrow(value: unknown, path: string): JsonRecord {
	const record = asRecord(value);
	if (!record) {
		throw new JsonCodecError('MALFORMED_INPUT', 'Expected an object', { path, received: value });
	}
	return record;
}

function jsonEqual(a: unknown, b: unknown): boolean {
	if (a === b) return true;
	if (a === undefined || b === undefined) return false;
	return JSON.stringify(a) === JSON.stringify(b);
}

/**
 * Opaque values are copied on the way in and on the way out, so neither the
 * encoder's state nor the decoder's can be changed under it by a caller that
 * reuses and mutates its own objects. Only ever runs on a value that changed.
 */
function cloneJson<T>(value: T): T {
	return JSON.parse(JSON.stringify(value)) as T;
}

/**
 * A structural copy of a merged record.
 *
 * The decoder returns the tree it just built and keeps a copy of it, rather
 * than keeping the tree it handed out. Without this, a pipeline that enriches
 * samples in place — annotating a score, tagging a track, the most ordinary
 * thing to do with a decoded sample — would be writing directly into the
 * decoder's memory of the stream, and every later sample would inherit the
 * edit. That is a genuinely horrible bug to find.
 *
 * Values here are JSON by construction, so this only has to handle arrays,
 * plain objects and primitives. It runs once per decoded sample and is a good
 * deal cheaper than the `JSON.parse` that preceded it.
 */
export function deepCopy<T>(value: T): T {
	if (Array.isArray(value)) return value.map(deepCopy) as unknown as T;
	if (typeof value !== 'object' || value === null) return value;

	const copy: JsonRecord = {};
	for (const key of Object.keys(value as JsonRecord)) {
		copy[key] = deepCopy((value as JsonRecord)[key]);
	}
	return copy as T;
}
