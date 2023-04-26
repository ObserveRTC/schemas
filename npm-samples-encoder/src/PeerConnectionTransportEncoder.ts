import { PeerConnectionTransport } from "./InputSamples";
import { uuidToByteArray } from "./encodingTools";
import { 
	Samples_ClientSample_PeerConnectionTransport, 
	Samples_ClientSample_PeerConnectionTransport_PeerConnectionTransportEnum } from './OutputSamples';

export class PeerConnectionTransportEncoder {
	private readonly _peerConnectionId?: Uint8Array;
	private _transportId?: string;
	private _bytesReceived?: number;
	private _bytesSent?: number;
	private _dtlsCipher?: string;
	private _dtlsRole?: string;
	private _dtlsState?: string;
	private _iceLocalUsernameFragment?: string;
	private _iceRole?: string;
	private _iceState?: string;
	private _label?: string;
	private _localCertificateId?: string;
	private _packetsReceived?: number;
	private _packetsSent?: number;
	private _remoteCertificateId?: string;
	private _selectedCandidatePairChanges?: number;
	private _selectedCandidatePairId?: string;
	private _srtpCipher?: string;
	private _tlsGroup?: string;
	private _tlsVersion?: string;

	private _visited = false;

	public constructor(
		public readonly peerConnectionId: string
	) {
		this._peerConnectionId = uuidToByteArray(peerConnectionId);
	}

	public get visited(): boolean {
		const result = this._visited;
		this._visited = false;
		return result;
	}

	public encode(sample: PeerConnectionTransport): Samples_ClientSample_PeerConnectionTransport {
		this._visited = true;

		const result = new Samples_ClientSample_PeerConnectionTransport({
			peerConnectionId: this._peerConnectionId,
			transportId: this._encodeTransportId(sample.transportId),
			bytesReceived: this._encodeBytesReceived(sample.bytesReceived),
			bytesSent: this._encodeBytesSent(sample.bytesSent),
			dtlsCipher: this._encodeDtlsCipher(sample.dtlsCipher),
			dtlsRole: this._encodeDtlsRole(sample.dtlsRole),
			dtlsState: this._encodeDtlsState(sample.dtlsState),
			iceLocalUsernameFragment: this._encodeIceLocalUsernameFragment(sample.iceLocalUsernameFragment),
			iceRole: this._encodeIceRole(sample.iceRole),
			iceState: this._encodeIceState(sample.iceState),
			label: this._encodeLabel(sample.label),
			localCertificateId: this._encodeLocalCertificateId(sample.localCertificateId),
			packetsReceived: this._encodePacketsReceived(sample.packetsReceived),
			packetsSent: this._encodePacketsSent(sample.packetsSent),
			remoteCertificateId: this._encodeRemoteCertificateId(sample.remoteCertificateId),
			selectedCandidatePairChanges: this._encodeSelectedCandidatePairChanges(sample.selectedCandidatePairChanges),
			selectedCandidatePairId: this._encodeSelectedCandidatePairId(sample.selectedCandidatePairId),
			srtpCipher: this._encodeSrtpCipher(sample.srtpCipher),
			tlsGroup: this._encodeTlsGroup(sample.tlsGroup),
			tlsVersion: this._encodeTlsVersion(sample.tlsVersion),
		});
		return result;
	}

	private _encodeTransportId(transportId?: string): string | undefined {
		if (!transportId) return;
		if (transportId === this._transportId) return;
		this._transportId = transportId;
		return this._transportId;
	  }
	  
	  private _encodeBytesReceived(bytesReceived?: number): bigint | undefined {
		if (bytesReceived === undefined) return;
		if (bytesReceived === this._bytesReceived) return;
		this._bytesReceived = bytesReceived;
		return BigInt(this._bytesReceived);
	  }
	  
	  private _encodeBytesSent(bytesSent?: number): bigint | undefined {
		if (bytesSent === undefined) return;
		if (bytesSent === this._bytesSent) return;
		this._bytesSent = bytesSent;
		return BigInt(this._bytesSent);
	  }
	  
	  // Note: You need to define an appropriate type for dtlsCipher and replace "SomeType" with that.
	  private _encodeDtlsCipher(dtlsCipher?: string): string | undefined {
		if (!dtlsCipher) return;
		if (dtlsCipher === this._dtlsCipher) return;
		this._dtlsCipher = dtlsCipher;
		return this._dtlsCipher;
	  }
	  
