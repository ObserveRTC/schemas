import { 
	ClientSample, 
	CustomCallEvent, 
	DataChannel, 
	ExtensionStat, 
	IceCandidatePair, 
	InboundAudioTrack, 
	InboundVideoTrack, 
	MediaSourceStat, 
	OutboundAudioTrack, 
	OutboundVideoTrack, 
	PeerConnectionTransport 
} from './OutputSamples';
import { DataChannelDecoder } from "./DataChannelDecoder";
import { byteArrayToUuid } from "./decodingTools";
import { IceCandidatePairDecoder } from "./IceCandidatePairDecoder";
import { InboundAudioTrackDecoder } from "./InboundAudioTrackDecoder";
import { InboundVideoTrackDecoder } from "./InboundVideoTrackDecoder";
import { MediaSourceStatsDecoder } from "./MediaSourceStatsDecoder";
import { OutboundAudioTrackDecoder } from "./OutboundAudioTrackDecoder";
import { OutboundVideoTrackDecoder } from "./OutboundVideoTrackDecoder";
import { PeerConnectionTransportDecoder } from "./PeerConnectionTransportDecoder";
import { Samples_ClientSample_MediaDevice, 
	Samples_ClientSample, 
	Samples_ClientSample_Browser, 
	Samples_ClientSample_Certificate, 
	Samples_ClientSample_CustomCallEvent, 
	Samples_ClientSample_Engine, 
	Samples_ClientSample_ExtensionStat, 
	Samples_ClientSample_IceCandidatePair, 
	Samples_ClientSample_InboundAudioTrack, 
	Samples_ClientSample_InboundVideoTrack, 
	Samples_ClientSample_MediaCodecStats_MediaCodecStatsEnum, 
	Samples_ClientSample_MediaDevice_MediaDeviceEnum, 
	Samples_ClientSample_MediaSourceStat, 
	Samples_ClientSample_OperationSystem, 
	Samples_ClientSample_OutboundAudioTrack,
	Samples_ClientSample_OutboundVideoTrack, 
	Samples_ClientSample_PeerConnectionTransport, 
	Samples_ClientSample_Platform, 
	Samples_ClientSample_DataChannel,
	Samples_ClientSample_IceLocalCandidate_IceLocalCandidateEnum,
	Samples_ClientSample_IceRemoteCandidate_IceRemoteCandidateEnum
} from "./InputSamples";
import { ClientSampleDecodingOptions } from './DecodingOptions';

export class ClientSampleDecoder {
	public readonly options: ClientSampleDecodingOptions = {
		sfuStreamIdIsUuid: false,
		sfuSinkIdIsUuid: false,
	}
	// last item pushed as a result of decoding
	private _timestamp?: number;
	private _callId?: string;
	private _roomId?: string;
	private _userId?: string;
	// private _engine?: ClientSample['engine'];
	// private _platform?: ClientSample['platform'];
	// private _browser?: ClientSample['browser'];
	// private _os?: ClientSample['os'];
	private _mediaDevices: ClientSample['mediaDevices'] = [];
	private _dataChannels = new Map<number, DataChannelDecoder>();
	private _pcTransports = new Map<string, PeerConnectionTransportDecoder>();
	private _iceCandidatePairs = new Map<string, IceCandidatePairDecoder>();
	private _mediaSources = new Map<string, MediaSourceStatsDecoder>();
	// private _codecs: ClientSample['codecs'] = [];
	// private _certificates: ClientSample['certificates'] = [];
	private _inboundAudioTracks = new Map<string, InboundAudioTrackDecoder>();
	private _inboundVideoTracks = new Map<string, InboundVideoTrackDecoder>();
	private _outboundAudioTracks = new Map<string, OutboundAudioTrackDecoder>();
	private _outboundVideoTracks = new Map<string, OutboundVideoTrackDecoder>();
	private _iceLocalCandidates: ClientSample['iceLocalCandidates'] = [];
	private _iceRemoteCandidates: ClientSample['iceRemoteCandidates'] = [];
	private _timeZoneOffsetInHours?: number;
	private _visited = false;

	public get visited() {
		return this._visited;
	}

	public decodeFromBytes(bytes: Uint8Array): ClientSample {
		const sample = Samples_ClientSample.fromBinary(bytes);
		return this.decodeProtobufSample(sample);
	}

	public decodeFromBase64(base64Str: string) {
		const bytes = Buffer.from(base64Str, 'base64');
		const sample = Samples_ClientSample.fromBinary(bytes);
		return this.decodeProtobufSample(sample);
	}

