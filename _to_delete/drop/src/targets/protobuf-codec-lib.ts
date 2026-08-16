import path from 'node:path';

import type { GeneratedFile } from '../core/file-writer.js';
import { planVersionBump, type TargetPlan } from './npm-package.js';

/**
 * `@observertc/samples-protobuf-codec` — one package that both encodes plain
 * samples into protobuf and decodes them back, superseding the separate
 * `samples-encoder` and `samples-decoder` packages.
 *
 * Only two modules are generated. Everything else in the package is
 * hand-written and schema-agnostic: the codec reads the field list, the scalar
 * types and the nesting off the protobuf descriptor at runtime, so adding a
 * field upstream reaches the published codec through this file alone.
 */
export interface ProtobufCodecLibArgs {
	readonly dir: string;
	/** Plain TypeScript types generated from the Avro schema. */
	readonly samplesTs: string;
	/** TypeScript generated from the all-optional proto by protoc-gen-es. */
	readonly protobufTs: string;
	readonly version: string;
}

/**
 * Named for what they hold rather than for a direction. The predecessor
 * packages called the same two modules `InputSamples` and `OutputSamples`, and
 * which was which depended on whether you were reading the encoder or the
 * decoder — a merged package cannot keep that up.
 */
const SAMPLES_MODULE = 'samples.ts';
const PROTOBUF_MODULE = 'protobuf.ts';
const GENERATED_DIR = 'generated';

export async function planProtobufCodecLib(args: ProtobufCodecLibArgs): Promise<TargetPlan> {
	const generatedDir = path.join(args.dir, 'src', GENERATED_DIR);

	const files: GeneratedFile[] = [
		{ path: path.join(generatedDir, SAMPLES_MODULE), content: args.samplesTs },
		{ path: path.join(generatedDir, PROTOBUF_MODULE), content: args.protobufTs },
		await planVersionBump(args.dir, args.version),
	];

	// `src/generated` holds nothing but these two modules, so it is safe to
	// prune — that is how a renamed generated module stops being published.
	return { managedDirs: [generatedDir], files };
}
