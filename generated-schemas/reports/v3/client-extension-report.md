## ClientExtensionReport
---


A Report created for Extended provided arbitrary data.


Field | Type | Required | Description 
--- | --- | --- | ---
serviceId | string | Yes | The unique identifier of the service
timestamp | long | Yes | The timestamp when the corresponded data is generated for the report (UTC Epoch in ms)
extensionType | string | Yes | The name of the event
serviceName | string | No | The resolved service name configured for the service Id
mediaUnitId | string | No | The media unit id the report belongs to
marker | string | No | The marker the originated sample is reported with
callId | string | No | The generated unique identifier of the call
roomId | string | No | webrtc app provided room id
clientId | string | No | The generated unique identifier of the client
userId | string | No | webrtc app provided user identifier
peerConnectionId | string | No | The unique identifier of the peer connection
sampleSeq | int | No | The sequence number of the sample the event may related to
payload | string | No | the human readable message of the event