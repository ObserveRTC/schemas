import { 
	AppDataEncoder, 
	BooleanToBooleanEncoder, 
	NumberToBigIntEncoder, 
	NumberToNumberEncoder, 
	OneTimePassEncoder, 
	StringToStringEncoder 
} from "./utils";
import { ClientSample_PeerConnectionSample_InboundRtpStats } from './OutputSamples';
import { Encoder } from "./utils";
import { InboundRtpStats } from "./InputSamples";

export class InboundRtpEncoder implements Encoder<InboundRtpStats, ClientSample_PeerConnectionSample_InboundRtpStats> {
	private readonly _ssrc: bigint;
	private _visited = false;

	private readonly _idEncoder: StringToStringEncoder;
	private readonly _kindEncoder: StringToStringEncoder;
	// private readonly _peerConnectionIdEncoder: Encoder<string, Uint8Array>;
	private readonly _timestampEncoder: Encoder<number, bigint>;
	// private readonly _trackIdentifierEncoder: Encoder<string, Uint8Array>;
	// private readonly _appDataEncoder: Encoder<Uint8Array, Uint8Array>;
	private readonly _audioLevelEncoder: NumberToNumberEncoder;
	private readonly _bytesReceivedEncoder: Encoder<number, bigint>;
	private readonly _codecIdEncoder: OneTimePassEncoder<string>;
	private readonly _concealedSamplesEncoder: NumberToNumberEncoder;
	private readonly _concealmentEventsEncoder: NumberToNumberEncoder;
	private readonly _corruptionMeasurementsEncoder: NumberToNumberEncoder;
	private readonly _decoderImplementationEncoder: StringToStringEncoder;
	private readonly _estimatedPlayoutTimestampEncoder: NumberToNumberEncoder;
	private readonly _fecBytesReceivedEncoder: Encoder<number, bigint>;
	private readonly _fecPacketsDiscardedEncoder: NumberToNumberEncoder;
	private readonly _fecPacketsReceivedEncoder: NumberToNumberEncoder;
	private readonly _fecSsrcEncoder: Encoder<number, bigint>;
	private readonly _firCountEncoder: NumberToNumberEncoder;
	private readonly _frameHeightEncoder: NumberToNumberEncoder;
	private readonly _frameWidthEncoder: NumberToNumberEncoder;
	private readonly _framesAssembledFromMultiplePacketsEncoder: NumberToNumberEncoder;
	private readonly _framesDecodedEncoder: NumberToNumberEncoder;
	private readonly _framesDroppedEncoder: NumberToNumberEncoder;
	private readonly _framesPerSecondEncoder: NumberToNumberEncoder;
	private readonly _framesReceivedEncoder: NumberToNumberEncoder;
	private readonly _framesRenderedEncoder: NumberToNumberEncoder;
	private readonly _freezeCountEncoder: NumberToNumberEncoder;
	private readonly _headerBytesReceivedEncoder: Encoder<number, bigint>;
	private readonly _insertedSamplesForDecelerationEncoder: NumberToNumberEncoder;
	private readonly _jitterEncoder: NumberToNumberEncoder;
	private readonly _jitterBufferDelayEncoder: NumberToNumberEncoder;
	private readonly _jitterBufferEmittedCountEncoder: NumberToNumberEncoder;
	private readonly _jitterBufferMinimumDelayEncoder: NumberToNumberEncoder;
	private readonly _jitterBufferTargetDelayEncoder: NumberToNumberEncoder;
	private readonly _keyFramesDecodedEncoder: NumberToNumberEncoder;
	private readonly _lastPacketReceivedTimestampEncoder: NumberToNumberEncoder;
	private readonly _midEncoder: OneTimePassEncoder<string>;
	private readonly _nackCountEncoder: NumberToNumberEncoder;
	private readonly _packetsDiscardedEncoder: NumberToNumberEncoder;
	private readonly _packetsLostEncoder: NumberToNumberEncoder;
	private readonly _packetsReceivedEncoder: NumberToNumberEncoder;
	private readonly _pauseCountEncoder: NumberToNumberEncoder;
	private readonly _pliCountEncoder: NumberToNumberEncoder;
	private readonly _playoutIdEncoder: StringToStringEncoder;
	private readonly _powerEfficientDecoderEncoder: BooleanToBooleanEncoder;
	private readonly _qpSumEncoder: NumberToNumberEncoder;
	private readonly _remoteIdEncoder: StringToStringEncoder;
	private readonly _removedSamplesForAccelerationEncoder: NumberToNumberEncoder;
	private readonly _retransmittedBytesReceivedEncoder: NumberToBigIntEncoder;
	private readonly _retransmittedPacketsReceivedEncoder: NumberToNumberEncoder;
	private readonly _rtxSsrcEncoder: NumberToBigIntEncoder;
	private readonly _silentConcealedSamplesEncoder: NumberToNumberEncoder;
	private readonly _totalAssemblyTimeEncoder: NumberToNumberEncoder;
	private readonly _totalAudioEnergyEncoder: NumberToNumberEncoder;
	private readonly _totalCorruptionProbabilityEncoder: NumberToNumberEncoder;
	private readonly _totalDecodeTimeEncoder: NumberToNumberEncoder;
	private readonly _totalFreezesDurationEncoder: NumberToNumberEncoder;
	private readonly _totalInterFrameDelayEncoder: NumberToNumberEncoder;
	private readonly _totalPausesDurationEncoder: NumberToNumberEncoder;
	private readonly _totalProcessingDelayEncoder: NumberToNumberEncoder;
	private readonly _totalSamplesDurationEncoder: NumberToNumberEncoder;
	private readonly _totalSamplesReceivedEncoder: NumberToNumberEncoder;
	private readonly _totalSquaredCorruptionProbabilityEncoder: NumberToNumberEncoder;
	private readonly _totalSquaredInterFrameDelayEncoder: NumberToNumberEncoder;
	private readonly _transportIdEncoder: OneTimePassEncoder<string>;

