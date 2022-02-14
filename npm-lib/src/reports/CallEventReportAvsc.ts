export const schema = {
  "type": "record",
  "name": "CallEventReport",
  "namespace": "org.observertc.schemas.reports",
  "doc": "Observer created reports related to events (call started, call ended, client joined, etc...) indicated by the incoming samples.",
  "fields": [
    {
      "name": "serviceId",
      "doc": "The unique identifier of the service",
      "type": "string"
    },
    {
      "name": "mediaUnitId",
      "doc": "The media unit id the report belongs to",
      "type": [
        "null",
        "string"
      ],
      "default": null
    },
    {
      "name": "marker",
      "doc": "The marker the originated sample is reported with",
      "type": [
        "null",
        "string"
      ],
      "default": null
    },
    {
      "name": "timestamp",
      "doc": "The timestamp when the corresponded data is generated for the report (UTC Epoch in ms)",
      "type": "long"
    },
    {
      "name": "callId",
      "doc": "The generated unique identifier of the call",
      "type": [
        "null",
        "string"
      ],
      "default": null
    },
    {
      "name": "roomId",
      "doc": "webrtc app provided room id",
      "type": [
        "null",
        "string"
      ],
      "default": null
    },
    {
      "name": "clientId",
      "doc": "The generated unique identifier of the client",
      "type": [
        "null",
        "string"
      ],
      "default": null
    },
    {
      "name": "userId",
      "doc": "webrtc app provided user identifier",
      "type": [
        "null",
        "string"
      ],
      "default": null
    },
    {
      "name": "peerConnectionId",
      "doc": "The unique identifier of the peer connection",
      "type": [
        "null",
        "string"
      ],
      "default": null
    },
    {
      "name": "mediaTrackId",
      "doc": "The unique identifier of the media track",
      "type": [
        "null",
        "string"
      ],
      "default": null
    },
    {
      "name": "SSRC",
      "doc": "The SSRC identifier of the RTP stream a trackId belongs to",
      "type": [
        "null",
        "long"
      ],
      "default": null
    },
    {
      "name": "sampleTimestamp",
      "doc": "The timestamp of the sample the event related to",
      "type": [
        "null",
        "long"
      ],
      "default": null
    },
    {
      "name": "sampleSeq",
      "doc": "The sequence number of the sample the event may related to",
      "type": [
        "null",
        "int"
      ],
      "default": null
    },
    {
      "name": "name",
      "doc": "The name of the event. Possible values are: CALL_STARTED, CALL_ENDED, CLIENT_JOINED, CLIENT_LEFT, PEER_CONNECTION_OPENED, PEER_CONNECTION_CLOSED, MEDIA_TRACK_ADDED, MEDIA_TRACK_REMOVED",
      "type": "string"
    },
    {
      "name": "message",
      "doc": "the human readable message of the event",
      "type": [
        "null",
        "string"
      ],
      "default": null
    },
    {
      "name": "value",
      "doc": "the value of the event",
      "type": [
        "null",
        "string"
      ],
      "default": null
    },
    {
      "name": "attachments",
      "doc": "attachment the event may created with",
      "type": [
        "null",
        "string"
      ],
      "default": null
    }
  ]
}