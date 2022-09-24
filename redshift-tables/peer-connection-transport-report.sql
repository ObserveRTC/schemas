create table  IF NOT EXISTS peer_connection_transport_report (
	serviceid	VARCHAR(255)	not null,
	mediaunitid	VARCHAR(255)	not null,
	timestamp	BIGINT	not null,
	callid	CHAR(36)	not null,
	clientid	CHAR(36)	not null,
	peerconnectionid	CHAR(36)	not null,
	bytesreceived	BIGINT,
	bytessent	BIGINT,
	dtlscipher	VARCHAR(65535),
	dtlsstate	VARCHAR(255),
	icelocalusernamefragment	VARCHAR(65535),
	icerole	VARCHAR(65535),
	icestate	VARCHAR(255),
	label	VARCHAR(65535),
	localcertificateid	VARCHAR(255),
	marker	VARCHAR(65535),
	packetsreceived	INTEGER,
	packetssent	INTEGER,
	remotecertificateid	VARCHAR(255),
	roomid	VARCHAR(255),
	selectedcandidatepairchanges	INTEGER,
	selectedcandidatepairid	VARCHAR(255),
	srtpcipher	VARCHAR(65535),
	tlsgroup	VARCHAR(65535),
	tlsversion	VARCHAR(65535),
	userid	VARCHAR(255)
) diststyle even;
ALTER TABLE peer_connection_transport_report ALTER diststyle KEY DISTKEY serviceid;
ALTER TABLE peer_connection_transport_report ALTER COMPOUND SORTKEY (callid, clientid, peerconnectionid);