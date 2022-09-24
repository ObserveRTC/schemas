/**
* A Report created for ICE candidate pairs
*/
export type IceCandidatePairReport = {
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
	* The state of ICE Candidate Pairs (RTCStatsIceState) on the corresponded transport
	*/
	state?: string;

	/**
	* The total number of packets sent using the last selected candidate pair over the corresponded transport
	*/
	packetsSent?: number;

	/**
	* The total number of packets received using the last selected candidate pair over the corresponded transport
	*/
	packetsReceived?: number;

	/**
	* The total number of bytes sent using the last selected candidate pair over the corresponded transport
	*/
	bytesSent?: number;

	/**
	* The total number of bytes received using the last selected candidate pair over the corresponded transport
	*/
	bytesReceived?: number;

	/**
	* Represents the timestamp at which the last packet was sent on the selected candidate pair, excluding STUN packets over the corresponded transport (UTC Epoch in ms)
	*/
	lastPacketSentTimestamp?: number;

	/**
	* Represents the timestamp at which the last packet was received on the selected candidate pair, excluding STUN packets over the corresponded transport (UTC Epoch in ms)
	*/
	lastPacketReceivedTimestamp?: number;

	/**
	* Represents the timestamp at which the first STUN request was sent on this particular candidate pair over the corresponded transport (UTC Epoch in ms)
	*/
	firstRequestTimestamp?: number;

	/**
	* Represents the timestamp at which the last STUN request was sent on this particular candidate pair over the corresponded transport (UTC Epoch in ms)
	*/
	lastRequestTimestamp?: number;

	/**
	* Represents the timestamp at which the last STUN response was received on this particular candidate pair over the corresponded transport (UTC Epoch in ms)
	*/
	lastResponseTimestamp?: number;

	/**
	* Represents the sum of all round trip time measurements in seconds since the beginning of the session, based on STUN connectivity check over the corresponded transport
	*/
	totalRoundTripTime?: number;

	/**
	* Represents the last round trip time measurements in seconds based on STUN connectivity check over the corresponded transport
	*/
	currentRoundTripTime?: number;

	/**
	* The sum of the underlying cc algorithm provided outgoing bitrate for the RTP streams over the corresponded transport
	*/
	availableOutgoingBitrate?: number;

	/**
	* The sum of the underlying cc algorithm provided incoming bitrate for the RTP streams over the corresponded transport
	*/
	availableIncomingBitrate?: number;

	/**
	* The total number of circuit breaker triggered over the corresponded transport using the selected candidate pair
	*/
	circuitBreakerTriggerCount?: number;

	/**
	* Represents the total number of connectivity check requests received on the selected candidate pair using the corresponded transport
	*/
	requestsReceived?: number;

	/**
	* Represents the total number of connectivity check requests sent on the selected candidate pair using the corresponded transport
	*/
	requestsSent?: number;

	/**
	* Represents the total number of connectivity check responses received on the selected candidate pair using the corresponded transport
	*/
	responsesReceived?: number;

	/**
	* Represents the total number of connectivity check responses sent on the selected candidate pair using the corresponded transport
	*/
	responsesSent?: number;

	/**
	* Represents the total number of connectivity check retransmission received on the selected candidate pair using the corresponded transport
	*/
	retransmissionReceived?: number;

	/**
	* Represents the total number of connectivity check retransmission sent on the selected candidate pair using the corresponded transport
	*/
	retransmissionSent?: number;

	/**
	* Represents the total number of consent requests sent on the selected candidate pair using the corresponded transport
	*/
	consentRequestsSent?: number;

	/**
	* Represents the timestamp at which the latest valid STUN binding response expired on the selected candidate pair using the corresponded transport
	*/
	consentExpiredTimestamp?: number;

	/**
	* Total amount of bytes for this candidate pair that have been discarded due to socket errors on the selected candidate pair using the corresponded transport
	*/
	bytesDiscardedOnSend?: number;

	/**
	* Total amount of packets for this candidate pair that have been discarded due to socket errors on the selected candidate pair using the corresponded transport
	*/
	packetsDiscardedOnSend?: number;

	/**
	* Total number of bytes sent for connectivity checks on the selected candidate pair using the corresponded transport
	*/
	requestBytesSent?: number;

	/**
	* Total number of bytes sent for consent requests on the selected candidate pair using the corresponded transport
	*/
	consentRequestBytesSent?: number;

	/**
	* Total number of bytes sent for connectivity check responses on the selected candidate pair using the corresponded transport
	*/
	responseBytesSent?: number;

}
