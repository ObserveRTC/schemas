create table  IF NOT EXISTS ClientExtensionReport (
	serviceId	VARCHAR(255)	not null,
	timestamp	BIGINT	not null,
	extensionType	VARCHAR(65535)	not null,
	callId	CHAR(36),
	clientId	CHAR(36),
	marker	VARCHAR(65535),
	mediaUnitId	VARCHAR(255),
	payload	VARCHAR(65535),
	peerConnectionId	CHAR(36),
	roomId	VARCHAR(255),
	sampleSeq	INTEGER,
	userId	VARCHAR(255),
)