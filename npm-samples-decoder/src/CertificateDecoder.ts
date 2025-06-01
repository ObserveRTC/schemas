import { CertificateStats as OutputCertificateStats } from "./OutputSamples";
import {
Decoder,
  NumberToNumberDecoder,
  StringToStringDecoder,
  AttachmentDecoder,
} from "./utils";
import { ClientSample_PeerConnectionSample_CertificateStats as InputCertificateStats } from "./InputSamples";
import { logger } from "./Logger";

export class CertificateDecoder implements Decoder<InputCertificateStats, OutputCertificateStats | undefined> {
	private _visited = false;

    private readonly _timestampDecoder: NumberToNumberDecoder;
    private readonly _fingerprintDecoder: StringToStringDecoder;
    private readonly _fingerprintAlgorithmDecoder: StringToStringDecoder;
    private readonly _base64CertificateDecoder: StringToStringDecoder;
    private readonly _issuerCertificateIdDecoder: StringToStringDecoder;

    private _actualValue: OutputCertificateStats | undefined = undefined;

    public constructor(
        public readonly id: string,
        private readonly _attachmentsDecoder: AttachmentDecoder,
    ) {
        this._timestampDecoder = new NumberToNumberDecoder();
        this._fingerprintDecoder = new StringToStringDecoder();
        this._fingerprintAlgorithmDecoder = new StringToStringDecoder();
        this._base64CertificateDecoder = new StringToStringDecoder();
        this._issuerCertificateIdDecoder = new StringToStringDecoder();
    }

	public get visited(): boolean {
		const result = this._visited;
		this._visited = false;
		return result;
	}

    public reset(): void {
        this._timestampDecoder.reset();
        this._fingerprintDecoder.reset();
        this._fingerprintAlgorithmDecoder.reset();
        this._base64CertificateDecoder.reset();
        this._issuerCertificateIdDecoder.reset();
        this._attachmentsDecoder.reset();
    }

    public decode(sample: InputCertificateStats): OutputCertificateStats | undefined {
        this._visited = true;
        const timestamp = this._timestampDecoder.decode(sample.timestamp);

        if (!timestamp) {
            logger.warn("Invalid sample: ", sample);
            return undefined;
        }

        this._actualValue = {
            timestamp,
            id: this.id,
            fingerprint: this._fingerprintDecoder.decode(sample.fingerprint),
            fingerprintAlgorithm: this._fingerprintAlgorithmDecoder.decode(sample.fingerprintAlgorithm),
            base64Certificate: this._base64CertificateDecoder.decode(sample.base64Certificate),
            issuerCertificateId: this._issuerCertificateIdDecoder.decode(sample.issuerCertificateId) ,
            attachments: this._attachmentsDecoder.decode(sample.attachments),
        };
    }

    public get actualValue(): OutputCertificateStats | undefined {
        return this._actualValue;
    }

    public set actualValue(sample: OutputCertificateStats | undefined) {
        if (!sample) return;
        
        this._visited = true;
        this._actualValue = sample;

        this._timestampDecoder.actualValue = sample.timestamp;
        this._fingerprintDecoder.actualValue = sample.fingerprint;
        this._fingerprintAlgorithmDecoder.actualValue = sample.fingerprintAlgorithm;
        this._base64CertificateDecoder.actualValue = sample.base64Certificate;
        this._issuerCertificateIdDecoder.actualValue = sample.issuerCertificateId;
        this._attachmentsDecoder.actualValue = sample.attachments;

    }
}
