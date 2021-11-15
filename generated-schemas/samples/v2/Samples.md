## Samples
---


A compound message object from the observed client to the observer
holds various samples, control flags and attachments.


Field | Type | Required | Description 
--- | --- | --- | ---
meta | SamplesMeta | No | Additional meta information about the carried payloads
clientSamples | array | No | array of client samples
sfuSamples | array | No | array of sfu samples
controlFlags | ControlFlags | No | Additional control flags indicate various operation has to be performed