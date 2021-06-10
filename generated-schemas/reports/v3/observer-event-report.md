## ObserverEventReport
---


A report created for observer generated events


Name | Value | Description 
--- | --- | ---
serviceId | Required string | The unique identifier of the service
serviceName | Optional string | The resolved service name configured for the service Id
mediaUnitId | Optional string | The media unit id the report belongs to
marker | Optional string | The marker the originated sample is reported with
timestamp | Required long | The timestamp when the corresponded data is generated for the report (UTC Epoch in ms)
callId | Required string | The generated unique identifier of the call
roomId | Optional string | webrtc app provided room id
clientId | Optional string | The generated unique identifier of the client
userId | Optional string | webrtc app provided user identifier
peerConnectionId | Optional string | The unique identifier of the peer connection
sampleTimestamp | Optional long | The timestamp of the sample the event related to
sampleSeq | Optional int | The sequence number of the sample the event may related to
name | Required string | The name of the event
message | Optional string | the human readable message of the event
value | Optional string | the value of the event
attachments | Optional string | attachment the event may created with