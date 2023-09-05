import { ClientSample, IceLocalCandidate, IceRemoteCandidate, MediaDevice } from "./InputSamples";
import { DataChannelEncoder } from "./DataChannelEncoder";
import { convertUint8ToBase64, uuidToByteArray } from "./encodingTools";
import { IceCandidatePairEncoder } from "./IceCandidatePairEncoder";
import { InboundAudioTrackEncoder } from "./InboundAudioTrackEncoder";
import { InboundVideoTrackEncoder } from "./InboundVideoTrackEncoder";
import { MediaSourceStatsEncoder } from "./MediaSourceStatsEncoder";
import { OutboundAudioTrackEncoder } from "./OutboundAudioTrackEncoder";
import { OutboundVideoTrackEncoder } from "./OutboundVideoTrackEncoder";
import { PeerConnectionTransportEncoder } from "./PeerConnectionTransportEncoder";
import { 
	Samples_ClientSample, 
	Samples_ClientSample_Browser, 
	Samples_ClientSample_Certificate, 
	Samples_ClientSample_CustomCallEvent, 
	Samples_ClientSample_DataChannel, 
	Samples_ClientSample_Engine, 
	Samples_ClientSample_ExtensionStat, 
	Samples_ClientSample_IceCandidatePair, 
	Samples_ClientSample_IceLocalCandidate, 
	Samples_ClientSample_IceLocalCandidate_IceLocalCandidateEnum, 
	Samples_ClientSample_IceRemoteCandidate, 
	Samples_ClientSample_IceRemoteCandidate_IceRemoteCandidateEnum, 
	Samples_ClientSample_InboundAudioTrack, 
	Samples_ClientSample_InboundVideoTrack, 
	Samples_ClientSample_MediaCodecStats, 
	Samples_ClientSample_MediaCodecStats_MediaCodecStatsEnum, 
	Samples_ClientSample_MediaDevice, 
	Samples_ClientSample_MediaDevice_MediaDeviceEnum, 
	Samples_ClientSample_MediaSourceStat, 
	Samples_ClientSample_OperationSystem, 
	Samples_ClientSample_OutboundAudioTrack, 
	Samples_ClientSample_OutboundVideoTrack, 
	Samples_ClientSample_PeerConnectionTransport, 
	Samples_ClientSample_Platform 
} from './OutputSamples';
import { ClientSampleEncodingOptions } from "./EncodingOptions";

export class ClientSampleEncoder {
	public readonly options: ClientSampleEncodingOptions = {
		sfuSinkIdIsUuid: false,
		sfuStreamIdIsUuid: false,
	};

	private _callId?: string;
	private _roomId?: string;
	private _userId?: string;
	private _visited = false;
	private _mediaConstraints = new Set<string>();
	private _iceServers = new Set<string>();
	private _localSDPs = new Set<string>();
	private _userMediaErrors = new Set<string>();
	private _mediaDevices = new Map<string, MediaDevice>();
	private _engine: ClientSample['engine'];
	private _platform: ClientSample['platform'];
	private _browser: ClientSample['browser'];
	private _os: ClientSample['os'];
	private _codecs: ClientSample['codecs'] = [];
	private _certificates: ClientSample['certificates'] = []
	private _timeZoneOffsetInHours?: number;

	private _mediaSources = new Map<string, MediaSourceStatsEncoder>();
	private _inboundAudioTracks = new Map<string, InboundAudioTrackEncoder>();
	private _inboundVideoTracks = new Map<string, InboundVideoTrackEncoder>();
	private _outboundAudioTracks = new Map<string, OutboundAudioTrackEncoder>();
	private _outboundVideoTracks = new Map<string, OutboundVideoTrackEncoder>();
	private _dataChannels = new Map<number, DataChannelEncoder>();
	private _iceCandidatePairs = new Map<string, IceCandidatePairEncoder>();
	private _peerConnectionTransports = new Map<string, PeerConnectionTransportEncoder>();
	private _iceLocalCandidates = new Map<string, IceLocalCandidate>();
	private _iceRemoteCandidates = new Map<string, IceRemoteCandidate>();

