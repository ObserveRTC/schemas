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
* List of Data channels
*/
export type DataChannel = {
	/**
	* Refers to the peer connection the local candidate belongs to
	*/
	peerConnectionId?: string;

	/**
	* Unique identifier of the data channel
	*/
	id?: string;

	/**
	* The label the data channel provided at the creation
	*/
	label?: string;

	/**
	* The address of the local endpoint (Ipv4, Ipv6, FQDN)
	*/
	address?: string;

	/**
	* The port number of the local endpoint the ICE uses
	*/
	port?: number;

	/**
	*  The protocol the data channel use to transfer data
	*/
	protocol?: string;

	/**
	* The unique identifier of the data channel
	*/
	dataChannelIdentifier?: number;

	/**
	* The state of the data channel
	*/
	state?: string;

	/**
	* The total number of messages sent on this data channel. this is not equal to the number of packets sent, as messages are chunked to packets
	*/
	messagesSent?: number;

	/**
	* The amount of bytes sent on the corresponded data channel
	*/
	bytesSent?: number;

	/**
	* The number of messages received on the corresponded data channel
	*/
	messagesReceived?: number;

	/**
	* The amount of bytes received on the corresponded data channel
	*/
	bytesReceived?: number;

}

/**
* List of remote ICE candidates
*/
export type IceRemoteCandidate = {
	/**
	* Refers to the peer connection the local candidate belongs to
	*/
	peerConnectionId?: string;

	/**
	* The unique identifier of the local candidate
	*/
	id?: string;

	/**
	* The unique identifier of the transport the local candidate belongs to
	*/
	transportId?: string;

	/**
	* The address of the local endpoint (Ipv4, Ipv6, FQDN)
	*/
	address?: string;

	/**
	* The port number of the local endpoint the ICE uses
	*/
	port?: number;

	/**
	* The protocol for the ICE
	*/
	protocol?: "tcp" | "udp";

	/**
	* The type of the local candidate
	*/
	candidateType?: string;

	/**
	* The priority of the local candidate
	*/
	priority?: number;

	/**
	* The url of the ICE server
	*/
	url?: string;

	/**
	* The relay protocol the local candidate uses
	*/
	relayProtocol?: "tcp" | "udp" | "tls";

}

/**
* List of local ICE candidates
*/
export type IceLocalCandidate = {
	/**
	* Refers to the peer connection the local candidate belongs to
	*/
	peerConnectionId?: string;

	/**
	* The unique identifier of the local candidate
	*/
	id?: string;

	/**
	* The unique identifier of the transport the local candidate belongs to
	*/
	transportId?: string;

	/**
	* The address of the local endpoint (Ipv4, Ipv6, FQDN)
	*/
	address?: string;

	/**
	* The port number of the local endpoint the ICE uses
	*/
	port?: number;

	/**
	* The protocol for the ICE
	*/
	protocol?: "tcp" | "udp";

	/**
	* The type of the local candidate
	*/
	candidateType?: string;

	/**
	* The priority of the local candidate
	*/
	priority?: number;

	/**
	* The url of the ICE server
	*/
	url?: string;

	/**
	* The relay protocol the local candidate uses
	*/
	relayProtocol?: "tcp" | "udp" | "tls";

}

