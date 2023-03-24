create table  IF NOT EXISTS call_meta_report (
	serviceid	VARCHAR(1024)	not null,
	timestamp	BIGINT	not null,
	callid	VARCHAR(254),
	clientid	VARCHAR(254),
	marker	VARCHAR(65535),
	mediaunitid	VARCHAR(1024),
	payload	VARCHAR(65535),
	peerconnectionid	VARCHAR(254),
	roomid	VARCHAR(1024),
	sampleseq	INTEGER,
	sampletimestamp	BIGINT,
	type	VARCHAR(65535),
	userid	VARCHAR(1024)
) diststyle even;
ALTER TABLE call_meta_report ALTER diststyle KEY DISTKEY serviceid;
ALTER TABLE call_meta_report ALTER COMPOUND SORTKEY (callid, clientid, peerconnectionid);