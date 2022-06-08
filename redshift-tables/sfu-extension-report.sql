create table  IF NOT EXISTS SfuExtensionReport (
	serviceId	VARCHAR(255)	not null,
	timestamp	BIGINT	not null,
	extensionType	VARCHAR(65535)	not null,
	marker	VARCHAR(65535),
	mediaUnitId	VARCHAR(255),
	payload	VARCHAR(65535),
	sfuId	CHAR(36),
)