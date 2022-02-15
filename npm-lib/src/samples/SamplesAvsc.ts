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
                "name": "callId",
                "doc": "If it is provided the server uses the given id to match clients in the same call. Must be a valid UUID. ",
                "type": [
                  "null",
                  "string"
                ],
                "default": null
              },
              {
                "name": "clientId",
                "doc": "Unique id of the client providing samples. Must be a valid UUID",
                "type": "string"
              },
              {
                "name": "sampleSeq",
                "doc": "The sequence number a source assigns to the sample. Every time the source make a sample at a client this number should be monothonically incremented.",
                "type": [
                  "null",
                  "int"
                ],
                "default": null
              },
              {
                "name": "roomId",
                "doc": "The WebRTC app configured room id the client joined for the call.",
                "type": [
                  "null",
                  "string"
                ],
                "default": null
              },
              {
                "name": "userId",
                "doc": "The WebRTC app configured human readable user id the client is joined.",
                "type": [
                  "null",
                  "string"
                ],
                "default": null
              },
              {
                "name": "engine",
                "doc": "WebRTC App provided information related to the engine the client uses.",
                "type": [
                  "null",
                  {
                    "name": "Engine",
                    "type": "record",
                    "fields": [
                      {
                        "name": "name",
                        "type": [
                          "null",
                          "string"
                        ],
                        "doc": "The name of the Engine",
                        "default": null
                      },
                      {
                        "name": "version",
                        "type": [
                          "null",
                          "string"
                        ],
                        "doc": "The version of the engine",
                        "default": null
                      }
                    ]
                  }
                ],
                "default": null
              },
              {
                "name": "platform",
                "doc": "WebRTC App provided information related to the platform the client uses.",
                "type": [
                  "null",
                  {
                    "name": "Platform",
                    "type": "record",
                    "fields": [
                      {
                        "name": "type",
                        "type": [
                          "null",
                          "string"
                        ],
                        "doc": "The name of the platform",
                        "default": null
                      },
                      {
                        "name": "vendor",
                        "type": [
                          "null",
                          "string"
                        ],
                        "doc": "The name of the vendor",
                        "default": null
                      },
                      {
                        "name": "model",
                        "type": [
                          "null",
                          "string"
                        ],
                        "doc": "The name of the model",
                        "default": null
                      }
                    ]
                  }
                ],
                "default": null
              },
              {
                "name": "browsers",
                "doc": "WebRTC App provided information related to the browser the client uses.",
                "type": [
                  "null",
                  {
                    "name": "Browser",
                    "type": "record",
                    "fields": [
                      {
                        "name": "name",
                        "type": [
                          "null",
                          "string"
                        ],
                        "doc": "The name of the operation system (e.g.: linux) the webrtc app uses",
                        "default": null
                      },
                      {
                        "name": "version",
                        "type": [
                          "null",
                          "string"
                        ],
                        "doc": "The version of the operation system",
                        "default": null
                      }
                    ]
                  }
                ],
                "default": null
              },
              {
                "name": "os",
                "doc": "WebRTC App provided information related to the operation system the client uses.",
                "type": [
                  "null",
                  {
                    "name": "OperationSystem",
                    "type": "record",
                    "fields": [
                      {
                        "name": "name",
                        "type": [
                          "null",
                          "string"
                        ],
                        "doc": "The name of the operation system (e.g.: linux) the webrtc app uses",
                        "default": null
                      },
                      {
                        "name": "version",
                        "type": [
                          "null",
                          "string"
                        ],
                        "doc": "The version of the operation system",
                        "default": null
                      }
                    ]
                  }
                ],
                "default": null
              },
              {
                "name": "mediaConstraints",
                "doc": "The WebRTC app provided List of the media constraints the client has.",
                "type": [
                  "null",
                  {
                    "type": "array",
                    "items": "string"
                  }
                ],
                "default": null
              },
              {
                "name": "mediaDevices",
                "doc": "The WebRTC app provided List of the media devices the client has.",
                "type": [
                  "null",
                  {
                    "type": "array",
                    "items": "string"
                  }
                ],
                "default": null
              },
              {
                "name": "userMediaErrors",
                "doc": "The WebRTC app provided List of user media errors the client has.",
                "type": [
                  "null",
                  {
                    "type": "array",
                    "items": "string"
                  }
                ],
                "default": null
              },
              {
                "name": "extensionStats",
                "doc": "The WebRTC app provided custom stats payload",
                "type": [
                  "null",
                  {
                    "type": "array",
                    "items": {
                      "name": "ExtensionStat",
                      "type": "record",
                      "fields": [
                        {
                          "name": "type",
                          "type": "string",
                          "doc": "The type of the extension stats the custom app provides"
                        },
                        {
                          "name": "payload",
                          "type": "string",
                          "doc": "The payload of the extension stats the custom app provides"
                        }
                      ]
                    }
                  }
                ],
                "default": null
              },
              {
                "name": "iceServers",
                "doc": "The WebRTC app provided List of ICE server the client used.",
                "type": [
                  "null",
                  {
                    "type": "array",
                    "items": "string"
                  }
                ],
                "default": null
              },
              {
                "name": "pcTransports",
                "doc": "Compound object related to Peer Connection Transport Stats",
                "type": [
                  "null",
                  {
                    "type": "array",
                    "items": {
                      "name": "PeerConnectionTransport",
                      "type": "record",
                      "fields": [
                        {
                          "name": "peerConnectionId",
                          "doc": "The unique identifier of the peer connection",
                          "type": "string"
                        },
                        {
                          "name": "label",
                          "doc": "The webrtc app provided label the peer connection is marked with",
                          "type": [
                            "null",
                            "string"
                          ],
                          "default": null
                        },
                        {
                          "name": "dataChannelsOpened",
                          "doc": "Represents the number of unique RTCDataChannels that have entered the \"open\" state during their lifetime.",
                          "type": [
                            "null",
                            "int"
                          ],
                          "default": null
                        },
                        {
                          "name": "dataChannelsClosed",
                          "doc": "Represents the number of unique RTCDataChannels that had the \"open\" state, but now they are \"closed\"",
                          "type": [
                            "null",
                            "int"
                          ],
                          "default": null
                        },
                        {
                          "name": "dataChannelsRequested",
                          "doc": "Represents the number of unique RTCDataChannels successfully requested from RTCPeerConnection.",
                          "type": [
                            "null",
                            "int"
                          ],
                          "default": null
                        },
                        {
                          "name": "dataChannelsAccepted",
                          "doc": "Represents the number of unique RTCDataChannels signaled in a ondatachannel event on the RTCPeerConnection.",
                          "type": [
                            "null",
                            "int"
                          ],
                          "default": null
                        },
                        {
                          "name": "packetsSent",
                          "doc": "Represents the total number of packets sent on the corresponded transport",
                          "type": [
                            "null",
                            "int"
                          ],
                          "default": null
                        },
                        {
                          "name": "packetsReceived",
                          "doc": "Represents the total number of packets received on the corresponded transport",
                          "type": [
                            "null",
                            "int"
                          ],
                          "default": null
                        },
                        {
                          "name": "bytesSent",
                          "doc": "Represents the total amount of bytes sent on the corresponded transport",
                          "type": [
                            "null",
                            "long"
                          ],
                          "default": null
                        },
                        {
                          "name": "bytesReceived",
                          "doc": "Represents the total amount of bytes received on the corresponded transport",
                          "type": [
                            "null",
                            "long"
                          ],
                          "default": null
                        },
                        {
                          "name": "iceRole",
                          "doc": "Represent the current role of ICE under DTLS Transport",
                          "type": [
                            "null",
                            "string"
                          ],
                          "default": null
                        },
                        {
                          "name": "iceLocalUsernameFragment",
                          "doc": "Represent the current local username fragment used in message validation procedures for ICE under DTLS Transport",
                          "type": [
                            "null",
                            "string"
                          ],
                          "default": null
                        },
                        {
                          "name": "dtlsState",
                          "doc": "Represents the current state of DTLS for the peer connection transport layer",
                          "type": [
                            "null",
                            "string"
                          ],
                          "default": null
                        },
                        {
                          "name": "iceState",
                          "doc": "Represents the current transport state (RTCIceTransportState) of ICE for the peer connection transport layer",
                          "type": [
                            "null",
                            "string"
                          ],
                          "default": null
                        },
                        {
                          "name": "tlsVersion",
                          "doc": "Represents the version number of the TLS used in the corresponded transport",
                          "type": [
                            "null",
                            "string"
                          ],
                          "default": null
                        },
                        {
                          "name": "dtlsCipher",
                          "doc": "Represents the name of the DTLS cipher used in the corresponded transport",
                          "type": [
                            "null",
                            "string"
                          ],
                          "default": null
                        },
                        {
                          "name": "srtpCipher",
                          "doc": "Represents the name of the SRTP cipher used in the corresponded transport",
                          "type": [
                            "null",
                            "string"
                          ],
                          "default": null
                        },
                        {
                          "name": "tlsGroup",
                          "doc": "Represents the name of the IANA TLS Supported Groups used in the corresponded transport",
                          "type": [
                            "null",
                            "string"
                          ],
                          "default": null
                        },
                        {
                          "name": "selectedCandidatePairChanges",
                          "doc": "The total number of candidate pair changes over the peer connection",
                          "type": [
                            "null",
                            "int"
                          ],
                          "default": null
                        },
                        {
                          "name": "localAddress",
                          "doc": "The address of the candidate (IPv4, IPv6, FQDN)",
                          "type": [
                            "null",
                            "string"
                          ],
                          "default": null
                        },
                        {
                          "name": "localPort",
                          "doc": "The locally used port to communicate with the remote peer",
                          "type": [
                            "null",
                            "int"
                          ],
                          "default": null
                        },
                        {
                          "name": "localProtocol",
                          "doc": "The protocol used by the local endpoint for the corresponded transport",
                          "type": [
                            "null",
                            "string"
                          ],
                          "default": null
                        },
                        {
                          "name": "localCandidateType",
                          "doc": "The type of the ICE candidate used at the local endpoint on the corresponded transport",
                          "type": [
                            "null",
                            "string"
                          ],
                          "default": null
                        },
                        {
                          "name": "localCandidateICEServerUrl",
                          "doc": "The url of the ICE server used by the local endpoint on the corresponded transport",
                          "type": [
                            "null",
                            "string"
                          ],
                          "default": null
                        },
                        {
                          "name": "localCandidateRelayProtocol",
                          "doc": "The relay protocol of the ICE candidate used by the local endpoint on the corresponded transport",
                          "type": [
                            "null",
                            "string"
                          ],
                          "default": null
                        },
                        {
                          "name": "remoteAddress",
                          "doc": "The address of the candidate (IPv4, IPv6, FQDN)",
                          "type": [
                            "null",
                            "string"
                          ],
                          "default": null
                        },
                        {
                          "name": "remotePort",
                          "doc": "The remotely used port to communicate with the remote peer",
                          "type": [
                            "null",
                            "int"
                          ],
                          "default": null
                        },
                        {
                          "name": "remoteProtocol",
                          "doc": "The protocol used by the remote endpoint for the corresponded transport",
                          "type": [
                            "null",
                            "string"
                          ],
                          "default": null
                        },
                        {
                          "name": "remoteCandidateType",
                          "doc": "The type of the ICE candidate used at the remote endpoint on the corresponded transport",
                          "type": [
                            "null",
                            "string"
                          ],
                          "default": null
                        },
                        {
                          "name": "remoteCandidateICEServerUrl",
                          "doc": "The url of the ICE server used by the remote endpoint on the corresponded transport",
                          "type": [
                            "null",
                            "string"
                          ],
                          "default": null
                        },
                        {
                          "name": "remoteCandidateRelayProtocol",
                          "doc": "The relay protocol of the ICE candidate used by the remote endpoint on the corresponded transport",
                          "type": [
                            "null",
                            "string"
                          ],
                          "default": null
                        },
                        {
                          "name": "candidatePairState",
                          "doc": "The state of ICE Candidate Pairs (RTCStatsIceCandidatePairState) on the corresponded transport",
                          "type": [
                            "null",
                            "string"
                          ],
                          "default": null
                        },
                        {
                          "name": "candidatePairPacketsSent",
                          "doc": "The total number of packets sent using the last selected candidate pair over the corresponded transport",
                          "type": [
                            "null",
                            "int"
                          ],
                          "default": null
                        },
                        {
                          "name": "candidatePairPacketsReceived",
                          "doc": "The total number of packets received using the last selected candidate pair over the corresponded transport",
                          "type": [
                            "null",
                            "int"
                          ],
                          "default": null
                        },
                        {
                          "name": "candidatePairBytesSent",
                          "doc": "The total number of bytes sent using the last selected candidate pair over the corresponded transport",
                          "type": [
                            "null",
                            "long"
                          ],
                          "default": null
                        },
                        {
                          "name": "candidatePairBytesReceived",
                          "doc": "The total number of bytes received using the last selected candidate pair over the corresponded transport",
                          "type": [
                            "null",
                            "long"
                          ],
                          "default": null
                        },
                        {
                          "name": "candidatePairLastPacketSentTimestamp",
                          "doc": "Represents the timestamp at which the last packet was sent on the selected candidate pair, excluding STUN packets over the corresponded transport (UTC Epoch in ms)",
                          "type": [
                            "null",
                            "long"
                          ],
                          "default": null
                        },
                        {
                          "name": "candidatePairLastPacketReceivedTimestamp",
                          "doc": "Represents the timestamp at which the last packet was received on the selected candidate pair, excluding STUN packets over the corresponded transport (UTC Epoch in ms)",
                          "type": [
                            "null",
                            "long"
                          ],
                          "default": null
                        },
                        {
                          "name": "candidatePairFirstRequestTimestamp",
                          "doc": "Represents the timestamp at which the first STUN request was sent on this particular candidate pair over the corresponded transport (UTC Epoch in ms)",
                          "type": [
                            "null",
                            "long"
                          ],
                          "default": null
                        },
                        {
                          "name": "candidatePairLastRequestTimestamp",
                          "doc": "Represents the timestamp at which the last STUN request was sent on this particular candidate pair over the corresponded transport (UTC Epoch in ms)",
                          "type": [
                            "null",
                            "long"
                          ],
                          "default": null
                        },
                        {
                          "name": "candidatePairLastResponseTimestamp",
                          "doc": "Represents the timestamp at which the last STUN response was received on this particular candidate pair over the corresponded transport (UTC Epoch in ms)",
                          "type": [
                            "null",
                            "long"
                          ],
                          "default": null
                        },
                        {
                          "name": "candidatePairTotalRoundTripTime",
                          "doc": "Represents the sum of all round trip time measurements in seconds since the beginning of the session, based on STUN connectivity check over the corresponded transport",
                          "type": [
                            "null",
                            "double"
                          ],
                          "default": null
                        },
                        {
                          "name": "candidatePairCurrentRoundTripTime",
                          "doc": "Represents the last round trip time measurements in seconds based on STUN connectivity check over the corresponded transport",
                          "type": [
                            "null",
                            "double"
                          ],
                          "default": null
                        },
                        {
                          "name": "candidatePairAvailableOutgoingBitrate",
                          "doc": "The sum of the underlying cc algorithm provided outgoing bitrate for the RTP streams over the corresponded transport",
                          "type": [
                            "null",
                            "double"
                          ],
                          "default": null
                        },
                        {
                          "name": "candidatePairAvailableIncomingBitrate",
                          "doc": "The sum of the underlying cc algorithm provided incoming bitrate for the RTP streams over the corresponded transport",
                          "type": [
                            "null",
                            "double"
                          ],
                          "default": null
                        },
                        {
                          "name": "candidatePairCircuitBreakerTriggerCount",
                          "doc": "The total number of circuit breaker triggered over the corresponded transport using the selected candidate pair",
                          "type": [
                            "null",
                            "int"
                          ],
                          "default": null
                        },
                        {
                          "name": "candidatePairRequestsReceived",
                          "doc": "Represents the total number of connectivity check requests received on the selected candidate pair using the corresponded transport",
                          "type": [
                            "null",
                            "int"
                          ],
                          "default": null
                        },
                        {
                          "name": "candidatePairRequestsSent",
                          "doc": "Represents the total number of connectivity check requests sent on the selected candidate pair using the corresponded transport",
                          "type": [
                            "null",
                            "int"
                          ],
                          "default": null
                        },
                        {
                          "name": "candidatePairResponsesReceived",
                          "doc": "Represents the total number of connectivity check responses received on the selected candidate pair using the corresponded transport",
                          "type": [
                            "null",
                            "int"
                          ],
                          "default": null
                        },
                        {
                          "name": "candidatePairResponsesSent",
                          "doc": "Represents the total number of connectivity check responses sent on the selected candidate pair using the corresponded transport",
                          "type": [
                            "null",
                            "int"
                          ],
                          "default": null
                        },
                        {
                          "name": "candidatePairRetransmissionReceived",
                          "doc": "Represents the total number of connectivity check retransmission received on the selected candidate pair using the corresponded transport",
                          "type": [
                            "null",
                            "int"
                          ],
                          "default": null
                        },
                        {
                          "name": "candidatePairRetransmissionSent",
                          "doc": "Represents the total number of connectivity check retransmission sent on the selected candidate pair using the corresponded transport",
                          "type": [
                            "null",
                            "int"
                          ],
                          "default": null
                        },
                        {
                          "name": "candidatePairConsentRequestsSent",
                          "doc": "Represents the total number of consent requests sent on the selected candidate pair using the corresponded transport",
                          "type": [
                            "null",
                            "int"
                          ],
                          "default": null
                        },
                        {
                          "name": "candidatePairConsentExpiredTimestamp",
                          "doc": "Represents the timestamp at which the latest valid STUN binding response expired on the selected candidate pair using the corresponded transport",
                          "type": [
                            "null",
                            "long"
                          ],
                          "default": null
                        },
                        {
                          "name": "candidatePairBytesDiscardedOnSend",
                          "doc": "Total amount of bytes for this candidate pair that have been discarded due to socket errors on the selected candidate pair using the corresponded transport",
                          "type": [
                            "null",
                            "long"
                          ],
                          "default": null
                        },
                        {
                          "name": "candidatePairPacketsDiscardedOnSend",
                          "doc": "Total amount of packets for this candidate pair that have been discarded due to socket errors on the selected candidate pair using the corresponded transport",
                          "type": [
                            "null",
                            "long"
                          ],
                          "default": null
                        },
                        {
                          "name": "candidatePairRequestBytesSent",
                          "doc": "Total number of bytes sent for connectivity checks on the selected candidate pair using the corresponded transport",
                          "type": [
                            "null",
                            "long"
                          ],
                          "default": null
                        },
                        {
                          "name": "candidatePairConsentRequestBytesSent",
                          "doc": "Total number of bytes sent for consent requests on the selected candidate pair using the corresponded transport",
                          "type": [
                            "null",
                            "long"
                          ],
                          "default": null
                        },
                        {
                          "name": "candidatePairResponseBytesSent",
                          "doc": "Total number of bytes sent for connectivity check responses on the selected candidate pair using the corresponded transport",
                          "type": [
                            "null",
                            "long"
                          ],
                          "default": null
                        },
                        {
                          "name": "sctpSmoothedRoundTripTime",
                          "doc": "The latest smoothed round-trip time value, corresponding to spinfo_srtt defined in [RFC6458] but converted to seconds. ",
                          "type": [
                            "null",
                            "double"
                          ],
                          "default": null
                        },
                        {
                          "name": "sctpCongestionWindow",
                          "doc": "The latest congestion window, corresponding to spinfo_cwnd.",
                          "type": [
                            "null",
                            "double"
                          ],
                          "default": null
                        },
                        {
                          "name": "sctpReceiverWindow",
                          "doc": "The latest receiver window, corresponding to sstat_rwnd.",
                          "type": [
                            "null",
                            "double"
                          ],
                          "default": null
                        },
                        {
                          "name": "sctpMtu",
                          "doc": "The latest maximum transmission unit, corresponding to spinfo_mtu.",
                          "type": [
                            "null",
                            "int"
                          ],
                          "default": null
                        },
                        {
                          "name": "sctpUnackData",
                          "doc": "The number of unacknowledged DATA chunks, corresponding to sstat_unackdata.",
                          "type": [
                            "null",
                            "int"
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
                "name": "mediaSources",
                "doc": "WebRTC App provided information related to the operation system the client uses.",
                "type": [
                  "null",
                  {
                    "type": "array",
                    "items": {
                      "name": "MediaSrouceStat",
                      "type": "record",
                      "fields": [
                        {
                          "name": "trackIdentifier",
                          "type": [
                            "null",
                            "string"
                          ],
                          "doc": "The unique identifier of the corresponded media track",
                          "default": null
                        },
                        {
                          "name": "kind",
                          "type": [
                            "null",
                            {
                              "type": "enum",
                              "name": "MediaSourceMediaKind",
                              "symbols": [
                                "audio",
                                "video"
                              ]
                            }
                          ],
                          "doc": "The type of the media the Mediasource produces.",
                          "default": null
                        },
                        {
                          "name": "relayedSource",
                          "type": [
                            "null",
                            "boolean"
                          ],
                          "doc": "Flag indicating if the media source is relayed or not, meaning the local endpoint is not the actual source of the media, but a proxy for that media.",
                          "default": null
                        },
                        {
                          "name": "audioLevel",
                          "type": [
                            "null",
                            "double"
                          ],
                          "doc": "The value is between 0..1 (linear), where 1.0 represents 0 dBov, 0 represents silence, and 0.5 represents approximately 6 dBSPL change in the sound pressure level from 0 dBov.",
                          "default": null
                        },
                        {
                          "name": "totalAudioEnergy",
                          "type": [
                            "null",
                            "double"
                          ],
                          "doc": "The audio energy of the media source. For calculation see www.w3.org/TR/webrtc-stats/#dom-rtcaudiosourcestats-totalaudioenergy",
                          "default": null
                        },
                        {
                          "name": "totalSamplesDuration",
                          "type": [
                            "null",
                            "double"
                          ],
                          "doc": "The duration of the audio type media source",
                          "default": null
                        },
                        {
                          "name": "echoReturnLoss",
                          "type": [
                            "null",
                            "double"
                          ],
                          "doc": "if echo cancellation is applied on the media source, then this number represents the loss calculation defined in www.itu.int/rec/T-REC-G.168-201504-I/en",
                          "default": null
                        },
                        {
                          "name": "echoReturnLossEnhancement",
                          "type": [
                            "null",
                            "double"
                          ],
                          "doc": "www.itu.int/rec/T-REC-G.168-201504-I/en",
                          "default": null
                        },
                        {
                          "name": "width",
                          "type": [
                            "null",
                            "int"
                          ],
                          "doc": "The width, in pixels, of the last frame originating from the media source",
                          "default": null
                        },
                        {
                          "name": "height",
                          "type": [
                            "null",
                            "int"
                          ],
                          "doc": "The height, in pixels, of the last frame originating from the media source",
                          "default": null
                        },
                        {
                          "name": "bitDepth",
                          "type": [
                            "null",
                            "int"
                          ],
                          "doc": "The bitDepth, in pixels, of the last frame originating from the media source",
                          "default": null
                        },
                        {
                          "name": "frames",
                          "type": [
                            "null",
                            "long"
                          ],
                          "doc": "The total number of frames originated from the media source",
                          "default": null
                        },
                        {
                          "name": "framesPerSecond",
                          "type": [
                            "null",
                            "double"
                          ],
                          "doc": " The number of frames origianted from the media source in the last second",
                          "default": null
                        }
                      ]
                    }
                  }
                ],
                "default": null
              },
              {
                "name": "codecs",
                "doc": "List of codec the client has",
                "type": [
                  "null",
                  {
                    "type": "array",
                    "items": {
                      "name": "Codec",
                      "type": "record",
                      "fields": [
                        {
                          "name": "payloadType",
                          "type": [
                            "null",
                            "string"
                          ],
                          "doc": "Payload type used in RTP encoding / decoding process.",
                          "default": null
                        },
                        {
                          "name": "codecType",
                          "type": [
                            "null",
                            {
                              "type": "enum",
                              "name": "CodecType",
                              "symbols": [
                                "encode",
                                "decode"
                              ]
                            }
                          ],
                          "doc": "Indicates the role of the codec (encode or decode)",
                          "default": null
                        },
                        {
                          "name": "mimeType",
                          "type": [
                            "null",
                            "string"
                          ],
                          "doc": "The MIME type of the media. eg.: audio/opus.",
                          "default": null
                        },
                        {
                          "name": "clockRate",
                          "type": [
                            "null",
                            "int"
                          ],
                          "doc": "the clock rate used in RTP transport to generate the timestamp for the carried frames",
                          "default": null
                        },
                        {
                          "name": "channels",
                          "type": [
                            "null",
                            "int"
                          ],
                          "doc": "Audio Only. Represnts the number of chanels an audio media source have. Only interesting if stereo is presented",
                          "default": null
                        },
                        {
                          "name": "sdpFmtpLine",
                          "type": [
                            "null",
                            "string"
                          ],
                          "doc": "The SDP line determines the codec",
                          "default": null
                        }
                      ]
                    }
                  }
                ],
                "default": null
              },
              {
                "name": "certificates",
                "doc": "List of certificates the client provided",
                "type": [
                  "null",
                  {
                    "type": "array",
                    "items": {
                      "name": "Certificate",
                      "type": "record",
                      "fields": [
                        {
                          "name": "fingerprint",
                          "type": [
                            "null",
                            "string"
                          ],
                          "doc": " The fingerprint of the certificate.",
                          "default": null
                        },
                        {
                          "name": "fingerprintAlgorithm",
                          "type": [
                            "null",
                            "string"
                          ],
                          "doc": "The hash function used to generate the fingerprint.",
                          "default": null
                        },
                        {
                          "name": "base64Certificate",
                          "type": [
                            "null",
                            "string"
                          ],
                          "doc": "The DER encoded base-64 representation of the certificate.",
                          "default": null
                        },
                        {
                          "name": "issuerCertificateId",
                          "type": [
                            "null",
                            "string"
                          ],
                          "doc": "The id of the next certificate in the certificate chain",
                          "default": null
                        }
                      ]
                    }
                  }
                ],
                "default": null
              },
              {
                "name": "inboundAudioTracks",
                "doc": "List of compound measurements related to inbound audio tracks",
                "type": [
                  "null",
                  {
                    "type": "array",
                    "items": {
                      "name": "InboundAudioTrack",
                      "type": "record",
                      "fields": [
                        {
                          "name": "trackId",
                          "doc": "The id of the track",
                          "type": [
                            "null",
                            "string"
                          ],
                          "default": null
                        },
                        {
                          "name": "peerConnectionId",
                          "doc": " The unique generated identifier of the peer connection the inbound audio track belongs to",
                          "type": [
                            "null",
                            "string"
                          ],
                          "default": null
                        },
                        {
                          "name": "remoteClientId",
                          "doc": "The remote clientId the source outbound track belongs to",
                          "type": [
                            "null",
                            "string"
                          ],
                          "default": null
                        },
                        {
                          "name": "rtpStreamId",
                          "doc": "The id of the RTP stream connected to a remote media unit (such as an SFU)",
                          "type": [
                            "null",
                            "string"
                          ],
                          "default": null
                        },
                        {
                          "name": "ssrc",
                          "doc": "The RTP SSRC field",
                          "type": "long"
                        },
                        {
                          "name": "packetsReceived",
                          "doc": "The total number of packets received on the corresponded synchronization source",
                          "type": [
                            "null",
                            "int"
                          ],
                          "default": null
                        },
                        {
                          "name": "packetsLost",
                          "doc": "The total number of bytes received on the corresponded synchronization source",
                          "type": [
                            "null",
                            "int"
                          ],
                          "default": null
                        },
                        {
                          "name": "jitter",
                          "doc": "The corresponded synchronization source reported jitter",
                          "type": [
                            "null",
                            "double"
                          ],
                          "default": null
                        },
                        {
                          "name": "packetsDiscarded",
                          "doc": "The total number of packets missed the playout point and therefore discarded by the jitterbuffer",
                          "type": [
                            "null",
                            "int"
                          ],
                          "default": null
                        },
                        {
                          "name": "packetsRepaired",
                          "doc": "The total number of packets repaired by either FEC or due to retransmission on the corresponded synchronization source",
                          "type": [
                            "null",
                            "int"
                          ],
                          "default": null
                        },
                        {
                          "name": "burstPacketsLost",
                          "doc": "The total number of packets lost in burst (RFC6958)",
                          "type": [
                            "null",
                            "int"
                          ],
                          "default": null
                        },
                        {
                          "name": "burstPacketsDiscarded",
                          "doc": "The total number of packets discarded in burst (RFC6958)",
                          "type": [
                            "null",
                            "int"
                          ],
                          "default": null
                        },
                        {
                          "name": "burstLossCount",
                          "doc": "The total number of burst happened causes burstPacketsLost on the corresponding synchronization source",
                          "type": [
                            "null",
                            "int"
                          ],
                          "default": null
                        },
                        {
                          "name": "burstDiscardCount",
                          "doc": "The total number of burst happened causes burstPacketsDiscarded on the corresponding synchronization source",
                          "type": [
                            "null",
                            "int"
                          ],
                          "default": null
                        },
                        {
                          "name": "burstLossRate",
                          "doc": "The fraction of RTP packets lost during bursts proportionally to the total number of RTP packets expected in the bursts on the corresponding synchronization source",
                          "type": [
                            "null",
                            "double"
                          ],
                          "default": null
                        },
                        {
                          "name": "burstDiscardRate",
                          "doc": "The fraction of RTP packets discarded during bursts proportionally to the total number of RTP packets expected in the bursts on the corresponding synchronization source",
                          "type": [
                            "null",
                            "double"
                          ],
                          "default": null
                        },
                        {
                          "name": "gapLossRate",
                          "doc": "The fraction of RTP packets lost during gap proportionally to the total number of RTP packets expected in the bursts on the corresponding synchronization source",
                          "type": [
                            "null",
                            "double"
                          ],
                          "default": null
                        },
                        {
                          "name": "gapDiscardRate",
                          "doc": "The fraction of RTP packets discarded during gap proportionally to the total number of RTP packets expected in the bursts on the corresponding synchronization source",
                          "type": [
                            "null",
                            "double"
                          ],
                          "default": null
                        },
                        {
                          "name": "lastPacketReceivedTimestamp",
                          "doc": "Represents the timestamp at which the last packet was received on the corresponded synchronization source (ssrc)",
                          "type": [
                            "null",
                            "double"
                          ],
                          "default": null
                        },
                        {
                          "name": "averageRtcpInterval",
                          "doc": "The average RTCP interval between two consecutive compound RTCP packets sent for the corresponding synchronization source (ssrc)",
                          "type": [
                            "null",
                            "double"
                          ],
                          "default": null
                        },
                        {
                          "name": "headerBytesReceived",
                          "doc": "Total number of RTP header and padding bytes received over the corresponding synchronization source (ssrc)",
                          "type": [
                            "null",
                            "long"
                          ],
                          "default": null
                        },
                        {
                          "name": "fecPacketsReceived",
                          "doc": "Total number of FEC packets received over the corresponding synchronization source (ssrc)",
                          "type": [
                            "null",
                            "int"
                          ],
                          "default": null
                        },
                        {
                          "name": "fecPacketsDiscarded",
                          "doc": "Total number of FEC packets discarded over the corresponding synchronization source (ssrc) due to 1) late arrive; 2) the target RTP packet has already been repaired.",
                          "type": [
                            "null",
                            "int"
                          ],
                          "default": null
                        },
                        {
                          "name": "bytesReceived",
                          "doc": "Total number of bytes received over the corresponding synchronization source (ssrc) due to 1) late arrive; 2) the target RTP packet has already been repaired.",
                          "type": [
                            "null",
                            "long"
                          ],
                          "default": null
                        },
                        {
                          "name": "packetsFailedDecryption",
                          "doc": "Total number of packets received and failed to decrypt over the corresponding synchronization source (ssrc) due to 1) late arrive; 2) the target RTP packet has already been repaired.",
                          "type": [
                            "null",
                            "int"
                          ],
                          "default": null
                        },
                        {
                          "name": "packetsDuplicated",
                          "doc": "Total number of packets identified as duplicated over the corresponding synchronization source (ssrc).",
                          "type": [
                            "null",
                            "int"
                          ],
                          "default": null
                        },
                        {
                          "name": "perDscpPacketsReceived",
                          "doc": "The total number of DSCP flagged RTP packets received over the corresponding synchronization source (ssrc)",
                          "type": [
                            "null",
                            "double"
                          ],
                          "default": null
                        },
                        {
                          "name": "nackCount",
                          "doc": "Count the total number of Negative ACKnowledgement (NACK) packets sent and belongs to the corresponded synchronization source (ssrc)",
                          "type": [
                            "null",
                            "int"
                          ],
                          "default": null
                        },
                        {
                          "name": "totalProcessingDelay",
                          "doc": "The total processing delay in seconds spend on buffering RTP packets from received up until packets are decoded",
                          "type": [
                            "null",
                            "double"
                          ],
                          "default": null
                        },
                        {
                          "name": "estimatedPlayoutTimestamp",
                          "doc": "The estimated playout time of the corresponded synchronization source",
                          "type": [
                            "null",
                            "double"
                          ],
                          "default": null
                        },
                        {
                          "name": "jitterBufferDelay",
                          "doc": "The total time of RTP packets spent in jitterbuffer waiting for frame completion due to network uncertenity.",
                          "type": [
                            "null",
                            "double"
                          ],
                          "default": null
                        },
                        {
                          "name": "jitterBufferEmittedCount",
                          "doc": "The total number of audio samples or video frames that have come out of the jitter buffer on the corresponded synchronization source (ssrc)",
                          "type": [
                            "null",
                            "int"
                          ],
                          "default": null
                        },
                        {
                          "name": "decoderImplementation",
                          "doc": "Indicate the name of the decoder implementation library",
                          "type": [
                            "null",
                            "string"
                          ],
                          "default": null
                        },
                        {
                          "name": "voiceActivityFlag",
                          "doc": "Indicate if the last RTP packet received contained voice activity based on the presence of the V bit in the extension header",
                          "type": [
                            "null",
                            "boolean"
                          ],
                          "default": null
                        },
                        {
                          "name": "totalSamplesReceived",
                          "doc": "The total number of audio samples received on the corresponded RTP stream",
                          "type": [
                            "null",
                            "int"
                          ],
                          "default": null
                        },
                        {
                          "name": "totalSamplesDecoded",
                          "doc": "The total number of samples decoded on the corresponded RTP stream",
                          "type": [
                            "null",
                            "int"
                          ],
                          "default": null
                        },
                        {
                          "name": "samplesDecodedWithSilk",
                          "doc": "The total number of samples decoded with SILK on the corresponded RTP stream",
                          "type": [
                            "null",
                            "int"
                          ],
                          "default": null
                        },
                        {
                          "name": "samplesDecodedWithCelt",
                          "doc": "The total number of samples decodedd with CELT on the corresponded RTP stream",
                          "type": [
                            "null",
                            "int"
                          ],
                          "default": null
                        },
                        {
                          "name": "concealedSamples",
                          "doc": "The total number of samples decoded by the media decoder from the corresponded RTP stream",
                          "type": [
                            "null",
                            "int"
                          ],
                          "default": null
                        },
                        {
                          "name": "silentConcealedSamples",
                          "doc": "The total number of samples concealed from the corresponded RTP stream",
                          "type": [
                            "null",
                            "int"
                          ],
                          "default": null
                        },
                        {
                          "name": "concealmentEvents",
                          "doc": "The total number of concealed event emitted to the media codec by the corresponded jitterbuffer",
                          "type": [
                            "null",
                            "int"
                          ],
                          "default": null
                        },
                        {
                          "name": "insertedSamplesForDeceleration",
                          "doc": "The total number of samples inserted to decelarete the audio playout (happens when the jitterbuffer detects a shrinking buffer and need to increase the jitter buffer delay)",
                          "type": [
                            "null",
                            "int"
                          ],
                          "default": null
                        },
                        {
                          "name": "removedSamplesForAcceleration",
                          "doc": "The total number of samples inserted to accelerate the audio playout (happens when the jitterbuffer detects a growing buffer and need to shrink the jitter buffer delay)",
                          "type": [
                            "null",
                            "int"
                          ],
                          "default": null
                        },
                        {
                          "name": "packetsSent",
                          "doc": "Total number of RTP packets sent at the remote endpoint to this endpoint on this synchronization source",
                          "type": [
                            "null",
                            "int"
                          ],
                          "default": null
                        },
                        {
                          "name": "bytesSent",
                          "doc": "Total number of payload bytes sent at the remote endpoint to this endpoint on this synchronization source",
                          "type": [
                            "null",
                            "long"
                          ],
                          "default": null
                        },
                        {
                          "name": "remoteTimestamp",
                          "doc": "The timestamp corresnponds to the time in UTC Epoch the remote endpoint reported the statistics belong to the sender side and correspond to the synchronization source (ssrc)",
                          "type": [
                            "null",
                            "double"
                          ],
                          "default": null
                        },
                        {
                          "name": "reportsSent",
                          "doc": "The number of SR reports the remote endpoint sent corresponded to synchronization source (ssrc) this report belongs to",
                          "type": [
                            "null",
                            "int"
                          ],
                          "default": null
                        },
                        {
                          "name": "roundTripTime",
                          "doc": "Estimated round trip time for the SR reports based on DLRR reports on the corresponded RTP stream",
                          "type": [
                            "null",
                            "double"
                          ],
                          "default": null
                        },
                        {
                          "name": "totalRoundTripTime",
                          "doc": " Represents the cumulative sum of all round trip time measurements performed on the corresponded RTP stream",
                          "type": [
                            "null",
                            "double"
                          ],
                          "default": null
                        },
                        {
                          "name": "roundTripTimeMeasurements",
                          "doc": "Represents the total number of SR reports received with DLRR reports to be able to calculate the round trip time on the corresponded RTP stream",
                          "type": [
                            "null",
                            "double"
                          ],
                          "default": null
                        },
                        {
                          "name": "ended",
                          "doc": "Flag represents if the receiver ended the media stream track or not.",
                          "type": [
                            "null",
                            "boolean"
                          ],
                          "default": null
                        },
                        {
                          "name": "payloadType",
                          "doc": "The type of the payload the RTP packet SSRC belongs to",
                          "type": [
                            "null",
                            "int"
                          ],
                          "default": null
                        },
                        {
                          "name": "mimeType",
                          "doc": "the MIME type of the codec (e.g.: video/vp8)",
                          "type": [
                            "null",
                            "string"
                          ],
                          "default": null
                        },
                        {
                          "name": "clockRate",
                          "doc": "The negotiated clock rate the RTP timestamp is generated of",
                          "type": [
                            "null",
                            "long"
                          ],
                          "default": null
                        },
                        {
                          "name": "channels",
                          "doc": "The number of channels for audio is used (in stereo it is 2, otherwise it is most likely null)",
                          "type": [
                            "null",
                            "int"
                          ],
                          "default": null
                        },
                        {
                          "name": "sdpFmtpLine",
                          "doc": "The a=fmtp line in the SDP corresponding to the codec",
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
                "name": "inboundVideoTracks",
                "doc": "List of compound measurements related to inbound video tracks",
                "type": [
                  "null",
                  {
                    "type": "array",
                    "items": {
                      "name": "InboundVideoTrack",
                      "type": "record",
                      "fields": [
                        {
                          "name": "trackId",
                          "doc": "The id of the track",
                          "type": [
                            "null",
                            "string"
                          ],
                          "default": null
                        },
                        {
                          "name": "peerConnectionId",
                          "doc": " The unique generated identifier of the peer connection the inbound audio track belongs to",
                          "type": [
                            "null",
                            "string"
                          ],
                          "default": null
                        },
                        {
                          "name": "remoteClientId",
                          "doc": "The remote clientId the source outbound track belongs to",
                          "type": [
                            "null",
                            "string"
                          ],
                          "default": null
                        },
                        {
                          "name": "rtpStreamId",
                          "doc": "The id of the RTP stream connected to a remote media unit (such as an SFU)",
                          "type": [
                            "null",
                            "string"
                          ],
                          "default": null
                        },
                        {
                          "name": "ssrc",
                          "doc": "The RTP SSRC field",
                          "type": "long"
                        },
                        {
                          "name": "packetsReceived",
                          "doc": "The total number of packets received on the corresponded synchronization source",
                          "type": [
                            "null",
                            "int"
                          ],
                          "default": null
                        },
                        {
                          "name": "packetsLost",
                          "doc": "The total number of bytes received on the corresponded synchronization source",
                          "type": [
                            "null",
                            "int"
                          ],
                          "default": null
                        },
                        {
                          "name": "jitter",
                          "doc": "The corresponded synchronization source reported jitter",
                          "type": [
                            "null",
                            "double"
                          ],
                          "default": null
                        },
                        {
                          "name": "packetsDiscarded",
                          "doc": "The total number of packets missed the playout point and therefore discarded by the jitterbuffer",
                          "type": [
                            "null",
                            "int"
                          ],
                          "default": null
                        },
                        {
                          "name": "packetsRepaired",
                          "doc": "The total number of packets repaired by either FEC or due to retransmission on the corresponded synchronization source",
                          "type": [
                            "null",
                            "int"
                          ],
                          "default": null
                        },
                        {
                          "name": "burstPacketsLost",
                          "doc": "The total number of packets lost in burst (RFC6958)",
                          "type": [
                            "null",
                            "int"
                          ],
                          "default": null
                        },
                        {
                          "name": "burstPacketsDiscarded",
                          "doc": "The total number of packets discarded in burst (RFC6958)",
                          "type": [
                            "null",
                            "int"
                          ],
                          "default": null
                        },
                        {
                          "name": "burstLossCount",
                          "doc": "The total number of burst happened causes burstPacketsLost on the corresponding synchronization source",
                          "type": [
                            "null",
                            "int"
                          ],
                          "default": null
                        },
                        {
                          "name": "burstDiscardCount",
                          "doc": "The total number of burst happened causes burstPacketsDiscarded on the corresponding synchronization source",
                          "type": [
                            "null",
                            "int"
                          ],
                          "default": null
                        },
                        {
                          "name": "burstLossRate",
                          "doc": "The fraction of RTP packets lost during bursts proportionally to the total number of RTP packets expected in the bursts on the corresponding synchronization source",
                          "type": [
                            "null",
                            "double"
                          ],
                          "default": null
                        },
                        {
                          "name": "burstDiscardRate",
                          "doc": "The fraction of RTP packets discarded during bursts proportionally to the total number of RTP packets expected in the bursts on the corresponding synchronization source",
                          "type": [
                            "null",
                            "double"
                          ],
                          "default": null
                        },
                        {
                          "name": "gapLossRate",
                          "doc": "The fraction of RTP packets lost during gap proportionally to the total number of RTP packets expected in the bursts on the corresponding synchronization source",
                          "type": [
                            "null",
                            "double"
                          ],
                          "default": null
                        },
                        {
                          "name": "gapDiscardRate",
                          "doc": "The fraction of RTP packets discarded during gap proportionally to the total number of RTP packets expected in the bursts on the corresponding synchronization source",
                          "type": [
                            "null",
                            "double"
                          ],
                          "default": null
                        },
                        {
                          "name": "lastPacketReceivedTimestamp",
                          "doc": "Represents the timestamp at which the last packet was received on the corresponded synchronization source (ssrc)",
                          "type": [
                            "null",
                            "double"
                          ],
                          "default": null
                        },
                        {
                          "name": "averageRtcpInterval",
                          "doc": "The average RTCP interval between two consecutive compound RTCP packets sent for the corresponding synchronization source (ssrc)",
                          "type": [
                            "null",
                            "double"
                          ],
                          "default": null
                        },
                        {
                          "name": "headerBytesReceived",
                          "doc": "Total number of RTP header and padding bytes received over the corresponding synchronization source (ssrc)",
                          "type": [
                            "null",
                            "long"
                          ],
                          "default": null
                        },
                        {
                          "name": "fecPacketsReceived",
                          "doc": "Total number of FEC packets received over the corresponding synchronization source (ssrc)",
                          "type": [
                            "null",
                            "int"
                          ],
                          "default": null
                        },
                        {
                          "name": "fecPacketsDiscarded",
                          "doc": "Total number of FEC packets discarded over the corresponding synchronization source (ssrc) due to 1) late arrive; 2) the target RTP packet has already been repaired.",
                          "type": [
                            "null",
                            "int"
                          ],
                          "default": null
                        },
                        {
                          "name": "bytesReceived",
                          "doc": "Total number of bytes received over the corresponding synchronization source (ssrc) due to 1) late arrive; 2) the target RTP packet has already been repaired.",
                          "type": [
                            "null",
                            "long"
                          ],
                          "default": null
                        },
                        {
                          "name": "packetsFailedDecryption",
                          "doc": "Total number of packets received and failed to decrypt over the corresponding synchronization source (ssrc) due to 1) late arrive; 2) the target RTP packet has already been repaired.",
                          "type": [
                            "null",
                            "int"
                          ],
                          "default": null
                        },
                        {
                          "name": "packetsDuplicated",
                          "doc": "Total number of packets identified as duplicated over the corresponding synchronization source (ssrc).",
                          "type": [
                            "null",
                            "int"
                          ],
                          "default": null
                        },
                        {
                          "name": "perDscpPacketsReceived",
                          "doc": "The total number of DSCP flagged RTP packets received over the corresponding synchronization source (ssrc)",
                          "type": [
                            "null",
                            "double"
                          ],
                          "default": null
                        },
                        {
                          "name": "nackCount",
                          "doc": "Count the total number of Negative ACKnowledgement (NACK) packets sent and belongs to the corresponded synchronization source (ssrc)",
                          "type": [
                            "null",
                            "int"
                          ],
                          "default": null
                        },
                        {
                          "name": "totalProcessingDelay",
                          "doc": "The total processing delay in seconds spend on buffering RTP packets from received up until packets are decoded",
                          "type": [
                            "null",
                            "double"
                          ],
                          "default": null
                        },
                        {
                          "name": "estimatedPlayoutTimestamp",
                          "doc": "The estimated playout time of the corresponded synchronization source",
                          "type": [
                            "null",
                            "double"
                          ],
                          "default": null
                        },
                        {
                          "name": "jitterBufferDelay",
                          "doc": "The total time of RTP packets spent in jitterbuffer waiting for frame completion due to network uncertenity.",
                          "type": [
                            "null",
                            "double"
                          ],
                          "default": null
                        },
                        {
                          "name": "jitterBufferEmittedCount",
                          "doc": "The total number of audio samples or video frames that have come out of the jitter buffer on the corresponded synchronization source (ssrc)",
                          "type": [
                            "null",
                            "int"
                          ],
                          "default": null
                        },
                        {
                          "name": "decoderImplementation",
                          "doc": "Indicate the name of the decoder implementation library",
                          "type": [
                            "null",
                            "string"
                          ],
                          "default": null
                        },
                        {
                          "name": "framesDropped",
                          "doc": "The total number of frames dropped on the corresponded RTP stream",
                          "type": [
                            "null",
                            "int"
                          ],
                          "default": null
                        },
                        {
                          "name": "partialFramesLost",
                          "doc": "The total number of frames partially lost on the corresponded RTP stream",
                          "type": [
                            "null",
                            "int"
                          ],
                          "default": null
                        },
                        {
                          "name": "fullFramesLost",
                          "doc": "The total number of frames fully lost on the corresponded RTP stream",
                          "type": [
                            "null",
                            "int"
                          ],
                          "default": null
                        },
                        {
                          "name": "keyFramesDecoded",
                          "doc": "The total number of keyframes decoded on the corresponded RTP stream",
                          "type": [
                            "null",
                            "int"
                          ],
                          "default": null
                        },
                        {
                          "name": "frameWidth",
                          "doc": "The width of the frame of the video sent by the remote source on the corresponded RTP stream",
                          "type": [
                            "null",
                            "int"
                          ],
                          "default": null
                        },
                        {
                          "name": "frameHeight",
                          "doc": "The height of the frame of the video sent by the remote source on the corresponded RTP stream",
                          "type": [
                            "null",
                            "int"
                          ],
                          "default": null
                        },
                        {
                          "name": "frameBitDepth",
                          "doc": "The bit depth in pixels of the frame of the video sent by the remote source on the corresponded RTP stream",
                          "type": [
                            "null",
                            "int"
                          ],
                          "default": null
                        },
                        {
                          "name": "framesPerSecond",
                          "doc": "The frame per seconds of the video sent by the remote source on the corresponded RTP stream",
                          "type": [
                            "null",
                            "double"
                          ],
                          "default": null
                        },
                        {
                          "name": "qpSum",
                          "doc": "The QP sum (only interested in VP8,9) of the frame of the video sent by the remote source on the corresponded RTP stream",
                          "type": [
                            "null",
                            "long"
                          ],
                          "default": null
                        },
                        {
                          "name": "totalDecodeTime",
                          "doc": "The total tiem spent on decoding video on the corresponded RTP stream",
                          "type": [
                            "null",
                            "double"
                          ],
                          "default": null
                        },
                        {
                          "name": "totalInterFrameDelay",
                          "doc": "The total interframe delay",
                          "type": [
                            "null",
                            "double"
                          ],
                          "default": null
                        },
                        {
                          "name": "firCount",
                          "doc": "The total number FIR packets sent from this endpoint to the source on the corresponded RTP stream",
                          "type": [
                            "null",
                            "int"
                          ],
                          "default": null
                        },
                        {
                          "name": "pliCount",
                          "doc": "The total number of Picture Loss Indication sent on the corresponded RTP stream",
                          "type": [
                            "null",
                            "int"
                          ],
                          "default": null
                        },
                        {
                          "name": "sliCount",
                          "doc": "The total number of SLI indicator sent from the endpoint on the corresponded RTP stream",
                          "type": [
                            "null",
                            "int"
                          ],
                          "default": null
                        },
                        {
                          "name": "framesReceived",
                          "doc": "The total number of frames received on the corresponded RTP stream.",
                          "type": [
                            "null",
                            "int"
                          ],
                          "default": null
                        },
                        {
                          "name": "packetsSent",
                          "doc": "Total number of RTP packets sent at the remote endpoint to this endpoint on this synchronization source",
                          "type": [
                            "null",
                            "int"
                          ],
                          "default": null
                        },
                        {
                          "name": "bytesSent",
                          "doc": "Total number of payload bytes sent at the remote endpoint to this endpoint on this synchronization source",
                          "type": [
                            "null",
                            "long"
                          ],
                          "default": null
                        },
                        {
                          "name": "remoteTimestamp",
                          "doc": "The timestamp corresnponds to the time in UTC Epoch the remote endpoint reported the statistics belong to the sender side and correspond to the synchronization source (ssrc)",
                          "type": [
                            "null",
                            "double"
                          ],
                          "default": null
                        },
                        {
                          "name": "reportsSent",
                          "doc": "The number of SR reports the remote endpoint sent corresponded to synchronization source (ssrc) this report belongs to",
                          "type": [
                            "null",
                            "int"
                          ],
                          "default": null
                        },
                        {
                          "name": "roundTripTime",
                          "doc": "Estimated round trip time for the SR reports based on DLRR reports on the corresponded RTP stream",
                          "type": [
                            "null",
                            "double"
                          ],
                          "default": null
                        },
                        {
                          "name": "totalRoundTripTime",
                          "doc": " Represents the cumulative sum of all round trip time measurements performed on the corresponded RTP stream",
                          "type": [
                            "null",
                            "double"
                          ],
                          "default": null
                        },
                        {
                          "name": "roundTripTimeMeasurements",
                          "doc": "Represents the total number of SR reports received with DLRR reports to be able to calculate the round trip time on the corresponded RTP stream",
                          "type": [
                            "null",
                            "double"
                          ],
                          "default": null
                        },
                        {
                          "name": "ended",
                          "doc": "Flag represents if the receiver ended the media stream track or not.",
                          "type": [
                            "null",
                            "boolean"
                          ],
                          "default": null
                        },
                        {
                          "name": "payloadType",
                          "doc": "The type of the payload the RTP packet SSRC belongs to",
                          "type": [
                            "null",
                            "int"
                          ],
                          "default": null
                        },
                        {
                          "name": "mimeType",
                          "doc": "the MIME type of the codec (e.g.: video/vp8)",
                          "type": [
                            "null",
                            "string"
                          ],
                          "default": null
                        },
                        {
                          "name": "clockRate",
                          "doc": "The negotiated clock rate the RTP timestamp is generated of",
                          "type": [
                            "null",
                            "long"
                          ],
                          "default": null
                        },
                        {
                          "name": "channels",
                          "doc": "The number of channels for audio is used (in stereo it is 2, otherwise it is most likely null)",
                          "type": [
                            "null",
                            "int"
                          ],
                          "default": null
                        },
                        {
                          "name": "sdpFmtpLine",
                          "doc": "The a=fmtp line in the SDP corresponding to the codec",
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
                "name": "outboundAudioTracks",
                "doc": "List of compound measurements related to outbound audio tracks",
                "type": [
                  "null",
                  {
                    "type": "array",
                    "items": {
                      "name": "OutboundAudioTrack",
                      "type": "record",
                      "fields": [
                        {
                          "name": "trackId",
                          "doc": "The id of the track",
                          "type": [
                            "null",
                            "string"
                          ],
                          "default": null
                        },
                        {
                          "name": "peerConnectionId",
                          "doc": " The unique generated identifier of the peer connection the inbound audio track belongs to",
                          "type": [
                            "null",
                            "string"
                          ],
                          "default": null
                        },
                        {
                          "name": "rtpStreamId",
                          "doc": "The id of the RTP stream connected to a remote media unit (such as an SFU)",
                          "type": [
                            "null",
                            "string"
                          ],
                          "default": null
                        },
                        {
                          "name": "ssrc",
                          "doc": "The RTP SSRC field",
                          "type": "long"
                        },
                        {
                          "name": "packetsSent",
                          "doc": "The total number of packets sent on the corresponded synchronization source",
                          "type": [
                            "null",
                            "int"
                          ],
                          "default": null
                        },
                        {
                          "name": "bytesSent",
                          "doc": "The total number of bytes sent on the corresponded synchronization source",
                          "type": [
                            "null",
                            "long"
                          ],
                          "default": null
                        },
                        {
                          "name": "rtxSsrc",
                          "doc": "If RTX is negotiated as a separate stream, this is the SSRC of the RTX stream that is associated with this stream's ssrc. ",
                          "type": [
                            "null",
                            "long"
                          ],
                          "default": null
                        },
                        {
                          "name": "rid",
                          "doc": " The rid encoding parameter of the corresponded synchronization source",
                          "type": [
                            "null",
                            "string"
                          ],
                          "default": null
                        },
                        {
                          "name": "lastPacketSentTimestamp",
                          "doc": " the timestamp the last packet was sent. (UTC epoch in ms)",
                          "type": [
                            "null",
                            "long"
                          ],
                          "default": null
                        },
                        {
                          "name": "headerBytesSent",
                          "doc": "Total number of RTP header and padding bytes sent over the corresponding synchronization source (ssrc)",
                          "type": [
                            "null",
                            "long"
                          ],
                          "default": null
                        },
                        {
                          "name": "packetsDiscardedOnSend",
                          "doc": "Total number of RTP packets discarded at sender side over the corresponding synchronization source (ssrc)",
                          "type": [
                            "null",
                            "int"
                          ],
                          "default": null
                        },
                        {
                          "name": "bytesDiscardedOnSend",
                          "doc": "Total number of RTP bytes discarded at sender side over the corresponding synchronization source (ssrc)",
                          "type": [
                            "null",
                            "long"
                          ],
                          "default": null
                        },
                        {
                          "name": "fecPacketsSent",
                          "doc": "Total number of FEC packets sent over the corresponding synchronization source (ssrc)",
                          "type": [
                            "null",
                            "int"
                          ],
                          "default": null
                        },
                        {
                          "name": "retransmittedPacketsSent",
                          "doc": "Total number of retransmitted packets sent over the corresponding synchronization source (ssrc).",
                          "type": [
                            "null",
                            "int"
                          ],
                          "default": null
                        },
                        {
                          "name": "retransmittedBytesSent",
                          "doc": "Total number of retransmitted bytes sent over the corresponding synchronization source (ssrc).",
                          "type": [
                            "null",
                            "long"
                          ],
                          "default": null
                        },
                        {
                          "name": "targetBitrate",
                          "doc": "Reflects the current encoder target in bits per second.",
                          "type": [
                            "null",
                            "long"
                          ],
                          "default": null
                        },
                        {
                          "name": "totalEncodedBytesTarget",
                          "doc": "The total number of bytes of RTP coherent frames encoded completly depending on the frame size the encoder targets",
                          "type": [
                            "null",
                            "long"
                          ],
                          "default": null
                        },
                        {
                          "name": "totalPacketSendDelay",
                          "doc": "The total number of delay packets buffered at the sender side in seconds over the corresponding synchronization source",
                          "type": [
                            "null",
                            "double"
                          ],
                          "default": null
                        },
                        {
                          "name": "averageRtcpInterval",
                          "doc": "The average RTCP interval between two consecutive compound RTCP packets sent for the corresponding synchronization source (ssrc)",
                          "type": [
                            "null",
                            "double"
                          ],
                          "default": null
                        },
                        {
                          "name": "perDscpPacketsSent",
                          "doc": "The total number of DSCP flagged RTP packets sent over the corresponding synchronization source (ssrc)",
                          "type": [
                            "null",
                            "double"
                          ],
                          "default": null
                        },
                        {
                          "name": "nackCount",
                          "doc": "Count the total number of Negative ACKnowledgement (NACK) packets received over the corresponding synchronization source (ssrc)",
                          "type": [
                            "null",
                            "int"
                          ],
                          "default": null
                        },
                        {
                          "name": "encoderImplementation",
                          "doc": "Indicate the name of the encoder implementation library",
                          "type": [
                            "null",
                            "string"
                          ],
                          "default": null
                        },
                        {
                          "name": "totalSamplesSent",
                          "doc": "The total number of samples sent over the corresponding synchronization source",
                          "type": [
                            "null",
                            "int"
                          ],
                          "default": null
                        },
                        {
                          "name": "samplesEncodedWithSilk",
                          "doc": "The total number of samples encoded by SILK portion in opus sent over the corresponding synchronization source",
                          "type": [
                            "null",
                            "int"
                          ],
                          "default": null
                        },
                        {
                          "name": "samplesEncodedWithCelt",
                          "doc": "The total number of samples encoded by CELT portion in opus sent over the corresponding synchronization source",
                          "type": [
                            "null",
                            "int"
                          ],
                          "default": null
                        },
                        {
                          "name": "voiceActivityFlag",
                          "doc": "Indicate if the last RTP packet sent contained voice activity based on the presence of the V bit in the extension header",
                          "type": [
                            "null",
                            "boolean"
                          ],
                          "default": null
                        },
                        {
                          "name": "packetsReceived",
                          "doc": "The total number of packets received on the corresponded synchronization source",
                          "type": [
                            "null",
                            "int"
                          ],
                          "default": null
                        },
                        {
                          "name": "packetsLost",
                          "doc": "The total number of bytes received on the corresponded synchronization source",
                          "type": [
                            "null",
                            "int"
                          ],
                          "default": null
                        },
                        {
                          "name": "jitter",
                          "doc": "The corresponded synchronization source reported jitter",
                          "type": [
                            "null",
                            "double"
                          ],
                          "default": null
                        },
                        {
                          "name": "packetsDiscarded",
                          "doc": "The total number of packets missed the playout point and therefore discarded by the jitterbuffer",
                          "type": [
                            "null",
                            "int"
                          ],
                          "default": null
                        },
                        {
                          "name": "packetsRepaired",
                          "doc": "The total number of packets repaired by either FEC or due to retransmission on the corresponded synchronization source",
                          "type": [
                            "null",
                            "int"
                          ],
                          "default": null
                        },
                        {
                          "name": "burstPacketsLost",
                          "doc": "The total number of packets lost in burst (RFC6958)",
                          "type": [
                            "null",
                            "int"
                          ],
                          "default": null
                        },
                        {
                          "name": "burstPacketsDiscarded",
                          "doc": "The total number of packets discarded in burst (RFC6958)",
                          "type": [
                            "null",
                            "int"
                          ],
                          "default": null
                        },
                        {
                          "name": "burstLossCount",
                          "doc": "The total number of burst happened causes burstPacketsLost on the corresponding synchronization source",
                          "type": [
                            "null",
                            "int"
                          ],
                          "default": null
                        },
                        {
                          "name": "burstDiscardCount",
                          "doc": "The total number of burst happened causes burstPacketsDiscarded on the corresponding synchronization source",
                          "type": [
                            "null",
                            "int"
                          ],
                          "default": null
                        },
                        {
                          "name": "burstLossRate",
                          "doc": "The fraction of RTP packets lost during bursts proportionally to the total number of RTP packets expected in the bursts on the corresponding synchronization source",
                          "type": [
                            "null",
                            "double"
                          ],
                          "default": null
                        },
                        {
                          "name": "burstDiscardRate",
                          "doc": "The fraction of RTP packets discarded during bursts proportionally to the total number of RTP packets expected in the bursts on the corresponding synchronization source",
                          "type": [
                            "null",
                            "double"
                          ],
                          "default": null
                        },
                        {
                          "name": "gapLossRate",
                          "doc": "The fraction of RTP packets lost during gap proportionally to the total number of RTP packets expected in the bursts on the corresponding synchronization source",
                          "type": [
                            "null",
                            "double"
                          ],
                          "default": null
                        },
                        {
                          "name": "gapDiscardRate",
                          "doc": "The fraction of RTP packets discarded during gap proportionally to the total number of RTP packets expected in the bursts on the corresponding synchronization source",
                          "type": [
                            "null",
                            "double"
                          ],
                          "default": null
                        },
                        {
                          "name": "roundTripTime",
                          "doc": "RTT measurement in seconds based on (most likely) SR, and RR belongs to the corresponded synchronization source",
                          "type": [
                            "null",
                            "double"
                          ],
                          "default": null
                        },
                        {
                          "name": "totalRoundTripTime",
                          "doc": "The sum of RTT measurements belongs to the corresponded synchronization source",
                          "type": [
                            "null",
                            "double"
                          ],
                          "default": null
                        },
                        {
                          "name": "fractionLost",
                          "doc": "The receiver reported fractional lost belongs to the corresponded synchronization source",
                          "type": [
                            "null",
                            "double"
                          ],
                          "default": null
                        },
                        {
                          "name": "reportsReceived",
                          "doc": "The total number of RR reports received, which is the base of the remote inbound calculation on this source",
                          "type": [
                            "null",
                            "int"
                          ],
                          "default": null
                        },
                        {
                          "name": "roundTripTimeMeasurements",
                          "doc": "The total number of calculated RR measurements received on this source",
                          "type": [
                            "null",
                            "int"
                          ],
                          "default": null
                        },
                        {
                          "name": "relayedSource",
                          "doc": "True if the corresponded media source is remote, false otherwise (or null depending on browser and version)",
                          "type": [
                            "null",
                            "boolean"
                          ],
                          "default": null
                        },
                        {
                          "name": "audioLevel",
                          "doc": "Represents the audio level reported by the media source",
                          "type": [
                            "null",
                            "double"
                          ],
                          "default": null
                        },
                        {
                          "name": "totalAudioEnergy",
                          "doc": "Represents the energy level reported by the media source",
                          "type": [
                            "null",
                            "double"
                          ],
                          "default": null
                        },
                        {
                          "name": "totalSamplesDuration",
                          "doc": "Represents the total duration of the audio samples the media source actually transconverted in seconds",
                          "type": [
                            "null",
                            "double"
                          ],
                          "default": null
                        },
                        {
                          "name": "echoReturnLoss",
                          "doc": "Represents the echo cancellation in decibels corresponded to the media source.",
                          "type": [
                            "null",
                            "double"
                          ],
                          "default": null
                        },
                        {
                          "name": "echoReturnLossEnhancement",
                          "doc": "Represents the echo cancellation in decibels added as a postprocessing by the library after the audio is catched from the emdia source.",
                          "type": [
                            "null",
                            "double"
                          ],
                          "default": null
                        },
                        {
                          "name": "ended",
                          "doc": "Flag represents if the sender ended the media stream track or not.",
                          "type": [
                            "null",
                            "boolean"
                          ],
                          "default": null
                        },
                        {
                          "name": "payloadType",
                          "doc": "The type of the payload the RTP packet SSRC belongs to",
                          "type": [
                            "null",
                            "int"
                          ],
                          "default": null
                        },
                        {
                          "name": "mimeType",
                          "doc": "the MIME type of the codec (e.g.: video/vp8)",
                          "type": [
                            "null",
                            "string"
                          ],
                          "default": null
                        },
                        {
                          "name": "clockRate",
                          "doc": "The negotiated clock rate the RTP timestamp is generated of",
                          "type": [
                            "null",
                            "long"
                          ],
                          "default": null
                        },
                        {
                          "name": "channels",
                          "doc": "The number of channels for audio is used (in stereo it is 2, otherwise it is most likely null)",
                          "type": [
                            "null",
                            "int"
                          ],
                          "default": null
                        },
                        {
                          "name": "sdpFmtpLine",
                          "doc": "The a=fmtp line in the SDP corresponding to the codec",
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
                "name": "outboundVideoTracks",
                "doc": "List of compound measurements related to outbound video tracks",
                "type": [
                  "null",
                  {
                    "type": "array",
                    "items": {
                      "name": "OutboundVideoTrack",
                      "type": "record",
                      "fields": [
                        {
                          "name": "trackId",
                          "doc": "The id of the track",
                          "type": [
                            "null",
                            "string"
                          ],
                          "default": null
                        },
                        {
                          "name": "peerConnectionId",
                          "doc": " The unique generated identifier of the peer connection the inbound audio track belongs to",
                          "type": [
                            "null",
                            "string"
                          ],
                          "default": null
                        },
                        {
                          "name": "rtpStreamId",
                          "doc": "The id of the RTP stream connected to a remote media unit (such as an SFU)",
                          "type": [
                            "null",
                            "string"
                          ],
                          "default": null
                        },
                        {
                          "name": "ssrc",
                          "doc": "The RTP SSRC field",
                          "type": "long"
                        },
                        {
                          "name": "packetsSent",
                          "doc": "The total number of packets sent on the corresponded synchronization source",
                          "type": [
                            "null",
                            "int"
                          ],
                          "default": null
                        },
                        {
                          "name": "bytesSent",
                          "doc": "The total number of bytes sent on the corresponded synchronization source",
                          "type": [
                            "null",
                            "long"
                          ],
                          "default": null
                        },
                        {
                          "name": "rtxSsrc",
                          "doc": "If RTX is negotiated as a separate stream, this is the SSRC of the RTX stream that is associated with this stream's ssrc. ",
                          "type": [
                            "null",
                            "long"
                          ],
                          "default": null
                        },
                        {
                          "name": "rid",
                          "doc": " The rid encoding parameter of the corresponded synchronization source",
                          "type": [
                            "null",
                            "string"
                          ],
                          "default": null
                        },
                        {
                          "name": "lastPacketSentTimestamp",
                          "doc": " the timestamp the last packet was sent. (UTC epoch in ms)",
                          "type": [
                            "null",
                            "long"
                          ],
                          "default": null
                        },
                        {
                          "name": "headerBytesSent",
                          "doc": "Total number of RTP header and padding bytes sent over the corresponding synchronization source (ssrc)",
                          "type": [
                            "null",
                            "long"
                          ],
                          "default": null
                        },
                        {
                          "name": "packetsDiscardedOnSend",
                          "doc": "Total number of RTP packets discarded at sender side over the corresponding synchronization source (ssrc)",
                          "type": [
                            "null",
                            "int"
                          ],
                          "default": null
                        },
                        {
                          "name": "bytesDiscardedOnSend",
                          "doc": "Total number of RTP bytes discarded at sender side over the corresponding synchronization source (ssrc)",
                          "type": [
                            "null",
                            "long"
                          ],
                          "default": null
                        },
                        {
                          "name": "fecPacketsSent",
                          "doc": "Total number of FEC packets sent over the corresponding synchronization source (ssrc)",
                          "type": [
                            "null",
                            "int"
                          ],
                          "default": null
                        },
                        {
                          "name": "retransmittedPacketsSent",
                          "doc": "Total number of retransmitted packets sent over the corresponding synchronization source (ssrc).",
                          "type": [
                            "null",
                            "int"
                          ],
                          "default": null
                        },
                        {
                          "name": "retransmittedBytesSent",
                          "doc": "Total number of retransmitted bytes sent over the corresponding synchronization source (ssrc).",
                          "type": [
                            "null",
                            "long"
                          ],
                          "default": null
                        },
                        {
                          "name": "targetBitrate",
                          "doc": "Reflects the current encoder target in bits per second.",
                          "type": [
                            "null",
                            "long"
                          ],
                          "default": null
                        },
                        {
                          "name": "totalEncodedBytesTarget",
                          "doc": "The total number of bytes of RTP coherent frames encoded completly depending on the frame size the encoder targets",
                          "type": [
                            "null",
                            "long"
                          ],
                          "default": null
                        },
                        {
                          "name": "totalPacketSendDelay",
                          "doc": "The total number of delay packets buffered at the sender side in seconds over the corresponding synchronization source",
                          "type": [
                            "null",
                            "double"
                          ],
                          "default": null
                        },
                        {
                          "name": "averageRtcpInterval",
                          "doc": "The average RTCP interval between two consecutive compound RTCP packets sent for the corresponding synchronization source (ssrc)",
                          "type": [
                            "null",
                            "double"
                          ],
                          "default": null
                        },
                        {
                          "name": "perDscpPacketsSent",
                          "doc": "The total number of DSCP flagged RTP packets sent over the corresponding synchronization source (ssrc)",
                          "type": [
                            "null",
                            "double"
                          ],
                          "default": null
                        },
                        {
                          "name": "nackCount",
                          "doc": "Count the total number of Negative ACKnowledgement (NACK) packets received over the corresponding synchronization source (ssrc)",
                          "type": [
                            "null",
                            "int"
                          ],
                          "default": null
                        },
                        {
                          "name": "encoderImplementation",
                          "doc": "Indicate the name of the encoder implementation library",
                          "type": [
                            "null",
                            "string"
                          ],
                          "default": null
                        },
                        {
                          "name": "frameWidth",
                          "doc": "The frame width in pixels of the frames targeted by the media encoder",
                          "type": [
                            "null",
                            "int"
                          ],
                          "default": null
                        },
                        {
                          "name": "frameHeight",
                          "doc": "The frame width the media encoder targeted",
                          "type": [
                            "null",
                            "int"
                          ],
                          "default": null
                        },
                        {
                          "name": "frameBitDepth",
                          "doc": "The frame depth in pixles on the corresponded RTP stream",
                          "type": [
                            "null",
                            "int"
                          ],
                          "default": null
                        },
                        {
                          "name": "framesPerSecond",
                          "doc": "The encoded number of frames in the last second on the corresponded media source",
                          "type": [
                            "null",
                            "double"
                          ],
                          "default": null
                        },
                        {
                          "name": "framesSent",
                          "doc": "TThe total number of frames sent on the corresponded RTP stream",
                          "type": [
                            "null",
                            "int"
                          ],
                          "default": null
                        },
                        {
                          "name": "hugeFramesSent",
                          "doc": "The total number of huge frames (avgFrameSize * 2.5) on the corresponded RTP stream",
                          "type": [
                            "null",
                            "int"
                          ],
                          "default": null
                        },
                        {
                          "name": "framesEncoded",
                          "doc": "The total number of frames encoded by the media source",
                          "type": [
                            "null",
                            "int"
                          ],
                          "default": null
                        },
                        {
                          "name": "keyFramesEncoded",
                          "doc": "The total number of keyframes encoded on the corresponded RTP stream",
                          "type": [
                            "null",
                            "int"
                          ],
                          "default": null
                        },
                        {
                          "name": "framesDiscardedOnSend",
                          "doc": "The total number of frames discarded on the corresponded RTP stream.",
                          "type": [
                            "null",
                            "int"
                          ],
                          "default": null
                        },
                        {
                          "name": "qpSum",
                          "doc": "The sum of the QP the media encoder provided on the corresponded RTP stream.",
                          "type": [
                            "null",
                            "int"
                          ],
                          "default": null
                        },
                        {
                          "name": "totalEncodeTime",
                          "doc": "The total time in seconds spent in encoding media frames for the corresponded RTP stream.",
                          "type": [
                            "null",
                            "double"
                          ],
                          "default": null
                        },
                        {
                          "name": "qualityLimitationDurationNone",
                          "doc": "Time elapsed in seconds when the RTC connection has not limited the quality",
                          "type": [
                            "null",
                            "double"
                          ],
                          "default": null
                        },
                        {
                          "name": "qualityLimitationDurationCPU",
                          "doc": "Time elapsed in seconds the RTC connection had a limitation because of CPU",
                          "type": [
                            "null",
                            "double"
                          ],
                          "default": null
                        },
                        {
                          "name": "qualityLimitationDurationBandwidth",
                          "doc": "Time elapsed in seconds the RTC connection had a limitation because of Bandwidth",
                          "type": [
                            "null",
                            "double"
                          ],
                          "default": null
                        },
                        {
                          "name": "qualityLimitationDurationOther",
                          "doc": "Time elapsed in seconds the RTC connection had a limitation because of Other factor",
                          "type": [
                            "null",
                            "double"
                          ],
                          "default": null
                        },
                        {
                          "name": "qualityLimitationReason",
                          "doc": "Indicate a reason for the quality limitation of the corresponded synchronization source",
                          "type": [
                            "null",
                            "string"
                          ],
                          "default": null
                        },
                        {
                          "name": "qualityLimitationResolutionChanges",
                          "doc": "The total number of resolution changes occured ont he corresponded RTP stream due to quality changes",
                          "type": [
                            "null",
                            "int"
                          ],
                          "default": null
                        },
                        {
                          "name": "packetsReceived",
                          "doc": "The total number of packets received on the corresponded synchronization source",
                          "type": [
                            "null",
                            "int"
                          ],
                          "default": null
                        },
                        {
                          "name": "packetsLost",
                          "doc": "The total number of bytes received on the corresponded synchronization source",
                          "type": [
                            "null",
                            "int"
                          ],
                          "default": null
                        },
                        {
                          "name": "jitter",
                          "doc": "The corresponded synchronization source reported jitter",
                          "type": [
                            "null",
                            "double"
                          ],
                          "default": null
                        },
                        {
                          "name": "packetsDiscarded",
                          "doc": "The total number of packets missed the playout point and therefore discarded by the jitterbuffer",
                          "type": [
                            "null",
                            "int"
                          ],
                          "default": null
                        },
                        {
                          "name": "packetsRepaired",
                          "doc": "The total number of packets repaired by either FEC or due to retransmission on the corresponded synchronization source",
                          "type": [
                            "null",
                            "int"
                          ],
                          "default": null
                        },
                        {
                          "name": "burstPacketsLost",
                          "doc": "The total number of packets lost in burst (RFC6958)",
                          "type": [
                            "null",
                            "int"
                          ],
                          "default": null
                        },
                        {
                          "name": "burstPacketsDiscarded",
                          "doc": "The total number of packets discarded in burst (RFC6958)",
                          "type": [
                            "null",
                            "int"
                          ],
                          "default": null
                        },
                        {
                          "name": "burstLossCount",
                          "doc": "The total number of burst happened causes burstPacketsLost on the corresponding synchronization source",
                          "type": [
                            "null",
                            "int"
                          ],
                          "default": null
                        },
                        {
                          "name": "burstDiscardCount",
                          "doc": "The total number of burst happened causes burstPacketsDiscarded on the corresponding synchronization source",
                          "type": [
                            "null",
                            "int"
                          ],
                          "default": null
                        },
                        {
                          "name": "burstLossRate",
                          "doc": "The fraction of RTP packets lost during bursts proportionally to the total number of RTP packets expected in the bursts on the corresponding synchronization source",
                          "type": [
                            "null",
                            "double"
                          ],
                          "default": null
                        },
                        {
                          "name": "burstDiscardRate",
                          "doc": "The fraction of RTP packets discarded during bursts proportionally to the total number of RTP packets expected in the bursts on the corresponding synchronization source",
                          "type": [
                            "null",
                            "double"
                          ],
                          "default": null
                        },
                        {
                          "name": "gapLossRate",
                          "doc": "The fraction of RTP packets lost during gap proportionally to the total number of RTP packets expected in the bursts on the corresponding synchronization source",
                          "type": [
                            "null",
                            "double"
                          ],
                          "default": null
                        },
                        {
                          "name": "gapDiscardRate",
                          "doc": "The fraction of RTP packets discarded during gap proportionally to the total number of RTP packets expected in the bursts on the corresponding synchronization source",
                          "type": [
                            "null",
                            "double"
                          ],
                          "default": null
                        },
                        {
                          "name": "roundTripTime",
                          "doc": "RTT measurement in seconds based on (most likely) SR, and RR belongs to the corresponded synchronization source",
                          "type": [
                            "null",
                            "double"
                          ],
                          "default": null
                        },
                        {
                          "name": "totalRoundTripTime",
                          "doc": "The sum of RTT measurements belongs to the corresponded synchronization source",
                          "type": [
                            "null",
                            "double"
                          ],
                          "default": null
                        },
                        {
                          "name": "fractionLost",
                          "doc": "The receiver reported fractional lost belongs to the corresponded synchronization source",
                          "type": [
                            "null",
                            "double"
                          ],
                          "default": null
                        },
                        {
                          "name": "reportsReceived",
                          "doc": "The total number of RR reports received, which is the base of the remote inbound calculation on this source",
                          "type": [
                            "null",
                            "int"
                          ],
                          "default": null
                        },
                        {
                          "name": "roundTripTimeMeasurements",
                          "doc": "The total number of calculated RR measurements received on this source",
                          "type": [
                            "null",
                            "int"
                          ],
                          "default": null
                        },
                        {
                          "name": "framesDropped",
                          "doc": "The total number of frames reported to be lost by the remote endpoit on the corresponded RTP stream",
                          "type": [
                            "null",
                            "int"
                          ],
                          "default": null
                        },
                        {
                          "name": "partialFramesLost",
                          "doc": "The total number of partial frames reported to be lost by the remote endpoint on the corresponded RTP stream.",
                          "type": [
                            "null",
                            "int"
                          ],
                          "default": null
                        },
                        {
                          "name": "fullFramesList",
                          "doc": "The total number of full frames lost at the remote endpoint on the corresponded RTP stream.",
                          "type": [
                            "null",
                            "int"
                          ],
                          "default": null
                        },
                        {
                          "name": "relayedSource",
                          "doc": "True if the corresponded media source is remote, false otherwise (or null depending on browser and version)",
                          "type": [
                            "null",
                            "boolean"
                          ],
                          "default": null
                        },
                        {
                          "name": "width",
                          "doc": "The width, in pixels, of the last frame originating from the media source",
                          "type": [
                            "null",
                            "int"
                          ],
                          "default": null
                        },
                        {
                          "name": "height",
                          "doc": "The height, in pixels, of the last frame originating from the media source",
                          "type": [
                            "null",
                            "int"
                          ],
                          "default": null
                        },
                        {
                          "name": "bitDepth",
                          "doc": "The bitDepth, in pixels, of the last frame originating from the media source",
                          "type": [
                            "null",
                            "int"
                          ],
                          "default": null
                        },
                        {
                          "name": "frames",
                          "doc": "The total number of frames originated from the media source",
                          "type": [
                            "null",
                            "int"
                          ],
                          "default": null
                        },
                        {
                          "name": "ended",
                          "doc": "Flag represents if the sender ended the media stream track or not.",
                          "type": [
                            "null",
                            "boolean"
                          ],
                          "default": null
                        },
                        {
                          "name": "payloadType",
                          "doc": "The type of the payload the RTP packet SSRC belongs to",
                          "type": [
                            "null",
                            "int"
                          ],
                          "default": null
                        },
                        {
                          "name": "mimeType",
                          "doc": "the MIME type of the codec (e.g.: video/vp8)",
                          "type": [
                            "null",
                            "string"
                          ],
                          "default": null
                        },
                        {
                          "name": "clockRate",
                          "doc": "The negotiated clock rate the RTP timestamp is generated of",
                          "type": [
                            "null",
                            "long"
                          ],
                          "default": null
                        },
                        {
                          "name": "channels",
                          "doc": "The number of channels for audio is used (in stereo it is 2, otherwise it is most likely null)",
                          "type": [
                            "null",
                            "int"
                          ],
                          "default": null
                        },
                        {
                          "name": "sdpFmtpLine",
                          "doc": "The a=fmtp line in the SDP corresponding to the codec",
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
                "name": "iceLocalCandidates",
                "doc": "List of local ICE candidates",
                "type": [
                  "null",
                  {
                    "type": "array",
                    "items": {
                      "name": "IceLocalCandidate",
                      "type": "record",
                      "fields": [
                        {
                          "name": "peerConnectionId",
                          "doc": "Refers to the peer connection the local candidate belongs to",
                          "type": [
                            "null",
                            "string"
                          ],
                          "default": null
                        },
                        {
                          "name": "id",
                          "doc": "The unique identifier of the local candidate",
                          "type": [
                            "null",
                            "string"
                          ],
                          "default": null
                        },
                        {
                          "name": "transportId",
                          "doc": "The unique identifier of the transport the local candidate belongs to",
                          "type": [
                            "null",
                            "string"
                          ],
                          "default": null
                        },
                        {
                          "name": "address",
                          "doc": "The address of the local endpoint (Ipv4, Ipv6, FQDN)",
                          "type": [
                            "null",
                            "string"
                          ],
                          "default": null
                        },
                        {
                          "name": "port",
                          "doc": "The port number of the local endpoint the ICE uses",
                          "type": [
                            "null",
                            "int"
                          ],
                          "default": null
                        },
                        {
                          "name": "protocol",
                          "doc": "The protocol for the ICE",
                          "type": [
                            "null",
                            {
                              "type": "enum",
                              "name": "LocalCandidateProtocol",
                              "symbols": [
                                "tcp",
                                "udp"
                              ]
                            }
                          ],
                          "default": null
                        },
                        {
                          "name": "candidateType",
                          "doc": "The type of the local candidate",
                          "type": [
                            "null",
                            "string"
                          ],
                          "default": null
                        },
                        {
                          "name": "priority",
                          "doc": "The priority of the local candidate",
                          "type": [
                            "null",
                            "long"
                          ],
                          "default": null
                        },
                        {
                          "name": "url",
                          "doc": "The url of the ICE server",
                          "type": [
                            "null",
                            "string"
                          ],
                          "default": null
                        },
                        {
                          "name": "relayProtocol",
                          "doc": "The relay protocol the local candidate uses",
                          "type": [
                            "null",
                            {
                              "type": "enum",
                              "name": "LocalCandidateRelayProtocol",
                              "symbols": [
                                "tcp",
                                "udp",
                                "tls"
                              ]
                            }
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
                "name": "iceRemoteCandidates",
                "doc": "List of remote ICE candidates",
                "type": [
                  "null",
                  {
                    "type": "array",
                    "items": {
                      "name": "IceRemoteCandidate",
                      "type": "record",
                      "fields": [
                        {
                          "name": "peerConnectionId",
                          "doc": "Refers to the peer connection the local candidate belongs to",
                          "type": [
                            "null",
                            "string"
                          ],
                          "default": null
                        },
                        {
                          "name": "id",
                          "doc": "The unique identifier of the local candidate",
                          "type": [
                            "null",
                            "string"
                          ],
                          "default": null
                        },
                        {
                          "name": "transportId",
                          "doc": "The unique identifier of the transport the local candidate belongs to",
                          "type": [
                            "null",
                            "string"
                          ],
                          "default": null
                        },
                        {
                          "name": "address",
                          "doc": "The address of the local endpoint (Ipv4, Ipv6, FQDN)",
                          "type": [
                            "null",
                            "string"
                          ],
                          "default": null
                        },
                        {
                          "name": "port",
                          "doc": "The port number of the local endpoint the ICE uses",
                          "type": [
                            "null",
                            "int"
                          ],
                          "default": null
                        },
                        {
                          "name": "protocol",
                          "doc": "The protocol for the ICE",
                          "type": [
                            "null",
                            {
                              "type": "enum",
                              "name": "RemoteCandidateProtocol",
                              "symbols": [
                                "tcp",
                                "udp"
                              ]
                            }
                          ],
                          "default": null
                        },
                        {
                          "name": "candidateType",
                          "doc": "The type of the local candidate",
                          "type": [
                            "null",
                            "string"
                          ],
                          "default": null
                        },
                        {
                          "name": "priority",
                          "doc": "The priority of the local candidate",
                          "type": [
                            "null",
                            "long"
                          ],
                          "default": null
                        },
                        {
                          "name": "url",
                          "doc": "The url of the ICE server",
                          "type": [
                            "null",
                            "string"
                          ],
                          "default": null
                        },
                        {
                          "name": "relayProtocol",
                          "doc": "The relay protocol the local candidate uses",
                          "type": [
                            "null",
                            {
                              "type": "enum",
                              "name": "RemoteCandidateRelayProtocol",
                              "symbols": [
                                "tcp",
                                "udp",
                                "tls"
                              ]
                            }
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
                "name": "dataChannels",
                "doc": "List of Data channels",
                "type": [
                  "null",
                  {
                    "type": "array",
                    "items": {
                      "name": "DataChannel",
                      "type": "record",
                      "fields": [
                        {
                          "name": "peerConnectionId",
                          "doc": "Refers to the peer connection the local candidate belongs to",
                          "type": [
                            "null",
                            "string"
                          ],
                          "default": null
                        },
                        {
                          "name": "id",
                          "doc": "Unique identifier of the data channel",
                          "type": [
                            "null",
                            "string"
                          ],
                          "default": null
                        },
                        {
                          "name": "label",
                          "doc": "The label the data channel provided at the creation",
                          "type": [
                            "null",
                            "string"
                          ],
                          "default": null
                        },
                        {
                          "name": "address",
                          "doc": "The address of the local endpoint (Ipv4, Ipv6, FQDN)",
                          "type": [
                            "null",
                            "string"
                          ],
                          "default": null
                        },
                        {
                          "name": "port",
                          "doc": "The port number of the local endpoint the ICE uses",
                          "type": [
                            "null",
                            "int"
                          ],
                          "default": null
                        },
                        {
                          "name": "protocol",
                          "doc": " The protocol the data channel use to transfer data",
                          "type": [
                            "null",
                            "string"
                          ],
                          "default": null
                        },
                        {
                          "name": "dataChannelIdentifier",
                          "doc": "The unique identifier of the data channel",
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
                          "doc": "The total number of messages sent on this data channel. this is not equal to the number of packets sent, as messages are chunked to packets",
                          "type": [
                            "null",
                            "int"
                          ],
                          "default": null
                        },
                        {
                          "name": "bytesSent",
                          "doc": "The amount of bytes sent on the corresponded data channel",
                          "type": [
                            "null",
                            "long"
                          ],
                          "default": null
                        },
                        {
                          "name": "messagesReceived",
                          "doc": "The number of messages received on the corresponded data channel",
                          "type": [
                            "null",
                            "int"
                          ],
                          "default": null
                        },
                        {
                          "name": "bytesReceived",
                          "doc": "The amount of bytes received on the corresponded data channel",
                          "type": [
                            "null",
                            "long"
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