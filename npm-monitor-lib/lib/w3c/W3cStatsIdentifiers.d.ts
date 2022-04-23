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
    csrc = "csrc",
    peerConnection = "peer-connection",
    dataChannel = "data-channel",
    stream = "stream",
    track = "track",
    transceiver = "transceiver",
    sender = "sender",
    receiver = "receiver",
    transport = "transport",
    sctpTransport = "sctp-transport",
    candidatePair = "candidate-pair",
    localCandidate = "local-candidate",
    remoteCandidate = "remote-candidate",
    certificate = "certificate",
    iceServer = "ice-server"
}
export declare type RtcMediaSourceCompoundStats = RtcAudioSourceStats | RtcVideoSourceStats;
export declare type RtcSenderCompoundStats = RtcAudioSenderStats | RtcVideoSenderStats;
export declare type RtcReceiverCompoundStats = RtcAudioReceiverStats | RtcVideoReceiverStats;
export declare type RtcLocalCandidateStats = RtcIceCandidateStats;
export declare type RtcRemoteCandidateStats = RtcIceCandidateStats;
export interface RtcStats {
    id: string;
    type: string;
    timestamp: number;
}
export declare type RtcMediaKind = "audio" | "video";
export interface RtcRtpStreamStats extends RtcStats {
    ssrc: number;
    kind: RtcMediaKind;
    transportId?: string;
    codecId?: string;
}
export declare type RtcCodecType = "encode" | "decode";
export interface RtcCodecStats extends RtcStats {
    payloadType: string;
    codecType: RtcCodecType;
    transportId: string;
    mimeType: string;
    clockRate?: number;
    channels?: number;
    sdpFmtpLine?: string;
}
export interface RtcReceivedRtpStreamStats extends RtcRtpStreamStats {
    packetsReceived?: number;
    packetsLost?: number;
    jitter?: number;
    packetsDiscarded?: number;
    packetsRepaired?: number;
    burstPacketsLost?: number;
    burstPacketsDiscarded?: number;
    burstLossCount?: number;
    burstDiscardCount?: number;
    burstLossRate?: number;
    burstDiscardRate?: number;
    gapLossRate?: number;
    gapDiscardRate?: number;
    framesDropped?: number;
    partialFramesLost?: number;
    fullFramesLost?: number;
}
export declare type DscpPacketStats = Record<string, number>;
export interface RtcInboundRtpStreamStats extends RtcReceivedRtpStreamStats {
    receiverId: string;
    remoteId?: string;
    framesDecoded?: number;
    keyFramesDecoded?: number;
    frameWidth?: number;
    frameHeight?: number;
    frameBitDepth?: number;
    framesPerSecond?: number;
    qpSum?: number;
    totalDecodeTime?: number;
    totalInterFrameDelay?: number;
    totalSquaredInterFrameDelay?: number;
    voiceActivityFlag?: boolean;
    lastPacketReceivedTimestamp?: number;
    averageRtcpInterval?: number;
    headerBytesReceived?: number;
    fecPacketsReceived?: number;
    fecPacketsDiscarded?: number;
    bytesReceived?: number;
    packetsFailedDecryption?: number;
    packetsDuplicated?: number;
    perDscpPacketsReceived?: DscpPacketStats;
    firCount?: number;
    pliCount?: number;
    nackCount?: number;
    sliCount?: number;
    totalProcessingDelay?: number;
    estimatedPlayoutTimestamp?: number;
    jitterBufferDelay?: number;
    jitterBufferEmittedCount?: number;
    totalSamplesReceived?: number;
    totalSamplesDecoded?: number;
    samplesDecodedWithSilk?: number;
    samplesDecodedWithCelt?: number;
    concealedSamples?: number;
    silentConcealedSamples?: number;
    concealmentEvents?: number;
    insertedSamplesForDeceleration?: number;
    removedSamplesForAcceleration?: number;
    audioLevel?: number;
    totalAudioEnergy?: number;
    totalSamplesDuration?: number;
    framesReceived?: number;
    decoderImplementation?: string;
}
export interface RtcRemoteInboundRtpStreamStats extends RtcReceivedRtpStreamStats {
    localId?: string;
    roundTripTime?: number;
    totalRoundTripTime?: number;
    fractionLost?: number;
    reportsReceived?: number;
    roundTripTimeMeasurements?: number;
}
export interface RtcSentRtpStreamStats extends RtcRtpStreamStats {
    packetsSent?: number;
    bytesSent?: number;
}
export declare type RtcQualityLimitationReason = "none" | "cpu" | "bandwidth" | "other";
export declare type RtcQualityLimitationDurations = {
    none?: number;
    cpu?: number;
    bandwidth?: number;
    other?: number;
};
export interface RtcOutboundRTPStreamStats extends RtcSentRtpStreamStats {
    rtxSsrc?: number;
    mediaSourceId?: string;
    senderId?: string;
    remoteId?: string;
    rid?: string;
    lastPacketSentTimestamp?: number;
    headerBytesSent?: number;
    packetsDiscardedOnSend?: number;
    bytesDiscardedOnSend?: number;
    fecPacketsSent?: number;
    retransmittedPacketsSent?: number;
    retransmittedBytesSent?: number;
    targetBitrate?: number;
    totalEncodedBytesTarget?: number;
    frameWidth?: number;
    frameHeight?: number;
    frameBitDepth?: number;
    framesPerSecond?: number;
    framesSent?: number;
    hugeFramesSent?: number;
    framesEncoded?: number;
    keyFramesEncoded?: number;
    framesDiscardedOnSend?: number;
    qpSum?: number;
    totalSamplesSent?: number;
    samplesEncodedWithSilk?: number;
    samplesEncodedWithCelt?: number;
    voiceActivityFlag?: boolean;
    totalEncodeTime?: number;
    totalPacketSendDelay?: number;
    averageRtcpInterval?: number;
    qualityLimitationReason?: RtcQualityLimitationReason;
    qualityLimitationDurations?: RtcQualityLimitationDurations;
    qualityLimitationResolutionChanges?: number;
    perDscpPacketsSent?: DscpPacketStats;
    nackCount?: number;
    firCount?: number;
    pliCount?: number;
    sliCount?: number;
    encoderImplementation?: string;
}
export interface RtcRemoteOutboundRTPStreamStats extends RtcSentRtpStreamStats {
    localId?: string;
    remoteTimestamp?: number;
    reportsSent?: number;
    roundTripTime?: number;
    totalRoundTripTime?: number;
    roundTripTimeMeasurements?: number;
}
export interface RtcMediaSourceStats extends RtcStats {
    trackIdentifier: string;
    kind: RtcMediaKind;
    relayedSource?: boolean;
}
export interface RtcAudioSourceStats extends RtcMediaHandlerStats {
    audioLevel?: number;
    totalAudioEnergy?: number;
    totalSamplesDuration?: number;
    echoReturnLoss?: number;
    echoReturnLossEnhancement?: number;
}
export interface RtcVideoSourceStats extends RtcMediaSourceStats {
    width?: number;
    height?: number;
    bitDepth?: number;
    frames?: number;
    framesPerSecond?: number;
}
export interface RtcRtpContributingSourceStats extends RtcStats {
    contributorSsrc: number;
    inboundRtpStreamId: string;
    packetsContributedTo?: number;
    audioLevel?: number;
}
export interface RtcPeerConnectionStats extends RtcStats {
    dataChannelsOpened?: number;
    dataChannelsClosed?: number;
    dataChannelsRequested?: number;
    dataChannelsAccepted?: number;
}
export interface RtcRtpTransceiverStats extends RtcStats {
    senderId: string;
    receiverId: string;
    mid?: string;
}
export interface RtcMediaHandlerStats extends RtcStats {
    trackIdentifier?: string;
    ended?: boolean;
    kind: RtcMediaKind;
}
export interface RtcVideoHandlerStats extends RtcMediaHandlerStats {
}
export interface RtcVideoSenderStats extends RtcVideoHandlerStats {
    mediaSourceId?: string;
}
export interface RtcVideoReceiverStats extends RtcVideoHandlerStats {
}
export interface RtcAudioHandlerStats extends RtcMediaHandlerStats {
}
export interface RtcAudioSenderStats extends RtcAudioHandlerStats {
    mediaSourceId?: string;
}
export interface RtcAudioReceiverStats extends RtcAudioHandlerStats {
}
export declare type RtcDataChannelState = "connecting" | "open" | "closing" | "closed";
export interface RtcDataChannelStats extends RtcStats {
    label?: string;
    protocol?: string;
    dataChannelIdentifier?: number;
    state: RtcDataChannelState;
    messagesSent?: number;
    bytesSent?: number;
    messagesReceived?: number;
    bytesReceived?: number;
}
export declare type RtcIceRole = "unknown" | "controlling" | "controlled";
export declare type RtcDtlsTransportState = "closed" | "connected" | "connecting" | "failed" | "new";
export declare type RtcIceTransportState = "closed" | "connected" | "failed" | "new" | "checking" | "completed" | "disconnected";
export interface RtcTransportStats extends RtcStats {
    packetsSent?: number;
    packetsReceived?: number;
    bytesSent?: number;
    bytesReceived?: number;
    rtcpTransportStatsId?: string;
    iceRole?: RtcIceRole;
    iceLocalUsernameFragment?: string;
    dtlsState: RtcDtlsTransportState;
    iceState?: RtcIceTransportState;
    selectedCandidatePairId?: string;
    localCertificateId?: string;
    remoteCertificateId?: string;
    tlsVersion?: string;
    dtlsCipher?: string;
    srtpCipher?: string;
    tlsGroup?: string;
    selectedCandidatePairChanges?: number;
}
export interface RtcSctpTransportStats extends RtcStats {
    transportId?: string;
    smoothedRoundTripTime?: number;
    congestionWindow?: number;
    receiverWindow?: number;
    mtu?: number;
    unackData?: number;
}
export declare type RtcIceCandidateType = "host" | "prflx" | "relay" | "srflx";
export declare type RtcTransportProtocol = "udp" | "tcp";
export declare type RtcRelayProtocol = "udp" | "tcp" | "tls";
export interface RtcIceCandidateStats extends RtcStats {
    transportId: string;
    address?: string;
    port?: number;
    protocol?: RtcTransportProtocol;
    candidateType: RtcIceCandidateType;
    priority?: number;
    url?: string;
    relayProtocol?: RtcRelayProtocol;
}
export declare type RtcStatsIceCandidatePairState = "failed" | "cancelled" | "frozen" | "inprogress" | "succeeded" | "waiting";
export interface RtcIceCandidatePairStats extends RtcStats {
    transportId: string;
    localCandidateId: string;
    remoteCandidateId: string;
    state: RtcStatsIceCandidatePairState;
    nominated?: boolean;
    packetsSent?: number;
    packetsReceived?: number;
    bytesSent?: number;
    bytesReceived?: number;
    lastPacketSentTimestamp?: number;
    lastPacketReceivedTimestamp?: number;
    firstRequestTimestamp?: number;
    lastRequestTimestamp?: number;
    lastResponseTimestamp?: number;
    totalRoundTripTime?: number;
    currentRoundTripTime?: number;
    availableOutgoingBitrate?: number;
    availableIncomingBitrate?: number;
    circuitBreakerTriggerCount?: number;
    requestsReceived?: number;
    requestsSent?: number;
    responsesReceived?: number;
    responsesSent?: number;
    retransmissionReceived?: number;
    retransmissionSent?: number;
    consentRequestsSent?: number;
    consentExpiredTimestamp?: number;
    packetsDiscardedOnSend?: number;
    bytesDiscardedOnSend?: number;
    requestBytesSent?: number;
    consentRequestBytesSent?: number;
    responseBytesSent?: number;
}
export interface RtcCertificateStats extends RtcStats {
    fingerprint: string;
    fingerprintAlgorithm: string;
    base64Certificate: string;
    issuerCertificateId?: string;
}
export interface RtcIceServerStats extends RtcStats {
    url: string;
    port?: number;
    relayProtocol?: RtcRelayProtocol;
    totalRequestsSent?: number;
    totalResponsesReceived?: number;
    totalRoundTripTime?: number;
}
export {};
//# sourceMappingURL=W3cStatsIdentifiers.d.ts.map