/**
* A Report created for PeerConnection Data Channel.
*/
export type ClientDataChannelReport = {
	/**
	* The unique identifier of the service
	*/
	serviceId: string;

	/**
	* The media unit id the report belongs to
	*/
	mediaUnitId: string;

	/**
	* The timestamp when the corresponded data is generated for the report (UTC Epoch in ms)
	*/
	timestamp: number;

	/**
	* The generated unique identifier of the call
	*/
	callId: string;

	/**
	* The generated unique identifier of the client
	*/
	clientId: string;

	/**
	* The unique identifier of the peer connection
	*/
	peerConnectionId: string;

	/**
	* The sequence number of the sample the report is generated from
	*/
	sampleSeq: number;

	/**
	* The marker the originated sample is reported with
	*/
	marker?: string;

	/**
	* webrtc app provided room id
	*/
	roomId?: string;

	/**
	* webrtc app provided user identifier
	*/
	userId?: string;

	/**
	* The webrtc app provided label for the peer connection
	*/
	peerConnectionLabel?: string;

	/**
	* The label of the data channel
	*/
	label?: string;

	/**
	* The protocol used for the data channel
	*/
	protocol?: string;

	/**
	* The state of the data channel
	*/
	state?: string;

	/**
	* Represents the total number of API message events sent
	*/
	messagesSent?: number;

	/**
	* Represents the total number of payload bytes sent on the corresponded data channel
	*/
	bytesSent?: number;

	/**
	* Represents the total number of API message events received on the corresponded data channel
	*/
	messagesReceived?: number;

	/**
	* Represents the total number of payload bytes received on the corresponded data channel
	*/
	bytesReceived?: number;

}
