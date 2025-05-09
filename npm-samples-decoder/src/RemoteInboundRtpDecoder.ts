import { 
  Decoder,
  NumberToNumberDecoder,
  StringToStringDecoder,
  OneTimePassDecoder,
  AttachmentDecoder
} from "./utils";
import { RemoteInboundRtpStats as OutputRemoteInboundRtpStats } from "./OutputSamples";
import { ClientSample_PeerConnectionSample_RemoteInboundRtpStats as InputRemoteInboundRtpStats } from "./InputSamples";
import { logger } from "./Logger";

export class RemoteInboundRtpDecoder implements Decoder<InputRemoteInboundRtpStats, OutputRemoteInboundRtpStats | undefined> {
  private _visited = false;
  private readonly _timestampDecoder: NumberToNumberDecoder;
  private readonly _idDecoder: StringToStringDecoder;
  private readonly _kindDecoder: StringToStringDecoder;
  private readonly _transportIdDecoder: OneTimePassDecoder<string>;
  private readonly _codecIdDecoder: OneTimePassDecoder<string>;
  private readonly _packetsReceivedDecoder: NumberToNumberDecoder;
  private readonly _packetsLostDecoder: NumberToNumberDecoder;
  private readonly _jitterDecoder: NumberToNumberDecoder;
  private readonly _localIdDecoder: StringToStringDecoder;
  private readonly _roundTripTimeDecoder: NumberToNumberDecoder;
  private readonly _totalRoundTripTimeDecoder: NumberToNumberDecoder;
  private readonly _fractionLostDecoder: NumberToNumberDecoder;
  private readonly _roundTripTimeMeasurementsDecoder: NumberToNumberDecoder;

  private _actualValue: OutputRemoteInboundRtpStats | undefined = undefined;

  constructor(
    public readonly ssrc: number,
    private readonly _attachmentsDecoder: AttachmentDecoder
  ) {
      this._timestampDecoder = new NumberToNumberDecoder();
      this._idDecoder = new StringToStringDecoder();
      this._kindDecoder = new StringToStringDecoder();
      this._transportIdDecoder = new OneTimePassDecoder<string>();
      this._codecIdDecoder = new OneTimePassDecoder<string>();
      this._packetsReceivedDecoder = new NumberToNumberDecoder();
      this._packetsLostDecoder = new NumberToNumberDecoder();
      this._jitterDecoder = new NumberToNumberDecoder();
      this._localIdDecoder = new StringToStringDecoder();
      this._roundTripTimeDecoder = new NumberToNumberDecoder();
      this._totalRoundTripTimeDecoder = new NumberToNumberDecoder();
      this._fractionLostDecoder = new NumberToNumberDecoder();
      this._roundTripTimeMeasurementsDecoder = new NumberToNumberDecoder();
  }

  public get visited(): boolean {
      const result = this._visited;
      this._visited = false;
      return result;
  }

  public reset(): void {
      this._timestampDecoder.reset();
      this._idDecoder.reset();
      this._kindDecoder.reset();
      this._transportIdDecoder.reset();
      this._codecIdDecoder.reset();
      this._packetsReceivedDecoder.reset();
      this._packetsLostDecoder.reset();
      this._jitterDecoder.reset();
      this._localIdDecoder.reset();
      this._roundTripTimeDecoder.reset();
      this._totalRoundTripTimeDecoder.reset();
      this._fractionLostDecoder.reset();
      this._roundTripTimeMeasurementsDecoder.reset();
  }

  public decode(input: InputRemoteInboundRtpStats): OutputRemoteInboundRtpStats | undefined {
      this._visited = true;

      const timestamp = this._timestampDecoder.decode(input.timestamp);
      const id = this._idDecoder.decode(input.id);
      const kind = this._kindDecoder.decode(input.kind);

      if (!timestamp || id === undefined || kind === undefined) {
          logger.warn("Invalid remote inbound RTP sample: missing timestamp or id");
          return undefined;
      }

      this._actualValue = {
          ssrc: this.ssrc,
          timestamp,
          id,
          kind,
          transportId: this._transportIdDecoder.decode(input.transportId),
          codecId: this._codecIdDecoder.decode(input.codecId),
          packetsReceived: this._packetsReceivedDecoder.decode(input.packetsReceived),
          packetsLost: this._packetsLostDecoder.decode(input.packetsLost),
          jitter: this._jitterDecoder.decode(input.jitter),
          localId: this._localIdDecoder.decode(input.localId),
          roundTripTime: this._roundTripTimeDecoder.decode(input.roundTripTime),
          totalRoundTripTime: this._totalRoundTripTimeDecoder.decode(input.totalRoundTripTime),
          fractionLost: this._fractionLostDecoder.decode(input.fractionLost),
          roundTripTimeMeasurements: this._roundTripTimeMeasurementsDecoder.decode(input.roundTripTimeMeasurements),
          attachments: this._attachmentsDecoder.decode(input.attachments),
      };

      return this._actualValue;
  }

  public get actualValue(): OutputRemoteInboundRtpStats | undefined {
      return this._actualValue;
  }

  public set actualValue(sample: OutputRemoteInboundRtpStats | undefined) {
      if (!sample) return;
      
      this._visited = true;
      this._actualValue = sample;

      this._timestampDecoder.actualValue = sample.timestamp;
      this._idDecoder.actualValue = sample.id;
      this._kindDecoder.actualValue = sample.kind;
      this._transportIdDecoder.actualValue = sample.transportId;
      this._codecIdDecoder.actualValue = sample.codecId;
      this._packetsReceivedDecoder.actualValue = sample.packetsReceived;
      this._packetsLostDecoder.actualValue = sample.packetsLost;
      this._jitterDecoder.actualValue = sample.jitter;
      this._localIdDecoder.actualValue = sample.localId;
      this._roundTripTimeDecoder.actualValue = sample.roundTripTime;
      this._totalRoundTripTimeDecoder.actualValue = sample.totalRoundTripTime;
      this._fractionLostDecoder.actualValue = sample.fractionLost;
      this._roundTripTimeMeasurementsDecoder.actualValue = sample.roundTripTimeMeasurements;
      this._attachmentsDecoder.actualValue = sample.attachments;
  }
}