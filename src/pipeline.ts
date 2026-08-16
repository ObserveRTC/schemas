import { readFile } from 'node:fs/promises';
import path from 'node:path';

import { loadSources, type AvroSource } from './avro/source-loader.js';
import { validateSources } from './avro/validator.js';
import { ARTIFACT_REQUIRES, type Artifact, type GeneratorConfig } from './config.js';
import { UsageError } from './core/errors.js';
import { FileWriter, type GeneratedFile, type WriteMode } from './core/file-writer.js';
import type { Logger } from './core/logger.js';
import { generateMarkdownDoc } from './generators/markdown/generate.js';
import { bufGenerate } from './generators/protobuf/buf.js';
import { generateProto3File } from './generators/protobuf/proto3-generator.js';
import { generateTypeScriptModule } from './generators/typescript/generate.js';
import { planJsonCodecLib } from './targets/json-codec-lib.js';
import { planProtobufCodecLib } from './targets/protobuf-codec-lib.js';
import { planSamplesLib, type SamplesLibEntry } from './targets/samples-lib.js';
import type { TargetPlan } from './targets/npm-package.js';

export interface PipelineOptions {
	readonly config: GeneratorConfig;
	readonly logger: Logger;
	readonly mode: WriteMode;
	readonly artifacts: ReadonlySet<Artifact>;
	/** Abort on an invalid Avro schema instead of warning and skipping it. */
	readonly strictValidation: boolean;
}

export interface PipelineResult {
	readonly sources: readonly AvroSource[];
	readonly version: string;
	readonly changedPaths: readonly string[];
	readonly summary: string;
}

/** Per-schema products, computed once and consumed by several targets. */
interface RenderedSchema {
	readonly source: AvroSource;
	readonly typescript: string;
	readonly exports: string[];
	readonly markdown: string;
	readonly outline: string[];
}

/**
 * The whole generation run, in one readable sequence.
 *
 * Everything is computed first and written last, through a single
 * {@link FileWriter}. Nothing here reaches for `fs` directly, which is what
 * makes `--dry-run` and `--check` truthful rather than approximate.
 */
