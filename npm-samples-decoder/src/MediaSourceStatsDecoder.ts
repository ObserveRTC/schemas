import { MediaSourceStat } from "./OutputSamples"
import { Samples_ClientSample_MediaSourceStat, 
	Samples_ClientSample_MediaSourceStat_MediaSourceStatEnum 
} from './InputSamples';

export class MediaSourceStatsDecoder {
	private _kind?: "audio" | "video";
	private _relayedSource?: boolean;
	private _audioLevel?: number;
	private _totalAudioEnergy?: number;
	private _totalSamplesDuration?: number;
	private _echoReturnLoss?: number;
	private _echoReturnLossEnhancement?: number;
	private _droppedSamplesDuration?: number;
	private _droppedSamplesEvents?: number;
	private _totalCaptureDelay?: number;
	private _totalSamplesCaptured?: number;
	private _width?: number;
	private _height?: number;
	private _frames?: number;
	private _framesPerSecond?: number;

	private _visited = false;

	public constructor(
		public readonly trackIdentifier: string
	) {
		// empty
	}

	public get visited(): boolean {
		const result = this._visited;
		this._visited = false;
		return result;
	}

	public decode(sample: Samples_ClientSample_MediaSourceStat): MediaSourceStat {
		this._visited = true;
	
		const result: MediaSourceStat = {
			trackIdentifier: this.trackIdentifier,
			kind: this._decodeKind(sample.kind),
			relayedSource: this._decodeRelayedSource(sample.relayedSource),
			audioLevel: this._decodeAudioLevel(sample.audioLevel),
			totalAudioEnergy: this._decodeTotalAudioEnergy(sample.totalAudioEnergy),
			totalSamplesDuration: this._decodeTotalSamplesDuration(sample.totalSamplesDuration),
			echoReturnLoss: this._decodeEchoReturnLoss(sample.echoReturnLoss),
			echoReturnLossEnhancement: this._decodeEchoReturnLossEnhancement(sample.echoReturnLossEnhancement),
			droppedSamplesDuration: this._decodeDroppedSamplesDuration(sample.droppedSamplesDuration),
			droppedSamplesEvents: this._decodeDroppedSamplesEvents(sample.droppedSamplesEvents),
			totalCaptureDelay: this._decodeTotalCaptureDelay(sample.totalCaptureDelay),
			totalSamplesCaptured: this._decodeTotalSamplesCaptured(sample.totalSamplesCaptured),
			width: this._decodeWidth(sample.width),
			height: this._decodeHeight(sample.height),
			frames: this._decodeFrames(sample.frames),
			framesPerSecond: this._decodeFramesPerSecond(sample.framesPerSecond),
		};
		return result;
	}

	private _decodeKind(kind?: Samples_ClientSample_MediaSourceStat_MediaSourceStatEnum): "audio" | "video" | undefined {
		if (kind === undefined) return this._kind;
		switch (kind) {
			case Samples_ClientSample_MediaSourceStat_MediaSourceStatEnum.AUDIO:
				this._kind = "audio";
				return this._kind;
			case Samples_ClientSample_MediaSourceStat_MediaSourceStatEnum.VIDEO:
				this._kind = "video";
				return this._kind;
		}
	}
	
	private _decodeRelayedSource(relayedSource?: boolean): boolean | undefined {
		if (relayedSource === undefined) return this._relayedSource;
		this._relayedSource = relayedSource;
		return this._relayedSource;
	}
	
	private _decodeWidth(width?: number): number | undefined {
		if (width === undefined) return this._width;
		this._width = width;
		return this._width;
	}
	
	private _decodeHeight(height?: number): number | undefined {
		if (height === undefined) return this._height;
		this._height = height;
		return this._height;
	}
	
	private _decodeFrames(frames?: number): number | undefined {
		if (frames === undefined) return this._frames;
		this._frames = frames;
		return this._frames;
	}
	
	private _decodeFramesPerSecond(framesPerSecond?: number): number | undefined {
		if (framesPerSecond === undefined) return this._framesPerSecond;
		this._framesPerSecond = framesPerSecond;
		return this._framesPerSecond;
	}

	private _decodeAudioLevel(audioLevel?: number): number | undefined {
		if (audioLevel === undefined) return this._audioLevel;
		this._audioLevel = audioLevel;
		return this._audioLevel;
	}
	
	private _decodeTotalAudioEnergy(totalAudioEnergy?: number): number | undefined {
		if (totalAudioEnergy === undefined) return this._totalAudioEnergy;
		this._totalAudioEnergy = totalAudioEnergy;
		return this._totalAudioEnergy;
	}
	
	private _decodeTotalSamplesDuration(totalSamplesDuration?: number): number | undefined {
		if (totalSamplesDuration === undefined) return this._totalSamplesDuration;
		this._totalSamplesDuration = totalSamplesDuration;
		return this._totalSamplesDuration;
	}
	
	private _decodeEchoReturnLoss(echoReturnLoss?: number): number | undefined {
		if (echoReturnLoss === undefined) return this._echoReturnLoss;
		this._echoReturnLoss = echoReturnLoss;
		return this._echoReturnLoss;
	}
	
	private _decodeEchoReturnLossEnhancement(echoReturnLossEnhancement?: number): number | undefined {
		if (echoReturnLossEnhancement === undefined) return this._echoReturnLossEnhancement;
		this._echoReturnLossEnhancement = echoReturnLossEnhancement;
		return this._echoReturnLossEnhancement;
	}
	
	private _decodeDroppedSamplesDuration(droppedSamplesDuration?: number): number | undefined {
		if (droppedSamplesDuration === undefined) return this._droppedSamplesDuration;
		this._droppedSamplesDuration = droppedSamplesDuration;
		return this._droppedSamplesDuration;
	}
	
	private _decodeDroppedSamplesEvents(droppedSamplesEvents?: number): number | undefined {
		if (droppedSamplesEvents === undefined) return this._droppedSamplesEvents;
		this._droppedSamplesEvents = droppedSamplesEvents;
		return this._droppedSamplesEvents;
	}
	
	private _decodeTotalCaptureDelay(totalCaptureDelay?: number): number | undefined {
		if (totalCaptureDelay === undefined) return this._totalCaptureDelay;
		this._totalCaptureDelay = totalCaptureDelay;
		return this._totalCaptureDelay;
	}
	
	private _decodeTotalSamplesCaptured(totalSamplesCaptured?: number): number | undefined {
		if (totalSamplesCaptured === undefined) return this._totalSamplesCaptured;
		this._totalSamplesCaptured = totalSamplesCaptured;
		return this._totalSamplesCaptured;
	}
}
