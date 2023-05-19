CREATE TABLE observer.ClientExtensionReport (
	serviceId	STRING	not null,
	timestamp	INT64	not null,
	extensionType	STRING	not null,
	callId	STRING,
	clientId	STRING,
	marker	STRING,
	mediaUnitId	STRING,
	payload	STRING,
	peerConnectionId	STRING,
	roomId	STRING,
	sampleSeq	INT64,
	userId	STRING
)