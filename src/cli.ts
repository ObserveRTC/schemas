#!/usr/bin/env node
import { readFile } from 'node:fs/promises';
import { pathToFileURL } from 'node:url';
import { parseArgs } from 'node:util';

import { loadSources } from './avro/source-loader.js';
import { validateSources } from './avro/validator.js';
import { ARTIFACTS, resolveConfig, type Artifact, type GeneratorConfig } from './config.js';
import { SchemaGenError, UsageError } from './core/errors.js';
import { FileWriter, type WriteMode } from './core/file-writer.js';
import { Logger, type LogLevel } from './core/logger.js';
import { generateMarkdownDoc } from './generators/markdown/generate.js';
import { runPipeline } from './pipeline.js';

const COMMANDS = ['generate', 'validate', 'list', 'clean'] as const;
type Command = (typeof COMMANDS)[number];

const OPTIONS = {
	root: { type: 'string' },
	only: { type: 'string' },
	skip: { type: 'string' },
	'dry-run': { type: 'boolean' },
	check: { type: 'boolean' },
	'no-docs': { type: 'boolean' },
	lenient: { type: 'boolean' },
	'fail-on-warn': { type: 'boolean' },
	json: { type: 'boolean' },
	verbose: { type: 'boolean' },
	quiet: { type: 'boolean' },
	version: { type: 'boolean' },
	help: { type: 'boolean', short: 'h' },
} as const;

interface Options {
	root?: string;
	only?: string;
	skip?: string;
	'dry-run'?: boolean;
	check?: boolean;
	'no-docs'?: boolean;
	lenient?: boolean;
	'fail-on-warn'?: boolean;
	json?: boolean;
	verbose?: boolean;
	quiet?: boolean;
	version?: boolean;
	help?: boolean;
}

const USAGE = `
observertc-schemagen — generate language bindings from the Avro sources

Usage
  schemagen [command] [options]

Commands
  generate            Generate every artifact (default)
  validate            Parse and validate the schemas, write nothing
  list                Show the discovered schemas, chunks and artifacts
  clean               Remove generated outputs

Selection
  --root <dir>        Repository root (default: current directory)
  --only <list>       Comma-separated artifacts to generate
  --skip <list>       Comma-separated artifacts to leave out

Write behaviour
  --dry-run           Report what would change without writing
  --check             Like --dry-run, but exit 1 if anything would change

Generation
  --no-docs           Omit schema documentation from the generated types
  --lenient           Warn on invalid schemas instead of failing

Output
  --json              Emit a machine-readable summary on stdout
  --fail-on-warn      Exit 1 if the run produced any warning
  --verbose           Verbose logging
  --quiet             Errors only
  --version           Print the schema version and exit
  -h, --help          Show this help

Artifacts
  ${ARTIFACTS.join(', ')}

Examples
  schemagen                            # full run
  schemagen --check                    # CI guard: fail if outputs are stale
  schemagen --only typescript,avsc     # iterate on the type generator alone
  schemagen --check --json             # CI guard with parseable output
  schemagen validate --fail-on-warn    # also fail on undocumented fields
`.trimStart();

export async function main(argv: readonly string[]): Promise<number> {
	const { options, positionals } = parse(argv);

	if (options.help) {
		process.stdout.write(USAGE);
		return 0;
	}

	const command = resolveCommand(positionals);
	const config = resolveConfig({ root: options.root, emitDocs: options['no-docs'] !== true });

	if (options.version) {
		process.stdout.write(`${await readSchemaVersion(config)}\n`);
		return 0;
	}

	const logger = new Logger({ level: resolveLogLevel(options) });
	const mode = resolveWriteMode(options, command);
	const context: CommandContext = {
		config,
		logger,
		mode,
		command,
		json: options.json === true,
		lenient: options.lenient === true,
	};

	const exitCode = await run(context, options);
	return exitCode === 0 && options['fail-on-warn'] && logger.counters.warnings > 0
		? 1
		: exitCode;
}

