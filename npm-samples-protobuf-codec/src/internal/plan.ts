import {
	ScalarType,
	type DescEnum,
	type DescField,
	type DescMessage,
} from '@bufbuild/protobuf';

import { ProtobufCodecError } from '../errors.js';
import type { ResolvedIdentifierEncodings } from '../options.js';
import {
	bytesToUtf8,
	bytesToUuid,
	utf8ToBytes,
	uuidToBytes,
} from './binary.js';
import {
	DEFAULT_ENTITY_KEY,
	ENUM_PLAIN_ALIASES,
	IDENTIFIER_SLOTS,
	JSON_FIELDS,
	LIST_LAYOUTS,
	REQUIRED_FIELDS,
	shortTypeName,
} from './layout.js';

/**
 * A plan is the schema, pre-chewed: for every message in `ClientSample`, the
 * list of fields with the conversion each one needs and the shape of the state
 * the codec has to keep for it.
 *
 * It is built once per encoder or decoder and shared by every entity of that
 * type, so per-sample work is a walk over arrays rather than a walk over
 * descriptors. Nothing in a plan is mutable and nothing in it is per-stream —
 * the mutable delta state lives in `record.ts`.
 */

/**
 * Converts one value between the plain sample shape and the wire shape.
 *
 * `equals` compares *plain* values, because that is the space the caller's data
 * lives in and the space in which "did this change since the last sample"
 * actually means something.
 */
export interface ValueConverter {
	readonly toWire: (plain: unknown, path: string) => unknown;
	readonly toPlain: (wire: unknown, path: string) => unknown;
	readonly equals: (a: unknown, b: unknown) => boolean;
}

export type FieldPlan =
	| { readonly kind: 'scalar'; readonly name: string; readonly converter: ValueConverter }
	| { readonly kind: 'primitiveList'; readonly name: string; readonly converter: ValueConverter }
	| { readonly kind: 'struct'; readonly name: string; readonly plan: MessagePlan }
	| { readonly kind: 'valueList'; readonly name: string; readonly plan: MessagePlan }
	| {
			readonly kind: 'entityList';
			readonly name: string;
			readonly plan: MessagePlan;
			readonly keyField: string;
	  };

export interface MessagePlan {
	readonly desc: DescMessage;
	/** Proto type name with the package stripped, used in errors and config. */
	readonly name: string;
	readonly fields: readonly FieldPlan[];
	/** Fast lookup used by entity collections to read an entry's key. */
	readonly fieldByName: ReadonlyMap<string, FieldPlan>;
	readonly requiredFields: readonly string[];
}

export interface PlanContext {
	readonly identifiers: ResolvedIdentifierEncodings;
}

/** Builds the plan for `desc` and every message reachable from it. */
export function buildMessagePlan(desc: DescMessage, context: PlanContext): MessagePlan {
	return buildWithCache(desc, context, new Map());
}

function buildWithCache(
	desc: DescMessage,
	context: PlanContext,
	cache: Map<string, MessagePlan>,
): MessagePlan {
	const cached = cache.get(desc.typeName);
	if (cached) return cached;

	const name = shortTypeName(desc.typeName);
	const fields: FieldPlan[] = [];
	const fieldByName = new Map<string, FieldPlan>();

	// Seed the cache before recursing so a self-referential schema would not
	// spin. The array is filled in place below.
	const plan: MessagePlan = {
		desc,
		name,
		fields,
		fieldByName,
		requiredFields: REQUIRED_FIELDS[name] ?? [],
	};
	cache.set(desc.typeName, plan);

	for (const field of desc.fields) {
		const fieldPlan = buildFieldPlan(name, field, context, cache);
		fields.push(fieldPlan);
		fieldByName.set(fieldPlan.name, fieldPlan);
	}

	return plan;
}

