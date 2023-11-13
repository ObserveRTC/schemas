import { InboundVideoTrack } from "./InputSamples";
import { stringToBytesArray, uuidToByteArray } from "./encodingTools";
import { Samples_ClientSample_InboundVideoTrack } from './OutputSamples';
import { ClientSampleEncodingOptions } from "./EncodingOptions";

export class InboundVideoTrackEncoder {
	private readonly _ssrc?: bigint;
	private readonly _trackId: Uint8Array;
	private _bytesReceived?: number;
	private _bytesSent?: number;
	private _decoderImplementation?: string;
	private _estimatedPlayoutTimestamp?: number;
	private _fecPacketsDiscarded?: number;
	private _fecPacketsReceived?: number;
	private _firCount?: number;
	private _frameHeight?: number;
	private _frameWidth?: number;
	private _framesDecoded?: number;
	private _framesDropped?: number;
	private _framesPerSecond?: number;
	private _framesReceived?: number;
	private _headerBytesReceived?: number;
	private _jitter?: number;
	private _jitterBufferDelay?: number;
	private _jitterBufferEmittedCount?: number;
	private _jitterBufferMinimumDelay?: number;
	private _jitterBufferTargetDelay?: number;
	private _keyFramesDecoded?: number;
	private _lastPacketReceivedTimestamp?: number;
	private _nackCount?: number;
	private _packetsDiscarded?: number;
	private _packetsLost?: number;
	private _packetsReceived?: number;
	private _packetsSent?: number;
	private _peerConnectionId?: string;
	private _pliCount?: number;
	private _qpSum?: number;
	private _remoteClientId?: string;
	private _remoteTimestamp?: number;
	private _reportsSent?: number;
	private _roundTripTime?: number;
	private _roundTripTimeMeasurements?: number;
	private _sfuSinkId?: string;
	private _sfuStreamId?: string;
	private _totalDecodeTime?: number;
	private _totalInterFrameDelay?: number;
	private _totalProcessingDelay?: number;
	private _totalRoundTripTime?: number;
	private _totalSquaredInterFrameDelay?: number;
	private _visited = false;

	public constructor(
		public readonly trackId: string,
		public readonly ssrc: number,
		private readonly _options: ClientSampleEncodingOptions,
	) {
		this._trackId = this._options.trackIdIsUuid ? uuidToByteArray(trackId) : stringToBytesArray(trackId);
		this._ssrc = BigInt(ssrc);
	}

	public get visited(): boolean {
		const result = this._visited;
		this._visited = false;
		return result;
	}

	public encode(sample: InboundVideoTrack): Samples_ClientSample_InboundVideoTrack {
		this._visited = true;

		const result = new Samples_ClientSample_InboundVideoTrack({
			trackId: this._trackId,
			ssrc: this._ssrc,
			peerConnectionId: this._encodePeerConnectionId(sample.peerConnectionId),
			remoteClientId: this._encodeRemoteClientId(sample.remoteClientId),
			sfuStreamId: this._encodeSfuStreamId(sample.sfuStreamId),
			sfuSinkId: this._encodeSfuSinkId(sample.sfuSinkId),
			packetsReceived: this._encodePacketsReceived(sample.packetsReceived),
			packetsLost: this._encodePacketsLost(sample.packetsLost),
			jitter: this._encodeJitter(sample.jitter),
			framesDropped: this._encodeFramesDropped(sample.framesDropped),
			lastPacketReceivedTimestamp: this._encodeLastPacketReceivedTimestamp(sample.lastPacketReceivedTimestamp),
			headerBytesReceived: this._encodeHeaderBytesReceived(sample.headerBytesReceived),
			packetsDiscarded: this._encodePacketsDiscarded(sample.packetsDiscarded),
			fecPacketsReceived: this._encodeFecPacketsReceived(sample.fecPacketsReceived),
			fecPacketsDiscarded: this._encodeFecPacketsDiscarded(sample.fecPacketsDiscarded),
			bytesReceived: this._encodeBytesReceived(sample.bytesReceived),
			nackCount: this._encodeNackCount(sample.nackCount),
			totalProcessingDelay: this._encodeTotalProcessingDelay(sample.totalProcessingDelay),
			estimatedPlayoutTimestamp: this._encodeEstimatedPlayoutTimestamp(sample.estimatedPlayoutTimestamp),
			jitterBufferDelay: this._encodeJitterBufferDelay(sample.jitterBufferDelay),
			jitterBufferTargetDelay: this._encodeJitterBufferTargetDelay(sample.jitterBufferTargetDelay),
			jitterBufferEmittedCount: this._encodeJitterBufferEmittedCount(sample.jitterBufferEmittedCount),
			jitterBufferMinimumDelay: this._encodeJitterBufferMinimumDelay(sample.jitterBufferMinimumDelay),
			decoderImplementation: this._encodeDecoderImplementation(sample.decoderImplementation),
			framesDecoded: this._encodeFramesDecoded(sample.framesDecoded),
			keyFramesDecoded: this._encodeKeyFramesDecoded(sample.keyFramesDecoded),
			frameWidth: this._encodeFrameWidth(sample.frameWidth),
			frameHeight: this._encodeFrameHeight(sample.frameHeight),
			framesPerSecond: this._encodeFramesPerSecond(sample.framesPerSecond),
			qpSum: this._encodeQpSum(sample.qpSum),
			totalDecodeTime: this._encodeTotalDecodeTime(sample.totalDecodeTime),
			totalInterFrameDelay: this._encodeTotalInterFrameDelay(sample.totalInterFrameDelay),
			totalSquaredInterFrameDelay: this._encodeTotalSquaredInterFrameDelay(sample.totalSquaredInterFrameDelay),
			firCount: this._encodeFirCount(sample.firCount),
			pliCount: this._encodePliCount(sample.pliCount),
			framesReceived: this._encodeFramesReceived(sample.framesReceived),
			packetsSent: this._encodePacketsSent(sample.packetsSent),
			bytesSent: this._encodeBytesSent(sample.bytesSent),
			remoteTimestamp: this._encodeRemoteTimestamp(sample.remoteTimestamp),
			reportsSent: this._encodeReportsSent(sample.reportsSent),
			roundTripTime: this._encodeRoundTripTime(sample.roundTripTime),
			totalRoundTripTime: this._encodeTotalRoundTripTime(sample.totalRoundTripTime),
			roundTripTimeMeasurements: this._encodeRoundTripTimeMeasurements(sample.roundTripTimeMeasurements),
		});
		return result;
	}

