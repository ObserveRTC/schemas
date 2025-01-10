
export const schemaVersion = "3.0.0";

/**
* Session data
*/
export type TurnSession = {
	/**
	* Flag indicate to not generate report from this sample
	*/
	sessionId: string;

	/**
	* The Authentication Realm (RFC 8656)
	*/
	realm?: string;

	/**
	* The username of the used in authentication
	*/
	username?: string;

	/**
	* The id of the client the TURN session belongs to (ClientSample)
	*/
	clientId?: string;

	/**
	* The timestamp when the session has been started. Epoch in milliseconds, GMT
	*/
	started?: number;

	/**
	* For each Allocate request, the server SHOULD generate a new random nonce when the allocation is first attempted following the randomness recommendations in [RFC4086] and SHOULD expire the nonce at least once every hour during the lifetime of the allocation.  Epoch in millis GMT
	*/
	nonceExpirationTime?: number;

	/**
	* The address of the server the client connected to
	*/
	serverAddress?: string;

	/**
	* The portnumber the server listens the client requests
	*/
	serverPort?: number;

	/**
	* the transport protocol betwwen the client and the server (TCP, UDP, TCPTLS, UDPTLS, SCTP, SCTPTLS)
	*/
	transportProtocol?: string;

	/**
	* The address of the client connected from
	*/
	clientAddress?: string;

	/**
	* The portnumber the client requested from
	*/
	clientPort?: number;

	/**
	* the bitrate the TURN server sending to the client
	*/
	sendingBitrate?: number;

	/**
	* the bitrate the TURN server receiving from the client
	*/
	receivingBitrate?: number;

	/**
	* the amount of bytes sent to the client
	*/
	sentBytes?: number;

	/**
	* the amount of bytes received from the client
	*/
	receivedBytes?: number;

	/**
	* the amount of packets sent to the client
	*/
	sentPackets?: number;

	/**
	* the amount of packets received from the client
	*/
	receivedPackets?: number;

}

/**
* Peer Alloocation data
*/
export type TurnPeerAllocation = {
	/**
	* a unique id for the allocation
	*/
	peerId: string;

	/**
	* The corresponded session the allocation belongs to
	*/
	sessionId: string;

	/**
	* The allocated address
	*/
	relayedAddress: string;

	/**
	* The allocated port
	*/
	relayedPort: number;

	/**
	* protocol (TCP, UDP)
	*/
	transportProtocol: string;

	/**
	* The address of the address the serever connect to
	*/
	peerAddress?: string;

	/**
	* The portnumber the server connects to
	*/
	peerPort?: number;

	/**
	* the bitrate the TURN server sending to the peer
	*/
	sendingBitrate?: number;

	/**
	* the bitrate the TURN server receiving from the peer
	*/
	receivingBitrate?: number;

	/**
	* the amount of bytes sent to the peer
	*/
	sentBytes?: number;

	/**
	* the amount of bytes received from the peer
	*/
	receivedBytes?: number;

	/**
	* the amount of packets sent to the peer
	*/
	sentPackets?: number;

	/**
	* the amount of packets received from the peer
	*/
	receivedPackets?: number;

}

/**
* docs
*/
export type TurnSample = {
	/**
	* A unique id of the turn server
	*/
	serverId: string;

	/**
	* Peer Alloocation data
	*/
	allocations?: TurnPeerAllocation[];

	/**
	* Session data
	*/
	sessions?: TurnSession[];

}

/**
* The Sfu provided custom stats payload
*/
export type SfuExtensionStats = {
	/**
	* The type of the extension stats the custom app provides
	*/
	type: string;

	/**
	* The payload of the extension stats the custom app provides
	*/
	payload: string;

}

