import { SchemaValidationError } from '../core/errors.js';
import type { Logger } from '../core/logger.js';
import type { AvroSource } from './source-loader.js';

type AvroJs = { parse(schema: unknown): unknown };

let cachedAvro: AvroJs | null | undefined;

/**
 * `avro-js` is a CommonJS package with no type declarations and it is only ever
 * needed for validation, so it is imported lazily: `--no-validate` runs, and
 * environments where the dependency is missing, never pay for it.
 */
async function loadAvroJs(): Promise<AvroJs | null> {
	if (cachedAvro !== undefined) return cachedAvro;
	try {
		const module = (await import('avro-js')) as unknown as { default?: AvroJs } & AvroJs;
		cachedAvro = module.default ?? module;
	} catch {
		cachedAvro = null;
	}
	return cachedAvro;
}

export interface ValidateOptions {
	readonly logger: Logger;
	/**
	 * When false an invalid schema is reported as a warning and the source is
	 * dropped, mirroring the legacy behaviour. When true (the default) the first
	 * invalid schema aborts the run.
	 */
	readonly strict?: boolean;
}

/**
 * Validate every source with `avro-js`.
 *
 * Returns the sources that passed. The legacy generator swallowed validation
 * failures with a `console.warn` and carried on, which meant a broken schema
 * silently deleted types from the published npm package; strict mode is now the
 * default and the lenient path has to be asked for explicitly.
 */
export async function validateSources(
	sources: readonly AvroSource[],
	{ logger, strict = true }: ValidateOptions,
): Promise<AvroSource[]> {
	const avro = await loadAvroJs();
	if (!avro) {
		logger.warn('avro-js is not installed — skipping Avro validation');
		return [...sources];
	}

	const valid: AvroSource[] = [];
	for (const source of sources) {
		try {
			avro.parse(source.schema);
			valid.push(source);
			logger.debug(`${source.schemaName} is a valid Avro schema`);
		} catch (cause) {
			const error = new SchemaValidationError(
				`${source.schemaName} is not a valid Avro schema`,
				{ filePath: source.filePath, reason: cause },
				{ cause },
			);
			if (strict) throw error;
			logger.warn(error.describe());
		}
	}
	return valid;
}
