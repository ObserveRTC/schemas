/**
 * `avro-js` ships no type declarations. Only `parse` is used, and only to make
 * it throw on an invalid schema, so the surface declared here is deliberately
 * minimal rather than a full port of the library's API.
 */
declare module 'avro-js' {
	export function parse(schema: unknown): unknown;
	const avro: { parse: typeof parse };
	export default avro;
}
