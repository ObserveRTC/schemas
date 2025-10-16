import { AttachmentEncoder, NumberToNumberEncoder, StringToStringEncoder } from "./utils";
import { Encoder } from "./utils";
import { PeerConnectionTransportStats } from "./InputSamples";
import { ClientSample_PeerConnectionSample_PeerConnectionTransportStatsSchema } from "./OutputSamples";
import { create as createMessage, MessageInitShape } from "@bufbuild/protobuf";

export class PeerConnectionTransportEncoder
  implements
    Encoder<PeerConnectionTransportStats, MessageInitShape<typeof ClientSample_PeerConnectionSample_PeerConnectionTransportStatsSchema>>
{
  private _visited = false;
  private readonly _idEncoder: StringToStringEncoder;
  private readonly _timestampEncoder: NumberToNumberEncoder;
  private readonly _dataChannelsOpenedEncoder: NumberToNumberEncoder;
  private readonly _dataChannelsClosedEncoder: NumberToNumberEncoder;
  private readonly _attachmentsEncoder: AttachmentEncoder;

  constructor(attachmentsEncoder: AttachmentEncoder) {
    this._idEncoder = new StringToStringEncoder();
    this._timestampEncoder = new NumberToNumberEncoder();
    this._dataChannelsOpenedEncoder = new NumberToNumberEncoder();
    this._dataChannelsClosedEncoder = new NumberToNumberEncoder();
    this._attachmentsEncoder = attachmentsEncoder;
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
    this._attachmentsEncoder.reset();
  }

  public encode(
    sample: PeerConnectionTransportStats
  ):  MessageInitShape<typeof ClientSample_PeerConnectionSample_PeerConnectionTransportStatsSchema> {
    this._visited = true;

    return {
      id: sample.id,
      timestamp: this._timestampEncoder.encode(sample.timestamp),
      dataChannelsOpened: this._dataChannelsOpenedEncoder.encode(
        sample.dataChannelsOpened
      ),
      dataChannelsClosed: this._dataChannelsClosedEncoder.encode(
        sample.dataChannelsClosed
      ),
      attachments: this._attachmentsEncoder.encode(sample.attachments),
    };
  }
}
