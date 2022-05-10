/**
* A Report created for RTP streams going through the SFU
*/
export type SfuInboundRtpPadReport = {
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
	* Unique identifier of the Sfu stream the event is related to
	*/
	sfuStreamId: string;

	/**
	* The id of RTP pad.
	*/
	rtpPadId: string;

	/**
	* The synchronization source id of the RTP stream
	*/
	ssrc: number;

	/**
	* The marker the originated sample is reported with
	*/
	marker?: string;

	/**
	* Flag indicate if the sfu rtp pad is used as an internal rtp session between SFUs
	*/
	internal?: boolean;

	/**
	* only added if it is internal. The id of the remote Sfu that outbound rtp pad matched with this internal inbound rtp pad
	*/
	remoteSfuId?: string;

	/**
	* only added if it is internal. The id of the remote transportId that outbound rtp pad matched with this internal inbound rtp pad
	*/
	remoteTransportId?: string;

	/**
	* only added if it is internal. The id of the remote sinkId that outbound rtp pad matched with this internal inbound rtp pad
	*/
	remoteSinkId?: string;

	/**
	* only added if it is internal. The id of the remote outbound rtp pad matched with this internal inbound rtp pad
	*/
	remoteRtpPadId?: string;

	/**
	* The id of the track the RTP stream related to at the client side
	*/
	trackId?: string;

	/**
	* If the track id was provided by the Sfu, the observer can fill up the information of which client it belongs to
	*/
	clientId?: string;

	/**
	* The callId the event belongs to
	*/
	callId?: string;

	/**
	* the type of the media the stream carries ("audio" or "video")
	*/
	mediaType?: string;

	/**
	* The payload type field of the RTP header
	*/
	payloadType?: number;

	/**
	* The negotiated mimeType in the SDP
	*/
	mimeType?: string;

	/**
	* The clock rate of the media source the RTP header carries
	*/
	clockRate?: number;

	/**
	* The actual SDP line from the negotiation related to this RTP stream
	*/
	sdpFmtpLine?: string;

	/**
	*  The rid parameter of the corresponded RTP stream
	*/
	rid?: string;

	/**
	* If RTX is negotiated as a separate stream, this is the SSRC of the RTX stream that is associated with this stream's ssrc. 
	*/
	rtxSsrc?: number;

	/**
	* he bitrate the corresponded stream targets.
	*/
	targetBitrate?: number;

	/**
	* The RTP header V flag indicate of the activity of the media source by the media codec if the RTP transport ships it through
	*/
	voiceActivityFlag?: boolean;

	/**
	* The total number FIR packets sent from this endpoint to the source on the corresponded RTP stream. Only for Video streams
	*/
	firCount?: number;

	/**
	* The total number of Picture Loss Indication sent on the corresponded RTP stream. Only for Video streams
	*/
	pliCount?: number;

	/**
	* The total number of negative acknowledgement received on the corresponded RTP stream.
	*/
	nackCount?: number;

	/**
	* The total number of SLI indicator sent from the endpoint on the corresponded RTP stream. Only for Audio stream
	*/
	sliCount?: number;

	/**
	* The total number of packets lost on the corresponded RTP stream.
	*/
	packetsLost?: number;

	/**
	* The total number of packets received on the corresponded RTP stream.
	*/
	packetsReceived?: number;

	/**
	* The total number of discarded packets on the corresponded RTP stream.
	*/
	packetsDiscarded?: number;

	/**
	* The total number of packets repaired by either retransmission or FEC on the corresponded RTP stream.
	*/
	packetsRepaired?: number;

	/**
	* The total number of packets failed to be decrypted on the corresponded RTP stream.
	*/
	packetsFailedDecryption?: number;

	/**
	* The total number of duplicated packets appeared on the corresponded RTP stream.
	*/
	packetsDuplicated?: number;

	/**
	* The total number of FEC packets received on the corresponded RTP stream.
	*/
	fecPacketsReceived?: number;

	/**
	* The total number of FEC packets discarded on the corresponded RTP stream.
	*/
	fecPacketsDiscarded?: number;

	/**
	* The total amount of payload bytes received on the corresponded RTP stream.
	*/
	bytesReceived?: number;

	/**
	* The total number of SR reports received by the corresponded RTP stream
	*/
	rtcpSrReceived?: number;

	/**
	* The total number of RR reports sent on the corresponded RTP stream
	*/
	rtcpRrSent?: number;

	/**
	* If rtx packets are sent or received on the same stream then this number indicates how may has been sent
	*/
	rtxPacketsReceived?: number;

	/**
	* If rtx packets are received on the same stream then this number indicates how may has been discarded
	*/
	rtxPacketsDiscarded?: number;

	/**
	* The number of frames received on the corresponded RTP stream
	*/
	framesReceived?: number;

	/**
	* Indicate the number of frames the Sfu has been decoded
	*/
	framesDecoded?: number;

	/**
	* Indicate the number of keyframes the Sfu has been decoded
	*/
	keyFramesDecoded?: number;

	/**
	* The calculated fractionLost of the stream
	*/
	fractionLost?: number;

	/**
	* The calculated jitter of the stream
	*/
	jitter?: number;

	/**
	* The calculated RTT of the stream
	*/
	roundTripTime?: number;

}
