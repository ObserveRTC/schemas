import {
  AttachmentEncoder,
  NumberToBigIntEncoder,
  NumberToNumberEncoder,
  StringToStringEncoder,
  OneTimePassEncoder,
} from "./utils";
import { RemoteInboundRtpStats } from "./InputSamples";
import { ClientSample_PeerConnectionSample_RemoteInboundRtpStatsSchema } from "./OutputSamples";
import { Encoder } from "./utils";
import { create as createMessage, MessageInitShape } from "@bufbuild/protobuf";

export class RemoteInboundRtpEncoder implements Encoder<RemoteInboundRtpStats, MessageInitShape<typeof ClientSample_PeerConnectionSample_RemoteInboundRtpStatsSchema>> {
	public readonly ssrc: bigint;
  private _visited = false;

  private readonly _timestampEncoder: NumberToNumberEncoder;
  private readonly _idEncoder: StringToStringEncoder;
  private readonly _kindEncoder: StringToStringEncoder;
  private readonly _transportIdEncoder: OneTimePassEncoder<string>;
  private readonly _codecIdEncoder: OneTimePassEncoder<string>;
  private readonly _packetsReceivedEncoder: NumberToNumberEncoder;
  private readonly _packetsReceivedWithCeEncoder: NumberToNumberEncoder;
  private readonly _packetsReceivedWithEct1Encoder: NumberToNumberEncoder;
  private readonly _packetsReportedAsLostEncoder: NumberToNumberEncoder;
  private readonly _packetsReportedAsLostButRecoveredEncoder: NumberToNumberEncoder;
  private readonly _packetsLostEncoder: NumberToNumberEncoder;
  private readonly _packetsWithBleachedEct1MarkingEncoder: NumberToBigIntEncoder;
  private readonly _jitterEncoder: NumberToNumberEncoder;
  private readonly _localIdEncoder: StringToStringEncoder;
  private readonly _roundTripTimeEncoder: NumberToNumberEncoder;
  private readonly _totalRoundTripTimeEncoder: NumberToNumberEncoder;
  private readonly _fractionLostEncoder: NumberToNumberEncoder;
  private readonly _roundTripTimeMeasurementsEncoder: NumberToBigIntEncoder;

  constructor(
		ssrc: number,
		private readonly _attachmentsEncoder: AttachmentEncoder
	) {
		this.ssrc = BigInt(ssrc);

    this._timestampEncoder = new NumberToNumberEncoder();
    this._idEncoder = new StringToStringEncoder();
    this._kindEncoder = new StringToStringEncoder();
    this._transportIdEncoder = new OneTimePassEncoder<string>();
    this._codecIdEncoder = new OneTimePassEncoder<string>();
    this._packetsReceivedEncoder = new NumberToNumberEncoder();
    this._packetsReceivedWithCeEncoder = new NumberToNumberEncoder();
    this._packetsReceivedWithEct1Encoder = new NumberToNumberEncoder();
    this._packetsReportedAsLostEncoder = new NumberToNumberEncoder();
    this._packetsReportedAsLostButRecoveredEncoder = new NumberToNumberEncoder();
    this._packetsLostEncoder = new NumberToNumberEncoder();
    this._packetsWithBleachedEct1MarkingEncoder = new NumberToBigIntEncoder();
    this._jitterEncoder = new NumberToNumberEncoder();
    this._localIdEncoder = new StringToStringEncoder();
    this._roundTripTimeEncoder = new NumberToNumberEncoder();
    this._totalRoundTripTimeEncoder = new NumberToNumberEncoder();
    this._fractionLostEncoder = new NumberToNumberEncoder();
    this._roundTripTimeMeasurementsEncoder = new NumberToBigIntEncoder();
  }

  public get visited(): boolean {
    const result = this._visited;
    this._visited = false;
    return result;
  }

  public reset(): void {
    this._timestampEncoder.reset();
    this._idEncoder.reset();
    this._kindEncoder.reset();
    this._transportIdEncoder.reset();
    this._codecIdEncoder.reset();
    this._packetsReceivedEncoder.reset();
    this._packetsReceivedWithCeEncoder.reset();
    this._packetsReceivedWithEct1Encoder.reset();
    this._packetsReportedAsLostEncoder.reset();
    this._packetsReportedAsLostButRecoveredEncoder.reset();
    this._packetsLostEncoder.reset();
    this._packetsWithBleachedEct1MarkingEncoder.reset();
    this._jitterEncoder.reset();
    this._localIdEncoder.reset();
    this._roundTripTimeEncoder.reset();
    this._totalRoundTripTimeEncoder.reset();
    this._fractionLostEncoder.reset();
    this._roundTripTimeMeasurementsEncoder.reset();
  }

  public encode(sample: RemoteInboundRtpStats): MessageInitShape<typeof ClientSample_PeerConnectionSample_RemoteInboundRtpStatsSchema> {
    this._visited = true;

    return {
			ssrc: this.ssrc,

      timestamp: this._timestampEncoder.encode(sample.timestamp),
      id: this._idEncoder.encode(sample.id),
      kind: this._kindEncoder.encode(sample.kind),
      transportId: this._transportIdEncoder.encode(sample.transportId),
      codecId: this._codecIdEncoder.encode(sample.codecId),
      packetsReceived: this._packetsReceivedEncoder.encode(sample.packetsReceived),
      packetsReceivedWithCe: this._packetsReceivedWithCeEncoder.encode(sample.packetsReceivedWithCe),
      packetsReceivedWithEct1: this._packetsReceivedWithEct1Encoder.encode(sample.packetsReceivedWithEct1),
      packetsReportedAsLost: this._packetsReportedAsLostEncoder.encode(sample.packetsReportedAsLost),
      packetsReportedAsLostButRecovered: this._packetsReportedAsLostButRecoveredEncoder.encode(sample.packetsReportedAsLostButRecovered),
      packetsLost: this._packetsLostEncoder.encode(sample.packetsLost),
      packetsWithBleachedEct1Marking: this._packetsWithBleachedEct1MarkingEncoder.encode(sample.packetsWithBleachedEct1Marking),
      jitter: this._jitterEncoder.encode(sample.jitter),
      localId: this._localIdEncoder.encode(sample.localId),
      roundTripTime: this._roundTripTimeEncoder.encode(sample.roundTripTime),
      totalRoundTripTime: this._totalRoundTripTimeEncoder.encode(sample.totalRoundTripTime),
      fractionLost: this._fractionLostEncoder.encode(sample.fractionLost),
      roundTripTimeMeasurements: this._roundTripTimeMeasurementsEncoder.encode(sample.roundTripTimeMeasurements),
      attachments: this._attachmentsEncoder.encode(sample.attachments),
    };
  }
}
