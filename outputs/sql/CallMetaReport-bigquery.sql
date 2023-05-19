CREATE TABLE observer.CallMetaReport (
	serviceId	STRING	not null,
	timestamp	INT64	not null,
	callId	STRING,
	clientId	STRING,
	marker	STRING,
	mediaUnitId	STRING,
	payload	STRING,
	peerConnectionId	STRING,
	roomId	STRING,
	sampleSeq	INT64,
	sampleTimestamp	INT64,
	type	STRING,
	userId	STRING
)