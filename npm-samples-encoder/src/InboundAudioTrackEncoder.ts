import { InboundAudioTrack } from "./InputSamples";
import { uuidToByteArray } from "./encodingTools";
import { Samples_ClientSample_InboundAudioTrack } from './OutputSamples';

export class InboundAudioTrackEncoder {
	private readonly _ssrc?: bigint;
	private readonly _trackId: Uint8Array;
	private _peerConnectionId?: string;
	private _remoteClientId?: string;
	private _sfuStreamId?: string;
	private _sfuSinkId?: string;
	private _packetsReceived?: number;
	private _packetsLost?: number;
	private _jitter?: number;
	private _lastPacketReceivedTimestamp?: number;
	private _headerBytesReceived?: number;
	private _packetsDiscarded?: number;
	private _fecPacketsReceived?: number;
	private _fecPacketsDiscarded?: number;
	private _bytesReceived?: number;
	private _nackCount?: number;
	private _totalProcessingDelay?: number;
	private _estimatedPlayoutTimestamp?: number;
	private _jitterBufferDelay?: number;
	private _jitterBufferTargetDelay?: number;
	private _jitterBufferEmittedCount?: number;
	private _jitterBufferMinimumDelay?: number;
	private _totalSamplesReceived?: number;
	private _concealedSamples?: number;
	private _silentConcealedSamples?: number;
	private _concealmentEvents?: number;
	private _insertedSamplesForDeceleration?: number;
	private _removedSamplesForAcceleration?: number;
	private _audioLevel?: number;
	private _totalAudioEnergy?: number;
	private _totalSamplesDuration?: number;
	private _decoderImplementation?: string;
	private _packetsSent?: number;
	private _bytesSent?: number;
	private _remoteTimestamp?: number;
	private _reportsSent?: number;
	private _roundTripTime?: number;
	private _totalRoundTripTime?: number;
	private _roundTripTimeMeasurements?: number;
	private _synthesizedSamplesDuration?: number;
	private _synthesizedSamplesEvents?: number;
	private _totalPlayoutDelay?: number;
	private _totalSamplesCount?: number;
	private _visited = false;

	public constructor(
		public readonly trackId: string,
		public readonly ssrc: number
	) {
		this._trackId = uuidToByteArray(trackId);
		this._ssrc = BigInt(ssrc);
	}

	public get visited(): boolean {
		const result = this._visited;
		this._visited = false;
		return result;
	}

