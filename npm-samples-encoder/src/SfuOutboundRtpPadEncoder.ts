import { InboundAudioTrack, InboundVideoTrack, SfuInboundRtpPad, SfuOutboundRtpPad } from "./InputSamples";
import { uuidToByteArray } from "./encodingTools";
import { Samples_ClientSample_InboundVideoTrack, Samples_SfuSample_SfuInboundRtpPad, Samples_SfuSample_SfuInboundRtpPad_SfuInboundRtpPadEnum, Samples_SfuSample_SfuOutboundRtpPad, Samples_SfuSample_SfuOutboundRtpPad_SfuOutboundRtpPadEnum } from './OutputSamples';

export class SfuOutboundRtpPadEncoder {
	private _streamId: Uint8Array;
	private _sinkId: Uint8Array;
	private _padId: Uint8Array;
	private _ssrc: bigint;
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
	private _framesEncoded?: number;
	private _keyFramesEncoded?: number;
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
		this._ssrc = BigInt(ssrc);
		this._streamId = uuidToByteArray(streamId);
		this._sinkId = uuidToByteArray(sinkId);
		this._padId = uuidToByteArray(padId);
	}

	public get visited(): boolean {
		const result = this._visited;
		this._visited = false;
		return result;
	}

	public encode(sample: SfuOutboundRtpPad): Samples_SfuSample_SfuOutboundRtpPad {
		this._visited = true;
	
		const result = new Samples_SfuSample_SfuOutboundRtpPad({
			transportId: this.transportId,
			streamId: this._streamId,
			sinkId: this._sinkId,
			padId: this._padId,
			ssrc: this._ssrc,
			noReport: this._encodeNoReport(sample.noReport),
			internal: this._encodeInternal(sample.internal),
			callId: this._encodeCallId(sample.callId),
			clientId: this._encodeClientId(sample.clientId),
			trackId: this._encodeTrackId(sample.trackId),
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
			packetsSent: this._encodePacketsSent(sample.packetsSent),
			packetsDiscarded: this._encodePacketsDiscarded(sample.packetsDiscarded),
			packetsRetransmitted: this._encodePacketsRetransmitted(sample.packetsRetransmitted),
			packetsFailedEncryption: this._encodePacketsFailedEncryption(sample.packetsFailedEncryption),
			packetsDuplicated: this._encodePacketsDuplicated(sample.packetsDuplicated),
			fecPacketsSent: this._encodeFecPacketsSent(sample.fecPacketsSent),
			fecPacketsDiscarded: this._encodeFecPacketsDiscarded(sample.fecPacketsDiscarded),
			bytesSent: this._encodeBytesSent(sample.bytesSent),
			rtcpSrSent: this._encodeRtcpSrSent(sample.rtcpSrSent),
			rtcpRrReceived: this._encodeRtcpRrReceived(sample.rtcpRrReceived),
			rtxPacketsSent: this._encodeRtxPacketsSent(sample.rtxPacketsSent),
			rtxPacketsDiscarded: this._encodeRtxPacketsDiscarded(sample.rtxPacketsDiscarded),
			framesSent: this._encodeFramesSent(sample.framesSent),
			framesEncoded: this._encodeFramesEncoded(sample.framesEncoded),
			keyFramesEncoded: this._encodeKeyFramesEncoded(sample.keyFramesEncoded),
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
	
	private _encodeFecPacketsDiscarded(fecPacketsDiscarded?: number): number | undefined {
		if (!fecPacketsDiscarded) return;
		if (fecPacketsDiscarded === this._fecPacketsDiscarded) return;
		this._fecPacketsDiscarded = fecPacketsDiscarded;
		return this._fecPacketsDiscarded;
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
	
	private _encodeMediaType(mediaType?: "audio" | "video"): Samples_SfuSample_SfuOutboundRtpPad_SfuOutboundRtpPadEnum | undefined {
		if (!mediaType) return;
		if (mediaType === this._mediaType) return;
		this._mediaType = mediaType;
		switch (this._mediaType) {
			case "audio":
				return Samples_SfuSample_SfuOutboundRtpPad_SfuOutboundRtpPadEnum.AUDIO;
			case "video":
				return Samples_SfuSample_SfuOutboundRtpPad_SfuOutboundRtpPadEnum.VIDEO;
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
	
	private _encodePacketsDuplicated(packetsDuplicated?: number): number | undefined {
		if (!packetsDuplicated) return;
		if (packetsDuplicated === this._packetsDuplicated) return;
		this._packetsDuplicated = packetsDuplicated;
		return this._packetsDuplicated;
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

	private _encodeCallId(callId?: string): Uint8Array | undefined {
		if (!callId) return;
		if (callId === this._callId) return;
		this._callId = callId;
		return uuidToByteArray(this._callId);
	}
	
	private _encodeClientId(clientId?: string): Uint8Array | undefined {
		if (!clientId) return;
		if (clientId === this._clientId) return;
		this._clientId = clientId;
		return uuidToByteArray(this._clientId);
	}
	
	private _encodeTrackId(trackId?: string): Uint8Array | undefined {
		if (!trackId) return;
		if (trackId === this._trackId) return;
		this._trackId = trackId;
		return uuidToByteArray(this._trackId);
	}
	
	private _encodePacketsSent(packetsSent?: number): number | undefined {
		if (!packetsSent) return;
		if (packetsSent === this._packetsSent) return;
		this._packetsSent = packetsSent;
		return this._packetsSent;
	}
	
	private _encodePacketsRetransmitted(packetsRetransmitted?: number): number | undefined {
		if (!packetsRetransmitted) return;
		if (packetsRetransmitted === this._packetsRetransmitted) return;
		this._packetsRetransmitted = packetsRetransmitted;
		return this._packetsRetransmitted;
	}
	
	private _encodePacketsFailedEncryption(packetsFailedEncryption?: number): number | undefined {
		if (!packetsFailedEncryption) return;
		if (packetsFailedEncryption === this._packetsFailedEncryption) return;
		this._packetsFailedEncryption = packetsFailedEncryption;
		return this._packetsFailedEncryption;
	}
	
	private _encodeFecPacketsSent(fecPacketsSent?: number): number | undefined {
		if (!fecPacketsSent) return;
		if (fecPacketsSent === this._fecPacketsSent) return;
		this._fecPacketsSent = fecPacketsSent;
		return this._fecPacketsSent;
	}
	
	private _encodeBytesSent(bytesSent?: number): bigint | undefined {
		if (!bytesSent) return;
		if (bytesSent === this._bytesSent) return;
		this._bytesSent = bytesSent;
		return BigInt(this._bytesSent);
	}
	
	private _encodeRtcpSrSent(rtcpSrSent?: number): number | undefined {
		if (!rtcpSrSent) return;
		if (rtcpSrSent === this._rtcpSrSent) return;
		this._rtcpSrSent = rtcpSrSent;
		return this._rtcpSrSent;
	}
	
	private _encodeRtcpRrReceived(rtcpRrReceived?: number): number | undefined {
		if (!rtcpRrReceived) return;
		if (rtcpRrReceived === this._rtcpRrReceived) return;
		this._rtcpRrReceived = rtcpRrReceived;
		return this._rtcpRrReceived;
	}
	
	private _encodeRtxPacketsSent(rtxPacketsSent?: number): number | undefined {
		if (!rtxPacketsSent) return;
		if (rtxPacketsSent === this._rtxPacketsSent) return;
		this._rtxPacketsSent = rtxPacketsSent;
		return this._rtxPacketsSent;
	}

	private _encodeFramesSent(framesSent?: number): number | undefined {
		if (!framesSent) return;
		if (framesSent === this._framesSent) return;
		this._framesSent = framesSent;
		return this._framesSent;
	}
	
	private _encodeFramesEncoded(framesEncoded?: number): number | undefined {
		if (!framesEncoded) return;
		if (framesEncoded === this._framesEncoded) return;
		this._framesEncoded = framesEncoded;
		return this._framesEncoded;
	}
	
	private _encodeKeyFramesEncoded(keyFramesEncoded?: number): number | undefined {
		if (!keyFramesEncoded) return;
		if (keyFramesEncoded === this._keyFramesEncoded) return;
		this._keyFramesEncoded = keyFramesEncoded;
		return this._keyFramesEncoded;
	}
}
