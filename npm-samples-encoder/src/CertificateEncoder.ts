import { Encoder } from "./utils";
import { CertificateStats as InputCertificateStats } from "./InputSamples";
import {
  NumberToNumberEncoder,
  StringToStringEncoder,
  AttachmentEncoder,
} from "./utils";
import { ClientSample_PeerConnectionSample_CertificateStats } from "./OutputSamples";

export class CertificateEncoder implements Encoder<InputCertificateStats, ClientSample_PeerConnectionSample_CertificateStats> {
	private _visited = false;

  private readonly _timestampEncoder: NumberToNumberEncoder;
  private readonly _fingerprintEncoder: StringToStringEncoder;
  private readonly _fingerprintAlgorithmEncoder: StringToStringEncoder;
  private readonly _base64CertificateEncoder: StringToStringEncoder;
  private readonly _issuerCertificateIdEncoder: StringToStringEncoder;
  private readonly _attachmentsEncoder: AttachmentEncoder;

  constructor(attachmentsEncoder: AttachmentEncoder) {
    this._timestampEncoder = new NumberToNumberEncoder();
    this._fingerprintEncoder = new StringToStringEncoder();
    this._fingerprintAlgorithmEncoder = new StringToStringEncoder();
    this._base64CertificateEncoder = new StringToStringEncoder();
    this._issuerCertificateIdEncoder = new StringToStringEncoder();
    this._attachmentsEncoder = attachmentsEncoder;
  }

	public get visited(): boolean {
		const result = this._visited;
		this._visited = false;
		return result;
	}

  public reset(): void {
    this._timestampEncoder.reset();
    this._fingerprintEncoder.reset();
    this._fingerprintAlgorithmEncoder.reset();
    this._base64CertificateEncoder.reset();
    this._issuerCertificateIdEncoder.reset();
    this._attachmentsEncoder.reset();
  }

  public encode(sample: InputCertificateStats): ClientSample_PeerConnectionSample_CertificateStats {
		this._visited = true;
		
		return new ClientSample_PeerConnectionSample_CertificateStats({
      timestamp: this._timestampEncoder.encode(sample.timestamp),
      id: sample.id,
      fingerprint: this._fingerprintEncoder.encode(sample.fingerprint),
      fingerprintAlgorithm: this._fingerprintAlgorithmEncoder.encode(sample.fingerprintAlgorithm),
      base64Certificate: this._base64CertificateEncoder.encode(sample.base64Certificate),
      issuerCertificateId: this._issuerCertificateIdEncoder.encode(sample.issuerCertificateId) ,
      attachments: this._attachmentsEncoder.encode(sample.attachments),
    });
  }
}
