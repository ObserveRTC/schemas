/**
 * Schema Version: 2.2.11 
 */
/**
* Observer created reports related to events (call started, call ended, client joined, etc...) indicated by the incoming samples.
*/
export type CallEventReport = {
	/**
	* The unique identifier of the service
	*/
	serviceId: string;

	/**
	* The timestamp when the corresponded data is generated for the report (UTC Epoch in ms)
	*/
	timestamp: number;

	/**
	* The name of the event. Possible values are: CALL_STARTED, CALL_ENDED, CLIENT_JOINED, CLIENT_LEFT, PEER_CONNECTION_OPENED, PEER_CONNECTION_CLOSED, MEDIA_TRACK_ADDED, MEDIA_TRACK_REMOVED
	*/
	name: string;

	/**
	* The media unit id the report belongs to
	*/
	mediaUnitId?: string;

	/**
	* The marker the originated sample is reported with
	*/
	marker?: string;

	/**
	* The generated unique identifier of the call
	*/
	callId?: string;

	/**
	* webrtc app provided room id
	*/
	roomId?: string;

	/**
	* The generated unique identifier of the client
	*/
	clientId?: string;

	/**
	* webrtc app provided user identifier
	*/
	userId?: string;

	/**
	* The unique identifier of the peer connection
	*/
	peerConnectionId?: string;

	/**
	* The unique identifier of the media track
	*/
	mediaTrackId?: string;

	/**
	* The SSRC identifier of the RTP stream a trackId belongs to
	*/
	SSRC?: number;

	/**
	* The timestamp of the sample the event related to
	*/
	sampleTimestamp?: number;

	/**
	* The sequence number of the sample the event may related to
	*/
	sampleSeq?: number;

	/**
	* the human readable message of the event
	*/
	message?: string;

	/**
	* the value of the event
	*/
	value?: string;

	/**
	* attachment the event may created with
	*/
	attachments?: string;

}

/**
* Metadata belongs to a call and can be useful
*/
export type CallMetaReport = {
	/**
	* The unique identifier of the service
	*/
	serviceId: string;

	/**
	* The timestamp when the corresponded data is generated for the report (UTC Epoch in ms)
	*/
	timestamp: number;

	/**
	* The media unit id the report belongs to
	*/
	mediaUnitId?: string;

	/**
	* The marker the originated sample is reported with
	*/
	marker?: string;

	/**
	* The generated unique identifier of the call
	*/
	callId?: string;

	/**
	* webrtc app provided room id
	*/
	roomId?: string;

	/**
	* The generated unique identifier of the client
	*/
	clientId?: string;

	/**
	* webrtc app provided user identifier
	*/
	userId?: string;

	/**
	* The unique identifier of the peer connection
	*/
	peerConnectionId?: string;

	/**
	* The timestamp of the sample the event related to
	*/
	sampleTimestamp?: number;

	/**
	* The sequence number of the sample the event may related to
	*/
	sampleSeq?: number;

	/**
	* The type of the meta data. Possible values are: OPERATION_SYSTEM, ENGINE, PLATFORM, BROWSER, CERTIFICATE, CODEC, ICE_LOCAL_CANDIDATE, ICE_REMOTE_CANDIDATE, ICE_SERVER, MEDIA_CONSTRAINT, MEDIA_DEVICE, MEDIA_SOURCE, USER_MEDIA_ERROR, LOCAL_SDP
	*/
	type?: string;

	/**
	* The payload for the metadata reported for the peeer connection
	*/
	payload?: string;

}

/**
* A Report created for PeerConnection Data Channel.
*/
export type ClientDataChannelReport = {
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
	* The webrtc app provided label for the peer connection
	*/
	peerConnectionLabel?: string;

	/**
	* The label of the data channel
	*/
	label?: string;

	/**
	* The protocol used for the data channel
	*/
	protocol?: string;

	/**
	* The state of the data channel
	*/
	state?: string;

	/**
	* Represents the total number of API message events sent
	*/
	messagesSent?: number;

	/**
	* Represents the total number of payload bytes sent on the corresponded data channel
	*/
	bytesSent?: number;

	/**
	* Represents the total number of API message events received on the corresponded data channel
	*/
	messagesReceived?: number;

	/**
	* Represents the total number of payload bytes received on the corresponded data channel
	*/
	bytesReceived?: number;

}