	public get visited(): boolean {
		const result = this._visited;
		this._visited = false;
		return result;
	}

	public encodeToBytes(clientSample: ClientSample): Uint8Array {
		return this.encodeToProtobufSamples(clientSample).toBinary()
	}

	public encodeToBase64(clientSample: ClientSample): string {
		const bytes = this.encodeToProtobufSamples(clientSample).toBinary();
		return convertUint8ToBase64(bytes);
	}

	public encodeToProtobufSamples(clientSample: ClientSample): Samples_ClientSample {
		
		this._visited = true;

		const result = new Samples_ClientSample({
			clientId: clientSample.clientId ? uuidToByteArray(clientSample.clientId) : undefined,
			timestamp: BigInt(clientSample.timestamp),
			sampleSeq: clientSample.sampleSeq,
			marker: clientSample.marker,

			callId: this._encodeCallId(clientSample.callId),
			userId: this._encodeUserId(clientSample.userId),
			roomId: this._encodeRoomId(clientSample.roomId),
			browser: this._encodeBrowser(clientSample.browser),
			engine: this._encodeEngine(clientSample.engine),
			platform: this._encodePlatform(clientSample.platform),
			os: this._encodeOs(clientSample.os),
			localSDPs: this._encodeLocalSDPs(clientSample.localSDPs),
			userMediaErrors: this._encodeUserMediaErrors(clientSample.userMediaErrors),
			iceServers: this._encodeIceServers(clientSample.iceServers),
			mediaConstraints: this._encodeMediaConstraints(clientSample.mediaConstraints),
			mediaDevices: this._encodeMediaDevices(clientSample.mediaDevices),
			
			dataChannels: this._encodeDataChannels(clientSample.dataChannels),
			iceCandidatePairs: this._encodeIceCandidatePairs(clientSample.iceCandidatePairs),
			pcTransports: this._encodePeerConnectionTransports(clientSample.pcTransports),
			inboundAudioTracks: this._encodeInboundAudioTracks(clientSample.inboundAudioTracks),
			inboundVideoTracks: this._encodeInboundVideoTracks(clientSample.inboundVideoTracks),
			outboundAudioTracks: this._encodeOutboundAudioTracks(clientSample.outboundAudioTracks),
			outboundVideoTracks: this._encodeOutboundVideoTracks(clientSample.outboundVideoTracks),
			mediaSources: this._encodeMediaSources(clientSample.mediaSources),

			codecs: this._encodeCodecs(clientSample.codecs),
			certificates: this._encodeCertificates(clientSample.certificates),
			extensionStats: this._encodeExtensionStats(clientSample.extensionStats),
			customCallEvents: this._encodeCustomCallEvents(clientSample.customCallEvents),

            iceLocalCandidates: this._encodeIceLocalCandidates(clientSample.iceLocalCandidates),
            iceRemoteCandidates: this._encodeIceRemoteCandidates(clientSample.iceRemoteCandidates),
			timeZoneOffsetInHours: this._encodeTimeZoneOffsetInHours(clientSample.timeZoneOffsetInHours),

		});
		return result;
	}

	public reset() {
		this._callId = undefined;
		this._roomId = undefined;
		this._userId = undefined;
		this._visited = false;
		this._mediaConstraints.clear();
		this._iceServers.clear();
		this._localSDPs.clear();
		this._userMediaErrors.clear();
		this._mediaDevices.clear();
		this._engine = undefined;
		this._platform = undefined;
		this._browser = undefined;
		this._os = undefined;
		this._codecs = [];
		this._certificates = [];
		this._timeZoneOffsetInHours = undefined;
	  
		this._mediaSources.clear();
		this._inboundAudioTracks.clear();
		this._inboundVideoTracks.clear();
		this._outboundAudioTracks.clear();
		this._outboundVideoTracks.clear();
		this._dataChannels.clear();
		this._iceCandidatePairs.clear();
		this._peerConnectionTransports.clear();
		this._iceLocalCandidates.clear();
		this._iceRemoteCandidates.clear();
	  }
	  

