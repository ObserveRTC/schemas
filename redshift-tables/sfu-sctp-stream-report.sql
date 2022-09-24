create table  IF NOT EXISTS sfu_sctp_stream_report (
	serviceid	VARCHAR(255)	not null,
	mediaunitid	VARCHAR(255)	not null,
	sfuid	CHAR(36)	not null,
	timestamp	BIGINT	not null,
	transportid	CHAR(36)	not null,
	streamid	CHAR(36)	not null,
	bytesreceived	BIGINT,
	bytessent	BIGINT,
	callid	CHAR(36),
	internal	BOOLEAN,
	label	VARCHAR(65535),
	marker	VARCHAR(65535),
	messagereceived	INTEGER,
	messagesent	INTEGER,
	protocol	VARCHAR(255),
	roomid	VARCHAR(255),
	sctpcongestionwindow	REAL,
	sctpmtu	INTEGER,
	sctpreceiverwindow	REAL,
	sctpsmoothedroundtriptime	REAL,
	sctpunackdata	INTEGER
) diststyle even;
ALTER TABLE sfu_sctp_stream_report ALTER diststyle KEY DISTKEY serviceid;
ALTER TABLE sfu_sctp_stream_report ALTER COMPOUND SORTKEY (sfuid, transportid, streamid, callid);