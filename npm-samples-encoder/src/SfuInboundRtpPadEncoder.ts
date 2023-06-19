import { SfuInboundRtpPad } from "./InputSamples";
import { uuidToByteArray } from "./encodingTools";
import { Samples_SfuSample_SfuInboundRtpPad, Samples_SfuSample_SfuInboundRtpPad_SfuInboundRtpPadEnum } from './OutputSamples';

export class SfuInboundRtpPadEncoder {
	private _streamId: Uint8Array
	private _padId: Uint8Array
	private _ssrc: bigint;
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
		this._ssrc = BigInt(ssrc);
		this._streamId = uuidToByteArray(streamId);
		this._padId = uuidToByteArray(padId);
	}

	public get visited(): boolean {
		const result = this._visited;
		this._visited = false;
		return result;
	}

	public encode(sample: SfuInboundRtpPad): Samples_SfuSample_SfuInboundRtpPad {
		this._visited = true;
	
		const result = new Samples_SfuSample_SfuInboundRtpPad({
			transportId: this.transportId,
			streamId: this._streamId,
			padId: this._padId,
			ssrc: this._ssrc,
			noReport: this._encodeNoReport(sample.noReport),
			internal: this._encodeInternal(sample.internal),
			mediaType: this._encodeMediaType(sample.mediaType),
			payloadType: this._encodePayloadType(sample.payloadType),
			mimeType: this._encodeMimeType(sample.mimeType),
			clockRate: this._encodeClockRate(sample.clockRate),
			sdpFmtpLine: this._encodeSdpFmtpLine(sample.sdpFmtpLine),
			rid: this._encodeRid(sample.rid),
			rtxSsrc: this._encodeRtxSsrc(sample.rtxSsrc),
			targetBitrate: this._encodeTargetBitrate(sample.targetBitrate),
			voiceActivityFlag: this._encodeVoiceActivityFlag(sample.voiceActivityFlag),
			firCount: this._encodeFirCount(sample.firCount),
			pliCount: this._encodePliCount(sample.pliCount),
			nackCount: this._encodeNackCount(sample.nackCount),
			sliCount: this._encodeSliCount(sample.sliCount),
			packetsLost: this._encodePacketsLost(sample.packetsLost),
			packetsReceived: this._encodePacketsReceived(sample.packetsReceived),
			packetsDiscarded: this._encodePacketsDiscarded(sample.packetsDiscarded),
			packetsRepaired: this._encodePacketsRepaired(sample.packetsRepaired),
			packetsFailedDecryption: this._encodePacketsFailedDecryption(sample.packetsFailedDecryption),
			packetsDuplicated: this._encodePacketsDuplicated(sample.packetsDuplicated),
			fecPacketsReceived: this._encodeFecPacketsReceived(sample.fecPacketsReceived),
			fecPacketsDiscarded: this._encodeFecPacketsDiscarded(sample.fecPacketsDiscarded),
			bytesReceived: this._encodeBytesReceived(sample.bytesReceived),
			rtcpSrReceived: this._encodeRtcpSrReceived(sample.rtcpSrReceived),
			rtcpRrSent: this._encodeRtcpRrSent(sample.rtcpRrSent),
			rtxPacketsReceived: this._encodeRtxPacketsReceived(sample.rtxPacketsReceived),
			rtxPacketsDiscarded: this._encodeRtxPacketsDiscarded(sample.rtxPacketsDiscarded),
			framesReceived: this._encodeFramesReceived(sample.framesReceived),
			framesDecoded: this._encodeFramesDecoded(sample.framesDecoded),
			keyFramesDecoded: this._encodeKeyFramesDecoded(sample.keyFramesDecoded),
			fractionLost: this._encodeFractionLost(sample.fractionLost),
			jitter: this._encodeJitter(sample.jitter),
			roundTripTime: this._encodeRoundTripTime(sample.roundTripTime)
		});
		return result;
	}
	
	private _encodeRoundTripTime(roundTripTime?: number): number | undefined {
		if (!roundTripTime) return;
		if (roundTripTime === this._roundTripTime) return;
		this._roundTripTime = roundTripTime;
		return this._roundTripTime;
	}
	
	private _encodePacketsReceived(packetsReceived?: number): number | undefined {
		if (!packetsReceived) return;
		if (packetsReceived === this._packetsReceived) return;
		this._packetsReceived = packetsReceived;
		return this._packetsReceived;
	}
	
	private _encodePacketsLost(packetsLost?: number): number | undefined {
		if (!packetsLost) return;
		if (packetsLost === this._packetsLost) return;
		this._packetsLost = packetsLost;
		return this._packetsLost;
	}
	
	private _encodeJitter(jitter?: number): number | undefined {
		if (!jitter) return;
		if (jitter === this._jitter) return;
		this._jitter = jitter;
		return this._jitter;
	}
	
	private _encodePacketsDiscarded(packetsDiscarded?: number): number | undefined {
		if (!packetsDiscarded) return;
		if (packetsDiscarded === this._packetsDiscarded) return;
		this._packetsDiscarded = packetsDiscarded;
		return this._packetsDiscarded;
	}
	
	private _encodeFecPacketsReceived(fecPacketsReceived?: number): number | undefined {
		if (!fecPacketsReceived) return;
		if (fecPacketsReceived === this._fecPacketsReceived) return;
		this._fecPacketsReceived = fecPacketsReceived;
		return this._fecPacketsReceived;
	}
	
	private _encodeFecPacketsDiscarded(fecPacketsDiscarded?: number): number | undefined {
		if (!fecPacketsDiscarded) return;
		if (fecPacketsDiscarded === this._fecPacketsDiscarded) return;
		this._fecPacketsDiscarded = fecPacketsDiscarded;
		return this._fecPacketsDiscarded;
	}
	
	private _encodeFramesDecoded(framesDecoded?: number): number | undefined {
		if (!framesDecoded) return;
		if (framesDecoded === this._framesDecoded) return;
		this._framesDecoded = framesDecoded;
		return this._framesDecoded;
	}
	
	private _encodeKeyFramesDecoded(keyFramesDecoded?: number): number | undefined {
		if (!keyFramesDecoded) return;
		if (keyFramesDecoded === this._keyFramesDecoded) return;
		this._keyFramesDecoded = keyFramesDecoded;
		return this._keyFramesDecoded;
	}
	
	private _encodeFirCount(firCount?: number): number | undefined {
		if (!firCount) return;
		if (firCount === this._firCount) return;
		this._firCount = firCount;
		return this._firCount;
	}
	
	private _encodePliCount(pliCount?: number): number | undefined {
		if (!pliCount) return;
		if (pliCount === this._pliCount) return;
		this._pliCount = pliCount;
		return this._pliCount;
	}
	
	private _encodeFramesReceived(framesReceived?: number): number | undefined {
		if (!framesReceived) return;
		if (framesReceived === this._framesReceived) return;
		this._framesReceived = framesReceived;
		return this._framesReceived;
	}
	
	private _encodeBytesReceived(bytesReceived?: number): bigint | undefined {
		if (!bytesReceived) return;
		if (bytesReceived === this._bytesReceived) return;
		this._bytesReceived = bytesReceived;
		return BigInt(this._bytesReceived);
	}
	
	private _encodeNackCount(nackCount?: number): number | undefined {
		if (!nackCount) return;
		if (nackCount === this._nackCount) return;
		this._nackCount = nackCount;
		return this._nackCount;
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
	
	private _encodeMediaType(mediaType?: "audio" | "video"): Samples_SfuSample_SfuInboundRtpPad_SfuInboundRtpPadEnum | undefined {
		if (!mediaType) return;
		if (mediaType === this._mediaType) return;
		this._mediaType = mediaType;
		switch (this._mediaType) {
			case "audio":
				return Samples_SfuSample_SfuInboundRtpPad_SfuInboundRtpPadEnum.AUDIO;
			case "video":
				return Samples_SfuSample_SfuInboundRtpPad_SfuInboundRtpPadEnum.VIDEO;
		}
	}
	
	private _encodePayloadType(payloadType?: number): number | undefined {
		if (!payloadType) return;
		if (payloadType === this._payloadType) return;
		this._payloadType = payloadType;
		return this._payloadType;
	}

	private _encodeMimeType(mimeType?: string): string | undefined {
		if (!mimeType) return;
		if (mimeType === this._mimeType) return;
		this._mimeType = mimeType;
		return this._mimeType;
	}
	
	private _encodeClockRate(clockRate?: number): number | undefined {
		if (!clockRate) return;
		if (clockRate === this._clockRate) return;
		this._clockRate = clockRate;
		return this._clockRate;
	}
	
	private _encodeSdpFmtpLine(sdpFmtpLine?: string): string | undefined {
		if (!sdpFmtpLine) return;
		if (sdpFmtpLine === this._sdpFmtpLine) return;
		this._sdpFmtpLine = sdpFmtpLine;
		return this._sdpFmtpLine;
	}
	
	private _encodeRid(rid?: string): string | undefined {
		if (!rid) return;
		if (rid === this._rid) return;
		this._rid = rid;
		return this._rid;
	}
	
	private _encodeRtxSsrc(rtxSsrc?: number): bigint | undefined {
		if (!rtxSsrc) return;
		if (rtxSsrc === this._rtxSsrc) return;
		this._rtxSsrc = rtxSsrc;
		return BigInt(this._rtxSsrc);
	}
	
	private _encodeTargetBitrate(targetBitrate?: number): number | undefined {
		if (!targetBitrate) return;
		if (targetBitrate === this._targetBitrate) return;
		this._targetBitrate = targetBitrate;
		return this._targetBitrate;
	}
	
	private _encodeVoiceActivityFlag(voiceActivityFlag?: boolean): boolean | undefined {
		if (voiceActivityFlag === undefined) return;
		if (voiceActivityFlag === this._voiceActivityFlag) return;
		this._voiceActivityFlag = voiceActivityFlag;
		return this._voiceActivityFlag;
	}
	
	private _encodeSliCount(sliCount?: number): number | undefined {
		if (!sliCount) return;
		if (sliCount === this._sliCount) return;
		this._sliCount = sliCount;
		return this._sliCount;
	}
	
	private _encodePacketsRepaired(packetsRepaired?: number): number | undefined {
		if (!packetsRepaired) return;
		if (packetsRepaired === this._packetsRepaired) return;
		this._packetsRepaired = packetsRepaired;
		return this._packetsRepaired;
	}
	
	private _encodePacketsFailedDecryption(packetsFailedDecryption?: number): number | undefined {
		if (!packetsFailedDecryption) return;
		if (packetsFailedDecryption === this._packetsFailedDecryption) return;
		this._packetsFailedDecryption = packetsFailedDecryption;
		return this._packetsFailedDecryption;
	}
	
	private _encodePacketsDuplicated(packetsDuplicated?: number): number | undefined {
		if (!packetsDuplicated) return;
		if (packetsDuplicated === this._packetsDuplicated) return;
		this._packetsDuplicated = packetsDuplicated;
		return this._packetsDuplicated;
	}

	private _encodeRtcpSrReceived(rtcpSrReceived?: number): number | undefined {
		if (!rtcpSrReceived) return;
		if (rtcpSrReceived === this._rtcpSrReceived) return;
		this._rtcpSrReceived = rtcpSrReceived;
		return this._rtcpSrReceived;
	}

	private _encodeRtcpRrSent(rtcpRrSent?: number): number | undefined {
		if (!rtcpRrSent) return;
		if (rtcpRrSent === this._rtcpRrSent) return;
		this._rtcpRrSent = rtcpRrSent;
		return this._rtcpRrSent;
	}
	
	private _encodeRtxPacketsReceived(rtxPacketsReceived?: number): number | undefined {
		if (!rtxPacketsReceived) return;
		if (rtxPacketsReceived === this._rtxPacketsReceived) return;
		this._rtxPacketsReceived = rtxPacketsReceived;
		return this._rtxPacketsReceived;
	}
	
	private _encodeRtxPacketsDiscarded(rtxPacketsDiscarded?: number): number | undefined {
		if (!rtxPacketsDiscarded) return;
		if (rtxPacketsDiscarded === this._rtxPacketsDiscarded) return;
		this._rtxPacketsDiscarded = rtxPacketsDiscarded;
		return this._rtxPacketsDiscarded;
	}
	
	private _encodeFractionLost(fractionLost?: number): number | undefined {
		if (!fractionLost) return;
		if (fractionLost === this._fractionLost) return;
		this._fractionLost = fractionLost;
		return this._fractionLost;
	}
}