	constructor(
        ssrc: number,
				private readonly _trackIdentifierEncoder: Encoder<string, Uint8Array>,
        private _appDataEncoder: AppDataEncoder,
    ) {
			this._ssrc = BigInt(ssrc);
			this._idEncoder = new StringToStringEncoder();
			this._kindEncoder = new StringToStringEncoder();
			this._timestampEncoder = new NumberToBigIntEncoder();
			this._audioLevelEncoder = new NumberToNumberEncoder();
			this._bytesReceivedEncoder = new NumberToBigIntEncoder();
			this._codecIdEncoder = new OneTimePassEncoder<string>();
			this._concealedSamplesEncoder = new NumberToNumberEncoder();
			this._concealmentEventsEncoder = new NumberToNumberEncoder();
			this._corruptionMeasurementsEncoder = new NumberToNumberEncoder();
			this._decoderImplementationEncoder = new StringToStringEncoder();
			this._estimatedPlayoutTimestampEncoder = new NumberToNumberEncoder();
			this._fecBytesReceivedEncoder = new NumberToBigIntEncoder();
			this._fecPacketsDiscardedEncoder = new NumberToNumberEncoder();
			this._fecPacketsReceivedEncoder = new NumberToNumberEncoder();
			this._fecSsrcEncoder = new NumberToBigIntEncoder();
			this._firCountEncoder = new NumberToNumberEncoder();
			this._frameHeightEncoder = new NumberToNumberEncoder();
			this._frameWidthEncoder = new NumberToNumberEncoder();
			this._framesAssembledFromMultiplePacketsEncoder = new NumberToNumberEncoder();
			this._framesDecodedEncoder = new NumberToNumberEncoder();
			this._framesDroppedEncoder = new NumberToNumberEncoder();
			this._framesPerSecondEncoder = new NumberToNumberEncoder();
			this._framesReceivedEncoder = new NumberToNumberEncoder();
			this._framesRenderedEncoder = new NumberToNumberEncoder();
			this._freezeCountEncoder = new NumberToNumberEncoder();
			this._headerBytesReceivedEncoder = new NumberToBigIntEncoder();
			this._insertedSamplesForDecelerationEncoder = new NumberToNumberEncoder();
			this._jitterEncoder = new NumberToNumberEncoder();
			this._jitterBufferDelayEncoder = new NumberToNumberEncoder();
			this._jitterBufferEmittedCountEncoder = new NumberToNumberEncoder();
			this._jitterBufferMinimumDelayEncoder = new NumberToNumberEncoder();
			this._jitterBufferTargetDelayEncoder = new NumberToNumberEncoder();
			this._keyFramesDecodedEncoder = new NumberToNumberEncoder();
			this._lastPacketReceivedTimestampEncoder = new NumberToNumberEncoder();
			this._midEncoder = new OneTimePassEncoder<string>();
			this._nackCountEncoder = new NumberToNumberEncoder();
			this._packetsDiscardedEncoder = new NumberToNumberEncoder();
			this._packetsLostEncoder = new NumberToNumberEncoder();
			this._packetsReceivedEncoder = new NumberToNumberEncoder();
			this._pauseCountEncoder = new NumberToNumberEncoder();
			this._pliCountEncoder = new NumberToNumberEncoder();
			this._playoutIdEncoder = new StringToStringEncoder();
			this._powerEfficientDecoderEncoder = new BooleanToBooleanEncoder();
			this._qpSumEncoder = new NumberToNumberEncoder();
			this._remoteIdEncoder = new StringToStringEncoder();
			this._removedSamplesForAccelerationEncoder = new NumberToNumberEncoder();
			this._retransmittedBytesReceivedEncoder = new NumberToBigIntEncoder();
			this._retransmittedPacketsReceivedEncoder = new NumberToNumberEncoder();
			this._rtxSsrcEncoder = new NumberToBigIntEncoder();
			this._silentConcealedSamplesEncoder = new NumberToNumberEncoder();
			this._totalAssemblyTimeEncoder = new NumberToNumberEncoder();
			this._totalAudioEnergyEncoder = new NumberToNumberEncoder();
			this._totalCorruptionProbabilityEncoder = new NumberToNumberEncoder();
			this._totalDecodeTimeEncoder = new NumberToNumberEncoder();
			this._totalFreezesDurationEncoder = new NumberToNumberEncoder();
			this._totalInterFrameDelayEncoder = new NumberToNumberEncoder();
			this._totalPausesDurationEncoder = new NumberToNumberEncoder();
			this._totalProcessingDelayEncoder = new NumberToNumberEncoder();
			this._totalSamplesDurationEncoder = new NumberToNumberEncoder();
			this._totalSamplesReceivedEncoder = new NumberToNumberEncoder();
			this._totalSquaredCorruptionProbabilityEncoder = new NumberToNumberEncoder();
			this._totalSquaredInterFrameDelayEncoder = new NumberToNumberEncoder();
			this._transportIdEncoder = new OneTimePassEncoder<string>();
	}

