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
	* The sequence number of the sample the report is generated from
	*/
	sampleSeq: number;

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
	* The unique identifier of the peer connection
	*/
	candidatePairId?: string;

	/**
	* The identifier of the transport the ice candidate pair is negotiated on
	*/
	transportId?: string;

	/**
	* The unique identifier of the candidate the negotiated pair is selected at local side
	*/
	localCandidateId?: string;

	/**
	* The unique identifier of the candidate the negotiated pair is selected at remote side
	*/
	remoteCandidateId?: string;

	/**
	* The state of ICE Candidate Pairs (RTCStatsIceState) on the corresponded transport
	*/
	state?: string;

	/**
	* indicate if the ice candidate pair is nominated or not
	*/
	nominated?: boolean;

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
	* Represents the total number of consent requests sent on the selected candidate pair using the corresponded transport
	*/
	consentRequestsSent?: number;

	/**
	* Total amount of packets for this candidate pair that have been discarded due to socket errors on the selected candidate pair using the corresponded transport
	*/
	packetsDiscardedOnSend?: number;

	/**
	* Total amount of bytes for this candidate pair that have been discarded due to socket errors on the selected candidate pair using the corresponded transport
	*/
	bytesDiscardedOnSend?: number;

}
