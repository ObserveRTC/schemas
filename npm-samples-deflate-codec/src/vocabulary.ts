/**
 * The fixed diff vocabulary of the structural sample diff.
 *
 * Derived from the generated schema types (schema 3.7.0) — the field set of
 * each sample type, one entry per wire list. A sample entry that carries a
 * field outside its list's vocabulary is sent whole, and keeps being sent
 * whole while the field stays outside the vocabulary; a field that appears
 * for the first time while it is inside the vocabulary is sent as an
 * ordinary changed field.
 *
 * The per-entry `timestamp` is in every entry vocabulary and diffed like
 * any other field: the browser collects stats per source at different
 * moments (within one sample the collection times spread over up to ~1.7 s),
 * so it carries real per-entity data, not bookkeeping.
 */

export const TOP_FIELDS: readonly string[] = ['timestamp', 'callId', 'clientId', 'attachments', 'score', 'scoreReasons', 'peerConnections', 'clientEvents', 'clientIssues', 'clientMetaItems', 'extensionStats'];

/** Top-level lists that carry no per-entry diff: sent whole when non-empty. */
export const TOP_VALUE_LISTS: ReadonlySet<string> = new Set([
	'clientEvents', 'clientIssues', 'clientMetaItems', 'extensionStats',
]);

export const PC_FIELDS: readonly string[] = ['peerConnectionId', 'attachments', 'score', 'scoreReasons', 'inboundTracks', 'outboundTracks', 'codecs', 'inboundRtps', 'remoteInboundRtps', 'outboundRtps', 'remoteOutboundRtps', 'mediaSources', 'mediaPlayouts', 'peerConnectionTransports', 'dataChannels', 'iceTransports', 'iceCandidates', 'iceCandidatePairs', 'certificates'];