function buildFieldPlan(
	messageName: string,
	field: DescField,
	context: PlanContext,
	cache: Map<string, MessagePlan>,
): FieldPlan {
	const name = field.localName;

	if (field.fieldKind === 'list') {
		if (field.listKind === 'scalar') {
			// A list of bare primitives — `scoreReasons` — has no entry identity to
			// diff against, so it is written whole whenever present, exactly like a
			// value list. Repeated proto3 fields have no presence of their own,
			// which fits: an absent list and an empty one mean the same thing.
			return {
				kind: 'primitiveList',
				name,
				converter: scalarConverter(name, field.scalar, context),
			};
		}

		if (field.listKind !== 'message') {
			throw new ProtobufCodecError(
				'INVALID_OPTION',
				'Repeated enum fields are not part of the sample schema',
				{ path: `${messageName}.${name}` },
			);
		}

		const plan = buildWithCache(field.message, context, cache);
		const layout = LIST_LAYOUTS[`${messageName}.${name}`] ?? {
			mode: 'entity' as const,
			key: DEFAULT_ENTITY_KEY,
		};

		if (layout.mode === 'value') return { kind: 'valueList', name, plan };

		if (!plan.fieldByName.has(layout.key)) {
			throw new ProtobufCodecError(
				'INVALID_OPTION',
				`Entity collection is keyed by "${layout.key}", which ${plan.name} does not declare`,
				{ path: `${messageName}.${name}` },
			);
		}
		return { kind: 'entityList', name, plan, keyField: layout.key };
	}

	if (field.fieldKind === 'message') {
		return { kind: 'struct', name, plan: buildWithCache(field.message, context, cache) };
	}

	if (field.fieldKind === 'enum') {
		return { kind: 'scalar', name, converter: enumConverter(field.enum) };
	}

	if (field.fieldKind === 'map') {
		throw new ProtobufCodecError(
			'INVALID_OPTION',
			'Map fields are not part of the sample schema',
			{ path: `${messageName}.${name}` },
		);
	}

	return { kind: 'scalar', name, converter: scalarConverter(name, field.scalar, context) };
}

function scalarConverter(
	name: string,
	scalar: ScalarType,
	context: PlanContext,
): ValueConverter {
	switch (scalar) {
		case ScalarType.BYTES:
			return identifierConverter(name, context);

		case ScalarType.INT64:
		case ScalarType.UINT64:
		case ScalarType.SINT64:
		case ScalarType.FIXED64:
		case ScalarType.SFIXED64:
			return BIGINT_CONVERTER;

		case ScalarType.STRING:
			return JSON_FIELDS.has(name) ? JSON_CONVERTER : IDENTITY_CONVERTER;

		default:
			return IDENTITY_CONVERTER;
	}
}

const IDENTITY_CONVERTER: ValueConverter = {
	toWire: (plain) => plain,
	toPlain: (wire) => wire,
	equals: (a, b) => a === b,
};

/**
 * 64-bit protobuf integers surface as `bigint`, but the sample types describe
 * them as `number` because that is what `RTCStatsReport` hands the caller.
 * Everything above 2^53 is already imprecise by the time it reaches us, so the
 * conversion is a plain widening rather than an attempt to preserve bits.
 */
const BIGINT_CONVERTER: ValueConverter = {
	toWire: (plain, path) => {
		if (typeof plain !== 'number' || !Number.isFinite(plain)) {
			throw new ProtobufCodecError('INVALID_VALUE', 'Expected a finite number', {
				path,
				received: plain,
			});
		}
		return BigInt(Math.trunc(plain));
	},
	toPlain: (wire, path) => {
		if (typeof wire !== 'bigint') {
			throw new ProtobufCodecError('INVALID_VALUE', 'Expected a 64-bit integer', {
				path,
				received: wire,
			});
		}
		return Number(wire);
	},
	equals: (a, b) => a === b,
};

/**
 * `attachments` is an opaque, caller-owned object. It travels as JSON because
 * the schema has no way to describe its shape.
 *
 * Change detection compares the serialised form, not the reference: a caller
 * that rebuilds an equivalent object every tick — which is the normal thing to
 * do — should not pay for it on the wire.
 */
