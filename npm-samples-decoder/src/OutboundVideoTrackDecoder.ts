import { OutboundVideoTrack } from './OutputSamples';
import { byteArrayToUuid, bytesArrayToString } from './decodingTools';
import { Samples_ClientSample_OutboundVideoTrack } from './InputSamples';
import { ClientSampleDecodingOptions } from './DecodingOptions';

export class OutboundVideoTrackDecoder {
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
	private _frameWidth?: number;
	private _frameHeight?: number;
	private _framesPerSecond?: number;
	private _framesSent?: number;
	private _hugeFramesSent?: number;
	private _framesEncoded?: number;
	private _keyFramesEncoded?: number;
	private _qpSum?: number;
	private _totalEncodeTime?: number;
	private _qualityLimitationDurationNone?: number;
	private _qualityLimitationDurationCPU?: number;
	private _qualityLimitationDurationBandwidth?: number;
	private _qualityLimitationDurationOther?: number;
	private _qualityLimitationReason?: string;
	private _qualityLimitationResolutionChanges?: number;
	private _firCount?: number;
	private _pliCount?: number;
	private _packetsReceived?: number;
	private _packetsLost?: number;
	private _jitter?: number;
	private _roundTripTime?: number;
	private _totalRoundTripTime?: number;
	private _fractionLost?: number;
	private _roundTripTimeMeasurements?: number;
	private _framesDropped?: number;
	private _relayedSource?: boolean;
	private _width?: number;
	private _height?: number;
	private _frames?: number;

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

