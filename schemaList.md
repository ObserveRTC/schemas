CallEventReport
 * **serviceId**: The unique identifier of the service
 * **timestamp**: The timestamp when the corresponded data is generated for the report (UTC Epoch in ms)
 * **name**: The name of the event. Possible values are: CALL_STARTED, CALL_ENDED, CLIENT_JOINED, CLIENT_LEFT, PEER_CONNECTION_OPENED, PEER_CONNECTION_CLOSED, MEDIA_TRACK_ADDED, MEDIA_TRACK_REMOVED
 * **mediaUnitId**: The media unit id the report belongs to
 * **marker**: The marker the originated sample is reported with
 * **callId**: The generated unique identifier of the call
 * **roomId**: webrtc app provided room id
 * **clientId**: The generated unique identifier of the client
 * **userId**: webrtc app provided user identifier
 * **peerConnectionId**: The unique identifier of the peer connection
 * **mediaTrackId**: The unique identifier of the media track
 * **SSRC**: The SSRC identifier of the RTP stream a trackId belongs to
 * **sampleTimestamp**: The timestamp of the sample the event related to
 * **sampleSeq**: The sequence number of the sample the event may related to
 * **message**: the human readable message of the event
 * **value**: the value of the event
 * **attachments**: attachment the event may created with
CallMetaReport
 * **serviceId**: The unique identifier of the service
 * **timestamp**: The timestamp when the corresponded data is generated for the report (UTC Epoch in ms)
 * **mediaUnitId**: The media unit id the report belongs to
 * **marker**: The marker the originated sample is reported with
 * **callId**: The generated unique identifier of the call
 * **roomId**: webrtc app provided room id
 * **clientId**: The generated unique identifier of the client
 * **userId**: webrtc app provided user identifier
 * **peerConnectionId**: The unique identifier of the peer connection
 * **sampleTimestamp**: The timestamp of the sample the event related to
 * **sampleSeq**: The sequence number of the sample the event may related to
 * **type**: The type of the meta data. Possible values are: OPERATION_SYSTEM, ENGINE, PLATFORM, BROWSER, CERTIFICATE, CODEC, ICE_LOCAL_CANDIDATE, ICE_REMOTE_CANDIDATE, ICE_SERVER, MEDIA_CONSTRAINT, MEDIA_DEVICE, MEDIA_SOURCE, USER_MEDIA_ERROR, LOCAL_SDP
 * **payload**: The payload for the metadata reported for the peeer connection
ClientDataChannelReport
 * **serviceId**: The unique identifier of the service
 * **mediaUnitId**: The media unit id the report belongs to
 * **timestamp**: The timestamp when the corresponded data is generated for the report (UTC Epoch in ms)
 * **callId**: The generated unique identifier of the call
 * **clientId**: The generated unique identifier of the client
 * **peerConnectionId**: The unique identifier of the peer connection
 * **sampleSeq**: The sequence number of the sample the report is generated from
 * **marker**: The marker the originated sample is reported with
 * **roomId**: webrtc app provided room id
 * **userId**: webrtc app provided user identifier
 * **peerConnectionLabel**: The webrtc app provided label for the peer connection
 * **label**: The label of the data channel
 * **protocol**: The protocol used for the data channel
 * **state**: The state of the data channel
 * **messagesSent**: Represents the total number of API message events sent
 * **bytesSent**: Represents the total number of payload bytes sent on the corresponded data channel
 * **messagesReceived**: Represents the total number of API message events received on the corresponded data channel
 * **bytesReceived**: Represents the total number of payload bytes received on the corresponded data channel
ClientExtensionReport
 * **serviceId**: The unique identifier of the service
 * **timestamp**: The timestamp when the corresponded data is generated for the report (UTC Epoch in ms)
 * **extensionType**: The name of the event
 * **mediaUnitId**: The media unit id the report belongs to
 * **marker**: The marker the originated sample is reported with
 * **callId**: The generated unique identifier of the call
 * **roomId**: webrtc app provided room id
 * **clientId**: The generated unique identifier of the client
 * **userId**: webrtc app provided user identifier
 * **peerConnectionId**: The unique identifier of the peer connection
 * **sampleSeq**: The sequence number of the sample the event may related to
 * **payload**: the human readable message of the event
ClientTransportReport
 * **serviceId**: The unique identifier of the service
 * **mediaUnitId**: The media unit id the report belongs to
 * **timestamp**: The timestamp when the corresponded data is generated for the report (UTC Epoch in ms)
 * **callId**: The generated unique identifier of the call
 * **clientId**: The generated unique identifier of the client
 * **peerConnectionId**: The unique identifier of the peer connection
 * **marker**: The marker the originated sample is reported with
 * **roomId**: webrtc app provided room id
 * **userId**: webrtc app provided user identifier
 * **label**: The webrtc app provided label the peer connection is marked with
 * **packetsSent**: Represents the total number of packets sent on the corresponded transport
 * **packetsReceived**: Represents the total number of packets received on the corresponded transport
 * **bytesSent**: Represents the total amount of bytes sent on the corresponded transport
 * **bytesReceived**: Represents the total amount of bytes received on the corresponded transport
 * **iceRole**: Represent the current role of ICE under DTLS Transport
 * **iceLocalUsernameFragment**: Represent the current local username fragment used in message validation procedures for ICE under DTLS Transport
 * **dtlsState**: Represents the current state of DTLS for the peer connection transport layer
 * **iceTransportState**: Represents the current transport state (RTCIceTransportState) of ICE for the peer connection transport layer
 * **tlsVersion**: Represents the version number of the TLS used in the corresponded transport
 * **dtlsCipher**: Represents the name of the DTLS cipher used in the corresponded transport
 * **srtpCipher**: Represents the name of the SRTP cipher used in the corresponded transport
 * **tlsGroup**: Represents the name of the IANA TLS Supported Groups used in the corresponded transport
 * **selectedCandidatePairChanges**: The total number of candidate pair changes over the peer connection
 * **localAddress**: The address of the candidate (IPv4, IPv6, FQDN)
 * **localPort**: The locally used port to communicate with the remote peer
 * **localProtocol**: The protocol used by the local endpoint for the corresponded transport
 * **localCandidateType**: The type of the ICE candidate used at the local endpoint on the corresponded transport
 * **localCandidateICEServerUrl**: The url of the ICE server used by the local endpoint on the corresponded transport
 * **localCandidateRelayProtocol**: The relay protocol of the ICE candidate used by the local endpoint on the corresponded transport
 * **remoteAddress**: The address of the candidate (IPv4, IPv6, FQDN)
 * **remotePort**: The remotely used port to communicate with the remote peer
 * **remoteProtocol**: The protocol used by the remote endpoint for the corresponded transport
 * **remoteCandidateType**: The type of the ICE candidate used at the remote endpoint on the corresponded transport
 * **remoteCandidateICEServerUrl**: The url of the ICE server used by the remote endpoint on the corresponded transport
 * **remoteCandidateRelayProtocol**: The relay protocol of the ICE candidate used by the remote endpoint on the corresponded transport
 * **candidatePairState**: The state of ICE Candidate Pairs (RTCStatsIceCandidatePairState) on the corresponded transport
 * **candidatePairPacketsSent**: The total number of packets sent using the last selected candidate pair over the corresponded transport
 * **candidatePairPacketsReceived**: The total number of packets received using the last selected candidate pair over the corresponded transport
 * **candidatePairBytesSent**: The total number of bytes sent using the last selected candidate pair over the corresponded transport
 * **candidatePairBytesReceived**: The total number of bytes received using the last selected candidate pair over the corresponded transport
 * **candidatePairLastPacketSentTimestamp**: Represents the timestamp at which the last packet was sent on the selected candidate pair, excluding STUN packets over the corresponded transport (UTC Epoch in ms)
 * **candidatePairLastPacketReceivedTimestamp**: Represents the timestamp at which the last packet was received on the selected candidate pair, excluding STUN packets over the corresponded transport (UTC Epoch in ms)
 * **candidatePairFirstRequestTimestamp**: Represents the timestamp at which the first STUN request was sent on this particular candidate pair over the corresponded transport (UTC Epoch in ms)
 * **candidatePairLastRequestTimestamp**: Represents the timestamp at which the last STUN request was sent on this particular candidate pair over the corresponded transport (UTC Epoch in ms)
 * **candidatePairLastResponseTimestamp**: Represents the timestamp at which the last STUN response was received on this particular candidate pair over the corresponded transport (UTC Epoch in ms)
 * **candidatePairTotalRoundTripTime**: Represents the sum of all round trip time measurements in seconds since the beginning of the session, based on STUN connectivity check over the corresponded transport
 * **candidatePairCurrentRoundTripTime**: Represents the last round trip time measurements in seconds based on STUN connectivity check over the corresponded transport
 * **candidatePairAvailableOutgoingBitrate**: The sum of the underlying cc algorithm provided outgoing bitrate for the RTP streams over the corresponded transport
 * **candidatePairAvailableIncomingBitrate**: The sum of the underlying cc algorithm provided incoming bitrate for the RTP streams over the corresponded transport
 * **candidatePairCircuitBreakerTriggerCount**: The total number of circuit breaker triggered over the corresponded transport using the selected candidate pair
 * **candidatePairRequestsReceived**: Represents the total number of connectivity check requests received on the selected candidate pair using the corresponded transport
 * **candidatePairRequestsSent**: Represents the total number of connectivity check requests sent on the selected candidate pair using the corresponded transport
 * **candidatePairResponsesReceived**: Represents the total number of connectivity check responses received on the selected candidate pair using the corresponded transport
 * **candidatePairResponsesSent**: Represents the total number of connectivity check responses sent on the selected candidate pair using the corresponded transport
 * **candidatePairRetransmissionReceived**: Represents the total number of connectivity check retransmission received on the selected candidate pair using the corresponded transport
 * **candidatePairRetransmissionSent**: Represents the total number of connectivity check retransmission sent on the selected candidate pair using the corresponded transport
 * **candidatePairConsentRequestsSent**: Represents the total number of consent requests sent on the selected candidate pair using the corresponded transport
 * **candidatePairConsentExpiredTimestamp**: Represents the timestamp at which the latest valid STUN binding response expired on the selected candidate pair using the corresponded transport
 * **candidatePairBytesDiscardedOnSend**: Total amount of bytes for this candidate pair that have been discarded due to socket errors on the selected candidate pair using the corresponded transport
 * **candidatePairPacketsDiscardedOnSend**: Total amount of packets for this candidate pair that have been discarded due to socket errors on the selected candidate pair using the corresponded transport
 * **candidatePairRequestBytesSent**: Total number of bytes sent for connectivity checks on the selected candidate pair using the corresponded transport
 * **candidatePairConsentRequestBytesSent**: Total number of bytes sent for consent requests on the selected candidate pair using the corresponded transport
 * **candidatePairResponseBytesSent**: Total number of bytes sent for connectivity check responses on the selected candidate pair using the corresponded transport
 * **sctpSmoothedRoundTripTime**: The latest smoothed round-trip time value, corresponding to spinfo_srtt defined in [RFC6458] but converted to seconds. 
 * **sctpCongestionWindow**: The latest congestion window, corresponding to spinfo_cwnd.
 * **sctpReceiverWindow**: The latest receiver window, corresponding to sstat_rwnd.
 * **sctpMtu**: The latest maximum transmission unit, corresponding to spinfo_mtu.
 * **sctpUnackData**: The number of unacknowledged DATA chunks, corresponding to sstat_unackdata.
