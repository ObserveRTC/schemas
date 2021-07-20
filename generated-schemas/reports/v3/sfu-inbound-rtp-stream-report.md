## SfuInboundRTPStreamReport
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
trackId | null,string | Yes | The id of the track the RTP stream related to at the client side
clientId | null,string | Yes | If the track id was provided by the Sfu, the observer can fill up the information of which client it belongs to
callId | null,string | Yes | If the track id was provided by the Sfu, the observer can fill up the information of which call it belongs to
serviceId | string | No | The unique identifier of the service. Only determined if the corresponded transport has a serviceId
marker | string | No | The marker the originated sample is reported with
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
packetsReceived | int | No | The total number of packets received on the corresponded RTP stream.
packetsDiscarded | int | No | The total number of discarded packets on the corresponded RTP stream.
packetsRepaired | int | No | The total number of packets repaired by either retransmission or FEC on the corresponded RTP stream.
packetsFailedDecryption | int | No | The total number of packets failed to be decrypted on the corresponded RTP stream.
packetsDuplicated | int | No | The total number of duplicated packets appeared on the corresponded RTP stream.
fecPacketsReceived | int | No | The total number of FEC packets received on the corresponded RTP stream.
fecPacketsDiscarded | int | No | The total number of FEC packets discarded on the corresponded RTP stream.
bytesReceived | long | No | The total amount of payload bytes received on the corresponded RTP stream.
rtcpSrReceived | int | No | The total number of SR reports received by the corresponded RTP stream
rtcpRrSent | int | No | The total number of RR reports sent on the corresponded RTP stream
rtxPacketsReceived | int | No | If rtx packets are sent or received on the same stream then this number indicates how may has been sent
rtxPacketsDiscarded | int | No | If rtx packets are received on the same stream then this number indicates how may has been discarded
framesReceived | int | No | The number of frames received on the corresponded RTP stream
framesDecoded | int | No | Indicate the number of frames the Sfu has been decoded
keyFramesDecoded | int | No | Indicate the number of keyframes the Sfu has been decoded
fractionLost | double | No | The calculated fractionLost of the stream
jitter | double | No | The calculated jitter of the stream
roundTripTime | double | No | The calculated RTT of the stream
attachments | string | No | Arbitrary attachments holds relevant information about the stream.