/**
* The Sfu Outbound Rtp Pad obtained measurements
*/
export type SfuSctpChannel = {
	/**
	* The id of the transport the RTP stream uses.
	*/
	transportId: string;

	/**
	* The id of the sctp stream
	*/
	streamId: string;

	/**
	* The id of the sctp stream
	*/
	channelId: string;

	/**
	* Flag indicate to not generate report from this sample
	*/
	noReport?: boolean;

	/**
	* Flag to indicate that the SCTP channel is used as an internally between SFU instances
	*/
	internal?: boolean;

	/**
	* The label of the sctp stream
	*/
	label?: string;

	/**
	* The protocol used to establish an sctp stream
	*/
	protocol?: string;

	/**
	* The latest smoothed round-trip time value, corresponding to spinfo_srtt defined in [RFC6458] but converted to seconds. If there has been no round-trip time measurements yet, this value is undefined.
	*/
	sctpSmoothedRoundTripTime?: number;

	/**
	* The latest congestion window, corresponding to spinfo_cwnd defined in [RFC6458].
	*/
	sctpCongestionWindow?: number;

	/**
	* The latest receiver window, corresponding to sstat_rwnd defined in [RFC6458].
	*/
	sctpReceiverWindow?: number;

	/**
	* The latest maximum transmission unit, corresponding to spinfo_mtu defined in [RFC6458].
	*/
	sctpMtu?: number;

	/**
	* The number of unacknowledged DATA chunks, corresponding to sstat_unackdata defined in [RFC6458].
	*/
	sctpUnackData?: number;

	/**
	* The number of message received on the corresponded SCTP stream.
	*/
	messageReceived?: number;

	/**
	* The number of message sent on the corresponded SCTP stream.
	*/
	messageSent?: number;

	/**
	* The number of bytes received on the corresponded SCTP stream.
	*/
	bytesReceived?: number;

	/**
	* The number of bytes sent on the corresponded SCTP stream.
	*/
	bytesSent?: number;

}

/**
* The Sfu Outbound Rtp Pad obtained measurements
*/
export type SfuOutboundRtpPad = {
	/**
	* The id of the transport the RTP stream uses.
	*/
	transportId: string;

	/**
	* The id of the stream this outbound RTP pad sinks the media from
	*/
	streamId: string;

	/**
	* The id of a group of RTP pad sinks the media stream out from the SFU.
	*/
	sinkId: string;

	/**
	* The id of Sfu pad.
	*/
	padId: string;

	/**
	* The synchronization source id of the RTP stream
	*/
	ssrc: number;

	/**
	* Flag indicate to not generate report from this sample
	*/
	noReport?: boolean;

	/**
	* Flag to indicate that the rtp pad is used as an internal communication between SFU instances
	*/
	internal?: boolean;

	/**
	* The callId the event belongs to
	*/
	callId?: string;

	/**
	* If the track id was provided by the Sfu, the observer can fill up the information of which client it belongs to
	*/
	clientId?: string;

	/**
	* The id of the track the RTP stream related to at the client side
	*/
	trackId?: string;

	/**
	* the type of the media the stream carries ("audio" or "video")
	*/
	mediaType?: "audio" | "video";

	/**
	* The payload type field of the RTP header
	*/
	payloadType?: number;

	/**
	* The negotiated mimeType in the SDP
	*/
	mimeType?: string;

	/**
	* The clock rate of the media source the RTP header carries
	*/
	clockRate?: number;

	/**
	* The actual SDP line from the negotiation related to this RTP stream
	*/
	sdpFmtpLine?: string;

	/**
	*  The rid parameter of the corresponded RTP stream
	*/
	rid?: string;

	/**
	* If RTX is negotiated as a separate stream, this is the SSRC of the RTX stream that is associated with this stream's ssrc. 
	*/
	rtxSsrc?: number;

	/**
	* he bitrate the corresponded stream targets.
	*/
	targetBitrate?: number;

	/**
	* The RTP header V flag indicate of the activity of the media source by the media codec if the RTP transport ships it through
	*/
	voiceActivityFlag?: boolean;

	/**
	* The total number FIR packets sent from this endpoint to the source on the corresponded RTP stream. Only for Video streams
	*/
	firCount?: number;

	/**
	* The total number of Picture Loss Indication sent on the corresponded RTP stream. Only for Video streams
	*/
	pliCount?: number;

	/**
	* The total number of negative acknowledgement received on the corresponded RTP stream.
	*/
	nackCount?: number;

	/**
	* The total number of SLI indicator sent from the endpoint on the corresponded RTP stream. Only for Audio stream
	*/
	sliCount?: number;

	/**
	* The total number of packets lost on the corresponded RTP stream.
	*/
	packetsLost?: number;

	/**
	* The total number of packets sent on the corresponded RTP stream.
	*/
	packetsSent?: number;

	/**
	* The total number of discarded packets on the corresponded RTP stream.
	*/
	packetsDiscarded?: number;

	/**
	* The total number of packets retransmitted on the corresponded RTP stream.
	*/
	packetsRetransmitted?: number;

	/**
	* The total number of packets failed to be encrypted on the corresponded RTP stream.
	*/
	packetsFailedEncryption?: number;

	/**
	* The total number of duplicated packets appeared on the corresponded RTP stream.
	*/
	packetsDuplicated?: number;

	/**
	* The total number of FEC packets sent on the corresponded RTP stream.
	*/
	fecPacketsSent?: number;

	/**
	* The total number of FEC packets discarded on the corresponded RTP stream.
	*/
	fecPacketsDiscarded?: number;

	/**
	* The total amount of payload bytes sent on the corresponded RTP stream.
	*/
	bytesSent?: number;

	/**
	* The total number of SR reports sent by the corresponded RTP stream
	*/
	rtcpSrSent?: number;

	/**
	* The total number of RR reports received on the corresponded RTP stream
	*/
	rtcpRrReceived?: number;

	/**
	* If rtx packets sent on the same stream then this number indicates how may has been sent
	*/
	rtxPacketsSent?: number;

	/**
	* If rtx packets are received on the same stream then this number indicates how may has been discarded
	*/
	rtxPacketsDiscarded?: number;

	/**
	* The number of frames sent on the corresponded RTP stream
	*/
	framesSent?: number;

	/**
	* Indicate the number of frames the Sfu has been encoded
	*/
	framesEncoded?: number;

	/**
	* Indicate the number of keyframes the Sfu has been encoded on the corresponded RTP stream
	*/
	keyFramesEncoded?: number;

	/**
	* The calculated fractionLost of the stream
	*/
	fractionLost?: number;

	/**
	* The calculated jitter of the stream
	*/
	jitter?: number;

	/**
	* The calculated RTT of the stream
	*/
	roundTripTime?: number;

}

