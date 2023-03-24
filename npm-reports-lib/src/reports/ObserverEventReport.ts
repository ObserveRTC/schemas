/**
* A report created for observer generated events
*/
export type ObserverEventReport = {
	/**
	* The unique identifier of the service
	*/
	serviceId: string;

	/**
	* The timestamp when the corresponded data is generated for the report (UTC Epoch in ms)
	*/
	timestamp: number;

	/**
	* The generated unique identifier of the call
	*/
	callId: string;

	/**
	* The name of the event
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
