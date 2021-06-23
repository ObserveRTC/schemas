## MediaTrackReport
---


A General Flat merged Media Track Report for in-, outbound video and audio tracks


Name | Type | Required | Description 
--- | --- | --- | ---
serviceId | string | Yes | The unique identifier of the service
mediaUnitId | string | Yes | The media unit id the report belongs to
timestamp | long | Yes | The timestamp when the corresponded data is generated for the report (UTC Epoch in ms)
callId | string | Yes | The generated unique identifier of the call
clientId | string | Yes | The generated unique identifier of the client
peerConnectionId | string | Yes | The unique identifier of the peer connection
sampleSeq | int | Yes | The sequence number of the sample the report is generated from
ssrc | long | Yes | The RTP SSRC field
marker | string | No | The marker the originated sample is reported with
roomId | string | No | webrtc app provided room id
userId | string | No | webrtc app provided user identifier
label | string | No | The webrtc app provided label the peer connection is labeled with
remoteUserId | string | No | Only For Inbound Media Track Reports<br />The webrtc app provided user id the track belongs to, or if the webrtc app did not provided the observer tried to match it
remoteClientId | string | No | Only For Inbound Media Track Reports<br />The observer matched remote client Id
remotePeerConnectionId | string | No | Only For Inbound Media Track Reports<br />The observer matched remote Peer Connection Id
packetsReceived | int | No | The total number of packets received on the corresponded synchronization source
packetsLost | int | No | The total number of bytes received on the corresponded synchronization source
jitter | double | No | The corresponded synchronization source reported jitter
packetsDiscarded | int | No | The total number of packets missed the playout point and therefore discarded by the jitterbuffer
packetsRepaired | int | No | The total number of packets repaired by either FEC or due to retransmission on the corresponded synchronization source
burstPacketsLost | int | No | The total number of packets lost in burst (RFC6958)
burstPacketsDiscarded | int | No | The total number of packets discarded in burst (RFC6958)
burstLossCount | int | No | The total number of burst happened causes burstPacketsLost on the corresponding synchronization source
burstDiscardCount | int | No | The total number of burst happened causes burstPacketsDiscarded on the corresponding synchronization source
burstLossRate | double | No | The fraction of RTP packets lost during bursts proportionally to the total number of RTP packets expected in the bursts on the corresponding synchronization source
burstDiscardRate | double | No | The fraction of RTP packets discarded during bursts proportionally to the total number of RTP packets expected in the bursts on the corresponding synchronization source
gapLossRate | double | No | The fraction of RTP packets lost during gap proportionally to the total number of RTP packets expected in the bursts on the corresponding synchronization source
gapDiscardRate | double | No | The fraction of RTP packets discarded during gap proportionally to the total number of RTP packets expected in the bursts on the corresponding synchronization source
voiceActivityFlag | boolean | No | Only For Audio Reports<br />Indicate if the last RTP packet received contained voice activity based on the presence of the V bit in the extension header
lastPacketReceivedTimestamp | boolean | No | Only For Inbound Media Track Reports<br />Represents the timestamp at which the last packet was received on the corresponded synchronization source (ssrc)
averageRtcpInterval | double | No | The average RTCP interval between two consecutive compound RTCP packets sent for the corresponding synchronization source (ssrc)
headerBytesReceived | long | No | Only For Inbound Media Track Reports<br />Total number of RTP header and padding bytes received over the corresponding synchronization source (ssrc)
fecPacketsReceived | int | No | Only For Inbound Media Track Reports<br />Total number of FEC packets received over the corresponding synchronization source (ssrc)
fecPacketsDiscarded | int | No | Only For Inbound Media Track Reports<br />Total number of FEC packets discarded over the corresponding synchronization source (ssrc) due to 1) late arrive; 2) the target RTP packet has already been repaired.
bytesReceived | long | No | Only For Inbound Media Track Reports<br />Total number of bytes received over the corresponding synchronization source (ssrc) due to 1) late arrive; 2) the target RTP packet has already been repaired.
packetsFailedDecryption | int | No | Only For Inbound Media Track Reports<br />Total number of packets received and failed to decrypt over the corresponding synchronization source (ssrc) due to 1) late arrive; 2) the target RTP packet has already been repaired.
packetsDuplicated | int | No | Only For Inbound Media Track Reports<br />Total number of packets identified as duplicated over the corresponding synchronization source (ssrc).
perDscpPacketsReceived | double | No | Only For Inbound Media Track Reports<br />The total number of DSCP flagged RTP packets received over the corresponding synchronization source (ssrc)
nackCount | int | No | Count the total number of Negative ACKnowledgement (NACK) packets sent and belongs to the corresponded synchronization source (ssrc)
totalProcessingDelay | double | No | Only For Inbound Media Track Reports<br />The total processing delay in seconds spend on buffering RTP packets from received up until packets are decoded
estimatedPlayoutTimestamp | double | No | Only For Inbound Media Track Reports<br />The estimated playout time of the corresponded synchronization source
jitterBufferDelay | double | No | Only For Inbound Media Track Reports<br />The total time of RTP packets spent in jitterbuffer waiting for frame completion due to network uncertenity.
jitterBufferEmittedCount | int | No | Only For Inbound Media Track Reports<br />The total number of audio samples or video frames that have come out of the jitter buffer on the corresponded synchronization source (ssrc)
decoderImplementation | string | No | Only For Inbound Media Track Reports<br />Indicate the name of the decoder implementation library
packetsSent | int | No | Total number of RTP packets sent at the remote endpoint to this endpoint on this synchronization source
bytesSent | int | No | Total number of payload bytes sent at the remote endpoint to this endpoint on this synchronization source
remoteTimestamp | double | No | Only For Inbound Media Track Reports<br />The timestamp corresnponds to the time in UTC Epoch the remote endpoint reported the statistics belong to the sender side and correspond to the synchronization source (ssrc)
reportsSent | int | No | Only For Inbound Media Track Reports<br />The number of SR reports the remote endpoint sent corresponded to synchronization source (ssrc) this report belongs to
ended | boolean | No | Flag represents if the receiver ended the media stream track or not.
payloadType | int | No | The type of the payload the RTP packet SSRC belongs to
mimeType | string | No | the MIME type of the codec (e.g.: video/vp8)
clockRate | long | No | The negotiated clock rate the RTP timestamp is generated of
channels | int | No | The number of channels for audio is used (in stereo it is 2, otherwise it is most likely null)
sdpFmtpLine | string | No | The a=fmtp line in the SDP corresponding to the codec
framesDropped | double | No | Only For Video Reports<br />The total number of frames dropped at decoding process on the corresponding synchronization source
partialFramesLost | double | No | Only For Video Reports<br />The total number of partial frames lost at decoding process on the corresponding synchronization source
fullFramesLost | int | No | Only For Video Reports<br />The total number of full frames lost at decoding process on the corresponding synchronization source
framesDecoded | int | No | Only For Video Reports<br />Only For Inbound Media Track Reports<br />Indicate the number of frames completly and without error decoded on the corresponded synchronization source (ssrc)
keyFramesDecoded | int | No | Only For Video Reports<br />Only For Inbound Media Track Reports<br />Indicate the number of keyframes received on the corresponded synchronization source (ssrc)
frameWidth | int | No | Only For Video Reports<br />Indicate the width of the frame received on the corresponded synchronization source (ssrc)
frameHeight | int | No | Only For Video Reports<br />Indicate the height of the frame received on the corresponded synchronization source (ssrc)
frameBitDepth | int | No | Only For Video Reports<br />Indicate the bit depth per pixel of the last decoded frame received on the corresponded synchronization source (ssrc)
framesPerSecond | double | No | Only For Video Reports<br />Indicate the number of decoded frames in the last second received on the corresponded synchronization source (ssrc)
qpSum | long | No | Only For Video Reports<br />sum of QP values of frames decoded on the corresponded synchronization source (ssrc)
totalDecodeTime | long | No | Only For Video Reports<br />Only For Inbound Media Track Reports<br />The total number of seconds spent on decoding frames on the corresponded synchronization source (ssrc)
totalInterFrameDelay | long | No | Only For Video Reports<br />Only For Inbound Media Track Reports<br />The total number of inter frame delay on the corresponded synchronization source (ssrc)
totalSquaredInterFrameDelay | long | No | Only For Video Reports<br />Only For Inbound Media Track Reports<br />The total number of inter frame delay squere on the corresponded synchronization source (ssrc) Useful for variance calculation for interframe delays
firCount | int | No | Only For Video Reports<br />Count the total number of Full Intra Request sent by this receiver and belongs to the corresponded synchronization source (ssrc)
pliCount | int | No | Only For Video Reports<br />Count the total number of Picture Loss Indication sent by this receiver and belongs to the corresponded synchronization source (ssrc)
sliCount | int | No | Only For Video Reports<br />Count the total number of Slice Loss Indication sent by this receiver and belongs to the corresponded synchronization source (ssrc)
framesReceived | int | No | Only For Video Reports<br />Only For Inbound Media Track Reports<br />Represents the total number of complete frames received on the corresponded synchronization source (ssrc)
rid | long | No | Only For Outbound Media Track Reports<br /> The rid encoding parameter of the corresponded synchronization source
lastPacketSentTimestamp | long | No | Only For Outbound Media Track Reports<br /> the timestamp the last packet was sent. (UTC epoch in ms)
headerBytesSent | long | No | Only For Outbound Media Track Reports<br />Total number of RTP header and padding bytes sent over the corresponding synchronization source (ssrc)
packetsDiscardedOnSend | int | No | Only For Outbound Media Track Reports<br />Total number of RTP packets discarded at sender side over the corresponding synchronization source (ssrc)
bytesDiscardedOnSend | long | No | Only For Outbound Media Track Reports<br />Total number of RTP bytes discarded at sender side over the corresponding synchronization source (ssrc)
fecPacketsSent | int | No | Only For Outbound Media Track Reports<br />Total number of FEC packets sent over the corresponding synchronization source (ssrc)
retransmittedPacketsSent | int | No | Only For Outbound Media Track Reports<br />Total number of retransmitted packets sent over the corresponding synchronization source (ssrc).
retransmittedBytesSent | long | No | Only For Outbound Media Track Reports<br />Total number of retransmitted bytes sent over the corresponding synchronization source (ssrc).
targetBitrate | long | No | Only For Outbound Media Track Reports<br />Reflects the current encoder target in bits per second.
totalEncodedBytesTarget | long | No | Only For Outbound Media Track Reports<br />The total number of bytes of RTP coherent frames encoded completly depending on the frame size the encoder targets
totalSamplesSent | int | No | Only For Audio Reports<br />Only For Outbound Media Track Reports<br />The total number of samples sent over the corresponding synchronization source
samplesEncodedWithSilk | int | No | Only For Audio Reports<br />Only For Outbound Media Track Reports<br />The total number of samples encoded by SILK portion in opus sent over the corresponding synchronization source
samplesEncodedWithCelt | int | No | Only For Audio Reports<br />Only For Outbound Media Track Reports<br />The total number of samples encoded by CELT portion in opus sent over the corresponding synchronization source
totalPacketSendDelay | double | No | Only For Outbound Media Track Reports<br />The total number of delay packets buffered at the sender side in seconds over the corresponding synchronization source
perDscpPacketsSent | double | No | Only For Outbound Media Track Reports<br />The total number of DSCP flagged RTP packets sent over the corresponding synchronization source (ssrc)
encoderImplementation | string | No | Only For Outbound Media Track Reports<br />Indicate the name of the encoder implementation library
roundTripTime | double | No | Only For Outbound Media Track Reports<br />RTT measurement in seconds based on (most likely) SR, and RR belongs to the corresponded synchronization source
totalRoundTripTime | double | No | Only For Outbound Media Track Reports<br />The sum of RTT measurements belongs to the corresponded synchronization source
fractionLost | double | No | Only For Outbound Media Track Reports<br />The receiver reported fractional lost belongs to the corresponded synchronization source
reportsReceived | int | No | Only For Outbound Media Track Reports<br />The total number of RR reports received, which is the base of the remote inbound calculation on this source
roundTripTimeMeasurements | int | No | Only For Outbound Media Track Reports<br />The total number of calculated RR measurements received on this source
relayedSource | boolean | No | Only For Outbound Media Track Reports<br />True if the corresponded media source is remote, false otherwise (or null depending on browser and version)
audioLevel | double | No | Only For Audio Reports<br />Only For Outbound Media Track Reports<br />Represents the audio level reported by the media source
totalAudioEnergy | double | No | Only For Audio Reports<br />Only For Outbound Media Track Reports<br />Represents the energy level reported by the media source
totalSamplesDuration | double | No | Only For Audio Reports<br />Only For Outbound Media Track Reports<br />Represents the total duration of the audio samples the media source actually transconverted in seconds
echoReturnLoss | double | No | Only For Audio Reports<br />Only For Outbound Media Track Reports<br />Represents the echo cancellation in decibels corresponded to the media source.
echoReturnLossEnhancement | double | No | Only For Audio Reports<br />Only For Outbound Media Track Reports<br />Represents the echo cancellation in decibels added as a postprocessing by the library after the audio is catched from the emdia source.
framesSent | int | No | Only For Video Reports<br />Only For Outbound Media Track Reports<br />The number of frames sent over the corresponded synchronization source
hugeFramesSent | int | No | Only For Video Reports<br />Only For Outbound Media Track Reports<br />The number of huge frames (2.5x greater than the average size of frame) sent over the corresponded synchronization source
framesEncoded | int | No | Only For Video Reports<br />Only For Outbound Media Track Reports<br />The number of frames encoded over the corresponded synchronization source
keyFramesEncoded | int | No | Only For Video Reports<br />Only For Outbound Media Track Reports<br />The number of keyframes sent over the corresponded synchronization source
framesDiscardedOnSend | int | No | Only For Video Reports<br />Only For Outbound Media Track Reports<br />The number of frames discarded before sending over the corresponded synchronization source
totalEncodeTime | double | No | Only For Video Reports<br />Only For Outbound Media Track Reports<br />The sum of encoding time spent by the encoder corresponded to the synchronization source
qualityLimitationReason | string | No | Only For Video Reports<br />Only For Outbound Media Track Reports<br />The reason behind the last a quality limitation changes happened for the corresponding synchronization source (ssrc)
qualityLimitationDurations | double | No | Only For Video Reports<br />Only For Outbound Media Track Reports<br />The total duration of the quality limitations happened for the corresponding synchronization source (ssrc)
qualityLimitationResolutionChanges | int | No | Only For Video Reports<br />Only For Outbound Media Track Reports<br />The number of quality limiatation changes happened for the corresponding synchronization source (ssrc)
encodedFrameWidth | int | No | Only For Video Reports<br />Only For Outbound Media Track Reports<br />Indicate the encoded width of the frame received on the corresponded synchronization source (ssrc)
encodedFrameHeight | int | No | Only For Video Reports<br />Only For Outbound Media Track Reports<br />Indicate the encoded height of the frame received on the corresponded synchronization source (ssrc)
encodedFrameBitDepth | int | No | Only For Video Reports<br />Only For Outbound Media Track Reports<br />Indicate the encoded bit depth per pixel of the last decoded frame received on the corresponded synchronization source (ssrc)
encodedFramesPerSecond | double | No | Only For Video Reports<br />Only For Outbound Media Track Reports<br />Indicate the encoded number of decoded frames in the last second received on the corresponded synchronization source (ssrc)