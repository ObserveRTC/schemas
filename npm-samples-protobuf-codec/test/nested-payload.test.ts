import { describe, expect, it } from 'vitest';

import {
	ClientSampleEncoder,
	createClientSampleCodec,
	isProtobufCodecError,
	ProtobufCodecError,
} from '../src/index.js';
import type { ClientSample } from '../src/index.js';

const CLIENT_ID = 'client-42';

/**
 * Nesting arrived in 3.7.0: a payload is a `Record<string, unknown>` rather than
 * a map of primitives, so anything JSON can express may now sit inside one. On
 * this wire a payload was already a JSON string — proto3 can express neither
 * shape — so the format did not move; these tests are what says so.
 */
const DEEP_PAYLOAD = {
	device: { os: { name: 'macOS', version: '15.3' }, cores: 10 },
	flags: ['a', 'b'],
	mixed: [1, 'two', true, null, { deep: { deeper: { value: 42 } } }],
	empty: {},
	emptyList: [],
};

function encoder(): ClientSampleEncoder {
	return new ClientSampleEncoder({ clientId: CLIENT_ID });
}

function roundTrip(samples: readonly ClientSample[]): ClientSample[] {
	const codec = createClientSampleCodec({ clientId: CLIENT_ID });
	return samples.map((sample) => codec.decoder.decode(codec.encoder.encode(sample)));
}

function expectCodecError(
	run: () => unknown,
	code: ProtobufCodecError['code'],
): ProtobufCodecError {
	try {
		run();
	} catch (error) {
		expect(isProtobufCodecError(error)).toBe(true);
		expect((error as ProtobufCodecError).code).toBe(code);
		return error as ProtobufCodecError;
	}
	throw new Error(`expected a ${code} error, but nothing was thrown`);
}

describe('nested payloads', () => {
	it('round-trips a deeply nested payload at every site that has one', () => {
		const [decoded] = roundTrip([
			{
				timestamp: 1_000,
				clientEvents: [{ type: 'CLIENT_JOINED', timestamp: 1_000, payload: DEEP_PAYLOAD }],
				clientIssues: [{ type: 'FREEZE', timestamp: 1_000, payload: DEEP_PAYLOAD }],
				clientMetaItems: [{ type: 'META', timestamp: 1_000, payload: DEEP_PAYLOAD }],
				extensionStats: [{ type: 'app-metric', payload: DEEP_PAYLOAD }],
			},
		]);

		expect(decoded!.clientEvents![0]!.payload).toEqual(DEEP_PAYLOAD);
		expect(decoded!.clientIssues![0]!.payload).toEqual(DEEP_PAYLOAD);
		expect(decoded!.clientMetaItems![0]!.payload).toEqual(DEEP_PAYLOAD);
		expect(decoded!.extensionStats![0]!.payload).toEqual(DEEP_PAYLOAD);
	});

	it('hands back a payload the caller cannot reach into afterwards', () => {
		const payload = { nested: { count: 1 } };
		const sample: ClientSample = {
			timestamp: 1_000,
			clientEvents: [{ type: 'E', timestamp: 1_000, payload }],
		};

		const codec = createClientSampleCodec({ clientId: CLIENT_ID });
		const decoded = codec.decoder.decode(codec.encoder.encode(sample));

		(payload.nested as { count: number }).count = 99;
		expect((decoded.clientEvents![0]!.payload as typeof payload).nested.count).toBe(1);
	});

	it('notices a change buried deep inside attachments, and only then', () => {
		// `attachments` is the opaque field that is remembered between samples, so
		// it is where nesting could plausibly have gone wrong. Equality is by
		// serialised form, so an equal object rebuilt each tick costs no bytes.
		const encode = encoder();
		const attachments = { room: { id: 'r1', meta: { region: 'eu' } } };

		const first = encode.encode({ timestamp: 1_000, attachments });
		const unchanged = encode.encode({ timestamp: 2_000, attachments: { ...attachments } });
		const changed = encode.encode({
			timestamp: 3_000,
			attachments: { room: { id: 'r1', meta: { region: 'us' } } },
		});

		expect(unchanged.length).toBeLessThan(first.length);
		expect(changed.length).toBeGreaterThan(unchanged.length);
	});

	it('lets a value with its own toJSON serialise itself', () => {
		const when = new Date('2026-08-31T09:00:00.000Z');
		const [decoded] = roundTrip([{ timestamp: 1_000, attachments: { when } }]);

		expect((decoded!.attachments as { when: string }).when).toBe(when.toISOString());
	});

	describe('rejects what JSON would quietly change', () => {
		it('a non-finite number nested inside a payload, naming the path', () => {
			const error = expectCodecError(
				() =>
					encoder().encode({
						timestamp: 1_000,
						clientEvents: [
							{ type: 'E', timestamp: 1_000, payload: { stats: { jitter: Number.NaN } } },
						],
					}),
				'INVALID_VALUE',
			);

			expect(error.context.path).toContain('stats');
			expect(error.context.path).toContain('jitter');
		});

		it('a non-finite number nested inside an array', () => {
			expectCodecError(
				() =>
					encoder().encode({
						timestamp: 1_000,
						attachments: { samples: [1, 2, Number.POSITIVE_INFINITY] },
					}),
				'INVALID_VALUE',
			);
		});

		it('a bigint, which JSON.stringify cannot represent at all', () => {
			expectCodecError(
				() => encoder().encode({ timestamp: 1_000, attachments: { id: 9_007_199_254_740_993n } }),
				'INVALID_VALUE',
			);
		});

		it('a cycle, rather than overflowing the stack', () => {
			const cyclic: Record<string, unknown> = { name: 'loop' };
			cyclic.self = cyclic;

			expectCodecError(
				() => encoder().encode({ timestamp: 1_000, attachments: cyclic }),
				'MALFORMED_INPUT',
			);
		});

		it('but accepts the same object graph repeated without a cycle', () => {
			const shared = { a: 1 };
			const [decoded] = roundTrip([
				{ timestamp: 1_000, attachments: { first: shared, second: shared } },
			]);

			expect(decoded!.attachments).toEqual({ first: { a: 1 }, second: { a: 1 } });
		});
	});
});
