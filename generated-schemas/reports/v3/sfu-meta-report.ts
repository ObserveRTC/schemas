export interface SfuMetaReport {
	serviceId: string;
	mediaUnitId?: null | undefined | string;
	marker?: null | undefined | string;
	timestamp: number;
	sfuId?: null | undefined | string;
	callId?: null | undefined | string;
	clientId?: null | undefined | string;
	peerConnectionId?: null | undefined | string;
	type?: null | undefined | string;
	payload?: null | undefined | string;
}
