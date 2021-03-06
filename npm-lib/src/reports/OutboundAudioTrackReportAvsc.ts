export const schema = {
  "type": "record",
  "name": "OutboundAudioTrackReport",
  "namespace": "org.observertc.schemas.reports",
  "doc": "A Report created for Outbound Audio Tracks. A combination of Audio source, Codec metadata carrying outbound and remote inbound RTP stat measurements",
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
      "doc": "The id of the Sfu stream corresponds to the outbound track",
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
      "name": "packetsSent",
      "doc": "The total number of packets sent on the corresponded synchronization source",
      "type": [
        "null",
        "int"
      ],
      "default": null
    },
    {
      "name": "bytesSent",
      "doc": "The total number of bytes sent on the corresponded synchronization source",
      "type": [
        "null",
        "long"
      ],
      "default": null
    },
    {
      "name": "rid",
      "doc": " The rid encoding parameter of the corresponded synchronization source",
      "type": [
        "null",
        "string"
      ],
      "default": null
    },
    {
      "name": "lastPacketSentTimestamp",
      "doc": " the timestamp the last packet was sent. (UTC epoch in ms)",
      "type": [
        "null",
        "long"
      ],
      "default": null
    },
    {
      "name": "headerBytesSent",
      "doc": "Total number of RTP header and padding bytes sent over the corresponding synchronization source (ssrc)",
      "type": [
        "null",
        "long"
      ],
      "default": null
    },
    {
      "name": "packetsDiscardedOnSend",
      "doc": "Total number of RTP packets discarded at sender side over the corresponding synchronization source (ssrc)",
      "type": [
        "null",
        "int"
      ],
      "default": null
    },
    {
      "name": "bytesDiscardedOnSend",
      "doc": "Total number of RTP bytes discarded at sender side over the corresponding synchronization source (ssrc)",
      "type": [
        "null",
        "long"
      ],
      "default": null
    },
    {
      "name": "fecPacketsSent",
      "doc": "Total number of FEC packets sent over the corresponding synchronization source (ssrc)",
      "type": [
        "null",
        "int"
      ],
      "default": null
    },
    {
      "name": "retransmittedPacketsSent",
      "doc": "Total number of retransmitted packets sent over the corresponding synchronization source (ssrc).",
      "type": [
        "null",
        "int"
      ],
      "default": null
    },
    {
      "name": "retransmittedBytesSent",
      "doc": "Total number of retransmitted bytes sent over the corresponding synchronization source (ssrc).",
      "type": [
        "null",
        "long"
      ],
      "default": null
    },
    {
      "name": "targetBitrate",
      "doc": "Reflects the current encoder target in bits per second.",
      "type": [
        "null",
        "int"
      ],
      "default": null
    },
    {
      "name": "totalEncodedBytesTarget",
      "doc": "The total number of bytes of RTP coherent frames encoded completly depending on the frame size the encoder targets",
      "type": [
        "null",
        "long"
      ],
      "default": null
    },
    {
      "name": "totalSamplesSent",
      "doc": "The total number of samples sent over the corresponding synchronization source",
      "type": [
        "null",
        "int"
      ],
      "default": null
    },
    {
      "name": "samplesEncodedWithSilk",
      "doc": "The total number of samples encoded by SILK portion in opus sent over the corresponding synchronization source",
      "type": [
        "null",
        "int"
      ],
      "default": null
    },
    {
      "name": "samplesEncodedWithCelt",
      "doc": "The total number of samples encoded by CELT portion in opus sent over the corresponding synchronization source",
      "type": [
        "null",
        "int"
      ],
      "default": null
    },
    {
      "name": "voiceActivityFlag",
      "doc": "Indicate if the last RTP packet sent contained voice activity based on the presence of the V bit in the extension header",
      "type": [
        "null",
        "boolean"
      ],
      "default": null
    },
    {
      "name": "totalPacketSendDelay",
      "doc": "The total number of delay packets buffered at the sender side in seconds over the corresponding synchronization source",
      "type": [
        "null",
        "double"
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
      "name": "perDscpPacketsSent",
      "doc": "The total number of DSCP flagged RTP packets sent over the corresponding synchronization source (ssrc)",
      "type": [
        "null",
        "int"
      ],
      "default": null
    },
    {
      "name": "nackCount",
      "doc": "Count the total number of Negative ACKnowledgement (NACK) packets received over the corresponding synchronization source (ssrc)",
      "type": [
        "null",
        "int"
      ],
      "default": null
    },
    {
      "name": "encoderImplementation",
      "doc": "Indicate the name of the encoder implementation library",
      "type": [
        "null",
        "string"
      ],
      "default": null
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
      "name": "roundTripTime",
      "doc": "RTT measurement in seconds based on (most likely) SR, and RR belongs to the corresponded synchronization source",
      "type": [
        "null",
        "double"
      ],
      "default": null
    },
    {
      "name": "totalRoundTripTime",
      "doc": "The sum of RTT measurements belongs to the corresponded synchronization source",
      "type": [
        "null",
        "double"
      ],
      "default": null
    },
    {
      "name": "fractionLost",
      "doc": "The receiver reported fractional lost belongs to the corresponded synchronization source",
      "type": [
        "null",
        "double"
      ],
      "default": null
    },
    {
      "name": "reportsReceived",
      "doc": "The total number of RR reports received, which is the base of the remote inbound calculation on this source",
      "type": [
        "null",
        "int"
      ],
      "default": null
    },
    {
      "name": "roundTripTimeMeasurements",
      "doc": "The total number of calculated RR measurements received on this source",
      "type": [
        "null",
        "int"
      ],
      "default": null
    },
    {
      "name": "relayedSource",
      "doc": "True if the corresponded media source is remote, false otherwise (or null depending on browser and version)",
      "type": [
        "null",
        "boolean"
      ],
      "default": null
    },
    {
      "name": "audioLevel",
      "doc": "Represents the audio level reported by the media source",
      "type": [
        "null",
        "double"
      ],
      "default": null
    },
    {
      "name": "totalAudioEnergy",
      "doc": "Represents the energy level reported by the media source",
      "type": [
        "null",
        "double"
      ],
      "default": null
    },
    {
      "name": "totalSamplesDuration",
      "doc": "Represents the total duration of the audio samples the media source actually transconverted in seconds",
      "type": [
        "null",
        "double"
      ],
      "default": null
    },
    {
      "name": "echoReturnLoss",
      "doc": "Represents the echo cancellation in decibels corresponded to the media source.",
      "type": [
        "null",
        "double"
      ],
      "default": null
    },
    {
      "name": "echoReturnLossEnhancement",
      "doc": "Represents the echo cancellation in decibels added as a postprocessing by the library after the audio is catched from the emdia source.",
      "type": [
        "null",
        "double"
      ],
      "default": null
    },
    {
      "name": "ended",
      "doc": "Flag represents if the sender ended the media stream track or not.",
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