import { PeerConnectionTransport } from "./OutputSamples"
import { 
	Samples_ClientSample_PeerConnectionTransport, 
	Samples_ClientSample_PeerConnectionTransport_PeerConnectionTransportEnum
} from './InputSamples';

export class PeerConnectionTransportDecoder {
	private _label?: string;
	private _packetsSent?: number;
	private _packetsReceived?: number;
	private _bytesSent?: number;
	private _bytesReceived?: number;
	private _iceRole?: string;
	private _iceLocalUsernameFragment?: string;
	private _dtlsState?: string;
	private _selectedCandidatePairId?: string;
	private _iceState?: string;
	private _localCertificateId?: string;
	private _remoteCertificateId?: string;
	private _tlsVersion?: string;
	private _dtlsCipher?: string;
	private _dtlsRole?: "client" | "server" | "unknown";
	private _srtpCipher?: string;
	private _tlsGroup?: string;
	private _selectedCandidatePairChanges?: number;

	private _visited = false;

	public constructor(
		public readonly peerConnectionId: string,
		public readonly transportId: string,
	) {
		// empty
	}

	public get visited(): boolean {
		const result = this._visited;
		this._visited = false;
		return result;
	}

	public decode(sample: Samples_ClientSample_PeerConnectionTransport): PeerConnectionTransport  {
		this._visited = true;

		const result: PeerConnectionTransport = {
			peerConnectionId: this.peerConnectionId,
			transportId: this.transportId,
			label: this._decodeLabel(sample.label),
			packetsSent: this._decodePacketsSent(sample.packetsSent),
			packetsReceived: this._decodePacketsReceived(sample.packetsReceived),
			bytesSent: this._decodeBytesSent(sample.bytesSent),
			bytesReceived: this._decodeBytesReceived(sample.bytesReceived),
			iceRole: this._decodeIceRole(sample.iceRole),
			iceLocalUsernameFragment: this._decodeIceLocalUsernameFragment(sample.iceLocalUsernameFragment),
			dtlsState: this._decodeDtlsState(sample.dtlsState),
			selectedCandidatePairId: this._decodeSelectedCandidatePairId(sample.selectedCandidatePairId),
			iceState: this._decodeIceState(sample.iceState),
			localCertificateId: this._decodeLocalCertificateId(sample.localCertificateId),
			remoteCertificateId: this._decodeRemoteCertificateId(sample.remoteCertificateId),
			tlsVersion: this._decodeTlsVersion(sample.tlsVersion),
			dtlsCipher: this._decodeDtlsCipher(sample.dtlsCipher),
			dtlsRole: this._decodeDtlsRole(sample.dtlsRole),
			srtpCipher: this._decodeSrtpCipher(sample.srtpCipher),
			tlsGroup: this._decodeTlsGroup(sample.tlsGroup),
			selectedCandidatePairChanges: this._decodeSelectedCandidatePairChanges(sample.selectedCandidatePairChanges),
		};
		return result;
	}

	private _decodeLabel(label?: string): string | undefined {
		if (label === undefined) return this._label;
		this._label = label;
		return this._label;
	}
	
	private _decodePacketsSent(packetsSent?: number): number | undefined {
		if (packetsSent === undefined) return this._packetsSent;
		this._packetsSent = packetsSent;
		return this._packetsSent;
	}
	
	private _decodePacketsReceived(packetsReceived?: number): number | undefined {
		if (packetsReceived === undefined) return this._packetsReceived;
		this._packetsReceived = packetsReceived;
		return this._packetsReceived;
	}
	
	private _decodeBytesSent(bytesSent?: bigint): number | undefined {
		if (bytesSent === undefined) return this._bytesSent;
		this._bytesSent = Number(bytesSent);
		return this._bytesSent;
	}
	
	private _decodeBytesReceived(bytesReceived?: bigint): number | undefined {
		if (bytesReceived === undefined) return this._bytesReceived;
		this._bytesReceived = Number(bytesReceived);
		return this._bytesReceived;
	}
	
