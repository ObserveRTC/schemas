import { ProtobufCodecError } from '../errors.js';
import type { Logger } from '../logger.js';
import type { FieldPlan, MessagePlan } from './plan.js';

/** Everything the state machines need beyond their plan. */
export interface RecordContext {
	readonly logger: Logger;
}

/**
 * The delta state machines.
 *
 * One {@link RecordEncoder} (or {@link RecordDecoder}) exists per *live thing*
 * in the call — the client, each peer connection, each RTP stream, each ICE
 * candidate pair — and remembers the last value it saw for every field of that
 * thing. Encoding a sample walks the tree and writes down only what moved;
 * decoding walks the same tree and lays the arriving values back over what it
 * already had.
 *
 * The two sides mirror each other exactly. That is the whole contract: the
 * decoder's state after message N must equal the encoder's state after message
 * N, which is why a decoder has to see every message of a stream in order.
 */

type PlainRecord = Record<string, unknown>;

const NO_PINNED_FIELDS: ReadonlySet<string> = new Set();

export class RecordEncoder {
	private readonly last = new Map<string, unknown>();
	private readonly structs = new Map<string, RecordEncoder>();
	private readonly entities = new Map<string, Map<string, RecordEncoder>>();

	/** Set while the parent walks this sample's entries; drives collection pruning. */
	public visited = false;

	public constructor(
		private readonly plan: MessagePlan,
		private readonly context: RecordContext,
		/**
		 * Fields written on every message even when unchanged. Always the
		 * collection's key, so the decoder can tell which entry a delta belongs
		 * to without positional guessing.
		 */
		private readonly pinned: ReadonlySet<string> = NO_PINNED_FIELDS,
	) {}

	/** Forget everything, so the next message is a full snapshot. */
	public reset(): void {
		this.last.clear();
		this.structs.clear();
		this.entities.clear();
	}

	public encode(plain: PlainRecord, path: string): PlainRecord {
		const wire: PlainRecord = {};

		for (const field of this.plan.fields) {
			switch (field.kind) {
				case 'scalar':
					this.encodeScalar(field, plain, wire, path);
					break;
				case 'struct':
					this.encodeStruct(field, plain, wire, path);
					break;
				case 'valueList':
					this.encodeValueList(field, plain, wire, path);
					break;
				case 'entityList':
					this.encodeEntityList(field, plain, wire, path);
					break;
			}
		}

		return wire;
	}

	private encodeScalar(
		field: Extract<FieldPlan, { kind: 'scalar' }>,
		plain: PlainRecord,
		wire: PlainRecord,
		path: string,
	): void {
		const value = plain[field.name];

		// An absent field means "nothing to say about this", not "clear it".
		// A delta protocol built on proto3 explicit presence has no way to
		// express deletion, and the sample schema has no need for one.
		if (value === undefined || value === null) return;

		const isPinned = this.pinned.has(field.name);
		if (!isPinned && field.converter.equals(value, this.last.get(field.name))) return;

		this.last.set(field.name, value);
		wire[field.name] = field.converter.toWire(value, `${path}.${field.name}`);
	}

	private encodeStruct(
		field: Extract<FieldPlan, { kind: 'struct' }>,
		plain: PlainRecord,
		wire: PlainRecord,
		path: string,
	): void {
		const value = plain[field.name];
		if (value === undefined || value === null) return;

		let encoder = this.structs.get(field.name);
		if (!encoder) {
			encoder = new RecordEncoder(field.plan, this.context);
			this.structs.set(field.name, encoder);
		}

		const nested = encoder.encode(value as PlainRecord, `${path}.${field.name}`);
		// An unchanged sub-message is simply omitted; the decoder keeps the copy
		// it already holds.
		if (Object.keys(nested).length > 0) wire[field.name] = nested;
	}

