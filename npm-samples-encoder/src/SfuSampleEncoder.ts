import { SfuSample } from "./InputSamples";
import { convertUint8ToBase64, uuidToByteArray } from "./encodingTools";
import { 
	Samples_SfuSample_CustomSfuEvent, 
	Samples_SfuSample_SfuExtensionStats,
	Samples_SfuSample,
	Samples_SfuSample_SfuInboundRtpPad,
	Samples_SfuSample_SfuOutboundRtpPad,
	Samples_SfuSample_SfuTransport,
	Samples_SfuSample_SfuSctpChannel
} from './OutputSamples';
import { SfuTransportEncoder } from "./SfuTransportEncoder";
import { SfuInboundRtpPadEncoder } from "./SfuInboundRtpPadEncoder";
import { SfuOutboundRtpPadEncoder } from "./SfuOutboundRtpPadEncoder";
import { SfuSctpChannelEncoder } from "./SfuSctpChannelEncoder";

export class SfuSampleEncoder {

	private _timeZoneOffsetInHours?: number;

	private _transports = new Map<string, SfuTransportEncoder>();
	private _inboundRtpPads = new Map<string, SfuInboundRtpPadEncoder>();
	private _outboundRtpPads = new Map<string, SfuOutboundRtpPadEncoder>();
	private _sctpChannels = new Map<string, SfuSctpChannelEncoder>();
	private _visited = false;

	public get visited(): boolean {
		const result = this._visited;
		this._visited = false;
		return result;
	}

	public encodeToUint8Array(sfuSample: SfuSample): Uint8Array {
		return this.encodeToProtobufSamples(sfuSample).toBinary()
	}

	public encodeToBase64(sfuSample: SfuSample): string {
		const bytes = this.encodeToProtobufSamples(sfuSample).toBinary();
		return convertUint8ToBase64(bytes);
	}

	public encodeToProtobufSamples(sfuSample: SfuSample): Samples_SfuSample {
		
		this._visited = true;

		const result = new Samples_SfuSample({
			sfuId: sfuSample.sfuId ? uuidToByteArray(sfuSample.sfuId) : undefined,
			timestamp: BigInt(sfuSample.timestamp),
			marker: sfuSample.marker,

			timeZoneOffsetInHours: this._encodeTimeZoneOffsetInHours(sfuSample.timeZoneOffsetInHours),
			transports: this._encodeSfuTransports(sfuSample.transports),
			inboundRtpPads: this._encodeSfuInboundRtpPads(sfuSample.inboundRtpPads),
			outboundRtpPads: this._encodeSfuOutboundRtpPads(sfuSample.outboundRtpPads),
			sctpChannels: this._encodeSfuSctpChannels(sfuSample.sctpChannels),
			extensionStats: this._encodeExtensionStats(sfuSample.extensionStats),
			customSfuEvents: this._encodeCustomSfuEvents(sfuSample.customSfuEvents),

		});
		
		return result;
	}


	private _encodeTimeZoneOffsetInHours(
		timeZoneOffsetInHours?: number,
	): number | undefined {
		if (!timeZoneOffsetInHours) return;
		if (this._timeZoneOffsetInHours === timeZoneOffsetInHours) return;
		this._timeZoneOffsetInHours = timeZoneOffsetInHours;
		return timeZoneOffsetInHours;
	}

	private _encodeExtensionStats(
		extensionStats?: SfuSample['extensionStats'], 
	): Samples_SfuSample_SfuExtensionStats[] {
		if (!extensionStats) return [];
		return extensionStats.map(extensionStats => new Samples_SfuSample_SfuExtensionStats({
			...extensionStats
		}));
	}

	private _encodeCustomSfuEvents(
		customSfuEvents?: SfuSample['customSfuEvents'], 
	): Samples_SfuSample_CustomSfuEvent[] {
		if (!customSfuEvents) return [];
		return customSfuEvents.map(customSfuEvent => new Samples_SfuSample_CustomSfuEvent({
			...customSfuEvent,
			sfuSinkId: customSfuEvent.sfuSinkId ? uuidToByteArray(customSfuEvent.sfuSinkId) : undefined,
			sfuStreamId: customSfuEvent.sfuStreamId ? uuidToByteArray(customSfuEvent.sfuStreamId) : undefined,
			timestamp: customSfuEvent.timestamp ? BigInt(customSfuEvent.timestamp) : undefined,
		}));
	}


