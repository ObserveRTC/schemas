import { DeflateCodecError, type DeflateCodecErrorCode } from './errors.js';
import { isRecord, type JsonRecord } from './guards.js';
import {
	ENTRY_UPDATES_KEY,
	PC_ENTRY_FIELDS,
	PC_FIELDS,
	TOP_FIELDS,
	TOP_VALUE_LISTS,
	WHOLE_LIST_KEY,
} from './vocabulary.js';

/**
 * The structural sample diff: one `diff`, one `apply`, and the promise that
 * they are exact inverses.
 *
 * Both are pure — all the state lives in the caller (one `previous` object per
 * stream) — so the encoder and the decoder cannot drift apart in a way this
 * file could hide: the encoder advances its state by applying the delta it
 * just produced, which is exactly what the decoder does.
 *
 * ## The format
 *
 * A delta is a `ClientSample` with the unchanged parts left out, down to the
 * individual stat field of each entry in each peer-connection list:
 *
 * ```json
 * {
 *   "timestamp": 1756000001000,
 *   "peerConnections": [
 *     { "iceCandidatePairs": {
 *         "e": [ { "id": "CP…", "packetsSent": 4024, "bytesSent": 4021712 } ]
 *     } }
 *   ]
 * }
 * ```
 *
 * The rules, at each level:
 *
 * 1. **Top level.** Scalar and opaque fields (`timestamp`, `score`,
 *    `attachments`, …) are sent when they changed. The event/meta/issue/
 *    extension lists carry no per-entry diff: they are sent whole when
 *    non-empty, and as `[]` when they emptied.
 * 2. **Peer connections** are matched by position (their order is stable). A
 *    change in their count is a keyframe — the whole sample, `t=0`.
 * 3. **Entries** in a peer-connection list are matched by `id`. A change in
 *    the list's id sequence (an entry added, removed, or reordered) sends the
 *    whole list under the `l` key. Otherwise, per entry, only the fields that
 *    changed are sent under the `e` key; an entry that carries a field
 *    outside its list's vocabulary is sent whole (the decoder recognizes a
 *    whole entry by the same out-of-vocabulary key and replaces the entry).
 *    A removed field is sent as `null`.
 *
 * See {@link ./vocabulary.js} for the field sets. The diff is exact: every
 * field that moves is sent, and the reconstruction is the sample itself.
 */

/** The result of {@link diffSample}: the wire delta and whether it is a keyframe. */
export interface SampleDelta {
	readonly delta: JsonRecord;
	/** `true` when the delta is the complete sample (the decoder replaces its state). */
	readonly snapshot: boolean;
}

const TOP_SCALARS = TOP_FIELDS.filter((f) => f !== 'peerConnections' && !TOP_VALUE_LISTS.has(f));
const PC_SCALARS = PC_FIELDS.filter((f) => !PC_ENTRY_FIELDS[f]);

/**
 * A copy the codec owns: `structuredClone` is the platform's own deep copy,
 * and validated samples (see `assertJsonSafe`) are exactly the values it can
 * clone.
 */
export function deepCopy<T>(value: T): T {
	return structuredClone(value);
}

export function deepEquals(a: unknown, b: unknown): boolean {
	if (a === b) return true;
	if (typeof a !== 'object' || typeof b !== 'object' || a === null || b === null) return false;
	if (Array.isArray(a) !== Array.isArray(b)) return false;
	if (Array.isArray(a) && Array.isArray(b)) {
		if (a.length !== b.length) return false;
		for (let i = 0; i < a.length; i++) if (!deepEquals(a[i], b[i])) return false;
		return true;
	}
	const ka = Object.keys(a as JsonRecord);
	const kb = Object.keys(b as JsonRecord);
	if (ka.length !== kb.length) return false;
	for (const key of ka) {
		if (!Object.prototype.hasOwnProperty.call(b, key) || !deepEquals((a as JsonRecord)[key], (b as JsonRecord)[key]))
			return false;
	}
	return true;
}

/**
 * The structural delta of `curr` against `prev`. `prev === undefined` produces
 * a keyframe — the whole sample — which is also what the rules produce when
 * the sample shape changed in a way the delta language cannot express.
 */
