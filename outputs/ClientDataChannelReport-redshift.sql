create table  IF NOT EXISTS client_data_channel_report (
	serviceid	VARCHAR(1024)	not null,
	mediaunitid	VARCHAR(1024)	not null,
	timestamp	BIGINT	not null,
	callid	VARCHAR(254)	not null,
	clientid	VARCHAR(254)	not null,
	peerconnectionid	VARCHAR(254)	not null,
	sampleseq	INTEGER	not null,
	bytesreceived	BIGINT,
	bytessent	BIGINT,
	label	VARCHAR(65535),
	marker	VARCHAR(65535),
	messagesreceived	INTEGER,
	messagessent	INTEGER,
	peerconnectionlabel	VARCHAR(65535),
	protocol	VARCHAR(1024),
	roomid	VARCHAR(1024),
	state	VARCHAR(1024),
	userid	VARCHAR(1024)
) diststyle even;
ALTER TABLE client_data_channel_report ALTER diststyle KEY DISTKEY serviceid;
ALTER TABLE client_data_channel_report ALTER COMPOUND SORTKEY (callid, clientid, peerconnectionid);