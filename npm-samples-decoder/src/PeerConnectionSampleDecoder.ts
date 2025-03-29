import { 
    Decoder,
    NumberToNumberDecoder,
    AttachmentDecoder,
    bytesArrayToString,
    byteArrayToUuid
  } from "./utils";
  import { CertificateStats, PeerConnectionSample as OutputPeerConnectionSample } from "./OutputSamples";
  import { ClientSample_PeerConnectionSample as InputPeerConnectionSample } from "./InputSamples";
import { CertificateDecoder } from "./CertificateDecoder";
  
  const logger = console;
  
  export class PeerConnectionSampleDecoder implements Decoder<InputPeerConnectionSample, OutputPeerConnectionSample | undefined> {
    private readonly _peerConnectionId: string;
    private _visited = false;
  
    private _attachmentsDecoder: AttachmentDecoder;
    private _scoreDecoder = new NumberToNumberDecoder();
    private _inboundTracksDecoders = new Map<string, InboundTrackSampleDecoder>();
    private _outboundTracksDecoders = new Map<string, OutboundTrackSampleDecoder>();
    private _codecStatsDecoders = new Map<string, CodecStatsDecoder>();
    private _inboundRtpDecoders = new Map<number, InboundRtpDecoder>();
    private _remoteInboundRtpDecoders = new Map<number, RemoteInboundRtpDecoder>();
    private _outboundRtpDecoders = new Map<number, OutboundRtpDecoder>();
    private _remoteOutboundRtpDecoders = new Map<number, RemoteOutboundRtpDecoder>();
    private _mediaSourceDecoders = new Map<string, MediaSourceStatsDecoder>();
    private _mediaPlayoutDecoders = new Map<string, MediaPlayoutStatsDecoder>();
    private _peerConnectionTransportDecoders = new Map<string, PeerConnectionTransportDecoder>();
    private _dataChannelDecoders = new Map<string, DataChannelDecoder>();
    private _iceTransportDecoders = new Map<string, IceTransportDecoder>();
    private _iceCandidateDecoders = new Map<string, IceCandidateDecoder>();
    private _iceCandidatePairDecoders = new Map<string, IceCandidatePairDecoder>();
    private _certificateDecoders = new Map<string, CertificateDecoder>();
  
    constructor(
      peerConnectionId: Uint8Array,
      public parent: ClientSampleDecoder,
    ) {
      this._peerConnectionId = this.parent.settings.peerConnectionIdIsUuid
        ? byteArrayToUuid(peerConnectionId)
        : bytesArrayToString(peerConnectionId);
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
  
      return {
        peerConnectionId: this._peerConnectionId,
        attachments,
        score,
        inboundTracks: input.inboundTracks?.map(track => this._decodeInboundTrack(track)).filter(Boolean),
        outboundTracks: input.outboundTracks?.map(track => this._decodeOutboundTrack(track)).filter(Boolean),
        codecs: input.codecs?.map(codec => this._decodeCodecStats(codec)).filter(Boolean),
        inboundRtps: input.inboundRtps?.map(rtp => this._decodeInboundRtp(rtp)).filter(Boolean),
        remoteInboundRtps: input.remoteInboundRtps?.map(rtp => this._decodeRemoteInboundRtp(rtp)).filter(Boolean),
        outboundRtps: input.outboundRtps?.map(rtp => this._decodeOutboundRtp(rtp)).filter(Boolean),
        remoteOutboundRtps: input.remoteOutboundRtps?.map(rtp => this._decodeRemoteOutboundRtp(rtp)).filter(Boolean),
        mediaSources: input.mediaSources?.map(source => this._decodeMediaSource(source)).filter(Boolean),
        mediaPlayouts: input.mediaPlayouts?.map(playout => this._decodeMediaPlayout(playout)).filter(Boolean),
        peerConnectionTransports: input.peerConnectionTransports?.map(transport => this._decodePeerConnectionTransport(transport)).filter(Boolean),
        dataChannels: input.dataChannels?.map(channel => this._decodeDataChannel(channel)).filter(Boolean),
        iceTransports: input.iceTransports?.map(transport => this._decodeIceTransport(transport)).filter(Boolean),
        iceCandidates: input.iceCandidates?.map(candidate => this._decodeIceCandidate(candidate)).filter(Boolean),
        iceCandidatePairs: input.iceCandidatePairs?.map(pair => this._decodeIceCandidatePair(pair)).filter(Boolean),
        certificates: input.certificates?.map(cert => this._decodeCertificate(cert)).filter(Boolean) as CertificateStats[],
      };
    }
  
    private _decodeCodecStats(input: Required<InputPeerConnectionSample>['codecs'][number]) {
      const decoder = this._getOrCreateDecoder(
        input.id,
        this._codecStatsDecoders,
        () => new CodecStatsDecoder(
          this.parent.attachmentDecoderFactory.createCodecStatsAttachmentDecoder()
        )
      );
      return decoder.decode(input);
    }
  
    private _decodeInboundTrack(input: Required<InputPeerConnectionSample>['inboundTracks'][number]) {
      const decoder = this._getOrCreateDecoder(
        input.id,
        this._inboundTracksDecoders,
        () => new InboundTrackSampleDecoder(
          this.parent.attachmentDecoderFactory.createInboundTrackAttachmentDecoder()
        )
      );
      return decoder.decode(input);
    }

    private _decodeCertificate(input: Required<InputPeerConnectionSample>['certificates'][number]) {
      const decoder = this._getOrCreateDecoder(
        input.id,
        this._certificateDecoders,
        () => new CertificateDecoder(
          this.parent.attachmentDecoderFactory.createCertificateAttachmentDecoder()
        )
      );
      return decoder.decode(input);
    }
  
    // ... similar decode methods for all other components ...
  
    private _getOrCreateDecoder<T>(
      id: string,
      decoderMap: Map<string, T>,
      createDecoder: () => T
    ): T {
      let decoder = decoderMap.get(id);
      if (!decoder) {
        decoder = createDecoder();
        decoderMap.set(id, decoder);
      }
      return decoder;
    }
  
    public checkVisitsAndClean() {
      let visited = false;
  
      const cleanUnvisited = <T>(map: Map<string, T & { visited: boolean }>) => {
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