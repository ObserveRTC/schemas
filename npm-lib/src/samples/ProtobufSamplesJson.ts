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
                        "controls": {
                          "type": "Controls",
                          "id": 4
                        }
                      },
                      "nested": {
                        "Controls": {
                          "fields": {
                            "accessClaim": {
                              "type": "string",
                              "id": 1
                            },
                            "close": {
                              "type": "bool",
                              "id": 2
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
                            "customCallEvents": {
                              "rule": "repeated",
                              "type": "CustomCallEvent",
                              "id": 3
                            },
                            "customObserverEvents": {
                              "rule": "repeated",
                              "type": "CustomObserverEvent",
                              "id": 4
                            },
                            "dataChannels": {
                              "rule": "repeated",
                              "type": "DataChannel",
                              "id": 5
                            },
                            "extensionStats": {
                              "rule": "repeated",
                              "type": "ExtensionStat",
                              "id": 6
                            },
                            "iceCandidatePairs": {
                              "rule": "repeated",
                              "type": "IceCandidatePair",
                              "id": 7
                            },
                            "iceLocalCandidates": {
                              "rule": "repeated",
                              "type": "IceLocalCandidate",
                              "id": 8
                            },
                            "iceRemoteCandidates": {
                              "rule": "repeated",
                              "type": "IceRemoteCandidate",
                              "id": 9
                            },
                            "iceServers": {
                              "rule": "repeated",
                              "type": "string",
                              "id": 10
                            },
                            "inboundAudioTracks": {
                              "rule": "repeated",
                              "type": "InboundAudioTrack",
                              "id": 11
                            },
                            "inboundVideoTracks": {
                              "rule": "repeated",
                              "type": "InboundVideoTrack",
                              "id": 12
                            },
                            "localSDPs": {
                              "rule": "repeated",
                              "type": "string",
                              "id": 13
                            },
                            "mediaConstraints": {
                              "rule": "repeated",
                              "type": "string",
                              "id": 14
                            },
                            "mediaDevices": {
                              "rule": "repeated",
                              "type": "MediaDevice",
                              "id": 15
                            },
                            "mediaSources": {
                              "rule": "repeated",
                              "type": "MediaSourceStat",
                              "id": 16
                            },
                            "outboundAudioTracks": {
                              "rule": "repeated",
                              "type": "OutboundAudioTrack",
                              "id": 17
                            },
                            "outboundVideoTracks": {
                              "rule": "repeated",
                              "type": "OutboundVideoTrack",
                              "id": 18
                            },
                            "pcTransports": {
                              "rule": "repeated",
                              "type": "PeerConnectionTransport",
                              "id": 19
                            },
                            "userMediaErrors": {
                              "rule": "repeated",
                              "type": "string",
                              "id": 20
                            },
                            "clientId": {
                              "rule": "required",
                              "type": "string",
                              "id": 21
                            },
                            "timestamp": {
                              "rule": "required",
                              "type": "int64",
                              "id": 22
                            },
                            "browser": {
                              "type": "Browser",
                              "id": 23
                            },
                            "callId": {
                              "type": "string",
                              "id": 24
                            },
                            "engine": {
                              "type": "Engine",
                              "id": 25
                            },
                            "marker": {
                              "type": "string",
                              "id": 26
                            },
                            "os": {
                              "type": "OperationSystem",
                              "id": 27
                            },
                            "platform": {
                              "type": "Platform",
                              "id": 28
                            },
                            "roomId": {
                              "type": "string",
                              "id": 29
                            },
                            "sampleSeq": {
                              "type": "int32",
                              "id": 30
                            },
                            "timeZoneOffsetInHours": {
                              "type": "int32",
                              "id": 31
                            },
                            "userId": {
                              "type": "string",
                              "id": 32
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
                            "CustomCallEvent": {
                              "fields": {
                                "name": {
                                  "rule": "required",
                                  "type": "string",
                                  "id": 1
                                },
                                "attachments": {
                                  "type": "string",
                                  "id": 2
                                },
                                "mediaTrackId": {
                                  "type": "string",
                                  "id": 3
                                },
                                "message": {
                                  "type": "string",
                                  "id": 4
                                },
                                "peerConnectionId": {
                                  "type": "string",
                                  "id": 5
                                },
                                "timestamp": {
                                  "type": "int64",
                                  "id": 6
                                },
                                "value": {
                                  "type": "string",
                                  "id": 7
                                }
                              }
                            },
                            "CustomObserverEvent": {
                              "fields": {
                                "name": {
                                  "rule": "required",
                                  "type": "string",
                                  "id": 1
                                },
                                "attachments": {
                                  "type": "string",
                                  "id": 2
                                },
                                "mediaTrackId": {
                                  "type": "string",
                                  "id": 3
                                },
                                "message": {
                                  "type": "string",
                                  "id": 4
                                },
                                "timestamp": {
                                  "type": "int64",
                                  "id": 5
                                }
                              }
                            },
                            "DataChannel": {
                              "fields": {
                                "peerConnectionId": {
                                  "rule": "required",
                                  "type": "string",
                                  "id": 1
                                },
                                "bytesReceived": {
                                  "type": "int64",
                                  "id": 2
                                },
                                "bytesSent": {
                                  "type": "int64",
                                  "id": 3
                                },
                                "dataChannelIdentifier": {
                                  "type": "int32",
                                  "id": 4
                                },
                                "label": {
                                  "type": "string",
                                  "id": 5
                                },
                                "messageReceived": {
                                  "type": "int32",
                                  "id": 6
                                },
                                "messageSent": {
                                  "type": "int32",
                                  "id": 7
                                },
                                "protocol": {
                                  "type": "string",
                                  "id": 8
                                },
                                "state": {
                                  "type": "string",
                                  "id": 9
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
                                "transportId": {
                                  "rule": "required",
                                  "type": "string",
                                  "id": 2
                                },
                                "bytesReceived": {
                                  "type": "int64",
                                  "id": 3
                                },
                                "bytesSent": {
                                  "type": "int64",
                                  "id": 4
                                },
                                "dtlsCipher": {
                                  "type": "string",
                                  "id": 5
                                },
                                "dtlsRole": {
                                  "type": "string",
                                  "id": 6
                                },
                                "dtlsState": {
                                  "type": "string",
                                  "id": 7
                                },
                                "iceLocalUsernameFragment": {
                                  "type": "string",
                                  "id": 8
                                },
                                "iceRole": {
                                  "type": "string",
                                  "id": 9
                                },
                                "iceState": {
                                  "type": "string",
                                  "id": 10
                                },
                                "label": {
                                  "type": "string",
                                  "id": 11
                                },
                                "localCertificateId": {
                                  "type": "string",
                                  "id": 12
                                },
                                "packetsReceived": {
                                  "type": "int32",
                                  "id": 13
                                },
                                "packetsSent": {
                                  "type": "int32",
                                  "id": 14
                                },
                                "remoteCertificateId": {
                                  "type": "string",
                                  "id": 15
                                },
                                "selectedCandidatePairChanges": {
                                  "type": "int32",
                                  "id": 16
                                },
                                "selectedCandidatePairId": {
                                  "type": "string",
                                  "id": 17
                                },
                                "srtpCipher": {
                                  "type": "string",
                                  "id": 18
                                },
                                "tlsGroup": {
                                  "type": "string",
                                  "id": 19
                                },
                                "tlsVersion": {
                                  "type": "string",
                                  "id": 20
                                }
                              }
                            },
                            "IceCandidatePair": {
                              "fields": {
                                "candidatePairId": {
                                  "rule": "required",
                                  "type": "string",
                                  "id": 1
                                },
                                "peerConnectionId": {
                                  "rule": "required",
                                  "type": "string",
                                  "id": 2
                                },
                                "availableIncomingBitrate": {
                                  "type": "double",
                                  "id": 3
                                },
                                "availableOutgoingBitrate": {
                                  "type": "double",
                                  "id": 4
                                },
                                "bytesDiscardedOnSend": {
                                  "type": "int64",
                                  "id": 5
                                },
                                "bytesReceived": {
                                  "type": "int64",
                                  "id": 6
                                },
                                "bytesSent": {
                                  "type": "int64",
                                  "id": 7
                                },
                                "consentRequestsSent": {
                                  "type": "int32",
                                  "id": 8
                                },
                                "currentRoundTripTime": {
                                  "type": "double",
                                  "id": 9
                                },
                                "label": {
                                  "type": "string",
                                  "id": 10
                                },
                                "lastPacketReceivedTimestamp": {
                                  "type": "int64",
                                  "id": 11
                                },
                                "lastPacketSentTimestamp": {
                                  "type": "int64",
                                  "id": 12
                                },
                                "localCandidateId": {
                                  "type": "string",
                                  "id": 13
                                },
                                "nominated": {
                                  "type": "bool",
                                  "id": 14
                                },
                                "packetsDiscardedOnSend": {
                                  "type": "int32",
                                  "id": 15
                                },
                                "packetsReceived": {
                                  "type": "int32",
                                  "id": 16
                                },
                                "packetsSent": {
                                  "type": "int32",
                                  "id": 17
                                },
                                "remoteCandidateId": {
                                  "type": "string",
                                  "id": 18
                                },
                                "requestsReceived": {
                                  "type": "int32",
                                  "id": 19
                                },
                                "requestsSent": {
                                  "type": "int32",
                                  "id": 20
                                },
                                "responsesReceived": {
                                  "type": "int32",
                                  "id": 21
                                },
                                "responsesSent": {
                                  "type": "int32",
                                  "id": 22
                                },
                                "state": {
                                  "type": "string",
                                  "id": 23
                                },
                                "totalRoundTripTime": {
                                  "type": "double",
                                  "id": 24
                                },
                                "transportId": {
                                  "type": "string",
                                  "id": 25
                                }
                              }
                            },
                            "MediaSourceStat": {
                              "fields": {
                                "audioLevel": {
                                  "type": "double",
                                  "id": 1
                                },
                                "droppedSamplesDuration": {
                                  "type": "double",
                                  "id": 2
                                },
                                "droppedSamplesEvents": {
                                  "type": "int32",
                                  "id": 3
                                },
                                "echoReturnLoss": {
                                  "type": "double",
                                  "id": 4
                                },
                                "echoReturnLossEnhancement": {
                                  "type": "double",
                                  "id": 5
                                },
                                "frames": {
                                  "type": "int32",
                                  "id": 6
                                },
                                "framesPerSecond": {
                                  "type": "double",
                                  "id": 7
                                },
                                "height": {
                                  "type": "int32",
                                  "id": 8
                                },
                                "kind": {
                                  "type": "string",
                                  "id": 9
                                },
                                "relayedSource": {
                                  "type": "bool",
                                  "id": 10
                                },
                                "totalAudioEnergy": {
                                  "type": "double",
                                  "id": 11
                                },
                                "totalCaptureDelay": {
                                  "type": "double",
                                  "id": 12
                                },
                                "totalSamplesCaptured": {
                                  "type": "double",
                                  "id": 13
                                },
                                "totalSamplesDuration": {
                                  "type": "double",
                                  "id": 14
                                },
                                "trackIdentifier": {
                                  "type": "string",
                                  "id": 15
                                },
                                "width": {
                                  "type": "int32",
                                  "id": 16
                                }
                              }
                            },
                            "MediaCodecStats": {
                              "fields": {
                                "channels": {
                                  "type": "int32",
                                  "id": 1
                                },
                                "clockRate": {
                                  "type": "int32",
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
                                  "type": "int64",
                                  "id": 1
                                },
                                "audioLevel": {
                                  "type": "int32",
                                  "id": 2
                                },
                                "bytesReceived": {
                                  "type": "int64",
                                  "id": 3
                                },
                                "bytesSent": {
                                  "type": "int64",
                                  "id": 4
                                },
                                "concealedSamples": {
                                  "type": "int32",
                                  "id": 5
                                },
                                "concealmentEvents": {
                                  "type": "int32",
                                  "id": 6
                                },
                                "decoderImplementation": {
                                  "type": "string",
                                  "id": 7
                                },
                                "estimatedPlayoutTimestamp": {
                                  "type": "int64",
                                  "id": 8
                                },
                                "fecPacketsDiscarded": {
                                  "type": "int32",
                                  "id": 9
                                },
                                "fecPacketsReceived": {
                                  "type": "int32",
                                  "id": 10
                                },
                                "headerBytesReceived": {
                                  "type": "int64",
                                  "id": 11
                                },
                                "insertedSamplesForDeceleration": {
                                  "type": "int32",
                                  "id": 12
                                },
                                "jitter": {
                                  "type": "double",
                                  "id": 13
                                },
                                "jitterBufferDelay": {
                                  "type": "double",
                                  "id": 14
                                },
                                "jitterBufferEmittedCount": {
                                  "type": "int32",
                                  "id": 15
                                },
                                "jitterBufferMinimumDelay": {
                                  "type": "double",
                                  "id": 16
                                },
                                "jitterBufferTargetDelay": {
                                  "type": "double",
                                  "id": 17
                                },
                                "lastPacketReceivedTimestamp": {
                                  "type": "int64",
                                  "id": 18
                                },
                                "nackCount": {
                                  "type": "int32",
                                  "id": 19
                                },
                                "packetsDiscarded": {
                                  "type": "int32",
                                  "id": 20
                                },
                                "packetsLost": {
                                  "type": "int32",
                                  "id": 21
                                },
                                "packetsReceived": {
                                  "type": "int32",
                                  "id": 22
                                },
                                "packetsSent": {
                                  "type": "int32",
                                  "id": 23
                                },
                                "peerConnectionId": {
                                  "type": "string",
                                  "id": 24
                                },
                                "remoteClientId": {
                                  "type": "string",
                                  "id": 25
                                },
                                "remoteTimestamp": {
                                  "type": "int64",
                                  "id": 26
                                },
                                "removedSamplesForAcceleration": {
                                  "type": "int32",
                                  "id": 27
                                },
                                "reportsSent": {
                                  "type": "int32",
                                  "id": 28
                                },
                                "roundTripTime": {
                                  "type": "double",
                                  "id": 29
                                },
                                "roundTripTimeMeasurements": {
                                  "type": "int32",
                                  "id": 30
                                },
                                "sfuSinkId": {
                                  "type": "string",
                                  "id": 31
                                },
                                "sfuStreamId": {
                                  "type": "string",
                                  "id": 32
                                },
                                "silentConcealedSamples": {
                                  "type": "int32",
                                  "id": 33
                                },
                                "synthesizedSamplesDuration": {
                                  "type": "int32",
                                  "id": 34
                                },
                                "synthesizedSamplesEvents": {
                                  "type": "int32",
                                  "id": 35
                                },
                                "totalAudioEnergy": {
                                  "type": "int32",
                                  "id": 36
                                },
                                "totalPlayoutDelay": {
                                  "type": "double",
                                  "id": 37
                                },
                                "totalProcessingDelay": {
                                  "type": "double",
                                  "id": 38
                                },
                                "totalRoundTripTime": {
                                  "type": "double",
                                  "id": 39
                                },
                                "totalSamplesCount": {
                                  "type": "int32",
                                  "id": 40
                                },
                                "totalSamplesDuration": {
                                  "type": "int32",
                                  "id": 41
                                },
                                "totalSamplesReceived": {
                                  "type": "int32",
                                  "id": 42
                                },
                                "trackId": {
                                  "type": "string",
                                  "id": 43
                                }
                              }
                            },
                            "InboundVideoTrack": {
                              "fields": {
                                "ssrc": {
                                  "rule": "required",
                                  "type": "int64",
                                  "id": 1
                                },
                                "bytesReceived": {
                                  "type": "int64",
                                  "id": 2
                                },
                                "bytesSent": {
                                  "type": "int64",
                                  "id": 3
                                },
                                "decoderImplementation": {
                                  "type": "string",
                                  "id": 4
                                },
                                "estimatedPlayoutTimestamp": {
                                  "type": "int64",
                                  "id": 5
                                },
                                "fecPacketsDiscarded": {
                                  "type": "int32",
                                  "id": 6
                                },
                                "fecPacketsReceived": {
                                  "type": "int32",
                                  "id": 7
                                },
                                "firCount": {
                                  "type": "int32",
                                  "id": 8
                                },
                                "frameHeight": {
                                  "type": "int32",
                                  "id": 9
                                },
                                "frameWidth": {
                                  "type": "int32",
                                  "id": 10
                                },
                                "framesDecoded": {
                                  "type": "int32",
                                  "id": 11
                                },
                                "framesDropped": {
                                  "type": "int32",
                                  "id": 12
                                },
                                "framesPerSecond": {
                                  "type": "double",
                                  "id": 13
                                },
                                "framesReceived": {
                                  "type": "int32",
                                  "id": 14
                                },
                                "headerBytesReceived": {
                                  "type": "int64",
                                  "id": 15
                                },
                                "jitter": {
                                  "type": "double",
                                  "id": 16
                                },
                                "jitterBufferDelay": {
                                  "type": "double",
                                  "id": 17
                                },
                                "jitterBufferEmittedCount": {
                                  "type": "int32",
                                  "id": 18
                                },
                                "jitterBufferMinimumDelay": {
                                  "type": "double",
                                  "id": 19
                                },
                                "jitterBufferTargetDelay": {
                                  "type": "double",
                                  "id": 20
                                },
                                "keyFramesDecoded": {
                                  "type": "int32",
                                  "id": 21
                                },
                                "lastPacketReceivedTimestamp": {
                                  "type": "int64",
                                  "id": 22
                                },
                                "nackCount": {
                                  "type": "int32",
                                  "id": 23
                                },
                                "packetsDiscarded": {
                                  "type": "int32",
                                  "id": 24
                                },
                                "packetsLost": {
                                  "type": "int32",
                                  "id": 25
                                },
                                "packetsReceived": {
                                  "type": "int32",
                                  "id": 26
                                },
                                "packetsSent": {
                                  "type": "int32",
                                  "id": 27
                                },
                                "peerConnectionId": {
                                  "type": "string",
                                  "id": 28
                                },
                                "pliCount": {
                                  "type": "int32",
                                  "id": 29
                                },
                                "qpSum": {
                                  "type": "int64",
                                  "id": 30
                                },
                                "remoteClientId": {
                                  "type": "string",
                                  "id": 31
                                },
                                "remoteTimestamp": {
                                  "type": "int64",
                                  "id": 32
                                },
                                "reportsSent": {
                                  "type": "int32",
                                  "id": 33
                                },
                                "roundTripTime": {
                                  "type": "double",
                                  "id": 34
                                },
                                "roundTripTimeMeasurements": {
                                  "type": "int32",
                                  "id": 35
                                },
                                "sfuSinkId": {
                                  "type": "string",
                                  "id": 36
                                },
                                "sfuStreamId": {
                                  "type": "string",
                                  "id": 37
                                },
                                "totalDecodeTime": {
                                  "type": "double",
                                  "id": 38
                                },
                                "totalInterFrameDelay": {
                                  "type": "double",
                                  "id": 39
                                },
                                "totalProcessingDelay": {
                                  "type": "double",
                                  "id": 40
                                },
                                "totalRoundTripTime": {
                                  "type": "double",
                                  "id": 41
                                },
                                "totalSquaredInterFrameDelay": {
                                  "type": "double",
                                  "id": 42
                                },
                                "trackId": {
                                  "type": "string",
                                  "id": 43
                                }
                              }
                            },
                            "OutboundAudioTrack": {
                              "fields": {
                                "ssrc": {
                                  "rule": "required",
                                  "type": "int64",
                                  "id": 1
                                },
                                "active": {
                                  "type": "bool",
                                  "id": 2
                                },
                                "audioLevel": {
                                  "type": "double",
                                  "id": 3
                                },
                                "averageRtcpInterval": {
                                  "type": "double",
                                  "id": 4
                                },
                                "bytesSent": {
                                  "type": "int64",
                                  "id": 5
                                },
                                "droppedSamplesDuration": {
                                  "type": "double",
                                  "id": 6
                                },
                                "droppedSamplesEvents": {
                                  "type": "int32",
                                  "id": 7
                                },
                                "echoReturnLoss": {
                                  "type": "double",
                                  "id": 8
                                },
                                "echoReturnLossEnhancement": {
                                  "type": "double",
                                  "id": 9
                                },
                                "encoderImplementation": {
                                  "type": "string",
                                  "id": 10
                                },
                                "fractionLost": {
                                  "type": "double",
                                  "id": 11
                                },
                                "headerBytesSent": {
                                  "type": "int64",
                                  "id": 12
                                },
                                "jitter": {
                                  "type": "double",
                                  "id": 13
                                },
                                "nackCount": {
                                  "type": "int32",
                                  "id": 14
                                },
                                "packetsLost": {
                                  "type": "int32",
                                  "id": 15
                                },
                                "packetsReceived": {
                                  "type": "int32",
                                  "id": 16
                                },
                                "packetsSent": {
                                  "type": "int32",
                                  "id": 17
                                },
                                "peerConnectionId": {
                                  "type": "string",
                                  "id": 18
                                },
                                "relayedSource": {
                                  "type": "bool",
                                  "id": 19
                                },
                                "retransmittedBytesSent": {
                                  "type": "int64",
                                  "id": 20
                                },
                                "retransmittedPacketsSent": {
                                  "type": "int32",
                                  "id": 21
                                },
                                "rid": {
                                  "type": "string",
                                  "id": 22
                                },
                                "roundTripTime": {
                                  "type": "double",
                                  "id": 23
                                },
                                "roundTripTimeMeasurements": {
                                  "type": "int32",
                                  "id": 24
                                },
                                "sfuStreamId": {
                                  "type": "string",
                                  "id": 25
                                },
                                "targetBitrate": {
                                  "type": "int32",
                                  "id": 26
                                },
                                "totalAudioEnergy": {
                                  "type": "double",
                                  "id": 27
                                },
                                "totalCaptureDelay": {
                                  "type": "double",
                                  "id": 28
                                },
                                "totalEncodedBytesTarget": {
                                  "type": "int64",
                                  "id": 29
                                },
                                "totalPacketSendDelay": {
                                  "type": "double",
                                  "id": 30
                                },
                                "totalRoundTripTime": {
                                  "type": "double",
                                  "id": 31
                                },
                                "totalSamplesCaptured": {
                                  "type": "double",
                                  "id": 32
                                },
                                "totalSamplesDuration": {
                                  "type": "double",
                                  "id": 33
                                },
                                "trackId": {
                                  "type": "string",
                                  "id": 34
                                }
                              }
                            },
                            "OutboundVideoTrack": {
                              "fields": {
                                "ssrc": {
                                  "rule": "required",
                                  "type": "int64",
                                  "id": 1
                                },
                                "active": {
                                  "type": "bool",
                                  "id": 2
                                },
                                "averageRtcpInterval": {
                                  "type": "double",
                                  "id": 3
                                },
                                "bytesSent": {
                                  "type": "int64",
                                  "id": 4
                                },
                                "encoderImplementation": {
                                  "type": "string",
                                  "id": 5
                                },
                                "firCount": {
                                  "type": "int32",
                                  "id": 6
                                },
                                "fractionLost": {
                                  "type": "double",
                                  "id": 7
                                },
                                "frameHeight": {
                                  "type": "int32",
                                  "id": 8
                                },
                                "frameWidth": {
                                  "type": "int32",
                                  "id": 9
                                },
                                "frames": {
                                  "type": "int32",
                                  "id": 10
                                },
                                "framesDropped": {
                                  "type": "int32",
                                  "id": 11
                                },
                                "framesEncoded": {
                                  "type": "int32",
                                  "id": 12
                                },
                                "framesPerSecond": {
                                  "type": "double",
                                  "id": 13
                                },
                                "framesSent": {
                                  "type": "int32",
                                  "id": 14
                                },
                                "headerBytesSent": {
                                  "type": "int64",
                                  "id": 15
                                },
                                "height": {
                                  "type": "int32",
                                  "id": 16
                                },
                                "hugeFramesSent": {
                                  "type": "int32",
                                  "id": 17
                                },
                                "jitter": {
                                  "type": "double",
                                  "id": 18
                                },
                                "keyFramesEncoded": {
                                  "type": "int32",
                                  "id": 19
                                },
                                "nackCount": {
                                  "type": "int32",
                                  "id": 20
                                },
                                "packetsLost": {
                                  "type": "int32",
                                  "id": 21
                                },
                                "packetsReceived": {
                                  "type": "int32",
                                  "id": 22
                                },
                                "packetsSent": {
                                  "type": "int32",
                                  "id": 23
                                },
                                "peerConnectionId": {
                                  "type": "string",
                                  "id": 24
                                },
                                "pliCount": {
                                  "type": "int32",
                                  "id": 25
                                },
                                "qpSum": {
                                  "type": "int64",
                                  "id": 26
                                },
                                "qualityLimitationDurationBandwidth": {
                                  "type": "double",
                                  "id": 27
                                },
                                "qualityLimitationDurationCPU": {
                                  "type": "double",
                                  "id": 28
                                },
                                "qualityLimitationDurationNone": {
                                  "type": "double",
                                  "id": 29
                                },
                                "qualityLimitationDurationOther": {
                                  "type": "double",
                                  "id": 30
                                },
                                "qualityLimitationReason": {
                                  "type": "string",
                                  "id": 31
                                },
                                "qualityLimitationResolutionChanges": {
                                  "type": "int32",
                                  "id": 32
                                },
                                "relayedSource": {
                                  "type": "bool",
                                  "id": 33
                                },
                                "retransmittedBytesSent": {
                                  "type": "int64",
                                  "id": 34
                                },
                                "retransmittedPacketsSent": {
                                  "type": "int32",
                                  "id": 35
                                },
                                "rid": {
                                  "type": "string",
                                  "id": 36
                                },
                                "roundTripTime": {
                                  "type": "double",
                                  "id": 37
                                },
                                "roundTripTimeMeasurements": {
                                  "type": "int32",
                                  "id": 38
                                },
                                "sfuStreamId": {
                                  "type": "string",
                                  "id": 39
                                },
                                "targetBitrate": {
                                  "type": "int32",
                                  "id": 40
                                },
                                "totalEncodeTime": {
                                  "type": "double",
                                  "id": 41
                                },
                                "totalEncodedBytesTarget": {
                                  "type": "int64",
                                  "id": 42
                                },
                                "totalPacketSendDelay": {
                                  "type": "double",
                                  "id": 43
                                },
                                "totalRoundTripTime": {
                                  "type": "double",
                                  "id": 44
                                },
                                "trackId": {
                                  "type": "string",
                                  "id": 45
                                },
                                "width": {
                                  "type": "int32",
                                  "id": 46
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
                                  "type": "int32",
                                  "id": 5
                                },
                                "priority": {
                                  "type": "int64",
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
                                  "type": "int32",
                                  "id": 5
                                },
                                "priority": {
                                  "type": "int64",
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
                              "type": "int64",
                              "id": 7
                            },
                            "marker": {
                              "type": "string",
                              "id": 8
                            },
                            "timeZoneOffsetInHours": {
                              "type": "int32",
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
                                  "type": "int32",
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
                                  "type": "int32",
                                  "id": 11
                                },
                                "rtpBytesReceived": {
                                  "type": "int64",
                                  "id": 12
                                },
                                "rtpBytesSent": {
                                  "type": "int64",
                                  "id": 13
                                },
                                "rtpPacketsLost": {
                                  "type": "int32",
                                  "id": 14
                                },
                                "rtpPacketsReceived": {
                                  "type": "int32",
                                  "id": 15
                                },
                                "rtpPacketsSent": {
                                  "type": "int32",
                                  "id": 16
                                },
                                "rtxBytesReceived": {
                                  "type": "int64",
                                  "id": 17
                                },
                                "rtxBytesSent": {
                                  "type": "int64",
                                  "id": 18
                                },
                                "rtxPacketsDiscarded": {
                                  "type": "int32",
                                  "id": 19
                                },
                                "rtxPacketsLost": {
                                  "type": "int32",
                                  "id": 20
                                },
                                "rtxPacketsReceived": {
                                  "type": "int32",
                                  "id": 21
                                },
                                "rtxPacketsSent": {
                                  "type": "int32",
                                  "id": 22
                                },
                                "sctpBytesReceived": {
                                  "type": "int64",
                                  "id": 23
                                },
                                "sctpBytesSent": {
                                  "type": "int64",
                                  "id": 24
                                },
                                "sctpPacketsReceived": {
                                  "type": "int32",
                                  "id": 25
                                },
                                "sctpPacketsSent": {
                                  "type": "int32",
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
                                  "type": "int64",
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
                                  "type": "int64",
                                  "id": 5
                                },
                                "clockRate": {
                                  "type": "int32",
                                  "id": 6
                                },
                                "fecPacketsDiscarded": {
                                  "type": "int32",
                                  "id": 7
                                },
                                "fecPacketsReceived": {
                                  "type": "int32",
                                  "id": 8
                                },
                                "firCount": {
                                  "type": "int32",
                                  "id": 9
                                },
                                "fractionLost": {
                                  "type": "double",
                                  "id": 10
                                },
                                "framesDecoded": {
                                  "type": "int32",
                                  "id": 11
                                },
                                "framesReceived": {
                                  "type": "int32",
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
                                  "type": "int32",
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
                                  "type": "int32",
                                  "id": 18
                                },
                                "noReport": {
                                  "type": "bool",
                                  "id": 19
                                },
                                "packetsDiscarded": {
                                  "type": "int32",
                                  "id": 20
                                },
                                "packetsDuplicated": {
                                  "type": "int32",
                                  "id": 21
                                },
                                "packetsFailedDecryption": {
                                  "type": "int32",
                                  "id": 22
                                },
                                "packetsLost": {
                                  "type": "int32",
                                  "id": 23
                                },
                                "packetsReceived": {
                                  "type": "int32",
                                  "id": 24
                                },
                                "packetsRepaired": {
                                  "type": "int32",
                                  "id": 25
                                },
                                "payloadType": {
                                  "type": "int32",
                                  "id": 26
                                },
                                "pliCount": {
                                  "type": "int32",
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
                                  "type": "int32",
                                  "id": 30
                                },
                                "rtcpSrReceived": {
                                  "type": "int32",
                                  "id": 31
                                },
                                "rtxPacketsDiscarded": {
                                  "type": "int32",
                                  "id": 32
                                },
                                "rtxPacketsReceived": {
                                  "type": "int32",
                                  "id": 33
                                },
                                "rtxSsrc": {
                                  "type": "int64",
                                  "id": 34
                                },
                                "sdpFmtpLine": {
                                  "type": "string",
                                  "id": 35
                                },
                                "sliCount": {
                                  "type": "int32",
                                  "id": 36
                                },
                                "targetBitrate": {
                                  "type": "int32",
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
                                  "type": "int64",
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
                                  "type": "int64",
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
                                  "type": "int32",
                                  "id": 9
                                },
                                "fecPacketsDiscarded": {
                                  "type": "int32",
                                  "id": 10
                                },
                                "fecPacketsSent": {
                                  "type": "int32",
                                  "id": 11
                                },
                                "firCount": {
                                  "type": "int32",
                                  "id": 12
                                },
                                "fractionLost": {
                                  "type": "double",
                                  "id": 13
                                },
                                "framesEncoded": {
                                  "type": "int32",
                                  "id": 14
                                },
                                "framesSent": {
                                  "type": "int32",
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
                                  "type": "int32",
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
                                  "type": "int32",
                                  "id": 21
                                },
                                "noReport": {
                                  "type": "bool",
                                  "id": 22
                                },
                                "packetsDiscarded": {
                                  "type": "int32",
                                  "id": 23
                                },
                                "packetsDuplicated": {
                                  "type": "int32",
                                  "id": 24
                                },
                                "packetsFailedEncryption": {
                                  "type": "int32",
                                  "id": 25
                                },
                                "packetsLost": {
                                  "type": "int32",
                                  "id": 26
                                },
                                "packetsRetransmitted": {
                                  "type": "int32",
                                  "id": 27
                                },
                                "packetsSent": {
                                  "type": "int32",
                                  "id": 28
                                },
                                "payloadType": {
                                  "type": "int32",
                                  "id": 29
                                },
                                "pliCount": {
                                  "type": "int32",
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
                                  "type": "int32",
                                  "id": 33
                                },
                                "rtcpSrSent": {
                                  "type": "int32",
                                  "id": 34
                                },
                                "rtxPacketsDiscarded": {
                                  "type": "int32",
                                  "id": 35
                                },
                                "rtxPacketsSent": {
                                  "type": "int32",
                                  "id": 36
                                },
                                "rtxSsrc": {
                                  "type": "int64",
                                  "id": 37
                                },
                                "sdpFmtpLine": {
                                  "type": "string",
                                  "id": 38
                                },
                                "sliCount": {
                                  "type": "int32",
                                  "id": 39
                                },
                                "targetBitrate": {
                                  "type": "int32",
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
                                  "type": "int64",
                                  "id": 4
                                },
                                "bytesSent": {
                                  "type": "int64",
                                  "id": 5
                                },
                                "internal": {
                                  "type": "bool",
                                  "id": 6
                                },
                                "label": {
                                  "type": "string",
                                  "id": 7
                                },
                                "messageReceived": {
                                  "type": "int32",
                                  "id": 8
                                },
                                "messageSent": {
                                  "type": "int32",
                                  "id": 9
                                },
                                "noReport": {
                                  "type": "bool",
                                  "id": 10
                                },
                                "protocol": {
                                  "type": "string",
                                  "id": 11
                                },
                                "sctpCongestionWindow": {
                                  "type": "double",
                                  "id": 12
                                },
                                "sctpMtu": {
                                  "type": "int32",
                                  "id": 13
                                },
                                "sctpReceiverWindow": {
                                  "type": "double",
                                  "id": 14
                                },
                                "sctpSmoothedRoundTripTime": {
                                  "type": "double",
                                  "id": 15
                                },
                                "sctpUnackData": {
                                  "type": "int32",
                                  "id": 16
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
                            "allocations": {
                              "rule": "repeated",
                              "type": "TurnPeerAllocation",
                              "id": 1
                            },
                            "sessions": {
                              "rule": "repeated",
                              "type": "TurnSession",
                              "id": 2
                            },
                            "serverId": {
                              "rule": "required",
                              "type": "string",
                              "id": 3
                            }
                          },
                          "nested": {
                            "TurnPeerAllocation": {
                              "fields": {
                                "peerId": {
                                  "rule": "required",
                                  "type": "string",
                                  "id": 1
                                },
                                "relayedAddress": {
                                  "rule": "required",
                                  "type": "string",
                                  "id": 2
                                },
                                "relayedPort": {
                                  "rule": "required",
                                  "type": "int32",
                                  "id": 3
                                },
                                "sessionId": {
                                  "rule": "required",
                                  "type": "string",
                                  "id": 4
                                },
                                "transportProtocol": {
                                  "rule": "required",
                                  "type": "string",
                                  "id": 5
                                },
                                "peerAddress": {
                                  "type": "string",
                                  "id": 6
                                },
                                "peerPort": {
                                  "type": "int32",
                                  "id": 7
                                },
                                "receivedBytes": {
                                  "type": "int64",
                                  "id": 8
                                },
                                "receivedPackets": {
                                  "type": "int32",
                                  "id": 9
                                },
                                "receivingBitrate": {
                                  "type": "int32",
                                  "id": 10
                                },
                                "sendingBitrate": {
                                  "type": "int32",
                                  "id": 11
                                },
                                "sentBytes": {
                                  "type": "int64",
                                  "id": 12
                                },
                                "sentPackets": {
                                  "type": "int32",
                                  "id": 13
                                }
                              }
                            },
                            "TurnSession": {
                              "fields": {
                                "sessionId": {
                                  "rule": "required",
                                  "type": "string",
                                  "id": 1
                                },
                                "clientAddress": {
                                  "type": "string",
                                  "id": 2
                                },
                                "clientId": {
                                  "type": "string",
                                  "id": 3
                                },
                                "clientPort": {
                                  "type": "int32",
                                  "id": 4
                                },
                                "nonceExpirationTime": {
                                  "type": "int64",
                                  "id": 5
                                },
                                "realm": {
                                  "type": "string",
                                  "id": 6
                                },
                                "receivedBytes": {
                                  "type": "int64",
                                  "id": 7
                                },
                                "receivedPackets": {
                                  "type": "int32",
                                  "id": 8
                                },
                                "receivingBitrate": {
                                  "type": "int32",
                                  "id": 9
                                },
                                "sendingBitrate": {
                                  "type": "int32",
                                  "id": 10
                                },
                                "sentBytes": {
                                  "type": "int64",
                                  "id": 11
                                },
                                "sentPackets": {
                                  "type": "int32",
                                  "id": 12
                                },
                                "serverAddress": {
                                  "type": "string",
                                  "id": 13
                                },
                                "serverPort": {
                                  "type": "int32",
                                  "id": 14
                                },
                                "started": {
                                  "type": "int64",
                                  "id": 15
                                },
                                "transportProtocol": {
                                  "type": "string",
                                  "id": 16
                                },
                                "username": {
                                  "type": "string",
                                  "id": 17
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