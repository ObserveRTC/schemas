import { describe, expect, it, vi } from 'vitest';

import {
	ClientSampleDecoder,
	ClientSampleEncoder,
	isProtobufCodecError,
	ProtobufCodecError,
} from '../src/index.js';
import type { ClientSample, IceCandidatePairStats } from '../src/index.js';
import { buildSampleStream } from './support/stream.js';

function expectCodecError(run: () => unknown, code: ProtobufCodecError['code']): ProtobufCodecError {
	try {
		run();
	} catch (error) {
		expect(isProtobufCodecError(error)).toBe(true);
		expect((error as ProtobufCodecError).code).toBe(code);
		return error as ProtobufCodecError;
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

	it('rejects an identifier that is not a uuid when uuid packing was asked for', () => {
		const encoder = new ClientSampleEncoder({
			clientId: 'not-a-uuid',
			identifiers: { clientId: 'uuid' },
		});

		const error = expectCodecError(
			() => encoder.encode(buildSampleStream({ sampleCount: 1 })[0]!),
			'INVALID_VALUE',
		);
		expect(error.context.path).toBe('ClientSample.clientId');
		expect(error.message).toContain('uuid');
	});

	it('reports where in the sample a bad value was found', () => {
		const encoder = new ClientSampleEncoder({ clientId: 'client-42' });
		const sample = buildSampleStream({ sampleCount: 1 })[0]!;
		sample.peerConnections![0]!.iceCandidatePairs![0]!.state =
			'connected' as IceCandidatePairStats['state'];

		const error = expectCodecError(() => encoder.encode(sample), 'INVALID_VALUE');
		expect(error.context.path).toBe(
			'ClientSample.peerConnections[0].iceCandidatePairs[0].state',
		);
	});

	it('refuses a value that cannot be represented as a 64-bit integer', () => {
		const encoder = new ClientSampleEncoder({ clientId: 'client-42' });
		const sample = buildSampleStream({ sampleCount: 1 })[0]!;
		sample.peerConnections![0]!.inboundRtps![0]!.bytesReceived = Number.POSITIVE_INFINITY;

		expectCodecError(() => encoder.encode(sample), 'INVALID_VALUE');
	});

	it('rejects bytes that are not a ClientSample message', () => {
		const decoder = new ClientSampleDecoder();
		expectCodecError(
			() => decoder.decode(new Uint8Array([0xff, 0xff, 0xff, 0xff, 0xff])),
			'MALFORMED_INPUT',
		);
	});

	it('rejects input that is not base64', () => {
		expectCodecError(() => new ClientSampleDecoder().decodeBase64('not base64 ***'), 'MALFORMED_INPUT');
	});

	it('says so plainly when a decoder joins a stream late', () => {
		const samples = buildSampleStream();
		const encoder = new ClientSampleEncoder({ clientId: 'client-42' });
		const messages = samples.map((sample) => encoder.encode(sample));

		const latecomer = new ClientSampleDecoder();
		const error = expectCodecError(() => latecomer.decode(messages[3]!), 'STREAM_DESYNC');
		expect(error.message).toMatch(/never been seen/);
	});

	it('tryDecode reports the failure instead of throwing', () => {
		const logger = { debug: vi.fn(), info: vi.fn(), warn: vi.fn(), error: vi.fn() };
		const decoder = new ClientSampleDecoder({ logger });

		const result = decoder.tryDecode(new Uint8Array([0xff, 0xff, 0xff]));

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

	it('rejects something that is not a sample at all', () => {
		const encoder = new ClientSampleEncoder({ clientId: 'client-42' });
		expectCodecError(() => encoder.encode(null as unknown as ClientSample), 'INVALID_VALUE');
	});

	it('is silent unless a logger was supplied', () => {
		const spy = vi.spyOn(console, 'warn').mockImplementation(() => undefined);
		new ClientSampleDecoder().tryDecode(new Uint8Array([0xff, 0xff, 0xff]));

		expect(spy).not.toHaveBeenCalled();
		spy.mockRestore();
	});
});
