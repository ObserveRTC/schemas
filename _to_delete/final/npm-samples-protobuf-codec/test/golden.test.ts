import { readFileSync, writeFileSync } from 'node:fs';
import path from 'node:path';

import { describe, expect, it } from 'vitest';

import {
	ClientSampleDecoder,
	ClientSampleEncoder,
	schemaVersion,
	type EncoderOptions,
} from '../src/index.js';
import { buildSampleStream, buildUuidSampleStream, UUID_STREAM_IDS } from './support/stream.js';

/**
 * Byte-exact regression fixtures.
 *
 * The wire format is a contract with every already-deployed decoder, and almost
 * nothing about it is visible from the TypeScript types: field numbers, the
 * choice of int64 over int32, whether a value is delta-suppressed. A change to
 * any of those is invisible to a round-trip test — encode and decode move
 * together — and catastrophic in production.
 *
 * So the fixtures pin the actual bytes. If a diff shows up here, either the
 * change was unintended, or it is a deliberate wire break that needs a schema
 * version bump and a note in the changelog. Regenerate with:
 *
 * ```sh
 * npm run test:update-goldens
 * ```
 */

// Resolved from the working directory rather than from `import.meta.url`, so
// this file type-checks under both module systems the package builds for.
// Vitest runs with the project root as cwd.
const fixturesDir = path.resolve(process.cwd(), 'test', 'fixtures');
const shouldUpdate = process.env.UPDATE_GOLDENS === '1';

interface Golden {
	readonly description: string;
	readonly schemaVersion: string;
	readonly options: Record<string, unknown>;
	readonly byteLengths: number[];
	readonly messages: string[];
}

const cases: {
	readonly name: string;
	readonly file: string;
	readonly description: string;
	readonly options: EncoderOptions;
	readonly samples: ReturnType<typeof buildSampleStream>;
}[] = [
	{
		name: 'utf8 identifiers',
		file: 'stream-utf8.golden.json',
		description: 'Eight samples of a one-peer-connection call, identifiers as utf8 bytes',
		options: { clientId: 'client-42' },
		samples: buildSampleStream(),
	},
	{
		name: 'uuid identifiers',
		file: 'stream-uuid.golden.json',
		description: 'The same call with every identifier packed as 16 uuid bytes',
		options: {
			clientId: UUID_STREAM_IDS.clientId,
			identifiers: {
				callId: 'uuid',
				clientId: 'uuid',
				peerConnectionId: 'uuid',
				trackId: 'uuid',
			},
		},
		samples: buildUuidSampleStream(),
	},
];

describe('golden wire fixtures', () => {
	for (const testCase of cases) {
		it(`matches the recorded bytes for ${testCase.name}`, () => {
			const encoder = new ClientSampleEncoder(testCase.options);
			const messages = testCase.samples.map((sample) => encoder.encodeToBase64(sample));

			const actual: Golden = {
				description: testCase.description,
				schemaVersion,
				options: testCase.options as unknown as Record<string, unknown>,
				byteLengths: messages.map((message) => Buffer.from(message, 'base64').byteLength),
				messages,
			};

			const file = path.join(fixturesDir, testCase.file);
			if (shouldUpdate) {
				writeFileSync(file, `${JSON.stringify(actual, null, '\t')}\n`);
			}

			const expected = JSON.parse(readFileSync(file, 'utf-8')) as Golden;
			expect(actual.schemaVersion).toBe(expected.schemaVersion);
			expect(actual.messages).toEqual(expected.messages);
			expect(actual.byteLengths).toEqual(expected.byteLengths);
		});

		it(`decodes the recorded bytes for ${testCase.name} back into the original samples`, () => {
			const expected = JSON.parse(
				readFileSync(path.join(fixturesDir, testCase.file), 'utf-8'),
			) as Golden;

			const decoder = new ClientSampleDecoder(testCase.options);
			const decoded = expected.messages.map((message) => decoder.decodeBase64(message));

			for (const [index, sample] of testCase.samples.entries()) {
				expect(decoded[index], `sample ${index}`).toEqual({
					...sample,
					clientId: testCase.options.clientId,
				});
			}
		});
	}

	it('shrinks after the first sample, which is what the format is for', () => {
		const golden = JSON.parse(
			readFileSync(path.join(fixturesDir, 'stream-utf8.golden.json'), 'utf-8'),
		) as Golden;

		const [first, ...rest] = golden.byteLengths;
		const averageDelta = rest.reduce((total, length) => total + length, 0) / rest.length;

		expect(averageDelta).toBeLessThan(first! * 0.6);
	});
});
