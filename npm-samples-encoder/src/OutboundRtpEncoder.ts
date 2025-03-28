import {
  AttachmentEncoder,
  BooleanToBooleanEncoder,
  NumberToNumberEncoder,
  OneTimePassEncoder,
  StringToStringEncoder,
} from "./utils";
import { ClientSample_PeerConnectionSample_OutboundRtpStats, ClientSample_PeerConnectionSample_OutboundRtpStats_QualityLimitationDurations } from "./OutputSamples";
import { Encoder } from "./utils";
import { OutboundRtpStats } from "./InputSamples";

export class QualityLimitationDurationsEncoder implements Encoder<OutboundRtpStats['qualityLimitationDurations'], ClientSample_PeerConnectionSample_OutboundRtpStats['qualityLimitationDurations']> {
  private _value: OutboundRtpStats['qualityLimitationDurations'] | undefined;

  public get actualValue() {
    return this._value;
  }

  public reset() {
    this._value = undefined;
  }

  encode(newValue?: OutboundRtpStats['qualityLimitationDurations']) {
    if (newValue === undefined) return;
    if (newValue.bandwidth === this._value?.bandwidth && 
      newValue.cpu === this._value?.cpu && 
      newValue.none === this._value?.none && 
      newValue.other === this._value?.other 
    ) {
      return;
    } 
    this._value = newValue;
    return new ClientSample_PeerConnectionSample_OutboundRtpStats_QualityLimitationDurations({
      bandwidth: newValue.bandwidth,
      cpu: newValue.cpu,
      none: newValue.none,
      other: newValue.other,
    });
  }
}


export class OutboundRtpEncoder implements Encoder<OutboundRtpStats, ClientSample_PeerConnectionSample_OutboundRtpStats> {
  private readonly _ssrc: bigint;
  private _visited = false;

  private readonly _idEncoder: StringToStringEncoder;
  private readonly _kindEncoder: StringToStringEncoder;
  private readonly _timestampEncoder: NumberToNumberEncoder;
  private readonly _activeEncoder: BooleanToBooleanEncoder;
  private readonly _bytesSentEncoder: NumberToNumberEncoder;
  private readonly _codecIdEncoder: OneTimePassEncoder<string>;
  private readonly _encoderImplementationEncoder: OneTimePassEncoder<string>;
  private readonly _firCountEncoder: NumberToNumberEncoder;
  private readonly _frameHeightEncoder: NumberToNumberEncoder;
  private readonly _frameWidthEncoder: NumberToNumberEncoder;
  private readonly _framesEncodedEncoder: NumberToNumberEncoder;
  private readonly _framesPerSecondEncoder: NumberToNumberEncoder;
  private readonly _framesSentEncoder: NumberToNumberEncoder;
  private readonly _headerBytesSentEncoder: NumberToNumberEncoder;
  private readonly _hugeFramesSentEncoder: NumberToNumberEncoder;
  private readonly _keyFramesEncodedEncoder: NumberToNumberEncoder;
  private readonly _mediaSourceIdEncoder: OneTimePassEncoder<string>;
  private readonly _midEncoder: OneTimePassEncoder<string>;
  private readonly _nackCountEncoder: NumberToNumberEncoder;
  private readonly _packetsSentEncoder: NumberToNumberEncoder;
  private readonly _pliCountEncoder: NumberToNumberEncoder;
  private readonly _powerEfficientEncoderEncoder: BooleanToBooleanEncoder;
  private readonly _qpSumEncoder: NumberToNumberEncoder;
  private readonly _qualityLimitationDurationsEncoder: QualityLimitationDurationsEncoder;
  private readonly _qualityLimitationReasonEncoder: StringToStringEncoder;
  private readonly _qualityLimitationResolutionChangesEncoder: NumberToNumberEncoder;
  private readonly _remoteIdEncoder: StringToStringEncoder;
  private readonly _retransmittedBytesSentEncoder: NumberToNumberEncoder;
  private readonly _retransmittedPacketsSentEncoder: NumberToNumberEncoder;
  private readonly _ridEncoder: StringToStringEncoder;
  private readonly _rtxSsrcEncoder: NumberToNumberEncoder;
  private readonly _scalabilityModeEncoder: StringToStringEncoder;
  private readonly _targetBitrateEncoder: NumberToNumberEncoder;
  private readonly _totalEncodeTimeEncoder: NumberToNumberEncoder;
  private readonly _totalEncodedBytesTargetEncoder: NumberToNumberEncoder;
  private readonly _totalPacketSendDelayEncoder: NumberToNumberEncoder;
  private readonly _transportIdEncoder: OneTimePassEncoder<string>;

