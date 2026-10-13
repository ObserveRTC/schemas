import { describe, expect, it } from 'vitest';

import { ClientSampleEncoder } from '../src/index.js';
import type { ClientSample, ClientSampleDelta } from '../src/index.js';
import { buildSampleStream } from './support/stream.js';

/**
 * The delta behaviour itself, asserted on the emitted message rather than on
 * the round trip — a codec that re-sent everything every tick would pass every
 * round-trip test in the suite and still be worthless.
 */

/** The delta an encoder emits for a sample, as a plain object for inspection. */
function deltaOf(encoder: ClientSampleEncoder, sample: ClientSample): ClientSampleDelta {
	return JSON.parse(encoder.encodeToJson(sample));
}

/** A keyframe's list is a plain array. */
function listOf(list: unknown): Record<string, unknown>[] {
	expect(Array.isArray(list)).toBe(true);
	return list as Record<string, unknown>[];
}

/** The per-entry update list of a delta's entry list. */
function updatesOf(list: unknown): Record<string, unknown>[] {
	expect(list).toBeTypeOf('object');
	expect(list).not.toBeNull();
	const l = list as { e?: unknown; l?: unknown };
	if (l.e !== undefined) {
		expect(l.l).toBeUndefined();
		return l.e as Record<string, unknown>[];
	}
	throw new Error(`expected an entry-update list, got ${JSON.stringify(list)}`);
}

describe('delta encoding', () => {
	it('omits fields that did not change', () => {
		const samples = buildSampleStream();
		const encoder = new ClientSampleEncoder({ clientId: 'client-42' });

		const first = deltaOf(encoder, samples[0]!);
		const second = deltaOf(encoder, samples[1]!);

		// The first message is a keyframe: plain lists, full entries.
		const firstAudio = listOf(first.peerConnections![0]!.inboundRtps!)[0]!;
		// The second is a delta: the list is a per-entry update list.
		const secondAudio = updatesOf(second.peerConnections![0]!.inboundRtps!)[0]!;

		expect(firstAudio.transportId).toBe('T01');
		// Constant for the whole call — said once.
		expect(secondAudio).not.toHaveProperty('transportId');
		expect(secondAudio).not.toHaveProperty('mid');
		expect(secondAudio).not.toHaveProperty('kind');

		// Moving every tick.
		expect(secondAudio.bytesReceived).toBeDefined();
		expect(secondAudio.packetsReceived).toBeDefined();
		expect(secondAudio.timestamp).toBeDefined();
	});

	it('keeps every entry of an update list matchable by id', () => {
		const samples = buildSampleStream();
		const encoder = new ClientSampleEncoder({ clientId: 'client-42' });

		deltaOf(encoder, samples[0]!);
		const second = deltaOf(encoder, samples[1]!);

		for (const update of updatesOf(second.peerConnections![0]!.inboundRtps!)) expect(update.id).toBeTypeOf('string');
		for (const update of updatesOf(second.peerConnections![0]!.codecs!)) expect(update.id).toBeTypeOf('string');

		// Unchanged scalars are simply not re-said — the constant
		// peerConnectionId and clientId travel with the keyframe only.
		expect(second.peerConnections![0]!).not.toHaveProperty('peerConnectionId');
		expect(second).not.toHaveProperty('clientId');
	});

	it('does not resend attachments that were rebuilt into an equal object', () => {
		const samples = buildSampleStream();
		const encoder = new ClientSampleEncoder({ clientId: 'client-42' });

		const first = deltaOf(encoder, samples[0]!);
		const second = deltaOf(encoder, samples[1]!);

		expect(first.peerConnections![0]!.attachments).toBeDefined();
		expect(second.peerConnections![0]!).not.toHaveProperty('attachments');
	});

	it('sends a changed sub-object whole, and omits it when it is equal', () => {
		const encoder = new ClientSampleEncoder({ clientId: 'client-42' });
		const [first, second] = buildSampleStream({ sampleCount: 2 });

		const pinned = structuredClone(second!);
		pinned.peerConnections![0]!.outboundRtps![1]!.qualityLimitationDurations =
			first!.peerConnections![0]!.outboundRtps![1]!.qualityLimitationDurations;
		pinned.peerConnections![0]!.outboundRtps![1]!.psnrSum =
			first!.peerConnections![0]!.outboundRtps![1]!.psnrSum;

		deltaOf(encoder, first!);
		const pinnedUpdate = updatesOf(deltaOf(encoder, pinned).peerConnections![0]!.outboundRtps!)[1]!;
		expect(pinnedUpdate).not.toHaveProperty('qualityLimitationDurations');
		expect(pinnedUpdate).not.toHaveProperty('psnrSum');

		const nudged = structuredClone(second!);
		const durations = first!.peerConnections![0]!.outboundRtps![1]!.qualityLimitationDurations!;
		nudged.peerConnections![0]!.outboundRtps![1]!.qualityLimitationDurations = {
			...durations,
			bandwidth: durations.bandwidth + 1,
		};

		deltaOf(encoder, first!);
		const emitted = updatesOf(deltaOf(encoder, nudged).peerConnections![0]!.outboundRtps!)[1]!
			.qualityLimitationDurations as Record<string, unknown>;

		// A sub-object is one opaque value: any field that moved sends the
		// whole object, not the field.
		expect(emitted).toEqual({
			none: durations.none,
			cpu: durations.cpu,
			bandwidth: durations.bandwidth + 1,
			other: durations.other,
		});
	});

	it('drops an entry from the message when the entity leaves the call', () => {
		const encoder = new ClientSampleEncoder({ clientId: 'client-42' });
		const messages = buildSampleStream().map((sample) => deltaOf(encoder, sample));

		// Tick 3 added the screen share (a new id: the whole list goes), and
		// tick 4 saw no change to the id sequence: per-entry updates, three of
		// them, one per entry.
		expect(updatesOf(messages[4]!.peerConnections![0]!.inboundRtps!)).toHaveLength(3);
		// Tick 6 dropped it: the id sequence changed again, whole list, two
		// entries.
		const left = messages[6]!.peerConnections![0]!.inboundRtps as { l: unknown[] };
		expect(left.l).toHaveLength(2);
	});

	it('resends the full state of an entity that comes back', () => {
		const samples = buildSampleStream();
		const encoder = new ClientSampleEncoder({ clientId: 'client-42' });
		samples.forEach((sample) => deltaOf(encoder, sample));

		// Tick 3 introduced the screen share and tick 6 dropped it, so feeding
		// tick 3 again must re-establish it rather than assume it is remembered.
		const revived = deltaOf(encoder, samples[3]!);
		const screenShare = (
			(revived.peerConnections![0]!.inboundRtps as { l?: unknown[]; e?: unknown[] }).l ??
			(revived.peerConnections![0]!.inboundRtps as { l?: unknown[]; e?: unknown[] }).e!
		).find((rtp) => (rtp as { ssrc?: number }).ssrc === 3_456_789_012) as { kind?: string; trackIdentifier?: string };

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
		deltaOf(encoder, samples[0]!);
		const delta = deltaOf(encoder, samples[1]!);

		// No wrappers, no renamed top-level fields — every key belongs to the
		// schema, which is what makes a delta readable without a decoder. The
		// only marker is the list-level `e`/`l`, inside a schema field.
		for (const key of Object.keys(delta)) expect(sampleKeys).toContain(key);
	});
});