	public encode(sample: InboundAudioTrack): Samples_ClientSample_InboundAudioTrack {
		this._visited = true;

		const result = new Samples_ClientSample_InboundAudioTrack({
			trackId: this._trackId,
			ssrc: this._ssrc,
			audioLevel: this._encodeAudioLevel(sample.audioLevel),
			bytesReceived: this._encodeBytesReceived(sample.bytesReceived),
			bytesSent: this._encodeBytesSent(sample.bytesSent),
			concealedSamples: this._encodeConcealedSamples(sample.concealedSamples),
			concealmentEvents: this._encodeConcealmentEvents(sample.concealmentEvents),
			decoderImplementation: this._encodeDecoderImplementation(sample.decoderImplementation),
			estimatedPlayoutTimestamp: this._encodeEstimatedPlayoutTimestamp(sample.estimatedPlayoutTimestamp),
			fecPacketsDiscarded: this._encodeFecPacketsDiscarded(sample.fecPacketsDiscarded),
			fecPacketsReceived: this._encodeFecPacketsReceived(sample.fecPacketsReceived),
			headerBytesReceived: this._encodeHeaderBytesReceived(sample.headerBytesReceived),
			insertedSamplesForDeceleration: this._encodeInsertedSamplesForDeceleration(sample.insertedSamplesForDeceleration),
			jitter: this._encodeJitter(sample.jitter),
			jitterBufferDelay: this._encodeJitterBufferDelay(sample.jitterBufferDelay),
			jitterBufferEmittedCount: this._encodeJitterBufferEmittedCount(sample.jitterBufferEmittedCount),
			jitterBufferMinimumDelay: this._encodeJitterBufferMinimumDelay(sample.jitterBufferMinimumDelay),
			jitterBufferTargetDelay: this._encodeJitterBufferTargetDelay(sample.jitterBufferTargetDelay),
			lastPacketReceivedTimestamp: this._encodeLastPacketReceivedTimestamp(sample.lastPacketReceivedTimestamp),
			nackCount: this._encodeNackCount(sample.nackCount),
			totalProcessingDelay: this._encodeTotalProcessingDelay(sample.totalProcessingDelay),
			packetsDiscarded: this._encodePacketsDiscarded(sample.packetsDiscarded),
			packetsLost: this._encodePacketsLost(sample.packetsLost),
			packetsReceived: this._encodePacketsReceived(sample.packetsReceived),
			packetsSent: this._encodePacketsSent(sample.packetsSent),
			peerConnectionId: this._encodePeerConnectionId(sample.peerConnectionId),
			remoteClientId: this._encodeRemoteClientId(sample.remoteClientId),
			remoteTimestamp: this._encodeRemoteTimestamp(sample.remoteTimestamp),
			removedSamplesForAcceleration: this._encodeRemovedSamplesForAcceleration(sample.removedSamplesForAcceleration),
			reportsSent: this._encodeReportsSent(sample.reportsSent),
			roundTripTime: this._encodeRoundTripTime(sample.roundTripTime),
			roundTripTimeMeasurements: this._encodeRoundTripTimeMeasurements(sample.roundTripTimeMeasurements),
			sfuSinkId: this._encodeSfuSinkId(sample.sfuSinkId),
			sfuStreamId: this._encodeSfuStreamId(sample.sfuStreamId),
			silentConcealedSamples: this._encodeSilentConcealedSamples(sample.silentConcealedSamples),
			synthesizedSamplesDuration: this._encodeSynthesizedSamplesDuration(sample.synthesizedSamplesDuration),
			synthesizedSamplesEvents: this._encodeSynthesizedSamplesEvents(sample.synthesizedSamplesEvents),
			totalAudioEnergy: this._encodeTotalAudioEnergy(sample.totalAudioEnergy),
			totalPlayoutDelay: this._encodeTotalPlayoutDelay(sample.totalPlayoutDelay),
			totalRoundTripTime: this._encodeTotalRoundTripTime(sample.totalRoundTripTime),
			totalSamplesCount: this._encodeTotalSamplesCount(sample.totalSamplesCount),
			totalSamplesDuration: this._encodeTotalSamplesDuration(sample.totalSamplesDuration),
			totalSamplesReceived: this._encodeTotalSamplesReceived(sample.totalSamplesReceived),
		});
		return result;
	}

	private _encodeAudioLevel(audioLevel?: number): number | undefined {
		if (!audioLevel) return;
		if (audioLevel === this._audioLevel) return;
		this._audioLevel = audioLevel;
		return this._audioLevel;
	}
	  
	private _encodeBytesReceived(bytesReceived?: number): bigint | undefined {
		if (bytesReceived === undefined) return;
		if (bytesReceived === this._bytesReceived) return;
		this._bytesReceived = bytesReceived;
		return BigInt(this._bytesReceived);
	}
	  
	private _encodeFecPacketsDiscarded(fecPacketsDiscarded?: number): number | undefined {
		if (fecPacketsDiscarded === undefined) return;
		if (fecPacketsDiscarded === this._fecPacketsDiscarded) return;
		this._fecPacketsDiscarded = fecPacketsDiscarded;
		return this._fecPacketsDiscarded;
	  }
	  
	private _encodeFecPacketsReceived(fecPacketsReceived?: number): number | undefined {
		if (fecPacketsReceived === undefined) return;
		if (fecPacketsReceived === this._fecPacketsReceived) return;
		this._fecPacketsReceived = fecPacketsReceived;
		return this._fecPacketsReceived;
	  }
	  