export function diffSample(prev: JsonRecord | undefined, curr: JsonRecord): SampleDelta {
	assertSample(curr, 'ClientSample');

	if (prev === undefined) {
		return { delta: deepCopy(curr) as JsonRecord, snapshot: true };
	}

	if (needsKeyframe(prev, curr)) {
		return { delta: deepCopy(curr) as JsonRecord, snapshot: true };
	}

	const delta: JsonRecord = {};

	for (const field of TOP_SCALARS) {
		const value = curr[field];
		if (!deepEquals(prev[field], value)) delta[field] = value === undefined ? null : deepCopy(value);
	}

	for (const field of TOP_VALUE_LISTS) {
		const value = curr[field];
		const before = prev[field];
		const currPresent = Array.isArray(value);
		const beforePresent = Array.isArray(before);

		// A value list is one opaque value, like `attachments`: sent whole
		// when it changes — including when it changes to an empty list or to
		// absent — and remembered in between. An empty list and an absent
		// key are different things in the samples, so both travel.
		if (currPresent && (!beforePresent || !deepEquals(before, value))) delta[field] = deepCopy(value);
		else if (!currPresent && beforePresent) delta[field] = null;
	}

	const currPcs = curr.peerConnections;
	if (Array.isArray(currPcs)) {
		delta.peerConnections = currPcs.map(
			(pc, i) => diffPeerConnection((prev.peerConnections as JsonRecord[] | undefined)?.[i]!, pc, i),
		);
	}

	return { delta, snapshot: false };
}

function needsKeyframe(prev: JsonRecord, curr: JsonRecord): boolean {
	for (const key of Object.keys(curr)) if (!TOP_FIELDS.includes(key)) return true;

	const prevPcs = prev.peerConnections;
	const currPcs = curr.peerConnections;
	const prevPresent = Array.isArray(prevPcs);
	const currPresent = Array.isArray(currPcs);
	if (prevPresent !== currPresent) return true;
	const prevCount = prevPresent ? prevPcs.length : 0;
	const currCount = currPresent ? currPcs.length : 0;
	if (prevCount !== currCount) return true;

	for (const pc of currPcs as JsonRecord[] ?? []) {
		for (const key of Object.keys(pc)) if (!PC_FIELDS.includes(key)) return true;
	}
	return false;
}

function diffPeerConnection(prev: JsonRecord, curr: JsonRecord, pcIndex: number): JsonRecord {
	const delta: JsonRecord = {};

	for (const field of PC_SCALARS) {
		const value = curr[field];
		if (!deepEquals(prev[field], value)) delta[field] = value === undefined ? null : deepCopy(value);
	}

	for (const [list, fields] of Object.entries(PC_ENTRY_FIELDS)) {
		const prevList = prev[list] as JsonRecord[] | undefined;
		const currList = curr[list] as JsonRecord[] | undefined;
		const prevPresent = prevList !== undefined;
		const currPresent = currList !== undefined;
		const listPath = `ClientSample.peerConnections[${pcIndex}].${list}`;

		if (currPresent && (!prevPresent || !sameEntryIds(prevList, currList, listPath))) {
			// New list, new or moved entries: the whole list goes.
			delta[list] = { [WHOLE_LIST_KEY]: deepCopy(currList) };
			continue;
		}
		if (!currPresent && prevPresent) {
			// The list was removed: say so, so the key goes away.
			delta[list] = null;
			continue;
		}
		if (!currPresent) continue;

		const updates: unknown[] = [];
		for (let i = 0; i < currList.length; i++) {
			const update = diffEntry(prevList![i]!, currList[i]!, fields);
			if (update !== undefined) updates.push(update);
		}
		if (updates.length > 0) delta[list] = { [ENTRY_UPDATES_KEY]: updates };
	}

	return delta;
}

/**
 * Same length, same ids in the same order — the precondition for per-entry
 * updates. A missing id is an anomaly the encoder reports instead of guessing.
 */
function sameEntryIds(prev: JsonRecord[] | undefined, curr: JsonRecord[], listPath: string): boolean {
	if ((prev?.length ?? 0) !== curr.length) return false;
	for (let i = 0; i < curr.length; i++) {
		const a = prev?.[i];
		const b = curr[i];
		if (!isRecord(b) || typeof b.id !== 'string')
			throw new DeflateCodecError('INVALID_VALUE', 'Expected a string "id" on the entry', {
				path: `${listPath}[${i}]`,
				received: b,
			});
		if (isRecord(a) && a.id !== b.id) return false;
	}
	return true;
}

