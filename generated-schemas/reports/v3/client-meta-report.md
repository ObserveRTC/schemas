## CallMetaReport
---


Metadata belongs to a call and can be useful


Name | Value | Description 
--- | --- | ---
serviceId | Required string | The unique identifier of the service
serviceName | Optional string | The resolved service name configured for the service Id
mediaUnitId | Optional string | The media unit id the report belongs to
marker | Optional string | The marker the originated sample is reported with
timestamp | Required long | The timestamp when the corresponded data is generated for the report (UTC Epoch in ms)
callId | Optional string | The generated unique identifier of the call
roomId | Optional string | webrtc app provided room id
clientId | Optional string | The generated unique identifier of the client
userId | Optional string | webrtc app provided user identifier
peerConnectionId | Optional string | The unique identifier of the peer connection
sampleTimestamp | Optional long | The timestamp of the sample the event related to
sampleSeq | Optional int | The sequence number of the sample the event may related to
type | Optional string | The type of the meta data reported for the peer connection
payload | Optional string | The payload for the metadata reported for the peeer connection