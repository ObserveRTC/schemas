import { SfuTransport } from "./OutputSamples";
import { Samples_SfuSample_SfuTransport } from './InputSamples';

export class SfuTransportDecoder {
	private _noReport?: boolean;
	private _internal?: boolean;
	private _dtlsState?: string;
	private _iceState?: string;
	private _sctpState?: string;
	private _iceRole?: string;
	private _localAddress?: string;
	private _localPort?: number;
	private _protocol?: string;
	private _remoteAddress?: string;
	private _remotePort?: number;
	private _rtpBytesReceived?: number;
	private _rtpBytesSent?: number;
	private _rtpPacketsReceived?: number;
	private _rtpPacketsSent?: number;
	private _rtpPacketsLost?: number;
	private _rtxBytesReceived?: number;
	private _rtxBytesSent?: number;
	private _rtxPacketsReceived?: number;
	private _rtxPacketsSent?: number;
	private _rtxPacketsLost?: number;
	private _rtxPacketsDiscarded?: number;
	private _sctpBytesReceived?: number;
	private _sctpBytesSent?: number;
	private _sctpPacketsReceived?: number;
	private _sctpPacketsSent?: number;
	private _visited = false;

	public constructor(
		public readonly transportId: string,
	) {
		// empty
	}

	public get visited(): boolean {
		const result = this._visited;
		this._visited = false;
		return result;
	}

	public decode(sample: Samples_SfuSample_SfuTransport): SfuTransport {
		this._visited = true;
	
		const result: SfuTransport = {
			transportId: this.transportId,
			noReport: this._decodeNoReport(sample.noReport),
			internal: this._decodeInternal(sample.internal),
			dtlsState: this._decodeDtlsState(sample.dtlsState),
			iceState: this._decodeIceState(sample.iceState),
			sctpState: this._decodeSctpState(sample.sctpState),
			iceRole: this._decodeIceRole(sample.iceRole),
			localAddress: this._decodeLocalAddress(sample.localAddress),
			localPort: this._decodeLocalPort(sample.localPort),
			protocol: this._decodeProtocol(sample.protocol),
			remoteAddress: this._decodeRemoteAddress(sample.remoteAddress),
			remotePort: this._decodeRemotePort(sample.remotePort),
			rtpBytesReceived: this._decodeRtpBytesReceived(sample.rtpBytesReceived),
			rtpBytesSent: this._decodeRtpBytesSent(sample.rtpBytesSent),
			rtpPacketsReceived: this._decodeRtpPacketsReceived(sample.rtpPacketsReceived),
			rtpPacketsSent: this._decodeRtpPacketsSent(sample.rtpPacketsSent),
			rtpPacketsLost: this._decodeRtpPacketsLost(sample.rtpPacketsLost),
			rtxBytesReceived: this._decodeRtxBytesReceived(sample.rtxBytesReceived),
			rtxBytesSent: this._decodeRtxBytesSent(sample.rtxBytesSent),
			rtxPacketsReceived: this._decodeRtxPacketsReceived(sample.rtxPacketsReceived),
			rtxPacketsSent: this._decodeRtxPacketsSent(sample.rtxPacketsSent),
			rtxPacketsLost: this._decodeRtxPacketsLost(sample.rtxPacketsLost),
			rtxPacketsDiscarded: this._decodeRtxPacketsDiscarded(sample.rtxPacketsDiscarded),
			sctpBytesReceived: this._decodeSctpBytesReceived(sample.sctpBytesReceived),
			sctpBytesSent: this._decodeSctpBytesSent(sample.sctpBytesSent),
			sctpPacketsReceived: this._decodeSctpPacketsReceived(sample.sctpPacketsReceived),
			sctpPacketsSent: this._decodeSctpPacketsSent(sample.sctpPacketsSent),
		};
		return result;
	}
	
	private _decodeNoReport(noReport?: boolean): boolean | undefined {
		if (noReport === undefined) return this._noReport;
		this._noReport = noReport;
		return this._noReport;
	}
	  
	private _decodeInternal(internal?: boolean): boolean | undefined {
		if (internal === undefined) return this._internal;
		this._internal = internal;
		return this._internal;
	}
	  
	private _decodeDtlsState(dtlsState?: string): string | undefined {
		if (dtlsState === undefined) return this._dtlsState;
		this._dtlsState = dtlsState;
		return this._dtlsState;
	}
	  
	private _decodeIceState(iceState?: string): string | undefined {
		if (iceState === undefined) return this._iceState;
		this._iceState = iceState;
		return this._iceState;
	}
	
	private _decodeSctpState(sctpState?: string): string | undefined {
		if (sctpState === undefined) return this._sctpState;
		this._sctpState = sctpState;
		return this._sctpState;
	}
	  
	private _decodeIceRole(iceRole?: string): string | undefined {
		if (iceRole === undefined) return this._iceRole;
		this._iceRole = iceRole;
		return this._iceRole;
	}
	  
	private _decodeLocalAddress(localAddress?: string): string | undefined {
		if (localAddress === undefined) return this._localAddress;
		this._localAddress = localAddress;
		return this._localAddress;
	}
	  
