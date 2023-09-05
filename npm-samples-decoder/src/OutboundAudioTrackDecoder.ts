import { OutboundAudioTrack } from "./OutputSamples";
import { byteArrayToUuid, bytesArrayToString } from "./decodingTools";
import { Samples_ClientSample_OutboundAudioTrack } from './InputSamples';
import { ClientSampleDecodingOptions } from "./DecodingOptions";

export class OutboundAudioTrackDecoder {
	private _peerConnectionId?: string;
	private _sfuStreamId?: string;
	private _packetsSent?: number;
	private _bytesSent?: number;
	private _rid?: string;
	private _headerBytesSent?: number;
	private _retransmittedPacketsSent?: number;
	private _retransmittedBytesSent?: number;
	private _targetBitrate?: number;
	private _totalEncodedBytesTarget?: number;
	private _totalPacketSendDelay?: number;
	private _averageRtcpInterval?: number;
	private _nackCount?: number;
	private _encoderImplementation?: string;
	private _active?: boolean;
	private _packetsReceived?: number;
	private _packetsLost?: number;
	private _jitter?: number;
	private _roundTripTime?: number;
	private _totalRoundTripTime?: number;
	private _fractionLost?: number;
	private _roundTripTimeMeasurements?: number;
	private _relayedSource?: boolean;
	private _audioLevel?: number;
	private _totalAudioEnergy?: number;
	private _totalSamplesDuration?: number;
	private _echoReturnLoss?: number;
	private _echoReturnLossEnhancement?: number;
	private _droppedSamplesDuration?: number;
	private _droppedSamplesEvents?: number;
	private _totalCaptureDelay?: number;
	private _totalSamplesCaptured?: number;

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

	public decode(sample: Samples_ClientSample_OutboundAudioTrack): OutboundAudioTrack {
		this._visited = true;

		const result: OutboundAudioTrack = {
			ssrc: this.ssrc,
			trackId: this.trackId,
			peerConnectionId: this._decodePeerConnectionId(sample.peerConnectionId),
			sfuStreamId: this._decodeSfuStreamId(sample.sfuStreamId),
			packetsSent: this._decodePacketsSent(sample.packetsSent),
			bytesSent: this._decodeBytesSent(sample.bytesSent),
			rid: this._decodeRid(sample.rid),
			headerBytesSent: this._decodeHeaderBytesSent(sample.headerBytesSent),
			retransmittedPacketsSent: this._decodeRetransmittedPacketsSent(sample.retransmittedPacketsSent),
			retransmittedBytesSent: this._decodeRetransmittedBytesSent(sample.retransmittedBytesSent),
			targetBitrate: this._decodeTargetBitrate(sample.targetBitrate),
			totalEncodedBytesTarget: this._decodeTotalEncodedBytesTarget(sample.totalEncodedBytesTarget),
			totalPacketSendDelay: this._decodeTotalPacketSendDelay(sample.totalPacketSendDelay),
			averageRtcpInterval: this._decodeAverageRtcpInterval(sample.averageRtcpInterval),
			nackCount: this._decodeNackCount(sample.nackCount),
			encoderImplementation: this._decodeEncoderImplementation(sample.encoderImplementation),
			active: this._decodeActive(sample.active),
			packetsReceived: this._decodePacketsReceived(sample.packetsReceived),
			packetsLost: this._decodePacketsLost(sample.packetsLost),
			jitter: this._decodeJitter(sample.jitter),
			roundTripTime: this._decodeRoundTripTime(sample.roundTripTime),
			totalRoundTripTime: this._decodeTotalRoundTripTime(sample.totalRoundTripTime),
			fractionLost: this._decodeFractionLost(sample.fractionLost),
			roundTripTimeMeasurements: this._decodeRoundTripTimeMeasurements(sample.roundTripTimeMeasurements),
			relayedSource: this._decodeRelayedSource(sample.relayedSource),
			audioLevel: this._decodeAudioLevel(sample.audioLevel),
			totalAudioEnergy: this._decodeTotalAudioEnergy(sample.totalAudioEnergy),
			totalSamplesDuration: this._decodeTotalSamplesDuration(sample.totalSamplesDuration),
			echoReturnLoss: this._decodeEchoReturnLoss(sample.echoReturnLoss),
			echoReturnLossEnhancement: this._decodeEchoReturnLossEnhancement(sample.echoReturnLossEnhancement),
			droppedSamplesDuration: this._decodeDroppedSamplesDuration(sample.droppedSamplesDuration),
			droppedSamplesEvents: this._decodeDroppedSamplesEvents(sample.droppedSamplesEvents),
			totalCaptureDelay: this._decodeTotalCaptureDelay(sample.totalCaptureDelay),
			totalSamplesCaptured: this._decodeTotalSamplesCaptured(sample.totalSamplesCaptured),
		};
		return result;
	}