/**
* List of compound measurements related to outbound video tracks
*/
export type OutboundVideoTrack = {
	/**
	* The RTP SSRC field
	*/
	ssrc: number;

	/**
	* The id of the track
	*/
	trackId?: string;

	/**
	*  The unique generated identifier of the peer connection the inbound audio track belongs to
	*/
	peerConnectionId?: string;

	/**
	* The id of the SFU stream this track is related to
	*/
	sfuStreamId?: string;

	/**
	* The total number of packets sent on the corresponded synchronization source
	*/
	packetsSent?: number;

	/**
	* The total number of bytes sent on the corresponded synchronization source
	*/
	bytesSent?: number;

	/**
	* If RTX is negotiated as a separate stream, this is the SSRC of the RTX stream that is associated with this stream's ssrc. 
	*/
	rtxSsrc?: number;

	/**
	*  The rid encoding parameter of the corresponded synchronization source
	*/
	rid?: string;

	/**
	*  the timestamp the last packet was sent. (UTC epoch in ms)
	*/
	lastPacketSentTimestamp?: number;

	/**
	* Total number of RTP header and padding bytes sent over the corresponding synchronization source (ssrc)
	*/
	headerBytesSent?: number;

	/**
	* Total number of RTP packets discarded at sender side over the corresponding synchronization source (ssrc)
	*/
	packetsDiscardedOnSend?: number;

	/**
	* Total number of RTP bytes discarded at sender side over the corresponding synchronization source (ssrc)
	*/
	bytesDiscardedOnSend?: number;

	/**
	* Total number of FEC packets sent over the corresponding synchronization source (ssrc)
	*/
	fecPacketsSent?: number;

	/**
	* Total number of retransmitted packets sent over the corresponding synchronization source (ssrc).
	*/
	retransmittedPacketsSent?: number;

	/**
	* Total number of retransmitted bytes sent over the corresponding synchronization source (ssrc).
	*/
	retransmittedBytesSent?: number;

	/**
	* Reflects the current encoder target in bits per second.
	*/
	targetBitrate?: number;

	/**
	* The total number of bytes of RTP coherent frames encoded completly depending on the frame size the encoder targets
	*/
	totalEncodedBytesTarget?: number;

	/**
	* The total number of delay packets buffered at the sender side in seconds over the corresponding synchronization source
	*/
	totalPacketSendDelay?: number;

	/**
	* The average RTCP interval between two consecutive compound RTCP packets sent for the corresponding synchronization source (ssrc)
	*/
	averageRtcpInterval?: number;

	/**
	* The total number of DSCP flagged RTP packets sent over the corresponding synchronization source (ssrc)
	*/
	perDscpPacketsSent?: number;

	/**
	* Count the total number of Negative ACKnowledgement (NACK) packets received over the corresponding synchronization source (ssrc)
	*/
	nackCount?: number;

	/**
	* Indicate the name of the encoder implementation library
	*/
	encoderImplementation?: string;

	/**
	* The frame width in pixels of the frames targeted by the media encoder
	*/
	frameWidth?: number;

	/**
	* The frame width the media encoder targeted
	*/
	frameHeight?: number;

	/**
	* The frame depth in pixles on the corresponded RTP stream
	*/
	frameBitDepth?: number;

	/**
	* The encoded number of frames in the last second on the corresponded media source
	*/
	framesPerSecond?: number;

	/**
	* TThe total number of frames sent on the corresponded RTP stream
	*/
	framesSent?: number;

	/**
	* The total number of huge frames (avgFrameSize * 2.5) on the corresponded RTP stream
	*/
	hugeFramesSent?: number;

	/**
	* The total number of frames encoded by the media source
	*/
	framesEncoded?: number;

	/**
	* The total number of keyframes encoded on the corresponded RTP stream
	*/
	keyFramesEncoded?: number;

	/**
	* The total number of frames discarded on the corresponded RTP stream.
	*/
	framesDiscardedOnSend?: number;

	/**
	* The sum of the QP the media encoder provided on the corresponded RTP stream.
	*/
	qpSum?: number;

	/**
	* The total time in seconds spent in encoding media frames for the corresponded RTP stream.
	*/
	totalEncodeTime?: number;

	/**
	* Time elapsed in seconds when the RTC connection has not limited the quality
	*/
	qualityLimitationDurationNone?: number;

	/**
	* Time elapsed in seconds the RTC connection had a limitation because of CPU
	*/
	qualityLimitationDurationCPU?: number;

	/**
	* Time elapsed in seconds the RTC connection had a limitation because of Bandwidth
	*/
	qualityLimitationDurationBandwidth?: number;

	/**
	* Time elapsed in seconds the RTC connection had a limitation because of Other factor
	*/
	qualityLimitationDurationOther?: number;

	/**
	* Indicate a reason for the quality limitation of the corresponded synchronization source
	*/
	qualityLimitationReason?: string;

	/**
	* The total number of resolution changes occured ont he corresponded RTP stream due to quality changes
	*/
	qualityLimitationResolutionChanges?: number;

	/**
	* The total number of packets received on the corresponded synchronization source
	*/
	packetsReceived?: number;

	/**
	* The total number of bytes received on the corresponded synchronization source
	*/
	packetsLost?: number;

	/**
	* The corresponded synchronization source reported jitter
	*/
	jitter?: number;

	/**
	* The total number of packets missed the playout point and therefore discarded by the jitterbuffer
	*/
	packetsDiscarded?: number;

	/**
	* The total number of packets repaired by either FEC or due to retransmission on the corresponded synchronization source
	*/
	packetsRepaired?: number;

	/**
	* The total number of packets lost in burst (RFC6958)
	*/
	burstPacketsLost?: number;

	/**
	* The total number of packets discarded in burst (RFC6958)
	*/
	burstPacketsDiscarded?: number;

	/**
	* The total number of burst happened causes burstPacketsLost on the corresponding synchronization source
	*/
	burstLossCount?: number;

	/**
	* The total number of burst happened causes burstPacketsDiscarded on the corresponding synchronization source
	*/
	burstDiscardCount?: number;

	/**
	* The fraction of RTP packets lost during bursts proportionally to the total number of RTP packets expected in the bursts on the corresponding synchronization source
	*/
	burstLossRate?: number;

	/**
	* The fraction of RTP packets discarded during bursts proportionally to the total number of RTP packets expected in the bursts on the corresponding synchronization source
	*/
	burstDiscardRate?: number;

	/**
	* The fraction of RTP packets lost during gap proportionally to the total number of RTP packets expected in the bursts on the corresponding synchronization source
	*/
	gapLossRate?: number;

	/**
	* The fraction of RTP packets discarded during gap proportionally to the total number of RTP packets expected in the bursts on the corresponding synchronization source
	*/
	gapDiscardRate?: number;

	/**
	* RTT measurement in seconds based on (most likely) SR, and RR belongs to the corresponded synchronization source
	*/
	roundTripTime?: number;

	/**
	* The sum of RTT measurements belongs to the corresponded synchronization source
	*/
	totalRoundTripTime?: number;

	/**
	* The receiver reported fractional lost belongs to the corresponded synchronization source
	*/
	fractionLost?: number;

	/**
	* The total number of RR reports received, which is the base of the remote inbound calculation on this source
	*/
	reportsReceived?: number;

	/**
	* The total number of calculated RR measurements received on this source
	*/
	roundTripTimeMeasurements?: number;

	/**
	* The total number of frames reported to be lost by the remote endpoit on the corresponded RTP stream
	*/
	framesDropped?: number;

	/**
	* The total number of partial frames reported to be lost by the remote endpoint on the corresponded RTP stream.
	*/
	partialFramesLost?: number;

	/**
	* The total number of full frames lost at the remote endpoint on the corresponded RTP stream.
	*/
	fullFramesList?: number;

	/**
	* True if the corresponded media source is remote, false otherwise (or null depending on browser and version)
	*/
	relayedSource?: boolean;

	/**
	* The width, in pixels, of the last frame originating from the media source
	*/
	width?: number;

	/**
	* The height, in pixels, of the last frame originating from the media source
	*/
	height?: number;

	/**
	* The bitDepth, in pixels, of the last frame originating from the media source
	*/
	bitDepth?: number;

	/**
	* The total number of frames originated from the media source
	*/
	frames?: number;

	/**
	* Flag represents if the sender ended the media stream track or not.
	*/
	ended?: boolean;

	/**
	* The type of the payload the RTP packet SSRC belongs to
	*/
	payloadType?: number;

	/**
	* the MIME type of the codec (e.g.: video/vp8)
	*/
	mimeType?: string;

	/**
	* The negotiated clock rate the RTP timestamp is generated of
	*/
	clockRate?: number;

	/**
	* The number of channels for audio is used (in stereo it is 2, otherwise it is most likely null)
	*/
	channels?: number;

	/**
	* The a=fmtp line in the SDP corresponding to the codec
	*/
	sdpFmtpLine?: string;

}

