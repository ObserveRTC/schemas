create table  IF NOT EXISTS SfuMetaReport (
	serviceId	VARCHAR(255)	not null,
	timestamp	BIGINT	not null,
	callId	CHAR(36),
	marker	VARCHAR(65535),
	mediaSinkId	VARCHAR(255),
	mediaStreamId	VARCHAR(255),
	mediaUnitId	VARCHAR(255),
	payload	VARCHAR(65535),
	rtpPadId	VARCHAR(255),
	sctpStreamId	VARCHAR(255),
	sfuId	CHAR(36),
	transportId	CHAR(36),
	type	VARCHAR(65535),
)