const JSON_CONVERTER: ValueConverter = {
	toWire: (plain, path) => {
		try {
			return JSON.stringify(plain);
		} catch (cause) {
			throw new ProtobufCodecError(
				'INVALID_VALUE',
				'Value is not JSON-serialisable',
				{ path },
				{ cause },
			);
		}
	},
	toPlain: (wire, path) => {
		if (typeof wire !== 'string') {
			throw new ProtobufCodecError('INVALID_VALUE', 'Expected a JSON string', {
				path,
				received: wire,
			});
		}
		try {
			return JSON.parse(wire) as unknown;
		} catch (cause) {
			throw new ProtobufCodecError(
				'INVALID_VALUE',
				'Value is not valid JSON',
				{ path },
				{ cause },
			);
		}
	},
	equals: (a, b) => {
		if (a === b) return true;
		if (a === undefined || b === undefined) return false;
		return JSON.stringify(a) === JSON.stringify(b);
	},
};

function identifierConverter(name: string, context: PlanContext): ValueConverter {
	const slot = IDENTIFIER_SLOTS[name];
	const encoding = slot ? context.identifiers[slot] : 'utf8';

	if (encoding === 'utf8') {
		return {
			toWire: (plain, path) => utf8ToBytes(expectString(plain, path)),
			toPlain: (wire, path) => bytesToUtf8(expectBytes(wire, path)),
			equals: (a, b) => a === b,
		};
	}

	return {
		toWire: (plain, path) => {
			const bytes = uuidToBytes(expectString(plain, path));
			if (!bytes) {
				throw new ProtobufCodecError(
					'INVALID_VALUE',
					`"${slot ?? name}" is configured as a uuid identifier but the value is not a UUID`,
					{ path, received: plain },
				);
			}
			return bytes;
		},
		toPlain: (wire, path) => {
			const uuid = bytesToUuid(expectBytes(wire, path));
			if (!uuid) {
				throw new ProtobufCodecError(
					'INVALID_VALUE',
					`"${slot ?? name}" is configured as a uuid identifier but the wire value is not 16 bytes`,
					{ path },
				);
			}
			return uuid;
		},
		equals: (a, b) => a === b,
	};
}

function enumConverter(desc: DescEnum): ValueConverter {
	const toNumber = new Map<string, number>();
	const toSymbol = new Map<number, string>();

	for (const value of desc.values) {
		toNumber.set(value.name, value.number);
		toSymbol.set(value.number, ENUM_PLAIN_ALIASES[value.name] ?? value.name.toLowerCase());
	}

	/** `in-progress`, `inProgress` and `INPROGRESS` all name the same value. */
	const normalise = (symbol: string): string => symbol.replace(/[^a-zA-Z0-9]/g, '').toUpperCase();
	const byNormalised = new Map<string, number>();
	for (const [name, number] of toNumber) byNormalised.set(normalise(name), number);

	return {
		toWire: (plain, path) => {
			const number = byNormalised.get(normalise(expectString(plain, path)));
			if (number === undefined) {
				throw new ProtobufCodecError(
					'INVALID_VALUE',
					`"${String(plain)}" is not a value of ${shortTypeName(desc.typeName)}`,
					{ path, expected: [...toNumber.keys()] },
				);
			}
			return number;
		},
		toPlain: (wire, path) => {
			if (typeof wire !== 'number') {
				throw new ProtobufCodecError('INVALID_VALUE', 'Expected an enum value', {
					path,
					received: wire,
				});
			}
			const symbol = toSymbol.get(wire);
			if (symbol === undefined) {
				throw new ProtobufCodecError(
					'INVALID_VALUE',
					`${wire} is not a value of ${shortTypeName(desc.typeName)}`,
					{ path },
				);
			}
			return symbol;
		},
		equals: (a, b) => a === b,
	};
}

function expectString(value: unknown, path: string): string {
	if (typeof value !== 'string') {
		throw new ProtobufCodecError('INVALID_VALUE', 'Expected a string', {
			path,
			received: value,
		});
	}
	return value;
}

function expectBytes(value: unknown, path: string): Uint8Array {
	if (!(value instanceof Uint8Array)) {
		throw new ProtobufCodecError('INVALID_VALUE', 'Expected bytes', { path, received: value });
	}
	return value;
}
