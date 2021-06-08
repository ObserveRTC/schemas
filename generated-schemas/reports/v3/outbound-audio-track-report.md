## OutboundAudioTrackReport
---


A Report created for Outbound Audio Tracks. A combination of Audio source, Codec metadata carrying outbound and remote inbound RTP stat measurements


Name | Value | Description 
--- | --- | ---
serviceId | Required string | The unique identifier of the service
serviceName | Optional string | The resolved service name configured for the service Id
mediaUnitId | Required string | The media unit id the report belongs to
marker | Optional string | The marker the originated sample is reported with
timestamp | Required long | The timestamp when the corresponded data is generated for the report (UTC Epoch in ms)
callId | Required string | The generated unique identifier of the call
roomId | Optional string | webrtc app provided room id
clientId | Required string | The generated unique identifier of the client
userId | Optional string | webrtc app provided user identifier
peerConnectionId | Required string | The unique identifier of the peer connection
label | Optional string | The webrtc app provided label the peer connection is labeled with
sampleSeq | Required int | The sequence number of the sample the report is generated from
ssrc | Required long | The RTP SSRC field
packetsSent | Optional int | The total number of packets sent on the corresponded synchronization source
bytesSent | Optional long | The total number of bytes sent on the corresponded synchronization source
rid | Optional long |  The rid encoding parameter of the corresponded synchronization source
lastPacketSentTimestamp | Optional long |  the timestamp the last packet was sent. (UTC epoch in ms)
headerBytesSent | Optional long | Total number of RTP header and padding bytes sent over the corresponding synchronization source (ssrc)
packetsDiscardedOnSend | Optional int | Total number of RTP packets discarded at sender side over the corresponding synchronization source (ssrc)
bytesDiscardedOnSend | Optional long | Total number of RTP bytes discarded at sender side over the corresponding synchronization source (ssrc)
fecPacketsSent | Optional int | Total number of FEC packets sent over the corresponding synchronization source (ssrc)
retransmittedPacketsSent | Optional int | Total number of retransmitted packets sent over the corresponding synchronization source (ssrc).
retransmittedBytesSent | Optional long | Total number of retransmitted bytes sent over the corresponding synchronization source (ssrc).
targetBitrate | Optional long | Reflects the current encoder target in bits per second.
totalEncodedBytesTarget | Optional long | The total number of bytes of RTP coherent frames encoded completly depending on the frame size the encoder targets
totalSamplesSent | Optional int | The total number of samples sent over the corresponding synchronization source
samplesEncodedWithSilk | Optional int | The total number of samples encoded by SILK portion in opus sent over the corresponding synchronization source
samplesEncodedWithCelt | Optional int | The total number of samples encoded by CELT portion in opus sent over the corresponding synchronization source
voiceActivityFlag | Optional boolean | Indicate if the last RTP packet sent contained voice activity based on the presence of the V bit in the extension header
totalPacketSendDelay | Optional double | The total number of delay packets buffered at the sender side in seconds over the corresponding synchronization source
averageRtcpInterval | Optional double | The average RTCP interval between two consecutive compound RTCP packets sent for the corresponding synchronization source (ssrc)
perDscpPacketsSent | Optional double | The total number of DSCP flagged RTP packets sent over the corresponding synchronization source (ssrc)
nackCount | Optional int | Count the total number of Negative ACKnowledgement (NACK) packets received over the corresponding synchronization source (ssrc)
encoderImplementation | Optional string | Indicate the name of the encoder implementation library
packetsReceived | Optional int | The total number of packets received on the corresponded synchronization source
packetsLost | Optional int | The total number of bytes received on the corresponded synchronization source
jitter | Optional double | The corresponded synchronization source reported jitter
packetsDiscarded | Optional int | The total number of packets missed the playout point and therefore discarded by the jitterbuffer
packetsRepaired | Optional int | The total number of packets repaired by either FEC or due to retransmission on the corresponded synchronization source
burstPacketsLost | Optional int | The total number of packets lost in burst (RFC6958)
burstPacketsDiscarded | Optional int | The total number of packets discarded in burst (RFC6958)
burstLossCount | Optional int | The total number of burst happened causes burstPacketsLost on the corresponding synchronization source
burstDiscardCount | Optional int | The total number of burst happened causes burstPacketsDiscarded on the corresponding synchronization source
burstLossRate | Optional double | The fraction of RTP packets lost during bursts proportionally to the total number of RTP packets expected in the bursts on the corresponding synchronization source
burstDiscardRate | Optional double | The fraction of RTP packets discarded during bursts proportionally to the total number of RTP packets expected in the bursts on the corresponding synchronization source
gapLossRate | Optional double | The fraction of RTP packets lost during gap proportionally to the total number of RTP packets expected in the bursts on the corresponding synchronization source
gapDiscardRate | Optional double | The fraction of RTP packets discarded during gap proportionally to the total number of RTP packets expected in the bursts on the corresponding synchronization source
roundTripTime | Optional double | RTT measurement in seconds based on (most likely) SR, and RR belongs to the corresponded synchronization source
totalRoundTripTime | Optional double | The sum of RTT measurements belongs to the corresponded synchronization source
fractionLost | Optional double | The receiver reported fractional lost belongs to the corresponded synchronization source
reportsReceived | Optional int | The total number of RR reports received, which is the base of the remote inbound calculation on this source
roundTripTimeMeasurements | Optional int | The total number of calculated RR measurements received on this source
relayedSource | Optional boolean | True if the corresponded media source is remote, false otherwise (or null depending on browser and version)
audioLevel | Optional double | Represents the audio level reported by the media source
totalAudioEnergy | Optional double | Represents the energy level reported by the media source
totalSamplesDuration | Optional double | Represents the total duration of the audio samples the media source actually transconverted in seconds
echoReturnLoss | Optional double | Represents the echo cancellation in decibels corresponded to the media source.
echoReturnLossEnhancement | Optional double | Represents the echo cancellation in decibels added as a postprocessing by the library after the audio is catched from the emdia source.
ended | Optional boolean | Flag represents if the sender ended the media stream track or not.
payloadType | Optional int | The type of the payload the RTP packet SSRC belongs to
mimeType | Optional string | the MIME type of the codec (e.g.: video/vp8)
clockRate | Optional long | The negotiated clock rate the RTP timestamp is generated of
channels | Optional int | The number of channels for audio is used (in stereo it is 2, otherwise it is most likely null)
sdpFmtpLine | Optional string | The a=fmtp line in the SDP corresponding to the codec