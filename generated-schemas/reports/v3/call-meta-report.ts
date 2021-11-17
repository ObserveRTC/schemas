export interface CallMetaReport {
	serviceId: string;
	mediaUnitId?: null | undefined | string;
	marker?: null | undefined | string;
	timestamp: number;
	callId?: null | undefined | string;
	roomId?: null | undefined | string;
	clientId?: null | undefined | string;
	userId?: null | undefined | string;
	peerConnectionId?: null | undefined | string;
	sampleTimestamp?: null | undefined | number;
	sampleSeq?: null | undefined | number;
	type?: null | undefined | string;
	payload?: null | undefined | string;
}