	private encodeValueList(
		field: Extract<FieldPlan, { kind: 'valueList' }>,
		plain: PlainRecord,
		wire: PlainRecord,
		path: string,
	): void {
		const items = plain[field.name];
		if (!Array.isArray(items) || items.length === 0) return;

		// Events carry no identity and never repeat, so they are written whole.
		// (The previous encoder ran them through shared stateful field encoders,
		// which silently dropped the `type` of a second event with the same type
		// in one sample.)
		const stateless = new RecordEncoder(field.plan, this.context);
		wire[field.name] = items.map((item, index) =>
			stateless.encodeFresh(item as PlainRecord, `${path}.${field.name}[${index}]`),
		);
	}

	/** Encode `plain` in full, ignoring and not retaining any delta state. */
	private encodeFresh(plain: PlainRecord, path: string): PlainRecord {
		this.reset();
		return this.encode(plain, path);
	}

	private encodeEntityList(
		field: Extract<FieldPlan, { kind: 'entityList' }>,
		plain: PlainRecord,
		wire: PlainRecord,
		path: string,
	): void {
		const items = plain[field.name];
		if (!Array.isArray(items) || items.length === 0) {
			this.entities.get(field.name)?.clear();
			return;
		}

		let slots = this.entities.get(field.name);
		if (!slots) {
			slots = new Map<string, RecordEncoder>();
			this.entities.set(field.name, slots);
		}

		const pinned = new Set([field.keyField]);
		const encoded: PlainRecord[] = [];

		for (let index = 0; index < items.length; index += 1) {
			const item = items[index] as PlainRecord;
			const itemPath = `${path}.${field.name}[${index}]`;
			const key = item[field.keyField];

			if (key === undefined || key === null) {
				throw new ProtobufCodecError(
					'INVALID_VALUE',
					`Every entry needs a "${field.keyField}" to be matched against the previous sample`,
					{ path: itemPath },
				);
			}

			const slotKey = String(key);
			let encoder = slots.get(slotKey);
			if (!encoder) {
				encoder = new RecordEncoder(field.plan, this.context, pinned);
				slots.set(slotKey, encoder);
			}

			encoder.visited = true;
			// Always emitted, even when nothing changed: the entry's presence is
			// itself information, and its absence is how the decoder learns the
			// stream, codec or candidate pair went away.
			encoded.push(encoder.encode(item, itemPath));
		}

		for (const [slotKey, encoder] of slots) {
			if (encoder.visited) {
				encoder.visited = false;
			} else {
				// The next time this key shows up it will be encoded from
				// scratch, which is the only safe thing to do — but it is also
				// the shape of a "why did my stream get big again" question.
				this.context.logger.debug(
					`${path}.${field.name}: forgetting "${slotKey}", it is no longer in the sample`,
				);
				slots.delete(slotKey);
			}
		}

		wire[field.name] = encoded;
	}
}

export class RecordDecoder {
	private readonly state = new Map<string, unknown>();
	private readonly structs = new Map<string, RecordDecoder>();
	private readonly entities = new Map<string, Map<string, RecordDecoder>>();
	private lastStruct: PlainRecord | undefined;

	public visited = false;

	public constructor(
		private readonly plan: MessagePlan,
		private readonly context: RecordContext,
	) {}

	public reset(): void {
		this.state.clear();
		this.structs.clear();
		this.entities.clear();
		this.lastStruct = undefined;
	}

	public decode(wire: PlainRecord, path: string): PlainRecord {
		const plain: PlainRecord = {};

		for (const field of this.plan.fields) {
			switch (field.kind) {
				case 'scalar':
					this.decodeScalar(field, wire, plain, path);
					break;
				case 'struct':
					this.decodeStruct(field, wire, plain, path);
					break;
				case 'valueList':
					this.decodeValueList(field, wire, plain, path);
					break;
				case 'entityList':
					this.decodeEntityList(field, wire, plain, path);
					break;
			}
		}

		this.assertComplete(plain, path);
		this.lastStruct = plain;
		return plain;
	}

	private decodeScalar(
		field: Extract<FieldPlan, { kind: 'scalar' }>,
		wire: PlainRecord,
		plain: PlainRecord,
		path: string,
	): void {
		const incoming = wire[field.name];
		if (incoming !== undefined && incoming !== null) {
			this.state.set(field.name, field.converter.toPlain(incoming, `${path}.${field.name}`));
		}

		const retained = this.state.get(field.name);
		if (retained !== undefined) plain[field.name] = retained;
	}

