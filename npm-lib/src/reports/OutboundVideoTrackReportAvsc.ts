export const schema = {
  "type": "record",
  "name": "OutboundVideoTrackReport",
  "namespace": "org.observertc.schemas.reports",
  "doc": "A Report created for Outbound Video Tracks. A combination of Video source, Codec metadata carrying outbound and remote inbound RTP stat measurements",
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
      "doc": "Total number of retransmitted bytes sent over the corresponded synchronization source (ssrc).",
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
      "name": "frameWidth",
      "doc": "Represents the height of the last encoded frame sent over the corresponded synchronization source",
      "type": [
        "null",
        "int"
      ],
      "default": null
    },
    {
      "name": "frameHeight",
      "doc": "Represents the width of the last encoded frame sent over the corresponded synchronization source",
      "type": [
        "null",
        "int"
      ],
      "default": null
    },
    {
      "name": "frameBitDepth",
      "doc": "Represents the bit depth per pixel of the last encoded frame sent over the corresponded synchronization source",
      "type": [
        "null",
        "int"
      ],
      "default": null
    },
    {
      "name": "framesPerSecond",
      "doc": "The number of encoded frames over the last second sent over the corresponded synchronization source",
      "type": [
        "null",
        "double"
      ],
      "default": null
    },
    {
      "name": "framesSent",
      "doc": "The number of frames sent over the corresponded synchronization source",
      "type": [
        "null",
        "int"
      ],
      "default": null
    },
    {
      "name": "hugeFramesSent",
      "doc": "The number of huge frames (2.5x greater than the average size of frame) sent over the corresponded synchronization source",
      "type": [
        "null",
        "int"
      ],
      "default": null
    },
    {
      "name": "framesEncoded",
      "doc": "The number of frames encoded over the corresponded synchronization source",
      "type": [
        "null",
        "int"
      ],
      "default": null
    },
    {
      "name": "keyFramesEncoded",
      "doc": "The number of keyframes sent over the corresponded synchronization source",
      "type": [
        "null",
        "int"
      ],
      "default": null
    },
    {
      "name": "framesDiscardedOnSend",
      "doc": "The number of frames discarded before sending over the corresponded synchronization source",
      "type": [
        "null",
        "int"
      ],
      "default": null
    },
    {
      "name": "qpSum",
      "doc": "The sum of QP values encoded by the encoder corresponded to the synchronization source",
      "type": [
        "null",
        "long"
      ],
      "default": null
    },
    {
      "name": "totalEncodeTime",
      "doc": "The sum of encoding time spent by the encoder corresponded to the synchronization source",
      "type": [
        "null",
        "double"
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
      "name": "qualityLimitationDurationCPU",
      "doc": "Time elapsed in seconds when the the corresponding synchronization source (ssrc) was in a limited state due to CPU",
      "type": [
        "null",
        "double"
      ],
      "default": null
    },
    {
      "name": "qualityLimitationDurationNone",
      "doc": "Time elapsed in seconds when the the corresponding synchronization source (ssrc) was not in a limited state",
      "type": [
        "null",
        "double"
      ],
      "default": null
    },
    {
      "name": "qualityLimitationDurationBandwidth",
      "doc": "Time elapsed in seconds when the the corresponding synchronization source (ssrc) was in a limited state becasue of bandwidth",
      "type": [
        "null",
        "double"
      ],
      "default": null
    },
    {
      "name": "qualityLimitationDurationOther",
      "doc": "Time elapsed in seconds when the the corresponding synchronization source (ssrc) was in a limited state becaue of other factor",
      "type": [
        "null",
        "double"
      ],
      "default": null
    },
    {
      "name": "qualityLimitationReason",
      "doc": "Indicate a reason for the corresponding synchronization source (ssrc) quality is limited",
      "type": [
        "null",
        "string"
      ],
      "default": null
    },
    {
      "name": "qualityLimitationResolutionChanges",
      "doc": "The number of quality limiatation changes happened for the corresponding synchronization source (ssrc)",
      "type": [
        "null",
        "int"
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
      "name": "firCount",
      "doc": "The number of full inter requests happened over the corresponding synchronization source (ssrc)",
      "type": [
        "null",
        "int"
      ],
      "default": null
    },
    {
      "name": "pliCount",
      "doc": "The number of picture loss indication happened received over the corresponding synchronization source (ssrc)",
      "type": [
        "null",
        "int"
      ],
      "default": null
    },
    {
      "name": "sliCount",
      "doc": "The number of slice loss indication happened over the corresponding synchronization source (ssrc)",
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
      "name": "framesDropped",
      "doc": "The number of frames dropped over the corresponded synchronization source",
      "type": [
        "null",
        "int"
      ],
      "default": null
    },
    {
      "name": "partialFramesLost",
      "doc": "The number of partial frames lost over the corresponded synchronization source",
      "type": [
        "null",
        "int"
      ],
      "default": null
    },
    {
      "name": "fullFramesLost",
      "doc": "The number of full frames lost over the corresponded synchronization source",
      "type": [
        "null",
        "int"
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
      "name": "encodedFrameWidth",
      "doc": "Indicate the encoded width of the frame received on the corresponded synchronization source (ssrc)",
      "type": [
        "null",
        "int"
      ],
      "default": null
    },
    {
      "name": "encodedFrameHeight",
      "doc": "Indicate the encoded height of the frame received on the corresponded synchronization source (ssrc)",
      "type": [
        "null",
        "int"
      ],
      "default": null
    },
    {
      "name": "encodedFrameBitDepth",
      "doc": "Indicate the encoded bit depth per pixel of the last decoded frame received on the corresponded synchronization source (ssrc)",
      "type": [
        "null",
        "int"
      ],
      "default": null
    },
    {
      "name": "encodedFramesPerSecond",
      "doc": "Indicate the encoded number of decoded frames in the last second received on the corresponded synchronization source (ssrc)",
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