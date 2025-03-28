import { Encoder, StringToUint8ArrayEncoder } from "./utils";
import { MediaSourceStats as InputMediaSourceStats } from "./InputSamples";
import {
  NumberToNumberEncoder,
  StringToStringEncoder,
  AttachmentEncoder,
} from "./utils";
import { ClientSample_PeerConnectionSample_MediaSourceStats as OutputMediaSourceStats } from "./OutputSamples";

export class MediaSourceStatsEncoder implements Encoder<InputMediaSourceStats, OutputMediaSourceStats> {
  private _visited = false;
  private readonly _timestampEncoder: NumberToNumberEncoder;
  private readonly _idEncoder: StringToStringEncoder;
  private readonly _kindEncoder: StringToStringEncoder;
  private readonly _trackIdentifierEncoder: StringToUint8ArrayEncoder;
  private readonly _audioLevelEncoder: NumberToNumberEncoder;
  private readonly _totalAudioEnergyEncoder: NumberToNumberEncoder;
  private readonly _totalSamplesDurationEncoder: NumberToNumberEncoder;
  private readonly _echoReturnLossEncoder: NumberToNumberEncoder;
  private readonly _echoReturnLossEnhancementEncoder: NumberToNumberEncoder;
  private readonly _widthEncoder: NumberToNumberEncoder;
  private readonly _heightEncoder: NumberToNumberEncoder;
  private readonly _framesEncoder: NumberToNumberEncoder;
  private readonly _framesPerSecondEncoder: NumberToNumberEncoder;
  private readonly _attachmentsEncoder: AttachmentEncoder;

  constructor(attachmentsEncoder: AttachmentEncoder) {
    this._timestampEncoder = new NumberToNumberEncoder();
    this._idEncoder = new StringToStringEncoder();
    this._kindEncoder = new StringToStringEncoder();
    this._trackIdentifierEncoder = new StringToUint8ArrayEncoder();
    this._audioLevelEncoder = new NumberToNumberEncoder();
    this._totalAudioEnergyEncoder = new NumberToNumberEncoder();
    this._totalSamplesDurationEncoder = new NumberToNumberEncoder();
    this._echoReturnLossEncoder = new NumberToNumberEncoder();
    this._echoReturnLossEnhancementEncoder = new NumberToNumberEncoder();
    this._widthEncoder = new NumberToNumberEncoder();
    this._heightEncoder = new NumberToNumberEncoder();
    this._framesEncoder = new NumberToNumberEncoder();
    this._framesPerSecondEncoder = new NumberToNumberEncoder();
    this._attachmentsEncoder = attachmentsEncoder;
  }

  public get visited(): boolean {
    const result = this._visited;
    this._visited = false;
    return result;
  }

  public reset(): void {
    this._timestampEncoder.reset();
    this._idEncoder.reset();
    this._kindEncoder.reset();
    this._trackIdentifierEncoder.reset();
    this._audioLevelEncoder.reset();
    this._totalAudioEnergyEncoder.reset();
    this._totalSamplesDurationEncoder.reset();
    this._echoReturnLossEncoder.reset();
    this._echoReturnLossEnhancementEncoder.reset();
    this._widthEncoder.reset();
    this._heightEncoder.reset();
    this._framesEncoder.reset();
    this._framesPerSecondEncoder.reset();
    this._attachmentsEncoder.reset();
  }

  public encode(sample: InputMediaSourceStats): OutputMediaSourceStats {
    this._visited = true;

    return new OutputMediaSourceStats({
      timestamp: this._timestampEncoder.encode(sample.timestamp),
      id: this._idEncoder.encode(sample.id),
      kind: this._kindEncoder.encode(sample.kind),
      trackIdentifier: this._trackIdentifierEncoder.encode(sample.trackIdentifier),
      audioLevel: this._audioLevelEncoder.encode(sample.audioLevel),
      totalAudioEnergy: this._totalAudioEnergyEncoder.encode(sample.totalAudioEnergy),
      totalSamplesDuration: this._totalSamplesDurationEncoder.encode(sample.totalSamplesDuration),
      echoReturnLoss: this._echoReturnLossEncoder.encode(sample.echoReturnLoss),
      echoReturnLossEnhancement: this._echoReturnLossEnhancementEncoder.encode(sample.echoReturnLossEnhancement),
      width: this._widthEncoder.encode(sample.width),
      height: this._heightEncoder.encode(sample.height),
      frames: this._framesEncoder.encode(sample.frames),
      framesPerSecond: this._framesPerSecondEncoder.encode(sample.framesPerSecond),
      attachments: this._attachmentsEncoder.encode(sample.attachments),
    });
  }
}