	private _encodeCallId(
		callId?: string,
	): Uint8Array | undefined {
		if (!callId) return;
		if (this._callId === callId) return;
		this._callId = callId;
		return uuidToByteArray(callId);
	}

	private _encodeRoomId(
		roomId?: string,
	): string | undefined {
		if (!roomId) return;
		if (this._roomId === roomId) return;
		this._roomId = roomId;
		return roomId;
	}

	private _encodeUserId(
		userId?: string,
	): string | undefined {
		if (!userId) return;
		if (this._userId === userId) return;
		this._userId = userId;
		return userId;
	}

	private _encodeTimeZoneOffsetInHours(
		timeZoneOffsetInHours?: number,
	): number | undefined {
		if (!timeZoneOffsetInHours) return;
		if (this._timeZoneOffsetInHours === timeZoneOffsetInHours) return;
		this._timeZoneOffsetInHours = timeZoneOffsetInHours;
		return timeZoneOffsetInHours;
	}

	private _encodeMediaConstraints(
		mediaConstraints?: string[]
	): string[] {
		if (!mediaConstraints) return [];
		if (this._mediaConstraints.size === mediaConstraints.length) {
			if (mediaConstraints.every(item => this._mediaConstraints.has(item))) {
				return [];
			}
		}
		this._mediaConstraints = new Set<string>(mediaConstraints);
		return mediaConstraints;
	}

	private _encodeUserMediaErrors(
		userMediaErrors?: string[]
	): string[] {
		if (!userMediaErrors) return [];
		if (this._userMediaErrors.size === userMediaErrors.length) {
			if (userMediaErrors.every(item => this._userMediaErrors.has(item))) {
				return [];
			}
		}
		this._userMediaErrors = new Set<string>(userMediaErrors);
		return userMediaErrors;
	}

	private _encodeIceServers(
		iceServers?: string[]
	): string[] {
		if (!iceServers) return [];
		if (this._iceServers.size === iceServers.length) {
			if (iceServers.every(item => this._iceServers.has(item))) {
				return [];
			}
		}
		this._iceServers = new Set<string>(iceServers);
		return iceServers;
	}

	private _encodeLocalSDPs(
		localSDPs?: string[]
	): string[] {
		if (!localSDPs) return [];
		if (this._localSDPs.size === localSDPs.length) {
			if (localSDPs.every(item => this._localSDPs.has(item))) {
				return [];
			}
		}
		this._localSDPs = new Set<string>(localSDPs);
		return localSDPs;
	}

	private _encodeMediaDevices(
		mediaDevices?: ClientSample['mediaDevices']
	): Samples_ClientSample_MediaDevice[] {
		if (!mediaDevices) return [];
		const sampledIds = new Set<string>();
		const result: Samples_ClientSample_MediaDevice[] = [];
		for (const mediaDevice of mediaDevices) {
			if (!mediaDevice.id) continue;
			if (this._mediaDevices.has(mediaDevice.id)) continue;
			
			sampledIds.add(mediaDevice.id);
			result.push(new Samples_ClientSample_MediaDevice({
				...mediaDevice,
				kind: 	mediaDevice.kind === 'audioinput' ? Samples_ClientSample_MediaDevice_MediaDeviceEnum.AUDIOINPUT :
						mediaDevice.kind === 'audiooutput' ? Samples_ClientSample_MediaDevice_MediaDeviceEnum.AUDIOOUTPUT :
						mediaDevice.kind === 'videoinput' ? Samples_ClientSample_MediaDevice_MediaDeviceEnum.VIDEOINPUT :
						undefined
			}))
			this._mediaDevices.set(mediaDevice.id, mediaDevice);
		}
		for (const savedMediaDevice of Array.from(this._mediaDevices.values())) {
			if (savedMediaDevice.id && !sampledIds.has(savedMediaDevice.id)) {
				this._mediaDevices.delete(savedMediaDevice.id);
			}
		}
		return result;
	}

