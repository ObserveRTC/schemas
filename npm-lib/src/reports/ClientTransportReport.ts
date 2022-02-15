/**
* A Report created for Client PeerConnection Transport. It is a combination of Transport report, sender, receiver, local, remote and candidate pair of ICE together with the used certificates
*/
export type ClientTransportReport = {
	/**
	* The unique identifier of the service
	*/
	serviceId: string;

	/**
	* The media unit id the report belongs to
	*/
	mediaUnitId: string;

	/**
	* The timestamp when the corresponded data is generated for the report (UTC Epoch in ms)
	*/
	timestamp: number;

	/**
	* The generated unique identifier of the call
	*/
	callId: string;

	/**
	* The generated unique identifier of the client
	*/
	clientId: string;

	/**
	* The unique identifier of the peer connection
	*/
	peerConnectionId: string;

	/**
	* The marker the originated sample is reported with
	*/
	marker?: string;

	/**
	* webrtc app provided room id
	*/
	roomId?: string;

	/**
	* webrtc app provided user identifier
	*/
	userId?: string;

	/**
	* The webrtc app provided label the peer connection is marked with
	*/
	label?: string;

	/**
	* Represents the total number of packets sent on the corresponded transport
	*/
	packetsSent?: number;

	/**
	* Represents the total number of packets received on the corresponded transport
	*/
	packetsReceived?: number;

	/**
	* Represents the total amount of bytes sent on the corresponded transport
	*/
	bytesSent?: number;

	/**
	* Represents the total amount of bytes received on the corresponded transport
	*/
	bytesReceived?: number;

	/**
	* Represent the current role of ICE under DTLS Transport
	*/
	iceRole?: string;

	/**
	* Represent the current local username fragment used in message validation procedures for ICE under DTLS Transport
	*/
	iceLocalUsernameFragment?: string;

	/**
	* Represents the current state of DTLS for the peer connection transport layer
	*/
	dtlsState?: string;

	/**
	* Represents the current transport state (RTCIceTransportState) of ICE for the peer connection transport layer
	*/
	iceTransportState?: string;

	/**
	* Represents the version number of the TLS used in the corresponded transport
	*/
	tlsVersion?: string;

	/**
	* Represents the name of the DTLS cipher used in the corresponded transport
	*/
	dtlsCipher?: string;

	/**
	* Represents the name of the SRTP cipher used in the corresponded transport
	*/
	srtpCipher?: string;

	/**
	* Represents the name of the IANA TLS Supported Groups used in the corresponded transport
	*/
	tlsGroup?: string;

	/**
	* The total number of candidate pair changes over the peer connection
	*/
	selectedCandidatePairChanges?: number;

	/**
	* The address of the candidate (IPv4, IPv6, FQDN)
	*/
	localAddress?: string;

	/**
	* The locally used port to communicate with the remote peer
	*/
	localPort?: number;

	/**
	* The protocol used by the local endpoint for the corresponded transport
	*/
	localProtocol?: string;

	/**
	* The type of the ICE candidate used at the local endpoint on the corresponded transport
	*/
	localCandidateType?: string;

	/**
	* The url of the ICE server used by the local endpoint on the corresponded transport
	*/
	localCandidateICEServerUrl?: string;

	/**
	* The relay protocol of the ICE candidate used by the local endpoint on the corresponded transport
	*/
	localCandidateRelayProtocol?: string;

	/**
	* The address of the candidate (IPv4, IPv6, FQDN)
	*/
	remoteAddress?: string;

	/**
	* The remotely used port to communicate with the remote peer
	*/
	remotePort?: number;

	/**
	* The protocol used by the remote endpoint for the corresponded transport
	*/
	remoteProtocol?: string;

	/**
	* The type of the ICE candidate used at the remote endpoint on the corresponded transport
	*/
	remoteCandidateType?: string;

	/**
	* The url of the ICE server used by the remote endpoint on the corresponded transport
	*/
	remoteCandidateICEServerUrl?: string;

	/**
	* The relay protocol of the ICE candidate used by the remote endpoint on the corresponded transport
	*/
	remoteCandidateRelayProtocol?: string;

	/**
	* The state of ICE Candidate Pairs (RTCStatsIceCandidatePairState) on the corresponded transport
	*/
	candidatePairState?: string;

	/**
	* The total number of packets sent using the last selected candidate pair over the corresponded transport
	*/
	candidatePairPacketsSent?: number;

	/**
	* The total number of packets received using the last selected candidate pair over the corresponded transport
	*/
	candidatePairPacketsReceived?: number;

	/**
	* The total number of bytes sent using the last selected candidate pair over the corresponded transport
	*/
	candidatePairBytesSent?: number;

	/**
	* The total number of bytes received using the last selected candidate pair over the corresponded transport
	*/
	candidatePairBytesReceived?: number;

	/**
	* Represents the timestamp at which the last packet was sent on the selected candidate pair, excluding STUN packets over the corresponded transport (UTC Epoch in ms)
	*/
	candidatePairLastPacketSentTimestamp?: number;

	/**
	* Represents the timestamp at which the last packet was received on the selected candidate pair, excluding STUN packets over the corresponded transport (UTC Epoch in ms)
	*/
	candidatePairLastPacketReceivedTimestamp?: number;

	/**
	* Represents the timestamp at which the first STUN request was sent on this particular candidate pair over the corresponded transport (UTC Epoch in ms)
	*/
	candidatePairFirstRequestTimestamp?: number;

	/**
	* Represents the timestamp at which the last STUN request was sent on this particular candidate pair over the corresponded transport (UTC Epoch in ms)
	*/
	candidatePairLastRequestTimestamp?: number;

	/**
	* Represents the timestamp at which the last STUN response was received on this particular candidate pair over the corresponded transport (UTC Epoch in ms)
	*/
	candidatePairLastResponseTimestamp?: number;

	/**
	* Represents the sum of all round trip time measurements in seconds since the beginning of the session, based on STUN connectivity check over the corresponded transport
	*/
	candidatePairTotalRoundTripTime?: number;

	/**
	* Represents the last round trip time measurements in seconds based on STUN connectivity check over the corresponded transport
	*/
	candidatePairCurrentRoundTripTime?: number;

	/**
	* The sum of the underlying cc algorithm provided outgoing bitrate for the RTP streams over the corresponded transport
	*/
	candidatePairAvailableOutgoingBitrate?: number;

	/**
	* The sum of the underlying cc algorithm provided incoming bitrate for the RTP streams over the corresponded transport
	*/
	candidatePairAvailableIncomingBitrate?: number;

	/**
	* The total number of circuit breaker triggered over the corresponded transport using the selected candidate pair
	*/
	candidatePairCircuitBreakerTriggerCount?: number;

	/**
	* Represents the total number of connectivity check requests received on the selected candidate pair using the corresponded transport
	*/
	candidatePairRequestsReceived?: number;

	/**
	* Represents the total number of connectivity check requests sent on the selected candidate pair using the corresponded transport
	*/
	candidatePairRequestsSent?: number;

	/**
	* Represents the total number of connectivity check responses received on the selected candidate pair using the corresponded transport
	*/
	candidatePairResponsesReceived?: number;

	/**
	* Represents the total number of connectivity check responses sent on the selected candidate pair using the corresponded transport
	*/
	candidatePairResponsesSent?: number;

	/**
	* Represents the total number of connectivity check retransmission received on the selected candidate pair using the corresponded transport
	*/
	candidatePairRetransmissionReceived?: number;

	/**
	* Represents the total number of connectivity check retransmission sent on the selected candidate pair using the corresponded transport
	*/
	candidatePairRetransmissionSent?: number;

	/**
	* Represents the total number of consent requests sent on the selected candidate pair using the corresponded transport
	*/
	candidatePairConsentRequestsSent?: number;

	/**
	* Represents the timestamp at which the latest valid STUN binding response expired on the selected candidate pair using the corresponded transport
	*/
	candidatePairConsentExpiredTimestamp?: number;

	/**
	* Total amount of bytes for this candidate pair that have been discarded due to socket errors on the selected candidate pair using the corresponded transport
	*/
	candidatePairBytesDiscardedOnSend?: number;

	/**
	* Total amount of packets for this candidate pair that have been discarded due to socket errors on the selected candidate pair using the corresponded transport
	*/
	candidatePairPacketsDiscardedOnSend?: number;

	/**
	* Total number of bytes sent for connectivity checks on the selected candidate pair using the corresponded transport
	*/
	candidatePairRequestBytesSent?: number;

	/**
	* Total number of bytes sent for consent requests on the selected candidate pair using the corresponded transport
	*/
	candidatePairConsentRequestBytesSent?: number;

	/**
	* Total number of bytes sent for connectivity check responses on the selected candidate pair using the corresponded transport
	*/
	candidatePairResponseBytesSent?: number;

	/**
	* The latest smoothed round-trip time value, corresponding to spinfo_srtt defined in [RFC6458] but converted to seconds. 
	*/
	sctpSmoothedRoundTripTime?: number;

	/**
	* The latest congestion window, corresponding to spinfo_cwnd.
	*/
	sctpCongestionWindow?: number;

	/**
	* The latest receiver window, corresponding to sstat_rwnd.
	*/
	sctpReceiverWindow?: number;

	/**
	* The latest maximum transmission unit, corresponding to spinfo_mtu.
	*/
	sctpMtu?: number;

	/**
	* The number of unacknowledged DATA chunks, corresponding to sstat_unackdata.
	*/
	sctpUnackData?: number;

}