/** The per-entry field vocabulary of every peer-connection sub-list. */
export const PC_ENTRY_FIELDS: Readonly<Record<string, readonly string[]>> = {
	inboundTracks: [
		'id', 'timestamp', 'kind', 'score', 'scoreReasons', 'attachments'
	],
	outboundTracks: [
		'id', 'timestamp', 'kind', 'score', 'scoreReasons', 'attachments'
	],
	codecs: [
		'id', 'timestamp', 'mimeType', 'payloadType', 'transportId', 'clockRate',
		'channels', 'sdpFmtpLine', 'attachments'
	],
	inboundRtps: [
		'id', 'timestamp', 'ssrc', 'kind', 'trackIdentifier', 'transportId',
		'codecId', 'packetsReceived', 'packetsReceivedWithEct1', 'packetsReceivedWithCe', 'packetsReportedAsLost',
		'packetsReportedAsLostButRecovered', 'packetsLost', 'jitter', 'mid', 'remoteId',
		'framesDecoded', 'keyFramesDecoded', 'framesRendered', 'framesDropped', 'frameWidth',
		'frameHeight', 'framesPerSecond', 'qpSum', 'totalDecodeTime', 'totalInterFrameDelay',
		'totalSquaredInterFrameDelay', 'pauseCount', 'totalPausesDuration', 'freezeCount', 'totalFreezesDuration',
		'lastPacketReceivedTimestamp', 'headerBytesReceived', 'packetsDiscarded', 'fecBytesReceived', 'fecPacketsReceived',
		'fecPacketsDiscarded', 'bytesReceived', 'nackCount', 'firCount', 'pliCount',
		'totalProcessingDelay', 'estimatedPlayoutTimestamp', 'jitterBufferDelay', 'jitterBufferTargetDelay', 'jitterBufferEmittedCount',
		'jitterBufferMinimumDelay', 'totalSamplesReceived', 'concealedSamples', 'silentConcealedSamples', 'concealmentEvents',
		'insertedSamplesForDeceleration', 'removedSamplesForAcceleration', 'audioLevel', 'totalAudioEnergy', 'totalSamplesDuration',
		'framesReceived', 'decoderImplementation', 'playoutId', 'powerEfficientDecoder', 'framesAssembledFromMultiplePackets',
		'totalAssemblyTime', 'retransmittedPacketsReceived', 'retransmittedBytesReceived', 'rtxSsrc', 'fecSsrc',
		'totalCorruptionProbability', 'totalSquaredCorruptionProbability', 'corruptionMeasurements', 'attachments'
	],
	remoteInboundRtps: [
		'id', 'timestamp', 'ssrc', 'kind', 'transportId', 'codecId',
		'packetsReceived', 'packetsReceivedWithEct1', 'packetsReceivedWithCe', 'packetsReportedAsLost', 'packetsReportedAsLostButRecovered',
		'packetsLost', 'jitter', 'localId', 'roundTripTime', 'totalRoundTripTime',
		'fractionLost', 'roundTripTimeMeasurements', 'packetsWithBleachedEct1Marking', 'attachments'
	],
	outboundRtps: [
		'id', 'timestamp', 'ssrc', 'kind', 'transportId', 'codecId',
		'packetsSent', 'bytesSent', 'mid', 'mediaSourceId', 'remoteId',
		'rid', 'encodingIndex', 'headerBytesSent', 'retransmittedPacketsSent', 'retransmittedBytesSent',
		'rtxSsrc', 'targetBitrate', 'totalEncodedBytesTarget', 'frameWidth', 'frameHeight',
		'framesPerSecond', 'framesSent', 'hugeFramesSent', 'framesEncoded', 'keyFramesEncoded',
		'qpSum', 'psnrSum', 'psnrMeasurements', 'totalEncodeTime', 'totalPacketSendDelay',
		'qualityLimitationReason', 'qualityLimitationDurations', 'qualityLimitationResolutionChanges', 'nackCount', 'firCount',
		'pliCount', 'encoderImplementation', 'powerEfficientEncoder', 'active', 'scalabilityMode',
		'packetsSentWithEct1', 'attachments'
	],
	remoteOutboundRtps: [
		'id', 'timestamp', 'ssrc', 'kind', 'transportId', 'codecId',
		'packetsSent', 'bytesSent', 'localId', 'remoteTimestamp', 'reportsSent',
		'roundTripTime', 'totalRoundTripTime', 'roundTripTimeMeasurements', 'attachments'
	],
	mediaSources: [
		'id', 'timestamp', 'kind', 'trackIdentifier', 'audioLevel', 'totalAudioEnergy',
		'totalSamplesDuration', 'echoReturnLoss', 'echoReturnLossEnhancement', 'width', 'height',
		'frames', 'framesPerSecond', 'attachments'
	],
	mediaPlayouts: [
		'id', 'timestamp', 'kind', 'synthesizedSamplesDuration', 'synthesizedSamplesEvents', 'totalSamplesDuration',
		'totalPlayoutDelay', 'totalSamplesCount', 'attachments'
	],
	peerConnectionTransports: [
		'id', 'timestamp', 'dataChannelsOpened', 'dataChannelsClosed', 'attachments'
	],
	dataChannels: [
		'id', 'timestamp', 'label', 'protocol', 'dataChannelIdentifier', 'state',
		'messagesSent', 'bytesSent', 'messagesReceived', 'bytesReceived', 'attachments'
	],
	iceTransports: [
		'id', 'timestamp', 'packetsSent', 'packetsReceived', 'bytesSent', 'bytesReceived',
		'iceRole', 'iceLocalUsernameFragment', 'dtlsState', 'iceState', 'selectedCandidatePairId',
		'localCertificateId', 'remoteCertificateId', 'tlsVersion', 'dtlsCipher', 'dtlsRole',
		'srtpCipher', 'selectedCandidatePairChanges', 'ccfbMessagesSent', 'ccfbMessagesReceived', 'attachments'
	],
	iceCandidates: [
		'id', 'timestamp', 'transportId', 'address', 'port', 'protocol',
		'candidateType', 'priority', 'url', 'relayProtocol', 'foundation',
		'relatedAddress', 'relatedPort', 'usernameFragment', 'tcpType', 'attachments'
	],
	iceCandidatePairs: [
		'id', 'timestamp', 'transportId', 'localCandidateId', 'remoteCandidateId', 'state',
		'nominated', 'packetsSent', 'packetsReceived', 'bytesSent', 'bytesReceived',
		'lastPacketSentTimestamp', 'lastPacketReceivedTimestamp', 'totalRoundTripTime', 'currentRoundTripTime', 'availableOutgoingBitrate',
		'availableIncomingBitrate', 'requestsReceived', 'requestsSent', 'responsesReceived', 'responsesSent',
		'consentRequestsSent', 'packetsDiscardedOnSend', 'bytesDiscardedOnSend', 'attachments'
	],
	certificates: [
		'id', 'timestamp', 'fingerprint', 'fingerprintAlgorithm', 'base64Certificate', 'issuerCertificateId',
		'attachments'
	],
};

/** A list value of `l: [ … ]` in a delta replaces the whole list. */
export const WHOLE_LIST_KEY = 'l';

/** A list value of `e: [ … ]` in a delta carries per-entry changes. */
export const ENTRY_UPDATES_KEY = 'e';
