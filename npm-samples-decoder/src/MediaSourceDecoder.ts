import { Decoder, Uint8ArrayToStringDecoder } from "./utils";
import { MediaSourceStats as OutputMediaSourceStats } from "./OutputSamples";
import {
  NumberToNumberDecoder,
  StringToStringDecoder,
  AttachmentDecoder,
} from "./utils";
import { ClientSample_PeerConnectionSample_MediaSourceStats as InputMediaSourceStats } from "./InputSamples";
import { logger } from "./Logger";

export class MediaSourceStatsDecoder implements Decoder<InputMediaSourceStats, OutputMediaSourceStats | undefined> {
	private _visited = false;
	private readonly _timestampDecoder: NumberToNumberDecoder;
	private readonly _idDecoder: StringToStringDecoder;
	private readonly _kindDecoder: StringToStringDecoder;
	private readonly _trackIdentifierDecoder: Uint8ArrayToStringDecoder;
	private readonly _audioLevelDecoder: NumberToNumberDecoder;
	private readonly _totalAudioEnergyDecoder: NumberToNumberDecoder;
	private readonly _totalSamplesDurationDecoder: NumberToNumberDecoder;
	private readonly _echoReturnLossDecoder: NumberToNumberDecoder;
	private readonly _echoReturnLossEnhancementDecoder: NumberToNumberDecoder;
	private readonly _widthDecoder: NumberToNumberDecoder;
	private readonly _heightDecoder: NumberToNumberDecoder;
	private readonly _framesDecoder: NumberToNumberDecoder;
	private readonly _framesPerSecondDecoder: NumberToNumberDecoder;

	private _actualValue: OutputMediaSourceStats | undefined = undefined;

	constructor(
		public readonly id: string,
		private readonly _attachmentsDecoder: AttachmentDecoder,
	) {
		this._timestampDecoder = new NumberToNumberDecoder();
		this._idDecoder = new StringToStringDecoder();
		this._kindDecoder = new StringToStringDecoder();
		this._trackIdentifierDecoder = new Uint8ArrayToStringDecoder();
		this._audioLevelDecoder = new NumberToNumberDecoder();
		this._totalAudioEnergyDecoder = new NumberToNumberDecoder();
		this._totalSamplesDurationDecoder = new NumberToNumberDecoder();
		this._echoReturnLossDecoder = new NumberToNumberDecoder();
		this._echoReturnLossEnhancementDecoder = new NumberToNumberDecoder();
		this._widthDecoder = new NumberToNumberDecoder();
		this._heightDecoder = new NumberToNumberDecoder();
		this._framesDecoder = new NumberToNumberDecoder();
		this._framesPerSecondDecoder = new NumberToNumberDecoder();
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
		this._trackIdentifierDecoder.reset();
		this._audioLevelDecoder.reset();
		this._totalAudioEnergyDecoder.reset();
		this._totalSamplesDurationDecoder.reset();
		this._echoReturnLossDecoder.reset();
		this._echoReturnLossEnhancementDecoder.reset();
		this._widthDecoder.reset();
		this._heightDecoder.reset();
		this._framesDecoder.reset();
		this._framesPerSecondDecoder.reset();
		this._attachmentsDecoder.reset();
	}

	public decode(input: InputMediaSourceStats): OutputMediaSourceStats | undefined {
		this._visited = true;

		const timestamp = this._timestampDecoder.decode(input.timestamp);
		const id = this._idDecoder.decode(input.id);
		const kind = this._kindDecoder.decode(input.kind);

		if (!timestamp || id === undefined || kind === undefined) {
		logger.warn("Invalid media source stats sample: missing timestamp or id");
		return undefined;
		}

		this._actualValue = {
			timestamp,
			id,
			kind,
			trackIdentifier: this._trackIdentifierDecoder.decode(input.trackIdentifier),
			audioLevel: this._audioLevelDecoder.decode(input.audioLevel),
			totalAudioEnergy: this._totalAudioEnergyDecoder.decode(input.totalAudioEnergy),
			totalSamplesDuration: this._totalSamplesDurationDecoder.decode(input.totalSamplesDuration),
			echoReturnLoss: this._echoReturnLossDecoder.decode(input.echoReturnLoss),
			echoReturnLossEnhancement: this._echoReturnLossEnhancementDecoder.decode(input.echoReturnLossEnhancement),
			width: this._widthDecoder.decode(input.width),
			height: this._heightDecoder.decode(input.height),
			frames: this._framesDecoder.decode(input.frames),
			framesPerSecond: this._framesPerSecondDecoder.decode(input.framesPerSecond),
			attachments: this._attachmentsDecoder.decode(input.attachments),
		};

		return this._actualValue;
	}

	public get actualValue(): OutputMediaSourceStats | undefined {
		return this._actualValue;
	}

	public set actualValue(sample: OutputMediaSourceStats | undefined) {
        if (!sample) return;
        
		this._visited = true;
		this._actualValue = sample;

		this._timestampDecoder.actualValue = sample.timestamp;
		this._idDecoder.actualValue = sample.id;
		this._kindDecoder.actualValue = sample.kind;
		this._trackIdentifierDecoder.actualValue = sample.trackIdentifier;
		this._audioLevelDecoder.actualValue = sample.audioLevel;
		this._totalAudioEnergyDecoder.actualValue = sample.totalAudioEnergy;
		this._totalSamplesDurationDecoder.actualValue = sample.totalSamplesDuration;
		this._echoReturnLossDecoder.actualValue = sample.echoReturnLoss;
		this._echoReturnLossEnhancementDecoder.actualValue = sample.echoReturnLossEnhancement;
		this._widthDecoder.actualValue = sample.width;
		this._heightDecoder.actualValue = sample.height;
		this._framesDecoder.actualValue = sample.frames;
		this._framesPerSecondDecoder.actualValue = sample.framesPerSecond;
		this._attachmentsDecoder.actualValue = sample.attachments;
	}
}