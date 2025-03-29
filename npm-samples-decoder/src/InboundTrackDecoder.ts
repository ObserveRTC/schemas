import { Decoder } from "./utils";
import { InboundTrackSample as OutputInboundTrackSample } from "./OutputSamples";
import {
  NumberToNumberDecoder,
  StringToStringDecoder,
  AttachmentDecoder,
} from "./utils";
import { ClientSample_PeerConnectionSample_InboundTrackSample as InputInboundTrackSample } from "./InputSamples";

const logger = console;

export class InboundTrackSampleDecoder implements Decoder<InputInboundTrackSample, OutputInboundTrackSample | undefined> {
  private _visited = false;
  private readonly _timestampDecoder: NumberToNumberDecoder;
  private readonly _idDecoder: StringToStringDecoder;
  private readonly _kindDecoder: StringToStringDecoder;
  private readonly _scoreDecoder: NumberToNumberDecoder;
  private readonly _attachmentsDecoder: AttachmentDecoder;

  constructor(attachmentsDecoder: AttachmentDecoder) {
    this._timestampDecoder = new NumberToNumberDecoder();
    this._idDecoder = new StringToStringDecoder();
    this._kindDecoder = new StringToStringDecoder();
    this._scoreDecoder = new NumberToNumberDecoder();
    this._attachmentsDecoder = attachmentsDecoder;
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

  public decode(input: InputInboundTrackSample): OutputInboundTrackSample | undefined {
    this._visited = true;

    const timestamp = this._timestampDecoder.decode(input.timestamp);
    const id = this._idDecoder.decode(input.id);
	const kind = this._kindDecoder.decode(input.kind);

    if (!timestamp || id === undefined || kind === undefined) {
      logger.warn("Invalid inbound track sample: missing timestamp or id");
      return undefined;
    }

    return {
      timestamp,
      id,
      kind,
      score: this._scoreDecoder.decode(input.score),
      attachments: this._attachmentsDecoder.decode(input.attachments),
    };
  }
}