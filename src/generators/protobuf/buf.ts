import { execFile } from 'node:child_process';
import { readFile, rm } from 'node:fs/promises';
import path from 'node:path';
import { promisify } from 'node:util';

import { ExternalToolError } from '../../core/errors.js';
import type { Logger } from '../../core/logger.js';

const execFileAsync = promisify(execFile);

export interface BufGenerateOptions {
	/** Working directory — must contain `buf.gen.yaml`. */
	readonly cwd: string;
	/** Proto file to generate from, relative to `cwd`. */
	readonly protoPath: string;
	/** Directory `buf.gen.yaml` writes into; wiped before each run. */
	readonly outputDir: string;
	/** Path of the generated file to read back, relative to `cwd`. */
	readonly generatedFile: string;
	readonly logger: Logger;
	readonly timeoutMs?: number;
}

const DEFAULT_TIMEOUT_MS = 120_000;

/**
 * Run `buf generate` for a single proto file and return the TypeScript it
 * produced.
 *
 * `buf.gen.yaml` takes the whole `outputs/proto` directory as its input and
 * `--path` narrows that to one file. Because every variant declares the same
 * message names in the same package, only one variant may exist in that
 * directory when buf runs — the pipeline writes the buf-visible variant first
 * and the rest afterwards.
 */
export async function bufGenerate(options: BufGenerateOptions): Promise<string> {
	const { cwd, protoPath, outputDir, generatedFile, logger } = options;

	// Stale output from a previous run would collide with the new symbols.
	await rm(path.resolve(cwd, outputDir), { recursive: true, force: true });

	const args = ['buf', 'generate', '--path', protoPath];
	logger.debug(`npx ${args.join(' ')}`);

	try {
		const { stderr } = await execFileAsync('npx', args, {
			cwd,
			timeout: options.timeoutMs ?? DEFAULT_TIMEOUT_MS,
			maxBuffer: 32 * 1024 * 1024,
		});
		if (stderr.trim()) logger.debug(`buf: ${stderr.trim()}`);
	} catch (cause) {
		// The legacy runner discarded stdout/stderr, so a buf failure surfaced
		// much later as a confusing ENOENT on the file it never wrote.
		throw new ExternalToolError('buf generate failed', {
			command: `npx ${args.join(' ')}`,
			cwd,
			stderr: (cause as { stderr?: string }).stderr?.trim(),
			stdout: (cause as { stdout?: string }).stdout?.trim(),
			reason: cause,
		}, { cause });
	}

	const generatedPath = path.resolve(cwd, generatedFile);
	try {
		return await readFile(generatedPath, 'utf-8');
	} catch (cause) {
		throw new ExternalToolError('buf generate produced no output file', {
			expected: generatedPath,
			reason: cause,
		}, { cause });
	}
}
