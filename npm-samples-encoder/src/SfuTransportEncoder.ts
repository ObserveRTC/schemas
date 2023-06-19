import { SfuTransport } from "./InputSamples";
import { Samples_SfuSample_SfuTransport } from './OutputSamples';

export class SfuTransportEncoder {
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

	public encode(sample: SfuTransport): Samples_SfuSample_SfuTransport {
		this._visited = true;
	
		const result = new Samples_SfuSample_SfuTransport({
			transportId: this.transportId,
			noReport: this._encodeNoReport(sample.noReport),
			internal: this._encodeInternal(sample.internal),
			dtlsState: this._encodeDtlsState(sample.dtlsState),
			iceState: this._encodeIceState(sample.iceState),
			sctpState: this._encodeSctpState(sample.sctpState),
			iceRole: this._encodeIceRole(sample.iceRole),
			localAddress: this._encodeLocalAddress(sample.localAddress),
			localPort: this._encodeLocalPort(sample.localPort),
			protocol: this._encodeProtocol(sample.protocol),
			remoteAddress: this._encodeRemoteAddress(sample.remoteAddress),
			remotePort: this._encodeRemotePort(sample.remotePort),
			rtpBytesReceived: this._encodeRtpBytesReceived(sample.rtpBytesReceived),
			rtpBytesSent: this._encodeRtpBytesSent(sample.rtpBytesSent),
			rtpPacketsReceived: this._encodeRtpPacketsReceived(sample.rtpPacketsReceived),
			rtpPacketsSent: this._encodeRtpPacketsSent(sample.rtpPacketsSent),
			rtpPacketsLost: this._encodeRtpPacketsLost(sample.rtpPacketsLost),
			rtxBytesReceived: this._encodeRtxBytesReceived(sample.rtxBytesReceived),
			rtxBytesSent: this._encodeRtxBytesSent(sample.rtxBytesSent),
			rtxPacketsReceived: this._encodeRtxPacketsReceived(sample.rtxPacketsReceived),
			rtxPacketsSent: this._encodeRtxPacketsSent(sample.rtxPacketsSent),
			rtxPacketsLost: this._encodeRtxPacketsLost(sample.rtxPacketsLost),
			rtxPacketsDiscarded: this._encodeRtxPacketsDiscarded(sample.rtxPacketsDiscarded),
			sctpBytesReceived: this._encodeSctpBytesReceived(sample.sctpBytesReceived),
			sctpBytesSent: this._encodeSctpBytesSent(sample.sctpBytesSent),
			sctpPacketsReceived: this._encodeSctpPacketsReceived(sample.sctpPacketsReceived),
			sctpPacketsSent: this._encodeSctpPacketsSent(sample.sctpPacketsSent),
		});
		return result;
	}
	
	
	
	private _encodeNoReport(noReport?: boolean): boolean | undefined {
		if (noReport === undefined) return;
		if (noReport === this._noReport) return;
		this._noReport = noReport;
		return this._noReport;
	}
	
	private _encodeInternal(internal?: boolean): boolean | undefined {
		if (internal === undefined) return;
		if (internal === this._internal) return;
		this._internal = internal;
		return this._internal;
	}

	private _encodeRtxPacketsDiscarded(rtxPacketsDiscarded?: number): number | undefined {
		if (!rtxPacketsDiscarded) return;
		if (rtxPacketsDiscarded === this._rtxPacketsDiscarded) return;
		this._rtxPacketsDiscarded = rtxPacketsDiscarded;
		return this._rtxPacketsDiscarded;
	}
	
	private _encodeRtxPacketsSent(rtxPacketsSent?: number): number | undefined {
		if (!rtxPacketsSent) return;
		if (rtxPacketsSent === this._rtxPacketsSent) return;
		this._rtxPacketsSent = rtxPacketsSent;
		return this._rtxPacketsSent;
	}

	private _encodeDtlsState(dtlsState?: string): string | undefined {
		if (!dtlsState) return;
		if (dtlsState === this._dtlsState) return;
		this._dtlsState = dtlsState;
		return this._dtlsState;
	}
	
	private _encodeIceState(iceState?: string): string | undefined {
		if (!iceState) return;
		if (iceState === this._iceState) return;
		this._iceState = iceState;
		return this._iceState;
	}
	
	private _encodeSctpState(sctpState?: string): string | undefined {
		if (!sctpState) return;
		if (sctpState === this._sctpState) return;
		this._sctpState = sctpState;
		return this._sctpState;
	}
	
	private _encodeIceRole(iceRole?: string): string | undefined {
		if (!iceRole) return;
		if (iceRole === this._iceRole) return;
		this._iceRole = iceRole;
		return this._iceRole;
	}
	
	private _encodeLocalAddress(localAddress?: string): string | undefined {
		if (!localAddress) return;
		if (localAddress === this._localAddress) return;
		this._localAddress = localAddress;
		return this._localAddress;
	}
	
	private _encodeLocalPort(localPort?: number): number | undefined {
		if (!localPort) return;
		if (localPort === this._localPort) return;
		this._localPort = localPort;
		return this._localPort;
	}
	
