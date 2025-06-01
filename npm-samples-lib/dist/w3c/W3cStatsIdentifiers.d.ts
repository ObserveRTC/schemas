declare type RtcStatsVersion = {
    date: Date;
};
export declare const version: RtcStatsVersion;
export declare enum StatsType {
    codec = "codec",
    inboundRtp = "inbound-rtp",
    outboundRtp = "outbound-rtp",
    remoteInboundRtp = "remote-inbound-rtp",
    remoteOutboundRtp = "remote-outbound-rtp",
    mediaSource = "media-source",
    mediaPlayout = "media-playout",
    peerConnection = "peer-connection",
    dataChannel = "data-channel",
    transport = "transport",
    candidatePair = "candidate-pair",
    localCandidate = "local-candidate",
    remoteCandidate = "remote-candidate",
    certificate = "certificate",
    stream = "stream",
    track = "track",
    transceiver = "transceiver",
    csrc = "csrc",
    sender = "sender",
    receiver = "receiver",
    sctpTransport = "sctp-transport",
    iceServer = "ice-server"
}
export interface RtcStats {
    id: string;
    type: string;
    timestamp: number;
}
export declare type MediaKind = "audio" | "video";
export {};
//# sourceMappingURL=W3cStatsIdentifiers.d.ts.map