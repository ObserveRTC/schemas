## SfuSctpStreamReport
---


A Report created for SCTP streams going through the SFU


Attribute | Type | Required | Description 
--- | --- | --- | ---
serviceId | string | Yes | The service id the report belongs to
mediaUnitId | string | Yes | The media unit id the report belongs to
sfuId | string | Yes | The provided unique identifier of the SFU
timestamp | long | Yes | The timestamp when the corresponded data is generated for the report (UTC Epoch in ms)
transportId | string | Yes | The id of the transport the RTP stream uses.
streamId | string | Yes | The id of the sctp stream
marker | string | No | The marker the originated sample is reported with
callId | string | No | The generated unique identifier of the call
roomId | string | No | webrtc app provided room id
label | string | No | The label of the sctp stream
protocol | string | No | The protocol used to establish an sctp stream
sctpSmoothedRoundTripTime | double | No | The latest smoothed round-trip time value, corresponding to spinfo_srtt defined in [RFC6458] but converted to seconds. If there has been no round-trip time measurements yet, this value is undefined.
sctpCongestionWindow | double | No | The latest congestion window, corresponding to spinfo_cwnd defined in [RFC6458].
sctpReceiverWindow | double | No | The latest receiver window, corresponding to sstat_rwnd defined in [RFC6458].
sctpMtu | int | No | The latest maximum transmission unit, corresponding to spinfo_mtu defined in [RFC6458].
sctpUnackData | int | No | The number of unacknowledged DATA chunks, corresponding to sstat_unackdata defined in [RFC6458].
messageReceived | int | No | The number of message received on the corresponded SCTP stream.
messageSent | int | No | The number of message sent on the corresponded SCTP stream.
bytesReceived | long | No | The number of bytes received on the corresponded SCTP stream.
bytesSent | long | No | The number of bytes sent on the corresponded SCTP stream.