interface CommandContext {
	config: GeneratorConfig;
	logger: Logger;
	mode: WriteMode;
	command: Command;
	json: boolean;
	lenient: boolean;
}

function run(context: CommandContext, options: Options): Promise<number> {
	switch (context.command) {
		case 'list':
			return runList(context);
		case 'validate':
			return runValidate(context);
		case 'clean':
			return runClean(context);
		case 'generate':
			return runGenerate(context, resolveArtifacts(options.only, options.skip));
	}
}

async function runGenerate(context: CommandContext, artifacts: Set<Artifact>): Promise<number> {
	const { config, logger, mode, json, lenient } = context;
	const result = await runPipeline({
		config,
		logger,
		mode,
		artifacts,
		strictValidation: !lenient,
	});

	const stale = mode === 'check' && result.changedPaths.length > 0;

	if (json) {
		emitJson({
			ok: !stale,
			command: 'generate',
			mode,
			schemaVersion: result.version,
			artifacts: [...artifacts],
			schemas: result.sources.map((source) => source.schemaName),
			changes: result.changedPaths,
			warnings: logger.counters.warnings,
		});
		return stale ? 1 : 0;
	}

	if (mode === 'check') {
		if (!stale) {
			logger.success('generated outputs are up to date');
			return 0;
		}
		logger.error(`${result.changedPaths.length} generated file(s) are out of date:`);
		for (const changed of result.changedPaths) logger.error(`  ${changed}`);
		logger.error('run `npm run generate` and commit the result');
		return 1;
	}

	logger.success(`${mode === 'dry-run' ? 'would apply' : 'applied'}: ${result.summary}`);
	return 0;
}

async function runValidate(context: CommandContext): Promise<number> {
	const { config, logger, json, lenient } = context;
	const { sources } = await loadSources({
		sourcesDir: config.sourcesDir,
		schemaTypes: config.schemaTypes,
		logger,
	});
	const valid = await validateSources(sources, { logger, strict: !lenient });
	const ok = valid.length === sources.length;

	// Rendering the docs and throwing them away is what surfaces the
	// "field X has no description" warnings, which is what makes
	// `validate --fail-on-warn` a documentation check as well as a schema one.
	for (const source of valid) {
		generateMarkdownDoc(source.schema, { logger: logger.child(source.schemaName) });
	}

	if (json) {
		emitJson({
			ok,
			command: 'validate',
			schemaVersion: await readSchemaVersion(config),
			schemas: sources.map((source) => source.schemaName),
			invalid: sources
				.filter((source) => !valid.includes(source))
				.map((source) => source.schemaName),
			warnings: logger.counters.warnings,
		});
	} else {
		logger.success(`${valid.length}/${sources.length} schema(s) valid`);
	}
	return ok ? 0 : 1;
}

async function runList(context: CommandContext): Promise<number> {
	const { config, logger, json } = context;
	const { sources, chunks } = await loadSources({
		sourcesDir: config.sourcesDir,
		schemaTypes: config.schemaTypes,
		logger,
	});

	if (json) {
		emitJson({
			ok: true,
			command: 'list',
			schemaVersion: await readSchemaVersion(config),
			schemas: sources.map((source) => ({
				name: source.schemaName,
				type: source.schemaType,
				file: `${source.schemaType}/${source.fileName}.avsc`,
			})),
			chunks: chunks.ids,
			artifacts: [...ARTIFACTS],
		});
		return 0;
	}

	const lines = ['Schemas'];
	for (const source of sources) {
		lines.push(`  ${source.schemaName.padEnd(24)} ${source.schemaType}/${source.fileName}.avsc`);
	}
	lines.push('', 'Chunks', ...chunks.ids.map((id) => `  ${id}`));
	lines.push('', 'Artifacts', ...ARTIFACTS.map((artifact) => `  ${artifact}`), '');
	process.stdout.write(lines.join('\n'));
	return 0;
}

