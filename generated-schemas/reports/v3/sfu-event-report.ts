export interface SfuEventReport {
	serviceId: string;
	mediaUnitId?: null | undefined | string;
	marker?: null | undefined | string;
	timestamp: number;
	sfuId?: null | undefined | string;
	callId?: null | undefined | string;
	transportId?: null | undefined | string;
	rtpStreamId?: null | undefined | string;
	sctpStreamId?: null | undefined | string;
	sfuPadId?: null | undefined | string;
	SSRC?: null | undefined | number;
	name: string;
	message?: null | undefined | string;
	value?: null | undefined | string;
	attachments?: null | undefined | string;
}