/**
* A Report created for Extended provided arbitrary data.
*/
export type ClientExtensionReport = {
	/**
	* The unique identifier of the service
	*/
	serviceId: string;

	/**
	* The timestamp when the corresponded data is generated for the report (UTC Epoch in ms)
	*/
	timestamp: number;

	/**
	* The name of the event
	*/
	extensionType: string;

	/**
	* The media unit id the report belongs to
	*/
	mediaUnitId?: string;

	/**
	* The marker the originated sample is reported with
	*/
	marker?: string;

	/**
	* The generated unique identifier of the call
	*/
	callId?: string;

	/**
	* webrtc app provided room id
	*/
	roomId?: string;

	/**
	* The generated unique identifier of the client
	*/
	clientId?: string;

	/**
	* webrtc app provided user identifier
	*/
	userId?: string;

	/**
	* The unique identifier of the peer connection
	*/
	peerConnectionId?: string;

	/**
	* The sequence number of the sample the event may related to
	*/
	sampleSeq?: number;

	/**
	* the human readable message of the event
	*/
	payload?: string;

}

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
	* The total number of audio samples received on the corresponded RTP stream
	*/
	totalSamplesReceived?: number;

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
	* The current audio level
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
	* This metric can be used together with totalSamplesDuration to calculate the percentage of played out media being synthesized
	*/
	synthesizedSamplesDuration?: number;

	/**
	* The number of synthesized samples events.
	*/
	synthesizedSamplesEvents?: number;

	/**
	*  The playout delay includes the delay from being emitted to the actual time of playout on the device
	*/
	totalPlayoutDelay?: number;

	/**
	* When audio samples are pulled by the playout device, this counter is incremented with the number of samples emitted for playout
	*/
	totalSamplesCount?: number;

}

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

/**
* A report created for observer generated events
*/
export type ObserverEventReport = {
	/**
	* The unique identifier of the service
	*/
	serviceId: string;

	/**
	* The timestamp when the corresponded data is generated for the report (UTC Epoch in ms)
	*/
	timestamp: number;

	/**
	* The generated unique identifier of the call
	*/
	callId: string;

	/**
	* The name of the event
	*/
	name: string;

	/**
	* The media unit id the report belongs to
	*/
	mediaUnitId?: string;

	/**
	* The marker the originated sample is reported with
	*/
	marker?: string;

	/**
	* webrtc app provided room id
	*/
	roomId?: string;

	/**
	* The generated unique identifier of the client
	*/
	clientId?: string;

	/**
	* webrtc app provided user identifier
	*/
	userId?: string;

	/**
	* The unique identifier of the peer connection
	*/
	peerConnectionId?: string;

	/**
	* The timestamp of the sample the event related to
	*/
	sampleTimestamp?: number;

	/**
	* The sequence number of the sample the event may related to
	*/
	sampleSeq?: number;

	/**
	* the human readable message of the event
	*/
	message?: string;

	/**
	* the value of the event
	*/
	value?: string;

	/**
	* attachment the event may created with
	*/
	attachments?: string;

}

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

/**
* A Report created for Client PeerConnection Transport.
*/
export type PeerConnectionTransportReport = {
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
	* The identifier of the transport the ICE candidate pair is negotiated on
	*/
	transportId: string;

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
	* The role this host plays in DTLS negotiations
	*/
	dtlsRole?: string;

	/**
	* The identifier of the candidate pair the transport currently uses
	*/
	selectedCandidatePairId?: string;

	/**
	* Represents the current transport state (RTCIceTransportState) of ICE for the peer connection transport layer
	*/
	iceState?: string;

	/**
	* If DTLS negotiated it gives the id of the local certificate
	*/
	localCertificateId?: string;

	/**
	* If DTLS negotiated it gives the id of the remote certificate
	*/
	remoteCertificateId?: string;

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

}

/**
* A multiplexed Report object wraps an encoded report in bytes format
*/
export type Report = {
	/**
	* The type of the report
	*/
	type: string;

	/**
	* The payload of contans the actual report
	*/
	payload: string;

	/**
	* The version of the schema the payload holds
	*/
	schemaVersion?: string;

}

