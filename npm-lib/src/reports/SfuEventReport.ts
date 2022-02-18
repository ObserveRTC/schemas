/**
* Events happened in calls.
*/
export type SfuEventReport = {
	/**
	* The service id the report belongs to
	*/
	serviceId: string;

	/**
	* The timestamp when the corresponded data is generated for the report (UTC Epoch in ms)
	*/
	timestamp: number;

	/**
	* The name of the event. Possible values are: SFU_JOINED, SFU_LEFT, SFU_TRANSPORT_OPENED, SFU_TRANSPORT_CLOSED, SFU_RTP_STREAM_ADDED, SFU_RTP_STREAM_REMOVED
	*/
	name: string;

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
	* Unique identifier of the Media stream the event is related to
	*/
	mediaStreamId?: string;

	/**
	* Unique identifier of the SCTP stream the event is related to
	*/
	sctpStreamId?: string;

	/**
	* Unique identifier of the Sfu Pad the event is related to
	*/
	sfuPadId?: string;

	/**
	* The SSRC identifier of the RTP stream related to
	*/
	SSRC?: number;

	/**
	* the human readable message of the event
	*/
	message?: string;

	/**
	* the value of the event
	*/
	value?: string;

	/**
	* attachment the event may created with
	*/
	attachments?: string;

}
