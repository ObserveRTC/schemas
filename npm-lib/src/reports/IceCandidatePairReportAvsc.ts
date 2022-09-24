export const schema = {
  "type": "record",
  "name": "IceCandidatePairReport",
  "namespace": "org.observertc.schemas.reports",
  "doc": "A Report created for ICE candidate pairs",
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
      "doc": "The webrtc app provided label the peer connection is marked with",
      "type": [
        "null",
        "string"
      ],
      "default": null
    },
    {
      "name": "state",
      "doc": "The state of ICE Candidate Pairs (RTCStatsIceState) on the corresponded transport",
      "type": [
        "null",
        "string"
      ],
      "default": null
    },
    {
      "name": "packetsSent",
      "doc": "The total number of packets sent using the last selected candidate pair over the corresponded transport",
      "type": [
        "null",
        "int"
      ],
      "default": null
    },
    {
      "name": "packetsReceived",
      "doc": "The total number of packets received using the last selected candidate pair over the corresponded transport",
      "type": [
        "null",
        "int"
      ],
      "default": null
    },
    {
      "name": "bytesSent",
      "doc": "The total number of bytes sent using the last selected candidate pair over the corresponded transport",
      "type": [
        "null",
        "long"
      ],
      "default": null
    },
    {
      "name": "bytesReceived",
      "doc": "The total number of bytes received using the last selected candidate pair over the corresponded transport",
      "type": [
        "null",
        "long"
      ],
      "default": null
    },
    {
      "name": "lastPacketSentTimestamp",
      "doc": "Represents the timestamp at which the last packet was sent on the selected candidate pair, excluding STUN packets over the corresponded transport (UTC Epoch in ms)",
      "type": [
        "null",
        "long"
      ],
      "default": null
    },
    {
      "name": "lastPacketReceivedTimestamp",
      "doc": "Represents the timestamp at which the last packet was received on the selected candidate pair, excluding STUN packets over the corresponded transport (UTC Epoch in ms)",
      "type": [
        "null",
        "long"
      ],
      "default": null
    },
    {
      "name": "firstRequestTimestamp",
      "doc": "Represents the timestamp at which the first STUN request was sent on this particular candidate pair over the corresponded transport (UTC Epoch in ms)",
      "type": [
        "null",
        "long"
      ],
      "default": null
    },
    {
      "name": "lastRequestTimestamp",
      "doc": "Represents the timestamp at which the last STUN request was sent on this particular candidate pair over the corresponded transport (UTC Epoch in ms)",
      "type": [
        "null",
        "long"
      ],
      "default": null
    },
    {
      "name": "lastResponseTimestamp",
      "doc": "Represents the timestamp at which the last STUN response was received on this particular candidate pair over the corresponded transport (UTC Epoch in ms)",
      "type": [
        "null",
        "long"
      ],
      "default": null
    },
    {
      "name": "totalRoundTripTime",
      "doc": "Represents the sum of all round trip time measurements in seconds since the beginning of the session, based on STUN connectivity check over the corresponded transport",
      "type": [
        "null",
        "double"
      ],
      "default": null
    },
    {
      "name": "currentRoundTripTime",
      "doc": "Represents the last round trip time measurements in seconds based on STUN connectivity check over the corresponded transport",
      "type": [
        "null",
        "double"
      ],
      "default": null
    },
    {
      "name": "availableOutgoingBitrate",
      "doc": "The sum of the underlying cc algorithm provided outgoing bitrate for the RTP streams over the corresponded transport",
      "type": [
        "null",
        "double"
      ],
      "default": null
    },
    {
      "name": "availableIncomingBitrate",
      "doc": "The sum of the underlying cc algorithm provided incoming bitrate for the RTP streams over the corresponded transport",
      "type": [
        "null",
        "double"
      ],
      "default": null
    },
    {
      "name": "circuitBreakerTriggerCount",
      "doc": "The total number of circuit breaker triggered over the corresponded transport using the selected candidate pair",
      "type": [
        "null",
        "int"
      ],
      "default": null
    },
    {
      "name": "requestsReceived",
      "doc": "Represents the total number of connectivity check requests received on the selected candidate pair using the corresponded transport",
      "type": [
        "null",
        "int"
      ],
      "default": null
    },
    {
      "name": "requestsSent",
      "doc": "Represents the total number of connectivity check requests sent on the selected candidate pair using the corresponded transport",
      "type": [
        "null",
        "int"
      ],
      "default": null
    },
    {
      "name": "responsesReceived",
      "doc": "Represents the total number of connectivity check responses received on the selected candidate pair using the corresponded transport",
      "type": [
        "null",
        "int"
      ],
      "default": null
    },
    {
      "name": "responsesSent",
      "doc": "Represents the total number of connectivity check responses sent on the selected candidate pair using the corresponded transport",
      "type": [
        "null",
        "int"
      ],
      "default": null
    },
    {
      "name": "retransmissionReceived",
      "doc": "Represents the total number of connectivity check retransmission received on the selected candidate pair using the corresponded transport",
      "type": [
        "null",
        "int"
      ],
      "default": null
    },
    {
      "name": "retransmissionSent",
      "doc": "Represents the total number of connectivity check retransmission sent on the selected candidate pair using the corresponded transport",
      "type": [
        "null",
        "int"
      ],
      "default": null
    },
    {
      "name": "consentRequestsSent",
      "doc": "Represents the total number of consent requests sent on the selected candidate pair using the corresponded transport",
      "type": [
        "null",
        "int"
      ],
      "default": null
    },
    {
      "name": "consentExpiredTimestamp",
      "doc": "Represents the timestamp at which the latest valid STUN binding response expired on the selected candidate pair using the corresponded transport",
      "type": [
        "null",
        "long"
      ],
      "default": null
    },
    {
      "name": "bytesDiscardedOnSend",
      "doc": "Total amount of bytes for this candidate pair that have been discarded due to socket errors on the selected candidate pair using the corresponded transport",
      "type": [
        "null",
        "long"
      ],
      "default": null
    },
    {
      "name": "packetsDiscardedOnSend",
      "doc": "Total amount of packets for this candidate pair that have been discarded due to socket errors on the selected candidate pair using the corresponded transport",
      "type": [
        "null",
        "int"
      ],
      "default": null
    },
    {
      "name": "requestBytesSent",
      "doc": "Total number of bytes sent for connectivity checks on the selected candidate pair using the corresponded transport",
      "type": [
        "null",
        "long"
      ],
      "default": null
    },
    {
      "name": "consentRequestBytesSent",
      "doc": "Total number of bytes sent for consent requests on the selected candidate pair using the corresponded transport",
      "type": [
        "null",
        "long"
      ],
      "default": null
    },
    {
      "name": "responseBytesSent",
      "doc": "Total number of bytes sent for connectivity check responses on the selected candidate pair using the corresponded transport",
      "type": [
        "null",
        "long"
      ],
      "default": null
    }
  ]
}