import { MediaSourceStat } from "./InputSamples";
import { stringToBytesArray, uuidToByteArray } from "./encodingTools";
import { Samples_ClientSample_MediaSourceStat, 
	Samples_ClientSample_MediaSourceStat_MediaSourceStatEnum 
} from './OutputSamples';
import { ClientSampleEncodingOptions } from "./EncodingOptions";

export class MediaSourceStatsEncoder {
	private _audioLevel?: number;
	private _droppedSamplesDuration?: number;
	private _droppedSamplesEvents?: number;
	private _echoReturnLoss?: number;
	private _echoReturnLossEnhancement?: number;
	private _frames?: number;
	private _framesPerSecond?: number;
	private _height?: number;
	private _kind?: Samples_ClientSample_MediaSourceStat_MediaSourceStatEnum;
	private _relayedSource?: boolean;
	private _totalAudioEnergy?: number;
	private _totalCaptureDelay?: number;
	private _totalSamplesCaptured?: number;
	private _totalSamplesDuration?: number;
	private _trackIdentifier?: Uint8Array;
	private _width?: number;
	private _visited = false;

	public constructor(
		public readonly trackIdentifier: string,
		private readonly _options: ClientSampleEncodingOptions,
	) {
		this._trackIdentifier = this._options.trackIdIsUuid ? uuidToByteArray(trackIdentifier) : stringToBytesArray(trackIdentifier);
	}

	public get visited(): boolean {
		const result = this._visited;
		this._visited = false;
		return result;
	}

	public encode(sample: MediaSourceStat): Samples_ClientSample_MediaSourceStat {
		this._visited = true;

		const result = new Samples_ClientSample_MediaSourceStat({
			trackIdentifier: this._trackIdentifier,
			kind: this._encodeKind(sample.kind),
			relayedSource: this._encodeRelayedSource(sample.relayedSource),
			audioLevel: this._encodeAudioLevel(sample.audioLevel),
			totalAudioEnergy: this._encodeTotalAudioEnergy(sample.totalAudioEnergy),
			totalSamplesDuration: this._encodeTotalSamplesDuration(sample.totalSamplesDuration),
			echoReturnLoss: this._encodeEchoReturnLoss(sample.echoReturnLoss),
			echoReturnLossEnhancement: this._encodeEchoReturnLossEnhancement(sample.echoReturnLossEnhancement),
			droppedSamplesDuration: this._encodeDroppedSamplesDuration(sample.droppedSamplesDuration),
			droppedSamplesEvents: this._encodeDroppedSamplesEvents(sample.droppedSamplesEvents),
			totalCaptureDelay: this._encodeTotalCaptureDelay(sample.totalCaptureDelay),
			totalSamplesCaptured: this._encodeTotalSamplesCaptured(sample.totalSamplesCaptured),
			width: this._encodeWidth(sample.width),
			height: this._encodeHeight(sample.height),
			frames: this._encodeFrames(sample.frames),
			framesPerSecond: this._encodeFramesPerSecond(sample.framesPerSecond),
		});
		return result;
	}

	private _encodeKind(kind?: MediaSourceStat['kind']): Samples_ClientSample_MediaSourceStat_MediaSourceStatEnum | undefined {
		if (!kind) return;
		if (kind === 'audio' && this._kind !== Samples_ClientSample_MediaSourceStat_MediaSourceStatEnum.AUDIO) {
			this._kind = Samples_ClientSample_MediaSourceStat_MediaSourceStatEnum.AUDIO;
			return this._kind;
		}
		if (kind === 'video' && this._kind !== Samples_ClientSample_MediaSourceStat_MediaSourceStatEnum.VIDEO) {
			this._kind = Samples_ClientSample_MediaSourceStat_MediaSourceStatEnum.VIDEO;
			return this._kind;
		}
	}

	private _encodeRelayedSource(relayedSource?: MediaSourceStat['relayedSource']): boolean | undefined {
		if (!relayedSource) return;
		if (relayedSource === this._relayedSource) return;
		this._relayedSource = relayedSource;
		return this._relayedSource;
	}

	private _encodeAudioLevel(audioLevel?: number): number | undefined {
		if (!audioLevel) return;
		if (audioLevel === this._audioLevel) return;
		this._audioLevel = audioLevel;
		return this._audioLevel;
	}
	
	private _encodeTotalAudioEnergy(totalAudioEnergy?: number): number | undefined {
		if (!totalAudioEnergy) return;
		if (totalAudioEnergy === this._totalAudioEnergy) return;
		this._totalAudioEnergy = totalAudioEnergy;
		return this._totalAudioEnergy;
	}
	
	private _encodeTotalSamplesDuration(totalSamplesDuration?: number): number | undefined {
		if (!totalSamplesDuration) return;
		if (totalSamplesDuration === this._totalSamplesDuration) return;
		this._totalSamplesDuration = totalSamplesDuration;
		return this._totalSamplesDuration;
	}
	
	private _encodeEchoReturnLoss(echoReturnLoss?: number): number | undefined {
		if (!echoReturnLoss) return;
		if (echoReturnLoss === this._echoReturnLoss) return;
		this._echoReturnLoss = echoReturnLoss;
		return this._echoReturnLoss;
	}
	
	private _encodeEchoReturnLossEnhancement(echoReturnLossEnhancement?: number): number | undefined {
		if (!echoReturnLossEnhancement) return;
		if (echoReturnLossEnhancement === this._echoReturnLossEnhancement) return;
		this._echoReturnLossEnhancement = echoReturnLossEnhancement;
		return this._echoReturnLossEnhancement;
	}
	
	private _encodeDroppedSamplesDuration(droppedSamplesDuration?: number): number | undefined {
		if (!droppedSamplesDuration) return;
		if (droppedSamplesDuration === this._droppedSamplesDuration) return;
		this._droppedSamplesDuration = droppedSamplesDuration;
		return this._droppedSamplesDuration;
	}
	
	private _encodeDroppedSamplesEvents(droppedSamplesEvents?: number): number | undefined {
		if (!droppedSamplesEvents) return;
		if (droppedSamplesEvents === this._droppedSamplesEvents) return;
		this._droppedSamplesEvents = droppedSamplesEvents;
		return this._droppedSamplesEvents;
	}
	
	private _encodeTotalCaptureDelay(totalCaptureDelay?: number): number | undefined {
		if (!totalCaptureDelay) return;
		if (totalCaptureDelay === this._totalCaptureDelay) return;
		this._totalCaptureDelay = totalCaptureDelay;
		return this._totalCaptureDelay;
	}
	
	private _encodeTotalSamplesCaptured(totalSamplesCaptured?: number): number | undefined {
		if (!totalSamplesCaptured) return;
		if (totalSamplesCaptured === this._totalSamplesCaptured) return;
		this._totalSamplesCaptured = totalSamplesCaptured;
		return this._totalSamplesCaptured;
	}
	
	private _encodeWidth(width?: number): number | undefined {
		if (!width) return;
		if (width === this._width) return;
		this._width = width;
		return this._width;
	}
	
	private _encodeHeight(height?: number): number | undefined {
		if (!height) return;
		if (height === this._height) return;
		this._height = height;
		return this._height;
	}
	
	private _encodeFrames(frames?: number): number | undefined {
		if (!frames) return;
		if (frames === this._frames) return;
		this._frames = frames;
		return this._frames;
	}
	
	private _encodeFramesPerSecond(framesPerSecond?: number): number | undefined {
		if (!framesPerSecond) return;
		if (framesPerSecond === this._framesPerSecond) return;
		this._framesPerSecond = framesPerSecond;
		return this._framesPerSecond;
	}
}
