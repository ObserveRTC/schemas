
export const schemaVersion = "2.2.1";

/**
* A Report created for Outbound Audio Tracks. A combination of Audio source, Codec metadata carrying outbound and remote inbound RTP stat measurements
*/
export type OutboundAudioTrackReport = {
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
	* . The total duration, in seconds, of samples produced by the device that got dropped before reaching the media source
	*/
	droppedSamplesDuration?: number;

	/**
	* A counter increases every time a sample is dropped after a non-dropped sample
	*/
	droppedSamplesEvents?: number;

	/**
	* Total delay, in seconds, for each audio sample between the time the sample was emitted by the capture device and the sample reaching the source
	*/
	totalCaptureDelay?: number;

	/**
	* The total number of captured samples reaching the audio source
	*/
	totalSamplesCaptured?: number;

}
