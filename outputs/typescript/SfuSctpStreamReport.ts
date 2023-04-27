
export const schemaVersion = "2.2.0";

/**
* A Report created for SCTP streams going through the SFU
*/
export type SfuSctpStreamReport = {
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
	* The id of the transport the RTP stream uses.
	*/
	transportId: string;

	/**
	* The id of the sctp stream
	*/
	streamId: string;

	/**
	* The marker the originated sample is reported with
	*/
	marker?: string;

	/**
	* Flag indicate if the sctp channel is used as an internal transport between SFUs
	*/
	internal?: boolean;

	/**
	* The generated unique identifier of the call
	*/
	callId?: string;

	/**
	* webrtc app provided room id
	*/
	roomId?: string;

	/**
	* The label of the sctp stream
	*/
	label?: string;

	/**
	* The protocol used to establish an sctp stream
	*/
	protocol?: string;

	/**
	* The latest smoothed round-trip time value, corresponding to spinfo_srtt defined in [RFC6458] but converted to seconds. If there has been no round-trip time measurements yet, this value is undefined.
	*/
	sctpSmoothedRoundTripTime?: number;

	/**
	* The latest congestion window, corresponding to spinfo_cwnd defined in [RFC6458].
	*/
	sctpCongestionWindow?: number;

	/**
	* The latest receiver window, corresponding to sstat_rwnd defined in [RFC6458].
	*/
	sctpReceiverWindow?: number;

	/**
	* The latest maximum transmission unit, corresponding to spinfo_mtu defined in [RFC6458].
	*/
	sctpMtu?: number;

	/**
	* The number of unacknowledged DATA chunks, corresponding to sstat_unackdata defined in [RFC6458].
	*/
	sctpUnackData?: number;

	/**
	* The number of message received on the corresponded SCTP stream.
	*/
	messageReceived?: number;

	/**
	* The number of message sent on the corresponded SCTP stream.
	*/
	messageSent?: number;

	/**
	* The number of bytes received on the corresponded SCTP stream.
	*/
	bytesReceived?: number;

	/**
	* The number of bytes sent on the corresponded SCTP stream.
	*/
	bytesSent?: number;

}