	private decodeStruct(
		field: Extract<FieldPlan, { kind: 'struct' }>,
		wire: PlainRecord,
		plain: PlainRecord,
		path: string,
	): void {
		const incoming = wire[field.name];

		let decoder = this.structs.get(field.name);
		if (!decoder) {
			if (incoming === undefined || incoming === null) return;
			decoder = new RecordDecoder(field.plan, this.context);
			this.structs.set(field.name, decoder);
		}

		const value =
			incoming === undefined || incoming === null
				? decoder.retained()
				: decoder.decode(incoming as PlainRecord, `${path}.${field.name}`);

		if (value !== undefined) plain[field.name] = value;
	}

	/** The last object this decoder produced, for sub-messages that did not change. */
	private retained(): PlainRecord | undefined {
		return this.lastStruct;
	}

	private decodeValueList(
		field: Extract<FieldPlan, { kind: 'valueList' }>,
		wire: PlainRecord,
		plain: PlainRecord,
		path: string,
	): void {
		const items = wire[field.name];
		if (!Array.isArray(items) || items.length === 0) return;

		plain[field.name] = items.map((item, index) => {
			const decoder = new RecordDecoder(field.plan, this.context);
			return decoder.decode(item as PlainRecord, `${path}.${field.name}[${index}]`);
		});
	}

	private decodeEntityList(
		field: Extract<FieldPlan, { kind: 'entityList' }>,
		wire: PlainRecord,
		plain: PlainRecord,
		path: string,
	): void {
		const items = wire[field.name];
		if (!Array.isArray(items) || items.length === 0) {
			this.entities.get(field.name)?.clear();
			return;
		}

		let slots = this.entities.get(field.name);
		if (!slots) {
			slots = new Map<string, RecordDecoder>();
			this.entities.set(field.name, slots);
		}

		const keyPlan = field.plan.fieldByName.get(field.keyField);
		/* c8 ignore next -- guaranteed by buildFieldPlan */
		if (!keyPlan || keyPlan.kind !== 'scalar') {
			throw new ProtobufCodecError('INVALID_OPTION', 'Collection key must be a scalar field', {
				path: `${path}.${field.name}`,
			});
		}

		const decoded: PlainRecord[] = [];

		for (let index = 0; index < items.length; index += 1) {
			const item = items[index] as PlainRecord;
			const itemPath = `${path}.${field.name}[${index}]`;
			const rawKey = item[field.keyField];

			if (rawKey === undefined || rawKey === null) {
				throw new ProtobufCodecError(
					'STREAM_DESYNC',
					`Entry is missing its "${field.keyField}", so it cannot be matched to a known entry`,
					{ path: itemPath },
				);
			}

			const slotKey = String(keyPlan.converter.toPlain(rawKey, `${itemPath}.${field.keyField}`));
			let decoder = slots.get(slotKey);
			if (!decoder) {
				decoder = new RecordDecoder(field.plan, this.context);
				slots.set(slotKey, decoder);
			}

			decoder.visited = true;
			decoded.push(decoder.decode(item, itemPath));
		}

		for (const [slotKey, decoder] of slots) {
			if (decoder.visited) {
				decoder.visited = false;
			} else {
				this.context.logger.debug(
					`${path}.${field.name}: forgetting "${slotKey}", the encoder stopped sending it`,
				);
				slots.delete(slotKey);
			}
		}

		plain[field.name] = decoded;
	}

	/**
	 * A field the plain types declare as required can only be missing here if
	 * this decoder never saw the message that first carried it — i.e. the stream
	 * was joined late or a message was dropped. Saying so beats handing back an
	 * object that does not match its own type.
	 */
	private assertComplete(plain: PlainRecord, path: string): void {
		for (const name of this.plan.requiredFields) {
			if (plain[name] !== undefined) continue;
			throw new ProtobufCodecError(
				'STREAM_DESYNC',
				`"${name}" has never been seen on this stream, so ${this.plan.name} cannot be reconstructed`,
				{ path: `${path}.${name}` },
			);
		}
	}
}
