import { Encoder } from "./utils";
import { CodecStats as InputCodecStats } from "./InputSamples";
import { ClientSample_PeerConnectionSample_CodecStats } from "./OutputSamples";
import {
  AppDataEncoder,
  NumberToNumberEncoder,
  StringToStringEncoder,
} from "./utils";

export class CodecStatsEncoder
  implements Encoder<InputCodecStats, ClientSample_PeerConnectionSample_CodecStats>
{
	private _visited = false;

  private readonly _timestampEncoder: NumberToNumberEncoder;
  private readonly _typeEncoder: StringToStringEncoder;
  private readonly _payloadTypeEncoder: NumberToNumberEncoder;
  private readonly _transportIdEncoder: StringToStringEncoder;
  private readonly _mimeTypeEncoder: StringToStringEncoder;
  private readonly _clockRateEncoder: NumberToNumberEncoder;
  private readonly _channelsEncoder: NumberToNumberEncoder;
  private readonly _sdpFmtpLineEncoder: StringToStringEncoder;
  private readonly _appDataEncoder: AppDataEncoder;

  constructor(appDataEncoder: AppDataEncoder) {
    this._timestampEncoder = new NumberToNumberEncoder();
    this._typeEncoder = new StringToStringEncoder();
    this._payloadTypeEncoder = new NumberToNumberEncoder();
    this._transportIdEncoder = new StringToStringEncoder();
    this._mimeTypeEncoder = new StringToStringEncoder();
    this._clockRateEncoder = new NumberToNumberEncoder();
    this._channelsEncoder = new NumberToNumberEncoder();
    this._sdpFmtpLineEncoder = new StringToStringEncoder();
    this._appDataEncoder = appDataEncoder;
  }

	public get visited(): boolean {
		const result = this._visited;
		this._visited = false;
		return result;
	}

	public reset(): void {
		this._appDataEncoder.reset();
		this._channelsEncoder.reset();
		this._clockRateEncoder.reset();
		this._mimeTypeEncoder.reset();
		this._payloadTypeEncoder.reset();
		this._sdpFmtpLineEncoder.reset();
		this._timestampEncoder.reset();
		this._transportIdEncoder.reset();
		this._typeEncoder.reset();
	}

  public encode(sample: InputCodecStats): ClientSample_PeerConnectionSample_CodecStats {
    return new ClientSample_PeerConnectionSample_CodecStats({
      timestamp: this._timestampEncoder.encode(sample.timestamp),
      type: this._typeEncoder.encode(sample.type),
      id: sample.id,
      payloadType: this._payloadTypeEncoder.encode(sample.payloadType),
      transportId: this._transportIdEncoder.encode(sample.transportId),
      mimeType: this._mimeTypeEncoder.encode(sample.mimeType),
      clockRate: this._clockRateEncoder.encode(sample.clockRate),
      channels: this._channelsEncoder.encode(sample.channels),
      sdpFmtpLine: this._sdpFmtpLineEncoder.encode(sample.sdpFmtpLine),
      appData: this._appDataEncoder.encode(sample.appData),
    });
  }
}
