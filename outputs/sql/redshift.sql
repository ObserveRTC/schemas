create table  IF NOT EXISTS call_event_report (
	serviceid	VARCHAR(1024)	not null,
	timestamp	BIGINT	not null,
	name	VARCHAR(65535)	not null,
	attachments	VARCHAR(65535),
	callid	VARCHAR(254),
	clientid	VARCHAR(254),
	marker	VARCHAR(65535),
	mediatrackid	VARCHAR(1024),
	mediaunitid	VARCHAR(1024),
	message	VARCHAR(65535),
	peerconnectionid	VARCHAR(254),
	roomid	VARCHAR(1024),
	sampleseq	INTEGER,
	sampletimestamp	BIGINT,
	ssrc	BIGINT,
	userid	VARCHAR(1024),
	value	VARCHAR(65535)
) diststyle even;
ALTER TABLE call_event_report ALTER diststyle KEY DISTKEY serviceid;
ALTER TABLE call_event_report ALTER COMPOUND SORTKEY (callid, clientid, peerconnectionid);

create table  IF NOT EXISTS call_meta_report (
	serviceid	VARCHAR(1024)	not null,
	timestamp	BIGINT	not null,
	callid	VARCHAR(254),
	clientid	VARCHAR(254),
	marker	VARCHAR(65535),
	mediaunitid	VARCHAR(1024),
	payload	VARCHAR(65535),
	peerconnectionid	VARCHAR(254),
	roomid	VARCHAR(1024),
	sampleseq	INTEGER,
	sampletimestamp	BIGINT,
	type	VARCHAR(65535),
	userid	VARCHAR(1024)
) diststyle even;
ALTER TABLE call_meta_report ALTER diststyle KEY DISTKEY serviceid;
ALTER TABLE call_meta_report ALTER COMPOUND SORTKEY (callid, clientid, peerconnectionid);

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

create table  IF NOT EXISTS client_extension_report (
	serviceid	VARCHAR(1024)	not null,
	timestamp	BIGINT	not null,
	extensiontype	VARCHAR(65535)	not null,
	callid	VARCHAR(254),
	clientid	VARCHAR(254),
	marker	VARCHAR(65535),
	mediaunitid	VARCHAR(1024),
	payload	VARCHAR(65535),
	peerconnectionid	VARCHAR(254),
	roomid	VARCHAR(1024),
	sampleseq	INTEGER,
	userid	VARCHAR(1024)
) diststyle even;
ALTER TABLE client_extension_report ALTER diststyle KEY DISTKEY serviceid;
ALTER TABLE client_extension_report ALTER COMPOUND SORTKEY (callid, clientid, peerconnectionid);

create table  IF NOT EXISTS ice_candidate_pair_report (
	serviceid	VARCHAR(1024)	not null,
	mediaunitid	VARCHAR(1024)	not null,
	timestamp	BIGINT	not null,
	callid	VARCHAR(254)	not null,
	clientid	VARCHAR(254)	not null,
	peerconnectionid	VARCHAR(254)	not null,
	sampleseq	INTEGER	not null,
	availableincomingbitrate	REAL,
	availableoutgoingbitrate	REAL,
	bytesdiscardedonsend	BIGINT,
	bytesreceived	BIGINT,
	bytessent	BIGINT,
	candidatepairid	VARCHAR(1024),
	consentrequestssent	INTEGER,
	currentroundtriptime	REAL,
	label	VARCHAR(65535),
	lastpacketreceivedtimestamp	BIGINT,
	lastpacketsenttimestamp	BIGINT,
	localcandidateid	VARCHAR(1024),
	marker	VARCHAR(65535),
	nominated	BOOLEAN,
	packetsdiscardedonsend	INTEGER,
	packetsreceived	INTEGER,
	packetssent	INTEGER,
	remotecandidateid	VARCHAR(1024),
	requestsreceived	INTEGER,
	requestssent	INTEGER,
	responsesreceived	INTEGER,
	responsessent	INTEGER,
	roomid	VARCHAR(1024),
	state	VARCHAR(1024),
	totalroundtriptime	REAL,
	transportid	VARCHAR(254),
	userid	VARCHAR(1024)
) diststyle even;
ALTER TABLE ice_candidate_pair_report ALTER diststyle KEY DISTKEY serviceid;
ALTER TABLE ice_candidate_pair_report ALTER COMPOUND SORTKEY (callid, clientid, peerconnectionid, transportid);