	private _encodeIceLocalCandidates(
		iceLocalCandidates?: IceLocalCandidate[]
	): Samples_ClientSample_IceLocalCandidate[] {
		if (!iceLocalCandidates) return [];
		if (this._iceLocalCandidates.size === iceLocalCandidates.length) {
			if (iceLocalCandidates.every(item => this._iceLocalCandidates.has(item.id ? item.id : 'id'))) {
				return [];
			}
		}
		this._iceLocalCandidates.clear();
		iceLocalCandidates.forEach(item => this._iceLocalCandidates.set(item.id ? item.id : 'id', item));
		return Array.from(this._iceLocalCandidates.values()).filter(item => !!item.peerConnectionId).map(item => {
			return new Samples_ClientSample_IceLocalCandidate({
				...item,
				peerConnectionId: uuidToByteArray(item.peerConnectionId!),
				priority: BigInt(item.priority ? item.priority : -1),
				protocol: item.protocol === 'tcp' ? Samples_ClientSample_IceLocalCandidate_IceLocalCandidateEnum.TCP :
					item.protocol === 'udp' ? Samples_ClientSample_IceLocalCandidate_IceLocalCandidateEnum.UDP :
					undefined,
				relayProtocol: item.relayProtocol === 'tcp' ? Samples_ClientSample_IceLocalCandidate_IceLocalCandidateEnum.TCP :
					item.relayProtocol === 'udp' ? Samples_ClientSample_IceLocalCandidate_IceLocalCandidateEnum.UDP :
					item.relayProtocol === 'tls' ? Samples_ClientSample_IceLocalCandidate_IceLocalCandidateEnum.TLS :
					undefined,
			})
		});
	}

	private _encodeIceRemoteCandidates(
		iceRemoteCandidates?: IceRemoteCandidate[]
	): Samples_ClientSample_IceRemoteCandidate[] {
		if (!iceRemoteCandidates) return [];
		if (this._iceRemoteCandidates.size === iceRemoteCandidates.length) {
			if (iceRemoteCandidates.every(item => this._iceRemoteCandidates.has(item.id ? item.id : 'id'))) {
				return [];
			}
		}
		this._iceRemoteCandidates.clear();
		iceRemoteCandidates.forEach(item => this._iceRemoteCandidates.set(item.id ? item.id : 'id', item));
		return Array.from(this._iceRemoteCandidates.values()).filter(item => !!item.peerConnectionId).map(item => {
			return new Samples_ClientSample_IceRemoteCandidate({
				...item,
				peerConnectionId: uuidToByteArray(item.peerConnectionId!),
				priority: BigInt(item.priority ? item.priority : -1),
				protocol: item.protocol === 'tcp' ? Samples_ClientSample_IceRemoteCandidate_IceRemoteCandidateEnum.TCP :
					item.protocol === 'udp' ? Samples_ClientSample_IceRemoteCandidate_IceRemoteCandidateEnum.UDP :
					undefined,
				relayProtocol: item.relayProtocol === 'tcp' ? Samples_ClientSample_IceRemoteCandidate_IceRemoteCandidateEnum.TCP :
					item.relayProtocol === 'udp' ? Samples_ClientSample_IceRemoteCandidate_IceRemoteCandidateEnum.UDP :
					item.relayProtocol === 'tls' ? Samples_ClientSample_IceRemoteCandidate_IceRemoteCandidateEnum.TLS :
					undefined,
			});
		});
	}

