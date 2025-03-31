import { Decoder } from "./utils";
import { OutboundTrackSample as OutputOutboundTrackSample } from "./OutputSamples";
import {
  NumberToNumberDecoder,
  StringToStringDecoder,
  AttachmentDecoder,
} from "./utils";
import { ClientSample_PeerConnectionSample_OutboundTrackSample as InputOutboundTrackSample } from "./InputSamples";

const logger = console;

export class OutboundTrackDecoder implements Decoder<InputOutboundTrackSample, OutputOutboundTrackSample | undefined> {
  private _visited = false;
  private readonly _timestampDecoder: NumberToNumberDecoder;
  private readonly _idDecoder: StringToStringDecoder;
  private readonly _kindDecoder: StringToStringDecoder;
  private readonly _scoreDecoder: NumberToNumberDecoder;

  constructor(
    public readonly id: string,
    private readonly _attachmentsDecoder: AttachmentDecoder,
  ) {
    this._timestampDecoder = new NumberToNumberDecoder();
    this._idDecoder = new StringToStringDecoder();
    this._kindDecoder = new StringToStringDecoder();
    this._scoreDecoder = new NumberToNumberDecoder();
  }

  public get visited(): boolean {
    const result = this._visited;
    this._visited = false;
    return result;
  }

  public reset(): void {
    this._timestampDecoder.reset();
    this._idDecoder.reset();
    this._kindDecoder.reset();
    this._scoreDecoder.reset();
    this._attachmentsDecoder.reset();
  }

  public decode(input: InputOutboundTrackSample): OutputOutboundTrackSample | undefined {
    this._visited = true;

    const timestamp = this._timestampDecoder.decode(input.timestamp);
    const kind = this._kindDecoder.decode(input.kind);

    if (!timestamp || kind === undefined) {
      logger.warn("Invalid outbound track sample: missing timestamp or id");
      return undefined;
    }

    return {
      timestamp,
      id: this.id,
      kind,
      score: this._scoreDecoder.decode(input.score),
      attachments: this._attachmentsDecoder.decode(input.attachments),
    };
  }
}