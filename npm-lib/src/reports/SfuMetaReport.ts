/**
* Metadata belongs to SFUs
*/
export type SfuMetaReport = 
{
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
	* The id of the Sfu
	*/
	sfuId?: string;

	/**
	* The callId the event belongs to
	*/
	callId?: string;

	/**
	* The generated unique identifier of the client
	*/
	clientId?: string;

	/**
	* The unique identifier of the peer connection
	*/
	peerConnectionId?: string;

	/**
	* The type of the meta data reported for the peer connection
	*/
	type?: string;

	/**
	* The payload for the metadata reported for the peeer connection
	*/
	payload?: string;

}
