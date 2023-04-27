import { SfuInboundRtpPad } from "./OutputSamples";
import {  
	Samples_SfuSample_SfuInboundRtpPad, 
	Samples_SfuSample_SfuInboundRtpPad_SfuInboundRtpPadEnum } from './InputSamples';

export class SfuInboundRtpPadDecoder {
	private _noReport?: boolean;
	private _internal?: boolean;
	private _mediaType?: "audio" | "video";
	private _payloadType?: number;
	private _mimeType?: string;
	private _clockRate?: number;
	private _sdpFmtpLine?: string;
	private _rid?: string;
	private _rtxSsrc?: number;
	private _targetBitrate?: number;
	private _voiceActivityFlag?: boolean;
	private _firCount?: number;
	private _pliCount?: number;
	private _nackCount?: number;
	private _sliCount?: number;
	private _packetsLost?: number;
	private _packetsReceived?: number;
	private _packetsDiscarded?: number;
	private _packetsRepaired?: number;
	private _packetsFailedDecryption?: number;
	private _packetsDuplicated?: number;
	private _fecPacketsReceived?: number;
	private _fecPacketsDiscarded?: number;
	private _bytesReceived?: number;
	private _rtcpSrReceived?: number;
	private _rtcpRrSent?: number;
	private _rtxPacketsReceived?: number;
	private _rtxPacketsDiscarded?: number;
	private _framesReceived?: number;
	private _framesDecoded?: number;
	private _keyFramesDecoded?: number;
	private _fractionLost?: number;
	private _jitter?: number;
	private _roundTripTime?: number;
	private _visited = false;

	public constructor(
		public readonly transportId: string,
		public readonly streamId: string,
		public readonly padId: string,
		public readonly ssrc: number,
	) {
	}

	public get visited(): boolean {
		const result = this._visited;
		this._visited = false;
		return result;
	}

	public decode(sample: Samples_SfuSample_SfuInboundRtpPad): SfuInboundRtpPad {
		this._visited = true;
	
		const result: SfuInboundRtpPad = {
			transportId: this.transportId,
			streamId: this.streamId,
			padId: this.padId,
			ssrc: this.ssrc,
			noReport: this._decodeNoReport(sample.noReport),
			internal: this._decodeInternal(sample.internal),
			mediaType: this._decodeMediaType(sample.mediaType),
			payloadType: this._decodePayloadType(sample.payloadType),
			mimeType: this._decodeMimeType(sample.mimeType),
			clockRate: this._decodeClockRate(sample.clockRate),
			sdpFmtpLine: this._decodeSdpFmtpLine(sample.sdpFmtpLine),
			rid: this._decodeRid(sample.rid),
			rtxSsrc: this._decodeRtxSsrc(sample.rtxSsrc),
			targetBitrate: this._decodeTargetBitrate(sample.targetBitrate),
			voiceActivityFlag: this._decodeVoiceActivityFlag(sample.voiceActivityFlag),
			firCount: this._decodeFirCount(sample.firCount),
			pliCount: this._decodePliCount(sample.pliCount),
			nackCount: this._decodeNackCount(sample.nackCount),
			sliCount: this._decodeSliCount(sample.sliCount),
			packetsLost: this._decodePacketsLost(sample.packetsLost),
			packetsReceived: this._decodePacketsReceived(sample.packetsReceived),
			packetsDiscarded: this._decodePacketsDiscarded(sample.packetsDiscarded),
			packetsRepaired: this._decodePacketsRepaired(sample.packetsRepaired),
			packetsFailedDecryption: this._decodePacketsFailedDecryption(sample.packetsFailedDecryption),
			packetsDuplicated: this._decodePacketsDuplicated(sample.packetsDuplicated),
			fecPacketsReceived: this._decodeFecPacketsReceived(sample.fecPacketsReceived),
			fecPacketsDiscarded: this._decodeFecPacketsDiscarded(sample.fecPacketsDiscarded),
			bytesReceived: this._decodeBytesReceived(sample.bytesReceived),
			rtcpSrReceived: this._decodeRtcpSrReceived(sample.rtcpSrReceived),
			rtcpRrSent: this._decodeRtcpRrSent(sample.rtcpRrSent),
			rtxPacketsReceived: this._decodeRtxPacketsReceived(sample.rtxPacketsReceived),
			rtxPacketsDiscarded: this._decodeRtxPacketsDiscarded(sample.rtxPacketsDiscarded),
			framesReceived: this._decodeFramesReceived(sample.framesReceived),
			framesDecoded: this._decodeFramesDecoded(sample.framesDecoded),
			keyFramesDecoded: this._decodeKeyFramesDecoded(sample.keyFramesDecoded),
			fractionLost: this._decodeFractionLost(sample.fractionLost),
			jitter: this._decodeJitter(sample.jitter),
			roundTripTime: this._decodeRoundTripTime(sample.roundTripTime)
		};
		return result;
	}
	
