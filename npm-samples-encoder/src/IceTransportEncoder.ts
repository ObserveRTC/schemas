import { Encoder, NumberToBigIntEncoder } from "./utils";
import { IceTransportStats as InputIceTransportStats } from "./InputSamples";
import {
  NumberToNumberEncoder,
  StringToStringEncoder,
  AttachmentEncoder,
} from "./utils";
import { ClientSample_PeerConnectionSample_IceTransportStats } from "./OutputSamples";

export class IceTransportEncoder implements Encoder<InputIceTransportStats, ClientSample_PeerConnectionSample_IceTransportStats> {
	private _visited = false;

  private readonly _timestampEncoder: NumberToNumberEncoder;
  private readonly _packetsSentEncoder: NumberToNumberEncoder;
  private readonly _packetsReceivedEncoder: NumberToNumberEncoder;
  private readonly _bytesSentEncoder: NumberToBigIntEncoder;
  private readonly _bytesReceivedEncoder: NumberToBigIntEncoder;
  private readonly _iceRoleEncoder: StringToStringEncoder;
  private readonly _iceLocalUsernameFragmentEncoder: StringToStringEncoder;
  private readonly _dtlsStateEncoder: StringToStringEncoder;
  private readonly _iceStateEncoder: StringToStringEncoder;
  private readonly _selectedCandidatePairIdEncoder: StringToStringEncoder;
  private readonly _localCertificateIdEncoder: StringToStringEncoder;
  private readonly _remoteCertificateIdEncoder: StringToStringEncoder;
  private readonly _tlsVersionEncoder: StringToStringEncoder;
  private readonly _dtlsCipherEncoder: StringToStringEncoder;
  private readonly _dtlsRoleEncoder: StringToStringEncoder;
  private readonly _srtpCipherEncoder: StringToStringEncoder;
  private readonly _selectedCandidatePairChangesEncoder: NumberToNumberEncoder;
  private readonly _attachmentsEncoder: AttachmentEncoder;

  constructor(attachmentsEncoder: AttachmentEncoder) {
    this._timestampEncoder = new NumberToNumberEncoder();
    this._packetsSentEncoder = new NumberToNumberEncoder();
    this._packetsReceivedEncoder = new NumberToNumberEncoder();
    this._bytesSentEncoder = new NumberToBigIntEncoder();
    this._bytesReceivedEncoder = new NumberToBigIntEncoder();
    this._iceRoleEncoder = new StringToStringEncoder();
    this._iceLocalUsernameFragmentEncoder = new StringToStringEncoder();
    this._dtlsStateEncoder = new StringToStringEncoder();
    this._iceStateEncoder = new StringToStringEncoder();
    this._selectedCandidatePairIdEncoder = new StringToStringEncoder();
    this._localCertificateIdEncoder = new StringToStringEncoder();
    this._remoteCertificateIdEncoder = new StringToStringEncoder();
    this._tlsVersionEncoder = new StringToStringEncoder();
    this._dtlsCipherEncoder = new StringToStringEncoder();
    this._dtlsRoleEncoder = new StringToStringEncoder();
    this._srtpCipherEncoder = new StringToStringEncoder();
    this._selectedCandidatePairChangesEncoder = new NumberToNumberEncoder();
    this._attachmentsEncoder = attachmentsEncoder;
  }
	
	public get visited(): boolean {
		const result = this._visited;
		this._visited = false;
		return result;
	}

  public reset() {
    this._timestampEncoder.reset();
    this._packetsSentEncoder.reset();
    this._packetsReceivedEncoder.reset();
    this._bytesSentEncoder.reset();
    this._bytesReceivedEncoder.reset();
    this._iceRoleEncoder.reset();
    this._iceLocalUsernameFragmentEncoder.reset();
    this._dtlsStateEncoder.reset();
    this._iceStateEncoder.reset();
    this._selectedCandidatePairIdEncoder.reset();
    this._localCertificateIdEncoder.reset();
    this._remoteCertificateIdEncoder.reset();
    this._tlsVersionEncoder.reset();
    this._dtlsCipherEncoder.reset();
    this._dtlsRoleEncoder.reset();
    this._srtpCipherEncoder.reset();
    this._selectedCandidatePairChangesEncoder.reset();
    this._attachmentsEncoder.reset();
  }

  public encode(sample: InputIceTransportStats): ClientSample_PeerConnectionSample_IceTransportStats {
    this._visited = true;
		
		return new ClientSample_PeerConnectionSample_IceTransportStats({
      timestamp: this._timestampEncoder.encode(sample.timestamp),
      id: sample.id,
      packetsSent: this._packetsSentEncoder.encode(sample.packetsSent),
      packetsReceived: this._packetsReceivedEncoder.encode(sample.packetsReceived),
      bytesSent: this._bytesSentEncoder.encode(sample.bytesSent),
      bytesReceived: this._bytesReceivedEncoder.encode(sample.bytesReceived),
      iceRole: this._iceRoleEncoder.encode(sample.iceRole),
      iceLocalUsernameFragment: this._iceLocalUsernameFragmentEncoder.encode(sample.iceLocalUsernameFragment),
      dtlsState: this._dtlsStateEncoder.encode(sample.dtlsState),
      iceState: this._iceStateEncoder.encode(sample.iceState),
      selectedCandidatePairId: this._selectedCandidatePairIdEncoder.encode(sample.selectedCandidatePairId),
      localCertificateId: this._localCertificateIdEncoder.encode(sample.localCertificateId),
      remoteCertificateId: this._remoteCertificateIdEncoder.encode(sample.remoteCertificateId),
      tlsVersion: this._tlsVersionEncoder.encode(sample.tlsVersion),
      dtlsCipher: this._dtlsCipherEncoder.encode(sample.dtlsCipher),
      dtlsRole: this._dtlsRoleEncoder.encode(sample.dtlsRole),
      srtpCipher: this._srtpCipherEncoder.encode(sample.srtpCipher),
      selectedCandidatePairChanges: this._selectedCandidatePairChangesEncoder.encode(sample.selectedCandidatePairChanges),
      attachments: this._attachmentsEncoder.encode(sample.attachments),
    });
  }
}
