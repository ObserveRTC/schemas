import { SfuSctpChannel } from "./OutputSamples";
import { Samples_SfuSample_SfuSctpChannel } from './InputSamples';

export class SfuSctpChannelDecoder {
	private _label?: string;
	private _protocol?: string;
	private _sctpSmoothedRoundTripTime?: number;
	private _sctpCongestionWindow?: number;
	private _sctpReceiverWindow?: number;
	private _sctpMtu?: number;
	private _sctpUnackData?: number;
	private _messageReceived?: number;
	private _messageSent?: number;
	private _bytesReceived?: number;
	private _bytesSent?: number;
	private _visited = false;

	public constructor(
		public readonly transportId: string,
		public readonly streamId: string,
		public readonly channelId: string,
	) {

	}

	public get visited(): boolean {
		const result = this._visited;
		this._visited = false;
		return result;
	}

	public decode(sample: Samples_SfuSample_SfuSctpChannel): SfuSctpChannel  {
		this._visited = true;
	
		const result: SfuSctpChannel = {
			transportId: this.transportId,
			streamId: this.streamId,
			channelId: this.channelId,
			noReport: sample.noReport,
			internal: sample.internal,
			label: this._decodeLabel(sample.label),
			protocol: this._decodeProtocol(sample.protocol),
			sctpSmoothedRoundTripTime: this._decodeSctpSmoothedRoundTripTime(sample.sctpSmoothedRoundTripTime),
			sctpCongestionWindow: this._decodeSctpCongestionWindow(sample.sctpCongestionWindow),
			sctpReceiverWindow: this._decodeSctpReceiverWindow(sample.sctpReceiverWindow),
			sctpMtu: this._decodeSctpMtu(sample.sctpMtu),
			sctpUnackData: this._decodeSctpUnackData(sample.sctpUnackData),
			messageReceived: this._decodeMessageReceived(sample.messageReceived),
			messageSent: this._decodeMessageSent(sample.messageSent),
			bytesReceived: this._decodeBytesReceived(sample.bytesReceived),
			bytesSent: this._decodeBytesSent(sample.bytesSent),
		};
		return result;
	}

	private _decodeLabel(label?: string): string | undefined {
		if (label === undefined) return this._label;
		this._label = label;
		return this._label;
	}

	private _decodeProtocol(protocol?: string): string | undefined {
		if (protocol === undefined) return this._protocol;
		this._protocol = protocol;
		return this._protocol;
	}

	private _decodeSctpSmoothedRoundTripTime(sctpSmoothedRoundTripTime?: number): number | undefined {
		if (sctpSmoothedRoundTripTime === undefined) return this._sctpSmoothedRoundTripTime;
		this._sctpSmoothedRoundTripTime = sctpSmoothedRoundTripTime;
		return this._sctpSmoothedRoundTripTime;
	}

	private _decodeSctpCongestionWindow(sctpCongestionWindow?: number): number | undefined {
		if (sctpCongestionWindow === undefined) return this._sctpCongestionWindow;
		this._sctpCongestionWindow = sctpCongestionWindow;
		return this._sctpCongestionWindow;
	}

	private _decodeSctpReceiverWindow(sctpReceiverWindow?: number): number | undefined {
		if (sctpReceiverWindow === undefined) return this._sctpReceiverWindow;
		this._sctpReceiverWindow = sctpReceiverWindow;
		return this._sctpReceiverWindow;
	}

	private _decodeSctpMtu(sctpMtu?: number): number | undefined {
		if (sctpMtu === undefined) return this._sctpMtu;
		this._sctpMtu = sctpMtu;
		return this._sctpMtu;
	}

	private _decodeSctpUnackData(sctpUnackData?: number): number | undefined {
		if (sctpUnackData === undefined) return this._sctpUnackData;
		this._sctpUnackData = sctpUnackData;
		return this._sctpUnackData;
	}

	private _decodeMessageReceived(messageReceived?: number): number | undefined {
		if (messageReceived === undefined) return this._messageReceived;
		this._messageReceived = messageReceived;
		return this._messageReceived;
	}

	private _decodeMessageSent(messageSent?: number): number | undefined {
		if (messageSent === undefined) return this._messageSent;
		this._messageSent = messageSent;
		return this._messageSent;
	}

	private _decodeBytesReceived(bytesReceived?: bigint): number | undefined {
		if (bytesReceived === undefined) return this._bytesReceived;
		this._bytesReceived = Number(bytesReceived);
		return this._bytesReceived;
	}

	private _decodeBytesSent(bytesSent?: bigint): number | undefined {
		if (bytesSent === undefined) return this._bytesSent;
		this._bytesSent = Number(bytesSent);
		return this._bytesSent;
	}
}
