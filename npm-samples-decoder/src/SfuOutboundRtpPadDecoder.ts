import { SfuOutboundRtpPad } from "./OutputSamples";
import { 
	Samples_SfuSample_SfuOutboundRtpPad, 
	Samples_SfuSample_SfuOutboundRtpPad_SfuOutboundRtpPadEnum 
} from './InputSamples';
import { byteArrayToUuid } from "./decodingTools";

export class SfuOutboundRtpPadDecoder {
	private _noReport?: boolean;
	private _internal?: boolean;
	private _callId?: string;
	private _clientId?: string;
	private _trackId?: string;
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
	private _packetsSent?: number;
	private _packetsDiscarded?: number;
	private _packetsRetransmitted?: number;
	private _packetsFailedEncryption?: number;
	private _packetsDuplicated?: number;
	private _fecPacketsSent?: number;
	private _fecPacketsDiscarded?: number;
	private _bytesSent?: number;
	private _rtcpSrSent?: number;
	private _rtcpRrReceived?: number;
	private _rtxPacketsSent?: number;
	private _rtxPacketsDiscarded?: number;
	private _framesSent?: number;
	private _framesdecoded?: number;
	private _keyFramesdecoded?: number;
	private _fractionLost?: number;
	private _jitter?: number;
	private _roundTripTime?: number;
	private _visited = false;

	public constructor(
		public readonly transportId: string,
		public readonly streamId: string,
		public readonly sinkId: string,
		public readonly padId: string,
		public readonly ssrc: number,
	) {
	}

	public get visited(): boolean {
		const result = this._visited;
		this._visited = false;
		return result;
	}

	public decode(sample: Samples_SfuSample_SfuOutboundRtpPad): SfuOutboundRtpPad {
		this._visited = true;
	
		const result: SfuOutboundRtpPad = {
			transportId: this.transportId,
			streamId: this.streamId,
			sinkId: this.sinkId,
			padId: this.padId,
			ssrc: this.ssrc,
			noReport: this._decodeNoReport(sample.noReport),
			internal: this._decodeInternal(sample.internal),
			callId: this._decodeCallId(sample.callId),
			clientId: this._decodeClientId(sample.clientId),
			trackId: this._decodeTrackId(sample.trackId),
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
			packetsSent: this._decodePacketsSent(sample.packetsSent),
			packetsDiscarded: this._decodePacketsDiscarded(sample.packetsDiscarded),
			packetsRetransmitted: this._decodePacketsRetransmitted(sample.packetsRetransmitted),
			packetsFailedEncryption: this._decodePacketsFailedEncryption(sample.packetsFailedEncryption),
			packetsDuplicated: this._decodePacketsDuplicated(sample.packetsDuplicated),
			fecPacketsSent: this._decodeFecPacketsSent(sample.fecPacketsSent),
			fecPacketsDiscarded: this._decodeFecPacketsDiscarded(sample.fecPacketsDiscarded),
			bytesSent: this._decodeBytesSent(sample.bytesSent),
			rtcpSrSent: this._decodeRtcpSrSent(sample.rtcpSrSent),
			rtcpRrReceived: this._decodeRtcpRrReceived(sample.rtcpRrReceived),
			rtxPacketsSent: this._decodeRtxPacketsSent(sample.rtxPacketsSent),
			rtxPacketsDiscarded: this._decodeRtxPacketsDiscarded(sample.rtxPacketsDiscarded),
			framesSent: this._decodeFramesSent(sample.framesSent),
			framesEncoded: this._decodeFramesdecoded(sample.framesEncoded),
			keyFramesEncoded: this._decodeKeyFramesdecoded(sample.keyFramesEncoded),
			fractionLost: this._decodeFractionLost(sample.fractionLost),
			jitter: this._decodeJitter(sample.jitter),
			roundTripTime: this._decodeRoundTripTime(sample.roundTripTime)
		};
		return result;
	}
	
