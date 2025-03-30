import { 
	Decoder, 
	BigIntToNumberDecoder,
	BooleanToBooleanDecoder,
	OneTimePassDecoder 
  } from "./utils";
import { InboundRtpStats as OutputInboundRtpStats } from "./OutputSamples";
import { ClientSample_PeerConnectionSample_InboundRtpStats as InputInboundRtpStats } from "./InputSamples";
import {
NumberToNumberDecoder,
StringToStringDecoder,
AttachmentDecoder
} from "./utils";
  
const logger = console;
  
export class InboundRtpDecoder implements Decoder<InputInboundRtpStats, OutputInboundRtpStats | undefined> {
	private _visited = false;
  
	private readonly _idDecoder: StringToStringDecoder;
	private readonly _kindDecoder: StringToStringDecoder;
	private readonly _timestampDecoder: NumberToNumberDecoder;
	private readonly _audioLevelDecoder: NumberToNumberDecoder;
	private readonly _bytesReceivedDecoder: BigIntToNumberDecoder;
	private readonly _codecIdDecoder: OneTimePassDecoder<string>;
	private readonly _concealedSamplesDecoder: NumberToNumberDecoder;
	private readonly _concealmentEventsDecoder: NumberToNumberDecoder;
	private readonly _corruptionMeasurementsDecoder: NumberToNumberDecoder;
	private readonly _decoderImplementationDecoder: StringToStringDecoder;
	private readonly _estimatedPlayoutTimestampDecoder: NumberToNumberDecoder;
	private readonly _fecBytesReceivedDecoder: BigIntToNumberDecoder;
	private readonly _fecPacketsDiscardedDecoder: NumberToNumberDecoder;
	private readonly _fecPacketsReceivedDecoder: NumberToNumberDecoder;
	private readonly _fecSsrcDecoder: BigIntToNumberDecoder;
	private readonly _firCountDecoder: NumberToNumberDecoder;
	private readonly _frameHeightDecoder: NumberToNumberDecoder;
	private readonly _frameWidthDecoder: NumberToNumberDecoder;
	private readonly _framesAssembledFromMultiplePacketsDecoder: NumberToNumberDecoder;
	private readonly _framesDecodedDecoder: NumberToNumberDecoder;
	private readonly _framesDroppedDecoder: NumberToNumberDecoder;
	private readonly _framesPerSecondDecoder: NumberToNumberDecoder;
	private readonly _framesReceivedDecoder: NumberToNumberDecoder;
	private readonly _framesRenderedDecoder: NumberToNumberDecoder;
	private readonly _freezeCountDecoder: NumberToNumberDecoder;
	private readonly _headerBytesReceivedDecoder: BigIntToNumberDecoder;
	private readonly _insertedSamplesForDecelerationDecoder: NumberToNumberDecoder;
	private readonly _jitterDecoder: NumberToNumberDecoder;
	private readonly _jitterBufferDelayDecoder: NumberToNumberDecoder;
	private readonly _jitterBufferEmittedCountDecoder: NumberToNumberDecoder;
	private readonly _jitterBufferMinimumDelayDecoder: NumberToNumberDecoder;
	private readonly _jitterBufferTargetDelayDecoder: NumberToNumberDecoder;
	private readonly _keyFramesDecodedDecoder: NumberToNumberDecoder;
	private readonly _lastPacketReceivedTimestampDecoder: NumberToNumberDecoder;
	private readonly _midDecoder: OneTimePassDecoder<string>;
	private readonly _nackCountDecoder: NumberToNumberDecoder;
	private readonly _packetsDiscardedDecoder: NumberToNumberDecoder;
	private readonly _packetsLostDecoder: NumberToNumberDecoder;
	private readonly _packetsReceivedDecoder: NumberToNumberDecoder;
	private readonly _pauseCountDecoder: NumberToNumberDecoder;
	private readonly _pliCountDecoder: NumberToNumberDecoder;
	private readonly _playoutIdDecoder: StringToStringDecoder;
	private readonly _powerEfficientDecoderDecoder: BooleanToBooleanDecoder;
	private readonly _qpSumDecoder: NumberToNumberDecoder;
	private readonly _remoteIdDecoder: StringToStringDecoder;
	private readonly _removedSamplesForAccelerationDecoder: NumberToNumberDecoder;
	private readonly _retransmittedBytesReceivedDecoder: BigIntToNumberDecoder;
	private readonly _retransmittedPacketsReceivedDecoder: NumberToNumberDecoder;
	private readonly _rtxSsrcDecoder: BigIntToNumberDecoder;
	private readonly _silentConcealedSamplesDecoder: NumberToNumberDecoder;
	private readonly _totalAssemblyTimeDecoder: NumberToNumberDecoder;
	private readonly _totalAudioEnergyDecoder: NumberToNumberDecoder;
	private readonly _totalCorruptionProbabilityDecoder: NumberToNumberDecoder;
	private readonly _totalDecodeTimeDecoder: NumberToNumberDecoder;
	private readonly _totalFreezesDurationDecoder: NumberToNumberDecoder;
	private readonly _totalInterFrameDelayDecoder: NumberToNumberDecoder;
	private readonly _totalPausesDurationDecoder: NumberToNumberDecoder;
	private readonly _totalProcessingDelayDecoder: NumberToNumberDecoder;
	private readonly _totalSamplesDurationDecoder: NumberToNumberDecoder;
	private readonly _totalSamplesReceivedDecoder: NumberToNumberDecoder;
	private readonly _totalSquaredCorruptionProbabilityDecoder: NumberToNumberDecoder;
	private readonly _totalSquaredInterFrameDelayDecoder: NumberToNumberDecoder;
	private readonly _transportIdDecoder: OneTimePassDecoder<string>;
	constructor(
		private readonly ssrc: number,
		private readonly _trackIdentifierDecoder: Decoder<Uint8Array, string>,
	  	private _attachmentsDecoder: AttachmentDecoder,
	) {
	  this._idDecoder = new StringToStringDecoder();
	  this._kindDecoder = new StringToStringDecoder();
	  this._timestampDecoder = new NumberToNumberDecoder();
	  this._audioLevelDecoder = new NumberToNumberDecoder();
	  this._bytesReceivedDecoder = new BigIntToNumberDecoder();
	  this._codecIdDecoder = new OneTimePassDecoder<string>();
	  this._concealedSamplesDecoder = new NumberToNumberDecoder();
	  this._concealmentEventsDecoder = new NumberToNumberDecoder();
	  this._corruptionMeasurementsDecoder = new NumberToNumberDecoder();
	  this._decoderImplementationDecoder = new StringToStringDecoder();
	  this._estimatedPlayoutTimestampDecoder = new NumberToNumberDecoder();
	  this._fecBytesReceivedDecoder = new BigIntToNumberDecoder();
	  this._fecPacketsDiscardedDecoder = new NumberToNumberDecoder();
	  this._fecPacketsReceivedDecoder = new NumberToNumberDecoder();
	  this._fecSsrcDecoder = new BigIntToNumberDecoder();
	  this._firCountDecoder = new NumberToNumberDecoder();
	  this._frameHeightDecoder = new NumberToNumberDecoder();
	  this._frameWidthDecoder = new NumberToNumberDecoder();
	  this._framesAssembledFromMultiplePacketsDecoder = new NumberToNumberDecoder();
	  this._framesDecodedDecoder = new NumberToNumberDecoder();
	  this._framesDroppedDecoder = new NumberToNumberDecoder();
	  this._framesPerSecondDecoder = new NumberToNumberDecoder();
	  this._framesReceivedDecoder = new NumberToNumberDecoder();
	  this._framesRenderedDecoder = new NumberToNumberDecoder();
	  this._freezeCountDecoder = new NumberToNumberDecoder();
	  this._headerBytesReceivedDecoder = new BigIntToNumberDecoder();
	  this._insertedSamplesForDecelerationDecoder = new NumberToNumberDecoder();
	  this._jitterDecoder = new NumberToNumberDecoder();
	  this._jitterBufferDelayDecoder = new NumberToNumberDecoder();
	  this._jitterBufferEmittedCountDecoder = new NumberToNumberDecoder();
	  this._jitterBufferMinimumDelayDecoder = new NumberToNumberDecoder();
	  this._jitterBufferTargetDelayDecoder = new NumberToNumberDecoder();
	  this._keyFramesDecodedDecoder = new NumberToNumberDecoder();
	  this._lastPacketReceivedTimestampDecoder = new NumberToNumberDecoder();
	  this._midDecoder = new OneTimePassDecoder<string>();
	  this._nackCountDecoder = new NumberToNumberDecoder();
	  this._packetsDiscardedDecoder = new NumberToNumberDecoder();
	  this._packetsLostDecoder = new NumberToNumberDecoder();
	  this._packetsReceivedDecoder = new NumberToNumberDecoder();
	  this._pauseCountDecoder = new NumberToNumberDecoder();
	  this._pliCountDecoder = new NumberToNumberDecoder();
	  this._playoutIdDecoder = new StringToStringDecoder();
	  this._powerEfficientDecoderDecoder = new BooleanToBooleanDecoder();
	  this._qpSumDecoder = new NumberToNumberDecoder();
	  this._remoteIdDecoder = new StringToStringDecoder();
	  this._removedSamplesForAccelerationDecoder = new NumberToNumberDecoder();
	  this._retransmittedBytesReceivedDecoder = new BigIntToNumberDecoder();
	  this._retransmittedPacketsReceivedDecoder = new NumberToNumberDecoder();
	  this._rtxSsrcDecoder = new BigIntToNumberDecoder();
	  this._silentConcealedSamplesDecoder = new NumberToNumberDecoder();
	  this._totalAssemblyTimeDecoder = new NumberToNumberDecoder();
	  this._totalAudioEnergyDecoder = new NumberToNumberDecoder();
	  this._totalCorruptionProbabilityDecoder = new NumberToNumberDecoder();
	  this._totalDecodeTimeDecoder = new NumberToNumberDecoder();
	  this._totalFreezesDurationDecoder = new NumberToNumberDecoder();
	  this._totalInterFrameDelayDecoder = new NumberToNumberDecoder();
	  this._totalPausesDurationDecoder = new NumberToNumberDecoder();
	  this._totalProcessingDelayDecoder = new NumberToNumberDecoder();
	  this._totalSamplesDurationDecoder = new NumberToNumberDecoder();
	  this._totalSamplesReceivedDecoder = new NumberToNumberDecoder();
	  this._totalSquaredCorruptionProbabilityDecoder = new NumberToNumberDecoder();
	  this._totalSquaredInterFrameDelayDecoder = new NumberToNumberDecoder();
	  this._transportIdDecoder = new OneTimePassDecoder<string>();
	}
  