	private _encodeHeaderBytesReceived(headerBytesReceived?: number): bigint | undefined {
		if (headerBytesReceived === undefined) return;
		if (headerBytesReceived === this._headerBytesReceived) return;
		this._headerBytesReceived = headerBytesReceived;
		return BigInt(this._headerBytesReceived);
	}
	  
	private _encodeInsertedSamplesForDeceleration(insertedSamplesForDeceleration?: number): number | undefined {
		if (insertedSamplesForDeceleration === undefined) return;
		if (insertedSamplesForDeceleration === this._insertedSamplesForDeceleration) return;
		this._insertedSamplesForDeceleration = insertedSamplesForDeceleration;
		return this._insertedSamplesForDeceleration;
	}
	  
	private _encodeJitter(jitter?: number): number | undefined {
		if (jitter === undefined) return;
		if (jitter === this._jitter) return;
		this._jitter = jitter;
		return this._jitter;
	}
	  
	private _encodeJitterBufferDelay(jitterBufferDelay?: number): number | undefined {
		if (jitterBufferDelay === undefined) return;
		if (jitterBufferDelay === this._jitterBufferDelay) return;
		this._jitterBufferDelay = jitterBufferDelay;
		return this._jitterBufferDelay;
	}
	  
	private _encodeJitterBufferEmittedCount(jitterBufferEmittedCount?: number): number | undefined {
		if (jitterBufferEmittedCount === undefined) return;
		if (jitterBufferEmittedCount === this._jitterBufferEmittedCount) return;
		this._jitterBufferEmittedCount = jitterBufferEmittedCount;
		return this._jitterBufferEmittedCount;
	}
	  
	private _encodeJitterBufferMinimumDelay(jitterBufferMinimumDelay?: number): number | undefined {
		if (jitterBufferMinimumDelay === undefined) return;
		if (jitterBufferMinimumDelay === this._jitterBufferMinimumDelay) return;
		this._jitterBufferMinimumDelay = jitterBufferMinimumDelay;
		return this._jitterBufferMinimumDelay;
	}
	  
	private _encodeJitterBufferTargetDelay(jitterBufferTargetDelay?: number): number | undefined {
		if (jitterBufferTargetDelay === undefined) return;
		if (jitterBufferTargetDelay === this._jitterBufferTargetDelay) return;
		this._jitterBufferTargetDelay = jitterBufferTargetDelay;
		return this._jitterBufferTargetDelay;
	}
	  
	private _encodeBytesSent(bytesSent?: number): bigint | undefined {
		if (bytesSent === undefined) return;
		if (bytesSent === this._bytesSent) return;
		this._bytesSent = bytesSent;
		return BigInt(this._bytesSent);
	  }
	  
	private _encodeConcealedSamples(concealedSamples?: number): number | undefined {
		if (concealedSamples === undefined) return;
		if (concealedSamples === this._concealedSamples) return;
		this._concealedSamples = concealedSamples;
		return this._concealedSamples;
	}
	  
	private _encodeConcealmentEvents(concealmentEvents?: number): number | undefined {
		if (concealmentEvents === undefined) return;
		if (concealmentEvents === this._concealmentEvents) return;
		this._concealmentEvents = concealmentEvents;
		return this._concealmentEvents;
	}
	  
	private _encodeDecoderImplementation(decoderImplementation?: string): string | undefined {
		if (!decoderImplementation) return;
		if (decoderImplementation === this._decoderImplementation) return;
		this._decoderImplementation = decoderImplementation;
		return this._decoderImplementation;
	}
	  
	private _encodeEstimatedPlayoutTimestamp(estimatedPlayoutTimestamp?: number): bigint | undefined {
		if (estimatedPlayoutTimestamp === undefined) return;
		if (estimatedPlayoutTimestamp === this._estimatedPlayoutTimestamp) return;
		this._estimatedPlayoutTimestamp = estimatedPlayoutTimestamp;
		return BigInt(this._estimatedPlayoutTimestamp);
	}
	  
