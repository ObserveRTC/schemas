import { 
    Decoder,
    BooleanToBooleanDecoder,
    NumberToNumberDecoder,
    OneTimePassDecoder,
    StringToStringDecoder,
    AttachmentDecoder,
	BigIntToNumberDecoder
} from "./utils";
import { 
	ClientSample_PeerConnectionSample_OutboundRtpStats as InputOutboundRtpStats,
	ClientSample_PeerConnectionSample_OutboundRtpStats_QualityLimitationDurations as InputQualityLimitationDurations 
} from "./InputSamples";
import { OutboundRtpStats as OutputOutboundRtpStats } from "./OutputSamples";
const logger = console;

export class QualityLimitationDurationsDecoder implements Decoder<InputQualityLimitationDurations, OutputOutboundRtpStats['qualityLimitationDurations'] | undefined> {
    public actualValue?: OutputOutboundRtpStats['qualityLimitationDurations'];

    public reset() {
        this.actualValue = undefined;
    }

    public decode(input?: InputQualityLimitationDurations): OutputOutboundRtpStats['qualityLimitationDurations'] | undefined {
        if (!input) return this.actualValue;
        
        const newValue = {
            bandwidth: input.bandwidth ?? 0,
            cpu: input.cpu ?? 0,
            none: input.none ?? 0,
            other: input.other ?? 0,
        };

        this.actualValue = newValue;

        return newValue;
    }
}

export class OutboundRtpDecoder implements Decoder<InputOutboundRtpStats, OutputOutboundRtpStats | undefined> {
    private _visited = false;
    private readonly _idDecoder: StringToStringDecoder;
    private readonly _kindDecoder: StringToStringDecoder;
    private readonly _timestampDecoder: NumberToNumberDecoder;
    private readonly _activeDecoder: BooleanToBooleanDecoder;
    private readonly _bytesSentDecoder: NumberToNumberDecoder;
    private readonly _codecIdDecoder: OneTimePassDecoder<string>;
    private readonly _encoderImplementationDecoder: OneTimePassDecoder<string>;
    private readonly _firCountDecoder: NumberToNumberDecoder;
    private readonly _frameHeightDecoder: NumberToNumberDecoder;
    private readonly _frameWidthDecoder: NumberToNumberDecoder;
    private readonly _framesEncodedDecoder: NumberToNumberDecoder;
    private readonly _framesPerSecondDecoder: NumberToNumberDecoder;
    private readonly _framesSentDecoder: NumberToNumberDecoder;
    private readonly _headerBytesSentDecoder: NumberToNumberDecoder;
    private readonly _hugeFramesSentDecoder: NumberToNumberDecoder;
    private readonly _keyFramesEncodedDecoder: NumberToNumberDecoder;
    private readonly _mediaSourceIdDecoder: OneTimePassDecoder<string>;
    private readonly _midDecoder: OneTimePassDecoder<string>;
    private readonly _nackCountDecoder: NumberToNumberDecoder;
    private readonly _packetsSentDecoder: NumberToNumberDecoder;
    private readonly _pliCountDecoder: NumberToNumberDecoder;
    private readonly _powerEfficientEncoderDecoder: BooleanToBooleanDecoder;
    private readonly _qpSumDecoder: NumberToNumberDecoder;
    private readonly _qualityLimitationDurationsDecoder: QualityLimitationDurationsDecoder;
    private readonly _qualityLimitationReasonDecoder: StringToStringDecoder;
    private readonly _qualityLimitationResolutionChangesDecoder: NumberToNumberDecoder;
    private readonly _remoteIdDecoder: StringToStringDecoder;
    private readonly _retransmittedBytesSentDecoder: NumberToNumberDecoder;
    private readonly _retransmittedPacketsSentDecoder: NumberToNumberDecoder;
    private readonly _ridDecoder: StringToStringDecoder;
    private readonly _rtxSsrcDecoder: BigIntToNumberDecoder;
    private readonly _scalabilityModeDecoder: StringToStringDecoder;
    private readonly _targetBitrateDecoder: NumberToNumberDecoder;
    private readonly _totalEncodeTimeDecoder: NumberToNumberDecoder;
    private readonly _totalEncodedBytesTargetDecoder: NumberToNumberDecoder;
    private readonly _totalPacketSendDelayDecoder: NumberToNumberDecoder;
    private readonly _transportIdDecoder: OneTimePassDecoder<string>;

