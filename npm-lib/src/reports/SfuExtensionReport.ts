/**
* A Report created for Extended provided arbitrary data.
*/
export type SfuExtensionReport = {
	/**
	* The service id the report belongs to
	*/
	serviceId: string;

	/**
	* The timestamp when the corresponded data is generated for the report (UTC Epoch in ms)
	*/
	timestamp: number;

	/**
	* The name of the event
	*/
	extensionType: string;

	/**
	* The media unit id the report belongs to
	*/
	mediaUnitId?: string;

	/**
	* The marker the originated sample is reported with
	*/
	marker?: string;

	/**
	* The generated unique identifier of the SFU
	*/
	sfuId?: string;

	/**
	* The callId the event belongs to
	*/
	callId?: string;

	/**
	* SFU provided transport identifier
	*/
	transportId?: string;

	/**
	* Unique identifier of the SFU stream id the rtp pad belongs to
	*/
	mediaStreamId?: string;

	/**
	* Unique identifier of the SFU stream id the rtp pad belongs to
	*/
	mediaSinkId?: string;

	/**
	* Unique identifier of the SCTP stream the event is related to
	*/
	sctpStreamId?: string;

	/**
	* Unique identifier of the Sfu Pad the event is related to
	*/
	rtpPadId?: string;

	/**
	* the human readable message of the event
	*/
	payload?: string;

}
