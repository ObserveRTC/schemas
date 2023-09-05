import { OutboundAudioTrack } from "./InputSamples";
import { stringToBytesArray, uuidToByteArray } from "./encodingTools";
import { Samples_ClientSample_OutboundAudioTrack } from './OutputSamples';
import { ClientSampleEncodingOptions } from "./EncodingOptions";

export class OutboundAudioTrackEncoder {
	private readonly _ssrc?: bigint;
	private readonly _trackId: Uint8Array;
	private _active?: boolean;
	private _audioLevel?: number;
	private _averageRtcpInterval?: number;
	private _bytesSent?: number;
	private _droppedSamplesDuration?: number;
	private _droppedSamplesEvents?: number;
	private _echoReturnLoss?: number;
	private _echoReturnLossEnhancement?: number;
	private _encoderImplementation?: string;
	private _fractionLost?: number;
	private _headerBytesSent?: number;
	private _jitter?: number;
	private _nackCount?: number;
	private _packetsLost?: number;
	private _packetsReceived?: number;
	private _packetsSent?: number;
	private _peerConnectionId?: string;
	private _relayedSource?: boolean;
	private _retransmittedBytesSent?: number;
	private _retransmittedPacketsSent?: number;
	private _rid?: string;
	private _roundTripTime?: number;
	private _roundTripTimeMeasurements?: number;
	private _sfuStreamId?: string;
	private _targetBitrate?: number;
	private _totalAudioEnergy?: number;
	private _totalCaptureDelay?: number;
	private _totalEncodedBytesTarget?: number;
	private _totalPacketSendDelay?: number;
	private _totalRoundTripTime?: number;
	private _totalSamplesCaptured?: number;
	private _totalSamplesDuration?: number;
	private _visited = false;

	public constructor(
		public readonly trackId: string,
		public readonly ssrc: number,
		private readonly _encodingOptions: ClientSampleEncodingOptions,
	) {
		this._trackId = uuidToByteArray(trackId);
		this._ssrc = BigInt(ssrc);
	}

	public get visited(): boolean {
		const result = this._visited;
		this._visited = false;
		return result;
	}

	public encode(sample: OutboundAudioTrack): Samples_ClientSample_OutboundAudioTrack {
		this._visited = true;

		const result = new Samples_ClientSample_OutboundAudioTrack({
			trackId: this._trackId,
			ssrc: this._ssrc,
			active: this._encodeActive(sample.active),
			audioLevel: this._encodeAudioLevel(sample.audioLevel),
			averageRtcpInterval: this._encodeAverageRtcpInterval(sample.averageRtcpInterval),
			bytesSent: this._encodeBytesSent(sample.bytesSent),
			droppedSamplesDuration: this._encodeDroppedSamplesDuration(sample.droppedSamplesDuration),
			droppedSamplesEvents: this._encodeDroppedSamplesEvents(sample.droppedSamplesEvents),
			echoReturnLoss: this._encodeEchoReturnLoss(sample.echoReturnLoss),
			echoReturnLossEnhancement: this._encodeEchoReturnLossEnhancement(sample.echoReturnLossEnhancement),
			encoderImplementation: this._encodeEncoderImplementation(sample.encoderImplementation),
			fractionLost: this._encodeFractionLost(sample.fractionLost),
			headerBytesSent: this._encodeHeaderBytesSent(sample.headerBytesSent),
			jitter: this._encodeJitter(sample.jitter),
			nackCount: this._encodeNackCount(sample.nackCount),
			packetsLost: this._encodePacketsLost(sample.packetsLost),
			packetsReceived: this._encodePacketsReceived(sample.packetsReceived),
			packetsSent: this._encodePacketsSent(sample.packetsSent),
			peerConnectionId: this._encodePeerConnectionId(sample.peerConnectionId),
			relayedSource: this._encodeRelayedSource(sample.relayedSource),
			retransmittedBytesSent: this._encodeRetransmittedBytesSent(sample.retransmittedBytesSent),
			retransmittedPacketsSent: this._encodeRetransmittedPacketsSent(sample.retransmittedPacketsSent),
			rid: this._encodeRid(sample.rid),
			roundTripTime: this._encodeRoundTripTime(sample.roundTripTime),
			roundTripTimeMeasurements: this._encodeRoundTripTimeMeasurements(sample.roundTripTimeMeasurements),
			sfuStreamId: this._encodeSfuStreamId(sample.sfuStreamId),
			targetBitrate: this._encodeTargetBitrate(sample.targetBitrate),
			totalAudioEnergy: this._encodeTotalAudioEnergy(sample.totalAudioEnergy),
			totalCaptureDelay: this._encodeTotalCaptureDelay(sample.totalCaptureDelay),
			totalEncodedBytesTarget: this._encodeTotalEncodedBytesTarget(sample.totalEncodedBytesTarget),
			totalPacketSendDelay: this._encodeTotalPacketSendDelay(sample.totalPacketSendDelay),
			totalRoundTripTime: this._encodeTotalRoundTripTime(sample.totalRoundTripTime),
			totalSamplesCaptured: this._encodeTotalSamplesCaptured(sample.totalSamplesCaptured),
			totalSamplesDuration: this._encodeTotalSamplesDuration(sample.totalSamplesDuration),
		});
		return result;
	}

