create table  IF NOT EXISTS sfu_event_report (
	serviceid	VARCHAR(255)	not null,
	timestamp	BIGINT	not null,
	name	VARCHAR(65535)	not null,
	attachments	VARCHAR(65535),
	callid	CHAR(36),
	marker	VARCHAR(65535),
	mediasinkid	VARCHAR(255),
	mediastreamid	VARCHAR(255),
	mediaunitid	VARCHAR(255),
	message	VARCHAR(65535),
	rtppadid	VARCHAR(255),
	sctpstreamid	VARCHAR(255),
	sfuid	CHAR(36),
	transportid	CHAR(36),
	value	VARCHAR(65535)
) diststyle even;
ALTER TABLE sfu_event_report ALTER diststyle KEY DISTKEY serviceid;
ALTER TABLE sfu_event_report ALTER COMPOUND SORTKEY (callid, sfuid, transportid);