	private _decodePacketsLost(packetsLost?: number): number | undefined {
		if (packetsLost === undefined) return this._packetsLost;
		this._packetsLost = packetsLost;
		return this._packetsLost;
	}
	
	private _decodePacketsReceived(packetsReceived?: number): number | undefined {
		if (packetsReceived === undefined) return this._packetsReceived;
		this._packetsReceived = packetsReceived;
		return this._packetsReceived;
	}
	
	private _decodePacketsDiscarded(packetsDiscarded?: number): number | undefined {
		if (packetsDiscarded === undefined) return this._packetsDiscarded;
		this._packetsDiscarded = packetsDiscarded;
		return this._packetsDiscarded;
	}
	
	private _decodePacketsRepaired(packetsRepaired?: number): number | undefined {
		if (packetsRepaired === undefined) return this._packetsRepaired;
		this._packetsRepaired = packetsRepaired;
		return this._packetsRepaired;
	}
	
	private _decodePacketsFailedDecryption(packetsFailedDecryption?: number): number | undefined {
		if (packetsFailedDecryption === undefined) return this._packetsFailedDecryption;
		this._packetsFailedDecryption = packetsFailedDecryption;
		return this._packetsFailedDecryption;
	}
	
	private _decodePacketsDuplicated(packetsDuplicated?: number): number | undefined {
		if (packetsDuplicated === undefined) return this._packetsDuplicated;
		this._packetsDuplicated = packetsDuplicated;
		return this._packetsDuplicated;
	}
	
	private _decodeFecPacketsReceived(fecPacketsReceived?: number): number | undefined {
		if (fecPacketsReceived === undefined) return this._fecPacketsReceived;
		this._fecPacketsReceived = fecPacketsReceived;
		return this._fecPacketsReceived;
	}
	
	private _decodeFecPacketsDiscarded(fecPacketsDiscarded?: number): number | undefined {
		if (fecPacketsDiscarded === undefined) return this._fecPacketsDiscarded;
		this._fecPacketsDiscarded = fecPacketsDiscarded;
		return this._fecPacketsDiscarded;
	}
	
	private _decodeFramesReceived(framesReceived?: number): number | undefined {
		if (framesReceived === undefined) return this._framesReceived;
		this._framesReceived = framesReceived;
		return this._framesReceived;
	}
	
	private _decodeFramesDecoded(framesDecoded?: number): number | undefined {
		if (framesDecoded === undefined) return this._framesDecoded;
		this._framesDecoded = framesDecoded;
		return this._framesDecoded;
	}
	
	private _decodeKeyFramesDecoded(keyFramesDecoded?: number): number | undefined {
		if (keyFramesDecoded === undefined) return this._keyFramesDecoded;
		this._keyFramesDecoded = keyFramesDecoded;
		return this._keyFramesDecoded;
	}
	
