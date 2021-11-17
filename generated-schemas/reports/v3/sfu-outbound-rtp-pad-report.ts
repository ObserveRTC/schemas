export interface SfuOutboundRtpPadReport {
	serviceId: string;
	mediaUnitId: string;
	sfuId: string;
	marker?: null | undefined | string;
	timestamp: number;
	transportId: string;
	rtpStreamId: string;
	padId: string;
	ssrc: number;
	callId?: null | undefined | string;
	clientId?: null | undefined | string;
	trackId?: null | undefined | string;
	mediaType?: null | undefined | string;
	payloadType?: null | undefined | number;
	mimeType?: null | undefined | string;
	clockRate?: null | undefined | number;
	sdpFmtpLine?: null | undefined | string;
	rid?: null | undefined | string;
	rtxSsrc?: null | undefined | number;
	targetBitrate?: null | undefined | number;
	voiceActivityFlag?: null | undefined | boolean;
	firCount?: null | undefined | number;
	pliCount?: null | undefined | number;
	nackCount?: null | undefined | number;
	sliCount?: null | undefined | number;
	packetsLost?: null | undefined | number;
	packetsSent?: null | undefined | number;
	packetsDiscarded?: null | undefined | number;
	packetsRetransmitted?: null | undefined | number;
	packetsFailedEncryption?: null | undefined | number;
	packetsDuplicated?: null | undefined | number;
	fecPacketsSent?: null | undefined | number;
	fecPacketsDiscarded?: null | undefined | number;
	bytesSent?: null | undefined | number;
	rtcpSrSent?: null | undefined | number;
	rtcpRrReceived?: null | undefined | number;
	rtxPacketsSent?: null | undefined | number;
	rtxPacketsDiscarded?: null | undefined | number;
	framesSent?: null | undefined | number;
	framesEncoded?: null | undefined | number;
	keyFramesEncoded?: null | undefined | number;
	attachments?: null | undefined | string;
}