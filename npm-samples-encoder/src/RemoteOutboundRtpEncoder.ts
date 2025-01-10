import {
	AppDataEncoder,
	NumberToNumberEncoder,
	StringToStringEncoder,
	OneTimePassEncoder,
	StringToUint8ArrayEncoder,
	NumberToBigIntEncoder,
	Encoder,
} from "./utils";
import { RemoteOutboundRtpStats } from "./InputSamples";
import { ClientSample_PeerConnectionSample_RemoteOutboundRtpStats } from "./OutputSamples";

export class RemoteOutboundRtpEncoder implements Encoder<RemoteOutboundRtpStats, ClientSample_PeerConnectionSample_RemoteOutboundRtpStats> {
	private readonly _ssrc: bigint;
	private _visited = false;

	private readonly _timestampEncoder: NumberToNumberEncoder;
	private readonly _idEncoder: StringToStringEncoder;
	private readonly _kindEncoder: StringToStringEncoder;
	private readonly _transportIdEncoder: OneTimePassEncoder<string>;
	private readonly _codecIdEncoder: OneTimePassEncoder<string>;
	private readonly _packetsSentEncoder: NumberToNumberEncoder;
	private readonly _bytesSentEncoder: NumberToBigIntEncoder;
	private readonly _localIdEncoder: StringToStringEncoder;
	private readonly _remoteTimestampEncoder: NumberToNumberEncoder;
	private readonly _reportsSentEncoder: NumberToNumberEncoder;
	private readonly _roundTripTimeEncoder: NumberToNumberEncoder;
	private readonly _totalRoundTripTimeEncoder: NumberToNumberEncoder;
	private readonly _roundTripTimeMeasurementsEncoder: NumberToNumberEncoder;
	

	constructor(
		ssrc: number,
		private readonly _appDataEncoder: AppDataEncoder
	) {
		this._ssrc = BigInt(ssrc);

		this._timestampEncoder = new NumberToNumberEncoder();
		this._idEncoder = new StringToStringEncoder();
		this._kindEncoder = new StringToStringEncoder();
		this._transportIdEncoder = new OneTimePassEncoder<string>();
		this._codecIdEncoder = new OneTimePassEncoder<string>();
		this._packetsSentEncoder = new NumberToNumberEncoder();
		this._bytesSentEncoder = new NumberToBigIntEncoder();
		this._localIdEncoder = new StringToStringEncoder();
		this._remoteTimestampEncoder = new NumberToNumberEncoder();
		this._reportsSentEncoder = new NumberToNumberEncoder();
		this._roundTripTimeEncoder = new NumberToNumberEncoder();
		this._totalRoundTripTimeEncoder = new NumberToNumberEncoder();
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
		this._packetsSentEncoder.reset();
		this._bytesSentEncoder.reset();
		this._localIdEncoder.reset();
		this._remoteTimestampEncoder.reset();
		this._reportsSentEncoder.reset();
		this._roundTripTimeEncoder.reset();
		this._totalRoundTripTimeEncoder.reset();
		this._roundTripTimeMeasurementsEncoder.reset();
	}

	public encode(sample: RemoteOutboundRtpStats): ClientSample_PeerConnectionSample_RemoteOutboundRtpStats {
		this._visited = true;
		
		return new ClientSample_PeerConnectionSample_RemoteOutboundRtpStats({
			ssrc: this._ssrc,
			timestamp: this._timestampEncoder.encode(sample.timestamp),
			id: this._idEncoder.encode(sample.id),
			kind: this._kindEncoder.encode(sample.kind),
			transportId: this._transportIdEncoder.encode(sample.transportId),
			codecId: this._codecIdEncoder.encode(sample.codecId),
			packetsSent: this._packetsSentEncoder.encode(sample.packetsSent),
			bytesSent: this._bytesSentEncoder.encode(sample.bytesSent),
			localId: this._localIdEncoder.encode(sample.localId),
			remoteTimestamp: this._remoteTimestampEncoder.encode(sample.remoteTimestamp),
			reportsSent: this._reportsSentEncoder.encode(sample.reportsSent),
			roundTripTime: this._roundTripTimeEncoder.encode(sample.roundTripTime),
			totalRoundTripTime: this._totalRoundTripTimeEncoder.encode(sample.totalRoundTripTime),
			roundTripTimeMeasurements: this._roundTripTimeMeasurementsEncoder.encode(sample.roundTripTimeMeasurements),
			appData: this._appDataEncoder.encode(sample.appData),
		});
	}
}