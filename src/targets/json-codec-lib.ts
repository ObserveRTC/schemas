import path from 'node:path';

import type { GeneratedFile } from '../core/file-writer.js';
import { planVersionBump, type TargetPlan } from './npm-package.js';

/**
 * `@observertc/samples-json-codec` — the same delta codec as the protobuf one,
 * over plain JSON.
 *
 * Exactly one generated module, and no `proto` dependency: JSON is
 * self-describing, so the codec needs the sample *types* for its public
 * signatures and nothing else at runtime. That is what lets the package ship
 * with no dependencies at all.
 */
export interface JsonCodecLibArgs {
	readonly dir: string;
	/** Plain TypeScript types generated from the Avro schema. */
	readonly samplesTs: string;
	readonly version: string;
}

const SAMPLES_MODULE = 'samples.ts';
const GENERATED_DIR = 'generated';

export async function planJsonCodecLib(args: JsonCodecLibArgs): Promise<TargetPlan> {
	const generatedDir = path.join(args.dir, 'src', GENERATED_DIR);

	const files: GeneratedFile[] = [
		{ path: path.join(generatedDir, SAMPLES_MODULE), content: args.samplesTs },
		await planVersionBump(args.dir, args.version),
	];

	// `src/generated` holds nothing but this module, so pruning it is how a
	// renamed generated module stops being published.
	return { managedDirs: [generatedDir], files };
}
