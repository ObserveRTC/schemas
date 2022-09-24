export const schema = `
syntax = "proto3";

package org.observertc.schemas.protobuf;

message Samples {
	message Controls {
		string accessClaim = 1;
		bool close = 2;
	}
	message ClientSample {
		message Engine {
			string name = 1;
			string version = 2;
		}
		message Platform {
			string model = 1;
			string type = 2;
			string vendor = 3;
		}
		message Browser {
			string name = 1;
			string version = 2;
		}
		message OperationSystem {
			string name = 1;
			string version = 2;
			string versionName = 3;
		}
		message MediaDevice {
			string id = 1;
			string kind = 2;
			string label = 3;
		}
		message ExtensionStat {
			string payload = 1;
			string type = 2;
		}
		message DataChannelStats {
			string peerConnectionId = 1;
			int64 bytesReceived = 2;
			int64 bytesSent = 3;
			int32 dataChannelIdentifier = 4;
			string label = 5;
			int32 messageReceived = 6;
			int32 messageSent = 7;
			string protocol = 8;
			string state = 9;
		}
		message PeerConnectionTransport {
			string peerConnectionId = 1;
			string transportId = 2;
			int64 bytesReceived = 3;
			int64 bytesSent = 4;
			string dtlsCipher = 5;
			string dtlsState = 6;
			string iceLocalUsernameFragment = 7;
			string iceRole = 8;
			string iceState = 9;
			string localCertificateId = 10;
			int32 packetsReceived = 11;
			int32 packetsSent = 12;
			string remoteCertificateId = 13;
			int32 selectedCandidatePairChanges = 14;
			string selectedCandidatePairId = 15;
			string srtpCipher = 16;
			string tlsGroup = 17;
			string tlsVersion = 18;
		}
		message IceCandidatePairStats {
			string candidatePairId = 1;
			string peerConnectionId = 2;
			double availableIncomingBitrate = 3;
			double availableOutgoingBitrate = 4;
			int64 bytesDiscardedOnSend = 5;
			int64 bytesReceived = 6;
			int64 bytesSent = 7;
			int32 circuitBreakerTriggerCount = 8;
			int64 consentExpiredTimestamp = 9;
			int64 consentRequestBytesSent = 10;
			int32 consentRequestsSent = 11;
			double currentRoundTripTime = 12;
			int64 firstRequestTimestamp = 13;
			int64 lastPacketReceivedTimestamp = 14;
			int64 lastPacketSentTimestamp = 15;
			int64 lastRequestTimestamp = 16;
			int64 lastResponseTimestamp = 17;
			string localCandidateId = 18;
			int32 packetsDiscardedOnSend = 19;
			int32 packetsReceived = 20;
			int32 packetsSent = 21;
			string remoteCandidateId = 22;
			int64 requestBytesSent = 23;
			int32 requestsReceived = 24;
			int32 requestsSent = 25;
			int64 responseBytesSent = 26;
			int32 responsesReceived = 27;
			int32 responsesSent = 28;
			int32 retransmissionReceived = 29;
			int32 retransmissionSent = 30;
			string state = 31;
			double totalRoundTripTime = 32;
			string transportId = 33;
		}
		message MediaSourceStat {
			double audioLevel = 1;
			int32 bitDepth = 2;
			double echoReturnLoss = 3;
			double echoReturnLossEnhancement = 4;
			int32 frames = 5;
			double framesPerSecond = 6;
			int32 height = 7;
			string kind = 8;
			bool relayedSource = 9;
			double totalAudioEnergy = 10;
			double totalSamplesDuration = 11;
			string trackIdentifier = 12;
			int32 width = 13;
		}
		message MediaCodecStats {
			int32 channels = 1;
			int32 clockRate = 2;
			string codecType = 3;
			string mimeType = 4;
			string payloadType = 5;
			string sdpFmtpLine = 6;
		}
		message Certificate {
			string base64Certificate = 1;
			string fingerprint = 2;
			string fingerprintAlgorithm = 3;
			string issuerCertificateId = 4;
		}
		message InboundAudioTrack {
			int64 ssrc = 1;
			double averageRtcpInterval = 2;
			int32 burstDiscardCount = 3;
			double burstDiscardRate = 4;
			int32 burstLossCount = 5;
			double burstLossRate = 6;
			int32 burstPacketsDiscarded = 7;
			int32 burstPacketsLost = 8;
			int64 bytesReceived = 9;
			int64 bytesSent = 10;
			int32 channels = 11;
			int32 clockRate = 12;
			int32 concealedSamples = 13;
			int32 concealmentEvents = 14;
			string decoderImplementation = 15;
			bool ended = 16;
			int64 estimatedPlayoutTimestamp = 17;
			int32 fecPacketsDiscarded = 18;
			int32 fecPacketsReceived = 19;
			double gapDiscardRate = 20;
			double gapLossRate = 21;
			int64 headerBytesReceived = 22;
			int32 insertedSamplesForDeceleration = 23;
			double jitter = 24;
			double jitterBufferDelay = 25;
			int32 jitterBufferEmittedCount = 26;
			int64 lastPacketReceivedTimestamp = 27;
			string mimeType = 28;
			int32 nackCount = 29;
			int32 packetsDiscarded = 30;
			int32 packetsDuplicated = 31;
			int32 packetsFailedDecryption = 32;
			int32 packetsLost = 33;
			int32 packetsReceived = 34;
			int32 packetsRepaired = 35;
			int32 packetsSent = 36;
			int32 payloadType = 37;
			string peerConnectionId = 38;
			int32 perDscpPacketsReceived = 39;
			string remoteClientId = 40;
			int64 remoteTimestamp = 41;
			int32 removedSamplesForAcceleration = 42;
			int32 reportsSent = 43;
			double roundTripTime = 44;
			int32 roundTripTimeMeasurements = 45;
			int32 samplesDecodedWithCelt = 46;
			int32 samplesDecodedWithSilk = 47;
			string sdpFmtpLine = 48;
			string sfuSinkId = 49;
			string sfuStreamId = 50;
			int32 silentConcealedSamples = 51;
			double totalProcessingDelay = 52;
			double totalRoundTripTime = 53;
			int32 totalSamplesDecoded = 54;
			int32 totalSamplesReceived = 55;
			string trackId = 56;
			bool voiceActivityFlag = 57;
		}
		message InboundVideoTrack {
			int64 ssrc = 1;
			double averageRtcpInterval = 2;
			int32 burstDiscardCount = 3;
			double burstDiscardRate = 4;
			int32 burstLossCount = 5;
			double burstLossRate = 6;
			int32 burstPacketsDiscarded = 7;
			int32 burstPacketsLost = 8;
			int64 bytesReceived = 9;
			int64 bytesSent = 10;
			int32 channels = 11;
			int32 clockRate = 12;
			string decoderImplementation = 13;
			bool ended = 14;
			int64 estimatedPlayoutTimestamp = 15;
			int32 fecPacketsDiscarded = 16;
			int32 fecPacketsReceived = 17;
			int32 firCount = 18;
			int32 frameBitDepth = 19;
			int32 frameHeight = 20;
			int32 frameWidth = 21;
			int32 framesDecoded = 22;
			int32 framesDropped = 23;
			double framesPerSecond = 24;
			int32 framesReceived = 25;
			int32 fullFramesLost = 26;
			double gapDiscardRate = 27;
			double gapLossRate = 28;
			int64 headerBytesReceived = 29;
			double jitter = 30;
			double jitterBufferDelay = 31;
			int32 jitterBufferEmittedCount = 32;
			int32 keyFramesDecoded = 33;
			int64 lastPacketReceivedTimestamp = 34;
			string mimeType = 35;
			int32 nackCount = 36;
			int32 packetsDiscarded = 37;
			int32 packetsDuplicated = 38;
			int32 packetsFailedDecryption = 39;
			int32 packetsLost = 40;
			int32 packetsReceived = 41;
			int32 packetsRepaired = 42;
			int32 packetsSent = 43;
			int32 partialFramesLost = 44;
			int32 payloadType = 45;
			string peerConnectionId = 46;
			int32 perDscpPacketsReceived = 47;
			int32 pliCount = 48;
			int64 qpSum = 49;
			string remoteClientId = 50;
			int64 remoteTimestamp = 51;
			int32 reportsSent = 52;
			double roundTripTime = 53;
			int32 roundTripTimeMeasurements = 54;
			string sdpFmtpLine = 55;
			string sfuSinkId = 56;
			string sfuStreamId = 57;
			int32 sliCount = 58;
			double totalDecodeTime = 59;
			double totalInterFrameDelay = 60;
			double totalProcessingDelay = 61;
			double totalRoundTripTime = 62;
			double totalSquaredInterFrameDelay = 63;
			string trackId = 64;
		}
		message OutboundAudioTrack {
			int64 ssrc = 1;
			double audioLevel = 2;
			double averageRtcpInterval = 3;
			int32 burstDiscardCount = 4;
			double burstDiscardRate = 5;
			int32 burstLossCount = 6;
			double burstLossRate = 7;
			int32 burstPacketsDiscarded = 8;
			int32 burstPacketsLost = 9;
			int64 bytesDiscardedOnSend = 10;
			int64 bytesSent = 11;
			int32 channels = 12;
			int32 clockRate = 13;
			double echoReturnLoss = 14;
			double echoReturnLossEnhancement = 15;
			string encoderImplementation = 16;
			bool ended = 17;
			int32 fecPacketsSent = 18;
			double fractionLost = 19;
			double gapDiscardRate = 20;
			double gapLossRate = 21;
			int64 headerBytesSent = 22;
			double jitter = 23;
			int64 lastPacketSentTimestamp = 24;
			string mimeType = 25;
			int32 nackCount = 26;
			int32 packetsDiscarded = 27;
			int32 packetsDiscardedOnSend = 28;
			int32 packetsLost = 29;
			int32 packetsReceived = 30;
			int32 packetsRepaired = 31;
			int32 packetsSent = 32;
			int32 payloadType = 33;
			string peerConnectionId = 34;
			int32 perDscpPacketsSent = 35;
			bool relayedSource = 36;
			int32 reportsReceived = 37;
			int64 retransmittedBytesSent = 38;
			int32 retransmittedPacketsSent = 39;
			string rid = 40;
			double roundTripTime = 41;
			int32 roundTripTimeMeasurements = 42;
			int64 rtxSsrc = 43;
			int32 samplesEncodedWithCelt = 44;
			int32 samplesEncodedWithSilk = 45;
			string sdpFmtpLine = 46;
			string sfuStreamId = 47;
			int32 targetBitrate = 48;
			double totalAudioEnergy = 49;
			int64 totalEncodedBytesTarget = 50;
			double totalPacketSendDelay = 51;
			double totalRoundTripTime = 52;
			double totalSamplesDuration = 53;
			int32 totalSamplesSent = 54;
			string trackId = 55;
			bool voiceActivityFlag = 56;
		}
		message OutboundVideoTrack {
			int64 ssrc = 1;
			double averageRtcpInterval = 2;
			int32 bitDepth = 3;
			int32 burstDiscardCount = 4;
			double burstDiscardRate = 5;
			int32 burstLossCount = 6;
			double burstLossRate = 7;
			int32 burstPacketsDiscarded = 8;
			int32 burstPacketsLost = 9;
			int64 bytesDiscardedOnSend = 10;
			int64 bytesSent = 11;
			int32 channels = 12;
			int32 clockRate = 13;
			string encoderImplementation = 14;
			bool ended = 15;
			int32 fecPacketsSent = 16;
			int32 firCount = 17;
			double fractionLost = 18;
			int32 frameBitDepth = 19;
			int32 frameHeight = 20;
			int32 frameWidth = 21;
			int32 frames = 22;
			int32 framesDiscardedOnSend = 23;
			int32 framesDropped = 24;
			int32 framesEncoded = 25;
			double framesPerSecond = 26;
			int32 framesSent = 27;
			int32 fullFramesLost = 28;
			double gapDiscardRate = 29;
			double gapLossRate = 30;
			int64 headerBytesSent = 31;
			int32 height = 32;
			int32 hugeFramesSent = 33;
			double jitter = 34;
			int32 keyFramesEncoded = 35;
			int64 lastPacketSentTimestamp = 36;
			string mimeType = 37;
			int32 nackCount = 38;
			int32 packetsDiscarded = 39;
			int32 packetsDiscardedOnSend = 40;
			int32 packetsLost = 41;
			int32 packetsReceived = 42;
			int32 packetsRepaired = 43;
			int32 packetsSent = 44;
			int32 partialFramesLost = 45;
			int32 payloadType = 46;
			string peerConnectionId = 47;
			int32 perDscpPacketsSent = 48;
			int32 pliCount = 49;
			int64 qpSum = 50;
			double qualityLimitationDurationBandwidth = 51;
			double qualityLimitationDurationCPU = 52;
			double qualityLimitationDurationNone = 53;
			double qualityLimitationDurationOther = 54;
			string qualityLimitationReason = 55;
			int32 qualityLimitationResolutionChanges = 56;
			bool relayedSource = 57;
			int32 reportsReceived = 58;
			int64 retransmittedBytesSent = 59;
			int32 retransmittedPacketsSent = 60;
			string rid = 61;
			double roundTripTime = 62;
			int32 roundTripTimeMeasurements = 63;
			int64 rtxSsrc = 64;
			string sdpFmtpLine = 65;
			string sfuStreamId = 66;
			int32 sliCount = 67;
			int32 targetBitrate = 68;
			double totalEncodeTime = 69;
			int64 totalEncodedBytesTarget = 70;
			double totalPacketSendDelay = 71;
			double totalRoundTripTime = 72;
			string trackId = 73;
			int32 width = 74;
		}
		message IceLocalCandidate {
			string address = 1;
			string candidateType = 2;
			string id = 3;
			string peerConnectionId = 4;
			int32 port = 5;
			int64 priority = 6;
			string protocol = 7;
			string relayProtocol = 8;
			string url = 9;
		}
		message IceRemoteCandidate {
			string address = 1;
			string candidateType = 2;
			string id = 3;
			string peerConnectionId = 4;
			int32 port = 5;
			int64 priority = 6;
			string protocol = 7;
			string relayProtocol = 8;
			string url = 9;
		}
		repeated Certificate certificates = 1;
		repeated MediaCodecStats codecs = 2;
		repeated DataChannelStats dataChannels = 3;
		repeated ExtensionStat extensionStats = 4;
		repeated IceCandidatePairStats iceCandidatePairs = 5;
		repeated IceLocalCandidate iceLocalCandidates = 6;
		repeated IceRemoteCandidate iceRemoteCandidates = 7;
		repeated string iceServers = 8;
		repeated InboundAudioTrack inboundAudioTracks = 9;
		repeated InboundVideoTrack inboundVideoTracks = 10;
		repeated string localSDPs = 11;
		repeated string mediaConstraints = 12;
		repeated MediaDevice mediaDevices = 13;
		repeated MediaSourceStat mediaSources = 14;
		repeated OutboundAudioTrack outboundAudioTracks = 15;
		repeated OutboundVideoTrack outboundVideoTracks = 16;
		repeated PeerConnectionTransport pcTransports = 17;
		repeated string userMediaErrors = 18;
		string clientId = 19;
		int64 timestamp = 20;
		Browser browser = 21;
		string callId = 22;
		Engine engine = 23;
		string marker = 24;
		OperationSystem os = 25;
		Platform platform = 26;
		string roomId = 27;
		int32 sampleSeq = 28;
		int32 timeZoneOffsetInHours = 29;
		string userId = 30;
	}
	message SfuSample {
		message SfuTransport {
			string transportId = 1;
			string dtlsState = 2;
			string iceRole = 3;
			string iceState = 4;
			bool internal = 5;
			string localAddress = 6;
			int32 localPort = 7;
			bool noReport = 8;
			string protocol = 9;
			string remoteAddress = 10;
			int32 remotePort = 11;
			int64 rtpBytesReceived = 12;
			int64 rtpBytesSent = 13;
			int32 rtpPacketsLost = 14;
			int32 rtpPacketsReceived = 15;
			int32 rtpPacketsSent = 16;
			int64 rtxBytesReceived = 17;
			int64 rtxBytesSent = 18;
			int32 rtxPacketsDiscarded = 19;
			int32 rtxPacketsLost = 20;
			int32 rtxPacketsReceived = 21;
			int32 rtxPacketsSent = 22;
			int64 sctpBytesReceived = 23;
			int64 sctpBytesSent = 24;
			int32 sctpPacketsReceived = 25;
			int32 sctpPacketsSent = 26;
			string sctpState = 27;
		}
		message SfuInboundRtpPad {
			string padId = 1;
			int64 ssrc = 2;
			string streamId = 3;
			string transportId = 4;
			int64 bytesReceived = 5;
			int32 clockRate = 6;
			int32 fecPacketsDiscarded = 7;
			int32 fecPacketsReceived = 8;
			int32 firCount = 9;
			double fractionLost = 10;
			int32 framesDecoded = 11;
			int32 framesReceived = 12;
			bool internal = 13;
			double jitter = 14;
			int32 keyFramesDecoded = 15;
			string mediaType = 16;
			string mimeType = 17;
			int32 nackCount = 18;
			bool noReport = 19;
			int32 packetsDiscarded = 20;
			int32 packetsDuplicated = 21;
			int32 packetsFailedDecryption = 22;
			int32 packetsLost = 23;
			int32 packetsReceived = 24;
			int32 packetsRepaired = 25;
			int32 payloadType = 26;
			int32 pliCount = 27;
			string rid = 28;
			double roundTripTime = 29;
			int32 rtcpRrSent = 30;
			int32 rtcpSrReceived = 31;
			int32 rtxPacketsDiscarded = 32;
			int32 rtxPacketsReceived = 33;
			int64 rtxSsrc = 34;
			string sdpFmtpLine = 35;
			int32 sliCount = 36;
			int32 targetBitrate = 37;
			bool voiceActivityFlag = 38;
		}
		message SfuOutboundRtpPad {
			string padId = 1;
			string sinkId = 2;
			int64 ssrc = 3;
			string streamId = 4;
			string transportId = 5;
			int64 bytesSent = 6;
			string callId = 7;
			string clientId = 8;
			int32 clockRate = 9;
			int32 fecPacketsDiscarded = 10;
			int32 fecPacketsSent = 11;
			int32 firCount = 12;
			double fractionLost = 13;
			int32 framesEncoded = 14;
			int32 framesSent = 15;
			bool internal = 16;
			double jitter = 17;
			int32 keyFramesEncoded = 18;
			string mediaType = 19;
			string mimeType = 20;
			int32 nackCount = 21;
			bool noReport = 22;
			int32 packetsDiscarded = 23;
			int32 packetsDuplicated = 24;
			int32 packetsFailedEncryption = 25;
			int32 packetsLost = 26;
			int32 packetsRetransmitted = 27;
			int32 packetsSent = 28;
			int32 payloadType = 29;
			int32 pliCount = 30;
			string rid = 31;
			double roundTripTime = 32;
			int32 rtcpRrReceived = 33;
			int32 rtcpSrSent = 34;
			int32 rtxPacketsDiscarded = 35;
			int32 rtxPacketsSent = 36;
			int64 rtxSsrc = 37;
			string sdpFmtpLine = 38;
			int32 sliCount = 39;
			int32 targetBitrate = 40;
			string trackId = 41;
			bool voiceActivityFlag = 42;
		}
		message SfuSctpChannel {
			string channelId = 1;
			string streamId = 2;
			string transportId = 3;
			int64 bytesReceived = 4;
			int64 bytesSent = 5;
			bool internal = 6;
			string label = 7;
			int32 messageReceived = 8;
			int32 messageSent = 9;
			bool noReport = 10;
			string protocol = 11;
			double sctpCongestionWindow = 12;
			int32 sctpMtu = 13;
			double sctpReceiverWindow = 14;
			double sctpSmoothedRoundTripTime = 15;
			int32 sctpUnackData = 16;
		}
		message SfuExtensionStats {
			string payload = 1;
			string type = 2;
		}
		repeated SfuExtensionStats extensionStats = 1;
		repeated SfuInboundRtpPad inboundRtpPads = 2;
		repeated SfuOutboundRtpPad outboundRtpPads = 3;
		repeated SfuSctpChannel sctpChannels = 4;
		repeated SfuTransport transports = 5;
		string sfuId = 6;
		int64 timestamp = 7;
		string marker = 8;
		int32 timeZoneOffsetInHours = 9;
	}
	message TurnSample {
		message TurnPeerAllocation {
			string peerId = 1;
			string relayedAddress = 2;
			int32 relayedPort = 3;
			string sessionId = 4;
			string transportProtocol = 5;
			string peerAddress = 6;
			int32 peerPort = 7;
			int64 receivedBytes = 8;
			int32 receivedPackets = 9;
			int32 receivingBitrate = 10;
			int32 sendingBitrate = 11;
			int64 sentBytes = 12;
			int32 sentPackets = 13;
		}
		message TurnSession {
			string sessionId = 1;
			string clientAddress = 2;
			string clientId = 3;
			int32 clientPort = 4;
			int64 nonceExpirationTime = 5;
			string realm = 6;
			int64 receivedBytes = 7;
			int32 receivedPackets = 8;
			int32 receivingBitrate = 9;
			int32 sendingBitrate = 10;
			int64 sentBytes = 11;
			int32 sentPackets = 12;
			string serverAddress = 13;
			int32 serverPort = 14;
			int64 started = 15;
			string transportProtocol = 16;
			string username = 17;
		}
		repeated TurnPeerAllocation allocations = 1;
		repeated TurnSession sessions = 2;
		string serverId = 3;
	}
	repeated ClientSample clientSamples = 1;
	repeated SfuSample sfuSamples = 2;
	repeated TurnSample turnSamples = 3;
	Controls controls = 4;
}
`;