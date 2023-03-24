/**
* A Report created for Extended provided arbitrary data.
*/
export type ClientExtensionReport = {
	/**
	* The unique identifier of the service
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
	* The sequence number of the sample the event may related to
	*/
	sampleSeq?: number;

	/**
	* the human readable message of the event
	*/
	payload?: string;

}
