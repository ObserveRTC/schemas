
export const schemaVersion = "2.2.1";

/**
* A Report created for Inbound Video Tracks. A combination of Codec metadata carrying inbound and remote outbound RTP stats measurements
*/
export type InboundVideoTrackReport = {
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
	* The id of the Sfu stream the media from
	*/
	sfuStreamId?: string;

	/**
	* The id of the sink the Sfu streamed the media out
	*/
	sfuSinkId?: string;

	/**
	* The id of the remote track this inbound track is originated from
	*/
	remoteTrackId?: string;

	/**
	* The webrtc app provided user id the track belongs to, or if the webrtc app did not provided the observer tried to match it
	*/
	remoteUserId?: string;

	/**
	* The observer matched remote client Id
	*/
	remoteClientId?: string;

	/**
	* The observer matched remote Peer Connection Id
	*/
	remotePeerConnectionId?: string;

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
	* The number of frames dropped prior to decode or missing chunks
	*/
	framesDropped?: number;

	/**
	* Represents the timestamp at which the last packet was received on the corresponded synchronization source (ssrc)
	*/
	lastPacketReceivedTimestamp?: number;

	/**
	* Total number of RTP header and padding bytes received over the corresponding synchronization source (ssrc)
	*/
	headerBytesReceived?: number;

	/**
	* The total number of packets missed the playout point and therefore discarded by the jitterbuffer
	*/
	packetsDiscarded?: number;

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
	* This value is increased by the target jitter buffer delay every time a sample is emitted by the jitter buffer. The added target is the target delay, in seconds, at the time that the sample was emitted from the jitter buffer. 
	*/
	jitterBufferTargetDelay?: number;

	/**
	* The total number of audio samples or video frames that have come out of the jitter buffer on the corresponded synchronization source (ssrc)
	*/
	jitterBufferEmittedCount?: number;

	/**
	* This metric is purely based on the network characteristics such as jitter and packet loss, and can be seen as the minimum obtainable jitter buffer delay if no external factors would affect it
	*/
	jitterBufferMinimumDelay?: number;

	/**
	* Indicate the name of the decoder implementation library
	*/
	decoderImplementation?: string;

	/**
	* The total number of frames decoded on the corresponded RTP stream
	*/
	framesDecoded?: number;

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
	* The total number of inter frame delay squere on the corresponded synchronization source (ssrc) Useful for variance calculation for interframe delays
	*/
	totalSquaredInterFrameDelay?: number;

	/**
	* The total number FIR packets sent from this endpoint to the source on the corresponded RTP stream
	*/
	firCount?: number;

	/**
	* The total number of Picture Loss Indication sent on the corresponded RTP stream
	*/
	pliCount?: number;

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

}
