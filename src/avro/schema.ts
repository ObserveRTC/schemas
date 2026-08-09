/**
 * A deliberately small, structural model of the Avro subset this repository
 * actually uses. It is not a complete Avro implementation — `avro-js` remains
 * the authority for validation (see `./validator.ts`). The point of these types
 * is to make the generators total: every branch a generator handles is visible
 * in the type system instead of hiding behind `typeof x === 'object'`.
 */

export type AvroPrimitiveName =
	| 'null'
	| 'boolean'
	| 'int'
	| 'long'
	| 'float'
	| 'double'
	| 'bytes'
	| 'string';

const PRIMITIVE_NAMES = new Set<string>([
	'null',
	'boolean',
	'int',
	'long',
	'float',
	'double',
	'bytes',
	'string',
]);

export interface AvroRecord {
	type: 'record';
	name: string;
	namespace?: string;
	doc?: string;
	fields: AvroField[];
}

export interface AvroEnum {
	type: 'enum';
	name: string;
	doc?: string;
	symbols: string[];
}

export interface AvroArray {
	type: 'array';
	items: AvroType;
}

export interface AvroMap {
	type: 'map';
	values: AvroType;
}

export type AvroComplexType = AvroRecord | AvroEnum | AvroArray | AvroMap;

/**
 * A type position in a schema: a primitive name, a reference to a named type,
 * an inline complex type, or a union of any of those.
 */
export type AvroType = string | AvroComplexType | AvroType[];

export interface AvroField {
	name: string;
	doc?: string;
	type: AvroType;
	/**
	 * Avro's `default`. Its *presence* — not its value — is what this repo uses
	 * to mean "optional", which is why the model keeps it as `unknown` and the
	 * check is always `'default' in field`.
	 */
	default?: unknown;
}

export function isUnion(type: AvroType): type is AvroType[] {
	return Array.isArray(type);
}

export function isComplex(type: AvroType): type is AvroComplexType {
	return typeof type === 'object' && type !== null && !Array.isArray(type);
}

export function isRecord(type: AvroType): type is AvroRecord {
	return isComplex(type) && type.type === 'record';
}

export function isEnum(type: AvroType): type is AvroEnum {
	return isComplex(type) && type.type === 'enum';
}

export function isArray(type: AvroType): type is AvroArray {
	return isComplex(type) && type.type === 'array';
}

export function isMap(type: AvroType): type is AvroMap {
	return isComplex(type) && type.type === 'map';
}

export function isPrimitiveName(type: AvroType): type is AvroPrimitiveName {
	return typeof type === 'string' && PRIMITIVE_NAMES.has(type);
}

export function isNullType(type: AvroType): boolean {
	return type === 'null';
}

/**
 * A field is optional when it declares a `default`. This matches the legacy
 * generator (`field.default === undefined` meant required) but is explicit
 * about the case of `"default": null`, which is by far the most common form in
 * `sources/samples/*.avsc`.
 */
export function isFieldRequired(field: AvroField): boolean {
	return field.default === undefined;
}

/**
 * The non-null members of a union, in declaration order. For a non-union type
 * this is just the type itself.
 */
export function nonNullBranches(type: AvroType): AvroType[] {
	const branches = isUnion(type) ? type : [type];
	return branches.filter((branch) => !isNullType(branch));
}

/** Walk every record reachable from `root`, depth first, root included. */
export function* walkRecords(root: AvroType): Generator<AvroRecord> {
	if (isUnion(root)) {
		for (const branch of root) yield* walkRecords(branch);
		return;
	}
	if (isArray(root)) {
		yield* walkRecords(root.items);
		return;
	}
	if (isMap(root)) {
		yield* walkRecords(root.values);
		return;
	}
	if (!isRecord(root)) return;
	yield root;
	for (const field of root.fields) {
		yield* walkRecords(field.type);
	}
}