/**
* List of compound measurements related to outbound audio tracks
*/
export type OutboundAudioTrack = {
	/**
	* The RTP SSRC field
	*/
	ssrc: number;

	/**
	* The id of the track
	*/
	trackId?: string;

	/**
	*  The unique generated identifier of the peer connection the inbound audio track belongs to
	*/
	peerConnectionId?: string;

	/**
	* The id of the SFU stream this track is related to
	*/
	sfuStreamId?: string;

	/**
	* The total number of packets sent on the corresponded synchronization source
	*/
	packetsSent?: number;

	/**
	* The total number of bytes sent on the corresponded synchronization source
	*/
	bytesSent?: number;

	/**
	* If RTX is negotiated as a separate stream, this is the SSRC of the RTX stream that is associated with this stream's ssrc. 
	*/
	rtxSsrc?: number;

	/**
	*  The rid encoding parameter of the corresponded synchronization source
	*/
	rid?: string;

	/**
	*  the timestamp the last packet was sent. (UTC epoch in ms)
	*/
	lastPacketSentTimestamp?: number;

	/**
	* Total number of RTP header and padding bytes sent over the corresponding synchronization source (ssrc)
	*/
	headerBytesSent?: number;

	/**
	* Total number of RTP packets discarded at sender side over the corresponding synchronization source (ssrc)
	*/
	packetsDiscardedOnSend?: number;

	/**
	* Total number of RTP bytes discarded at sender side over the corresponding synchronization source (ssrc)
	*/
	bytesDiscardedOnSend?: number;

	/**
	* Total number of FEC packets sent over the corresponding synchronization source (ssrc)
	*/
	fecPacketsSent?: number;

	/**
	* Total number of retransmitted packets sent over the corresponding synchronization source (ssrc).
	*/
	retransmittedPacketsSent?: number;

	/**
	* Total number of retransmitted bytes sent over the corresponding synchronization source (ssrc).
	*/
	retransmittedBytesSent?: number;

	/**
	* Reflects the current encoder target in bits per second.
	*/
	targetBitrate?: number;

	/**
	* The total number of bytes of RTP coherent frames encoded completly depending on the frame size the encoder targets
	*/
	totalEncodedBytesTarget?: number;

	/**
	* The total number of delay packets buffered at the sender side in seconds over the corresponding synchronization source
	*/
	totalPacketSendDelay?: number;

	/**
	* The average RTCP interval between two consecutive compound RTCP packets sent for the corresponding synchronization source (ssrc)
	*/
	averageRtcpInterval?: number;

	/**
	* The total number of DSCP flagged RTP packets sent over the corresponding synchronization source (ssrc)
	*/
	perDscpPacketsSent?: number;

	/**
	* Count the total number of Negative ACKnowledgement (NACK) packets received over the corresponding synchronization source (ssrc)
	*/
	nackCount?: number;

	/**
	* Indicate the name of the encoder implementation library
	*/
	encoderImplementation?: string;

	/**
	* The total number of samples sent over the corresponding synchronization source
	*/
	totalSamplesSent?: number;

	/**
	* The total number of samples encoded by SILK portion in opus sent over the corresponding synchronization source
	*/
	samplesEncodedWithSilk?: number;

	/**
	* The total number of samples encoded by CELT portion in opus sent over the corresponding synchronization source
	*/
	samplesEncodedWithCelt?: number;

	/**
	* Indicate if the last RTP packet sent contained voice activity based on the presence of the V bit in the extension header
	*/
	voiceActivityFlag?: boolean;

	/**
	* The total number of packets received on the corresponded synchronization source
	*/
	packetsReceived?: number;

	/**
	* The total number of bytes received on the corresponded synchronization source
	*/
	packetsLost?: number;

	/**
	* The corresponded synchronization source reported jitter
	*/
	jitter?: number;

	/**
	* The total number of packets missed the playout point and therefore discarded by the jitterbuffer
	*/
	packetsDiscarded?: number;

	/**
	* The total number of packets repaired by either FEC or due to retransmission on the corresponded synchronization source
	*/
	packetsRepaired?: number;

	/**
	* The total number of packets lost in burst (RFC6958)
	*/
	burstPacketsLost?: number;

	/**
	* The total number of packets discarded in burst (RFC6958)
	*/
	burstPacketsDiscarded?: number;

	/**
	* The total number of burst happened causes burstPacketsLost on the corresponding synchronization source
	*/
	burstLossCount?: number;

	/**
	* The total number of burst happened causes burstPacketsDiscarded on the corresponding synchronization source
	*/
	burstDiscardCount?: number;

	/**
	* The fraction of RTP packets lost during bursts proportionally to the total number of RTP packets expected in the bursts on the corresponding synchronization source
	*/
	burstLossRate?: number;

	/**
	* The fraction of RTP packets discarded during bursts proportionally to the total number of RTP packets expected in the bursts on the corresponding synchronization source
	*/
	burstDiscardRate?: number;

	/**
	* The fraction of RTP packets lost during gap proportionally to the total number of RTP packets expected in the bursts on the corresponding synchronization source
	*/
	gapLossRate?: number;

	/**
	* The fraction of RTP packets discarded during gap proportionally to the total number of RTP packets expected in the bursts on the corresponding synchronization source
	*/
	gapDiscardRate?: number;

	/**
	* RTT measurement in seconds based on (most likely) SR, and RR belongs to the corresponded synchronization source
	*/
	roundTripTime?: number;

	/**
	* The sum of RTT measurements belongs to the corresponded synchronization source
	*/
	totalRoundTripTime?: number;

	/**
	* The receiver reported fractional lost belongs to the corresponded synchronization source
	*/
	fractionLost?: number;

	/**
	* The total number of RR reports received, which is the base of the remote inbound calculation on this source
	*/
	reportsReceived?: number;

	/**
	* The total number of calculated RR measurements received on this source
	*/
	roundTripTimeMeasurements?: number;

	/**
	* True if the corresponded media source is remote, false otherwise (or null depending on browser and version)
	*/
	relayedSource?: boolean;

	/**
	* Represents the audio level reported by the media source
	*/
	audioLevel?: number;

	/**
	* Represents the energy level reported by the media source
	*/
	totalAudioEnergy?: number;

	/**
	* Represents the total duration of the audio samples the media source actually transconverted in seconds
	*/
	totalSamplesDuration?: number;

	/**
	* Represents the echo cancellation in decibels corresponded to the media source.
	*/
	echoReturnLoss?: number;

	/**
	* Represents the echo cancellation in decibels added as a postprocessing by the library after the audio is catched from the emdia source.
	*/
	echoReturnLossEnhancement?: number;

	/**
	* Flag represents if the sender ended the media stream track or not.
	*/
	ended?: boolean;

	/**
	* The type of the payload the RTP packet SSRC belongs to
	*/
	payloadType?: number;

	/**
	* the MIME type of the codec (e.g.: video/vp8)
	*/
	mimeType?: string;

	/**
	* The negotiated clock rate the RTP timestamp is generated of
	*/
	clockRate?: number;

	/**
	* The number of channels for audio is used (in stereo it is 2, otherwise it is most likely null)
	*/
	channels?: number;

	/**
	* The a=fmtp line in the SDP corresponding to the codec
	*/
	sdpFmtpLine?: string;

}

