import { OutboundVideoTrack } from "./InputSamples";
import { stringToBytesArray, uuidToByteArray } from "./encodingTools";
import { Samples_ClientSample_OutboundVideoTrack } from './OutputSamples';
import { ClientSampleEncodingOptions } from "./EncodingOptions";

export class OutboundVideoTrackEncoder {
	private readonly _ssrc?: bigint;
	private readonly _trackId: Uint8Array;
	private _active?: boolean;
	private _averageRtcpInterval?: number;
	private _bytesSent?: number;
	private _encoderImplementation?: string;
	private _firCount?: number;
	private _fractionLost?: number;
	private _frameHeight?: number;
	private _frameWidth?: number;
	private _frames?: number;
	private _framesDropped?: number;
	private _framesEncoded?: number;
	private _framesPerSecond?: number;
	private _framesSent?: number;
	private _headerBytesSent?: number;
	private _height?: number;
	private _hugeFramesSent?: number;
	private _jitter?: number;
	private _keyFramesEncoded?: number;
	private _nackCount?: number;
	private _packetsLost?: number;
	private _packetsReceived?: number;
	private _packetsSent?: number;
	private _peerConnectionId?: string;
	private _pliCount?: number;
	private _qpSum?: number;
	private _qualityLimitationDurationBandwidth?: number;
	private _qualityLimitationDurationCPU?: number;
	private _qualityLimitationDurationNone?: number;
	private _qualityLimitationDurationOther?: number;
	private _qualityLimitationReason?: string;
	private _qualityLimitationResolutionChanges?: number;
	private _relayedSource?: boolean;
	private _retransmittedBytesSent?: number;
	private _retransmittedPacketsSent?: number;
	private _rid?: string;
	private _roundTripTime?: number;
	private _roundTripTimeMeasurements?: number;
	private _sfuStreamId?: string;
	private _targetBitrate?: number;
	private _totalEncodeTime?: number;
	private _totalEncodedBytesTarget?: number;
	private _totalPacketSendDelay?: number;
	private _totalRoundTripTime?: number;
	private _width?: number;
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

