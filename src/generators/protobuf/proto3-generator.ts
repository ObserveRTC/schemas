import {
	isArray,
	isEnum,
	isRecord,
	isUnion,
	type AvroField,
	type AvroRecord,
	type AvroType,
} from '../../avro/schema.js';
import { SchemaGenError } from '../../core/errors.js';

export interface Proto3Options {
	readonly schemaVersion: string;
	readonly protoPackage: string;
	/**
	 * Field name -> proto type, applied to scalar fields only (records, arrays
	 * and enums keep their derived type). This is where `callId: bytes` and
	 * `timestamp: double` live.
	 */
	readonly fieldTypeOverrides: ReadonlyMap<string, string>;
	/**
	 * Emit every non-repeated field as `optional`. proto3 needs this for
	 * explicit presence, which the encoder/decoder rely on to tell "absent"
	 * from "zero".
	 */
	readonly allOptional: boolean;
}

/** Avro primitive -> proto3 scalar. */
const PRIMITIVE_PROTO_TYPES: Readonly<Record<string, string>> = {
	string: 'string',
	float: 'float',
	double: 'double',
	long: 'int64',
	boolean: 'bool',
	int: 'int32',
	bytes: 'bytes',
};

interface ProtoField {
	readonly name: string;
	readonly type: string;
	readonly isArray: boolean;
	readonly required: boolean;
}

interface ProtoRenderable {
	readonly name: string;
	render(): string[];
}

/**
 * Render a full `.proto` file for `record`.
 *
 * ```proto
 * syntax = "proto3";
 *
 * package org.observertc.schemas.protobuf;
 *
 * message ClientSample { ... }
 * ```
 */
export function generateProto3File(record: AvroRecord, options: Proto3Options): string {
	const message = buildMessage(record, options, 0);
	return [
		'syntax = "proto3";',
		'',
		`package ${options.protoPackage};`,
		'',
		message.render().join('\n'),
	].join('\n');
}

function buildMessage(record: AvroRecord, options: Proto3Options, level: number): Proto3Message {
	const message = new Proto3Message(record.name, level, options);
	for (const field of record.fields) {
		message.addAvroField(field);
	}
	return message;
}

/**
 * A single proto3 `message`, built field by field from an Avro record.
 *
 * Field numbers are assigned at render time from the field's *sorted* position,
 * not its declaration order: repeated fields first, then required scalars, then
 * optional ones, each group sorted by name. That ordering is what makes the
 * numbering stable across schema edits that only add fields at the end of a
 * group — and it is also why reordering this logic is a wire-breaking change.
 */
class Proto3Message implements ProtoRenderable {
	private readonly fields: ProtoField[] = [];
	private readonly nested: ProtoRenderable[] = [];
	/** field name -> symbols, for the single merged per-message enum. */
	private readonly enumSymbols = new Map<string, readonly string[]>();

	public constructor(
		public readonly name: string,
		private readonly level: number,
		private readonly options: Proto3Options,
	) {}

	public addAvroField(field: AvroField): void {
		const { type, required } = unwrapOptional(field);
		const isRepeated = isArray(type);
		const itemType = isRepeated ? type.items : type;

		if (isEnum(itemType)) {
			// Every enum in a message collapses into one `<Message>Enum` whose
			// values are the union of all its enum fields' symbols. Note the
			// legacy generator lost `repeated`/`optional` for enum fields; that
			// is preserved here because the field numbers depend on it.
			this.enumSymbols.set(field.name, itemType.symbols);
			this.fields.push({
				name: field.name,
				type: this.enumName,
				isArray: false,
				required: false,
			});
			return;
		}

		if (isRecord(itemType)) {
			this.nested.push(buildMessage(itemType, this.options, this.level + 1));
			this.fields.push({
				name: field.name,
				type: itemType.name,
				isArray: isRepeated,
				required,
			});
			return;
		}

		this.fields.push({
			name: field.name,
			type: this.resolveScalarType(field.name, itemType),
			isArray: isRepeated,
			required,
		});
	}

	public render(): string[] {
		const lines: string[] = [];

		if (this.level === 0) {
			lines.push('/**', `* Schema Version: ${this.options.schemaVersion}`, '*/');
		}
		lines.push(`message ${this.name} {`);

		const nested = this.enumSymbols.size > 0
			? [...this.nested, this.renderEnum()]
			: this.nested;
		for (const child of nested) {
			for (const line of child.render()) {
				lines.push(`\t${line}`);
			}
		}

		let fieldNumber = 1;
		for (const field of this.orderedFields()) {
			lines.push(`\t${this.renderField(field, fieldNumber++)}`);
		}

		lines.push('}');
		return lines;
	}

	private get enumName(): string {
		return `${this.name}Enum`;
	}

	private resolveScalarType(fieldName: string, type: AvroType): string {
		const override = this.options.fieldTypeOverrides.get(fieldName);
		if (override) return override;

		if (typeof type !== 'string') {
			throw new SchemaGenError('Cannot map a complex Avro type to a proto scalar', {
				field: fieldName,
				type: JSON.stringify(type),
			});
		}

		const mapped = PRIMITIVE_PROTO_TYPES[type];
		if (!mapped) {
			throw new SchemaGenError(`No proto3 mapping for Avro type "${type}"`, {
				field: fieldName,
			});
		}
		return mapped;
	}

	/** Repeated, then required, then optional; each group sorted by name. */
	private orderedFields(): ProtoField[] {
		const repeated: ProtoField[] = [];
		const required: ProtoField[] = [];
		const optional: ProtoField[] = [];

		for (const field of this.fields) {
			if (field.isArray) repeated.push(field);
			else if (field.required) required.push(field);
			else optional.push(field);
		}

		const byName = (a: ProtoField, b: ProtoField) => (a.name < b.name ? -1 : a.name > b.name ? 1 : 0);
		return [...repeated.sort(byName), ...required.sort(byName), ...optional.sort(byName)];
	}

	private renderField(field: ProtoField, fieldNumber: number): string {
		const parts: string[] = [];
		if (field.isArray) parts.push('repeated');
		else if (this.options.allOptional) parts.push('optional');
		parts.push(field.type, `${field.name} = ${fieldNumber}`);
		return `${parts.join(' ')};`;
	}

	private renderEnum(): ProtoRenderable {
		const lines = [`enum ${this.enumName} {`];
		const seen = new Set<string>();
		let value = 0;

		for (const [fieldName, symbols] of this.enumSymbols) {
			lines.push(`\t/* For ${fieldName} */`);
			for (const symbol of symbols) {
				const constant = symbol.toUpperCase();
				if (seen.has(constant)) continue;
				seen.add(constant);
				lines.push(`\t${constant} = ${value++};`);
			}
		}

		lines.push('}');
		return { name: this.enumName, render: () => lines };
	}
}

/**
 * Peel `["null", T]` down to `T` and report the field as optional. A bare type
 * is required.
 */
function unwrapOptional(field: AvroField): { type: AvroType; required: boolean } {
	if (!isUnion(field.type)) {
		return { type: field.type, required: true };
	}
	if (field.type.length === 2) {
		return { type: field.type[1]!, required: false };
	}
	throw new SchemaGenError('Only ["null", T] unions can be represented in proto3', {
		field: field.name,
		branches: field.type.length,
	});
}
