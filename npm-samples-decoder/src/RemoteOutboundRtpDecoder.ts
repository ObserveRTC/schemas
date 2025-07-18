import { 
    Decoder,
    BigIntToNumberDecoder,
    NumberToNumberDecoder,
    StringToStringDecoder,
    OneTimePassDecoder,
    AttachmentDecoder
} from "./utils";
import { RemoteOutboundRtpStats as OutputRemoteOutboundRtpStats } from "./OutputSamples";
import { ClientSample_PeerConnectionSample_RemoteOutboundRtpStats as InputRemoteOutboundRtpStats } from "./InputSamples";
import { logger } from "./Logger";

export class RemoteOutboundRtpDecoder implements Decoder<InputRemoteOutboundRtpStats, OutputRemoteOutboundRtpStats | undefined> {
    private _visited = false;
    private readonly _timestampDecoder: NumberToNumberDecoder;
    private readonly _idDecoder: StringToStringDecoder;
    private readonly _kindDecoder: StringToStringDecoder;
    private readonly _transportIdDecoder: OneTimePassDecoder<string>;
    private readonly _codecIdDecoder: OneTimePassDecoder<string>;
    private readonly _packetsSentDecoder: NumberToNumberDecoder;
    private readonly _bytesSentDecoder: BigIntToNumberDecoder;
    private readonly _localIdDecoder: StringToStringDecoder;
    private readonly _remoteTimestampDecoder: NumberToNumberDecoder;
    private readonly _reportsSentDecoder: NumberToNumberDecoder;
    private readonly _roundTripTimeDecoder: NumberToNumberDecoder;
    private readonly _totalRoundTripTimeDecoder: NumberToNumberDecoder;
    private readonly _roundTripTimeMeasurementsDecoder: NumberToNumberDecoder;

    private _actualValue: OutputRemoteOutboundRtpStats | undefined = undefined;

    constructor(
		public readonly ssrc: number,
        private readonly _attachmentsDecoder: AttachmentDecoder
    ) {
        this._timestampDecoder = new NumberToNumberDecoder();
        this._idDecoder = new StringToStringDecoder();
        this._kindDecoder = new StringToStringDecoder();
        this._transportIdDecoder = new OneTimePassDecoder<string>();
        this._codecIdDecoder = new OneTimePassDecoder<string>();
        this._packetsSentDecoder = new NumberToNumberDecoder();
        this._bytesSentDecoder = new BigIntToNumberDecoder();
        this._localIdDecoder = new StringToStringDecoder();
        this._remoteTimestampDecoder = new NumberToNumberDecoder();
        this._reportsSentDecoder = new NumberToNumberDecoder();
        this._roundTripTimeDecoder = new NumberToNumberDecoder();
        this._totalRoundTripTimeDecoder = new NumberToNumberDecoder();
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
        this._packetsSentDecoder.reset();
        this._bytesSentDecoder.reset();
        this._localIdDecoder.reset();
        this._remoteTimestampDecoder.reset();
        this._reportsSentDecoder.reset();
        this._roundTripTimeDecoder.reset();
        this._totalRoundTripTimeDecoder.reset();
        this._roundTripTimeMeasurementsDecoder.reset();
    }

    public decode(input: InputRemoteOutboundRtpStats): OutputRemoteOutboundRtpStats | undefined {
        this._visited = true;

        const timestamp = this._timestampDecoder.decode(input.timestamp);
        const id = this._idDecoder.decode(input.id);
		const kind = this._kindDecoder.decode(input.kind);

        if (!timestamp || id === undefined || kind === undefined) {
            logger.warn("Invalid remote outbound RTP sample: missing timestamp or id or kind", input);
            return undefined;
        }

        this._actualValue = {
            ssrc: this.ssrc,
            timestamp,
            id,
            kind,
            transportId: this._transportIdDecoder.decode(input.transportId),
            codecId: this._codecIdDecoder.decode(input.codecId),
            packetsSent: this._packetsSentDecoder.decode(input.packetsSent),
            bytesSent: this._bytesSentDecoder.decode(input.bytesSent),
            localId: this._localIdDecoder.decode(input.localId),
            remoteTimestamp: this._remoteTimestampDecoder.decode(input.remoteTimestamp),
            reportsSent: this._reportsSentDecoder.decode(input.reportsSent),
            roundTripTime: this._roundTripTimeDecoder.decode(input.roundTripTime),
            totalRoundTripTime: this._totalRoundTripTimeDecoder.decode(input.totalRoundTripTime),
            roundTripTimeMeasurements: this._roundTripTimeMeasurementsDecoder.decode(input.roundTripTimeMeasurements),
            attachments: this._attachmentsDecoder.decode(input.attachments),
        };

        return this._actualValue;
    }

    public get actualValue(): OutputRemoteOutboundRtpStats | undefined {
        return this._actualValue;
    }

    public set actualValue(sample: OutputRemoteOutboundRtpStats | undefined) {
        if (!sample) return;

        this._visited = true;
        this._actualValue = sample;

        this._timestampDecoder.actualValue = sample.timestamp;
        this._idDecoder.actualValue = sample.id;
        this._kindDecoder.actualValue = sample.kind;
        this._transportIdDecoder.actualValue = sample.transportId;
        this._codecIdDecoder.actualValue = sample.codecId;
        this._packetsSentDecoder.actualValue = sample.packetsSent;
        this._bytesSentDecoder.actualValue = sample.bytesSent;
        this._localIdDecoder.actualValue = sample.localId;
        this._remoteTimestampDecoder.actualValue = sample.remoteTimestamp;
        this._reportsSentDecoder.actualValue = sample.reportsSent;
        this._roundTripTimeDecoder.actualValue = sample.roundTripTime;
        this._totalRoundTripTimeDecoder.actualValue = sample.totalRoundTripTime;
        this._roundTripTimeMeasurementsDecoder.actualValue = sample.roundTripTimeMeasurements;
        this._attachmentsDecoder.actualValue = sample.attachments;
    }
}