	public decode(sample: Samples_ClientSample_OutboundVideoTrack): OutboundVideoTrack {
		this._visited = true;

		const result: OutboundVideoTrack = {
			trackId: this.trackId,
			ssrc: this.ssrc,
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
			frameWidth: this._decodeFrameWidth(sample.frameWidth),
			frameHeight: this._decodeFrameHeight(sample.frameHeight),
			framesPerSecond: this._decodeFramesPerSecond(sample.framesPerSecond),
			framesSent: this._decodeFramesSent(sample.framesSent),
			hugeFramesSent: this._decodeHugeFramesSent(sample.hugeFramesSent),
			framesEncoded: this._decodeFramesEncoded(sample.framesEncoded),
			keyFramesEncoded: this._decodeKeyFramesEncoded(sample.keyFramesEncoded),
			qpSum: this._decodeQpSum(sample.qpSum),
			totalEncodeTime: this._decodeTotalEncodeTime(sample.totalEncodeTime),
			qualityLimitationDurationNone: this._decodeQualityLimitationDurationNone(sample.qualityLimitationDurationNone),
			qualityLimitationDurationCPU: this._decodeQualityLimitationDurationCPU(sample.qualityLimitationDurationCPU),
			qualityLimitationDurationBandwidth: this._decodeQualityLimitationDurationBandwidth(sample.qualityLimitationDurationBandwidth),
			qualityLimitationDurationOther: this._decodeQualityLimitationDurationOther(sample.qualityLimitationDurationOther),
			qualityLimitationReason: this._decodeQualityLimitationReason(sample.qualityLimitationReason),
			qualityLimitationResolutionChanges: this._decodeQualityLimitationResolutionChanges(sample.qualityLimitationResolutionChanges),
			firCount: this._decodeFirCount(sample.firCount),
			pliCount: this._decodePliCount(sample.pliCount),
			packetsReceived: this._decodePacketsReceived(sample.packetsReceived),
			packetsLost: this._decodePacketsLost(sample.packetsLost),
			jitter: this._decodeJitter(sample.jitter),
			roundTripTime: this._decodeRoundTripTime(sample.roundTripTime),
			totalRoundTripTime: this._decodeTotalRoundTripTime(sample.totalRoundTripTime),
			fractionLost: this._decodeFractionLost(sample.fractionLost),
			roundTripTimeMeasurements: this._decodeRoundTripTimeMeasurements(sample.roundTripTimeMeasurements),
			framesDropped: this._decodeFramesDropped(sample.framesDropped),
			relayedSource: this._decodeRelayedSource(sample.relayedSource),
			width: this._decodeWidth(sample.width),
			height: this._decodeHeight(sample.height),
			frames: this._decodeFrames(sample.frames),
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

	private _decodeFramesDropped(framesDropped?: number): number | undefined {
		if (framesDropped === undefined) return this._framesDropped;
		this._framesDropped = framesDropped;
		return this._framesDropped;
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

	private _decodeHeight(height?: number): number | undefined {
		if (height === undefined) return this._height;
		this._height = height;
		return this._height;
	}
	
	private _decodeFrames(frames?: number): number | undefined {
		if (frames === undefined) return this._frames;
		this._frames = frames;
		return this._frames;
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
	
	private _decodeWidth(width?: number): number | undefined {
		if (width === undefined) return this._width;
		this._width = width;
		return this._width;
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
	
	private _decodeFramesSent(framesSent?: number): number | undefined {
		if (framesSent === undefined) return this._framesSent;
		this._framesSent = framesSent;
		return this._framesSent;
	}
	
	private _decodeHugeFramesSent(hugeFramesSent?: number): number | undefined {
		if (hugeFramesSent === undefined) return this._hugeFramesSent;
		this._hugeFramesSent = hugeFramesSent;
		return this._hugeFramesSent;
	}
	
	private _decodeFramesEncoded(framesEncoded?: number): number | undefined {
		if (framesEncoded === undefined) return this._framesEncoded;
		this._framesEncoded = framesEncoded;
		return this._framesEncoded;
	}
	
	private _decodeKeyFramesEncoded(keyFramesEncoded?: number): number | undefined {
		if (keyFramesEncoded === undefined) return this._keyFramesEncoded;
		this._keyFramesEncoded = keyFramesEncoded;
		return this._keyFramesEncoded;
	}
	
	private _decodeTotalEncodeTime(totalEncodeTime?: number): number | undefined {
		if (totalEncodeTime === undefined) return this._totalEncodeTime;
		this._totalEncodeTime = totalEncodeTime;
		return this._totalEncodeTime;
	}
	
	private _decodeQualityLimitationDurationNone(qualityLimitationDurationNone?: number): number | undefined {
		if (qualityLimitationDurationNone === undefined) return this._qualityLimitationDurationNone;
		this._qualityLimitationDurationNone = qualityLimitationDurationNone;
		return this._qualityLimitationDurationNone;
	}
	
	private _decodeQualityLimitationDurationCPU(qualityLimitationDurationCPU?: number): number | undefined {
		if (qualityLimitationDurationCPU === undefined) return this._qualityLimitationDurationCPU;
		this._qualityLimitationDurationCPU = qualityLimitationDurationCPU;
		return this._qualityLimitationDurationCPU;
	}
	
	private _decodeQualityLimitationDurationBandwidth(qualityLimitationDurationBandwidth?: number): number | undefined {
		if (qualityLimitationDurationBandwidth === undefined) return this._qualityLimitationDurationBandwidth;
		this._qualityLimitationDurationBandwidth = qualityLimitationDurationBandwidth;
		return this._qualityLimitationDurationBandwidth;
	}

	private _decodeQualityLimitationDurationOther(qualityLimitationDurationOther?: number): number | undefined {
		if (qualityLimitationDurationOther === undefined) return this._qualityLimitationDurationOther;
		this._qualityLimitationDurationOther = qualityLimitationDurationOther;
		return this._qualityLimitationDurationOther;
	}

	private _decodeQualityLimitationReason(qualityLimitationReason?: string): string | undefined {
		if (qualityLimitationReason === undefined) return this._qualityLimitationReason;
		this._qualityLimitationReason = qualityLimitationReason;
		return this._qualityLimitationReason;
	}

	private _decodeQualityLimitationResolutionChanges(qualityLimitationResolutionChanges?: number): number | undefined {
		if (qualityLimitationResolutionChanges === undefined) return this._qualityLimitationResolutionChanges;
		this._qualityLimitationResolutionChanges = qualityLimitationResolutionChanges;
		return this._qualityLimitationResolutionChanges;
	}
}
