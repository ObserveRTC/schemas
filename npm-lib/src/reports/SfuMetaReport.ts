/**
* Metadata belongs to SFUs
*/
export type SfuMetaReport = {
	/**
	* The service id the report belongs to
	*/
	serviceId: string;

	/**
	* The timestamp when the corresponded data is generated for the report (UTC Epoch in ms)
	*/
	timestamp: number;

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
	* The type of the meta data reported for the peer connection
	*/
	type?: string;

	/**
	* The payload for the metadata reported for the peeer connection
	*/
	payload?: string;

}