	public decodeProtobufSample(sample: Samples_ClientSample): ClientSample {

		this._visited = true;

		if (sample.timestamp) {
			this._timestamp = Number(sample.timestamp)
		}
		const result: ClientSample = {
			clientId: sample.clientId ? byteArrayToUuid(sample.clientId) : 'undefined',
			timestamp: this._timestamp ?? -1,
			sampleSeq: sample.sampleSeq,
			marker: sample.marker,

			localSDPs: sample.localSDPs,
			userMediaErrors: sample.userMediaErrors,
			iceServers: sample.iceServers,
			mediaConstraints: sample.mediaConstraints,

			callId: this._decodeCallId(sample.callId),
			userId: this._decodeUserId(sample.userId),
			roomId: this._decodeRoomId(sample.roomId),
			browser: this._decodeBrowser(sample.browser),
			engine: this._decodeEngine(sample.engine),
			platform: this._decodePlatform(sample.platform),
			os: this._decodeOs(sample.os),
			mediaDevices: this._decodeMediaDevices(sample.mediaDevices),
			inboundAudioTracks: this._decodeInboundAudioTracks(sample.inboundAudioTracks),
			inboundVideoTracks: this._decodeInboundVideoTracks(sample.inboundVideoTracks),
			outboundAudioTracks: this._decodeOutboundAudioTracks(sample.outboundAudioTracks),
			outboundVideoTracks: this._decodeOutboundVideoTracks(sample.outboundVideoTracks),
			pcTransports: this._decodePeerConnectionTransport(sample.pcTransports),
			mediaSources: this._decodeMediaSourceStats(sample.mediaSources),
			iceCandidatePairs: this._decodeIceCandidatePairs(sample.iceCandidatePairs),
			dataChannels: this._decodeDataChannels(sample.dataChannels),
			iceLocalCandidates: this._decodeIceLocalCandidates(sample.iceLocalCandidates),
			iceRemoteCandidates: this._decodeIceRemoteCandidates(sample.iceRemoteCandidates),

			codecs: this._decodeCodecs(sample.codecs),
			certificates: this._decodeCertificates(sample.certificates),
			extensionStats: this._decodeExtensionStats(sample.extensionStats),
			customCallEvents: this._decodeCustomCallEvents(sample.customCallEvents),

			timeZoneOffsetInHours: this._decodeTimeZoneOffsetInHours(sample.timeZoneOffsetInHours),
		};
		return result;
	}

	private _decodeCallId(callId?: Uint8Array): string | undefined {
		if (!callId) return this._callId;
		this._callId = byteArrayToUuid(callId);
		return this._callId;
	}
	
	private _decodeUserId(userId?: string): string | undefined {
		if (!userId) return this._userId;
		this._userId = userId;
		return this._userId;
	}
	
	private _decodeRoomId(roomId?: string): string | undefined {
		if (!roomId) return this._roomId;
		this._roomId = roomId;
		return this._roomId;
	}

	private _decodeTimeZoneOffsetInHours(timeZoneOffsetInHours?: number): number | undefined {
		if (!timeZoneOffsetInHours) return this._timeZoneOffsetInHours;
		this._timeZoneOffsetInHours = timeZoneOffsetInHours;
		return this._timeZoneOffsetInHours;
	}

	private _decodeBrowser(browser?: Samples_ClientSample_Browser): ClientSample['browser'] | undefined {
		// colliding with the ClientSample
		return browser;
	}
	
	private _decodeEngine(engine?: Samples_ClientSample_Engine): ClientSample['engine'] | undefined {
		// colliding with the ClientSample
		return engine;
	}

	private _decodeMediaDevices(mediaDevices?: Samples_ClientSample_MediaDevice[]): ClientSample['mediaDevices'] | undefined {
		if (!mediaDevices || mediaDevices.length < 1) return this._mediaDevices;
		this._mediaDevices = mediaDevices.map(mediaDevice => {
			const result = {
				id: mediaDevice.id,
				kind: (mediaDevice.kind === Samples_ClientSample_MediaDevice_MediaDeviceEnum.AUDIOINPUT ? "audioinput" :
					mediaDevice.kind === Samples_ClientSample_MediaDevice_MediaDeviceEnum.AUDIOOUTPUT ? "audiooutput" :
					mediaDevice.kind === Samples_ClientSample_MediaDevice_MediaDeviceEnum.VIDEOINPUT ? "videoinput" :
					undefined) as ("audioinput" | "audiooutput" | "videoinput" | undefined),
				label: mediaDevice.label,
			}
			return result;
		});
		return this._mediaDevices;
	}

