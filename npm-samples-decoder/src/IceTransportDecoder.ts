import { Decoder, BigIntToNumberDecoder } from "./utils";
import { ClientSample_PeerConnectionSample_IceTransportStats as InputIceTransportStats } from "./InputSamples";
import { IceTransportStats as OutputIceTransportStats } from "./OutputSamples";
import {
  NumberToNumberDecoder,
  StringToStringDecoder,
  AttachmentDecoder
} from "./utils";
import { logger } from "./Logger";

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

	private _actualValue: OutputIceTransportStats | undefined = undefined;

	constructor(
		public readonly id: string,
		private readonly _attachmentsDecoder: AttachmentDecoder,
	) {
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

		if (!timestamp) {
			logger.warn("Invalid ICE transport sample: missing timestamp or id");
			return undefined;
			}

		this._actualValue = {
			id: this.id,
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

		return this._actualValue;
	}

	public get actualValue(): OutputIceTransportStats | undefined {
		return this._actualValue;
	}
	
	public set actualValue(sample: OutputIceTransportStats | undefined) {
        if (!sample) return;
        
		this._visited = true;
		this._actualValue = sample;
		
		this._timestampDecoder.actualValue = sample.timestamp;
		this._packetsSentDecoder.actualValue = sample.packetsSent;
		this._packetsReceivedDecoder.actualValue = sample.packetsReceived;
		this._bytesSentDecoder.actualValue = sample.bytesSent;
		this._bytesReceivedDecoder.actualValue = sample.bytesReceived;
		this._iceRoleDecoder.actualValue = sample.iceRole;
		this._iceLocalUsernameFragmentDecoder.actualValue = sample.iceLocalUsernameFragment;
		this._dtlsStateDecoder.actualValue = sample.dtlsState;
		this._iceStateDecoder.actualValue = sample.iceState;
		this._selectedCandidatePairIdDecoder.actualValue = sample.selectedCandidatePairId;
		this._localCertificateIdDecoder.actualValue = sample.localCertificateId;
		this._remoteCertificateIdDecoder.actualValue = sample.remoteCertificateId;
		this._tlsVersionDecoder.actualValue = sample.tlsVersion;
		this._dtlsCipherDecoder.actualValue = sample.dtlsCipher;
		this._dtlsRoleDecoder.actualValue = sample.dtlsRole;
		this._srtpCipherDecoder.actualValue = sample.srtpCipher;
		this._selectedCandidatePairChangesDecoder.actualValue = sample.selectedCandidatePairChanges;
		this._attachmentsDecoder.actualValue = sample.attachments;
	}
}