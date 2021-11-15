## SFUTransportReport
---


A Report created for SFU Transport layer typically created to transfer RTP/SCTP/RTX streams to another client, SFU, MCU, or processing module.


Attribute | Type | Required | Description 
--- | --- | --- | ---
serviceId | string | Yes | The service id the report belongs to
mediaUnitId | string | Yes | The media unit id the report belongs to
sfuId | string | Yes | The provided unique identifier of the SFU
timestamp | long | Yes | The timestamp when the corresponded data is generated for the report (UTC Epoch in ms)
transportId | string | Yes | The generated unique identifier of the transport
marker | string | No | The marker the originated sample is reported with
callId | string | No | The generated unique identifier of the call
roomId | string | No | webrtc app provided room id
dtlsState | string | No | Represent the current value of the state attribute of the underlying RTCDtlsTransport.
iceState | string | No | Represent the current value of the state attribute of the underlying RTCIceTransport
sctpState | string | No | Represents the the current value of the SCTP state of the transport of the SFU
iceRole | string | No | Represent the current value of the role SFU takes place in ICE
localAddress | string | No | The local address of the ICE candidate selected for the transport (IPv4, IPv6, FQDN)
localPort | int | No | The local port number
protocol | string | No | The protocol used by the transport
remoteAddress | string | No | The remote address of the ICE candidate selected for the transport (IPv4, IPv6, FQDN)
remotePort | int | No | The remote port number
rtpBytesReceived | long | No | The total amount of RTP bytes received on this transport
rtpBytesSent | long | No | The total amount of RTP bytes sent on this transport
rtpPacketsReceived | int | No | The total amount of RTP packets received on this transport
rtpPacketsSent | int | No | The total amount of RTP packets sent on this transport
rtpPacketsLost | int | No | The total amount of RTP packets lost on this transport
rtxBytesReceived | long | No | The total amount of RTX bytes received on this transport
rtxBytesSent | long | No | The total amount of RTX bytes sent on this transport
rtxPacketsReceived | int | No | The total amount of RTX packets received on this transport
rtxPacketsSent | int | No | The total amount of RTX packets sent on this transport
rtxPacketsLost | int | No | The total amount of RTX packets lost on this transport
rtxPacketsDiscarded | int | No | The total amount of RTX packets discarded on this transport
sctpBytesReceived | long | No | The total amount of SCTP bytes received on this transport
sctpBytesSent | long | No | The total amount of SCTP bytes sent on this transport
sctpPacketsReceived | int | No | The total amount of SCTP packets received on this transport
sctpPacketsSent | int | No | The total amount of SCTP packets sent on this transport