InboundAudioTrackReport
 * **serviceId**: The unique identifier of the service
 * **mediaUnitId**: The media unit id the report belongs to
 * **timestamp**: The timestamp when the corresponded data is generated for the report (UTC Epoch in ms)
 * **callId**: The generated unique identifier of the call
 * **clientId**: The generated unique identifier of the client
 * **peerConnectionId**: The unique identifier of the peer connection
 * **sampleSeq**: The sequence number of the sample the report is generated from
 * **ssrc**: The RTP SSRC field
 * **marker**: The marker the originated sample is reported with
 * **roomId**: webrtc app provided room id
 * **userId**: webrtc app provided user identifier
 * **label**: The webrtc app provided label the peer connection is labeled with
 * **trackId**: The id of the track
 * **sfuStreamId**: The id of the Sfu stream the media from
 * **sfuSinkId**: The id of the sink the Sfu streamed the media out
 * **remoteTrackId**: The id of the remote track this inbound track is originated from
 * **remoteUserId**: The webrtc app provided user id the track belongs to, or if the webrtc app did not provided the observer tried to match it
 * **remoteClientId**: The observer matched remote client Id
 * **remotePeerConnectionId**: The observer matched remote Peer Connection Id
 * **packetsReceived**: The total number of packets received on the corresponded synchronization source
 * **packetsLost**: The total number of bytes received on the corresponded synchronization source
 * **jitter**: The corresponded synchronization source reported jitter
 * **packetsDiscarded**: The total number of packets missed the playout point and therefore discarded by the jitterbuffer
 * **packetsRepaired**: The total number of packets repaired by either FEC or due to retransmission on the corresponded synchronization source
 * **burstPacketsLost**: The total number of packets lost in burst (RFC6958)
 * **burstPacketsDiscarded**: The total number of packets discarded in burst (RFC6958)
 * **burstLossCount**: The total number of burst happened causes burstPacketsLost on the corresponding synchronization source
 * **burstDiscardCount**: The total number of burst happened causes burstPacketsDiscarded on the corresponding synchronization source
 * **burstLossRate**: The fraction of RTP packets lost during bursts proportionally to the total number of RTP packets expected in the bursts on the corresponding synchronization source
 * **burstDiscardRate**: The fraction of RTP packets discarded during bursts proportionally to the total number of RTP packets expected in the bursts on the corresponding synchronization source
 * **gapLossRate**: The fraction of RTP packets lost during gap proportionally to the total number of RTP packets expected in the bursts on the corresponding synchronization source
 * **gapDiscardRate**: The fraction of RTP packets discarded during gap proportionally to the total number of RTP packets expected in the bursts on the corresponding synchronization source
 * **voiceActivityFlag**: Indicate if the last RTP packet received contained voice activity based on the presence of the V bit in the extension header
 * **lastPacketReceivedTimestamp**: Represents the timestamp at which the last packet was received on the corresponded synchronization source (ssrc)
 * **averageRtcpInterval**: The average RTCP interval between two consecutive compound RTCP packets sent for the corresponding synchronization source (ssrc)
 * **headerBytesReceived**: Total number of RTP header and padding bytes received over the corresponding synchronization source (ssrc)
 * **fecPacketsReceived**: Total number of FEC packets received over the corresponding synchronization source (ssrc)
 * **fecPacketsDiscarded**: Total number of FEC packets discarded over the corresponding synchronization source (ssrc) due to 1) late arrive; 2) the target RTP packet has already been repaired.
 * **bytesReceived**: Total number of bytes received over the corresponding synchronization source (ssrc) due to 1) late arrive; 2) the target RTP packet has already been repaired.
 * **packetsFailedDecryption**: Total number of packets received and failed to decrypt over the corresponding synchronization source (ssrc) due to 1) late arrive; 2) the target RTP packet has already been repaired.
 * **packetsDuplicated**: Total number of packets identified as duplicated over the corresponding synchronization source (ssrc).
 * **perDscpPacketsReceived**: The total number of DSCP flagged RTP packets received over the corresponding synchronization source (ssrc)
 * **nackCount**: Count the total number of Negative ACKnowledgement (NACK) packets sent and belongs to the corresponded synchronization source (ssrc)
 * **totalProcessingDelay**: The total processing delay in seconds spend on buffering RTP packets from received up until packets are decoded
 * **estimatedPlayoutTimestamp**: The estimated playout time of the corresponded synchronization source
 * **jitterBufferDelay**: The total time of RTP packets spent in jitterbuffer waiting for frame completion due to network uncertenity.
 * **jitterBufferEmittedCount**: The total number of audio samples or video frames that have come out of the jitter buffer on the corresponded synchronization source (ssrc)
 * **decoderImplementation**: Indicate the name of the decoder implementation library
 * **packetsSent**: Total number of RTP packets sent at the remote endpoint to this endpoint on this synchronization source
 * **bytesSent**: Total number of payload bytes sent at the remote endpoint to this endpoint on this synchronization source
 * **remoteTimestamp**: The timestamp corresnponds to the time in UTC Epoch the remote endpoint reported the statistics belong to the sender side and correspond to the synchronization source (ssrc)
 * **reportsSent**: The number of SR reports the remote endpoint sent corresponded to synchronization source (ssrc) this report belongs to
 * **ended**: Flag represents if the receiver ended the media stream track or not.
 * **payloadType**: The type of the payload the RTP packet SSRC belongs to
 * **mimeType**: the MIME type of the codec (e.g.: video/vp8)
 * **clockRate**: The negotiated clock rate the RTP timestamp is generated of
 * **channels**: The number of channels for audio is used (in stereo it is 2, otherwise it is most likely null)
 * **sdpFmtpLine**: The a=fmtp line in the SDP corresponding to the codec
InboundVideoTrackReport
 * **serviceId**: The unique identifier of the service
 * **mediaUnitId**: The media unit id the report belongs to
 * **timestamp**: The timestamp when the corresponded data is generated for the report (UTC Epoch in ms)
 * **callId**: The generated unique identifier of the call
 * **clientId**: The generated unique identifier of the client
 * **peerConnectionId**: The unique identifier of the peer connection
 * **sampleSeq**: The sequence number of the sample the report is generated from
 * **ssrc**: The RTP SSRC field
 * **marker**: The marker the originated sample is reported with
 * **roomId**: webrtc app provided room id
 * **userId**: webrtc app provided user identifier
 * **label**: The webrtc app provided label the peer connection is labeled with
 * **trackId**: The id of the track
 * **sfuStreamId**: The id of the Sfu stream the media from
 * **sfuSinkId**: The id of the sink the Sfu streamed the media out
 * **remoteTrackId**: The id of the remote track this inbound track is originated from
 * **remoteUserId**: The webrtc app provided user id the track belongs to, or if the webrtc app did not provided the observer tried to match it
 * **remoteClientId**: The observer matched remote client Id
 * **remotePeerConnectionId**: The observer matched remote Peer Connection Id
 * **packetsReceived**: The total number of packets received on the corresponded synchronization source
 * **packetsLost**: The total number of bytes received on the corresponded synchronization source
 * **jitter**: The corresponded synchronization source reported jitter
 * **packetsDiscarded**: The total number of packets missed the playout point and therefore discarded by the jitterbuffer
 * **packetsRepaired**: The total number of packets repaired by either FEC or due to retransmission on the corresponded synchronization source
 * **burstPacketsLost**: The total number of packets lost in burst (RFC6958)
 * **burstPacketsDiscarded**: The total number of packets discarded in burst (RFC6958)
 * **burstLossCount**: The total number of burst happened causes burstPacketsLost on the corresponding synchronization source
 * **burstDiscardCount**: The total number of burst happened causes burstPacketsDiscarded on the corresponding synchronization source
 * **burstLossRate**: The fraction of RTP packets lost during bursts proportionally to the total number of RTP packets expected in the bursts on the corresponding synchronization source
 * **burstDiscardRate**: The fraction of RTP packets discarded during bursts proportionally to the total number of RTP packets expected in the bursts on the corresponding synchronization source
 * **gapLossRate**: The fraction of RTP packets lost during gap proportionally to the total number of RTP packets expected in the bursts on the corresponding synchronization source
 * **gapDiscardRate**: The fraction of RTP packets discarded during gap proportionally to the total number of RTP packets expected in the bursts on the corresponding synchronization source
 * **framesDropped**: The total number of frames dropped at decoding process on the corresponding synchronization source
 * **partialFramesLost**: The total number of partial frames lost at decoding process on the corresponding synchronization source
 * **fullFramesLost**: The total number of full frames lost at decoding process on the corresponding synchronization source
 * **framesDecoded**: Indicate the number of frames completly and without error decoded on the corresponded synchronization source (ssrc)
 * **keyFramesDecoded**: Indicate the number of keyframes received on the corresponded synchronization source (ssrc)
 * **frameWidth**: Indicate the width of the frame received on the corresponded synchronization source (ssrc)
 * **frameHeight**: Indicate the height of the frame received on the corresponded synchronization source (ssrc)
 * **frameBitDepth**: Indicate the bit depth per pixel of the last decoded frame received on the corresponded synchronization source (ssrc)
 * **framesPerSecond**: Indicate the number of decoded frames in the last second received on the corresponded synchronization source (ssrc)
 * **qpSum**: sum of QP values of frames decoded on the corresponded synchronization source (ssrc)
 * **totalDecodeTime**: The total number of seconds spent on decoding frames on the corresponded synchronization source (ssrc)
 * **totalInterFrameDelay**: The total number of inter frame delay on the corresponded synchronization source (ssrc)
 * **totalSquaredInterFrameDelay**: The total number of inter frame delay squere on the corresponded synchronization source (ssrc) Useful for variance calculation for interframe delays
 * **lastPacketReceivedTimestamp**: Represents the timestamp at which the last packet was received on the corresponded synchronization source (ssrc)
 * **averageRtcpInterval**: The average RTCP interval between two consecutive compound RTCP packets sent for the corresponding synchronization source (ssrc)
 * **headerBytesReceived**: Total number of RTP header and padding bytes received over the corresponding synchronization source (ssrc)
 * **fecPacketsReceived**: Total number of FEC packets received over the corresponding synchronization source (ssrc)
 * **fecPacketsDiscarded**: Total number of FEC packets discarded over the corresponding synchronization source (ssrc) due to 1) late arrive; 2) the target RTP packet has already been repaired.
 * **bytesReceived**: Total number of bytes received over the corresponding synchronization source (ssrc) due to 1) late arrive; 2) the target RTP packet has already been repaired.
 * **packetsFailedDecryption**: Total number of packets received and failed to decrypt over the corresponding synchronization source (ssrc) due to 1) late arrive; 2) the target RTP packet has already been repaired.
 * **packetsDuplicated**: Total number of packets identified as duplicated over the corresponding synchronization source (ssrc).
 * **perDscpPacketsReceived**: The total number of DSCP flagged RTP packets received over the corresponding synchronization source (ssrc)
 * **firCount**: Count the total number of Full Intra Request sent by this receiver and belongs to the corresponded synchronization source (ssrc)
 * **pliCount**: Count the total number of Picture Loss Indication sent by this receiver and belongs to the corresponded synchronization source (ssrc)
 * **nackCount**: Count the total number of Negative ACKnowledgement (NACK) packets sent and belongs to the corresponded synchronization source (ssrc)
 * **sliCount**: Count the total number of Slice Loss Indication sent by this receiver and belongs to the corresponded synchronization source (ssrc)
 * **totalProcessingDelay**: The total processing delay in seconds spend on buffering RTP packets from received up until packets are decoded
 * **estimatedPlayoutTimestamp**: The estimated playout time of the corresponded synchronization source
 * **jitterBufferDelay**: The total time of RTP packets spent in jitterbuffer waiting for frame completion due to network uncertenity.
 * **jitterBufferEmittedCount**: The total number of audio samples or video frames that have come out of the jitter buffer on the corresponded synchronization source (ssrc)
 * **framesReceived**: Represents the total number of complete frames received on the corresponded synchronization source (ssrc)
 * **decoderImplementation**: Indicate the name of the decoder implementation library
 * **packetsSent**: Total number of RTP packets sent at the remote endpoint to this endpoint on this synchronization source
 * **bytesSent**: Total number of payload bytes sent at the remote endpoint to this endpoint on this synchronization source
 * **remoteTimestamp**: The timestamp corresnponds to the time in UTC Epoch the remote endpoint reported the statistics belong to the sender side and correspond to the synchronization source (ssrc)
 * **reportsSent**: The number of SR reports the remote endpoint sent corresponded to synchronization source (ssrc) this report belongs to
 * **ended**: Flag represents if the receiver ended the media stream track or not.
 * **payloadType**: The type of the payload the RTP packet SSRC belongs to
 * **mimeType**: the MIME type of the codec (e.g.: video/vp8)
 * **clockRate**: The negotiated clock rate the RTP timestamp is generated of
 * **sdpFmtpLine**: The a=fmtp line in the SDP corresponding to the codec
ObserverEventReport
 * **serviceId**: The unique identifier of the service
 * **timestamp**: The timestamp when the corresponded data is generated for the report (UTC Epoch in ms)
 * **callId**: The generated unique identifier of the call
 * **name**: The name of the event
 * **mediaUnitId**: The media unit id the report belongs to
 * **marker**: The marker the originated sample is reported with
 * **roomId**: webrtc app provided room id
 * **clientId**: The generated unique identifier of the client
 * **userId**: webrtc app provided user identifier
 * **peerConnectionId**: The unique identifier of the peer connection
 * **sampleTimestamp**: The timestamp of the sample the event related to
 * **sampleSeq**: The sequence number of the sample the event may related to
 * **message**: the human readable message of the event
 * **value**: the value of the event
 * **attachments**: attachment the event may created with
