import { CustomSfuEvent, SfuExtensionStats, SfuSample } from "./OutputSamples";
import { 
	Samples_SfuSample_CustomSfuEvent, 
	Samples_SfuSample_SfuExtensionStats,
	Samples_SfuSample,
	Samples_SfuSample_SfuInboundRtpPad,
	Samples_SfuSample_SfuOutboundRtpPad,
	Samples_SfuSample_SfuTransport,
	Samples_SfuSample_SfuSctpChannel
} from './InputSamples';
import { SfuTransportDecoder } from "./SfuTransportDecoder";
import { SfuInboundRtpPadDecoder } from "./SfuInboundRtpPadDecoder";
import { SfuOutboundRtpPadDecoder } from "./SfuOutboundRtpPadDecoder";
import { SfuSctpChannelDecoder } from "./SfuSctpChannelDecoder";
import { byteArrayToUuid, bytesArrayToString } from "./decodingTools";
import { SfuSampleDecodingOptions } from "./DecodingOptions";

export class SfuSampleDecoder {
	public readonly options: SfuSampleDecodingOptions;
	private _timeZoneOffsetInHours?: number;

	private _transports = new Map<string, SfuTransportDecoder>();
	private _inboundRtpPads = new Map<string, SfuInboundRtpPadDecoder>();
	private _outboundRtpPads = new Map<string, SfuOutboundRtpPadDecoder>();
	private _sctpChannels = new Map<string, SfuSctpChannelDecoder>();
	private _visited = false;

	public constructor(options?: Partial<SfuSampleDecodingOptions>) {
		this.options = Object.assign({
			callIdIsUuid: false,
			clientIdIsUuid: false,
			trackIdIsUuid: false,
			sfuIdIsUuid: false,
			sfuStreamIdIsUuid: false,
			sfuSinkIdIsUuid: false,
			sfuPadIdIsUuid: false,
			dataChannelIdIsUuid: false,
			dataStreamIdIsUuid: false,
		}, options ?? {});
	}

	public get visited(): boolean {
		const result = this._visited;
		this._visited = false;
		return result;
	}

	public decodeFromBytes(bytes: Uint8Array): SfuSample {
		const sample = Samples_SfuSample.fromBinary(bytes);
		return this.decodeProtobufSample(sample);
	}

	public decodeFromBase64(base64Str: string): SfuSample {
		const bytes = Buffer.from(base64Str, 'base64');
		const sample = Samples_SfuSample.fromBinary(bytes);
		return this.decodeProtobufSample(sample);
	}

	public decodeProtobufSample(sfuSample: Samples_SfuSample): SfuSample {
		
		this._visited = true;
		const sfuId = sfuSample.sfuId ? this.options.sfuIdIsUuid ?  byteArrayToUuid(sfuSample.sfuId) : bytesArrayToString(sfuSample.sfuId) : 'no-id';
		const result: SfuSample = {
			sfuId,
			timestamp: Number(sfuSample.timestamp),
			marker: sfuSample.marker,

			timeZoneOffsetInHours: this._decodeTimeZoneOffsetInHours(sfuSample.timeZoneOffsetInHours),
			transports: this._decodeSfuTransports(sfuSample.transports),
			inboundRtpPads: this._decodeSfuInboundRtpPads(sfuSample.inboundRtpPads),
			outboundRtpPads: this._decodeSfuOutboundRtpPads(sfuSample.outboundRtpPads),
			sctpChannels: this._decodeSfuSctpChannels(sfuSample.sctpChannels),
			extensionStats: this._decodeExtensionStats(sfuSample.extensionStats),
			customSfuEvents: this._decodeCustomSfuEvents(sfuSample.customSfuEvents),

		};
		
		return result;
	}


	private _decodeTimeZoneOffsetInHours(timeZoneOffsetInHours?: number): number | undefined {
		if (!timeZoneOffsetInHours) return this._timeZoneOffsetInHours;
		this._timeZoneOffsetInHours = timeZoneOffsetInHours;
		return this._timeZoneOffsetInHours;
	}


	private _decodeExtensionStats(extensionStats?: Samples_SfuSample_SfuExtensionStats[]): SfuExtensionStats[] | undefined {
		if (!extensionStats) return [];
		const result: SfuExtensionStats[] = [];
		for (const stats of extensionStats) {
			if (!stats.type || !stats.payload) continue;
			result.push({
				type: stats.type,
				payload: stats.payload
			})
		}
		return result;
	}

	private _decodeCustomSfuEvents(customSfuEvents?: Samples_SfuSample_CustomSfuEvent[]): CustomSfuEvent[] | undefined {
		if (!customSfuEvents) return;
		const result: CustomSfuEvent[] = [];
		for (const stats of customSfuEvents) {
			if (!stats.name) continue;
			result.push({
				name: stats.name,
				value: stats.value,
				sfuStreamId: stats.sfuStreamId !== undefined ? this.options.sfuStreamIdIsUuid ? byteArrayToUuid(stats.sfuStreamId) : bytesArrayToString(stats.sfuStreamId): undefined,
				sfuSinkId:  stats.sfuSinkId !== undefined ? this.options.sfuSinkIdIsUuid ? byteArrayToUuid(stats.sfuSinkId) : bytesArrayToString(stats.sfuSinkId) : undefined,
				message: stats.message,
				attachments: stats.attachments,
				timestamp: stats.timestamp !== undefined ? Number(stats.timestamp) : undefined,
			});
		}
		return result;
	}


