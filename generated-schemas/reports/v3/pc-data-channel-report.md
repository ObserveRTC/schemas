## PcDataChannelReport
---


A Report created for PeerConnection Data Channel.


Name | Value | Description 
--- | --- | ---
serviceId | Required string | The unique identifier of the service
serviceName | Optional string | The resolved service name configured for the service Id
mediaUnitId | Required string | The media unit id the report belongs to
marker | Optional string | The marker the originated sample is reported with
timestamp | Required long | The timestamp when the corresponded data is generated for the report (UTC Epoch in ms)
callId | Required string | The generated unique identifier of the call
roomId | Optional string | webrtc app provided room id
clientId | Required string | The generated unique identifier of the client
userId | Optional string | webrtc app provided user identifier
peerConnectionId | Required string | The unique identifier of the peer connection
peerConnectionLabel | Optional string | The webrtc app provided label for the peer connection
sampleSeq | Required int | The sequence number of the sample the report is generated from
label | Optional string | The label of the data channel
protocol | Optional string | The protocol used for the data channel
state | Optional string | The state of the data channel
messagesSent | Optional int | Represents the total number of API message events sent
bytesSent | Optional long | Represents the total number of payload bytes sent on the corresponded data channel
messagesReceived | Optional int | Represents the total number of API message events received on the corresponded data channel
bytesReceived | Optional long | Represents the total number of payload bytes received on the corresponded data channel