OutboundAudioTrackReport
 * **serviceId**: The unique identifier of the service
 * **mediaUnitId**: The media unit id the report belongs to
 * **timestamp**: The timestamp when the corresponded data is generated for the report (UTC Epoch in ms)
 * **callId**: The generated unique identifier of the call
 * **clientId**: The generated unique identifier of the client
 * **peerConnectionId**: The unique identifier of the peer connection
 * **sampleSeq**: The sequence number of the sample the report is generated from
 * **ssrc**: The RTP SSRC field
 * **marker**: The marker the originated sample is reported with
 * **roomId**: webrtc app provided room id
 * **userId**: webrtc app provided user identifier
 * **label**: The webrtc app provided label the peer connection is labeled with
 * **trackId**: The id of the track
 * **sfuStreamId**: The id of the Sfu stream corresponds to the outbound track
 * **packetsSent**: The total number of packets sent on the corresponded synchronization source
 * **bytesSent**: The total number of bytes sent on the corresponded synchronization source
 * **rid**:  The rid encoding parameter of the corresponded synchronization source
 * **lastPacketSentTimestamp**:  the timestamp the last packet was sent. (UTC epoch in ms)
 * **headerBytesSent**: Total number of RTP header and padding bytes sent over the corresponding synchronization source (ssrc)
 * **packetsDiscardedOnSend**: Total number of RTP packets discarded at sender side over the corresponding synchronization source (ssrc)
 * **bytesDiscardedOnSend**: Total number of RTP bytes discarded at sender side over the corresponding synchronization source (ssrc)
 * **fecPacketsSent**: Total number of FEC packets sent over the corresponding synchronization source (ssrc)
 * **retransmittedPacketsSent**: Total number of retransmitted packets sent over the corresponding synchronization source (ssrc).
 * **retransmittedBytesSent**: Total number of retransmitted bytes sent over the corresponding synchronization source (ssrc).
 * **targetBitrate**: Reflects the current encoder target in bits per second.
 * **totalEncodedBytesTarget**: The total number of bytes of RTP coherent frames encoded completly depending on the frame size the encoder targets
 * **totalSamplesSent**: The total number of samples sent over the corresponding synchronization source
 * **samplesEncodedWithSilk**: The total number of samples encoded by SILK portion in opus sent over the corresponding synchronization source
 * **samplesEncodedWithCelt**: The total number of samples encoded by CELT portion in opus sent over the corresponding synchronization source
 * **voiceActivityFlag**: Indicate if the last RTP packet sent contained voice activity based on the presence of the V bit in the extension header
 * **totalPacketSendDelay**: The total number of delay packets buffered at the sender side in seconds over the corresponding synchronization source
 * **averageRtcpInterval**: The average RTCP interval between two consecutive compound RTCP packets sent for the corresponding synchronization source (ssrc)
 * **perDscpPacketsSent**: The total number of DSCP flagged RTP packets sent over the corresponding synchronization source (ssrc)
 * **nackCount**: Count the total number of Negative ACKnowledgement (NACK) packets received over the corresponding synchronization source (ssrc)
 * **encoderImplementation**: Indicate the name of the encoder implementation library
 * **packetsReceived**: The total number of packets received on the corresponded synchronization source
 * **packetsLost**: The total number of bytes received on the corresponded synchronization source
 * **jitter**: The corresponded synchronization source reported jitter
 * **packetsDiscarded**: The total number of packets missed the playout point and therefore discarded by the jitterbuffer
 * **packetsRepaired**: The total number of packets repaired by either FEC or due to retransmission on the corresponded synchronization source
 * **burstPacketsLost**: The total number of packets lost in burst (RFC6958)
 * **burstPacketsDiscarded**: The total number of packets discarded in burst (RFC6958)
 * **burstLossCount**: The total number of burst happened causes burstPacketsLost on the corresponding synchronization source
 * **burstDiscardCount**: The total number of burst happened causes burstPacketsDiscarded on the corresponding synchronization source
 * **burstLossRate**: The fraction of RTP packets lost during bursts proportionally to the total number of RTP packets expected in the bursts on the corresponding synchronization source
 * **burstDiscardRate**: The fraction of RTP packets discarded during bursts proportionally to the total number of RTP packets expected in the bursts on the corresponding synchronization source
 * **gapLossRate**: The fraction of RTP packets lost during gap proportionally to the total number of RTP packets expected in the bursts on the corresponding synchronization source
 * **gapDiscardRate**: The fraction of RTP packets discarded during gap proportionally to the total number of RTP packets expected in the bursts on the corresponding synchronization source
 * **roundTripTime**: RTT measurement in seconds based on (most likely) SR, and RR belongs to the corresponded synchronization source
 * **totalRoundTripTime**: The sum of RTT measurements belongs to the corresponded synchronization source
 * **fractionLost**: The receiver reported fractional lost belongs to the corresponded synchronization source
 * **reportsReceived**: The total number of RR reports received, which is the base of the remote inbound calculation on this source
 * **roundTripTimeMeasurements**: The total number of calculated RR measurements received on this source
 * **relayedSource**: True if the corresponded media source is remote, false otherwise (or null depending on browser and version)
 * **audioLevel**: Represents the audio level reported by the media source
 * **totalAudioEnergy**: Represents the energy level reported by the media source
 * **totalSamplesDuration**: Represents the total duration of the audio samples the media source actually transconverted in seconds
 * **echoReturnLoss**: Represents the echo cancellation in decibels corresponded to the media source.
 * **echoReturnLossEnhancement**: Represents the echo cancellation in decibels added as a postprocessing by the library after the audio is catched from the emdia source.
 * **ended**: Flag represents if the sender ended the media stream track or not.
 * **payloadType**: The type of the payload the RTP packet SSRC belongs to
 * **mimeType**: the MIME type of the codec (e.g.: video/vp8)
 * **clockRate**: The negotiated clock rate the RTP timestamp is generated of
 * **channels**: The number of channels for audio is used (in stereo it is 2, otherwise it is most likely null)
 * **sdpFmtpLine**: The a=fmtp line in the SDP corresponding to the codec
OutboundVideoTrackReport
 * **serviceId**: The unique identifier of the service
 * **mediaUnitId**: The media unit id the report belongs to
 * **timestamp**: The timestamp when the corresponded data is generated for the report (UTC Epoch in ms)
 * **callId**: The generated unique identifier of the call
 * **clientId**: The generated unique identifier of the client
 * **peerConnectionId**: The unique identifier of the peer connection
 * **sampleSeq**: The sequence number of the sample the report is generated from
 * **ssrc**: The RTP SSRC field
 * **marker**: The marker the originated sample is reported with
 * **roomId**: webrtc app provided room id
 * **userId**: webrtc app provided user identifier
 * **label**: The webrtc app provided label the peer connection is labeled with
 * **trackId**: The id of the track
 * **sfuStreamId**: The id of the Sfu stream corresponds to the outbound track
 * **packetsSent**: The total number of packets sent on the corresponded synchronization source
 * **bytesSent**: The total number of bytes sent on the corresponded synchronization source
 * **rid**:  The rid encoding parameter of the corresponded synchronization source
 * **lastPacketSentTimestamp**:  the timestamp the last packet was sent. (UTC epoch in ms)
 * **headerBytesSent**: Total number of RTP header and padding bytes sent over the corresponding synchronization source (ssrc)
 * **packetsDiscardedOnSend**: Total number of RTP packets discarded at sender side over the corresponding synchronization source (ssrc)
 * **bytesDiscardedOnSend**: Total number of RTP bytes discarded at sender side over the corresponding synchronization source (ssrc)
 * **fecPacketsSent**: Total number of FEC packets sent over the corresponding synchronization source (ssrc)
 * **retransmittedPacketsSent**: Total number of retransmitted packets sent over the corresponding synchronization source (ssrc).
 * **retransmittedBytesSent**: Total number of retransmitted bytes sent over the corresponded synchronization source (ssrc).
 * **targetBitrate**: Reflects the current encoder target in bits per second.
 * **totalEncodedBytesTarget**: The total number of bytes of RTP coherent frames encoded completly depending on the frame size the encoder targets
 * **frameWidth**: Represents the height of the last encoded frame sent over the corresponded synchronization source
 * **frameHeight**: Represents the width of the last encoded frame sent over the corresponded synchronization source
 * **frameBitDepth**: Represents the bit depth per pixel of the last encoded frame sent over the corresponded synchronization source
 * **framesPerSecond**: The number of encoded frames over the last second sent over the corresponded synchronization source
 * **framesSent**: The number of frames sent over the corresponded synchronization source
 * **hugeFramesSent**: The number of huge frames (2.5x greater than the average size of frame) sent over the corresponded synchronization source
 * **framesEncoded**: The number of frames encoded over the corresponded synchronization source
 * **keyFramesEncoded**: The number of keyframes sent over the corresponded synchronization source
 * **framesDiscardedOnSend**: The number of frames discarded before sending over the corresponded synchronization source
 * **qpSum**: The sum of QP values encoded by the encoder corresponded to the synchronization source
 * **totalEncodeTime**: The sum of encoding time spent by the encoder corresponded to the synchronization source
 * **totalPacketSendDelay**: The total number of delay packets buffered at the sender side in seconds over the corresponding synchronization source
 * **averageRtcpInterval**: The average RTCP interval between two consecutive compound RTCP packets sent for the corresponding synchronization source (ssrc)
 * **qualityLimitationDurationCPU**: Time elapsed in seconds when the the corresponding synchronization source (ssrc) was in a limited state due to CPU
 * **qualityLimitationDurationNone**: Time elapsed in seconds when the the corresponding synchronization source (ssrc) was not in a limited state
 * **qualityLimitationDurationBandwidth**: Time elapsed in seconds when the the corresponding synchronization source (ssrc) was in a limited state becasue of bandwidth
 * **qualityLimitationDurationOther**: Time elapsed in seconds when the the corresponding synchronization source (ssrc) was in a limited state becaue of other factor
 * **qualityLimitationReason**: Indicate a reason for the corresponding synchronization source (ssrc) quality is limited
 * **qualityLimitationResolutionChanges**: The number of quality limiatation changes happened for the corresponding synchronization source (ssrc)
 * **perDscpPacketsSent**: The total number of DSCP flagged RTP packets sent over the corresponding synchronization source (ssrc)
 * **nackCount**: Count the total number of Negative ACKnowledgement (NACK) packets received over the corresponding synchronization source (ssrc)
 * **firCount**: The number of full inter requests happened over the corresponding synchronization source (ssrc)
 * **pliCount**: The number of picture loss indication happened received over the corresponding synchronization source (ssrc)
 * **sliCount**: The number of slice loss indication happened over the corresponding synchronization source (ssrc)
 * **encoderImplementation**: Indicate the name of the encoder implementation library
 * **packetsReceived**: The total number of packets received on the corresponded synchronization source
 * **packetsLost**: The total number of bytes received on the corresponded synchronization source
 * **jitter**: The corresponded synchronization source reported jitter
 * **packetsDiscarded**: The total number of packets missed the playout point and therefore discarded by the jitterbuffer
 * **packetsRepaired**: The total number of packets repaired by either FEC or due to retransmission on the corresponded synchronization source
 * **burstPacketsLost**: The total number of packets lost in burst (RFC6958)
 * **burstPacketsDiscarded**: The total number of packets discarded in burst (RFC6958)
 * **burstLossCount**: The total number of burst happened causes burstPacketsLost on the corresponding synchronization source
 * **burstDiscardCount**: The total number of burst happened causes burstPacketsDiscarded on the corresponding synchronization source
 * **burstLossRate**: The fraction of RTP packets lost during bursts proportionally to the total number of RTP packets expected in the bursts on the corresponding synchronization source
 * **burstDiscardRate**: The fraction of RTP packets discarded during bursts proportionally to the total number of RTP packets expected in the bursts on the corresponding synchronization source
 * **gapLossRate**: The fraction of RTP packets lost during gap proportionally to the total number of RTP packets expected in the bursts on the corresponding synchronization source
 * **gapDiscardRate**: The fraction of RTP packets discarded during gap proportionally to the total number of RTP packets expected in the bursts on the corresponding synchronization source
 * **framesDropped**: The number of frames dropped over the corresponded synchronization source
 * **partialFramesLost**: The number of partial frames lost over the corresponded synchronization source
 * **fullFramesLost**: The number of full frames lost over the corresponded synchronization source
 * **roundTripTime**: RTT measurement in seconds based on (most likely) SR, and RR belongs to the corresponded synchronization source
 * **totalRoundTripTime**: The sum of RTT measurements belongs to the corresponded synchronization source
 * **fractionLost**: The receiver reported fractional lost belongs to the corresponded synchronization source
 * **reportsReceived**: The total number of RR reports received, which is the base of the remote inbound calculation on this source
 * **roundTripTimeMeasurements**: The total number of calculated RR measurements received on this source
 * **relayedSource**: True if the corresponded media source is remote, false otherwise (or null depending on browser and version)
 * **encodedFrameWidth**: Indicate the encoded width of the frame received on the corresponded synchronization source (ssrc)
 * **encodedFrameHeight**: Indicate the encoded height of the frame received on the corresponded synchronization source (ssrc)
 * **encodedFrameBitDepth**: Indicate the encoded bit depth per pixel of the last decoded frame received on the corresponded synchronization source (ssrc)
 * **encodedFramesPerSecond**: Indicate the encoded number of decoded frames in the last second received on the corresponded synchronization source (ssrc)
 * **ended**: Flag represents if the sender ended the media stream track or not.
 * **payloadType**: The type of the payload the RTP packet SSRC belongs to
 * **mimeType**: the MIME type of the codec (e.g.: video/vp8)
 * **clockRate**: The negotiated clock rate the RTP timestamp is generated of
 * **channels**: The number of channels for audio is used (in stereo it is 2, otherwise it is most likely null)
 * **sdpFmtpLine**: The a=fmtp line in the SDP corresponding to the codec
Report
 * **type**: The type of the report
 * **payload**: The payload of contans the actual report
 * **schemaVersion**: The version of the schema the payload holds
SfuEventReport
 * **serviceId**: The service id the report belongs to
 * **timestamp**: The timestamp when the corresponded data is generated for the report (UTC Epoch in ms)
 * **name**: The name of the event. Possible values are: SFU_JOINED, SFU_LEFT, SFU_TRANSPORT_OPENED, SFU_TRANSPORT_CLOSED, SFU_RTP_STREAM_ADDED, SFU_RTP_STREAM_REMOVED
 * **mediaUnitId**: The media unit id the report belongs to
 * **marker**: The marker the originated sample is reported with
 * **sfuId**: The generated unique identifier of the SFU
 * **callId**: The callId the event belongs to
 * **transportId**: SFU provided transport identifier
 * **mediaStreamId**: Unique identifier of the SFU stream id the rtp pad belongs to
 * **mediaSinkId**: Unique identifier of the SFU stream id the rtp pad belongs to
 * **sctpStreamId**: Unique identifier of the SCTP stream the event is related to
 * **rtpPadId**: Unique identifier of the Sfu Pad the event is related to
 * **message**: the human readable message of the event
 * **value**: the value of the event
 * **attachments**: attachment the event may created with
