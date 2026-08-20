import {
	isArray,
	isEnum,
	isFieldRequired,
	isMap,
	isNullType,
	isRecord,
	isUnion,
	type AvroRecord,
	type AvroType,
} from '../../avro/schema.js';
import type { Logger } from '../../core/logger.js';
import { TsTypeAlias } from './ts-type-alias.js';

/**
 * A field whose TypeScript type is dictated by convention rather than by its
 * Avro type. `attachments` is declared as an opaque JSON string in Avro but is
 * always a JSON object in practice, so consumers get the structured type.
 */
export type FieldTypeOverrides = ReadonlyMap<string, string>;

/**
 * A rewrite applied to an enum's symbol list before it becomes a string-literal
 * union. Used where the wire format and the W3C spelling of a value disagree.
 */
export type EnumSymbolOverrides = ReadonlyMap<string, (symbols: readonly string[]) => string[]>;

export interface TypeScriptOptions {
	readonly schemaVersion: string;
	readonly emitDocs: boolean;
	readonly fieldTypeOverrides: FieldTypeOverrides;
	readonly enumSymbolOverrides: EnumSymbolOverrides;
	/** Whether a module gets its own `export const schemaVersion`. */
	readonly includeSchemaVersion: (schemaName: string) => boolean;
	readonly logger: Logger;
}

export interface TypeScriptModule {
	/** The full module source, ready to be written to disk. */
	readonly code: string;
	/** Every type name the module exports, in declaration order. */
	readonly exports: string[];
}

/** Avro primitive name -> TypeScript type. */
const PRIMITIVE_TS_TYPES: Readonly<Record<string, string>> = {
	boolean: 'boolean',
	string: 'string',
	int: 'number',
	long: 'number',
	float: 'number',
	double: 'number',
	// `bytes` is only ever used for base64/opaque payloads in these schemas.
	bytes: 'string',
};

interface MappedType {
	/** `undefined` when the Avro type has no TypeScript representation. */
	readonly tsType: string | undefined;
	/** The alias generated for an inline record, if the type contained one. */
	readonly alias?: TsTypeAlias;
	/** Aliases the above one depends on, nearest first. */
	readonly dependencies?: TsTypeAlias[];
}

/**
 * Render one Avro record as a standalone TypeScript module: the record's own
 * `export type`, every nested record it reaches, and (for sample schemas) the
 * `schemaVersion` constant.
 */
export function generateTypeScriptModule(
	schema: AvroRecord,
	options: TypeScriptOptions,
): TypeScriptModule {
	const { alias, dependencies } = buildAlias(schema, options);

	const parts: string[] = [];
	const exports: string[] = [];

	if (options.includeSchemaVersion(schema.name)) {
		parts.push(`\nexport const schemaVersion = "${options.schemaVersion}";\n`);
	}

	// Dependencies are collected outermost-first while walking the schema, but
	// are emitted innermost-first so that a reader meets a type before the type
	// that uses it.
	for (const dependency of [...dependencies].reverse()) {
		parts.push(dependency.render());
		exports.push(dependency.name);
	}

	parts.push(alias.render());
	exports.push(alias.name);

	return { code: parts.join('\n'), exports };
}

interface BuiltAlias {
	alias: TsTypeAlias;
	dependencies: TsTypeAlias[];
}

function buildAlias(record: AvroRecord, options: TypeScriptOptions): BuiltAlias {
	const dependencies: TsTypeAlias[] = [];
	const alias = new TsTypeAlias(record.name, options.emitDocs ? record.doc : undefined);

	for (const field of record.fields) {
		const required = isFieldRequired(field);
		const fieldDoc = options.emitDocs ? field.doc : undefined;
		const branches = isUnion(field.type) ? field.type : [field.type];
		const override = options.fieldTypeOverrides.get(field.name);

		const renderedBranches: Array<string | undefined> = [];
		for (const branch of branches) {
			if (isNullType(branch)) continue;

			const mapped: MappedType = override !== undefined
				? { tsType: override }
				: mapType(branch, options);

			if (mapped.alias) {
				dependencies.push(mapped.alias, ...(mapped.dependencies ?? []));
				mapped.alias.setDocIfAbsent(fieldDoc);
			}
			renderedBranches.push(mapped.tsType);
		}

		alias.addProperty({
			name: field.name,
			type: renderedBranches.join(' | '),
			doc: fieldDoc,
			required,
		});
	}

	return { alias, dependencies };
}

function mapType(type: AvroType, options: TypeScriptOptions): MappedType {
	if (isUnion(type)) {
		// A union in a nested type position (e.g. the values of a map). The
		// null branch never renders — optionality is expressed by the field —
		// and duplicates collapse so `int | long` reads `number`, not
		// `number | number`.
		const rendered: string[] = [];
		let alias: TsTypeAlias | undefined;
		const dependencies: TsTypeAlias[] = [];

		for (const branch of type) {
			if (isNullType(branch)) continue;

			const mapped = mapType(branch, options);

			if (mapped.alias) {
				if (alias) dependencies.push(mapped.alias);
				else alias = mapped.alias;
				dependencies.push(...(mapped.dependencies ?? []));
			}
			if (mapped.tsType !== undefined && !rendered.includes(mapped.tsType)) {
				rendered.push(mapped.tsType);
			}
		}

		return {
			tsType: rendered.length > 0 ? rendered.join(' | ') : undefined,
			alias,
			dependencies: dependencies.length > 0 ? dependencies : undefined,
		};
	}

	if (isArray(type)) {
		const items = mapType(type.items, options);
		return {
			tsType: `${items.tsType}[]`,
			alias: items.alias,
			dependencies: items.dependencies,
		};
	}

	if (isEnum(type)) {
		const rewrite = options.enumSymbolOverrides.get(type.name);
		const symbols = rewrite ? rewrite(type.symbols) : type.symbols;
		return { tsType: `"${symbols.join('" | "')}"` };
	}

	if (isRecord(type)) {
		const { alias, dependencies } = buildAlias(type, options);
		return {
			tsType: type.name,
			alias,
			dependencies: dependencies.length > 0 ? dependencies : undefined,
		};
	}

	if (isMap(type)) {
		const values = mapType(type.values, options);
		return {
			tsType: `Record<string, ${values.tsType}>`,
			alias: values.alias,
			dependencies: values.dependencies,
		};
	}

	if (typeof type === 'string') {
		const primitive = PRIMITIVE_TS_TYPES[type];
		if (primitive) return { tsType: primitive };
		options.logger.warn(`No TypeScript mapping for Avro type "${type}"`);
		return { tsType: undefined };
	}

	options.logger.warn(`Unsupported Avro type encountered: ${JSON.stringify(type)}`);
	return { tsType: undefined };
}
