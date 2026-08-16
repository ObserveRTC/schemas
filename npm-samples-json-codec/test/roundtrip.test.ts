import { describe, expect, it } from 'vitest';

import { ClientSampleDecoder, ClientSampleEncoder, createClientSampleCodec } from '../src/index.js';
import type { ClientSample } from '../src/index.js';
import { buildSampleStream } from './support/stream.js';

const CLIENT_ID = 'client-42';

function roundTrip(samples: readonly ClientSample[]): ClientSample[] {
	const codec = createClientSampleCodec({ clientId: CLIENT_ID });
	return samples.map((sample) => codec.decoder.decode(codec.encoder.encode(sample)));
}

describe('round trip', () => {
	it('rebuilds every sample of a stream exactly', () => {
		const samples = buildSampleStream();
		const decoded = roundTrip(samples);

		expect(decoded).toHaveLength(samples.length);
		for (const [index, sample] of samples.entries()) {
			expect(decoded[index], `sample ${index}`).toEqual({ ...sample, clientId: CLIENT_ID });
		}
	});

	it('survives the values that are easy to lose', () => {
		const [first, second] = roundTrip(buildSampleStream()).slice(5, 7);

		const audio = first!.peerConnections![0]!.inboundRtps!.find((rtp) => rtp.kind === 'audio')!;
		// `false` after a run of `true`, and a counter pinned at zero.
		expect(audio.powerEfficientDecoder).toBe(false);
		expect(audio.packetsLost).toBe(0);

		const video = second!.peerConnections![0]!.inboundRtps!.find((rtp) => rtp.kind === 'video')!;
		expect(video.decoderImplementation).toBe('');
	});

	it('keeps both entries when one sample carries two events of the same type', () => {
		const decoded = roundTrip(buildSampleStream())[0]!;

		expect(decoded.clientEvents).toHaveLength(2);
		expect(decoded.clientEvents![1]!.payload).toBe(JSON.stringify({ role: 'guest' }));
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
		const codec = createClientSampleCodec({ clientId: CLIENT_ID });

		for (const sample of samples.slice(0, 4)) codec.decoder.decode(codec.encoder.encode(sample));

		codec.reset();
		const snapshot = codec.encoder.encode(samples[4]!);
		expect(codec.decoder.decode(snapshot)).toEqual({ ...samples[4], clientId: CLIENT_ID });

		// A reset really is a keyframe: a decoder that has seen nothing can read it.
		expect(new ClientSampleDecoder().decode(snapshot)).toEqual({
			...samples[4],
			clientId: CLIENT_ID,
		});
	});

	it('round-trips through JSON text as well as through objects', () => {
		const encoder = new ClientSampleEncoder({ clientId: CLIENT_ID });
		const decoder = new ClientSampleDecoder();

		for (const sample of buildSampleStream({ sampleCount: 4 })) {
			expect(decoder.decodeJson(encoder.encodeToJson(sample))).toEqual({
				...sample,
				clientId: CLIENT_ID,
			});
		}
	});

	it('hands out a fresh object each time, so a caller may keep or mutate it', () => {
		const codec = createClientSampleCodec({ clientId: CLIENT_ID });
		const samples = buildSampleStream({ sampleCount: 3 });

		const first = codec.decoder.decode(codec.encoder.encode(samples[0]!));
		const firstTimestamp = first.timestamp;
		// Vandalise the decoder's previous output; the next one must be unaffected.
		first.timestamp = -1;
		(first.peerConnections![0]!.inboundRtps![0] as { kind: string }).kind = 'vandalised';

		const second = codec.decoder.decode(codec.encoder.encode(samples[1]!));

		expect(second.timestamp).toBe(firstTimestamp + 1000);
		expect(second.peerConnections![0]!.inboundRtps![0]!.kind).toBe('audio');
	});

	it('is not fooled by an attachments object the caller mutates in place', () => {
		const codec = createClientSampleCodec({ clientId: CLIENT_ID });
		const [sample] = buildSampleStream({ sampleCount: 1 });
		const attachments = { app: 'observertc-tests', build: 'deterministic' };
		sample!.attachments = attachments;

		codec.decoder.decode(codec.encoder.encode(sample!));

		// Same object, different content. Comparing by reference would miss this.
		attachments.build = 'mutated-in-place';
		const second = codec.decoder.decode(codec.encoder.encode(sample!));

		expect(second.attachments).toEqual({ app: 'observertc-tests', build: 'mutated-in-place' });
	});

	it('counts what it has processed', () => {
		const codec = createClientSampleCodec({ clientId: CLIENT_ID });
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
