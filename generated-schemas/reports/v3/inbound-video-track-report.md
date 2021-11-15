## InboundVideoTrackReport
---


A Report created for Inbound Video Tracks. A combination of Codec metadata carrying inbound and remote outbound RTP stats measurements


Field | Type | Required | Description 
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
remoteTrackId | string | No | The id of the remote track this inbound track is originated from
remoteUserId | string | No | The webrtc app provided user id the track belongs to, or if the webrtc app did not provided the observer tried to match it
remoteClientId | string | No | The observer matched remote client Id
remotePeerConnectionId | string | No | The observer matched remote Peer Connection Id
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
framesDropped | int | No | The total number of frames dropped at decoding process on the corresponding synchronization source
partialFramesLost | double | No | The total number of partial frames lost at decoding process on the corresponding synchronization source
fullFramesLost | int | No | The total number of full frames lost at decoding process on the corresponding synchronization source
framesDecoded | int | No | Indicate the number of frames completly and without error decoded on the corresponded synchronization source (ssrc)
keyFramesDecoded | int | No | Indicate the number of keyframes received on the corresponded synchronization source (ssrc)
frameWidth | int | No | Indicate the width of the frame received on the corresponded synchronization source (ssrc)
frameHeight | int | No | Indicate the height of the frame received on the corresponded synchronization source (ssrc)
frameBitDepth | int | No | Indicate the bit depth per pixel of the last decoded frame received on the corresponded synchronization source (ssrc)
framesPerSecond | double | No | Indicate the number of decoded frames in the last second received on the corresponded synchronization source (ssrc)
qpSum | long | No | sum of QP values of frames decoded on the corresponded synchronization source (ssrc)
totalDecodeTime | long | No | The total number of seconds spent on decoding frames on the corresponded synchronization source (ssrc)
totalInterFrameDelay | long | No | The total number of inter frame delay on the corresponded synchronization source (ssrc)
totalSquaredInterFrameDelay | long | No | The total number of inter frame delay squere on the corresponded synchronization source (ssrc) Useful for variance calculation for interframe delays
lastPacketReceivedTimestamp | boolean | No | Represents the timestamp at which the last packet was received on the corresponded synchronization source (ssrc)
averageRtcpInterval | double | No | The average RTCP interval between two consecutive compound RTCP packets sent for the corresponding synchronization source (ssrc)
headerBytesReceived | long | No | Total number of RTP header and padding bytes received over the corresponding synchronization source (ssrc)
fecPacketsReceived | int | No | Total number of FEC packets received over the corresponding synchronization source (ssrc)
fecPacketsDiscarded | int | No | Total number of FEC packets discarded over the corresponding synchronization source (ssrc) due to 1) late arrive; 2) the target RTP packet has already been repaired.
bytesReceived | long | No | Total number of bytes received over the corresponding synchronization source (ssrc) due to 1) late arrive; 2) the target RTP packet has already been repaired.
packetsFailedDecryption | int | No | Total number of packets received and failed to decrypt over the corresponding synchronization source (ssrc) due to 1) late arrive; 2) the target RTP packet has already been repaired.
packetsDuplicated | int | No | Total number of packets identified as duplicated over the corresponding synchronization source (ssrc).
perDscpPacketsReceived | double | No | The total number of DSCP flagged RTP packets received over the corresponding synchronization source (ssrc)
firCount | int | No | Count the total number of Full Intra Request sent by this receiver and belongs to the corresponded synchronization source (ssrc)
pliCount | int | No | Count the total number of Picture Loss Indication sent by this receiver and belongs to the corresponded synchronization source (ssrc)
nackCount | int | No | Count the total number of Negative ACKnowledgement (NACK) packets sent and belongs to the corresponded synchronization source (ssrc)
sliCount | int | No | Count the total number of Slice Loss Indication sent by this receiver and belongs to the corresponded synchronization source (ssrc)
totalProcessingDelay | double | No | The total processing delay in seconds spend on buffering RTP packets from received up until packets are decoded
estimatedPlayoutTimestamp | double | No | The estimated playout time of the corresponded synchronization source
jitterBufferDelay | double | No | The total time of RTP packets spent in jitterbuffer waiting for frame completion due to network uncertenity.
jitterBufferEmittedCount | int | No | The total number of audio samples or video frames that have come out of the jitter buffer on the corresponded synchronization source (ssrc)
framesReceived | int | No | Represents the total number of complete frames received on the corresponded synchronization source (ssrc)
decoderImplementation | string | No | Indicate the name of the decoder implementation library
packetsSent | int | No | Total number of RTP packets sent at the remote endpoint to this endpoint on this synchronization source
bytesSent | long | No | Total number of payload bytes sent at the remote endpoint to this endpoint on this synchronization source
remoteTimestamp | double | No | The timestamp corresnponds to the time in UTC Epoch the remote endpoint reported the statistics belong to the sender side and correspond to the synchronization source (ssrc)
reportsSent | int | No | The number of SR reports the remote endpoint sent corresponded to synchronization source (ssrc) this report belongs to
ended | boolean | No | Flag represents if the receiver ended the media stream track or not.
payloadType | int | No | The type of the payload the RTP packet SSRC belongs to
mimeType | string | No | the MIME type of the codec (e.g.: video/vp8)
clockRate | long | No | The negotiated clock rate the RTP timestamp is generated of
sdpFmtpLine | string | No | The a=fmtp line in the SDP corresponding to the codec