SfuExtensionReport
 * **serviceId**: The service id the report belongs to
 * **timestamp**: The timestamp when the corresponded data is generated for the report (UTC Epoch in ms)
 * **extensionType**: The name of the event
 * **mediaUnitId**: The media unit id the report belongs to
 * **marker**: The marker the originated sample is reported with
 * **sfuId**: The generated unique identifier of the SFU
 * **payload**: the human readable message of the event
SfuInboundRtpPadReport
 * **serviceId**: The service id the report belongs to
 * **mediaUnitId**: The media unit id the report belongs to
 * **sfuId**: The provided unique identifier of the SFU
 * **timestamp**: The timestamp when the corresponded data is generated for the report (UTC Epoch in ms)
 * **transportId**: The id of the transport the RTP stream uses.
 * **sfuStreamId**: Unique identifier of the Sfu stream the event is related to
 * **rtpPadId**: The id of RTP pad.
 * **ssrc**: The synchronization source id of the RTP stream
 * **marker**: The marker the originated sample is reported with
 * **internal**: Flag indicate if the sfu rtp pad is used as an internal rtp session between SFUs
 * **remoteSfuId**: only added if it is internal. The id of the remote Sfu that outbound rtp pad matched with this internal inbound rtp pad
 * **remoteTransportId**: only added if it is internal. The id of the remote transportId that outbound rtp pad matched with this internal inbound rtp pad
 * **remoteSinkId**: only added if it is internal. The id of the remote sinkId that outbound rtp pad matched with this internal inbound rtp pad
 * **remoteRtpPadId**: only added if it is internal. The id of the remote outbound rtp pad matched with this internal inbound rtp pad
 * **trackId**: The id of the track the RTP stream related to at the client side
 * **clientId**: If the track id was provided by the Sfu, the observer can fill up the information of which client it belongs to
 * **callId**: The callId the event belongs to
 * **mediaType**: the type of the media the stream carries ("audio" or "video")
 * **payloadType**: The payload type field of the RTP header
 * **mimeType**: The negotiated mimeType in the SDP
 * **clockRate**: The clock rate of the media source the RTP header carries
 * **sdpFmtpLine**: The actual SDP line from the negotiation related to this RTP stream
 * **rid**:  The rid parameter of the corresponded RTP stream
 * **rtxSsrc**: If RTX is negotiated as a separate stream, this is the SSRC of the RTX stream that is associated with this stream's ssrc. 
 * **targetBitrate**: he bitrate the corresponded stream targets.
 * **voiceActivityFlag**: The RTP header V flag indicate of the activity of the media source by the media codec if the RTP transport ships it through
 * **firCount**: The total number FIR packets sent from this endpoint to the source on the corresponded RTP stream. Only for Video streams
 * **pliCount**: The total number of Picture Loss Indication sent on the corresponded RTP stream. Only for Video streams
 * **nackCount**: The total number of negative acknowledgement received on the corresponded RTP stream.
 * **sliCount**: The total number of SLI indicator sent from the endpoint on the corresponded RTP stream. Only for Audio stream
 * **packetsLost**: The total number of packets lost on the corresponded RTP stream.
 * **packetsReceived**: The total number of packets received on the corresponded RTP stream.
 * **packetsDiscarded**: The total number of discarded packets on the corresponded RTP stream.
 * **packetsRepaired**: The total number of packets repaired by either retransmission or FEC on the corresponded RTP stream.
 * **packetsFailedDecryption**: The total number of packets failed to be decrypted on the corresponded RTP stream.
 * **packetsDuplicated**: The total number of duplicated packets appeared on the corresponded RTP stream.
 * **fecPacketsReceived**: The total number of FEC packets received on the corresponded RTP stream.
 * **fecPacketsDiscarded**: The total number of FEC packets discarded on the corresponded RTP stream.
 * **bytesReceived**: The total amount of payload bytes received on the corresponded RTP stream.
 * **rtcpSrReceived**: The total number of SR reports received by the corresponded RTP stream
 * **rtcpRrSent**: The total number of RR reports sent on the corresponded RTP stream
 * **rtxPacketsReceived**: If rtx packets are sent or received on the same stream then this number indicates how may has been sent
 * **rtxPacketsDiscarded**: If rtx packets are received on the same stream then this number indicates how may has been discarded
 * **framesReceived**: The number of frames received on the corresponded RTP stream
 * **framesDecoded**: Indicate the number of frames the Sfu has been decoded
 * **keyFramesDecoded**: Indicate the number of keyframes the Sfu has been decoded
 * **fractionLost**: The calculated fractionLost of the stream
 * **jitter**: The calculated jitter of the stream
 * **roundTripTime**: The calculated RTT of the stream
SfuMetaReport
 * **serviceId**: The service id the report belongs to
 * **timestamp**: The timestamp when the corresponded data is generated for the report (UTC Epoch in ms)
 * **mediaUnitId**: The media unit id the report belongs to
 * **marker**: The marker the originated sample is reported with
 * **sfuId**: The generated unique identifier of the SFU
 * **callId**: The callId the event belongs to
 * **transportId**: SFU provided transport identifier
 * **mediaStreamId**: Unique identifier of the SFU stream id the rtp pad belongs to
 * **mediaSinkId**: Unique identifier of the SFU stream id the rtp pad belongs to
 * **sctpStreamId**: Unique identifier of the SCTP stream the event is related to
 * **rtpPadId**: Unique identifier of the Sfu Pad the event is related to
 * **type**: The type of the meta data reported for the peer connection
 * **payload**: The payload for the metadata reported for the peeer connection
SfuOutboundRtpPadReport
 * **serviceId**: The service id the report belongs to
 * **mediaUnitId**: The media unit id the report belongs to
 * **sfuId**: The provided unique identifier of the SFU
 * **timestamp**: The timestamp when the corresponded data is generated for the report (UTC Epoch in ms)
 * **transportId**: The id of the transport the RTP stream uses.
 * **sfuStreamId**: Unique identifier of the Sfu stream the event is related to
 * **sfuSinkId**: Unique identifier of the Sfu sink the event is related to
 * **rtpPadId**: The id of RTP pad.
 * **ssrc**: The synchronization source id of the RTP stream
 * **marker**: The marker the originated sample is reported with
 * **internal**: Flag indicate if the sfu rtp pad is used as an internal rtp session between SFUs
 * **callId**: The callId the event belongs to
 * **clientId**: If the track id was provided by the Sfu, the observer can fill up the information of which client it belongs to
 * **trackId**: The id of the track the RTP stream related to at the client side
 * **mediaType**: the type of the media the stream carries ("audio" or "video")
 * **payloadType**: The payload type field of the RTP header
 * **mimeType**: The negotiated mimeType in the SDP
 * **clockRate**: The clock rate of the media source the RTP header carries
 * **sdpFmtpLine**: The actual SDP line from the negotiation related to this RTP stream
 * **rid**:  The rid parameter of the corresponded RTP stream
 * **rtxSsrc**: If RTX is negotiated as a separate stream, this is the SSRC of the RTX stream that is associated with this stream's ssrc. 
 * **targetBitrate**: he bitrate the corresponded stream targets.
 * **voiceActivityFlag**: The RTP header V flag indicate of the activity of the media source by the media codec if the RTP transport ships it through
 * **firCount**: The total number FIR packets sent from this endpoint to the source on the corresponded RTP stream. Only for Video streams
 * **pliCount**: The total number of Picture Loss Indication sent on the corresponded RTP stream. Only for Video streams
 * **nackCount**: The total number of negative acknowledgement received on the corresponded RTP stream.
 * **sliCount**: The total number of SLI indicator sent from the endpoint on the corresponded RTP stream. Only for Audio stream
 * **packetsLost**: The total number of packets lost on the corresponded RTP stream.
 * **packetsSent**: The total number of packets sent on the corresponded RTP stream.
 * **packetsDiscarded**: The total number of discarded packets on the corresponded RTP stream.
 * **packetsRetransmitted**: The total number of packets retransmitted on the corresponded RTP stream.
 * **packetsFailedEncryption**: The total number of packets failed to be encrypted on the corresponded RTP stream.
 * **packetsDuplicated**: The total number of duplicated packets appeared on the corresponded RTP stream.
 * **fecPacketsSent**: The total number of FEC packets sent on the corresponded RTP stream.
 * **fecPacketsDiscarded**: The total number of FEC packets discarded on the corresponded RTP stream.
 * **bytesSent**: The total amount of payload bytes sent on the corresponded RTP stream.
 * **rtcpSrSent**: The total number of SR reports sent by the corresponded RTP stream
 * **rtcpRrReceived**: The total number of RR reports received on the corresponded RTP stream
 * **rtxPacketsSent**: If rtx packets sent on the same stream then this number indicates how may has been sent
 * **rtxPacketsDiscarded**: If rtx packets are received on the same stream then this number indicates how may has been discarded
 * **framesSent**: The number of frames sent on the corresponded RTP stream
 * **framesEncoded**: Indicate the number of frames the Sfu has been encoded
 * **keyFramesEncoded**: Indicate the number of keyframes the Sfu has been encoded on the corresponded RTP stream
 * **roundTripTime**: The calculated RTT of the stream
SfuSctpStreamReport
 * **serviceId**: The service id the report belongs to
 * **mediaUnitId**: The media unit id the report belongs to
 * **sfuId**: The provided unique identifier of the SFU
 * **timestamp**: The timestamp when the corresponded data is generated for the report (UTC Epoch in ms)
 * **transportId**: The id of the transport the RTP stream uses.
 * **streamId**: The id of the sctp stream
 * **marker**: The marker the originated sample is reported with
 * **internal**: Flag indicate if the sctp channel is used as an internal transport between SFUs
 * **callId**: The generated unique identifier of the call
 * **roomId**: webrtc app provided room id
 * **label**: The label of the sctp stream
 * **protocol**: The protocol used to establish an sctp stream
 * **sctpSmoothedRoundTripTime**: The latest smoothed round-trip time value, corresponding to spinfo_srtt defined in [RFC6458] but converted to seconds. If there has been no round-trip time measurements yet, this value is undefined.
 * **sctpCongestionWindow**: The latest congestion window, corresponding to spinfo_cwnd defined in [RFC6458].
 * **sctpReceiverWindow**: The latest receiver window, corresponding to sstat_rwnd defined in [RFC6458].
 * **sctpMtu**: The latest maximum transmission unit, corresponding to spinfo_mtu defined in [RFC6458].
 * **sctpUnackData**: The number of unacknowledged DATA chunks, corresponding to sstat_unackdata defined in [RFC6458].
 * **messageReceived**: The number of message received on the corresponded SCTP stream.
 * **messageSent**: The number of message sent on the corresponded SCTP stream.
 * **bytesReceived**: The number of bytes received on the corresponded SCTP stream.
 * **bytesSent**: The number of bytes sent on the corresponded SCTP stream.
SFUTransportReport
 * **serviceId**: The service id the report belongs to
 * **mediaUnitId**: The media unit id the report belongs to
 * **sfuId**: The provided unique identifier of the SFU
 * **timestamp**: The timestamp when the corresponded data is generated for the report (UTC Epoch in ms)
 * **transportId**: The generated unique identifier of the transport
 * **marker**: The marker the originated sample is reported with
 * **internal**: Flag indicate if the sfu transport is used as an internal transport between SFUs
 * **callId**: The generated unique identifier of the call
 * **roomId**: webrtc app provided room id
 * **dtlsState**: Represent the current value of the state attribute of the underlying RTCDtlsTransport.
 * **iceState**: Represent the current value of the state attribute of the underlying RTCIceTransport
 * **sctpState**: Represents the the current value of the SCTP state of the transport of the SFU
 * **iceRole**: Represent the current value of the role SFU takes place in ICE
 * **localAddress**: The local address of the ICE candidate selected for the transport (IPv4, IPv6, FQDN)
 * **localPort**: The local port number
 * **protocol**: The protocol used by the transport
 * **remoteAddress**: The remote address of the ICE candidate selected for the transport (IPv4, IPv6, FQDN)
 * **remotePort**: The remote port number
 * **rtpBytesReceived**: The total amount of RTP bytes received on this transport
 * **rtpBytesSent**: The total amount of RTP bytes sent on this transport
 * **rtpPacketsReceived**: The total amount of RTP packets received on this transport
 * **rtpPacketsSent**: The total amount of RTP packets sent on this transport
 * **rtpPacketsLost**: The total amount of RTP packets lost on this transport
 * **rtxBytesReceived**: The total amount of RTX bytes received on this transport
 * **rtxBytesSent**: The total amount of RTX bytes sent on this transport
 * **rtxPacketsReceived**: The total amount of RTX packets received on this transport
 * **rtxPacketsSent**: The total amount of RTX packets sent on this transport
 * **rtxPacketsLost**: The total amount of RTX packets lost on this transport
 * **rtxPacketsDiscarded**: The total amount of RTX packets discarded on this transport
 * **sctpBytesReceived**: The total amount of SCTP bytes received on this transport
 * **sctpBytesSent**: The total amount of SCTP bytes sent on this transport
 * **sctpPacketsReceived**: The total amount of SCTP packets received on this transport
 * **sctpPacketsSent**: The total amount of SCTP packets sent on this transport
