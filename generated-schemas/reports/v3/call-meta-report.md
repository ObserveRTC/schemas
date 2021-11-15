## CallMetaReport
---


Metadata belongs to a call and can be useful


Attribute | Type | Required | Description 
--- | --- | --- | ---
serviceId | string | Yes | The unique identifier of the service
timestamp | long | Yes | The timestamp when the corresponded data is generated for the report (UTC Epoch in ms)
mediaUnitId | string | No | The media unit id the report belongs to
marker | string | No | The marker the originated sample is reported with
callId | string | No | The generated unique identifier of the call
roomId | string | No | webrtc app provided room id
clientId | string | No | The generated unique identifier of the client
userId | string | No | webrtc app provided user identifier
peerConnectionId | string | No | The unique identifier of the peer connection
sampleTimestamp | long | No | The timestamp of the sample the event related to
sampleSeq | int | No | The sequence number of the sample the event may related to
type | string | No | The type of the meta data. Possible values are: CERTIFICATE, CODEC, ICE_LOCAL_CANDIDATE, ICE_REMOTE_CANDIDATE, ICE_SERVER, MEDIA_CONSTRAINT, MEDIA_DEVICE, MEDIA_SOURCE, USER_MEDIA_ERROR,
payload | string | No | The payload for the metadata reported for the peeer connection