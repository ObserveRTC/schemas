create table  IF NOT EXISTS client_extension_report (
	serviceid	VARCHAR(255)	not null,
	timestamp	BIGINT	not null,
	extensiontype	VARCHAR(65535)	not null,
	callid	CHAR(36),
	clientid	CHAR(36),
	marker	VARCHAR(65535),
	mediaunitid	VARCHAR(255),
	payload	VARCHAR(65535),
	peerconnectionid	CHAR(36),
	roomid	VARCHAR(255),
	sampleseq	INTEGER,
	userid	VARCHAR(255)
) diststyle even;
ALTER TABLE client_extension_report ALTER diststyle KEY DISTKEY serviceid;
ALTER TABLE client_extension_report ALTER COMPOUND SORTKEY (callid, clientid, peerconnectionid);