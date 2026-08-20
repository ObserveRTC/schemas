import type {
	ClientSample,
	InboundRtpStats,
	OutboundRtpStats,
	PeerConnectionSample,
} from '../../src/generated/samples.js';

/**
 * A deterministic stand-in for a real call.
 *
 * Every value here is reproducible from the seed, because the golden fixtures
 * are byte-exact and a stream that wobbled between runs would make them
 * useless. The shape is deliberately awkward in the places that have bitten
 * this codec before: counters that stay put for several ticks, booleans that go
 * back to `false`, zeroes and empty strings, tracks that appear and vanish
 * mid-call, attachments that are rebuilt into an equal object every tick.
 */

/** mulberry32 — small, fast, and stable across Node versions. */
function seededRandom(seed: number): () => number {
	let state = seed >>> 0;
	return () => {
		state = (state + 0x6d2b79f5) >>> 0;
		let t = state;
		t = Math.imul(t ^ (t >>> 15), t | 1);
		t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
		return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
	};
}

export interface StreamOptions {
	readonly seed?: number;
	readonly sampleCount?: number;
	readonly callId?: string;
	readonly clientId?: string;
	readonly peerConnectionId?: string;
	/** Start timestamp in epoch milliseconds. */
	readonly startedAt?: number;
}

export const UUID_STREAM_IDS = {
	callId: '6b3f0e1a-2c4d-4f8b-9a1e-0d7c5b3a2f10',
	clientId: 'f1e2d3c4-b5a6-4978-8a9b-0c1d2e3f4a5b',
	peerConnectionId: '0a1b2c3d-4e5f-4061-8273-8495a6b7c8d9',
	trackIdentifier: '9f8e7d6c-5b4a-4392-8180-7f6e5d4c3b2a',
} as const;

/**
 * Build a plausible sequence of samples for one client on one peer connection.
 *
 * Ticks are one second apart, counters accumulate, and the third inbound track
 * joins at tick 3 and leaves at tick 6 so that collection add/remove is
 * exercised rather than assumed.
 */
