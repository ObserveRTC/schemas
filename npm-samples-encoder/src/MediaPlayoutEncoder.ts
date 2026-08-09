import { Encoder, NumberToBigIntEncoder } from "./utils";
import { MediaPlayoutStats as InputMediaPlayoutStats } from "./InputSamples";
import {
  NumberToNumberEncoder,
  StringToStringEncoder,
  AttachmentEncoder,
} from "./utils";
import { ClientSample_PeerConnectionSample_MediaPlayoutStatsSchema } from "./OutputSamples";
import { create as createMessage, MessageInitShape } from "@bufbuild/protobuf";

export class MediaPlayoutStatsEncoder implements Encoder<InputMediaPlayoutStats, MessageInitShape<typeof ClientSample_PeerConnectionSample_MediaPlayoutStatsSchema>> {
  private _visited = false;
  private readonly _timestampEncoder: NumberToNumberEncoder;
  private readonly _idEncoder: StringToStringEncoder;
  private readonly _kindEncoder: StringToStringEncoder;
  private readonly _synthesizedSamplesDurationEncoder: NumberToNumberEncoder;
  private readonly _synthesizedSamplesEventsEncoder: NumberToBigIntEncoder;
  private readonly _totalSamplesDurationEncoder: NumberToNumberEncoder;
  private readonly _totalPlayoutDelayEncoder: NumberToNumberEncoder;
  private readonly _totalSamplesCountEncoder: NumberToBigIntEncoder;
  private readonly _attachmentsEncoder: AttachmentEncoder;

  constructor(attachmentsEncoder: AttachmentEncoder) {
    this._timestampEncoder = new NumberToNumberEncoder();
    this._idEncoder = new StringToStringEncoder();
    this._kindEncoder = new StringToStringEncoder();
    this._synthesizedSamplesDurationEncoder = new NumberToNumberEncoder();
    this._synthesizedSamplesEventsEncoder = new NumberToBigIntEncoder();
    this._totalSamplesDurationEncoder = new NumberToNumberEncoder();
    this._totalPlayoutDelayEncoder = new NumberToNumberEncoder();
    this._totalSamplesCountEncoder = new NumberToBigIntEncoder();
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
    this._synthesizedSamplesDurationEncoder.reset();
    this._synthesizedSamplesEventsEncoder.reset();
    this._totalSamplesDurationEncoder.reset();
    this._totalPlayoutDelayEncoder.reset();
    this._totalSamplesCountEncoder.reset();
    this._attachmentsEncoder.reset();
  }

  public encode(sample: InputMediaPlayoutStats): MessageInitShape<typeof ClientSample_PeerConnectionSample_MediaPlayoutStatsSchema> {
    this._visited = true;

    return {
      timestamp: this._timestampEncoder.encode(sample.timestamp),
      id: sample.id,
      kind: this._kindEncoder.encode(sample.kind),
      synthesizedSamplesDuration: this._synthesizedSamplesDurationEncoder.encode(sample.synthesizedSamplesDuration),
      synthesizedSamplesEvents: this._synthesizedSamplesEventsEncoder.encode(sample.synthesizedSamplesEvents),
      totalSamplesDuration: this._totalSamplesDurationEncoder.encode(sample.totalSamplesDuration),
      totalPlayoutDelay: this._totalPlayoutDelayEncoder.encode(sample.totalPlayoutDelay),
      totalSamplesCount: this._totalSamplesCountEncoder.encode(sample.totalSamplesCount),
      attachments: this._attachmentsEncoder.encode(sample.attachments),
    };
  }
}