/**
* List of compound measurements related to inbound video tracks
*/
export type InboundVideoTrack = {
	/**
	* The RTP SSRC field
	*/
	ssrc: number;

	/**
	* The id of the track
	*/
	trackId?: string;

	/**
	*  The unique generated identifier of the peer connection the inbound audio track belongs to
	*/
	peerConnectionId?: string;

	/**
	* The remote clientId the source outbound track belongs to
	*/
	remoteClientId?: string;

	/**
	* The id of the sink this track belongs to in the SFU
	*/
	sfuSinkId?: string;

	/**
	* The total number of packets received on the corresponded synchronization source
	*/
	packetsReceived?: number;

	/**
	* The total number of bytes received on the corresponded synchronization source
	*/
	packetsLost?: number;

	/**
	* The corresponded synchronization source reported jitter
	*/
	jitter?: number;

	/**
	* The total number of packets missed the playout point and therefore discarded by the jitterbuffer
	*/
	packetsDiscarded?: number;

	/**
	* The total number of packets repaired by either FEC or due to retransmission on the corresponded synchronization source
	*/
	packetsRepaired?: number;

	/**
	* The total number of packets lost in burst (RFC6958)
	*/
	burstPacketsLost?: number;

	/**
	* The total number of packets discarded in burst (RFC6958)
	*/
	burstPacketsDiscarded?: number;

	/**
	* The total number of burst happened causes burstPacketsLost on the corresponding synchronization source
	*/
	burstLossCount?: number;

	/**
	* The total number of burst happened causes burstPacketsDiscarded on the corresponding synchronization source
	*/
	burstDiscardCount?: number;

	/**
	* The fraction of RTP packets lost during bursts proportionally to the total number of RTP packets expected in the bursts on the corresponding synchronization source
	*/
	burstLossRate?: number;

	/**
	* The fraction of RTP packets discarded during bursts proportionally to the total number of RTP packets expected in the bursts on the corresponding synchronization source
	*/
	burstDiscardRate?: number;

	/**
	* The fraction of RTP packets lost during gap proportionally to the total number of RTP packets expected in the bursts on the corresponding synchronization source
	*/
	gapLossRate?: number;

	/**
	* The fraction of RTP packets discarded during gap proportionally to the total number of RTP packets expected in the bursts on the corresponding synchronization source
	*/
	gapDiscardRate?: number;

	/**
	* Represents the timestamp at which the last packet was received on the corresponded synchronization source (ssrc)
	*/
	lastPacketReceivedTimestamp?: number;

	/**
	* The average RTCP interval between two consecutive compound RTCP packets sent for the corresponding synchronization source (ssrc)
	*/
	averageRtcpInterval?: number;

	/**
	* Total number of RTP header and padding bytes received over the corresponding synchronization source (ssrc)
	*/
	headerBytesReceived?: number;

	/**
	* Total number of FEC packets received over the corresponding synchronization source (ssrc)
	*/
	fecPacketsReceived?: number;

	/**
	* Total number of FEC packets discarded over the corresponding synchronization source (ssrc) due to 1) late arrive; 2) the target RTP packet has already been repaired.
	*/
	fecPacketsDiscarded?: number;

	/**
	* Total number of bytes received over the corresponding synchronization source (ssrc) due to 1) late arrive; 2) the target RTP packet has already been repaired.
	*/
	bytesReceived?: number;

	/**
	* Total number of packets received and failed to decrypt over the corresponding synchronization source (ssrc) due to 1) late arrive; 2) the target RTP packet has already been repaired.
	*/
	packetsFailedDecryption?: number;

	/**
	* Total number of packets identified as duplicated over the corresponding synchronization source (ssrc).
	*/
	packetsDuplicated?: number;

	/**
	* The total number of DSCP flagged RTP packets received over the corresponding synchronization source (ssrc)
	*/
	perDscpPacketsReceived?: number;

	/**
	* Count the total number of Negative ACKnowledgement (NACK) packets sent and belongs to the corresponded synchronization source (ssrc)
	*/
	nackCount?: number;

	/**
	* The total processing delay in seconds spend on buffering RTP packets from received up until packets are decoded
	*/
	totalProcessingDelay?: number;

	/**
	* The estimated playout time of the corresponded synchronization source
	*/
	estimatedPlayoutTimestamp?: number;

	/**
	* The total time of RTP packets spent in jitterbuffer waiting for frame completion due to network uncertenity.
	*/
	jitterBufferDelay?: number;

	/**
	* The total number of audio samples or video frames that have come out of the jitter buffer on the corresponded synchronization source (ssrc)
	*/
	jitterBufferEmittedCount?: number;

	/**
	* Indicate the name of the decoder implementation library
	*/
	decoderImplementation?: string;

	/**
	* The total number of frames dropped on the corresponded RTP stream
	*/
	framesDropped?: number;

	/**
	* The total number of frames partially lost on the corresponded RTP stream
	*/
	partialFramesLost?: number;

	/**
	* The total number of frames fully lost on the corresponded RTP stream
	*/
	fullFramesLost?: number;

	/**
	* The total number of keyframes decoded on the corresponded RTP stream
	*/
	keyFramesDecoded?: number;

	/**
	* The width of the frame of the video sent by the remote source on the corresponded RTP stream
	*/
	frameWidth?: number;

	/**
	* The height of the frame of the video sent by the remote source on the corresponded RTP stream
	*/
	frameHeight?: number;

	/**
	* The bit depth in pixels of the frame of the video sent by the remote source on the corresponded RTP stream
	*/
	frameBitDepth?: number;

	/**
	* The frame per seconds of the video sent by the remote source on the corresponded RTP stream
	*/
	framesPerSecond?: number;

	/**
	* The QP sum (only interested in VP8,9) of the frame of the video sent by the remote source on the corresponded RTP stream
	*/
	qpSum?: number;

	/**
	* The total tiem spent on decoding video on the corresponded RTP stream
	*/
	totalDecodeTime?: number;

	/**
	* The total interframe delay
	*/
	totalInterFrameDelay?: number;

	/**
	* The total number FIR packets sent from this endpoint to the source on the corresponded RTP stream
	*/
	firCount?: number;

	/**
	* The total number of Picture Loss Indication sent on the corresponded RTP stream
	*/
	pliCount?: number;

	/**
	* The total number of SLI indicator sent from the endpoint on the corresponded RTP stream
	*/
	sliCount?: number;

	/**
	* The total number of frames received on the corresponded RTP stream.
	*/
	framesReceived?: number;

	/**
	* Total number of RTP packets sent at the remote endpoint to this endpoint on this synchronization source
	*/
	packetsSent?: number;

	/**
	* Total number of payload bytes sent at the remote endpoint to this endpoint on this synchronization source
	*/
	bytesSent?: number;

	/**
	* The timestamp corresnponds to the time in UTC Epoch the remote endpoint reported the statistics belong to the sender side and correspond to the synchronization source (ssrc)
	*/
	remoteTimestamp?: number;

	/**
	* The number of SR reports the remote endpoint sent corresponded to synchronization source (ssrc) this report belongs to
	*/
	reportsSent?: number;

	/**
	* Estimated round trip time for the SR reports based on DLRR reports on the corresponded RTP stream
	*/
	roundTripTime?: number;

	/**
	*  Represents the cumulative sum of all round trip time measurements performed on the corresponded RTP stream
	*/
	totalRoundTripTime?: number;

	/**
	* Represents the total number of SR reports received with DLRR reports to be able to calculate the round trip time on the corresponded RTP stream
	*/
	roundTripTimeMeasurements?: number;

	/**
	* Flag represents if the receiver ended the media stream track or not.
	*/
	ended?: boolean;

	/**
	* The type of the payload the RTP packet SSRC belongs to
	*/
	payloadType?: number;

	/**
	* the MIME type of the codec (e.g.: video/vp8)
	*/
	mimeType?: string;

	/**
	* The negotiated clock rate the RTP timestamp is generated of
	*/
	clockRate?: number;

	/**
	* The number of channels for audio is used (in stereo it is 2, otherwise it is most likely null)
	*/
	channels?: number;

	/**
	* The a=fmtp line in the SDP corresponding to the codec
	*/
	sdpFmtpLine?: string;

}

