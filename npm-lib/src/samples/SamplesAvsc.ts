export const schema = {
  "type": "record",
  "name": "Samples",
  "namespace": "org.observertc.schemas",
  "doc": "Observer created reports related to events (call started, call ended, client joined, etc...) indicated by the incoming samples.",
  "fields": [
    {
      "name": "meta",
      "doc": "Additional meta information about the carried payloads",
      "type": [
        "null",
        {
          "name": "SamplesMeta",
          "type": "record",
          "fields": [
            {
              "name": "schemaVersion",
              "type": [
                "null",
                "string"
              ],
              "doc": "Indicate the version of the schema for compatibility measures.",
              "default": null
            }
          ]
        }
      ],
      "default": null
    },
    {
      "name": "controlFlags",
      "doc": "Additional control flags indicate various operation has to be performed",
      "type": [
        "null",
        {
          "name": "ControlFlags",
          "type": "record",
          "fields": [
            {
              "name": "close",
              "doc": "Indicate that the server should close the connection",
              "type": [
                "null",
                "boolean"
              ],
              "default": null
            }
          ]
        }
      ],
      "default": null
    },
    {
      "name": "clientSamples",
      "doc": "Samples taken from the client",
      "type": [
        "null",
        {
          "type": "array",
          "items": {
            "name": "ClientSample",
            "type": "record",
            "doc": "docs",
            "fields": [
              {
                "name": "sfuId",
                "doc": "Unique generated id for the sfu samples are originated from",
                "type": "string"
              },
              {
                "name": "timestamp",
                "doc": "The timestamp the sample is created in GMT",
                "type": "long"
              },
              {
                "name": "timeZoneOffsetInHours",
                "doc": "The offset from GMT in hours",
                "type": [
                  "null",
                  "int"
                ],
                "default": null
              },
              {
                "name": "marker",
                "doc": "Special marker for the samples",
                "type": [
                  "null",
                  "string"
                ],
                "default": null
              }
            ]
          }
        }
      ],
      "default": null
    },
    {
      "name": "sfuSamples",
      "doc": "Samples taken from an Sfu",
      "type": [
        "null",
        {
          "type": "array",
          "items": {
            "name": "SfuSample",
            "type": "record",
            "doc": "docs",
            "fields": [
              {
                "name": "sfuId",
                "doc": "Unique generated id for the sfu samples are originated from",
                "type": "string"
              },
              {
                "name": "timestamp",
                "doc": "The timestamp the sample is created in GMT",
                "type": "long"
              },
              {
                "name": "timeZoneOffsetInHours",
                "doc": "The offset from GMT in hours",
                "type": [
                  "null",
                  "int"
                ],
                "default": null
              },
              {
                "name": "marker",
                "doc": "Special marker for the samples",
                "type": [
                  "null",
                  "string"
                ],
                "default": null
              }
            ]
          }
        }
      ],
      "default": null
    }
  ]
}