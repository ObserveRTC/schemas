import { AudioPlayoutEncoder } from "./AudioPlayoutEncoder";
import { AudioSourceEncoder } from "./AudioSourceEncoder";
import { CertificateEncoder } from "./CertificateEncoder";
import { ClientSampleEncoder } from "./ClientSampleEncoder";
import { CodecStatsEncoder } from "./CodecStatsEncoder";
import { DataChannelEncoder } from "./DataChannelEncoder";
import { IceCandidateEncoder } from "./IceCandidateEncoder";
import { IceCandidatePairEncoder } from "./IceCandidatePairStatsEncoder";
import { IceTransportEncoder } from "./IceTransportEncoder";
import { InboundRtpEncoder } from "./InboundRtpEncoder";
import { PeerConnectionSample as InputClientSample, PeerConnectionSample } from "./InputSamples";
import { OutboundRtpEncoder } from "./OutboundRtpEncoder";
import { ClientSample_PeerConnectionSample } from "./OutputSamples";
import { PeerConnectionTransportEncoder } from "./PeerConnectionTransportEncoder";
import { RemoteInboundRtpEncoder } from "./RemoteInboundRtpEncoder";
import { RemoteOutboundRtpEncoder } from "./RemoteOutboundRtpEncoder";
import { 
	AppDataEncoder,
	Encoder,
	OneTimePassStringToUint8ArrayEncoder, 
	OneTimePassUuidToByteArrayEncoder, 
	stringToBytesArray, 
	uuidToByteArray 
} from "./utils";
import { VideoSourceEncoder } from "./VideoSourceEncoder";

export class PeerConnectionSampleEncoder implements Encoder<PeerConnectionSample, ClientSample_PeerConnectionSample>{
	private readonly _peerConnectionId: Uint8Array;
	private _visited = false;

	private _codecStatsEncoders = new Map<string, CodecStatsEncoder>();
	private _inboundRtpEncoders = new Map<number, InboundRtpEncoder>();
	private _outboundRtpEncoders = new Map<number, OutboundRtpEncoder>();
	private _remoteInboundRtpEncoders = new Map<number, RemoteInboundRtpEncoder>();
	private _remoteOutboundRtpEncoders = new Map<number, RemoteOutboundRtpEncoder>();
	private _iceCandidatePairEncoders = new Map<string, IceCandidatePairEncoder>();
	private _dataChannelEncoders = new Map<string, DataChannelEncoder>();
	private _audioSourceEncoders = new Map<string, AudioSourceEncoder>();
	private _videoSourceEncoders = new Map<string, VideoSourceEncoder>();
	private _audioPlayoutEncoders = new Map<string, AudioPlayoutEncoder>();
	private _peerConnectionTransportEncoders = new Map<string, PeerConnectionTransportEncoder>();
	private _iceTransportEncoders = new Map<string, IceTransportEncoder>();
	private _iceCandidateEncoders = new Map<string, IceCandidateEncoder>();
	private _certificateEncoders = new Map<string, CertificateEncoder>();
	private _appDataEncoder: AppDataEncoder;

	public constructor(
		peerConnectionId: string,
		public parent: ClientSampleEncoder,
	) {
		this._peerConnectionId = this.parent.settings.peerConnectionIdIsUuid
			? uuidToByteArray(peerConnectionId)
			: stringToBytesArray(peerConnectionId);
		this._appDataEncoder = this.parent.appDataEncoderFactory.createPeerConnectionSampleAppDataEncoder();
	}

	public get visited(): boolean {
		const result = this._visited;
		this._visited = false;
		return result;
	}