	private _encodeAudioLevel(audioLevel?: number): number | undefined {
		if (!audioLevel) return;
		if (audioLevel === this._audioLevel) return;
		this._audioLevel = audioLevel;
		return this._audioLevel;
	}
	  
	private _encodeActive(active?: boolean): boolean | undefined {
		if (active === undefined) return;
		if (active === this._active) return;
		this._active = active;
		return this._active;
	}
	
	private _encodeAverageRtcpInterval(averageRtcpInterval?: number): number | undefined {
		if (!averageRtcpInterval) return;
		if (averageRtcpInterval === this._averageRtcpInterval) return;
		this._averageRtcpInterval = averageRtcpInterval;
		return this._averageRtcpInterval;
	}
	
	private _encodeBytesSent(bytesSent?: number): bigint | undefined {
		if (!bytesSent) return;
		if (bytesSent === this._bytesSent) return;
		this._bytesSent = bytesSent;
		return BigInt(this._bytesSent);
	}
	
	private _encodeDroppedSamplesDuration(droppedSamplesDuration?: number): number | undefined {
		if (!droppedSamplesDuration) return;
		if (droppedSamplesDuration === this._droppedSamplesDuration) return;
		this._droppedSamplesDuration = droppedSamplesDuration;
		return this._droppedSamplesDuration;
	}
	
	private _encodeDroppedSamplesEvents(droppedSamplesEvents?: number): number | undefined {
		if (!droppedSamplesEvents) return;
		if (droppedSamplesEvents === this._droppedSamplesEvents) return;
		this._droppedSamplesEvents = droppedSamplesEvents;
		return this._droppedSamplesEvents;
	}
	
	private _encodeEchoReturnLoss(echoReturnLoss?: number): number | undefined {
		if (!echoReturnLoss) return;
		if (echoReturnLoss === this._echoReturnLoss) return;
		this._echoReturnLoss = echoReturnLoss;
		return this._echoReturnLoss;
	}
	
	private _encodeEchoReturnLossEnhancement(echoReturnLossEnhancement?: number): number | undefined {
		if (!echoReturnLossEnhancement) return;
		if (echoReturnLossEnhancement === this._echoReturnLossEnhancement) return;
		this._echoReturnLossEnhancement = echoReturnLossEnhancement;
		return this._echoReturnLossEnhancement;
	}
	
	private _encodeEncoderImplementation(encoderImplementation?: string): string | undefined {
		if (!encoderImplementation) return;
		if (encoderImplementation === this._encoderImplementation) return;
		this._encoderImplementation = encoderImplementation;
		return this._encoderImplementation;
	}
	
	private _encodeFractionLost(fractionLost?: number): number | undefined {
		if (!fractionLost) return;
		if (fractionLost === this._fractionLost) return;
		this._fractionLost = fractionLost;
		return this._fractionLost;
	}
	
	private _encodeHeaderBytesSent(headerBytesSent?: number): bigint | undefined {
		if (!headerBytesSent) return;
		if (headerBytesSent === this._headerBytesSent) return;
		this._headerBytesSent = headerBytesSent;
		return BigInt(this._headerBytesSent);
	}
	
	private _encodeJitter(jitter?: number): number | undefined {
		if (!jitter) return;
		if (jitter === this._jitter) return;
		this._jitter = jitter;
		return this._jitter;
	}
	
	private _encodeNackCount(nackCount?: number): number | undefined {
		if (!nackCount) return;
		if (nackCount === this._nackCount) return;
		this._nackCount = nackCount;
		return this._nackCount;
	}

	private _encodePacketsLost(packetsLost?: number): number | undefined {
		if (!packetsLost) return;
		if (packetsLost === this._packetsLost) return;
		this._packetsLost = packetsLost;
		return this._packetsLost;
	}
	
	private _encodePacketsReceived(packetsReceived?: number): number | undefined {
		if (!packetsReceived) return;
		if (packetsReceived === this._packetsReceived) return;
		this._packetsReceived = packetsReceived;
		return this._packetsReceived;
	}
	
