create table  IF NOT EXISTS call_meta_report (
	serviceid	VARCHAR(255)	not null,
	timestamp	BIGINT	not null,
	callid	CHAR(36),
	clientid	CHAR(36),
	marker	VARCHAR(65535),
	mediaunitid	VARCHAR(255),
	payload	VARCHAR(65535),
	peerconnectionid	CHAR(36),
	roomid	VARCHAR(255),
	sampleseq	INTEGER,
	sampletimestamp	BIGINT,
	type	VARCHAR(65535),
	userid	VARCHAR(255)
) diststyle even;
ALTER TABLE call_meta_report ALTER diststyle KEY DISTKEY serviceid;
ALTER TABLE call_meta_report ALTER COMPOUND SORTKEY (callid, clientid, peerconnectionid);