	public reset(): void {
		this._appDataEncoder.reset();
		this._codecStatsEncoders.forEach((encoder) => encoder.reset());
		this._audioPlayoutEncoders.forEach((encoder) => encoder.reset());
		this._audioSourceEncoders.forEach((encoder) => encoder.reset());
		this._certificateEncoders.forEach((encoder) => encoder.reset());
		this._dataChannelEncoders.forEach((encoder) => encoder.reset());
		this._iceCandidateEncoders.forEach((encoder) => encoder.reset());
		this._iceTransportEncoders.forEach((encoder) => encoder.reset());
		this._inboundRtpEncoders.forEach((encoder) => encoder.reset());
		this._outboundRtpEncoders.forEach((encoder) => encoder.reset());
		this._peerConnectionTransportEncoders.forEach((encoder) => encoder.reset());
		this._remoteInboundRtpEncoders.forEach((encoder) => encoder.reset());
		this._remoteOutboundRtpEncoders.forEach((encoder) => encoder.reset());
		this._iceCandidatePairEncoders.forEach((encoder) => encoder.reset());
		this._videoSourceEncoders.forEach((encoder) => encoder.reset());
		
	}

	public encode(sample: PeerConnectionSample): ClientSample_PeerConnectionSample {
		this._visited = true;

		const codecs = sample.codecs?.map(this._encodeCodecStats.bind(this));
		const inboundRtps = sample.inboundRtps?.map(this._encodeInboundRtp.bind(this));
		const outboundRtps = sample.outboundRtps?.map(this._encodeOutboundRtp.bind(this));
		const remoteInboundRtps = sample.remoteInboundRtps?.map(this._encodeRemoteInboundRtp.bind(this));
		const remoteOutboundRtps = sample.remoteOutboundRtps?.map(this._encodeRemoteOutboundRtp.bind(this));
		const dataChannels = sample.dataChannels?.map(this._encodeDataChannel.bind(this));
		const audioSources = sample.audioSources?.map(this._encodeAudioSource.bind(this));
		const videoSources = sample.videoSources?.map(this._encodeVideoSource.bind(this));
		const audioPlayouts = sample.audioPlayouts?.map(this._encodeAudioPlayout.bind(this));
		const peerConnectionTransports = sample.peerConnectionTransports?.map(this._encodePeerConnectionTransport.bind(this));
		const iceTransports = sample.iceTransports?.map(this._encodeIceTransport.bind(this));
		const iceCandidates = sample.iceCandidates?.map(this._encodeIceCandidate.bind(this));
		const iceCandidatePairs = sample.iceCandidatePairs?.map(this._encodeIceCandidatePair.bind(this));
		const certificates = sample.certificates?.map(this._encodeCertificate.bind(this));

		return new ClientSample_PeerConnectionSample({
			peerConnectionId: this._peerConnectionId,
			codecs,
			inboundRtps,
			outboundRtps,
			remoteInboundRtps,
			remoteOutboundRtps,
			dataChannels,
			audioSources,
			videoSources,
			audioPlayouts,
			peerConnectionTransports,
			iceTransports,
			iceCandidates,
			iceCandidatePairs,
			certificates,

			appData: this._appDataEncoder.encode(sample.appData),
		});
	}

	private _encodeCodecStats(input: Required<InputClientSample>['codecs'][number]) {
		let encoder = this._codecStatsEncoders.get(input.id);
		if (!encoder) {
			encoder = new CodecStatsEncoder(
				this.parent.appDataEncoderFactory.createCodecStatsAppDataEncoder()
			);
			this._codecStatsEncoders.set(input.id, encoder);
		}
		return encoder.encode(input);
	}

	private _encodeInboundRtp(input: Required<InputClientSample>['inboundRtps'][number]) {
		let encoder = this._inboundRtpEncoders.get(input.ssrc);
		if (!encoder) {
			const trackIdEncoder = this.parent.settings.trackIdIsUuid 
				? new OneTimePassUuidToByteArrayEncoder()
				: new OneTimePassStringToUint8ArrayEncoder();
			encoder = new InboundRtpEncoder(
				input.ssrc,
				trackIdEncoder,
				this.parent.appDataEncoderFactory.createInboundRtpAppDataEncoder()
			);
			this._inboundRtpEncoders.set(input.ssrc, encoder);
		}
		return encoder.encode(input);
	}

