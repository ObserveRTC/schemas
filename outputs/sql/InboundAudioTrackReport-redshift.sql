create table  IF NOT EXISTS inbound_audio_track_report (
	serviceid	VARCHAR(1024)	not null,
	mediaunitid	VARCHAR(1024)	not null,
	timestamp	BIGINT	not null,
	callid	VARCHAR(254)	not null,
	clientid	VARCHAR(254)	not null,
	peerconnectionid	VARCHAR(254)	not null,
	sampleseq	INTEGER	not null,
	ssrc	BIGINT	not null,
	audiolevel	INTEGER,
	bytesreceived	BIGINT,
	bytessent	BIGINT,
	concealedsamples	INTEGER,
	concealmentevents	INTEGER,
	decoderimplementation	VARCHAR(65535),
	estimatedplayouttimestamp	BIGINT,
	fecpacketsdiscarded	INTEGER,
	fecpacketsreceived	INTEGER,
	headerbytesreceived	BIGINT,
	insertedsamplesfordeceleration	INTEGER,
	jitter	REAL,
	jitterbufferdelay	REAL,
	jitterbufferemittedcount	INTEGER,
	jitterbufferminimumdelay	REAL,
	jitterbuffertargetdelay	REAL,
	label	VARCHAR(65535),
	lastpacketreceivedtimestamp	BIGINT,
	marker	VARCHAR(65535),
	nackcount	INTEGER,
	packetsdiscarded	INTEGER,
	packetslost	INTEGER,
	packetsreceived	INTEGER,
	packetssent	INTEGER,
	remoteclientid	VARCHAR(1024),
	remotepeerconnectionid	VARCHAR(1024),
	remotetimestamp	BIGINT,
	remotetrackid	VARCHAR(1024),
	remoteuserid	VARCHAR(1024),
	removedsamplesforacceleration	INTEGER,
	reportssent	INTEGER,
	roomid	VARCHAR(1024),
	roundtriptime	REAL,
	roundtriptimemeasurements	INTEGER,
	sfusinkid	VARCHAR(254),
	sfustreamid	VARCHAR(254),
	silentconcealedsamples	INTEGER,
	synthesizedsamplesduration	REAL,
	synthesizedsamplesevents	INTEGER,
	totalaudioenergy	INTEGER,
	totalplayoutdelay	REAL,
	totalprocessingdelay	REAL,
	totalroundtriptime	REAL,
	totalsamplescount	INTEGER,
	totalsamplesduration	REAL,
	totalsamplesreceived	INTEGER,
	trackid	VARCHAR(254),
	userid	VARCHAR(1024)
) diststyle even;
ALTER TABLE inbound_audio_track_report ALTER diststyle KEY DISTKEY serviceid;
ALTER TABLE inbound_audio_track_report ALTER COMPOUND SORTKEY (callid, clientid, peerconnectionid, sfusinkid, sfustreamid, trackid);