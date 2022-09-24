create table  IF NOT EXISTS sfu_meta_report (
	serviceid	VARCHAR(255)	not null,
	timestamp	BIGINT	not null,
	callid	CHAR(36),
	marker	VARCHAR(65535),
	mediasinkid	VARCHAR(255),
	mediastreamid	VARCHAR(255),
	mediaunitid	VARCHAR(255),
	payload	VARCHAR(65535),
	rtppadid	VARCHAR(255),
	sctpstreamid	VARCHAR(255),
	sfuid	CHAR(36),
	transportid	CHAR(36),
	type	VARCHAR(65535)
) diststyle even;
ALTER TABLE sfu_meta_report ALTER diststyle KEY DISTKEY serviceid;
ALTER TABLE sfu_meta_report ALTER COMPOUND SORTKEY (callid, sfuid, transportid);