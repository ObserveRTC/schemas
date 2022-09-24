/**
* A Report created for Client PeerConnection Transport.
*/
export type PeerConnectionTransportReport = {
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
	* The webrtc app provided label the peer connection is marked with
	*/
	label?: string;

	/**
	* Represents the total number of packets sent on the corresponded transport
	*/
	packetsSent?: number;

	/**
	* Represents the total number of packets received on the corresponded transport
	*/
	packetsReceived?: number;

	/**
	* Represents the total amount of bytes sent on the corresponded transport
	*/
	bytesSent?: number;

	/**
	* Represents the total amount of bytes received on the corresponded transport
	*/
	bytesReceived?: number;

	/**
	* Represent the current role of ICE under DTLS Transport
	*/
	iceRole?: string;

	/**
	* Represent the current local username fragment used in message validation procedures for ICE under DTLS Transport
	*/
	iceLocalUsernameFragment?: string;

	/**
	* Represents the current state of DTLS for the peer connection transport layer
	*/
	dtlsState?: string;

	/**
	* The identifier of the candidate pair the transport currently uses
	*/
	selectedCandidatePairId?: string;

	/**
	* Represents the current transport state (RTCIceTransportState) of ICE for the peer connection transport layer
	*/
	iceState?: string;

	/**
	* If DTLS negotiated it gives the id of the local certificate
	*/
	localCertificateId?: string;

	/**
	* If DTLS negotiated it gives the id of the remote certificate
	*/
	remoteCertificateId?: string;

	/**
	* Represents the version number of the TLS used in the corresponded transport
	*/
	tlsVersion?: string;

	/**
	* Represents the name of the DTLS cipher used in the corresponded transport
	*/
	dtlsCipher?: string;

	/**
	* Represents the name of the SRTP cipher used in the corresponded transport
	*/
	srtpCipher?: string;

	/**
	* Represents the name of the IANA TLS Supported Groups used in the corresponded transport
	*/
	tlsGroup?: string;

	/**
	* The total number of candidate pair changes over the peer connection
	*/
	selectedCandidatePairChanges?: number;

}
