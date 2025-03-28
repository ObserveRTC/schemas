import {
  AttachmentEncoder,
  NumberToNumberEncoder,
  StringToStringEncoder,
  OneTimePassEncoder,
	StringToUint8ArrayEncoder,
} from "./utils";
import { RemoteInboundRtpStats } from "./InputSamples";
import { ClientSample_PeerConnectionSample_RemoteInboundRtpStats } from "./OutputSamples";
import { Encoder } from "./utils";

export class RemoteInboundRtpEncoder implements Encoder<RemoteInboundRtpStats, ClientSample_PeerConnectionSample_RemoteInboundRtpStats> {
	public readonly ssrc: bigint;
  private _visited = false;

  private readonly _timestampEncoder: NumberToNumberEncoder;
  private readonly _idEncoder: StringToStringEncoder;
  private readonly _kindEncoder: StringToStringEncoder;
  private readonly _transportIdEncoder: OneTimePassEncoder<string>;
  private readonly _codecIdEncoder: OneTimePassEncoder<string>;
  private readonly _packetsReceivedEncoder: NumberToNumberEncoder;
  private readonly _packetsLostEncoder: NumberToNumberEncoder;
  private readonly _jitterEncoder: NumberToNumberEncoder;
  private readonly _localIdEncoder: StringToStringEncoder;
  private readonly _roundTripTimeEncoder: NumberToNumberEncoder;
  private readonly _totalRoundTripTimeEncoder: NumberToNumberEncoder;
  private readonly _fractionLostEncoder: NumberToNumberEncoder;
  private readonly _roundTripTimeMeasurementsEncoder: NumberToNumberEncoder;

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
    this._packetsLostEncoder = new NumberToNumberEncoder();
    this._jitterEncoder = new NumberToNumberEncoder();
    this._localIdEncoder = new StringToStringEncoder();
    this._roundTripTimeEncoder = new NumberToNumberEncoder();
    this._totalRoundTripTimeEncoder = new NumberToNumberEncoder();
    this._fractionLostEncoder = new NumberToNumberEncoder();
    this._roundTripTimeMeasurementsEncoder = new NumberToNumberEncoder();
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
    this._packetsLostEncoder.reset();
    this._jitterEncoder.reset();
    this._localIdEncoder.reset();
    this._roundTripTimeEncoder.reset();
    this._totalRoundTripTimeEncoder.reset();
    this._fractionLostEncoder.reset();
    this._roundTripTimeMeasurementsEncoder.reset();
  }

  public encode(sample: RemoteInboundRtpStats): ClientSample_PeerConnectionSample_RemoteInboundRtpStats {
    this._visited = true;
    
    return new ClientSample_PeerConnectionSample_RemoteInboundRtpStats({
			ssrc: this.ssrc,
			
      timestamp: this._timestampEncoder.encode(sample.timestamp),
      id: this._idEncoder.encode(sample.id),
      kind: this._kindEncoder.encode(sample.kind),
      transportId: this._transportIdEncoder.encode(sample.transportId),
      codecId: this._codecIdEncoder.encode(sample.codecId),
      packetsReceived: this._packetsReceivedEncoder.encode(sample.packetsReceived),
      packetsLost: this._packetsLostEncoder.encode(sample.packetsLost),
      jitter: this._jitterEncoder.encode(sample.jitter),
      localId: this._localIdEncoder.encode(sample.localId),
      roundTripTime: this._roundTripTimeEncoder.encode(sample.roundTripTime),
      totalRoundTripTime: this._totalRoundTripTimeEncoder.encode(sample.totalRoundTripTime),
      fractionLost: this._fractionLostEncoder.encode(sample.fractionLost),
      roundTripTimeMeasurements: this._roundTripTimeMeasurementsEncoder.encode(sample.roundTripTimeMeasurements),
      attachments: this._attachmentsEncoder.encode(sample.attachments),
    });
  }
}
