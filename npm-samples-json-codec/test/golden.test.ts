import { readFileSync, writeFileSync } from 'node:fs';
import path from 'node:path';

import { describe, expect, it } from 'vitest';

import { ClientSampleDecoder, ClientSampleEncoder, schemaVersion } from '../src/index.js';
import type { ClientSampleDelta } from '../src/index.js';
import { buildSampleStream } from './support/stream.js';

/**
 * Byte-exact regression fixtures.
 *
 * The wire format is a contract with every already-deployed decoder, and none
 * of it is visible from the TypeScript types: which fields get suppressed,
 * whether a collection key is repeated, how a sub-object is split. A change to
 * any of that is invisible to a round-trip test — encode and decode move
 * together — and breaks every peer that has not been redeployed.
 *
 * Because the format is plain JSON, the fixture is readable: a diff here shows
 * exactly which field started or stopped being sent. Regenerate with:
 *
 * ```sh
 * npm run test:update-goldens
 * ```
 */

// Resolved from the working directory rather than from `import.meta.url`, so
// this file type-checks under both module systems the package builds for.
// Vitest runs with the project root as cwd.
const fixturesDir = path.resolve(process.cwd(), 'test', 'fixtures');
const goldenFile = path.join(fixturesDir, 'stream.golden.json');
const shouldUpdate = process.env.UPDATE_GOLDENS === '1';

const CLIENT_ID = 'client-42';

interface Golden {
	readonly description: string;
	readonly schemaVersion: string;
	readonly clientId: string;
	readonly byteLengths: number[];
	readonly messages: ClientSampleDelta[];
}

describe('golden wire fixtures', () => {
	it('matches the recorded deltas', () => {
		const encoder = new ClientSampleEncoder({ clientId: CLIENT_ID });
		const messages = buildSampleStream().map((sample) => encoder.encode(sample));

		const actual: Golden = {
			description: 'Eight samples of a one-peer-connection call, as JSON deltas',
			schemaVersion,
			clientId: CLIENT_ID,
			byteLengths: messages.map((message) => JSON.stringify(message).length),
			messages,
		};

		if (shouldUpdate) writeFileSync(goldenFile, `${JSON.stringify(actual, null, '\t')}\n`);

		const expected = JSON.parse(readFileSync(goldenFile, 'utf-8')) as Golden;
		expect(actual.schemaVersion).toBe(expected.schemaVersion);
		expect(actual.messages).toEqual(expected.messages);
		expect(actual.byteLengths).toEqual(expected.byteLengths);
	});

	it('decodes the recorded deltas back into the original samples', () => {
		const expected = JSON.parse(readFileSync(goldenFile, 'utf-8')) as Golden;
		const decoder = new ClientSampleDecoder();
		const decoded = expected.messages.map((message) => decoder.decode(message));

		for (const [index, sample] of buildSampleStream().entries()) {
			expect(decoded[index], `sample ${index}`).toEqual({ ...sample, clientId: CLIENT_ID });
		}
	});

	it('shrinks after the first sample, which is what the format is for', () => {
		const golden = JSON.parse(readFileSync(goldenFile, 'utf-8')) as Golden;
		const [first, ...rest] = golden.byteLengths;
		const averageDelta = rest.reduce((total, length) => total + length, 0) / rest.length;

		expect(averageDelta).toBeLessThan(first! * 0.7);
	});
});
