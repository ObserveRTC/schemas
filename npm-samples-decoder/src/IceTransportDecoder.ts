import { Decoder, BigIntToNumberDecoder } from "./utils";
import { IceTransportStats as InputIceTransportStats } from "./InputSamples";
import { IceTransportStats as OutputIceTransportStats } from "./OutputSamples";
import {
  NumberToNumberDecoder,
  StringToStringDecoder,
  AttachmentDecoder
} from "./utils";

const logger = console;

export class IceTransportDecoder implements Decoder<InputIceTransportStats, OutputIceTransportStats | undefined> {
  private _visited = false;

  private readonly _timestampDecoder: NumberToNumberDecoder;
  private readonly _packetsSentDecoder: NumberToNumberDecoder;
  private readonly _packetsReceivedDecoder: NumberToNumberDecoder;
  private readonly _bytesSentDecoder: BigIntToNumberDecoder;
  private readonly _bytesReceivedDecoder: BigIntToNumberDecoder;
  private readonly _iceRoleDecoder: StringToStringDecoder;
  private readonly _iceLocalUsernameFragmentDecoder: StringToStringDecoder;
  private readonly _dtlsStateDecoder: StringToStringDecoder;
  private readonly _iceStateDecoder: StringToStringDecoder;
  private readonly _selectedCandidatePairIdDecoder: StringToStringDecoder;
  private readonly _localCertificateIdDecoder: StringToStringDecoder;
  private readonly _remoteCertificateIdDecoder: StringToStringDecoder;
  private readonly _tlsVersionDecoder: StringToStringDecoder;
  private readonly _dtlsCipherDecoder: StringToStringDecoder;
  private readonly _dtlsRoleDecoder: StringToStringDecoder;
  private readonly _srtpCipherDecoder: StringToStringDecoder;
  private readonly _selectedCandidatePairChangesDecoder: NumberToNumberDecoder;
  private readonly _attachmentsDecoder: AttachmentDecoder;

  constructor(attachmentsDecoder: AttachmentDecoder) {
    this._timestampDecoder = new NumberToNumberDecoder();
    this._packetsSentDecoder = new NumberToNumberDecoder();
    this._packetsReceivedDecoder = new NumberToNumberDecoder();
    this._bytesSentDecoder = new BigIntToNumberDecoder();
    this._bytesReceivedDecoder = new BigIntToNumberDecoder();
    this._iceRoleDecoder = new StringToStringDecoder();
    this._iceLocalUsernameFragmentDecoder = new StringToStringDecoder();
    this._dtlsStateDecoder = new StringToStringDecoder();
    this._iceStateDecoder = new StringToStringDecoder();
    this._selectedCandidatePairIdDecoder = new StringToStringDecoder();
    this._localCertificateIdDecoder = new StringToStringDecoder();
    this._remoteCertificateIdDecoder = new StringToStringDecoder();
    this._tlsVersionDecoder = new StringToStringDecoder();
    this._dtlsCipherDecoder = new StringToStringDecoder();
    this._dtlsRoleDecoder = new StringToStringDecoder();
    this._srtpCipherDecoder = new StringToStringDecoder();
    this._selectedCandidatePairChangesDecoder = new NumberToNumberDecoder();
    this._attachmentsDecoder = attachmentsDecoder;
  }

  public get visited(): boolean {
    const result = this._visited;
    this._visited = false;
    return result;
  }

  public reset(): void {
    this._timestampDecoder.reset();
    this._packetsSentDecoder.reset();
    this._packetsReceivedDecoder.reset();
    this._bytesSentDecoder.reset();
    this._bytesReceivedDecoder.reset();
    this._iceRoleDecoder.reset();
    this._iceLocalUsernameFragmentDecoder.reset();
    this._dtlsStateDecoder.reset();
    this._iceStateDecoder.reset();
    this._selectedCandidatePairIdDecoder.reset();
    this._localCertificateIdDecoder.reset();
    this._remoteCertificateIdDecoder.reset();
    this._tlsVersionDecoder.reset();
    this._dtlsCipherDecoder.reset();
    this._dtlsRoleDecoder.reset();
    this._srtpCipherDecoder.reset();
    this._selectedCandidatePairChangesDecoder.reset();
    this._attachmentsDecoder.reset();
  }

  public decode(input: InputIceTransportStats): OutputIceTransportStats | undefined {
    this._visited = true;

    const timestamp = this._timestampDecoder.decode(input.timestamp);
    const id = input.id;

    if (!timestamp || !id) {
      logger.warn("Invalid ICE transport sample: missing timestamp or id");
      return undefined;
    }

    return {
      id,
      timestamp,
      packetsSent: this._packetsSentDecoder.decode(input.packetsSent),
      packetsReceived: this._packetsReceivedDecoder.decode(input.packetsReceived),
      bytesSent: this._bytesSentDecoder.decode(input.bytesSent),
      bytesReceived: this._bytesReceivedDecoder.decode(input.bytesReceived),
      iceRole: this._iceRoleDecoder.decode(input.iceRole),
      iceLocalUsernameFragment: this._iceLocalUsernameFragmentDecoder.decode(input.iceLocalUsernameFragment),
      dtlsState: this._dtlsStateDecoder.decode(input.dtlsState),
      iceState: this._iceStateDecoder.decode(input.iceState),
      selectedCandidatePairId: this._selectedCandidatePairIdDecoder.decode(input.selectedCandidatePairId),
      localCertificateId: this._localCertificateIdDecoder.decode(input.localCertificateId),
      remoteCertificateId: this._remoteCertificateIdDecoder.decode(input.remoteCertificateId),
      tlsVersion: this._tlsVersionDecoder.decode(input.tlsVersion),
      dtlsCipher: this._dtlsCipherDecoder.decode(input.dtlsCipher),
      dtlsRole: this._dtlsRoleDecoder.decode(input.dtlsRole),
      srtpCipher: this._srtpCipherDecoder.decode(input.srtpCipher),
      selectedCandidatePairChanges: this._selectedCandidatePairChangesDecoder.decode(input.selectedCandidatePairChanges),
      attachments: this._attachmentsDecoder.decode(input.attachments),
    };
  }
}