/**
* List of compound measurements related to inbound audio tracks
*/
export type InboundAudioTrack = {
	/**
	* The RTP SSRC field
	*/
	ssrc: number;

	/**
	* The id of the track
	*/
	trackId?: string;

	/**
	*  The unique generated identifier of the peer connection the inbound audio track belongs to
	*/
	peerConnectionId?: string;

	/**
	* The remote clientId the source outbound track belongs to
	*/
	remoteClientId?: string;

	/**
	* The id of the sink this track belongs to in the SFU
	*/
	sfuSinkId?: string;

	/**
	* The total number of packets received on the corresponded synchronization source
	*/
	packetsReceived?: number;

	/**
	* The total number of bytes received on the corresponded synchronization source
	*/
	packetsLost?: number;

	/**
	* The corresponded synchronization source reported jitter
	*/
	jitter?: number;

	/**
	* The total number of packets missed the playout point and therefore discarded by the jitterbuffer
	*/
	packetsDiscarded?: number;

	/**
	* The total number of packets repaired by either FEC or due to retransmission on the corresponded synchronization source
	*/
	packetsRepaired?: number;

	/**
	* The total number of packets lost in burst (RFC6958)
	*/
	burstPacketsLost?: number;

	/**
	* The total number of packets discarded in burst (RFC6958)
	*/
	burstPacketsDiscarded?: number;

	/**
	* The total number of burst happened causes burstPacketsLost on the corresponding synchronization source
	*/
	burstLossCount?: number;

	/**
	* The total number of burst happened causes burstPacketsDiscarded on the corresponding synchronization source
	*/
	burstDiscardCount?: number;

	/**
	* The fraction of RTP packets lost during bursts proportionally to the total number of RTP packets expected in the bursts on the corresponding synchronization source
	*/
	burstLossRate?: number;

	/**
	* The fraction of RTP packets discarded during bursts proportionally to the total number of RTP packets expected in the bursts on the corresponding synchronization source
	*/
	burstDiscardRate?: number;

	/**
	* The fraction of RTP packets lost during gap proportionally to the total number of RTP packets expected in the bursts on the corresponding synchronization source
	*/
	gapLossRate?: number;

	/**
	* The fraction of RTP packets discarded during gap proportionally to the total number of RTP packets expected in the bursts on the corresponding synchronization source
	*/
	gapDiscardRate?: number;

	/**
	* Represents the timestamp at which the last packet was received on the corresponded synchronization source (ssrc)
	*/
	lastPacketReceivedTimestamp?: number;

	/**
	* The average RTCP interval between two consecutive compound RTCP packets sent for the corresponding synchronization source (ssrc)
	*/
	averageRtcpInterval?: number;

	/**
	* Total number of RTP header and padding bytes received over the corresponding synchronization source (ssrc)
	*/
	headerBytesReceived?: number;

	/**
	* Total number of FEC packets received over the corresponding synchronization source (ssrc)
	*/
	fecPacketsReceived?: number;

	/**
	* Total number of FEC packets discarded over the corresponding synchronization source (ssrc) due to 1) late arrive; 2) the target RTP packet has already been repaired.
	*/
	fecPacketsDiscarded?: number;

	/**
	* Total number of bytes received over the corresponding synchronization source (ssrc) due to 1) late arrive; 2) the target RTP packet has already been repaired.
	*/
	bytesReceived?: number;

	/**
	* Total number of packets received and failed to decrypt over the corresponding synchronization source (ssrc) due to 1) late arrive; 2) the target RTP packet has already been repaired.
	*/
	packetsFailedDecryption?: number;

	/**
	* Total number of packets identified as duplicated over the corresponding synchronization source (ssrc).
	*/
	packetsDuplicated?: number;

	/**
	* The total number of DSCP flagged RTP packets received over the corresponding synchronization source (ssrc)
	*/
	perDscpPacketsReceived?: number;

	/**
	* Count the total number of Negative ACKnowledgement (NACK) packets sent and belongs to the corresponded synchronization source (ssrc)
	*/
	nackCount?: number;

	/**
	* The total processing delay in seconds spend on buffering RTP packets from received up until packets are decoded
	*/
	totalProcessingDelay?: number;

	/**
	* The estimated playout time of the corresponded synchronization source
	*/
	estimatedPlayoutTimestamp?: number;

	/**
	* The total time of RTP packets spent in jitterbuffer waiting for frame completion due to network uncertenity.
	*/
	jitterBufferDelay?: number;

	/**
	* The total number of audio samples or video frames that have come out of the jitter buffer on the corresponded synchronization source (ssrc)
	*/
	jitterBufferEmittedCount?: number;

	/**
	* Indicate the name of the decoder implementation library
	*/
	decoderImplementation?: string;

	/**
	* Indicate if the last RTP packet received contained voice activity based on the presence of the V bit in the extension header
	*/
	voiceActivityFlag?: boolean;

	/**
	* The total number of audio samples received on the corresponded RTP stream
	*/
	totalSamplesReceived?: number;

	/**
	* The total number of samples decoded on the corresponded RTP stream
	*/
	totalSamplesDecoded?: number;

	/**
	* The total number of samples decoded with SILK on the corresponded RTP stream
	*/
	samplesDecodedWithSilk?: number;

	/**
	* The total number of samples decodedd with CELT on the corresponded RTP stream
	*/
	samplesDecodedWithCelt?: number;

	/**
	* The total number of samples decoded by the media decoder from the corresponded RTP stream
	*/
	concealedSamples?: number;

	/**
	* The total number of samples concealed from the corresponded RTP stream
	*/
	silentConcealedSamples?: number;

	/**
	* The total number of concealed event emitted to the media codec by the corresponded jitterbuffer
	*/
	concealmentEvents?: number;

	/**
	* The total number of samples inserted to decelarete the audio playout (happens when the jitterbuffer detects a shrinking buffer and need to increase the jitter buffer delay)
	*/
	insertedSamplesForDeceleration?: number;

	/**
	* The total number of samples inserted to accelerate the audio playout (happens when the jitterbuffer detects a growing buffer and need to shrink the jitter buffer delay)
	*/
	removedSamplesForAcceleration?: number;

	/**
	* Total number of RTP packets sent at the remote endpoint to this endpoint on this synchronization source
	*/
	packetsSent?: number;

	/**
	* Total number of payload bytes sent at the remote endpoint to this endpoint on this synchronization source
	*/
	bytesSent?: number;

	/**
	* The timestamp corresnponds to the time in UTC Epoch the remote endpoint reported the statistics belong to the sender side and correspond to the synchronization source (ssrc)
	*/
	remoteTimestamp?: number;

	/**
	* The number of SR reports the remote endpoint sent corresponded to synchronization source (ssrc) this report belongs to
	*/
	reportsSent?: number;

	/**
	* Estimated round trip time for the SR reports based on DLRR reports on the corresponded RTP stream
	*/
	roundTripTime?: number;

	/**
	*  Represents the cumulative sum of all round trip time measurements performed on the corresponded RTP stream
	*/
	totalRoundTripTime?: number;

	/**
	* Represents the total number of SR reports received with DLRR reports to be able to calculate the round trip time on the corresponded RTP stream
	*/
	roundTripTimeMeasurements?: number;

	/**
	* Flag represents if the receiver ended the media stream track or not.
	*/
	ended?: boolean;

	/**
	* The type of the payload the RTP packet SSRC belongs to
	*/
	payloadType?: number;

	/**
	* the MIME type of the codec (e.g.: video/vp8)
	*/
	mimeType?: string;

	/**
	* The negotiated clock rate the RTP timestamp is generated of
	*/
	clockRate?: number;

	/**
	* The number of channels for audio is used (in stereo it is 2, otherwise it is most likely null)
	*/
	channels?: number;

	/**
	* The a=fmtp line in the SDP corresponding to the codec
	*/
	sdpFmtpLine?: string;

}

