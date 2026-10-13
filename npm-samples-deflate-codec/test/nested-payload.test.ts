import { describe, expect, it } from 'vitest';

import {
	ClientSampleEncoder,
	createClientSampleCodec,
	isDeflateCodecError,
} from '../src/index.js';
import type { ClientSample, DeflateCodecError } from '../src/index.js';

const CLIENT_ID = 'client-42';

/**
 * Nesting arrived in 3.7.0: a payload is a `Record<string, unknown>` rather than
 * a map of primitives, so anything JSON can express may now sit inside one. The
 * delta engine needed no change for it — payloads are written whole — which is
 * exactly the claim worth pinning down here.
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
	// Through plain JSON text, so anything the format cannot carry is lost here
	// rather than surviving as a shared reference.
	return samples.map((sample) => codec.decoder.decodeJson(codec.encoder.encodeToJson(sample)));
}

function expectCodecError(run: () => unknown, code: DeflateCodecError['code']): DeflateCodecError {
	try {
		run();
	} catch (error) {
		expect(isDeflateCodecError(error)).toBe(true);
		expect((error as DeflateCodecError).code).toBe(code);
		return error as DeflateCodecError;
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

	it('hands back a payload the caller cannot reach into afterwards', async () => {
		const payload = { nested: { count: 1 } };
		const sample: ClientSample = {
			timestamp: 1_000,
			clientEvents: [{ type: 'E', timestamp: 1_000, payload }],
		};

		const codec = createClientSampleCodec({ clientId: CLIENT_ID });
		const decoded = await codec.decoder.decode(await codec.encoder.encode(sample));

		(payload.nested as { count: number }).count = 99;
		expect((decoded.clientEvents![0]!.payload as typeof payload).nested.count).toBe(1);
	});

	it('writes a nested payload whole when the list changes, and only then', () => {
		// A value list is one opaque value: the whole list travels when it
		// changes, and an unchanged list is remembered between samples.
		const encode = encoder();
		const event = { type: 'E', timestamp: 1_000, payload: DEEP_PAYLOAD };

		encode.encodeToJson({ timestamp: 1_000, clientEvents: [event] });
		const same = JSON.parse(encode.encodeToJson({ timestamp: 2_000, clientEvents: [event] }));
		expect(same.clientEvents).toBeUndefined();

		const other = { type: 'F', timestamp: 2_000, payload: DEEP_PAYLOAD };
		const changed = JSON.parse(
			encode.encodeToJson({ timestamp: 3_000, clientEvents: [event, other] }),
		) as { clientEvents?: { payload?: unknown }[] };

		// The list is replaced, not merged: both entries travel, whole.
		expect(changed.clientEvents).toHaveLength(2);
		expect(changed.clientEvents![1]!.payload).toEqual(DEEP_PAYLOAD);
	});

	it('notices a change buried deep inside attachments, and only then', () => {
		// `attachments` is the opaque field that *is* remembered between samples,
		// so it is where nesting could plausibly have gone wrong.
		const encode = encoder();
		const attachments = { room: { id: 'r1', meta: { region: 'eu' } } };

		encode.encodeToJson({ timestamp: 1_000, attachments });
		const second = JSON.parse(encode.encodeToJson({ timestamp: 2_000, attachments }));
		expect(second.attachments).toBeUndefined();

		const changed = { room: { id: 'r1', meta: { region: 'us' } } };
		const third = JSON.parse(encode.encodeToJson({ timestamp: 3_000, attachments: changed }));
		expect(third.attachments).toEqual(changed);
	});

	it('lets a value with its own toJSON serialise itself', () => {
		const encode = encoder();
		const when = new Date('2026-08-31T09:00:00.000Z');

		const delta = JSON.parse(encode.encodeToJson({ timestamp: 1_000, attachments: { when } }));
		expect((delta.attachments as { when: string }).when).toBe(when.toISOString());
	});

	describe('rejects what JSON would quietly change', () => {
		it('a non-finite number nested inside a payload, naming the path', () => {
			const error = expectCodecError(
				() =>
					encoder().encodeToJson({
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
					encoder().encodeToJson({
						timestamp: 1_000,
						attachments: { samples: [1, 2, Number.POSITIVE_INFINITY] },
					}),
				'INVALID_VALUE',
			);
		});

		it('a bigint, which JSON.stringify cannot represent at all', () => {
			expectCodecError(
				() =>
					encoder().encodeToJson({
						timestamp: 1_000,
						attachments: { id: 9_007_199_254_740_993n },
					}),
				'INVALID_VALUE',
			);
		});

		it('a cycle, rather than overflowing the stack', () => {
			const cyclic: Record<string, unknown> = { name: 'loop' };
			cyclic.self = cyclic;

			expectCodecError(
				() => encoder().encodeToJson({ timestamp: 1_000, attachments: cyclic }),
				'MALFORMED_INPUT',
			);
		});

		it('but accepts the same object graph repeated without a cycle', () => {
			const shared = { a: 1 };
			const delta = JSON.parse(
				encoder().encodeToJson({
					timestamp: 1_000,
					attachments: { first: shared, second: shared },
				}),
			);

			expect(delta.attachments).toEqual({ first: { a: 1 }, second: { a: 1 } });
		});
	});
});
