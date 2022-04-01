export const jsonDescriptor = {
  "nested": {
    "org": {
      "nested": {
        "observertc": {
          "nested": {
            "schemas": {
              "nested": {
                "protobuf": {
                  "nested": {
                    "Samples": {
                      "fields": {
                        "clientSamples": {
                          "rule": "repeated",
                          "type": "ClientSample",
                          "id": 1
                        },
                        "sfuSamples": {
                          "rule": "repeated",
                          "type": "SfuSample",
                          "id": 2
                        },
                        "turnSamples": {
                          "rule": "repeated",
                          "type": "TurnSample",
                          "id": 3
                        },
                        "controlFlags": {
                          "type": "ControlFlags",
                          "id": 4
                        },
                        "meta": {
                          "type": "SamplesMeta",
                          "id": 5
                        }
                      },
                      "nested": {
                        "SamplesMeta": {
                          "fields": {
                            "schemaVersion": {
                              "type": "string",
                              "id": 1
                            }
                          }
                        },
                        "ControlFlags": {
                          "fields": {
                            "close": {
                              "type": "bool",
                              "id": 1
                            }
                          }
                        },
                        "ClientSample": {
                          "fields": {
                            "certificates": {
                              "rule": "repeated",
                              "type": "Certificate",
                              "id": 1
                            },
                            "codecs": {
                              "rule": "repeated",
                              "type": "MediaCodecStats",
                              "id": 2
                            },
                            "dataChannels": {
                              "rule": "repeated",
                              "type": "DataChannel",
                              "id": 3
                            },
                            "extensionStats": {
                              "rule": "repeated",
                              "type": "ExtensionStat",
                              "id": 4
                            },
                            "iceLocalCandidates": {
                              "rule": "repeated",
                              "type": "IceLocalCandidate",
                              "id": 5
                            },
                            "iceRemoteCandidates": {
                              "rule": "repeated",
                              "type": "IceRemoteCandidate",
                              "id": 6
                            },
                            "iceServers": {
                              "rule": "repeated",
                              "type": "string",
                              "id": 7
                            },
                            "inboundAudioTracks": {
                              "rule": "repeated",
                              "type": "InboundAudioTrack",
                              "id": 8
                            },
                            "inboundVideoTracks": {
                              "rule": "repeated",
                              "type": "InboundVideoTrack",
                              "id": 9
                            },
                            "mediaConstraints": {
                              "rule": "repeated",
                              "type": "string",
                              "id": 10
                            },
                            "mediaDevices": {
                              "rule": "repeated",
                              "type": "MediaDevice",
                              "id": 11
                            },
                            "mediaSources": {
                              "rule": "repeated",
                              "type": "MediaSourceStat",
                              "id": 12
                            },
                            "outboundAudioTracks": {
                              "rule": "repeated",
                              "type": "OutboundAudioTrack",
                              "id": 13
                            },
                            "outboundVideoTracks": {
                              "rule": "repeated",
                              "type": "OutboundVideoTrack",
                              "id": 14
                            },
                            "pcTransports": {
                              "rule": "repeated",
                              "type": "PeerConnectionTransport",
                              "id": 15
                            },
                            "userMediaErrors": {
                              "rule": "repeated",
                              "type": "string",
                              "id": 16
                            },
                            "clientId": {
                              "rule": "required",
                              "type": "string",
                              "id": 17
                            },
                            "timestamp": {
                              "rule": "required",
                              "type": "uint64",
                              "id": 18
                            },
                            "browser": {
                              "type": "Browser",
                              "id": 19
                            },
                            "callId": {
                              "type": "string",
                              "id": 20
                            },
                            "engine": {
                              "type": "Engine",
                              "id": 21
                            },
                            "marker": {
                              "type": "string",
                              "id": 22
                            },
                            "os": {
                              "type": "OperationSystem",
                              "id": 23
                            },
                            "platform": {
                              "type": "Platform",
                              "id": 24
                            },
                            "roomId": {
                              "type": "string",
                              "id": 25
                            },
                            "sampleSeq": {
                              "type": "uint32",
                              "id": 26
                            },
                            "timeZoneOffsetInHours": {
                              "type": "uint32",
                              "id": 27
                            },
                            "userId": {
                              "type": "string",
                              "id": 28
                            }
                          },
                          "nested": {
                            "Engine": {
                              "fields": {
                                "name": {
                                  "type": "string",
                                  "id": 1
                                },
                                "version": {
                                  "type": "string",
                                  "id": 2
                                }
                              }
                            },
                            "Platform": {
                              "fields": {
                                "model": {
                                  "type": "string",
                                  "id": 1
                                },
                                "type": {
                                  "type": "string",
                                  "id": 2
                                },
                                "vendor": {
                                  "type": "string",
                                  "id": 3
                                }
                              }
                            },
                            "Browser": {
                              "fields": {
                                "name": {
                                  "type": "string",
                                  "id": 1
                                },
                                "version": {
                                  "type": "string",
                                  "id": 2
                                }
                              }
                            },
                            "OperationSystem": {
                              "fields": {
                                "name": {
                                  "type": "string",
                                  "id": 1
                                },
                                "version": {
                                  "type": "string",
                                  "id": 2
                                },
                                "versionName": {
                                  "type": "string",
                                  "id": 3
                                }
                              }
                            },
                            "MediaDevice": {
                              "fields": {
                                "id": {
                                  "type": "string",
                                  "id": 1
                                },
                                "kind": {
                                  "type": "string",
                                  "id": 2
                                },
                                "label": {
                                  "type": "string",
                                  "id": 3
                                }
                              }
                            },
                            "ExtensionStat": {
                              "fields": {
                                "payload": {
                                  "rule": "required",
                                  "type": "string",
                                  "id": 1
                                },
                                "type": {
                                  "rule": "required",
                                  "type": "string",
                                  "id": 2
                                }
                              }
                            },
                            "PeerConnectionTransport": {
                              "fields": {
                                "peerConnectionId": {
                                  "rule": "required",
                                  "type": "string",
                                  "id": 1
                                },
                                "bytesReceived": {
                                  "type": "uint64",
                                  "id": 2
                                },
                                "bytesSent": {
                                  "type": "uint64",
                                  "id": 3
                                },
                                "candidatePairAvailableIncomingBitrate": {
                                  "type": "double",
                                  "id": 4
                                },
                                "candidatePairAvailableOutgoingBitrate": {
                                  "type": "double",
                                  "id": 5
                                },
                                "candidatePairBytesDiscardedOnSend": {
                                  "type": "uint64",
                                  "id": 6
                                },
                                "candidatePairBytesReceived": {
                                  "type": "uint64",
                                  "id": 7
                                },
                                "candidatePairBytesSent": {
                                  "type": "uint64",
                                  "id": 8
                                },
                                "candidatePairCircuitBreakerTriggerCount": {
                                  "type": "uint32",
                                  "id": 9
                                },
                                "candidatePairConsentExpiredTimestamp": {
                                  "type": "uint64",
                                  "id": 10
                                },
                                "candidatePairConsentRequestBytesSent": {
                                  "type": "uint64",
                                  "id": 11
                                },
                                "candidatePairConsentRequestsSent": {
                                  "type": "uint32",
                                  "id": 12
                                },
                                "candidatePairCurrentRoundTripTime": {
                                  "type": "double",
                                  "id": 13
                                },
                                "candidatePairFirstRequestTimestamp": {
                                  "type": "uint64",
                                  "id": 14
                                },
                                "candidatePairLastPacketReceivedTimestamp": {
                                  "type": "uint64",
                                  "id": 15
                                },
                                "candidatePairLastPacketSentTimestamp": {
                                  "type": "uint64",
                                  "id": 16
                                },
                                "candidatePairLastRequestTimestamp": {
                                  "type": "uint64",
                                  "id": 17
                                },
                                "candidatePairLastResponseTimestamp": {
                                  "type": "uint64",
                                  "id": 18
                                },
                                "candidatePairPacketsDiscardedOnSend": {
                                  "type": "uint32",
                                  "id": 19
                                },
                                "candidatePairPacketsReceived": {
                                  "type": "uint32",
                                  "id": 20
                                },
                                "candidatePairPacketsSent": {
                                  "type": "uint32",
                                  "id": 21
                                },
                                "candidatePairRequestBytesSent": {
                                  "type": "uint64",
                                  "id": 22
                                },
                                "candidatePairRequestsReceived": {
                                  "type": "uint32",
                                  "id": 23
                                },
                                "candidatePairRequestsSent": {
                                  "type": "uint32",
                                  "id": 24
                                },
                                "candidatePairResponseBytesSent": {
                                  "type": "uint64",
                                  "id": 25
                                },
                                "candidatePairResponsesReceived": {
                                  "type": "uint32",
                                  "id": 26
                                },
                                "candidatePairResponsesSent": {
                                  "type": "uint32",
                                  "id": 27
                                },
                                "candidatePairRetransmissionReceived": {
                                  "type": "uint32",
                                  "id": 28
                                },
                                "candidatePairRetransmissionSent": {
                                  "type": "uint32",
                                  "id": 29
                                },
                                "candidatePairState": {
                                  "type": "string",
                                  "id": 30
                                },
                                "candidatePairTotalRoundTripTime": {
                                  "type": "double",
                                  "id": 31
                                },
                                "dataChannelsAccepted": {
                                  "type": "uint32",
                                  "id": 32
                                },
                                "dataChannelsClosed": {
                                  "type": "uint32",
                                  "id": 33
                                },
                                "dataChannelsOpened": {
                                  "type": "uint32",
                                  "id": 34
                                },
                                "dataChannelsRequested": {
                                  "type": "uint32",
                                  "id": 35
                                },
                                "dtlsCipher": {
                                  "type": "string",
                                  "id": 36
                                },
                                "dtlsState": {
                                  "type": "string",
                                  "id": 37
                                },
                                "iceLocalUsernameFragment": {
                                  "type": "string",
                                  "id": 38
                                },
                                "iceRole": {
                                  "type": "string",
                                  "id": 39
                                },
                                "iceState": {
                                  "type": "string",
                                  "id": 40
                                },
                                "label": {
                                  "type": "string",
                                  "id": 41
                                },
                                "localAddress": {
                                  "type": "string",
                                  "id": 42
                                },
                                "localCandidateICEServerUrl": {
                                  "type": "string",
                                  "id": 43
                                },
                                "localCandidateRelayProtocol": {
                                  "type": "string",
                                  "id": 44
                                },
                                "localCandidateType": {
                                  "type": "string",
                                  "id": 45
                                },
                                "localPort": {
                                  "type": "uint32",
                                  "id": 46
                                },
                                "localProtocol": {
                                  "type": "string",
                                  "id": 47
                                },
                                "packetsReceived": {
                                  "type": "uint32",
                                  "id": 48
                                },
                                "packetsSent": {
                                  "type": "uint32",
                                  "id": 49
                                },
                                "remoteAddress": {
                                  "type": "string",
                                  "id": 50
                                },
                                "remoteCandidateICEServerUrl": {
                                  "type": "string",
                                  "id": 51
                                },
                                "remoteCandidateRelayProtocol": {
                                  "type": "string",
                                  "id": 52
                                },
                                "remoteCandidateType": {
                                  "type": "string",
                                  "id": 53
                                },
                                "remotePort": {
                                  "type": "uint32",
                                  "id": 54
                                },
                                "remoteProtocol": {
                                  "type": "string",
                                  "id": 55
                                },
                                "sctpCongestionWindow": {
                                  "type": "double",
                                  "id": 56
                                },
                                "sctpMtu": {
                                  "type": "uint32",
                                  "id": 57
                                },
                                "sctpReceiverWindow": {
                                  "type": "double",
                                  "id": 58
                                },
                                "sctpSmoothedRoundTripTime": {
                                  "type": "double",
                                  "id": 59
                                },
                                "sctpUnackData": {
                                  "type": "uint32",
                                  "id": 60
                                },
                                "selectedCandidatePairChanges": {
                                  "type": "uint32",
                                  "id": 61
                                },
                                "srtpCipher": {
                                  "type": "string",
                                  "id": 62
                                },
                                "tlsGroup": {
                                  "type": "string",
                                  "id": 63
                                },
                                "tlsVersion": {
                                  "type": "string",
                                  "id": 64
                                }
                              }
                            },
                            "MediaSourceStat": {
                              "fields": {
                                "audioLevel": {
                                  "type": "double",
                                  "id": 1
                                },
                                "bitDepth": {
                                  "type": "uint32",
                                  "id": 2
                                },
                                "echoReturnLoss": {
                                  "type": "double",
                                  "id": 3
                                },
                                "echoReturnLossEnhancement": {
                                  "type": "double",
                                  "id": 4
                                },
                                "frames": {
                                  "type": "uint32",
                                  "id": 5
                                },
                                "framesPerSecond": {
                                  "type": "double",
                                  "id": 6
                                },
                                "height": {
                                  "type": "uint32",
                                  "id": 7
                                },
                                "kind": {
                                  "type": "string",
                                  "id": 8
                                },
                                "relayedSource": {
                                  "type": "bool",
                                  "id": 9
                                },
                                "totalAudioEnergy": {
                                  "type": "double",
                                  "id": 10
                                },
                                "totalSamplesDuration": {
                                  "type": "double",
                                  "id": 11
                                },
                                "trackIdentifier": {
                                  "type": "string",
                                  "id": 12
                                },
                                "width": {
                                  "type": "uint32",
                                  "id": 13
                                }
                              }
                            },
                            "MediaCodecStats": {
                              "fields": {
                                "channels": {
                                  "type": "uint32",
                                  "id": 1
                                },
                                "clockRate": {
                                  "type": "uint32",
                                  "id": 2
                                },
                                "codecType": {
                                  "type": "string",
                                  "id": 3
                                },
                                "mimeType": {
                                  "type": "string",
                                  "id": 4
                                },
                                "payloadType": {
                                  "type": "string",
                                  "id": 5
                                },
                                "sdpFmtpLine": {
                                  "type": "string",
                                  "id": 6
                                }
                              }
                            },
                            "Certificate": {
                              "fields": {
                                "base64Certificate": {
                                  "type": "string",
                                  "id": 1
                                },
                                "fingerprint": {
                                  "type": "string",
                                  "id": 2
                                },
                                "fingerprintAlgorithm": {
                                  "type": "string",
                                  "id": 3
                                },
                                "issuerCertificateId": {
                                  "type": "string",
                                  "id": 4
                                }
                              }
                            },
                            "InboundAudioTrack": {
                              "fields": {
                                "ssrc": {
                                  "rule": "required",
                                  "type": "uint64",
                                  "id": 1
                                },
                                "averageRtcpInterval": {
                                  "type": "double",
                                  "id": 2
                                },
                                "burstDiscardCount": {
                                  "type": "uint32",
                                  "id": 3
                                },
                                "burstDiscardRate": {
                                  "type": "double",
                                  "id": 4
                                },
                                "burstLossCount": {
                                  "type": "uint32",
                                  "id": 5
                                },
                                "burstLossRate": {
                                  "type": "double",
                                  "id": 6
                                },
                                "burstPacketsDiscarded": {
                                  "type": "uint32",
                                  "id": 7
                                },
                                "burstPacketsLost": {
                                  "type": "uint32",
                                  "id": 8
                                },
                                "bytesReceived": {
                                  "type": "uint64",
                                  "id": 9
                                },
                                "bytesSent": {
                                  "type": "uint64",
                                  "id": 10
                                },
                                "channels": {
                                  "type": "uint32",
                                  "id": 11
                                },
                                "clockRate": {
                                  "type": "uint32",
                                  "id": 12
                                },
                                "concealedSamples": {
                                  "type": "uint32",
                                  "id": 13
                                },
                                "concealmentEvents": {
                                  "type": "uint32",
                                  "id": 14
                                },
                                "decoderImplementation": {
                                  "type": "string",
                                  "id": 15
                                },
                                "ended": {
                                  "type": "bool",
                                  "id": 16
                                },
                                "estimatedPlayoutTimestamp": {
                                  "type": "uint64",
                                  "id": 17
                                },
                                "fecPacketsDiscarded": {
                                  "type": "uint32",
                                  "id": 18
                                },
                                "fecPacketsReceived": {
                                  "type": "uint32",
                                  "id": 19
                                },
                                "gapDiscardRate": {
                                  "type": "double",
                                  "id": 20
                                },
                                "gapLossRate": {
                                  "type": "double",
                                  "id": 21
                                },
                                "headerBytesReceived": {
                                  "type": "uint64",
                                  "id": 22
                                },
                                "insertedSamplesForDeceleration": {
                                  "type": "uint32",
                                  "id": 23
                                },
                                "jitter": {
                                  "type": "double",
                                  "id": 24
                                },
                                "jitterBufferDelay": {
                                  "type": "double",
                                  "id": 25
                                },
                                "jitterBufferEmittedCount": {
                                  "type": "uint32",
                                  "id": 26
                                },
                                "lastPacketReceivedTimestamp": {
                                  "type": "uint64",
                                  "id": 27
                                },
                                "mimeType": {
                                  "type": "string",
                                  "id": 28
                                },
                                "nackCount": {
                                  "type": "uint32",
                                  "id": 29
                                },
                                "packetsDiscarded": {
                                  "type": "uint32",
                                  "id": 30
                                },
                                "packetsDuplicated": {
                                  "type": "uint32",
                                  "id": 31
                                },
                                "packetsFailedDecryption": {
                                  "type": "uint32",
                                  "id": 32
                                },
                                "packetsLost": {
                                  "type": "uint32",
                                  "id": 33
                                },
                                "packetsReceived": {
                                  "type": "uint32",
                                  "id": 34
                                },
                                "packetsRepaired": {
                                  "type": "uint32",
                                  "id": 35
                                },
                                "packetsSent": {
                                  "type": "uint32",
                                  "id": 36
                                },
                                "payloadType": {
                                  "type": "uint32",
                                  "id": 37
                                },
                                "peerConnectionId": {
                                  "type": "string",
                                  "id": 38
                                },
                                "perDscpPacketsReceived": {
                                  "type": "uint32",
                                  "id": 39
                                },
                                "remoteClientId": {
                                  "type": "string",
                                  "id": 40
                                },
                                "remoteTimestamp": {
                                  "type": "uint64",
                                  "id": 41
                                },
                                "removedSamplesForAcceleration": {
                                  "type": "uint32",
                                  "id": 42
                                },
                                "reportsSent": {
                                  "type": "uint32",
                                  "id": 43
                                },
                                "roundTripTime": {
                                  "type": "double",
                                  "id": 44
                                },
                                "roundTripTimeMeasurements": {
                                  "type": "uint32",
                                  "id": 45
                                },
                                "samplesDecodedWithCelt": {
                                  "type": "uint32",
                                  "id": 46
                                },
                                "samplesDecodedWithSilk": {
                                  "type": "uint32",
                                  "id": 47
                                },
                                "sdpFmtpLine": {
                                  "type": "string",
                                  "id": 48
                                },
                                "sfuSinkId": {
                                  "type": "string",
                                  "id": 49
                                },
                                "silentConcealedSamples": {
                                  "type": "uint32",
                                  "id": 50
                                },
                                "totalProcessingDelay": {
                                  "type": "double",
                                  "id": 51
                                },
                                "totalRoundTripTime": {
                                  "type": "double",
                                  "id": 52
                                },
                                "totalSamplesDecoded": {
                                  "type": "uint32",
                                  "id": 53
                                },
                                "totalSamplesReceived": {
                                  "type": "uint32",
                                  "id": 54
                                },
                                "trackId": {
                                  "type": "string",
                                  "id": 55
                                },
                                "voiceActivityFlag": {
                                  "type": "bool",
                                  "id": 56
                                }
                              }
                            },
                            "InboundVideoTrack": {
                              "fields": {
                                "ssrc": {
                                  "rule": "required",
                                  "type": "uint64",
                                  "id": 1
                                },
                                "averageRtcpInterval": {
                                  "type": "double",
                                  "id": 2
                                },
                                "burstDiscardCount": {
                                  "type": "uint32",
                                  "id": 3
                                },
                                "burstDiscardRate": {
                                  "type": "double",
                                  "id": 4
                                },
                                "burstLossCount": {
                                  "type": "uint32",
                                  "id": 5
                                },
                                "burstLossRate": {
                                  "type": "double",
                                  "id": 6
                                },
                                "burstPacketsDiscarded": {
                                  "type": "uint32",
                                  "id": 7
                                },
                                "burstPacketsLost": {
                                  "type": "uint32",
                                  "id": 8
                                },
                                "bytesReceived": {
                                  "type": "uint64",
                                  "id": 9
                                },
                                "bytesSent": {
                                  "type": "uint64",
                                  "id": 10
                                },
                                "channels": {
                                  "type": "uint32",
                                  "id": 11
                                },
                                "clockRate": {
                                  "type": "uint32",
                                  "id": 12
                                },
                                "decoderImplementation": {
                                  "type": "string",
                                  "id": 13
                                },
                                "ended": {
                                  "type": "bool",
                                  "id": 14
                                },
                                "estimatedPlayoutTimestamp": {
                                  "type": "uint64",
                                  "id": 15
                                },
                                "fecPacketsDiscarded": {
                                  "type": "uint32",
                                  "id": 16
                                },
                                "fecPacketsReceived": {
                                  "type": "uint32",
                                  "id": 17
                                },
                                "firCount": {
                                  "type": "uint32",
                                  "id": 18
                                },
                                "frameBitDepth": {
                                  "type": "uint32",
                                  "id": 19
                                },
                                "frameHeight": {
                                  "type": "uint32",
                                  "id": 20
                                },
                                "frameWidth": {
                                  "type": "uint32",
                                  "id": 21
                                },
                                "framesDecoded": {
                                  "type": "uint32",
                                  "id": 22
                                },
                                "framesDropped": {
                                  "type": "uint32",
                                  "id": 23
                                },
                                "framesPerSecond": {
                                  "type": "double",
                                  "id": 24
                                },
                                "framesReceived": {
                                  "type": "uint32",
                                  "id": 25
                                },
                                "fullFramesLost": {
                                  "type": "uint32",
                                  "id": 26
                                },
                                "gapDiscardRate": {
                                  "type": "double",
                                  "id": 27
                                },
                                "gapLossRate": {
                                  "type": "double",
                                  "id": 28
                                },
                                "headerBytesReceived": {
                                  "type": "uint64",
                                  "id": 29
                                },
                                "jitter": {
                                  "type": "double",
                                  "id": 30
                                },
                                "jitterBufferDelay": {
                                  "type": "double",
                                  "id": 31
                                },
                                "jitterBufferEmittedCount": {
                                  "type": "uint32",
                                  "id": 32
                                },
                                "keyFramesDecoded": {
                                  "type": "uint32",
                                  "id": 33
                                },
                                "lastPacketReceivedTimestamp": {
                                  "type": "uint64",
                                  "id": 34
                                },
                                "mimeType": {
                                  "type": "string",
                                  "id": 35
                                },
                                "nackCount": {
                                  "type": "uint32",
                                  "id": 36
                                },
                                "packetsDiscarded": {
                                  "type": "uint32",
                                  "id": 37
                                },
                                "packetsDuplicated": {
                                  "type": "uint32",
                                  "id": 38
                                },
                                "packetsFailedDecryption": {
                                  "type": "uint32",
                                  "id": 39
                                },
                                "packetsLost": {
                                  "type": "uint32",
                                  "id": 40
                                },
                                "packetsReceived": {
                                  "type": "uint32",
                                  "id": 41
                                },
                                "packetsRepaired": {
                                  "type": "uint32",
                                  "id": 42
                                },
                                "packetsSent": {
                                  "type": "uint32",
                                  "id": 43
                                },
                                "partialFramesLost": {
                                  "type": "uint32",
                                  "id": 44
                                },
                                "payloadType": {
                                  "type": "uint32",
                                  "id": 45
                                },
                                "peerConnectionId": {
                                  "type": "string",
                                  "id": 46
                                },
                                "perDscpPacketsReceived": {
                                  "type": "uint32",
                                  "id": 47
                                },
                                "pliCount": {
                                  "type": "uint32",
                                  "id": 48
                                },
                                "qpSum": {
                                  "type": "uint64",
                                  "id": 49
                                },
                                "remoteClientId": {
                                  "type": "string",
                                  "id": 50
                                },
                                "remoteTimestamp": {
                                  "type": "uint64",
                                  "id": 51
                                },
                                "reportsSent": {
                                  "type": "uint32",
                                  "id": 52
                                },
                                "roundTripTime": {
                                  "type": "double",
                                  "id": 53
                                },
                                "roundTripTimeMeasurements": {
                                  "type": "uint32",
                                  "id": 54
                                },
                                "sdpFmtpLine": {
                                  "type": "string",
                                  "id": 55
                                },
                                "sfuSinkId": {
                                  "type": "string",
                                  "id": 56
                                },
                                "sliCount": {
                                  "type": "uint32",
                                  "id": 57
                                },
                                "totalDecodeTime": {
                                  "type": "double",
                                  "id": 58
                                },
                                "totalInterFrameDelay": {
                                  "type": "double",
                                  "id": 59
                                },
                                "totalProcessingDelay": {
                                  "type": "double",
                                  "id": 60
                                },
                                "totalRoundTripTime": {
                                  "type": "double",
                                  "id": 61
                                },
                                "totalSquaredInterFrameDelay": {
                                  "type": "double",
                                  "id": 62
                                },
                                "trackId": {
                                  "type": "string",
                                  "id": 63
                                }
                              }
                            },
                            "OutboundAudioTrack": {
                              "fields": {
                                "ssrc": {
                                  "rule": "required",
                                  "type": "uint64",
                                  "id": 1
                                },
                                "audioLevel": {
                                  "type": "double",
                                  "id": 2
                                },
                                "averageRtcpInterval": {
                                  "type": "double",
                                  "id": 3
                                },
                                "burstDiscardCount": {
                                  "type": "uint32",
                                  "id": 4
                                },
                                "burstDiscardRate": {
                                  "type": "double",
                                  "id": 5
                                },
                                "burstLossCount": {
                                  "type": "uint32",
                                  "id": 6
                                },
                                "burstLossRate": {
                                  "type": "double",
                                  "id": 7
                                },
                                "burstPacketsDiscarded": {
                                  "type": "uint32",
                                  "id": 8
                                },
                                "burstPacketsLost": {
                                  "type": "uint32",
                                  "id": 9
                                },
                                "bytesDiscardedOnSend": {
                                  "type": "uint64",
                                  "id": 10
                                },
                                "bytesSent": {
                                  "type": "uint64",
                                  "id": 11
                                },
                                "channels": {
                                  "type": "uint32",
                                  "id": 12
                                },
                                "clockRate": {
                                  "type": "uint32",
                                  "id": 13
                                },
                                "echoReturnLoss": {
                                  "type": "double",
                                  "id": 14
                                },
                                "echoReturnLossEnhancement": {
                                  "type": "double",
                                  "id": 15
                                },
                                "encoderImplementation": {
                                  "type": "string",
                                  "id": 16
                                },
                                "ended": {
                                  "type": "bool",
                                  "id": 17
                                },
                                "fecPacketsSent": {
                                  "type": "uint32",
                                  "id": 18
                                },
                                "fractionLost": {
                                  "type": "double",
                                  "id": 19
                                },
                                "gapDiscardRate": {
                                  "type": "double",
                                  "id": 20
                                },
                                "gapLossRate": {
                                  "type": "double",
                                  "id": 21
                                },
                                "headerBytesSent": {
                                  "type": "uint64",
                                  "id": 22
                                },
                                "jitter": {
                                  "type": "double",
                                  "id": 23
                                },
                                "lastPacketSentTimestamp": {
                                  "type": "uint64",
                                  "id": 24
                                },
                                "mimeType": {
                                  "type": "string",
                                  "id": 25
                                },
                                "nackCount": {
                                  "type": "uint32",
                                  "id": 26
                                },
                                "packetsDiscarded": {
                                  "type": "uint32",
                                  "id": 27
                                },
                                "packetsDiscardedOnSend": {
                                  "type": "uint32",
                                  "id": 28
                                },
                                "packetsLost": {
                                  "type": "uint32",
                                  "id": 29
                                },
                                "packetsReceived": {
                                  "type": "uint32",
                                  "id": 30
                                },
                                "packetsRepaired": {
                                  "type": "uint32",
                                  "id": 31
                                },
                                "packetsSent": {
                                  "type": "uint32",
                                  "id": 32
                                },
                                "payloadType": {
                                  "type": "uint32",
                                  "id": 33
                                },
                                "peerConnectionId": {
                                  "type": "string",
                                  "id": 34
                                },
                                "perDscpPacketsSent": {
                                  "type": "uint32",
                                  "id": 35
                                },
                                "relayedSource": {
                                  "type": "bool",
                                  "id": 36
                                },
                                "reportsReceived": {
                                  "type": "uint32",
                                  "id": 37
                                },
                                "retransmittedBytesSent": {
                                  "type": "uint64",
                                  "id": 38
                                },
                                "retransmittedPacketsSent": {
                                  "type": "uint32",
                                  "id": 39
                                },
                                "rid": {
                                  "type": "string",
                                  "id": 40
                                },
                                "roundTripTime": {
                                  "type": "double",
                                  "id": 41
                                },
                                "roundTripTimeMeasurements": {
                                  "type": "uint32",
                                  "id": 42
                                },
                                "rtxSsrc": {
                                  "type": "uint64",
                                  "id": 43
                                },
                                "samplesEncodedWithCelt": {
                                  "type": "uint32",
                                  "id": 44
                                },
                                "samplesEncodedWithSilk": {
                                  "type": "uint32",
                                  "id": 45
                                },
                                "sdpFmtpLine": {
                                  "type": "string",
                                  "id": 46
                                },
                                "sfuStreamId": {
                                  "type": "string",
                                  "id": 47
                                },
                                "targetBitrate": {
                                  "type": "uint32",
                                  "id": 48
                                },
                                "totalAudioEnergy": {
                                  "type": "double",
                                  "id": 49
                                },
                                "totalEncodedBytesTarget": {
                                  "type": "uint64",
                                  "id": 50
                                },
                                "totalPacketSendDelay": {
                                  "type": "double",
                                  "id": 51
                                },
                                "totalRoundTripTime": {
                                  "type": "double",
                                  "id": 52
                                },
                                "totalSamplesDuration": {
                                  "type": "double",
                                  "id": 53
                                },
                                "totalSamplesSent": {
                                  "type": "uint32",
                                  "id": 54
                                },
                                "trackId": {
                                  "type": "string",
                                  "id": 55
                                },
                                "voiceActivityFlag": {
                                  "type": "bool",
                                  "id": 56
                                }
                              }
                            },
                            "OutboundVideoTrack": {
                              "fields": {
                                "ssrc": {
                                  "rule": "required",
                                  "type": "uint64",
                                  "id": 1
                                },
                                "averageRtcpInterval": {
                                  "type": "double",
                                  "id": 2
                                },
                                "bitDepth": {
                                  "type": "uint32",
                                  "id": 3
                                },
                                "burstDiscardCount": {
                                  "type": "uint32",
                                  "id": 4
                                },
                                "burstDiscardRate": {
                                  "type": "double",
                                  "id": 5
                                },
                                "burstLossCount": {
                                  "type": "uint32",
                                  "id": 6
                                },
                                "burstLossRate": {
                                  "type": "double",
                                  "id": 7
                                },
                                "burstPacketsDiscarded": {
                                  "type": "uint32",
                                  "id": 8
                                },
                                "burstPacketsLost": {
                                  "type": "uint32",
                                  "id": 9
                                },
                                "bytesDiscardedOnSend": {
                                  "type": "uint64",
                                  "id": 10
                                },
                                "bytesSent": {
                                  "type": "uint64",
                                  "id": 11
                                },
                                "channels": {
                                  "type": "uint32",
                                  "id": 12
                                },
                                "clockRate": {
                                  "type": "uint32",
                                  "id": 13
                                },
                                "encoderImplementation": {
                                  "type": "string",
                                  "id": 14
                                },
                                "ended": {
                                  "type": "bool",
                                  "id": 15
                                },
                                "fecPacketsSent": {
                                  "type": "uint32",
                                  "id": 16
                                },
                                "firCount": {
                                  "type": "uint32",
                                  "id": 17
                                },
                                "fractionLost": {
                                  "type": "double",
                                  "id": 18
                                },
                                "frameBitDepth": {
                                  "type": "uint32",
                                  "id": 19
                                },
                                "frameHeight": {
                                  "type": "uint32",
                                  "id": 20
                                },
                                "frameWidth": {
                                  "type": "uint32",
                                  "id": 21
                                },
                                "frames": {
                                  "type": "uint32",
                                  "id": 22
                                },
                                "framesDiscardedOnSend": {
                                  "type": "uint32",
                                  "id": 23
                                },
                                "framesDropped": {
                                  "type": "uint32",
                                  "id": 24
                                },
                                "framesEncoded": {
                                  "type": "uint32",
                                  "id": 25
                                },
                                "framesPerSecond": {
                                  "type": "double",
                                  "id": 26
                                },
                                "framesSent": {
                                  "type": "uint32",
                                  "id": 27
                                },
                                "fullFramesLost": {
                                  "type": "uint32",
                                  "id": 28
                                },
                                "gapDiscardRate": {
                                  "type": "double",
                                  "id": 29
                                },
                                "gapLossRate": {
                                  "type": "double",
                                  "id": 30
                                },
                                "headerBytesSent": {
                                  "type": "uint64",
                                  "id": 31
                                },
                                "height": {
                                  "type": "uint32",
                                  "id": 32
                                },
                                "hugeFramesSent": {
                                  "type": "uint32",
                                  "id": 33
                                },
                                "jitter": {
                                  "type": "double",
                                  "id": 34
                                },
                                "keyFramesEncoded": {
                                  "type": "uint32",
                                  "id": 35
                                },
                                "lastPacketSentTimestamp": {
                                  "type": "uint64",
                                  "id": 36
                                },
                                "mimeType": {
                                  "type": "string",
                                  "id": 37
                                },
                                "nackCount": {
                                  "type": "uint32",
                                  "id": 38
                                },
                                "packetsDiscarded": {
                                  "type": "uint32",
                                  "id": 39
                                },
                                "packetsDiscardedOnSend": {
                                  "type": "uint32",
                                  "id": 40
                                },
                                "packetsLost": {
                                  "type": "uint32",
                                  "id": 41
                                },
                                "packetsReceived": {
                                  "type": "uint32",
                                  "id": 42
                                },
                                "packetsRepaired": {
                                  "type": "uint32",
                                  "id": 43
                                },
                                "packetsSent": {
                                  "type": "uint32",
                                  "id": 44
                                },
                                "partialFramesLost": {
                                  "type": "uint32",
                                  "id": 45
                                },
                                "payloadType": {
                                  "type": "uint32",
                                  "id": 46
                                },
                                "peerConnectionId": {
                                  "type": "string",
                                  "id": 47
                                },
                                "perDscpPacketsSent": {
                                  "type": "uint32",
                                  "id": 48
                                },
                                "pliCount": {
                                  "type": "uint32",
                                  "id": 49
                                },
                                "qpSum": {
                                  "type": "uint64",
                                  "id": 50
                                },
                                "qualityLimitationDurationBandwidth": {
                                  "type": "double",
                                  "id": 51
                                },
                                "qualityLimitationDurationCPU": {
                                  "type": "double",
                                  "id": 52
                                },
                                "qualityLimitationDurationNone": {
                                  "type": "double",
                                  "id": 53
                                },
                                "qualityLimitationDurationOther": {
                                  "type": "double",
                                  "id": 54
                                },
                                "qualityLimitationReason": {
                                  "type": "string",
                                  "id": 55
                                },
                                "qualityLimitationResolutionChanges": {
                                  "type": "uint32",
                                  "id": 56
                                },
                                "relayedSource": {
                                  "type": "bool",
                                  "id": 57
                                },
                                "reportsReceived": {
                                  "type": "uint32",
                                  "id": 58
                                },
                                "retransmittedBytesSent": {
                                  "type": "uint64",
                                  "id": 59
                                },
                                "retransmittedPacketsSent": {
                                  "type": "uint32",
                                  "id": 60
                                },
                                "rid": {
                                  "type": "string",
                                  "id": 61
                                },
                                "roundTripTime": {
                                  "type": "double",
                                  "id": 62
                                },
                                "roundTripTimeMeasurements": {
                                  "type": "uint32",
                                  "id": 63
                                },
                                "rtxSsrc": {
                                  "type": "uint64",
                                  "id": 64
                                },
                                "sdpFmtpLine": {
                                  "type": "string",
                                  "id": 65
                                },
                                "sfuStreamId": {
                                  "type": "string",
                                  "id": 66
                                },
                                "sliCount": {
                                  "type": "uint32",
                                  "id": 67
                                },
                                "targetBitrate": {
                                  "type": "uint32",
                                  "id": 68
                                },
                                "totalEncodeTime": {
                                  "type": "double",
                                  "id": 69
                                },
                                "totalEncodedBytesTarget": {
                                  "type": "uint64",
                                  "id": 70
                                },
                                "totalPacketSendDelay": {
                                  "type": "double",
                                  "id": 71
                                },
                                "totalRoundTripTime": {
                                  "type": "double",
                                  "id": 72
                                },
                                "trackId": {
                                  "type": "string",
                                  "id": 73
                                },
                                "width": {
                                  "type": "uint32",
                                  "id": 74
                                }
                              }
                            },
                            "IceLocalCandidate": {
                              "fields": {
                                "address": {
                                  "type": "string",
                                  "id": 1
                                },
                                "candidateType": {
                                  "type": "string",
                                  "id": 2
                                },
                                "id": {
                                  "type": "string",
                                  "id": 3
                                },
                                "peerConnectionId": {
                                  "type": "string",
                                  "id": 4
                                },
                                "port": {
                                  "type": "uint32",
                                  "id": 5
                                },
                                "priority": {
                                  "type": "uint64",
                                  "id": 6
                                },
                                "protocol": {
                                  "type": "string",
                                  "id": 7
                                },
                                "relayProtocol": {
                                  "type": "string",
                                  "id": 8
                                },
                                "url": {
                                  "type": "string",
                                  "id": 9
                                }
                              }
                            },
                            "IceRemoteCandidate": {
                              "fields": {
                                "address": {
                                  "type": "string",
                                  "id": 1
                                },
                                "candidateType": {
                                  "type": "string",
                                  "id": 2
                                },
                                "id": {
                                  "type": "string",
                                  "id": 3
                                },
                                "peerConnectionId": {
                                  "type": "string",
                                  "id": 4
                                },
                                "port": {
                                  "type": "uint32",
                                  "id": 5
                                },
                                "priority": {
                                  "type": "uint64",
                                  "id": 6
                                },
                                "protocol": {
                                  "type": "string",
                                  "id": 7
                                },
                                "relayProtocol": {
                                  "type": "string",
                                  "id": 8
                                },
                                "url": {
                                  "type": "string",
                                  "id": 9
                                }
                              }
                            },
                            "DataChannel": {
                              "fields": {
                                "address": {
                                  "type": "string",
                                  "id": 1
                                },
                                "bytesReceived": {
                                  "type": "uint64",
                                  "id": 2
                                },
                                "bytesSent": {
                                  "type": "uint64",
                                  "id": 3
                                },
                                "dataChannelIdentifier": {
                                  "type": "uint32",
                                  "id": 4
                                },
                                "id": {
                                  "type": "string",
                                  "id": 5
                                },
                                "label": {
                                  "type": "string",
                                  "id": 6
                                },
                                "messagesReceived": {
                                  "type": "uint32",
                                  "id": 7
                                },
                                "messagesSent": {
                                  "type": "uint32",
                                  "id": 8
                                },
                                "peerConnectionId": {
                                  "type": "string",
                                  "id": 9
                                },
                                "port": {
                                  "type": "uint32",
                                  "id": 10
                                },
                                "protocol": {
                                  "type": "string",
                                  "id": 11
                                },
                                "state": {
                                  "type": "string",
                                  "id": 12
                                }
                              }
                            }
                          }
                        },
                        "SfuSample": {
                          "fields": {
                            "extensionStats": {
                              "rule": "repeated",
                              "type": "SfuExtensionStats",
                              "id": 1
                            },
                            "inboundRtpPads": {
                              "rule": "repeated",
                              "type": "SfuInboundRtpPad",
                              "id": 2
                            },
                            "outboundRtpPads": {
                              "rule": "repeated",
                              "type": "SfuOutboundRtpPad",
                              "id": 3
                            },
                            "sctpChannels": {
                              "rule": "repeated",
                              "type": "SfuSctpChannel",
                              "id": 4
                            },
                            "transports": {
                              "rule": "repeated",
                              "type": "SfuTransport",
                              "id": 5
                            },
                            "sfuId": {
                              "rule": "required",
                              "type": "string",
                              "id": 6
                            },
                            "timestamp": {
                              "rule": "required",
                              "type": "uint64",
                              "id": 7
                            },
                            "marker": {
                              "type": "string",
                              "id": 8
                            },
                            "timeZoneOffsetInHours": {
                              "type": "uint32",
                              "id": 9
                            }
                          },
                          "nested": {
                            "SfuTransport": {
                              "fields": {
                                "transportId": {
                                  "rule": "required",
                                  "type": "string",
                                  "id": 1
                                },
                                "dtlsState": {
                                  "type": "string",
                                  "id": 2
                                },
                                "iceRole": {
                                  "type": "string",
                                  "id": 3
                                },
                                "iceState": {
                                  "type": "string",
                                  "id": 4
                                },
                                "internal": {
                                  "type": "bool",
                                  "id": 5
                                },
                                "localAddress": {
                                  "type": "string",
                                  "id": 6
                                },
                                "localPort": {
                                  "type": "uint32",
                                  "id": 7
                                },
                                "noReport": {
                                  "type": "bool",
                                  "id": 8
                                },
                                "protocol": {
                                  "type": "string",
                                  "id": 9
                                },
                                "remoteAddress": {
                                  "type": "string",
                                  "id": 10
                                },
                                "remotePort": {
                                  "type": "uint32",
                                  "id": 11
                                },
                                "rtpBytesReceived": {
                                  "type": "uint64",
                                  "id": 12
                                },
                                "rtpBytesSent": {
                                  "type": "uint64",
                                  "id": 13
                                },
                                "rtpPacketsLost": {
                                  "type": "uint32",
                                  "id": 14
                                },
                                "rtpPacketsReceived": {
                                  "type": "uint32",
                                  "id": 15
                                },
                                "rtpPacketsSent": {
                                  "type": "uint32",
                                  "id": 16
                                },
                                "rtxBytesReceived": {
                                  "type": "uint64",
                                  "id": 17
                                },
                                "rtxBytesSent": {
                                  "type": "uint64",
                                  "id": 18
                                },
                                "rtxPacketsDiscarded": {
                                  "type": "uint32",
                                  "id": 19
                                },
                                "rtxPacketsLost": {
                                  "type": "uint32",
                                  "id": 20
                                },
                                "rtxPacketsReceived": {
                                  "type": "uint32",
                                  "id": 21
                                },
                                "rtxPacketsSent": {
                                  "type": "uint32",
                                  "id": 22
                                },
                                "sctpBytesReceived": {
                                  "type": "uint64",
                                  "id": 23
                                },
                                "sctpBytesSent": {
                                  "type": "uint64",
                                  "id": 24
                                },
                                "sctpPacketsReceived": {
                                  "type": "uint32",
                                  "id": 25
                                },
                                "sctpPacketsSent": {
                                  "type": "uint32",
                                  "id": 26
                                },
                                "sctpState": {
                                  "type": "string",
                                  "id": 27
                                }
                              }
                            },
                            "SfuInboundRtpPad": {
                              "fields": {
                                "padId": {
                                  "rule": "required",
                                  "type": "string",
                                  "id": 1
                                },
                                "ssrc": {
                                  "rule": "required",
                                  "type": "uint64",
                                  "id": 2
                                },
                                "streamId": {
                                  "rule": "required",
                                  "type": "string",
                                  "id": 3
                                },
                                "transportId": {
                                  "rule": "required",
                                  "type": "string",
                                  "id": 4
                                },
                                "bytesReceived": {
                                  "type": "uint64",
                                  "id": 5
                                },
                                "clockRate": {
                                  "type": "uint32",
                                  "id": 6
                                },
                                "fecPacketsDiscarded": {
                                  "type": "uint32",
                                  "id": 7
                                },
                                "fecPacketsReceived": {
                                  "type": "uint32",
                                  "id": 8
                                },
                                "firCount": {
                                  "type": "uint32",
                                  "id": 9
                                },
                                "fractionLost": {
                                  "type": "double",
                                  "id": 10
                                },
                                "framesDecoded": {
                                  "type": "uint32",
                                  "id": 11
                                },
                                "framesReceived": {
                                  "type": "uint32",
                                  "id": 12
                                },
                                "internal": {
                                  "type": "bool",
                                  "id": 13
                                },
                                "jitter": {
                                  "type": "double",
                                  "id": 14
                                },
                                "keyFramesDecoded": {
                                  "type": "uint32",
                                  "id": 15
                                },
                                "mediaType": {
                                  "type": "string",
                                  "id": 16
                                },
                                "mimeType": {
                                  "type": "string",
                                  "id": 17
                                },
                                "nackCount": {
                                  "type": "uint32",
                                  "id": 18
                                },
                                "noReport": {
                                  "type": "bool",
                                  "id": 19
                                },
                                "packetsDiscarded": {
                                  "type": "uint32",
                                  "id": 20
                                },
                                "packetsDuplicated": {
                                  "type": "uint32",
                                  "id": 21
                                },
                                "packetsFailedDecryption": {
                                  "type": "uint32",
                                  "id": 22
                                },
                                "packetsLost": {
                                  "type": "uint32",
                                  "id": 23
                                },
                                "packetsReceived": {
                                  "type": "uint32",
                                  "id": 24
                                },
                                "packetsRepaired": {
                                  "type": "uint32",
                                  "id": 25
                                },
                                "payloadType": {
                                  "type": "uint32",
                                  "id": 26
                                },
                                "pliCount": {
                                  "type": "uint32",
                                  "id": 27
                                },
                                "rid": {
                                  "type": "string",
                                  "id": 28
                                },
                                "roundTripTime": {
                                  "type": "double",
                                  "id": 29
                                },
                                "rtcpRrSent": {
                                  "type": "uint32",
                                  "id": 30
                                },
                                "rtcpSrReceived": {
                                  "type": "uint32",
                                  "id": 31
                                },
                                "rtxPacketsDiscarded": {
                                  "type": "uint32",
                                  "id": 32
                                },
                                "rtxPacketsReceived": {
                                  "type": "uint32",
                                  "id": 33
                                },
                                "rtxSsrc": {
                                  "type": "uint64",
                                  "id": 34
                                },
                                "sdpFmtpLine": {
                                  "type": "string",
                                  "id": 35
                                },
                                "sliCount": {
                                  "type": "uint32",
                                  "id": 36
                                },
                                "targetBitrate": {
                                  "type": "uint32",
                                  "id": 37
                                },
                                "voiceActivityFlag": {
                                  "type": "bool",
                                  "id": 38
                                }
                              }
                            },
                            "SfuOutboundRtpPad": {
                              "fields": {
                                "padId": {
                                  "rule": "required",
                                  "type": "string",
                                  "id": 1
                                },
                                "sinkId": {
                                  "rule": "required",
                                  "type": "string",
                                  "id": 2
                                },
                                "ssrc": {
                                  "rule": "required",
                                  "type": "uint64",
                                  "id": 3
                                },
                                "streamId": {
                                  "rule": "required",
                                  "type": "string",
                                  "id": 4
                                },
                                "transportId": {
                                  "rule": "required",
                                  "type": "string",
                                  "id": 5
                                },
                                "bytesSent": {
                                  "type": "uint64",
                                  "id": 6
                                },
                                "callId": {
                                  "type": "string",
                                  "id": 7
                                },
                                "clientId": {
                                  "type": "string",
                                  "id": 8
                                },
                                "clockRate": {
                                  "type": "uint32",
                                  "id": 9
                                },
                                "fecPacketsDiscarded": {
                                  "type": "uint32",
                                  "id": 10
                                },
                                "fecPacketsSent": {
                                  "type": "uint32",
                                  "id": 11
                                },
                                "firCount": {
                                  "type": "uint32",
                                  "id": 12
                                },
                                "fractionLost": {
                                  "type": "double",
                                  "id": 13
                                },
                                "framesEncoded": {
                                  "type": "uint32",
                                  "id": 14
                                },
                                "framesSent": {
                                  "type": "uint32",
                                  "id": 15
                                },
                                "internal": {
                                  "type": "bool",
                                  "id": 16
                                },
                                "jitter": {
                                  "type": "double",
                                  "id": 17
                                },
                                "keyFramesEncoded": {
                                  "type": "uint32",
                                  "id": 18
                                },
                                "mediaType": {
                                  "type": "string",
                                  "id": 19
                                },
                                "mimeType": {
                                  "type": "string",
                                  "id": 20
                                },
                                "nackCount": {
                                  "type": "uint32",
                                  "id": 21
                                },
                                "noReport": {
                                  "type": "bool",
                                  "id": 22
                                },
                                "packetsDiscarded": {
                                  "type": "uint32",
                                  "id": 23
                                },
                                "packetsDuplicated": {
                                  "type": "uint32",
                                  "id": 24
                                },
                                "packetsFailedEncryption": {
                                  "type": "uint32",
                                  "id": 25
                                },
                                "packetsLost": {
                                  "type": "uint32",
                                  "id": 26
                                },
                                "packetsRetransmitted": {
                                  "type": "uint32",
                                  "id": 27
                                },
                                "packetsSent": {
                                  "type": "uint32",
                                  "id": 28
                                },
                                "payloadType": {
                                  "type": "uint32",
                                  "id": 29
                                },
                                "pliCount": {
                                  "type": "uint32",
                                  "id": 30
                                },
                                "rid": {
                                  "type": "string",
                                  "id": 31
                                },
                                "roundTripTime": {
                                  "type": "double",
                                  "id": 32
                                },
                                "rtcpRrReceived": {
                                  "type": "uint32",
                                  "id": 33
                                },
                                "rtcpSrSent": {
                                  "type": "uint32",
                                  "id": 34
                                },
                                "rtxPacketsDiscarded": {
                                  "type": "uint32",
                                  "id": 35
                                },
                                "rtxPacketsSent": {
                                  "type": "uint32",
                                  "id": 36
                                },
                                "rtxSsrc": {
                                  "type": "uint64",
                                  "id": 37
                                },
                                "sdpFmtpLine": {
                                  "type": "string",
                                  "id": 38
                                },
                                "sliCount": {
                                  "type": "uint32",
                                  "id": 39
                                },
                                "targetBitrate": {
                                  "type": "uint32",
                                  "id": 40
                                },
                                "trackId": {
                                  "type": "string",
                                  "id": 41
                                },
                                "voiceActivityFlag": {
                                  "type": "bool",
                                  "id": 42
                                }
                              }
                            },
                            "SfuSctpChannel": {
                              "fields": {
                                "channelId": {
                                  "rule": "required",
                                  "type": "string",
                                  "id": 1
                                },
                                "streamId": {
                                  "rule": "required",
                                  "type": "string",
                                  "id": 2
                                },
                                "transportId": {
                                  "rule": "required",
                                  "type": "string",
                                  "id": 3
                                },
                                "bytesReceived": {
                                  "type": "uint64",
                                  "id": 4
                                },
                                "bytesSent": {
                                  "type": "uint64",
                                  "id": 5
                                },
                                "label": {
                                  "type": "string",
                                  "id": 6
                                },
                                "messageReceived": {
                                  "type": "uint32",
                                  "id": 7
                                },
                                "messageSent": {
                                  "type": "uint32",
                                  "id": 8
                                },
                                "noReport": {
                                  "type": "bool",
                                  "id": 9
                                },
                                "protocol": {
                                  "type": "string",
                                  "id": 10
                                },
                                "sctpCongestionWindow": {
                                  "type": "double",
                                  "id": 11
                                },
                                "sctpMtu": {
                                  "type": "uint32",
                                  "id": 12
                                },
                                "sctpReceiverWindow": {
                                  "type": "double",
                                  "id": 13
                                },
                                "sctpSmoothedRoundTripTime": {
                                  "type": "double",
                                  "id": 14
                                },
                                "sctpUnackData": {
                                  "type": "uint32",
                                  "id": 15
                                }
                              }
                            },
                            "SfuExtensionStats": {
                              "fields": {
                                "payload": {
                                  "rule": "required",
                                  "type": "string",
                                  "id": 1
                                },
                                "type": {
                                  "rule": "required",
                                  "type": "string",
                                  "id": 2
                                }
                              }
                            }
                          }
                        },
                        "TurnSample": {
                          "fields": {
                            "sessions": {
                              "rule": "repeated",
                              "type": "TurnSession",
                              "id": 1
                            },
                            "serverId": {
                              "rule": "required",
                              "type": "string",
                              "id": 2
                            }
                          },
                          "nested": {
                            "TurnSession": {
                              "fields": {
                                "sessionId": {
                                  "rule": "required",
                                  "type": "string",
                                  "id": 1
                                },
                                "averageReceivingBitrateFromClient": {
                                  "type": "uint32",
                                  "id": 2
                                },
                                "averageReceivingBitrateFromPeer": {
                                  "type": "uint32",
                                  "id": 3
                                },
                                "averageSendingBitrateToClient": {
                                  "type": "uint32",
                                  "id": 4
                                },
                                "averageSendingBitrateToPeer": {
                                  "type": "uint32",
                                  "id": 5
                                },
                                "clientId": {
                                  "type": "string",
                                  "id": 6
                                },
                                "clientTransportProtocol": {
                                  "type": "string",
                                  "id": 7
                                },
                                "nonceExpirationTime": {
                                  "type": "uint64",
                                  "id": 8
                                },
                                "peerAddress": {
                                  "type": "string",
                                  "id": 9
                                },
                                "peerPort": {
                                  "type": "uint32",
                                  "id": 10
                                },
                                "realm": {
                                  "type": "string",
                                  "id": 11
                                },
                                "receivedBytesFromClient": {
                                  "type": "uint64",
                                  "id": 12
                                },
                                "receivedBytesFromPeer": {
                                  "type": "uint64",
                                  "id": 13
                                },
                                "receivedPacketsFromClient": {
                                  "type": "uint32",
                                  "id": 14
                                },
                                "receivedPacketsFromPeer": {
                                  "type": "uint32",
                                  "id": 15
                                },
                                "relayTransportProtocol": {
                                  "type": "string",
                                  "id": 16
                                },
                                "sentBytesToClient": {
                                  "type": "uint64",
                                  "id": 17
                                },
                                "sentBytesToPeer": {
                                  "type": "uint64",
                                  "id": 18
                                },
                                "sentPacketsToClient": {
                                  "type": "uint32",
                                  "id": 19
                                },
                                "sentPacketsToPeer": {
                                  "type": "uint32",
                                  "id": 20
                                },
                                "serverAddress": {
                                  "type": "string",
                                  "id": 21
                                },
                                "serverPort": {
                                  "type": "uint32",
                                  "id": 22
                                },
                                "started": {
                                  "type": "uint64",
                                  "id": 23
                                },
                                "username": {
                                  "type": "string",
                                  "id": 24
                                }
                              }
                            }
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }
};