import { MediaPlayoutStatsEncoder } from "./MediaPlayoutEncoder";
import { CertificateEncoder } from "./CertificateEncoder";
import { ClientSampleEncoder } from "./ClientSampleEncoder";
import { CodecStatsEncoder } from "./CodecStatsEncoder";
import { DataChannelEncoder } from "./DataChannelEncoder";
import { IceCandidateEncoder } from "./IceCandidateEncoder";
import { IceCandidatePairEncoder } from "./IceCandidatePairStatsEncoder";
import { IceTransportEncoder } from "./IceTransportEncoder";
import { InboundRtpEncoder } from "./InboundRtpEncoder";
import { InboundTrackSampleEncoder } from "./InboundTrackEncoder";
import { PeerConnectionSample as InputClientSample, PeerConnectionSample } from "./InputSamples";
import { MediaSourceStatsEncoder } from "./MediaSourceEncoder";
import { OutboundRtpEncoder } from "./OutboundRtpEncoder";
import { OutboundTrackSampleEncoder } from "./OutboundTrackEncoder";
import { ClientSample_PeerConnectionSample } from "./OutputSamples";
import { PeerConnectionTransportEncoder } from "./PeerConnectionTransportEncoder";
import { RemoteInboundRtpEncoder } from "./RemoteInboundRtpEncoder";
import { RemoteOutboundRtpEncoder } from "./RemoteOutboundRtpEncoder";
import { 
	AttachmentEncoder,
	Encoder,
	NumberToNumberEncoder,
	OneTimePassStringToUint8ArrayEncoder, 
	OneTimePassUuidToByteArrayEncoder, 
	stringToBytesArray, 
	uuidToByteArray 
} from "./utils";

export class PeerConnectionSampleEncoder implements Encoder<PeerConnectionSample, ClientSample_PeerConnectionSample>{
	private readonly _peerConnectionId: Uint8Array;
	private _visited = false;

	private _attachmentsEncoder: AttachmentEncoder;
	private _scoreEncoder = new NumberToNumberEncoder();
	private _inboundTracksEncoders = new Map<string, InboundTrackSampleEncoder>();
	private _outboundTracksEncoders = new Map<string, OutboundTrackSampleEncoder>();
	private _codecStatsEncoders = new Map<string, CodecStatsEncoder>();
	private _inboundRtpEncoders = new Map<number, InboundRtpEncoder>();
	private _remoteInboundRtpEncoders = new Map<number, RemoteInboundRtpEncoder>();
	private _outboundRtpEncoders = new Map<number, OutboundRtpEncoder>();
	private _remoteOutboundRtpEncoders = new Map<number, RemoteOutboundRtpEncoder>();
	private _mediaSourceEncoders = new Map<string, MediaSourceStatsEncoder>();
	private _mediaPlayoutEncoders = new Map<string, MediaPlayoutStatsEncoder>();
	private _peerConnectionTransportEncoders = new Map<string, PeerConnectionTransportEncoder>();
	private _dataChannelEncoders = new Map<string, DataChannelEncoder>();
	private _iceTransportEncoders = new Map<string, IceTransportEncoder>();
	private _iceCandidateEncoders = new Map<string, IceCandidateEncoder>();
	private _iceCandidatePairEncoders = new Map<string, IceCandidatePairEncoder>();
	private _certificateEncoders = new Map<string, CertificateEncoder>();
	

	public constructor(
		peerConnectionId: string,
		public parent: ClientSampleEncoder,
	) {
		this._peerConnectionId = this.parent.settings.peerConnectionIdIsUuid
			? uuidToByteArray(peerConnectionId)
			: stringToBytesArray(peerConnectionId);
		this._attachmentsEncoder = this.parent.attachmentEncoderFactory.createPeerConnectionSampleAttachmentEncoder();
	}

	public get visited(): boolean {
		const result = this._visited;
		this._visited = false;
		return result;
	}

	public reset(): void {
		this._attachmentsEncoder.reset();
		this._scoreEncoder.reset();
		this._inboundTracksEncoders.forEach((encoder) => encoder.reset());
		this._outboundTracksEncoders.forEach((encoder) => encoder.reset());
		this._codecStatsEncoders.forEach((encoder) => encoder.reset());
		this._inboundRtpEncoders.forEach((encoder) => encoder.reset());
		this._remoteInboundRtpEncoders.forEach((encoder) => encoder.reset());
		this._outboundRtpEncoders.forEach((encoder) => encoder.reset());
		this._remoteOutboundRtpEncoders.forEach((encoder) => encoder.reset());
		this._mediaSourceEncoders.forEach((encoder) => encoder.reset());
		this._mediaPlayoutEncoders.forEach((encoder) => encoder.reset());
		this._peerConnectionTransportEncoders.forEach((encoder) => encoder.reset());
		this._dataChannelEncoders.forEach((encoder) => encoder.reset());
		this._iceTransportEncoders.forEach((encoder) => encoder.reset());
		this._iceCandidateEncoders.forEach((encoder) => encoder.reset());
		this._iceCandidatePairEncoders.forEach((encoder) => encoder.reset());
		this._certificateEncoders.forEach((encoder) => encoder.reset());
	}

