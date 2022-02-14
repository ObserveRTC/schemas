export const schema = {
  "type": "record",
  "name": "ClientDataChannelReport",
  "namespace": "org.observertc.schemas",
  "doc": "A Report created for PeerConnection Data Channel.",
  "fields": [
    {
      "name": "serviceId",
      "doc": "The unique identifier of the service",
      "type": "string"
    },
    {
      "name": "mediaUnitId",
      "doc": "The media unit id the report belongs to",
      "type": "string"
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
      "type": "string"
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
      "type": "string"
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
      "type": "string"
    },
    {
      "name": "peerConnectionLabel",
      "doc": "The webrtc app provided label for the peer connection",
      "type": [
        "null",
        "string"
      ],
      "default": null
    },
    {
      "name": "sampleSeq",
      "doc": "The sequence number of the sample the report is generated from",
      "type": "int"
    },
    {
      "name": "label",
      "doc": "The label of the data channel",
      "type": [
        "null",
        "string"
      ],
      "default": null
    },
    {
      "name": "protocol",
      "doc": "The protocol used for the data channel",
      "type": [
        "null",
        "string"
      ],
      "default": null
    },
    {
      "name": "state",
      "doc": "The state of the data channel",
      "type": [
        "null",
        "string"
      ],
      "default": null
    },
    {
      "name": "messagesSent",
      "doc": "Represents the total number of API message events sent",
      "type": [
        "null",
        "int"
      ],
      "default": null
    },
    {
      "name": "bytesSent",
      "doc": "Represents the total number of payload bytes sent on the corresponded data channel",
      "type": [
        "null",
        "long"
      ],
      "default": null
    },
    {
      "name": "messagesReceived",
      "doc": "Represents the total number of API message events received on the corresponded data channel",
      "type": [
        "null",
        "int"
      ],
      "default": null
    },
    {
      "name": "bytesReceived",
      "doc": "Represents the total number of payload bytes received on the corresponded data channel",
      "type": [
        "null",
        "long"
      ],
      "default": null
    }
  ]
}