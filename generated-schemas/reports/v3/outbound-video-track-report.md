## OutboundVideoTrackReport
---


A Report created for Outbound Video Tracks. A combination of Video source, Codec metadata carrying outbound and remote inbound RTP stat measurements


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
trackId | string | No | The id of the track
rtpStreamId | string | No | The id of the RTP stream connected to a remote media unit (such as an SFU)
packetsSent | int | No | The total number of packets sent on the corresponded synchronization source
bytesSent | long | No | The total number of bytes sent on the corresponded synchronization source
rid | string | No |  The rid encoding parameter of the corresponded synchronization source
lastPacketSentTimestamp | long | No |  the timestamp the last packet was sent. (UTC epoch in ms)
headerBytesSent | long | No | Total number of RTP header and padding bytes sent over the corresponding synchronization source (ssrc)
packetsDiscardedOnSend | int | No | Total number of RTP packets discarded at sender side over the corresponding synchronization source (ssrc)
bytesDiscardedOnSend | long | No | Total number of RTP bytes discarded at sender side over the corresponding synchronization source (ssrc)
fecPacketsSent | int | No | Total number of FEC packets sent over the corresponding synchronization source (ssrc)
retransmittedPacketsSent | int | No | Total number of retransmitted packets sent over the corresponding synchronization source (ssrc).
retransmittedBytesSent | long | No | Total number of retransmitted bytes sent over the corresponded synchronization source (ssrc).
targetBitrate | long | No | Reflects the current encoder target in bits per second.
totalEncodedBytesTarget | long | No | The total number of bytes of RTP coherent frames encoded completly depending on the frame size the encoder targets
frameWidth | int | No | Represents the height of the last encoded frame sent over the corresponded synchronization source
frameHeight | int | No | Represents the width of the last encoded frame sent over the corresponded synchronization source
frameBitDepth | int | No | Represents the bit depth per pixel of the last encoded frame sent over the corresponded synchronization source
framesPerSecond | double | No | The number of encoded frames over the last second sent over the corresponded synchronization source
framesSent | int | No | The number of frames sent over the corresponded synchronization source
hugeFramesSent | int | No | The number of huge frames (2.5x greater than the average size of frame) sent over the corresponded synchronization source
framesEncoded | int | No | The number of frames encoded over the corresponded synchronization source
keyFramesEncoded | int | No | The number of keyframes sent over the corresponded synchronization source
framesDiscardedOnSend | int | No | The number of frames discarded before sending over the corresponded synchronization source
qpSum | long | No | The sum of QP values encoded by the encoder corresponded to the synchronization source
totalEncodeTime | double | No | The sum of encoding time spent by the encoder corresponded to the synchronization source
totalPacketSendDelay | double | No | The total number of delay packets buffered at the sender side in seconds over the corresponding synchronization source
averageRtcpInterval | double | No | The average RTCP interval between two consecutive compound RTCP packets sent for the corresponding synchronization source (ssrc)
qualityLimitationDurationCPU | double | No | Time elapsed in seconds when the the corresponding synchronization source (ssrc) was in a limited state due to CPU
qualityLimitationDurationNone | double | No | Time elapsed in seconds when the the corresponding synchronization source (ssrc) was not in a limited state
qualityLimitationDurationBandwidth | double | No | Time elapsed in seconds when the the corresponding synchronization source (ssrc) was in a limited state becasue of bandwidth
qualityLimitationDurationOther | double | No | Time elapsed in seconds when the the corresponding synchronization source (ssrc) was in a limited state becaue of other factor
qualityLimitationReason | string | No | Indicate a reason for the corresponding synchronization source (ssrc) quality is limited
qualityLimitationResolutionChanges | int | No | The number of quality limiatation changes happened for the corresponding synchronization source (ssrc)
perDscpPacketsSent | double | No | The total number of DSCP flagged RTP packets sent over the corresponding synchronization source (ssrc)
nackCount | int | No | Count the total number of Negative ACKnowledgement (NACK) packets received over the corresponding synchronization source (ssrc)
firCount | int | No | The number of full inter requests happened over the corresponding synchronization source (ssrc)
pliCount | int | No | The number of picture loss indication happened received over the corresponding synchronization source (ssrc)
sliCount | int | No | The number of slice loss indication happened over the corresponding synchronization source (ssrc)
encoderImplementation | string | No | Indicate the name of the encoder implementation library
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
framesDropped | int | No | The number of frames dropped over the corresponded synchronization source
partialFramesLost | int | No | The number of partial frames lost over the corresponded synchronization source
fullFramesLost | int | No | The number of full frames lost over the corresponded synchronization source
roundTripTime | double | No | RTT measurement in seconds based on (most likely) SR, and RR belongs to the corresponded synchronization source
totalRoundTripTime | double | No | The sum of RTT measurements belongs to the corresponded synchronization source
fractionLost | double | No | The receiver reported fractional lost belongs to the corresponded synchronization source
reportsReceived | int | No | The total number of RR reports received, which is the base of the remote inbound calculation on this source
roundTripTimeMeasurements | int | No | The total number of calculated RR measurements received on this source
relayedSource | boolean | No | True if the corresponded media source is remote, false otherwise (or null depending on browser and version)
encodedFrameWidth | int | No | Indicate the encoded width of the frame received on the corresponded synchronization source (ssrc)
encodedFrameHeight | int | No | Indicate the encoded height of the frame received on the corresponded synchronization source (ssrc)
encodedFrameBitDepth | int | No | Indicate the encoded bit depth per pixel of the last decoded frame received on the corresponded synchronization source (ssrc)
encodedFramesPerSecond | double | No | Indicate the encoded number of decoded frames in the last second received on the corresponded synchronization source (ssrc)
ended | boolean | No | Flag represents if the sender ended the media stream track or not.
payloadType | int | No | The type of the payload the RTP packet SSRC belongs to
mimeType | string | No | the MIME type of the codec (e.g.: video/vp8)
clockRate | long | No | The negotiated clock rate the RTP timestamp is generated of
channels | int | No | The number of channels for audio is used (in stereo it is 2, otherwise it is most likely null)
sdpFmtpLine | string | No | The a=fmtp line in the SDP corresponding to the codec