	private _decodeBytesSent(bytesSent?: bigint): number | undefined {
		if (bytesSent === undefined) return this._bytesSent;
		this._bytesSent = Number(bytesSent);
		return this._bytesSent;
	}

	private _decodeJitter(jitter?: number): number | undefined {
		if (jitter === undefined) return this._jitter;
		this._jitter = jitter;
		return this._jitter;
	}
	
	private _decodeNackCount(nackCount?: number): number | undefined {
		if (nackCount === undefined) return this._nackCount;
		this._nackCount = nackCount;
		return this._nackCount;
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
	
	
	private _decodeSfuStreamId(sfuStreamId?: Uint8Array): string | undefined {
		if (!sfuStreamId) return this._sfuStreamId;
		 this._sfuStreamId = this._options.sfuStreamIdIsUuid
			? byteArrayToUuid(sfuStreamId)
			: bytesArrayToString(sfuStreamId)
		;
	}
	
	private _decodeTotalRoundTripTime(totalRoundTripTime?: number): number | undefined {
		if (totalRoundTripTime === undefined) return this._totalRoundTripTime;
		this._totalRoundTripTime = totalRoundTripTime;
		return this._totalRoundTripTime;
	}

	private _decodeRid(rid?: string): string | undefined {
		if (rid === undefined) return this._rid;
		this._rid = rid;
		return this._rid;
	}
	
	private _decodeHeaderBytesSent(headerBytesSent?: bigint): number | undefined {
		if (headerBytesSent === undefined) return this._headerBytesSent;
		this._headerBytesSent = Number(headerBytesSent);
		return this._headerBytesSent;
	}

	private _decodeRetransmittedPacketsSent(retransmittedPacketsSent?: number): number | undefined {
		if (retransmittedPacketsSent === undefined) return this._retransmittedPacketsSent;
		this._retransmittedPacketsSent = retransmittedPacketsSent;
		return this._retransmittedPacketsSent;
	}
	
	private _decodeRetransmittedBytesSent(retransmittedBytesSent?: bigint): number | undefined {
		if (retransmittedBytesSent === undefined) return this._retransmittedBytesSent;
		this._retransmittedBytesSent = Number(retransmittedBytesSent);
		return this._retransmittedBytesSent;
	}
	
	private _decodeTargetBitrate(targetBitrate?: number): number | undefined {
		if (targetBitrate === undefined) return this._targetBitrate;
		this._targetBitrate = targetBitrate;
		return this._targetBitrate;
	}
	
	private _decodeFractionLost(fractionLost?: number): number | undefined {
		if (fractionLost === undefined) return this._fractionLost;
		this._fractionLost = fractionLost;
		return this._fractionLost;
	}
	
	private _decodeRelayedSource(relayedSource?: boolean): boolean | undefined {
		if (relayedSource === undefined) return this._relayedSource;
		this._relayedSource = relayedSource;
		return this._relayedSource;
	}
	
	private _decodeTotalEncodedBytesTarget(totalEncodedBytesTarget?: bigint): number | undefined {
		if (totalEncodedBytesTarget === undefined) return this._totalEncodedBytesTarget;
		this._totalEncodedBytesTarget = Number(totalEncodedBytesTarget);
		return this._totalEncodedBytesTarget;
	}
	
	private _decodeTotalPacketSendDelay(totalPacketSendDelay?: number): number | undefined {
		if (totalPacketSendDelay === undefined) return this._totalPacketSendDelay;
		this._totalPacketSendDelay = totalPacketSendDelay;
		return this._totalPacketSendDelay;
	}
	
	private _decodeAverageRtcpInterval(averageRtcpInterval?: number): number | undefined {
		if (averageRtcpInterval === undefined) return this._averageRtcpInterval;
		this._averageRtcpInterval = averageRtcpInterval;
		return this._averageRtcpInterval;
	}
	
	private _decodeEncoderImplementation(encoderImplementation?: string): string | undefined {
		if (!encoderImplementation) return this._encoderImplementation;
		this._encoderImplementation = encoderImplementation;
		return this._encoderImplementation;
	}
	
	private _decodeActive(active?: boolean): boolean | undefined {
		if (active === undefined) return this._active;
		this._active = active;
		return this._active;
	}
	
	private _decodeAudioLevel(audioLevel?: number): number | undefined {
		if (audioLevel === undefined) return this._audioLevel;
		this._audioLevel = audioLevel;
		return this._audioLevel;
	}
	
	private _decodeTotalAudioEnergy(totalAudioEnergy?: number): number | undefined {
		if (totalAudioEnergy === undefined) return this._totalAudioEnergy;
		this._totalAudioEnergy = totalAudioEnergy;
		return this._totalAudioEnergy;
	}
	
	private _decodeTotalSamplesDuration(totalSamplesDuration?: number): number | undefined {
		if (totalSamplesDuration === undefined) return this._totalSamplesDuration;
		this._totalSamplesDuration = totalSamplesDuration;
		return this._totalSamplesDuration;
	}
	
	private _decodeEchoReturnLoss(echoReturnLoss?: number): number | undefined {
		if (echoReturnLoss === undefined) return this._echoReturnLoss;
		this._echoReturnLoss = echoReturnLoss;
		return this._echoReturnLoss;
	}
	
	private _decodeEchoReturnLossEnhancement(echoReturnLossEnhancement?: number): number | undefined {
		if (echoReturnLossEnhancement === undefined) return this._echoReturnLossEnhancement;
		this._echoReturnLossEnhancement = echoReturnLossEnhancement;
		return this._echoReturnLossEnhancement;
	}
	
	private _decodeDroppedSamplesDuration(droppedSamplesDuration?: number): number | undefined {
		if (droppedSamplesDuration === undefined) return this._droppedSamplesDuration;
		this._droppedSamplesDuration = droppedSamplesDuration;
		return this._droppedSamplesDuration;
	}
	
	private _decodeDroppedSamplesEvents(droppedSamplesEvents?: number): number | undefined {
		if (droppedSamplesEvents === undefined) return this._droppedSamplesEvents;
		this._droppedSamplesEvents = droppedSamplesEvents;
		return this._droppedSamplesEvents;
	}
	
	private _decodeTotalCaptureDelay(totalCaptureDelay?: number): number | undefined {
		if (totalCaptureDelay === undefined) return this._totalCaptureDelay;
		this._totalCaptureDelay = totalCaptureDelay;
		return this._totalCaptureDelay;
	}
	
	private _decodeTotalSamplesCaptured(totalSamplesCaptured?: number): number | undefined {
		if (totalSamplesCaptured === undefined) return this._totalSamplesCaptured;
		this._totalSamplesCaptured = totalSamplesCaptured;
		return this._totalSamplesCaptured;
	}
}
