import { describe, expect, it, vi } from 'vitest';

import {
	ClientSampleDecoder,
	ClientSampleEncoder,
	isJsonCodecError,
	JsonCodecError,
} from '../src/index.js';
import type { ClientSample, ClientSampleDelta } from '../src/index.js';
import { buildSampleStream } from './support/stream.js';

function expectCodecError(run: () => unknown, code: JsonCodecError['code']): JsonCodecError {
	try {
		run();
	} catch (error) {
		expect(isJsonCodecError(error)).toBe(true);
		expect((error as JsonCodecError).code).toBe(code);
		return error as JsonCodecError;
	}
	throw new Error(`expected a ${code} error, but nothing was thrown`);
}

describe('errors', () => {
	it('rejects an encoder without a clientId', () => {
		expectCodecError(() => new ClientSampleEncoder({ clientId: '' }), 'INVALID_OPTION');
		expectCodecError(
			() => new ClientSampleEncoder(undefined as unknown as { clientId: string }),
			'INVALID_OPTION',
		);
	});

	it('refuses a non-finite number rather than letting JSON turn it into null', () => {
		const encoder = new ClientSampleEncoder({ clientId: 'client-42' });
		const sample = buildSampleStream({ sampleCount: 1 })[0]!;
		sample.peerConnections![0]!.inboundRtps![0]!.jitter = Number.POSITIVE_INFINITY;

		const error = expectCodecError(() => encoder.encode(sample), 'INVALID_VALUE');
		expect(error.context.path).toBe('ClientSample.peerConnections[0].inboundRtps[0].jitter');
	});

	it('reports where in the sample a collection entry lost its key', () => {
		const encoder = new ClientSampleEncoder({ clientId: 'client-42' });
		const sample = buildSampleStream({ sampleCount: 1 })[0]!;
		delete (sample.peerConnections![0]!.codecs![0] as { id?: string }).id;

		const error = expectCodecError(() => encoder.encode(sample), 'INVALID_VALUE');
		expect(error.context.path).toBe('ClientSample.peerConnections[0].codecs[0]');
		expect(error.message).toContain('"id"');
	});

	it('rejects a sample with no timestamp', () => {
		const encoder = new ClientSampleEncoder({ clientId: 'client-42' });
		expectCodecError(() => encoder.encode({} as ClientSample), 'INVALID_VALUE');
	});

	it('rejects something that is not a sample at all', () => {
		const encoder = new ClientSampleEncoder({ clientId: 'client-42' });
		expectCodecError(() => encoder.encode(null as unknown as ClientSample), 'INVALID_VALUE');
	});

	it('rejects input that is not JSON', () => {
		expectCodecError(() => new ClientSampleDecoder().decodeJson('{ not json'), 'MALFORMED_INPUT');
	});

	it('rejects a delta that is not an object', () => {
		const decoder = new ClientSampleDecoder();
		expectCodecError(() => decoder.decodeJson('[1,2,3]'), 'MALFORMED_INPUT');
		expectCodecError(() => decoder.decodeJson('42'), 'MALFORMED_INPUT');
		expectCodecError(() => decoder.decode(null as unknown as ClientSampleDelta), 'MALFORMED_INPUT');
	});

	it('rejects a collection entry that is not an object', () => {
		const decoder = new ClientSampleDecoder();
		const error = expectCodecError(
			() => decoder.decodeJson('{"timestamp":1,"peerConnections":["nope"]}'),
			'MALFORMED_INPUT',
		);
		expect(error.context.path).toBe('ClientSample.peerConnections[0]');
	});

	it('says so plainly when a decoder joins a stream late', () => {
		const encoder = new ClientSampleEncoder({ clientId: 'client-42' });
		const messages = buildSampleStream().map((sample) => encoder.encode(sample));

		const latecomer = new ClientSampleDecoder();
		const error = expectCodecError(() => latecomer.decode(messages[3]!), 'STREAM_DESYNC');
		expect(error.message).toMatch(/never been seen/);
	});

	it('leaves decoder state untouched when a message fails', () => {
		const encoder = new ClientSampleEncoder({ clientId: 'client-42' });
		const decoder = new ClientSampleDecoder();
		const samples = buildSampleStream({ sampleCount: 3 });
		const messages = samples.map((sample) => encoder.encode(sample));

		decoder.decode(messages[0]!);
		expect(decoder.tryDecodeJson('{ broken').ok).toBe(false);

		// The next well-formed message of the same stream still decodes.
		expect(decoder.decode(messages[1]!)).toEqual({ ...samples[1], clientId: 'client-42' });
		expect(decoder.decodedSampleCount).toBe(2);
	});

	it('tryDecode reports the failure instead of throwing', () => {
		const logger = { debug: vi.fn(), info: vi.fn(), warn: vi.fn(), error: vi.fn() };
		const result = new ClientSampleDecoder({ logger }).tryDecodeJson('{ broken');

		expect(result.ok).toBe(false);
		if (result.ok) throw new Error('unreachable');
		expect(result.error.code).toBe('MALFORMED_INPUT');
		expect(logger.warn).toHaveBeenCalledOnce();
	});

	it('tryDecode returns the sample on the happy path', () => {
		const encoder = new ClientSampleEncoder({ clientId: 'client-42' });
		const decoder = new ClientSampleDecoder();
		const sample = buildSampleStream({ sampleCount: 1 })[0]!;

		const result = decoder.tryDecode(encoder.encode(sample));

		expect(result.ok).toBe(true);
		if (!result.ok) throw new Error('unreachable');
		expect(result.sample.timestamp).toBe(sample.timestamp);
	});

	it('is silent unless a logger was supplied', () => {
		const spy = vi.spyOn(console, 'warn').mockImplementation(() => undefined);
		new ClientSampleDecoder().tryDecodeJson('{ broken');

		expect(spy).not.toHaveBeenCalled();
		spy.mockRestore();
	});
});
