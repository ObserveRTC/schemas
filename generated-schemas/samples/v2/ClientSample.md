## ClientSample
---


Name | Value | Description 
--- | --- | ---
clientId | Required string | The unique generated client id the report is generated from
sampleSeq | Optional number | The sequence number a source assigns to the sample. <br />Every time the source make a sample at a client <br />this number is monothonically incremented.
roomId | Optional string | The WebRTC app configured room id the client was at the call.<br />If it is configured, then every sample carries this information.
userId | Optional string | The WebRTC app configured user id of the client.<br />If it is configured, then every sample carries this information.
engine | Optional Engine | The engine
platform | Optional Platform | The platform
browser | Optional Browser | Details of the browser the client has
os | Optional OperationSystem | Details about the operation system the client has
mediaConstraints | Optional array | List of the media constraints the client has<br /><br />Only presented if any changes occurred in the client
devices | Optional array | List of the media devices the client has.
userMediaErrors | Optional array | List of user media errors<br /><br />Only presented if any changes occurred in the client
extensionStats | Optional array | List of the extension stats added by the webrtc app
iceServers | Optional array | List of ICE server the client has<br /><br />Only presented if any changes occurred in the client
pcTransports | Optional array | List of the peer connection transport object.
mediaSources | Optional array | A list of media sources a client uses.<br />This attribute only updates if there is a change in the list of source.<br /><br />Only presented if any changes occurred in the client
codecs | Optional array | List of codec the client has<br /><br />Only presented if any changes occurred in the client
certificates | Optional array | The certificates the client provided<br /><br />Only presented if any changes occurred in the client
inboundAudioTracks | Optional array | The inbound audio track statistics
inboundVideoTracks | Optional array | The inbound video track statistics
outboundAudioTracks | Optional array | The outbound audio track statistics
outboundVideoTracks | Optional array | The outbound video track statistics
iceLocalCandidates | Optional array | Local ICE candidates<br /><br />Only presented if any changes occurred in the client
iceRemoteCandidates | Optional array | Remote ICE candidates<br /><br />Only presented if any changes occurred in the client
dataChannels | Optional array | Data channels
timestamp | Required number | The timestamp when the sample is created




### Engine
---


Engine


Name | Value | Description 
--- | --- | ---
name | Optional string | The name of
version | Optional string | The version of


### Platform
---


Platform infromation


Name | Value | Description 
--- | --- | ---
type | Optional string | The type of the platform
vendor | Optional string | The vendor of the platform
model | Optional string | The model of the platform


### Browser
---


Browser infromation


Name | Value | Description 
--- | --- | ---
name | Optional string | The name of the browser
version | Optional string | The version of


### OperationSystem
---


Name | Value | Description 
--- | --- | ---
name | Optional string | Name of the operation system.
version | Optional string | The version number of the operation system
versionName | Optional string | The version name of the operation system


### PeerConnectionTransport
---


A compounded object built up by using 
 * RTCTransportStats
 * RTCSctpTransportStats
 * RTCIceCandidateStats
 * RTCIceCandidatePairStats
 * RTCCertificateStats

from https://www.w3.org/TR/webrtc-stats/