/**
* Events happened in calls.
*/
export type SfuEventReport = {
	/**
	* The service id the report belongs to
	*/
	serviceId: string;

	/**
	* The timestamp when the corresponded data is generated for the report (UTC Epoch in ms)
	*/
	timestamp: number;

	/**
	* The name of the event. Possible values are: SFU_JOINED, SFU_LEFT, SFU_TRANSPORT_OPENED, SFU_TRANSPORT_CLOSED, SFU_RTP_STREAM_ADDED, SFU_RTP_STREAM_REMOVED
	*/
	name: string;

	/**
	* The media unit id the report belongs to
	*/
	mediaUnitId?: string;

	/**
	* The marker the originated sample is reported with
	*/
	marker?: string;

	/**
	* The generated unique identifier of the SFU
	*/
	sfuId?: string;

	/**
	* The callId the event belongs to
	*/
	callId?: string;

	/**
	* SFU provided transport identifier
	*/
	transportId?: string;

	/**
	* Unique identifier of the SFU stream id the rtp pad belongs to
	*/
	mediaStreamId?: string;

	/**
	* Unique identifier of the SFU stream id the rtp pad belongs to
	*/
	mediaSinkId?: string;

	/**
	* Unique identifier of the SCTP stream the event is related to
	*/
	sctpStreamId?: string;

	/**
	* Unique identifier of the Sfu Pad the event is related to
	*/
	rtpPadId?: string;

	/**
	* the human readable message of the event
	*/
	message?: string;

	/**
	* the value of the event
	*/
	value?: string;

	/**
	* attachment the event may created with
	*/
	attachments?: string;

}

/**
* A Report created for Extended provided arbitrary data.
*/
export type SfuExtensionReport = {
	/**
	* The service id the report belongs to
	*/
	serviceId: string;

	/**
	* The timestamp when the corresponded data is generated for the report (UTC Epoch in ms)
	*/
	timestamp: number;

	/**
	* The name of the event
	*/
	extensionType: string;

	/**
	* The media unit id the report belongs to
	*/
	mediaUnitId?: string;

	/**
	* The marker the originated sample is reported with
	*/
	marker?: string;

	/**
	* The generated unique identifier of the SFU
	*/
	sfuId?: string;

	/**
	* the human readable message of the event
	*/
	payload?: string;

}