	private _encodeLastPacketReceivedTimestamp(lastPacketReceivedTimestamp?: number): bigint | undefined {
		if (lastPacketReceivedTimestamp === undefined) return;
		if (lastPacketReceivedTimestamp === this._lastPacketReceivedTimestamp) return;
		this._lastPacketReceivedTimestamp = lastPacketReceivedTimestamp;
		return BigInt(this._lastPacketReceivedTimestamp);
	}
	  
	private _encodeNackCount(nackCount?: number): number | undefined {
		if (nackCount === undefined) return;
		if (nackCount === this._nackCount) return;
		this._nackCount = nackCount;
		return this._nackCount;
	}

	private _encodeTotalProcessingDelay(totalProcessingDelay?: number): number | undefined {
		if (totalProcessingDelay === undefined) return;
		if (totalProcessingDelay === this._totalProcessingDelay) return;
		this._totalProcessingDelay = totalProcessingDelay;
		return this._totalProcessingDelay;
	}
	  
	private _encodePacketsDiscarded(packetsDiscarded?: number): number | undefined {
		if (packetsDiscarded === undefined) return;
		if (packetsDiscarded === this._packetsDiscarded) return;
		this._packetsDiscarded = packetsDiscarded;
		return this._packetsDiscarded;
	}
	  
	private _encodePacketsLost(packetsLost?: number): number | undefined {
		if (packetsLost === undefined) return;
		if (packetsLost === this._packetsLost) return;
		this._packetsLost = packetsLost;
		return this._packetsLost;
	}
	  
	private _encodePacketsReceived(packetsReceived?: number): number | undefined {
		if (packetsReceived === undefined) return;
		if (packetsReceived === this._packetsReceived) return;
		this._packetsReceived = packetsReceived;
		return this._packetsReceived;
	}
	  
	private _encodePacketsSent(packetsSent?: number): number | undefined {
		if (packetsSent === undefined) return;
		if (packetsSent === this._packetsSent) return;
		this._packetsSent = packetsSent;
		return this._packetsSent;
	}

	private _encodePeerConnectionId(peerConnectionId?: string): Uint8Array | undefined {
		if (!peerConnectionId) return;
		if (peerConnectionId === this._peerConnectionId) return;
		this._peerConnectionId = peerConnectionId;
		return uuidToByteArray(this._peerConnectionId);
	}

	private _encodeRemoteClientId(remoteClientId?: string): Uint8Array | undefined {
		if (!remoteClientId) return;
		if (remoteClientId === this._remoteClientId) return;
		this._remoteClientId = remoteClientId;
		return uuidToByteArray(this._remoteClientId);
	}

	private _encodeRemoteTimestamp(remoteTimestamp?: number): bigint | undefined {
		if (remoteTimestamp === undefined) return;
		if (remoteTimestamp === this._remoteTimestamp) return;
		this._remoteTimestamp = remoteTimestamp;
		return BigInt(this._remoteTimestamp);
	}

	private _encodeRemovedSamplesForAcceleration(removedSamplesForAcceleration?: number): number | undefined {
		if (removedSamplesForAcceleration === undefined) return;
		if (removedSamplesForAcceleration === this._removedSamplesForAcceleration) return;
		this._removedSamplesForAcceleration = removedSamplesForAcceleration;
		return this._removedSamplesForAcceleration;
	}

	private _encodeReportsSent(reportsSent?: number): number | undefined {
		if (reportsSent === undefined) return;
		if (reportsSent === this._reportsSent) return;
		this._reportsSent = reportsSent;
		return this._reportsSent;
	}

	private _encodeRoundTripTime(roundTripTime?: number): number | undefined {
		if (roundTripTime === undefined) return;
		if (roundTripTime === this._roundTripTime) return;
		this._roundTripTime = roundTripTime;
		return this._roundTripTime;
	}