    private _actualValue: OutputOutboundRtpStats | undefined = undefined;

    constructor(
		public readonly ssrc: number,
        private readonly _attachmentsDecoder: AttachmentDecoder
    ) {
        this._idDecoder = new StringToStringDecoder();
        this._kindDecoder = new StringToStringDecoder();
        this._timestampDecoder = new NumberToNumberDecoder();
        this._activeDecoder = new BooleanToBooleanDecoder();
        this._bytesSentDecoder = new NumberToNumberDecoder();
        this._codecIdDecoder = new OneTimePassDecoder<string>();
        this._encoderImplementationDecoder = new OneTimePassDecoder<string>();
        this._firCountDecoder = new NumberToNumberDecoder();
        this._frameHeightDecoder = new NumberToNumberDecoder();
        this._frameWidthDecoder = new NumberToNumberDecoder();
        this._framesEncodedDecoder = new NumberToNumberDecoder();
        this._framesPerSecondDecoder = new NumberToNumberDecoder();
        this._framesSentDecoder = new NumberToNumberDecoder();
        this._headerBytesSentDecoder = new NumberToNumberDecoder();
        this._hugeFramesSentDecoder = new NumberToNumberDecoder();
        this._keyFramesEncodedDecoder = new NumberToNumberDecoder();
        this._mediaSourceIdDecoder = new OneTimePassDecoder<string>();
        this._midDecoder = new OneTimePassDecoder<string>();
        this._nackCountDecoder = new NumberToNumberDecoder();
        this._packetsSentDecoder = new NumberToNumberDecoder();
        this._pliCountDecoder = new NumberToNumberDecoder();
        this._powerEfficientEncoderDecoder = new BooleanToBooleanDecoder();
        this._qpSumDecoder = new NumberToNumberDecoder();
        this._qualityLimitationDurationsDecoder = new QualityLimitationDurationsDecoder();
        this._qualityLimitationReasonDecoder = new StringToStringDecoder();
        this._qualityLimitationResolutionChangesDecoder = new NumberToNumberDecoder();
        this._remoteIdDecoder = new StringToStringDecoder();
        this._retransmittedBytesSentDecoder = new NumberToNumberDecoder();
        this._retransmittedPacketsSentDecoder = new NumberToNumberDecoder();
        this._ridDecoder = new StringToStringDecoder();
        this._rtxSsrcDecoder = new BigIntToNumberDecoder();
        this._scalabilityModeDecoder = new StringToStringDecoder();
        this._targetBitrateDecoder = new NumberToNumberDecoder();
        this._totalEncodeTimeDecoder = new NumberToNumberDecoder();
        this._totalEncodedBytesTargetDecoder = new NumberToNumberDecoder();
        this._totalPacketSendDelayDecoder = new NumberToNumberDecoder();
        this._transportIdDecoder = new OneTimePassDecoder<string>();

        
    }

    public get visited(): boolean {
        const result = this._visited;
        this._visited = false;
        return result;
    }