	private _encodeOutboundRtp(input: Required<InputClientSample>['outboundRtps'][number]) {
		let encoder = this._outboundRtpEncoders.get(input.ssrc);
		if (!encoder) {
			encoder = new OutboundRtpEncoder(
				input.ssrc,
				this.parent.appDataEncoderFactory.createOutboundRtpAppDataEncoder()
			);
			this._outboundRtpEncoders.set(input.ssrc, encoder);
		}
		return encoder.encode(input);
	}

	private _encodeRemoteInboundRtp(input: Required<InputClientSample>['remoteInboundRtps'][number]) {
		let encoder = this._remoteInboundRtpEncoders.get(input.ssrc);
		if (!encoder) {
			encoder = new RemoteInboundRtpEncoder(
				input.ssrc,
				this.parent.appDataEncoderFactory.createRemoteInboundRtpAppDataEncoder()
			);
			this._remoteInboundRtpEncoders.set(input.ssrc, encoder);
		}
		return encoder.encode(input);
	}

	private _encodeRemoteOutboundRtp(input: Required<InputClientSample>['remoteOutboundRtps'][number]) {
		let encoder = this._remoteOutboundRtpEncoders.get(input.ssrc);
		if (!encoder) {
			encoder = new RemoteOutboundRtpEncoder(
				input.ssrc,
				this.parent.appDataEncoderFactory.createRemoteOutboundRtpAppDataEncoder()
			);
			this._remoteOutboundRtpEncoders.set(input.ssrc, encoder);
		}
		return encoder.encode(input);
	}

	private _encodeDataChannel(input: Required<InputClientSample>['dataChannels'][number]) {
		let encoder = this._dataChannelEncoders.get(input.id);
		if (!encoder) {
			encoder = new DataChannelEncoder(
				this.parent.appDataEncoderFactory.createDataChannelAppDataEncoder()
			);
			this._dataChannelEncoders.set(input.id, encoder);
		}
		return encoder.encode(input);
	}

	private _encodeAudioSource(input: Required<InputClientSample>['audioSources'][number]) {
		let encoder = this._audioSourceEncoders.get(input.id);
		if (!encoder) {
			encoder = new AudioSourceEncoder(
				this.parent.appDataEncoderFactory.createAudioSourceAppDataEncoder()
			);
			this._audioSourceEncoders.set(input.id, encoder);
		}
		return encoder.encode(input);
	}

	private _encodeVideoSource(input: Required<InputClientSample>['videoSources'][number]) {
		let encoder = this._videoSourceEncoders.get(input.id);
		if (!encoder) {
			encoder = new VideoSourceEncoder(
				this.parent.appDataEncoderFactory.createVideoSourceAppDataEncoder()
			);
			this._videoSourceEncoders.set(input.id, encoder);
		}
		return encoder.encode(input);
	}

	private _encodeAudioPlayout(input: Required<InputClientSample>['audioPlayouts'][number]) {
		let encoder = this._audioPlayoutEncoders.get(input.id);
		if (!encoder) {
			encoder = new AudioPlayoutEncoder(
				this.parent.appDataEncoderFactory.createAudioPlayoutAppDataEncoder()
			);
			this._audioPlayoutEncoders.set(input.id, encoder);
		}
		return encoder.encode(input);
	}

	private _encodePeerConnectionTransport(input: Required<InputClientSample>['peerConnectionTransports'][number]) {
		let encoder = this._peerConnectionTransportEncoders.get(input.id);
		if (!encoder) {
			encoder = new PeerConnectionTransportEncoder(
				this.parent.appDataEncoderFactory.createPeerConnectionTransportAppDataEncoder()
			);
			this._peerConnectionTransportEncoders.set(input.id, encoder);
		}
		return encoder.encode(input);
	}

	private _encodeIceTransport(input: Required<InputClientSample>['iceTransports'][number]) {
		let encoder = this._iceTransportEncoders.get(input.id);
		if (!encoder) {
			encoder = new IceTransportEncoder(
				this.parent.appDataEncoderFactory.createIceTransportAppDataEncoder()
			);
			this._iceTransportEncoders.set(input.id, encoder);
		}
		return encoder.encode(input);
	}