	public get visited(): boolean {
		const result = this._visited;
		this._visited = false;
		return result;
	}

	public reset() {
		this._idEncoder.reset();
		this._kindEncoder.reset();
		this._timestampEncoder.reset();
		this._audioLevelEncoder.reset();
		this._bytesReceivedEncoder.reset();
		this._codecIdEncoder.reset();
		this._concealedSamplesEncoder.reset();
		this._concealmentEventsEncoder.reset();
		this._corruptionMeasurementsEncoder.reset();
		this._decoderImplementationEncoder.reset();
		this._estimatedPlayoutTimestampEncoder.reset();
		this._fecBytesReceivedEncoder.reset();
		this._fecPacketsDiscardedEncoder.reset();
		this._fecPacketsReceivedEncoder.reset();
		this._fecSsrcEncoder.reset();
		this._firCountEncoder.reset();
		this._frameHeightEncoder.reset();
		this._frameWidthEncoder.reset();
		this._framesAssembledFromMultiplePacketsEncoder.reset();
		this._framesDecodedEncoder.reset();
		this._framesDroppedEncoder.reset();
		this._framesPerSecondEncoder.reset();
		this._framesReceivedEncoder.reset();
		this._framesRenderedEncoder.reset();
		this._freezeCountEncoder.reset();
		this._headerBytesReceivedEncoder.reset();
		this._insertedSamplesForDecelerationEncoder.reset();
		this._jitterEncoder.reset();
		this._jitterBufferDelayEncoder.reset();
		this._jitterBufferEmittedCountEncoder.reset();
		this._jitterBufferMinimumDelayEncoder.reset();
		this._jitterBufferTargetDelayEncoder.reset();
		this._keyFramesDecodedEncoder.reset();
		this._lastPacketReceivedTimestampEncoder.reset();
		this._midEncoder.reset();
		this._nackCountEncoder.reset();
		this._packetsDiscardedEncoder.reset();
		this._packetsLostEncoder.reset();
		this._packetsReceivedEncoder.reset();
		this._pauseCountEncoder.reset();
		this._pliCountEncoder.reset();
		this._playoutIdEncoder.reset();
		this._powerEfficientDecoderEncoder.reset();
		this._qpSumEncoder.reset();
		this._remoteIdEncoder.reset();
		this._removedSamplesForAccelerationEncoder.reset();
		this._retransmittedBytesReceivedEncoder.reset();
		this._retransmittedPacketsReceivedEncoder.reset();
		this._rtxSsrcEncoder.reset();
		this._silentConcealedSamplesEncoder.reset();
		this._totalAssemblyTimeEncoder.reset();
		this._totalAudioEnergyEncoder.reset();
		this._totalCorruptionProbabilityEncoder.reset();
		this._totalDecodeTimeEncoder.reset();
		this._totalFreezesDurationEncoder.reset();
		this._totalInterFrameDelayEncoder.reset();
		this._totalPausesDurationEncoder.reset();
		this._totalProcessingDelayEncoder.reset();
		this._totalSamplesDurationEncoder.reset();
		this._totalSamplesReceivedEncoder.reset();
		this._totalSquaredCorruptionProbabilityEncoder.reset();
		this._totalSquaredInterFrameDelayEncoder.reset();
		this._transportIdEncoder.reset();
	}