	public encode(sample: PeerConnectionSample): ClientSample_PeerConnectionSample {
		this._visited = true;

		const inboundTracks = sample.inboundTracks?.map(this._encodeInboundTracks.bind(this));
		const outboundTracks = sample.outboundTracks?.map(this._encodeOutboundTracks.bind(this));
		const codecs = sample.codecs?.map(this._encodeCodecStats.bind(this));
		const inboundRtps = sample.inboundRtps?.map(this._encodeInboundRtp.bind(this));
		const remoteInboundRtps = sample.remoteInboundRtps?.map(this._encodeRemoteInboundRtp.bind(this));
		const outboundRtps = sample.outboundRtps?.map(this._encodeOutboundRtp.bind(this));
		const remoteOutboundRtps = sample.remoteOutboundRtps?.map(this._encodeRemoteOutboundRtp.bind(this));
		const mediaSources = sample.mediaSources?.map(this._encodeMediaSource.bind(this));
		const mediaPlayouts = sample.mediaPlayouts?.map(this._encodeMediaPlayout.bind(this));
		const peerConnectionTransports = sample.peerConnectionTransports?.map(this._encodePeerConnectionTransport.bind(this));
		const dataChannels = sample.dataChannels?.map(this._encodeDataChannel.bind(this));
		const iceTransports = sample.iceTransports?.map(this._encodeIceTransport.bind(this));
		const iceCandidates = sample.iceCandidates?.map(this._encodeIceCandidate.bind(this));
		const iceCandidatePairs = sample.iceCandidatePairs?.map(this._encodeIceCandidatePair.bind(this));
		const certificates = sample.certificates?.map(this._encodeCertificate.bind(this));

		return new ClientSample_PeerConnectionSample({
			peerConnectionId: this._peerConnectionId,
			attachments: this._attachmentsEncoder.encode(sample.attachments),
			score: this._scoreEncoder.encode(sample.score),
			inboundTracks,
			outboundTracks,
			codecs,
			inboundRtps,
			remoteInboundRtps,
			outboundRtps,
			remoteOutboundRtps,
			mediaSources,
			mediaPlayouts,
			peerConnectionTransports,
			dataChannels,
			iceTransports,
			iceCandidates,
			iceCandidatePairs,
			certificates,
		});
	}

	private _encodeCodecStats(input: Required<InputClientSample>['codecs'][number]) {
		let encoder = this._codecStatsEncoders.get(input.id);
		if (!encoder) {
			encoder = new CodecStatsEncoder(
				this.parent.attachmentEncoderFactory.createCodecStatsAttachmentEncoder()
			);
			this._codecStatsEncoders.set(input.id, encoder);
		}
		return encoder.encode(input);
	}

	private _encodeInboundTracks(input: Required<InputClientSample>['inboundTracks'][number]) {
		let encoder = this._inboundTracksEncoders.get(input.id);
		if (!encoder) {
			encoder = new InboundTrackSampleEncoder(
				this.parent.attachmentEncoderFactory.createInboundTrackAttachmentEncoder()
			);
			this._inboundTracksEncoders.set(input.id, encoder);
		}

		return encoder.encode(input);
	}