Name | Value | Description 
--- | --- | ---
peerConnectionId | Optional string | The unique generated id for the peer connection
label | Optional string | The webrtc app provided label to the peer connection
dataChannelsOpened | Optional number | Represents the number of unique RTCDataChannels that have entered the "open" state during their lifetime.
dataChannelsClosed | Optional number | Represents the number of unique RTCDataChannels that had the "open" state, but now they are "closed"
dataChannelsRequested | Optional number | Represents the number of unique RTCDataChannels successfully requested from RTCPeerConnection.
dataChannelsAccepted | Optional number | Represents the number of unique RTCDataChannels signaled in a ondatachannel event on the RTCPeerConnection.
packetsSent | Optional number | Represents the total number of packets sent over this transport.
packetsReceived | Optional number | Represents the total number of packets received on this transport.
bytesSent | Optional number | Represents the total number of payload bytes sent on this RTCIceTransport, i.e., not including headers, padding or ICE connectivity checks.
bytesReceived | Optional number | Represents the total number of payload bytes received on this RTCIceTransport, i.e., not including headers, padding or ICE connectivity checks.
iceRole | Optional string | Set to the current value of the role attribute of the underlying RTCDtlsTransport.iceTransport.
iceLocalUsernameFragment | Optional number | Set to the current value of the local username fragment used in message validation procedures
dtlsState | Optional string | Set to the current value of the state attribute of the underlying RTCDtlsTransport.
iceState | Optional string | Set to the current value of the state attribute of the underlying RTCIceTransport.
selectedCandidatePairId | Optional string | It is a unique identifier that is associated to the object that was inspected to produce the RTCIceCandidatePairStats associated with this transport.
localCertificateId | Optional string | For components where DTLS is negotiated, give local certificate.
remoteCertificateId | Optional string | For components where DTLS is negotiated, give remote certificate.
tlsVersion | Optional string | The tls version of the peer connection when the DTLS negotiation is complete
dtlsCipher | Optional string | Descriptive name of the cipher suite used for the DTLS transport, as defined in the "Description" column of the IANA cipher suite registry
srtpCipher | Optional string | Descriptive name of the protection profile used for the SRTP transport, as defined in the "Profile" column of the IANA DTLS-SRTP protection profile registry
tlsGroup | Optional string | Descriptive name of the group used for the encryption, as defined in the "Description" column of the IANA TLS Supported Groups registry
selectedCandidatePairChanges | Optional string | The number of times that the selected candidate pair of this transport has changed. Going from not having a selected candidate pair to having a selected candidate pair, or the other way around, also increases this counter. It is initially zero and becomes one when an initial candidate pair is selected.
sctpSmoothedRoundTripTime | Optional number | The latest smoothed round-trip time value, corresponding to spinfo_srtt defined in [RFC6458] but converted to seconds. If there has been no round-trip time measurements yet, this value is undefined.
sctpCongestionWindow | Optional number | The latest congestion window, corresponding to spinfo_cwnd defined in [RFC6458].
sctpReceiverWindow | Optional number | The latest receiver window, corresponding to sstat_rwnd defined in [RFC6458].
sctpMtu | Optional number | The latest maximum transmission unit, corresponding to spinfo_mtu defined in [RFC6458].
sctpUnackData | Optional number | The number of unacknowledged DATA chunks, corresponding to sstat_unackdata defined in [RFC6458].
candidatePairState | Optional string | The state of ICE Candidate used for the peer connection
candidatePairPacketsSent | Optional number | The total number of packets sent on the peer connection using the selected candidate pair.
candidatePairPacketsReceived | Optional number | The total number of packets received on the peer connection using the selected candidate pair.
candidatePairBytesSent | Optional number | The total number of payload bytes sent on the peer connection using the selected candidate pair.
candidatePairBytesReceived | Optional number | The total number of payload bytes received on the peer connection using the selected candidate pair.
candidatePairLastPacketSentTimestamp | Optional number | The timestamp of the last sent packet on the peer connection using the selected ICE Candidate pair.
candidatePairLastPacketReceivedTimestamp | Optional number | The timestamp of the last received packet on the peer connection using the selected ICE Candidate pair.
candidatePairFirstRequestTimestamp | Optional number | The timestamp of the first request sent on the peer connection to select a candidate pair
candidatePairLastRequestTimestamp | Optional number | The timestamp of the last request sent on the peer connection to select a candidate pair
candidatePairLastResponseTimestamp | Optional number | The timestamp of the last response received on tthe peer connection using the selected candidate pair
candidatePairTotalRoundTripTime | Optional number | the sum of all round trip time measurements in seconds reported by STUN packet using the selected candidate pair on the peer connection
candidatePairCurrentRoundTripTime | Optional number | The latest round trip time calculated from STUN connectivity checks
candidatePairAvailableOutgoingBitrate | Optional number | Reported by the underlying congestion control algorithm on this peer connection using the selected ICE candidate pair
candidatePairAvailableIncomingBitrate | Optional number | Reported by the underlying congestion control algorithm on this peer connection using the selected ICE candidate pair
candidatePairCircuitBreakerTriggerCount | Optional number | The total number of circuit breaker condition happened on the peer connection using the selected candidate pair
candidatePairRequestsReceived | Optional number | The total number of requests received for connectivity check on the peer connection using the selected ice candidate pair
candidatePairRequestsSent | Optional number | The total number of requests sent for connectivity check on the peer connection using the selected ice candidate pair
candidatePairResponsesReceived | Optional number | The total number of responses received for connectivity check on the peer connection using the selected ice candidate pair
candidatePairResponsesSent | Optional number | The total number of responses sent for connectivity check on the peer connection using the selected ice candidate pair
candidatePairRetransmissionReceived | Optional number | The total number of retransmission received on the peer connection using the selected ice candidate pair
candidatePairRetransmissionSent | Optional number | The total number of retransmission sent on the peer connection using the selected ice candidate pair
candidatePairConsentRequestsSent | Optional number | The total number of consent requests sent on the peer connection using the selected ice candidate pair
candidatePairConsentExpiredTimestamp | Optional number | The total number of consent expired on the peer connection using the selected ice candidate pair
candidatePairPacketsDiscardedOnSend | Optional number | The total number packet discarded before sending on the peer connection using the selected candidate pair
candidatePairBytesDiscardedOnSend | Optional number | The total number bytes discarded before sending on the peer connection using the selected candidate pair
candidatePairRequestBytesSent | Optional number | The total number bytes sent as a request on the peer connection using the selected candidate pair
candidatePairConsentRequestBytesSent | Optional number | The total number bytes sent in consent packets on the peer connection using the selected candidate pair
candidatePairResponseBytesSent | Optional number | The total number bytes sent as response packets on the peer connection using the selected candidate pair
localAddress | Optional string | The local address of the ICE candidate at the local endpoint (IPv4, IPv6, FQDN)
localPort | Optional number | The port number used by the local ICE candidate for connectivity<br /><br />Possible values: UDP, TCP
localProtocol | Optional string | The protocol used by the local ICE candidate for connectivity
localCandidateType | Optional string | The type of the candidate used for communication.<br /><br />Possible values: host, srflx, prflx, relay
localRelayProtocol | Optional string | It is the protocol used by the endpoint to communicate with the TURN server.<br /><br />Possible values: UDP, TCP, TLS
remoteAddress | Optional string | The local address of the ICE candidate at the remote endpoint (IPv4, IPv6, FQDN)
remotePort | Optional number | The port number used by the remote ICE candidate for connectivity<br /><br />Possible values: UDP, TCP
remoteProtocol | Optional string | The protocol used by the remote ICE candidate for connectivity
remoteCandidateType | Optional string | The type of the remote candidate used for communication.<br /><br />Possible values: host, srflx, prflx, relay
remoteRelayProtocol | Optional string | It is the protocol used by the remote endpoint to communicate with the TURN server.<br /><br />Possible values: UDP, TCP, TLS
sentMediaPackets | Optional number | Client calculated metric.<br />The total number of media packets sent by all tracks using the peer connection.<br /><br />Note: Take care of the fact that tracks are attached and detached significantly changing the value of this field
receivedMediaPackets | Optional number | Client calculated metric.<br />The total number of media packets received by all tracks using the peer connection.<br /><br />Note: Take care of the fact that tracks are attached and detached significantly changing the value of this field
lostMediaPackets | Optional number | Client calculated metric.<br />The total number of media packets lost by all tracks using the peer connection.<br /><br />Note: Take care of the fact that tracks are attached and detached significantly changing the value of this field
videoRttAvg | Optional number | Client calculated metric.<br />A smoothed average value calculated by averaging all of the video tracks sent on the peer connection
audioRttAvg | Optional number | Client calculated metric.<br />A smoothed average value calculated by averaging all of the audio tracks sent on the peer connection


