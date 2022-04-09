/**
* Metadata belongs to a call and can be useful
*/
export type CallMetaReport = {
	/**
	* The unique identifier of the service
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
	* The generated unique identifier of the call
	*/
	callId?: string;

	/**
	* webrtc app provided room id
	*/
	roomId?: string;

	/**
	* The generated unique identifier of the client
	*/
	clientId?: string;

	/**
	* webrtc app provided user identifier
	*/
	userId?: string;

	/**
	* The unique identifier of the peer connection
	*/
	peerConnectionId?: string;

	/**
	* The timestamp of the sample the event related to
	*/
	sampleTimestamp?: number;

	/**
	* The sequence number of the sample the event may related to
	*/
	sampleSeq?: number;

	/**
	* The type of the meta data. Possible values are: CERTIFICATE, CODEC, ICE_LOCAL_CANDIDATE, ICE_REMOTE_CANDIDATE, ICE_SERVER, MEDIA_CONSTRAINT, MEDIA_DEVICE, MEDIA_SOURCE, USER_MEDIA_ERROR, LOCAL_SDP
	*/
	type?: string;

	/**
	* The payload for the metadata reported for the peeer connection
	*/
	payload?: string;

}
