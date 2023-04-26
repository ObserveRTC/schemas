import { DataChannel } from "./InputSamples";
import { Samples_ClientSample_DataChannel } from './OutputSamples';

export class DataChannelEncoder {
	private _peerConnectionId?: Uint8Array;
	private _bytesReceived?: number;
	private _bytesSent?: number;
	private _label?: string;
	private _messageReceived?: number;
	private _messageSent?: number;
	private _protocol?: string;
	private _state?: string;

	private _visited = false;

	public constructor(
		public readonly dataChannelIdentifier: number
	) {

	}

	public get visited(): boolean {
		const result = this._visited;
		this._visited = false;
		return result;
	}

	public encode(sample: DataChannel): Samples_ClientSample_DataChannel {
		this._visited = true;

		const result = new Samples_ClientSample_DataChannel({
			dataChannelIdentifier: this.dataChannelIdentifier,
			bytesReceived: this._encodeBytesReceived(sample.bytesReceived),
			bytesSent: this._encodeBytesSent(sample.bytesSent),
			label: this._encodeLabel(sample.label),
			messageReceived: this._encodeMessageReceived(sample.messageReceived),
			messageSent: this._encodeMessageSent(sample.messageSent),
			protocol: this._encodeProtocol(sample.protocol),
			state: this._encodeState(sample.state),
		});
		return result;
	}

	private _encodeBytesReceived(bytesReceived?: number): bigint | undefined {
		if (!bytesReceived) return;
		if (bytesReceived === this._bytesReceived) return;
		this._bytesReceived = bytesReceived;
		return BigInt(this._bytesReceived);
	}
	
	private _encodeBytesSent(bytesSent?: number): bigint | undefined {
		if (!bytesSent) return;
		if (bytesSent === this._bytesSent) return;
		this._bytesSent = bytesSent;
		return BigInt(this._bytesSent);
	}
	
	private _encodeLabel(label?: string): string | undefined {
		if (!label) return;
		if (label === this._label) return;
		this._label = label;
		return this._label;
	}
	
	private _encodeMessageReceived(messageReceived?: number): number | undefined {
		if (!messageReceived) return;
		if (messageReceived === this._messageReceived) return;
		this._messageReceived = messageReceived;
		return this._messageReceived;
	}
	
	private _encodeMessageSent(messageSent?: number): number | undefined {
		if (!messageSent) return;
		if (messageSent === this._messageSent) return;
		this._messageSent = messageSent;
		return this._messageSent;
	}
	
	private _encodeProtocol(protocol?: string): string | undefined {
		if (!protocol) return;
		if (protocol === this._protocol) return;
		this._protocol = protocol;
		return this._protocol;
	}
	
	private _encodeState(state?: string): string | undefined {
		if (!state) return;
		if (state === this._state) return;
		this._state = state;
		return this._state;
	}
}