/**
* The Sfu Inbound Rtp Pad obtained measurements
*/
export type SfuInboundRtpPad = {
	/**
	* The id of the transport the RTP Pad uses.
	*/
	transportId: string;

	/**
	* The id of the media stream the RTP pad belongs to. This id is to group rtp pads (e.g.: simulcast) carrying payloads to the same media. 
	*/
	streamId: string;

	/**
	* The id of Sfu pad.
	*/
	padId: string;

	/**
	* The synchronization source id of the RTP stream
	*/
	ssrc: number;

	/**
	* Flag indicate to not generate report from this sample
	*/
	noReport?: boolean;

	/**
	* Flag to indicate that the rtp pad is used as an internal communication between SFU instances
	*/
	internal?: boolean;

	/**
	* the type of the media the stream carries ("audio" or "video")
	*/
	mediaType?: "audio" | "video";

	/**
	* The payload type field of the RTP header
	*/
	payloadType?: number;

	/**
	* The negotiated mimeType in the SDP
	*/
	mimeType?: string;

	/**
	* The clock rate of the media source the RTP header carries
	*/
	clockRate?: number;

	/**
	* The actual SDP line from the negotiation related to this RTP stream
	*/
	sdpFmtpLine?: string;

	/**
	*  The rid parameter of the corresponded RTP stream
	*/
	rid?: string;

	/**
	* If RTX is negotiated as a separate stream, this is the SSRC of the RTX stream that is associated with this stream's ssrc. 
	*/
	rtxSsrc?: number;

	/**
	* he bitrate the corresponded stream targets.
	*/
	targetBitrate?: number;

	/**
	* The RTP header V flag indicate of the activity of the media source by the media codec if the RTP transport ships it through
	*/
	voiceActivityFlag?: boolean;

	/**
	* The total number FIR packets sent from this endpoint to the source on the corresponded RTP stream. Only for Video streams
	*/
	firCount?: number;

	/**
	* The total number of Picture Loss Indication sent on the corresponded RTP stream. Only for Video streams
	*/
	pliCount?: number;

	/**
	* The total number of negative acknowledgement received on the corresponded RTP stream.
	*/
	nackCount?: number;

	/**
	* The total number of SLI indicator sent from the endpoint on the corresponded RTP stream. Only for Audio stream
	*/
	sliCount?: number;

	/**
	* The total number of packets lost on the corresponded RTP stream.
	*/
	packetsLost?: number;

	/**
	* The total number of packets received on the corresponded RTP stream.
	*/
	packetsReceived?: number;

	/**
	* The total number of discarded packets on the corresponded RTP stream.
	*/
	packetsDiscarded?: number;

	/**
	* The total number of packets repaired by either retransmission or FEC on the corresponded RTP stream.
	*/
	packetsRepaired?: number;

	/**
	* The total number of packets failed to be decrypted on the corresponded RTP stream.
	*/
	packetsFailedDecryption?: number;

	/**
	* The total number of duplicated packets appeared on the corresponded RTP stream.
	*/
	packetsDuplicated?: number;

	/**
	* The total number of FEC packets received on the corresponded RTP stream.
	*/
	fecPacketsReceived?: number;

	/**
	* The total number of FEC packets discarded on the corresponded RTP stream.
	*/
	fecPacketsDiscarded?: number;

	/**
	* The total amount of payload bytes received on the corresponded RTP stream.
	*/
	bytesReceived?: number;

	/**
	* The total number of SR reports received by the corresponded RTP stream
	*/
	rtcpSrReceived?: number;

	/**
	* The total number of RR reports sent on the corresponded RTP stream
	*/
	rtcpRrSent?: number;

	/**
	* If rtx packets are sent or received on the same stream then this number indicates how may has been sent
	*/
	rtxPacketsReceived?: number;

	/**
	* If rtx packets are received on the same stream then this number indicates how may has been discarded
	*/
	rtxPacketsDiscarded?: number;

	/**
	* The number of frames received on the corresponded RTP stream
	*/
	framesReceived?: number;

	/**
	* Indicate the number of frames the Sfu has been decoded
	*/
	framesDecoded?: number;

	/**
	* Indicate the number of keyframes the Sfu has been decoded
	*/
	keyFramesDecoded?: number;

	/**
	* The calculated fractionLost of the stream
	*/
	fractionLost?: number;

	/**
	* The calculated jitter of the stream
	*/
	jitter?: number;

	/**
	* The calculated RTT of the stream
	*/
	roundTripTime?: number;

}

