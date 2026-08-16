import { describe, expect, it } from 'vitest';

import { ClientSampleEncoder } from '../src/index.js';
import { buildSampleStream } from './support/stream.js';

/**
 * The delta behaviour itself, asserted on the emitted message rather than on
 * the round trip — a codec that re-sent everything every tick would pass every
 * round-trip test in the suite and still be worthless.
 */
describe('delta encoding', () => {
	it('omits fields that did not change', () => {
		const samples = buildSampleStream();
		const encoder = new ClientSampleEncoder({ clientId: 'client-42' });

		const first = encoder.encode(samples[0]!);
		const second = encoder.encode(samples[1]!);

		const firstAudio = first.peerConnections![0]!.inboundRtps![0]!;
		const secondAudio = second.peerConnections![0]!.inboundRtps![0]!;

		expect(firstAudio.transportId).toBe('T01');
		// Constant for the whole call — said once.
		expect(secondAudio).not.toHaveProperty('transportId');
		expect(secondAudio).not.toHaveProperty('mid');
		expect(secondAudio).not.toHaveProperty('kind');

		// Moving every tick.
		expect(secondAudio.bytesReceived).toBeDefined();
		expect(secondAudio.packetsReceived).toBeDefined();
	});

	it('always repeats the key of a collection entry, so entries stay matchable', () => {
		const samples = buildSampleStream();
		const encoder = new ClientSampleEncoder({ clientId: 'client-42' });

		encoder.encode(samples[0]!);
		const second = encoder.encode(samples[1]!);

		for (const rtp of second.peerConnections![0]!.inboundRtps!) expect(rtp.ssrc).toBeDefined();
		for (const codec of second.peerConnections![0]!.codecs!) expect(codec.id).toBeDefined();
		expect(second.peerConnections![0]!.peerConnectionId).toBeDefined();
		expect(second.clientId).toBeDefined();
	});

	it('does not resend attachments that were rebuilt into an equal object', () => {
		const samples = buildSampleStream();
		const encoder = new ClientSampleEncoder({ clientId: 'client-42' });

		const first = encoder.encode(samples[0]!);
		const second = encoder.encode(samples[1]!);

		expect(first.peerConnections![0]!.attachments).toBeDefined();
		expect(second.peerConnections![0]!).not.toHaveProperty('attachments');
	});

	it('sends a sub-object only when one of its own fields moved', () => {
		const encoder = new ClientSampleEncoder({ clientId: 'client-42' });
		const [first, second] = buildSampleStream({ sampleCount: 2 });

		const pinned = structuredClone(second!);
		pinned.peerConnections![0]!.outboundRtps![1]!.qualityLimitationDurations =
			first!.peerConnections![0]!.outboundRtps![1]!.qualityLimitationDurations;
		pinned.peerConnections![0]!.outboundRtps![1]!.psnrSum =
			first!.peerConnections![0]!.outboundRtps![1]!.psnrSum;

		encoder.encode(first!);
		const video = encoder.encode(pinned).peerConnections![0]!.outboundRtps![1]!;

		expect(video).not.toHaveProperty('qualityLimitationDurations');
		expect(video).not.toHaveProperty('psnrSum');
	});

	it('sends only the sub-object fields that moved', () => {
		const encoder = new ClientSampleEncoder({ clientId: 'client-42' });
		const [first, second] = buildSampleStream({ sampleCount: 2 });

		const nudged = structuredClone(second!);
		const durations = first!.peerConnections![0]!.outboundRtps![1]!.qualityLimitationDurations!;
		nudged.peerConnections![0]!.outboundRtps![1]!.qualityLimitationDurations = {
			...durations,
			bandwidth: durations.bandwidth + 1,
		};

		encoder.encode(first!);
		const emitted =
			encoder.encode(nudged).peerConnections![0]!.outboundRtps![1]!.qualityLimitationDurations!;

		expect(Object.keys(emitted)).toEqual(['bandwidth']);
	});

	it('drops an entry from the message when the entity leaves the call', () => {
		const encoder = new ClientSampleEncoder({ clientId: 'client-42' });
		const messages = buildSampleStream().map((sample) => encoder.encode(sample));

		expect(messages[4]!.peerConnections![0]!.inboundRtps).toHaveLength(3);
		expect(messages[6]!.peerConnections![0]!.inboundRtps).toHaveLength(2);
	});

	it('resends the full state of an entity that comes back', () => {
		const samples = buildSampleStream();
		const encoder = new ClientSampleEncoder({ clientId: 'client-42' });
		samples.forEach((sample) => encoder.encode(sample));

		// Tick 3 introduced the screen share and tick 6 dropped it, so feeding
		// tick 3 again must re-establish it rather than assume it is remembered.
		const revived = encoder.encode(samples[3]!);
		const screenShare = revived.peerConnections![0]!.inboundRtps!.find(
			(rtp) => rtp.ssrc === 3_456_789_012,
		)!;

		expect(screenShare.kind).toBe('video');
		expect(screenShare.trackIdentifier).toBeDefined();
	});

	it('is substantially smaller than encoding each sample in full', () => {
		const samples = buildSampleStream({ sampleCount: 30 });

		const delta = new ClientSampleEncoder({ clientId: 'client-42' });
		const deltaBytes = samples.reduce(
			(total, sample) => total + delta.encodeToJson(sample).length,
			0,
		);

		// A fresh encoder per sample is exactly "no delta at all".
		const snapshotBytes = samples.reduce(
			(total, sample) =>
				total + new ClientSampleEncoder({ clientId: 'client-42' }).encodeToJson(sample).length,
			0,
		);

		expect(deltaBytes).toBeLessThan(snapshotBytes * 0.7);
	});

	it('emits a delta that is itself a valid partial sample, with nothing invented', () => {
		const encoder = new ClientSampleEncoder({ clientId: 'client-42' });
		const samples = buildSampleStream({ sampleCount: 3 });

		const sampleKeys = new Set(Object.keys(samples[1]!).concat('clientId'));
		encoder.encode(samples[0]!);
		const delta = encoder.encode(samples[1]!);

		// No markers, no wrappers, no renamed fields — every key belongs to the
		// schema, which is what makes a delta readable without a decoder.
		for (const key of Object.keys(delta)) expect(sampleKeys).toContain(key);
	});
});
