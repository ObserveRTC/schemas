type RtcStatsVersion = {
    date: Date;
}

export const version: RtcStatsVersion = {
    date: new Date("2024-11-07"),
}

export enum StatsType {
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
    
    // Deprecated 2021
    // -----------------
    stream = "stream", 
    track = "track",

    // Deprecated 2022-09-21
    // ----------------------
    transceiver = "transceiver",
    csrc = "csrc", 
    sender = "sender", 
    receiver = "receiver", 
    sctpTransport = "sctp-transport", 
    iceServer = "ice-server",
}

// RTCStat (https://www.w3.org/TR/webrtc-stats/#dom-rtcstats)
export interface RtcStats {
    id: string;
    type: string;
    timestamp: number;
}

export type MediaKind = "audio" | "video";
