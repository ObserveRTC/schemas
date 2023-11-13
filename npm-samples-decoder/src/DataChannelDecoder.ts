import { DataChannel } from './OutputSamples';
import { Samples_ClientSample_DataChannel } from './InputSamples';

export class DataChannelDecoder {
	private _dataChannelIdentifier?: number;
	private _label?: string;
	private _protocol?: string;
	private _state?: string;
	private _messageSent?: number;
	private _bytesSent?: number;
	private _messageReceived?: number;
	private _bytesReceived?: number;

	private _visited = false;

	public constructor(
		public readonly peerConnectionId: string,
		public readonly dataChannelIdentifier: number
	) {
	}

	public get visited(): boolean {
		const result = this._visited;
		this._visited = false;
		return result;
	}

	public decode(sample: Samples_ClientSample_DataChannel): DataChannel {
		this._visited = true;
	
		const result: DataChannel = {
			dataChannelIdentifier: this._decodeDataChannelIdentifier(sample.dataChannelIdentifier),
			peerConnectionId: this.peerConnectionId,
			label: this._decodeLabel(sample.label),
			protocol: this._decodeProtocol(sample.protocol),
			state: this._decodeState(sample.state),
			messageSent: this._decodeMessagesSent(sample.messageSent),
			bytesSent: this._decodeBytesSent(sample.bytesSent),
			messageReceived: this._decodeMessagesReceived(sample.messageReceived),
			bytesReceived: this._decodeBytesReceived(sample.bytesReceived),
		};
		return result;
	}

	private _decodeDataChannelIdentifier(dataChannelIdentifier?: number): number | undefined {
		if (dataChannelIdentifier === undefined) return this._dataChannelIdentifier;
		this._dataChannelIdentifier = dataChannelIdentifier;
		return this._dataChannelIdentifier;
	}
	
	private _decodeLabel(label?: string): string | undefined {
		if (!label) return this._label;
		this._label = label;
		return this._label;
	}
	
	private _decodeProtocol(protocol?: string): string | undefined {
		if (!protocol) return this._protocol;
		this._protocol = protocol;
		return this._protocol;
	}
	
	private _decodeState(state?: string): string | undefined {
		if (!state) return this._state;
		this._state = state;
		return this._state;
	}
	
	private _decodeMessagesSent(messagesSent?: number): number | undefined {
		if (messagesSent === undefined) return this._messageSent;
		this._messageSent = Number(messagesSent);
		return this._messageSent;
	}
	
	private _decodeBytesSent(bytesSent?: bigint): number | undefined {
		if (bytesSent === undefined) return this._bytesSent;
		this._bytesSent = Number(bytesSent);
		return this._bytesSent;
	}
	
	private _decodeMessagesReceived(messagesReceived?: number): number | undefined {
		if (messagesReceived === undefined) return this._messageReceived;
		this._messageReceived = messagesReceived;
		return this._messageReceived;
	}
	
	private _decodeBytesReceived(bytesReceived?: bigint): number | undefined {
		if (bytesReceived === undefined) return this._bytesReceived;
		this._bytesReceived = Number(bytesReceived);
		return this._bytesReceived;
	}
}