/**
* List of certificates the client provided
*/
export type Certificate = {
	/**
	*  The fingerprint of the certificate.
	*/
	fingerprint?: string;

	/**
	* The hash function used to generate the fingerprint.
	*/
	fingerprintAlgorithm?: string;

	/**
	* The DER encoded base-64 representation of the certificate.
	*/
	base64Certificate?: string;

	/**
	* The id of the next certificate in the certificate chain
	*/
	issuerCertificateId?: string;

}

/**
* List of codec the client has
*/
export type MediaCodecStats = {
	/**
	* Payload type used in RTP encoding / decoding process.
	*/
	payloadType?: string;

	/**
	* Indicates the role of the codec (encode or decode)
	*/
	codecType?: "encode" | "decode";

	/**
	* The MIME type of the media. eg.: audio/opus.
	*/
	mimeType?: string;

	/**
	* the clock rate used in RTP transport to generate the timestamp for the carried frames
	*/
	clockRate?: number;

	/**
	* Audio Only. Represnts the number of chanels an audio media source have. Only interesting if stereo is presented
	*/
	channels?: number;

	/**
	* The SDP line determines the codec
	*/
	sdpFmtpLine?: string;

}

/**
* WebRTC App provided information related to the operation system the client uses.
*/
export type MediaSourceStat = {
	/**
	* The unique identifier of the corresponded media track
	*/
	trackIdentifier?: string;

	/**
	* The type of the media the Mediasource produces.
	*/
	kind?: "audio" | "video";

	/**
	* Flag indicating if the media source is relayed or not, meaning the local endpoint is not the actual source of the media, but a proxy for that media.
	*/
	relayedSource?: boolean;

	/**
	* The value is between 0..1 (linear), where 1.0 represents 0 dBov, 0 represents silence, and 0.5 represents approximately 6 dBSPL change in the sound pressure level from 0 dBov.
	*/
	audioLevel?: number;

	/**
	* The audio energy of the media source. For calculation see www.w3.org/TR/webrtc-stats/#dom-rtcaudiosourcestats-totalaudioenergy
	*/
	totalAudioEnergy?: number;

	/**
	* The duration of the audio type media source
	*/
	totalSamplesDuration?: number;

	/**
	* if echo cancellation is applied on the media source, then this number represents the loss calculation defined in www.itu.int/rec/T-REC-G.168-201504-I/en
	*/
	echoReturnLoss?: number;

	/**
	* www.itu.int/rec/T-REC-G.168-201504-I/en
	*/
	echoReturnLossEnhancement?: number;

	/**
	* The width, in pixels, of the last frame originating from the media source
	*/
	width?: number;

	/**
	* The height, in pixels, of the last frame originating from the media source
	*/
	height?: number;

	/**
	* The bitDepth, in pixels, of the last frame originating from the media source
	*/
	bitDepth?: number;

	/**
	* The total number of frames originated from the media source
	*/
	frames?: number;

	/**
	*  The number of frames origianted from the media source in the last second
	*/
	framesPerSecond?: number;

}