  constructor(
    ssrc: number,
    private readonly _attachmentsEncoder: AttachmentEncoder
  ) {
    this._ssrc = BigInt(ssrc);

    this._idEncoder = new StringToStringEncoder();
    this._kindEncoder = new StringToStringEncoder();
    this._timestampEncoder = new NumberToNumberEncoder();
    this._activeEncoder = new BooleanToBooleanEncoder();
    this._bytesSentEncoder = new NumberToNumberEncoder();
    this._codecIdEncoder = new OneTimePassEncoder<string>();
    this._encoderImplementationEncoder = new OneTimePassEncoder<string>();
    this._firCountEncoder = new NumberToNumberEncoder();
    this._frameHeightEncoder = new NumberToNumberEncoder();
    this._frameWidthEncoder = new NumberToNumberEncoder();
    this._framesEncodedEncoder = new NumberToNumberEncoder();
    this._framesPerSecondEncoder = new NumberToNumberEncoder();
    this._framesSentEncoder = new NumberToNumberEncoder();
    this._headerBytesSentEncoder = new NumberToNumberEncoder();
    this._hugeFramesSentEncoder = new NumberToNumberEncoder();
    this._keyFramesEncodedEncoder = new NumberToNumberEncoder();
    this._mediaSourceIdEncoder = new OneTimePassEncoder<string>();
    this._midEncoder = new OneTimePassEncoder<string>();
    this._nackCountEncoder = new NumberToNumberEncoder();
    this._packetsSentEncoder = new NumberToNumberEncoder();
    this._pliCountEncoder = new NumberToNumberEncoder();
    this._powerEfficientEncoderEncoder = new BooleanToBooleanEncoder();
    this._qpSumEncoder = new NumberToNumberEncoder();
    this._qualityLimitationDurationsEncoder = new QualityLimitationDurationsEncoder();
    this._qualityLimitationReasonEncoder = new StringToStringEncoder();
    this._qualityLimitationResolutionChangesEncoder = new NumberToNumberEncoder();
    this._remoteIdEncoder = new StringToStringEncoder();
    this._retransmittedBytesSentEncoder = new NumberToNumberEncoder();
    this._retransmittedPacketsSentEncoder = new NumberToNumberEncoder();
    this._ridEncoder = new StringToStringEncoder();
    this._rtxSsrcEncoder = new NumberToNumberEncoder();
    this._scalabilityModeEncoder = new StringToStringEncoder();
    this._targetBitrateEncoder = new NumberToNumberEncoder();
    this._totalEncodeTimeEncoder = new NumberToNumberEncoder();
    this._totalEncodedBytesTargetEncoder = new NumberToNumberEncoder();
    this._totalPacketSendDelayEncoder = new NumberToNumberEncoder();
    this._transportIdEncoder = new OneTimePassEncoder<string>();
  }

  public get visited(): boolean {
    const result = this._visited;
    this._visited = false;
    return result;
  }

  public reset() {
    this._idEncoder.reset();
    this._kindEncoder.reset();
    this._timestampEncoder.reset();
    this._activeEncoder.reset();
    this._bytesSentEncoder.reset();
    this._codecIdEncoder.reset();
    this._encoderImplementationEncoder.reset();
    this._firCountEncoder.reset();
    this._frameHeightEncoder.reset();
    this._frameWidthEncoder.reset();
    this._framesEncodedEncoder.reset();
    this._framesPerSecondEncoder.reset();
    this._framesSentEncoder.reset();
    this._headerBytesSentEncoder.reset();
    this._hugeFramesSentEncoder.reset();
    this._keyFramesEncodedEncoder.reset();
    this._mediaSourceIdEncoder.reset();
    this._midEncoder.reset();
    this._nackCountEncoder.reset();
    this._packetsSentEncoder.reset();
    this._pliCountEncoder.reset();
    this._powerEfficientEncoderEncoder.reset();
    this._qpSumEncoder.reset();
    this._qualityLimitationDurationsEncoder.reset();
    this._qualityLimitationReasonEncoder.reset();
    this._qualityLimitationResolutionChangesEncoder.reset();
    this._remoteIdEncoder.reset();
    this._retransmittedBytesSentEncoder.reset();
    this._retransmittedPacketsSentEncoder.reset();
    this._ridEncoder.reset();
    this._rtxSsrcEncoder.reset();
    this._scalabilityModeEncoder.reset();
    this._targetBitrateEncoder.reset();
    this._totalEncodeTimeEncoder.reset();
    this._totalEncodedBytesTargetEncoder.reset();
    this._totalPacketSendDelayEncoder.reset();
    this._transportIdEncoder.reset();
  }