	private _decodeLocalPort(localPort?: number): number | undefined {
		if (localPort === undefined) return this._localPort;
		this._localPort = localPort;
		return this._localPort;
	}
	  
	private _decodeProtocol(protocol?: string): string | undefined {
		if (protocol === undefined) return this._protocol;
		this._protocol = protocol;
		return this._protocol;
	}
	  
	private _decodeRemoteAddress(remoteAddress?: string): string | undefined {
		if (remoteAddress === undefined) return this._remoteAddress;
		this._remoteAddress = remoteAddress;
		return this._remoteAddress;
	}
	  
	private _decodeRemotePort(remotePort?: number): number | undefined {
		if (remotePort === undefined) return this._remotePort;
		this._remotePort = remotePort;
		return this._remotePort;
	}
	  
	private _decodeRtpBytesReceived(rtpBytesReceived?: bigint): number | undefined {
		if (rtpBytesReceived === undefined) return this._rtpBytesReceived;
		this._rtpBytesReceived = Number(rtpBytesReceived);
		return this._rtpBytesReceived;
	}
	  
	private _decodeRtpBytesSent(rtpBytesSent?: bigint): number | undefined {
		if (rtpBytesSent === undefined) return this._rtpBytesSent;
		this._rtpBytesSent = Number(rtpBytesSent);
		return this._rtpBytesSent;
	}
	  
	private _decodeRtpPacketsReceived(rtpPacketsReceived?: number): number | undefined {
		if (rtpPacketsReceived === undefined) return this._rtpPacketsReceived;
		this._rtpPacketsReceived = Number(rtpPacketsReceived);
		return this._rtpPacketsReceived;
	}
	  
	private _decodeRtpPacketsSent(rtpPacketsSent?: number): number | undefined {
		if (rtpPacketsSent === undefined) return this._rtpPacketsSent;
		this._rtpPacketsSent = Number(rtpPacketsSent);
		return this._rtpPacketsSent;
	}
	  
	private _decodeRtpPacketsLost(rtpPacketsLost?: number): number | undefined {
		if (rtpPacketsLost === undefined) return this._rtpPacketsLost;
		this._rtpPacketsLost = rtpPacketsLost;
		return this._rtpPacketsLost;
	}
	  
	private _decodeRtxBytesReceived(rtxBytesReceived?: bigint): number | undefined {
		if (rtxBytesReceived === undefined) return this._rtxBytesReceived;
		this._rtxBytesReceived = Number(rtxBytesReceived);
		return this._rtxBytesReceived;
	}
	
	private _decodeRtxBytesSent(rtxBytesSent?: bigint): number | undefined {
		if (rtxBytesSent === undefined) return this._rtxBytesSent;
		this._rtxBytesSent = Number(rtxBytesSent);
		return this._rtxBytesSent;
	}
	  
	private _decodeRtxPacketsReceived(rtxPacketsReceived?: number): number | undefined {
		if (rtxPacketsReceived === undefined) return this._rtxPacketsReceived;
		this._rtxPacketsReceived = rtxPacketsReceived;
		return this._rtxPacketsReceived;
	}
	  
	private _decodeRtxPacketsSent(rtxPacketsSent?: number): number | undefined {
		if (rtxPacketsSent === undefined) return this._rtxPacketsSent;
		this._rtxPacketsSent = rtxPacketsSent;
		return this._rtxPacketsSent;
	}
	  
	  private _decodeRtxPacketsLost(rtxPacketsLost?: number): number | undefined {
		if (rtxPacketsLost === undefined) return this._rtxPacketsLost;
		this._rtxPacketsLost = rtxPacketsLost;
		return this._rtxPacketsLost;
	  }
	  
	private _decodeRtxPacketsDiscarded(rtxPacketsDiscarded?: number): number | undefined {
		if (rtxPacketsDiscarded === undefined) return this._rtxPacketsDiscarded;
		this._rtxPacketsDiscarded = rtxPacketsDiscarded;
		return this._rtxPacketsDiscarded;
	}
	  
	private _decodeSctpBytesReceived(sctpBytesReceived?: bigint): number | undefined {
		if (sctpBytesReceived === undefined) return this._sctpBytesReceived;
		this._sctpBytesReceived = Number(sctpBytesReceived);
		return this._sctpBytesReceived;
	}
	  
	private _decodeSctpBytesSent(sctpBytesSent?: bigint): number | undefined {
		if (sctpBytesSent === undefined) return this._sctpBytesSent;
		this._sctpBytesSent = Number(sctpBytesSent);
		return this._sctpBytesSent;
	}
	  
	private _decodeSctpPacketsReceived(sctpPacketsReceived?: number): number | undefined {
		if (sctpPacketsReceived === undefined) return this._sctpPacketsReceived;
		this._sctpPacketsReceived = sctpPacketsReceived;
		return this._sctpPacketsReceived;
	}
	  
	private _decodeSctpPacketsSent(sctpPacketsSent?: number): number | undefined {
		if (sctpPacketsSent === undefined) return this._sctpPacketsSent;
		this._sctpPacketsSent = sctpPacketsSent;
		return this._sctpPacketsSent;
	}
}