	private _encodeSfuInboundRtpPads(
		inboundRtpPads?: SfuSample['inboundRtpPads']
	): Samples_SfuSample_SfuInboundRtpPad[] {
		const result: Samples_SfuSample_SfuInboundRtpPad[] = [];
		for (const sample of (inboundRtpPads ?? [])) {
			if (!sample.padId || !sample.transportId || !sample.streamId || !sample.ssrc) continue;
			let encoder = this._inboundRtpPads.get(sample.padId);
			if (!encoder) {
				encoder = new SfuInboundRtpPadEncoder(
					sample.transportId,
					sample.streamId,
					sample.padId,
					sample.ssrc
				);
				this._inboundRtpPads.set(sample.padId, encoder);
			}
			const encodedSample = encoder.encode(sample);
			result.push(encodedSample);
		}

		for (const encoder of Array.from(this._inboundRtpPads.values())) {
			if (!encoder.visited) {
				this._inboundRtpPads.delete(encoder.padId);
			}
		}
		
		return result;
	}

	private _encodeSfuOutboundRtpPads(
		outboundRtpPads?: SfuSample['outboundRtpPads']
	): Samples_SfuSample_SfuOutboundRtpPad[] {
		const result: Samples_SfuSample_SfuOutboundRtpPad[] = [];
		for (const sample of (outboundRtpPads ?? [])) {
			if (!sample.padId || !sample.transportId || !sample.streamId || !sample.ssrc || !sample.sinkId) continue;
			let encoder = this._outboundRtpPads.get(sample.padId);
			if (!encoder) {
				encoder = new SfuOutboundRtpPadEncoder(
					sample.transportId,
					sample.streamId,
					sample.sinkId,
					sample.padId,
					sample.ssrc
				);
				this._outboundRtpPads.set(sample.padId, encoder);
			}
			const encodedSample = encoder.encode(sample);
			result.push(encodedSample);
		}

		for (const encoder of Array.from(this._outboundRtpPads.values())) {
			if (!encoder.visited) {
				this._outboundRtpPads.delete(encoder.padId);
			}
		}
		
		return result;
	}

	private _encodeSfuTransports(
		transports?: SfuSample['transports']
	): Samples_SfuSample_SfuTransport[] {
		const result: Samples_SfuSample_SfuTransport[] = [];
		for (const sample of (transports ?? [])) {
			if (!sample.transportId) continue;
			let encoder = this._transports.get(sample.transportId);
			if (!encoder) {
				encoder = new SfuTransportEncoder(
					sample.transportId,
				);
				this._transports.set(sample.transportId, encoder);
			}
			const encodedSample = encoder.encode(sample);
			result.push(encodedSample);
		}

		for (const encoder of Array.from(this._transports.values())) {
			if (!encoder.visited) {
				this._transports.delete(encoder.transportId);
			}
		}
		
		return result;
	}

	private _encodeSfuSctpChannels(
		sctpChannels?: SfuSample['sctpChannels']
	): Samples_SfuSample_SfuSctpChannel[] {
		const result: Samples_SfuSample_SfuSctpChannel[] = [];
		for (const sample of (sctpChannels ?? [])) {
			if (!sample.transportId || !sample.channelId) continue;
			let encoder = this._sctpChannels.get(sample.channelId);
			if (!encoder) {
				encoder = new SfuSctpChannelEncoder(
					sample.transportId,
					sample.streamId,
					sample.channelId,
				);
				this._sctpChannels.set(sample.channelId, encoder);
			}
			const encodedSample = encoder.encode(sample);
			result.push(encodedSample);
		}

		for (const encoder of Array.from(this._sctpChannels.values())) {
			if (!encoder.visited) {
				this._transports.delete(encoder.channelId);
			}
		}
		
		return result;
	}
}