Controls
 * **close**: Indicate that the server should close the connection
 * **accessClaim**: Holds a new claim to process
Engine
 * **name**: The name of the Engine
 * **version**: The version of the engine
Platform
 * **type**: The name of the platform
 * **vendor**: The name of the vendor
 * **model**: The name of the model
Browser
 * **name**: The name of the operation system (e.g.: linux) the webrtc app uses
 * **version**: The version of the operation system
OperationSystem
 * **name**: The name of the operation system (e.g.: linux) the webrtc app uses
 * **version**: The version of the operation system
 * **versionName**: The name of the version of the operation system
MediaDevice
 * **id**: the provided id of the media input / output
 * **kind**: The media kind of the media device (Possible values are: videoinput,<br />audioinput,<br />audiooutput)
 * **label**: The name of the device
ExtensionStat
 * **type**: The type of the extension stats the custom app provides
 * **payload**: The payload of the extension stats the custom app provides
PeerConnectionTransport
 * **peerConnectionId**: The unique identifier of the peer connection
 * **label**: The webrtc app provided label the peer connection is marked with
 * **dataChannelsOpened**: Represents the number of unique RTCDataChannels that have entered the "open" state during their lifetime.
 * **dataChannelsClosed**: Represents the number of unique RTCDataChannels that had the "open" state, but now they are "closed"
 * **dataChannelsRequested**: Represents the number of unique RTCDataChannels successfully requested from RTCPeerConnection.
 * **dataChannelsAccepted**: Represents the number of unique RTCDataChannels signaled in a ondatachannel event on the RTCPeerConnection.
 * **packetsSent**: Represents the total number of packets sent on the corresponded transport
 * **packetsReceived**: Represents the total number of packets received on the corresponded transport
 * **bytesSent**: Represents the total amount of bytes sent on the corresponded transport
 * **bytesReceived**: Represents the total amount of bytes received on the corresponded transport
 * **iceRole**: Represent the current role of ICE under DTLS Transport
 * **iceLocalUsernameFragment**: Represent the current local username fragment used in message validation procedures for ICE under DTLS Transport
 * **dtlsState**: Represents the current state of DTLS for the peer connection transport layer
 * **iceState**: Represents the current transport state (RTCIceTransportState) of ICE for the peer connection transport layer
 * **tlsVersion**: Represents the version number of the TLS used in the corresponded transport
 * **dtlsCipher**: Represents the name of the DTLS cipher used in the corresponded transport
 * **srtpCipher**: Represents the name of the SRTP cipher used in the corresponded transport
 * **tlsGroup**: Represents the name of the IANA TLS Supported Groups used in the corresponded transport
 * **selectedCandidatePairChanges**: The total number of candidate pair changes over the peer connection
 * **localAddress**: The address of the candidate (IPv4, IPv6, FQDN)
 * **localPort**: The locally used port to communicate with the remote peer
 * **localProtocol**: The protocol used by the local endpoint for the corresponded transport
 * **localCandidateType**: The type of the ICE candidate used at the local endpoint on the corresponded transport
 * **localCandidateICEServerUrl**: The url of the ICE server used by the local endpoint on the corresponded transport
 * **localCandidateRelayProtocol**: The relay protocol of the ICE candidate used by the local endpoint on the corresponded transport
 * **remoteAddress**: The address of the candidate (IPv4, IPv6, FQDN)
 * **remotePort**: The remotely used port to communicate with the remote peer
 * **remoteProtocol**: The protocol used by the remote endpoint for the corresponded transport
 * **remoteCandidateType**: The type of the ICE candidate used at the remote endpoint on the corresponded transport
 * **remoteCandidateICEServerUrl**: The url of the ICE server used by the remote endpoint on the corresponded transport
 * **remoteCandidateRelayProtocol**: The relay protocol of the ICE candidate used by the remote endpoint on the corresponded transport
 * **candidatePairState**: The state of ICE Candidate Pairs (RTCStatsIceCandidatePairState) on the corresponded transport
 * **candidatePairPacketsSent**: The total number of packets sent using the last selected candidate pair over the corresponded transport
 * **candidatePairPacketsReceived**: The total number of packets received using the last selected candidate pair over the corresponded transport
 * **candidatePairBytesSent**: The total number of bytes sent using the last selected candidate pair over the corresponded transport
 * **candidatePairBytesReceived**: The total number of bytes received using the last selected candidate pair over the corresponded transport
 * **candidatePairLastPacketSentTimestamp**: Represents the timestamp at which the last packet was sent on the selected candidate pair, excluding STUN packets over the corresponded transport (UTC Epoch in ms)
 * **candidatePairLastPacketReceivedTimestamp**: Represents the timestamp at which the last packet was received on the selected candidate pair, excluding STUN packets over the corresponded transport (UTC Epoch in ms)
 * **candidatePairFirstRequestTimestamp**: Represents the timestamp at which the first STUN request was sent on this particular candidate pair over the corresponded transport (UTC Epoch in ms)
 * **candidatePairLastRequestTimestamp**: Represents the timestamp at which the last STUN request was sent on this particular candidate pair over the corresponded transport (UTC Epoch in ms)
 * **candidatePairLastResponseTimestamp**: Represents the timestamp at which the last STUN response was received on this particular candidate pair over the corresponded transport (UTC Epoch in ms)
 * **candidatePairTotalRoundTripTime**: Represents the sum of all round trip time measurements in seconds since the beginning of the session, based on STUN connectivity check over the corresponded transport
 * **candidatePairCurrentRoundTripTime**: Represents the last round trip time measurements in seconds based on STUN connectivity check over the corresponded transport
 * **candidatePairAvailableOutgoingBitrate**: The sum of the underlying cc algorithm provided outgoing bitrate for the RTP streams over the corresponded transport
 * **candidatePairAvailableIncomingBitrate**: The sum of the underlying cc algorithm provided incoming bitrate for the RTP streams over the corresponded transport
 * **candidatePairCircuitBreakerTriggerCount**: The total number of circuit breaker triggered over the corresponded transport using the selected candidate pair
 * **candidatePairRequestsReceived**: Represents the total number of connectivity check requests received on the selected candidate pair using the corresponded transport
 * **candidatePairRequestsSent**: Represents the total number of connectivity check requests sent on the selected candidate pair using the corresponded transport
 * **candidatePairResponsesReceived**: Represents the total number of connectivity check responses received on the selected candidate pair using the corresponded transport
 * **candidatePairResponsesSent**: Represents the total number of connectivity check responses sent on the selected candidate pair using the corresponded transport
 * **candidatePairRetransmissionReceived**: Represents the total number of connectivity check retransmission received on the selected candidate pair using the corresponded transport
 * **candidatePairRetransmissionSent**: Represents the total number of connectivity check retransmission sent on the selected candidate pair using the corresponded transport
 * **candidatePairConsentRequestsSent**: Represents the total number of consent requests sent on the selected candidate pair using the corresponded transport
 * **candidatePairConsentExpiredTimestamp**: Represents the timestamp at which the latest valid STUN binding response expired on the selected candidate pair using the corresponded transport
 * **candidatePairBytesDiscardedOnSend**: Total amount of bytes for this candidate pair that have been discarded due to socket errors on the selected candidate pair using the corresponded transport
 * **candidatePairPacketsDiscardedOnSend**: Total amount of packets for this candidate pair that have been discarded due to socket errors on the selected candidate pair using the corresponded transport
 * **candidatePairRequestBytesSent**: Total number of bytes sent for connectivity checks on the selected candidate pair using the corresponded transport
 * **candidatePairConsentRequestBytesSent**: Total number of bytes sent for consent requests on the selected candidate pair using the corresponded transport
 * **candidatePairResponseBytesSent**: Total number of bytes sent for connectivity check responses on the selected candidate pair using the corresponded transport
 * **sctpSmoothedRoundTripTime**: The latest smoothed round-trip time value, corresponding to spinfo_srtt defined in [RFC6458] but converted to seconds. 
 * **sctpCongestionWindow**: The latest congestion window, corresponding to spinfo_cwnd.
 * **sctpReceiverWindow**: The latest receiver window, corresponding to sstat_rwnd.
 * **sctpMtu**: The latest maximum transmission unit, corresponding to spinfo_mtu.
 * **sctpUnackData**: The number of unacknowledged DATA chunks, corresponding to sstat_unackdata.
MediaSourceStat
 * **trackIdentifier**: The unique identifier of the corresponded media track
 * **kind**: The type of the media the Mediasource produces. (Possible values are: audio,<br />video)
 * **relayedSource**: Flag indicating if the media source is relayed or not, meaning the local endpoint is not the actual source of the media, but a proxy for that media.
 * **audioLevel**: The value is between 0..1 (linear), where 1.0 represents 0 dBov, 0 represents silence, and 0.5 represents approximately 6 dBSPL change in the sound pressure level from 0 dBov.
 * **totalAudioEnergy**: The audio energy of the media source. For calculation see www.w3.org/TR/webrtc-stats/#dom-rtcaudiosourcestats-totalaudioenergy
 * **totalSamplesDuration**: The duration of the audio type media source
 * **echoReturnLoss**: if echo cancellation is applied on the media source, then this number represents the loss calculation defined in www.itu.int/rec/T-REC-G.168-201504-I/en
 * **echoReturnLossEnhancement**: www.itu.int/rec/T-REC-G.168-201504-I/en
 * **width**: The width, in pixels, of the last frame originating from the media source
 * **height**: The height, in pixels, of the last frame originating from the media source
 * **bitDepth**: The bitDepth, in pixels, of the last frame originating from the media source
 * **frames**: The total number of frames originated from the media source
 * **framesPerSecond**:  The number of frames origianted from the media source in the last second
MediaCodecStats
 * **payloadType**: Payload type used in RTP encoding / decoding process.
 * **codecType**: Indicates the role of the codec (encode or decode) (Possible values are: encode,<br />decode)
 * **mimeType**: The MIME type of the media. eg.: audio/opus.
 * **clockRate**: the clock rate used in RTP transport to generate the timestamp for the carried frames
 * **channels**: Audio Only. Represnts the number of chanels an audio media source have. Only interesting if stereo is presented
 * **sdpFmtpLine**: The SDP line determines the codec
Certificate
 * **fingerprint**:  The fingerprint of the certificate.
 * **fingerprintAlgorithm**: The hash function used to generate the fingerprint.
 * **base64Certificate**: The DER encoded base-64 representation of the certificate.
 * **issuerCertificateId**: The id of the next certificate in the certificate chain
