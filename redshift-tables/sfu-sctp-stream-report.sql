create table  IF NOT EXISTS sfu_sctp_stream_report (
	serviceid	VARCHAR(1024)	not null,
	mediaunitid	VARCHAR(1024)	not null,
	sfuid	VARCHAR(254)	not null,
	timestamp	BIGINT	not null,
	transportid	VARCHAR(254)	not null,
	streamid	VARCHAR(254)	not null,
	bytesreceived	BIGINT,
	bytessent	BIGINT,
	callid	VARCHAR(254),
	internal	BOOLEAN,
	label	VARCHAR(65535),
	marker	VARCHAR(65535),
	messagereceived	INTEGER,
	messagesent	INTEGER,
	protocol	VARCHAR(1024),
	roomid	VARCHAR(1024),
	sctpcongestionwindow	REAL,
	sctpmtu	INTEGER,
	sctpreceiverwindow	REAL,
	sctpsmoothedroundtriptime	REAL,
	sctpunackdata	INTEGER
) diststyle even;
ALTER TABLE sfu_sctp_stream_report ALTER diststyle KEY DISTKEY serviceid;
ALTER TABLE sfu_sctp_stream_report ALTER COMPOUND SORTKEY (sfuid, transportid, streamid, callid);