	public get visited(): boolean {
	  const result = this._visited;
	  this._visited = false;
	  return result;
	}
  
	public reset(): void {
	  this._idDecoder.reset();
	  this._kindDecoder.reset();
	  this._timestampDecoder.reset();
	  this._audioLevelDecoder.reset();
	  this._bytesReceivedDecoder.reset();
	  this._codecIdDecoder.reset();
	  this._concealedSamplesDecoder.reset();
	  this._concealmentEventsDecoder.reset();
	  this._corruptionMeasurementsDecoder.reset();
	  this._decoderImplementationDecoder.reset();
	  this._estimatedPlayoutTimestampDecoder.reset();
	  this._fecBytesReceivedDecoder.reset();
	  this._fecPacketsDiscardedDecoder.reset();
	  this._fecPacketsReceivedDecoder.reset();
	  this._fecSsrcDecoder.reset();
	  this._firCountDecoder.reset();
	  this._frameHeightDecoder.reset();
	  this._frameWidthDecoder.reset();
	  this._framesAssembledFromMultiplePacketsDecoder.reset();
	  this._framesDecodedDecoder.reset();
	  this._framesDroppedDecoder.reset();
	  this._framesPerSecondDecoder.reset();
	  this._framesReceivedDecoder.reset();
	  this._framesRenderedDecoder.reset();
	  this._freezeCountDecoder.reset();
	  this._headerBytesReceivedDecoder.reset();
	  this._insertedSamplesForDecelerationDecoder.reset();
	  this._jitterDecoder.reset();
	  this._jitterBufferDelayDecoder.reset();
	  this._jitterBufferEmittedCountDecoder.reset();
	  this._jitterBufferMinimumDelayDecoder.reset();
	  this._jitterBufferTargetDelayDecoder.reset();
	  this._keyFramesDecodedDecoder.reset();
	  this._lastPacketReceivedTimestampDecoder.reset();
	  this._midDecoder.reset();
	  this._nackCountDecoder.reset();
	  this._packetsDiscardedDecoder.reset();
	  this._packetsLostDecoder.reset();
	  this._packetsReceivedDecoder.reset();
	  this._pauseCountDecoder.reset();
	  this._pliCountDecoder.reset();
	  this._playoutIdDecoder.reset();
	  this._powerEfficientDecoderDecoder.reset();
	  this._qpSumDecoder.reset();
	  this._remoteIdDecoder.reset();
	  this._removedSamplesForAccelerationDecoder.reset();
	  this._retransmittedBytesReceivedDecoder.reset();
	  this._retransmittedPacketsReceivedDecoder.reset();
	  this._rtxSsrcDecoder.reset();
	  this._silentConcealedSamplesDecoder.reset();
	  this._totalAssemblyTimeDecoder.reset();
	  this._totalAudioEnergyDecoder.reset();
	  this._totalCorruptionProbabilityDecoder.reset();
	  this._totalDecodeTimeDecoder.reset();
	  this._totalFreezesDurationDecoder.reset();
	  this._totalInterFrameDelayDecoder.reset();
	  this._totalPausesDurationDecoder.reset();
	  this._totalProcessingDelayDecoder.reset();
	  this._totalSamplesDurationDecoder.reset();
	  this._totalSamplesReceivedDecoder.reset();
	  this._totalSquaredCorruptionProbabilityDecoder.reset();
	  this._totalSquaredInterFrameDelayDecoder.reset();
	  this._transportIdDecoder.reset();
	}
  