	private _encodeIceCandidate(input: Required<InputClientSample>['iceCandidates'][number]) {
		let encoder = this._iceCandidateEncoders.get(input.id);
		if (!encoder) {
			encoder = new IceCandidateEncoder(
				this.parent.appDataEncoderFactory.createIceCandidateAppDataEncoder()
			);
			this._iceCandidateEncoders.set(input.id, encoder);
		}
		return encoder.encode(input);
	}

	private _encodeIceCandidatePair(input: Required<InputClientSample>['iceCandidatePairs'][number]) {
		let encoder = this._iceCandidatePairEncoders.get(input.id);
		if (!encoder) {
			encoder = new IceCandidatePairEncoder(
				this.parent.appDataEncoderFactory.createIceCandidatePairAppDataEncoder()
			);
			this._iceCandidatePairEncoders.set(input.id, encoder);
		}
		return encoder.encode(input);
	}

	private _encodeCertificate(input: Required<InputClientSample>['certificates'][number]) {
		let encoder = this._certificateEncoders.get(input.id);
		if (!encoder) {
			encoder = new CertificateEncoder(
				this.parent.appDataEncoderFactory.createCertificateAppDataEncoder()
			);
			this._certificateEncoders.set(input.id, encoder);
		}
		return encoder.encode(input);
	}

	public checkVisitsAndClean() {
		let visited = false;

		for (const [id, encoder] of [...this._codecStatsEncoders.entries()]) {
			if (!encoder.visited) {
				this._codecStatsEncoders.delete(id);
				continue;
			}
			visited = true;
		}

		for (const [ssrc, encoder] of [...this._inboundRtpEncoders.entries()]) {
			if (!encoder.visited) {
				this._inboundRtpEncoders.delete(ssrc);
				continue;
			}
			visited = true;
		}

		for (const [ssrc, encoder] of [...this._outboundRtpEncoders.entries()]) {
			if (!encoder.visited) {
				this._outboundRtpEncoders.delete(ssrc);
				continue;
			}
			visited = true;
		}

		for (const [ssrc, encoder] of [...this._remoteInboundRtpEncoders.entries()]) {
			if (!encoder.visited) {
				this._remoteInboundRtpEncoders.delete(ssrc);
				continue;
			}
			visited = true;
		}

		for (const [ssrc, encoder] of [...this._remoteOutboundRtpEncoders.entries()]) {
			if (!encoder.visited) {
				this._remoteOutboundRtpEncoders.delete(ssrc);
				continue;
			}
			visited = true;
		}

		for (const [id, encoder] of [...this._dataChannelEncoders.entries()]) {
			if (!encoder.visited) {
				this._dataChannelEncoders.delete(id);
				continue;
			}
			visited = true;
		}

		for (const [id, encoder] of [...this._audioSourceEncoders.entries()]) {
			if (!encoder.visited) {
				this._audioSourceEncoders.delete(id);
				continue;
			}
			visited = true;
		}

		for (const [id, encoder] of [...this._videoSourceEncoders.entries()]) {
			if (!encoder.visited) {
				this._videoSourceEncoders.delete(id);
				continue;
			}
			visited = true;
		}

		for (const [id, encoder] of [...this._audioPlayoutEncoders.entries()]) {
			if (!encoder.visited) {
				this._audioPlayoutEncoders.delete(id);
				continue;
			}
			visited = true;
		}

		for (const [id, encoder] of [...this._iceCandidatePairEncoders.entries()]) {
			if (!encoder.visited) {
				this._iceCandidatePairEncoders.delete(id);
				continue;
			}
			visited = true;
		}

		for (const [id, encoder] of [...this._peerConnectionTransportEncoders.entries()]) {
			if (!encoder.visited) {
				this._peerConnectionTransportEncoders.delete(id);
				continue;
			}
			visited = true;
		}

		return visited;
	}
}