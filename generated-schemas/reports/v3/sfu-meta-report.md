## SfuMetaReport
---


Metadata belongs to SFUs


Field | Type | Required | Description 
--- | --- | --- | ---
serviceId | string | Yes | The service id the report belongs to
timestamp | long | Yes | The timestamp when the corresponded data is generated for the report (UTC Epoch in ms)
mediaUnitId | string | No | The media unit id the report belongs to
marker | string | No | The marker the originated sample is reported with
sfuId | string | No | The id of the Sfu
callId | string | No | The callId the event belongs to
clientId | string | No | The generated unique identifier of the client
peerConnectionId | string | No | The unique identifier of the peer connection
type | string | No | The type of the meta data reported for the peer connection
payload | string | No | The payload for the metadata reported for the peeer connection