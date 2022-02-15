/**
* A Report created for Outbound Video Tracks. A combination of Video source, Codec metadata carrying outbound and remote inbound RTP stat measurements
*/
export type OutboundVideoTrackReport = {
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
	* The RTP SSRC field
	*/
	ssrc: number;

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
	* The webrtc app provided label the peer connection is labeled with
	*/
	label?: string;

	/**
	* The id of the track
	*/
	trackId?: string;

	/**
	* The id of the RTP stream connected to a remote media unit (such as an SFU)
	*/
	rtpStreamId?: string;

	/**
	* The total number of packets sent on the corresponded synchronization source
	*/
	packetsSent?: number;

	/**
	* The total number of bytes sent on the corresponded synchronization source
	*/
	bytesSent?: number;

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
	* Total number of retransmitted bytes sent over the corresponded synchronization source (ssrc).
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
	* Represents the height of the last encoded frame sent over the corresponded synchronization source
	*/
	frameWidth?: number;

	/**
	* Represents the width of the last encoded frame sent over the corresponded synchronization source
	*/
	frameHeight?: number;

	/**
	* Represents the bit depth per pixel of the last encoded frame sent over the corresponded synchronization source
	*/
	frameBitDepth?: number;

	/**
	* The number of encoded frames over the last second sent over the corresponded synchronization source
	*/
	framesPerSecond?: number;

	/**
	* The number of frames sent over the corresponded synchronization source
	*/
	framesSent?: number;

	/**
	* The number of huge frames (2.5x greater than the average size of frame) sent over the corresponded synchronization source
	*/
	hugeFramesSent?: number;

	/**
	* The number of frames encoded over the corresponded synchronization source
	*/
	framesEncoded?: number;

	/**
	* The number of keyframes sent over the corresponded synchronization source
	*/
	keyFramesEncoded?: number;

	/**
	* The number of frames discarded before sending over the corresponded synchronization source
	*/
	framesDiscardedOnSend?: number;

	/**
	* The sum of QP values encoded by the encoder corresponded to the synchronization source
	*/
	qpSum?: number;

	/**
	* The sum of encoding time spent by the encoder corresponded to the synchronization source
	*/
	totalEncodeTime?: number;

	/**
	* The total number of delay packets buffered at the sender side in seconds over the corresponding synchronization source
	*/
	totalPacketSendDelay?: number;

	/**
	* The average RTCP interval between two consecutive compound RTCP packets sent for the corresponding synchronization source (ssrc)
	*/
	averageRtcpInterval?: number;

	/**
	* Time elapsed in seconds when the the corresponding synchronization source (ssrc) was in a limited state due to CPU
	*/
	qualityLimitationDurationCPU?: number;

	/**
	* Time elapsed in seconds when the the corresponding synchronization source (ssrc) was not in a limited state
	*/
	qualityLimitationDurationNone?: number;

	/**
	* Time elapsed in seconds when the the corresponding synchronization source (ssrc) was in a limited state becasue of bandwidth
	*/
	qualityLimitationDurationBandwidth?: number;

	/**
	* Time elapsed in seconds when the the corresponding synchronization source (ssrc) was in a limited state becaue of other factor
	*/
	qualityLimitationDurationOther?: number;

	/**
	* Indicate a reason for the corresponding synchronization source (ssrc) quality is limited
	*/
	qualityLimitationReason?: string;

	/**
	* The number of quality limiatation changes happened for the corresponding synchronization source (ssrc)
	*/
	qualityLimitationResolutionChanges?: number;

	/**
	* The total number of DSCP flagged RTP packets sent over the corresponding synchronization source (ssrc)
	*/
	perDscpPacketsSent?: number;

	/**
	* Count the total number of Negative ACKnowledgement (NACK) packets received over the corresponding synchronization source (ssrc)
	*/
	nackCount?: number;

	/**
	* The number of full inter requests happened over the corresponding synchronization source (ssrc)
	*/
	firCount?: number;

	/**
	* The number of picture loss indication happened received over the corresponding synchronization source (ssrc)
	*/
	pliCount?: number;

	/**
	* The number of slice loss indication happened over the corresponding synchronization source (ssrc)
	*/
	sliCount?: number;

	/**
	* Indicate the name of the encoder implementation library
	*/
	encoderImplementation?: string;

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
	* The number of frames dropped over the corresponded synchronization source
	*/
	framesDropped?: number;

	/**
	* The number of partial frames lost over the corresponded synchronization source
	*/
	partialFramesLost?: number;

	/**
	* The number of full frames lost over the corresponded synchronization source
	*/
	fullFramesLost?: number;

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
	* Indicate the encoded width of the frame received on the corresponded synchronization source (ssrc)
	*/
	encodedFrameWidth?: number;

	/**
	* Indicate the encoded height of the frame received on the corresponded synchronization source (ssrc)
	*/
	encodedFrameHeight?: number;

	/**
	* Indicate the encoded bit depth per pixel of the last decoded frame received on the corresponded synchronization source (ssrc)
	*/
	encodedFrameBitDepth?: number;

	/**
	* Indicate the encoded number of decoded frames in the last second received on the corresponded synchronization source (ssrc)
	*/
	encodedFramesPerSecond?: number;

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