/**
* The Sfu Transports obtained measurements
*/
export type SfuTransport = {
	/**
	* The generated unique identifier of the transport
	*/
	transportId: string;

	/**
	* Flag indicate to not generate report from this sample
	*/
	noReport?: boolean;

	/**
	* Flag to indicate that the transport is used as an internal transport between SFU instances
	*/
	internal?: boolean;

	/**
	* Represent the current value of the state attribute of the underlying RTCDtlsTransport.
	*/
	dtlsState?: string;

	/**
	* Represent the current value of the state attribute of the underlying RTCIceTransport
	*/
	iceState?: string;

	/**
	* Represents the the current value of the SCTP state of the transport of the SFU
	*/
	sctpState?: string;

	/**
	* Represent the current value of the role SFU takes place in ICE
	*/
	iceRole?: string;

	/**
	* The local address of the ICE candidate selected for the transport (IPv4, IPv6, FQDN)
	*/
	localAddress?: string;

	/**
	* The local port number
	*/
	localPort?: number;

	/**
	* The protocol used by the transport
	*/
	protocol?: string;

	/**
	* The remote address of the ICE candidate selected for the transport (IPv4, IPv6, FQDN)
	*/
	remoteAddress?: string;

	/**
	* The remote port number
	*/
	remotePort?: number;

	/**
	* The total amount of RTP bytes received on this transport
	*/
	rtpBytesReceived?: number;

	/**
	* The total amount of RTP bytes sent on this transport
	*/
	rtpBytesSent?: number;

	/**
	* The total amount of RTP packets received on this transport
	*/
	rtpPacketsReceived?: number;

	/**
	* The total amount of RTP packets sent on this transport
	*/
	rtpPacketsSent?: number;

	/**
	* The total amount of RTP packets lost on this transport
	*/
	rtpPacketsLost?: number;

	/**
	* The total amount of RTX bytes received on this transport
	*/
	rtxBytesReceived?: number;

	/**
	* The total amount of RTX bytes sent on this transport
	*/
	rtxBytesSent?: number;

	/**
	* The total amount of RTX packets received on this transport
	*/
	rtxPacketsReceived?: number;

	/**
	* The total amount of RTX packets sent on this transport
	*/
	rtxPacketsSent?: number;

	/**
	* The total amount of RTX packets lost on this transport
	*/
	rtxPacketsLost?: number;

	/**
	* The total amount of RTX packets discarded on this transport
	*/
	rtxPacketsDiscarded?: number;

	/**
	* The total amount of SCTP bytes received on this transport
	*/
	sctpBytesReceived?: number;

	/**
	* The total amount of SCTP bytes sent on this transport
	*/
	sctpBytesSent?: number;

	/**
	* The total amount of SCTP packets received on this transport
	*/
	sctpPacketsReceived?: number;

	/**
	* The total amount of SCTP packets sent on this transport
	*/
	sctpPacketsSent?: number;

}