	private _decodeIceRole(iceRole?: string): string | undefined {
		if (iceRole === undefined) return this._iceRole;
		this._iceRole = iceRole;
		return this._iceRole;
	}
	
	private _decodeIceLocalUsernameFragment(iceLocalUsernameFragment?: string): string | undefined {
		if (iceLocalUsernameFragment === undefined) return this._iceLocalUsernameFragment;
		this._iceLocalUsernameFragment = iceLocalUsernameFragment;
		return this._iceLocalUsernameFragment;
	}
	
	private _decodeDtlsState(dtlsState?: string): string | undefined {
		if (dtlsState === undefined) return this._dtlsState;
		this._dtlsState = dtlsState;
		return this._dtlsState;
	}
	
	private _decodeSelectedCandidatePairId(selectedCandidatePairId?: string): string | undefined {
		if (selectedCandidatePairId === undefined) return this._selectedCandidatePairId;
		this._selectedCandidatePairId = selectedCandidatePairId;
		return this._selectedCandidatePairId;
	}
	
	private _decodeIceState(iceState?: string): string | undefined {
		if (iceState === undefined) return this._iceState;
		this._iceState = iceState;
		return this._iceState;
	}
	
	private _decodeLocalCertificateId(localCertificateId?: string): string | undefined {
		if (localCertificateId === undefined) return this._localCertificateId;
		this._localCertificateId = localCertificateId;
		return this._localCertificateId;
	}
	
	private _decodeRemoteCertificateId(remoteCertificateId?: string): string | undefined {
		if (remoteCertificateId === undefined) return this._remoteCertificateId;
		this._remoteCertificateId = remoteCertificateId;
		return this._remoteCertificateId;
	}
	
	private _decodeTlsVersion(tlsVersion?: string): string | undefined {
		if (tlsVersion === undefined) return this._tlsVersion;
		this._tlsVersion = tlsVersion;
		return this._tlsVersion;
	}

	private _decodeDtlsCipher(dtlsCipher?: string): string | undefined {
		if (dtlsCipher === undefined) return this._dtlsCipher;
		this._dtlsCipher = dtlsCipher;
		return this._dtlsCipher;
	}
	
	private _decodeDtlsRole(dtlsRole?: Samples_ClientSample_PeerConnectionTransport_PeerConnectionTransportEnum): "client" | "server" | "unknown" | undefined {
		if (dtlsRole === undefined) return this._dtlsRole;
		switch (dtlsRole) {
			case Samples_ClientSample_PeerConnectionTransport_PeerConnectionTransportEnum.CLIENT:
				this._dtlsRole = "client";
				return this._dtlsRole;
			case Samples_ClientSample_PeerConnectionTransport_PeerConnectionTransportEnum.SERVER:
				this._dtlsRole = "server";
				return this._dtlsRole;
			case Samples_ClientSample_PeerConnectionTransport_PeerConnectionTransportEnum.UNKNOWN:
				this._dtlsRole = "unknown";
				return this._dtlsRole;
		}
	}
	
	private _decodeSrtpCipher(srtpCipher?: string): string | undefined {
		if (srtpCipher === undefined) return this._srtpCipher;
		this._srtpCipher = srtpCipher;
		return this._srtpCipher;
	}
	
	private _decodeTlsGroup(tlsGroup?: string): string | undefined {
		if (tlsGroup === undefined) return this._tlsGroup;
		this._tlsGroup = tlsGroup;
		return this._tlsGroup;
	}
	
	private _decodeSelectedCandidatePairChanges(selectedCandidatePairChanges?: number): number | undefined {
		if (selectedCandidatePairChanges === undefined) return this._selectedCandidatePairChanges;
		this._selectedCandidatePairChanges = selectedCandidatePairChanges;
		return this._selectedCandidatePairChanges;
	}
}
