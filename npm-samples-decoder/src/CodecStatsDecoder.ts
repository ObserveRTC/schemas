import { Decoder } from "./utils";
import { CodecStats as OutputCodecStats } from "./OutputSamples";
import { ClientSample_PeerConnectionSample_CodecStats as InputCodecStats } from "./InputSamples";
import {
  AttachmentDecoder,
  NumberToNumberDecoder,
  StringToStringDecoder,
} from "./utils";

const logger = console;

export class CodecStatsDecoder
  implements Decoder<InputCodecStats, OutputCodecStats | undefined>
{
  private _visited = false;

  private readonly _timestampDecoder: NumberToNumberDecoder;
  private readonly _typeDecoder: StringToStringDecoder;
  private readonly _payloadTypeDecoder: NumberToNumberDecoder;
  private readonly _transportIdDecoder: StringToStringDecoder;
  private readonly _mimeTypeDecoder: StringToStringDecoder;
  private readonly _clockRateDecoder: NumberToNumberDecoder;
  private readonly _channelsDecoder: NumberToNumberDecoder;
  private readonly _sdpFmtpLineDecoder: StringToStringDecoder;
  private readonly _attachmentsDecoder: AttachmentDecoder;

  constructor(attachmentsDecoder: AttachmentDecoder) {
    this._timestampDecoder = new NumberToNumberDecoder();
    this._typeDecoder = new StringToStringDecoder();
    this._payloadTypeDecoder = new NumberToNumberDecoder();
    this._transportIdDecoder = new StringToStringDecoder();
    this._mimeTypeDecoder = new StringToStringDecoder();
    this._clockRateDecoder = new NumberToNumberDecoder();
    this._channelsDecoder = new NumberToNumberDecoder();
    this._sdpFmtpLineDecoder = new StringToStringDecoder();
    this._attachmentsDecoder = attachmentsDecoder;
  }

  public get visited(): boolean {
    const result = this._visited;
    this._visited = false;
    return result;
  }

  public reset(): void {
    this._attachmentsDecoder.reset();
    this._channelsDecoder.reset();
    this._clockRateDecoder.reset();
    this._mimeTypeDecoder.reset();
    this._payloadTypeDecoder.reset();
    this._sdpFmtpLineDecoder.reset();
    this._timestampDecoder.reset();
    this._transportIdDecoder.reset();
    this._typeDecoder.reset();
  }

  public decode(input: InputCodecStats): OutputCodecStats | undefined {
    this._visited = true;

    const timestamp = this._timestampDecoder.decode(input.timestamp);
	const mimeType = this._mimeTypeDecoder.decode(input.mimeType);
    const id = input.id;

    if (!timestamp || id === undefined || mimeType === undefined) {
      logger.warn("Invalid codec stats sample: missing timestamp or id");
      return undefined;
    }

    return {
      timestamp,
      id,
      payloadType: this._payloadTypeDecoder.decode(input.payloadType),
      transportId: this._transportIdDecoder.decode(input.transportId),
      mimeType,
      clockRate: this._clockRateDecoder.decode(input.clockRate),
      channels: this._channelsDecoder.decode(input.channels),
      sdpFmtpLine: this._sdpFmtpLineDecoder.decode(input.sdpFmtpLine),
      attachments: this._attachmentsDecoder.decode(input.attachments),
    };
  }
}