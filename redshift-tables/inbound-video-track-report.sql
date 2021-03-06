create table  IF NOT EXISTS InboundVideoTrackReport (
	serviceId	VARCHAR(255)	not null,
	mediaUnitId	VARCHAR(255)	not null,
	timestamp	BIGINT	not null,
	callId	CHAR(36)	not null,
	clientId	CHAR(36)	not null,
	peerConnectionId	CHAR(36)	not null,
	sampleSeq	INTEGER	not null,
	ssrc	BIGINT	not null,
	averageRtcpInterval	REAL,
	burstDiscardCount	INTEGER,
	burstDiscardRate	REAL,
	burstLossCount	INTEGER,
	burstLossRate	REAL,
	burstPacketsDiscarded	INTEGER,
	burstPacketsLost	INTEGER,
	bytesReceived	BIGINT,
	bytesSent	BIGINT,
	clockRate	INTEGER,
	decoderImplementation	VARCHAR(65535),
	ended	BOOLEAN,
	estimatedPlayoutTimestamp	BIGINT,
	fecPacketsDiscarded	INTEGER,
	fecPacketsReceived	INTEGER,
	firCount	INTEGER,
	frameBitDepth	INTEGER,
	frameHeight	INTEGER,
	framesDecoded	INTEGER,
	framesDropped	INTEGER,
	framesPerSecond	REAL,
	framesReceived	INTEGER,
	frameWidth	INTEGER,
	fullFramesLost	INTEGER,
	gapDiscardRate	REAL,
	gapLossRate	REAL,
	headerBytesReceived	BIGINT,
	jitter	REAL,
	jitterBufferDelay	REAL,
	jitterBufferEmittedCount	INTEGER,
	keyFramesDecoded	INTEGER,
	label	VARCHAR(65535),
	lastPacketReceivedTimestamp	BIGINT,
	marker	VARCHAR(65535),
	mimeType	VARCHAR(65535),
	nackCount	INTEGER,
	packetsDiscarded	INTEGER,
	packetsDuplicated	INTEGER,
	packetsFailedDecryption	INTEGER,
	packetsLost	INTEGER,
	packetsReceived	INTEGER,
	packetsRepaired	INTEGER,
	packetsSent	INTEGER,
	partialFramesLost	INTEGER,
	payloadType	INTEGER,
	perDscpPacketsReceived	INTEGER,
	pliCount	INTEGER,
	qpSum	BIGINT,
	remoteClientId	VARCHAR(255),
	remotePeerConnectionId	VARCHAR(255),
	remoteTimestamp	BIGINT,
	remoteTrackId	VARCHAR(255),
	remoteUserId	VARCHAR(255),
	reportsSent	INTEGER,
	roomId	VARCHAR(255),
	sdpFmtpLine	VARCHAR(65535),
	sfuSinkId	CHAR(36),
	sfuStreamId	CHAR(36),
	sliCount	INTEGER,
	totalDecodeTime	REAL,
	totalInterFrameDelay	REAL,
	totalProcessingDelay	REAL,
	totalSquaredInterFrameDelay	REAL,
	trackId	CHAR(36),
	userId	VARCHAR(255),
)