	private _decodePlatform(platform?: Samples_ClientSample_Platform): ClientSample['platform'] | undefined {
		// colliding with the ClientSample
		return platform;
	}

	private _decodeOs(os?: Samples_ClientSample_OperationSystem): ClientSample['os'] | undefined {
		// colliding with the ClientSample
		return os;
	}


	private _decodeCodecs(codecs?: Samples_ClientSample['codecs']): ClientSample['codecs'] | undefined {
		if (!codecs || codecs.length < 1) return undefined;
		return codecs.map(codec => {
			const result = {
				channels: codec.channels,
				clockRate: codec.clockRate,
				codecType: (codec.codecType === Samples_ClientSample_MediaCodecStats_MediaCodecStatsEnum.ENCODE  ? "encode" : 
						   codec.codecType === Samples_ClientSample_MediaCodecStats_MediaCodecStatsEnum.DECODE  ? "decode" : 
						   undefined) as "encode" | "decode" | undefined,
				mimeType: codec.mimeType,
				payloadType: codec.payloadType,
				sdpFmtpLine: codec.sdpFmtpLine,
			}
			return result;
		});
	}

	private _decodeIceLocalCandidates(iceLocalCandidates?: Samples_ClientSample['iceLocalCandidates']): ClientSample['iceLocalCandidates'] | undefined {
		if (!iceLocalCandidates || iceLocalCandidates.length < 1) return undefined;
		this._iceLocalCandidates = iceLocalCandidates.map(iceLocalCandidate => {
			const result = {
				peerConnectionId: iceLocalCandidate.peerConnectionId ? byteArrayToUuid(iceLocalCandidate.peerConnectionId) : undefined,
				id: iceLocalCandidate.id,
				address: iceLocalCandidate.address,
				port: iceLocalCandidate.port,
				protocol: 	(iceLocalCandidate.protocol === Samples_ClientSample_IceLocalCandidate_IceLocalCandidateEnum.TCP ? "tcp" :
							iceLocalCandidate.protocol === Samples_ClientSample_IceLocalCandidate_IceLocalCandidateEnum.UDP ? "udp" 
							: undefined) as "tcp" | "udp" | undefined,
				candidateType: iceLocalCandidate.candidateType,
				priority: Number(iceLocalCandidate.priority),
				url: iceLocalCandidate.url,
				relayProtocol:  (iceLocalCandidate.protocol === Samples_ClientSample_IceLocalCandidate_IceLocalCandidateEnum.TCP ? "tcp" :
								iceLocalCandidate.protocol === Samples_ClientSample_IceLocalCandidate_IceLocalCandidateEnum.UDP ? "udp" :
								iceLocalCandidate.protocol === Samples_ClientSample_IceLocalCandidate_IceLocalCandidateEnum.TLS ? "tls" :
								undefined) as "tcp" | "udp" | "tls" | undefined ,
			}
			return result;
		});
		return this._iceLocalCandidates;
	}

	private _decodeIceRemoteCandidates(iceRemoteCandidates?: Samples_ClientSample['iceRemoteCandidates']): ClientSample['iceRemoteCandidates'] | undefined {
		if (!iceRemoteCandidates || iceRemoteCandidates.length < 1) return undefined;
		this._iceRemoteCandidates = iceRemoteCandidates.map(iceRemoteCandidate => {
			const result = {
				peerConnectionId: iceRemoteCandidate.peerConnectionId ? byteArrayToUuid(iceRemoteCandidate.peerConnectionId) : undefined,
				id: iceRemoteCandidate.id,
				address: iceRemoteCandidate.address,
				port: iceRemoteCandidate.port,
				protocol: 	(iceRemoteCandidate.protocol === Samples_ClientSample_IceRemoteCandidate_IceRemoteCandidateEnum.TCP ? "tcp" :
							iceRemoteCandidate.protocol === Samples_ClientSample_IceRemoteCandidate_IceRemoteCandidateEnum.UDP ? "udp" 
							: undefined) as "tcp" | "udp" | undefined,
				candidateType: iceRemoteCandidate.candidateType,
				priority: Number(iceRemoteCandidate.priority),
				url: iceRemoteCandidate.url,
				relayProtocol:  (iceRemoteCandidate.protocol === Samples_ClientSample_IceRemoteCandidate_IceRemoteCandidateEnum.TCP ? "tcp" :
								iceRemoteCandidate.protocol === Samples_ClientSample_IceRemoteCandidate_IceRemoteCandidateEnum.UDP ? "udp" :
								iceRemoteCandidate.protocol === Samples_ClientSample_IceRemoteCandidate_IceRemoteCandidateEnum.TLS ? "tls" :
								undefined) as "tcp" | "udp" | "tls" | undefined ,
			}
			return result;
		});
		return this._iceRemoteCandidates;
	}

