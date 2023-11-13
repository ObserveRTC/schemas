
export type ClientSampleEncodingOptions = {
	callIdIsUuid: boolean;
	sfuStreamIdIsUuid: boolean;
	sfuSinkIdIsUuid: boolean;
	clientIdIsUuid: boolean;
	peerConnectionIdIsUuid: boolean;
	trackIdIsUuid: boolean;
}

export type SfuSampleEncodingOptions = {
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

export type SampleEncodingOptions = ClientSampleEncodingOptions & SfuSampleEncodingOptions;