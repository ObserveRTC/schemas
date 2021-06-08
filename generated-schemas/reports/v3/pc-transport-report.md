## PcTransportReport
---


A Report created for PeerConnection Transport. It is a combination of Transport report, sender, receiver, local, remote and candidate pair of ICE together with the used certificates


Name | Value | Description 
--- | --- | ---
serviceId | Required string | The unique identifier of the service
serviceName | Optional string | The resolved service name configured for the service Id
mediaUnitId | Required string | The media unit id the report belongs to
marker | Optional string | The marker the originated sample is reported with
timestamp | Required long | The timestamp when the corresponded data is generated for the report (UTC Epoch in ms)
callId | Required string | The generated unique identifier of the call
roomId | Optional string | webrtc app provided room id
clientId | Required string | The generated unique identifier of the client
userId | Optional string | webrtc app provided user identifier
peerConnectionId | Required string | The unique identifier of the peer connection
label | Optional string | The webrtc app provided label the peer connection is marked with
packetsSent | Optional int | Represents the total number of packets sent on the corresponded transport
packetsReceived | Optional int | Represents the total number of packets received on the corresponded transport
bytesSent | Optional int | Represents the total amount of bytes sent on the corresponded transport
bytesReceived | Optional int | Represents the total amount of bytes received on the corresponded transport
iceRole | Optional string | Represent the current role of ICE under DTLS Transport
iceLocalUsernameFragment | Optional string | Represent the current local username fragment used in message validation procedures for ICE under DTLS Transport
dtlsState | Optional string | Represents the current state of DTLS for the peer connection transport layer
iceTransportState | Optional string | Represents the current transport state (RTCIceTransportState) of ICE for the peer connection transport layer
tlsVersion | Optional string | Represents the version number of the TLS used in the corresponded transport
dtlsCipher | Optional string | Represents the name of the DTLS cipher used in the corresponded transport
srtpCipher | Optional string | Represents the name of the SRTP cipher used in the corresponded transport
tlsGroup | Optional string | Represents the name of the IANA TLS Supported Groups used in the corresponded transport
selectedCandidatePairChanges | Optional int | The total number of candidate pair changes over the peer connection
localFingerprint | Optional string | The fingerprint of the certificate certifies the local endpoint of the transport
localFingerprintAlgorithm | Optional string | The algorithm generate the fingerprint of the certificate certifies the local endpoint of the transport
localBase64Certificate | Optional string | The base64 encoded certificate for the local endpoint corresponded to the transport
remoteFingerprint | Optional string | The fingerprint of the certificate certifies the remote endpoint of the transport
remoteFingerprintAlgorithm | Optional string | The algorithm generate the fingerprint of the certificate certifies the remote endpoint of the transport
remoteBase64Certificate | Optional string | The base64 encoded certificate for the remote endpoint corresponded to the transport
localAddress | Optional string | The address of the candidate (IPv4, IPv6, FQDN)
localPort | Optional int | The locally used port to communicate with the remote peer
localProtocol | Optional string | The protocol used by the local endpoint for the corresponded transport
localCandidateType | Optional string | The type of the ICE candidate used at the local endpoint on the corresponded transport
localCandidatePriority | Optional int | The priority of the ICE candidate used at the local endpoint on the corresponded transport
localCandidateICEServerUrl | Optional string | The url of the ICE server used by the local endpoint on the corresponded transport
localCandidateRelayProtocol | Optional string | The relay protocol of the ICE candidate used by the local endpoint on the corresponded transport
remoteAddress | Optional string | The address of the candidate (IPv4, IPv6, FQDN)
remotePort | Optional int | The remotely used port to communicate with the remote peer
remoteProtocol | Optional string | The protocol used by the remote endpoint for the corresponded transport
remoteCandidateType | Optional string | The type of the ICE candidate used at the remote endpoint on the corresponded transport
remoteCandidatePriority | Optional int | The priority of the ICE candidate used at the remote endpoint on the corresponded transport
remoteCandidateICEServerUrl | Optional string | The url of the ICE server used by the remote endpoint on the corresponded transport
remoteCandidateRelayProtocol | Optional string | The relay protocol of the ICE candidate used by the remote endpoint on the corresponded transport
iceCandidatePairState | Optional string | The state of ICE Candidate Pairs (RTCStatsIceCandidatePairState) on the corresponded transport
iceCandidatePairPacketsSent | Optional int | The total number of packets sent using the last selected candidate pair over the corresponded transport
iceCandidatePairPacketsReceived | Optional int | The total number of packets received using the last selected candidate pair over the corresponded transport
iceCandidatePairBytesSent | Optional long | The total number of bytes sent using the last selected candidate pair over the corresponded transport
iceCandidatePairBytesReceived | Optional long | The total number of bytes received using the last selected candidate pair over the corresponded transport
iceCandidatePairLastPacketSentTimestamp | Optional long | Represents the timestamp at which the last packet was sent on the selected candidate pair, excluding STUN packets over the corresponded transport (UTC Epoch in ms)
iceCandidatePairLastPacketReceivedTimestamp | Optional long | Represents the timestamp at which the last packet was received on the selected candidate pair, excluding STUN packets over the corresponded transport (UTC Epoch in ms)
iceCandidatePairFirstRequestTimestamp | Optional long | Represents the timestamp at which the first STUN request was sent on this particular candidate pair over the corresponded transport (UTC Epoch in ms)
iceCandidatePairLastRequestTimestamp | Optional long | Represents the timestamp at which the last STUN request was sent on this particular candidate pair over the corresponded transport (UTC Epoch in ms)
iceCandidatePairLastResponseTimestamp | Optional long | Represents the timestamp at which the last STUN response was received on this particular candidate pair over the corresponded transport (UTC Epoch in ms)
stunProvidedTotalRoundTripTime | Optional double | Represents the sum of all round trip time measurements in seconds since the beginning of the session, based on STUN connectivity check over the corresponded transport
stunProvidedCurrentRoundTripTime | Optional double | Represents the last round trip time measurements in seconds based on STUN connectivity check over the corresponded transport
availableOutgoingBitrate | Optional double | The sum of the underlying cc algorithm provided outgoing bitrate for the RTP streams over the corresponded transport
availableIncomingBitrate | Optional double | The sum of the underlying cc algorithm provided incoming bitrate for the RTP streams over the corresponded transport
circuitBreakerTriggerCount | Optional int | The total number of circuit breaker triggered over the corresponded transport using the selected candidate pair
candidatePairRequestsReceived | Optional int | Represents the total number of connectivity check requests received on the selected candidate pair using the corresponded transport
candidatePairRequestsSent | Optional int | Represents the total number of connectivity check requests sent on the selected candidate pair using the corresponded transport
candidatePairResponsesReceived | Optional int | Represents the total number of connectivity check responses received on the selected candidate pair using the corresponded transport
candidatePairResponsesSent | Optional int | Represents the total number of connectivity check responses sent on the selected candidate pair using the corresponded transport
candidatePairRetransmissionReceived | Optional int | Represents the total number of connectivity check retransmission received on the selected candidate pair using the corresponded transport
candidatePairRetransmissionSent | Optional int | Represents the total number of connectivity check retransmission sent on the selected candidate pair using the corresponded transport
candidatePairConsentRequestsSent | Optional int | Represents the total number of consent requests sent on the selected candidate pair using the corresponded transport
candidatePairConsentExpiredTimestamp | Optional long | Represents the timestamp at which the latest valid STUN binding response expired on the selected candidate pair using the corresponded transport
candidatePairBytesDiscardedOnSend | Optional long | Total amount of bytes for this candidate pair that have been discarded due to socket errors on the selected candidate pair using the corresponded transport
candidatePairRequestBytesSent | Optional long | Total number of bytes sent for connectivity checks on the selected candidate pair using the corresponded transport
candidatePairConsentRequestBytesSent | Optional long | Total number of bytes sent for consent requests on the selected candidate pair using the corresponded transport
candidatePairResponseBytesSent | Optional int | Total number of bytes sent for connectivity check responses on the selected candidate pair using the corresponded transport
sctpSmoothedRoundTripTime | Optional double | The latest smoothed round-trip time value, corresponding to spinfo_srtt defined in [RFC6458] but converted to seconds. 
sctpCongestionWindow | Optional double | The latest congestion window, corresponding to spinfo_cwnd.
sctpReceiverWindow | Optional double | The latest receiver window, corresponding to sstat_rwnd.
sctpMtu | Optional int | The latest maximum transmission unit, corresponding to spinfo_mtu.
sctpUnackData | Optional int | The number of unacknowledged DATA chunks, corresponding to sstat_unackdata.