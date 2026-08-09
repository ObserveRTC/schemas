import { readFile } from 'node:fs/promises';
import path from 'node:path';

import { SchemaGenError } from '../core/errors.js';
import type { GeneratedFile } from '../core/file-writer.js';

export const PACKAGE_JSON = 'package.json';

export interface TargetPlan {
	/**
	 * Directories the generator fully owns. Any file in them that this run does
	 * not produce is stale and gets pruned, which is how a renamed or deleted
	 * schema stops being published.
	 */
	readonly managedDirs: readonly string[];
	readonly files: readonly GeneratedFile[];
}

/**
 * Read a package manifest, set its `version`, and return it as a file to write.
 *
 * Serialised with a 2-space indent and a trailing newline — the convention npm
 * itself writes, and the reason the file stops showing up as modified on every
 * run the way it did when the trailing newline was omitted.
 */
export async function planVersionBump(packageDir: string, version: string): Promise<GeneratedFile> {
	const manifestPath = path.join(packageDir, PACKAGE_JSON);

	let manifest: Record<string, unknown>;
	try {
		manifest = JSON.parse(await readFile(manifestPath, 'utf-8')) as Record<string, unknown>;
	} catch (cause) {
		throw new SchemaGenError(`Could not read ${manifestPath}`, { reason: cause }, { cause });
	}

	manifest.version = version;
	return { path: manifestPath, content: `${JSON.stringify(manifest, null, 2)}\n` };
}

/** Module specifier for an `export * from` line — always POSIX separators. */
export function moduleSpecifier(...segments: string[]): string {
	return `./${segments.join('/')}`;
}
