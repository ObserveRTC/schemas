export const schema = {
  "type": "record",
  "name": "SfuMetaReport",
  "namespace": "org.observertc.schemas",
  "doc": "Metadata belongs to SFUs",
  "fields": [
    {
      "name": "serviceId",
      "doc": "The service id the report belongs to",
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
      "name": "sfuId",
      "doc": "The id of the Sfu",
      "type": [
        "null",
        "string"
      ],
      "default": null
    },
    {
      "name": "callId",
      "doc": "The callId the event belongs to",
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
      "name": "peerConnectionId",
      "doc": "The unique identifier of the peer connection",
      "type": [
        "null",
        "string"
      ],
      "default": null
    },
    {
      "name": "type",
      "doc": "The type of the meta data reported for the peer connection",
      "type": [
        "null",
        "string"
      ],
      "default": null
    },
    {
      "name": "payload",
      "doc": "The payload for the metadata reported for the peeer connection",
      "type": [
        "null",
        "string"
      ],
      "default": null
    }
  ]
}