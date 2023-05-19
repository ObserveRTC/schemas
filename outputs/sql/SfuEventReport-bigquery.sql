CREATE TABLE observer.SfuEventReport (
	serviceId	STRING	not null,
	timestamp	INT64	not null,
	name	STRING	not null,
	attachments	STRING,
	callId	STRING,
	marker	STRING,
	mediaSinkId	STRING,
	mediaStreamId	STRING,
	mediaUnitId	STRING,
	message	STRING,
	rtpPadId	STRING,
	sctpStreamId	STRING,
	sfuId	STRING,
	transportId	STRING,
	value	STRING
)