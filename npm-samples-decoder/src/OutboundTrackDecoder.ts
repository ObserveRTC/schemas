import { Decoder } from "./utils";
import { OutboundTrackSample as OutputOutboundTrackSample } from "./OutputSamples";
import {
  NumberToNumberDecoder,
  StringToStringDecoder,
  AttachmentDecoder,
} from "./utils";
import { ClientSample_PeerConnectionSample_OutboundTrackSample as InputOutboundTrackSample } from "./InputSamples";
import { logger } from "./Logger";

export class OutboundTrackDecoder implements Decoder<InputOutboundTrackSample, OutputOutboundTrackSample | undefined> {
  private _visited = false;
  private readonly _timestampDecoder: NumberToNumberDecoder;
  private readonly _idDecoder: StringToStringDecoder;
  private readonly _kindDecoder: StringToStringDecoder;
  private readonly _scoreDecoder: NumberToNumberDecoder;
  private readonly _scoreReasonsDecoder: StringToStringDecoder;

  private _actualValue: OutputOutboundTrackSample | undefined = undefined;

  constructor(
    public readonly id: string,
    private readonly _attachmentsDecoder: AttachmentDecoder,
  ) {
    this._timestampDecoder = new NumberToNumberDecoder();
    this._idDecoder = new StringToStringDecoder();
    this._kindDecoder = new StringToStringDecoder();
    this._scoreDecoder = new NumberToNumberDecoder();
    this._scoreReasonsDecoder = new StringToStringDecoder();
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
    this._scoreReasonsDecoder.reset();
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

    this._actualValue = {
      timestamp,
      id: this.id,
      kind,
      score: this._scoreDecoder.decode(input.score),
      scoreReasons: this._scoreReasonsDecoder.decode(input.scoreReasons),
      attachments: this._attachmentsDecoder.decode(input.attachments),
    };

    return this._actualValue;
  }

  public get actualValue(): OutputOutboundTrackSample | undefined {
    return this._actualValue;
  }

  public set actualValue(sample: OutputOutboundTrackSample | undefined) {
    if (!sample) return;
    
    this._visited = true;
    this._actualValue = sample;

    this._timestampDecoder.actualValue = sample.timestamp;
    this._idDecoder.actualValue = sample.id;
    this._kindDecoder.actualValue = sample.kind;
    this._scoreDecoder.actualValue = sample.score;
    this._scoreReasonsDecoder.actualValue = sample.scoreReasons;
    this._attachmentsDecoder.actualValue = sample.attachments;
  }
}