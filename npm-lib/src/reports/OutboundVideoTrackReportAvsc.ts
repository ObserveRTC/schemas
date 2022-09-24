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
      "name": "headerBytesSent",
      "doc": "Total number of RTP header and padding bytes sent over the corresponding synchronization source (ssrc)",
      "type": [
        "null",
        "long"
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
      "name": "active",
      "doc": "Indicates whether this RTP stream is configured to be sent or disabled",
      "type": [
        "null",
        "boolean"
      ],
      "default": null
    },
    {
      "name": "frameWidth",
      "doc": "The frame width in pixels of the frames targeted by the media encoder",
      "type": [
        "null",
        "int"
      ],
      "default": null
    },
    {
      "name": "frameHeight",
      "doc": "The frame width the media encoder targeted",
      "type": [
        "null",
        "int"
      ],
      "default": null
    },
    {
      "name": "framesPerSecond",
      "doc": "The encoded number of frames in the last second on the corresponded media source",
      "type": [
        "null",
        "double"
      ],
      "default": null
    },
    {
      "name": "framesSent",
      "doc": "TThe total number of frames sent on the corresponded RTP stream",
      "type": [
        "null",
        "int"
      ],
      "default": null
    },
    {
      "name": "hugeFramesSent",
      "doc": "The total number of huge frames (avgFrameSize * 2.5) on the corresponded RTP stream",
      "type": [
        "null",
        "int"
      ],
      "default": null
    },
    {
      "name": "framesEncoded",
      "doc": "The total number of frames encoded by the media source",
      "type": [
        "null",
        "int"
      ],
      "default": null
    },
    {
      "name": "keyFramesEncoded",
      "doc": "The total number of keyframes encoded on the corresponded RTP stream",
      "type": [
        "null",
        "int"
      ],
      "default": null
    },
    {
      "name": "qpSum",
      "doc": "The sum of the QP the media encoder provided on the corresponded RTP stream.",
      "type": [
        "null",
        "long"
      ],
      "default": null
    },
    {
      "name": "totalEncodeTime",
      "doc": "The total time in seconds spent in encoding media frames for the corresponded RTP stream.",
      "type": [
        "null",
        "double"
      ],
      "default": null
    },
    {
      "name": "qualityLimitationDurationNone",
      "doc": "Time elapsed in seconds when the RTC connection has not limited the quality",
      "type": [
        "null",
        "double"
      ],
      "default": null
    },
    {
      "name": "qualityLimitationDurationCPU",
      "doc": "Time elapsed in seconds the RTC connection had a limitation because of CPU",
      "type": [
        "null",
        "double"
      ],
      "default": null
    },
    {
      "name": "qualityLimitationDurationBandwidth",
      "doc": "Time elapsed in seconds the RTC connection had a limitation because of Bandwidth",
      "type": [
        "null",
        "double"
      ],
      "default": null
    },
    {
      "name": "qualityLimitationDurationOther",
      "doc": "Time elapsed in seconds the RTC connection had a limitation because of Other factor",
      "type": [
        "null",
        "double"
      ],
      "default": null
    },
    {
      "name": "qualityLimitationReason",
      "doc": "Indicate a reason for the quality limitation of the corresponded synchronization source",
      "type": [
        "null",
        "string"
      ],
      "default": null
    },
    {
      "name": "qualityLimitationResolutionChanges",
      "doc": "The total number of resolution changes occured ont he corresponded RTP stream due to quality changes",
      "type": [
        "null",
        "int"
      ],
      "default": null
    },
    {
      "name": "firCount",
      "doc": "The total number FIR packets sent from this endpoint to the source on the corresponded RTP stream",
      "type": [
        "null",
        "int"
      ],
      "default": null
    },
    {
      "name": "pliCount",
      "doc": "The total number of Picture Loss Indication sent on the corresponded RTP stream",
      "type": [
        "null",
        "int"
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
      "name": "roundTripTimeMeasurements",
      "doc": "The total number of calculated RR measurements received on this source",
      "type": [
        "null",
        "int"
      ],
      "default": null
    },
    {
      "name": "framesDropped",
      "doc": "The total number of frames reported to be lost by the remote endpoit on the corresponded RTP stream",
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
      "name": "width",
      "doc": "The width, in pixels, of the last frame originating from the media source",
      "type": [
        "null",
        "int"
      ],
      "default": null
    },
    {
      "name": "height",
      "doc": "The height, in pixels, of the last frame originating from the media source",
      "type": [
        "null",
        "int"
      ],
      "default": null
    },
    {
      "name": "frames",
      "doc": "The total number of frames originated from the media source",
      "type": [
        "null",
        "int"
      ],
      "default": null
    }
  ]
}