    public reset(): void {
        this._idDecoder.reset();
        this._kindDecoder.reset();
        this._timestampDecoder.reset();
        this._activeDecoder.reset();
        this._bytesSentDecoder.reset();
        this._codecIdDecoder.reset();
        this._encoderImplementationDecoder.reset();
        this._firCountDecoder.reset();
        this._frameHeightDecoder.reset();
        this._frameWidthDecoder.reset();
        this._framesEncodedDecoder.reset();
        this._framesPerSecondDecoder.reset();
        this._framesSentDecoder.reset();
        this._headerBytesSentDecoder.reset();
        this._hugeFramesSentDecoder.reset();
        this._keyFramesEncodedDecoder.reset();
        this._mediaSourceIdDecoder.reset();
        this._midDecoder.reset();
        this._nackCountDecoder.reset();
        this._packetsSentDecoder.reset();
        this._pliCountDecoder.reset();
        this._powerEfficientEncoderDecoder.reset();
        this._qpSumDecoder.reset();
        this._qualityLimitationDurationsDecoder.reset();
        this._qualityLimitationReasonDecoder.reset();
        this._qualityLimitationResolutionChangesDecoder.reset();
        this._remoteIdDecoder.reset();
        this._retransmittedBytesSentDecoder.reset();
        this._retransmittedPacketsSentDecoder.reset();
        this._ridDecoder.reset();
        this._rtxSsrcDecoder.reset();
        this._scalabilityModeDecoder.reset();
        this._targetBitrateDecoder.reset();
        this._totalEncodeTimeDecoder.reset();
        this._totalEncodedBytesTargetDecoder.reset();
        this._totalPacketSendDelayDecoder.reset();
        this._transportIdDecoder.reset();
    }

    public decode(input: InputOutboundRtpStats): OutputOutboundRtpStats | undefined {
        this._visited = true;

        const timestamp = this._timestampDecoder.decode(input.timestamp);
        const id = this._idDecoder.decode(input.id);
		const kind = this._kindDecoder.decode(input.kind);

        if (!timestamp || id === undefined || !kind) {
            logger.warn("Invalid outbound RTP sample: missing timestamp or id", input, this);
            return undefined;
        }

        this._actualValue = {
            ssrc: this.ssrc,
            id,
            kind,
            timestamp,
            active: this._activeDecoder.decode(input.active),
            attachments: this._attachmentsDecoder.decode(input.attachments),
            bytesSent: this._bytesSentDecoder.decode(input.bytesSent),
            codecId: this._codecIdDecoder.decode(input.codecId),
            encoderImplementation: this._encoderImplementationDecoder.decode(input.encoderImplementation),
            firCount: this._firCountDecoder.decode(input.firCount),
            frameHeight: this._frameHeightDecoder.decode(input.frameHeight),
            frameWidth: this._frameWidthDecoder.decode(input.frameWidth),
            framesEncoded: this._framesEncodedDecoder.decode(input.framesEncoded),
            framesPerSecond: this._framesPerSecondDecoder.decode(input.framesPerSecond),
            framesSent: this._framesSentDecoder.decode(input.framesSent),
            headerBytesSent: this._headerBytesSentDecoder.decode(input.headerBytesSent),
            hugeFramesSent: this._hugeFramesSentDecoder.decode(input.hugeFramesSent),
            keyFramesEncoded: this._keyFramesEncodedDecoder.decode(input.keyFramesEncoded),
            mediaSourceId: this._mediaSourceIdDecoder.decode(input.mediaSourceId),
            mid: this._midDecoder.decode(input.mid),
            nackCount: this._nackCountDecoder.decode(input.nackCount),
            packetsSent: this._packetsSentDecoder.decode(input.packetsSent),
            pliCount: this._pliCountDecoder.decode(input.pliCount),
            powerEfficientEncoder: this._powerEfficientEncoderDecoder.decode(input.powerEfficientEncoder),
            qpSum: this._qpSumDecoder.decode(input.qpSum),
            qualityLimitationDurations: this._qualityLimitationDurationsDecoder.decode(input.qualityLimitationDurations),
            qualityLimitationReason: this._qualityLimitationReasonDecoder.decode(input.qualityLimitationReason),
            qualityLimitationResolutionChanges: this._qualityLimitationResolutionChangesDecoder.decode(input.qualityLimitationResolutionChanges),
            remoteId: this._remoteIdDecoder.decode(input.remoteId),
            retransmittedBytesSent: this._retransmittedBytesSentDecoder.decode(input.retransmittedBytesSent),
            retransmittedPacketsSent: this._retransmittedPacketsSentDecoder.decode(input.retransmittedPacketsSent),
            rid: this._ridDecoder.decode(input.rid),
            rtxSsrc: this._rtxSsrcDecoder.decode(input.rtxSsrc),
            scalabilityMode: this._scalabilityModeDecoder.decode(input.scalabilityMode),
            targetBitrate: this._targetBitrateDecoder.decode(input.targetBitrate),
            totalEncodeTime: this._totalEncodeTimeDecoder.decode(input.totalEncodeTime),
            totalEncodedBytesTarget: this._totalEncodedBytesTargetDecoder.decode(input.totalEncodedBytesTarget),
            totalPacketSendDelay: this._totalPacketSendDelayDecoder.decode(input.totalPacketSendDelay),
            transportId: this._transportIdDecoder.decode(input.transportId),
        };

        return this._actualValue;
    }

