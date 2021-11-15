export interface ClientDataChannelReport {
	serviceId: string;
	mediaUnitId: string;
	marker?: null | undefined | string;
	timestamp: number;
	callId: string;
	roomId?: null | undefined | string;
	clientId: string;
	userId?: null | undefined | string;
	peerConnectionId: string;
	peerConnectionLabel?: null | undefined | string;
	sampleSeq: number;
	label?: null | undefined | string;
	protocol?: null | undefined | string;
	state?: null | undefined | string;
	messagesSent?: null | undefined | number;
	bytesSent?: null | undefined | number;
	messagesReceived?: null | undefined | number;
	bytesReceived?: null | undefined | number;
}