	private _encodePeerConnectionId(peerConnectionId?: string): Uint8Array | undefined {
		if (!peerConnectionId) return;
		if (peerConnectionId === this._peerConnectionId) return;
		this._peerConnectionId = peerConnectionId;
		return this._options.peerConnectionIdIsUuid ? uuidToByteArray(this._peerConnectionId) : stringToBytesArray(this._peerConnectionId);
	}

	private _encodeRemoteClientId(remoteClientId?: string): Uint8Array | undefined {
		if (!remoteClientId) return;
		if (remoteClientId === this._remoteClientId) return;
		this._remoteClientId = remoteClientId;
		return this._options.clientIdIsUuid ? uuidToByteArray(this._remoteClientId) : stringToBytesArray(this._remoteClientId);
	}
	
	private _encodeJitterBufferTargetDelay(jitterBufferTargetDelay?: number): number | undefined{
		if (!jitterBufferTargetDelay) return;
		if (jitterBufferTargetDelay === this._jitterBufferTargetDelay) return;
		this._jitterBufferTargetDelay = jitterBufferTargetDelay;
		return this._jitterBufferTargetDelay;
	}
	
	private _encodeRoundTripTime(roundTripTime?: number): number | undefined {
		if (!roundTripTime) return;
		if (roundTripTime === this._roundTripTime) return;
		this._roundTripTime = roundTripTime;
		return this._roundTripTime;
	}
	
	private _encodeTotalRoundTripTime(totalRoundTripTime?: number): number | undefined {
		if (!totalRoundTripTime) return;
		if (totalRoundTripTime === this._totalRoundTripTime) return;
		this._totalRoundTripTime = totalRoundTripTime;
		return this._totalRoundTripTime;
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
		return this._options.sfuStreamIdIsUuid
			? uuidToByteArray(this._sfuStreamId) 
			: stringToBytesArray(this._sfuStreamId)
		;
	}
	
	private _encodeSfuSinkId(sfuSinkId?: string): Uint8Array | undefined {
		if (!sfuSinkId) return;
		if (sfuSinkId === this._sfuSinkId) return;
		this._sfuSinkId = sfuSinkId;
		return this._options.sfuSinkIdIsUuid
			? uuidToByteArray(this._sfuSinkId) 
			: stringToBytesArray(this._sfuSinkId)
		;
	}
	
	private _encodePacketsReceived(packetsReceived?: number): number | undefined {
		if (!packetsReceived) return;
		if (packetsReceived === this._packetsReceived) return;
		this._packetsReceived = packetsReceived;
		return this._packetsReceived;
	}
	
