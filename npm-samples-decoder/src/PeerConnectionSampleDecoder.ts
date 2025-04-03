import { 
    Decoder,
    NumberToNumberDecoder,
    AttachmentDecoder,
    bytesArrayToString,
    uuidByteArrayToString,
    OneTimePassUuidByteArrayToStringDecoder,
    OneTimePassByteArrayToStringDecoder
  } from "./utils";
  import { PeerConnectionSample as OutputPeerConnectionSample } from "./OutputSamples";
  import { ClientSample_PeerConnectionSample as InputPeerConnectionSample } from "./InputSamples";
import { CertificateDecoder } from "./CertificateDecoder";
import { ClientSampleDecoder } from "./ClientSampleDecoder";
import { CodecStatsDecoder } from "./CodecStatsDecoder";
import { DataChannelDecoder } from "./DataChannelDecoder";
import { IceCandidateDecoder } from "./IceCandidateDecoder";
import { IceCandidatePairDecoder } from "./IceCandidatePairStatsDecoder";
import { IceTransportDecoder } from "./IceTransportDecoder";
import { InboundRtpDecoder } from "./InboundRtpDecoder";
import { InboundTrackDecoder } from "./InboundTrackDecoder";
import { MediaPlayoutStatsDecoder } from "./MediaPlayoutDecoder";
import { MediaSourceStatsDecoder } from "./MediaSourceDecoder";
import { OutboundRtpDecoder } from "./OutboundRtpDecoder";
import { OutboundTrackDecoder } from "./OutboundTrackDecoder";
import { PeerConnectionTransportDecoder } from "./PeerConnectionTransportDecoder";
import { RemoteInboundRtpDecoder } from "./RemoteInboundRtpDecoder";
import { RemoteOutboundRtpDecoder } from "./RemoteOutboundRtpDecoder";
  
  const logger = console;
  
  export class PeerConnectionSampleDecoder implements Decoder<InputPeerConnectionSample, OutputPeerConnectionSample | undefined> {
    private _visited = false;
  
    private _attachmentsDecoder: AttachmentDecoder;
    private _scoreDecoder = new NumberToNumberDecoder();
    private _inboundTracksDecoders = new Map<string, InboundTrackDecoder>();
    private _outboundTracksDecoders = new Map<string, OutboundTrackDecoder>();
    private _codecStatsDecoders = new Map<string, CodecStatsDecoder>();
    private _inboundRtpDecoders = new Map<bigint, InboundRtpDecoder>();
    private _remoteInboundRtpDecoders = new Map<bigint, RemoteInboundRtpDecoder>();
    private _outboundRtpDecoders = new Map<bigint, OutboundRtpDecoder>();
    private _remoteOutboundRtpDecoders = new Map<bigint, RemoteOutboundRtpDecoder>();
    private _mediaSourceDecoders = new Map<string, MediaSourceStatsDecoder>();
    private _mediaPlayoutDecoders = new Map<string, MediaPlayoutStatsDecoder>();
    private _peerConnectionTransportDecoders = new Map<string, PeerConnectionTransportDecoder>();
    private _dataChannelDecoders = new Map<string, DataChannelDecoder>();
    private _iceTransportDecoders = new Map<string, IceTransportDecoder>();
    private _iceCandidateDecoders = new Map<string, IceCandidateDecoder>();
    private _iceCandidatePairDecoders = new Map<string, IceCandidatePairDecoder>();
    private _certificateDecoders = new Map<string, CertificateDecoder>();

    private _actualValue: OutputPeerConnectionSample | undefined = undefined;
  
    constructor(
      public readonly peerConnectionId: string,
      public parent: ClientSampleDecoder,
    ) {
      this._attachmentsDecoder = this.parent.attachmentDecoderFactory.createPeerConnectionSampleAttachmentDecoder();
    }
  
    public get visited(): boolean {
      const result = this._visited;
      this._visited = false;
      return result;
    }
  
    public reset(): void {
      this._attachmentsDecoder.reset();
      this._scoreDecoder.reset();
      this._inboundTracksDecoders.forEach(decoder => decoder.reset());
      this._outboundTracksDecoders.forEach(decoder => decoder.reset());
      this._codecStatsDecoders.forEach(decoder => decoder.reset());
      this._inboundRtpDecoders.forEach(decoder => decoder.reset());
      this._remoteInboundRtpDecoders.forEach(decoder => decoder.reset());
      this._outboundRtpDecoders.forEach(decoder => decoder.reset());
      this._remoteOutboundRtpDecoders.forEach(decoder => decoder.reset());
      this._mediaSourceDecoders.forEach(decoder => decoder.reset());
      this._mediaPlayoutDecoders.forEach(decoder => decoder.reset());
      this._peerConnectionTransportDecoders.forEach(decoder => decoder.reset());
      this._dataChannelDecoders.forEach(decoder => decoder.reset());
      this._iceTransportDecoders.forEach(decoder => decoder.reset());
      this._iceCandidateDecoders.forEach(decoder => decoder.reset());
      this._iceCandidatePairDecoders.forEach(decoder => decoder.reset());
      this._certificateDecoders.forEach(decoder => decoder.reset());
    }
  
    public decode(input: InputPeerConnectionSample): OutputPeerConnectionSample | undefined {
        this._visited = true;

        if (!input.peerConnectionId) {
        logger.warn("Invalid peer connection sample: missing peerConnectionId");
        return undefined;
        }

        const score = this._scoreDecoder.decode(input.score);
        const attachments = this._attachmentsDecoder.decode(input.attachments);

        this._actualValue = {
            peerConnectionId: this.peerConnectionId,
            attachments,
            score,
            inboundTracks: input.inboundTracks?.map(track => this._decodeInboundTrack(track)).filter(Boolean) as OutputPeerConnectionSample['inboundTracks'],
            outboundTracks: input.outboundTracks?.map(track => this._decodeOutboundTrack(track)).filter(Boolean) as OutputPeerConnectionSample['outboundTracks'],
            codecs: input.codecs?.map(codec => this._decodeCodecStats(codec)).filter(Boolean) as OutputPeerConnectionSample['codecs'],
            inboundRtps: input.inboundRtps?.map(rtp => this._decodeInboundRtp(rtp)).filter(Boolean) as OutputPeerConnectionSample['inboundRtps'],
            remoteInboundRtps: input.remoteInboundRtps?.map(rtp => this._decodeRemoteInboundRtp(rtp)).filter(Boolean) as OutputPeerConnectionSample['remoteInboundRtps'],
            outboundRtps: input.outboundRtps?.map(rtp => this._decodeOutboundRtp(rtp)).filter(Boolean) as OutputPeerConnectionSample['outboundRtps'],
            remoteOutboundRtps: input.remoteOutboundRtps?.map(rtp => this._decodeRemoteOutboundRtp(rtp)).filter(Boolean) as OutputPeerConnectionSample['remoteOutboundRtps'],
            mediaSources: input.mediaSources?.map(source => this._decodeMediaSource(source)).filter(Boolean) as OutputPeerConnectionSample['mediaSources'],
            mediaPlayouts: input.mediaPlayouts?.map(playout => this._decodeMediaPlayout(playout)).filter(Boolean) as OutputPeerConnectionSample['mediaPlayouts'],
            peerConnectionTransports: input.peerConnectionTransports?.map(transport => this._decodePeerConnectionTransport(transport)).filter(Boolean) as OutputPeerConnectionSample['peerConnectionTransports'],
            dataChannels: input.dataChannels?.map(channel => this._decodeDataChannel(channel)).filter(Boolean) as OutputPeerConnectionSample['dataChannels'],
            iceTransports: input.iceTransports?.map(transport => this._decodeIceTransport(transport)).filter(Boolean) as OutputPeerConnectionSample['iceTransports'],
            iceCandidates: input.iceCandidates?.map(candidate => this._decodeIceCandidate(candidate)).filter(Boolean) as OutputPeerConnectionSample['iceCandidates'],
            iceCandidatePairs: input.iceCandidatePairs?.map(pair => this._decodeIceCandidatePair(pair)).filter(Boolean) as OutputPeerConnectionSample['iceCandidatePairs'],
            certificates: input.certificates?.map(cert => this._decodeCertificate(cert)).filter(Boolean) as OutputPeerConnectionSample['certificates'],
        };

        return this._actualValue;
    }

    public get actualValue(): OutputPeerConnectionSample | undefined {
        return this._actualValue;
    }

    public set actualValue(sample: OutputPeerConnectionSample | undefined) {
        // logger.warn("Invalid sample: missing sample", sample);

        if (!sample) return;
        
        this._visited = true;

        this._attachmentsDecoder.actualValue = sample.attachments;
        this._scoreDecoder.actualValue = sample.score;

        this._inboundTracksDecoders.clear();
        for (const obj of sample.inboundTracks ?? []) {
            const decoder = this._getOrCreateInboundTrackDecoder(obj.id);

            decoder.actualValue = obj;
        }

        this._outboundTracksDecoders.clear();
        for (const obj of sample.outboundTracks ?? []) {
            const decoder = this._getOrOutboundTrackDecoder(obj.id);

            decoder.actualValue = obj;
        }

        this._codecStatsDecoders.clear();
        for (const obj of sample.codecs ?? []) {
            const decoder = this._getOrCodecStatsDecoder(obj.id);

            decoder.actualValue = obj;
        }

        this._inboundRtpDecoders.clear();
        for (const obj of sample.inboundRtps ?? []) {
            const decoder = this._getOrCreateInboundRtpDecoder(BigInt(obj.ssrc));

            decoder.actualValue = obj;
        }

        this._remoteInboundRtpDecoders.clear();
        for (const obj of sample.remoteInboundRtps ?? []) {
            const decoder = this._getOrCreateRemoteInboundRtpDecoder(BigInt(obj.ssrc));

            decoder.actualValue = obj;
        }

        this._outboundRtpDecoders.clear();
        for (const obj of sample.outboundRtps ?? []) {
            const decoder = this._getOrCreateOutboundRtpDecoder(BigInt(obj.ssrc));

            decoder.actualValue = obj;
        }

        this._remoteOutboundRtpDecoders.clear();
        for (const obj of sample.remoteOutboundRtps ?? []) {
            const decoder = this._getOrCreateRemoteOutboundRtpDecoder(BigInt(obj.ssrc));

            decoder.actualValue = obj;
        }

        this._mediaSourceDecoders.clear();
        for (const obj of sample.mediaSources ?? []) {
            const decoder = this._getOrCreateMediaSourceDecoder(obj.id);

            decoder.actualValue = obj;
        }

        this._mediaPlayoutDecoders.clear();
        for (const obj of sample.mediaPlayouts ?? []) {
            const decoder = this._getOrCreateMediaPlayoutDecoder(obj.id);

            decoder.actualValue = obj;
        }

        this._peerConnectionTransportDecoders.clear();
        for (const obj of sample.peerConnectionTransports ?? []) {
            const decoder = this._getOrCreatePeerConnectionTransportDecoder(obj.id);

            decoder.actualValue = obj;
        }

        this._dataChannelDecoders.clear();
        for (const obj of sample.dataChannels ?? []) {
            const decoder = this._getOrCreateDataChannelDecoder(obj.id);

            decoder.actualValue = obj;
        }

        this._iceTransportDecoders.clear();
        for (const obj of sample.iceTransports ?? []) {
            const decoder = this._getOrCreateIceTransportDecoder(obj.id);

            decoder.actualValue = obj;
        }

        this._iceCandidateDecoders.clear();
        for (const obj of sample.iceCandidates ?? []) {
            const decoder = this._getOrCreateIceCandidateDecoder(obj.id);

            decoder.actualValue = obj;
        }

        this._iceCandidatePairDecoders.clear();
        for (const obj of sample.iceCandidatePairs ?? []) {
            const decoder = this._getOrCreateIceCandidatePairDecoder(obj.id);

            decoder.actualValue = obj;
        }

        this._certificateDecoders.clear();
        for (const obj of sample.certificates ?? []) {
            const decoder = this._getOrCertificateDecoder(obj.id);

            decoder.actualValue = obj;
        }

        // logger.warn("PeerConnectionSampleDecoder: actualValue set", sample, this);
    }
  
    private _decodeCodecStats(input: Required<InputPeerConnectionSample>['codecs'][number]) {
        if (input.id === undefined) return logger.warn("Invalid codec stats sample: missing id", input);

        const decoder = this._getOrCodecStatsDecoder(input.id);
        
        return decoder.decode(input);
    }

    private _decodeInboundTrack(input: Required<InputPeerConnectionSample>['inboundTracks'][number]) {
        if (input.id === undefined) return logger.warn("Invalid inbound track sample: missing id", input);

        const decoder = this._getOrCreateInboundTrackDecoder(input.id);

        return decoder.decode(input);
    }

    private _decodeOutboundTrack(input: Required<InputPeerConnectionSample>['outboundTracks'][number]) {
        if (input.id === undefined) return logger.warn("Invalid outbound track sample: missing id", input);

        const decoder = this._getOrOutboundTrackDecoder(input.id);

        return decoder.decode(input);
    }

    private _decodeCertificate(input: Required<InputPeerConnectionSample>['certificates'][number]) {
        if (input.id === undefined) return logger.warn("Invalid certificate sample: missing id", input);

        const decoder = this._getOrCertificateDecoder(input.id);

        return decoder.decode(input);
    }

    private _decodeInboundRtp(input: Required<InputPeerConnectionSample>['inboundRtps'][number]) {
        if (input.ssrc === undefined) return logger.warn("Invalid inbound RTP sample: missing id", input);

        const decoder = this._getOrCreateInboundRtpDecoder(input.ssrc);

        return decoder.decode(input);
    }

    private _decodeOutboundRtp(input: Required<InputPeerConnectionSample>['outboundRtps'][number]) {
        if (input.ssrc === undefined) return logger.warn("Invalid outbound RTP sample: missing id", input);

        const decoder = this._getOrCreateOutboundRtpDecoder(input.ssrc);

        return decoder.decode(input);
    }

    private _decodeRemoteInboundRtp(input: Required<InputPeerConnectionSample>['remoteInboundRtps'][number]) {
        if (input.ssrc === undefined) return logger.warn("Invalid remote inbound RTP sample: missing id", input);

        const decoder = this._getOrCreateRemoteInboundRtpDecoder(input.ssrc);
        
        return decoder.decode(input);
    }

    private _decodeRemoteOutboundRtp(input: Required<InputPeerConnectionSample>['remoteOutboundRtps'][number]) {
        if (input.ssrc === undefined) return logger.warn("Invalid remote outbound RTP sample: missing id", input);

        const decoder = this._getOrCreateRemoteOutboundRtpDecoder(input.ssrc);

        return decoder.decode(input);
    }

    private _decodeMediaSource(input: Required<InputPeerConnectionSample>['mediaSources'][number]) {
        if (input.id === undefined) return logger.warn("Invalid media source sample: missing id", input);

        const decoder = this._getOrCreateMediaSourceDecoder(input.id);

        return decoder.decode(input);
    }

    private _decodeMediaPlayout(input: Required<InputPeerConnectionSample>['mediaPlayouts'][number]) {
        if (input.id === undefined) return logger.warn("Invalid media playout sample: missing id", input);

        const decoder = this._getOrCreateMediaPlayoutDecoder(input.id);

        return decoder.decode(input);
    }

    private _decodePeerConnectionTransport(input: Required<InputPeerConnectionSample>['peerConnectionTransports'][number]) {
        if (input.id === undefined) return logger.warn("Invalid peer connection transport sample: missing id", input);

        const decoder = this._getOrCreatePeerConnectionTransportDecoder(input.id);

        return decoder.decode(input);
    }

    private _decodeDataChannel(input: Required<InputPeerConnectionSample>['dataChannels'][number]) {
        if (input.id === undefined) return logger.warn("Invalid data channel sample: missing id", input);

        const decoder = this._getOrCreateDataChannelDecoder(input.id);

        return decoder.decode(input);
    }

    private _decodeIceTransport(input: Required<InputPeerConnectionSample>['iceTransports'][number]) {
        if (input.id === undefined) return logger.warn("Invalid ICE transport sample: missing id", input);

        const decoder = this._getOrCreateIceTransportDecoder(input.id);

        return decoder.decode(input);
    }

    private _decodeIceCandidate(input: Required<InputPeerConnectionSample>['iceCandidates'][number]) {
        if (input.id === undefined) return logger.warn("Invalid ICE candidate sample: missing id", input);

        const decoder = this._getOrCreateIceCandidateDecoder(input.id);

        return decoder.decode(input);
    }

    private _decodeIceCandidatePair(input: Required<InputPeerConnectionSample>['iceCandidatePairs'][number]) {
        if (input.id === undefined) return logger.warn("Invalid ICE candidate pair sample: missing id", input);

        const decoder = this._getOrCreateIceCandidatePairDecoder(input.id);

        return decoder.decode(input);
    }

    private _getOrCreateInboundRtpDecoder(ssrc: bigint) {

        let decoder = this._inboundRtpDecoders.get(ssrc);

        if (!decoder) {
            const trackIdEncoder = this.parent.settings.trackIdIsUuid ? 
                new OneTimePassUuidByteArrayToStringDecoder() :
                new OneTimePassByteArrayToStringDecoder();
            decoder = new InboundRtpDecoder(
                Number(ssrc),
                trackIdEncoder,
                this.parent.attachmentDecoderFactory.createInboundRtpAttachmentDecoder(),
            );

            this._inboundRtpDecoders.set(ssrc, decoder);
        }

        return decoder;
    }

    private _getOrCreateRemoteInboundRtpDecoder(ssrc: bigint) {
        let decoder = this._remoteInboundRtpDecoders.get(ssrc);

        if (!decoder) {
            decoder = new RemoteInboundRtpDecoder(
                Number(ssrc),
                this.parent.attachmentDecoderFactory.createRemoteInboundRtpAttachmentDecoder(),
            );

            this._remoteInboundRtpDecoders.set(ssrc, decoder);
        }

        return decoder;
    }

    private _getOrCreateOutboundRtpDecoder(ssrc: bigint) {
        let decoder = this._outboundRtpDecoders.get(ssrc);

        if (!decoder) {
            decoder = new OutboundRtpDecoder(
                Number(ssrc),
                this.parent.attachmentDecoderFactory.createOutboundRtpAttachmentDecoder(),
            );

            this._outboundRtpDecoders.set(ssrc, decoder);
        }

        return decoder;
    }

    private _getOrCreateRemoteOutboundRtpDecoder(ssrc: bigint) {
        let decoder = this._remoteOutboundRtpDecoders.get(ssrc);

        if (!decoder) {
            decoder = new RemoteOutboundRtpDecoder(
                Number(ssrc),
                this.parent.attachmentDecoderFactory.createRemoteOutboundRtpAttachmentDecoder(),
            );

            this._remoteOutboundRtpDecoders.set(ssrc, decoder);
        }

        return decoder;
    }

    private _getOrCreateMediaPlayoutDecoder(id: string) {
        let decoder = this._mediaPlayoutDecoders.get(id);

        if (!decoder) {
            decoder = new MediaPlayoutStatsDecoder(
                id,
                this.parent.attachmentDecoderFactory.createMediaPlayoutAttachmentDecoder()
            );
            this._mediaPlayoutDecoders.set(id, decoder);
        }

        return decoder;
    }

    private _getOrCreateMediaSourceDecoder(id: string) {
        let decoder = this._mediaSourceDecoders.get(id);

        if (!decoder) {
            decoder = new MediaSourceStatsDecoder(
                id,
                this.parent.attachmentDecoderFactory.createMediaSourceAttachmentDecoder()
            );
            this._mediaSourceDecoders.set(id, decoder);
        }

        return decoder;
    }

    private _getOrCreatePeerConnectionTransportDecoder(id: string) {
        let decoder = this._peerConnectionTransportDecoders.get(id);

        if (!decoder) {
            decoder = new PeerConnectionTransportDecoder(
                id,
                this.parent.attachmentDecoderFactory.createPeerConnectionTransportAttachmentDecoder()
            );
            this._peerConnectionTransportDecoders.set(id, decoder);
        }

        return decoder;
    }

    private _getOrCreateIceTransportDecoder(id: string) {
        let decoder = this._iceTransportDecoders.get(id);

        if (!decoder) {
            decoder = new IceTransportDecoder(
                id,
                this.parent.attachmentDecoderFactory.createIceTransportAttachmentDecoder()
            );
            this._iceTransportDecoders.set(id, decoder);
        }

        return decoder;
    }

    private _getOrCreateIceCandidateDecoder(id: string) {
        let decoder = this._iceCandidateDecoders.get(id);

        if (!decoder) {
            decoder = new IceCandidateDecoder(
                id,
                this.parent.attachmentDecoderFactory.createIceCandidateAttachmentDecoder()
            );
            this._iceCandidateDecoders.set(id, decoder);
        }

        return decoder;
    }

    private _getOrCreateIceCandidatePairDecoder(id: string) {
        let decoder = this._iceCandidatePairDecoders.get(id);

        if (!decoder) {
            decoder = new IceCandidatePairDecoder(
                id,
                this.parent.attachmentDecoderFactory.createIceCandidatePairAttachmentDecoder()
            );
            this._iceCandidatePairDecoders.set(id, decoder);
        }

        return decoder;
    }

    private _getOrCertificateDecoder(id: string) {
        let decoder = this._certificateDecoders.get(id);

        if (!decoder) {
            decoder = new CertificateDecoder(
                id,
                this.parent.attachmentDecoderFactory.createCertificateAttachmentDecoder()
            );
            this._certificateDecoders.set(id, decoder);
        }

        return decoder;
    }

    private _getOrCreateDataChannelDecoder(id: string) {
        let decoder = this._dataChannelDecoders.get(id);

        if (!decoder) {
            decoder = new DataChannelDecoder(
                id,
                this.parent.attachmentDecoderFactory.createDataChannelAttachmentDecoder()
            );
            this._dataChannelDecoders.set(id, decoder);
        }

        return decoder;
    }

    private _getOrCodecStatsDecoder(id: string) {
        let decoder = this._codecStatsDecoders.get(id);

        if (!decoder) {
            decoder = new CodecStatsDecoder(
                id,
                this.parent.attachmentDecoderFactory.createCodecStatsAttachmentDecoder()
            );
            this._codecStatsDecoders.set(id, decoder);
        }

        return decoder;
    }

    private _getOrCreateInboundTrackDecoder(id: string) {
        let decoder = this._inboundTracksDecoders.get(id);

        if (!decoder) {
            decoder = new InboundTrackDecoder(
                id,
                this.parent.attachmentDecoderFactory.createInboundTrackAttachmentDecoder()
            );
            this._inboundTracksDecoders.set(id, decoder);
        }

        return decoder;
    }

    private _getOrOutboundTrackDecoder(id: string) {
        let decoder = this._outboundTracksDecoders.get(id);

        if (!decoder) {
            decoder = new OutboundTrackDecoder(
                id,
                this.parent.attachmentDecoderFactory.createOutboundTrackAttachmentDecoder()
            );
            this._outboundTracksDecoders.set(id, decoder);
        }

        return decoder;
    }
  
  
    public checkVisitsAndClean() {
      let visited = false;
  
      const cleanUnvisited = <K, T>(map: Map<K, T & { visited: boolean }>) => {
        for (const [id, decoder] of [...map.entries()]) {
          if (!decoder.visited) {
            map.delete(id);
            continue;
          }
          visited = true;
        }
      };
  
      cleanUnvisited(this._inboundTracksDecoders);
      cleanUnvisited(this._outboundTracksDecoders);
      cleanUnvisited(this._codecStatsDecoders);
      cleanUnvisited(this._inboundRtpDecoders);
      cleanUnvisited(this._remoteInboundRtpDecoders);
      cleanUnvisited(this._outboundRtpDecoders);
      cleanUnvisited(this._remoteOutboundRtpDecoders);
      cleanUnvisited(this._mediaSourceDecoders);
      cleanUnvisited(this._mediaPlayoutDecoders);
      cleanUnvisited(this._peerConnectionTransportDecoders);
      cleanUnvisited(this._dataChannelDecoders);
      cleanUnvisited(this._iceTransportDecoders);
      cleanUnvisited(this._iceCandidateDecoders);
      cleanUnvisited(this._iceCandidatePairDecoders);
      cleanUnvisited(this._certificateDecoders);
  
      return visited;
    }
  }