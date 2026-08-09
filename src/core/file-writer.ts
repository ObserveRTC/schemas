import { mkdir, readFile, readdir, rm, writeFile } from 'node:fs/promises';
import path from 'node:path';

import type { Logger } from './logger.js';

export type WriteMode =
	/** Write everything to disk. */
	| 'write'
	/** Compute everything, write nothing, report what would change. */
	| 'dry-run'
	/** Like `dry-run`, but the caller treats any drift as a failure (CI guard). */
	| 'check';

export interface GeneratedFile {
	/** Absolute path. */
	readonly path: string;
	readonly content: string;
}

export type ChangeKind = 'created' | 'updated' | 'unchanged' | 'removed';

export interface Change {
	readonly path: string;
	readonly kind: ChangeKind;
}

/**
 * The single place that touches the filesystem on the way out.
 *
 * Routing every write through one object buys three things the legacy
 * generator did not have: `--dry-run` and `--check` for free, an accurate
 * summary of what actually changed, and — most importantly — ordering. Deletes
 * are awaited before writes, so a "clean" step can no longer race the "generate"
 * step and remove a file that was just produced.
 */
export class FileWriter {
	private readonly changes: Change[] = [];
	/**
	 * Contents of files removed by {@link pruneQuietly}, kept so that rewriting
	 * the same path is reported against what was there before rather than as a
	 * brand-new file.
	 */
	private readonly shadow = new Map<string, string>();

	public constructor(
		private readonly root: string,
		private readonly mode: WriteMode,
		private readonly logger: Logger,
	) {}

	public get isDryRun(): boolean {
		return this.mode !== 'write';
	}

	public get allChanges(): readonly Change[] {
		return this.changes;
	}

	public get modifiedPaths(): string[] {
		return this.changes
			.filter((change) => change.kind !== 'unchanged')
			.map((change) => change.path);
	}

	public async write(file: GeneratedFile): Promise<void> {
		const onDisk = await readIfExists(file.path);
		const previous = onDisk ?? this.shadow.get(file.path);
		const kind: ChangeKind = previous === undefined
			? 'created'
			: previous === file.content
				? 'unchanged'
				: 'updated';

		this.record(file.path, kind);
		if (this.isDryRun) return;

		// "Unchanged" describes the content, not the filesystem: a file staged
		// out of the way by `pruneQuietly` is absent from disk even when its
		// content is identical, and still has to be put back.
		if (kind === 'unchanged' && onDisk !== undefined) return;

		await mkdir(path.dirname(file.path), { recursive: true });
		await writeFile(file.path, file.content, 'utf-8');
	}

	public async writeAll(files: Iterable<GeneratedFile>): Promise<void> {
		for (const file of files) {
			await this.write(file);
		}
	}

	/** Remove one path if it exists. Directories are removed recursively. */
	public async remove(target: string): Promise<void> {
		const existing = await readdirIfExists(target);
		if (existing === undefined && (await readIfExists(target)) === undefined) return;

		this.record(target, 'removed');
		if (this.isDryRun) return;
		await rm(target, { recursive: true, force: true });
	}

	/**
	 * Delete the regular files directly inside `dir` that are not in `keep`,
	 * leaving sub-directories alone. Missing directories are not an error.
	 *
	 * Pruning against the set of files this run produces (rather than deleting
	 * everything up front and rewriting) means `--check` reports genuine drift
	 * only, and a crash mid-run cannot leave the tree emptied.
	 */
	public async prune(dir: string, keep: ReadonlySet<string>): Promise<void> {
		await this.pruneInternal(dir, keep, true);
	}

	/**
	 * Prune without recording the deletions.
	 *
	 * Used for files that are removed only to be written again in the same run
	 * — staging for an external tool, not a real change. Recording them would
	 * make `--check` report drift that does not exist.
	 */
	public async pruneQuietly(dir: string, keep: ReadonlySet<string>): Promise<void> {
		await this.pruneInternal(dir, keep, false);
	}

	private async pruneInternal(
		dir: string,
		keep: ReadonlySet<string>,
		record: boolean,
	): Promise<void> {
		const entries = await readdirIfExists(dir);
		if (entries === undefined) return;

		for (const entry of entries) {
			if (!entry.isFile()) continue;
			const target = path.join(dir, entry.name);
			if (keep.has(target)) continue;

			if (record) {
				this.record(target, 'removed');
			} else {
				const previous = await readIfExists(target);
				if (previous !== undefined) this.shadow.set(target, previous);
			}

			if (!this.isDryRun) await rm(target, { force: true });
		}
	}

	public async ensureDir(dir: string): Promise<void> {
		if (this.isDryRun) return;
		await mkdir(dir, { recursive: true });
	}

	public summarise(): string {
		const counts = new Map<ChangeKind, number>();
		for (const { kind } of this.changes) {
			counts.set(kind, (counts.get(kind) ?? 0) + 1);
		}
		const parts = (['created', 'updated', 'removed', 'unchanged'] as const)
			.filter((kind) => counts.has(kind))
			.map((kind) => `${counts.get(kind)} ${kind}`);
		return parts.length > 0 ? parts.join(', ') : 'nothing to do';
	}

	private record(target: string, kind: ChangeKind): void {
		const relative = path.relative(this.root, target) || target;
		this.changes.push({ path: relative, kind });
		if (kind !== 'unchanged') {
			this.logger.debug(`${kind.padEnd(9)} ${relative}`);
		}
	}
}

async function readIfExists(target: string): Promise<string | undefined> {
	try {
		return await readFile(target, 'utf-8');
	} catch {
		return undefined;
	}
}

async function readdirIfExists(dir: string) {
	try {
		return await readdir(dir, { withFileTypes: true });
	} catch {
		return undefined;
	}
}
