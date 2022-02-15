/**
* A Report created for RTP streams going through the SFU
*/
export type SfuOutboundRtpPadReport = {
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
	* The id of the RTP stream.
	*/
	rtpStreamId: string;

	/**
	* The id of Sfu pad.
	*/
	padId: string;

	/**
	* The synchronization source id of the RTP stream
	*/
	ssrc: number;

	/**
	* The marker the originated sample is reported with
	*/
	marker?: string;

	/**
	* The callId the event belongs to
	*/
	callId?: string;

	/**
	* If the track id was provided by the Sfu, the observer can fill up the information of which client it belongs to
	*/
	clientId?: string;

	/**
	* The id of the track the RTP stream related to at the client side
	*/
	trackId?: string;

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
	* The total number of packets sent on the corresponded RTP stream.
	*/
	packetsSent?: number;

	/**
	* The total number of discarded packets on the corresponded RTP stream.
	*/
	packetsDiscarded?: number;

	/**
	* The total number of packets retransmitted on the corresponded RTP stream.
	*/
	packetsRetransmitted?: number;

	/**
	* The total number of packets failed to be encrypted on the corresponded RTP stream.
	*/
	packetsFailedEncryption?: number;

	/**
	* The total number of duplicated packets appeared on the corresponded RTP stream.
	*/
	packetsDuplicated?: number;

	/**
	* The total number of FEC packets sent on the corresponded RTP stream.
	*/
	fecPacketsSent?: number;

	/**
	* The total number of FEC packets discarded on the corresponded RTP stream.
	*/
	fecPacketsDiscarded?: number;

	/**
	* The total amount of payload bytes sent on the corresponded RTP stream.
	*/
	bytesSent?: number;

	/**
	* The total number of SR reports sent by the corresponded RTP stream
	*/
	rtcpSrSent?: number;

	/**
	* The total number of RR reports received on the corresponded RTP stream
	*/
	rtcpRrReceived?: number;

	/**
	* If rtx packets sent on the same stream then this number indicates how may has been sent
	*/
	rtxPacketsSent?: number;

	/**
	* If rtx packets are received on the same stream then this number indicates how may has been discarded
	*/
	rtxPacketsDiscarded?: number;

	/**
	* The number of frames sent on the corresponded RTP stream
	*/
	framesSent?: number;

	/**
	* Indicate the number of frames the Sfu has been encoded
	*/
	framesEncoded?: number;

	/**
	* Indicate the number of keyframes the Sfu has been encoded on the corresponded RTP stream
	*/
	keyFramesEncoded?: number;

	/**
	* Arbitrary attachments holds relevant information about the stream.
	*/
	attachments?: string;

}
