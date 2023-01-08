create table  IF NOT EXISTS call_event_report (
	serviceid	VARCHAR(1024)	not null,
	timestamp	BIGINT	not null,
	name	VARCHAR(65535)	not null,
	attachments	VARCHAR(65535),
	callid	VARCHAR(254),
	clientid	VARCHAR(254),
	marker	VARCHAR(65535),
	mediatrackid	VARCHAR(1024),
	mediaunitid	VARCHAR(1024),
	message	VARCHAR(65535),
	peerconnectionid	VARCHAR(254),
	roomid	VARCHAR(1024),
	sampleseq	INTEGER,
	sampletimestamp	BIGINT,
	ssrc	BIGINT,
	userid	VARCHAR(1024),
	value	VARCHAR(65535)
) diststyle even;
ALTER TABLE call_event_report ALTER diststyle KEY DISTKEY serviceid;
ALTER TABLE call_event_report ALTER COMPOUND SORTKEY (callid, clientid, peerconnectionid);