  public encode(sample: OutboundRtpStats): ClientSample_PeerConnectionSample_OutboundRtpStats {
    this._visited = true;

    const result = new ClientSample_PeerConnectionSample_OutboundRtpStats({
      ssrc: this._ssrc,
      id: this._idEncoder.encode(sample.id),
      kind: this._kindEncoder.encode(sample.kind),
      timestamp: this._timestampEncoder.encode(sample.timestamp),
      active: this._activeEncoder.encode(sample.active),
      attachments: this._attachmentsEncoder.encode(sample.attachments),
      bytesSent: this._bytesSentEncoder.encode(sample.bytesSent),
      codecId: this._codecIdEncoder.encode(sample.codecId),
      encoderImplementation: this._encoderImplementationEncoder.encode(sample.encoderImplementation),
      firCount: this._firCountEncoder.encode(sample.firCount),
      frameHeight: this._frameHeightEncoder.encode(sample.frameHeight),
      frameWidth: this._frameWidthEncoder.encode(sample.frameWidth),
      framesEncoded: this._framesEncodedEncoder.encode(sample.framesEncoded),
      framesPerSecond: this._framesPerSecondEncoder.encode(sample.framesPerSecond),
      framesSent: this._framesSentEncoder.encode(sample.framesSent),
      headerBytesSent: this._headerBytesSentEncoder.encode(sample.headerBytesSent),
      hugeFramesSent: this._hugeFramesSentEncoder.encode(sample.hugeFramesSent),
      keyFramesEncoded: this._keyFramesEncodedEncoder.encode(sample.keyFramesEncoded),
      mediaSourceId: this._mediaSourceIdEncoder.encode(sample.mediaSourceId),
      mid: this._midEncoder.encode(sample.mid),
      nackCount: this._nackCountEncoder.encode(sample.nackCount),
      packetsSent: this._packetsSentEncoder.encode(sample.packetsSent),
      pliCount: this._pliCountEncoder.encode(sample.pliCount),
      powerEfficientEncoder: this._powerEfficientEncoderEncoder.encode(sample.powerEfficientEncoder),
      qpSum: this._qpSumEncoder.encode(sample.qpSum),
      qualityLimitationDurations: this._qualityLimitationDurationsEncoder.encode(sample.qualityLimitationDurations),
      qualityLimitationReason: this._qualityLimitationReasonEncoder.encode(sample.qualityLimitationReason),
      qualityLimitationResolutionChanges: this._qualityLimitationResolutionChangesEncoder.encode(sample.qualityLimitationResolutionChanges),
      remoteId: this._remoteIdEncoder.encode(sample.remoteId),
      retransmittedBytesSent: this._retransmittedBytesSentEncoder.encode(sample.retransmittedBytesSent),
      retransmittedPacketsSent: this._retransmittedPacketsSentEncoder.encode(sample.retransmittedPacketsSent),
      rid: this._ridEncoder.encode(sample.rid),
      rtxSsrc: this._rtxSsrcEncoder.encode(sample.rtxSsrc),
      scalabilityMode: this._scalabilityModeEncoder.encode(sample.scalabilityMode),
      targetBitrate: this._targetBitrateEncoder.encode(sample.targetBitrate),
      totalEncodeTime: this._totalEncodeTimeEncoder.encode(sample.totalEncodeTime),
      totalEncodedBytesTarget: this._totalEncodedBytesTargetEncoder.encode(sample.totalEncodedBytesTarget),
      totalPacketSendDelay: this._totalPacketSendDelayEncoder.encode(sample.totalPacketSendDelay),
      transportId: this._transportIdEncoder.encode(sample.transportId),
    });

    return result;
	}
}