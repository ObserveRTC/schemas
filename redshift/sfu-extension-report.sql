create table  IF NOT EXISTS SfuExtensionReport (
	serviceId	VARCHAR(255)	not null,
	timestamp	BIGINT	not null,
	extensionType	VARCHAR(65535)	not null,
	mediaUnitId	VARCHAR(255),
	marker	VARCHAR(65535),
	sfuId	CHAR(36),
	payload	VARCHAR(65535),
)