export const schema = {
  "type": "record",
  "name": "InboundAudioTrackReport",
  "namespace": "org.observertc.schemas.reports",
  "doc": "A Report created for Inbound Audio Tracks. A combination of Codec metadata carrying inbound and remote outbound RTP stats measurements",
  "fields": [
    {
      "name": "serviceId",
      "doc": "The unique identifier of the service",
      "type": "string"
    },
    {
      "name": "mediaUnitId",
      "doc": "The media unit id the report belongs to",
      "type": "string"
    },
    {
      "name": "marker",
      "doc": "The marker the originated sample is reported with",
      "type": [
        "null",
        "string"
      ],
      "default": null
    },
    {
      "name": "timestamp",
      "doc": "The timestamp when the corresponded data is generated for the report (UTC Epoch in ms)",
      "type": "long"
    },
    {
      "name": "callId",
      "doc": "The generated unique identifier of the call",
      "type": "string"
    },
    {
      "name": "roomId",
      "doc": "webrtc app provided room id",
      "type": [
        "null",
        "string"
      ],
      "default": null
    },
    {
      "name": "clientId",
      "doc": "The generated unique identifier of the client",
      "type": "string"
    },
    {
      "name": "userId",
      "doc": "webrtc app provided user identifier",
      "type": [
        "null",
        "string"
      ],
      "default": null
    },
    {
      "name": "peerConnectionId",
      "doc": "The unique identifier of the peer connection",
      "type": "string"
    },
    {
      "name": "label",
      "doc": "The webrtc app provided label the peer connection is labeled with",
      "type": [
        "null",
        "string"
      ],
      "default": null
    },
    {
      "name": "trackId",
      "doc": "The id of the track",
      "type": [
        "null",
        "string"
      ],
      "default": null
    },
    {
      "name": "sfuStreamId",
      "doc": "The id of the Sfu stream the media from",
      "type": [
        "null",
        "string"
      ],
      "default": null
    },
    {
      "name": "sfuSinkId",
      "doc": "The id of the sink the Sfu streamed the media out",
      "type": [
        "null",
        "string"
      ],
      "default": null
    },
    {
      "name": "remoteTrackId",
      "doc": "The id of the remote track this inbound track is originated from",
      "type": [
        "null",
        "string"
      ],
      "default": null
    },
    {
      "name": "remoteUserId",
      "doc": "The webrtc app provided user id the track belongs to, or if the webrtc app did not provided the observer tried to match it",
      "type": [
        "null",
        "string"
      ],
      "default": null
    },
    {
      "name": "remoteClientId",
      "doc": "The observer matched remote client Id",
      "type": [
        "null",
        "string"
      ],
      "default": null
    },
    {
      "name": "remotePeerConnectionId",
      "doc": "The observer matched remote Peer Connection Id",
      "type": [
        "null",
        "string"
      ],
      "default": null
    },
    {
      "name": "sampleSeq",
      "doc": "The sequence number of the sample the report is generated from",
      "type": "int"
    },
    {
      "name": "ssrc",
      "doc": "The RTP SSRC field",
      "type": "long"
    },
    {
      "name": "packetsReceived",
      "doc": "The total number of packets received on the corresponded synchronization source",
      "type": [
        "null",
        "int"
      ],
      "default": null
    },
    {
      "name": "packetsLost",
      "doc": "The total number of bytes received on the corresponded synchronization source",
      "type": [
        "null",
        "int"
      ],
      "default": null
    },
    {
      "name": "jitter",
      "doc": "The corresponded synchronization source reported jitter",
      "type": [
        "null",
        "double"
      ],
      "default": null
    },
    {
      "name": "packetsDiscarded",
      "doc": "The total number of packets missed the playout point and therefore discarded by the jitterbuffer",
      "type": [
        "null",
        "int"
      ],
      "default": null
    },
    {
      "name": "packetsRepaired",
      "doc": "The total number of packets repaired by either FEC or due to retransmission on the corresponded synchronization source",
      "type": [
        "null",
        "int"
      ],
      "default": null
    },
    {
      "name": "burstPacketsLost",
      "doc": "The total number of packets lost in burst (RFC6958)",
      "type": [
        "null",
        "int"
      ],
      "default": null
    },
    {
      "name": "burstPacketsDiscarded",
      "doc": "The total number of packets discarded in burst (RFC6958)",
      "type": [
        "null",
        "int"
      ],
      "default": null
    },
    {
      "name": "burstLossCount",
      "doc": "The total number of burst happened causes burstPacketsLost on the corresponding synchronization source",
      "type": [
        "null",
        "int"
      ],
      "default": null
    },
    {
      "name": "burstDiscardCount",
      "doc": "The total number of burst happened causes burstPacketsDiscarded on the corresponding synchronization source",
      "type": [
        "null",
        "int"
      ],
      "default": null
    },
    {
      "name": "burstLossRate",
      "doc": "The fraction of RTP packets lost during bursts proportionally to the total number of RTP packets expected in the bursts on the corresponding synchronization source",
      "type": [
        "null",
        "double"
      ],
      "default": null
    },
    {
      "name": "burstDiscardRate",
      "doc": "The fraction of RTP packets discarded during bursts proportionally to the total number of RTP packets expected in the bursts on the corresponding synchronization source",
      "type": [
        "null",
        "double"
      ],
      "default": null
    },
    {
      "name": "gapLossRate",
      "doc": "The fraction of RTP packets lost during gap proportionally to the total number of RTP packets expected in the bursts on the corresponding synchronization source",
      "type": [
        "null",
        "double"
      ],
      "default": null
    },
    {
      "name": "gapDiscardRate",
      "doc": "The fraction of RTP packets discarded during gap proportionally to the total number of RTP packets expected in the bursts on the corresponding synchronization source",
      "type": [
        "null",
        "double"
      ],
      "default": null
    },
    {
      "name": "voiceActivityFlag",
      "doc": "Indicate if the last RTP packet received contained voice activity based on the presence of the V bit in the extension header",
      "type": [
        "null",
        "boolean"
      ],
      "default": null
    },
    {
      "name": "lastPacketReceivedTimestamp",
      "doc": "Represents the timestamp at which the last packet was received on the corresponded synchronization source (ssrc)",
      "type": [
        "null",
        "long"
      ],
      "default": null
    },
    {
      "name": "averageRtcpInterval",
      "doc": "The average RTCP interval between two consecutive compound RTCP packets sent for the corresponding synchronization source (ssrc)",
      "type": [
        "null",
        "double"
      ],
      "default": null
    },
    {
      "name": "headerBytesReceived",
      "doc": "Total number of RTP header and padding bytes received over the corresponding synchronization source (ssrc)",
      "type": [
        "null",
        "long"
      ],
      "default": null
    },
    {
      "name": "fecPacketsReceived",
      "doc": "Total number of FEC packets received over the corresponding synchronization source (ssrc)",
      "type": [
        "null",
        "int"
      ],
      "default": null
    },
    {
      "name": "fecPacketsDiscarded",
      "doc": "Total number of FEC packets discarded over the corresponding synchronization source (ssrc) due to 1) late arrive; 2) the target RTP packet has already been repaired.",
      "type": [
        "null",
        "int"
      ],
      "default": null
    },
    {
      "name": "bytesReceived",
      "doc": "Total number of bytes received over the corresponding synchronization source (ssrc) due to 1) late arrive; 2) the target RTP packet has already been repaired.",
      "type": [
        "null",
        "long"
      ],
      "default": null
    },
    {
      "name": "packetsFailedDecryption",
      "doc": "Total number of packets received and failed to decrypt over the corresponding synchronization source (ssrc) due to 1) late arrive; 2) the target RTP packet has already been repaired.",
      "type": [
        "null",
        "int"
      ],
      "default": null
    },
    {
      "name": "packetsDuplicated",
      "doc": "Total number of packets identified as duplicated over the corresponding synchronization source (ssrc).",
      "type": [
        "null",
        "int"
      ],
      "default": null
    },
    {
      "name": "perDscpPacketsReceived",
      "doc": "The total number of DSCP flagged RTP packets received over the corresponding synchronization source (ssrc)",
      "type": [
        "null",
        "int"
      ],
      "default": null
    },
    {
      "name": "nackCount",
      "doc": "Count the total number of Negative ACKnowledgement (NACK) packets sent and belongs to the corresponded synchronization source (ssrc)",
      "type": [
        "null",
        "int"
      ],
      "default": null
    },
    {
      "name": "totalProcessingDelay",
      "doc": "The total processing delay in seconds spend on buffering RTP packets from received up until packets are decoded",
      "type": [
        "null",
        "double"
      ],
      "default": null
    },
    {
      "name": "estimatedPlayoutTimestamp",
      "doc": "The estimated playout time of the corresponded synchronization source",
      "type": [
        "null",
        "long"
      ],
      "default": null
    },
    {
      "name": "jitterBufferDelay",
      "doc": "The total time of RTP packets spent in jitterbuffer waiting for frame completion due to network uncertenity.",
      "type": [
        "null",
        "double"
      ],
      "default": null
    },
    {
      "name": "jitterBufferEmittedCount",
      "doc": "The total number of audio samples or video frames that have come out of the jitter buffer on the corresponded synchronization source (ssrc)",
      "type": [
        "null",
        "int"
      ],
      "default": null
    },
    {
      "name": "decoderImplementation",
      "doc": "Indicate the name of the decoder implementation library",
      "type": [
        "null",
        "string"
      ],
      "default": null
    },
    {
      "name": "packetsSent",
      "doc": "Total number of RTP packets sent at the remote endpoint to this endpoint on this synchronization source",
      "type": [
        "null",
        "int"
      ],
      "default": null
    },
    {
      "name": "bytesSent",
      "doc": "Total number of payload bytes sent at the remote endpoint to this endpoint on this synchronization source",
      "type": [
        "null",
        "long"
      ],
      "default": null
    },
    {
      "name": "remoteTimestamp",
      "doc": "The timestamp corresnponds to the time in UTC Epoch the remote endpoint reported the statistics belong to the sender side and correspond to the synchronization source (ssrc)",
      "type": [
        "null",
        "long"
      ],
      "default": null
    },
    {
      "name": "reportsSent",
      "doc": "The number of SR reports the remote endpoint sent corresponded to synchronization source (ssrc) this report belongs to",
      "type": [
        "null",
        "int"
      ],
      "default": null
    },
    {
      "name": "ended",
      "doc": "Flag represents if the receiver ended the media stream track or not.",
      "type": [
        "null",
        "boolean"
      ],
      "default": null
    },
    {
      "name": "payloadType",
      "doc": "The type of the payload the RTP packet SSRC belongs to",
      "type": [
        "null",
        "int"
      ],
      "default": null
    },
    {
      "name": "mimeType",
      "doc": "the MIME type of the codec (e.g.: video/vp8)",
      "type": [
        "null",
        "string"
      ],
      "default": null
    },
    {
      "name": "clockRate",
      "doc": "The negotiated clock rate the RTP timestamp is generated of",
      "type": [
        "null",
        "int"
      ],
      "default": null
    },
    {
      "name": "channels",
      "doc": "The number of channels for audio is used (in stereo it is 2, otherwise it is most likely null)",
      "type": [
        "null",
        "int"
      ],
      "default": null
    },
    {
      "name": "sdpFmtpLine",
      "doc": "The a=fmtp line in the SDP corresponding to the codec",
      "type": [
        "null",
        "string"
      ],
      "default": null
    }
  ]
}