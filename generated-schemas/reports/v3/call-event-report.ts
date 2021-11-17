export interface CallEventReport {
	serviceId: string;
	mediaUnitId?: null | undefined | string;
	marker?: null | undefined | string;
	timestamp: number;
	callId?: null | undefined | string;
	roomId?: null | undefined | string;
	clientId?: null | undefined | string;
	userId?: null | undefined | string;
	peerConnectionId?: null | undefined | string;
	mediaTrackId?: null | undefined | string;
	SSRC?: null | undefined | number;
	sampleTimestamp?: null | undefined | number;
	sampleSeq?: null | undefined | number;
	name: string;
	message?: null | undefined | string;
	value?: null | undefined | string;
	attachments?: null | undefined | string;
}