	private _encodeProtocol(protocol?: string): string | undefined {
		if (!protocol) return;
		if (protocol === this._protocol) return;
		this._protocol = protocol;
		return this._protocol;
	}
	
	private _encodeRemoteAddress(remoteAddress?: string): string | undefined {
		if (!remoteAddress) return;
		if (remoteAddress === this._remoteAddress) return;
		this._remoteAddress = remoteAddress;
		return this._remoteAddress;
	}
	
	private _encodeRemotePort(remotePort?: number): number | undefined {
		if (!remotePort) return;
		if (remotePort === this._remotePort) return;
		this._remotePort = remotePort;
		return this._remotePort;
	}
	
	private _encodeRtpBytesReceived(rtpBytesReceived?: number): bigint | undefined {
		if (!rtpBytesReceived) return;
		if (rtpBytesReceived === this._rtpBytesReceived) return;
		this._rtpBytesReceived = rtpBytesReceived;
		return BigInt(this._rtpBytesReceived);
	}

	private _encodeRtpBytesSent(rtpBytesSent?: number): bigint | undefined {
		if (rtpBytesSent === undefined || rtpBytesSent === this._rtpBytesSent) {
		  return undefined;
		}
		this._rtpBytesSent = rtpBytesSent;
		return BigInt(this._rtpBytesSent);
	  }
	  
	  private _encodeRtpPacketsReceived(rtpPacketsReceived?: number): number | undefined {
		if (rtpPacketsReceived === undefined || rtpPacketsReceived === this._rtpPacketsReceived) {
		  return undefined;
		}
		this._rtpPacketsReceived = rtpPacketsReceived;
		return this._rtpPacketsReceived;
	  }
	  
	  private _encodeRtpPacketsSent(rtpPacketsSent?: number): number | undefined {
		if (rtpPacketsSent === undefined || rtpPacketsSent === this._rtpPacketsSent) {
		  return undefined;
		}
		this._rtpPacketsSent = rtpPacketsSent;
		return this._rtpPacketsSent;
	  }
	  
	  private _encodeRtpPacketsLost(rtpPacketsLost?: number): number | undefined {
		if (rtpPacketsLost === undefined || rtpPacketsLost === this._rtpPacketsLost) {
		  return undefined;
		}
		this._rtpPacketsLost = rtpPacketsLost;
		return this._rtpPacketsLost;
	  }
	  
	  private _encodeRtxBytesReceived(rtxBytesReceived?: number): bigint | undefined {
		if (rtxBytesReceived === undefined || rtxBytesReceived === this._rtxBytesReceived) {
		  return undefined;
		}
		this._rtxBytesReceived = rtxBytesReceived;
		return BigInt(this._rtxBytesReceived);
	  }
	  
	  private _encodeRtxBytesSent(rtxBytesSent?: number): bigint | undefined {
		if (rtxBytesSent === undefined || rtxBytesSent === this._rtxBytesSent) {
		  return undefined;
		}
		this._rtxBytesSent = rtxBytesSent;
		return BigInt(this._rtxBytesSent);
	  }
	  
	  private _encodeRtxPacketsReceived(rtxPacketsReceived?: number): number | undefined {
		if (rtxPacketsReceived === undefined || rtxPacketsReceived === this._rtxPacketsReceived) {
		  return undefined;
		}
		this._rtxPacketsReceived = rtxPacketsReceived;
		return this._rtxPacketsReceived;
	  }
	  
	  private _encodeRtxPacketsLost(rtxPacketsLost?: number): number | undefined {
		if (rtxPacketsLost === undefined || rtxPacketsLost === this._rtxPacketsLost) {
		  return undefined;
		}
		this._rtxPacketsLost = rtxPacketsLost;
		return this._rtxPacketsLost;
	  }
	  
	  private _encodeSctpBytesReceived(sctpBytesReceived?: number): bigint | undefined {
		if (sctpBytesReceived === undefined || sctpBytesReceived === this._sctpBytesReceived) {
		  return undefined;
		}
		this._sctpBytesReceived = sctpBytesReceived;
		return BigInt(this._sctpBytesReceived);
	  }
	  
	  private _encodeSctpBytesSent(sctpBytesSent?: number): bigint | undefined {
		if (sctpBytesSent === undefined || sctpBytesSent === this._sctpBytesSent) {
		  return undefined;
		}
		this._sctpBytesSent = sctpBytesSent;
		return BigInt(this._sctpBytesSent);
	  }
	  
	  private _encodeSctpPacketsReceived(sctpPacketsReceived?: number): number | undefined {
		if (typeof sctpPacketsReceived !== 'number') return;
		if (sctpPacketsReceived === this._sctpPacketsReceived) return;
		this._sctpPacketsReceived = sctpPacketsReceived;
		return this._sctpPacketsReceived;
	}
	
	private _encodeSctpPacketsSent(sctpPacketsSent?: number): number | undefined {
		if (typeof sctpPacketsSent !== 'number') return;
		if (sctpPacketsSent === this._sctpPacketsSent) return;
		this._sctpPacketsSent = sctpPacketsSent;
		return this._sctpPacketsSent;
	}
}
