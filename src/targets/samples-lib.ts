import path from 'node:path';

import type { GeneratedFile } from '../core/file-writer.js';
import { moduleSpecifier, planVersionBump, type TargetPlan } from './npm-package.js';

/** One schema's contribution to the published `@observertc/sample-schemas-js`. */
export interface SamplesLibEntry {
	readonly schemaName: string;
	/** Sub-directory inside `src/`, e.g. `samples`. */
	readonly schemaType: string;
	/** Type names the generated module exports, for the README table of contents. */
	readonly exports: readonly string[];
	readonly typescript: string;
	readonly markdown: string;
}

export interface SamplesLibArgs {
	readonly dir: string;
	readonly entries: readonly SamplesLibEntry[];
	readonly w3cStatsIdentifiers: string;
	readonly version: string;
	readonly changelog?: string;
	/** Sub-directories of `src/` cleared of stale modules before writing. */
	readonly managedDirs?: readonly string[];
}

const README = 'README.md';
const INDEX = 'index.ts';
const W3C_MODULE = ['w3c', 'W3cStatsIdentifiers'] as const;
const DEFAULT_MANAGED_DIRS = ['reports', 'samples'] as const;

/**
 * Lay out the schema library package: one module per schema, the W3C stats
 * identifiers, a barrel `index.ts`, a README assembled from the per-schema
 * Markdown, and a version bump.
 */
export async function planSamplesLib(args: SamplesLibArgs): Promise<TargetPlan> {
	const srcDir = path.join(args.dir, 'src');
	const files: GeneratedFile[] = [];
	const exportLines: string[] = [];
	const tableOfContents = new Map<string, string[]>();
	const schemaSections: string[] = [];

	for (const entry of args.entries) {
		files.push({
			path: path.join(srcDir, entry.schemaType, `${entry.schemaName}.ts`),
			content: entry.typescript,
		});
		exportLines.push(
			`export * from "${moduleSpecifier(entry.schemaType, entry.schemaName)}";`,
		);
		schemaSections.push(entry.markdown, '\n');

		const bucket = tableOfContents.get(entry.schemaType) ?? [];
		bucket.push(...entry.exports);
		tableOfContents.set(entry.schemaType, bucket);
	}

	files.push({
		path: path.join(srcDir, ...W3C_MODULE) + '.ts',
		content: args.w3cStatsIdentifiers,
	});
	exportLines.push(`export * as W3CStats from "${moduleSpecifier(...W3C_MODULE)}";`);

	files.push({
		path: path.join(args.dir, README),
		content: renderReadme({ tableOfContents, schemaSections, changelog: args.changelog }),
	});

	files.push(await planVersionBump(args.dir, args.version));
	exportLines.push(`export const version = "${args.version}";`);

	files.push({ path: path.join(srcDir, INDEX), content: exportLines.join('\n') });

	const managed = args.managedDirs ?? DEFAULT_MANAGED_DIRS;
	return {
		managedDirs: managed.map((dir) => path.join(srcDir, dir)),
		files,
	};
}

interface ReadmeArgs {
	tableOfContents: ReadonlyMap<string, readonly string[]>;
	schemaSections: readonly string[];
	changelog?: string;
}

function renderReadme({ tableOfContents, schemaSections, changelog }: ReadmeArgs): string {
	const lines: string[] = [
		'ObserveRTC Schemas',
		'---',
		'Javascript bindings for ObserveRTC schemas',
	];

	for (const [schemaType, typeNames] of tableOfContents) {
		lines.push(`- [${schemaType}](#${schemaType})`);
		for (const typeName of typeNames) {
			lines.push(`\t* [${typeName}](#${typeName})`);
		}
	}

	if (changelog) lines.push('- [Changelog](#Changelog)');

	lines.push(...schemaSections);

	if (changelog) lines.push('## Changelog', changelogBody(changelog));

	return lines.join('\n');
}

/**
 * The changelog file starts with an `# Changelog` title and a short preamble
 * aimed at contributors. Both are noise once the file is spliced under the
 * README's own `## Changelog` heading — and the stray `#` would break the
 * README's heading hierarchy — so everything before the first version section
 * is dropped.
 */
function changelogBody(changelog: string): string {
	const firstSection = changelog.search(/^## /m);
	return firstSection === -1 ? changelog : changelog.slice(firstSection);
}
