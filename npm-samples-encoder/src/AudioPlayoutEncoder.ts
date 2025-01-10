import { Encoder } from "./utils";
import { AudioPlayoutStats as InputAudioPlayoutStats } from "./InputSamples";
import {
  AppDataEncoder,
  NumberToNumberEncoder,
  StringToStringEncoder,
} from "./utils";
import { ClientSample_PeerConnectionSample_AudioPlayoutStats } from "./OutputSamples";

export class AudioPlayoutEncoder implements Encoder<InputAudioPlayoutStats, ClientSample_PeerConnectionSample_AudioPlayoutStats> {
  private _visited = false;
  private readonly _timestampEncoder: NumberToNumberEncoder;
  private readonly _kindEncoder: StringToStringEncoder;
  private readonly _synthesizedSamplesDurationEncoder: NumberToNumberEncoder;
  private readonly _synthesizedSamplesEventsEncoder: NumberToNumberEncoder;
  private readonly _totalSamplesDurationEncoder: NumberToNumberEncoder;
  private readonly _totalPlayoutDelayEncoder: NumberToNumberEncoder;
  private readonly _totalSamplesCountEncoder: NumberToNumberEncoder;
  private readonly _appDataEncoder: AppDataEncoder;

  constructor(appDataEncoder: AppDataEncoder) {
    this._timestampEncoder = new NumberToNumberEncoder();
    this._kindEncoder = new StringToStringEncoder();
    this._synthesizedSamplesDurationEncoder = new NumberToNumberEncoder();
    this._synthesizedSamplesEventsEncoder = new NumberToNumberEncoder();
    this._totalSamplesDurationEncoder = new NumberToNumberEncoder();
    this._totalPlayoutDelayEncoder = new NumberToNumberEncoder();
    this._totalSamplesCountEncoder = new NumberToNumberEncoder();
    this._appDataEncoder = appDataEncoder;
  }

  public get visited(): boolean {
    const result = this._visited;
    this._visited = false;
    return result;
  }

  public reset(): void {
    this._timestampEncoder.reset();
    this._kindEncoder.reset();
    this._synthesizedSamplesDurationEncoder.reset();
    this._synthesizedSamplesEventsEncoder.reset();
    this._totalSamplesDurationEncoder.reset();
    this._totalPlayoutDelayEncoder.reset();
    this._totalSamplesCountEncoder.reset();
    this._appDataEncoder.reset();
  }

  public encode(sample: InputAudioPlayoutStats): ClientSample_PeerConnectionSample_AudioPlayoutStats {
    this._visited = true;
    return new ClientSample_PeerConnectionSample_AudioPlayoutStats({
      id: sample.id,
      timestamp: this._timestampEncoder.encode(sample.timestamp),
      kind: this._kindEncoder.encode(sample.kind),
      synthesizedSamplesDuration: this._synthesizedSamplesDurationEncoder.encode(sample.synthesizedSamplesDuration),
      synthesizedSamplesEvents: this._synthesizedSamplesEventsEncoder.encode(sample.synthesizedSamplesEvents),
      totalSamplesDuration: this._totalSamplesDurationEncoder.encode(sample.totalSamplesDuration),
      totalPlayoutDelay: this._totalPlayoutDelayEncoder.encode(sample.totalPlayoutDelay),
      totalSamplesCount: this._totalSamplesCountEncoder.encode(sample.totalSamplesCount),
      appData: this._appDataEncoder.encode(sample.appData),
    });
  }
}
