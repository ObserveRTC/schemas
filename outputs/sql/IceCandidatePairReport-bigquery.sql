CREATE TABLE observer.IceCandidatePairReport (
	serviceId	STRING	not null,
	mediaUnitId	STRING	not null,
	timestamp	INT64	not null,
	callId	STRING	not null,
	clientId	STRING	not null,
	peerConnectionId	STRING	not null,
	sampleSeq	INT64	not null,
	availableIncomingBitrate	FLOAT64,
	availableOutgoingBitrate	FLOAT64,
	bytesDiscardedOnSend	INT64,
	bytesReceived	INT64,
	bytesSent	INT64,
	consentRequestsSent	INT64,
	currentRoundTripTime	FLOAT64,
	label	STRING,
	lastPacketReceivedTimestamp	INT64,
	lastPacketSentTimestamp	INT64,
	localCandidateId	STRING,
	marker	STRING,
	nominated	BOOL,
	packetsDiscardedOnSend	INT64,
	packetsReceived	INT64,
	packetsSent	INT64,
	remoteCandidateId	STRING,
	requestsReceived	INT64,
	requestsSent	INT64,
	responsesReceived	INT64,
	responsesSent	INT64,
	roomId	STRING,
	state	STRING,
	totalRoundTripTime	FLOAT64,
	transportId	STRING,
	userId	STRING
)