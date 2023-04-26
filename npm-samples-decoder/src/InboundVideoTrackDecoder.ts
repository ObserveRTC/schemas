import { InboundVideoTrack } from "./OutputSamples";
import { byteArrayToUuid } from "./decodingTools";
import { Samples_ClientSample_InboundVideoTrack } from './InputSamples';

export class InboundVideoTrackDecoder {
	private _peerConnectionId?: string;
	private _remoteClientId?: string;
	private _sfuStreamId?: string;
	private _sfuSinkId?: string;
	private _packetsReceived?: number;
	private _packetsLost?: number;
	private _jitter?: number;
	private _framesDropped?: number;
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
	private _decoderImplementation?: string;
	private _framesDecoded?: number;
	private _keyFramesDecoded?: number;
	private _frameWidth?: number;
	private _frameHeight?: number;
	private _framesPerSecond?: number;
	private _qpSum?: number;
	private _totalDecodeTime?: number;
	private _totalInterFrameDelay?: number;
	private _totalSquaredInterFrameDelay?: number;
	private _firCount?: number;
	private _pliCount?: number;
	private _framesReceived?: number;
	private _packetsSent?: number;
	private _bytesSent?: number;
	private _remoteTimestamp?: number;
	private _reportsSent?: number;
	private _roundTripTime?: number;
	private _totalRoundTripTime?: number;
	private _roundTripTimeMeasurements?: number;

	private _visited = false;

	public constructor(
		public readonly trackId: string,
		public readonly ssrc: number,
	) {
		// empty
	}

	public get visited(): boolean {
		const result = this._visited;
		this._visited = false;
		return result;
	}

	public decode(sample: Samples_ClientSample_InboundVideoTrack): InboundVideoTrack {
		this._visited = true;

		const result: InboundVideoTrack = {
			trackId: this.trackId,
			ssrc: this.ssrc,
			peerConnectionId: this._decodePeerConnectionId(sample.peerConnectionId),
			remoteClientId: this._decodeRemoteClientId(sample.remoteClientId),
			sfuStreamId: this._decodeSfuStreamId(sample.sfuStreamId),
			sfuSinkId: this._decodeSfuSinkId(sample.sfuSinkId),
			packetsReceived: this._decodePacketsReceived(sample.packetsReceived),
			packetsLost: this._decodePacketsLost(sample.packetsLost),
			jitter: this._decodeJitter(sample.jitter),
			framesDropped: this._decodeFramesDropped(sample.framesDropped),
			lastPacketReceivedTimestamp: this._decodeLastPacketReceivedTimestamp(sample.lastPacketReceivedTimestamp),
			headerBytesReceived: this._decodeHeaderBytesReceived(sample.headerBytesReceived),
			packetsDiscarded: this._decodePacketsDiscarded(sample.packetsDiscarded),
			fecPacketsReceived: this._decodeFecPacketsReceived(sample.fecPacketsReceived),
			fecPacketsDiscarded: this._decodeFecPacketsDiscarded(sample.fecPacketsDiscarded),
			bytesReceived: this._decodeBytesReceived(sample.bytesReceived),
			nackCount: this._decodeNackCount(sample.nackCount),
			totalProcessingDelay: this._decodeTotalProcessingDelay(sample.totalProcessingDelay),
			estimatedPlayoutTimestamp: this._decodeEstimatedPlayoutTimestamp(sample.estimatedPlayoutTimestamp),
			jitterBufferDelay: this._decodeJitterBufferDelay(sample.jitterBufferDelay),
			jitterBufferTargetDelay: this._decodeJitterBufferTargetDelay(sample.jitterBufferTargetDelay),
			jitterBufferEmittedCount: this._decodeJitterBufferEmittedCount(sample.jitterBufferEmittedCount),
			jitterBufferMinimumDelay: this._decodeJitterBufferMinimumDelay(sample.jitterBufferMinimumDelay),
			decoderImplementation: this._decodeDecoderImplementation(sample.decoderImplementation),
			framesDecoded: this._decodeFramesDecoded(sample.framesDecoded),
			keyFramesDecoded: this._decodeKeyFramesDecoded(sample.keyFramesDecoded),
			frameWidth: this._decodeFrameWidth(sample.frameWidth),
			frameHeight: this._decodeFrameHeight(sample.frameHeight),
			framesPerSecond: this._decodeFramesPerSecond(sample.framesPerSecond),
			qpSum: this._decodeQpSum(sample.qpSum),
			totalDecodeTime: this._decodeTotalDecodeTime(sample.totalDecodeTime),
			totalInterFrameDelay: this._decodeTotalInterFrameDelay(sample.totalInterFrameDelay),
			totalSquaredInterFrameDelay: this._decodeTotalSquaredInterFrameDelay(sample.totalSquaredInterFrameDelay),
			firCount: this._decodeFirCount(sample.firCount),
			pliCount: this._decodePliCount(sample.pliCount),
			framesReceived: this._decodeFramesReceived(sample.framesReceived),
			packetsSent: this._decodePacketsSent(sample.packetsSent),
			bytesSent: this._decodeBytesSent(sample.bytesSent),
			remoteTimestamp: this._decodeRemoteTimestamp(sample.remoteTimestamp),
			reportsSent: this._decodeReportsSent(sample.reportsSent),
			roundTripTime: this._decodeRoundTripTime(sample.roundTripTime),
			totalRoundTripTime: this._decodeTotalRoundTripTime(sample.totalRoundTripTime),
			roundTripTimeMeasurements: this._decodeRoundTripTimeMeasurements(sample.roundTripTimeMeasurements),
		};
		return result;
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
		this._sfuSinkId = byteArrayToUuid(sfuSinkId);
		return this._sfuSinkId;
	}
	
