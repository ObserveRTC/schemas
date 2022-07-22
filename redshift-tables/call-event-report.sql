create table  IF NOT EXISTS call_event_report (
	serviceid	VARCHAR(255)	not null,
	timestamp	BIGINT	not null,
	name	VARCHAR(65535)	not null,
	attachments	VARCHAR(65535),
	callid	CHAR(36),
	clientid	CHAR(36),
	marker	VARCHAR(65535),
	mediatrackid	VARCHAR(255),
	mediaunitid	VARCHAR(255),
	message	VARCHAR(65535),
	peerconnectionid	CHAR(36),
	roomid	VARCHAR(255),
	sampleseq	INTEGER,
	sampletimestamp	BIGINT,
	ssrc	BIGINT,
	userid	VARCHAR(255),
	value	VARCHAR(65535)
) diststyle even;
ALTER TABLE call_event_report ALTER diststyle KEY DISTKEY serviceid;
ALTER TABLE call_event_report ALTER COMPOUND SORTKEY (callid, clientid, peerconnectionid);