create table  IF NOT EXISTS inbound_audio_track_report (
	serviceid	VARCHAR(1024)	not null,
	mediaunitid	VARCHAR(1024)	not null,
	timestamp	BIGINT	not null,
	callid	VARCHAR(254)	not null,
	clientid	VARCHAR(254)	not null,
	peerconnectionid	VARCHAR(254)	not null,
	sampleseq	INTEGER	not null,
	ssrc	BIGINT	not null,
	audiolevel	REAL,
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
	totalaudioenergy	REAL,
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

create table  IF NOT EXISTS inbound_video_track_report (
	serviceid	VARCHAR(1024)	not null,
	mediaunitid	VARCHAR(1024)	not null,
	timestamp	BIGINT	not null,
	callid	VARCHAR(254)	not null,
	clientid	VARCHAR(254)	not null,
	peerconnectionid	VARCHAR(254)	not null,
	sampleseq	INTEGER	not null,
	ssrc	BIGINT	not null,
	bytesreceived	BIGINT,
	bytessent	BIGINT,
	decoderimplementation	VARCHAR(65535),
	estimatedplayouttimestamp	BIGINT,
	fecpacketsdiscarded	INTEGER,
	fecpacketsreceived	INTEGER,
	fircount	INTEGER,
	frameheight	INTEGER,
	framesdecoded	INTEGER,
	framesdropped	INTEGER,
	framespersecond	REAL,
	framesreceived	INTEGER,
	framewidth	INTEGER,
	headerbytesreceived	BIGINT,
	jitter	REAL,
	jitterbufferdelay	REAL,
	jitterbufferemittedcount	INTEGER,
	jitterbufferminimumdelay	REAL,
	jitterbuffertargetdelay	REAL,
	keyframesdecoded	INTEGER,
	label	VARCHAR(65535),
	lastpacketreceivedtimestamp	BIGINT,
	marker	VARCHAR(65535),
	nackcount	INTEGER,
	packetsdiscarded	INTEGER,
	packetslost	INTEGER,
	packetsreceived	INTEGER,
	packetssent	INTEGER,
	plicount	INTEGER,
	qpsum	BIGINT,
	remoteclientid	VARCHAR(1024),
	remotepeerconnectionid	VARCHAR(1024),
	remotetimestamp	BIGINT,
	remotetrackid	VARCHAR(1024),
	remoteuserid	VARCHAR(1024),
	reportssent	INTEGER,
	roomid	VARCHAR(1024),
	roundtriptime	REAL,
	roundtriptimemeasurements	INTEGER,
	sfusinkid	VARCHAR(254),
	sfustreamid	VARCHAR(254),
	totaldecodetime	REAL,
	totalinterframedelay	REAL,
	totalprocessingdelay	REAL,
	totalroundtriptime	REAL,
	totalsquaredinterframedelay	REAL,
	trackid	VARCHAR(254),
	userid	VARCHAR(1024)
) diststyle even;
ALTER TABLE inbound_video_track_report ALTER diststyle KEY DISTKEY serviceid;
ALTER TABLE inbound_video_track_report ALTER COMPOUND SORTKEY (callid, clientid, peerconnectionid, sfusinkid, sfustreamid, trackid);

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

create table  IF NOT EXISTS outbound_audio_track_report (
	serviceid	VARCHAR(1024)	not null,
	mediaunitid	VARCHAR(1024)	not null,
	timestamp	BIGINT	not null,
	callid	VARCHAR(254)	not null,
	clientid	VARCHAR(254)	not null,
	peerconnectionid	VARCHAR(254)	not null,
	sampleseq	INTEGER	not null,
	ssrc	BIGINT	not null,
	active	BOOLEAN,
	audiolevel	REAL,
	averagertcpinterval	REAL,
	bytessent	BIGINT,
	droppedsamplesduration	REAL,
	droppedsamplesevents	INTEGER,
	echoreturnloss	REAL,
	echoreturnlossenhancement	REAL,
	encoderimplementation	VARCHAR(65535),
	fractionlost	REAL,
	headerbytessent	BIGINT,
	jitter	REAL,
	label	VARCHAR(65535),
	marker	VARCHAR(65535),
	nackcount	INTEGER,
	packetslost	INTEGER,
	packetsreceived	INTEGER,
	packetssent	INTEGER,
	relayedsource	BOOLEAN,
	retransmittedbytessent	BIGINT,
	retransmittedpacketssent	INTEGER,
	rid	VARCHAR(65535),
	roomid	VARCHAR(1024),
	roundtriptime	REAL,
	roundtriptimemeasurements	INTEGER,
	sfustreamid	VARCHAR(254),
	targetbitrate	INTEGER,
	totalaudioenergy	REAL,
	totalcapturedelay	REAL,
	totalencodedbytestarget	BIGINT,
	totalpacketsenddelay	REAL,
	totalroundtriptime	REAL,
	totalsamplescaptured	REAL,
	totalsamplesduration	REAL,
	trackid	VARCHAR(254),
	userid	VARCHAR(1024)
) diststyle even;
ALTER TABLE outbound_audio_track_report ALTER diststyle KEY DISTKEY serviceid;
ALTER TABLE outbound_audio_track_report ALTER COMPOUND SORTKEY (callid, clientid, peerconnectionid, sfustreamid, trackid);

create table  IF NOT EXISTS outbound_video_track_report (
	serviceid	VARCHAR(1024)	not null,
	mediaunitid	VARCHAR(1024)	not null,
	timestamp	BIGINT	not null,
	callid	VARCHAR(254)	not null,
	clientid	VARCHAR(254)	not null,
	peerconnectionid	VARCHAR(254)	not null,
	sampleseq	INTEGER	not null,
	ssrc	BIGINT	not null,
	active	BOOLEAN,
	averagertcpinterval	REAL,
	bytessent	BIGINT,
	encoderimplementation	VARCHAR(65535),
	fircount	INTEGER,
	fractionlost	REAL,
	frameheight	INTEGER,
	frames	INTEGER,
	framesdropped	INTEGER,
	framesencoded	INTEGER,
	framespersecond	REAL,
	framessent	INTEGER,
	framewidth	INTEGER,
	headerbytessent	BIGINT,
	height	INTEGER,
	hugeframessent	INTEGER,
	jitter	REAL,
	keyframesencoded	INTEGER,
	label	VARCHAR(65535),
	marker	VARCHAR(65535),
	nackcount	INTEGER,
	packetslost	INTEGER,
	packetsreceived	INTEGER,
	packetssent	INTEGER,
	plicount	INTEGER,
	qpsum	BIGINT,
	qualitylimitationdurationbandwidth	REAL,
	qualitylimitationdurationcpu	REAL,
	qualitylimitationdurationnone	REAL,
	qualitylimitationdurationother	REAL,
	qualitylimitationreason	VARCHAR(65535),
	qualitylimitationresolutionchanges	INTEGER,
	relayedsource	BOOLEAN,
	retransmittedbytessent	BIGINT,
	retransmittedpacketssent	INTEGER,
	rid	VARCHAR(65535),
	roomid	VARCHAR(1024),
	roundtriptime	REAL,
	roundtriptimemeasurements	INTEGER,
	sfustreamid	VARCHAR(254),
	targetbitrate	INTEGER,
	totalencodedbytestarget	BIGINT,
	totalencodetime	REAL,
	totalpacketsenddelay	REAL,
	totalroundtriptime	REAL,
	trackid	VARCHAR(254),
	userid	VARCHAR(1024),
	width	INTEGER
) diststyle even;
ALTER TABLE outbound_video_track_report ALTER diststyle KEY DISTKEY serviceid;
ALTER TABLE outbound_video_track_report ALTER COMPOUND SORTKEY (callid, clientid, peerconnectionid, sfustreamid, trackid);

create table  IF NOT EXISTS peer_connection_transport_report (
	serviceid	VARCHAR(1024)	not null,
	mediaunitid	VARCHAR(1024)	not null,
	timestamp	BIGINT	not null,
	callid	VARCHAR(254)	not null,
	clientid	VARCHAR(254)	not null,
	peerconnectionid	VARCHAR(254)	not null,
	transportid	VARCHAR(254)	not null,
	sampleseq	INTEGER	not null,
	bytesreceived	BIGINT,
	bytessent	BIGINT,
	dtlscipher	VARCHAR(65535),
	dtlsrole	VARCHAR(65535),
	dtlsstate	VARCHAR(1024),
	icelocalusernamefragment	VARCHAR(65535),
	icerole	VARCHAR(65535),
	icestate	VARCHAR(1024),
	label	VARCHAR(65535),
	localcertificateid	VARCHAR(1024),
	marker	VARCHAR(65535),
	packetsreceived	INTEGER,
	packetssent	INTEGER,
	remotecertificateid	VARCHAR(1024),
	roomid	VARCHAR(1024),
	selectedcandidatepairchanges	INTEGER,
	selectedcandidatepairid	VARCHAR(1024),
	srtpcipher	VARCHAR(65535),
	tlsgroup	VARCHAR(65535),
	tlsversion	VARCHAR(65535),
	userid	VARCHAR(1024)
) diststyle even;
ALTER TABLE peer_connection_transport_report ALTER diststyle KEY DISTKEY serviceid;
ALTER TABLE peer_connection_transport_report ALTER COMPOUND SORTKEY (callid, clientid, peerconnectionid, transportid);

create table  IF NOT EXISTS report (
	type	VARCHAR(65535)	not null,
	payload	VARCHAR(4096)	not null,
	schemaversion	VARCHAR(65535)
) diststyle even;

create table  IF NOT EXISTS sfu_event_report (
	serviceid	VARCHAR(1024)	not null,
	timestamp	BIGINT	not null,
	name	VARCHAR(65535)	not null,
	attachments	VARCHAR(65535),
	callid	VARCHAR(254),
	marker	VARCHAR(65535),
	mediasinkid	VARCHAR(1024),
	mediastreamid	VARCHAR(1024),
	mediaunitid	VARCHAR(1024),
	message	VARCHAR(65535),
	rtppadid	VARCHAR(1024),
	sctpstreamid	VARCHAR(1024),
	sfuid	VARCHAR(254),
	transportid	VARCHAR(254),
	value	VARCHAR(65535)
) diststyle even;
ALTER TABLE sfu_event_report ALTER diststyle KEY DISTKEY serviceid;
ALTER TABLE sfu_event_report ALTER COMPOUND SORTKEY (callid, sfuid, transportid);

create table  IF NOT EXISTS sfu_extension_report (
	serviceid	VARCHAR(1024)	not null,
	timestamp	BIGINT	not null,
	extensiontype	VARCHAR(65535)	not null,
	marker	VARCHAR(65535),
	mediaunitid	VARCHAR(1024),
	payload	VARCHAR(65535),
	sfuid	VARCHAR(254)
) diststyle even;
ALTER TABLE sfu_extension_report ALTER diststyle KEY DISTKEY serviceid;
ALTER TABLE sfu_extension_report ALTER COMPOUND SORTKEY (sfuid);

create table  IF NOT EXISTS sfu_inbound_rtp_pad_report (
	serviceid	VARCHAR(1024)	not null,
	mediaunitid	VARCHAR(1024)	not null,
	sfuid	VARCHAR(254)	not null,
	timestamp	BIGINT	not null,
	transportid	VARCHAR(254)	not null,
	sfustreamid	VARCHAR(254)	not null,
	rtppadid	VARCHAR(1024)	not null,
	ssrc	BIGINT	not null,
	bytesreceived	BIGINT,
	callid	VARCHAR(254),
	clientid	VARCHAR(254),
	clockrate	INTEGER,
	fecpacketsdiscarded	INTEGER,
	fecpacketsreceived	INTEGER,
	fircount	INTEGER,
	fractionlost	REAL,
	framesdecoded	INTEGER,
	framesreceived	INTEGER,
	internal	BOOLEAN,
	jitter	REAL,
	keyframesdecoded	INTEGER,
	marker	VARCHAR(65535),
	mediatype	VARCHAR(65535),
	mimetype	VARCHAR(65535),
	nackcount	INTEGER,
	packetsdiscarded	INTEGER,
	packetsduplicated	INTEGER,
	packetsfaileddecryption	INTEGER,
	packetslost	INTEGER,
	packetsreceived	INTEGER,
	packetsrepaired	INTEGER,
	payloadtype	INTEGER,
	plicount	INTEGER,
	remotertppadid	VARCHAR(1024),
	remotesfuid	VARCHAR(1024),
	remotesinkid	VARCHAR(1024),
	remotetransportid	VARCHAR(1024),
	rid	VARCHAR(65535),
	roundtriptime	REAL,
	rtcprrsent	INTEGER,
	rtcpsrreceived	INTEGER,
	rtxpacketsdiscarded	INTEGER,
	rtxpacketsreceived	INTEGER,
	rtxssrc	BIGINT,
	sdpfmtpline	VARCHAR(65535),
	slicount	INTEGER,
	targetbitrate	INTEGER,
	trackid	VARCHAR(254),
	voiceactivityflag	BOOLEAN
) diststyle even;
ALTER TABLE sfu_inbound_rtp_pad_report ALTER diststyle KEY DISTKEY serviceid;
ALTER TABLE sfu_inbound_rtp_pad_report ALTER COMPOUND SORTKEY (sfuid, transportid, sfustreamid, callid, clientid, trackid);

create table  IF NOT EXISTS sfu_meta_report (
	serviceid	VARCHAR(1024)	not null,
	timestamp	BIGINT	not null,
	callid	VARCHAR(254),
	marker	VARCHAR(65535),
	mediasinkid	VARCHAR(1024),
	mediastreamid	VARCHAR(1024),
	mediaunitid	VARCHAR(1024),
	payload	VARCHAR(65535),
	rtppadid	VARCHAR(1024),
	sctpstreamid	VARCHAR(1024),
	sfuid	VARCHAR(254),
	transportid	VARCHAR(254),
	type	VARCHAR(65535)
) diststyle even;
ALTER TABLE sfu_meta_report ALTER diststyle KEY DISTKEY serviceid;
ALTER TABLE sfu_meta_report ALTER COMPOUND SORTKEY (callid, sfuid, transportid);

create table  IF NOT EXISTS sfu_outbound_rtp_pad_report (
	serviceid	VARCHAR(1024)	not null,
	mediaunitid	VARCHAR(1024)	not null,
	sfuid	VARCHAR(254)	not null,
	timestamp	BIGINT	not null,
	transportid	VARCHAR(254)	not null,
	sfustreamid	VARCHAR(254)	not null,
	sfusinkid	VARCHAR(254)	not null,
	rtppadid	VARCHAR(1024)	not null,
	ssrc	BIGINT	not null,
	bytessent	BIGINT,
	callid	VARCHAR(254),
	clientid	VARCHAR(254),
	clockrate	INTEGER,
	fecpacketsdiscarded	INTEGER,
	fecpacketssent	INTEGER,
	fircount	INTEGER,
	framesencoded	INTEGER,
	framessent	INTEGER,
	internal	BOOLEAN,
	keyframesencoded	INTEGER,
	marker	VARCHAR(65535),
	mediatype	VARCHAR(65535),
	mimetype	VARCHAR(65535),
	nackcount	INTEGER,
	packetsdiscarded	INTEGER,
	packetsduplicated	INTEGER,
	packetsfailedencryption	INTEGER,
	packetslost	INTEGER,
	packetsretransmitted	INTEGER,
	packetssent	INTEGER,
	payloadtype	INTEGER,
	plicount	INTEGER,
	rid	VARCHAR(65535),
	roundtriptime	REAL,
	rtcprrreceived	INTEGER,
	rtcpsrsent	INTEGER,
	rtxpacketsdiscarded	INTEGER,
	rtxpacketssent	INTEGER,
	rtxssrc	BIGINT,
	sdpfmtpline	VARCHAR(65535),
	slicount	INTEGER,
	targetbitrate	INTEGER,
	trackid	VARCHAR(254),
	voiceactivityflag	BOOLEAN
) diststyle even;
ALTER TABLE sfu_outbound_rtp_pad_report ALTER diststyle KEY DISTKEY serviceid;
ALTER TABLE sfu_outbound_rtp_pad_report ALTER COMPOUND SORTKEY (sfuid, transportid, sfustreamid, sfusinkid, callid, clientid, trackid);

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

create table  IF NOT EXISTS sfu_transport_report (
	serviceid	VARCHAR(1024)	not null,
	mediaunitid	VARCHAR(1024)	not null,
	sfuid	VARCHAR(254)	not null,
	timestamp	BIGINT	not null,
	transportid	VARCHAR(254)	not null,
	callid	VARCHAR(254),
	dtlsstate	VARCHAR(1024),
	icerole	VARCHAR(65535),
	icestate	VARCHAR(1024),
	internal	BOOLEAN,
	localaddress	VARCHAR(65535),
	localport	INTEGER,
	marker	VARCHAR(65535),
	protocol	VARCHAR(1024),
	remoteaddress	VARCHAR(65535),
	remoteport	INTEGER,
	roomid	VARCHAR(1024),
	rtpbytesreceived	BIGINT,
	rtpbytessent	BIGINT,
	rtppacketslost	INTEGER,
	rtppacketsreceived	INTEGER,
	rtppacketssent	INTEGER,
	rtxbytesreceived	BIGINT,
	rtxbytessent	BIGINT,
	rtxpacketsdiscarded	INTEGER,
	rtxpacketslost	INTEGER,
	rtxpacketsreceived	INTEGER,
	rtxpacketssent	INTEGER,
	sctpbytesreceived	BIGINT,
	sctpbytessent	BIGINT,
	sctppacketsreceived	INTEGER,
	sctppacketssent	INTEGER,
	sctpstate	VARCHAR(1024)
) diststyle even;
ALTER TABLE sfu_transport_report ALTER diststyle KEY DISTKEY serviceid;
ALTER TABLE sfu_transport_report ALTER COMPOUND SORTKEY (sfuid, transportid, callid);