	public encode(sample: InboundRtpStats): ClientSample_PeerConnectionSample_InboundRtpStats {
    this._visited = true;

    const result = new ClientSample_PeerConnectionSample_InboundRtpStats({
        ssrc: this._ssrc,
				trackIdentifier: this._trackIdentifierEncoder.encode(sample.trackIdentifier),

        appData: this._appDataEncoder.encode(sample.appData),
        id: this._idEncoder.encode(sample.id),
        kind: this._kindEncoder.encode(sample.kind),
        timestamp: this._timestampEncoder.encode(sample.timestamp),
        audioLevel: this._audioLevelEncoder.encode(sample.audioLevel),
        bytesReceived: this._bytesReceivedEncoder.encode(sample.bytesReceived),
        codecId: this._codecIdEncoder.encode(sample.codecId),
        concealedSamples: this._concealedSamplesEncoder.encode(sample.concealedSamples),
        concealmentEvents: this._concealmentEventsEncoder.encode(sample.concealmentEvents),
        corruptionMeasurements: this._corruptionMeasurementsEncoder.encode(sample.corruptionMeasurements),
        decoderImplementation: this._decoderImplementationEncoder.encode(sample.decoderImplementation),
        estimatedPlayoutTimestamp: this._estimatedPlayoutTimestampEncoder.encode(sample.estimatedPlayoutTimestamp),
        fecBytesReceived: this._fecBytesReceivedEncoder.encode(sample.fecBytesReceived),
        fecPacketsDiscarded: this._fecPacketsDiscardedEncoder.encode(sample.fecPacketsDiscarded),
        fecPacketsReceived: this._fecPacketsReceivedEncoder.encode(sample.fecPacketsReceived),
        fecSsrc: this._fecSsrcEncoder.encode(sample.fecSsrc),
        firCount: this._firCountEncoder.encode(sample.firCount),
        frameHeight: this._frameHeightEncoder.encode(sample.frameHeight),
        frameWidth: this._frameWidthEncoder.encode(sample.frameWidth),
        framesAssembledFromMultiplePackets: this._framesAssembledFromMultiplePacketsEncoder.encode(sample.framesAssembledFromMultiplePackets),
        framesDecoded: this._framesDecodedEncoder.encode(sample.framesDecoded),
        framesDropped: this._framesDroppedEncoder.encode(sample.framesDropped),
        framesPerSecond: this._framesPerSecondEncoder.encode(sample.framesPerSecond),
        framesReceived: this._framesReceivedEncoder.encode(sample.framesReceived),
        framesRendered: this._framesRenderedEncoder.encode(sample.framesRendered),
        freezeCount: this._freezeCountEncoder.encode(sample.freezeCount),
        headerBytesReceived: this._headerBytesReceivedEncoder.encode(sample.headerBytesReceived),
        insertedSamplesForDeceleration: this._insertedSamplesForDecelerationEncoder.encode(sample.insertedSamplesForDeceleration),
        jitter: this._jitterEncoder.encode(sample.jitter),
        jitterBufferDelay: this._jitterBufferDelayEncoder.encode(sample.jitterBufferDelay),
        jitterBufferEmittedCount: this._jitterBufferEmittedCountEncoder.encode(sample.jitterBufferEmittedCount),
        jitterBufferMinimumDelay: this._jitterBufferMinimumDelayEncoder.encode(sample.jitterBufferMinimumDelay),
        jitterBufferTargetDelay: this._jitterBufferTargetDelayEncoder.encode(sample.jitterBufferTargetDelay),
        keyFramesDecoded: this._keyFramesDecodedEncoder.encode(sample.keyFramesDecoded),
        lastPacketReceivedTimestamp: this._lastPacketReceivedTimestampEncoder.encode(sample.lastPacketReceivedTimestamp),
        mid: this._midEncoder.encode(sample.mid),
        nackCount: this._nackCountEncoder.encode(sample.nackCount),
        packetsDiscarded: this._packetsDiscardedEncoder.encode(sample.packetsDiscarded),
        packetsLost: this._packetsLostEncoder.encode(sample.packetsLost),
        packetsReceived: this._packetsReceivedEncoder.encode(sample.packetsReceived),
        pauseCount: this._pauseCountEncoder.encode(sample.pauseCount),
        pliCount: this._pliCountEncoder.encode(sample.pliCount),
        playoutId: this._playoutIdEncoder.encode(sample.playoutId),
        powerEfficientDecoder: this._powerEfficientDecoderEncoder.encode(sample.powerEfficientDecoder),
        qpSum: this._qpSumEncoder.encode(sample.qpSum),
        remoteId: this._remoteIdEncoder.encode(sample.remoteId),
        removedSamplesForAcceleration: this._removedSamplesForAccelerationEncoder.encode(sample.removedSamplesForAcceleration),
        retransmittedBytesReceived: this._retransmittedBytesReceivedEncoder.encode(sample.retransmittedBytesReceived),
        retransmittedPacketsReceived: this._retransmittedPacketsReceivedEncoder.encode(sample.retransmittedPacketsReceived),
        rtxSsrc: this._rtxSsrcEncoder.encode(sample.rtxSsrc),
        silentConcealedSamples: this._silentConcealedSamplesEncoder.encode(sample.silentConcealedSamples),
        totalAssemblyTime: this._totalAssemblyTimeEncoder.encode(sample.totalAssemblyTime),
        totalAudioEnergy: this._totalAudioEnergyEncoder.encode(sample.totalAudioEnergy),
        totalCorruptionProbability: this._totalCorruptionProbabilityEncoder.encode(sample.totalCorruptionProbability),
        totalDecodeTime: this._totalDecodeTimeEncoder.encode(sample.totalDecodeTime),
        totalFreezesDuration: this._totalFreezesDurationEncoder.encode(sample.totalFreezesDuration),
        totalInterFrameDelay: this._totalInterFrameDelayEncoder.encode(sample.totalInterFrameDelay),
        totalPausesDuration: this._totalPausesDurationEncoder.encode(sample.totalPausesDuration),
        totalProcessingDelay: this._totalProcessingDelayEncoder.encode(sample.totalProcessingDelay),
        totalSamplesDuration: this._totalSamplesDurationEncoder.encode(sample.totalSamplesDuration),
        totalSamplesReceived: this._totalSamplesReceivedEncoder.encode(sample.totalSamplesReceived),
        totalSquaredCorruptionProbability: this._totalSquaredCorruptionProbabilityEncoder.encode(sample.totalSquaredCorruptionProbability),
        totalSquaredInterFrameDelay: this._totalSquaredInterFrameDelayEncoder.encode(sample.totalSquaredInterFrameDelay),
        transportId: this._transportIdEncoder.encode(sample.transportId),
    });
		
		return result;
	}
}
