/**
 * The only thing the delta engine cannot work out for itself.
 *
 * JSON is self-describing, so unlike the protobuf codec this package needs no
 * field list, no type table and no descriptor — the engine walks whatever it is
 * given. What it cannot infer is *meaning*: that two array entries in
 * consecutive samples are the same RTP stream, that a `clientEvents` entry is a
 * one-off rather than a thing with a history, and that `attachments` is an
 * opaque blob rather than a structure worth diffing.
 *
 * That is this file, and it is the whole configuration surface. A field added
 * to the schema needs no change here.
 */

/**
 * Which field identifies an entry inside a repeated field, so this sample's
 * entry can be matched against the previous sample's.
 *
 * Arrays not listed here are keyed by `id`, which is what every stats type in
 * the schema uses. RTP streams are keyed by SSRC instead: the stats `id` is a
 * browser-local string with no guarantee of surviving a renegotiation, whereas
 * the SSRC is the thing both ends actually agree on.
 */
export const COLLECTION_KEYS: Readonly<Record<string, string>> = {
	peerConnections: 'peerConnectionId',
	inboundRtps: 'ssrc',
	outboundRtps: 'ssrc',
	remoteInboundRtps: 'ssrc',
	remoteOutboundRtps: 'ssrc',
};

export const DEFAULT_COLLECTION_KEY = 'id';

/**
 * Arrays of one-off records rather than of long-lived things. Each entry is
 * unrelated to the last, so entries are written whole and nothing about them is
 * remembered between samples.
 */
export const VALUE_LISTS: ReadonlySet<string> = new Set([
	'clientEvents',
	'clientIssues',
	'clientMetaItems',
	'extensionStats',
]);

/**
 * Object-valued fields whose own fields are worth diffing individually.
 *
 * Everything else object-valued — in practice only `attachments` — is caller
 * data of a shape we know nothing about, and is replaced wholesale when it
 * changes. Diffing into it would need a way to say "this key was removed",
 * which this format deliberately does not have.
 */
export const STRUCT_FIELDS: ReadonlySet<string> = new Set([
	'psnrSum',
	'qualityLimitationDurations',
]);

/**
 * Fields the plain sample types declare as required, keyed by the collection
 * whose entries they belong to.
 *
 * The decoder checks these after merging. A miss means it never saw the message
 * that first carried the field — the one failure mode a delta protocol has, and
 * worth a loud error rather than an object that does not match its own type.
 */
export const ROOT_REQUIRED_FIELDS: readonly string[] = ['timestamp'];

export const REQUIRED_FIELDS: Readonly<Record<string, readonly string[]>> = {
	peerConnections: ['peerConnectionId'],

	inboundTracks: ['id', 'kind', 'timestamp'],
	outboundTracks: ['id', 'kind', 'timestamp'],
	codecs: ['id', 'mimeType', 'timestamp'],
	inboundRtps: ['id', 'kind', 'ssrc', 'timestamp', 'trackIdentifier'],
	outboundRtps: ['id', 'kind', 'ssrc', 'timestamp'],
	remoteInboundRtps: ['id', 'kind', 'ssrc', 'timestamp'],
	remoteOutboundRtps: ['id', 'kind', 'ssrc', 'timestamp'],
	mediaSources: ['id', 'kind', 'timestamp'],
	mediaPlayouts: ['id', 'kind', 'timestamp'],
	peerConnectionTransports: ['id', 'timestamp'],
	dataChannels: ['id', 'timestamp'],
	iceTransports: ['id', 'timestamp'],
	iceCandidates: ['id', 'timestamp'],
	iceCandidatePairs: ['id', 'timestamp'],
	certificates: ['id', 'timestamp'],

	clientEvents: ['type'],
	clientIssues: ['type'],
	clientMetaItems: ['type'],
	extensionStats: ['type'],
};

/**
 * Written on every message even when unchanged, so a receiver can attribute a
 * message without holding per-connection routing state of its own.
 */
export const PINNED_ROOT_FIELDS: ReadonlySet<string> = new Set(['clientId']);
