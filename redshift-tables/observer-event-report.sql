create table  IF NOT EXISTS observer_event_report (
	serviceid	VARCHAR(255)	not null,
	timestamp	BIGINT	not null,
	callid	CHAR(36)	not null,
	name	VARCHAR(65535)	not null,
	attachments	VARCHAR(65535),
	clientid	CHAR(36),
	marker	VARCHAR(65535),
	mediaunitid	VARCHAR(255),
	message	VARCHAR(65535),
	peerconnectionid	CHAR(36),
	roomid	VARCHAR(255),
	sampleseq	INTEGER,
	sampletimestamp	BIGINT,
	userid	VARCHAR(255),
	value	VARCHAR(65535)
) diststyle even;
ALTER TABLE observer_event_report ALTER diststyle KEY DISTKEY serviceid;
ALTER TABLE observer_event_report ALTER COMPOUND SORTKEY (callid, clientid, peerconnectionid);