	private _decodeSfuStreamId(sfuStreamId?: Uint8Array): string | undefined {
		if (!sfuStreamId) return this._sfuStreamId;
		this._sfuStreamId = byteArrayToUuid(sfuStreamId);
		return this._sfuStreamId;
	}
	
	private _decodeTotalRoundTripTime(totalRoundTripTime?: number): number | undefined {
		if (totalRoundTripTime === undefined) return this._totalRoundTripTime;
		this._totalRoundTripTime = totalRoundTripTime;
		return this._totalRoundTripTime;
	}

	private _decodeFramesDropped(framesDropped?: number): number | undefined {
		if (framesDropped === undefined) return this._framesDropped;
		this._framesDropped = framesDropped;
		return this._framesDropped;
	}
	
	private _decodeFramesDecoded(framesDecoded?: number): number | undefined {
		if (framesDecoded === undefined) return this._framesDecoded;
		this._framesDecoded = framesDecoded;
		return this._framesDecoded;
	}
	
	private _decodeKeyFramesDecoded(keyFramesDecoded?: number): number | undefined {
		if (keyFramesDecoded === undefined) return this._keyFramesDecoded;
		this._keyFramesDecoded = keyFramesDecoded;
		return this._keyFramesDecoded;
	}
	
	private _decodeFrameWidth(frameWidth?: number): number | undefined {
		if (frameWidth === undefined) return this._frameWidth;
		this._frameWidth = frameWidth;
		return this._frameWidth;
	}
	
	private _decodeFrameHeight(frameHeight?: number): number | undefined {
		if (frameHeight === undefined) return this._frameHeight;
		this._frameHeight = frameHeight;
		return this._frameHeight;
	}
	
	private _decodeFramesPerSecond(framesPerSecond?: number): number | undefined {
		if (framesPerSecond === undefined) return this._framesPerSecond;
		this._framesPerSecond = framesPerSecond;
		return this._framesPerSecond;
	}
	
	private _decodeQpSum(qpSum?: bigint): number | undefined {
		if (qpSum === undefined) return this._qpSum;
		this._qpSum = Number(qpSum);
		return this._qpSum;
	}
	
	private _decodeTotalDecodeTime(totalDecodeTime?: number): number | undefined {
		if (totalDecodeTime === undefined) return this._totalDecodeTime;
		this._totalDecodeTime = totalDecodeTime;
		return this._totalDecodeTime;
	}
	
	private _decodeTotalInterFrameDelay(totalInterFrameDelay?: number): number | undefined {
		if (totalInterFrameDelay === undefined) return this._totalInterFrameDelay;
		this._totalInterFrameDelay = totalInterFrameDelay;
		return this._totalInterFrameDelay;
	}
	
	private _decodeTotalSquaredInterFrameDelay(totalSquaredInterFrameDelay?: number): number | undefined {
		if (totalSquaredInterFrameDelay === undefined) return this._totalSquaredInterFrameDelay;
		this._totalSquaredInterFrameDelay = totalSquaredInterFrameDelay;
		return this._totalSquaredInterFrameDelay;
	}
	
	private _decodeFirCount(firCount?: number): number | undefined {
		if (firCount === undefined) return this._firCount;
		this._firCount = firCount;
		return this._firCount;
	}
	
	private _decodePliCount(pliCount?: number): number | undefined {
		if (pliCount === undefined) return this._pliCount;
		this._pliCount = pliCount;
		return this._pliCount;
	}
	
	private _decodeFramesReceived(framesReceived?: number): number | undefined {
		if (framesReceived === undefined) return this._framesReceived;
		this._framesReceived = framesReceived;
		return this._framesReceived;
	}
}