	private _decodeFractionLost(fractionLost?: number): number | undefined {
		if (fractionLost === undefined) return this._fractionLost;
		this._fractionLost = fractionLost;
		return this._fractionLost;
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
	  
	  private _decodeMediaType(mediaType?: Samples_SfuSample_SfuInboundRtpPad_SfuInboundRtpPadEnum): "audio" | "video" | undefined {
		if (mediaType === undefined) return this._mediaType;
		switch (mediaType) {
			case Samples_SfuSample_SfuInboundRtpPad_SfuInboundRtpPadEnum.AUDIO:
				this._mediaType = "audio";
				break;
			case Samples_SfuSample_SfuInboundRtpPad_SfuInboundRtpPadEnum.VIDEO:
				this._mediaType = "video";
				break;
		}
		return this._mediaType;
	  }
	  
	  private _decodePayloadType(payloadType?: number): number | undefined {
		if (payloadType === undefined) return this._payloadType;
		this._payloadType = payloadType;
		return this._payloadType;
	  }
	  
	  private _decodeMimeType(mimeType?: string): string | undefined {
		if (mimeType === undefined) return this._mimeType;
		this._mimeType = mimeType;
		return this._mimeType;
	  }
	  
	  private _decodeClockRate(clockRate?: number): number | undefined {
		if (clockRate === undefined) return this._clockRate;
		this._clockRate = clockRate;
		return this._clockRate;
	  }
	  
	  private _decodeSdpFmtpLine(sdpFmtpLine?: string): string | undefined {
		if (sdpFmtpLine === undefined) return this._sdpFmtpLine;
		this._sdpFmtpLine = sdpFmtpLine;
		return this._sdpFmtpLine;
	  }
	  
	  private _decodeRid(rid?: string): string | undefined {
		if (rid === undefined) return this._rid;
		this._rid = rid;
		return this._rid;
	  }
	  
	  private _decodeRtxSsrc(rtxSsrc?: bigint): number | undefined {
		if (rtxSsrc === undefined) return this._rtxSsrc;
		this._rtxSsrc = Number(rtxSsrc);
		return this._rtxSsrc;
	  }
	  
	  private _decodeTargetBitrate(targetBitrate?: number): number | undefined {
		if (targetBitrate === undefined) return this._targetBitrate;
		this._targetBitrate = targetBitrate;
		return this._targetBitrate;
	  }
	  
	  private _decodeVoiceActivityFlag(voiceActivityFlag?: boolean): boolean | undefined {
		if (voiceActivityFlag === undefined) return this._voiceActivityFlag;
		this._voiceActivityFlag = voiceActivityFlag;
		return this._voiceActivityFlag;
	  }
	  
	  private _decodeFirCount(firCount?: number): number | undefined {
		if (firCount === undefined) return this._firCount;
		this._firCount = firCount;
		return this._firCount;
	  }
	  
	  private _decodePliCount(pliCount?: number): number | undefined {
		if (pliCount === undefined) return this._pliCount;
		this._pliCount = pliCount;
		return this._pliCount;
	  }
	  
	  private _decodeNackCount(nackCount?: number): number | undefined {
		if (nackCount === undefined) return this._nackCount;
		this._nackCount = nackCount;
		return this._nackCount;
	  }
	  
	  private _decodeSliCount(sliCount?: number): number | undefined {
		if (sliCount === undefined) return this._sliCount;
		this._sliCount = sliCount;
		return this._sliCount;
	}

	private _decodeBytesReceived(bytesReceived?: bigint): number | undefined {
		if (bytesReceived === undefined) return this._bytesReceived;
		this._bytesReceived = Number(bytesReceived);
		return this._bytesReceived;
	}

	private _decodeRtcpSrReceived(rtcpSrReceived?: number): number | undefined {
		if (rtcpSrReceived === undefined) return this._rtcpSrReceived;
		this._rtcpSrReceived = rtcpSrReceived;
		return this._rtcpSrReceived;
	}

	private _decodeRtcpRrSent(rtcpRrSent?: number): number | undefined {
		if (rtcpRrSent === undefined) return this._rtcpRrSent;
		this._rtcpRrSent = rtcpRrSent;
		return this._rtcpRrSent;
	}

	private _decodeRtxPacketsReceived(rtxPacketsReceived?: number): number | undefined {
		if (rtxPacketsReceived === undefined) return this._rtxPacketsReceived;
		this._rtxPacketsReceived = rtxPacketsReceived;
		return this._rtxPacketsReceived;
	}

	private _decodeRtxPacketsDiscarded(rtxPacketsDiscarded?: number): number | undefined {
		if (rtxPacketsDiscarded === undefined) return this._rtxPacketsDiscarded;
		this._rtxPacketsDiscarded = rtxPacketsDiscarded;
		return this._rtxPacketsDiscarded;
	}

	private _decodeJitter(jitter?: number): number | undefined {
		if (jitter === undefined) return this._jitter;
		this._jitter = jitter;
		return this._jitter;
	}

	private _decodeRoundTripTime(roundTripTime?: number): number | undefined {
		if (roundTripTime === undefined) return this._roundTripTime;
		this._roundTripTime = roundTripTime;
		return this._roundTripTime;
	}
}
