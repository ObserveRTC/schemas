ObserveRTC Schemas
---
Javascript bindings for ObserveRTC schemas
- [samples](#samples)
	* [ExtensionStat](#ExtensionStat)
	* [ClientMetaData](#ClientMetaData)
	* [ClientIssue](#ClientIssue)
	* [ClientEvent](#ClientEvent)
	* [CertificateStats](#CertificateStats)
	* [IceCandidatePairStats](#IceCandidatePairStats)
	* [IceCandidateStats](#IceCandidateStats)
	* [IceTransportStats](#IceTransportStats)
	* [DataChannelStats](#DataChannelStats)
	* [PeerConnectionTransportStats](#PeerConnectionTransportStats)
	* [MediaPlayoutStats](#MediaPlayoutStats)
	* [MediaSourceStats](#MediaSourceStats)
	* [RemoteOutboundRtpStats](#RemoteOutboundRtpStats)
	* [QualityLimitationDurations](#QualityLimitationDurations)
	* [OutboundRtpStats](#OutboundRtpStats)
	* [RemoteInboundRtpStats](#RemoteInboundRtpStats)
	* [InboundRtpStats](#InboundRtpStats)
	* [CodecStats](#CodecStats)
	* [OutboundTrackSample](#OutboundTrackSample)
	* [InboundTrackSample](#InboundTrackSample)
	* [PeerConnectionSample](#PeerConnectionSample)
	* [ClientSample](#ClientSample)
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
	* [Controls](#Controls)
	* [Samples](#Samples)
- [Changelog](#Changelog)
## InboundTrackSample


Field | Description 
--- | ---
timestamp (**Mandatory**) | The timestamp when the stats were generated.
id (**Mandatory**) | The unique identifier for the stats object.
kind (**Mandatory**) | Kind of the media (e.g., 'audio' or 'video').
score | Calculated score for track (details should be added to scoreReasons)
scoreReasons | Details for score calculation
attachments | Additional information attached to this stats

## OutboundTrackSample


Field | Description 
--- | ---
timestamp (**Mandatory**) | The timestamp when the stats were generated.
id (**Mandatory**) | The unique identifier for the stats object.
kind (**Mandatory**) | Kind of the media (e.g., 'audio' or 'video').
score | Calculated score for track (details should be added to scoreReasons)
scoreReasons | Details for score calculation
attachments | Additional information attached to this stats

## CodecStats


Field | Description 
--- | ---
timestamp (**Mandatory**) | The timestamp when the stats were generated.
id (**Mandatory**) | The unique identifier for the stats object.
mimeType (**Mandatory**) | The MIME type of the codec.
payloadType | The payload type of the codec.
transportId | The identifier of the transport associated with the codec.
clockRate | The clock rate of the codec in Hz.
channels | The number of audio channels for the codec, if applicable.
sdpFmtpLine | The SDP format-specific parameters line for the codec.
attachments | Additional information attached to this stats

## InboundRtpStats


Field | Description 
--- | ---
timestamp (**Mandatory**) | The time the stats were collected, in high-resolution time.
id (**Mandatory**) | Unique identifier of the stats object.
ssrc (**Mandatory**) | Synchronization source identifier of the RTP stream.
kind (**Mandatory**) | Kind of the media (e.g., 'audio' or 'video').
trackIdentifier (**Mandatory**) | Identifier for the media track associated with the RTP stream.
transportId | ID of the transport associated with the RTP stream.
codecId | ID of the codec used for the RTP stream.
packetsReceived | Number of packets received on the RTP stream.
packetsLost | Number of packets lost on the RTP stream.
jitter | Jitter of the RTP stream in seconds.
mid | The media stream identification tag from the SDP media section.
remoteId | Remote stats object ID associated with the RTP stream.
framesDecoded | Number of frames decoded.
keyFramesDecoded | Number of keyframes decoded.
framesRendered | Number of frames rendered.
framesDropped | Number of frames dropped.
frameWidth | Width of the decoded video frames.
frameHeight | Height of the decoded video frames.
framesPerSecond | Frame rate in frames per second.
qpSum | Sum of the Quantization Parameter values for decoded frames.
totalDecodeTime | Total time spent decoding in seconds.
totalInterFrameDelay | Sum of inter-frame delays in seconds.
totalSquaredInterFrameDelay | Sum of squared inter-frame delays in seconds.
pauseCount | Number of times playback was paused.
totalPausesDuration | Total duration of pauses in seconds.
freezeCount | Number of times playback was frozen.
totalFreezesDuration | Total duration of freezes in seconds.
lastPacketReceivedTimestamp | Timestamp of the last packet received.
headerBytesReceived | Total header bytes received.
packetsDiscarded | Total packets discarded.
fecBytesReceived | Total bytes received from FEC.
fecPacketsReceived | Total packets received from FEC.
fecPacketsDiscarded | Total FEC packets discarded.
bytesReceived | Total bytes received on the RTP stream.
nackCount | Number of NACKs received.
firCount | Number of Full Intra Requests received.
pliCount | Number of Picture Loss Indications received.
totalProcessingDelay | Total processing delay in seconds.
estimatedPlayoutTimestamp | Estimated timestamp of playout.
jitterBufferDelay | Total jitter buffer delay in seconds.
jitterBufferTargetDelay | Target delay for the jitter buffer in seconds.
jitterBufferEmittedCount | Number of packets emitted from the jitter buffer.
jitterBufferMinimumDelay | Minimum delay of the jitter buffer in seconds.
totalSamplesReceived | Total audio samples received.
concealedSamples | Number of concealed audio samples.
silentConcealedSamples | Number of silent audio samples concealed.
concealmentEvents | Number of audio concealment events.
insertedSamplesForDeceleration | Number of audio samples inserted for deceleration.
removedSamplesForAcceleration | Number of audio samples removed for acceleration.
audioLevel | Audio level in the range [0.0, 1.0].
totalAudioEnergy | Total audio energy in the stream.
totalSamplesDuration | Total duration of all received audio samples in seconds.
framesReceived | Total number of frames received.
decoderImplementation | Decoder implementation used for decoding frames.
playoutId | Playout identifier for the RTP stream.
powerEfficientDecoder | Indicates if the decoder is power-efficient.
framesAssembledFromMultiplePackets | Number of frames assembled from multiple packets.
totalAssemblyTime | Total assembly time for frames in seconds.
retransmittedPacketsReceived | Number of retransmitted packets received.
retransmittedBytesReceived | Number of retransmitted bytes received.
rtxSsrc | SSRC of the retransmission stream.
fecSsrc | SSRC of the FEC stream.
totalCorruptionProbability | Total corruption probability of packets.
totalSquaredCorruptionProbability | Total squared corruption probability of packets.
corruptionMeasurements | Number of corruption measurements.
attachments | Additional information attached to this stats

## RemoteInboundRtpStats


Field | Description 
--- | ---
timestamp (**Mandatory**) | The timestamp for this stats object in DOMHighResTimeStamp format.
id (**Mandatory**) | The unique identifier for this stats object.
ssrc (**Mandatory**) | The SSRC identifier of the RTP stream.
kind (**Mandatory**) | The type of media ('audio' or 'video').
transportId | The ID of the transport used for this stream.
codecId | The ID of the codec used for this stream.
packetsReceived | The total number of packets received on this stream.
packetsLost | The total number of packets lost on this stream.
jitter | The jitter value for this stream in seconds.
localId | The ID of the local object corresponding to this remote stream.
roundTripTime | The most recent RTT measurement for this stream in seconds.
totalRoundTripTime | The cumulative RTT for all packets on this stream in seconds.
fractionLost | The fraction of packets lost on this stream, calculated over a time interval.
roundTripTimeMeasurements | The total number of RTT measurements for this stream.
attachments | Additional information attached to this stats

## QualityLimitationDurations


Field | Description 
--- | ---
none (**Mandatory**) | Duration of no quality limitation in seconds.
cpu (**Mandatory**) | Duration of CPU-based quality limitation in seconds.
bandwidth (**Mandatory**) | Duration of bandwidth-based quality limitation in seconds.
other (**Mandatory**) | Duration of other quality limitation reasons in seconds.## OutboundRtpStats


Field | Description 
--- | ---
timestamp (**Mandatory**) | The timestamp for this stats object in DOMHighResTimeStamp format.
id (**Mandatory**) | The unique identifier for this stats object.
ssrc (**Mandatory**) | The SSRC identifier of the RTP stream.
kind (**Mandatory**) | The type of media ('audio' or 'video').
transportId | The ID of the transport used for this stream.
codecId | The ID of the codec used for this stream.
packetsSent | The total number of packets sent on this stream.
bytesSent | The total number of bytes sent on this stream.
mid | The media ID associated with this RTP stream.
mediaSourceId | The ID of the media source associated with this stream.
remoteId | The ID of the remote object corresponding to this stream.
rid | The RID value of the RTP stream.
headerBytesSent | The total number of header bytes sent on this stream.
retransmittedPacketsSent | The number of retransmitted packets sent on this stream.
retransmittedBytesSent | The number of retransmitted bytes sent on this stream.
rtxSsrc | The SSRC for the RTX stream, if applicable.
targetBitrate | The target bitrate for this RTP stream in bits per second.
totalEncodedBytesTarget | The total target encoded bytes for this stream.
frameWidth | The width of the frames sent in pixels.
frameHeight | The height of the frames sent in pixels.
framesPerSecond | The number of frames sent per second.
framesSent | The total number of frames sent on this stream.
hugeFramesSent | The total number of huge frames sent on this stream.
framesEncoded | The total number of frames encoded on this stream.
keyFramesEncoded | The total number of key frames encoded on this stream.
qpSum | The sum of QP values for all frames encoded on this stream.
totalEncodeTime | The total time spent encoding frames on this stream in seconds.
totalPacketSendDelay | The total delay for packets sent on this stream in seconds.
qualityLimitationReason | The reason for any quality limitation on this stream.
qualityLimitationResolutionChanges | The number of resolution changes due to quality limitations.
nackCount | The total number of NACK packets sent on this stream.
firCount | The total number of FIR packets sent on this stream.
pliCount | The total number of PLI packets sent on this stream.
encoderImplementation | The implementation of the encoder used for this stream.
powerEfficientEncoder | Indicates whether the encoder is power-efficient.
active | Indicates whether this stream is actively sending data.
scalabilityMode | The scalability mode of the encoder used for this stream.
qualityLimitationDurations | The duration of quality limitation reasons categorized by type.
attachments | Additional information attached to this stats.

## RemoteOutboundRtpStats


Field | Description 
--- | ---
timestamp (**Mandatory**) | The timestamp for this stats object in DOMHighResTimeStamp format.
id (**Mandatory**) | The unique identifier for this stats object.
ssrc (**Mandatory**) | The SSRC identifier of the RTP stream.
kind (**Mandatory**) | The type of media ('audio' or 'video').
transportId | The ID of the transport used for this stream.
codecId | The ID of the codec used for this stream.
packetsSent | The total number of packets sent on this stream.
bytesSent | The total number of bytes sent on this stream.
localId | The ID of the local object corresponding to this stream.
remoteTimestamp | The remote timestamp for this stats object in DOMHighResTimeStamp format.
reportsSent | The total number of reports sent on this stream.
roundTripTime | The current estimated round-trip time for this stream in seconds.
totalRoundTripTime | The total round-trip time for this stream in seconds.
roundTripTimeMeasurements | The total number of round-trip time measurements for this stream.
attachments | Additional information attached to this stats

## MediaSourceStats


Field | Description 
--- | ---
timestamp (**Mandatory**) | The timestamp of the stat.
id (**Mandatory**) | A unique identifier for the stat.
kind (**Mandatory**) | The type of media ('audio' or 'video').
trackIdentifier | The identifier of the media track.
audioLevel | The current audio level.
totalAudioEnergy | The total audio energy.
totalSamplesDuration | The total duration of audio samples.
echoReturnLoss | The echo return loss.
echoReturnLossEnhancement | The enhancement of echo return loss.
width | The width of the video.
height | The height of the video.
frames | The total number of frames.
framesPerSecond | The frames per second of the video.
attachments | Additional information attached to this stats

## MediaPlayoutStats


Field | Description 
--- | ---
timestamp (**Mandatory**) | The timestamp of the stat.
id (**Mandatory**) | A unique identifier for the stat.
kind (**Mandatory**) | The kind of media (audio/video).
synthesizedSamplesDuration | The duration of synthesized audio samples.
synthesizedSamplesEvents | The number of synthesized audio samples events.
totalSamplesDuration | The total duration of all audio samples.
totalPlayoutDelay | The total delay experienced during audio playout.
totalSamplesCount | The total count of audio samples.
attachments | Additional information attached to this stats

## PeerConnectionTransportStats


Field | Description 
--- | ---
timestamp (**Mandatory**) | The timestamp of the stat.
id (**Mandatory**) | A unique identifier for the stat.
dataChannelsOpened | The number of data channels opened.
dataChannelsClosed | The number of data channels closed.
attachments | Additional information attached to this stats

## DataChannelStats


Field | Description 
--- | ---
timestamp (**Mandatory**) | The timestamp of the stat.
id (**Mandatory**) | A unique identifier for the stat.
label | The label of the data channel.
protocol | The protocol of the data channel.
dataChannelIdentifier | The identifier for the data channel.
state | The state of the data channel (e.g., 'open', 'closed').
messagesSent | The number of messages sent on the data channel.
bytesSent | The number of bytes sent on the data channel.
messagesReceived | The number of messages received on the data channel.
bytesReceived | The number of bytes received on the data channel.
attachments | Additional information attached to this stats

## IceTransportStats


Field | Description 
--- | ---
timestamp (**Mandatory**) | The timestamp of the stat.
id (**Mandatory**) | A unique identifier for the stat.
packetsSent | The number of packets sent.
packetsReceived | The number of packets received.
bytesSent | The number of bytes sent.
bytesReceived | The number of bytes received.
iceRole | The ICE role (e.g., 'controlling', 'controlled').
iceLocalUsernameFragment | The local username fragment for ICE.
dtlsState | The DTLS transport state (e.g., 'new', 'connecting', 'connected').
iceState | The ICE transport state (e.g., 'new', 'checking', 'connected').
selectedCandidatePairId | The ID of the selected ICE candidate pair.
localCertificateId | The ID of the local certificate.
remoteCertificateId | The ID of the remote certificate.
tlsVersion | The TLS version used for encryption.
dtlsCipher | The DTLS cipher suite used.
dtlsRole | The role in the DTLS handshake (e.g., 'client', 'server').
srtpCipher | The SRTP cipher used for encryption.
selectedCandidatePairChanges | The number of changes to the selected ICE candidate pair.
attachments | Additional information attached to this stats

## IceCandidateStats


Field | Description 
--- | ---
timestamp (**Mandatory**) | The timestamp of the stat.
id (**Mandatory**) | A unique identifier for the stat.
transportId | The transport ID associated with the ICE candidate.
address | The IP address of the ICE candidate.
port | The port number of the ICE candidate.
protocol | The transport protocol used by the candidate (e.g., 'udp', 'tcp').
candidateType | The type of the ICE candidate (e.g., 'host', 'srflx', 'relay').
priority | The priority of the ICE candidate.
url | The URL of the ICE candidate.
relayProtocol | The protocol used for the relay (e.g., 'tcp', 'udp').
foundation | A string representing the foundation for the ICE candidate.
relatedAddress | The related address for the ICE candidate (if any).
relatedPort | The related port for the ICE candidate (if any).
usernameFragment | The username fragment for the ICE candidate.
tcpType | The TCP type of the ICE candidate (e.g., 'active', 'passive').
attachments | Additional information attached to this stats

## IceCandidatePairStats


Field | Description 
--- | ---
id (**Mandatory**) | The unique identifier for this RTCStats object.
timestamp (**Mandatory**) | The timestamp of when the stats were recorded, in milliseconds.
transportId | The transport id of the connection this candidate pair belongs to.
localCandidateId | The ID of the local ICE candidate in this pair.
remoteCandidateId | The ID of the remote ICE candidate in this pair.
state | undefined (Possible values are: new,<br />inProgress,<br />waiting,<br />failed,<br />succeeded,<br />cancelled)
nominated | Whether this candidate pair has been nominated.
packetsSent | The number of packets sent using this candidate pair.
packetsReceived | The number of packets received using this candidate pair.
bytesSent | The total number of bytes sent using this candidate pair.
bytesReceived | The total number of bytes received using this candidate pair.
lastPacketSentTimestamp | The timestamp of the last packet sent using this candidate pair.
lastPacketReceivedTimestamp | The timestamp of the last packet received using this candidate pair.
totalRoundTripTime | The total round trip time (RTT) for this candidate pair in seconds.
currentRoundTripTime | The current round trip time (RTT) for this candidate pair in seconds.
availableOutgoingBitrate | The available outgoing bitrate (in bits per second) for this candidate pair.
availableIncomingBitrate | The available incoming bitrate (in bits per second) for this candidate pair.
requestsReceived | The number of ICE connection requests received by this candidate pair.
requestsSent | The number of ICE connection requests sent by this candidate pair.
responsesReceived | The number of ICE connection responses received by this candidate pair.
responsesSent | The number of ICE connection responses sent by this candidate pair.
consentRequestsSent | The number of ICE connection consent requests sent by this candidate pair.
packetsDiscardedOnSend | The number of packets discarded while attempting to send via this candidate pair.
bytesDiscardedOnSend | The total number of bytes discarded while attempting to send via this candidate pair.
attachments | Additional information attached to this stats

## CertificateStats


Field | Description 
--- | ---
timestamp (**Mandatory**) | The timestamp of the stat.
id (**Mandatory**) | A unique identifier for the stat.
fingerprint | The fingerprint of the certificate.
fingerprintAlgorithm | The algorithm used for the fingerprint (e.g., 'SHA-256').
base64Certificate | The certificate encoded in base64 format.
issuerCertificateId | The certificate ID of the issuer.
attachments | Additional information attached to this stats## PeerConnectionSample


A sample containing statistics and metrics for a WebRTC peer connection


Field | Description 
--- | ---
peerConnectionId (**Mandatory**) | Unique identifier of the stats object.
attachments | Additional information attached to this sample
score | Calculated score for peer connection (details should be added to scoreReasons)
scoreReasons | Details for score calculation
inboundTracks | Inbound Track Stats items
outboundTracks | Outbound Track Stats items
codecs | Codec items
inboundRtps | Inbound RTP Stats
remoteInboundRtps | Remote Inbound RTP Stats
outboundRtps | Outbound RTP Stats
remoteOutboundRtps | Remote Outbound RTP Stats
mediaSources | Audio Source Stats
mediaPlayouts | Media Playout Stats
peerConnectionTransports | PeerConnection Transport Stats
dataChannels | Data Channels Stats
iceTransports | ICE Transport Stats
iceCandidates | ICE Candidate Stats
iceCandidatePairs | ICE Candidate Pair Stats
certificates | Certificate Stats

## ClientEvent


Field | Description 
--- | ---
type (**Mandatory**) | The name of the event used as an identifier (e.g., MEDIA_TRACK_MUTED, USER_REJOINED, etc.).
payload | The value associated with the event, if applicable.
timestamp | The timestamp in epoch format when the event was generated.

## ClientIssue


Field | Description 
--- | ---
type (**Mandatory**) | The name of the issue
payload | The value associated with the event, if applicable.
timestamp | The timestamp in epoch format when the event was generated.

## ClientMetaData


Field | Description 
--- | ---
type (**Mandatory**) | The name of the event used as an identifier (e.g., MEDIA_TRACK_MUTED, USER_REJOINED, etc.).
payload | The value associated with the event, if applicable.
peerConnectionId | The unique identifier of the peer connection for which the event was generated.
trackId | The identifier of the media track related to the event, if applicable.
ssrc | The SSRC (Synchronization Source) identifier associated with the event, if applicable.
timestamp | The timestamp in epoch format when the event was generated.

## ExtensionStat


Field | Description 
--- | ---
type (**Mandatory**) | The type of the extension stats the custom app provides
payload | The payload of the extension stats the custom app provides## ClientSample


docs


Field | Description 
--- | ---
timestamp (**Mandatory**) | The timestamp the sample is created in GMT
callId | the unique identifier of the call or session
clientId | Unique id of the client providing samples.
attachments | Additional information attached to this sample (e.g.: roomId, userId, displayName, etc...)
score | Calculated score for client (details should be added to scoreReasons)
scoreReasons | Details for score calculation
peerConnections | Samples taken PeerConnections
clientEvents | A list of client events.
clientIssues | A list of client issues.
clientMetaItems | A list of additional client events.
extensionStats | The WebRTC app provided custom stats payload


## Controls


Field | Description 
--- | ---
close | Indicate that the server should close the connection
accessClaim | Holds a new claim to process

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
targetBitrate | The bitrate the corresponded stream targets.
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
rtxPacketsReceived | If rtx packets are sent or received on the same stream then this number indicates how many have been sent
rtxPacketsDiscarded | If rtx packets are received on the same stream then this number indicates how many have been discarded
framesReceived | The number of frames received on the corresponded RTP stream
framesDecoded | Indicates the number of frames the Sfu has decoded
keyFramesDecoded | Indicates the number of keyframes the Sfu has decoded
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
targetBitrate | The bitrate the corresponded stream targets.
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
rtxPacketsSent | If rtx packets sent on the same stream then this number indicates how many have been sent
rtxPacketsDiscarded | If rtx packets are received on the same stream then this number indicates how many have been discarded
framesSent | The number of frames sent on the corresponded RTP stream
framesEncoded | Indicates the number of frames the Sfu has encoded
keyFramesEncoded | Indicates the number of keyframes the Sfu has encoded on the corresponded RTP stream
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
internal | Flag to indicate that the SCTP channel is used as an internal communication between SFU instances
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
sfuSamples | Samples taken from an Sfu
turnSamples | Samples taken from the TURN server


## Changelog
## 3.0.0

- A complete rewritten of the schema

## 2.2.2

- Bugfix for Decoder library decoding IceCandidatePairs
- remove `schemaVersion` from Reports

## 2.2.1

- Encoder and Decoder libraries are added
- added `schemaVersion` to each generated Samples anre Reports

## 2.2.0

### Added

- CustomCallEvent to ClientSample resembles a CallEventReport, but possible to report from the client side.
- CustomSfuEvent to SfuSample resembles an SfuEventReport, but possible to report from the SFU side.

## 2.1.8

- change IceCandidatePair Report accordingly to IceCandidatePair sample

## 2.1.7

- change csv header lowercase to snake case

## 2.1.6

- change type of `framesDropped` in InboundVideoTrack report from `double` to `int`

## 2.1.5

- Make `label` field in PeerConnectionTransport optional

## 2.1.4

- Add `label` field to PeerConnectionTransport

## 2.1.3

- change type of `framesDropped` in InboundVideoTrack from `double` to `int`

## 2.1.2

### Renamed

- `DataChannelStats` record to `DataChannel` in ClientSample
- `IceCandidatePairStats` record to `IceCandidatePair` in ClientSample

## 2.1.1

### Restored

- `senderId` field in W3CStats for backward compatibility in client-monitor
- `rtcpTransportStatsId` field in W3CStats for backward compatibility in client-monitor

## 2.1.0

### Added

- ice candidate pair stats in samples extracted from client transport
- ice candidate pair report
- peer connection transport report
- `mid` field to ClientSamples inbound rtp related stats
- `jitterBufferMinimumDelay` field to ClientSamples inbound rtp related stats
- `playoutId` field to ClientSamples inbound rtp related stats
- `packetsDiscarded` field to ClientSamples inbound rtp related stats
- `jitterBufferTargetDelay` field to ClientSamples inbound rtp related stats
- `active` field to ClientSample outbound rtp related stats
- `droppedSamplesDuration` field to ClientSample audio source related stats
- `droppedSamplesEvents` field to ClientSample audio source related stats
- `totalCaptureDelay` field to ClientSample audio source related stats
- `totalSamplesCaptured` field to ClientSample audio source related stats
- `dtlsRole` to transport stats
- `RTCAudioPlayoutStats` to inbound-rtp related stats

### Modified

- pcTransports is changed to contain only peer connection transport fields

### Removed

- client-transport-report

- `packetsDiscarded` field from InboundAudioTrack, InboundVideoTrack samples and reports
- `packetsRepaired` field from InboundAudioTrack, InboundVideoTrack samples and reports
- `burstPacketsLost` field from InboundAudioTrack, InboundVideoTrack samples and reports
- `burstPacketsDiscarded` field from InboundAudioTrack, InboundVideoTrack samples and reports
- `burstLossCount` field from InboundAudioTrack, InboundVideoTrack samples and reports
- `burstDiscardCount` field from InboundAudioTrack, InboundVideoTrack samples and reports
- `burstLossRate` field from InboundAudioTrack, InboundVideoTrack samples and reports
- `burstDiscardRate` field from InboundAudioTrack, InboundVideoTrack samples and reports
- `gapLossRate` field from InboundAudioTrack, InboundVideoTrack samples and reports
- `gapDiscardRate` field from InboundAudioTrack, InboundVideoTrack samples and reports
- `partialFramesLost` field from InboundAudioTrack, InboundVideoTrack samples and reports
- `fullFramesLost` field from InboundAudioTrack, InboundVideoTrack samples and reports
- `averageRtcpInterval` field from InboundAudioTrack, InboundVideoTrack samples and reports
- `voiceActivityFlag` field from InboundAudioTrack, InboundVideoTrack samples and reports
- `frameBitDepth` field from InboundAudioTrack, InboundVideoTrack samples and reports
- `packetsFailedDecryption` field from InboundAudioTrack, InboundVideoTrack samples and reports
- `packetsDuplicated` field from InboundAudioTrack, InboundVideoTrack samples and reports
- `perDscpPacketsReceived` field from InboundAudioTrack, InboundVideoTrack samples and reports
- `sliCount` field from InboundAudioTrack, InboundVideoTrack samples and reports
- `fullFramesLost` field from InboundAudioTrack, InboundVideoTrack samples and reports
- `totalSamplesDecoded` field from InboundAudioTrack, InboundVideoTrack samples and reports
- `samplesDecodedWithSilk` field from InboundAudioTrack, InboundVideoTrack samples and reports
- `samplesDecodedWithCelt` field from InboundAudioTrack, InboundVideoTrack samples and reports
- `samplesreportsReceived` field from InboundAudioTrack, InboundVideoTrack samples and reports

- `rtxSsrc` field from OutboundAudioTrack, OutboundVideoTrack samples and reports
- `senderId` field from OutboundAudioTrack, OutboundVideoTrack samples and reports
- `lastPacketSentTimestamp` field from OutboundAudioTrack, OutboundVideoTrack samples and reports
- `packetsDiscardedOnSend` field from OutboundAudioTrack, OutboundVideoTrack samples and reports
- `bytesDiscardedOnSend` field from OutboundAudioTrack, OutboundVideoTrack samples and reports
- `fecPacketsSent` field from OutboundAudioTrack, OutboundVideoTrack samples and reports
- `framesDiscardedOnSend` field from OutboundAudioTrack, OutboundVideoTrack samples and reports
- `totalSamplesSent` field from OutboundAudioTrack, OutboundVideoTrack samples and reports
- `samplesEncodedWithSilk` field from OutboundAudioTrack, OutboundVideoTrack samples and reports
- `samplesEncodedWithCelt` field from OutboundAudioTrack, OutboundVideoTrack samples and reports
- `voiceActivityFlag` field from OutboundAudioTrack, OutboundVideoTrack samples and reports
- `sliCount` field from OutboundAudioTrack, OutboundVideoTrack samples and reports
- `frameBitDepth` field from OutboundAudioTrack, OutboundVideoTrack samples and reports
- `perDscpPacketsSent` field from OutboundAudioTrack, OutboundVideoTrack samples and reports
- `bitDepth` field from OutboundAudioTrack, OutboundVideoTrack samples and reports

## 2.0.4

### Added

- csv column list for every report. Generated from the schema, required fields first, and fields are in sorted order

## 2.0.3

### Added

- `remoteSfuId` to SfuInboundRtpPad reports
- `remoteTransportId` to SfuInboundRtpPad reports
- `remoteSinkId` to SfuInboundRtpPad reports
- `remoteRtpPadId` to SfuInboundRtpPad reports

## 2.0.2

### Added

- `roundTripTime` to SfuOutboundRtp report

## 2.0.1

### Added

- `internal` attribute to SfuSctpChannel sample
- `internal` attribute to SfuSctpStream report
- `internal` attribute to SfuTransport report

## 2.0.0

init