	public encode(sample: OutboundVideoTrack): Samples_ClientSample_OutboundVideoTrack {
		this._visited = true;

		const result = new Samples_ClientSample_OutboundVideoTrack({
			trackId: this._trackId,
			ssrc: this._ssrc,
			active: this._encodeActive(sample.active),
			bytesSent: this._encodeBytesSent(sample.bytesSent),
			averageRtcpInterval: this._encodeAverageRtcpInterval(sample.averageRtcpInterval),
			encoderImplementation: this._encodeEncoderImplementation(sample.encoderImplementation),
			firCount: this._encodeFirCount(sample.firCount),
			fractionLost: this._encodeFractionLost(sample.fractionLost),
			frameHeight: this._encodeFrameHeight(sample.frameHeight),
			frameWidth: this._encodeFrameWidth(sample.frameWidth),
			frames: this._encodeFrames(sample.frames),
			framesDropped: this._encodeFramesDropped(sample.framesDropped),
			framesEncoded: this._encodeFramesEncoded(sample.framesEncoded),
			framesPerSecond: this._encodeFramesPerSecond(sample.framesPerSecond),
			framesSent: this._encodeFramesSent(sample.framesSent),
			headerBytesSent: this._encodeHeaderBytesSent(sample.headerBytesSent),
			height: this._encodeHeight(sample.height),
			hugeFramesSent: this._encodeHugeFramesSent(sample.hugeFramesSent),
			jitter: this._encodeJitter(sample.jitter),
			keyFramesEncoded: this._encodeKeyFramesEncoded(sample.keyFramesEncoded),
			nackCount: this._encodeNackCount(sample.nackCount),
			packetsLost: this._encodePacketsLost(sample.packetsLost),
			packetsReceived: this._encodePacketsReceived(sample.packetsReceived),
			packetsSent: this._encodePacketsSent(sample.packetsSent),
			peerConnectionId: this._encodePeerConnectionId(sample.peerConnectionId),
			pliCount: this._encodePliCount(sample.pliCount),
			qpSum: this._encodeQpSum(sample.qpSum),
			qualityLimitationDurationBandwidth: this._encodeQualityLimitationDurationBandwidth(sample.qualityLimitationDurationBandwidth),
			qualityLimitationDurationCPU: this._encodeQualityLimitationDurationCPU(sample.qualityLimitationDurationCPU),
			qualityLimitationDurationNone: this._encodeQualityLimitationDurationNone(sample.qualityLimitationDurationNone),
			qualityLimitationDurationOther: this._encodeQualityLimitationDurationOther(sample.qualityLimitationDurationOther),
			qualityLimitationReason: this._encodeQualityLimitationReason(sample.qualityLimitationReason),
			qualityLimitationResolutionChanges: this._encodeQualityLimitationResolutionChanges(sample.qualityLimitationResolutionChanges),
			relayedSource: this._encodeRelayedSource(sample.relayedSource),
			retransmittedBytesSent: this._encodeRetransmittedBytesSent(sample.retransmittedBytesSent),
			retransmittedPacketsSent: this._encodeRetransmittedPacketsSent(sample.retransmittedPacketsSent),
			rid: this._encodeRid(sample.rid),
			roundTripTime: this._encodeRoundTripTime(sample.roundTripTime),
			roundTripTimeMeasurements: this._encodeRoundTripTimeMeasurements(sample.roundTripTimeMeasurements),
			sfuStreamId: this._encodeSfuStreamId(sample.sfuStreamId),
			targetBitrate: this._encodeTargetBitrate(sample.targetBitrate),
			totalEncodeTime: this._encodeTotalEncodeTime(sample.totalEncodeTime),
			totalEncodedBytesTarget: this._encodeTotalEncodedBytesTarget(sample.totalEncodedBytesTarget),
			totalPacketSendDelay: this._encodeTotalPacketSendDelay(sample.totalPacketSendDelay),
			totalRoundTripTime: this._encodeTotalRoundTripTime(sample.totalRoundTripTime),
			width: this._encodeWidth(sample.width),
			
		});
		return result;
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
		console.warn("3894728947238492",  this._encodingOptions.sfuStreamIdIsUuid
		? uuidToByteArray(this._sfuStreamId) 
		: stringToBytesArray(this._sfuStreamId))
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
	
	private _encodeFirCount(firCount?: number): number | undefined {
		if (!firCount) return;
		if (firCount === this._firCount) return;
		this._firCount = firCount;
		return this._firCount;
	}
	
	private _encodeFrameHeight(frameHeight?: number): number | undefined {
		if (!frameHeight) return;
		if (frameHeight === this._frameHeight) return;
		this._frameHeight = frameHeight;
		return this._frameHeight;
	}
	
	private _encodeFrameWidth(frameWidth?: number): number | undefined {
		if (!frameWidth) return;
		if (frameWidth === this._frameWidth) return;
		this._frameWidth = frameWidth;
		return this._frameWidth;
	}
	
	private _encodeFrames(frames?: number): number | undefined {
		if (!frames) return;
		if (frames === this._frames) return;
		this._frames = frames;
		return this._frames;
	}
	
	private _encodeFramesDropped(framesDropped?: number): number | undefined {
		if (!framesDropped) return;
		if (framesDropped === this._framesDropped) return;
		this._framesDropped = framesDropped;
		return this._framesDropped;
	}
	
	private _encodeFramesEncoded(framesEncoded?: number): number | undefined {
		if (!framesEncoded) return;
		if (framesEncoded === this._framesEncoded) return;
		this._framesEncoded = framesEncoded;
		return this._framesEncoded;
	}
	
	private _encodeFramesPerSecond(framesPerSecond?: number): number | undefined {
		if (!framesPerSecond) return;
		if (framesPerSecond === this._framesPerSecond) return;
		this._framesPerSecond = framesPerSecond;
		return this._framesPerSecond;
	}
	
	private _encodeFramesSent(framesSent?: number): number | undefined {
		if (!framesSent) return;
		if (framesSent === this._framesSent) return;
		this._framesSent = framesSent;
		return this._framesSent;
	}
	
	private _encodeHeight(height?: number): number | undefined {
		if (!height) return;
		if (height === this._height) return;
		this._height = height;
		return this._height;
	}
	
	private _encodeHugeFramesSent(hugeFramesSent?: number): number | undefined {
		if (!hugeFramesSent) return;
		if (hugeFramesSent === this._hugeFramesSent) return;
		this._hugeFramesSent = hugeFramesSent;
		return this._hugeFramesSent;
	}
	
	private _encodeKeyFramesEncoded(keyFramesEncoded?: number): number | undefined {
		if (!keyFramesEncoded) return;
		if (keyFramesEncoded === this._keyFramesEncoded) return;
		this._keyFramesEncoded = keyFramesEncoded;
		return this._keyFramesEncoded;
	}
	
	private _encodePliCount(pliCount?: number): number | undefined {
		if (!pliCount) return;
		if (pliCount === this._pliCount) return;
		this._pliCount = pliCount;
		return this._pliCount;
	}
	
	private _encodeQpSum(qpSum?: number): bigint | undefined {
		if (!qpSum) return;
		if (qpSum === this._qpSum) return;
		this._qpSum = qpSum;
		return BigInt(this._qpSum);
	}
	
	private _encodeQualityLimitationDurationBandwidth(duration?: number): number | undefined {
		if (!duration) return;
		if (duration === this._qualityLimitationDurationBandwidth) return;
		this._qualityLimitationDurationBandwidth = duration;
		return this._qualityLimitationDurationBandwidth;
	}
	
	private _encodeQualityLimitationDurationCPU(duration?: number): number | undefined {
		if (!duration) return;
		if (duration === this._qualityLimitationDurationCPU) return;
		this._qualityLimitationDurationCPU = duration;
		return this._qualityLimitationDurationCPU;
	}
	
	private _encodeQualityLimitationDurationNone(duration?: number): number | undefined {
		if (!duration) return;
		if (duration === this._qualityLimitationDurationNone) return;
		this._qualityLimitationDurationNone = duration;
		return this._qualityLimitationDurationNone;
	}

	private _encodeQualityLimitationDurationOther(duration?: number): number | undefined {
		if (!duration) return;
		if (duration === this._qualityLimitationDurationOther) return;
		this._qualityLimitationDurationOther = duration;
		return this._qualityLimitationDurationOther;
	}
	
	private _encodeQualityLimitationReason(reason?: string): string | undefined {
		if (!reason) return;
		if (reason === this._qualityLimitationReason) return;
		this._qualityLimitationReason = reason;
		return this._qualityLimitationReason;
	}
	
	private _encodeQualityLimitationResolutionChanges(changes?: number): number | undefined {
		if (!changes) return;
		if (changes === this._qualityLimitationResolutionChanges) return;
		this._qualityLimitationResolutionChanges = changes;
		return this._qualityLimitationResolutionChanges;
	}
	
	private _encodeTotalEncodeTime(totalEncodeTime?: number): number | undefined {
		if (!totalEncodeTime) return;
		if (totalEncodeTime === this._totalEncodeTime) return;
		this._totalEncodeTime = totalEncodeTime;
		return this._totalEncodeTime;
	}
	
	private _encodeWidth(width?: number): number | undefined {
		if (!width) return;
		if (width === this._width) return;
		this._width = width;
		return this._width;
	}
}
