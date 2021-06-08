## ClientSample
---


Name | Value | Description 
--- | --- | ---
clientId | Required string | The unique generated
sampleSeq | Optional number | The sequence number a source assigns to the sample. 
Every time the source make a sample at a client 
this number is monothonically incremented.

Always presented
roomId | Optional string | The WebRTC app configured room id the client was at the call.
If it is configured, then every sample carries this information.

If it is configured, it is presented in every sample.
userId | Optional string | The WebRTC app configured user id of the client.
If it is configured, then every sample carries this information.

If it is configured, it is presented in every sample.
engine | Optional Engine | The engine
platform | Optional Platform | The platform
mediaSources | Optional array | A list of media sources a client uses



### Engine
---
### Platform
---
### MediaSource
---


Name | Value | Description 
--- | --- | ---
myId | Required string | id of the media source