import { InboundAudioTrack } from './OutputSamples';
import { byteArrayToUuid, bytesArrayToString } from "./decodingTools";
import { Samples_ClientSample_InboundAudioTrack } from './InputSamples';
import { ClientSampleDecodingOptions } from './DecodingOptions';

export class InboundAudioTrackDecoder {
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
		public readonly ssrc: number,
		private readonly _options: ClientSampleDecodingOptions,
	) {
		// empty
	}

	public get visited(): boolean {
		const result = this._visited;
		this._visited = false;
		return result;
	}

	public decode(sample: Samples_ClientSample_InboundAudioTrack): InboundAudioTrack {
		this._visited = true;

		const result: InboundAudioTrack = {
			trackId: this.trackId,
			ssrc: this.ssrc,
			audioLevel: this._decodeAudioLevel(sample.audioLevel),
			bytesReceived: this._decodeBytesReceived(sample.bytesReceived),
			bytesSent: this._decodeBytesSent(sample.bytesSent),
			concealedSamples: this._decodeConcealedSamples(sample.concealedSamples),
			concealmentEvents: this._decodeConcealmentEvents(sample.concealmentEvents),
			decoderImplementation: this._decodeDecoderImplementation(sample.decoderImplementation),
			estimatedPlayoutTimestamp: this._decodeEstimatedPlayoutTimestamp(sample.estimatedPlayoutTimestamp),
			fecPacketsDiscarded: this._decodeFecPacketsDiscarded(sample.fecPacketsDiscarded),
			fecPacketsReceived: this._decodeFecPacketsReceived(sample.fecPacketsReceived),
			headerBytesReceived: this._decodeHeaderBytesReceived(sample.headerBytesReceived),
			insertedSamplesForDeceleration: this._decodeInsertedSamplesForDeceleration(sample.insertedSamplesForDeceleration),
			jitter: this._decodeJitter(sample.jitter),
			jitterBufferDelay: this._decodeJitterBufferDelay(sample.jitterBufferDelay),
			jitterBufferEmittedCount: this._decodeJitterBufferEmittedCount(sample.jitterBufferEmittedCount),
			jitterBufferMinimumDelay: this._decodeJitterBufferMinimumDelay(sample.jitterBufferMinimumDelay),
			jitterBufferTargetDelay: this._decodeJitterBufferTargetDelay(sample.jitterBufferTargetDelay),
			lastPacketReceivedTimestamp: this._decodeLastPacketReceivedTimestamp(sample.lastPacketReceivedTimestamp),
			nackCount: this._decodeNackCount(sample.nackCount),
			totalProcessingDelay: this._decodeTotalProcessingDelay(sample.totalProcessingDelay),
			packetsDiscarded: this._decodePacketsDiscarded(sample.packetsDiscarded),
			packetsLost: this._decodePacketsLost(sample.packetsLost),
			packetsReceived: this._decodePacketsReceived(sample.packetsReceived),
			packetsSent: this._decodePacketsSent(sample.packetsSent),
			peerConnectionId: this._decodePeerConnectionId(sample.peerConnectionId),
			remoteClientId: this._decodeRemoteClientId(sample.remoteClientId),
			remoteTimestamp: this._decodeRemoteTimestamp(sample.remoteTimestamp),
			removedSamplesForAcceleration: this._decodeRemovedSamplesForAcceleration(sample.removedSamplesForAcceleration),
			reportsSent: this._decodeReportsSent(sample.reportsSent),
			roundTripTime: this._decodeRoundTripTime(sample.roundTripTime),
			roundTripTimeMeasurements: this._decodeRoundTripTimeMeasurements(sample.roundTripTimeMeasurements),
			sfuSinkId: this._decodeSfuSinkId(sample.sfuSinkId),
			sfuStreamId: this._decodeSfuStreamId(sample.sfuStreamId),
			silentConcealedSamples: this._decodeSilentConcealedSamples(sample.silentConcealedSamples),
			synthesizedSamplesDuration: this._decodeSynthesizedSamplesDuration(sample.synthesizedSamplesDuration),
			synthesizedSamplesEvents: this._decodeSynthesizedSamplesEvents(sample.synthesizedSamplesEvents),
			totalAudioEnergy: this._decodeTotalAudioEnergy(sample.totalAudioEnergy),
			totalPlayoutDelay: this._decodeTotalPlayoutDelay(sample.totalPlayoutDelay),
			totalRoundTripTime: this._decodeTotalRoundTripTime(sample.totalRoundTripTime),
			totalSamplesCount: this._decodeTotalSamplesCount(sample.totalSamplesCount),
			totalSamplesDuration: this._decodeTotalSamplesDuration(sample.totalSamplesDuration),
			totalSamplesReceived: this._decodeTotalSamplesReceived(sample.totalSamplesReceived),
		};
		return result;
	}

	private _decodeAudioLevel(audioLevel?: number): number | undefined {
		if (audioLevel === undefined) return this._audioLevel;
		this._audioLevel = audioLevel;
		return this._audioLevel;
	}
	
	private _decodeBytesReceived(bytesReceived?: bigint): number | undefined {
		if (bytesReceived === undefined) return this._bytesReceived;
		this._bytesReceived = Number(bytesReceived);
		return this._bytesReceived;
	}
	
	private _decodeBytesSent(bytesSent?: bigint): number | undefined {
		if (bytesSent === undefined) return this._bytesSent;
		this._bytesSent = Number(bytesSent);
		return this._bytesSent;
	}
	
	private _decodeConcealedSamples(concealedSamples?: number): number | undefined {
		if (concealedSamples === undefined) return this._concealedSamples;
		this._concealedSamples = concealedSamples;
		return this._concealedSamples;
	}
	
	private _decodeConcealmentEvents(concealmentEvents?: number): number | undefined {
		if (concealmentEvents === undefined) return this._concealmentEvents;
		this._concealmentEvents = concealmentEvents;
		return this._concealmentEvents;
	}
	
	private _decodeDecoderImplementation(decoderImplementation?: string): string | undefined {
		if (!decoderImplementation) return this._decoderImplementation;
		this._decoderImplementation = decoderImplementation;
		return this._decoderImplementation;
	}
	
	private _decodeEstimatedPlayoutTimestamp(estimatedPlayoutTimestamp?: bigint): number | undefined {
		if (estimatedPlayoutTimestamp === undefined) return this._estimatedPlayoutTimestamp;
		this._estimatedPlayoutTimestamp = Number(estimatedPlayoutTimestamp);
		return this._estimatedPlayoutTimestamp;
	}
	
	private _decodeFecPacketsDiscarded(fecPacketsDiscarded?: number): number | undefined {
		if (fecPacketsDiscarded === undefined) return this._fecPacketsDiscarded;
		this._fecPacketsDiscarded = fecPacketsDiscarded;
		return this._fecPacketsDiscarded;
	}
	
	private _decodeFecPacketsReceived(fecPacketsReceived?: number): number | undefined {
		if (fecPacketsReceived === undefined) return this._fecPacketsReceived;
		this._fecPacketsReceived = fecPacketsReceived;
		return this._fecPacketsReceived;
	}
	
	private _decodeHeaderBytesReceived(headerBytesReceived?: bigint): number | undefined {
		if (headerBytesReceived === undefined) return this._headerBytesReceived;
		this._headerBytesReceived = Number(headerBytesReceived);
		return this._headerBytesReceived;
	}

	private _decodeInsertedSamplesForDeceleration(insertedSamplesForDeceleration?: number): number | undefined {
		if (insertedSamplesForDeceleration === undefined) return this._insertedSamplesForDeceleration;
		this._insertedSamplesForDeceleration = insertedSamplesForDeceleration;
		return this._insertedSamplesForDeceleration;
	}
	
	private _decodeJitter(jitter?: number): number | undefined {
		if (jitter === undefined) return this._jitter;
		this._jitter = jitter;
		return this._jitter;
	}
	
	private _decodeJitterBufferDelay(jitterBufferDelay?: number): number | undefined {
		if (jitterBufferDelay === undefined) return this._jitterBufferDelay;
		this._jitterBufferDelay = jitterBufferDelay;
		return this._jitterBufferDelay;
	}
	
	private _decodeJitterBufferEmittedCount(jitterBufferEmittedCount?: number): number | undefined {
		if (jitterBufferEmittedCount === undefined) return this._jitterBufferEmittedCount;
		this._jitterBufferEmittedCount = jitterBufferEmittedCount;
		return this._jitterBufferEmittedCount;
	}
	
	private _decodeJitterBufferMinimumDelay(jitterBufferMinimumDelay?: number): number | undefined {
		if (jitterBufferMinimumDelay === undefined) return this._jitterBufferMinimumDelay;
		this._jitterBufferMinimumDelay = jitterBufferMinimumDelay;
		return this._jitterBufferMinimumDelay;
	}
	
	private _decodeJitterBufferTargetDelay(jitterBufferTargetDelay?: number): number | undefined {
		if (jitterBufferTargetDelay === undefined) return this._jitterBufferTargetDelay;
		this._jitterBufferTargetDelay = jitterBufferTargetDelay;
		return this._jitterBufferTargetDelay;
	}
	
	private _decodeLastPacketReceivedTimestamp(lastPacketReceivedTimestamp?: bigint): number | undefined {
		if (lastPacketReceivedTimestamp === undefined) return this._lastPacketReceivedTimestamp;
		this._lastPacketReceivedTimestamp = Number(lastPacketReceivedTimestamp);
		return this._lastPacketReceivedTimestamp;
	}
	
	private _decodeNackCount(nackCount?: number): number | undefined {
		if (nackCount === undefined) return this._nackCount;
		this._nackCount = nackCount;
		return this._nackCount;
	}
	
	private _decodeTotalProcessingDelay(totalProcessingDelay?: number): number | undefined {
		if (totalProcessingDelay === undefined) return this._totalProcessingDelay;
		this._totalProcessingDelay = totalProcessingDelay;
		return this._totalProcessingDelay;
	}
	
	private _decodePacketsDiscarded(packetsDiscarded?: number): number | undefined {
		if (packetsDiscarded === undefined) return this._packetsDiscarded;
		this._packetsDiscarded = packetsDiscarded;
		return this._packetsDiscarded
	}

	private _decodePacketsLost(packetsLost?: number): number | undefined {
		if (packetsLost === undefined) return this._packetsLost;
		this._packetsLost = packetsLost;
		return this._packetsLost;
	}
	
	private _decodePacketsReceived(packetsReceived?: number): number | undefined {
		if (packetsReceived === undefined) return this._packetsReceived;
		this._packetsReceived = packetsReceived;
		return this._packetsReceived;
	}

	private _decodePacketsSent(packetsSent?: number): number | undefined {
		if (packetsSent === undefined) return this._packetsSent;
		this._packetsSent = packetsSent;
		return this._packetsSent;
	}
	
	private _decodePeerConnectionId(peerConnectionId?: Uint8Array): string | undefined {
		if (!peerConnectionId) return this._peerConnectionId;
		this._peerConnectionId = byteArrayToUuid(peerConnectionId);
		return this._peerConnectionId;
	}
	
	private _decodeRemoteClientId(remoteClientId?: Uint8Array): string | undefined {
		if (!remoteClientId) return this._remoteClientId;
		this._remoteClientId = byteArrayToUuid(remoteClientId);
		return this._remoteClientId;
	}
	
	private _decodeRemoteTimestamp(remoteTimestamp?: bigint): number | undefined {
		if (remoteTimestamp === undefined) return this._remoteTimestamp;
		this._remoteTimestamp = Number(remoteTimestamp);
		return this._remoteTimestamp;
	}
	
	private _decodeRemovedSamplesForAcceleration(removedSamplesForAcceleration?: number): number | undefined {
		if (removedSamplesForAcceleration === undefined) return this._removedSamplesForAcceleration;
		this._removedSamplesForAcceleration = removedSamplesForAcceleration;
		return this._removedSamplesForAcceleration;
	}
	
	private _decodeReportsSent(reportsSent?: number): number | undefined {
		if (reportsSent === undefined) return this._reportsSent;
		this._reportsSent = reportsSent;
		return this._reportsSent;
	}
	
	private _decodeRoundTripTime(roundTripTime?: number): number | undefined {
		if (roundTripTime === undefined) return this._roundTripTime;
		this._roundTripTime = roundTripTime;
		return this._roundTripTime;
	}
	
	private _decodeRoundTripTimeMeasurements(roundTripTimeMeasurements?: number): number | undefined {
		if (roundTripTimeMeasurements === undefined) return this._roundTripTimeMeasurements;
		this._roundTripTimeMeasurements = roundTripTimeMeasurements;
		return this._roundTripTimeMeasurements;
	}
	
	private _decodeSfuSinkId(sfuSinkId?: Uint8Array): string | undefined {
		if (!sfuSinkId) return this._sfuSinkId;
		this._sfuSinkId = this._options.sfuSinkIdIsUuid
			? byteArrayToUuid(sfuSinkId)
			: bytesArrayToString(sfuSinkId)
		;
	}
	
	private _decodeSfuStreamId(sfuStreamId?: Uint8Array): string | undefined {
		if (!sfuStreamId) return this._sfuStreamId;
		 this._sfuStreamId = this._options.sfuStreamIdIsUuid
			? byteArrayToUuid(sfuStreamId)
			: bytesArrayToString(sfuStreamId)
		;
	}
	
	private _decodeSilentConcealedSamples(silentConcealedSamples?: number): number | undefined {
		if (silentConcealedSamples === undefined) return this._silentConcealedSamples;
		this._silentConcealedSamples = silentConcealedSamples;
		return this._silentConcealedSamples;
	}
	
	private _decodeSynthesizedSamplesDuration(synthesizedSamplesDuration?: number): number | undefined {
		if (synthesizedSamplesDuration === undefined) return this._synthesizedSamplesDuration;
		this._synthesizedSamplesDuration = synthesizedSamplesDuration;
		return this._synthesizedSamplesDuration;
	}
	
	private _decodeSynthesizedSamplesEvents(synthesizedSamplesEvents?: number): number | undefined {
		if (synthesizedSamplesEvents === undefined) return this._synthesizedSamplesEvents;
		this._synthesizedSamplesEvents = synthesizedSamplesEvents;
		return this._synthesizedSamplesEvents;
	}

	private _decodeTotalAudioEnergy(totalAudioEnergy?: number): number | undefined {
		if (totalAudioEnergy === undefined) return this._totalAudioEnergy;
		this._totalAudioEnergy = totalAudioEnergy;
		return this._totalAudioEnergy;
	}
	
	private _decodeTotalPlayoutDelay(totalPlayoutDelay?: number): number | undefined {
		if (totalPlayoutDelay === undefined) return this._totalPlayoutDelay;
		this._totalPlayoutDelay = totalPlayoutDelay;
		return this._totalPlayoutDelay;
	}
	
	private _decodeTotalRoundTripTime(totalRoundTripTime?: number): number | undefined {
		if (totalRoundTripTime === undefined) return this._totalRoundTripTime;
		this._totalRoundTripTime = totalRoundTripTime;
		return this._totalRoundTripTime;
	}
	
	private _decodeTotalSamplesCount(totalSamplesCount?: number): number | undefined {
		if (totalSamplesCount === undefined) return this._totalSamplesCount;
		this._totalSamplesCount = totalSamplesCount;
		return this._totalSamplesCount;
	}
	
	private _decodeTotalSamplesDuration(totalSamplesDuration?: number): number | undefined {
		if (totalSamplesDuration === undefined) return this._totalSamplesDuration;
		this._totalSamplesDuration = totalSamplesDuration;
		return this._totalSamplesDuration;
	}
	
	private _decodeTotalSamplesReceived(totalSamplesReceived?: number): number | undefined {
		if (totalSamplesReceived === undefined) return this._totalSamplesReceived;
		this._totalSamplesReceived = totalSamplesReceived;
		return this._totalSamplesReceived;
	}

	
}