    public get actualValue(): OutputOutboundRtpStats | undefined {
        return this._actualValue;
    }

    public set actualValue(sample: OutputOutboundRtpStats | undefined) {
        if (!sample) return;
        
        this._visited = true;
        this._actualValue = sample;

        this._timestampDecoder.actualValue = sample.timestamp;
        this._idDecoder.actualValue = sample.id;
        this._kindDecoder.actualValue = sample.kind;
        this._activeDecoder.actualValue = sample.active;
        this._bytesSentDecoder.actualValue = sample.bytesSent;
        this._codecIdDecoder.actualValue = sample.codecId;
        this._encoderImplementationDecoder.actualValue = sample.encoderImplementation;
        this._firCountDecoder.actualValue = sample.firCount;
        this._frameHeightDecoder.actualValue = sample.frameHeight;
        this._frameWidthDecoder.actualValue = sample.frameWidth;
        this._framesEncodedDecoder.actualValue = sample.framesEncoded;
        this._framesPerSecondDecoder.actualValue = sample.framesPerSecond;
        this._framesSentDecoder.actualValue = sample.framesSent;
        this._headerBytesSentDecoder.actualValue = sample.headerBytesSent;
        this._hugeFramesSentDecoder.actualValue = sample.hugeFramesSent;
        this._keyFramesEncodedDecoder.actualValue = sample.keyFramesEncoded;
        this._mediaSourceIdDecoder.actualValue = sample.mediaSourceId;
        this._midDecoder.actualValue = sample.mid;
        this._nackCountDecoder.actualValue = sample.nackCount;
        this._packetsSentDecoder.actualValue = sample.packetsSent;
        this._pliCountDecoder.actualValue = sample.pliCount;
        this._powerEfficientEncoderDecoder.actualValue = sample.powerEfficientEncoder;
        this._qpSumDecoder.actualValue = sample.qpSum;
        this._qualityLimitationDurationsDecoder.actualValue = sample.qualityLimitationDurations;
        this._qualityLimitationReasonDecoder.actualValue = sample.qualityLimitationReason;
        this._qualityLimitationResolutionChangesDecoder.actualValue = sample.qualityLimitationResolutionChanges;
        this._remoteIdDecoder.actualValue = sample.remoteId;
        this._retransmittedBytesSentDecoder.actualValue = sample.retransmittedBytesSent;
        this._retransmittedPacketsSentDecoder.actualValue = sample.retransmittedPacketsSent;
        this._ridDecoder.actualValue = sample.rid;
        this._rtxSsrcDecoder.actualValue = sample.rtxSsrc;
        this._scalabilityModeDecoder.actualValue = sample.scalabilityMode;
        this._targetBitrateDecoder.actualValue = sample.targetBitrate;
        this._totalEncodeTimeDecoder.actualValue = sample.totalEncodeTime;
        this._totalEncodedBytesTargetDecoder.actualValue = sample.totalEncodedBytesTarget;
        this._totalPacketSendDelayDecoder.actualValue = sample.totalPacketSendDelay;
        this._transportIdDecoder.actualValue = sample.transportId;
        this._attachmentsDecoder.actualValue = sample.attachments;
    }
        
}