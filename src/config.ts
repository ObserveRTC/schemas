import path from 'node:path';

/**
 * Every artifact the pipeline can produce. `--only` / `--skip` select from this
 * list; `encoder` and `decoder` additionally require `proto`, since they embed
 * the buf-generated TypeScript.
 */
export const ARTIFACTS = [
	'avsc',
	'typescript',
	'markdown',
	'proto',
	'samples-lib',
	'encoder',
	'decoder',
] as const;

export type Artifact = (typeof ARTIFACTS)[number];

export const ARTIFACT_REQUIRES: Partial<Record<Artifact, readonly Artifact[]>> = {
	encoder: ['proto'],
	decoder: ['proto'],
};

/**
 * The single generated module that carries `export const schemaVersion`.
 * See `typescript.includeSchemaVersion` below for why there can only be one.
 */
const SCHEMA_VERSION_OWNER = 'ClientSample';

/**
 * Identifier fields that travel as opaque bytes on the wire instead of as
 * strings, saving ~50% on the most repeated fields in a sample.
 */
const UUID_FIELDS = [
	'trackIdentifier',
	'remoteClientId',
	'callId',
	'clientId',
	'peerConnectionId',
	'trackId',
	'streamId',
	'sinkId',
	'sfuStreamId',
	'sfuSinkId',
	'sfuId',
	'padId',
	'channelId',
] as const;

/**
 * Overrides applied to scalar fields when generating proto3. Keeping them as
 * data — rather than as `if (name === ...)` inside the converter — means the
 * exceptions are visible in one place and reviewable on their own.
 */
function buildProtoFieldTypeOverrides(): Map<string, string> {
	const overrides = new Map<string, string>();
	for (const field of UUID_FIELDS) overrides.set(field, 'bytes');
	// Free-form JSON blob; never interpreted by the pipeline.
	overrides.set('appData', 'bytes');
	// Avro says `long`, but timestamps are transported as doubles so that
	// sub-millisecond values survive the round trip through JavaScript.
	overrides.set('timestamp', 'double');
	return overrides;
}

/** Fields whose TypeScript type is fixed regardless of their Avro type. */
function buildTsFieldTypeOverrides(): Map<string, string> {
	return new Map([['attachments', 'Record<string, unknown>']]);
}

/**
 * Enum symbol rewrites. `RTCStatsIceCandidatePairState` is spelled
 * `inProgress` in the W3C IDL but browsers have shipped `in-progress` and
 * `inprogress`; all three are accepted.
 */
function buildEnumSymbolOverrides(): Map<string, (symbols: readonly string[]) => string[]> {
	return new Map([
		[
			'RTCStatsIceCandidatePairState',
			(symbols: readonly string[]): string[] => {
				const index = symbols.indexOf('inProgress');
				if (index === -1) return [...symbols];
				const result = [...symbols];
				result[index] = 'in-progress';
				result.push('inprogress');
				return result;
			},
		],
	]);
}

export interface GeneratorConfig {
	readonly root: string;

	readonly sourcesDir: string;
	readonly schemaTypes: readonly string[];
	readonly versionFile: string;
	readonly changelogFile: string;
	readonly w3cStatsIdentifiersFile: string;

	readonly outputsDir: string;
	readonly typescriptOutputDir: string;
	readonly avscOutputDir: string;
	readonly protoOutputDir: string;
	readonly tempDir: string;
	readonly generatedStampFile: string;
	readonly schemaListFile: string;

	readonly samplesLibDir: string;
	readonly encoderLibDir: string;
	readonly decoderLibDir: string;

	readonly protobuf: {
		/** Schema whose proto variants are generated. */
		readonly rootSchema: string;
		readonly protoPackage: string;
		readonly fieldTypeOverrides: ReadonlyMap<string, string>;
		/** File name (no extension) of the variant buf compiles to TypeScript. */
		readonly bufVariant: string;
		/** Variants written after buf has run, in order. */
		readonly extraVariants: readonly { readonly name: string; readonly allOptional: boolean }[];
	};

	readonly typescript: {
		readonly fieldTypeOverrides: ReadonlyMap<string, string>;
		readonly enumSymbolOverrides: ReadonlyMap<string, (symbols: readonly string[]) => string[]>;
		readonly includeSchemaVersion: (schemaName: string) => boolean;
	};

	readonly emitDocs: boolean;
}

export interface ConfigOverrides {
	readonly root?: string;
	readonly emitDocs?: boolean;
}

export function resolveConfig(overrides: ConfigOverrides = {}): GeneratorConfig {
	const root = path.resolve(overrides.root ?? process.cwd());
	const sourcesDir = path.join(root, 'sources');
	const outputsDir = path.join(root, 'outputs');

	return {
		root,

		sourcesDir,
		schemaTypes: ['samples'],
		versionFile: path.join(sourcesDir, 'version.txt'),
		changelogFile: path.join(sourcesDir, 'CHANGELOG.md'),
		w3cStatsIdentifiersFile: path.join(sourcesDir, 'w3c', 'W3cStatsIdentifiers.ts'),

		outputsDir,
		typescriptOutputDir: path.join(outputsDir, 'typescript'),
		avscOutputDir: path.join(outputsDir, 'avsc'),
		protoOutputDir: path.join(outputsDir, 'proto'),
		tempDir: path.join(root, 'temp'),
		generatedStampFile: path.join(outputsDir, 'generated.txt'),
		schemaListFile: path.join(root, 'schemaList.md'),

		samplesLibDir: path.join(root, 'npm-samples-lib'),
		encoderLibDir: path.join(root, 'npm-samples-encoder'),
		decoderLibDir: path.join(root, 'npm-samples-decoder'),

		protobuf: {
			rootSchema: 'ClientSample',
			protoPackage: 'org.observertc.schemas.protobuf',
			fieldTypeOverrides: buildProtoFieldTypeOverrides(),
			bufVariant: 'ProtobufClientSampleV3Optional',
			extraVariants: [{ name: 'ProtobufClientSampleV3', allOptional: false }],
		},

		typescript: {
			fieldTypeOverrides: buildTsFieldTypeOverrides(),
			enumSymbolOverrides: buildEnumSymbolOverrides(),
			// `schemaVersion` describes the whole schema set, not one record, so
			// exactly one module may export it. Emitting it from every module
			// made `src/index.ts` re-export the same name twice, which is a
			// TS2308 error and has been breaking `npm-samples-lib`'s build.
			// ClientSample owns it because the codec packages re-export it from
			// there (`export { schemaVersion } from './InputSamples'`).
			includeSchemaVersion: (schemaName: string) => schemaName === SCHEMA_VERSION_OWNER,
		},

		emitDocs: overrides.emitDocs ?? true,
	};
}
