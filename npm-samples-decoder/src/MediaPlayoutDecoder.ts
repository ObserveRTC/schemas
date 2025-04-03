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

	private _actualValue: OutputMediaPlayoutStats | undefined = undefined;

	constructor(
		public readonly id: string,
		private readonly _attachmentsDecoder: AttachmentDecoder,
	) {
		this._timestampDecoder = new NumberToNumberDecoder();
		this._idDecoder = new StringToStringDecoder();
		this._kindDecoder = new StringToStringDecoder();
		this._synthesizedSamplesDurationDecoder = new NumberToNumberDecoder();
		this._synthesizedSamplesEventsDecoder = new NumberToNumberDecoder();
		this._totalSamplesDurationDecoder = new NumberToNumberDecoder();
		this._totalPlayoutDelayDecoder = new NumberToNumberDecoder();
		this._totalSamplesCountDecoder = new NumberToNumberDecoder();
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
		const kind = this._kindDecoder.decode(input.kind);

		if (!timestamp || kind === undefined) {
			logger.warn("Invalid media playout stats sample: missing timestamp or id");
			return undefined;
		}

		this._actualValue = {
			timestamp,
			id: this.id,
			kind,
			synthesizedSamplesDuration: this._synthesizedSamplesDurationDecoder.decode(input.synthesizedSamplesDuration),
			synthesizedSamplesEvents: this._synthesizedSamplesEventsDecoder.decode(input.synthesizedSamplesEvents),
			totalSamplesDuration: this._totalSamplesDurationDecoder.decode(input.totalSamplesDuration),
			totalPlayoutDelay: this._totalPlayoutDelayDecoder.decode(input.totalPlayoutDelay),
			totalSamplesCount: this._totalSamplesCountDecoder.decode(input.totalSamplesCount),
			attachments: this._attachmentsDecoder.decode(input.attachments),
		};

		return this._actualValue;
	}

	public get actualValue(): OutputMediaPlayoutStats | undefined {
		return this._actualValue;
	}

	public set actualValue(sample: OutputMediaPlayoutStats | undefined) {
        if (!sample) return;
        
		this._visited = true;
		this._actualValue = sample;

		this._timestampDecoder.actualValue = sample.timestamp;
		this._idDecoder.actualValue = sample.id;
		this._kindDecoder.actualValue = sample.kind;
		this._synthesizedSamplesDurationDecoder.actualValue = sample.synthesizedSamplesDuration;
		this._synthesizedSamplesEventsDecoder.actualValue = sample.synthesizedSamplesEvents;
		this._totalSamplesDurationDecoder.actualValue = sample.totalSamplesDuration;
		this._totalPlayoutDelayDecoder.actualValue = sample.totalPlayoutDelay;
		this._totalSamplesCountDecoder.actualValue = sample.totalSamplesCount;
		this._attachmentsDecoder.actualValue = sample.attachments;
	}

}