InboundAudioTrack
 * **ssrc**: The RTP SSRC field
 * **trackId**: The id of the track
 * **peerConnectionId**:  The unique generated identifier of the peer connection the inbound audio track belongs to
 * **remoteClientId**: The remote clientId the source outbound track belongs to
 * **sfuStreamId**: The id of the SFU stream this track is sinked from
 * **sfuSinkId**: The id of the sink this track belongs to in the SFU
 * **packetsReceived**: The total number of packets received on the corresponded synchronization source
 * **packetsLost**: The total number of bytes received on the corresponded synchronization source
 * **jitter**: The corresponded synchronization source reported jitter
 * **packetsDiscarded**: The total number of packets missed the playout point and therefore discarded by the jitterbuffer
 * **packetsRepaired**: The total number of packets repaired by either FEC or due to retransmission on the corresponded synchronization source
 * **burstPacketsLost**: The total number of packets lost in burst (RFC6958)
 * **burstPacketsDiscarded**: The total number of packets discarded in burst (RFC6958)
 * **burstLossCount**: The total number of burst happened causes burstPacketsLost on the corresponding synchronization source
 * **burstDiscardCount**: The total number of burst happened causes burstPacketsDiscarded on the corresponding synchronization source
 * **burstLossRate**: The fraction of RTP packets lost during bursts proportionally to the total number of RTP packets expected in the bursts on the corresponding synchronization source
 * **burstDiscardRate**: The fraction of RTP packets discarded during bursts proportionally to the total number of RTP packets expected in the bursts on the corresponding synchronization source
 * **gapLossRate**: The fraction of RTP packets lost during gap proportionally to the total number of RTP packets expected in the bursts on the corresponding synchronization source
 * **gapDiscardRate**: The fraction of RTP packets discarded during gap proportionally to the total number of RTP packets expected in the bursts on the corresponding synchronization source
 * **lastPacketReceivedTimestamp**: Represents the timestamp at which the last packet was received on the corresponded synchronization source (ssrc)
 * **averageRtcpInterval**: The average RTCP interval between two consecutive compound RTCP packets sent for the corresponding synchronization source (ssrc)
 * **headerBytesReceived**: Total number of RTP header and padding bytes received over the corresponding synchronization source (ssrc)
 * **fecPacketsReceived**: Total number of FEC packets received over the corresponding synchronization source (ssrc)
 * **fecPacketsDiscarded**: Total number of FEC packets discarded over the corresponding synchronization source (ssrc) due to 1) late arrive; 2) the target RTP packet has already been repaired.
 * **bytesReceived**: Total number of bytes received over the corresponding synchronization source (ssrc) due to 1) late arrive; 2) the target RTP packet has already been repaired.
 * **packetsFailedDecryption**: Total number of packets received and failed to decrypt over the corresponding synchronization source (ssrc) due to 1) late arrive; 2) the target RTP packet has already been repaired.
 * **packetsDuplicated**: Total number of packets identified as duplicated over the corresponding synchronization source (ssrc).
 * **perDscpPacketsReceived**: The total number of DSCP flagged RTP packets received over the corresponding synchronization source (ssrc)
 * **nackCount**: Count the total number of Negative ACKnowledgement (NACK) packets sent and belongs to the corresponded synchronization source (ssrc)
 * **totalProcessingDelay**: The total processing delay in seconds spend on buffering RTP packets from received up until packets are decoded
 * **estimatedPlayoutTimestamp**: The estimated playout time of the corresponded synchronization source
 * **jitterBufferDelay**: The total time of RTP packets spent in jitterbuffer waiting for frame completion due to network uncertenity.
 * **jitterBufferEmittedCount**: The total number of audio samples or video frames that have come out of the jitter buffer on the corresponded synchronization source (ssrc)
 * **decoderImplementation**: Indicate the name of the decoder implementation library
 * **voiceActivityFlag**: Indicate if the last RTP packet received contained voice activity based on the presence of the V bit in the extension header
 * **totalSamplesReceived**: The total number of audio samples received on the corresponded RTP stream
 * **totalSamplesDecoded**: The total number of samples decoded on the corresponded RTP stream
 * **samplesDecodedWithSilk**: The total number of samples decoded with SILK on the corresponded RTP stream
 * **samplesDecodedWithCelt**: The total number of samples decodedd with CELT on the corresponded RTP stream
 * **concealedSamples**: The total number of samples decoded by the media decoder from the corresponded RTP stream
 * **silentConcealedSamples**: The total number of samples concealed from the corresponded RTP stream
 * **concealmentEvents**: The total number of concealed event emitted to the media codec by the corresponded jitterbuffer
 * **insertedSamplesForDeceleration**: The total number of samples inserted to decelarete the audio playout (happens when the jitterbuffer detects a shrinking buffer and need to increase the jitter buffer delay)
 * **removedSamplesForAcceleration**: The total number of samples inserted to accelerate the audio playout (happens when the jitterbuffer detects a growing buffer and need to shrink the jitter buffer delay)
 * **packetsSent**: Total number of RTP packets sent at the remote endpoint to this endpoint on this synchronization source
 * **bytesSent**: Total number of payload bytes sent at the remote endpoint to this endpoint on this synchronization source
 * **remoteTimestamp**: The timestamp corresnponds to the time in UTC Epoch the remote endpoint reported the statistics belong to the sender side and correspond to the synchronization source (ssrc)
 * **reportsSent**: The number of SR reports the remote endpoint sent corresponded to synchronization source (ssrc) this report belongs to
 * **roundTripTime**: Estimated round trip time for the SR reports based on DLRR reports on the corresponded RTP stream
 * **totalRoundTripTime**:  Represents the cumulative sum of all round trip time measurements performed on the corresponded RTP stream
 * **roundTripTimeMeasurements**: Represents the total number of SR reports received with DLRR reports to be able to calculate the round trip time on the corresponded RTP stream
 * **ended**: Flag represents if the receiver ended the media stream track or not.
 * **payloadType**: The type of the payload the RTP packet SSRC belongs to
 * **mimeType**: the MIME type of the codec (e.g.: video/vp8)
 * **clockRate**: The negotiated clock rate the RTP timestamp is generated of
 * **channels**: The number of channels for audio is used (in stereo it is 2, otherwise it is most likely null)
 * **sdpFmtpLine**: The a=fmtp line in the SDP corresponding to the codec
InboundVideoTrack
 * **ssrc**: The RTP SSRC field
 * **trackId**: The id of the track
 * **peerConnectionId**:  The unique generated identifier of the peer connection the inbound audio track belongs to
 * **remoteClientId**: The remote clientId the source outbound track belongs to
 * **sfuStreamId**: The id of the SFU stream this track is sinked from
 * **sfuSinkId**: The id of the sink this track belongs to in the SFU
 * **packetsReceived**: The total number of packets received on the corresponded synchronization source
 * **packetsLost**: The total number of bytes received on the corresponded synchronization source
 * **jitter**: The corresponded synchronization source reported jitter
 * **packetsDiscarded**: The total number of packets missed the playout point and therefore discarded by the jitterbuffer
 * **packetsRepaired**: The total number of packets repaired by either FEC or due to retransmission on the corresponded synchronization source
 * **burstPacketsLost**: The total number of packets lost in burst (RFC6958)
 * **burstPacketsDiscarded**: The total number of packets discarded in burst (RFC6958)
 * **burstLossCount**: The total number of burst happened causes burstPacketsLost on the corresponding synchronization source
 * **burstDiscardCount**: The total number of burst happened causes burstPacketsDiscarded on the corresponding synchronization source
 * **burstLossRate**: The fraction of RTP packets lost during bursts proportionally to the total number of RTP packets expected in the bursts on the corresponding synchronization source
 * **burstDiscardRate**: The fraction of RTP packets discarded during bursts proportionally to the total number of RTP packets expected in the bursts on the corresponding synchronization source
 * **gapLossRate**: The fraction of RTP packets lost during gap proportionally to the total number of RTP packets expected in the bursts on the corresponding synchronization source
 * **gapDiscardRate**: The fraction of RTP packets discarded during gap proportionally to the total number of RTP packets expected in the bursts on the corresponding synchronization source
 * **lastPacketReceivedTimestamp**: Represents the timestamp at which the last packet was received on the corresponded synchronization source (ssrc)
 * **averageRtcpInterval**: The average RTCP interval between two consecutive compound RTCP packets sent for the corresponding synchronization source (ssrc)
 * **headerBytesReceived**: Total number of RTP header and padding bytes received over the corresponding synchronization source (ssrc)
 * **fecPacketsReceived**: Total number of FEC packets received over the corresponding synchronization source (ssrc)
 * **fecPacketsDiscarded**: Total number of FEC packets discarded over the corresponding synchronization source (ssrc) due to 1) late arrive; 2) the target RTP packet has already been repaired.
 * **bytesReceived**: Total number of bytes received over the corresponding synchronization source (ssrc) due to 1) late arrive; 2) the target RTP packet has already been repaired.
 * **packetsFailedDecryption**: Total number of packets received and failed to decrypt over the corresponding synchronization source (ssrc) due to 1) late arrive; 2) the target RTP packet has already been repaired.
 * **packetsDuplicated**: Total number of packets identified as duplicated over the corresponding synchronization source (ssrc).
 * **perDscpPacketsReceived**: The total number of DSCP flagged RTP packets received over the corresponding synchronization source (ssrc)
 * **nackCount**: Count the total number of Negative ACKnowledgement (NACK) packets sent and belongs to the corresponded synchronization source (ssrc)
 * **totalProcessingDelay**: The total processing delay in seconds spend on buffering RTP packets from received up until packets are decoded
 * **estimatedPlayoutTimestamp**: The estimated playout time of the corresponded synchronization source
 * **jitterBufferDelay**: The total time of RTP packets spent in jitterbuffer waiting for frame completion due to network uncertenity.
 * **jitterBufferEmittedCount**: The total number of audio samples or video frames that have come out of the jitter buffer on the corresponded synchronization source (ssrc)
 * **decoderImplementation**: Indicate the name of the decoder implementation library
 * **framesDropped**: The total number of frames dropped on the corresponded RTP stream
 * **framesDecoded**: The total number of frames decoded on the corresponded RTP stream
 * **partialFramesLost**: The total number of frames partially lost on the corresponded RTP stream
 * **fullFramesLost**: The total number of frames fully lost on the corresponded RTP stream
 * **keyFramesDecoded**: The total number of keyframes decoded on the corresponded RTP stream
 * **frameWidth**: The width of the frame of the video sent by the remote source on the corresponded RTP stream
 * **frameHeight**: The height of the frame of the video sent by the remote source on the corresponded RTP stream
 * **frameBitDepth**: The bit depth in pixels of the frame of the video sent by the remote source on the corresponded RTP stream
 * **framesPerSecond**: The frame per seconds of the video sent by the remote source on the corresponded RTP stream
 * **qpSum**: The QP sum (only interested in VP8,9) of the frame of the video sent by the remote source on the corresponded RTP stream
 * **totalDecodeTime**: The total tiem spent on decoding video on the corresponded RTP stream
 * **totalInterFrameDelay**: The total interframe delay
 * **totalSquaredInterFrameDelay**: The total number of inter frame delay squere on the corresponded synchronization source (ssrc) Useful for variance calculation for interframe delays
 * **firCount**: The total number FIR packets sent from this endpoint to the source on the corresponded RTP stream
 * **pliCount**: The total number of Picture Loss Indication sent on the corresponded RTP stream
 * **sliCount**: The total number of SLI indicator sent from the endpoint on the corresponded RTP stream
 * **framesReceived**: The total number of frames received on the corresponded RTP stream.
 * **packetsSent**: Total number of RTP packets sent at the remote endpoint to this endpoint on this synchronization source
 * **bytesSent**: Total number of payload bytes sent at the remote endpoint to this endpoint on this synchronization source
 * **remoteTimestamp**: The timestamp corresnponds to the time in UTC Epoch the remote endpoint reported the statistics belong to the sender side and correspond to the synchronization source (ssrc)
 * **reportsSent**: The number of SR reports the remote endpoint sent corresponded to synchronization source (ssrc) this report belongs to
 * **roundTripTime**: Estimated round trip time for the SR reports based on DLRR reports on the corresponded RTP stream
 * **totalRoundTripTime**:  Represents the cumulative sum of all round trip time measurements performed on the corresponded RTP stream
 * **roundTripTimeMeasurements**: Represents the total number of SR reports received with DLRR reports to be able to calculate the round trip time on the corresponded RTP stream
 * **ended**: Flag represents if the receiver ended the media stream track or not.
 * **payloadType**: The type of the payload the RTP packet SSRC belongs to
 * **mimeType**: the MIME type of the codec (e.g.: video/vp8)
 * **clockRate**: The negotiated clock rate the RTP timestamp is generated of
 * **channels**: The number of channels for audio is used (in stereo it is 2, otherwise it is most likely null)
 * **sdpFmtpLine**: The a=fmtp line in the SDP corresponding to the codec
OutboundAudioTrack
 * **ssrc**: The RTP SSRC field
 * **trackId**: The id of the track
 * **peerConnectionId**:  The unique generated identifier of the peer connection the inbound audio track belongs to
 * **sfuStreamId**: The id of the SFU stream this track is related to
 * **packetsSent**: The total number of packets sent on the corresponded synchronization source
 * **bytesSent**: The total number of bytes sent on the corresponded synchronization source
 * **rtxSsrc**: If RTX is negotiated as a separate stream, this is the SSRC of the RTX stream that is associated with this stream's ssrc. 
 * **rid**:  The rid encoding parameter of the corresponded synchronization source
 * **lastPacketSentTimestamp**:  the timestamp the last packet was sent. (UTC epoch in ms)
 * **headerBytesSent**: Total number of RTP header and padding bytes sent over the corresponding synchronization source (ssrc)
 * **packetsDiscardedOnSend**: Total number of RTP packets discarded at sender side over the corresponding synchronization source (ssrc)
 * **bytesDiscardedOnSend**: Total number of RTP bytes discarded at sender side over the corresponding synchronization source (ssrc)
 * **fecPacketsSent**: Total number of FEC packets sent over the corresponding synchronization source (ssrc)
 * **retransmittedPacketsSent**: Total number of retransmitted packets sent over the corresponding synchronization source (ssrc).
 * **retransmittedBytesSent**: Total number of retransmitted bytes sent over the corresponding synchronization source (ssrc).
 * **targetBitrate**: Reflects the current encoder target in bits per second.
 * **totalEncodedBytesTarget**: The total number of bytes of RTP coherent frames encoded completly depending on the frame size the encoder targets
 * **totalPacketSendDelay**: The total number of delay packets buffered at the sender side in seconds over the corresponding synchronization source
 * **averageRtcpInterval**: The average RTCP interval between two consecutive compound RTCP packets sent for the corresponding synchronization source (ssrc)
 * **perDscpPacketsSent**: The total number of DSCP flagged RTP packets sent over the corresponding synchronization source (ssrc)
 * **nackCount**: Count the total number of Negative ACKnowledgement (NACK) packets received over the corresponding synchronization source (ssrc)
 * **encoderImplementation**: Indicate the name of the encoder implementation library
 * **totalSamplesSent**: The total number of samples sent over the corresponding synchronization source
 * **samplesEncodedWithSilk**: The total number of samples encoded by SILK portion in opus sent over the corresponding synchronization source
 * **samplesEncodedWithCelt**: The total number of samples encoded by CELT portion in opus sent over the corresponding synchronization source
 * **voiceActivityFlag**: Indicate if the last RTP packet sent contained voice activity based on the presence of the V bit in the extension header
 * **packetsReceived**: The total number of packets received on the corresponded synchronization source
 * **packetsLost**: The total number of bytes received on the corresponded synchronization source
 * **jitter**: The corresponded synchronization source reported jitter
 * **packetsDiscarded**: The total number of packets missed the playout point and therefore discarded by the jitterbuffer
 * **packetsRepaired**: The total number of packets repaired by either FEC or due to retransmission on the corresponded synchronization source
 * **burstPacketsLost**: The total number of packets lost in burst (RFC6958)
 * **burstPacketsDiscarded**: The total number of packets discarded in burst (RFC6958)
 * **burstLossCount**: The total number of burst happened causes burstPacketsLost on the corresponding synchronization source
 * **burstDiscardCount**: The total number of burst happened causes burstPacketsDiscarded on the corresponding synchronization source
 * **burstLossRate**: The fraction of RTP packets lost during bursts proportionally to the total number of RTP packets expected in the bursts on the corresponding synchronization source
 * **burstDiscardRate**: The fraction of RTP packets discarded during bursts proportionally to the total number of RTP packets expected in the bursts on the corresponding synchronization source
 * **gapLossRate**: The fraction of RTP packets lost during gap proportionally to the total number of RTP packets expected in the bursts on the corresponding synchronization source
 * **gapDiscardRate**: The fraction of RTP packets discarded during gap proportionally to the total number of RTP packets expected in the bursts on the corresponding synchronization source
 * **roundTripTime**: RTT measurement in seconds based on (most likely) SR, and RR belongs to the corresponded synchronization source
 * **totalRoundTripTime**: The sum of RTT measurements belongs to the corresponded synchronization source
 * **fractionLost**: The receiver reported fractional lost belongs to the corresponded synchronization source
 * **reportsReceived**: The total number of RR reports received, which is the base of the remote inbound calculation on this source
 * **roundTripTimeMeasurements**: The total number of calculated RR measurements received on this source
 * **relayedSource**: True if the corresponded media source is remote, false otherwise (or null depending on browser and version)
 * **audioLevel**: Represents the audio level reported by the media source
 * **totalAudioEnergy**: Represents the energy level reported by the media source
 * **totalSamplesDuration**: Represents the total duration of the audio samples the media source actually transconverted in seconds
 * **echoReturnLoss**: Represents the echo cancellation in decibels corresponded to the media source.
 * **echoReturnLossEnhancement**: Represents the echo cancellation in decibels added as a postprocessing by the library after the audio is catched from the emdia source.
 * **ended**: Flag represents if the sender ended the media stream track or not.
 * **payloadType**: The type of the payload the RTP packet SSRC belongs to
 * **mimeType**: the MIME type of the codec (e.g.: video/vp8)
 * **clockRate**: The negotiated clock rate the RTP timestamp is generated of
 * **channels**: The number of channels for audio is used (in stereo it is 2, otherwise it is most likely null)
 * **sdpFmtpLine**: The a=fmtp line in the SDP corresponding to the codec
