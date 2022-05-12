create table  IF NOT EXISTS ClientExtensionReport (
	serviceId	VARCHAR(255)	not null,
	timestamp	BIGINT	not null,
	extensionType	VARCHAR(65535)	not null,
	mediaUnitId	VARCHAR(255),
	marker	VARCHAR(65535),
	callId	CHAR(36),
	roomId	VARCHAR(255),
	clientId	CHAR(36),
	userId	VARCHAR(255),
	peerConnectionId	CHAR(36),
	sampleSeq	INTEGER,
	payload	VARCHAR(65535),
)