export async function runPipeline(options: PipelineOptions): Promise<PipelineResult> {
	const { config, logger, artifacts } = options;
	assertArtifactDependencies(artifacts);

	const writer = new FileWriter(config.root, options.mode, logger);

	const version = (await readFile(config.versionFile, 'utf-8')).trim();
	logger.info(`schema version ${version}`);

	const { sources: discovered, chunks } = await loadSources({
		sourcesDir: config.sourcesDir,
		schemaTypes: config.schemaTypes,
		logger,
	});
	logger.info(
		`loaded ${discovered.length} schema(s) and ${chunks.size} chunk(s) from ${path.relative(config.root, config.sourcesDir)}`,
	);

	const sources = await validateSources(discovered, {
		logger,
		strict: options.strictValidation,
	});

	const rendered = sources.map((source) => renderSchema(source, config, version, logger));
	const files: GeneratedFile[] = [];
	const managedDirs: string[] = [];

	if (artifacts.has('avsc')) {
		for (const { source } of rendered) {
			files.push({
				path: path.join(config.avscOutputDir, `${source.schemaName}.avsc`),
				content: source.canonicalAvsc,
			});
		}
		managedDirs.push(config.avscOutputDir);
	}

	if (artifacts.has('typescript')) {
		for (const { source, typescript } of rendered) {
			files.push({
				path: path.join(config.typescriptOutputDir, `${source.schemaName}.ts`),
				content: typescript,
			});
		}
		managedDirs.push(config.typescriptOutputDir);
	}

	if (artifacts.has('markdown')) {
		files.push({
			path: config.schemaListFile,
			content: rendered.flatMap((schema) => schema.outline).join('\n'),
		});
	}

	// Paths already written out of band (the proto buf compiles) that the final
	// prune must not treat as stale.
	const alreadyWritten = new Set<string>();

	const protobuf = artifacts.has('proto')
		? await generateProtobuf({ config, logger, rendered, version, writer })
		: undefined;
	if (protobuf) {
		files.push(...protobuf.files);
		alreadyWritten.add(protobuf.bufProtoPath);
		managedDirs.push(config.protoOutputDir);
	}

	if (artifacts.has('samples-lib')) {
		const plan = await planSamplesLib({
			dir: config.samplesLibDir,
			entries: rendered.map(toSamplesLibEntry),
			w3cStatsIdentifiers: await readFile(config.w3cStatsIdentifiersFile, 'utf-8'),
			version,
			changelog: await readFile(config.changelogFile, 'utf-8'),
		});
		collect(plan, files, managedDirs);
	}

	if (artifacts.has('protobuf-codec')) {
		const protobufTs = protobuf?.generatedTs;
		if (!protobufTs) {
			// Only reachable in a dry run on a tree with no previous buf output
			// (`temp/` is gitignored, so a fresh checkout has none). Skipping is
			// better than failing: everything else can still be checked.
			if (!writer.isDryRun) {
				throw new UsageError(
					'The protobuf-codec package needs the buf-generated TypeScript, which was not produced',
				);
			}
			logger.warn('skipping the protobuf-codec package — no protobuf TypeScript available');
		} else {
			collect(
				await planProtobufCodecLib({
					dir: config.protobufCodecLibDir,
					samplesTs: requireRootSchema(rendered, config).typescript,
					protobufTs,
					version,
				}),
				files,
				managedDirs,
			);
		}
	}

	if (artifacts.has('json-codec')) {
		collect(
			await planJsonCodecLib({
				dir: config.jsonCodecLibDir,
				samplesTs: requireRootSchema(rendered, config).typescript,
				version,
			}),
			files,
			managedDirs,
		);
	}

	// The stamp embeds the current time, so it would make `--check` report drift
	// on every run. It is only meaningful for a real write anyway.
	if (!writer.isDryRun) {
		files.push({
			path: config.generatedStampFile,
			content: `Generated from schema version ${version} at ${new Date().toUTCString()}`,
		});
	}

	await writer.writeAll(files);
	await pruneManagedDirs(writer, managedDirs, files, alreadyWritten);

	return {
		sources,
		version,
		changedPaths: writer.modifiedPaths,
		summary: writer.summarise(),
	};
}

function renderSchema(
	source: AvroSource,
	config: GeneratorConfig,
	version: string,
	logger: Logger,
): RenderedSchema {
	const scoped = logger.child(source.schemaName);

	const { markdown, outline } = generateMarkdownDoc(source.schema, { logger: scoped });
	const { code, exports } = generateTypeScriptModule(source.schema, {
		schemaVersion: version,
		emitDocs: config.emitDocs,
		fieldTypeOverrides: config.typescript.fieldTypeOverrides,
		enumSymbolOverrides: config.typescript.enumSymbolOverrides,
		includeSchemaVersion: config.typescript.includeSchemaVersion,
		logger: scoped,
	});

	return { source, typescript: code, exports, markdown, outline };
}

interface ProtobufArgs {
	config: GeneratorConfig;
	logger: Logger;
	rendered: readonly RenderedSchema[];
	version: string;
	writer: FileWriter;
}

interface ProtobufResult {
	readonly files: GeneratedFile[];
	/** The protoc-gen-es output, or undefined in dry-run (buf never ran). */
	readonly generatedTs?: string;
	/** Already written before buf ran; kept so the final prune spares it. */
	readonly bufProtoPath: string;
}

/**
 * Produce the `.proto` variants and, from one of them, the TypeScript models.
 *
 * Order is load-bearing: `buf.gen.yaml` feeds the whole `outputs/proto`
 * directory to buf, and every variant declares the same messages in the same
 * package. The buf-visible variant is therefore written and compiled while it
 * is alone in the directory; the others land afterwards.
 */
