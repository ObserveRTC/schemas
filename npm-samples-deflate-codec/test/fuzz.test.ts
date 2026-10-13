import { describe, expect, it } from 'vitest';

import { createClientSampleCodec } from '../src/index.js';
import type { ClientSample } from '../src/index.js';
import { buildSampleStream } from './support/stream.js';

/**
 * The hand-written streams above exercise the cases we thought of. This one
 * exercises the ones we did not.
 *
 * It takes a realistic stream and then mangles it — dropping optional fields,
 * nudging numbers, flipping booleans, adding and removing collection entries —
 * before asserting that every sample still survives the round trip exactly.
 * The structural diff is lossless by construction, so the expectation is the
 * sample itself (plus the injected client id): anything that depends on a
 * field being present *because it was present last time* dies here, which is
 * exactly the class of bug a delta codec attracts.
 */

function seededRandom(seed: number): () => number {
	let state = seed >>> 0;
	return () => {
		state = (state + 0x6d2b79f5) >>> 0;
		let t = state;
		t = Math.imul(t ^ (t >>> 15), t | 1);
		t ^= t + Math.imul(t ^ (t >>> 7), 61);
		return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
	};
}

/** Fields the plain types declare as required, and which must survive mangling. */
const KEEP = new Set([
	'timestamp',
	'id',
	'kind',
	'ssrc',
	'mimeType',
	'type',
	'peerConnectionId',
	'trackIdentifier',
	'y',
	'u',
	'v',
	'none',
	'cpu',
	'bandwidth',
	'other',
]);

function mangle(value: unknown, random: () => number, dropRate: number): unknown {
	if (Array.isArray(value)) {
		const items = value
			.filter(() => random() > dropRate)
			.map((item) => mangle(item, random, dropRate));
		return items.length > 0 ? items : undefined;
	}

	if (value !== null && typeof value === 'object') {
		const result: Record<string, unknown> = {};
		for (const [key, child] of Object.entries(value as Record<string, unknown>)) {
			if (child === undefined) continue;
			if (!KEEP.has(key) && random() < dropRate) continue;
			const mangled = mangle(child, random, dropRate);
			if (mangled !== undefined) result[key] = mangled;
			else if (KEEP.has(key)) result[key] = child;
		}
		return result;
	}

	if (typeof value === 'number' && random() < 0.4) {
		return Number.isInteger(value) ? value + Math.round(random() * 10) : value + random();
	}
	if (typeof value === 'boolean' && random() < 0.4) return !value;

	return value;
}

describe('randomised streams', () => {
	for (const seed of [1, 7, 42, 1337, 90210]) {
		it(`round-trips a mangled stream exactly (seed ${seed})`, async () => {
			const random = seededRandom(seed);
			const clientId = `client-${seed}`;
			const codec = createClientSampleCodec({ clientId });

			const samples = buildSampleStream({ seed, sampleCount: 24 }).map(
				(sample) => mangle(sample, random, 0.25) as ClientSample,
			);

			for (const [index, sample] of samples.entries()) {
				const decoded = await codec.decoder.decode(await codec.encoder.encode(sample));
				expect(decoded, `seed ${seed}, sample ${index}`).toEqual({ ...sample, clientId });
			}
		});
	}

	it('round-trips a stream where nothing at all changes between samples', () => {
		const clientId = 'client-static';
		const codec = createClientSampleCodec({ clientId });
		const [sample] = buildSampleStream({ sampleCount: 1 });

		let firstLength = 0;

		for (let index = 0; index < 5; index += 1) {
			const json = codec.encoder.encodeToJson(sample!);
			expect(codec.decoder.decodeJson(json)).toEqual({ ...sample, clientId });

			// After the first message there is genuinely nothing left to say
			// beyond the keys that identify each entry.
			if (index === 0) firstLength = json.length;
			else expect(json.length).toBeLessThan(firstLength * 0.35);
		}
	});

	it('round-trips a minimal sample with no peer connections at all', async () => {
		const codec = createClientSampleCodec({ clientId: 'client-bare' });
		const sample: ClientSample = { timestamp: 1_756_000_000_000 };

		expect(await codec.decoder.decode(await codec.encoder.encode(sample))).toEqual({
			...sample,
			clientId: 'client-bare',
		});
	});
});
