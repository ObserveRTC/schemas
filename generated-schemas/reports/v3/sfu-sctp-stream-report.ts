export interface SfuSctpStreamReport {
	serviceId: string;
	mediaUnitId: string;
	sfuId: string;
	marker?: null | undefined | string;
	timestamp: number;
	callId?: null | undefined | string;
	roomId?: null | undefined | string;
	transportId: string;
	streamId: string;
	label?: null | undefined | string;
	protocol?: null | undefined | string;
	sctpSmoothedRoundTripTime?: null | undefined | number;
	sctpCongestionWindow?: null | undefined | number;
	sctpReceiverWindow?: null | undefined | number;
	sctpMtu?: null | undefined | number;
	sctpUnackData?: null | undefined | number;
	messageReceived?: null | undefined | number;
	messageSent?: null | undefined | number;
	bytesReceived?: null | undefined | number;
	bytesSent?: null | undefined | number;
}
