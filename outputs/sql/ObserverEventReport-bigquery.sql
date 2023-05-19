CREATE TABLE observer.ObserverEventReport (
	serviceId	STRING	not null,
	timestamp	INT64	not null,
	callId	STRING	not null,
	name	STRING	not null,
	attachments	STRING,
	clientId	STRING,
	marker	STRING,
	mediaUnitId	STRING,
	message	STRING,
	peerConnectionId	STRING,
	roomId	STRING,
	sampleSeq	INT64,
	sampleTimestamp	INT64,
	userId	STRING,
	value	STRING
)