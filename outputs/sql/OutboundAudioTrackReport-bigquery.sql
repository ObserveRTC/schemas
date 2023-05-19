CREATE TABLE observer.OutboundAudioTrackReport (
	serviceId	STRING	not null,
	mediaUnitId	STRING	not null,
	timestamp	INT64	not null,
	callId	STRING	not null,
	clientId	STRING	not null,
	peerConnectionId	STRING	not null,
	sampleSeq	INT64	not null,
	ssrc	INT64	not null,
	active	BOOL,
	audioLevel	FLOAT64,
	averageRtcpInterval	FLOAT64,
	bytesSent	INT64,
	droppedSamplesDuration	FLOAT64,
	droppedSamplesEvents	INT64,
	echoReturnLoss	FLOAT64,
	echoReturnLossEnhancement	FLOAT64,
	encoderImplementation	STRING,
	fractionLost	FLOAT64,
	headerBytesSent	INT64,
	jitter	FLOAT64,
	label	STRING,
	marker	STRING,
	nackCount	INT64,
	packetsLost	INT64,
	packetsReceived	INT64,
	packetsSent	INT64,
	relayedSource	BOOL,
	retransmittedBytesSent	INT64,
	retransmittedPacketsSent	INT64,
	rid	STRING,
	roomId	STRING,
	roundTripTime	FLOAT64,
	roundTripTimeMeasurements	INT64,
	sfuStreamId	STRING,
	targetBitrate	INT64,
	totalAudioEnergy	FLOAT64,
	totalCaptureDelay	FLOAT64,
	totalEncodedBytesTarget	INT64,
	totalPacketSendDelay	FLOAT64,
	totalRoundTripTime	FLOAT64,
	totalSamplesCaptured	FLOAT64,
	totalSamplesDuration	FLOAT64,
	trackId	STRING,
	userId	STRING
)