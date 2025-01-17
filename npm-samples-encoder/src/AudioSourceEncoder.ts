import { AudioSourceStats } from "./InputSamples";
import { ClientSample_PeerConnectionSample_AudioSourceStats } from "./OutputSamples";
import { Encoder, StringToUint8ArrayEncoder } from "./utils";
import {
  StringToStringEncoder,
  NumberToNumberEncoder,
  AppDataEncoder,
} from "./utils";

export class AudioSourceEncoder implements Encoder<AudioSourceStats, ClientSample_PeerConnectionSample_AudioSourceStats> {
  private _visited = false;
  private readonly _timestampEncoder: NumberToNumberEncoder;
  private readonly _trackIdentifierEncoder: StringToUint8ArrayEncoder;
  private readonly _kindEncoder: StringToStringEncoder;
  private readonly _audioLevelEncoder: NumberToNumberEncoder;
  private readonly _totalAudioEnergyEncoder: NumberToNumberEncoder;
  private readonly _totalSamplesDurationEncoder: NumberToNumberEncoder;
  private readonly _echoReturnLossEncoder: NumberToNumberEncoder;
  private readonly _echoReturnLossEnhancementEncoder: NumberToNumberEncoder;
  private readonly _appDataEncoder: AppDataEncoder;

  constructor(appDataEncoder: AppDataEncoder) {
    this._timestampEncoder = new NumberToNumberEncoder();
    this._trackIdentifierEncoder = new StringToUint8ArrayEncoder();
    this._kindEncoder = new StringToStringEncoder();
    this._audioLevelEncoder = new NumberToNumberEncoder();
    this._totalAudioEnergyEncoder = new NumberToNumberEncoder();
    this._totalSamplesDurationEncoder = new NumberToNumberEncoder();
    this._echoReturnLossEncoder = new NumberToNumberEncoder();
    this._echoReturnLossEnhancementEncoder = new NumberToNumberEncoder();
    this._appDataEncoder = appDataEncoder;
  }

  public get visited(): boolean {
    const result = this._visited;
    this._visited = false;
    return result;
  }

  public reset(): void {
    this._timestampEncoder.reset();
    this._trackIdentifierEncoder.reset();
    this._kindEncoder.reset();
    this._audioLevelEncoder.reset();
    this._totalAudioEnergyEncoder.reset();
    this._totalSamplesDurationEncoder.reset();
    this._echoReturnLossEncoder.reset();
    this._echoReturnLossEnhancementEncoder.reset();
    this._appDataEncoder.reset();
  }

  public encode(stats: AudioSourceStats): ClientSample_PeerConnectionSample_AudioSourceStats {
    this._visited = true;
    
    return new ClientSample_PeerConnectionSample_AudioSourceStats({
      id: stats.id,
      timestamp: this._timestampEncoder.encode(stats.timestamp),
      trackIdentifier: this._trackIdentifierEncoder.encode(stats.trackIdentifier),
      audioLevel: this._audioLevelEncoder.encode(stats.audioLevel ?? 0),
      totalAudioEnergy: this._totalAudioEnergyEncoder.encode(stats.totalAudioEnergy ?? 0),
      totalSamplesDuration: this._totalSamplesDurationEncoder.encode(stats.totalSamplesDuration ?? 0),
      echoReturnLoss: this._echoReturnLossEncoder.encode(stats.echoReturnLoss ?? 0),
      echoReturnLossEnhancement: this._echoReturnLossEnhancementEncoder.encode(stats.echoReturnLossEnhancement ?? 0),
      appData: this._appDataEncoder.encode(stats.appData ?? {}),
    });
  }
}
