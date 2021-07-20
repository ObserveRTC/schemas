## SfuOutboundRTPStreamReport
---


A Report created for RTP streams going through the SFU


Name | Type | Required | Description 
--- | --- | --- | ---
mediaUnitId | string | Yes | The media unit id the report belongs to
sfuId | string | Yes | The provided unique identifier of the SFU
timestamp | long | Yes | The timestamp when the corresponded data is generated for the report (UTC Epoch in ms)
transportId | string | Yes | The id of the transport the RTP stream uses.
streamId | string | Yes | The id of the RTP stream.
ssrc | long | Yes | The synchronization source id of the RTP stream
serviceId | string | No | The unique identifier of the service. Only determined if the corresponded transport has a serviceId
marker | string | No | The marker the originated sample is reported with
trackId | string | No | The id of the track the RTP stream related to at the client side
clientId | string | No | If the track id was provided by the Sfu, the observer can fill up the information of which client it belongs to
callId | string | No | If the track id was provided by the Sfu, the observer can fill up the information of which call it belongs to
mediaType | string | No | the type of the media the stream carries ("audio" or "video")
payloadType | int | No | The payload type field of the RTP header
mimeType | string | No | The negotiated mimeType in the SDP
clockRate | long | No | The clock rate of the media source the RTP header carries
sdpFmtpLine | string | No | The actual SDP line from the negotiation related to this RTP stream
rid | string | No |  The rid parameter of the corresponded RTP stream
rtxSsrc | long | No | If RTX is negotiated as a separate stream, this is the SSRC of the RTX stream that is associated with this stream's ssrc. 
targetBitrate | int | No | he bitrate the corresponded stream targets.
voiceActivityFlag | boolean | No | The RTP header V flag indicate of the activity of the media source by the media codec if the RTP transport ships it through
firCount | int | No | The total number FIR packets sent from this endpoint to the source on the corresponded RTP stream. Only for Video streams
pliCount | int | No | The total number of Picture Loss Indication sent on the corresponded RTP stream. Only for Video streams
nackCount | int | No | The total number of negative acknowledgement received on the corresponded RTP stream.
sliCount | int | No | The total number of SLI indicator sent from the endpoint on the corresponded RTP stream. Only for Audio stream
packetsLost | int | No | The total number of packets lost on the corresponded RTP stream.
packetsSent | int | No | The total number of packets sent on the corresponded RTP stream.
packetsDiscarded | int | No | The total number of discarded packets on the corresponded RTP stream.
packetsRetransmitted | int | No | The total number of packets retransmitted on the corresponded RTP stream.
packetsFailedEncryption | int | No | The total number of packets failed to be encrypted on the corresponded RTP stream.
packetsDuplicated | int | No | The total number of duplicated packets appeared on the corresponded RTP stream.
fecPacketsSent | int | No | The total number of FEC packets sent on the corresponded RTP stream.
fecPacketsDiscarded | int | No | The total number of FEC packets discarded on the corresponded RTP stream.
bytesSent | long | No | The total amount of payload bytes sent on the corresponded RTP stream.
rtcpSrSent | int | No | The total number of SR reports sent by the corresponded RTP stream
rtcpRrReceived | int | No | The total number of RR reports received on the corresponded RTP stream
rtxPacketsSent | int | No | If rtx packets sent on the same stream then this number indicates how may has been sent
rtxPacketsDiscarded | int | No | If rtx packets are received on the same stream then this number indicates how may has been discarded
framesSent | int | No | The number of frames sent on the corresponded RTP stream
framesEncoded | int | No | Indicate the number of frames the Sfu has been encoded
keyFramesEncoded | int | No | Indicate the number of keyframes the Sfu has been encoded on the corresponded RTP stream
attachments | string | No | Arbitrary attachments holds relevant information about the stream.