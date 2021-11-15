## ObserverEventReport
---


A report created for observer generated events


Attribute | Type | Required | Description 
--- | --- | --- | ---
serviceId | string | Yes | The unique identifier of the service
timestamp | long | Yes | The timestamp when the corresponded data is generated for the report (UTC Epoch in ms)
callId | string | Yes | The generated unique identifier of the call
name | string | Yes | The name of the event
mediaUnitId | string | No | The media unit id the report belongs to
marker | string | No | The marker the originated sample is reported with
roomId | string | No | webrtc app provided room id
clientId | string | No | The generated unique identifier of the client
userId | string | No | webrtc app provided user identifier
peerConnectionId | string | No | The unique identifier of the peer connection
sampleTimestamp | long | No | The timestamp of the sample the event related to
sampleSeq | int | No | The sequence number of the sample the event may related to
message | string | No | the human readable message of the event
value | string | No | the value of the event
attachments | string | No | attachment the event may created with