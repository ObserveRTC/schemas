CREATE TABLE observer.SfuMetaReport (
	serviceId	STRING	not null,
	timestamp	INT64	not null,
	callId	STRING,
	marker	STRING,
	mediaSinkId	STRING,
	mediaStreamId	STRING,
	mediaUnitId	STRING,
	payload	STRING,
	rtpPadId	STRING,
	sctpStreamId	STRING,
	sfuId	STRING,
	transportId	STRING,
	type	STRING
)