	private _decodeSfuInboundRtpPads(
		inboundRtpPads?: Samples_SfuSample_SfuInboundRtpPad[] 
	): SfuSample['inboundRtpPads'] {
		const result: SfuSample['inboundRtpPads'] = [];
		for (const sample of (inboundRtpPads ?? [])) {
			if (!sample.padId || !sample.transportId || !sample.streamId || !sample.ssrc) continue;
			const streamId = this.options.sfuStreamIdIsUuid ? byteArrayToUuid(sample.streamId) : bytesArrayToString(sample.streamId);
			const padId = this.options.sfuPadIdIsUuid ?  byteArrayToUuid(sample.padId) : bytesArrayToString(sample.padId);
			let decoder = this._inboundRtpPads.get(padId);
			if (!decoder) {
				decoder = new SfuInboundRtpPadDecoder(
					sample.transportId,
					streamId,
					padId,
					Number(sample.ssrc)
				);
				this._inboundRtpPads.set(padId, decoder);
			}
			const decodedSample = decoder.decode(sample);
			result.push(decodedSample);
		}

		for (const [key, decoder] of Array.from(this._inboundRtpPads.entries())) {
			if (!decoder.visited) {
				this._inboundRtpPads.delete(key);
			}
		}
		
		return result;
	}


	private _decodeSfuOutboundRtpPads(
		outboundRtpPads?: Samples_SfuSample_SfuOutboundRtpPad[] 
	): SfuSample['outboundRtpPads'] {
		const result: SfuSample['outboundRtpPads'] = [];
		for (const sample of (outboundRtpPads ?? [])) {
			if (!sample.padId || !sample.transportId || !sample.streamId || !sample.sinkId || !sample.ssrc) continue;
			const sinkId = this.options.sfuSinkIdIsUuid ? byteArrayToUuid(sample.sinkId) : bytesArrayToString(sample.sinkId);
			const streamId = this.options.sfuStreamIdIsUuid ? byteArrayToUuid(sample.streamId) : bytesArrayToString(sample.streamId);
			const padId = this.options.sfuPadIdIsUuid ?  byteArrayToUuid(sample.padId) : bytesArrayToString(sample.padId);
			let decoder = this._outboundRtpPads.get(padId);
			if (!decoder) {
				decoder = new SfuOutboundRtpPadDecoder(
					sample.transportId,
					streamId,
					sinkId,
					padId,
					Number(sample.ssrc),
					this.options,
				);
				this._outboundRtpPads.set(padId, decoder);
			}
			const decodedSample = decoder.decode(sample);
			result.push(decodedSample);
		}

		for (const [key, decoder] of Array.from(this._outboundRtpPads.entries())) {
			if (!decoder.visited) {
				this._outboundRtpPads.delete(key);
			}
		}
		
		return result;
	}


	private _decodeSfuTransports(
		transports?: Samples_SfuSample_SfuTransport[] 
	): SfuSample['transports'] {
		const result: SfuSample['transports'] = [];
		for (const sample of (transports ?? [])) {
			if (!sample.transportId) continue;
			let decoder = this._transports.get(sample.transportId);
			if (!decoder) {
				decoder = new SfuTransportDecoder(
					sample.transportId,
				);
				this._transports.set(sample.transportId, decoder);
			}
			const decodedSample = decoder.decode(sample);
			result.push(decodedSample);
		}

		for (const [key, decoder] of Array.from(this._transports.entries())) {
			if (!decoder.visited) {
				this._transports.delete(key);
			}
		}
		
		return result;
	}


	private _decodeSfuSctpChannels(
		sctpChannels?: Samples_SfuSample_SfuSctpChannel[] 
	): SfuSample['sctpChannels'] {
		const result: SfuSample['sctpChannels'] = [];
		for (const sample of (sctpChannels ?? [])) {
			if (!sample.channelId || !sample.transportId || !sample.streamId) continue;
			const channelId = this.options.dataChannelIdIsUuid ? byteArrayToUuid(sample.channelId) : bytesArrayToString(sample.channelId);
			const streamId =  this.options.dataStreamIdIsUuid ? byteArrayToUuid(sample.streamId) : bytesArrayToString(sample.streamId);
			let decoder = this._sctpChannels.get(channelId);
			if (!decoder) {
				decoder = new SfuSctpChannelDecoder(
					sample.transportId,
					streamId,
					channelId,
				);
				this._sctpChannels.set(channelId, decoder);
			}
			const decodedSample = decoder.decode(sample);
			result.push(decodedSample);
		}

		for (const [key, decoder] of Array.from(this._sctpChannels.entries())) {
			if (!decoder.visited) {
				this._sctpChannels.delete(key);
			}
		}
		
		return result;
	}

}