	private _encodeCodecs(
		codecs?: ClientSample['codecs']
	  ): Samples_ClientSample_MediaCodecStats[] {
		if (!codecs) return [];
	  
		const sampledMimeTypes = new Set<string>();
		const result: Samples_ClientSample_MediaCodecStats[] = [];
	  
		for (const codec of codecs) {
		  if (!codec.mimeType) continue;
		  if (!this._codecs) continue;
		  if (this._codecs.some((c) => c.mimeType === codec.mimeType)) continue;
	  
		  sampledMimeTypes.add(codec.mimeType);
		  result.push(new Samples_ClientSample_MediaCodecStats({
			...codec,
			codecType:
			  codec.codecType === 'encode'
				? Samples_ClientSample_MediaCodecStats_MediaCodecStatsEnum.ENCODE
				: codec.codecType === 'decode'
				? Samples_ClientSample_MediaCodecStats_MediaCodecStatsEnum.DECODE
				: undefined
		  }));
		}
		
		this._codecs = [...(this._codecs || []), ...codecs];
	  
		this._codecs = this._codecs.filter((codec) => sampledMimeTypes.has(codec.mimeType ? codec.mimeType : "no"));
	  
		return result;
	}

	private _encodeExtensionStats(
		extensionStats?: ClientSample['extensionStats'], 
	): Samples_ClientSample_ExtensionStat[] {
		if (!extensionStats) return [];
		return extensionStats.map(extensionStats => new Samples_ClientSample_ExtensionStat({
			...extensionStats
		}));
	}

	private _encodeCustomCallEvents(
		customCallEvents?: ClientSample['customCallEvents'], 
	): Samples_ClientSample_CustomCallEvent[] {
		if (!customCallEvents) return [];
		return customCallEvents.map(customCallEvents => new Samples_ClientSample_CustomCallEvent({
			...customCallEvents,
			peerConnectionId: customCallEvents.peerConnectionId ? uuidToByteArray(customCallEvents.peerConnectionId) : undefined,
			timestamp: customCallEvents.timestamp ? BigInt(customCallEvents.timestamp) : undefined,
		}));
	}

	private _encodeCertificates(
		certificates?: ClientSample['certificates']
	  ): Samples_ClientSample_Certificate[] {
		if (!certificates) return [];
	  
		const sampledFingerprints = new Set<string>();
		const result: Samples_ClientSample_Certificate[] = [];
	  
		for (const certificate of certificates) {
		  if (!certificate.fingerprint) continue;
		  if (!this._certificates) continue;
		  if (this._certificates.some((c) => c.fingerprint === certificate.fingerprint)) continue;
	  
		  sampledFingerprints.add(certificate.fingerprint);
		  result.push(new Samples_ClientSample_Certificate({
			...certificate
		  }));
		}
	  
		this._certificates = [...(this._certificates || []), ...certificates];
	  
		this._certificates = this._certificates.filter((certificate) => sampledFingerprints.has(certificate.fingerprint ? certificate.fingerprint : "nope"));
	  
		return result;
	}

	private _encodeBrowser(
		browser?: ClientSample['browser'], 
	): Samples_ClientSample_Browser | undefined {
		if (!browser) {
			return;
		}
		const [source, actual] = [this._browser, browser].map(item => `${item? item.name : undefined}:${item? item.version : undefined}`);
		if (source === actual) {
			return;
		}
		this._browser = browser;
		
		return new Samples_ClientSample_Browser({
			...browser
		});
	}


	private _encodeEngine(
		engine?: ClientSample['engine'], 
	): Samples_ClientSample_Engine | undefined {
		if (!engine) {
			return;
		}
		const [source, actual] = [this._engine, engine].map(item => `${item? item.name : undefined}:${item? item.version : undefined}`);
		if (source === actual) {
			return;
		}
		this._engine = engine;
		
		return new Samples_ClientSample_Engine({
			...engine
		});
	}

	private _encodePlatform(
		platform?: ClientSample['platform'], 
	): Samples_ClientSample_Platform | undefined {
		if (!platform) {
			return;
		}
		const [source, actual] = [this._platform, platform]
			.map(item => `${item ? item.model : undefined}:${item? item.type : undefined}:${item? item.vendor : undefined}`);
		if (source === actual) {
			return;
		}
		this._platform = platform;
		
		return new Samples_ClientSample_Platform({
			...platform
		});
	}