async function runClean(context: CommandContext): Promise<number> {
	const { config, logger, mode, json } = context;
	const writer = new FileWriter(config.root, mode === 'write' ? 'write' : 'dry-run', logger);
	const nothingToKeep = new Set<string>();

	for (const dir of [config.typescriptOutputDir, config.avscOutputDir, config.protoOutputDir]) {
		await writer.prune(dir, nothingToKeep);
	}
	await writer.remove(config.tempDir);
	await writer.remove(config.generatedStampFile);

	if (json) {
		emitJson({
			ok: true,
			command: 'clean',
			mode,
			removed: writer.modifiedPaths,
			warnings: logger.counters.warnings,
		});
	} else {
		logger.success(writer.summarise());
	}
	return 0;
}

function parse(argv: readonly string[]): { options: Options; positionals: string[] } {
	try {
		const parsed = parseArgs({ args: [...argv], options: OPTIONS, allowPositionals: true });
		return { options: parsed.values as Options, positionals: parsed.positionals };
	} catch (cause) {
		throw new UsageError((cause as Error).message);
	}
}

function emitJson(payload: unknown): void {
	process.stdout.write(`${JSON.stringify(payload, null, 2)}\n`);
}

async function readSchemaVersion(config: GeneratorConfig): Promise<string> {
	return (await readFile(config.versionFile, 'utf-8')).trim();
}

function resolveCommand(positionals: readonly string[]): Command {
	if (positionals.length === 0) return 'generate';
	if (positionals.length > 1) {
		throw new UsageError(`Expected one command, received: ${positionals.join(' ')}`);
	}
	const candidate = positionals[0]!;
	if (!(COMMANDS as readonly string[]).includes(candidate)) {
		throw new UsageError(`Unknown command "${candidate}"`, { known: COMMANDS.join(', ') });
	}
	return candidate as Command;
}

function resolveLogLevel(options: Options): LogLevel {
	if (options.verbose) return 'debug';
	if (options.quiet) return 'error';
	// `--json` owns stdout, so ordinary progress logging would corrupt it.
	if (options.json) return 'error';
	return 'info';
}

function resolveWriteMode(options: Options, command: Command): WriteMode {
	if (options.check) return 'check';
	if (options['dry-run']) return 'dry-run';
	return command === 'validate' || command === 'list' ? 'dry-run' : 'write';
}

function resolveArtifacts(only?: string, skip?: string): Set<Artifact> {
	const selected = new Set<Artifact>(only ? parseArtifacts(only, '--only') : ARTIFACTS);
	for (const artifact of skip ? parseArtifacts(skip, '--skip') : []) {
		selected.delete(artifact);
	}
	if (selected.size === 0) throw new UsageError('No artifacts selected');
	return selected;
}

function parseArtifacts(list: string, flag: string): Artifact[] {
	return list
		.split(',')
		.map((entry) => entry.trim())
		.filter(Boolean)
		.map((entry) => {
			if (!(ARTIFACTS as readonly string[]).includes(entry)) {
				throw new UsageError(`${flag}: unknown artifact "${entry}"`, {
					known: ARTIFACTS.join(', '),
				});
			}
			return entry as Artifact;
		});
}

function isDirectRun(): boolean {
	const entry = process.argv[1];
	return entry !== undefined && import.meta.url === pathToFileURL(entry).href;
}

if (isDirectRun()) {
	main(process.argv.slice(2))
		.then((code) => {
			process.exitCode = code;
		})
		.catch((error: unknown) => {
			if (error instanceof SchemaGenError) {
				process.stderr.write(`${error.name}: ${error.describe()}\n`);
				if (error instanceof UsageError) process.stderr.write(`\n${USAGE}`);
			} else {
				process.stderr.write(`${(error as Error)?.stack ?? String(error)}\n`);
			}
			process.exitCode = 1;
		});
}
