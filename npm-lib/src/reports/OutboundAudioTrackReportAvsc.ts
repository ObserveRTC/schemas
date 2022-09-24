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
      "name": "droppedSamplesDuration",
      "type": [
        "null",
        "double"
      ],
      "doc": ". The total duration, in seconds, of samples produced by the device that got dropped before reaching the media source",
      "default": null
    },
    {
      "name": "droppedSamplesEvents",
      "type": [
        "null",
        "int"
      ],
      "doc": "A counter increases every time a sample is dropped after a non-dropped sample",
      "default": null
    },
    {
      "name": "totalCaptureDelay",
      "type": [
        "null",
        "double"
      ],
      "doc": "Total delay, in seconds, for each audio sample between the time the sample was emitted by the capture device and the sample reaching the source",
      "default": null
    },
    {
      "name": "totalSamplesCaptured",
      "type": [
        "null",
        "double"
      ],
      "doc": "The total number of captured samples reaching the audio source",
      "default": null
    }
  ]
}