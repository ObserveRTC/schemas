# Changelog

All notable changes to the ObserveRTC schemas and their generated libraries.

The version here is the **schema version** in `sources/version.txt`. The three
published packages — `@observertc/sample-schemas-js`,
`@observertc/samples-encoder` and `@observertc/samples-decoder` — are versioned
in lockstep with it by the generator.

Format loosely follows [Keep a Changelog](https://keepachangelog.com/);
versioning follows [Semantic Versioning](https://semver.org/). Dates are the
date the version was set in `sources/version.txt`.

Entries from 3.1.0 onward were reconstructed from git history; earlier entries
are as originally written.

## 3.3.0

### Added

- `key` field to `ClientIssue` in `ClientSample` — identifier of the related
  issue or resolution when one is provided.
- Documentation on `IceCandidatePairStats.state`, and source comments recording
  which `RTCStatsIceCandidatePairState` symbols are no longer in the W3C spec:
  `new` (never standardised) and `cancelled` (removed after
  [w3c/webrtc-stats#66](https://github.com/w3c/webrtc-stats/issues/66); last
  published in the 2016-12-14 Working Draft). Both symbols are retained for
  backward compatibility — no field or enum value was removed, so the wire
  format is unchanged.

> **Wire-format warning.** `ClientIssue` field numbers shift because protobuf
> numbering follows sorted field order: `payload` moves 2 → 3 and `timestamp`
> 3 → 4. A decoder built against 3.2.0 will misread these. See
> [`docs/GENERATOR.md`](docs/GENERATOR.md).

### Changed

- The generator was rewritten in TypeScript (`src/`, run with
  `npm run generate`). The legacy `index.js` and its root-level helpers were
  removed. Generated TypeScript, Avro and protobuf output is byte-identical to
  the previous implementation.
- `schemaVersion` is now exported from the `ClientSample` module only. It was
  previously emitted by every generated module, which made `src/index.ts`
  re-export the same name twice and broke `npm-samples-lib`'s build (TS2308).
  The package still exports `schemaVersion` from its entry point.
- Generated Markdown no longer runs a section heading onto the end of the
  preceding table row, and no longer prints `undefined` for enum fields that
  have no description.
- All packages moved to TypeScript 7 with `"module": "nodenext"`. Emit is still
  CommonJS; published entry points are unchanged.
- Dependencies refreshed: `avro-js` 1.12.1, `@bufbuild/buf` 1.72.0,
  `@bufbuild/protobuf` and `@bufbuild/protoc-gen-es` 2.13.0. Removed `argparse`,
  `json-schema-to-markdown`, `protobufjs` and `typedoc`, none of which were used.

### Fixed

- `@observertc/samples-decoder` could not be imported. `ClientSampleDecoder`
  imported `fromBinary` from `@bufbuild/protobuf/dist/cjs/from-binary`, a path
  that stopped existing in protobuf-es v2; requiring the package threw
  `ERR_PACKAGE_PATH_NOT_EXPORTED`. It now imports from the package root.

## [3.2.0] — 2026-03-18

### Added

- ECN and packet-accounting fields on inbound RTP stats:
  `packetsReceivedWithEct1`, `packetsReceivedWithCe`, `packetsReportedAsLost`,
  `packetsReportedAsLostButRecovered`.
- `packetsWithBleachedEct1Marking` to outbound RTP stats.
- `encodingIndex` to outbound RTP stats.
- `psnrSum` and `psnrMeasurements` (new `PsnrSum` record with `y`, `u`, `v`
  components) for video quality measurement.
- `frozen` state to `IceCandidatePairStats`.

### Changed

- `qualityLimitationDurations` restructured into a named
  `QualityLimitationDurations` record with `none`, `cpu`, `bandwidth` and
  `other` fields.
- Node 22 across the CI workflows.
- Protobuf handling reworked and dependencies updated; `CONTRIBUTING.md` added.

## [3.1.0] — 2025-06-01

### Changed

- Byte counters on outbound RTP are encoded and decoded as `BigInt`.
  `OutboundRtpEncoder` and `OutboundRtpDecoder` use `NumberToBigIntEncoder` /
  `BigIntToNumberDecoder` for bytes-sent and bytes-received fields, so values
  above `Number.MAX_SAFE_INTEGER` survive a round trip.

### Removed

- Stale generated proto, SQL and TypeScript outputs left over from the 2.x
  layout.

## [3.0.0] — 2025-06-01

- A complete rewrite of the schema.

## [2.2.12] — 2023-11-13

### Added

- Encoding and decoding options, giving callers control over how samples are
  serialised (`DecodingOptions`, per-field encoder configuration).

## [2.2.11] — 2023-09-05

- Version bump.

## [2.2.10] — 2023-09-04

### Changed

- Report schemas emit CommonJS instead of ESM.

## [2.2.9] — 2023-07-09

### Added

- `ReportTypes` to the generated outputs.
- `iceCandidatePairId` to the ICE candidate pair report.

### Changed

- Decoder handling of ICE candidates.

### Removed

- An invalid Redshift column.

## [2.2.8] — 2023-06-19

### Changed

- Encoder library updates.

## [2.2.7] — 2023-06-19

### Changed

- npm library packaging updates.

## [2.2.6] — 2023-05-19

- Schema release 2.2.6.

## [2.2.5] — 2023-05-18

### Changed

- Type of the inbound audio track field changed from `int` to `double`.

## [2.2.4] — 2023-05-03

### Added

- `reset` to the encoders.

## [2.2.3] — 2023-05-02

### Changed

- Removed unnecessary logging.

## [2.2.2] — 2023-04-30

- Bugfix for Decoder library decoding IceCandidatePairs
- remove `schemaVersion` from Reports

## [2.2.1] — 2023-04-29

- Encoder and Decoder libraries are added
- added `schemaVersion` to each generated Samples anre Reports

## [2.2.0] — 2022-11-20

### Added

- CustomCallEvent to ClientSample resembles a CallEventReport, but possible to report from the client side.
- CustomSfuEvent to SfuSample resembles an SfuEventReport, but possible to report from the SFU side.

## [2.1.9] — 2022-10-06

### Changed

- `RTCStats` renamed to `RtcStats` so the bindings compile outside the browser
  on Node.js.

## [2.1.8] — 2022-09-26

- change IceCandidatePair Report accordingly to IceCandidatePair sample

## [2.1.7] — 2022-09-26

- change csv header lowercase to snake case

## [2.1.6] — 2022-09-26

- change type of `framesDropped` in InboundVideoTrack report from `double` to `int`

## [2.1.5] — 2022-09-26

- Make `label` field in PeerConnectionTransport optional

## [2.1.4] — 2022-09-26

- Add `label` field to PeerConnectionTransport

## [2.1.3] — 2022-09-26

- change type of `framesDropped` in InboundVideoTrack from `double` to `int`

## [2.1.2] — 2022-09-25

### Renamed

- `DataChannelStats` record to `DataChannel` in ClientSample
- `IceCandidatePairStats` record to `IceCandidatePair` in ClientSample

## [2.1.1] — 2022-09-25

### Restored

- `senderId` field in W3CStats for backward compatibility in client-monitor
- `rtcpTransportStatsId` field in W3CStats for backward compatibility in client-monitor

## [2.1.0] — 2022-09-24

### Added

- ice candidate pair stats in samples extracted from client transport
- ice candidate pair report
- peer connection transport report
- `mid` field to ClientSamples inbound rtp related stats
- `jitterBufferMinimumDelay` field to ClientSamples inbound rtp related stats
- `playoutId` field to ClientSamples inbound rtp related stats
- `packetsDiscarded` field to ClientSamples inbound rtp related stats
- `jitterBufferTargetDelay` field to ClientSamples inbound rtp related stats
- `active` field to ClientSample outbound rtp related stats
- `droppedSamplesDuration` field to ClientSample audio source related stats
- `droppedSamplesEvents` field to ClientSample audio source related stats
- `totalCaptureDelay` field to ClientSample audio source related stats
- `totalSamplesCaptured` field to ClientSample audio source related stats
- `dtlsRole` to transport stats
- `RTCAudioPlayoutStats` to inbound-rtp related stats

### Modified

- pcTransports is changed to contain only peer connection transport fields

### Removed

- client-transport-report

- `packetsDiscarded` field from InboundAudioTrack, InboundVideoTrack samples and reports
- `packetsRepaired` field from InboundAudioTrack, InboundVideoTrack samples and reports
- `burstPacketsLost` field from InboundAudioTrack, InboundVideoTrack samples and reports
- `burstPacketsDiscarded` field from InboundAudioTrack, InboundVideoTrack samples and reports
- `burstLossCount` field from InboundAudioTrack, InboundVideoTrack samples and reports
- `burstDiscardCount` field from InboundAudioTrack, InboundVideoTrack samples and reports
- `burstLossRate` field from InboundAudioTrack, InboundVideoTrack samples and reports
- `burstDiscardRate` field from InboundAudioTrack, InboundVideoTrack samples and reports
- `gapLossRate` field from InboundAudioTrack, InboundVideoTrack samples and reports
- `gapDiscardRate` field from InboundAudioTrack, InboundVideoTrack samples and reports
- `partialFramesLost` field from InboundAudioTrack, InboundVideoTrack samples and reports
- `fullFramesLost` field from InboundAudioTrack, InboundVideoTrack samples and reports
- `averageRtcpInterval` field from InboundAudioTrack, InboundVideoTrack samples and reports
- `voiceActivityFlag` field from InboundAudioTrack, InboundVideoTrack samples and reports
- `frameBitDepth` field from InboundAudioTrack, InboundVideoTrack samples and reports
- `packetsFailedDecryption` field from InboundAudioTrack, InboundVideoTrack samples and reports
- `packetsDuplicated` field from InboundAudioTrack, InboundVideoTrack samples and reports
- `perDscpPacketsReceived` field from InboundAudioTrack, InboundVideoTrack samples and reports
- `sliCount` field from InboundAudioTrack, InboundVideoTrack samples and reports
- `fullFramesLost` field from InboundAudioTrack, InboundVideoTrack samples and reports
- `totalSamplesDecoded` field from InboundAudioTrack, InboundVideoTrack samples and reports
- `samplesDecodedWithSilk` field from InboundAudioTrack, InboundVideoTrack samples and reports
- `samplesDecodedWithCelt` field from InboundAudioTrack, InboundVideoTrack samples and reports
- `samplesreportsReceived` field from InboundAudioTrack, InboundVideoTrack samples and reports

- `rtxSsrc` field from OutboundAudioTrack, OutboundVideoTrack samples and reports
- `senderId` field from OutboundAudioTrack, OutboundVideoTrack samples and reports
- `lastPacketSentTimestamp` field from OutboundAudioTrack, OutboundVideoTrack samples and reports
- `packetsDiscardedOnSend` field from OutboundAudioTrack, OutboundVideoTrack samples and reports
- `bytesDiscardedOnSend` field from OutboundAudioTrack, OutboundVideoTrack samples and reports
- `fecPacketsSent` field from OutboundAudioTrack, OutboundVideoTrack samples and reports
- `framesDiscardedOnSend` field from OutboundAudioTrack, OutboundVideoTrack samples and reports
- `totalSamplesSent` field from OutboundAudioTrack, OutboundVideoTrack samples and reports
- `samplesEncodedWithSilk` field from OutboundAudioTrack, OutboundVideoTrack samples and reports
- `samplesEncodedWithCelt` field from OutboundAudioTrack, OutboundVideoTrack samples and reports
- `voiceActivityFlag` field from OutboundAudioTrack, OutboundVideoTrack samples and reports
- `sliCount` field from OutboundAudioTrack, OutboundVideoTrack samples and reports
- `frameBitDepth` field from OutboundAudioTrack, OutboundVideoTrack samples and reports
- `perDscpPacketsSent` field from OutboundAudioTrack, OutboundVideoTrack samples and reports
- `bitDepth` field from OutboundAudioTrack, OutboundVideoTrack samples and reports

## [2.0.4] — 2022-06-08

### Added

- csv column list for every report. Generated from the schema, required fields first, and fields are in sorted order

## [2.0.3] — 2022-05-10

### Added

- `remoteSfuId` to SfuInboundRtpPad reports
- `remoteTransportId` to SfuInboundRtpPad reports
- `remoteSinkId` to SfuInboundRtpPad reports
- `remoteRtpPadId` to SfuInboundRtpPad reports

## [2.0.2] — 2022-05-09

### Added

- `roundTripTime` to SfuOutboundRtp report

## [2.0.1] — 2022-05-08

### Added

- `internal` attribute to SfuSctpChannel sample
- `internal` attribute to SfuSctpStream report
- `internal` attribute to SfuTransport report

## [2.0.0] — 2022-05-05

init

## 2.0.0-beta — 2022-02-14 … 2022-04-27

Sixty-five prereleases leading to 2.0.0. The changes that shaped the 2.x schema:

### Added

- SFU sample chunk, SFU extension report, protobuf schema and descriptors
  (including the proto3 variant).
- `internal` flag on transports and on inbound/outbound RTP pad samples.
- `channelId` on SCTP channels; `mediaSinkId`; `versionName` on the operating
  system record.
- `sfuStreamId` on inbound and outbound audio/video track samples.
- Round-trip-time and fractional-loss metrics for outbound RTP pads.
- `version` constant exported from the generated schema module.

### Renamed

- `rtpStreamId` → `sfuStreamId` (outbound) and `sfuSinkId` (inbound).
- `sourceId` → `streamId` for inbound and outbound SFU pads.
- `mediaStreamId` → `sourceId`.
- `sctpStreams` → `sctpChannels`.

### Changed

- `mediaType` became an enum instead of a free-form string.
- Schema package renamed; missing fields added and mismatched fields corrected.
- A slimmer, sliced schema library was added for monitor components.

### Removed

- `schemaVersions` as part of `Samples`.
- `transportId` from the ICE candidate structures.