	private _decodeCertificates(certificates?: Samples_ClientSample_Certificate[]): ClientSample['certificates'] | undefined {
		if (!certificates) return undefined
		return certificates.map(c => {
			return {
				...c
			}
		});
	}

	private _decodeExtensionStats(extensionStats?: Samples_ClientSample_ExtensionStat[]): ExtensionStat[] | undefined {
		if (!extensionStats) return;
		const result: ExtensionStat[] = [];
		for (const stats of extensionStats) {
			if (!stats.type || !stats.payload) continue;
			result.push({
				type: stats.type,
				payload: stats.payload
			})
		}
		return result;
	}

	private _decodeCustomCallEvents(customCallEvents?: Samples_ClientSample_CustomCallEvent[]): CustomCallEvent[] | undefined {
		if (!customCallEvents) return;
		const result: CustomCallEvent[] = [];
		for (const stats of customCallEvents) {
			if (!stats.name) continue;
			result.push({
				name: stats.name,
				value: stats.value,
				peerConnectionId: stats.peerConnectionId !== undefined ? byteArrayToUuid(stats.peerConnectionId) : undefined,
				mediaTrackId: stats.mediaTrackId,
				message: stats.message,
				attachments: stats.attachments,
				timestamp: stats.timestamp !== undefined ? Number(stats.timestamp) : undefined,
			});
		}
		return result;
	}


	private _decodeInboundAudioTracks(samples: Samples_ClientSample_InboundAudioTrack[]): InboundAudioTrack[] {
		const result: InboundAudioTrack[] = [];
		for (const sample of samples) {
			if (!sample.trackId || !sample.ssrc) continue;
			const trackId = byteArrayToUuid(sample.trackId);
			const ssrc = Number(sample.ssrc);
			const key = `${trackId}:${ssrc}`;
			let decoder = this._inboundAudioTracks.get(key);
			if (!decoder) {
				decoder = new InboundAudioTrackDecoder(trackId, ssrc, this.options);
				this._inboundAudioTracks.set(key, decoder);
			}
			const decodedItem = decoder.decode(sample);
			result.push(decodedItem);
		}
		for (const [key, decoder] of Array.from(this._inboundAudioTracks.entries())) {
			if (decoder.visited) continue;
			this._inboundAudioTracks.delete(key);
		}
		return result;
	}

	private _decodeInboundVideoTracks(samples: Samples_ClientSample_InboundVideoTrack[]): InboundVideoTrack[] {
		const result: InboundAudioTrack[] = [];
		for (const sample of samples) {
			if (!sample.trackId || !sample.ssrc) continue;
			const trackId = byteArrayToUuid(sample.trackId);
			const ssrc = Number(sample.ssrc);
			const key = `${trackId}:${ssrc}`;
			let decoder = this._inboundVideoTracks.get(key);
			if (!decoder) {
				decoder = new InboundVideoTrackDecoder(trackId, ssrc, this.options);
				this._inboundVideoTracks.set(key, decoder);
			}
			const decodedItem = decoder.decode(sample);
			result.push(decodedItem);
		}
		for (const [key, decoder] of Array.from(this._inboundVideoTracks.entries())) {
			if (decoder.visited) continue;
			this._inboundVideoTracks.delete(key);
		}
		return result;
	}

	private _decodeOutboundAudioTracks(samples: Samples_ClientSample_OutboundAudioTrack[]): OutboundAudioTrack[] {
		const result: OutboundAudioTrack[] = [];
		for (const sample of samples) {
			if (!sample.trackId || !sample.ssrc) continue;
			const trackId = byteArrayToUuid(sample.trackId);
			const ssrc = Number(sample.ssrc);
			const key = `${trackId}:${ssrc}`;
			let decoder = this._outboundAudioTracks.get(key);
			if (!decoder) {
				decoder = new OutboundAudioTrackDecoder(trackId, ssrc, this.options);
				this._outboundAudioTracks.set(key, decoder);
			}
			const decodedItem = decoder.decode(sample);
			result.push(decodedItem);
		}
		for (const [key, decoder] of Array.from(this._outboundAudioTracks.entries())) {
			if (decoder.visited) continue;
			this._outboundAudioTracks.delete(key);
		}
		return result;
	}

