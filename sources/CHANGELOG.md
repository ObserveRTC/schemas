## 2.2.2
 * Bugfix for Decoder library decoding IceCandidatePairs
 * remove `schemaVersion` from Reports

## 2.2.1
 * Encoder and Decoder libraries are added
 * added `schemaVersion` to each generated Samples anre Reports

## 2.2.0

### Added
 * CustomCallEvent to ClientSample resembles a CallEventReport, but possible to report from the client side.
 * CustomSfuEvent to SfuSample resembles an SfuEventReport, but possible to report from the SFU side.


## 2.1.8
 * change IceCandidatePair Report accordingly to IceCandidatePair sample

## 2.1.7
 * change csv header lowercase to snake case

## 2.1.6
 * change type of `framesDropped` in InboundVideoTrack report from `double` to `int`

## 2.1.5
 * Make `label` field in PeerConnectionTransport optional

## 2.1.4
 * Add `label` field to PeerConnectionTransport

## 2.1.3
 * change type of `framesDropped` in InboundVideoTrack from `double` to `int`
## 2.1.2

### Renamed
 * `DataChannelStats` record to `DataChannel` in ClientSample
 * `IceCandidatePairStats` record to `IceCandidatePair` in ClientSample

## 2.1.1

### Restored
 * `senderId` field in W3CStats for backward compatibility in client-monitor
 * `rtcpTransportStatsId` field in W3CStats for backward compatibility in client-monitor


## 2.1.0

### Added
 * ice candidate pair stats in samples extracted from client transport
 * ice candidate pair report
 * peer connection transport report
 * `mid` field to ClientSamples inbound rtp related stats
 * `jitterBufferMinimumDelay` field to ClientSamples inbound rtp related stats
 * `playoutId` field to ClientSamples inbound rtp related stats
 * `packetsDiscarded` field to ClientSamples inbound rtp related stats
 * `jitterBufferTargetDelay` field to ClientSamples inbound rtp related stats
 * `active` field to ClientSample outbound rtp related stats
 * `droppedSamplesDuration` field to ClientSample audio source related stats
 * `droppedSamplesEvents` field to ClientSample audio source related stats
 * `totalCaptureDelay` field to ClientSample audio source related stats
 * `totalSamplesCaptured` field to ClientSample audio source related stats
 * `dtlsRole` to transport stats
 * `RTCAudioPlayoutStats` to inbound-rtp related stats


### Modified
 * pcTransports is changed to contain only peer connection transport fields

### Removed
 * client-transport-report
 
 * `packetsDiscarded` field from InboundAudioTrack, InboundVideoTrack samples and reports
 * `packetsRepaired` field from InboundAudioTrack, InboundVideoTrack samples and reports
 * `burstPacketsLost` field from InboundAudioTrack,  InboundVideoTrack samples and reports
 * `burstPacketsDiscarded` field from InboundAudioTrack,  InboundVideoTrack samples and reports
 * `burstLossCount` field from InboundAudioTrack, InboundVideoTrack samples and reports
 * `burstDiscardCount` field from InboundAudioTrack, InboundVideoTrack samples and reports
 * `burstLossRate` field from InboundAudioTrack, InboundVideoTrack samples and reports
 * `burstDiscardRate` field from InboundAudioTrack, InboundVideoTrack samples and reports
 * `gapLossRate` field from InboundAudioTrack, InboundVideoTrack samples and reports
 * `gapDiscardRate` field from InboundAudioTrack, InboundVideoTrack samples and reports
 * `partialFramesLost` field from InboundAudioTrack, InboundVideoTrack samples and reports
 * `fullFramesLost` field from InboundAudioTrack, InboundVideoTrack samples and reports
 * `averageRtcpInterval` field from InboundAudioTrack, InboundVideoTrack samples and reports
 * `voiceActivityFlag` field from InboundAudioTrack, InboundVideoTrack samples and reports
 * `frameBitDepth` field from InboundAudioTrack, InboundVideoTrack samples and reports
 * `packetsFailedDecryption` field from InboundAudioTrack, InboundVideoTrack samples and reports
 * `packetsDuplicated` field from InboundAudioTrack, InboundVideoTrack samples and reports
 * `perDscpPacketsReceived` field from InboundAudioTrack, InboundVideoTrack samples and reports
 * `sliCount` field from InboundAudioTrack, InboundVideoTrack samples and reports
 * `fullFramesLost` field from InboundAudioTrack, InboundVideoTrack samples and reports
 * `totalSamplesDecoded` field from InboundAudioTrack, InboundVideoTrack samples and reports
 * `samplesDecodedWithSilk` field from InboundAudioTrack, InboundVideoTrack samples and reports
 * `samplesDecodedWithCelt` field from InboundAudioTrack, InboundVideoTrack samples and reports
 * `samplesreportsReceived` field from InboundAudioTrack, InboundVideoTrack samples and reports

 * `rtxSsrc` field from OutboundAudioTrack, OutboundVideoTrack samples and reports
 * `senderId` field from OutboundAudioTrack, OutboundVideoTrack samples and reports
 * `lastPacketSentTimestamp` field from OutboundAudioTrack, OutboundVideoTrack samples and reports
 * `packetsDiscardedOnSend` field from OutboundAudioTrack, OutboundVideoTrack samples and reports
 * `bytesDiscardedOnSend` field from OutboundAudioTrack, OutboundVideoTrack samples and reports
 * `fecPacketsSent` field from OutboundAudioTrack, OutboundVideoTrack samples and reports
 * `framesDiscardedOnSend` field from OutboundAudioTrack, OutboundVideoTrack samples and reports
 * `totalSamplesSent` field from OutboundAudioTrack, OutboundVideoTrack samples and reports
 * `samplesEncodedWithSilk` field from OutboundAudioTrack, OutboundVideoTrack samples and reports
 * `samplesEncodedWithCelt` field from OutboundAudioTrack, OutboundVideoTrack samples and reports
 * `voiceActivityFlag` field from OutboundAudioTrack, OutboundVideoTrack samples and reports
 * `sliCount` field from OutboundAudioTrack, OutboundVideoTrack samples and reports
 * `frameBitDepth` field from OutboundAudioTrack, OutboundVideoTrack samples and reports
 * `perDscpPacketsSent` field from OutboundAudioTrack, OutboundVideoTrack samples and reports
 * `bitDepth` field from OutboundAudioTrack, OutboundVideoTrack samples and reports


## 2.0.4

### Added
 * csv column list for every report. Generated from the schema, required fields first, and fields are in sorted order

## 2.0.3

### Added
 * `remoteSfuId` to SfuInboundRtpPad reports
 * `remoteTransportId` to SfuInboundRtpPad reports
 * `remoteSinkId` to SfuInboundRtpPad reports
 * `remoteRtpPadId` to SfuInboundRtpPad reports

## 2.0.2

### Added
 * `roundTripTime` to SfuOutboundRtp report

## 2.0.1

### Added
 * `internal` attribute to SfuSctpChannel sample
 * `internal` attribute to SfuSctpStream report
 * `internal` attribute to SfuTransport report

## 2.0.0

init