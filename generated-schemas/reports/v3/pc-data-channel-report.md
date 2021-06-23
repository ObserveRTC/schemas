## PcDataChannelReport
---


A Report created for PeerConnection Data Channel.


Name | Type | Required | Description 
--- | --- | --- | ---
serviceId | string | Yes | The unique identifier of the service
mediaUnitId | string | Yes | The media unit id the report belongs to
marker | string | No | The marker the originated sample is reported with
timestamp | long | Yes | The timestamp when the corresponded data is generated for the report (UTC Epoch in ms)
callId | string | Yes | The generated unique identifier of the call
roomId | string | No | webrtc app provided room id
clientId | string | Yes | The generated unique identifier of the client
userId | string | No | webrtc app provided user identifier
peerConnectionId | string | Yes | The unique identifier of the peer connection
peerConnectionLabel | string | No | The webrtc app provided label for the peer connection
sampleSeq | int | Yes | The sequence number of the sample the report is generated from
label | string | No | The label of the data channel
protocol | string | No | The protocol used for the data channel
state | string | No | The state of the data channel
messagesSent | int | No | Represents the total number of API message events sent
bytesSent | long | No | Represents the total number of payload bytes sent on the corresponded data channel
messagesReceived | int | No | Represents the total number of API message events received on the corresponded data channel
bytesReceived | long | No | Represents the total number of payload bytes received on the corresponded data channel