OutboundVideoTrack
 * **ssrc**: The RTP SSRC field
 * **trackId**: The id of the track
 * **peerConnectionId**:  The unique generated identifier of the peer connection the inbound audio track belongs to
 * **sfuStreamId**: The id of the SFU stream this track is related to
 * **packetsSent**: The total number of packets sent on the corresponded synchronization source
 * **bytesSent**: The total number of bytes sent on the corresponded synchronization source
 * **rtxSsrc**: If RTX is negotiated as a separate stream, this is the SSRC of the RTX stream that is associated with this stream's ssrc. 
 * **rid**:  The rid encoding parameter of the corresponded synchronization source
 * **lastPacketSentTimestamp**:  the timestamp the last packet was sent. (UTC epoch in ms)
 * **headerBytesSent**: Total number of RTP header and padding bytes sent over the corresponding synchronization source (ssrc)
 * **packetsDiscardedOnSend**: Total number of RTP packets discarded at sender side over the corresponding synchronization source (ssrc)
 * **bytesDiscardedOnSend**: Total number of RTP bytes discarded at sender side over the corresponding synchronization source (ssrc)
 * **fecPacketsSent**: Total number of FEC packets sent over the corresponding synchronization source (ssrc)
 * **retransmittedPacketsSent**: Total number of retransmitted packets sent over the corresponding synchronization source (ssrc).
 * **retransmittedBytesSent**: Total number of retransmitted bytes sent over the corresponding synchronization source (ssrc).
 * **targetBitrate**: Reflects the current encoder target in bits per second.
 * **totalEncodedBytesTarget**: The total number of bytes of RTP coherent frames encoded completly depending on the frame size the encoder targets
 * **totalPacketSendDelay**: The total number of delay packets buffered at the sender side in seconds over the corresponding synchronization source
 * **averageRtcpInterval**: The average RTCP interval between two consecutive compound RTCP packets sent for the corresponding synchronization source (ssrc)
 * **perDscpPacketsSent**: The total number of DSCP flagged RTP packets sent over the corresponding synchronization source (ssrc)
 * **nackCount**: Count the total number of Negative ACKnowledgement (NACK) packets received over the corresponding synchronization source (ssrc)
 * **firCount**: The total number FIR packets sent from this endpoint to the source on the corresponded RTP stream
 * **pliCount**: The total number of Picture Loss Indication sent on the corresponded RTP stream
 * **sliCount**: The total number of SLI indicator sent from the endpoint on the corresponded RTP stream
 * **encoderImplementation**: Indicate the name of the encoder implementation library
 * **frameWidth**: The frame width in pixels of the frames targeted by the media encoder
 * **frameHeight**: The frame width the media encoder targeted
 * **frameBitDepth**: The frame depth in pixles on the corresponded RTP stream
 * **framesPerSecond**: The encoded number of frames in the last second on the corresponded media source
 * **framesSent**: TThe total number of frames sent on the corresponded RTP stream
 * **hugeFramesSent**: The total number of huge frames (avgFrameSize * 2.5) on the corresponded RTP stream
 * **framesEncoded**: The total number of frames encoded by the media source
 * **keyFramesEncoded**: The total number of keyframes encoded on the corresponded RTP stream
 * **framesDiscardedOnSend**: The total number of frames discarded on the corresponded RTP stream.
 * **qpSum**: The sum of the QP the media encoder provided on the corresponded RTP stream.
 * **totalEncodeTime**: The total time in seconds spent in encoding media frames for the corresponded RTP stream.
 * **qualityLimitationDurationNone**: Time elapsed in seconds when the RTC connection has not limited the quality
 * **qualityLimitationDurationCPU**: Time elapsed in seconds the RTC connection had a limitation because of CPU
 * **qualityLimitationDurationBandwidth**: Time elapsed in seconds the RTC connection had a limitation because of Bandwidth
 * **qualityLimitationDurationOther**: Time elapsed in seconds the RTC connection had a limitation because of Other factor
 * **qualityLimitationReason**: Indicate a reason for the quality limitation of the corresponded synchronization source
 * **qualityLimitationResolutionChanges**: The total number of resolution changes occured ont he corresponded RTP stream due to quality changes
 * **packetsReceived**: The total number of packets received on the corresponded synchronization source
 * **packetsLost**: The total number of bytes received on the corresponded synchronization source
 * **jitter**: The corresponded synchronization source reported jitter
 * **packetsDiscarded**: The total number of packets missed the playout point and therefore discarded by the jitterbuffer
 * **packetsRepaired**: The total number of packets repaired by either FEC or due to retransmission on the corresponded synchronization source
 * **burstPacketsLost**: The total number of packets lost in burst (RFC6958)
 * **burstPacketsDiscarded**: The total number of packets discarded in burst (RFC6958)
 * **burstLossCount**: The total number of burst happened causes burstPacketsLost on the corresponding synchronization source
 * **burstDiscardCount**: The total number of burst happened causes burstPacketsDiscarded on the corresponding synchronization source
 * **burstLossRate**: The fraction of RTP packets lost during bursts proportionally to the total number of RTP packets expected in the bursts on the corresponding synchronization source
 * **burstDiscardRate**: The fraction of RTP packets discarded during bursts proportionally to the total number of RTP packets expected in the bursts on the corresponding synchronization source
 * **gapLossRate**: The fraction of RTP packets lost during gap proportionally to the total number of RTP packets expected in the bursts on the corresponding synchronization source
 * **gapDiscardRate**: The fraction of RTP packets discarded during gap proportionally to the total number of RTP packets expected in the bursts on the corresponding synchronization source
 * **roundTripTime**: RTT measurement in seconds based on (most likely) SR, and RR belongs to the corresponded synchronization source
 * **totalRoundTripTime**: The sum of RTT measurements belongs to the corresponded synchronization source
 * **fractionLost**: The receiver reported fractional lost belongs to the corresponded synchronization source
 * **reportsReceived**: The total number of RR reports received, which is the base of the remote inbound calculation on this source
 * **roundTripTimeMeasurements**: The total number of calculated RR measurements received on this source
 * **framesDropped**: The total number of frames reported to be lost by the remote endpoit on the corresponded RTP stream
 * **partialFramesLost**: The total number of partial frames reported to be lost by the remote endpoint on the corresponded RTP stream.
 * **fullFramesLost**: The total number of full frames lost at the remote endpoint on the corresponded RTP stream.
 * **relayedSource**: True if the corresponded media source is remote, false otherwise (or null depending on browser and version)
 * **width**: The width, in pixels, of the last frame originating from the media source
 * **height**: The height, in pixels, of the last frame originating from the media source
 * **bitDepth**: The bitDepth, in pixels, of the last frame originating from the media source
 * **frames**: The total number of frames originated from the media source
 * **ended**: Flag represents if the sender ended the media stream track or not.
 * **payloadType**: The type of the payload the RTP packet SSRC belongs to
 * **mimeType**: the MIME type of the codec (e.g.: video/vp8)
 * **clockRate**: The negotiated clock rate the RTP timestamp is generated of
 * **channels**: The number of channels for audio is used (in stereo it is 2, otherwise it is most likely null)
 * **sdpFmtpLine**: The a=fmtp line in the SDP corresponding to the codec
IceLocalCandidate
 * **peerConnectionId**: Refers to the peer connection the local candidate belongs to
 * **id**: The unique identifier of the local candidate
 * **address**: The address of the local endpoint (Ipv4, Ipv6, FQDN)
 * **port**: The port number of the local endpoint the ICE uses
 * **protocol**: The protocol for the ICE (Possible values are: tcp,<br />udp)
 * **candidateType**: The type of the local candidate
 * **priority**: The priority of the local candidate
 * **url**: The url of the ICE server
 * **relayProtocol**: The relay protocol the local candidate uses (Possible values are: tcp,<br />udp,<br />tls)
IceRemoteCandidate
 * **peerConnectionId**: Refers to the peer connection the local candidate belongs to
 * **id**: The unique identifier of the local candidate
 * **address**: The address of the local endpoint (Ipv4, Ipv6, FQDN)
 * **port**: The port number of the local endpoint the ICE uses
 * **protocol**: The protocol for the ICE (Possible values are: tcp,<br />udp)
 * **candidateType**: The type of the local candidate
 * **priority**: The priority of the local candidate
 * **url**: The url of the ICE server
 * **relayProtocol**: The relay protocol the local candidate uses (Possible values are: tcp,<br />udp,<br />tls)
DataChannel
 * **peerConnectionId**: Refers to the peer connection the local candidate belongs to
 * **id**: Unique identifier of the data channel
 * **label**: The label the data channel provided at the creation
 * **address**: The address of the local endpoint (Ipv4, Ipv6, FQDN)
 * **port**: The port number of the local endpoint the ICE uses
 * **protocol**:  The protocol the data channel use to transfer data
 * **dataChannelIdentifier**: The unique identifier of the data channel
 * **state**: The state of the data channel
 * **messagesSent**: The total number of messages sent on this data channel. this is not equal to the number of packets sent, as messages are chunked to packets
 * **bytesSent**: The amount of bytes sent on the corresponded data channel
 * **messagesReceived**: The number of messages received on the corresponded data channel
 * **bytesReceived**: The amount of bytes received on the corresponded data channel
ClientSample
 * **clientId**: Unique id of the client providing samples. Must be a valid UUID
 * **timestamp**: The timestamp the sample is created in GMT
 * **callId**: If it is provided the server uses the given id to match clients in the same call. Must be a valid UUID. 
 * **sampleSeq**: The sequence number a source assigns to the sample. Every time the source make a sample at a client this number should be monothonically incremented.
 * **roomId**: The WebRTC app configured room id the client joined for the call.
 * **userId**: The WebRTC app configured human readable user id the client is joined.
 * **engine**: WebRTC App provided information related to the engine the client uses.
 * **platform**: WebRTC App provided information related to the platform the client uses.
 * **browser**: WebRTC App provided information related to the browser the client uses.
 * **os**: WebRTC App provided information related to the operation system the client uses.
 * **mediaConstraints**: The WebRTC app provided List of the media constraints the client has.
 * **mediaDevices**: The WebRTC app provided List of the media devices the client has.
 * **userMediaErrors**: The WebRTC app provided List of user media errors the client has.
 * **extensionStats**: The WebRTC app provided custom stats payload
 * **iceServers**: The WebRTC app provided List of ICE server the client used.
 * **localSDPs**: The local part of the Signal Description Protocol to establish connections
 * **pcTransports**: Compound object related to Peer Connection Transport Stats
 * **mediaSources**: WebRTC App provided information related to the operation system the client uses.
 * **codecs**: List of codec the client has
 * **certificates**: List of certificates the client provided
 * **inboundAudioTracks**: List of compound measurements related to inbound audio tracks
 * **inboundVideoTracks**: List of compound measurements related to inbound video tracks
 * **outboundAudioTracks**: List of compound measurements related to outbound audio tracks
 * **outboundVideoTracks**: List of compound measurements related to outbound video tracks
 * **iceLocalCandidates**: List of local ICE candidates
 * **iceRemoteCandidates**: List of remote ICE candidates
 * **dataChannels**: List of Data channels
 * **timeZoneOffsetInHours**: The offset from GMT in hours
 * **marker**: Special marker for the samples