	private _decodeOutboundVideoTracks(samples: Samples_ClientSample_OutboundVideoTrack[]): OutboundVideoTrack[] {
		const result: OutboundAudioTrack[] = [];
		for (const sample of samples) {
			if (!sample.trackId || !sample.ssrc) continue;
			const trackId = byteArrayToUuid(sample.trackId);
			const ssrc = Number(sample.ssrc);
			const key = `${trackId}:${ssrc}`;
			let decoder = this._outboundVideoTracks.get(key);
			if (!decoder) {
				decoder = new OutboundVideoTrackDecoder(trackId, ssrc, this.options);
				this._outboundVideoTracks.set(key, decoder);
			}
			const decodedItem = decoder.decode(sample);
			result.push(decodedItem);
		}
		for (const [key, decoder] of Array.from(this._outboundVideoTracks.entries())) {
			if (decoder.visited) continue;
			this._outboundVideoTracks.delete(key);
		}
		return result;
	}

	private _decodePeerConnectionTransport(samples: Samples_ClientSample_PeerConnectionTransport[]): PeerConnectionTransport[] {
		const result: PeerConnectionTransport[] = [];
		for (const sample of samples) {
			if (!sample.peerConnectionId || !sample.transportId) continue;
			const peerConnectionId = byteArrayToUuid(sample.peerConnectionId);
			const key = `${peerConnectionId}:${sample.transportId}`;
			let decoder = this._pcTransports.get(key);
			if (!decoder) {
				decoder = new PeerConnectionTransportDecoder(peerConnectionId, sample.transportId);
				this._pcTransports.set(key, decoder);
			}
			const decodedItem = decoder.decode(sample);
			result.push(decodedItem);
		}
		for (const [key, decoder] of Array.from(this._pcTransports.entries())) {
			if (decoder.visited) continue;
			this._pcTransports.delete(key);
		}
		return result;
	}

	private _decodeIceCandidatePairs(samples: Samples_ClientSample_IceCandidatePair[]): IceCandidatePair[] {
		const result: IceCandidatePair[] = [];
		for (const sample of samples) {
			if (!sample.candidatePairId) continue;
			let decoder = this._iceCandidatePairs.get(sample.candidatePairId);
			if (!decoder) {
				if (!sample.peerConnectionId) continue;
				const peerConnectionId = byteArrayToUuid(sample.peerConnectionId);
				decoder = new IceCandidatePairDecoder(sample.candidatePairId, peerConnectionId);
				this._iceCandidatePairs.set(sample.candidatePairId, decoder);
			}
			const decodedItem = decoder.decode(sample);
			result.push(decodedItem);
		}
		for (const [key, decoder] of Array.from(this._iceCandidatePairs.entries())) {
			if (decoder.visited) continue;
			this._iceCandidatePairs.delete(key);
		}
		return result;
	}

	private _decodeMediaSourceStats(samples: Samples_ClientSample_MediaSourceStat[]): MediaSourceStat[] {
		const result: MediaSourceStat[] = [];
		for (const sample of samples) {
			if (!sample.trackIdentifier) continue;
			const trackIdentifier = byteArrayToUuid(sample.trackIdentifier);
			let decoder = this._mediaSources.get(trackIdentifier);
			if (!decoder) {
				decoder = new MediaSourceStatsDecoder(trackIdentifier);
				this._mediaSources.set(trackIdentifier, decoder);
			}
			const decodedItem = decoder.decode(sample);
			result.push(decodedItem);
		}
		for (const [key, decoder] of Array.from(this._mediaSources.entries())) {
			if (decoder.visited) continue;
			this._mediaSources.delete(key);
		}
		return result;
	}

	private _decodeDataChannels(samples: Samples_ClientSample_DataChannel[]): DataChannel[] {
		const result: DataChannel[] = [];
		for (const sample of samples) {
			if (sample.dataChannelIdentifier === undefined || !sample.peerConnectionId) continue;
			const peerConnectionId = byteArrayToUuid(sample.peerConnectionId);
			let decoder = this._dataChannels.get(sample.dataChannelIdentifier);
			if (!decoder) {
				decoder = new DataChannelDecoder(peerConnectionId, sample.dataChannelIdentifier);
				this._dataChannels.set(sample.dataChannelIdentifier, decoder);
			}
			const decodedItem = decoder.decode(sample);
			result.push(decodedItem);
		}
		for (const [key, decoder] of Array.from(this._dataChannels.entries())) {
			if (decoder.visited) continue;
			this._dataChannels.delete(key);
		}
		return result;
	}
}
