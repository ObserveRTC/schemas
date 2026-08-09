import { SourceParseError } from '../core/errors.js';

/**
 * Matches a chunk placeholder as it appears inside an `.avsc` file, e.g.
 *
 * ```json
 * { "type": "array", "items": "@include-chunk PeerConnectionSample" }
 * ```
 *
 * The placeholder occupies a whole JSON string value; expansion splices the
 * referenced chunk's raw text in its place, so the chunk must itself be a
 * complete JSON value.
 */
const INCLUDE_PATTERN = /"@include-chunk ([\w-]+)"/g;

/** The legacy generator silently produced garbage on a cyclic include. */
const MAX_EXPANSION_DEPTH = 32;

/**
 * Registry of reusable schema fragments loaded from `*.chunk.avsc`.
 *
 * Unlike the module-level `Map` it replaces, a registry is an ordinary object:
 * two pipelines in the same process no longer share (or collide in) one global
 * namespace, and `expand` resolves nested includes instead of stopping after a
 * single pass.
 */
export class ChunkRegistry {
	private readonly chunks = new Map<string, string>();

	public add(chunkId: string, contents: string): void {
		if (this.chunks.has(chunkId)) {
			throw new SourceParseError(`Chunk "${chunkId}" has already been registered`, {
				chunkId,
			});
		}
		this.chunks.set(chunkId, contents);
	}

	public has(chunkId: string): boolean {
		return this.chunks.has(chunkId);
	}

	public get ids(): string[] {
		return [...this.chunks.keys()];
	}

	public get size(): number {
		return this.chunks.size;
	}

	/**
	 * Replace every `@include-chunk <id>` placeholder in `source`, repeating
	 * until no placeholders remain so that chunks may reference other chunks.
	 */
	public expand(source: string, origin: string): string {
		let result = source;

		for (let depth = 0; depth <= MAX_EXPANSION_DEPTH; ++depth) {
			const references = collectReferences(result);
			if (references.size === 0) return result;

			for (const chunkId of references) {
				const chunk = this.chunks.get(chunkId);
				if (chunk === undefined) {
					throw new SourceParseError(`Unknown chunk "${chunkId}"`, {
						origin,
						chunkId,
						knownChunks: this.ids,
					});
				}
				result = result.split(`"@include-chunk ${chunkId}"`).join(chunk);
			}
		}

		throw new SourceParseError(
			`Chunk expansion did not terminate after ${MAX_EXPANSION_DEPTH} passes — the includes are probably cyclic`,
			{ origin, pending: [...collectReferences(result)] },
		);
	}
}

function collectReferences(source: string): Set<string> {
	const references = new Set<string>();
	// `matchAll` gets a fresh iterator each call, so there is no shared
	// `lastIndex` to reset — the legacy code reused one global regex across two
	// different strings and could skip matches because of it.
	for (const match of source.matchAll(INCLUDE_PATTERN)) {
		references.add(match[1]!);
	}
	return references;
}