SfuTransport
 * **transportId**: The generated unique identifier of the transport
 * **noReport**: Flag indicate to not generate report from this sample
 * **internal**: Flag to indicate that the transport is used as an internal transport between SFU instances
 * **dtlsState**: Represent the current value of the state attribute of the underlying RTCDtlsTransport.
 * **iceState**: Represent the current value of the state attribute of the underlying RTCIceTransport
 * **sctpState**: Represents the the current value of the SCTP state of the transport of the SFU
 * **iceRole**: Represent the current value of the role SFU takes place in ICE
 * **localAddress**: The local address of the ICE candidate selected for the transport (IPv4, IPv6, FQDN)
 * **localPort**: The local port number
 * **protocol**: The protocol used by the transport
 * **remoteAddress**: The remote address of the ICE candidate selected for the transport (IPv4, IPv6, FQDN)
 * **remotePort**: The remote port number
 * **rtpBytesReceived**: The total amount of RTP bytes received on this transport
 * **rtpBytesSent**: The total amount of RTP bytes sent on this transport
 * **rtpPacketsReceived**: The total amount of RTP packets received on this transport
 * **rtpPacketsSent**: The total amount of RTP packets sent on this transport
 * **rtpPacketsLost**: The total amount of RTP packets lost on this transport
 * **rtxBytesReceived**: The total amount of RTX bytes received on this transport
 * **rtxBytesSent**: The total amount of RTX bytes sent on this transport
 * **rtxPacketsReceived**: The total amount of RTX packets received on this transport
 * **rtxPacketsSent**: The total amount of RTX packets sent on this transport
 * **rtxPacketsLost**: The total amount of RTX packets lost on this transport
 * **rtxPacketsDiscarded**: The total amount of RTX packets discarded on this transport
 * **sctpBytesReceived**: The total amount of SCTP bytes received on this transport
 * **sctpBytesSent**: The total amount of SCTP bytes sent on this transport
 * **sctpPacketsReceived**: The total amount of SCTP packets received on this transport
 * **sctpPacketsSent**: The total amount of SCTP packets sent on this transport
SfuInboundRtpPad
 * **transportId**: The id of the transport the RTP Pad uses.
 * **streamId**: The id of the media stream the RTP pad belongs to. This id is to group rtp pads (e.g.: simulcast) carrying payloads to the same media. 
 * **padId**: The id of Sfu pad.
 * **ssrc**: The synchronization source id of the RTP stream
 * **noReport**: Flag indicate to not generate report from this sample
 * **internal**: Flag to indicate that the rtp pad is used as an internal communication between SFU instances
 * **mediaType**: the type of the media the stream carries ("audio" or "video") (Possible values are: audio,<br />video)
 * **payloadType**: The payload type field of the RTP header
 * **mimeType**: The negotiated mimeType in the SDP
 * **clockRate**: The clock rate of the media source the RTP header carries
 * **sdpFmtpLine**: The actual SDP line from the negotiation related to this RTP stream
 * **rid**:  The rid parameter of the corresponded RTP stream
 * **rtxSsrc**: If RTX is negotiated as a separate stream, this is the SSRC of the RTX stream that is associated with this stream's ssrc. 
 * **targetBitrate**: he bitrate the corresponded stream targets.
 * **voiceActivityFlag**: The RTP header V flag indicate of the activity of the media source by the media codec if the RTP transport ships it through
 * **firCount**: The total number FIR packets sent from this endpoint to the source on the corresponded RTP stream. Only for Video streams
 * **pliCount**: The total number of Picture Loss Indication sent on the corresponded RTP stream. Only for Video streams
 * **nackCount**: The total number of negative acknowledgement received on the corresponded RTP stream.
 * **sliCount**: The total number of SLI indicator sent from the endpoint on the corresponded RTP stream. Only for Audio stream
 * **packetsLost**: The total number of packets lost on the corresponded RTP stream.
 * **packetsReceived**: The total number of packets received on the corresponded RTP stream.
 * **packetsDiscarded**: The total number of discarded packets on the corresponded RTP stream.
 * **packetsRepaired**: The total number of packets repaired by either retransmission or FEC on the corresponded RTP stream.
 * **packetsFailedDecryption**: The total number of packets failed to be decrypted on the corresponded RTP stream.
 * **packetsDuplicated**: The total number of duplicated packets appeared on the corresponded RTP stream.
 * **fecPacketsReceived**: The total number of FEC packets received on the corresponded RTP stream.
 * **fecPacketsDiscarded**: The total number of FEC packets discarded on the corresponded RTP stream.
 * **bytesReceived**: The total amount of payload bytes received on the corresponded RTP stream.
 * **rtcpSrReceived**: The total number of SR reports received by the corresponded RTP stream
 * **rtcpRrSent**: The total number of RR reports sent on the corresponded RTP stream
 * **rtxPacketsReceived**: If rtx packets are sent or received on the same stream then this number indicates how may has been sent
 * **rtxPacketsDiscarded**: If rtx packets are received on the same stream then this number indicates how may has been discarded
 * **framesReceived**: The number of frames received on the corresponded RTP stream
 * **framesDecoded**: Indicate the number of frames the Sfu has been decoded
 * **keyFramesDecoded**: Indicate the number of keyframes the Sfu has been decoded
 * **fractionLost**: The calculated fractionLost of the stream
 * **jitter**: The calculated jitter of the stream
 * **roundTripTime**: The calculated RTT of the stream
SfuOutboundRtpPad
 * **transportId**: The id of the transport the RTP stream uses.
 * **streamId**: The id of the stream this outbound RTP pad sinks the media from
 * **sinkId**: The id of a group of RTP pad sinks the media stream out from the SFU.
 * **padId**: The id of Sfu pad.
 * **ssrc**: The synchronization source id of the RTP stream
 * **noReport**: Flag indicate to not generate report from this sample
 * **internal**: Flag to indicate that the rtp pad is used as an internal communication between SFU instances
 * **callId**: The callId the event belongs to
 * **clientId**: If the track id was provided by the Sfu, the observer can fill up the information of which client it belongs to
 * **trackId**: The id of the track the RTP stream related to at the client side
 * **mediaType**: the type of the media the stream carries ("audio" or "video") (Possible values are: audio,<br />video)
 * **payloadType**: The payload type field of the RTP header
 * **mimeType**: The negotiated mimeType in the SDP
 * **clockRate**: The clock rate of the media source the RTP header carries
 * **sdpFmtpLine**: The actual SDP line from the negotiation related to this RTP stream
 * **rid**:  The rid parameter of the corresponded RTP stream
 * **rtxSsrc**: If RTX is negotiated as a separate stream, this is the SSRC of the RTX stream that is associated with this stream's ssrc. 
 * **targetBitrate**: he bitrate the corresponded stream targets.
 * **voiceActivityFlag**: The RTP header V flag indicate of the activity of the media source by the media codec if the RTP transport ships it through
 * **firCount**: The total number FIR packets sent from this endpoint to the source on the corresponded RTP stream. Only for Video streams
 * **pliCount**: The total number of Picture Loss Indication sent on the corresponded RTP stream. Only for Video streams
 * **nackCount**: The total number of negative acknowledgement received on the corresponded RTP stream.
 * **sliCount**: The total number of SLI indicator sent from the endpoint on the corresponded RTP stream. Only for Audio stream
 * **packetsLost**: The total number of packets lost on the corresponded RTP stream.
 * **packetsSent**: The total number of packets sent on the corresponded RTP stream.
 * **packetsDiscarded**: The total number of discarded packets on the corresponded RTP stream.
 * **packetsRetransmitted**: The total number of packets retransmitted on the corresponded RTP stream.
 * **packetsFailedEncryption**: The total number of packets failed to be encrypted on the corresponded RTP stream.
 * **packetsDuplicated**: The total number of duplicated packets appeared on the corresponded RTP stream.
 * **fecPacketsSent**: The total number of FEC packets sent on the corresponded RTP stream.
 * **fecPacketsDiscarded**: The total number of FEC packets discarded on the corresponded RTP stream.
 * **bytesSent**: The total amount of payload bytes sent on the corresponded RTP stream.
 * **rtcpSrSent**: The total number of SR reports sent by the corresponded RTP stream
 * **rtcpRrReceived**: The total number of RR reports received on the corresponded RTP stream
 * **rtxPacketsSent**: If rtx packets sent on the same stream then this number indicates how may has been sent
 * **rtxPacketsDiscarded**: If rtx packets are received on the same stream then this number indicates how may has been discarded
 * **framesSent**: The number of frames sent on the corresponded RTP stream
 * **framesEncoded**: Indicate the number of frames the Sfu has been encoded
 * **keyFramesEncoded**: Indicate the number of keyframes the Sfu has been encoded on the corresponded RTP stream
 * **fractionLost**: The calculated fractionLost of the stream
 * **jitter**: The calculated jitter of the stream
 * **roundTripTime**: The calculated RTT of the stream
SfuSctpChannel
 * **transportId**: The id of the transport the RTP stream uses.
 * **streamId**: The id of the sctp stream
 * **channelId**: The id of the sctp stream
 * **noReport**: Flag indicate to not generate report from this sample
 * **internal**: Flag to indicate that the SCTP channel is used as an internally between SFU instances
 * **label**: The label of the sctp stream
 * **protocol**: The protocol used to establish an sctp stream
 * **sctpSmoothedRoundTripTime**: The latest smoothed round-trip time value, corresponding to spinfo_srtt defined in [RFC6458] but converted to seconds. If there has been no round-trip time measurements yet, this value is undefined.
 * **sctpCongestionWindow**: The latest congestion window, corresponding to spinfo_cwnd defined in [RFC6458].
 * **sctpReceiverWindow**: The latest receiver window, corresponding to sstat_rwnd defined in [RFC6458].
 * **sctpMtu**: The latest maximum transmission unit, corresponding to spinfo_mtu defined in [RFC6458].
 * **sctpUnackData**: The number of unacknowledged DATA chunks, corresponding to sstat_unackdata defined in [RFC6458].
 * **messageReceived**: The number of message received on the corresponded SCTP stream.
 * **messageSent**: The number of message sent on the corresponded SCTP stream.
 * **bytesReceived**: The number of bytes received on the corresponded SCTP stream.
 * **bytesSent**: The number of bytes sent on the corresponded SCTP stream.
SfuExtensionStats
 * **type**: The type of the extension stats the custom app provides
 * **payload**: The payload of the extension stats the custom app provides
SfuSample
 * **sfuId**: Unique generated id for the sfu samples are originated from
 * **timestamp**: The timestamp the sample is created in GMT
 * **timeZoneOffsetInHours**: The offset from GMT in hours
 * **marker**: Special marker for the samples
 * **transports**: The Sfu Transports obtained measurements
 * **inboundRtpPads**: The Sfu Inbound Rtp Pad obtained measurements
 * **outboundRtpPads**: The Sfu Outbound Rtp Pad obtained measurements
 * **sctpChannels**: The Sfu Outbound Rtp Pad obtained measurements
 * **extensionStats**: The Sfu provided custom stats payload
TurnPeerAllocation
 * **peerId**: a unique id for the allocation
 * **sessionId**: The corresponded session the allocation belongs to
 * **relayedAddress**: The allocated address
 * **relayedPort**: The allocated port
 * **transportProtocol**: protocol (TCP, UDP)
 * **peerAddress**: The address of the address the serever connect to
 * **peerPort**: The portnumber the server connects to
 * **sendingBitrate**: the bitrate the TURN server sending to the peer
 * **receivingBitrate**: the bitrate the TURN server receiving from the peer
 * **sentBytes**: the amount of bytes sent to the peer
 * **receivedBytes**: the amount of bytes received from the peer
 * **sentPackets**: the amount of packets sent to the peer
 * **receivedPackets**: the amount of packets received from the peer
TurnSession
 * **sessionId**: Flag indicate to not generate report from this sample
 * **realm**: The Authentication Realm (RFC 8656)
 * **username**: The username of the used in authentication
 * **clientId**: The id of the client the TURN session belongs to (ClientSample)
 * **started**: The timestamp when the session has been started. Epoch in milliseconds, GMT
 * **nonceExpirationTime**: For each Allocate request, the server SHOULD generate a new random nonce when the allocation is first attempted following the randomness recommendations in [RFC4086] and SHOULD expire the nonce at least once every hour during the lifetime of the allocation.  Epoch in millis GMT
 * **serverAddress**: The address of the server the client connected to
 * **serverPort**: The portnumber the server listens the client requests
 * **transportProtocol**: the transport protocol betwwen the client and the server (TCP, UDP, TCPTLS, UDPTLS, SCTP, SCTPTLS)
 * **clientAddress**: The address of the client connected from
 * **clientPort**: The portnumber the client requested from
 * **sendingBitrate**: the bitrate the TURN server sending to the client
 * **receivingBitrate**: the bitrate the TURN server receiving from the client
 * **sentBytes**: the amount of bytes sent to the client
 * **receivedBytes**: the amount of bytes received from the client
 * **sentPackets**: the amount of packets sent to the client
 * **receivedPackets**: the amount of packets received from the client
TurnSample
 * **serverId**: A unique id of the turn server
 * **allocations**: Peer Alloocation data
 * **sessions**: Session data
Samples
 * **controls**: Additional control flags indicate various operation has to be performed
 * **clientSamples**: Samples taken from the client
 * **sfuSamples**: Samples taken from an Sfu
 * **turnSamples**: Samples taken from the TURN server