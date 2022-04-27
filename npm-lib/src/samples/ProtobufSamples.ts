export const schema = `
syntax = "proto2";

package org.observertc.schemas.protobuf;

message Samples {
	message Controls {
		optional string accessClaim = 1;
		optional bool close = 2;
	}
	message ClientSample {
		message Engine {
			optional string name = 1;
			optional string version = 2;
		}
		message Platform {
			optional string model = 1;
			optional string type = 2;
			optional string vendor = 3;
		}
		message Browser {
			optional string name = 1;
			optional string version = 2;
		}
		message OperationSystem {
			optional string name = 1;
			optional string version = 2;
			optional string versionName = 3;
		}
		message MediaDevice {
			optional string id = 1;
			optional string kind = 2;
			optional string label = 3;
		}
		message ExtensionStat {
			required string payload = 1;
			required string type = 2;
		}
		message PeerConnectionTransport {
			required string peerConnectionId = 1;
			optional int64 bytesReceived = 2;
			optional int64 bytesSent = 3;
			optional double candidatePairAvailableIncomingBitrate = 4;
			optional double candidatePairAvailableOutgoingBitrate = 5;
			optional int64 candidatePairBytesDiscardedOnSend = 6;
			optional int64 candidatePairBytesReceived = 7;
			optional int64 candidatePairBytesSent = 8;
			optional int32 candidatePairCircuitBreakerTriggerCount = 9;
			optional int64 candidatePairConsentExpiredTimestamp = 10;
			optional int64 candidatePairConsentRequestBytesSent = 11;
			optional int32 candidatePairConsentRequestsSent = 12;
			optional double candidatePairCurrentRoundTripTime = 13;
			optional int64 candidatePairFirstRequestTimestamp = 14;
			optional int64 candidatePairLastPacketReceivedTimestamp = 15;
			optional int64 candidatePairLastPacketSentTimestamp = 16;
			optional int64 candidatePairLastRequestTimestamp = 17;
			optional int64 candidatePairLastResponseTimestamp = 18;
			optional int32 candidatePairPacketsDiscardedOnSend = 19;
			optional int32 candidatePairPacketsReceived = 20;
			optional int32 candidatePairPacketsSent = 21;
			optional int64 candidatePairRequestBytesSent = 22;
			optional int32 candidatePairRequestsReceived = 23;
			optional int32 candidatePairRequestsSent = 24;
			optional int64 candidatePairResponseBytesSent = 25;
			optional int32 candidatePairResponsesReceived = 26;
			optional int32 candidatePairResponsesSent = 27;
			optional int32 candidatePairRetransmissionReceived = 28;
			optional int32 candidatePairRetransmissionSent = 29;
			optional string candidatePairState = 30;
			optional double candidatePairTotalRoundTripTime = 31;
			optional int32 dataChannelsAccepted = 32;
			optional int32 dataChannelsClosed = 33;
			optional int32 dataChannelsOpened = 34;
			optional int32 dataChannelsRequested = 35;
			optional string dtlsCipher = 36;
			optional string dtlsState = 37;
			optional string iceLocalUsernameFragment = 38;
			optional string iceRole = 39;
			optional string iceState = 40;
			optional string label = 41;
			optional string localAddress = 42;
			optional string localCandidateICEServerUrl = 43;
			optional string localCandidateRelayProtocol = 44;
			optional string localCandidateType = 45;
			optional int32 localPort = 46;
			optional string localProtocol = 47;
			optional int32 packetsReceived = 48;
			optional int32 packetsSent = 49;
			optional string remoteAddress = 50;
			optional string remoteCandidateICEServerUrl = 51;
			optional string remoteCandidateRelayProtocol = 52;
			optional string remoteCandidateType = 53;
			optional int32 remotePort = 54;
			optional string remoteProtocol = 55;
			optional double sctpCongestionWindow = 56;
			optional int32 sctpMtu = 57;
			optional double sctpReceiverWindow = 58;
			optional double sctpSmoothedRoundTripTime = 59;
			optional int32 sctpUnackData = 60;
			optional int32 selectedCandidatePairChanges = 61;
			optional string srtpCipher = 62;
			optional string tlsGroup = 63;
			optional string tlsVersion = 64;
		}
		message MediaSourceStat {
			optional double audioLevel = 1;
			optional int32 bitDepth = 2;
			optional double echoReturnLoss = 3;
			optional double echoReturnLossEnhancement = 4;
			optional int32 frames = 5;
			optional double framesPerSecond = 6;
			optional int32 height = 7;
			optional string kind = 8;
			optional bool relayedSource = 9;
			optional double totalAudioEnergy = 10;
			optional double totalSamplesDuration = 11;
			optional string trackIdentifier = 12;
			optional int32 width = 13;
		}
		message MediaCodecStats {
			optional int32 channels = 1;
			optional int32 clockRate = 2;
			optional string codecType = 3;
			optional string mimeType = 4;
			optional string payloadType = 5;
			optional string sdpFmtpLine = 6;
		}
		message Certificate {
			optional string base64Certificate = 1;
			optional string fingerprint = 2;
			optional string fingerprintAlgorithm = 3;
			optional string issuerCertificateId = 4;
		}
		message InboundAudioTrack {
			required int64 ssrc = 1;
			optional double averageRtcpInterval = 2;
			optional int32 burstDiscardCount = 3;
			optional double burstDiscardRate = 4;
			optional int32 burstLossCount = 5;
			optional double burstLossRate = 6;
			optional int32 burstPacketsDiscarded = 7;
			optional int32 burstPacketsLost = 8;
			optional int64 bytesReceived = 9;
			optional int64 bytesSent = 10;
			optional int32 channels = 11;
			optional int32 clockRate = 12;
			optional int32 concealedSamples = 13;
			optional int32 concealmentEvents = 14;
			optional string decoderImplementation = 15;
			optional bool ended = 16;
			optional int64 estimatedPlayoutTimestamp = 17;
			optional int32 fecPacketsDiscarded = 18;
			optional int32 fecPacketsReceived = 19;
			optional double gapDiscardRate = 20;
			optional double gapLossRate = 21;
			optional int64 headerBytesReceived = 22;
			optional int32 insertedSamplesForDeceleration = 23;
			optional double jitter = 24;
			optional double jitterBufferDelay = 25;
			optional int32 jitterBufferEmittedCount = 26;
			optional int64 lastPacketReceivedTimestamp = 27;
			optional string mimeType = 28;
			optional int32 nackCount = 29;
			optional int32 packetsDiscarded = 30;
			optional int32 packetsDuplicated = 31;
			optional int32 packetsFailedDecryption = 32;
			optional int32 packetsLost = 33;
			optional int32 packetsReceived = 34;
			optional int32 packetsRepaired = 35;
			optional int32 packetsSent = 36;
			optional int32 payloadType = 37;
			optional string peerConnectionId = 38;
			optional int32 perDscpPacketsReceived = 39;
			optional string remoteClientId = 40;
			optional int64 remoteTimestamp = 41;
			optional int32 removedSamplesForAcceleration = 42;
			optional int32 reportsSent = 43;
			optional double roundTripTime = 44;
			optional int32 roundTripTimeMeasurements = 45;
			optional int32 samplesDecodedWithCelt = 46;
			optional int32 samplesDecodedWithSilk = 47;
			optional string sdpFmtpLine = 48;
			optional string sfuSinkId = 49;
			optional string sfuStreamId = 50;
			optional int32 silentConcealedSamples = 51;
			optional double totalProcessingDelay = 52;
			optional double totalRoundTripTime = 53;
			optional int32 totalSamplesDecoded = 54;
			optional int32 totalSamplesReceived = 55;
			optional string trackId = 56;
			optional bool voiceActivityFlag = 57;
		}
		message InboundVideoTrack {
			required int64 ssrc = 1;
			optional double averageRtcpInterval = 2;
			optional int32 burstDiscardCount = 3;
			optional double burstDiscardRate = 4;
			optional int32 burstLossCount = 5;
			optional double burstLossRate = 6;
			optional int32 burstPacketsDiscarded = 7;
			optional int32 burstPacketsLost = 8;
			optional int64 bytesReceived = 9;
			optional int64 bytesSent = 10;
			optional int32 channels = 11;
			optional int32 clockRate = 12;
			optional string decoderImplementation = 13;
			optional bool ended = 14;
			optional int64 estimatedPlayoutTimestamp = 15;
			optional int32 fecPacketsDiscarded = 16;
			optional int32 fecPacketsReceived = 17;
			optional int32 firCount = 18;
			optional int32 frameBitDepth = 19;
			optional int32 frameHeight = 20;
			optional int32 frameWidth = 21;
			optional int32 framesDecoded = 22;
			optional int32 framesDropped = 23;
			optional double framesPerSecond = 24;
			optional int32 framesReceived = 25;
			optional int32 fullFramesLost = 26;
			optional double gapDiscardRate = 27;
			optional double gapLossRate = 28;
			optional int64 headerBytesReceived = 29;
			optional double jitter = 30;
			optional double jitterBufferDelay = 31;
			optional int32 jitterBufferEmittedCount = 32;
			optional int32 keyFramesDecoded = 33;
			optional int64 lastPacketReceivedTimestamp = 34;
			optional string mimeType = 35;
			optional int32 nackCount = 36;
			optional int32 packetsDiscarded = 37;
			optional int32 packetsDuplicated = 38;
			optional int32 packetsFailedDecryption = 39;
			optional int32 packetsLost = 40;
			optional int32 packetsReceived = 41;
			optional int32 packetsRepaired = 42;
			optional int32 packetsSent = 43;
			optional int32 partialFramesLost = 44;
			optional int32 payloadType = 45;
			optional string peerConnectionId = 46;
			optional int32 perDscpPacketsReceived = 47;
			optional int32 pliCount = 48;
			optional int64 qpSum = 49;
			optional string remoteClientId = 50;
			optional int64 remoteTimestamp = 51;
			optional int32 reportsSent = 52;
			optional double roundTripTime = 53;
			optional int32 roundTripTimeMeasurements = 54;
			optional string sdpFmtpLine = 55;
			optional string sfuSinkId = 56;
			optional string sfuStreamId = 57;
			optional int32 sliCount = 58;
			optional double totalDecodeTime = 59;
			optional double totalInterFrameDelay = 60;
			optional double totalProcessingDelay = 61;
			optional double totalRoundTripTime = 62;
			optional double totalSquaredInterFrameDelay = 63;
			optional string trackId = 64;
		}
		message OutboundAudioTrack {
			required int64 ssrc = 1;
			optional double audioLevel = 2;
			optional double averageRtcpInterval = 3;
			optional int32 burstDiscardCount = 4;
			optional double burstDiscardRate = 5;
			optional int32 burstLossCount = 6;
			optional double burstLossRate = 7;
			optional int32 burstPacketsDiscarded = 8;
			optional int32 burstPacketsLost = 9;
			optional int64 bytesDiscardedOnSend = 10;
			optional int64 bytesSent = 11;
			optional int32 channels = 12;
			optional int32 clockRate = 13;
			optional double echoReturnLoss = 14;
			optional double echoReturnLossEnhancement = 15;
			optional string encoderImplementation = 16;
			optional bool ended = 17;
			optional int32 fecPacketsSent = 18;
			optional double fractionLost = 19;
			optional double gapDiscardRate = 20;
			optional double gapLossRate = 21;
			optional int64 headerBytesSent = 22;
			optional double jitter = 23;
			optional int64 lastPacketSentTimestamp = 24;
			optional string mimeType = 25;
			optional int32 nackCount = 26;
			optional int32 packetsDiscarded = 27;
			optional int32 packetsDiscardedOnSend = 28;
			optional int32 packetsLost = 29;
			optional int32 packetsReceived = 30;
			optional int32 packetsRepaired = 31;
			optional int32 packetsSent = 32;
			optional int32 payloadType = 33;
			optional string peerConnectionId = 34;
			optional int32 perDscpPacketsSent = 35;
			optional bool relayedSource = 36;
			optional int32 reportsReceived = 37;
			optional int64 retransmittedBytesSent = 38;
			optional int32 retransmittedPacketsSent = 39;
			optional string rid = 40;
			optional double roundTripTime = 41;
			optional int32 roundTripTimeMeasurements = 42;
			optional int64 rtxSsrc = 43;
			optional int32 samplesEncodedWithCelt = 44;
			optional int32 samplesEncodedWithSilk = 45;
			optional string sdpFmtpLine = 46;
			optional string sfuStreamId = 47;
			optional int32 targetBitrate = 48;
			optional double totalAudioEnergy = 49;
			optional int64 totalEncodedBytesTarget = 50;
			optional double totalPacketSendDelay = 51;
			optional double totalRoundTripTime = 52;
			optional double totalSamplesDuration = 53;
			optional int32 totalSamplesSent = 54;
			optional string trackId = 55;
			optional bool voiceActivityFlag = 56;
		}
		message OutboundVideoTrack {
			required int64 ssrc = 1;
			optional double averageRtcpInterval = 2;
			optional int32 bitDepth = 3;
			optional int32 burstDiscardCount = 4;
			optional double burstDiscardRate = 5;
			optional int32 burstLossCount = 6;
			optional double burstLossRate = 7;
			optional int32 burstPacketsDiscarded = 8;
			optional int32 burstPacketsLost = 9;
			optional int64 bytesDiscardedOnSend = 10;
			optional int64 bytesSent = 11;
			optional int32 channels = 12;
			optional int32 clockRate = 13;
			optional string encoderImplementation = 14;
			optional bool ended = 15;
			optional int32 fecPacketsSent = 16;
			optional int32 firCount = 17;
			optional double fractionLost = 18;
			optional int32 frameBitDepth = 19;
			optional int32 frameHeight = 20;
			optional int32 frameWidth = 21;
			optional int32 frames = 22;
			optional int32 framesDiscardedOnSend = 23;
			optional int32 framesDropped = 24;
			optional int32 framesEncoded = 25;
			optional double framesPerSecond = 26;
			optional int32 framesSent = 27;
			optional int32 fullFramesLost = 28;
			optional double gapDiscardRate = 29;
			optional double gapLossRate = 30;
			optional int64 headerBytesSent = 31;
			optional int32 height = 32;
			optional int32 hugeFramesSent = 33;
			optional double jitter = 34;
			optional int32 keyFramesEncoded = 35;
			optional int64 lastPacketSentTimestamp = 36;
			optional string mimeType = 37;
			optional int32 nackCount = 38;
			optional int32 packetsDiscarded = 39;
			optional int32 packetsDiscardedOnSend = 40;
			optional int32 packetsLost = 41;
			optional int32 packetsReceived = 42;
			optional int32 packetsRepaired = 43;
			optional int32 packetsSent = 44;
			optional int32 partialFramesLost = 45;
			optional int32 payloadType = 46;
			optional string peerConnectionId = 47;
			optional int32 perDscpPacketsSent = 48;
			optional int32 pliCount = 49;
			optional int64 qpSum = 50;
			optional double qualityLimitationDurationBandwidth = 51;
			optional double qualityLimitationDurationCPU = 52;
			optional double qualityLimitationDurationNone = 53;
			optional double qualityLimitationDurationOther = 54;
			optional string qualityLimitationReason = 55;
			optional int32 qualityLimitationResolutionChanges = 56;
			optional bool relayedSource = 57;
			optional int32 reportsReceived = 58;
			optional int64 retransmittedBytesSent = 59;
			optional int32 retransmittedPacketsSent = 60;
			optional string rid = 61;
			optional double roundTripTime = 62;
			optional int32 roundTripTimeMeasurements = 63;
			optional int64 rtxSsrc = 64;
			optional string sdpFmtpLine = 65;
			optional string sfuStreamId = 66;
			optional int32 sliCount = 67;
			optional int32 targetBitrate = 68;
			optional double totalEncodeTime = 69;
			optional int64 totalEncodedBytesTarget = 70;
			optional double totalPacketSendDelay = 71;
			optional double totalRoundTripTime = 72;
			optional string trackId = 73;
			optional int32 width = 74;
		}
		message IceLocalCandidate {
			optional string address = 1;
			optional string candidateType = 2;
			optional string id = 3;
			optional string peerConnectionId = 4;
			optional int32 port = 5;
			optional int64 priority = 6;
			optional string protocol = 7;
			optional string relayProtocol = 8;
			optional string url = 9;
		}
		message IceRemoteCandidate {
			optional string address = 1;
			optional string candidateType = 2;
			optional string id = 3;
			optional string peerConnectionId = 4;
			optional int32 port = 5;
			optional int64 priority = 6;
			optional string protocol = 7;
			optional string relayProtocol = 8;
			optional string url = 9;
		}
		message DataChannel {
			optional string address = 1;
			optional int64 bytesReceived = 2;
			optional int64 bytesSent = 3;
			optional int32 dataChannelIdentifier = 4;
			optional string id = 5;
			optional string label = 6;
			optional int32 messagesReceived = 7;
			optional int32 messagesSent = 8;
			optional string peerConnectionId = 9;
			optional int32 port = 10;
			optional string protocol = 11;
			optional string state = 12;
		}
		repeated Certificate certificates = 1;
		repeated MediaCodecStats codecs = 2;
		repeated DataChannel dataChannels = 3;
		repeated ExtensionStat extensionStats = 4;
		repeated IceLocalCandidate iceLocalCandidates = 5;
		repeated IceRemoteCandidate iceRemoteCandidates = 6;
		repeated string iceServers = 7;
		repeated InboundAudioTrack inboundAudioTracks = 8;
		repeated InboundVideoTrack inboundVideoTracks = 9;
		repeated string localSDPs = 10;
		repeated string mediaConstraints = 11;
		repeated MediaDevice mediaDevices = 12;
		repeated MediaSourceStat mediaSources = 13;
		repeated OutboundAudioTrack outboundAudioTracks = 14;
		repeated OutboundVideoTrack outboundVideoTracks = 15;
		repeated PeerConnectionTransport pcTransports = 16;
		repeated string userMediaErrors = 17;
		required string clientId = 18;
		required int64 timestamp = 19;
		optional Browser browser = 20;
		optional string callId = 21;
		optional Engine engine = 22;
		optional string marker = 23;
		optional OperationSystem os = 24;
		optional Platform platform = 25;
		optional string roomId = 26;
		optional int32 sampleSeq = 27;
		optional int32 timeZoneOffsetInHours = 28;
		optional string userId = 29;
	}
	message SfuSample {
		message SfuTransport {
			required string transportId = 1;
			optional string dtlsState = 2;
			optional string iceRole = 3;
			optional string iceState = 4;
			optional bool internal = 5;
			optional string localAddress = 6;
			optional int32 localPort = 7;
			optional bool noReport = 8;
			optional string protocol = 9;
			optional string remoteAddress = 10;
			optional int32 remotePort = 11;
			optional int64 rtpBytesReceived = 12;
			optional int64 rtpBytesSent = 13;
			optional int32 rtpPacketsLost = 14;
			optional int32 rtpPacketsReceived = 15;
			optional int32 rtpPacketsSent = 16;
			optional int64 rtxBytesReceived = 17;
			optional int64 rtxBytesSent = 18;
			optional int32 rtxPacketsDiscarded = 19;
			optional int32 rtxPacketsLost = 20;
			optional int32 rtxPacketsReceived = 21;
			optional int32 rtxPacketsSent = 22;
			optional int64 sctpBytesReceived = 23;
			optional int64 sctpBytesSent = 24;
			optional int32 sctpPacketsReceived = 25;
			optional int32 sctpPacketsSent = 26;
			optional string sctpState = 27;
		}
		message SfuInboundRtpPad {
			required string padId = 1;
			required int64 ssrc = 2;
			required string streamId = 3;
			required string transportId = 4;
			optional int64 bytesReceived = 5;
			optional int32 clockRate = 6;
			optional int32 fecPacketsDiscarded = 7;
			optional int32 fecPacketsReceived = 8;
			optional int32 firCount = 9;
			optional double fractionLost = 10;
			optional int32 framesDecoded = 11;
			optional int32 framesReceived = 12;
			optional bool internal = 13;
			optional double jitter = 14;
			optional int32 keyFramesDecoded = 15;
			optional string mediaType = 16;
			optional string mimeType = 17;
			optional int32 nackCount = 18;
			optional bool noReport = 19;
			optional int32 packetsDiscarded = 20;
			optional int32 packetsDuplicated = 21;
			optional int32 packetsFailedDecryption = 22;
			optional int32 packetsLost = 23;
			optional int32 packetsReceived = 24;
			optional int32 packetsRepaired = 25;
			optional int32 payloadType = 26;
			optional int32 pliCount = 27;
			optional string rid = 28;
			optional double roundTripTime = 29;
			optional int32 rtcpRrSent = 30;
			optional int32 rtcpSrReceived = 31;
			optional int32 rtxPacketsDiscarded = 32;
			optional int32 rtxPacketsReceived = 33;
			optional int64 rtxSsrc = 34;
			optional string sdpFmtpLine = 35;
			optional int32 sliCount = 36;
			optional int32 targetBitrate = 37;
			optional bool voiceActivityFlag = 38;
		}
		message SfuOutboundRtpPad {
			required string padId = 1;
			required string sinkId = 2;
			required int64 ssrc = 3;
			required string streamId = 4;
			required string transportId = 5;
			optional int64 bytesSent = 6;
			optional string callId = 7;
			optional string clientId = 8;
			optional int32 clockRate = 9;
			optional int32 fecPacketsDiscarded = 10;
			optional int32 fecPacketsSent = 11;
			optional int32 firCount = 12;
			optional double fractionLost = 13;
			optional int32 framesEncoded = 14;
			optional int32 framesSent = 15;
			optional bool internal = 16;
			optional double jitter = 17;
			optional int32 keyFramesEncoded = 18;
			optional string mediaType = 19;
			optional string mimeType = 20;
			optional int32 nackCount = 21;
			optional bool noReport = 22;
			optional int32 packetsDiscarded = 23;
			optional int32 packetsDuplicated = 24;
			optional int32 packetsFailedEncryption = 25;
			optional int32 packetsLost = 26;
			optional int32 packetsRetransmitted = 27;
			optional int32 packetsSent = 28;
			optional int32 payloadType = 29;
			optional int32 pliCount = 30;
			optional string rid = 31;
			optional double roundTripTime = 32;
			optional int32 rtcpRrReceived = 33;
			optional int32 rtcpSrSent = 34;
			optional int32 rtxPacketsDiscarded = 35;
			optional int32 rtxPacketsSent = 36;
			optional int64 rtxSsrc = 37;
			optional string sdpFmtpLine = 38;
			optional int32 sliCount = 39;
			optional int32 targetBitrate = 40;
			optional string trackId = 41;
			optional bool voiceActivityFlag = 42;
		}
		message SfuSctpChannel {
			required string channelId = 1;
			required string streamId = 2;
			required string transportId = 3;
			optional int64 bytesReceived = 4;
			optional int64 bytesSent = 5;
			optional string label = 6;
			optional int32 messageReceived = 7;
			optional int32 messageSent = 8;
			optional bool noReport = 9;
			optional string protocol = 10;
			optional double sctpCongestionWindow = 11;
			optional int32 sctpMtu = 12;
			optional double sctpReceiverWindow = 13;
			optional double sctpSmoothedRoundTripTime = 14;
			optional int32 sctpUnackData = 15;
		}
		message SfuExtensionStats {
			required string payload = 1;
			required string type = 2;
		}
		repeated SfuExtensionStats extensionStats = 1;
		repeated SfuInboundRtpPad inboundRtpPads = 2;
		repeated SfuOutboundRtpPad outboundRtpPads = 3;
		repeated SfuSctpChannel sctpChannels = 4;
		repeated SfuTransport transports = 5;
		required string sfuId = 6;
		required int64 timestamp = 7;
		optional string marker = 8;
		optional int32 timeZoneOffsetInHours = 9;
	}
	message TurnSample {
		message TurnPeerAllocation {
			required string peerId = 1;
			required string relayedAddress = 2;
			required int32 relayedPort = 3;
			required string sessionId = 4;
			required string transportProtocol = 5;
			optional string peerAddress = 6;
			optional int32 peerPort = 7;
			optional int64 receivedBytes = 8;
			optional int32 receivedPackets = 9;
			optional int32 receivingBitrate = 10;
			optional int32 sendingBitrate = 11;
			optional int64 sentBytes = 12;
			optional int32 sentPackets = 13;
		}
		message TurnSession {
			required string sessionId = 1;
			optional string clientAddress = 2;
			optional string clientId = 3;
			optional int32 clientPort = 4;
			optional int64 nonceExpirationTime = 5;
			optional string realm = 6;
			optional int64 receivedBytes = 7;
			optional int32 receivedPackets = 8;
			optional int32 receivingBitrate = 9;
			optional int32 sendingBitrate = 10;
			optional int64 sentBytes = 11;
			optional int32 sentPackets = 12;
			optional string serverAddress = 13;
			optional int32 serverPort = 14;
			optional int64 started = 15;
			optional string transportProtocol = 16;
			optional string username = 17;
		}
		repeated TurnPeerAllocation allocations = 1;
		repeated TurnSession sessions = 2;
		required string serverId = 3;
	}
	repeated ClientSample clientSamples = 1;
	repeated SfuSample sfuSamples = 2;
	repeated TurnSample turnSamples = 3;
	optional Controls controls = 4;
}
`;