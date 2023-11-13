export type ClientSampleDecodingOptions = {
	callIdIsUuid: boolean;
	sfuStreamIdIsUuid: boolean;
	sfuSinkIdIsUuid: boolean;
	clientIdIsUuid: boolean;
	peerConnectionIdIsUuid: boolean;
	trackIdIsUuid: boolean;
}

export type SfuSampleDecodingOptions = {
	sfuIdIsUuid: boolean;
	sfuStreamIdIsUuid: boolean;
	sfuSinkIdIsUuid: boolean;
	sfuPadIdIsUuid: boolean;
	dataChannelIdIsUuid: boolean;
	dataStreamIdIsUuid: boolean;
	callIdIsUuid: boolean;
	clientIdIsUuid: boolean;
	trackIdIsUuid: boolean;
}

export type SampleDecodingOptions = ClientSampleDecodingOptions & SfuSampleDecodingOptions;