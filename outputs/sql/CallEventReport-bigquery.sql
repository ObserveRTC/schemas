CREATE TABLE observer.CallEventReport (
	serviceId	STRING	not null,
	timestamp	INT64	not null,
	name	STRING	not null,
	attachments	STRING,
	callId	STRING,
	clientId	STRING,
	marker	STRING,
	mediaTrackId	STRING,
	mediaUnitId	STRING,
	message	STRING,
	peerConnectionId	STRING,
	roomId	STRING,
	sampleSeq	INT64,
	sampleTimestamp	INT64,
	SSRC	INT64,
	userId	STRING,
	value	STRING
)