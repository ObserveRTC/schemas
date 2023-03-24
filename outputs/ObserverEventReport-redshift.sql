create table  IF NOT EXISTS observer_event_report (
	serviceid	VARCHAR(1024)	not null,
	timestamp	BIGINT	not null,
	callid	VARCHAR(254)	not null,
	name	VARCHAR(65535)	not null,
	attachments	VARCHAR(65535),
	clientid	VARCHAR(254),
	marker	VARCHAR(65535),
	mediaunitid	VARCHAR(1024),
	message	VARCHAR(65535),
	peerconnectionid	VARCHAR(254),
	roomid	VARCHAR(1024),
	sampleseq	INTEGER,
	sampletimestamp	BIGINT,
	userid	VARCHAR(1024),
	value	VARCHAR(65535)
) diststyle even;
ALTER TABLE observer_event_report ALTER diststyle KEY DISTKEY serviceid;
ALTER TABLE observer_event_report ALTER COMPOUND SORTKEY (callid, clientid, peerconnectionid);