	  // The same applies to other methods, replace "SomeType" with the appropriate type for each property.
	  private _encodeDtlsRole(dtlsRole?: string): Samples_ClientSample_PeerConnectionTransport_PeerConnectionTransportEnum | undefined {
		if (!dtlsRole) return;
		if (dtlsRole === this._dtlsRole) return;
		this._dtlsRole = dtlsRole;
		switch (dtlsRole.toLocaleLowerCase()) {
			case 'server':
				return Samples_ClientSample_PeerConnectionTransport_PeerConnectionTransportEnum.SERVER;
			case 'client':
				return Samples_ClientSample_PeerConnectionTransport_PeerConnectionTransportEnum.CLIENT;
			default:
				return Samples_ClientSample_PeerConnectionTransport_PeerConnectionTransportEnum.UNKNOWN;
		}
	  }
	  
	  private _encodeDtlsState(dtlsState?: string): string | undefined {
		if (!dtlsState) return;
		if (dtlsState === this._dtlsState) return;
		this._dtlsState = dtlsState;
		return this._dtlsState;
	  }
	  
	  private _encodeIceLocalUsernameFragment(iceLocalUsernameFragment?: string): string | undefined {
		if (!iceLocalUsernameFragment) return;
		if (iceLocalUsernameFragment === this._iceLocalUsernameFragment) return;
		this._iceLocalUsernameFragment = iceLocalUsernameFragment;
		return this._iceLocalUsernameFragment;
	  }
	  
	  private _encodeIceRole(iceRole?: string): string | undefined {
		if (!iceRole) return;
		if (iceRole === this._iceRole) return;
		this._iceRole = iceRole;
		return this._iceRole;
	  }
	  
	  private _encodeIceState(iceState?: string): string | undefined {
		if (!iceState) return;
		if (iceState === this._iceState) return;
		this._iceState = iceState;
		return this._iceState;
	  }
	  
	  private _encodeLabel(label?: string): string | undefined {
		if (!label) return;
		if (label === this._label) return;
		this._label = label;
		return this._label;
	  }
	  
	  private _encodeLocalCertificateId(localCertificateId?: string): string | undefined {
		if (!localCertificateId) return;
		if (localCertificateId === this._localCertificateId) return;
		this._localCertificateId = localCertificateId;
		return this._localCertificateId;
	  }
	  
	  private _encodePacketsReceived(packetsReceived?: number): number | undefined {
		if (packetsReceived === undefined) return;
		if (packetsReceived === this._packetsReceived) return;
		this._packetsReceived = packetsReceived;
		return this._packetsReceived;
	  }

	  private _encodePacketsSent(packetsSent?: number): number | undefined {
		if (packetsSent === undefined) return;
		if (packetsSent === this._packetsSent) return;
		this._packetsSent = packetsSent;
		return this._packetsSent;
	  }
	  
	  private _encodeRemoteCertificateId(remoteCertificateId?: string): string | undefined {
		if (!remoteCertificateId) return;
		if (remoteCertificateId === this._remoteCertificateId) return;
		this._remoteCertificateId = remoteCertificateId;
		return this._remoteCertificateId;
	  }
	  
	  private _encodeSelectedCandidatePairChanges(selectedCandidatePairChanges?: number): number | undefined {
		if (selectedCandidatePairChanges === undefined) return;
		if (selectedCandidatePairChanges === this._selectedCandidatePairChanges) return;
		this._selectedCandidatePairChanges = selectedCandidatePairChanges;
		return this._selectedCandidatePairChanges;
	  }
	  
	  private _encodeSelectedCandidatePairId(selectedCandidatePairId?: string): string | undefined {
		if (!selectedCandidatePairId) return;
		if (selectedCandidatePairId === this._selectedCandidatePairId) return;
		this._selectedCandidatePairId = selectedCandidatePairId;
		return this._selectedCandidatePairId;
	  }
	  
	  private _encodeSrtpCipher(srtpCipher?: string): string | undefined {
		if (!srtpCipher) return;
		if (srtpCipher === this._srtpCipher) return;
		this._srtpCipher = srtpCipher;
		return this._srtpCipher;
	  }
	  
	  private _encodeTlsGroup(tlsGroup?: string): string | undefined {
		if (!tlsGroup) return;
		if (tlsGroup === this._tlsGroup) return;
		this._tlsGroup = tlsGroup;
		return this._tlsGroup;
	  }
	  
	  private _encodeTlsVersion(tlsVersion?: string): string | undefined {
		if (!tlsVersion) return;
		if (tlsVersion === this._tlsVersion) return;
		this._tlsVersion = tlsVersion;
		return this._tlsVersion;
	  }
}
