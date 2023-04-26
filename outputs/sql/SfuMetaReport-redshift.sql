create table  IF NOT EXISTS sfu_meta_report (
	serviceid	VARCHAR(1024)	not null,
	timestamp	BIGINT	not null,
	callid	VARCHAR(254),
	marker	VARCHAR(65535),
	mediasinkid	VARCHAR(1024),
	mediastreamid	VARCHAR(1024),
	mediaunitid	VARCHAR(1024),
	payload	VARCHAR(65535),
	rtppadid	VARCHAR(1024),
	sctpstreamid	VARCHAR(1024),
	sfuid	VARCHAR(254),
	transportid	VARCHAR(254),
	type	VARCHAR(65535)
) diststyle even;
ALTER TABLE sfu_meta_report ALTER diststyle KEY DISTKEY serviceid;
ALTER TABLE sfu_meta_report ALTER COMPOUND SORTKEY (callid, sfuid, transportid);