	private _encodeRoundTripTimeMeasurements(roundTripTimeMeasurements?: number): number | undefined {
		if (roundTripTimeMeasurements === undefined) return;
		if (roundTripTimeMeasurements === this._roundTripTimeMeasurements) return;
		this._roundTripTimeMeasurements = roundTripTimeMeasurements;
		return this._roundTripTimeMeasurements;
	}

	private _encodeSfuSinkId(sfuSinkId?: string): Uint8Array | undefined {
		if (!sfuSinkId) return;
		if (sfuSinkId === this._sfuSinkId) return;
		this._sfuSinkId = sfuSinkId;
		return uuidToByteArray(this._sfuSinkId);
	}

	private _encodeSfuStreamId(sfuStreamId?: string): Uint8Array | undefined {
		if (!sfuStreamId) return;
		if (sfuStreamId === this._sfuStreamId) return;
		this._sfuStreamId = sfuStreamId;
		return uuidToByteArray(this._sfuStreamId);
	}

	private _encodeSilentConcealedSamples(silentConcealedSamples?: number): number | undefined {
		if (silentConcealedSamples === undefined) return;
		if (silentConcealedSamples === this._silentConcealedSamples) return;
		this._silentConcealedSamples = silentConcealedSamples;
		return this._silentConcealedSamples;
	}

	private _encodeSynthesizedSamplesDuration(synthesizedSamplesDuration?: number): number | undefined {
		if (synthesizedSamplesDuration === undefined) return;
		if (synthesizedSamplesDuration === this._synthesizedSamplesDuration) return;
		this._synthesizedSamplesDuration = synthesizedSamplesDuration;
		return this._synthesizedSamplesDuration;
	}

	private _encodeTotalAudioEnergy(totalAudioEnergy?: number): number | undefined {
		if (totalAudioEnergy === undefined) return;
		if (totalAudioEnergy === this._totalAudioEnergy) return;
		this._totalAudioEnergy = totalAudioEnergy;
		return this._totalAudioEnergy;
	  }
	  
	private _encodeTotalPlayoutDelay(totalPlayoutDelay?: number): number | undefined {
		if (totalPlayoutDelay === undefined) return;
		if (totalPlayoutDelay === this._totalPlayoutDelay) return;
		this._totalPlayoutDelay = totalPlayoutDelay;
		return this._totalPlayoutDelay;
	}
	  
	private _encodeSynthesizedSamplesEvents(synthesizedSamplesEvents?: number): number | undefined {
		if (synthesizedSamplesEvents === undefined) return;
		if (synthesizedSamplesEvents === this._synthesizedSamplesEvents) return;
		this._synthesizedSamplesEvents = synthesizedSamplesEvents;
		return this._synthesizedSamplesEvents;
	}
	  
	private _encodeTotalRoundTripTime(totalRoundTripTime?: number): number | undefined {
		if (totalRoundTripTime === undefined) return;
		if (totalRoundTripTime === this._totalRoundTripTime) return;
		this._totalRoundTripTime = totalRoundTripTime;
		return this._totalRoundTripTime;
	}
	  
	private _encodeTotalSamplesCount(totalSamplesCount?: number): number | undefined {
		if (totalSamplesCount === undefined) return;
		if (totalSamplesCount === this._totalSamplesCount) return;
		this._totalSamplesCount = totalSamplesCount;
		return this._totalSamplesCount;
	}
	  
	private _encodeTotalSamplesDuration(totalSamplesDuration?: number): number | undefined {
		if (totalSamplesDuration === undefined) return;
		if (totalSamplesDuration === this._totalSamplesDuration) return;
		this._totalSamplesDuration = totalSamplesDuration;
		return this._totalSamplesDuration;
	}
	  
	private _encodeTotalSamplesReceived(totalSamplesReceived?: number): number | undefined {
		if (totalSamplesReceived === undefined) return;
		if (totalSamplesReceived === this._totalSamplesReceived) return;
		this._totalSamplesReceived = totalSamplesReceived;
		return this._totalSamplesReceived;
	}
}