### MediaSourceStat
---


Represents the WebRTC Stats defined [RTCMediaSourceStats](https://www.w3.org/TR/webrtc-stats/#dom-rtcmediasourcestats)

NOTE: This name is postfixed with "stat" in order to avoid collision of the MediaSource name part of the standard library and picked up by the schema transpiler


Name | Value | Description 
--- | --- | ---
trackIdentifier | Optional string | The unique generated identifier the corresponded track has
kind | Optional string | The type of the media the Mediasource produces.<br /><br />Possible values are: "audio", "video"
relayedSource | Optional string | Flag indicating if the media source is relayed or not, meaning the local endpoint is not the actual source of the media, but a proxy for that media.
audioLevel | Optional number | the audio level of the media source.
totalAudioEnergy | Optional number | The audio energy of the media source<br /><br />For calculation see https://www.w3.org/TR/webrtc-stats/#dom-rtcaudiosourcestats-totalaudioenergy
totalSamplesDuration | Optional number | The duration of the audio type media source
echoReturnLoss | Optional number | if echo cancellation is applied on the media source, then <br />this number represents the loss calculation defined in https://www.itu.int/rec/T-REC-G.168-201504-I/en
echoReturnLossEnhancement | Optional number | similar to the echo return loss calculation
width | Optional number | The width, in pixels, of the last frame originating from the media source
height | Optional number | The height, in pixels, of the last frame originating from the media source
bitDepth | Optional number | The bit depth per pixels, of the last frame originating from the media source
frames | Optional number | The total number of frames originated from the media source
framesPerSecond | Optional number | The number of frames origianted from the media source in the last second


### Codec
---


The Media Codec the client uses to encode / decode certain media

Fields related to [RTCCodecStats](https://www.w3.org/TR/webrtc-stats/#dom-rtccodecstats)


Name | Value | Description 
--- | --- | ---
payloadType | Optional string | Payload type used in RTP encoding / decoding process.
codecType | Optional string | Either "encode", or "decode" depending on the role the codec plays in the client
transportId | Optional string | the unique identifier for the peer connection transport
mimeType | Optional string | The MIME type of the media. eg.: audio/opus
clockRate | Optional number | the clock rate used in RTP transport to generate the timestamp for the carried frames
channels | Optional number | Audio Only. Represnts the number of chanels an audio media source have. Only interesting if stereo is presented
sdpFmtpLine | Optional string | The SDP line determines the codec
peerConnectionId | Optional string | The peer connection id the codec is related to


### Certificate
---


Information about a certificate used by the ICE pair on peer connection


Name | Value | Description 
--- | --- | ---
fingerprint | Optional string | The fingerprint of the certificate
fingerprintAlgorithm | Optional string | The hash function used to generate the fingerprint
base64Certificate | Optional string | The DER encoded base-64 representation of the certificate.
issuerCertificateId | Optional string | The id of the next certificate in the certificate chain


### InboundAudioTrack
---


A combination of InboundRTPStat, RemoteInboundRTPStat, Receiver, and Codec webrtc stat standard exposed object at the client specific for audio tracks


Name | Value | Description 
--- | --- | ---
ssrc | Optional number | The SSRC identifier of the corresponded RTP stream.
packetsReceived | Optional number | The total number of packets received on the corresponded RTP stream,
packetsLost | Optional number | The total number of packets lost on the corresponded RTP stream
jitter | Optional number | The last RR reported jitter on the corresponded RTP stream
packetsDiscarded | Optional number | The total number of discarded packets on the corresponded RTP stream.
packetsRepaired | Optional number | The total number of packets repaired by either retransmission or FEC on the corresponded RTP stream.
burstPacketsLost | Optional number | The number of packets lost in burst period on the corresponded RTP stream.
burstPacketsDiscarded | Optional number | The total number of packets discarded during a burst period on the corresponded RTP stream.
burstLossCount | Optional number | The total number of burst lost happened on the coerresponded RTP stream
burstDiscardCount | Optional number | The number of burst discards happened on the corresponded RTP stream.
burstLossRate | Optional number | The loss rate during burst period on the corresponded RTP stream.
burstDiscardRate | Optional number | The discard rate during burst period on the corresponded RTP stream.
gapLossRate | Optional number | The loss rate during a gap period on the corresponded RTP stream.
gapDiscardRate | Optional number | The discard rate during a gap period on the corresponded RTP stream
voiceActivityFlag | Optional boolean | The RTP header V flag indicate of the activity of the media source by the media codec if the RTP transport ships it through
lastPacketReceivedTimestamp | Optional number | The RTP timestamp of the last received packet on the corresponded RTP stream
averageRtcpInterval | Optional number | The RTCP average interval of sending compound RTCP reports
headerBytesReceived | Optional number | The total amount of header bytes received on the corresponded RTP stream.
fecPacketsReceived | Optional number | The total number of FEC packets received on the corresponded RTP stream.
fecPacketsDiscarded | Optional number | The total number of FEC packets discafrded on the corresponded RTP stream.
bytesReceived | Optional number | The total amount of payload bytes received on the corresponded RTP stream
packetsFailedDecryption | Optional number | The total number of packets failed to be decrypted on the corresponded RTP stream
packetsDuplicated | Optional number | The total number of duplicated packets appeared on the corresponded RTP stream.
perDscpPacketsReceived | Optional number | The ratio of the DSCP packets on the corresponded RTP straem
nackCount | Optional number | The total number of negative acknowledgement received on the corresponded RTP stream
totalProcessingDelay | Optional number | The total processing delay of the RTP packets from the moment they received until the moment the jitter buffer emits them on the corresponded RTP strema.
estimatedPlayoutTimestamp | Optional number | The estimated timestamp of the jitterbuffer emits the RTP packets on the corresponded RTP stream.
jitterBufferDelay | Optional number | The total delay encountered by the jitter buffer for the RTP stream to allevaite the effect of jitter on the transport.
jitterBufferEmittedCount | Optional number | The total number of emits happened for the corresponded RTP stream
totalSamplesReceived | Optional number | The total number of audio samples received on the corresponded RTP stream
totalSamplesDecoded | Optional number | The total number of samples decoded on the corresponded RTP stream
samplesDecodedWithSilk | Optional number | The total number of samples decoded with SILK on the corresponded RTP stream
samplesDecodedWithCelt | Optional number | The total number of samples decodedd with CELT on the corresponded RTP stream
concealedSamples | Optional number | The total number of samples decoded by the media decoder from the corresponded RTP stream
silentConcealedSamples | Optional number | The total number of samples concealed from the corresponded RTP stream
concealmentEvents | Optional number | The total number of concealed event emitted to the media codec by the corresponded jitterbuffer
insertedSamplesForDeceleration | Optional number | The total number of samples inserted to decelarete the audio playout (happens when the jitterbuffer detects a shrinking buffer and need to increase the jitter buffer delay)
removedSamplesForAcceleration | Optional number | The total number of samples inserted to accelerate the audio playout (happens when the jitterbuffer detects a growing buffer and need to shrink the jitter buffer delay)
audioLevel | Optional number | The level of audio played out from the corresponded RTP stream
totalAudioEnergy | Optional number | the sum of level of energy of the microphone of the audio of the remote media source
totalSamplesDuration | Optional number | The total duration of the effective samples of the audio source
decoderImplementation | Optional string | The library implements the decoder for the media source
packetsSent | Optional number | The total number of packets sent by the remote endpoint on the corresponded RTP stream
bytesSent | Optional number | The total amount of bytes sent by the remote endpoint on the corresponded RTP stream
remoteTimestamp | Optional number | The remote timestamp of the RTCP packets reported in the SR
reportsSent | Optional number | The total number of SR reports sent by the remote endpoint on the corresponded RTP stream
ended | Optional boolean | Flag indicate if the MediaTrack has been eded or not
payloadType | Optional string | The type of the payload the RTP stream carries
codecType | Optional string | The type of the codec role inthe endpoint.<br /><br />Possible values are: "audio", and "video"
mimeType | Optional string | The MIME type of the media codec
clockRate | Optional number | the clock rate of the media source generates samples or frames
channels | Optional number | The number of channels the media source has.
sdpFmtpLine | Optional string | The corresponded SDP line in SDP negotiation
trackId | Optional string | The identifier of the MediaTrack the client plays the audio out
peerConnectionId | Optional string | The unique generated identifier of the peer connection the inbound audio track belongs to


### InboundVideoTrack
---


A compound stat object used by the client giving information about a video track 
used by the client as inbound


### OutboundAudioTrack
---


A compound object used


### OutboundVideoTrack
---


### ICELocalCandidate
---


### ICERemoteCandidate
---


### DataChannel
---