/**
* A Report created for Inbound Audio Tracks. A combination of Codec metadata carrying inbound and remote outbound RTP stats measurements
*/
export type InboundAudioTrackReport = {
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
	* Indicate if the last RTP packet received contained voice activity based on the presence of the V bit in the extension header
	*/
	voiceActivityFlag?: boolean;

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
