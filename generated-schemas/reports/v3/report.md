## Report
---


A multiplexed Report object wraps an encoded report in bytes format


Name | Type | Required | Description 
--- | --- | --- | ---
type | enum | Yes | The type of the report (Possible values are: OBSERVER_EVENT,<br />CALL_EVENT,<br />CALL_META_DATA,<br />CLIENT_EXTENSION_DATA,<br />PEER_CONNECTION_TRANPORT,<br />PEER_CONNECTION_DATA_CHANNEL,<br />INBOUND_AUDIO_TRACK,<br />INBOUND_VIDEO_TRACK,<br />OUTBOUND_AUDIO_TRACK,<br />OUTBOUND_VIDEO_TRACK,<br />MEDIA_TRACK,<br />SFU_EVENT,<br />SFU_META_DATA,<br />SFU_TRANSPORT,<br />SFU_INBOUND_RTP_STREAM,<br />SFU_OUTBOUND_RTP_STREAM,<br />SFU_SCTP_STREAM)
payload | bytes | Yes | The payload of contans the actual report