/**
* User provided custom call events
*/
export type CustomSfuEvent = {
	/**
	* the name of the event used as identifier. (e.g.: CLIENT_REJOINED, etc..)
	*/
	name: string;

	/**
	* the value of the event
	*/
	value?: string;

	/**
	* The unique identifier of the sfu transport the event is related to
	*/
	transportId?: string;

	/**
	* The identifier of the sfu stream the event is related to
	*/
	sfuStreamId?: string;

	/**
	* The identifier of the sfu sink the event is related to
	*/
	sfuSinkId?: string;

	/**
	* the human readable message of the event
	*/
	message?: string;

	/**
	* Additional attachment relevant for the event
	*/
	attachments?: string;

	/**
	* The EPOCH timestamp the event is generated
	*/
	timestamp?: number;

}

/**
* docs
*/
export type SfuSample = {
	/**
	* Unique generated id for the sfu samples are originated from
	*/
	sfuId: string;

	/**
	* The timestamp the sample is created in GMT
	*/
	timestamp: number;

	/**
	* The offset from GMT in hours
	*/
	timeZoneOffsetInHours?: number;

	/**
	* Special marker for the samples
	*/
	marker?: string;

	/**
	* User provided custom call events
	*/
	customSfuEvents?: CustomSfuEvent[];

	/**
	* The Sfu Transports obtained measurements
	*/
	transports?: SfuTransport[];

	/**
	* The Sfu Inbound Rtp Pad obtained measurements
	*/
	inboundRtpPads?: SfuInboundRtpPad[];

	/**
	* The Sfu Outbound Rtp Pad obtained measurements
	*/
	outboundRtpPads?: SfuOutboundRtpPad[];

	/**
	* The Sfu Outbound Rtp Pad obtained measurements
	*/
	sctpChannels?: SfuSctpChannel[];

	/**
	* The Sfu provided custom stats payload
	*/
	extensionStats?: SfuExtensionStats[];

}

/**
* Additional control flags indicate various operation has to be performed
*/
export type Controls = {
	/**
	* Indicate that the server should close the connection
	*/
	close?: boolean;

	/**
	* Holds a new claim to process
	*/
	accessClaim?: string;

}

/**
* Observer created reports related to events (call started, call ended, client joined, etc...) indicated by the incoming samples.
*/
export type Samples = {
	/**
	* Additional control flags indicate various operation has to be performed
	*/
	controls?: Controls;

	/**
	* Samples taken from an Sfu
	*/
	sfuSamples?: SfuSample[];

	/**
	* Samples taken from the TURN server
	*/
	turnSamples?: TurnSample[];

}
