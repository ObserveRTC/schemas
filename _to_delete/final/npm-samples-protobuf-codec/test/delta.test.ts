import { describe, expect, it } from 'vitest';

import { ClientSampleEncoder } from '../src/index.js';
import { buildSampleStream } from './support/stream.js';

/**
 * The delta behaviour itself, asserted on the wire message rather than on the
 * round trip — a codec that re-sent everything every tick would pass every
 * round-trip test in the suite and still be worthless.
 */
describe('delta encoding', () => {
	it('omits fields that did not change', () => {
		const samples = buildSampleStream();
		const encoder = new ClientSampleEncoder({ clientId: 'client-42' });

		const first = encoder.encodeToMessage(samples[0]!);
		const second = encoder.encodeToMessage(samples[1]!);

		const firstAudio = first.peerConnections[0]!.inboundRtps[0]!;
		const secondAudio = second.peerConnections[0]!.inboundRtps[0]!;

		// Constant for the whole call.
		expect(firstAudio.transportId).toBe('T01');
		expect(secondAudio.transportId).toBeUndefined();
		expect(secondAudio.mid).toBeUndefined();
		expect(secondAudio.kind).toBeUndefined();

		// Moving every tick.
		expect(secondAudio.bytesReceived).toBeDefined();
		expect(secondAudio.packetsReceived).toBeDefined();
	});

	it('always repeats the key of a collection entry, so entries stay matchable', () => {
		const samples = buildSampleStream();
		const encoder = new ClientSampleEncoder({ clientId: 'client-42' });

		encoder.encodeToMessage(samples[0]!);
		const second = encoder.encodeToMessage(samples[1]!);

		for (const rtp of second.peerConnections[0]!.inboundRtps) expect(rtp.ssrc).toBeDefined();
		for (const codec of second.peerConnections[0]!.codecs) expect(codec.id).toBeDefined();
		expect(second.peerConnections[0]!.peerConnectionId).toBeDefined();
		expect(second.clientId).toBeDefined();
	});

	it('does not resend attachments that were rebuilt into an equal object', () => {
		const samples = buildSampleStream();
		const encoder = new ClientSampleEncoder({ clientId: 'client-42' });

		const first = encoder.encodeToMessage(samples[0]!);
		const second = encoder.encodeToMessage(samples[1]!);

		expect(first.peerConnections[0]!.attachments).toBeDefined();
		expect(second.peerConnections[0]!.attachments).toBeUndefined();
	});

	it('sends a sub-message only when one of its own fields moved', () => {
		const encoder = new ClientSampleEncoder({ clientId: 'client-42' });
		const [first, second] = buildSampleStream({ sampleCount: 2 });

		// Same quality-limitation durations twice in a row.
		const pinned = structuredClone(second!);
		pinned.peerConnections![0]!.outboundRtps![1]!.qualityLimitationDurations =
			first!.peerConnections![0]!.outboundRtps![1]!.qualityLimitationDurations;
		pinned.peerConnections![0]!.outboundRtps![1]!.psnrSum =
			first!.peerConnections![0]!.outboundRtps![1]!.psnrSum;

		encoder.encodeToMessage(first!);
		const wire = encoder.encodeToMessage(pinned);

		const video = wire.peerConnections[0]!.outboundRtps[1]!;
		expect(video.qualityLimitationDurations).toBeUndefined();
		expect(video.psnrSum).toBeUndefined();
	});

	it('drops an entry from the message when the entity leaves the call', () => {
		const samples = buildSampleStream();
		const encoder = new ClientSampleEncoder({ clientId: 'client-42' });
		const messages = samples.map((sample) => encoder.encodeToMessage(sample));

		expect(messages[4]!.peerConnections[0]!.inboundRtps).toHaveLength(3);
		expect(messages[6]!.peerConnections[0]!.inboundRtps).toHaveLength(2);
	});

	it('resends the full state of an entity that comes back', () => {
		const samples = buildSampleStream({ sampleCount: 8 });
		const encoder = new ClientSampleEncoder({ clientId: 'client-42' });

		samples.forEach((sample) => encoder.encodeToMessage(sample));

		// Tick 3 introduced the screen share; tick 6 dropped it. Feeding tick 3
		// again must re-establish it from scratch rather than assume the decoder
		// still remembers it.
		const revived = encoder.encodeToMessage(samples[3]!);
		const screenShare = revived.peerConnections[0]!.inboundRtps.find(
			(rtp) => rtp.ssrc === 3_456_789_012n,
		)!;

		expect(screenShare.kind).toBe('video');
		expect(screenShare.trackIdentifier).toBeDefined();
	});

	it('is substantially smaller than encoding each sample in full', () => {
		const samples = buildSampleStream({ sampleCount: 30 });

		const delta = new ClientSampleEncoder({ clientId: 'client-42' });
		const deltaBytes = samples.reduce((total, sample) => total + delta.encode(sample).byteLength, 0);

		// A fresh encoder per sample is exactly "no delta at all".
		const snapshotBytes = samples.reduce(
			(total, sample) => total + new ClientSampleEncoder({ clientId: 'client-42' }).encode(sample).byteLength,
			0,
		);

		expect(deltaBytes).toBeLessThan(snapshotBytes * 0.7);
	});
});
