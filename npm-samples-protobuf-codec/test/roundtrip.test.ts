import { describe, expect, it } from 'vitest';

import { ClientSampleDecoder, ClientSampleEncoder, createClientSampleCodec } from '../src/index.js';
import type { ClientSample } from '../src/index.js';
import { buildSampleStream, buildUuidSampleStream, UUID_STREAM_IDS } from './support/stream.js';

function roundTrip(samples: readonly ClientSample[], options: { uuid?: boolean } = {}): ClientSample[] {
	const codec = createClientSampleCodec({
		clientId: options.uuid ? UUID_STREAM_IDS.clientId : 'client-42',
		identifiers: options.uuid
			? { callId: 'uuid', clientId: 'uuid', peerConnectionId: 'uuid', trackId: 'uuid' }
			: undefined,
	});

	return samples.map((sample) => codec.decoder.decode(codec.encoder.encode(sample)));
}

describe('round trip', () => {
	it('rebuilds every sample of a stream exactly', () => {
		const samples = buildSampleStream();
		const decoded = roundTrip(samples);

		expect(decoded).toHaveLength(samples.length);
		for (const [index, sample] of samples.entries()) {
			expect(decoded[index], `sample ${index}`).toEqual({ ...sample, clientId: 'client-42' });
		}
	});

	it('rebuilds a stream whose identifiers are uuid-packed', () => {
		const samples = buildUuidSampleStream();
		const decoded = roundTrip(samples, { uuid: true });

		for (const [index, sample] of samples.entries()) {
			expect(decoded[index], `sample ${index}`).toEqual({
				...sample,
				clientId: UUID_STREAM_IDS.clientId,
			});
		}
	});

	it('survives the values that are easy to lose', () => {
		const [first, second] = roundTrip(buildSampleStream({ sampleCount: 8 })).slice(5, 7);

		const audio = first!.peerConnections![0]!.inboundRtps!.find((rtp) => rtp.kind === 'audio')!;
		// `false` after a run of `true`, a zero counter, and an empty string —
		// each of which an earlier implementation silently dropped.
		expect(audio.powerEfficientDecoder).toBe(false);
		expect(audio.packetsLost).toBe(0);

		const video = second!.peerConnections![0]!.inboundRtps!.find((rtp) => rtp.kind === 'video')!;
		expect(video.decoderImplementation).toBe('');
	});

	it('keeps both entries when one sample carries two events of the same type', () => {
		const decoded = roundTrip(buildSampleStream())[0]!;

		expect(decoded.clientEvents).toHaveLength(2);
		expect(decoded.clientEvents!.map((event) => event.type)).toEqual([
			'CLIENT_JOINED',
			'CLIENT_JOINED',
		]);
		expect(decoded.clientEvents![1]!.payload).toEqual({ role: 'guest' });
	});

	it('tracks a stream that joins and leaves mid-call', () => {
		const decoded = roundTrip(buildSampleStream());
		const ssrcsAt = (index: number) =>
			decoded[index]!.peerConnections![0]!.inboundRtps!.map((rtp) => rtp.ssrc);

		expect(ssrcsAt(2)).toEqual([1_234_567_890, 2_345_678_901]);
		expect(ssrcsAt(4)).toEqual([1_234_567_890, 2_345_678_901, 3_456_789_012]);
		expect(ssrcsAt(6)).toEqual([1_234_567_890, 2_345_678_901]);
	});

	it('resends everything after a reset on both halves', () => {
		const samples = buildSampleStream();
		const codec = createClientSampleCodec({ clientId: 'client-42' });

		for (const sample of samples.slice(0, 4)) codec.decoder.decode(codec.encoder.encode(sample));

		codec.reset();
		const snapshot = codec.encoder.encode(samples[4]!);
		expect(codec.decoder.decode(snapshot)).toEqual({ ...samples[4], clientId: 'client-42' });

		// A reset really is a keyframe: a decoder that has never seen anything
		// can read it on its own.
		expect(new ClientSampleDecoder().decode(snapshot)).toEqual({
			...samples[4],
			clientId: 'client-42',
		});
	});

	it('round-trips through base64 as well as bytes', () => {
		const samples = buildSampleStream({ sampleCount: 3 });
		const encoder = new ClientSampleEncoder({ clientId: 'client-42' });
		const decoder = new ClientSampleDecoder();

		for (const sample of samples) {
			expect(decoder.decodeBase64(encoder.encodeToBase64(sample))).toEqual({
				...sample,
				clientId: 'client-42',
			});
		}
	});

	it('counts what it has processed', () => {
		const codec = createClientSampleCodec({ clientId: 'client-42' });
		for (const sample of buildSampleStream({ sampleCount: 5 })) {
			codec.decoder.decode(codec.encoder.encode(sample));
		}

		expect(codec.encoder.encodedSampleCount).toBe(5);
		expect(codec.decoder.decodedSampleCount).toBe(5);

		codec.reset();
		expect(codec.encoder.encodedSampleCount).toBe(0);
		expect(codec.decoder.decodedSampleCount).toBe(0);
	});
});
