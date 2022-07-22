create table  IF NOT EXISTS client_data_channel_report (
	serviceid	VARCHAR(255)	not null,
	mediaunitid	VARCHAR(255)	not null,
	timestamp	BIGINT	not null,
	callid	CHAR(36)	not null,
	clientid	CHAR(36)	not null,
	peerconnectionid	CHAR(36)	not null,
	sampleseq	INTEGER	not null,
	bytesreceived	BIGINT,
	bytessent	BIGINT,
	label	VARCHAR(65535),
	marker	VARCHAR(65535),
	messagesreceived	INTEGER,
	messagessent	INTEGER,
	peerconnectionlabel	VARCHAR(65535),
	protocol	VARCHAR(255),
	roomid	VARCHAR(255),
	state	VARCHAR(255),
	userid	VARCHAR(255)
) diststyle even;
ALTER TABLE client_data_channel_report ALTER diststyle KEY DISTKEY serviceid;
ALTER TABLE client_data_channel_report ALTER COMPOUND SORTKEY (callid, clientid, peerconnectionid);