async function generateProtobuf(args: ProtobufArgs): Promise<ProtobufResult> {
	const { config, logger, rendered, version, writer } = args;
	const root = requireRootSchema(rendered, config);
	const files: GeneratedFile[] = [];

	const renderVariant = (allOptional: boolean): string =>
		generateProto3File(root.source.schema, {
			schemaVersion: version,
			protoPackage: config.protobuf.protoPackage,
			fieldTypeOverrides: config.protobuf.fieldTypeOverrides,
			allOptional,
		});

	const bufProtoPath = path.join(config.protoOutputDir, `${config.protobuf.bufVariant}.proto`);
	const generatedTsPath = path.join(
		config.tempDir,
		'outputs',
		'proto',
		`${config.protobuf.bufVariant}_pb.ts`,
	);

	// Stale variants from an earlier run would also collide, so clear first.
	// They are rewritten below, hence "quietly".
	await writer.pruneQuietly(config.protoOutputDir, new Set([bufProtoPath]));
	await writer.write({ path: bufProtoPath, content: renderVariant(true) });

	let generatedTs: string | undefined;
	if (writer.isDryRun) {
		// buf writes real files, so it never runs in a dry run. Fall back to the
		// output of the previous run so the downstream plans stay comparable.
		generatedTs = await readFile(generatedTsPath, 'utf-8').catch(() => undefined);
		logger.info(
			generatedTs
				? 'dry run — reusing the previously generated protobuf TypeScript'
				: 'dry run — skipping buf generate (no previous output to reuse)',
		);
	} else {
		generatedTs = await bufGenerate({
			cwd: config.root,
			protoPath: path.relative(config.root, bufProtoPath),
			outputDir: path.relative(config.root, config.tempDir),
			generatedFile: path.relative(config.root, generatedTsPath),
			logger,
		});
		logger.info(`buf generated ${config.protobuf.bufVariant}_pb.ts`);
	}

	for (const variant of config.protobuf.extraVariants) {
		files.push({
			path: path.join(config.protoOutputDir, `${variant.name}.proto`),
			content: renderVariant(variant.allOptional),
		});
	}

	return { files, generatedTs, bufProtoPath };
}

function requireRootSchema(
	rendered: readonly RenderedSchema[],
	config: GeneratorConfig,
): RenderedSchema {
	const root = rendered.find(
		(schema) => schema.source.fileName === config.protobuf.rootSchema,
	);
	if (!root) {
		throw new UsageError(`No "${config.protobuf.rootSchema}" schema found in sources`, {
			available: rendered.map((schema) => schema.source.fileName),
		});
	}
	return root;
}

function toSamplesLibEntry(schema: RenderedSchema): SamplesLibEntry {
	return {
		schemaName: schema.source.schemaName,
		schemaType: schema.source.schemaType,
		exports: schema.exports,
		typescript: schema.typescript,
		markdown: schema.markdown,
	};
}

function collect(plan: TargetPlan, files: GeneratedFile[], managedDirs: string[]): void {
	files.push(...plan.files);
	managedDirs.push(...plan.managedDirs);
}

async function pruneManagedDirs(
	writer: FileWriter,
	managedDirs: readonly string[],
	files: readonly GeneratedFile[],
	alreadyWritten: ReadonlySet<string>,
): Promise<void> {
	const produced = new Set([...files.map((file) => file.path), ...alreadyWritten]);
	for (const dir of new Set(managedDirs)) {
		await writer.prune(dir, produced);
	}
}

function assertArtifactDependencies(artifacts: ReadonlySet<Artifact>): void {
	for (const [artifact, requirements] of Object.entries(ARTIFACT_REQUIRES)) {
		if (!artifacts.has(artifact as Artifact)) continue;
		const missing = (requirements ?? []).filter((requirement) => !artifacts.has(requirement));
		if (missing.length > 0) {
			throw new UsageError(
				`Artifact "${artifact}" also requires: ${missing.join(', ')}`,
			);
		}
	}
}