/**
* A Report created for RTP streams going through the SFU
*/
export type SfuInboundRtpPadReport = {
	/**
	* The service id the report belongs to
	*/
	serviceId: string;

	/**
	* The media unit id the report belongs to
	*/
	mediaUnitId: string;

	/**
	* The provided unique identifier of the SFU
	*/
	sfuId: string;

	/**
	* The timestamp when the corresponded data is generated for the report (UTC Epoch in ms)
	*/
	timestamp: number;

	/**
	* The id of the transport the RTP stream uses.
	*/
	transportId: string;

	/**
	* Unique identifier of the Sfu stream the event is related to
	*/
	sfuStreamId: string;

	/**
	* The id of RTP pad.
	*/
	rtpPadId: string;

	/**
	* The synchronization source id of the RTP stream
	*/
	ssrc: number;

	/**
	* The marker the originated sample is reported with
	*/
	marker?: string;

	/**
	* Flag indicate if the sfu rtp pad is used as an internal rtp session between SFUs
	*/
	internal?: boolean;

	/**
	* only added if it is internal. The id of the remote Sfu that outbound rtp pad matched with this internal inbound rtp pad
	*/
	remoteSfuId?: string;

	/**
	* only added if it is internal. The id of the remote transportId that outbound rtp pad matched with this internal inbound rtp pad
	*/
	remoteTransportId?: string;

	/**
	* only added if it is internal. The id of the remote sinkId that outbound rtp pad matched with this internal inbound rtp pad
	*/
	remoteSinkId?: string;

	/**
	* only added if it is internal. The id of the remote outbound rtp pad matched with this internal inbound rtp pad
	*/
	remoteRtpPadId?: string;

	/**
	* The id of the track the RTP stream related to at the client side
	*/
	trackId?: string;

	/**
	* If the track id was provided by the Sfu, the observer can fill up the information of which client it belongs to
	*/
	clientId?: string;

	/**
	* The callId the event belongs to
	*/
	callId?: string;

	/**
	* the type of the media the stream carries ("audio" or "video")
	*/
	mediaType?: string;

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
* Metadata belongs to SFUs
*/
export type SfuMetaReport = {
	/**
	* The service id the report belongs to
	*/
	serviceId: string;

	/**
	* The timestamp when the corresponded data is generated for the report (UTC Epoch in ms)
	*/
	timestamp: number;

	/**
	* The media unit id the report belongs to
	*/
	mediaUnitId?: string;

	/**
	* The marker the originated sample is reported with
	*/
	marker?: string;

	/**
	* The generated unique identifier of the SFU
	*/
	sfuId?: string;

	/**
	* The callId the event belongs to
	*/
	callId?: string;

	/**
	* SFU provided transport identifier
	*/
	transportId?: string;

	/**
	* Unique identifier of the SFU stream id the rtp pad belongs to
	*/
	mediaStreamId?: string;

	/**
	* Unique identifier of the SFU stream id the rtp pad belongs to
	*/
	mediaSinkId?: string;

	/**
	* Unique identifier of the SCTP stream the event is related to
	*/
	sctpStreamId?: string;

	/**
	* Unique identifier of the Sfu Pad the event is related to
	*/
	rtpPadId?: string;

	/**
	* The type of the meta data reported for the peer connection
	*/
	type?: string;

	/**
	* The payload for the metadata reported for the peeer connection
	*/
	payload?: string;

}

/**
* A Report created for RTP streams going through the SFU
*/
export type SfuOutboundRtpPadReport = {
	/**
	* The service id the report belongs to
	*/
	serviceId: string;

	/**
	* The media unit id the report belongs to
	*/
	mediaUnitId: string;

	/**
	* The provided unique identifier of the SFU
	*/
	sfuId: string;

	/**
	* The timestamp when the corresponded data is generated for the report (UTC Epoch in ms)
	*/
	timestamp: number;

	/**
	* The id of the transport the RTP stream uses.
	*/
	transportId: string;

	/**
	* Unique identifier of the Sfu stream the event is related to
	*/
	sfuStreamId: string;

	/**
	* Unique identifier of the Sfu sink the event is related to
	*/
	sfuSinkId: string;

	/**
	* The id of RTP pad.
	*/
	rtpPadId: string;

	/**
	* The synchronization source id of the RTP stream
	*/
	ssrc: number;

	/**
	* The marker the originated sample is reported with
	*/
	marker?: string;

	/**
	* Flag indicate if the sfu rtp pad is used as an internal rtp session between SFUs
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
	mediaType?: string;

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
	* The calculated RTT of the stream
	*/
	roundTripTime?: number;

}

/**
* A Report created for SCTP streams going through the SFU
*/
export type SfuSctpStreamReport = {
	/**
	* The service id the report belongs to
	*/
	serviceId: string;

	/**
	* The media unit id the report belongs to
	*/
	mediaUnitId: string;

	/**
	* The provided unique identifier of the SFU
	*/
	sfuId: string;

	/**
	* The timestamp when the corresponded data is generated for the report (UTC Epoch in ms)
	*/
	timestamp: number;

	/**
	* The id of the transport the RTP stream uses.
	*/
	transportId: string;

	/**
	* The id of the sctp stream
	*/
	streamId: string;

	/**
	* The marker the originated sample is reported with
	*/
	marker?: string;

	/**
	* Flag indicate if the sctp channel is used as an internal transport between SFUs
	*/
	internal?: boolean;

	/**
	* The generated unique identifier of the call
	*/
	callId?: string;

	/**
	* webrtc app provided room id
	*/
	roomId?: string;

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
* A Report created for SFU Transport layer typically created to transfer RTP/SCTP/RTX streams to another client, SFU, MCU, or processing module.
*/
export type SFUTransportReport = {
	/**
	* The service id the report belongs to
	*/
	serviceId: string;

	/**
	* The media unit id the report belongs to
	*/
	mediaUnitId: string;

	/**
	* The provided unique identifier of the SFU
	*/
	sfuId: string;

	/**
	* The timestamp when the corresponded data is generated for the report (UTC Epoch in ms)
	*/
	timestamp: number;

	/**
	* The generated unique identifier of the transport
	*/
	transportId: string;

	/**
	* The marker the originated sample is reported with
	*/
	marker?: string;

	/**
	* Flag indicate if the sfu transport is used as an internal transport between SFUs
	*/
	internal?: boolean;

	/**
	* The generated unique identifier of the call
	*/
	callId?: string;

	/**
	* webrtc app provided room id
	*/
	roomId?: string;

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
