create table  IF NOT EXISTS sfu_event_report (
	serviceid	VARCHAR(1024)	not null,
	timestamp	BIGINT	not null,
	name	VARCHAR(65535)	not null,
	attachments	VARCHAR(65535),
	callid	VARCHAR(254),
	marker	VARCHAR(65535),
	mediasinkid	VARCHAR(1024),
	mediastreamid	VARCHAR(1024),
	mediaunitid	VARCHAR(1024),
	message	VARCHAR(65535),
	rtppadid	VARCHAR(1024),
	sctpstreamid	VARCHAR(1024),
	sfuid	VARCHAR(254),
	transportid	VARCHAR(254),
	value	VARCHAR(65535)
) diststyle even;
ALTER TABLE sfu_event_report ALTER diststyle KEY DISTKEY serviceid;
ALTER TABLE sfu_event_report ALTER COMPOUND SORTKEY (callid, sfuid, transportid);