	private _encodePacketsSent(packetsSent?: number): number | undefined {
		if (!packetsSent) return;
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
	
	private _encodeRelayedSource(relayedSource?: boolean): boolean | undefined {
		if (relayedSource === undefined) return;
		if (relayedSource === this._relayedSource) return;
		this._relayedSource = relayedSource;
		return this._relayedSource;
	}
	
	private _encodeRetransmittedBytesSent(retransmittedBytesSent?: number): bigint | undefined {
		if (!retransmittedBytesSent) return;
		if (retransmittedBytesSent === this._retransmittedBytesSent) return;
		this._retransmittedBytesSent = retransmittedBytesSent;
		return BigInt(this._retransmittedBytesSent);
	}
	
	private _encodeRetransmittedPacketsSent(retransmittedPacketsSent?: number): number | undefined {
		if (!retransmittedPacketsSent) return;
		if (retransmittedPacketsSent === this._retransmittedPacketsSent) return;
		this._retransmittedPacketsSent = retransmittedPacketsSent;
		return this._retransmittedPacketsSent;
	}
	
	private _encodeRid(rid?: string): string | undefined {
		if (!rid) return;
		if (rid === this._rid) return;
		this._rid = rid;
		return this._rid;
	}
	
	private _encodeRoundTripTime(roundTripTime?: number): number | undefined {
		if (!roundTripTime) return;
		if (roundTripTime === this._roundTripTime) return;
		this._roundTripTime = roundTripTime;
		return this._roundTripTime;
	}
	
	private _encodeRoundTripTimeMeasurements(roundTripTimeMeasurements?: number): number | undefined {
		if (!roundTripTimeMeasurements) return;
		if (roundTripTimeMeasurements === this._roundTripTimeMeasurements) return;
		this._roundTripTimeMeasurements = roundTripTimeMeasurements;
		return this._roundTripTimeMeasurements;
	}
	
	private _encodeSfuStreamId(sfuStreamId?: string): Uint8Array | undefined {
		if (!sfuStreamId) return;
		if (sfuStreamId === this._sfuStreamId) return;
		this._sfuStreamId = sfuStreamId;
		return this._encodingOptions.sfuStreamIdIsUuid
			? uuidToByteArray(this._sfuStreamId) 
			: stringToBytesArray(this._sfuStreamId)
		;
	}

	private _encodeTargetBitrate(targetBitrate?: number): number | undefined {
		if (!targetBitrate) return;
		if (targetBitrate === this._targetBitrate) return;
		this._targetBitrate = targetBitrate;
		return this._targetBitrate;
	}
	
	private _encodeTotalAudioEnergy(totalAudioEnergy?: number): number | undefined {
		if (!totalAudioEnergy) return;
		if (totalAudioEnergy === this._totalAudioEnergy) return;
		this._totalAudioEnergy = totalAudioEnergy;
		return this._totalAudioEnergy;
	}
	
	private _encodeTotalCaptureDelay(totalCaptureDelay?: number): number | undefined {
		if (!totalCaptureDelay) return;
		if (totalCaptureDelay === this._totalCaptureDelay) return;
		this._totalCaptureDelay = totalCaptureDelay;
		return this._totalCaptureDelay;
	}
	
	private _encodeTotalEncodedBytesTarget(totalEncodedBytesTarget?: number): bigint | undefined {
		if (!totalEncodedBytesTarget) return;
		if (totalEncodedBytesTarget === this._totalEncodedBytesTarget) return;
		this._totalEncodedBytesTarget = totalEncodedBytesTarget;
		return BigInt(this._totalEncodedBytesTarget);
	}
	
	private _encodeTotalPacketSendDelay(totalPacketSendDelay?: number): number | undefined {
		if (!totalPacketSendDelay) return;
		if (totalPacketSendDelay === this._totalPacketSendDelay) return;
		this._totalPacketSendDelay = totalPacketSendDelay;
		return this._totalPacketSendDelay;
	}
	
	private _encodeTotalRoundTripTime(totalRoundTripTime?: number): number | undefined {
		if (!totalRoundTripTime) return;
		if (totalRoundTripTime === this._totalRoundTripTime) return;
		this._totalRoundTripTime = totalRoundTripTime;
		return this._totalRoundTripTime;
	}
	
	private _encodeTotalSamplesCaptured(totalSamplesCaptured?: number): number | undefined {
		if (!totalSamplesCaptured) return;
		if (totalSamplesCaptured === this._totalSamplesCaptured) return;
		this._totalSamplesCaptured = totalSamplesCaptured;
		return this._totalSamplesCaptured;
	}
	
	private _encodeTotalSamplesDuration(totalSamplesDuration?: number): number | undefined {
		if (!totalSamplesDuration) return;
		if (totalSamplesDuration === this._totalSamplesDuration) return;
		this._totalSamplesDuration = totalSamplesDuration;
		return this._totalSamplesDuration;
	}
}
