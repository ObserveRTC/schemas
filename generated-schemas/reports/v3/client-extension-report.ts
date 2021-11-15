export interface ClientExtensionReport {
	serviceId: string;
	serviceName?: null | undefined | string;
	mediaUnitId?: null | undefined | string;
	marker?: null | undefined | string;
	timestamp: number;
	callId?: null | undefined | string;
	roomId?: null | undefined | string;
	clientId?: null | undefined | string;
	userId?: null | undefined | string;
	peerConnectionId?: null | undefined | string;
	sampleSeq?: null | undefined | number;
	extensionType: string;
	payload?: null | undefined | string;
}
