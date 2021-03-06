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
                            "localSDPs": {
                              "rule": "repeated",
                              "type": "string",
                              "id": 10
                            },
                            "mediaConstraints": {
                              "rule": "repeated",
                              "type": "string",
                              "id": 11
                            },
                            "mediaDevices": {
                              "rule": "repeated",
                              "type": "MediaDevice",
                              "id": 12
                            },
                            "mediaSources": {
                              "rule": "repeated",
                              "type": "MediaSourceStat",
                              "id": 13
                            },
                            "outboundAudioTracks": {
                              "rule": "repeated",
                              "type": "OutboundAudioTrack",
                              "id": 14
                            },
                            "outboundVideoTracks": {
                              "rule": "repeated",
                              "type": "OutboundVideoTrack",
                              "id": 15
                            },
                            "pcTransports": {
                              "rule": "repeated",
                              "type": "PeerConnectionTransport",
                              "id": 16
                            },
                            "userMediaErrors": {
                              "rule": "repeated",
                              "type": "string",
                              "id": 17
                            },
                            "clientId": {
                              "type": "string",
                              "id": 18
                            },
                            "timestamp": {
                              "type": "int64",
                              "id": 19
                            },
                            "browser": {
                              "type": "Browser",
                              "id": 20
                            },
                            "callId": {
                              "type": "string",
                              "id": 21
                            },
                            "engine": {
                              "type": "Engine",
                              "id": 22
                            },
                            "marker": {
                              "type": "string",
                              "id": 23
                            },
                            "os": {
                              "type": "OperationSystem",
                              "id": 24
                            },
                            "platform": {
                              "type": "Platform",
                              "id": 25
                            },
                            "roomId": {
                              "type": "string",
                              "id": 26
                            },
                            "sampleSeq": {
                              "type": "int32",
                              "id": 27
                            },
                            "timeZoneOffsetInHours": {
                              "type": "int32",
                              "id": 28
                            },
                            "userId": {
                              "type": "string",
                              "id": 29
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
                                  "type": "string",
                                  "id": 1
                                },
                                "type": {
                                  "type": "string",
                                  "id": 2
                                }
                              }
                            },
                            "PeerConnectionTransport": {
                              "fields": {
                                "peerConnectionId": {
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
                                "candidatePairAvailableIncomingBitrate": {
                                  "type": "double",
                                  "id": 4
                                },
                                "candidatePairAvailableOutgoingBitrate": {
                                  "type": "double",
                                  "id": 5
                                },
                                "candidatePairBytesDiscardedOnSend": {
                                  "type": "int64",
                                  "id": 6
                                },
                                "candidatePairBytesReceived": {
                                  "type": "int64",
                                  "id": 7
                                },
                                "candidatePairBytesSent": {
                                  "type": "int64",
                                  "id": 8
                                },
                                "candidatePairCircuitBreakerTriggerCount": {
                                  "type": "int32",
                                  "id": 9
                                },
                                "candidatePairConsentExpiredTimestamp": {
                                  "type": "int64",
                                  "id": 10
                                },
                                "candidatePairConsentRequestBytesSent": {
                                  "type": "int64",
                                  "id": 11
                                },
                                "candidatePairConsentRequestsSent": {
                                  "type": "int32",
                                  "id": 12
                                },
                                "candidatePairCurrentRoundTripTime": {
                                  "type": "double",
                                  "id": 13
                                },
                                "candidatePairFirstRequestTimestamp": {
                                  "type": "int64",
                                  "id": 14
                                },
                                "candidatePairLastPacketReceivedTimestamp": {
                                  "type": "int64",
                                  "id": 15
                                },
                                "candidatePairLastPacketSentTimestamp": {
                                  "type": "int64",
                                  "id": 16
                                },
                                "candidatePairLastRequestTimestamp": {
                                  "type": "int64",
                                  "id": 17
                                },
                                "candidatePairLastResponseTimestamp": {
                                  "type": "int64",
                                  "id": 18
                                },
                                "candidatePairPacketsDiscardedOnSend": {
                                  "type": "int32",
                                  "id": 19
                                },
                                "candidatePairPacketsReceived": {
                                  "type": "int32",
                                  "id": 20
                                },
                                "candidatePairPacketsSent": {
                                  "type": "int32",
                                  "id": 21
                                },
                                "candidatePairRequestBytesSent": {
                                  "type": "int64",
                                  "id": 22
                                },
                                "candidatePairRequestsReceived": {
                                  "type": "int32",
                                  "id": 23
                                },
                                "candidatePairRequestsSent": {
                                  "type": "int32",
                                  "id": 24
                                },
                                "candidatePairResponseBytesSent": {
                                  "type": "int64",
                                  "id": 25
                                },
                                "candidatePairResponsesReceived": {
                                  "type": "int32",
                                  "id": 26
                                },
                                "candidatePairResponsesSent": {
                                  "type": "int32",
                                  "id": 27
                                },
                                "candidatePairRetransmissionReceived": {
                                  "type": "int32",
                                  "id": 28
                                },
                                "candidatePairRetransmissionSent": {
                                  "type": "int32",
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
                                  "type": "int32",
                                  "id": 32
                                },
                                "dataChannelsClosed": {
                                  "type": "int32",
                                  "id": 33
                                },
                                "dataChannelsOpened": {
                                  "type": "int32",
                                  "id": 34
                                },
                                "dataChannelsRequested": {
                                  "type": "int32",
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
                                  "type": "int32",
                                  "id": 46
                                },
                                "localProtocol": {
                                  "type": "string",
                                  "id": 47
                                },
                                "packetsReceived": {
                                  "type": "int32",
                                  "id": 48
                                },
                                "packetsSent": {
                                  "type": "int32",
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
                                  "type": "int32",
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
                                  "type": "int32",
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
                                  "type": "int32",
                                  "id": 60
                                },
                                "selectedCandidatePairChanges": {
                                  "type": "int32",
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
                                  "type": "int32",
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
                                  "type": "int32",
                                  "id": 5
                                },
                                "framesPerSecond": {
                                  "type": "double",
                                  "id": 6
                                },
                                "height": {
                                  "type": "int32",
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
                                  "type": "int32",
                                  "id": 13
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
                                  "type": "int64",
                                  "id": 1
                                },
                                "averageRtcpInterval": {
                                  "type": "double",
                                  "id": 2
                                },
                                "burstDiscardCount": {
                                  "type": "int32",
                                  "id": 3
                                },
                                "burstDiscardRate": {
                                  "type": "double",
                                  "id": 4
                                },
                                "burstLossCount": {
                                  "type": "int32",
                                  "id": 5
                                },
                                "burstLossRate": {
                                  "type": "double",
                                  "id": 6
                                },
                                "burstPacketsDiscarded": {
                                  "type": "int32",
                                  "id": 7
                                },
                                "burstPacketsLost": {
                                  "type": "int32",
                                  "id": 8
                                },
                                "bytesReceived": {
                                  "type": "int64",
                                  "id": 9
                                },
                                "bytesSent": {
                                  "type": "int64",
                                  "id": 10
                                },
                                "channels": {
                                  "type": "int32",
                                  "id": 11
                                },
                                "clockRate": {
                                  "type": "int32",
                                  "id": 12
                                },
                                "concealedSamples": {
                                  "type": "int32",
                                  "id": 13
                                },
                                "concealmentEvents": {
                                  "type": "int32",
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
                                  "type": "int64",
                                  "id": 17
                                },
                                "fecPacketsDiscarded": {
                                  "type": "int32",
                                  "id": 18
                                },
                                "fecPacketsReceived": {
                                  "type": "int32",
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
                                  "type": "int64",
                                  "id": 22
                                },
                                "insertedSamplesForDeceleration": {
                                  "type": "int32",
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
                                  "type": "int32",
                                  "id": 26
                                },
                                "lastPacketReceivedTimestamp": {
                                  "type": "int64",
                                  "id": 27
                                },
                                "mimeType": {
                                  "type": "string",
                                  "id": 28
                                },
                                "nackCount": {
                                  "type": "int32",
                                  "id": 29
                                },
                                "packetsDiscarded": {
                                  "type": "int32",
                                  "id": 30
                                },
                                "packetsDuplicated": {
                                  "type": "int32",
                                  "id": 31
                                },
                                "packetsFailedDecryption": {
                                  "type": "int32",
                                  "id": 32
                                },
                                "packetsLost": {
                                  "type": "int32",
                                  "id": 33
                                },
                                "packetsReceived": {
                                  "type": "int32",
                                  "id": 34
                                },
                                "packetsRepaired": {
                                  "type": "int32",
                                  "id": 35
                                },
                                "packetsSent": {
                                  "type": "int32",
                                  "id": 36
                                },
                                "payloadType": {
                                  "type": "int32",
                                  "id": 37
                                },
                                "peerConnectionId": {
                                  "type": "string",
                                  "id": 38
                                },
                                "perDscpPacketsReceived": {
                                  "type": "int32",
                                  "id": 39
                                },
                                "remoteClientId": {
                                  "type": "string",
                                  "id": 40
                                },
                                "remoteTimestamp": {
                                  "type": "int64",
                                  "id": 41
                                },
                                "removedSamplesForAcceleration": {
                                  "type": "int32",
                                  "id": 42
                                },
                                "reportsSent": {
                                  "type": "int32",
                                  "id": 43
                                },
                                "roundTripTime": {
                                  "type": "double",
                                  "id": 44
                                },
                                "roundTripTimeMeasurements": {
                                  "type": "int32",
                                  "id": 45
                                },
                                "samplesDecodedWithCelt": {
                                  "type": "int32",
                                  "id": 46
                                },
                                "samplesDecodedWithSilk": {
                                  "type": "int32",
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
                                "sfuStreamId": {
                                  "type": "string",
                                  "id": 50
                                },
                                "silentConcealedSamples": {
                                  "type": "int32",
                                  "id": 51
                                },
                                "totalProcessingDelay": {
                                  "type": "double",
                                  "id": 52
                                },
                                "totalRoundTripTime": {
                                  "type": "double",
                                  "id": 53
                                },
                                "totalSamplesDecoded": {
                                  "type": "int32",
                                  "id": 54
                                },
                                "totalSamplesReceived": {
                                  "type": "int32",
                                  "id": 55
                                },
                                "trackId": {
                                  "type": "string",
                                  "id": 56
                                },
                                "voiceActivityFlag": {
                                  "type": "bool",
                                  "id": 57
                                }
                              }
                            },
                            "InboundVideoTrack": {
                              "fields": {
                                "ssrc": {
                                  "type": "int64",
                                  "id": 1
                                },
                                "averageRtcpInterval": {
                                  "type": "double",
                                  "id": 2
                                },
                                "burstDiscardCount": {
                                  "type": "int32",
                                  "id": 3
                                },
                                "burstDiscardRate": {
                                  "type": "double",
                                  "id": 4
                                },
                                "burstLossCount": {
                                  "type": "int32",
                                  "id": 5
                                },
                                "burstLossRate": {
                                  "type": "double",
                                  "id": 6
                                },
                                "burstPacketsDiscarded": {
                                  "type": "int32",
                                  "id": 7
                                },
                                "burstPacketsLost": {
                                  "type": "int32",
                                  "id": 8
                                },
                                "bytesReceived": {
                                  "type": "int64",
                                  "id": 9
                                },
                                "bytesSent": {
                                  "type": "int64",
                                  "id": 10
                                },
                                "channels": {
                                  "type": "int32",
                                  "id": 11
                                },
                                "clockRate": {
                                  "type": "int32",
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
                                  "type": "int64",
                                  "id": 15
                                },
                                "fecPacketsDiscarded": {
                                  "type": "int32",
                                  "id": 16
                                },
                                "fecPacketsReceived": {
                                  "type": "int32",
                                  "id": 17
                                },
                                "firCount": {
                                  "type": "int32",
                                  "id": 18
                                },
                                "frameBitDepth": {
                                  "type": "int32",
                                  "id": 19
                                },
                                "frameHeight": {
                                  "type": "int32",
                                  "id": 20
                                },
                                "frameWidth": {
                                  "type": "int32",
                                  "id": 21
                                },
                                "framesDecoded": {
                                  "type": "int32",
                                  "id": 22
                                },
                                "framesDropped": {
                                  "type": "int32",
                                  "id": 23
                                },
                                "framesPerSecond": {
                                  "type": "double",
                                  "id": 24
                                },
                                "framesReceived": {
                                  "type": "int32",
                                  "id": 25
                                },
                                "fullFramesLost": {
                                  "type": "int32",
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
                                  "type": "int64",
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
                                  "type": "int32",
                                  "id": 32
                                },
                                "keyFramesDecoded": {
                                  "type": "int32",
                                  "id": 33
                                },
                                "lastPacketReceivedTimestamp": {
                                  "type": "int64",
                                  "id": 34
                                },
                                "mimeType": {
                                  "type": "string",
                                  "id": 35
                                },
                                "nackCount": {
                                  "type": "int32",
                                  "id": 36
                                },
                                "packetsDiscarded": {
                                  "type": "int32",
                                  "id": 37
                                },
                                "packetsDuplicated": {
                                  "type": "int32",
                                  "id": 38
                                },
                                "packetsFailedDecryption": {
                                  "type": "int32",
                                  "id": 39
                                },
                                "packetsLost": {
                                  "type": "int32",
                                  "id": 40
                                },
                                "packetsReceived": {
                                  "type": "int32",
                                  "id": 41
                                },
                                "packetsRepaired": {
                                  "type": "int32",
                                  "id": 42
                                },
                                "packetsSent": {
                                  "type": "int32",
                                  "id": 43
                                },
                                "partialFramesLost": {
                                  "type": "int32",
                                  "id": 44
                                },
                                "payloadType": {
                                  "type": "int32",
                                  "id": 45
                                },
                                "peerConnectionId": {
                                  "type": "string",
                                  "id": 46
                                },
                                "perDscpPacketsReceived": {
                                  "type": "int32",
                                  "id": 47
                                },
                                "pliCount": {
                                  "type": "int32",
                                  "id": 48
                                },
                                "qpSum": {
                                  "type": "int64",
                                  "id": 49
                                },
                                "remoteClientId": {
                                  "type": "string",
                                  "id": 50
                                },
                                "remoteTimestamp": {
                                  "type": "int64",
                                  "id": 51
                                },
                                "reportsSent": {
                                  "type": "int32",
                                  "id": 52
                                },
                                "roundTripTime": {
                                  "type": "double",
                                  "id": 53
                                },
                                "roundTripTimeMeasurements": {
                                  "type": "int32",
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
                                "sfuStreamId": {
                                  "type": "string",
                                  "id": 57
                                },
                                "sliCount": {
                                  "type": "int32",
                                  "id": 58
                                },
                                "totalDecodeTime": {
                                  "type": "double",
                                  "id": 59
                                },
                                "totalInterFrameDelay": {
                                  "type": "double",
                                  "id": 60
                                },
                                "totalProcessingDelay": {
                                  "type": "double",
                                  "id": 61
                                },
                                "totalRoundTripTime": {
                                  "type": "double",
                                  "id": 62
                                },
                                "totalSquaredInterFrameDelay": {
                                  "type": "double",
                                  "id": 63
                                },
                                "trackId": {
                                  "type": "string",
                                  "id": 64
                                }
                              }
                            },
                            "OutboundAudioTrack": {
                              "fields": {
                                "ssrc": {
                                  "type": "int64",
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
                                  "type": "int32",
                                  "id": 4
                                },
                                "burstDiscardRate": {
                                  "type": "double",
                                  "id": 5
                                },
                                "burstLossCount": {
                                  "type": "int32",
                                  "id": 6
                                },
                                "burstLossRate": {
                                  "type": "double",
                                  "id": 7
                                },
                                "burstPacketsDiscarded": {
                                  "type": "int32",
                                  "id": 8
                                },
                                "burstPacketsLost": {
                                  "type": "int32",
                                  "id": 9
                                },
                                "bytesDiscardedOnSend": {
                                  "type": "int64",
                                  "id": 10
                                },
                                "bytesSent": {
                                  "type": "int64",
                                  "id": 11
                                },
                                "channels": {
                                  "type": "int32",
                                  "id": 12
                                },
                                "clockRate": {
                                  "type": "int32",
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
                                  "type": "int32",
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
                                  "type": "int64",
                                  "id": 22
                                },
                                "jitter": {
                                  "type": "double",
                                  "id": 23
                                },
                                "lastPacketSentTimestamp": {
                                  "type": "int64",
                                  "id": 24
                                },
                                "mimeType": {
                                  "type": "string",
                                  "id": 25
                                },
                                "nackCount": {
                                  "type": "int32",
                                  "id": 26
                                },
                                "packetsDiscarded": {
                                  "type": "int32",
                                  "id": 27
                                },
                                "packetsDiscardedOnSend": {
                                  "type": "int32",
                                  "id": 28
                                },
                                "packetsLost": {
                                  "type": "int32",
                                  "id": 29
                                },
                                "packetsReceived": {
                                  "type": "int32",
                                  "id": 30
                                },
                                "packetsRepaired": {
                                  "type": "int32",
                                  "id": 31
                                },
                                "packetsSent": {
                                  "type": "int32",
                                  "id": 32
                                },
                                "payloadType": {
                                  "type": "int32",
                                  "id": 33
                                },
                                "peerConnectionId": {
                                  "type": "string",
                                  "id": 34
                                },
                                "perDscpPacketsSent": {
                                  "type": "int32",
                                  "id": 35
                                },
                                "relayedSource": {
                                  "type": "bool",
                                  "id": 36
                                },
                                "reportsReceived": {
                                  "type": "int32",
                                  "id": 37
                                },
                                "retransmittedBytesSent": {
                                  "type": "int64",
                                  "id": 38
                                },
                                "retransmittedPacketsSent": {
                                  "type": "int32",
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
                                  "type": "int32",
                                  "id": 42
                                },
                                "rtxSsrc": {
                                  "type": "int64",
                                  "id": 43
                                },
                                "samplesEncodedWithCelt": {
                                  "type": "int32",
                                  "id": 44
                                },
                                "samplesEncodedWithSilk": {
                                  "type": "int32",
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
                                  "type": "int32",
                                  "id": 48
                                },
                                "totalAudioEnergy": {
                                  "type": "double",
                                  "id": 49
                                },
                                "totalEncodedBytesTarget": {
                                  "type": "int64",
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
                                  "type": "int32",
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
                                  "type": "int64",
                                  "id": 1
                                },
                                "averageRtcpInterval": {
                                  "type": "double",
                                  "id": 2
                                },
                                "bitDepth": {
                                  "type": "int32",
                                  "id": 3
                                },
                                "burstDiscardCount": {
                                  "type": "int32",
                                  "id": 4
                                },
                                "burstDiscardRate": {
                                  "type": "double",
                                  "id": 5
                                },
                                "burstLossCount": {
                                  "type": "int32",
                                  "id": 6
                                },
                                "burstLossRate": {
                                  "type": "double",
                                  "id": 7
                                },
                                "burstPacketsDiscarded": {
                                  "type": "int32",
                                  "id": 8
                                },
                                "burstPacketsLost": {
                                  "type": "int32",
                                  "id": 9
                                },
                                "bytesDiscardedOnSend": {
                                  "type": "int64",
                                  "id": 10
                                },
                                "bytesSent": {
                                  "type": "int64",
                                  "id": 11
                                },
                                "channels": {
                                  "type": "int32",
                                  "id": 12
                                },
                                "clockRate": {
                                  "type": "int32",
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
                                  "type": "int32",
                                  "id": 16
                                },
                                "firCount": {
                                  "type": "int32",
                                  "id": 17
                                },
                                "fractionLost": {
                                  "type": "double",
                                  "id": 18
                                },
                                "frameBitDepth": {
                                  "type": "int32",
                                  "id": 19
                                },
                                "frameHeight": {
                                  "type": "int32",
                                  "id": 20
                                },
                                "frameWidth": {
                                  "type": "int32",
                                  "id": 21
                                },
                                "frames": {
                                  "type": "int32",
                                  "id": 22
                                },
                                "framesDiscardedOnSend": {
                                  "type": "int32",
                                  "id": 23
                                },
                                "framesDropped": {
                                  "type": "int32",
                                  "id": 24
                                },
                                "framesEncoded": {
                                  "type": "int32",
                                  "id": 25
                                },
                                "framesPerSecond": {
                                  "type": "double",
                                  "id": 26
                                },
                                "framesSent": {
                                  "type": "int32",
                                  "id": 27
                                },
                                "fullFramesLost": {
                                  "type": "int32",
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
                                  "type": "int64",
                                  "id": 31
                                },
                                "height": {
                                  "type": "int32",
                                  "id": 32
                                },
                                "hugeFramesSent": {
                                  "type": "int32",
                                  "id": 33
                                },
                                "jitter": {
                                  "type": "double",
                                  "id": 34
                                },
                                "keyFramesEncoded": {
                                  "type": "int32",
                                  "id": 35
                                },
                                "lastPacketSentTimestamp": {
                                  "type": "int64",
                                  "id": 36
                                },
                                "mimeType": {
                                  "type": "string",
                                  "id": 37
                                },
                                "nackCount": {
                                  "type": "int32",
                                  "id": 38
                                },
                                "packetsDiscarded": {
                                  "type": "int32",
                                  "id": 39
                                },
                                "packetsDiscardedOnSend": {
                                  "type": "int32",
                                  "id": 40
                                },
                                "packetsLost": {
                                  "type": "int32",
                                  "id": 41
                                },
                                "packetsReceived": {
                                  "type": "int32",
                                  "id": 42
                                },
                                "packetsRepaired": {
                                  "type": "int32",
                                  "id": 43
                                },
                                "packetsSent": {
                                  "type": "int32",
                                  "id": 44
                                },
                                "partialFramesLost": {
                                  "type": "int32",
                                  "id": 45
                                },
                                "payloadType": {
                                  "type": "int32",
                                  "id": 46
                                },
                                "peerConnectionId": {
                                  "type": "string",
                                  "id": 47
                                },
                                "perDscpPacketsSent": {
                                  "type": "int32",
                                  "id": 48
                                },
                                "pliCount": {
                                  "type": "int32",
                                  "id": 49
                                },
                                "qpSum": {
                                  "type": "int64",
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
                                  "type": "int32",
                                  "id": 56
                                },
                                "relayedSource": {
                                  "type": "bool",
                                  "id": 57
                                },
                                "reportsReceived": {
                                  "type": "int32",
                                  "id": 58
                                },
                                "retransmittedBytesSent": {
                                  "type": "int64",
                                  "id": 59
                                },
                                "retransmittedPacketsSent": {
                                  "type": "int32",
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
                                  "type": "int32",
                                  "id": 63
                                },
                                "rtxSsrc": {
                                  "type": "int64",
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
                                  "type": "int32",
                                  "id": 67
                                },
                                "targetBitrate": {
                                  "type": "int32",
                                  "id": 68
                                },
                                "totalEncodeTime": {
                                  "type": "double",
                                  "id": 69
                                },
                                "totalEncodedBytesTarget": {
                                  "type": "int64",
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
                                  "type": "int32",
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
                            },
                            "DataChannel": {
                              "fields": {
                                "address": {
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
                                "id": {
                                  "type": "string",
                                  "id": 5
                                },
                                "label": {
                                  "type": "string",
                                  "id": 6
                                },
                                "messagesReceived": {
                                  "type": "int32",
                                  "id": 7
                                },
                                "messagesSent": {
                                  "type": "int32",
                                  "id": 8
                                },
                                "peerConnectionId": {
                                  "type": "string",
                                  "id": 9
                                },
                                "port": {
                                  "type": "int32",
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
                              "type": "string",
                              "id": 6
                            },
                            "timestamp": {
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
                                  "type": "string",
                                  "id": 1
                                },
                                "ssrc": {
                                  "type": "int64",
                                  "id": 2
                                },
                                "streamId": {
                                  "type": "string",
                                  "id": 3
                                },
                                "transportId": {
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
                                  "type": "string",
                                  "id": 1
                                },
                                "sinkId": {
                                  "type": "string",
                                  "id": 2
                                },
                                "ssrc": {
                                  "type": "int64",
                                  "id": 3
                                },
                                "streamId": {
                                  "type": "string",
                                  "id": 4
                                },
                                "transportId": {
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
                                  "type": "string",
                                  "id": 1
                                },
                                "streamId": {
                                  "type": "string",
                                  "id": 2
                                },
                                "transportId": {
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
                                  "type": "string",
                                  "id": 1
                                },
                                "type": {
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
                              "type": "string",
                              "id": 3
                            }
                          },
                          "nested": {
                            "TurnPeerAllocation": {
                              "fields": {
                                "peerId": {
                                  "type": "string",
                                  "id": 1
                                },
                                "relayedAddress": {
                                  "type": "string",
                                  "id": 2
                                },
                                "relayedPort": {
                                  "type": "int32",
                                  "id": 3
                                },
                                "sessionId": {
                                  "type": "string",
                                  "id": 4
                                },
                                "transportProtocol": {
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