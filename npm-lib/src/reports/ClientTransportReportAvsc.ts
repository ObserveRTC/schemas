export const schema = {
  "type": "record",
  "name": "ClientTransportReport",
  "namespace": "org.observertc.schemas.reports",
  "doc": "A Report created for Client PeerConnection Transport. It is a combination of Transport report, sender, receiver, local, remote and candidate pair of ICE together with the used certificates",
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
      "name": "packetsSent",
      "doc": "Represents the total number of packets sent on the corresponded transport",
      "type": [
        "null",
        "int"
      ],
      "default": null
    },
    {
      "name": "packetsReceived",
      "doc": "Represents the total number of packets received on the corresponded transport",
      "type": [
        "null",
        "int"
      ],
      "default": null
    },
    {
      "name": "bytesSent",
      "doc": "Represents the total amount of bytes sent on the corresponded transport",
      "type": [
        "null",
        "long"
      ],
      "default": null
    },
    {
      "name": "bytesReceived",
      "doc": "Represents the total amount of bytes received on the corresponded transport",
      "type": [
        "null",
        "long"
      ],
      "default": null
    },
    {
      "name": "iceRole",
      "doc": "Represent the current role of ICE under DTLS Transport",
      "type": [
        "null",
        "string"
      ],
      "default": null
    },
    {
      "name": "iceLocalUsernameFragment",
      "doc": "Represent the current local username fragment used in message validation procedures for ICE under DTLS Transport",
      "type": [
        "null",
        "string"
      ],
      "default": null
    },
    {
      "name": "dtlsState",
      "doc": "Represents the current state of DTLS for the peer connection transport layer",
      "type": [
        "null",
        "string"
      ],
      "default": null
    },
    {
      "name": "iceTransportState",
      "doc": "Represents the current transport state (RTCIceTransportState) of ICE for the peer connection transport layer",
      "type": [
        "null",
        "string"
      ],
      "default": null
    },
    {
      "name": "tlsVersion",
      "doc": "Represents the version number of the TLS used in the corresponded transport",
      "type": [
        "null",
        "string"
      ],
      "default": null
    },
    {
      "name": "dtlsCipher",
      "doc": "Represents the name of the DTLS cipher used in the corresponded transport",
      "type": [
        "null",
        "string"
      ],
      "default": null
    },
    {
      "name": "srtpCipher",
      "doc": "Represents the name of the SRTP cipher used in the corresponded transport",
      "type": [
        "null",
        "string"
      ],
      "default": null
    },
    {
      "name": "tlsGroup",
      "doc": "Represents the name of the IANA TLS Supported Groups used in the corresponded transport",
      "type": [
        "null",
        "string"
      ],
      "default": null
    },
    {
      "name": "selectedCandidatePairChanges",
      "doc": "The total number of candidate pair changes over the peer connection",
      "type": [
        "null",
        "int"
      ],
      "default": null
    },
    {
      "name": "localAddress",
      "doc": "The address of the candidate (IPv4, IPv6, FQDN)",
      "type": [
        "null",
        "string"
      ],
      "default": null
    },
    {
      "name": "localPort",
      "doc": "The locally used port to communicate with the remote peer",
      "type": [
        "null",
        "int"
      ],
      "default": null
    },
    {
      "name": "localProtocol",
      "doc": "The protocol used by the local endpoint for the corresponded transport",
      "type": [
        "null",
        "string"
      ],
      "default": null
    },
    {
      "name": "localCandidateType",
      "doc": "The type of the ICE candidate used at the local endpoint on the corresponded transport",
      "type": [
        "null",
        "string"
      ],
      "default": null
    },
    {
      "name": "localCandidateICEServerUrl",
      "doc": "The url of the ICE server used by the local endpoint on the corresponded transport",
      "type": [
        "null",
        "string"
      ],
      "default": null
    },
    {
      "name": "localCandidateRelayProtocol",
      "doc": "The relay protocol of the ICE candidate used by the local endpoint on the corresponded transport",
      "type": [
        "null",
        "string"
      ],
      "default": null
    },
    {
      "name": "remoteAddress",
      "doc": "The address of the candidate (IPv4, IPv6, FQDN)",
      "type": [
        "null",
        "string"
      ],
      "default": null
    },
    {
      "name": "remotePort",
      "doc": "The remotely used port to communicate with the remote peer",
      "type": [
        "null",
        "int"
      ],
      "default": null
    },
    {
      "name": "remoteProtocol",
      "doc": "The protocol used by the remote endpoint for the corresponded transport",
      "type": [
        "null",
        "string"
      ],
      "default": null
    },
    {
      "name": "remoteCandidateType",
      "doc": "The type of the ICE candidate used at the remote endpoint on the corresponded transport",
      "type": [
        "null",
        "string"
      ],
      "default": null
    },
    {
      "name": "remoteCandidateICEServerUrl",
      "doc": "The url of the ICE server used by the remote endpoint on the corresponded transport",
      "type": [
        "null",
        "string"
      ],
      "default": null
    },
    {
      "name": "remoteCandidateRelayProtocol",
      "doc": "The relay protocol of the ICE candidate used by the remote endpoint on the corresponded transport",
      "type": [
        "null",
        "string"
      ],
      "default": null
    },
    {
      "name": "candidatePairState",
      "doc": "The state of ICE Candidate Pairs (RTCStatsIceCandidatePairState) on the corresponded transport",
      "type": [
        "null",
        "string"
      ],
      "default": null
    },
    {
      "name": "candidatePairPacketsSent",
      "doc": "The total number of packets sent using the last selected candidate pair over the corresponded transport",
      "type": [
        "null",
        "int"
      ],
      "default": null
    },
    {
      "name": "candidatePairPacketsReceived",
      "doc": "The total number of packets received using the last selected candidate pair over the corresponded transport",
      "type": [
        "null",
        "int"
      ],
      "default": null
    },
    {
      "name": "candidatePairBytesSent",
      "doc": "The total number of bytes sent using the last selected candidate pair over the corresponded transport",
      "type": [
        "null",
        "long"
      ],
      "default": null
    },
    {
      "name": "candidatePairBytesReceived",
      "doc": "The total number of bytes received using the last selected candidate pair over the corresponded transport",
      "type": [
        "null",
        "long"
      ],
      "default": null
    },
    {
      "name": "candidatePairLastPacketSentTimestamp",
      "doc": "Represents the timestamp at which the last packet was sent on the selected candidate pair, excluding STUN packets over the corresponded transport (UTC Epoch in ms)",
      "type": [
        "null",
        "long"
      ],
      "default": null
    },
    {
      "name": "candidatePairLastPacketReceivedTimestamp",
      "doc": "Represents the timestamp at which the last packet was received on the selected candidate pair, excluding STUN packets over the corresponded transport (UTC Epoch in ms)",
      "type": [
        "null",
        "long"
      ],
      "default": null
    },
    {
      "name": "candidatePairFirstRequestTimestamp",
      "doc": "Represents the timestamp at which the first STUN request was sent on this particular candidate pair over the corresponded transport (UTC Epoch in ms)",
      "type": [
        "null",
        "long"
      ],
      "default": null
    },
    {
      "name": "candidatePairLastRequestTimestamp",
      "doc": "Represents the timestamp at which the last STUN request was sent on this particular candidate pair over the corresponded transport (UTC Epoch in ms)",
      "type": [
        "null",
        "long"
      ],
      "default": null
    },
    {
      "name": "candidatePairLastResponseTimestamp",
      "doc": "Represents the timestamp at which the last STUN response was received on this particular candidate pair over the corresponded transport (UTC Epoch in ms)",
      "type": [
        "null",
        "long"
      ],
      "default": null
    },
    {
      "name": "candidatePairTotalRoundTripTime",
      "doc": "Represents the sum of all round trip time measurements in seconds since the beginning of the session, based on STUN connectivity check over the corresponded transport",
      "type": [
        "null",
        "double"
      ],
      "default": null
    },
    {
      "name": "candidatePairCurrentRoundTripTime",
      "doc": "Represents the last round trip time measurements in seconds based on STUN connectivity check over the corresponded transport",
      "type": [
        "null",
        "double"
      ],
      "default": null
    },
    {
      "name": "candidatePairAvailableOutgoingBitrate",
      "doc": "The sum of the underlying cc algorithm provided outgoing bitrate for the RTP streams over the corresponded transport",
      "type": [
        "null",
        "double"
      ],
      "default": null
    },
    {
      "name": "candidatePairAvailableIncomingBitrate",
      "doc": "The sum of the underlying cc algorithm provided incoming bitrate for the RTP streams over the corresponded transport",
      "type": [
        "null",
        "double"
      ],
      "default": null
    },
    {
      "name": "candidatePairCircuitBreakerTriggerCount",
      "doc": "The total number of circuit breaker triggered over the corresponded transport using the selected candidate pair",
      "type": [
        "null",
        "int"
      ],
      "default": null
    },
    {
      "name": "candidatePairRequestsReceived",
      "doc": "Represents the total number of connectivity check requests received on the selected candidate pair using the corresponded transport",
      "type": [
        "null",
        "int"
      ],
      "default": null
    },
    {
      "name": "candidatePairRequestsSent",
      "doc": "Represents the total number of connectivity check requests sent on the selected candidate pair using the corresponded transport",
      "type": [
        "null",
        "int"
      ],
      "default": null
    },
    {
      "name": "candidatePairResponsesReceived",
      "doc": "Represents the total number of connectivity check responses received on the selected candidate pair using the corresponded transport",
      "type": [
        "null",
        "int"
      ],
      "default": null
    },
    {
      "name": "candidatePairResponsesSent",
      "doc": "Represents the total number of connectivity check responses sent on the selected candidate pair using the corresponded transport",
      "type": [
        "null",
        "int"
      ],
      "default": null
    },
    {
      "name": "candidatePairRetransmissionReceived",
      "doc": "Represents the total number of connectivity check retransmission received on the selected candidate pair using the corresponded transport",
      "type": [
        "null",
        "int"
      ],
      "default": null
    },
    {
      "name": "candidatePairRetransmissionSent",
      "doc": "Represents the total number of connectivity check retransmission sent on the selected candidate pair using the corresponded transport",
      "type": [
        "null",
        "int"
      ],
      "default": null
    },
    {
      "name": "candidatePairConsentRequestsSent",
      "doc": "Represents the total number of consent requests sent on the selected candidate pair using the corresponded transport",
      "type": [
        "null",
        "int"
      ],
      "default": null
    },
    {
      "name": "candidatePairConsentExpiredTimestamp",
      "doc": "Represents the timestamp at which the latest valid STUN binding response expired on the selected candidate pair using the corresponded transport",
      "type": [
        "null",
        "long"
      ],
      "default": null
    },
    {
      "name": "candidatePairBytesDiscardedOnSend",
      "doc": "Total amount of bytes for this candidate pair that have been discarded due to socket errors on the selected candidate pair using the corresponded transport",
      "type": [
        "null",
        "long"
      ],
      "default": null
    },
    {
      "name": "candidatePairPacketsDiscardedOnSend",
      "doc": "Total amount of packets for this candidate pair that have been discarded due to socket errors on the selected candidate pair using the corresponded transport",
      "type": [
        "null",
        "int"
      ],
      "default": null
    },
    {
      "name": "candidatePairRequestBytesSent",
      "doc": "Total number of bytes sent for connectivity checks on the selected candidate pair using the corresponded transport",
      "type": [
        "null",
        "long"
      ],
      "default": null
    },
    {
      "name": "candidatePairConsentRequestBytesSent",
      "doc": "Total number of bytes sent for consent requests on the selected candidate pair using the corresponded transport",
      "type": [
        "null",
        "long"
      ],
      "default": null
    },
    {
      "name": "candidatePairResponseBytesSent",
      "doc": "Total number of bytes sent for connectivity check responses on the selected candidate pair using the corresponded transport",
      "type": [
        "null",
        "long"
      ],
      "default": null
    },
    {
      "name": "sctpSmoothedRoundTripTime",
      "doc": "The latest smoothed round-trip time value, corresponding to spinfo_srtt defined in [RFC6458] but converted to seconds. ",
      "type": [
        "null",
        "double"
      ],
      "default": null
    },
    {
      "name": "sctpCongestionWindow",
      "doc": "The latest congestion window, corresponding to spinfo_cwnd.",
      "type": [
        "null",
        "double"
      ],
      "default": null
    },
    {
      "name": "sctpReceiverWindow",
      "doc": "The latest receiver window, corresponding to sstat_rwnd.",
      "type": [
        "null",
        "double"
      ],
      "default": null
    },
    {
      "name": "sctpMtu",
      "doc": "The latest maximum transmission unit, corresponding to spinfo_mtu.",
      "type": [
        "null",
        "int"
      ],
      "default": null
    },
    {
      "name": "sctpUnackData",
      "doc": "The number of unacknowledged DATA chunks, corresponding to sstat_unackdata.",
      "type": [
        "null",
        "int"
      ],
      "default": null
    }
  ]
}