	private _encodeOs(
		os?: ClientSample['os'], 
	): Samples_ClientSample_OperationSystem | undefined {
		if (!os) {
			return;
		}
		const [source, actual] = [this._os, os]
			.map(item => `${item? item.versionName : undefined}:${item? item.version : undefined}:${item? item.name : undefined}`);
		if (source === actual) {
			return;
		}
		this._os = os;
		
		return new Samples_ClientSample_OperationSystem({
			...os
		});
	}

	private _encodeInboundAudioTracks(
		inboundAudioTracks?: ClientSample['inboundAudioTracks'], 
	): Samples_ClientSample_InboundAudioTrack[] {
		const result: Samples_ClientSample_InboundAudioTrack[] = [];
		for (const sample of (inboundAudioTracks ? inboundAudioTracks : [])) {
			if (!sample.trackId) continue;
			const key = `${sample.trackId}:${sample.ssrc}`;
			let encoder = this._inboundAudioTracks.get(key);
			if (!encoder) {
				encoder = new InboundAudioTrackEncoder(sample.trackId, sample.ssrc, this.options);
				this._inboundAudioTracks.set(key, encoder);
			}
			const encodedSample = encoder.encode(sample);
			result.push(encodedSample);
		}

		for (const [key, encoder] of Array.from(this._inboundAudioTracks.entries())) {
			if (!encoder.visited) {
				this._inboundAudioTracks.delete(key);
			}
		}
		return result;
	}

	private _encodeInboundVideoTracks(
		inboundVideoTracks?: ClientSample['inboundVideoTracks'], 
	): Samples_ClientSample_InboundVideoTrack[] {
		const result: Samples_ClientSample_InboundVideoTrack[] = [];
		for (const sample of (inboundVideoTracks ? inboundVideoTracks : [])) {
			if (!sample.trackId) continue;
			const key = `${sample.trackId}:${sample.ssrc}`;
			let encoder = this._inboundVideoTracks.get(key);
			if (!encoder) {
				encoder = new InboundVideoTrackEncoder(sample.trackId, sample.ssrc, this.options);
				this._inboundVideoTracks.set(key, encoder);
			}
			const encodedSample = encoder.encode(sample);
			result.push(encodedSample);
		}

		for (const [key, encoder] of Array.from(this._inboundVideoTracks.entries())) {
			if (!encoder.visited) {
				this._inboundVideoTracks.delete(key);
			}
		}
		return result;
	}


	private _encodeOutboundAudioTracks(
		outboundAudioTracks?: ClientSample['outboundAudioTracks'], 
	): Samples_ClientSample_OutboundAudioTrack[] {
		const result: Samples_ClientSample_OutboundAudioTrack[] = [];
		for (const sample of (outboundAudioTracks ? outboundAudioTracks : [])) {
			if (!sample.trackId) continue;
			const key = `${sample.trackId}:${sample.ssrc}`;
			let encoder = this._outboundAudioTracks.get(key);
			if (!encoder) {
				encoder = new OutboundAudioTrackEncoder(sample.trackId, sample.ssrc, this.options);
				this._outboundAudioTracks.set(key, encoder);
			}
			const encodedSample = encoder.encode(sample);
			result.push(encodedSample);
		}

		for (const [key, encoder] of Array.from(this._outboundAudioTracks.entries())) {
			if (!encoder.visited) {
				this._outboundAudioTracks.delete(key);
			}
		}
		return result;
	}

	private _encodeOutboundVideoTracks(
		outboundVideoTracks?: ClientSample['outboundVideoTracks'], 
	): Samples_ClientSample_OutboundVideoTrack[] {
		const result: Samples_ClientSample_OutboundVideoTrack[] = [];
		for (const sample of (outboundVideoTracks ? outboundVideoTracks : [])) {
			if (!sample.trackId) continue;
			const key = `${sample.trackId}:${sample.ssrc}`;
			let encoder = this._outboundVideoTracks.get(key);
			if (!encoder) {
				encoder = new OutboundVideoTrackEncoder(sample.trackId, sample.ssrc, this.options);
				this._outboundVideoTracks.set(key, encoder);
			}
			const encodedSample = encoder.encode(sample);
			result.push(encodedSample);
		}

		for (const [key, encoder] of Array.from(this._outboundVideoTracks.entries())) {
			if (!encoder.visited) {
				this._outboundVideoTracks.delete(key);
			}
		}
		return result;
	}

