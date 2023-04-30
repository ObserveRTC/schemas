ObserveRTC Schemas
---
Javascript bindings for ObserveRTC schemas
- [samples](#samples)
	* [TurnSession](#TurnSession)
	* [TurnPeerAllocation](#TurnPeerAllocation)
	* [TurnSample](#TurnSample)
	* [SfuExtensionStats](#SfuExtensionStats)
	* [SfuSctpChannel](#SfuSctpChannel)
	* [SfuOutboundRtpPad](#SfuOutboundRtpPad)
	* [SfuInboundRtpPad](#SfuInboundRtpPad)
	* [SfuTransport](#SfuTransport)
	* [CustomSfuEvent](#CustomSfuEvent)
	* [SfuSample](#SfuSample)
	* [IceRemoteCandidate](#IceRemoteCandidate)
	* [IceLocalCandidate](#IceLocalCandidate)
	* [OutboundVideoTrack](#OutboundVideoTrack)
	* [OutboundAudioTrack](#OutboundAudioTrack)
	* [InboundVideoTrack](#InboundVideoTrack)
	* [InboundAudioTrack](#InboundAudioTrack)
	* [Certificate](#Certificate)
	* [MediaCodecStats](#MediaCodecStats)
	* [MediaSourceStat](#MediaSourceStat)
	* [IceCandidatePair](#IceCandidatePair)
	* [PeerConnectionTransport](#PeerConnectionTransport)
	* [DataChannel](#DataChannel)
	* [CustomObserverEvent](#CustomObserverEvent)
	* [CustomCallEvent](#CustomCallEvent)
	* [ExtensionStat](#ExtensionStat)
	* [MediaDevice](#MediaDevice)
	* [OperationSystem](#OperationSystem)
	* [Browser](#Browser)
	* [Platform](#Platform)
	* [Engine](#Engine)
	* [ClientSample](#ClientSample)
	* [Controls](#Controls)
	* [Samples](#Samples)
- [Changelog](#Changelog)
## Controls


Field | Description 
--- | ---
close | Indicate that the server should close the connection
accessClaim | Holds a new claim to process

## Engine


Field | Description 
--- | ---
name | The name of the Engine
version | The version of the engine

## Platform


Field | Description 
--- | ---
type | The name of the platform
vendor | The name of the vendor
model | The name of the model

## Browser


Field | Description 
--- | ---
name | The name of the operating system (e.g., Linux) the WebRTC app uses
version | The version of the operating system

## OperationSystem


Field | Description 
--- | ---
name | The name of the operating system (e.g., Linux) the WebRTC app uses
version | The version of the operating system
versionName | The name of the version of the operating system

## MediaDevice


Field | Description 
--- | ---
id | the provided id of the media input / output
kind | The media kind of the media device (Possible values are: videoinput,<br />audioinput,<br />audiooutput)
label | The name of the device

## ExtensionStat


Field | Description 
--- | ---
type (**Mandatory**) | The type of the extension stats the custom app provides
payload (**Mandatory**) | The payload of the extension stats the custom app provides

## CustomCallEvent


Field | Description 
--- | ---
name (**Mandatory**) | the name of the event used as identifier. (e.g.: MEDIA_TRACK_MUTED, USER_REJOINED, etc..)
value | the value of the event
peerConnectionId | The unique identifier of the peer connection
mediaTrackId | The identifier of the media track the event is related to
message | the human readable message of the event
attachments | Additional attachment relevant for the event
timestamp | The EPOCH timestamp the event is generated

## CustomObserverEvent


Field | Description 
--- | ---
name (**Mandatory**) | the name of the event used as identifier. (e.g.: MEDIA_TRACK_MUTED, USER_REJOINED, etc..)
mediaTrackId | The identifier of the media track the event is related to
message | the human readable message of the event
attachments | Additional attachment relevant for the event
timestamp | The EPOCH timestamp the event is generated

## DataChannel


Field | Description 
--- | ---
peerConnectionId (**Mandatory**) | The id of the peer connection the data channel is assigned to
dataChannelIdentifier | The id of the data channel assigned by the peer connection when it is opened
label | The label of the data channel
protocol | The protocol the data channel utilizes
state | The state of the data channel
messageSent | The total number of messages sent on the data channel
bytesSent | The total number of bytes sent on the data channel
messageReceived | The total number of messages received on the data channel
bytesReceived | The total number of bytes received on the data channel

## PeerConnectionTransport


Field | Description 
--- | ---
transportId (**Mandatory**) | The identifier of the transport the ICE candidate pair is negotiated on
peerConnectionId (**Mandatory**) | The unique identifier of the peer connection
label | The label associated with the peer connection
packetsSent | Represents the total number of packets sent on the corresponding transport
packetsReceived | Represents the total number of packets received on the corresponding transport
bytesSent | Represents the total amount of bytes sent on the corresponding transport
bytesReceived | Represents the total amount of bytes received on the corresponding transport
iceRole | Represents the current role of ICE under DTLS Transport
iceLocalUsernameFragment | Represents the current local username fragment used in message validation procedures for ICE under DTLS Transport
dtlsState | Represents the current state of DTLS for the peer connection transport layer
selectedCandidatePairId | The identifier of the candidate pair the transport currently uses
iceState | Represents the current transport state (RTCIceTransportState) of ICE for the peer connection transport layer
localCertificateId | If DTLS negotiated, it gives the ID of the local certificate
remoteCertificateId | If DTLS negotiated, it gives the ID of the remote certificate
tlsVersion | Represents the version number of the TLS used in the corresponding transport
dtlsCipher | Represents the name of the DTLS cipher used in the corresponding transport
dtlsRole | The role this host plays in DTLS negotiations (Possible values are: client,<br />server,<br />unknown)
srtpCipher | Represents the name of the SRTP cipher used in the corresponding transport
tlsGroup | Represents the name of the IANA TLS Supported Groups used in the corresponding transport
selectedCandidatePairChanges | The total number of candidate pair changes over the peer connection

## IceCandidatePair


Field | Description 
--- | ---
candidatePairId (**Mandatory**) | The unique identifier of the peer connection
peerConnectionId (**Mandatory**) | The unique identifier of the peer connection
label | The label associated with the peer connection
transportId | The identifier of the transport the ice candidate pair is negotiated on
localCandidateId | The unique identifier of the candidate the negotiated pair is selected on the local side
remoteCandidateId | The unique identifier of the candidate the negotiated pair is selected on the remote side
state | The state of ICE Candidate Pairs (RTCStatsIceState) on the corresponding transport
nominated | Indicates if the ice candidate pair is nominated or not
packetsSent | The total number of packets sent using the last selected candidate pair over the corresponding transport
packetsReceived | The total number of packets received using the last selected candidate pair over the corresponding transport
bytesSent | The total number of bytes sent using the last selected candidate pair over the corresponding transport
bytesReceived | The total number of bytes received using the last selected candidate pair over the corresponding transport
lastPacketSentTimestamp | Represents the timestamp at which the last packet was sent on the selected candidate pair, excluding STUN packets over the corresponding transport (UTC Epoch in ms)
lastPacketReceivedTimestamp | Represents the timestamp at which the last packet was received on the selected candidate pair, excluding STUN packets over the corresponding transport (UTC Epoch in ms)
totalRoundTripTime | Represents the sum of all round trip time measurements in seconds since the beginning of the session, based on STUN connectivity check over the corresponding transport
currentRoundTripTime | Represents the last round trip time measurement in seconds based on STUN connectivity check over the corresponding transport
availableOutgoingBitrate | The sum of the underlying cc algorithm provided outgoing bitrate for the RTP streams over the corresponding transport
availableIncomingBitrate | The sum of the underlying cc algorithm provided incoming bitrate for the RTP streams over the corresponding transport
requestsReceived | Represents the total number of connectivity check requests received on the selected candidate pair using the corresponding transport
requestsSent | Represents the total number of connectivity check requests sent on the selected candidate pair using the corresponding transport
responsesReceived | Represents the total number of connectivity check responses received on the selected candidate pair using the corresponding transport
responsesSent | Represents the total number of connectivity check responses sent on the selected candidate pair using the corresponding transport
consentRequestsSent | Represents the total number of consent requests sent on the selected candidate pair using the corresponding transport
packetsDiscardedOnSend | Total number of packets for this candidate pair that have been discarded due to socket errors on the selected candidate pair using the corresponding transport
bytesDiscardedOnSend | Total number of bytes for this candidate pair that have been discarded due to socket errors on the selected candidate pair using the corresponding transport

## MediaSourceStat


Field | Description 
--- | ---
trackIdentifier | The unique identifier of the corresponding media track
kind | The type of the media the MediaSource produces. (Possible values are: audio,<br />video)
relayedSource | Flag indicating if the media source is relayed or not, meaning the local endpoint is not the actual source of the media, but a proxy for that media.
audioLevel | The value is between 0..1 (linear), where 1.0 represents 0 dBov, 0 represents silence, and 0.5 represents approximately 6 dBSPL change in the sound pressure level from 0 dBov.
totalAudioEnergy | The audio energy of the media source. For calculation see www.w3.org/TR/webrtc-stats/#dom-rtcaudiosourcestats-totalaudioenergy
totalSamplesDuration | The duration of the audio type media source
echoReturnLoss | if echo cancellation is applied on the media source, then this number represents the loss calculation defined in www.itu.int/rec/T-REC-G.168-201504-I/en
echoReturnLossEnhancement | www.itu.int/rec/T-REC-G.168-201504-I/en
droppedSamplesDuration | The total duration, in seconds, of samples produced by the device that got dropped before reaching the media source
droppedSamplesEvents | A counter increases every time a sample is dropped after a non-dropped sample
totalCaptureDelay | Total delay, in seconds, for each audio sample between the time the sample was emitted by the capture device and the sample reaching the source
totalSamplesCaptured | The total number of captured samples reaching the audio source
width | The width, in pixels, of the last frame originating from the media source
height | The height, in pixels, of the last frame originating from the media source
frames | The total number of frames originating from the media source
framesPerSecond | The number of frames originating from the media source in the last second

## MediaCodecStats


Field | Description 
--- | ---
payloadType | Payload type used in the RTP encoding/decoding process.
codecType | Indicates the role of the codec (encode or decode) (Possible values are: encode,<br />decode)
mimeType | The MIME type of the media, e.g., audio/opus.
clockRate | The clock rate used in RTP transport to generate the timestamp for the carried frames
channels | Audio Only. Represents the number of channels an audio media source has. Only interesting if stereo is presented
sdpFmtpLine | The SDP line determines the codec

## Certificate


Field | Description 
--- | ---
fingerprint | The fingerprint of the certificate.
fingerprintAlgorithm | The hash function used to generate the fingerprint.
base64Certificate | The DER encoded base-64 representation of the certificate.
issuerCertificateId | The ID of the next certificate in the certificate chain

## InboundAudioTrack


Field | Description 
--- | ---
ssrc (**Mandatory**) | The RTP SSRC field
trackId | The ID of the track
peerConnectionId | The unique generated identifier of the peer connection the inbound audio track belongs to
remoteClientId | The remote client ID the source outbound track belongs to
sfuStreamId | The ID of the SFU stream this track is synced from
sfuSinkId | The ID of the sink this track belongs to in the SFU
packetsReceived | The total number of packets received on the corresponding synchronization source
packetsLost | The total number of bytes received on the corresponding synchronization source
jitter | The corresponding synchronization source reported jitter
lastPacketReceivedTimestamp | Represents the timestamp at which the last packet was received on the corresponding synchronization source (ssrc)
headerBytesReceived | Total number of RTP header and padding bytes received over the corresponding synchronization source (ssrc)
packetsDiscarded | The total number of packets that missed the playout point and were therefore discarded by the jitter buffer
fecPacketsReceived | Total number of FEC packets received over the corresponding synchronization source (ssrc)
fecPacketsDiscarded | Total number of FEC packets discarded over the corresponding synchronization source (ssrc) due to 1) late arrival; 2) the target RTP packet has already been repaired.
bytesReceived | Total number of bytes received over the corresponding synchronization source (ssrc) due to 1) late arrival; 2) the target RTP packet has already been repaired.
nackCount | Count the total number of Negative ACKnowledgement (NACK) packets sent and belongs to the corresponding synchronization source (ssrc)
totalProcessingDelay | The total processing delay in seconds spent on buffering RTP packets from receipt until packets are decoded
estimatedPlayoutTimestamp | The estimated playout time of the corresponding synchronization source
jitterBufferDelay | The total time of RTP packets spent in the jitter buffer waiting for frame completion due to network uncertainty.
jitterBufferTargetDelay | This value is increased by the target jitter buffer delay every time a sample is emitted by the jitter buffer. The added target is the target delay, in seconds, at the time that the sample was emitted from the jitter buffer.
jitterBufferEmittedCount | The total number of audio samples or video frames that have come out of the jitter buffer on the corresponding synchronization source (ssrc)
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

## InboundVideoTrack


Field | Description 
--- | ---
ssrc (**Mandatory**) | The RTP SSRC field
trackId | The id of the track
peerConnectionId | The unique generated identifier of the peer connection the inbound audio track belongs to
remoteClientId | The remote clientId the source outbound track belongs to
sfuStreamId | The id of the SFU stream this track is sinked from
sfuSinkId | The id of the sink this track belongs to in the SFU
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
keyFramesDecoded | The total number of keyframes decoded on the corresponding RTP stream
frameWidth | The width of the frame of the video sent by the remote source on the corresponding RTP stream
frameHeight | The height of the frame of the video sent by the remote source on the corresponding RTP stream
framesPerSecond | The frame rate of the video sent by the remote source on the corresponding RTP stream
qpSum | The QP sum (only interested in VP8,9) of the frame of the video sent by the remote source on the corresponding RTP stream
totalDecodeTime | The total time spent on decoding video on the corresponding RTP stream
totalInterFrameDelay | The total interframe delay on the corresponding RTP stream
totalSquaredInterFrameDelay | The total squared interframe delay on the corresponding synchronization source (ssrc). Useful for variance calculation for interframe delays
firCount | The total number of Full Intra Request (FIR) packets sent from this endpoint to the source on the corresponding RTP stream
pliCount | The total number of Picture Loss Indication (PLI) packets sent on the corresponding RTP stream
framesReceived | The total number of frames received on the corresponding RTP stream
packetsSent | Total number of RTP packets sent at the remote endpoint to this endpoint on this synchronization source
bytesSent | Total number of payload bytes sent at the remote endpoint to this endpoint on this synchronization source
remoteTimestamp | The timestamp corresponds to the time in UTC Epoch the remote endpoint reported the statistics belong to the sender side and correspond to the synchronization source (ssrc)
reportsSent | The number of SR reports the remote endpoint sent corresponded to synchronization source (ssrc) this report belongs to
roundTripTime | Estimated round trip time for the SR reports based on DLRR reports on the corresponded RTP stream
totalRoundTripTime | Represents the cumulative sum of all round trip time measurements performed on the corresponded RTP stream
roundTripTimeMeasurements | Represents the total number of SR reports received with DLRR reports to be able to calculate the round trip time on the corresponded RTP stream

## OutboundAudioTrack


Field | Description 
--- | ---
ssrc (**Mandatory**) | The RTP SSRC field
trackId | The id of the track
peerConnectionId |  The unique generated identifier of the peer connection the inbound audio track belongs to
sfuStreamId | The id of the SFU stream this track is related to
packetsSent | The total number of packets sent on the corresponded synchronization source
bytesSent | The total number of bytes sent on the corresponded synchronization source
rid | The rid encoding parameter of the corresponded synchronization source
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
echoReturnLossEnhancement | Represents the echo cancellation in decibels added as a postprocessing by the library after the audio is caught from the media source.
droppedSamplesDuration | The total duration, in seconds, of samples produced by the device that got dropped before reaching the media source
droppedSamplesEvents | A counter increases every time a sample is dropped after a non-dropped sample
totalCaptureDelay | Total delay, in seconds, for each audio sample between the time the sample was emitted by the capture device and the sample reaching the source
totalSamplesCaptured | The total number of captured samples reaching the audio source

## OutboundVideoTrack


Field | Description 
--- | ---
ssrc (**Mandatory**) | The RTP SSRC field
trackId | The id of the track
peerConnectionId | The unique generated identifier of the peer connection the inbound audio track belongs to
sfuStreamId | The id of the SFU stream this track is related to
packetsSent | The total number of packets sent on the corresponded synchronization source
bytesSent | The total number of bytes sent on the corresponded synchronization source
rid | The rid encoding parameter of the corresponded synchronization source
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
frameHeight | The frame height in pixels of the frames targeted by the media encoder
framesPerSecond | The encoded number of frames in the last second on the corresponding media source
framesSent | The total number of frames sent on the corresponding RTP stream
hugeFramesSent | The total number of huge frames (avgFrameSize * 2.5) on the corresponding RTP stream
framesEncoded | The total number of frames encoded by the media source
keyFramesEncoded | The total number of keyframes encoded on the corresponding RTP stream
qpSum | The sum of the QP the media encoder provided on the corresponding RTP stream.
totalEncodeTime | The total time in seconds spent in encoding media frames for the corresponding RTP stream.
qualityLimitationDurationNone | Time elapsed in seconds when the RTC connection has not limited the quality
qualityLimitationDurationCPU | Time elapsed in seconds the RTC connection had a limitation because of CPU
qualityLimitationDurationBandwidth | Time elapsed in seconds the RTC connection had a limitation because of Bandwidth
qualityLimitationDurationOther | Time elapsed in seconds the RTC connection had a limitation because of Other factor
qualityLimitationReason | Indicate a reason for the quality limitation of the corresponded synchronization source
qualityLimitationResolutionChanges | The total number of resolution changes occurred on the corresponded RTP stream due to quality changes
firCount | The total number FIR packets sent from this endpoint to the source on the corresponded RTP stream
pliCount | The total number of Picture Loss Indication sent on the corresponded RTP stream
packetsReceived | The total number of packets received on the corresponded synchronization source
packetsLost | The total number of bytes received on the corresponded synchronization source
jitter | The corresponded synchronization source reported jitter
roundTripTime | RTT measurement in seconds based on (most likely) SR, and RR belongs to the corresponded synchronization source
totalRoundTripTime | The sum of RTT measurements belongs to the corresponded synchronization source
fractionLost | The receiver reported fractional lost belongs to the corresponded synchronization source
roundTripTimeMeasurements | The total number of calculated RR measurements received on this source
framesDropped | The total number of frames reported to be lost by the remote endpoint on the corresponded RTP stream
relayedSource | True if the corresponded media source is remote, false otherwise (or null depending on browser and version)
width | The width, in pixels, of the last frame originating from the media source
height | The height, in pixels, of the last frame originating from the media source
frames | The total number of frames originated from the media source

## IceLocalCandidate


Field | Description 
--- | ---
peerConnectionId | Refers to the peer connection the local candidate belongs to
id | The unique identifier of the local candidate
address | The address of the local endpoint (Ipv4, Ipv6, FQDN)
port | The port number of the local endpoint the ICE uses
protocol | The protocol for the ICE (Possible values are: tcp,<br />udp)
candidateType | The type of the local candidate
priority | The priority of the local candidate
url | The url of the ICE server
relayProtocol | The relay protocol the local candidate uses (Possible values are: tcp,<br />udp,<br />tls)

## IceRemoteCandidate


Field | Description 
--- | ---
peerConnectionId | Refers to the peer connection the local candidate belongs to
id | The unique identifier of the local candidate
address | The address of the local endpoint (Ipv4, Ipv6, FQDN)
port | The port number of the local endpoint the ICE uses
protocol | The protocol for the ICE (Possible values are: tcp,<br />udp)
candidateType | The type of the local candidate
priority | The priority of the local candidate
url | The url of the ICE server
relayProtocol | The relay protocol the local candidate uses (Possible values are: tcp,<br />udp,<br />tls)## ClientSample


docs


Field | Description 
--- | ---
clientId (**Mandatory**) | Unique id of the client providing samples. Must be a valid UUID.
timestamp (**Mandatory**) | The timestamp the sample is created in GMT
callId | If provided, the server uses the given id to match clients in the same call. Must be a valid UUID.
sampleSeq | The sequence number a source assigns to the sample. Each time the source takes a sample at a client, this number should be monotonically incremented.
roomId | The WebRTC app configured room id the client joined for the call.
userId | The WebRTC app configured human-readable user id the client is joined.
engine | WebRTC App provided information related to the engine the client uses.
platform | WebRTC App provided information related to the platform the client uses.
browser | WebRTC App provided information related to the browser the client uses.
os | WebRTC App provided information related to the operating system the client uses.
mediaConstraints | The WebRTC app provided list of the media constraints the client has.
mediaDevices | The WebRTC app provided list of the media devices the client has.
userMediaErrors | The WebRTC app provided list of user media errors the client has.
extensionStats | The WebRTC app provided custom stats payload
customCallEvents | User provided custom call events
customObserverEvents | User provided custom observer events
iceServers | The WebRTC app provided list of ICE servers the client used.
localSDPs | The local part of the Signal Description Protocol to establish connections
dataChannels | Measurements about the data channels currently available on peer connections
pcTransports | Transport stats of Peer Connection
iceCandidatePairs | Candidate pair stats
mediaSources | WebRTC App provided information related to the operation system the client uses.
codecs | List of codec the client has
certificates | List of certificates the client provided
inboundAudioTracks | List of compound measurements related to inbound audio tracks
inboundVideoTracks | List of compound measurements related to inbound video tracks
outboundAudioTracks | List of compound measurements related to outbound audio tracks
outboundVideoTracks | List of compound measurements related to outbound video tracks
iceLocalCandidates | List of local ICE candidates
iceRemoteCandidates | List of remote ICE candidates
timeZoneOffsetInHours | The offset from GMT in hours
marker | Special marker for the samples

## CustomSfuEvent


Field | Description 
--- | ---
name (**Mandatory**) | the name of the event used as identifier. (e.g.: CLIENT_REJOINED, etc..)
value | the value of the event
transportId | The unique identifier of the sfu transport the event is related to
sfuStreamId | The identifier of the sfu stream the event is related to
sfuSinkId | The identifier of the sfu sink the event is related to
message | the human readable message of the event
attachments | Additional attachment relevant for the event
timestamp | The EPOCH timestamp the event is generated

## SfuTransport


Field | Description 
--- | ---
transportId (**Mandatory**) | The generated unique identifier of the transport
noReport | Flag indicate to not generate report from this sample
internal | Flag to indicate that the transport is used as an internal transport between SFU instances
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

## SfuInboundRtpPad


Field | Description 
--- | ---
transportId (**Mandatory**) | The id of the transport the RTP Pad uses.
streamId (**Mandatory**) | The id of the media stream the RTP pad belongs to. This id is to group rtp pads (e.g.: simulcast) carrying payloads to the same media. 
padId (**Mandatory**) | The id of Sfu pad.
ssrc (**Mandatory**) | The synchronization source id of the RTP stream
noReport | Flag indicate to not generate report from this sample
internal | Flag to indicate that the rtp pad is used as an internal communication between SFU instances
mediaType | the type of the media the stream carries ("audio" or "video") (Possible values are: audio,<br />video)
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

## SfuOutboundRtpPad


Field | Description 
--- | ---
transportId (**Mandatory**) | The id of the transport the RTP stream uses.
streamId (**Mandatory**) | The id of the stream this outbound RTP pad sinks the media from
sinkId (**Mandatory**) | The id of a group of RTP pad sinks the media stream out from the SFU.
padId (**Mandatory**) | The id of Sfu pad.
ssrc (**Mandatory**) | The synchronization source id of the RTP stream
noReport | Flag indicate to not generate report from this sample
internal | Flag to indicate that the rtp pad is used as an internal communication between SFU instances
callId | The callId the event belongs to
clientId | If the track id was provided by the Sfu, the observer can fill up the information of which client it belongs to
trackId | The id of the track the RTP stream related to at the client side
mediaType | the type of the media the stream carries ("audio" or "video") (Possible values are: audio,<br />video)
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
fractionLost | The calculated fractionLost of the stream
jitter | The calculated jitter of the stream
roundTripTime | The calculated RTT of the stream

## SfuSctpChannel


Field | Description 
--- | ---
transportId (**Mandatory**) | The id of the transport the RTP stream uses.
streamId (**Mandatory**) | The id of the sctp stream
channelId (**Mandatory**) | The id of the sctp stream
noReport | Flag indicate to not generate report from this sample
internal | Flag to indicate that the SCTP channel is used as an internally between SFU instances
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

## SfuExtensionStats


Field | Description 
--- | ---
type (**Mandatory**) | The type of the extension stats the custom app provides
payload (**Mandatory**) | The payload of the extension stats the custom app provides## SfuSample


docs


Field | Description 
--- | ---
sfuId (**Mandatory**) | Unique generated id for the sfu samples are originated from
timestamp (**Mandatory**) | The timestamp the sample is created in GMT
timeZoneOffsetInHours | The offset from GMT in hours
marker | Special marker for the samples
customSfuEvents | User provided custom call events
transports | The Sfu Transports obtained measurements
inboundRtpPads | The Sfu Inbound Rtp Pad obtained measurements
outboundRtpPads | The Sfu Outbound Rtp Pad obtained measurements
sctpChannels | The Sfu Outbound Rtp Pad obtained measurements
extensionStats | The Sfu provided custom stats payload

## TurnPeerAllocation


Field | Description 
--- | ---
peerId (**Mandatory**) | a unique id for the allocation
sessionId (**Mandatory**) | The corresponded session the allocation belongs to
relayedAddress (**Mandatory**) | The allocated address
relayedPort (**Mandatory**) | The allocated port
transportProtocol (**Mandatory**) | protocol (TCP, UDP)
peerAddress | The address of the address the serever connect to
peerPort | The portnumber the server connects to
sendingBitrate | the bitrate the TURN server sending to the peer
receivingBitrate | the bitrate the TURN server receiving from the peer
sentBytes | the amount of bytes sent to the peer
receivedBytes | the amount of bytes received from the peer
sentPackets | the amount of packets sent to the peer
receivedPackets | the amount of packets received from the peer

## TurnSession


Field | Description 
--- | ---
sessionId (**Mandatory**) | Flag indicate to not generate report from this sample
realm | The Authentication Realm (RFC 8656)
username | The username of the used in authentication
clientId | The id of the client the TURN session belongs to (ClientSample)
started | The timestamp when the session has been started. Epoch in milliseconds, GMT
nonceExpirationTime | For each Allocate request, the server SHOULD generate a new random nonce when the allocation is first attempted following the randomness recommendations in [RFC4086] and SHOULD expire the nonce at least once every hour during the lifetime of the allocation.  Epoch in millis GMT
serverAddress | The address of the server the client connected to
serverPort | The portnumber the server listens the client requests
transportProtocol | the transport protocol betwwen the client and the server (TCP, UDP, TCPTLS, UDPTLS, SCTP, SCTPTLS)
clientAddress | The address of the client connected from
clientPort | The portnumber the client requested from
sendingBitrate | the bitrate the TURN server sending to the client
receivingBitrate | the bitrate the TURN server receiving from the client
sentBytes | the amount of bytes sent to the client
receivedBytes | the amount of bytes received from the client
sentPackets | the amount of packets sent to the client
receivedPackets | the amount of packets received from the client## TurnSample


docs


Field | Description 
--- | ---
serverId (**Mandatory**) | A unique id of the turn server
allocations | Peer Alloocation data
sessions | Session data## Samples


Observer created reports related to events (call started, call ended, client joined, etc...) indicated by the incoming samples.


Field | Description 
--- | ---
controls | Additional control flags indicate various operation has to be performed
clientSamples | Samples taken from the client
sfuSamples | Samples taken from an Sfu
turnSamples | Samples taken from the TURN server


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