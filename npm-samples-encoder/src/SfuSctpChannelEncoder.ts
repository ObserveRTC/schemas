import { SfuSctpChannel } from "./InputSamples";
import { uuidToByteArray } from "./encodingTools";
import {  Samples_SfuSample_SfuSctpChannel } from './OutputSamples';
import { SfuSampleEncodingOptions } from "./EncodingOptions";

export class SfuSctpChannelEncoder {
	private _streamId: Uint8Array;
	private _channelId: Uint8Array;
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
		private readonly _options: SfuSampleEncodingOptions,
	) {
		this._streamId = this._options.dataStreamIdIsUuid ? uuidToByteArray(streamId) : uuidToByteArray(streamId);
		this._channelId = this._options.dataChannelIdIsUuid ? uuidToByteArray(channelId) : uuidToByteArray(channelId);
	}

	public get visited(): boolean {
		const result = this._visited;
		this._visited = false;
		return result;
	}

	public encode(sample: SfuSctpChannel): Samples_SfuSample_SfuSctpChannel {
		this._visited = true;
	
		const result = new Samples_SfuSample_SfuSctpChannel({
			transportId: this.transportId,
			streamId: this._streamId,
			channelId: this._channelId,
			noReport: sample.noReport,
			internal: sample.internal,
			label: this._encodeLabel(sample.label),
			protocol: this._encodeProtocol(sample.protocol),
			sctpSmoothedRoundTripTime: this._encodeSctpSmoothedRoundTripTime(sample.sctpSmoothedRoundTripTime),
			sctpCongestionWindow: this._encodeSctpCongestionWindow(sample.sctpCongestionWindow),
			sctpReceiverWindow: this._encodeSctpReceiverWindow(sample.sctpReceiverWindow),
			sctpMtu: this._encodeSctpMtu(sample.sctpMtu),
			sctpUnackData: this._encodeSctpUnackData(sample.sctpUnackData),
			messageReceived: this._encodeMessageReceived(sample.messageReceived),
			messageSent: this._encodeMessageSent(sample.messageSent),
			bytesReceived: this._encodeBytesReceived(sample.bytesReceived),
			bytesSent: this._encodeBytesSent(sample.bytesSent),
		});
		return result;
	}
	
	private _encodeLabel(label?: string): string | undefined {
		if (!label) return;
		if (label === this._label) return;
		this._label = label;
		return this._label;
	}
	
	private _encodeProtocol(protocol?: string): string | undefined {
		if (!protocol) return;
		if (protocol === this._protocol) return;
		this._protocol = protocol;
		return this._protocol;
	}
	
	private _encodeSctpSmoothedRoundTripTime(sctpSmoothedRoundTripTime?: number): number | undefined {
		if (!sctpSmoothedRoundTripTime) return;
		if (sctpSmoothedRoundTripTime === this._sctpSmoothedRoundTripTime) return;
		this._sctpSmoothedRoundTripTime = sctpSmoothedRoundTripTime;
		return this._sctpSmoothedRoundTripTime;
	}
	
	private _encodeSctpCongestionWindow(sctpCongestionWindow?: number): number | undefined {
		if (!sctpCongestionWindow) return;
		if (sctpCongestionWindow === this._sctpCongestionWindow) return;
		this._sctpCongestionWindow = sctpCongestionWindow;
		return this._sctpCongestionWindow;
	}
	
	private _encodeSctpReceiverWindow(sctpReceiverWindow?: number): number | undefined {
		if (!sctpReceiverWindow) return;
		if (sctpReceiverWindow === this._sctpReceiverWindow) return;
		this._sctpReceiverWindow = sctpReceiverWindow;
		return this._sctpReceiverWindow;
	}
	
	private _encodeSctpMtu(sctpMtu?: number): number | undefined {
		if (!sctpMtu) return;
		if (sctpMtu === this._sctpMtu) return;
		this._sctpMtu = sctpMtu;
		return this._sctpMtu;
	}
	
	private _encodeSctpUnackData(sctpUnackData?: number): number | undefined {
		if (!sctpUnackData) return;
		if (sctpUnackData === this._sctpUnackData) return;
		this._sctpUnackData = sctpUnackData;
		return this._sctpUnackData;
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
	
	
}
