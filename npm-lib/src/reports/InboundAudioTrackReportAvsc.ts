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
      "name": "lastPacketReceivedTimestamp",
      "doc": "Represents the timestamp at which the last packet was received on the corresponded synchronization source (ssrc)",
      "type": [
        "null",
        "long"
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
      "name": "packetsDiscarded",
      "doc": "The total number of packets missed the playout point and therefore discarded by the jitterbuffer",
      "type": [
        "null",
        "int"
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
      "name": "jitterBufferTargetDelay",
      "doc": "This value is increased by the target jitter buffer delay every time a sample is emitted by the jitter buffer. The added target is the target delay, in seconds, at the time that the sample was emitted from the jitter buffer. ",
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
      "name": "jitterBufferMinimumDelay",
      "doc": "This metric is purely based on the network characteristics such as jitter and packet loss, and can be seen as the minimum obtainable jitter buffer delay if no external factors would affect it",
      "type": [
        "null",
        "double"
      ],
      "default": null
    },
    {
      "name": "totalSamplesReceived",
      "doc": "The total number of audio samples received on the corresponded RTP stream",
      "type": [
        "null",
        "int"
      ],
      "default": null
    },
    {
      "name": "concealedSamples",
      "doc": "The total number of samples decoded by the media decoder from the corresponded RTP stream",
      "type": [
        "null",
        "int"
      ],
      "default": null
    },
    {
      "name": "silentConcealedSamples",
      "doc": "The total number of samples concealed from the corresponded RTP stream",
      "type": [
        "null",
        "int"
      ],
      "default": null
    },
    {
      "name": "concealmentEvents",
      "doc": "The total number of concealed event emitted to the media codec by the corresponded jitterbuffer",
      "type": [
        "null",
        "int"
      ],
      "default": null
    },
    {
      "name": "insertedSamplesForDeceleration",
      "doc": "The total number of samples inserted to decelarete the audio playout (happens when the jitterbuffer detects a shrinking buffer and need to increase the jitter buffer delay)",
      "type": [
        "null",
        "int"
      ],
      "default": null
    },
    {
      "name": "removedSamplesForAcceleration",
      "doc": "The total number of samples inserted to accelerate the audio playout (happens when the jitterbuffer detects a growing buffer and need to shrink the jitter buffer delay)",
      "type": [
        "null",
        "int"
      ],
      "default": null
    },
    {
      "name": "audioLevel",
      "doc": "The current audio level",
      "type": [
        "null",
        "int"
      ],
      "default": null
    },
    {
      "name": "totalAudioEnergy",
      "doc": "Represents the energy level reported by the media source",
      "type": [
        "null",
        "int"
      ],
      "default": null
    },
    {
      "name": "totalSamplesDuration",
      "doc": "Represents the total duration of the audio samples the media source actually transconverted in seconds",
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
      "name": "roundTripTime",
      "doc": "Estimated round trip time for the SR reports based on DLRR reports on the corresponded RTP stream",
      "type": [
        "null",
        "double"
      ],
      "default": null
    },
    {
      "name": "totalRoundTripTime",
      "doc": " Represents the cumulative sum of all round trip time measurements performed on the corresponded RTP stream",
      "type": [
        "null",
        "double"
      ],
      "default": null
    },
    {
      "name": "roundTripTimeMeasurements",
      "doc": "Represents the total number of SR reports received with DLRR reports to be able to calculate the round trip time on the corresponded RTP stream",
      "type": [
        "null",
        "int"
      ],
      "default": null
    },
    {
      "name": "synthesizedSamplesDuration",
      "doc": "This metric can be used together with totalSamplesDuration to calculate the percentage of played out media being synthesized",
      "type": [
        "null",
        "int"
      ],
      "default": null
    },
    {
      "name": "synthesizedSamplesEvents",
      "doc": "The number of synthesized samples events.",
      "type": [
        "null",
        "int"
      ],
      "default": null
    },
    {
      "name": "totalPlayoutDelay",
      "doc": " The playout delay includes the delay from being emitted to the actual time of playout on the device",
      "type": [
        "null",
        "double"
      ],
      "default": null
    },
    {
      "name": "totalSamplesCount",
      "doc": "When audio samples are pulled by the playout device, this counter is incremented with the number of samples emitted for playout",
      "type": [
        "null",
        "int"
      ],
      "default": null
    }
  ]
}