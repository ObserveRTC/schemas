import { Encoder, StringToUint8ArrayEncoder } from "./utils";
import { StringToStringEncoder, NumberToNumberEncoder, AppDataEncoder } from "./utils";
import { VideoSourceStats as InputVideoSourceStats } from "./InputSamples";
import { ClientSample_PeerConnectionSample_VideoSourceStats } from "./OutputSamples";

export class VideoSourceEncoder implements Encoder<InputVideoSourceStats, ClientSample_PeerConnectionSample_VideoSourceStats> {
  private _visited = false;

  private readonly _timestampEncoder: NumberToNumberEncoder;
  private readonly _idEncoder: StringToStringEncoder;
  private readonly _trackIdentifierEncoder: StringToUint8ArrayEncoder;
  private readonly _kindEncoder: StringToStringEncoder;
  private readonly _widthEncoder: NumberToNumberEncoder;
  private readonly _heightEncoder: NumberToNumberEncoder;
  private readonly _framesEncoder: NumberToNumberEncoder;
  private readonly _framesPerSecondEncoder: NumberToNumberEncoder;
  private readonly _appDataEncoder: AppDataEncoder;

  constructor(appDataEncoder: AppDataEncoder) {
    this._timestampEncoder = new NumberToNumberEncoder();
    this._idEncoder = new StringToStringEncoder();
    this._trackIdentifierEncoder = new StringToUint8ArrayEncoder();
    this._kindEncoder = new StringToStringEncoder();
    this._widthEncoder = new NumberToNumberEncoder();
    this._heightEncoder = new NumberToNumberEncoder();
    this._framesEncoder = new NumberToNumberEncoder();
    this._framesPerSecondEncoder = new NumberToNumberEncoder();
    this._appDataEncoder = appDataEncoder;
  }

  public get visited(): boolean {
    const result = this._visited;
    this._visited = false;
    return result;
  }

  public reset(): void {
    this._timestampEncoder.reset();
    this._idEncoder.reset();
    this._trackIdentifierEncoder.reset();
    this._kindEncoder.reset();
    this._widthEncoder.reset();
    this._heightEncoder.reset();
    this._framesEncoder.reset();
    this._framesPerSecondEncoder.reset();
    this._appDataEncoder.reset();
  }

  public encode(sample: InputVideoSourceStats): ClientSample_PeerConnectionSample_VideoSourceStats {
    this._visited = true;

    return new ClientSample_PeerConnectionSample_VideoSourceStats({
      timestamp: this._timestampEncoder.encode(sample.timestamp),
      id: this._idEncoder.encode(sample.id),
      trackIdentifier: this._trackIdentifierEncoder.encode(sample.trackIdentifier),
      kind: this._kindEncoder.encode(sample.kind),
      width: this._widthEncoder.encode(sample.width),
      height: this._heightEncoder.encode(sample.height),
      frames: this._framesEncoder.encode(sample.frames),
      framesPerSecond: this._framesPerSecondEncoder.encode(sample.framesPerSecond),
      appData: this._appDataEncoder.encode(sample.appData),
    });
  }
}