	private _encodeOutboundTracks(input: Required<InputClientSample>['outboundTracks'][number]) {
		let encoder = this._outboundTracksEncoders.get(input.id);
		if (!encoder) {
			encoder = new OutboundTrackSampleEncoder(
				this.parent.attachmentEncoderFactory.createOutboundTrackAttachmentEncoder()
			);
			this._outboundTracksEncoders.set(input.id, encoder);
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
				this.parent.attachmentEncoderFactory.createInboundRtpAttachmentEncoder()
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
				this.parent.attachmentEncoderFactory.createOutboundRtpAttachmentEncoder()
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
				this.parent.attachmentEncoderFactory.createRemoteInboundRtpAttachmentEncoder()
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
				this.parent.attachmentEncoderFactory.createRemoteOutboundRtpAttachmentEncoder()
			);
			this._remoteOutboundRtpEncoders.set(input.ssrc, encoder);
		}
		return encoder.encode(input);
	}

	private _encodeDataChannel(input: Required<InputClientSample>['dataChannels'][number]) {
		let encoder = this._dataChannelEncoders.get(input.id);
		if (!encoder) {
			encoder = new DataChannelEncoder(
				this.parent.attachmentEncoderFactory.createDataChannelAttachmentEncoder()
			);
			this._dataChannelEncoders.set(input.id, encoder);
		}
		return encoder.encode(input);
	}

	private _encodeMediaSource(input: Required<InputClientSample>['mediaSources'][number]) {
		let encoder = this._mediaSourceEncoders.get(input.id);
		if (!encoder) {
			encoder = new MediaSourceStatsEncoder(
				this.parent.attachmentEncoderFactory.createAudioSourceAttachmentEncoder()
			);
			this._mediaSourceEncoders.set(input.id, encoder);
		}
		return encoder.encode(input);
	}

	private _encodeMediaPlayout(input: Required<InputClientSample>['mediaPlayouts'][number]) {
		let encoder = this._mediaPlayoutEncoders.get(input.id);
		if (!encoder) {
			encoder = new MediaPlayoutStatsEncoder(
				this.parent.attachmentEncoderFactory.createAudioPlayoutAttachmentEncoder()
			);
			this._mediaPlayoutEncoders.set(input.id, encoder);
		}
		return encoder.encode(input);
	}

	private _encodePeerConnectionTransport(input: Required<InputClientSample>['peerConnectionTransports'][number]) {
		let encoder = this._peerConnectionTransportEncoders.get(input.id);
		if (!encoder) {
			encoder = new PeerConnectionTransportEncoder(
				this.parent.attachmentEncoderFactory.createPeerConnectionTransportAttachmentEncoder()
			);
			this._peerConnectionTransportEncoders.set(input.id, encoder);
		}
		return encoder.encode(input);
	}

	private _encodeIceTransport(input: Required<InputClientSample>['iceTransports'][number]) {
		let encoder = this._iceTransportEncoders.get(input.id);
		if (!encoder) {
			encoder = new IceTransportEncoder(
				this.parent.attachmentEncoderFactory.createIceTransportAttachmentEncoder()
			);
			this._iceTransportEncoders.set(input.id, encoder);
		}
		return encoder.encode(input);
	}

	private _encodeIceCandidate(input: Required<InputClientSample>['iceCandidates'][number]) {
		let encoder = this._iceCandidateEncoders.get(input.id);
		if (!encoder) {
			encoder = new IceCandidateEncoder(
				this.parent.attachmentEncoderFactory.createIceCandidateAttachmentEncoder()
			);
			this._iceCandidateEncoders.set(input.id, encoder);
		}
		return encoder.encode(input);
	}

	private _encodeIceCandidatePair(input: Required<InputClientSample>['iceCandidatePairs'][number]) {
		let encoder = this._iceCandidatePairEncoders.get(input.id);
		if (!encoder) {
			encoder = new IceCandidatePairEncoder(
				this.parent.attachmentEncoderFactory.createIceCandidatePairAttachmentEncoder()
			);
			this._iceCandidatePairEncoders.set(input.id, encoder);
		}
		return encoder.encode(input);
	}

	private _encodeCertificate(input: Required<InputClientSample>['certificates'][number]) {
		let encoder = this._certificateEncoders.get(input.id);
		if (!encoder) {
			encoder = new CertificateEncoder(
				this.parent.attachmentEncoderFactory.createCertificateAttachmentEncoder()
			);
			this._certificateEncoders.set(input.id, encoder);
		}
		return encoder.encode(input);
	}

	public checkVisitsAndClean() {
		let visited = false;

		for (const [id, encoder] of [...this._inboundTracksEncoders.entries()]) {
			if (!encoder.visited) {
				this._inboundTracksEncoders.delete(id);
				continue;
			}
			visited = true;
		}

		for (const [id, encoder] of [...this._outboundTracksEncoders.entries()]) {
			if (!encoder.visited) {
				this._outboundTracksEncoders.delete(id);
				continue;
			}
			visited = true;
		}

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

		for (const [ssrc, encoder] of [...this._remoteInboundRtpEncoders.entries()]) {
			if (!encoder.visited) {
				this._remoteInboundRtpEncoders.delete(ssrc);
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

		for (const [ssrc, encoder] of [...this._remoteOutboundRtpEncoders.entries()]) {
			if (!encoder.visited) {
				this._remoteOutboundRtpEncoders.delete(ssrc);
				continue;
			}
			visited = true;
		}

		for (const [id, encoder] of [...this._mediaSourceEncoders.entries()]) {
			if (!encoder.visited) {
				this._mediaSourceEncoders.delete(id);
				continue;
			}
			visited = true;
		}

		for (const [id, encoder] of [...this._mediaPlayoutEncoders.entries()]) {
			if (!encoder.visited) {
				this._mediaPlayoutEncoders.delete(id);
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

		for (const [id, encoder] of [...this._dataChannelEncoders.entries()]) {
			if (!encoder.visited) {
				this._dataChannelEncoders.delete(id);
				continue;
			}
			visited = true;
		}

		for (const [id, encoder] of [...this._iceTransportEncoders.entries()]) {
			if (!encoder.visited) {
				this._iceTransportEncoders.delete(id);
				continue;
			}
			visited = true;
		}

		for (const [id, encoder] of [...this._iceCandidateEncoders.entries()]) {
			if (!encoder.visited) {
				this._iceCandidateEncoders.delete(id);
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

		for (const [id, encoder] of [...this._certificateEncoders.entries()]) {
			if (!encoder.visited) {
				this._certificateEncoders.delete(id);
				continue;
			}
			visited = true;
		}

		return visited;
	}
}