function diffEntry(prev: JsonRecord, curr: JsonRecord, fields: readonly string[]): JsonRecord | undefined {
	// An entry with a field outside the vocabulary is sent whole. The decoder
	// recognizes the same shape and replaces the entry — so a whole entry and
	// an update share one wire shape, and no marker is needed.
	for (const key of Object.keys(curr)) {
		if (key !== 'id' && !fields.includes(key)) {
			const whole: JsonRecord = { id: curr.id };
			for (const [k, v] of Object.entries(curr)) if (k !== 'id') whole[k] = deepCopy(v);
			return whole;
		}
	}

	const update: JsonRecord = { id: curr.id };
	for (const field of fields) {
		if (field === 'id') continue;
		const value = curr[field];
		if (!deepEquals(prev[field], value)) update[field] = value === undefined ? null : deepCopy(value);
	}
	if (Object.keys(update).length === 1) return undefined;
	return update;
}

/**
 * The decoder's half: rebuild the sample a delta completes. Throws
 * `STREAM_DESYNC` when the delta does not line up with the accumulated state —
 * a mid-stream join, a dropped message, or a corrupted one.
 */
export function applyDelta(prev: JsonRecord | undefined, delta: JsonRecord, snapshot = false): JsonRecord {
	if (snapshot || prev === undefined) {
		// A snapshot — the first message or any mid-stream keyframe — replaces
		// the accumulated state wholesale.
		assertSampleShape(delta, 'ClientSample', 'MALFORMED_INPUT');
		return deepCopy(delta) as JsonRecord;
	}

	const next = deepCopy(prev) as JsonRecord;

	for (const field of TOP_SCALARS) {
		if (field in delta) setField(next, field, delta[field]);
	}

	for (const field of TOP_VALUE_LISTS) {
		if (field in delta) {
			const value = delta[field];
			if (value === null) {
				// The list was removed: the key goes away with it.
				delete next[field];
				continue;
			}
			if (!Array.isArray(value)) throw desync(`${field} must be a list`);
			// Preserved exactly as sent — an empty list is a present, empty
			// list, not an absent one (the samples carry both).
			next[field] = deepCopy(value);
		}
	}

	const deltaPcs = delta.peerConnections;
	if (deltaPcs !== undefined) {
		if (!Array.isArray(deltaPcs)) throw desync('peerConnections must be a list');
		const prevPcs = prev.peerConnections;
		if (!Array.isArray(prevPcs) || prevPcs.length !== deltaPcs.length)
			throw desync(`peerConnections count changed in a delta (${Array.isArray(prevPcs) ? prevPcs.length : 0} → ${deltaPcs.length})`);
		next.peerConnections = prevPcs.map((pc, i) => applyPeerConnection(pc as JsonRecord, deltaPcs[i] as JsonRecord));
	}

	return next;
}

function applyPeerConnection(prev: JsonRecord, delta: JsonRecord): JsonRecord {
	const next = deepCopy(prev) as JsonRecord;

	for (const field of PC_SCALARS) {
		if (field in delta) setField(next, field, delta[field]);
	}

	for (const [list, fields] of Object.entries(PC_ENTRY_FIELDS)) {
		const value = delta[list];
		if (value === undefined) continue;
		if (value === null) {
			delete next[list];
			continue;
		}
		if (!isRecord(value)) throw desync(`${list} must be an object`);

		if (WHOLE_LIST_KEY in value) {
			const whole = value[WHOLE_LIST_KEY];
			if (!Array.isArray(whole)) throw desync(`${list} has no whole-list value`);
			next[list] = deepCopy(whole);
			continue;
		}

		if (ENTRY_UPDATES_KEY in value) {
			applyEntryUpdates(next, list, value[ENTRY_UPDATES_KEY], fields);
		}
	}

	return next;
}