	private _encodePacketsLost(packetsLost?: number): number | undefined {
		if (!packetsLost) return;
		if (packetsLost === this._packetsLost) return;
		this._packetsLost = packetsLost;
		return this._packetsLost;
	}
	
	private _encodeJitter(jitter?: number): number | undefined {
		if (!jitter) return;
		if (jitter === this._jitter) return;
		this._jitter = jitter;
		return this._jitter;
	}
	
	private _encodeFramesDropped(framesDropped?: number): number | undefined {
		if (!framesDropped) return;
		if (framesDropped === this._framesDropped) return;
		this._framesDropped = framesDropped;
		return this._framesDropped;
	}
	
	private _encodeLastPacketReceivedTimestamp(lastPacketReceivedTimestamp?: number): bigint | undefined {
		if (!lastPacketReceivedTimestamp) return;
		if (lastPacketReceivedTimestamp === this._lastPacketReceivedTimestamp) return;
		this._lastPacketReceivedTimestamp = lastPacketReceivedTimestamp;
		return BigInt(this._lastPacketReceivedTimestamp);
	}
	
	private _encodeHeaderBytesReceived(headerBytesReceived?: number): bigint | undefined {
		if (!headerBytesReceived) return;
		if (headerBytesReceived === this._headerBytesReceived) return;
		this._headerBytesReceived = headerBytesReceived;
		return BigInt(this._headerBytesReceived);
	}
	
	private _encodePacketsDiscarded(packetsDiscarded?: number): number | undefined {
		if (!packetsDiscarded) return;
		if (packetsDiscarded === this._packetsDiscarded) return;
		this._packetsDiscarded = packetsDiscarded;
		return this._packetsDiscarded;
	}
	
	private _encodeFecPacketsReceived(fecPacketsReceived?: number): number | undefined {
		if (!fecPacketsReceived) return;
		if (fecPacketsReceived === this._fecPacketsReceived) return;
		this._fecPacketsReceived = fecPacketsReceived;
		return this._fecPacketsReceived;
	}
	
	private _encodeFecPacketsDiscarded(fecPacketsDiscarded?: number): number | undefined {
		if (!fecPacketsDiscarded) return;
		if (fecPacketsDiscarded === this._fecPacketsDiscarded) return;
		this._fecPacketsDiscarded = fecPacketsDiscarded;
		return this._fecPacketsDiscarded;
	}

	private _encodeTotalProcessingDelay(totalProcessingDelay?: number): number | undefined {
		if (!totalProcessingDelay) return;
		if (totalProcessingDelay === this._totalProcessingDelay) return;
		this._totalProcessingDelay = totalProcessingDelay;
		return this._totalProcessingDelay;
	}
	
	private _encodeEstimatedPlayoutTimestamp(estimatedPlayoutTimestamp?: number): bigint | undefined {
		if (!estimatedPlayoutTimestamp) return;
		if (estimatedPlayoutTimestamp === this._estimatedPlayoutTimestamp) return;
		this._estimatedPlayoutTimestamp = estimatedPlayoutTimestamp;
		return BigInt(this._estimatedPlayoutTimestamp);
	}
	
	private _encodeJitterBufferDelay(jitterBufferDelay?: number): number | undefined {
		if (!jitterBufferDelay) return;
		if (jitterBufferDelay === this._jitterBufferDelay) return;
		this._jitterBufferDelay = jitterBufferDelay;
		return this._jitterBufferDelay;
	}
	
	private _encodeJitterBufferEmittedCount(jitterBufferEmittedCount?: number): number | undefined {
		if (!jitterBufferEmittedCount) return;
		if (jitterBufferEmittedCount === this._jitterBufferEmittedCount) return;
		this._jitterBufferEmittedCount = jitterBufferEmittedCount;
		return this._jitterBufferEmittedCount;
	}
	
	private _encodeJitterBufferMinimumDelay(jitterBufferMinimumDelay?: number): number | undefined {
		if (!jitterBufferMinimumDelay) return;
		if (jitterBufferMinimumDelay === this._jitterBufferMinimumDelay) return;
		this._jitterBufferMinimumDelay = jitterBufferMinimumDelay;
		return this._jitterBufferMinimumDelay;
	}
	
	private _encodeDecoderImplementation(decoderImplementation?: string): string | undefined {
		if (!decoderImplementation) return;
		if (decoderImplementation === this._decoderImplementation) return;
		this._decoderImplementation = decoderImplementation;
		return this._decoderImplementation;
	}
	
	private _encodeFramesDecoded(framesDecoded?: number): number | undefined {
		if (!framesDecoded) return;
		if (framesDecoded === this._framesDecoded) return;
		this._framesDecoded = framesDecoded;
		return this._framesDecoded;
	}
	
