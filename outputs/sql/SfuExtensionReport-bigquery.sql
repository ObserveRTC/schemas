CREATE TABLE observer.SfuExtensionReport (
	serviceId	STRING	not null,
	timestamp	INT64	not null,
	extensionType	STRING	not null,
	marker	STRING,
	mediaUnitId	STRING,
	payload	STRING,
	sfuId	STRING
)