	private _encodeMediaSources(
		mediaSources?: ClientSample['mediaSources'], 
	): Samples_ClientSample_MediaSourceStat[] {
		const result: Samples_ClientSample_MediaSourceStat[] = [];
		for (const sample of (mediaSources ? mediaSources : [])) {
			if (!sample.trackIdentifier) continue;
			let encoder = this._mediaSources.get(sample.trackIdentifier);
			if (!encoder) {
				encoder = new MediaSourceStatsEncoder(sample.trackIdentifier);
				this._mediaSources.set(sample.trackIdentifier, encoder);
			}
			const encodedSample = encoder.encode(sample);
			result.push(encodedSample);
		}

		for (const encoder of Array.from(this._mediaSources.values())) {
			if (!encoder.visited) {
				this._mediaSources.delete(encoder.trackIdentifier);
			}
		}
		
		return result;
	}

	private _encodeIceCandidatePairs(
		candidatePairs: ClientSample['iceCandidatePairs'],
	): Samples_ClientSample_IceCandidatePair[] {
		const result: Samples_ClientSample_IceCandidatePair[] = [];
		for (const sample of (candidatePairs ? candidatePairs : [])) {
			if (!sample.candidatePairId) continue;
			let encoder = this._iceCandidatePairs.get(sample.candidatePairId);
			if (!encoder) {
				encoder = new IceCandidatePairEncoder(sample.candidatePairId);
				this._iceCandidatePairs.set(sample.candidatePairId, encoder);
			}
			const encodedSample = encoder.encode(sample);
			result.push(encodedSample);
		}

		for (const encoder of Array.from(this._iceCandidatePairs.values())) {
			if (!encoder.visited) {
				this._iceCandidatePairs.delete(encoder.candidatePairId);
			}
		}
		
		return result;
	}

	private _encodePeerConnectionTransports(
		pcTransports?: ClientSample['pcTransports'], 
	): Samples_ClientSample_PeerConnectionTransport[] {
		const result: Samples_ClientSample_PeerConnectionTransport[] = [];
		for (const sample of (pcTransports ? pcTransports : [])) {
			if (!sample.peerConnectionId) continue;
			let encoder = this._peerConnectionTransports.get(sample.peerConnectionId);
			if (!encoder) {
				encoder = new PeerConnectionTransportEncoder(sample.peerConnectionId);
				this._peerConnectionTransports.set(sample.peerConnectionId, encoder);
			}
			const encodedSample = encoder.encode(sample);
			result.push(encodedSample);
		}

		for (const encoder of Array.from(this._peerConnectionTransports.values())) {
			if (!encoder.visited) {
				this._peerConnectionTransports.delete(encoder.peerConnectionId);
			}
		}
		
		return result;
	}

	private _encodeDataChannels(
		dataChannels?: ClientSample['dataChannels']
	): Samples_ClientSample_DataChannel[] {
		const result: Samples_ClientSample_DataChannel[] = [];
		for (const sample of (dataChannels ? dataChannels : [])) {
			if (!sample.dataChannelIdentifier) continue;
			let encoder = this._dataChannels.get(sample.dataChannelIdentifier);
			if (!encoder) {
				encoder = new DataChannelEncoder(sample.dataChannelIdentifier);
				this._dataChannels.set(sample.dataChannelIdentifier, encoder);
			}
			const encodedSample = encoder.encode(sample);
			result.push(encodedSample);
		}

		for (const encoder of Array.from(this._dataChannels.values())) {
			if (!encoder.visited) {
				this._dataChannels.delete(encoder.dataChannelIdentifier);
			}
		}
		
		return result;
	}
}