/**
* Compound object related to Peer Connection Transport Stats
*/
export type PeerConnectionTransport = {
	/**
	* The unique identifier of the peer connection
	*/
	peerConnectionId: string;

	/**
	* The webrtc app provided label the peer connection is marked with
	*/
	label?: string;

	/**
	* Represents the number of unique RTCDataChannels that have entered the "open" state during their lifetime.
	*/
	dataChannelsOpened?: number;

	/**
	* Represents the number of unique RTCDataChannels that had the "open" state, but now they are "closed"
	*/
	dataChannelsClosed?: number;

	/**
	* Represents the number of unique RTCDataChannels successfully requested from RTCPeerConnection.
	*/
	dataChannelsRequested?: number;

	/**
	* Represents the number of unique RTCDataChannels signaled in a ondatachannel event on the RTCPeerConnection.
	*/
	dataChannelsAccepted?: number;

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
	iceState?: string;

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

/**
* The WebRTC app provided custom stats payload
*/
export type ExtensionStat = {
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
* The WebRTC app provided List of the media devices the client has.
*/
export type MediaDevice = {
	/**
	* the provided id of the media input / output
	*/
	id?: string;

	/**
	* The media kind of the media device
	*/
	kind?: "videoinput" | "audioinput" | "audiooutput";

	/**
	* The name of the device
	*/
	label?: string;

}

/**
* WebRTC App provided information related to the operation system the client uses.
*/
export type OperationSystem = {
	/**
	* The name of the operation system (e.g.: linux) the webrtc app uses
	*/
	name?: string;

	/**
	* The version of the operation system
	*/
	version?: string;

	/**
	* The name of the version of the operation system
	*/
	versionName?: string;

}

/**
* WebRTC App provided information related to the browser the client uses.
*/
export type Browser = {
	/**
	* The name of the operation system (e.g.: linux) the webrtc app uses
	*/
	name?: string;

	/**
	* The version of the operation system
	*/
	version?: string;

}

/**
* WebRTC App provided information related to the platform the client uses.
*/
export type Platform = {
	/**
	* The name of the platform
	*/
	type?: string;

	/**
	* The name of the vendor
	*/
	vendor?: string;

	/**
	* The name of the model
	*/
	model?: string;

}

/**
* WebRTC App provided information related to the engine the client uses.
*/
export type Engine = {
	/**
	* The name of the Engine
	*/
	name?: string;

	/**
	* The version of the engine
	*/
	version?: string;

}

/**
* docs
*/
export type ClientSample = {
	/**
	* Unique id of the client providing samples. Must be a valid UUID
	*/
	clientId: string;

	/**
	* The timestamp the sample is created in GMT
	*/
	timestamp: number;

	/**
	* If it is provided the server uses the given id to match clients in the same call. Must be a valid UUID. 
	*/
	callId?: string;

	/**
	* The sequence number a source assigns to the sample. Every time the source make a sample at a client this number should be monothonically incremented.
	*/
	sampleSeq?: number;

	/**
	* The WebRTC app configured room id the client joined for the call.
	*/
	roomId?: string;

	/**
	* The WebRTC app configured human readable user id the client is joined.
	*/
	userId?: string;

	/**
	* WebRTC App provided information related to the engine the client uses.
	*/
	engine?: Engine;

	/**
	* WebRTC App provided information related to the platform the client uses.
	*/
	platform?: Platform;

	/**
	* WebRTC App provided information related to the browser the client uses.
	*/
	browser?: Browser;

	/**
	* WebRTC App provided information related to the operation system the client uses.
	*/
	os?: OperationSystem;

	/**
	* The WebRTC app provided List of the media constraints the client has.
	*/
	mediaConstraints?: string[];

	/**
	* The WebRTC app provided List of the media devices the client has.
	*/
	mediaDevices?: MediaDevice[];

	/**
	* The WebRTC app provided List of user media errors the client has.
	*/
	userMediaErrors?: string[];

	/**
	* The WebRTC app provided custom stats payload
	*/
	extensionStats?: ExtensionStat[];

	/**
	* The WebRTC app provided List of ICE server the client used.
	*/
	iceServers?: string[];

	/**
	* Compound object related to Peer Connection Transport Stats
	*/
	pcTransports?: PeerConnectionTransport[];

	/**
	* WebRTC App provided information related to the operation system the client uses.
	*/
	mediaSources?: MediaSourceStat[];

	/**
	* List of codec the client has
	*/
	codecs?: MediaCodecStats[];

	/**
	* List of certificates the client provided
	*/
	certificates?: Certificate[];

	/**
	* List of compound measurements related to inbound audio tracks
	*/
	inboundAudioTracks?: InboundAudioTrack[];

	/**
	* List of compound measurements related to inbound video tracks
	*/
	inboundVideoTracks?: InboundVideoTrack[];

	/**
	* List of compound measurements related to outbound audio tracks
	*/
	outboundAudioTracks?: OutboundAudioTrack[];

	/**
	* List of compound measurements related to outbound video tracks
	*/
	outboundVideoTracks?: OutboundVideoTrack[];

	/**
	* List of local ICE candidates
	*/
	iceLocalCandidates?: IceLocalCandidate[];

	/**
	* List of remote ICE candidates
	*/
	iceRemoteCandidates?: IceRemoteCandidate[];

	/**
	* List of Data channels
	*/
	dataChannels?: DataChannel[];

	/**
	* The offset from GMT in hours
	*/
	timeZoneOffsetInHours?: number;

	/**
	* Special marker for the samples
	*/
	marker?: string;

}

/**
* Additional control flags indicate various operation has to be performed
*/
export type ControlFlags = {
	/**
	* Indicate that the server should close the connection
	*/
	close?: boolean;

}

/**
* Additional meta information about the carried payloads
*/
export type SamplesMeta = {
	/**
	* Indicate the version of the schema for compatibility measures.
	*/
	schemaVersion?: string;

}

/**
* Observer created reports related to events (call started, call ended, client joined, etc...) indicated by the incoming samples.
*/
export type Samples = {
	/**
	* Additional meta information about the carried payloads
	*/
	meta?: SamplesMeta;

	/**
	* Additional control flags indicate various operation has to be performed
	*/
	controlFlags?: ControlFlags;

	/**
	* Samples taken from the client
	*/
	clientSamples?: ClientSample[];

	/**
	* Samples taken from an Sfu
	*/
	sfuSamples?: SfuSample[];

}
