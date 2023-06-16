ObserveRTC Schemas
---
Javascript bindings for ObserveRTC schemas
- [reports](#reports)
	* [CallEventReport](#CallEventReport)
	* [CallMetaReport](#CallMetaReport)
	* [ClientDataChannelReport](#ClientDataChannelReport)
	* [ClientExtensionReport](#ClientExtensionReport)
	* [IceCandidatePairReport](#IceCandidatePairReport)
	* [InboundAudioTrackReport](#InboundAudioTrackReport)
	* [InboundVideoTrackReport](#InboundVideoTrackReport)
	* [ObserverEventReport](#ObserverEventReport)
	* [OutboundAudioTrackReport](#OutboundAudioTrackReport)
	* [OutboundVideoTrackReport](#OutboundVideoTrackReport)
	* [PeerConnectionTransportReport](#PeerConnectionTransportReport)
	* [Report](#Report)
	* [SfuEventReport](#SfuEventReport)
	* [SfuExtensionReport](#SfuExtensionReport)
	* [SfuInboundRtpPadReport](#SfuInboundRtpPadReport)
	* [SfuMetaReport](#SfuMetaReport)
	* [SfuOutboundRtpPadReport](#SfuOutboundRtpPadReport)
	* [SfuSctpStreamReport](#SfuSctpStreamReport)
	* [SFUTransportReport](#SFUTransportReport)
- [Changelog](#Changelog)
## CallEventReport


Observer created reports related to events (call started, call ended, client joined, etc...) indicated by the incoming samples.


Field | Description 
--- | ---
serviceId (**Mandatory**) | The unique identifier of the service
timestamp (**Mandatory**) | The timestamp when the corresponded data is generated for the report (UTC Epoch in ms)
name (**Mandatory**) | The name of the event. Possible values are: CALL_STARTED, CALL_ENDED, CLIENT_JOINED, CLIENT_LEFT, PEER_CONNECTION_OPENED, PEER_CONNECTION_CLOSED, MEDIA_TRACK_ADDED, MEDIA_TRACK_REMOVED
mediaUnitId | The media unit id the report belongs to
marker | The marker the originated sample is reported with
callId | The generated unique identifier of the call
roomId | webrtc app provided room id
clientId | The generated unique identifier of the client
userId | webrtc app provided user identifier
peerConnectionId | The unique identifier of the peer connection
mediaTrackId | The unique identifier of the media track
SSRC | The SSRC identifier of the RTP stream a trackId belongs to
sampleTimestamp | The timestamp of the sample the event related to
sampleSeq | The sequence number of the sample the event may related to
message | the human readable message of the event
value | the value of the event
attachments | attachment the event may created with


## CallMetaReport


Metadata belongs to a call and can be useful


Field | Description 
--- | ---
serviceId (**Mandatory**) | The unique identifier of the service
timestamp (**Mandatory**) | The timestamp when the corresponded data is generated for the report (UTC Epoch in ms)
mediaUnitId | The media unit id the report belongs to
marker | The marker the originated sample is reported with
callId | The generated unique identifier of the call
roomId | webrtc app provided room id
clientId | The generated unique identifier of the client
userId | webrtc app provided user identifier
peerConnectionId | The unique identifier of the peer connection
sampleTimestamp | The timestamp of the sample the event related to
sampleSeq | The sequence number of the sample the event may related to
type | The type of the meta data. Possible values are: OPERATION_SYSTEM, ENGINE, PLATFORM, BROWSER, CERTIFICATE, CODEC, ICE_LOCAL_CANDIDATE, ICE_REMOTE_CANDIDATE, ICE_SERVER, MEDIA_CONSTRAINT, MEDIA_DEVICE, MEDIA_SOURCE, USER_MEDIA_ERROR, LOCAL_SDP
payload | The payload for the metadata reported for the peeer connection


## ClientDataChannelReport


A Report created for PeerConnection Data Channel.


Field | Description 
--- | ---
serviceId (**Mandatory**) | The unique identifier of the service
mediaUnitId (**Mandatory**) | The media unit id the report belongs to
timestamp (**Mandatory**) | The timestamp when the corresponded data is generated for the report (UTC Epoch in ms)
callId (**Mandatory**) | The generated unique identifier of the call
clientId (**Mandatory**) | The generated unique identifier of the client
peerConnectionId (**Mandatory**) | The unique identifier of the peer connection
sampleSeq (**Mandatory**) | The sequence number of the sample the report is generated from
marker | The marker the originated sample is reported with
roomId | webrtc app provided room id
userId | webrtc app provided user identifier
peerConnectionLabel | The webrtc app provided label for the peer connection
label | The label of the data channel
protocol | The protocol used for the data channel
state | The state of the data channel
messagesSent | Represents the total number of API message events sent
bytesSent | Represents the total number of payload bytes sent on the corresponded data channel
messagesReceived | Represents the total number of API message events received on the corresponded data channel
bytesReceived | Represents the total number of payload bytes received on the corresponded data channel


## ClientExtensionReport


A Report created for Extended provided arbitrary data.


Field | Description 
--- | ---
serviceId (**Mandatory**) | The unique identifier of the service
timestamp (**Mandatory**) | The timestamp when the corresponded data is generated for the report (UTC Epoch in ms)
extensionType (**Mandatory**) | The name of the event
mediaUnitId | The media unit id the report belongs to
marker | The marker the originated sample is reported with
callId | The generated unique identifier of the call
roomId | webrtc app provided room id
clientId | The generated unique identifier of the client
userId | webrtc app provided user identifier
peerConnectionId | The unique identifier of the peer connection
sampleSeq | The sequence number of the sample the event may related to
payload | the human readable message of the event


## IceCandidatePairReport


A Report created for ICE candidate pairs


Field | Description 
--- | ---
serviceId (**Mandatory**) | The unique identifier of the service
mediaUnitId (**Mandatory**) | The media unit id the report belongs to
timestamp (**Mandatory**) | The timestamp when the corresponded data is generated for the report (UTC Epoch in ms)
callId (**Mandatory**) | The generated unique identifier of the call
clientId (**Mandatory**) | The generated unique identifier of the client
peerConnectionId (**Mandatory**) | The unique identifier of the peer connection
sampleSeq (**Mandatory**) | The sequence number of the sample the report is generated from
marker | The marker the originated sample is reported with
roomId | webrtc app provided room id
userId | webrtc app provided user identifier
label | The webrtc app provided label the peer connection is marked with
candidatePairId | The unique identifier of the peer connection
transportId | The identifier of the transport the ice candidate pair is negotiated on
localCandidateId | The unique identifier of the candidate the negotiated pair is selected at local side
remoteCandidateId | The unique identifier of the candidate the negotiated pair is selected at remote side
state | The state of ICE Candidate Pairs (RTCStatsIceState) on the corresponded transport
nominated | indicate if the ice candidate pair is nominated or not
packetsSent | The total number of packets sent using the last selected candidate pair over the corresponded transport
packetsReceived | The total number of packets received using the last selected candidate pair over the corresponded transport
bytesSent | The total number of bytes sent using the last selected candidate pair over the corresponded transport
bytesReceived | The total number of bytes received using the last selected candidate pair over the corresponded transport
lastPacketSentTimestamp | Represents the timestamp at which the last packet was sent on the selected candidate pair, excluding STUN packets over the corresponded transport (UTC Epoch in ms)
lastPacketReceivedTimestamp | Represents the timestamp at which the last packet was received on the selected candidate pair, excluding STUN packets over the corresponded transport (UTC Epoch in ms)
totalRoundTripTime | Represents the sum of all round trip time measurements in seconds since the beginning of the session, based on STUN connectivity check over the corresponded transport
currentRoundTripTime | Represents the last round trip time measurements in seconds based on STUN connectivity check over the corresponded transport
availableOutgoingBitrate | The sum of the underlying cc algorithm provided outgoing bitrate for the RTP streams over the corresponded transport
availableIncomingBitrate | The sum of the underlying cc algorithm provided incoming bitrate for the RTP streams over the corresponded transport
requestsReceived | Represents the total number of connectivity check requests received on the selected candidate pair using the corresponded transport
requestsSent | Represents the total number of connectivity check requests sent on the selected candidate pair using the corresponded transport
responsesReceived | Represents the total number of connectivity check responses received on the selected candidate pair using the corresponded transport
responsesSent | Represents the total number of connectivity check responses sent on the selected candidate pair using the corresponded transport
consentRequestsSent | Represents the total number of consent requests sent on the selected candidate pair using the corresponded transport
packetsDiscardedOnSend | Total amount of packets for this candidate pair that have been discarded due to socket errors on the selected candidate pair using the corresponded transport
bytesDiscardedOnSend | Total amount of bytes for this candidate pair that have been discarded due to socket errors on the selected candidate pair using the corresponded transport


## InboundAudioTrackReport


A Report created for Inbound Audio Tracks. A combination of Codec metadata carrying inbound and remote outbound RTP stats measurements


Field | Description 
--- | ---
serviceId (**Mandatory**) | The unique identifier of the service
mediaUnitId (**Mandatory**) | The media unit id the report belongs to
timestamp (**Mandatory**) | The timestamp when the corresponded data is generated for the report (UTC Epoch in ms)
callId (**Mandatory**) | The generated unique identifier of the call
clientId (**Mandatory**) | The generated unique identifier of the client
peerConnectionId (**Mandatory**) | The unique identifier of the peer connection
sampleSeq (**Mandatory**) | The sequence number of the sample the report is generated from
ssrc (**Mandatory**) | The RTP SSRC field
marker | The marker the originated sample is reported with
roomId | webrtc app provided room id
userId | webrtc app provided user identifier
label | The webrtc app provided label the peer connection is labeled with
trackId | The id of the track
sfuStreamId | The id of the Sfu stream the media from
sfuSinkId | The id of the sink the Sfu streamed the media out
remoteTrackId | The id of the remote track this inbound track is originated from
remoteUserId | The webrtc app provided user id the track belongs to, or if the webrtc app did not provided the observer tried to match it
remoteClientId | The observer matched remote client Id
remotePeerConnectionId | The observer matched remote Peer Connection Id
packetsReceived | The total number of packets received on the corresponded synchronization source
packetsLost | The total number of bytes received on the corresponded synchronization source
jitter | The corresponded synchronization source reported jitter
lastPacketReceivedTimestamp | Represents the timestamp at which the last packet was received on the corresponded synchronization source (ssrc)
headerBytesReceived | Total number of RTP header and padding bytes received over the corresponding synchronization source (ssrc)
packetsDiscarded | The total number of packets missed the playout point and therefore discarded by the jitterbuffer
fecPacketsReceived | Total number of FEC packets received over the corresponding synchronization source (ssrc)
fecPacketsDiscarded | Total number of FEC packets discarded over the corresponding synchronization source (ssrc) due to 1) late arrive; 2) the target RTP packet has already been repaired.
bytesReceived | Total number of bytes received over the corresponding synchronization source (ssrc) due to 1) late arrive; 2) the target RTP packet has already been repaired.
nackCount | Count the total number of Negative ACKnowledgement (NACK) packets sent and belongs to the corresponded synchronization source (ssrc)
totalProcessingDelay | The total processing delay in seconds spend on buffering RTP packets from received up until packets are decoded
estimatedPlayoutTimestamp | The estimated playout time of the corresponded synchronization source
jitterBufferDelay | The total time of RTP packets spent in jitterbuffer waiting for frame completion due to network uncertenity.
jitterBufferTargetDelay | This value is increased by the target jitter buffer delay every time a sample is emitted by the jitter buffer. The added target is the target delay, in seconds, at the time that the sample was emitted from the jitter buffer. 
jitterBufferEmittedCount | The total number of audio samples or video frames that have come out of the jitter buffer on the corresponded synchronization source (ssrc)
jitterBufferMinimumDelay | This metric is purely based on the network characteristics such as jitter and packet loss, and can be seen as the minimum obtainable jitter buffer delay if no external factors would affect it
totalSamplesReceived | The total number of audio samples received on the corresponded RTP stream
concealedSamples | The total number of samples decoded by the media decoder from the corresponded RTP stream
silentConcealedSamples | The total number of samples concealed from the corresponded RTP stream
concealmentEvents | The total number of concealed event emitted to the media codec by the corresponded jitterbuffer
insertedSamplesForDeceleration | The total number of samples inserted to decelarete the audio playout (happens when the jitterbuffer detects a shrinking buffer and need to increase the jitter buffer delay)
removedSamplesForAcceleration | The total number of samples inserted to accelerate the audio playout (happens when the jitterbuffer detects a growing buffer and need to shrink the jitter buffer delay)
audioLevel | The current audio level
totalAudioEnergy | Represents the energy level reported by the media source
totalSamplesDuration | Represents the total duration of the audio samples the media source actually transconverted in seconds
decoderImplementation | Indicate the name of the decoder implementation library
packetsSent | Total number of RTP packets sent at the remote endpoint to this endpoint on this synchronization source
bytesSent | Total number of payload bytes sent at the remote endpoint to this endpoint on this synchronization source
remoteTimestamp | The timestamp corresnponds to the time in UTC Epoch the remote endpoint reported the statistics belong to the sender side and correspond to the synchronization source (ssrc)
reportsSent | The number of SR reports the remote endpoint sent corresponded to synchronization source (ssrc) this report belongs to
roundTripTime | Estimated round trip time for the SR reports based on DLRR reports on the corresponded RTP stream
totalRoundTripTime |  Represents the cumulative sum of all round trip time measurements performed on the corresponded RTP stream
roundTripTimeMeasurements | Represents the total number of SR reports received with DLRR reports to be able to calculate the round trip time on the corresponded RTP stream
synthesizedSamplesDuration | This metric can be used together with totalSamplesDuration to calculate the percentage of played out media being synthesized
synthesizedSamplesEvents | The number of synthesized samples events.
totalPlayoutDelay |  The playout delay includes the delay from being emitted to the actual time of playout on the device
totalSamplesCount | When audio samples are pulled by the playout device, this counter is incremented with the number of samples emitted for playout


## InboundVideoTrackReport


A Report created for Inbound Video Tracks. A combination of Codec metadata carrying inbound and remote outbound RTP stats measurements


Field | Description 
--- | ---
serviceId (**Mandatory**) | The unique identifier of the service
mediaUnitId (**Mandatory**) | The media unit id the report belongs to
timestamp (**Mandatory**) | The timestamp when the corresponded data is generated for the report (UTC Epoch in ms)
callId (**Mandatory**) | The generated unique identifier of the call
clientId (**Mandatory**) | The generated unique identifier of the client
peerConnectionId (**Mandatory**) | The unique identifier of the peer connection
sampleSeq (**Mandatory**) | The sequence number of the sample the report is generated from
ssrc (**Mandatory**) | The RTP SSRC field
marker | The marker the originated sample is reported with
roomId | webrtc app provided room id
userId | webrtc app provided user identifier
label | The webrtc app provided label the peer connection is labeled with
trackId | The id of the track
sfuStreamId | The id of the Sfu stream the media from
sfuSinkId | The id of the sink the Sfu streamed the media out
remoteTrackId | The id of the remote track this inbound track is originated from
remoteUserId | The webrtc app provided user id the track belongs to, or if the webrtc app did not provided the observer tried to match it
remoteClientId | The observer matched remote client Id
remotePeerConnectionId | The observer matched remote Peer Connection Id
packetsReceived | The total number of packets received on the corresponded synchronization source
packetsLost | The total number of bytes received on the corresponded synchronization source
jitter | The corresponded synchronization source reported jitter
framesDropped | The number of frames dropped prior to decode or missing chunks
lastPacketReceivedTimestamp | Represents the timestamp at which the last packet was received on the corresponded synchronization source (ssrc)
headerBytesReceived | Total number of RTP header and padding bytes received over the corresponding synchronization source (ssrc)
packetsDiscarded | The total number of packets missed the playout point and therefore discarded by the jitterbuffer
fecPacketsReceived | Total number of FEC packets received over the corresponding synchronization source (ssrc)
fecPacketsDiscarded | Total number of FEC packets discarded over the corresponding synchronization source (ssrc) due to 1) late arrive; 2) the target RTP packet has already been repaired.
bytesReceived | Total number of bytes received over the corresponding synchronization source (ssrc) due to 1) late arrive; 2) the target RTP packet has already been repaired.
nackCount | Count the total number of Negative ACKnowledgement (NACK) packets sent and belongs to the corresponded synchronization source (ssrc)
totalProcessingDelay | The total processing delay in seconds spend on buffering RTP packets from received up until packets are decoded
estimatedPlayoutTimestamp | The estimated playout time of the corresponded synchronization source
jitterBufferDelay | The total time of RTP packets spent in jitterbuffer waiting for frame completion due to network uncertenity.
jitterBufferTargetDelay | This value is increased by the target jitter buffer delay every time a sample is emitted by the jitter buffer. The added target is the target delay, in seconds, at the time that the sample was emitted from the jitter buffer. 
jitterBufferEmittedCount | The total number of audio samples or video frames that have come out of the jitter buffer on the corresponded synchronization source (ssrc)
jitterBufferMinimumDelay | This metric is purely based on the network characteristics such as jitter and packet loss, and can be seen as the minimum obtainable jitter buffer delay if no external factors would affect it
decoderImplementation | Indicate the name of the decoder implementation library
framesDecoded | The total number of frames decoded on the corresponded RTP stream
keyFramesDecoded | The total number of keyframes decoded on the corresponded RTP stream
frameWidth | The width of the frame of the video sent by the remote source on the corresponded RTP stream
frameHeight | The height of the frame of the video sent by the remote source on the corresponded RTP stream
framesPerSecond | The frame per seconds of the video sent by the remote source on the corresponded RTP stream
qpSum | The QP sum (only interested in VP8,9) of the frame of the video sent by the remote source on the corresponded RTP stream
totalDecodeTime | The total tiem spent on decoding video on the corresponded RTP stream
totalInterFrameDelay | The total interframe delay
totalSquaredInterFrameDelay | The total number of inter frame delay squere on the corresponded synchronization source (ssrc) Useful for variance calculation for interframe delays
firCount | The total number FIR packets sent from this endpoint to the source on the corresponded RTP stream
pliCount | The total number of Picture Loss Indication sent on the corresponded RTP stream
framesReceived | The total number of frames received on the corresponded RTP stream.
packetsSent | Total number of RTP packets sent at the remote endpoint to this endpoint on this synchronization source
bytesSent | Total number of payload bytes sent at the remote endpoint to this endpoint on this synchronization source
remoteTimestamp | The timestamp corresnponds to the time in UTC Epoch the remote endpoint reported the statistics belong to the sender side and correspond to the synchronization source (ssrc)
reportsSent | The number of SR reports the remote endpoint sent corresponded to synchronization source (ssrc) this report belongs to
roundTripTime | Estimated round trip time for the SR reports based on DLRR reports on the corresponded RTP stream
totalRoundTripTime |  Represents the cumulative sum of all round trip time measurements performed on the corresponded RTP stream
roundTripTimeMeasurements | Represents the total number of SR reports received with DLRR reports to be able to calculate the round trip time on the corresponded RTP stream


## ObserverEventReport


A report created for observer generated events


Field | Description 
--- | ---
serviceId (**Mandatory**) | The unique identifier of the service
timestamp (**Mandatory**) | The timestamp when the corresponded data is generated for the report (UTC Epoch in ms)
callId (**Mandatory**) | The generated unique identifier of the call
name (**Mandatory**) | The name of the event
mediaUnitId | The media unit id the report belongs to
marker | The marker the originated sample is reported with
roomId | webrtc app provided room id
clientId | The generated unique identifier of the client
userId | webrtc app provided user identifier
peerConnectionId | The unique identifier of the peer connection
sampleTimestamp | The timestamp of the sample the event related to
sampleSeq | The sequence number of the sample the event may related to
message | the human readable message of the event
value | the value of the event
attachments | attachment the event may created with


## OutboundAudioTrackReport


A Report created for Outbound Audio Tracks. A combination of Audio source, Codec metadata carrying outbound and remote inbound RTP stat measurements


Field | Description 
--- | ---
serviceId (**Mandatory**) | The unique identifier of the service
mediaUnitId (**Mandatory**) | The media unit id the report belongs to
timestamp (**Mandatory**) | The timestamp when the corresponded data is generated for the report (UTC Epoch in ms)
callId (**Mandatory**) | The generated unique identifier of the call
clientId (**Mandatory**) | The generated unique identifier of the client
peerConnectionId (**Mandatory**) | The unique identifier of the peer connection
sampleSeq (**Mandatory**) | The sequence number of the sample the report is generated from
ssrc (**Mandatory**) | The RTP SSRC field
marker | The marker the originated sample is reported with
roomId | webrtc app provided room id
userId | webrtc app provided user identifier
label | The webrtc app provided label the peer connection is labeled with
trackId | The id of the track
sfuStreamId | The id of the Sfu stream corresponds to the outbound track
packetsSent | The total number of packets sent on the corresponded synchronization source
bytesSent | The total number of bytes sent on the corresponded synchronization source
rid |  The rid encoding parameter of the corresponded synchronization source
headerBytesSent | Total number of RTP header and padding bytes sent over the corresponding synchronization source (ssrc)
retransmittedPacketsSent | Total number of retransmitted packets sent over the corresponding synchronization source (ssrc).
retransmittedBytesSent | Total number of retransmitted bytes sent over the corresponding synchronization source (ssrc).
targetBitrate | Reflects the current encoder target in bits per second.
totalEncodedBytesTarget | The total number of bytes of RTP coherent frames encoded completly depending on the frame size the encoder targets
totalPacketSendDelay | The total number of delay packets buffered at the sender side in seconds over the corresponding synchronization source
averageRtcpInterval | The average RTCP interval between two consecutive compound RTCP packets sent for the corresponding synchronization source (ssrc)
nackCount | Count the total number of Negative ACKnowledgement (NACK) packets received over the corresponding synchronization source (ssrc)
encoderImplementation | Indicate the name of the encoder implementation library
active | Indicates whether this RTP stream is configured to be sent or disabled
packetsReceived | The total number of packets received on the corresponded synchronization source
packetsLost | The total number of bytes received on the corresponded synchronization source
jitter | The corresponded synchronization source reported jitter
roundTripTime | RTT measurement in seconds based on (most likely) SR, and RR belongs to the corresponded synchronization source
totalRoundTripTime | The sum of RTT measurements belongs to the corresponded synchronization source
fractionLost | The receiver reported fractional lost belongs to the corresponded synchronization source
roundTripTimeMeasurements | The total number of calculated RR measurements received on this source
relayedSource | True if the corresponded media source is remote, false otherwise (or null depending on browser and version)
audioLevel | Represents the audio level reported by the media source
totalAudioEnergy | Represents the energy level reported by the media source
totalSamplesDuration | Represents the total duration of the audio samples the media source actually transconverted in seconds
echoReturnLoss | Represents the echo cancellation in decibels corresponded to the media source.
echoReturnLossEnhancement | Represents the echo cancellation in decibels added as a postprocessing by the library after the audio is catched from the emdia source.
droppedSamplesDuration | . The total duration, in seconds, of samples produced by the device that got dropped before reaching the media source
droppedSamplesEvents | A counter increases every time a sample is dropped after a non-dropped sample
totalCaptureDelay | Total delay, in seconds, for each audio sample between the time the sample was emitted by the capture device and the sample reaching the source
totalSamplesCaptured | The total number of captured samples reaching the audio source


## OutboundVideoTrackReport


A Report created for Outbound Video Tracks. A combination of Video source, Codec metadata carrying outbound and remote inbound RTP stat measurements


Field | Description 
--- | ---
serviceId (**Mandatory**) | The unique identifier of the service
mediaUnitId (**Mandatory**) | The media unit id the report belongs to
timestamp (**Mandatory**) | The timestamp when the corresponded data is generated for the report (UTC Epoch in ms)
callId (**Mandatory**) | The generated unique identifier of the call
clientId (**Mandatory**) | The generated unique identifier of the client
peerConnectionId (**Mandatory**) | The unique identifier of the peer connection
sampleSeq (**Mandatory**) | The sequence number of the sample the report is generated from
ssrc (**Mandatory**) | The RTP SSRC field
marker | The marker the originated sample is reported with
roomId | webrtc app provided room id
userId | webrtc app provided user identifier
label | The webrtc app provided label the peer connection is labeled with
trackId | The id of the track
sfuStreamId | The id of the Sfu stream corresponds to the outbound track
packetsSent | The total number of packets sent on the corresponded synchronization source
bytesSent | The total number of bytes sent on the corresponded synchronization source
rid |  The rid encoding parameter of the corresponded synchronization source
headerBytesSent | Total number of RTP header and padding bytes sent over the corresponding synchronization source (ssrc)
retransmittedPacketsSent | Total number of retransmitted packets sent over the corresponding synchronization source (ssrc).
retransmittedBytesSent | Total number of retransmitted bytes sent over the corresponding synchronization source (ssrc).
targetBitrate | Reflects the current encoder target in bits per second.
totalEncodedBytesTarget | The total number of bytes of RTP coherent frames encoded completly depending on the frame size the encoder targets
totalPacketSendDelay | The total number of delay packets buffered at the sender side in seconds over the corresponding synchronization source
averageRtcpInterval | The average RTCP interval between two consecutive compound RTCP packets sent for the corresponding synchronization source (ssrc)
nackCount | Count the total number of Negative ACKnowledgement (NACK) packets received over the corresponding synchronization source (ssrc)
encoderImplementation | Indicate the name of the encoder implementation library
active | Indicates whether this RTP stream is configured to be sent or disabled
frameWidth | The frame width in pixels of the frames targeted by the media encoder
frameHeight | The frame width the media encoder targeted
framesPerSecond | The encoded number of frames in the last second on the corresponded media source
framesSent | TThe total number of frames sent on the corresponded RTP stream
hugeFramesSent | The total number of huge frames (avgFrameSize * 2.5) on the corresponded RTP stream
framesEncoded | The total number of frames encoded by the media source
keyFramesEncoded | The total number of keyframes encoded on the corresponded RTP stream
qpSum | The sum of the QP the media encoder provided on the corresponded RTP stream.
totalEncodeTime | The total time in seconds spent in encoding media frames for the corresponded RTP stream.
qualityLimitationDurationNone | Time elapsed in seconds when the RTC connection has not limited the quality
qualityLimitationDurationCPU | Time elapsed in seconds the RTC connection had a limitation because of CPU
qualityLimitationDurationBandwidth | Time elapsed in seconds the RTC connection had a limitation because of Bandwidth
qualityLimitationDurationOther | Time elapsed in seconds the RTC connection had a limitation because of Other factor
qualityLimitationReason | Indicate a reason for the quality limitation of the corresponded synchronization source
qualityLimitationResolutionChanges | The total number of resolution changes occured ont he corresponded RTP stream due to quality changes
firCount | The total number FIR packets sent from this endpoint to the source on the corresponded RTP stream
pliCount | The total number of Picture Loss Indication sent on the corresponded RTP stream
packetsReceived | The total number of packets received on the corresponded synchronization source
packetsLost | The total number of bytes received on the corresponded synchronization source
jitter | The corresponded synchronization source reported jitter
roundTripTime | RTT measurement in seconds based on (most likely) SR, and RR belongs to the corresponded synchronization source
totalRoundTripTime | The sum of RTT measurements belongs to the corresponded synchronization source
fractionLost | The receiver reported fractional lost belongs to the corresponded synchronization source
roundTripTimeMeasurements | The total number of calculated RR measurements received on this source
framesDropped | The total number of frames reported to be lost by the remote endpoit on the corresponded RTP stream
relayedSource | True if the corresponded media source is remote, false otherwise (or null depending on browser and version)
width | The width, in pixels, of the last frame originating from the media source
height | The height, in pixels, of the last frame originating from the media source
frames | The total number of frames originated from the media source


## PeerConnectionTransportReport


A Report created for Client PeerConnection Transport.


Field | Description 
--- | ---
serviceId (**Mandatory**) | The unique identifier of the service
mediaUnitId (**Mandatory**) | The media unit id the report belongs to
timestamp (**Mandatory**) | The timestamp when the corresponded data is generated for the report (UTC Epoch in ms)
callId (**Mandatory**) | The generated unique identifier of the call
clientId (**Mandatory**) | The generated unique identifier of the client
peerConnectionId (**Mandatory**) | The unique identifier of the peer connection
transportId (**Mandatory**) | The identifier of the transport the ICE candidate pair is negotiated on
sampleSeq (**Mandatory**) | The sequence number of the sample the report is generated from
marker | The marker the originated sample is reported with
roomId | webrtc app provided room id
userId | webrtc app provided user identifier
label | The webrtc app provided label the peer connection is marked with
packetsSent | Represents the total number of packets sent on the corresponded transport
packetsReceived | Represents the total number of packets received on the corresponded transport
bytesSent | Represents the total amount of bytes sent on the corresponded transport
bytesReceived | Represents the total amount of bytes received on the corresponded transport
iceRole | Represent the current role of ICE under DTLS Transport
iceLocalUsernameFragment | Represent the current local username fragment used in message validation procedures for ICE under DTLS Transport
dtlsState | Represents the current state of DTLS for the peer connection transport layer
dtlsRole | The role this host plays in DTLS negotiations
selectedCandidatePairId | The identifier of the candidate pair the transport currently uses
iceState | Represents the current transport state (RTCIceTransportState) of ICE for the peer connection transport layer
localCertificateId | If DTLS negotiated it gives the id of the local certificate
remoteCertificateId | If DTLS negotiated it gives the id of the remote certificate
tlsVersion | Represents the version number of the TLS used in the corresponded transport
dtlsCipher | Represents the name of the DTLS cipher used in the corresponded transport
srtpCipher | Represents the name of the SRTP cipher used in the corresponded transport
tlsGroup | Represents the name of the IANA TLS Supported Groups used in the corresponded transport
selectedCandidatePairChanges | The total number of candidate pair changes over the peer connection


## Report


A multiplexed Report object wraps an encoded report in bytes format


Field | Description 
--- | ---
type (**Mandatory**) | The type of the report
payload (**Mandatory**) | The payload of contans the actual report
schemaVersion | The version of the schema the payload holds


## SfuEventReport


Events happened in calls.


Field | Description 
--- | ---
serviceId (**Mandatory**) | The service id the report belongs to
timestamp (**Mandatory**) | The timestamp when the corresponded data is generated for the report (UTC Epoch in ms)
name (**Mandatory**) | The name of the event. Possible values are: SFU_JOINED, SFU_LEFT, SFU_TRANSPORT_OPENED, SFU_TRANSPORT_CLOSED, SFU_RTP_STREAM_ADDED, SFU_RTP_STREAM_REMOVED
mediaUnitId | The media unit id the report belongs to
marker | The marker the originated sample is reported with
sfuId | The generated unique identifier of the SFU
callId | The callId the event belongs to
transportId | SFU provided transport identifier
mediaStreamId | Unique identifier of the SFU stream id the rtp pad belongs to
mediaSinkId | Unique identifier of the SFU stream id the rtp pad belongs to
sctpStreamId | Unique identifier of the SCTP stream the event is related to
rtpPadId | Unique identifier of the Sfu Pad the event is related to
message | the human readable message of the event
value | the value of the event
attachments | attachment the event may created with


## SfuExtensionReport


A Report created for Extended provided arbitrary data.


Field | Description 
--- | ---
serviceId (**Mandatory**) | The service id the report belongs to
timestamp (**Mandatory**) | The timestamp when the corresponded data is generated for the report (UTC Epoch in ms)
extensionType (**Mandatory**) | The name of the event
mediaUnitId | The media unit id the report belongs to
marker | The marker the originated sample is reported with
sfuId | The generated unique identifier of the SFU
payload | the human readable message of the event


## SfuInboundRtpPadReport


A Report created for RTP streams going through the SFU


Field | Description 
--- | ---
serviceId (**Mandatory**) | The service id the report belongs to
mediaUnitId (**Mandatory**) | The media unit id the report belongs to
sfuId (**Mandatory**) | The provided unique identifier of the SFU
timestamp (**Mandatory**) | The timestamp when the corresponded data is generated for the report (UTC Epoch in ms)
transportId (**Mandatory**) | The id of the transport the RTP stream uses.
sfuStreamId (**Mandatory**) | Unique identifier of the Sfu stream the event is related to
rtpPadId (**Mandatory**) | The id of RTP pad.
ssrc (**Mandatory**) | The synchronization source id of the RTP stream
marker | The marker the originated sample is reported with
internal | Flag indicate if the sfu rtp pad is used as an internal rtp session between SFUs
remoteSfuId | only added if it is internal. The id of the remote Sfu that outbound rtp pad matched with this internal inbound rtp pad
remoteTransportId | only added if it is internal. The id of the remote transportId that outbound rtp pad matched with this internal inbound rtp pad
remoteSinkId | only added if it is internal. The id of the remote sinkId that outbound rtp pad matched with this internal inbound rtp pad
remoteRtpPadId | only added if it is internal. The id of the remote outbound rtp pad matched with this internal inbound rtp pad
trackId | The id of the track the RTP stream related to at the client side
clientId | If the track id was provided by the Sfu, the observer can fill up the information of which client it belongs to
callId | The callId the event belongs to
mediaType | the type of the media the stream carries ("audio" or "video")
payloadType | The payload type field of the RTP header
mimeType | The negotiated mimeType in the SDP
clockRate | The clock rate of the media source the RTP header carries
sdpFmtpLine | The actual SDP line from the negotiation related to this RTP stream
rid |  The rid parameter of the corresponded RTP stream
rtxSsrc | If RTX is negotiated as a separate stream, this is the SSRC of the RTX stream that is associated with this stream's ssrc. 
targetBitrate | he bitrate the corresponded stream targets.
voiceActivityFlag | The RTP header V flag indicate of the activity of the media source by the media codec if the RTP transport ships it through
firCount | The total number FIR packets sent from this endpoint to the source on the corresponded RTP stream. Only for Video streams
pliCount | The total number of Picture Loss Indication sent on the corresponded RTP stream. Only for Video streams
nackCount | The total number of negative acknowledgement received on the corresponded RTP stream.
sliCount | The total number of SLI indicator sent from the endpoint on the corresponded RTP stream. Only for Audio stream
packetsLost | The total number of packets lost on the corresponded RTP stream.
packetsReceived | The total number of packets received on the corresponded RTP stream.
packetsDiscarded | The total number of discarded packets on the corresponded RTP stream.
packetsRepaired | The total number of packets repaired by either retransmission or FEC on the corresponded RTP stream.
packetsFailedDecryption | The total number of packets failed to be decrypted on the corresponded RTP stream.
packetsDuplicated | The total number of duplicated packets appeared on the corresponded RTP stream.
fecPacketsReceived | The total number of FEC packets received on the corresponded RTP stream.
fecPacketsDiscarded | The total number of FEC packets discarded on the corresponded RTP stream.
bytesReceived | The total amount of payload bytes received on the corresponded RTP stream.
rtcpSrReceived | The total number of SR reports received by the corresponded RTP stream
rtcpRrSent | The total number of RR reports sent on the corresponded RTP stream
rtxPacketsReceived | If rtx packets are sent or received on the same stream then this number indicates how may has been sent
rtxPacketsDiscarded | If rtx packets are received on the same stream then this number indicates how may has been discarded
framesReceived | The number of frames received on the corresponded RTP stream
framesDecoded | Indicate the number of frames the Sfu has been decoded
keyFramesDecoded | Indicate the number of keyframes the Sfu has been decoded
fractionLost | The calculated fractionLost of the stream
jitter | The calculated jitter of the stream
roundTripTime | The calculated RTT of the stream


## SfuMetaReport


Metadata belongs to SFUs


Field | Description 
--- | ---
serviceId (**Mandatory**) | The service id the report belongs to
timestamp (**Mandatory**) | The timestamp when the corresponded data is generated for the report (UTC Epoch in ms)
mediaUnitId | The media unit id the report belongs to
marker | The marker the originated sample is reported with
sfuId | The generated unique identifier of the SFU
callId | The callId the event belongs to
transportId | SFU provided transport identifier
mediaStreamId | Unique identifier of the SFU stream id the rtp pad belongs to
mediaSinkId | Unique identifier of the SFU stream id the rtp pad belongs to
sctpStreamId | Unique identifier of the SCTP stream the event is related to
rtpPadId | Unique identifier of the Sfu Pad the event is related to
type | The type of the meta data reported for the peer connection
payload | The payload for the metadata reported for the peeer connection


## SfuOutboundRtpPadReport


A Report created for RTP streams going through the SFU


Field | Description 
--- | ---
serviceId (**Mandatory**) | The service id the report belongs to
mediaUnitId (**Mandatory**) | The media unit id the report belongs to
sfuId (**Mandatory**) | The provided unique identifier of the SFU
timestamp (**Mandatory**) | The timestamp when the corresponded data is generated for the report (UTC Epoch in ms)
transportId (**Mandatory**) | The id of the transport the RTP stream uses.
sfuStreamId (**Mandatory**) | Unique identifier of the Sfu stream the event is related to
sfuSinkId (**Mandatory**) | Unique identifier of the Sfu sink the event is related to
rtpPadId (**Mandatory**) | The id of RTP pad.
ssrc (**Mandatory**) | The synchronization source id of the RTP stream
marker | The marker the originated sample is reported with
internal | Flag indicate if the sfu rtp pad is used as an internal rtp session between SFUs
callId | The callId the event belongs to
clientId | If the track id was provided by the Sfu, the observer can fill up the information of which client it belongs to
trackId | The id of the track the RTP stream related to at the client side
mediaType | the type of the media the stream carries ("audio" or "video")
payloadType | The payload type field of the RTP header
mimeType | The negotiated mimeType in the SDP
clockRate | The clock rate of the media source the RTP header carries
sdpFmtpLine | The actual SDP line from the negotiation related to this RTP stream
rid |  The rid parameter of the corresponded RTP stream
rtxSsrc | If RTX is negotiated as a separate stream, this is the SSRC of the RTX stream that is associated with this stream's ssrc. 
targetBitrate | he bitrate the corresponded stream targets.
voiceActivityFlag | The RTP header V flag indicate of the activity of the media source by the media codec if the RTP transport ships it through
firCount | The total number FIR packets sent from this endpoint to the source on the corresponded RTP stream. Only for Video streams
pliCount | The total number of Picture Loss Indication sent on the corresponded RTP stream. Only for Video streams
nackCount | The total number of negative acknowledgement received on the corresponded RTP stream.
sliCount | The total number of SLI indicator sent from the endpoint on the corresponded RTP stream. Only for Audio stream
packetsLost | The total number of packets lost on the corresponded RTP stream.
packetsSent | The total number of packets sent on the corresponded RTP stream.
packetsDiscarded | The total number of discarded packets on the corresponded RTP stream.
packetsRetransmitted | The total number of packets retransmitted on the corresponded RTP stream.
packetsFailedEncryption | The total number of packets failed to be encrypted on the corresponded RTP stream.
packetsDuplicated | The total number of duplicated packets appeared on the corresponded RTP stream.
fecPacketsSent | The total number of FEC packets sent on the corresponded RTP stream.
fecPacketsDiscarded | The total number of FEC packets discarded on the corresponded RTP stream.
bytesSent | The total amount of payload bytes sent on the corresponded RTP stream.
rtcpSrSent | The total number of SR reports sent by the corresponded RTP stream
rtcpRrReceived | The total number of RR reports received on the corresponded RTP stream
rtxPacketsSent | If rtx packets sent on the same stream then this number indicates how may has been sent
rtxPacketsDiscarded | If rtx packets are received on the same stream then this number indicates how may has been discarded
framesSent | The number of frames sent on the corresponded RTP stream
framesEncoded | Indicate the number of frames the Sfu has been encoded
keyFramesEncoded | Indicate the number of keyframes the Sfu has been encoded on the corresponded RTP stream
roundTripTime | The calculated RTT of the stream


## SfuSctpStreamReport


A Report created for SCTP streams going through the SFU


Field | Description 
--- | ---
serviceId (**Mandatory**) | The service id the report belongs to
mediaUnitId (**Mandatory**) | The media unit id the report belongs to
sfuId (**Mandatory**) | The provided unique identifier of the SFU
timestamp (**Mandatory**) | The timestamp when the corresponded data is generated for the report (UTC Epoch in ms)
transportId (**Mandatory**) | The id of the transport the RTP stream uses.
streamId (**Mandatory**) | The id of the sctp stream
marker | The marker the originated sample is reported with
internal | Flag indicate if the sctp channel is used as an internal transport between SFUs
callId | The generated unique identifier of the call
roomId | webrtc app provided room id
label | The label of the sctp stream
protocol | The protocol used to establish an sctp stream
sctpSmoothedRoundTripTime | The latest smoothed round-trip time value, corresponding to spinfo_srtt defined in [RFC6458] but converted to seconds. If there has been no round-trip time measurements yet, this value is undefined.
sctpCongestionWindow | The latest congestion window, corresponding to spinfo_cwnd defined in [RFC6458].
sctpReceiverWindow | The latest receiver window, corresponding to sstat_rwnd defined in [RFC6458].
sctpMtu | The latest maximum transmission unit, corresponding to spinfo_mtu defined in [RFC6458].
sctpUnackData | The number of unacknowledged DATA chunks, corresponding to sstat_unackdata defined in [RFC6458].
messageReceived | The number of message received on the corresponded SCTP stream.
messageSent | The number of message sent on the corresponded SCTP stream.
bytesReceived | The number of bytes received on the corresponded SCTP stream.
bytesSent | The number of bytes sent on the corresponded SCTP stream.


## SFUTransportReport


A Report created for SFU Transport layer typically created to transfer RTP/SCTP/RTX streams to another client, SFU, MCU, or processing module.


Field | Description 
--- | ---
serviceId (**Mandatory**) | The service id the report belongs to
mediaUnitId (**Mandatory**) | The media unit id the report belongs to
sfuId (**Mandatory**) | The provided unique identifier of the SFU
timestamp (**Mandatory**) | The timestamp when the corresponded data is generated for the report (UTC Epoch in ms)
transportId (**Mandatory**) | The generated unique identifier of the transport
marker | The marker the originated sample is reported with
internal | Flag indicate if the sfu transport is used as an internal transport between SFUs
callId | The generated unique identifier of the call
roomId | webrtc app provided room id
dtlsState | Represent the current value of the state attribute of the underlying RTCDtlsTransport.
iceState | Represent the current value of the state attribute of the underlying RTCIceTransport
sctpState | Represents the the current value of the SCTP state of the transport of the SFU
iceRole | Represent the current value of the role SFU takes place in ICE
localAddress | The local address of the ICE candidate selected for the transport (IPv4, IPv6, FQDN)
localPort | The local port number
protocol | The protocol used by the transport
remoteAddress | The remote address of the ICE candidate selected for the transport (IPv4, IPv6, FQDN)
remotePort | The remote port number
rtpBytesReceived | The total amount of RTP bytes received on this transport
rtpBytesSent | The total amount of RTP bytes sent on this transport
rtpPacketsReceived | The total amount of RTP packets received on this transport
rtpPacketsSent | The total amount of RTP packets sent on this transport
rtpPacketsLost | The total amount of RTP packets lost on this transport
rtxBytesReceived | The total amount of RTX bytes received on this transport
rtxBytesSent | The total amount of RTX bytes sent on this transport
rtxPacketsReceived | The total amount of RTX packets received on this transport
rtxPacketsSent | The total amount of RTX packets sent on this transport
rtxPacketsLost | The total amount of RTX packets lost on this transport
rtxPacketsDiscarded | The total amount of RTX packets discarded on this transport
sctpBytesReceived | The total amount of SCTP bytes received on this transport
sctpBytesSent | The total amount of SCTP bytes sent on this transport
sctpPacketsReceived | The total amount of SCTP packets received on this transport
sctpPacketsSent | The total amount of SCTP packets sent on this transport


## Changelog
## 2.2.2
 * Bugfix for Decoder library decoding IceCandidatePairs
 * remove `schemaVersion` from Reports

## 2.2.1
 * Encoder and Decoder libraries are added
 * added `schemaVersion` to each generated Samples anre Reports

## 2.2.0

### Added
 * CustomCallEvent to ClientSample resembles a CallEventReport, but possible to report from the client side.
 * CustomSfuEvent to SfuSample resembles an SfuEventReport, but possible to report from the SFU side.


## 2.1.8
 * change IceCandidatePair Report accordingly to IceCandidatePair sample

## 2.1.7
 * change csv header lowercase to snake case

## 2.1.6
 * change type of `framesDropped` in InboundVideoTrack report from `double` to `int`

## 2.1.5
 * Make `label` field in PeerConnectionTransport optional

## 2.1.4
 * Add `label` field to PeerConnectionTransport

## 2.1.3
 * change type of `framesDropped` in InboundVideoTrack from `double` to `int`
## 2.1.2

### Renamed
 * `DataChannelStats` record to `DataChannel` in ClientSample
 * `IceCandidatePairStats` record to `IceCandidatePair` in ClientSample

## 2.1.1

### Restored
 * `senderId` field in W3CStats for backward compatibility in client-monitor
 * `rtcpTransportStatsId` field in W3CStats for backward compatibility in client-monitor


## 2.1.0

### Added
 * ice candidate pair stats in samples extracted from client transport
 * ice candidate pair report
 * peer connection transport report
 * `mid` field to ClientSamples inbound rtp related stats
 * `jitterBufferMinimumDelay` field to ClientSamples inbound rtp related stats
 * `playoutId` field to ClientSamples inbound rtp related stats
 * `packetsDiscarded` field to ClientSamples inbound rtp related stats
 * `jitterBufferTargetDelay` field to ClientSamples inbound rtp related stats
 * `active` field to ClientSample outbound rtp related stats
 * `droppedSamplesDuration` field to ClientSample audio source related stats
 * `droppedSamplesEvents` field to ClientSample audio source related stats
 * `totalCaptureDelay` field to ClientSample audio source related stats
 * `totalSamplesCaptured` field to ClientSample audio source related stats
 * `dtlsRole` to transport stats
 * `RTCAudioPlayoutStats` to inbound-rtp related stats


### Modified
 * pcTransports is changed to contain only peer connection transport fields

### Removed
 * client-transport-report
 
 * `packetsDiscarded` field from InboundAudioTrack, InboundVideoTrack samples and reports
 * `packetsRepaired` field from InboundAudioTrack, InboundVideoTrack samples and reports
 * `burstPacketsLost` field from InboundAudioTrack,  InboundVideoTrack samples and reports
 * `burstPacketsDiscarded` field from InboundAudioTrack,  InboundVideoTrack samples and reports
 * `burstLossCount` field from InboundAudioTrack, InboundVideoTrack samples and reports
 * `burstDiscardCount` field from InboundAudioTrack, InboundVideoTrack samples and reports
 * `burstLossRate` field from InboundAudioTrack, InboundVideoTrack samples and reports
 * `burstDiscardRate` field from InboundAudioTrack, InboundVideoTrack samples and reports
 * `gapLossRate` field from InboundAudioTrack, InboundVideoTrack samples and reports
 * `gapDiscardRate` field from InboundAudioTrack, InboundVideoTrack samples and reports
 * `partialFramesLost` field from InboundAudioTrack, InboundVideoTrack samples and reports
 * `fullFramesLost` field from InboundAudioTrack, InboundVideoTrack samples and reports
 * `averageRtcpInterval` field from InboundAudioTrack, InboundVideoTrack samples and reports
 * `voiceActivityFlag` field from InboundAudioTrack, InboundVideoTrack samples and reports
 * `frameBitDepth` field from InboundAudioTrack, InboundVideoTrack samples and reports
 * `packetsFailedDecryption` field from InboundAudioTrack, InboundVideoTrack samples and reports
 * `packetsDuplicated` field from InboundAudioTrack, InboundVideoTrack samples and reports
 * `perDscpPacketsReceived` field from InboundAudioTrack, InboundVideoTrack samples and reports
 * `sliCount` field from InboundAudioTrack, InboundVideoTrack samples and reports
 * `fullFramesLost` field from InboundAudioTrack, InboundVideoTrack samples and reports
 * `totalSamplesDecoded` field from InboundAudioTrack, InboundVideoTrack samples and reports
 * `samplesDecodedWithSilk` field from InboundAudioTrack, InboundVideoTrack samples and reports
 * `samplesDecodedWithCelt` field from InboundAudioTrack, InboundVideoTrack samples and reports
 * `samplesreportsReceived` field from InboundAudioTrack, InboundVideoTrack samples and reports

 * `rtxSsrc` field from OutboundAudioTrack, OutboundVideoTrack samples and reports
 * `senderId` field from OutboundAudioTrack, OutboundVideoTrack samples and reports
 * `lastPacketSentTimestamp` field from OutboundAudioTrack, OutboundVideoTrack samples and reports
 * `packetsDiscardedOnSend` field from OutboundAudioTrack, OutboundVideoTrack samples and reports
 * `bytesDiscardedOnSend` field from OutboundAudioTrack, OutboundVideoTrack samples and reports
 * `fecPacketsSent` field from OutboundAudioTrack, OutboundVideoTrack samples and reports
 * `framesDiscardedOnSend` field from OutboundAudioTrack, OutboundVideoTrack samples and reports
 * `totalSamplesSent` field from OutboundAudioTrack, OutboundVideoTrack samples and reports
 * `samplesEncodedWithSilk` field from OutboundAudioTrack, OutboundVideoTrack samples and reports
 * `samplesEncodedWithCelt` field from OutboundAudioTrack, OutboundVideoTrack samples and reports
 * `voiceActivityFlag` field from OutboundAudioTrack, OutboundVideoTrack samples and reports
 * `sliCount` field from OutboundAudioTrack, OutboundVideoTrack samples and reports
 * `frameBitDepth` field from OutboundAudioTrack, OutboundVideoTrack samples and reports
 * `perDscpPacketsSent` field from OutboundAudioTrack, OutboundVideoTrack samples and reports
 * `bitDepth` field from OutboundAudioTrack, OutboundVideoTrack samples and reports


## 2.0.4

### Added
 * csv column list for every report. Generated from the schema, required fields first, and fields are in sorted order

## 2.0.3

### Added
 * `remoteSfuId` to SfuInboundRtpPad reports
 * `remoteTransportId` to SfuInboundRtpPad reports
 * `remoteSinkId` to SfuInboundRtpPad reports
 * `remoteRtpPadId` to SfuInboundRtpPad reports

## 2.0.2

### Added
 * `roundTripTime` to SfuOutboundRtp report

## 2.0.1

### Added
 * `internal` attribute to SfuSctpChannel sample
 * `internal` attribute to SfuSctpStream report
 * `internal` attribute to SfuTransport report

## 2.0.0

init