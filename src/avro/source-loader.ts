import { readdir, readFile } from 'node:fs/promises';
import path from 'node:path';

import { SourceParseError } from '../core/errors.js';
import { stripJsonComments } from '../core/jsonc.js';
import type { Logger } from '../core/logger.js';
import { ChunkRegistry } from './chunk-registry.js';
import type { AvroRecord } from './schema.js';

const AVSC_EXTENSION = '.avsc';
const CHUNK_SUFFIX = '.chunk.avsc';

/**
 * One `.avsc` file after chunk expansion, comment stripping and parsing.
 *
 * `canonicalAvsc` is the re-serialised (2-space indented) form that gets copied
 * into `outputs/avsc/` — the flattened schema an external consumer can read
 * without knowing anything about chunks.
 */
export interface AvroSource {
	/** File name without the `.avsc` extension, e.g. `samples`. */
	readonly fileName: string;
	/** Sub-directory of `sources/` the file came from, e.g. `samples`. */
	readonly schemaType: string;
	/** Absolute path of the file on disk. */
	readonly filePath: string;
	/** `schema.name`, e.g. `Samples`. */
	readonly schemaName: string;
	readonly schema: AvroRecord;
	readonly canonicalAvsc: string;
}

export interface LoadResult {
	readonly sources: AvroSource[];
	readonly chunks: ChunkRegistry;
}

export interface LoadOptions {
	readonly sourcesDir: string;
	readonly schemaTypes: readonly string[];
	readonly logger: Logger;
}

/**
 * Discover every schema under `sourcesDir/<schemaType>/`, register the
 * `*.chunk.avsc` fragments first, then expand and parse the remaining files.
 *
 * Directory entries are sorted so the output order does not depend on the
 * filesystem — `readdir` order is not guaranteed and it decides the order of
 * re-exports in the generated `index.ts`.
 */
export async function loadSources(options: LoadOptions): Promise<LoadResult> {
	const { sourcesDir, schemaTypes, logger } = options;
	const chunks = new ChunkRegistry();
	const discovered: Array<{ schemaType: string; filePath: string; fileName: string }> = [];

	for (const schemaType of schemaTypes) {
		const dir = path.join(sourcesDir, schemaType);
		const entries = (await readdir(dir)).sort();

		for (const entry of entries) {
			if (!entry.endsWith(AVSC_EXTENSION)) continue;
			const filePath = path.join(dir, entry);

			if (entry.endsWith(CHUNK_SUFFIX)) {
				const chunkId = entry.slice(0, -CHUNK_SUFFIX.length);
				chunks.add(chunkId, await readFile(filePath, 'utf-8'));
				logger.debug(`registered chunk ${chunkId}`);
				continue;
			}

			discovered.push({
				schemaType,
				filePath,
				fileName: entry.slice(0, -AVSC_EXTENSION.length),
			});
		}
	}

	const sources: AvroSource[] = [];
	for (const { schemaType, filePath, fileName } of discovered) {
		const raw = await readFile(filePath, 'utf-8');
		sources.push(parseSource({ raw, filePath, fileName, schemaType, chunks }));
		logger.debug(`loaded source ${fileName}`);
	}

	return { sources, chunks };
}

interface ParseSourceArgs {
	raw: string;
	filePath: string;
	fileName: string;
	schemaType: string;
	chunks: ChunkRegistry;
}

function parseSource({ raw, filePath, fileName, schemaType, chunks }: ParseSourceArgs): AvroSource {
	const expanded = chunks.expand(raw, filePath);
	const withoutComments = stripJsonComments(expanded);

	let schema: AvroRecord;
	try {
		schema = JSON.parse(withoutComments) as AvroRecord;
	} catch (cause) {
		throw new SourceParseError(`Failed to parse ${fileName}${AVSC_EXTENSION} as JSON`, {
			filePath,
			reason: cause,
		});
	}

	if (typeof schema?.name !== 'string' || schema.type !== 'record') {
		throw new SourceParseError(`${fileName}${AVSC_EXTENSION} is not a named Avro record`, {
			filePath,
		});
	}

	return {
		fileName,
		schemaType,
		filePath,
		schemaName: schema.name,
		schema,
		// Matches the legacy `SourceAvsc.getAvsc()` output byte for byte.
		canonicalAvsc: JSON.stringify(schema, null, 2),
	};
}
