/**
* A Report created for SFU Transport layer typically created to transfer RTP/SCTP/RTX streams to another client, SFU, MCU, or processing module.
*/
export type SFUTransportReport = 
{
	/**
	* The service id the report belongs to
	*/
	serviceId: string;

	/**
	* The media unit id the report belongs to
	*/
	mediaUnitId: string;

	/**
	* The provided unique identifier of the SFU
	*/
	sfuId: string;

	/**
	* The timestamp when the corresponded data is generated for the report (UTC Epoch in ms)
	*/
	timestamp: number;

	/**
	* The generated unique identifier of the transport
	*/
	transportId: string;

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
	* Represent the current value of the state attribute of the underlying RTCDtlsTransport.
	*/
	dtlsState?: string;

	/**
	* Represent the current value of the state attribute of the underlying RTCIceTransport
	*/
	iceState?: string;

	/**
	* Represents the the current value of the SCTP state of the transport of the SFU
	*/
	sctpState?: string;

	/**
	* Represent the current value of the role SFU takes place in ICE
	*/
	iceRole?: string;

	/**
	* The local address of the ICE candidate selected for the transport (IPv4, IPv6, FQDN)
	*/
	localAddress?: string;

	/**
	* The local port number
	*/
	localPort?: number;

	/**
	* The protocol used by the transport
	*/
	protocol?: string;

	/**
	* The remote address of the ICE candidate selected for the transport (IPv4, IPv6, FQDN)
	*/
	remoteAddress?: string;

	/**
	* The remote port number
	*/
	remotePort?: number;

	/**
	* The total amount of RTP bytes received on this transport
	*/
	rtpBytesReceived?: number;

	/**
	* The total amount of RTP bytes sent on this transport
	*/
	rtpBytesSent?: number;

	/**
	* The total amount of RTP packets received on this transport
	*/
	rtpPacketsReceived?: number;

	/**
	* The total amount of RTP packets sent on this transport
	*/
	rtpPacketsSent?: number;

	/**
	* The total amount of RTP packets lost on this transport
	*/
	rtpPacketsLost?: number;

	/**
	* The total amount of RTX bytes received on this transport
	*/
	rtxBytesReceived?: number;

	/**
	* The total amount of RTX bytes sent on this transport
	*/
	rtxBytesSent?: number;

	/**
	* The total amount of RTX packets received on this transport
	*/
	rtxPacketsReceived?: number;

	/**
	* The total amount of RTX packets sent on this transport
	*/
	rtxPacketsSent?: number;

	/**
	* The total amount of RTX packets lost on this transport
	*/
	rtxPacketsLost?: number;

	/**
	* The total amount of RTX packets discarded on this transport
	*/
	rtxPacketsDiscarded?: number;

	/**
	* The total amount of SCTP bytes received on this transport
	*/
	sctpBytesReceived?: number;

	/**
	* The total amount of SCTP bytes sent on this transport
	*/
	sctpBytesSent?: number;

	/**
	* The total amount of SCTP packets received on this transport
	*/
	sctpPacketsReceived?: number;

	/**
	* The total amount of SCTP packets sent on this transport
	*/
	sctpPacketsSent?: number;

}