function applyEntryUpdates(next: JsonRecord, list: string, updates: unknown, fields: readonly string[]): void {
	if (!Array.isArray(updates)) throw desync(`${list} has no entry-update list`);

	const target = next[list];
	if (!Array.isArray(target)) throw desync(`${list} is not a list in the accumulated state`);

	const byId = new Map<string, JsonRecord>();
	for (const entry of target) if (isRecord(entry) && typeof entry.id === 'string') byId.set(entry.id, entry);

	for (const update of updates) {
		if (typeof update === 'string') {
			// A bare id removes the entry.
			if (!byId.delete(update)) throw desync(`${list}: entry "${update}" is not in the call`);
			continue;
		}
		if (!isRecord(update) || typeof update.id !== 'string')
			throw desync(`${list}: an entry update has no id`);

		const entry = byId.get(update.id);
		if (!entry) throw desync(`${list}: entry "${update.id}" is not in the call`);

		const whole = Object.keys(update).some((key) => key !== 'id' && !fields.includes(key));
		if (whole) {
			// Out-of-vocabulary field: the update is the entry's new whole state.
			const replacement: JsonRecord = {};
			for (const [key, v] of Object.entries(update)) replacement[key] = deepCopy(v);
			const index = target.indexOf(entry);
			target[index] = replacement;
			byId.set(update.id, replacement);
			continue;
		}

		for (const [key, v] of Object.entries(update)) {
			if (key === 'id') continue;
			setField(entry, key, v);
		}
	}
}

function setField(target: JsonRecord, field: string, value: unknown): void {
	if (value === null || value === undefined) delete target[field];
	else target[field] = deepCopy(value);
}

function desync(detail: string): DeflateCodecError {
	return new DeflateCodecError('STREAM_DESYNC', `The delta does not line up with the accumulated state: ${detail}`, {
		path: 'ClientSample',
	});
}

/**
 * The shape a sample must have for the diff to work at all: a numeric
 * `timestamp` and, if present, a list of peer-connection objects.
 */
function assertSampleShape(value: unknown, path: string, code: DeflateCodecErrorCode): void {
	if (!isRecord(value))
		throw new DeflateCodecError(code, 'Expected a ClientSample object', { path, received: value });
	if (typeof value.timestamp !== 'number')
		throw new DeflateCodecError(code, 'Expected a numeric "timestamp"', { path: `${path}.timestamp` });
	const pcs = value.peerConnections;
	if (pcs === undefined) return;
	if (!Array.isArray(pcs))
		throw new DeflateCodecError(code, 'Expected "peerConnections" to be a list', {
			path: `${path}.peerConnections`,
		});
	for (let i = 0; i < pcs.length; i++) {
		const pc = pcs[i]!;
		if (!isRecord(pc))
			throw new DeflateCodecError(code, 'Expected a peer-connection object', {
				path: `${path}.peerConnections[${i}]`,
				received: pc,
			});
		for (const [list] of Object.entries(PC_ENTRY_FIELDS)) {
			const entries = pc[list];
			if (!Array.isArray(entries)) continue;
			for (let j = 0; j < entries.length; j++) {
				const entry = entries[j]!;
				if (!isRecord(entry) || typeof entry.id !== 'string')
					throw new DeflateCodecError(code, 'Expected a string "id" on the entry', {
						path: `${path}.peerConnections[${i}].${list}[${j}]`,
						received: entry,
					});
			}
		}
	}
}

/**
 * The encoder's full check: the shape, plus nothing JSON would quietly change
 * on the way out — a non-finite number becomes `null`, a `bigint` throws, a
 * cycle overflows the stack.
 */
function assertSample(value: unknown, path: string): void {
	assertSampleShape(value, path, 'INVALID_VALUE');
	assertJsonSafe(value, path, new Set());
}

function assertJsonSafe(value: unknown, path: string, stack: Set<object>): void {
	if (value === null || typeof value !== 'object') {
		if (typeof value === 'number' && !Number.isFinite(value))
			throw new DeflateCodecError('INVALID_VALUE', 'Expected a finite number', { path, received: value });
		if (typeof value === 'bigint')
			throw new DeflateCodecError('INVALID_VALUE', 'Expected a JSON value; bigint cannot be represented', {
				path,
			});
		if (typeof value === 'function')
			throw new DeflateCodecError('INVALID_VALUE', 'Expected a JSON value; a function cannot be represented', {
				path,
				received: value,
			});
		return;
	}
	// A stack, not a visited set: the same object graph may repeat, a cycle may not.
	if (stack.has(value)) throw new DeflateCodecError('MALFORMED_INPUT', 'Value contains a cycle', { path });
	stack.add(value);
	if (Array.isArray(value)) {
		for (let i = 0; i < value.length; i++) assertJsonSafe(value[i]!, `${path}[${i}]`, stack);
	} else {
		for (const [key, child] of Object.entries(value as JsonRecord)) assertJsonSafe(child, `${path}.${key}`, stack);
	}
	stack.delete(value);
}
