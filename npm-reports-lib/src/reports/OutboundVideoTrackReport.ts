
export const schemaVersion = "2.2.1";

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
	* The id of the Sfu stream corresponds to the outbound track
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
	*  The rid encoding parameter of the corresponded synchronization source
	*/
	rid?: string;

	/**
	* Total number of RTP header and padding bytes sent over the corresponding synchronization source (ssrc)
	*/
	headerBytesSent?: number;

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
	* Count the total number of Negative ACKnowledgement (NACK) packets received over the corresponding synchronization source (ssrc)
	*/
	nackCount?: number;

	/**
	* Indicate the name of the encoder implementation library
	*/
	encoderImplementation?: string;

	/**
	* Indicates whether this RTP stream is configured to be sent or disabled
	*/
	active?: boolean;

	/**
	* The frame width in pixels of the frames targeted by the media encoder
	*/
	frameWidth?: number;

	/**
	* The frame width the media encoder targeted
	*/
	frameHeight?: number;

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
	* The total number FIR packets sent from this endpoint to the source on the corresponded RTP stream
	*/
	firCount?: number;

	/**
	* The total number of Picture Loss Indication sent on the corresponded RTP stream
	*/
	pliCount?: number;

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
	* The total number of calculated RR measurements received on this source
	*/
	roundTripTimeMeasurements?: number;

	/**
	* The total number of frames reported to be lost by the remote endpoit on the corresponded RTP stream
	*/
	framesDropped?: number;

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
	* The total number of frames originated from the media source
	*/
	frames?: number;

}
