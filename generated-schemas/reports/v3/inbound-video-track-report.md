## InboundVideoTrackReport
---


A Report created for Inbound Video Tracks. A combination of Codec metadata carrying inbound and remote outbound RTP stats measurements


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
remoteUserId | Optional string | The webrtc app provided user id the track belongs to, or if the webrtc app did not provided the observer tried to match it
remoteClientId | Optional string | The observer matched remote client Id
remotePeerConnectionId | Optional string | The observer matched remote Peer Connection Id
sampleSeq | Required int | The sequence number of the sample the report is generated from
ssrc | Required long | The RTP SSRC field
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
burstDiscardRate | Optional int | The fraction of RTP packets discarded during bursts proportionally to the total number of RTP packets expected in the bursts on the corresponding synchronization source
gapLossRate | Optional double | The fraction of RTP packets lost during gap proportionally to the total number of RTP packets expected in the bursts on the corresponding synchronization source
gapDiscardRate | Optional double | The fraction of RTP packets discarded during gap proportionally to the total number of RTP packets expected in the bursts on the corresponding synchronization source
framesDropped | Optional double | The total number of frames dropped at decoding process on the corresponding synchronization source
partialFramesLost | Optional double | The total number of partial frames lost at decoding process on the corresponding synchronization source
fullFramesLost | Optional int | The total number of full frames lost at decoding process on the corresponding synchronization source
framesDecoded | Optional int | Indicate the number of frames completly and without error decoded on the corresponded synchronization source (ssrc)
keyFramesDecoded | Optional int | Indicate the number of keyframes received on the corresponded synchronization source (ssrc)
frameWidth | Optional int | Indicate the width of the frame received on the corresponded synchronization source (ssrc)
frameHeight | Optional int | Indicate the height of the frame received on the corresponded synchronization source (ssrc)
frameBitDepth | Optional int | Indicate the bit depth per pixel of the last decoded frame received on the corresponded synchronization source (ssrc)
framesPerSecond | Optional double | Indicate the number of decoded frames in the last second received on the corresponded synchronization source (ssrc)
qpSum | Optional long | sum of QP values of frames decoded on the corresponded synchronization source (ssrc)
totalDecodeTime | Optional long | The total number of seconds spent on decoding frames on the corresponded synchronization source (ssrc)
totalInterFrameDelay | Optional long | The total number of inter frame delay on the corresponded synchronization source (ssrc)
totalSquaredInterFrameDelay | Optional long | The total number of inter frame delay squere on the corresponded synchronization source (ssrc) Useful for variance calculation for interframe delays
lastPacketReceivedTimestamp | Optional boolean | Represents the timestamp at which the last packet was received on the corresponded synchronization source (ssrc)
averageRtcpInterval | Optional double | The average RTCP interval between two consecutive compound RTCP packets sent for the corresponding synchronization source (ssrc)
headerBytesReceived | Optional long | Total number of RTP header and padding bytes received over the corresponding synchronization source (ssrc)
fecPacketsReceived | Optional int | Total number of FEC packets received over the corresponding synchronization source (ssrc)
fecPacketsDiscarded | Optional int | Total number of FEC packets discarded over the corresponding synchronization source (ssrc) due to 1) late arrive; 2) the target RTP packet has already been repaired.
bytesReceived | Optional long | Total number of bytes received over the corresponding synchronization source (ssrc) due to 1) late arrive; 2) the target RTP packet has already been repaired.
packetsFailedDecryption | Optional int | Total number of packets received and failed to decrypt over the corresponding synchronization source (ssrc) due to 1) late arrive; 2) the target RTP packet has already been repaired.
packetsDuplicated | Optional int | Total number of packets identified as duplicated over the corresponding synchronization source (ssrc).
perDscpPacketsReceived | Optional double | The total number of DSCP flagged RTP packets received over the corresponding synchronization source (ssrc)
firCount | Optional int | Count the total number of Full Intra Request sent by this receiver and belongs to the corresponded synchronization source (ssrc)
pliCount | Optional int | Count the total number of Picture Loss Indication sent by this receiver and belongs to the corresponded synchronization source (ssrc)
nackCount | Optional int | Count the total number of Negative ACKnowledgement (NACK) packets sent and belongs to the corresponded synchronization source (ssrc)
sliCount | Optional int | Count the total number of Slice Loss Indication sent by this receiver and belongs to the corresponded synchronization source (ssrc)
totalProcessingDelay | Optional double | The total processing delay in seconds spend on buffering RTP packets from received up until packets are decoded
estimatedPlayoutTimestamp | Optional double | The estimated playout time of the corresponded synchronization source
jitterBufferDelay | Optional double | The total time of RTP packets spent in jitterbuffer waiting for frame completion due to network uncertenity.
jitterBufferEmittedCount | Optional int | The total number of audio samples or video frames that have come out of the jitter buffer on the corresponded synchronization source (ssrc)
framesReceived | Optional int | Represents the total number of complete frames received on the corresponded synchronization source (ssrc)
decoderImplementation | Optional string | Indicate the name of the decoder implementation library
packetsSent | Optional int | Total number of RTP packets sent at the remote endpoint to this endpoint on this synchronization source
bytesSent | Optional int | Total number of payload bytes sent at the remote endpoint to this endpoint on this synchronization source
remoteTimestamp | Optional double | The timestamp corresnponds to the time in UTC Epoch the remote endpoint reported the statistics belong to the sender side and correspond to the synchronization source (ssrc)
reportsSent | Optional int | The number of SR reports the remote endpoint sent corresponded to synchronization source (ssrc) this report belongs to
ended | Optional boolean | Flag represents if the receiver ended the media stream track or not.
payloadType | Optional int | The type of the payload the RTP packet SSRC belongs to
mimeType | Optional string | the MIME type of the codec (e.g.: video/vp8)
clockRate | Optional long | The negotiated clock rate the RTP timestamp is generated of
sdpFmtpLine | Optional string | The a=fmtp line in the SDP corresponding to the codec