export function buildSampleStream(options: StreamOptions = {}): ClientSample[] {
	const {
		seed = 20260816,
		sampleCount = 8,
		callId = 'call-7f3a',
		peerConnectionId = 'pc-01',
		startedAt = 1_756_000_000_000,
	} = options;

	const random = seededRandom(seed);
	const jitter = (scale: number): number => Math.round(random() * scale * 1000) / 1000;

	let bytesReceived = 0;
	let packetsReceived = 0;
	let bytesSent = 0;
	let packetsSent = 0;
	let framesDecoded = 0;
	let framesEncoded = 0;

	const samples: ClientSample[] = [];

	for (let tick = 0; tick < sampleCount; tick += 1) {
		const timestamp = startedAt + tick * 1000;

		bytesReceived += 40_000 + Math.round(random() * 8_000);
		packetsReceived += 130 + Math.round(random() * 20);
		bytesSent += 52_000 + Math.round(random() * 9_000);
		packetsSent += 160 + Math.round(random() * 25);
		framesDecoded += 30;
		framesEncoded += 30;

		const inboundRtps: InboundRtpStats[] = [
			{
				id: 'IT01A',
				timestamp,
				ssrc: 1_234_567_890,
				kind: 'audio',
				trackIdentifier: 'track-remote-audio',
				// Deliberately constant after tick 0: the delta must stop sending it.
				transportId: 'T01',
				codecId: 'CIT01_111_minptime=10',
				mid: '0',
				bytesReceived,
				packetsReceived,
				// Stays exactly 0 for the whole call — a zero must survive the trip.
				packetsLost: 0,
				jitter: jitter(0.02),
				audioLevel: jitter(1),
				totalAudioEnergy: jitter(4),
				concealedSamples: 480 * tick,
				// Flips true at tick 2 and back to false at tick 5. The previous
				// encoder could never send `false`, so the flip back was lost.
				powerEfficientDecoder: tick >= 2 && tick < 5,
				attachments: { source: 'unit-test', tick },
			},
			{
				id: 'IT02V',
				timestamp,
				ssrc: 2_345_678_901,
				kind: 'video',
				trackIdentifier: 'track-remote-video',
				transportId: 'T01',
				codecId: 'CIT01_96_level-asymmetry-allowed=1',
				mid: '1',
				bytesReceived: bytesReceived * 9,
				packetsReceived: packetsReceived * 8,
				framesDecoded,
				frameWidth: tick < 4 ? 1280 : 640,
				frameHeight: tick < 4 ? 720 : 360,
				framesPerSecond: 30,
				// Large enough to matter for the int64 path.
				headerBytesReceived: 9_007_199_254_740_000 + tick,
				decoderImplementation: '',
				attachments: { source: 'unit-test', tick },
			},
		];

		// A screen share that joins late and leaves before the call ends.
		if (tick >= 3 && tick < 6) {
			inboundRtps.push({
				id: 'IT03V',
				timestamp,
				ssrc: 3_456_789_012,
				kind: 'video',
				trackIdentifier: 'track-remote-screen',
				transportId: 'T01',
				bytesReceived: 5_000 * (tick - 2),
				packetsReceived: 20 * (tick - 2),
				framesDecoded: 5 * (tick - 2),
			});
		}

		const outboundRtps: OutboundRtpStats[] = [
			{
				id: 'OT01A',
				timestamp,
				ssrc: 4_567_890_123,
				kind: 'audio',
				transportId: 'T01',
				mid: '0',
				bytesSent,
				packetsSent,
				active: tick !== 4,
				targetBitrate: 32_000,
			},
			{
				id: 'OT02V',
				timestamp,
				ssrc: 5_678_901_234,
				kind: 'video',
				transportId: 'T01',
				mid: '1',
				bytesSent: bytesSent * 11,
				packetsSent: packetsSent * 9,
				framesEncoded,
				frameWidth: 1280,
				frameHeight: 720,
				qualityLimitationReason: tick < 5 ? 'none' : 'bandwidth',
				qualityLimitationDurations: {
					none: tick < 5 ? tick : 5,
					cpu: 0,
					bandwidth: tick < 5 ? 0 : tick - 5,
					other: 0,
				},
				psnrSum: { y: jitter(100), u: jitter(80), v: jitter(80) },
				psnrMeasurements: framesEncoded,
				scalabilityMode: 'L1T3',
			},
		];

		const peerConnection: PeerConnectionSample = {
			peerConnectionId,
			score: 4.5 - jitter(0.5),
			scoreReasons: tick < 5 ? undefined : ['high-rtt'],
			// Rebuilt every tick with equal content: the codec compares by value,
			// so this must not put anything on the wire after the first sample.
			attachments: { role: 'publisher', region: 'eu-north-1' },
			inboundRtps,
			outboundRtps,
			codecs: [
				{ id: 'CIT01_111_minptime=10', timestamp, mimeType: 'audio/opus', clockRate: 48_000, channels: 2, payloadType: 111 },
				{ id: 'CIT01_96_level-asymmetry-allowed=1', timestamp, mimeType: 'video/H264', clockRate: 90_000, payloadType: 96 },
			],
			inboundTracks: [
				{ id: 'track-remote-audio', timestamp, kind: 'audio', score: 4.8 },
				{ id: 'track-remote-video', timestamp, kind: 'video', score: 4.2 },
			],
			outboundTracks: [{ id: 'track-local-video', timestamp, kind: 'video', score: 4.9 }],
			iceCandidatePairs: [
				{
					id: 'CP01',
					timestamp,
					// Walks through the enum, including the awkward `in-progress`.
					state: tick === 0 ? 'waiting' : tick === 1 ? 'in-progress' : 'succeeded',
					nominated: tick > 1,
					localCandidateId: 'LC01',
					remoteCandidateId: 'RC01',
					currentRoundTripTime: jitter(0.15),
					availableOutgoingBitrate: 1_800_000 + Math.round(random() * 200_000),
					bytesSent,
					bytesReceived,
				},
			],
			iceTransports: [
				{
					id: 'T01',
					timestamp,
					dtlsState: 'connected',
					iceState: tick === 0 ? 'checking' : 'connected',
					selectedCandidatePairId: 'CP01',
					bytesSent,
					bytesReceived,
					packetsSent,
					packetsReceived,
				},
			],
			dataChannels:
				tick < 2
					? undefined
					: [
							{
								id: 'DC01',
								timestamp,
								label: 'signalling',
								state: 'open',
								protocol: '',
								messagesSent: tick,
								bytesSent: 64 * tick,
							},
						],
		};

		samples.push({
			timestamp,
			callId,
			score: 4.6 - jitter(0.4),
			attachments: { app: 'observertc-tests', build: 'deterministic' },
			peerConnections: [peerConnection],
			clientEvents:
				tick === 0
					? [
							{ type: 'CLIENT_JOINED', timestamp, payload: { role: 'host' } },
							// Two events of the same type in one sample: the previous
							// encoder deduplicated the second one's `type` away.
							{ type: 'CLIENT_JOINED', timestamp, payload: { role: 'guest' } },
						]
					: undefined,
			clientIssues:
				tick === 5
					? [{ type: 'FREEZE', key: 'track-remote-video', timestamp, payload: { ms: 420 } }]
					: undefined,
			clientMetaItems:
				tick === 1
					? [{ type: 'MEDIA_TRACK_ADDED', timestamp, peerConnectionId, trackId: 'track-local-video', ssrc: 5_678_901_234 }]
					: undefined,
			extensionStats: tick === 2 ? [{ type: 'app-metric', payload: { queue: 3 } }] : undefined,
		});
	}

	return samples;
}

/**
 * The same stream, but with every identifier a real UUID, for exercising the
 * `uuid` wire encoding.
 */
export function buildUuidSampleStream(options: StreamOptions = {}): ClientSample[] {
	const samples = buildSampleStream({
		...options,
		callId: UUID_STREAM_IDS.callId,
		peerConnectionId: UUID_STREAM_IDS.peerConnectionId,
	});

	for (const sample of samples) {
		for (const peerConnection of sample.peerConnections ?? []) {
			for (const inboundRtp of peerConnection.inboundRtps ?? []) {
				inboundRtp.trackIdentifier = UUID_STREAM_IDS.trackIdentifier;
			}
		}
		for (const metaItem of sample.clientMetaItems ?? []) {
			metaItem.peerConnectionId = UUID_STREAM_IDS.peerConnectionId;
			metaItem.trackId = UUID_STREAM_IDS.trackIdentifier;
		}
	}

	return samples;
}
