import { Decoder } from "./utils";
import { MediaPlayoutStats as OutputMediaPlayoutStats } from "./OutputSamples";
import {
  NumberToNumberDecoder,
  StringToStringDecoder,
  AttachmentDecoder,
} from "./utils";
import { ClientSample_PeerConnectionSample_MediaPlayoutStats as InputMediaPlayoutStats } from "./InputSamples";

const logger = console;

export class MediaPlayoutStatsDecoder implements Decoder<InputMediaPlayoutStats, OutputMediaPlayoutStats | undefined> {
  private _visited = false;
  private readonly _timestampDecoder: NumberToNumberDecoder;
  private readonly _idDecoder: StringToStringDecoder;
  private readonly _kindDecoder: StringToStringDecoder;
  private readonly _synthesizedSamplesDurationDecoder: NumberToNumberDecoder;
  private readonly _synthesizedSamplesEventsDecoder: NumberToNumberDecoder;
  private readonly _totalSamplesDurationDecoder: NumberToNumberDecoder;
  private readonly _totalPlayoutDelayDecoder: NumberToNumberDecoder;
  private readonly _totalSamplesCountDecoder: NumberToNumberDecoder;
  private readonly _attachmentsDecoder: AttachmentDecoder;

  constructor(attachmentsDecoder: AttachmentDecoder) {
    this._timestampDecoder = new NumberToNumberDecoder();
    this._idDecoder = new StringToStringDecoder();
    this._kindDecoder = new StringToStringDecoder();
    this._synthesizedSamplesDurationDecoder = new NumberToNumberDecoder();
    this._synthesizedSamplesEventsDecoder = new NumberToNumberDecoder();
    this._totalSamplesDurationDecoder = new NumberToNumberDecoder();
    this._totalPlayoutDelayDecoder = new NumberToNumberDecoder();
    this._totalSamplesCountDecoder = new NumberToNumberDecoder();
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
    this._synthesizedSamplesDurationDecoder.reset();
    this._synthesizedSamplesEventsDecoder.reset();
    this._totalSamplesDurationDecoder.reset();
    this._totalPlayoutDelayDecoder.reset();
    this._totalSamplesCountDecoder.reset();
    this._attachmentsDecoder.reset();
  }

  public decode(input: InputMediaPlayoutStats): OutputMediaPlayoutStats | undefined {
    this._visited = true;

    const timestamp = this._timestampDecoder.decode(input.timestamp);
    const id = this._idDecoder.decode(input.id);
	const kind = this._kindDecoder.decode(input.kind);

    if (!timestamp || id === undefined || kind === undefined) {
      logger.warn("Invalid media playout stats sample: missing timestamp or id");
      return undefined;
    }

    return {
      timestamp,
      id,
      kind,
      synthesizedSamplesDuration: this._synthesizedSamplesDurationDecoder.decode(input.synthesizedSamplesDuration),
      synthesizedSamplesEvents: this._synthesizedSamplesEventsDecoder.decode(input.synthesizedSamplesEvents),
      totalSamplesDuration: this._totalSamplesDurationDecoder.decode(input.totalSamplesDuration),
      totalPlayoutDelay: this._totalPlayoutDelayDecoder.decode(input.totalPlayoutDelay),
      totalSamplesCount: this._totalSamplesCountDecoder.decode(input.totalSamplesCount),
      attachments: this._attachmentsDecoder.decode(input.attachments),
    };
  }
}