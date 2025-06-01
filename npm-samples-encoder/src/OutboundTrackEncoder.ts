import { Encoder } from "./utils";
import { OutboundTrackSample as InputOutboundTrackSample } from "./InputSamples";
import {
  NumberToNumberEncoder,
  StringToStringEncoder,
  AttachmentEncoder,
} from "./utils";
import { ClientSample_PeerConnectionSample_OutboundTrackSample as OutputOutboundTrackSample } from "./OutputSamples";

export class OutboundTrackSampleEncoder implements Encoder<InputOutboundTrackSample, OutputOutboundTrackSample> {
  private _visited = false;
  private readonly _timestampEncoder: NumberToNumberEncoder;
  private readonly _idEncoder: StringToStringEncoder;
  private readonly _kindEncoder: StringToStringEncoder;
  private readonly _scoreEncoder: NumberToNumberEncoder;
  private readonly _scoreReasonsEncoder: StringToStringEncoder;
  private readonly _attachmentsEncoder: AttachmentEncoder;

  constructor(attachmentsEncoder: AttachmentEncoder) {
    this._timestampEncoder = new NumberToNumberEncoder();
    this._idEncoder = new StringToStringEncoder();
    this._kindEncoder = new StringToStringEncoder();
    this._scoreEncoder = new NumberToNumberEncoder();
    this._scoreReasonsEncoder = new StringToStringEncoder();
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
    this._scoreEncoder.reset();
    this._scoreReasonsEncoder.reset();
    this._attachmentsEncoder.reset();
  }

  public encode(sample: InputOutboundTrackSample): OutputOutboundTrackSample {
    this._visited = true;

    return new OutputOutboundTrackSample({
      timestamp: this._timestampEncoder.encode(sample.timestamp),
      id: sample.id,
      kind: this._kindEncoder.encode(sample.kind),
      score: this._scoreEncoder.encode(sample.score),
      scoreReasons: this._scoreReasonsEncoder.encode(sample.scoreReasons),
      attachments: this._attachmentsEncoder.encode(sample.attachments),
    });
  }
}
