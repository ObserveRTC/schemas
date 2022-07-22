create table  IF NOT EXISTS inbound_audio_track_report (
	serviceid	VARCHAR(255)	not null,
	mediaunitid	VARCHAR(255)	not null,
	timestamp	BIGINT	not null,
	callid	CHAR(36)	not null,
	clientid	CHAR(36)	not null,
	peerconnectionid	CHAR(36)	not null,
	sampleseq	INTEGER	not null,
	ssrc	BIGINT	not null,
	averagertcpinterval	REAL,
	burstdiscardcount	INTEGER,
	burstdiscardrate	REAL,
	burstlosscount	INTEGER,
	burstlossrate	REAL,
	burstpacketsdiscarded	INTEGER,
	burstpacketslost	INTEGER,
	bytesreceived	BIGINT,
	bytessent	BIGINT,
	channels	INTEGER,
	clockrate	INTEGER,
	decoderimplementation	VARCHAR(65535),
	ended	BOOLEAN,
	estimatedplayouttimestamp	BIGINT,
	fecpacketsdiscarded	INTEGER,
	fecpacketsreceived	INTEGER,
	gapdiscardrate	REAL,
	gaplossrate	REAL,
	headerbytesreceived	BIGINT,
	jitter	REAL,
	jitterbufferdelay	REAL,
	jitterbufferemittedcount	INTEGER,
	label	VARCHAR(65535),
	lastpacketreceivedtimestamp	BIGINT,
	marker	VARCHAR(65535),
	mimetype	VARCHAR(65535),
	nackcount	INTEGER,
	packetsdiscarded	INTEGER,
	packetsduplicated	INTEGER,
	packetsfaileddecryption	INTEGER,
	packetslost	INTEGER,
	packetsreceived	INTEGER,
	packetsrepaired	INTEGER,
	packetssent	INTEGER,
	payloadtype	INTEGER,
	perdscppacketsreceived	INTEGER,
	remoteclientid	VARCHAR(255),
	remotepeerconnectionid	VARCHAR(255),
	remotetimestamp	BIGINT,
	remotetrackid	VARCHAR(255),
	remoteuserid	VARCHAR(255),
	reportssent	INTEGER,
	roomid	VARCHAR(255),
	sdpfmtpline	VARCHAR(65535),
	sfusinkid	CHAR(36),
	sfustreamid	CHAR(36),
	totalprocessingdelay	REAL,
	trackid	CHAR(36),
	userid	VARCHAR(255),
	voiceactivityflag	BOOLEAN
) diststyle even;
ALTER TABLE inbound_audio_track_report ALTER diststyle KEY DISTKEY serviceid;
ALTER TABLE inbound_audio_track_report ALTER COMPOUND SORTKEY (callid, clientid, peerconnectionid, sfusinkid, sfustreamid, trackid);