	private _encodeKeyFramesDecoded(keyFramesDecoded?: number): number | undefined {
		if (!keyFramesDecoded) return;
		if (keyFramesDecoded === this._keyFramesDecoded) return;
		this._keyFramesDecoded = keyFramesDecoded;
		return this._keyFramesDecoded;
	}
	
	private _encodeFrameWidth(frameWidth?: number): number | undefined {
		if (!frameWidth) return;
		if (frameWidth === this._frameWidth) return;
		this._frameWidth = frameWidth;
		return this._frameWidth;
	}
	
	private _encodeFrameHeight(frameHeight?: number): number | undefined {
		if (!frameHeight) return;
		if (frameHeight === this._frameHeight) return;
		this._frameHeight = frameHeight;
		return this._frameHeight;
	}

	private _encodeFramesPerSecond(framesPerSecond?: number): number | undefined {
		if (!framesPerSecond) return;
		if (framesPerSecond === this._framesPerSecond) return;
		this._framesPerSecond = framesPerSecond;
		return this._framesPerSecond;
	}
	
	private _encodeQpSum(qpSum?: number): bigint | undefined {
		if (!qpSum) return;
		if (qpSum === this._qpSum) return;
		this._qpSum = qpSum;
		return BigInt(this._qpSum);
	}
	
	private _encodeTotalDecodeTime(totalDecodeTime?: number): number | undefined {
		if (!totalDecodeTime) return;
		if (totalDecodeTime === this._totalDecodeTime) return;
		this._totalDecodeTime = totalDecodeTime;
		return this._totalDecodeTime;
	}
	
	private _encodeTotalInterFrameDelay(totalInterFrameDelay?: number): number | undefined {
		if (!totalInterFrameDelay) return;
		if (totalInterFrameDelay === this._totalInterFrameDelay) return;
		this._totalInterFrameDelay = totalInterFrameDelay;
		return this._totalInterFrameDelay;
	}
	
	private _encodeTotalSquaredInterFrameDelay(totalSquaredInterFrameDelay?: number): number | undefined {
		if (!totalSquaredInterFrameDelay) return;
		if (totalSquaredInterFrameDelay === this._totalSquaredInterFrameDelay) return;
		this._totalSquaredInterFrameDelay = totalSquaredInterFrameDelay;
		return this._totalSquaredInterFrameDelay;
	}
	
	private _encodeFirCount(firCount?: number): number | undefined {
		if (!firCount) return;
		if (firCount === this._firCount) return;
		this._firCount = firCount;
		return this._firCount;
	}
	
	private _encodePliCount(pliCount?: number): number | undefined {
		if (!pliCount) return;
		if (pliCount === this._pliCount) return;
		this._pliCount = pliCount;
		return this._pliCount;
	}
	
	private _encodeFramesReceived(framesReceived?: number): number | undefined {
		if (!framesReceived) return;
		if (framesReceived === this._framesReceived) return;
		this._framesReceived = framesReceived;
		return this._framesReceived;
	}
	
	private _encodePacketsSent(packetsSent?: number): number | undefined {
		if (!packetsSent) return;
		if (packetsSent === this._packetsSent) return;
		this._packetsSent = packetsSent;
		return this._packetsSent;
	}
	
	private _encodeBytesSent(bytesSent?: number): bigint | undefined {
		if (!bytesSent) return;
		if (bytesSent === this._bytesSent) return;
		this._bytesSent = bytesSent;
		return BigInt(this._bytesSent);
	}
	
	private _encodeRemoteTimestamp(remoteTimestamp?: number): bigint | undefined {
		if (!remoteTimestamp) return;
		if (remoteTimestamp === this._remoteTimestamp) return;
		this._remoteTimestamp = remoteTimestamp;
		return BigInt(this._remoteTimestamp);
	}

	private _encodeBytesReceived(bytesReceived?: number): bigint | undefined {
		if (!bytesReceived) return;
		if (bytesReceived === this._bytesReceived) return;
		this._bytesReceived = bytesReceived;
		return BigInt(this._bytesReceived);
	}
	
	private _encodeNackCount(nackCount?: number): number | undefined {
		if (!nackCount) return;
		if (nackCount === this._nackCount) return;
		this._nackCount = nackCount;
		return this._nackCount;
	}
	
	private _encodeReportsSent(reportsSent?: number): number | undefined {
		if (!reportsSent) return;
		if (reportsSent === this._reportsSent) return;
		this._reportsSent = reportsSent;
		return this._reportsSent;
	}
	
}
