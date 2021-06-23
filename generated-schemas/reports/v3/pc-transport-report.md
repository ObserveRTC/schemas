## PcTransportReport
---


A Report created for PeerConnection Transport. It is a combination of Transport report, sender, receiver, local, remote and candidate pair of ICE together with the used certificates


Name | Type | Required | Description 
--- | --- | --- | ---
serviceId | string | Yes | The unique identifier of the service
mediaUnitId | string | Yes | The media unit id the report belongs to
timestamp | long | Yes | The timestamp when the corresponded data is generated for the report (UTC Epoch in ms)
callId | string | Yes | The generated unique identifier of the call
clientId | string | Yes | The generated unique identifier of the client
peerConnectionId | string | Yes | The unique identifier of the peer connection
marker | string | No | The marker the originated sample is reported with
roomId | string | No | webrtc app provided room id
userId | string | No | webrtc app provided user identifier
label | string | No | The webrtc app provided label the peer connection is marked with
packetsSent | int | No | Represents the total number of packets sent on the corresponded transport
packetsReceived | int | No | Represents the total number of packets received on the corresponded transport
bytesSent | int | No | Represents the total amount of bytes sent on the corresponded transport
bytesReceived | int | No | Represents the total amount of bytes received on the corresponded transport
iceRole | string | No | Represent the current role of ICE under DTLS Transport
iceLocalUsernameFragment | string | No | Represent the current local username fragment used in message validation procedures for ICE under DTLS Transport
dtlsState | string | No | Represents the current state of DTLS for the peer connection transport layer
iceTransportState | string | No | Represents the current transport state (RTCIceTransportState) of ICE for the peer connection transport layer
tlsVersion | string | No | Represents the version number of the TLS used in the corresponded transport
dtlsCipher | string | No | Represents the name of the DTLS cipher used in the corresponded transport
srtpCipher | string | No | Represents the name of the SRTP cipher used in the corresponded transport
tlsGroup | string | No | Represents the name of the IANA TLS Supported Groups used in the corresponded transport
selectedCandidatePairChanges | int | No | The total number of candidate pair changes over the peer connection
localFingerprint | string | No | The fingerprint of the certificate certifies the local endpoint of the transport
localFingerprintAlgorithm | string | No | The algorithm generate the fingerprint of the certificate certifies the local endpoint of the transport
localBase64Certificate | string | No | The base64 encoded certificate for the local endpoint corresponded to the transport
remoteFingerprint | string | No | The fingerprint of the certificate certifies the remote endpoint of the transport
remoteFingerprintAlgorithm | string | No | The algorithm generate the fingerprint of the certificate certifies the remote endpoint of the transport
remoteBase64Certificate | string | No | The base64 encoded certificate for the remote endpoint corresponded to the transport
localAddress | string | No | The address of the candidate (IPv4, IPv6, FQDN)
localPort | int | No | The locally used port to communicate with the remote peer
localProtocol | string | No | The protocol used by the local endpoint for the corresponded transport
localCandidateType | string | No | The type of the ICE candidate used at the local endpoint on the corresponded transport
localCandidatePriority | int | No | The priority of the ICE candidate used at the local endpoint on the corresponded transport
localCandidateICEServerUrl | string | No | The url of the ICE server used by the local endpoint on the corresponded transport
localCandidateRelayProtocol | string | No | The relay protocol of the ICE candidate used by the local endpoint on the corresponded transport
remoteAddress | string | No | The address of the candidate (IPv4, IPv6, FQDN)
remotePort | int | No | The remotely used port to communicate with the remote peer
remoteProtocol | string | No | The protocol used by the remote endpoint for the corresponded transport
remoteCandidateType | string | No | The type of the ICE candidate used at the remote endpoint on the corresponded transport
remoteCandidatePriority | int | No | The priority of the ICE candidate used at the remote endpoint on the corresponded transport
remoteCandidateICEServerUrl | string | No | The url of the ICE server used by the remote endpoint on the corresponded transport
remoteCandidateRelayProtocol | string | No | The relay protocol of the ICE candidate used by the remote endpoint on the corresponded transport
iceCandidatePairState | string | No | The state of ICE Candidate Pairs (RTCStatsIceCandidatePairState) on the corresponded transport
iceCandidatePairPacketsSent | int | No | The total number of packets sent using the last selected candidate pair over the corresponded transport
iceCandidatePairPacketsReceived | int | No | The total number of packets received using the last selected candidate pair over the corresponded transport
iceCandidatePairBytesSent | long | No | The total number of bytes sent using the last selected candidate pair over the corresponded transport
iceCandidatePairBytesReceived | long | No | The total number of bytes received using the last selected candidate pair over the corresponded transport
iceCandidatePairLastPacketSentTimestamp | long | No | Represents the timestamp at which the last packet was sent on the selected candidate pair, excluding STUN packets over the corresponded transport (UTC Epoch in ms)
iceCandidatePairLastPacketReceivedTimestamp | long | No | Represents the timestamp at which the last packet was received on the selected candidate pair, excluding STUN packets over the corresponded transport (UTC Epoch in ms)
iceCandidatePairFirstRequestTimestamp | long | No | Represents the timestamp at which the first STUN request was sent on this particular candidate pair over the corresponded transport (UTC Epoch in ms)
iceCandidatePairLastRequestTimestamp | long | No | Represents the timestamp at which the last STUN request was sent on this particular candidate pair over the corresponded transport (UTC Epoch in ms)
iceCandidatePairLastResponseTimestamp | long | No | Represents the timestamp at which the last STUN response was received on this particular candidate pair over the corresponded transport (UTC Epoch in ms)
stunProvidedTotalRoundTripTime | double | No | Represents the sum of all round trip time measurements in seconds since the beginning of the session, based on STUN connectivity check over the corresponded transport
stunProvidedCurrentRoundTripTime | double | No | Represents the last round trip time measurements in seconds based on STUN connectivity check over the corresponded transport
availableOutgoingBitrate | double | No | The sum of the underlying cc algorithm provided outgoing bitrate for the RTP streams over the corresponded transport
availableIncomingBitrate | double | No | The sum of the underlying cc algorithm provided incoming bitrate for the RTP streams over the corresponded transport
circuitBreakerTriggerCount | int | No | The total number of circuit breaker triggered over the corresponded transport using the selected candidate pair
candidatePairRequestsReceived | int | No | Represents the total number of connectivity check requests received on the selected candidate pair using the corresponded transport
candidatePairRequestsSent | int | No | Represents the total number of connectivity check requests sent on the selected candidate pair using the corresponded transport
candidatePairResponsesReceived | int | No | Represents the total number of connectivity check responses received on the selected candidate pair using the corresponded transport
candidatePairResponsesSent | int | No | Represents the total number of connectivity check responses sent on the selected candidate pair using the corresponded transport
candidatePairRetransmissionReceived | int | No | Represents the total number of connectivity check retransmission received on the selected candidate pair using the corresponded transport
candidatePairRetransmissionSent | int | No | Represents the total number of connectivity check retransmission sent on the selected candidate pair using the corresponded transport
candidatePairConsentRequestsSent | int | No | Represents the total number of consent requests sent on the selected candidate pair using the corresponded transport
candidatePairConsentExpiredTimestamp | long | No | Represents the timestamp at which the latest valid STUN binding response expired on the selected candidate pair using the corresponded transport
candidatePairBytesDiscardedOnSend | long | No | Total amount of bytes for this candidate pair that have been discarded due to socket errors on the selected candidate pair using the corresponded transport
candidatePairRequestBytesSent | long | No | Total number of bytes sent for connectivity checks on the selected candidate pair using the corresponded transport
candidatePairConsentRequestBytesSent | long | No | Total number of bytes sent for consent requests on the selected candidate pair using the corresponded transport
candidatePairResponseBytesSent | int | No | Total number of bytes sent for connectivity check responses on the selected candidate pair using the corresponded transport
sctpSmoothedRoundTripTime | double | No | The latest smoothed round-trip time value, corresponding to spinfo_srtt defined in [RFC6458] but converted to seconds. 
sctpCongestionWindow | double | No | The latest congestion window, corresponding to spinfo_cwnd.
sctpReceiverWindow | double | No | The latest receiver window, corresponding to sstat_rwnd.
sctpMtu | int | No | The latest maximum transmission unit, corresponding to spinfo_mtu.
sctpUnackData | int | No | The number of unacknowledged DATA chunks, corresponding to sstat_unackdata.