	private _decodeMediaType(mediaType?: Samples_SfuSample_SfuOutboundRtpPad_SfuOutboundRtpPadEnum): "audio" | "video" | undefined {
		if (mediaType === undefined) return this._mediaType;
		switch (mediaType) {
			case Samples_SfuSample_SfuOutboundRtpPad_SfuOutboundRtpPadEnum.AUDIO:
				this._mediaType = "audio";
				break;
			case Samples_SfuSample_SfuOutboundRtpPad_SfuOutboundRtpPadEnum.VIDEO:
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

	private _decodePacketsLost(packetsLost?: number): number | undefined {
		if (packetsLost === undefined) return this._packetsLost;
		this._packetsLost = packetsLost;
		return this._packetsLost;
	}
	
	private _decodePacketsSent(packetsSent?: number): number | undefined {
		if (packetsSent === undefined) return this._packetsSent;
		this._packetsSent = packetsSent;
		return this._packetsSent;
	}
	
	private _decodePacketsDiscarded(packetsDiscarded?: number): number | undefined {
		if (packetsDiscarded === undefined) return this._packetsDiscarded;
		this._packetsDiscarded = packetsDiscarded;
		return this._packetsDiscarded;
	}
	
	private _decodePacketsRetransmitted(packetsRetransmitted?: number): number | undefined {
		if (packetsRetransmitted === undefined) return this._packetsRetransmitted;
		this._packetsRetransmitted = packetsRetransmitted;
		return this._packetsRetransmitted;
	}
	
	private _decodePacketsFailedEncryption(packetsFailedEncryption?: number): number | undefined {
		if (packetsFailedEncryption === undefined) return this._packetsFailedEncryption;
		this._packetsFailedEncryption = packetsFailedEncryption;
		return this._packetsFailedEncryption;
	}
	
	private _decodePacketsDuplicated(packetsDuplicated?: number): number | undefined {
		if (packetsDuplicated === undefined) return this._packetsDuplicated;
		this._packetsDuplicated = packetsDuplicated;
		return this._packetsDuplicated;
	}
	
	private _decodeFecPacketsSent(fecPacketsSent?: number): number | undefined {
		if (fecPacketsSent === undefined) return this._fecPacketsSent;
		this._fecPacketsSent = fecPacketsSent;
		return this._fecPacketsSent;
	}
	
	private _decodeFecPacketsDiscarded(fecPacketsDiscarded?: number): number | undefined {
		if (fecPacketsDiscarded === undefined) return this._fecPacketsDiscarded;
		this._fecPacketsDiscarded = fecPacketsDiscarded;
		return this._fecPacketsDiscarded;
	}
	
	private _decodeFramesSent(framesSent?: number): number | undefined {
		if (framesSent === undefined) return this._framesSent;
		this._framesSent = framesSent;
		return this._framesSent;
	}
	
	private _decodeFramesdecoded(framesdecoded?: number): number | undefined {
		if (framesdecoded === undefined) return this._framesdecoded;
		this._framesdecoded = framesdecoded;
		return this._framesdecoded;
	}
	
	private _decodeKeyFramesdecoded(keyFramesdecoded?: number): number | undefined {
		if (keyFramesdecoded === undefined) return this._keyFramesdecoded;
		this._keyFramesdecoded = keyFramesdecoded;
		return this._keyFramesdecoded;
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
	
	private _decodeCallId(callId?: Uint8Array): string | undefined {
		if (callId === undefined) return this._callId;
		this._callId = byteArrayToUuid(callId);
		return this._callId;
	}
	  
	private _decodeClientId(clientId?: Uint8Array): string | undefined {
		if (clientId === undefined) return this._clientId;
		this._clientId = byteArrayToUuid(clientId);
		return this._clientId;
	}
	  
	private _decodeTrackId(trackId?: Uint8Array): string | undefined {
		if (trackId === undefined) return this._trackId;
		this._trackId = byteArrayToUuid(trackId);
		return this._trackId;
	}
	  
	private _decodeBytesSent(bytesSent?: bigint): number | undefined {
		if (bytesSent === undefined) return this._bytesSent;
		this._bytesSent = Number(bytesSent);
		return this._bytesSent;
	}
	  
	private _decodeRtcpSrSent(rtcpSrSent?: number): number | undefined {
		if (rtcpSrSent === undefined) return this._rtcpSrSent;
		this._rtcpSrSent = rtcpSrSent;
		return this._rtcpSrSent;
	}
	  
	private _decodeRtcpRrReceived(rtcpRrReceived?: number): number | undefined {
		if (rtcpRrReceived === undefined) return this._rtcpRrReceived;
		this._rtcpRrReceived = rtcpRrReceived;
		return this._rtcpRrReceived;
	}
	  
	private _decodeRtxPacketsSent(rtxPacketsSent?: number): number | undefined {
		if (rtxPacketsSent === undefined) return this._rtxPacketsSent;
		this._rtxPacketsSent = rtxPacketsSent;
		return this._rtxPacketsSent;
	}
	  
}
