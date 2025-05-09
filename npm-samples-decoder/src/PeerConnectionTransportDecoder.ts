import { Decoder } from "./utils";
import { PeerConnectionTransportStats as OutputPeerConnectionTransportStats } from "./OutputSamples";
import {
  NumberToNumberDecoder,
  StringToStringDecoder,
  AttachmentDecoder,
} from "./utils";
import { ClientSample_PeerConnectionSample_PeerConnectionTransportStats as InputPeerConnectionTransportStats } from "./InputSamples";
import { logger } from "./Logger";

export class PeerConnectionTransportDecoder implements Decoder<InputPeerConnectionTransportStats, OutputPeerConnectionTransportStats | undefined> {
	private _visited = false;
	private readonly _idDecoder: StringToStringDecoder;
	private readonly _timestampDecoder: NumberToNumberDecoder;
	private readonly _dataChannelsOpenedDecoder: NumberToNumberDecoder;
	private readonly _dataChannelsClosedDecoder: NumberToNumberDecoder;

	private _actualValue: OutputPeerConnectionTransportStats | undefined = undefined;

	constructor(
		public readonly id: string,
		private readonly _attachmentsDecoder: AttachmentDecoder,
	) {
		this._idDecoder = new StringToStringDecoder();
		this._timestampDecoder = new NumberToNumberDecoder();
		this._dataChannelsOpenedDecoder = new NumberToNumberDecoder();
		this._dataChannelsClosedDecoder = new NumberToNumberDecoder();
	}

	public get visited(): boolean {
		const result = this._visited;
		this._visited = false;
		return result;
	}

	public reset(): void {
		this._idDecoder.reset();
		this._timestampDecoder.reset();
		this._dataChannelsOpenedDecoder.reset();
		this._dataChannelsClosedDecoder.reset();
		this._attachmentsDecoder.reset();
	}

	public decode(input: InputPeerConnectionTransportStats): OutputPeerConnectionTransportStats | undefined {
		this._visited = true;

		const timestamp = this._timestampDecoder.decode(input.timestamp);

		if (!timestamp) {
		logger.warn("Invalid peer connection transport sample: missing timestamp or id");
		return undefined;
		}

		this._actualValue = {
			id: this.id,
			timestamp,
			dataChannelsOpened: this._dataChannelsOpenedDecoder.decode(input.dataChannelsOpened),
			dataChannelsClosed: this._dataChannelsClosedDecoder.decode(input.dataChannelsClosed),
			attachments: this._attachmentsDecoder.decode(input.attachments),
		};

		return this._actualValue;
	}

	public get actualValue(): OutputPeerConnectionTransportStats | undefined {
		return this._actualValue;
	}

	public set actualValue(sample: OutputPeerConnectionTransportStats | undefined) {
        if (!sample) return;
        
		this._actualValue = sample;
		this._visited = true;

		this._timestampDecoder.actualValue = sample.timestamp;
		this._idDecoder.actualValue = sample.id;
		this._dataChannelsOpenedDecoder.actualValue = sample.dataChannelsOpened;
		this._dataChannelsClosedDecoder.actualValue = sample.dataChannelsClosed;
		this._attachmentsDecoder.actualValue = sample.attachments;
	}

}