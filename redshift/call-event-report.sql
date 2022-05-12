create table  IF NOT EXISTS CallEventReport (
	serviceId	VARCHAR(255)	not null,
	timestamp	BIGINT	not null,
	name	VARCHAR(65535)	not null,
	mediaUnitId	VARCHAR(255),
	marker	VARCHAR(65535),
	callId	CHAR(36),
	roomId	VARCHAR(255),
	clientId	CHAR(36),
	userId	VARCHAR(255),
	peerConnectionId	CHAR(36),
	mediaTrackId	VARCHAR(255),
	SSRC	BIGINT,
	sampleTimestamp	BIGINT,
	sampleSeq	INTEGER,
	message	VARCHAR(65535),
	value	VARCHAR(65535),
	attachments	VARCHAR(65535),
)