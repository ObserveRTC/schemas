import { AppDataEncoder, NumberToNumberEncoder, StringToStringEncoder } from "./utils";
import { Encoder } from "./utils";
import { PeerConnectionTransportStats } from "./InputSamples";
import { ClientSample_PeerConnectionSample_PeerConnectionTransportStats } from "./OutputSamples";

export class PeerConnectionTransportEncoder
  implements
    Encoder<PeerConnectionTransportStats, ClientSample_PeerConnectionSample_PeerConnectionTransportStats>
{
  private _visited = false;
  private readonly _idEncoder: StringToStringEncoder;
  private readonly _timestampEncoder: NumberToNumberEncoder;
  private readonly _dataChannelsOpenedEncoder: NumberToNumberEncoder;
  private readonly _dataChannelsClosedEncoder: NumberToNumberEncoder;
  private readonly _appDataEncoder: AppDataEncoder;

  constructor(appDataEncoder: AppDataEncoder) {
    this._idEncoder = new StringToStringEncoder();
    this._timestampEncoder = new NumberToNumberEncoder();
    this._dataChannelsOpenedEncoder = new NumberToNumberEncoder();
    this._dataChannelsClosedEncoder = new NumberToNumberEncoder();
    this._appDataEncoder = appDataEncoder;
  }

  public get visited(): boolean {
    const result = this._visited;
    this._visited = false;
    return result;
  }

  public reset(): void {
    this._idEncoder.reset();
    this._timestampEncoder.reset();
    this._dataChannelsOpenedEncoder.reset();
    this._dataChannelsClosedEncoder.reset();
    this._appDataEncoder.reset();
  }

  public encode(
    sample: PeerConnectionTransportStats
  ): ClientSample_PeerConnectionSample_PeerConnectionTransportStats {
    this._visited = true;

    return new ClientSample_PeerConnectionSample_PeerConnectionTransportStats({
      id: this._idEncoder.encode(sample.id),
      timestamp: this._timestampEncoder.encode(sample.timestamp),
      dataChannelsOpened: this._dataChannelsOpenedEncoder.encode(
        sample.dataChannelsOpened
      ),
      dataChannelsClosed: this._dataChannelsClosedEncoder.encode(
        sample.dataChannelsClosed
      ),
      appData: this._appDataEncoder.encode(sample.appData),
    });
  }
}
