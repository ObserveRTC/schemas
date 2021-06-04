// report has:
// -- serviceId (req): string
// -- serviceName (opt): string,
// -- mediaUnitId (req): string
// -- timestamp (long): long
const ReportMetaFields = [
    /* Report MetaFields */
    {
      "name" : "serviceId",
      "doc": "The unique identifier of the service",
      "type" : "string"
    }, {
      "name" : "serviceName",
      "doc": "The resolved service name configured for the service Id",
      "type" : [ "null", "string" ],
      "default" : null
    }, {
      "name" : "mediaUnitId",
      "doc": "The media unit id the report belongs to",
      "type" : "string"
    }, {
      "name" : "marker",
      "doc": "The marker the originated sample is reported with",
      "type" : [ "null", "string" ],
      "default" : null
    }, {
      "name" : "timestamp",
      "doc": "The timestamp when the corresponded data is generated for the report (UTC Epoch in ms)",
      "type" : "long"
    },
]


// event report has:
// -- marker (opt): string
// -- callId (opt): string
// -- userId (opt): string
// -- roomId (opt): string
// -- name (req): string
// -- value (opt): string
// -- message (opt): string
// -- attachments (opt): string
// -- sampleSeq (opt): int
// -- sampleTimestamp (opt): long
const EventReportFields = [
  /* Event Report Fields */
  {
    "name" : "marker",
    "doc": "The marker the sample is marked with",
    "type" : [ "null", "string" ],
    "default" : null
  },
  {
    "name" : "callId",
    "doc": "The generated unique identifier of the call",
    "type" : "string"
  },
  {
    "name" : "roomId",
    "doc": "webrtc app provided room id",
    "type" : [ "null", "string" ],
    "default" : null
  }, {
    "name" : "clientId",
    "doc": "The generated unique identifier of the client",
    "type" : [ "null", "string" ],
    "default" : null
  }, {
    "name" : "userId",
    "doc": "webrtc app provided user identifier",
    "type" : [ "null", "string" ],
    "default" : null
  }, {
    "name" : "peerConnectionId",
    "doc": "The unique identifier of the peer connection",
    "type" : [ "null", "string" ],
    "default" : null
  }, {
    "name" : "sampleTimestamp",
    "doc": "The timestamp of the sample the event related to",
    "type" : [ "null", "long" ],
    "default" : null
  }, {
    "name" : "sampleSeq",
    "doc": "The sequence number of the sample the event may related to",
    "type" : [ "null", "int" ],
    "default" : null
  }, {
    "name" : "name",
    "doc": "The name of the event",
    "type" : "string"
  }, {
    "name" : "message",
    "doc": "the human readable message of the event",
    "type" : [ "null", "string" ],
    "default" : null
  }, 
  {
    "name" : "value",
    "doc": "the value of the event",
    "type" : [ "null", "string" ],
    "default" : null
  }, 
  {
    "name" : "attachments",
    "doc": "attachment the event may created with",
    "type" : [ "null", "string" ],
    "default" : null
  }, 
]

// meta report has
// -- type (req): string
// -- payload (opt): string
const MetaReportFields = [
  /* Meta Report Fields */
  {
    "name" : "type",
    "doc": "The type of the reported metadata",
    "type" : "string"
  }, {
    "name" : "payload",
    "doc": "the payload of the reported metadata",
    "type" : [ "null", "string" ],
    "default" : null
  }, 
]

// pc report has
// -- callId (req): string
// -- roomId (opt): string
// -- clientId (req): string
// -- userId (opt): string
// -- peerConnectionId (req): string
// -- label (opt): string
const PcReportFields = [
    /* Peer Connection Report Fields */
    {
      "name" : "callId",
      "doc": "The generated unique identifier of the call",
      "type" : "string"
    }, {
      "name" : "roomId",
      "doc": "webrtc app provided room id",
      "type" : [ "null", "string" ],
      "default" : null
    }, {
      "name" : "clientId",
      "doc": "The generated unique identifier of the client",
      "type" : "string"
    }, {
      "name" : "userId",
      "doc": "webrtc app provided user identifier",
      "type" : [ "null", "string" ],
      "default" : null
    }, {
      "name" : "peerConnectionId",
      "doc": "The unique identifier of the peer connection",
      "type" :  "string"
    }, {
      "name" : "label",
      "doc": "The webrtc app provided label the peer connection is labeled with",
      "type" : [ "null", "string" ],
      "default" : null
    }, 
]

// client report has
// -- callId (req): string
// -- roomId (opt): string
// -- clientId (req): string
// -- userId (opt): string
const ClientReportFields = [
  /* Client Report Fields */
  {
    "name" : "callId",
    "doc": "The generated unique identifier of a call the report belongs to",
    "type" : "string"
  }, {
    "name" : "roomId",
    "doc": "The provided room id name the report is made from",
    "type" : [ "null", "string" ],
    "default" : null
  }, {
    "name" : "clientId",
    "doc": "The generated unique identifier of a client the report belongs to",
    "type" : "string"
  }, {
    "name" : "userId",
    "doc": "The provided name of the user participating in the call",
    "type" : [ "null", "string" ],
    "default" : null
  }, 
]

// call report has
// -- callId (req): string
// -- roomId (opt): string
const CallReportFields = [
  /* Call Report Fields */
  {
    "name" : "callId",
    "doc": "The generated unique identifier of a call the report belongs to",
    "type" : "string"
  }, {
    "name" : "roomId",
    "doc": "The provided room id name the report is made from",
    "type" : [ "null", "string" ],
    "default" : null
  }, 
]

// sample related report
const SampleReportFields = [
  /* Sample Based Report Fields */
  {
    "name" : "sampleSeq",
    "doc": "The sequence number of the sample the report is generated from",
    "type" : "int"
  },
]

// observer report has