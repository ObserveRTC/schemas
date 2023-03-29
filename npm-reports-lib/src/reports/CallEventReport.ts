/**
* Observer created reports related to events (call started, call ended, client joined, etc...) indicated by the incoming samples.
*/
export type CallEventReport = {
	/**
	* The unique identifier of the service
	*/
	serviceId: string;

	/**
	* The timestamp when the corresponded data is generated for the report (UTC Epoch in ms)
	*/
	timestamp: number;

	/**
	* The name of the event. Possible values are: CALL_STARTED, CALL_ENDED, CLIENT_JOINED, CLIENT_LEFT, PEER_CONNECTION_OPENED, PEER_CONNECTION_CLOSED, MEDIA_TRACK_ADDED, MEDIA_TRACK_REMOVED
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
	* The unique identifier of the media track
	*/
	mediaTrackId?: string;

	/**
	* The SSRC identifier of the RTP stream a trackId belongs to
	*/
	SSRC?: number;

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