	public decode(input: InputInboundRtpStats): OutputInboundRtpStats | undefined {
	  this._visited = true;
  
	  const timestamp = this._timestampDecoder.decode(input.timestamp);
	  const id = this._idDecoder.decode(input.id);
	  const kind = this._kindDecoder.decode(input.kind);
	  const trackIdentifier = this._trackIdentifierDecoder.decode(input.trackIdentifier);
  
	  if (!timestamp || id === undefined || trackIdentifier === undefined || kind === undefined) {
		logger.warn("Invalid inbound RTP sample: missing timestamp or id");
		return undefined;
	  }
  
	  return {
		ssrc: this.ssrc,
		kind,
		trackIdentifier,
		attachments: this._attachmentsDecoder.decode(input.attachments),
		id,
		timestamp,
		audioLevel: this._audioLevelDecoder.decode(input.audioLevel),
		bytesReceived: this._bytesReceivedDecoder.decode(input.bytesReceived),
		codecId: this._codecIdDecoder.decode(input.codecId),
		concealedSamples: this._concealedSamplesDecoder.decode(input.concealedSamples),
		concealmentEvents: this._concealmentEventsDecoder.decode(input.concealmentEvents),
		corruptionMeasurements: this._corruptionMeasurementsDecoder.decode(input.corruptionMeasurements),
		decoderImplementation: this._decoderImplementationDecoder.decode(input.decoderImplementation),
		estimatedPlayoutTimestamp: this._estimatedPlayoutTimestampDecoder.decode(input.estimatedPlayoutTimestamp),
		fecBytesReceived: this._fecBytesReceivedDecoder.decode(input.fecBytesReceived),
		fecPacketsDiscarded: this._fecPacketsDiscardedDecoder.decode(input.fecPacketsDiscarded),
		fecPacketsReceived: this._fecPacketsReceivedDecoder.decode(input.fecPacketsReceived),
		fecSsrc: this._fecSsrcDecoder.decode(input.fecSsrc),
		firCount: this._firCountDecoder.decode(input.firCount),
		frameHeight: this._frameHeightDecoder.decode(input.frameHeight),
		frameWidth: this._frameWidthDecoder.decode(input.frameWidth),
		framesAssembledFromMultiplePackets: this._framesAssembledFromMultiplePacketsDecoder.decode(input.framesAssembledFromMultiplePackets),
		framesDecoded: this._framesDecodedDecoder.decode(input.framesDecoded),
		framesDropped: this._framesDroppedDecoder.decode(input.framesDropped),
		framesPerSecond: this._framesPerSecondDecoder.decode(input.framesPerSecond),
		framesReceived: this._framesReceivedDecoder.decode(input.framesReceived),
		framesRendered: this._framesRenderedDecoder.decode(input.framesRendered),
		freezeCount: this._freezeCountDecoder.decode(input.freezeCount),
		headerBytesReceived: this._headerBytesReceivedDecoder.decode(input.headerBytesReceived),
		insertedSamplesForDeceleration: this._insertedSamplesForDecelerationDecoder.decode(input.insertedSamplesForDeceleration),
		jitter: this._jitterDecoder.decode(input.jitter),
		jitterBufferDelay: this._jitterBufferDelayDecoder.decode(input.jitterBufferDelay),
		jitterBufferEmittedCount: this._jitterBufferEmittedCountDecoder.decode(input.jitterBufferEmittedCount),
		jitterBufferMinimumDelay: this._jitterBufferMinimumDelayDecoder.decode(input.jitterBufferMinimumDelay),
		jitterBufferTargetDelay: this._jitterBufferTargetDelayDecoder.decode(input.jitterBufferTargetDelay),
		keyFramesDecoded: this._keyFramesDecodedDecoder.decode(input.keyFramesDecoded),
		lastPacketReceivedTimestamp: this._lastPacketReceivedTimestampDecoder.decode(input.lastPacketReceivedTimestamp),
		mid: this._midDecoder.decode(input.mid),
		nackCount: this._nackCountDecoder.decode(input.nackCount),
		packetsDiscarded: this._packetsDiscardedDecoder.decode(input.packetsDiscarded),
		packetsLost: this._packetsLostDecoder.decode(input.packetsLost),
		packetsReceived: this._packetsReceivedDecoder.decode(input.packetsReceived),
		pauseCount: this._pauseCountDecoder.decode(input.pauseCount),
		pliCount: this._pliCountDecoder.decode(input.pliCount),
		playoutId: this._playoutIdDecoder.decode(input.playoutId),
		powerEfficientDecoder: this._powerEfficientDecoderDecoder.decode(input.powerEfficientDecoder),
		qpSum: this._qpSumDecoder.decode(input.qpSum),
		remoteId: this._remoteIdDecoder.decode(input.remoteId),
		removedSamplesForAcceleration: this._removedSamplesForAccelerationDecoder.decode(input.removedSamplesForAcceleration),
		retransmittedBytesReceived: this._retransmittedBytesReceivedDecoder.decode(input.retransmittedBytesReceived),
		retransmittedPacketsReceived: this._retransmittedPacketsReceivedDecoder.decode(input.retransmittedPacketsReceived),
		rtxSsrc: this._rtxSsrcDecoder.decode(input.rtxSsrc),
		silentConcealedSamples: this._silentConcealedSamplesDecoder.decode(input.silentConcealedSamples),
		totalAssemblyTime: this._totalAssemblyTimeDecoder.decode(input.totalAssemblyTime),
		totalAudioEnergy: this._totalAudioEnergyDecoder.decode(input.totalAudioEnergy),
		totalCorruptionProbability: this._totalCorruptionProbabilityDecoder.decode(input.totalCorruptionProbability),
		totalDecodeTime: this._totalDecodeTimeDecoder.decode(input.totalDecodeTime),
		totalFreezesDuration: this._totalFreezesDurationDecoder.decode(input.totalFreezesDuration),
		totalInterFrameDelay: this._totalInterFrameDelayDecoder.decode(input.totalInterFrameDelay),
		totalPausesDuration: this._totalPausesDurationDecoder.decode(input.totalPausesDuration),
		totalProcessingDelay: this._totalProcessingDelayDecoder.decode(input.totalProcessingDelay),
		totalSamplesDuration: this._totalSamplesDurationDecoder.decode(input.totalSamplesDuration),
		totalSamplesReceived: this._totalSamplesReceivedDecoder.decode(input.totalSamplesReceived),
		totalSquaredCorruptionProbability: this._totalSquaredCorruptionProbabilityDecoder.decode(input.totalSquaredCorruptionProbability),
		totalSquaredInterFrameDelay: this._totalSquaredInterFrameDelayDecoder.decode(input.totalSquaredInterFrameDelay),
		transportId: this._transportIdDecoder.decode(input.transportId),
	  };
	}
  }