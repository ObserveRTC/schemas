import path from 'node:path';

import type { GeneratedFile } from '../core/file-writer.js';
import { planVersionBump, type TargetPlan } from './npm-package.js';

/**
 * The two codec packages are mirror images of each other: the encoder turns
 * plain samples into protobuf, the decoder turns protobuf back into plain
 * samples. Both consume the same two generated modules under fixed names
 * (`InputSamples.ts` / `OutputSamples.ts`) — only the direction differs.
 */
export type CodecRole = 'encoder' | 'decoder';

export interface CodecLibArgs {
	readonly dir: string;
	readonly role: CodecRole;
	/** Plain TypeScript types generated from the Avro schema. */
	readonly samplesTs: string;
	/** TypeScript generated from the proto schema by protoc-gen-es. */
	readonly protobufTs: string;
	readonly version: string;
}

const INPUT_MODULE = 'InputSamples.ts';
const OUTPUT_MODULE = 'OutputSamples.ts';

export async function planCodecLib(args: CodecLibArgs): Promise<TargetPlan> {
	const srcDir = path.join(args.dir, 'src');
	const [input, output] = args.role === 'encoder'
		? [args.samplesTs, args.protobufTs]
		: [args.protobufTs, args.samplesTs];

	const files: GeneratedFile[] = [
		{ path: path.join(srcDir, INPUT_MODULE), content: input },
		{ path: path.join(srcDir, OUTPUT_MODULE), content: output },
		await planVersionBump(args.dir, args.version),
	];

	// `src/` also holds the hand-written codec implementation, so nothing here
	// is generator-owned — no pruning.
	return { managedDirs: [], files };
}
