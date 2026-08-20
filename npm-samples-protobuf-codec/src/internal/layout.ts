/**
 * The handful of things the protobuf descriptor cannot tell us.
 *
 * Everything else about the mapping — which fields exist, which are 64-bit,
 * which are bytes, which are nested messages — is read off the descriptor at
 * construction time (see `plan.ts`). That is deliberate: when a schema field is
 * added upstream, this file should not need to change.
 *
 * What is left here is genuinely semantic:
 *
 *  - which field identifies an entry inside a repeated field, so the codec can
 *    match this sample's entry against the previous sample's;
 *  - which repeated fields are event streams rather than entities, and so must
 *    be sent whole every time;
 *  - which fields the plain sample types declare as required, so a desynced
 *    stream fails loudly instead of producing a half-built object;
 *  - which logical identifier a `bytes` field carries, for the utf8/uuid choice.
 */

/** Fully qualified names are noisy; keys here drop the proto package. */
export const PROTO_PACKAGE = 'org.observertc.schemas.protobuf';

export type ListLayout =
	/**
	 * A collection of long-lived things (a codec, an RTP stream, an ICE
	 * candidate pair). Entries are matched across samples by `key`, and only the
	 * fields that changed are sent.
	 */
	| { readonly mode: 'entity'; readonly key: string }
	/**
	 * A stream of one-off records (an event, an issue). Each entry is unrelated
	 * to the last, so every entry is sent in full and nothing is remembered.
	 */
	| { readonly mode: 'value' };

/**
 * Keyed by `<message>.<field>`, where `<message>` is the proto type name with
 * the package stripped.
 *
 * Repeated message fields not listed here fall back to an `id`-keyed entity
 * collection, which is what every stats type in the schema uses.
 */
export const LIST_LAYOUTS: Readonly<Record<string, ListLayout>> = {
	'ClientSample.clientEvents': { mode: 'value' },
	'ClientSample.clientIssues': { mode: 'value' },
	'ClientSample.clientMetaItems': { mode: 'value' },
	'ClientSample.extensionStats': { mode: 'value' },

	'ClientSample.peerConnections': { mode: 'entity', key: 'peerConnectionId' },

	// RTP streams are keyed by SSRC rather than by `id`: the stats id is a
	// browser-local string that is not guaranteed to survive a renegotiation,
	// whereas the SSRC is the thing both ends actually agree on.
	'ClientSample.PeerConnectionSample.inboundRtps': { mode: 'entity', key: 'ssrc' },
	'ClientSample.PeerConnectionSample.outboundRtps': { mode: 'entity', key: 'ssrc' },
	'ClientSample.PeerConnectionSample.remoteInboundRtps': { mode: 'entity', key: 'ssrc' },
	'ClientSample.PeerConnectionSample.remoteOutboundRtps': { mode: 'entity', key: 'ssrc' },
};

export const DEFAULT_ENTITY_KEY = 'id';

/**
 * Fields the plain TypeScript types declare as non-optional, by message.
 *
 * The decoder checks these after merging a message onto its running state. A
 * miss means the decoder never saw the sample that first carried the field,
 * which is the one failure mode a delta protocol has, and the one worth a loud
 * error rather than a quietly incomplete object.
 */
export const REQUIRED_FIELDS: Readonly<Record<string, readonly string[]>> = {
	'ClientSample': ['timestamp'],
	'ClientSample.PeerConnectionSample': ['peerConnectionId'],

	'ClientSample.PeerConnectionSample.InboundTrackSample': ['id', 'kind', 'timestamp'],
	'ClientSample.PeerConnectionSample.OutboundTrackSample': ['id', 'kind', 'timestamp'],
	'ClientSample.PeerConnectionSample.CodecStats': ['id', 'mimeType', 'timestamp'],
	'ClientSample.PeerConnectionSample.InboundRtpStats': [
		'id',
		'kind',
		'ssrc',
		'timestamp',
		'trackIdentifier',
	],
	'ClientSample.PeerConnectionSample.OutboundRtpStats': ['id', 'kind', 'ssrc', 'timestamp'],
	'ClientSample.PeerConnectionSample.RemoteInboundRtpStats': ['id', 'kind', 'ssrc', 'timestamp'],
	'ClientSample.PeerConnectionSample.RemoteOutboundRtpStats': ['id', 'kind', 'ssrc', 'timestamp'],
	'ClientSample.PeerConnectionSample.MediaSourceStats': ['id', 'kind', 'timestamp'],
	'ClientSample.PeerConnectionSample.MediaPlayoutStats': ['id', 'kind', 'timestamp'],
	'ClientSample.PeerConnectionSample.PeerConnectionTransportStats': ['id', 'timestamp'],
	'ClientSample.PeerConnectionSample.DataChannelStats': ['id', 'timestamp'],
	'ClientSample.PeerConnectionSample.IceTransportStats': ['id', 'timestamp'],
	'ClientSample.PeerConnectionSample.IceCandidateStats': ['id', 'timestamp'],
	'ClientSample.PeerConnectionSample.IceCandidatePairStats': ['id', 'timestamp'],
	'ClientSample.PeerConnectionSample.CertificateStats': ['id', 'timestamp'],

	'ClientSample.ClientEvent': ['type'],
	'ClientSample.ClientIssue': ['type'],
	'ClientSample.ClientMetaData': ['type'],
	'ClientSample.ExtensionStat': ['type'],

	'ClientSample.PeerConnectionSample.OutboundRtpStats.PsnrSum': ['y', 'u', 'v'],
	'ClientSample.PeerConnectionSample.OutboundRtpStats.QualityLimitationDurations': [
		'none',
		'cpu',
		'bandwidth',
		'other',
	],
};

/**
 * Which knob in `CodecOptions.identifiers` governs a given `bytes` field.
 *
 * `trackIdentifier` and `trackId` are the same identifier under two names —
 * the W3C stats spell it one way and `ClientMetaData` the other — so both read
 * the `trackId` setting rather than making callers configure it twice.
 */
export const IDENTIFIER_SLOTS: Readonly<
	Record<string, 'callId' | 'clientId' | 'peerConnectionId' | 'trackId'>
> = {
	callId: 'callId',
	clientId: 'clientId',
	peerConnectionId: 'peerConnectionId',
	trackId: 'trackId',
	trackIdentifier: 'trackId',
};

/**
 * Plain spellings for proto enum values whose canonical form is not simply the
 * lower-cased enum name.
 *
 * `RTCIceCandidatePairState` is the only one today: the W3C IDL says
 * `inProgress`, browsers ship `in-progress` and `inprogress`, and the proto
 * enum flattens all three to `INPROGRESS`. Decoding picks the spelling the
 * W3C stats objects actually carry.
 */
export const ENUM_PLAIN_ALIASES: Readonly<Record<string, string>> = {
	INPROGRESS: 'in-progress',
};

/**
 * Fields whose `string` on the wire is a JSON document, not a name. In the
 * plain sample types `attachments` is a free-form record and `payload` (on
 * events, issues, meta items and extension stats) is a record of primitives;
 * proto3
 * cannot express either, so both travel as JSON strings and convert through
 * the JSON converter.
 */
export const JSON_FIELDS: ReadonlySet<string> = new Set(['attachments', 'payload']);

export function shortTypeName(typeName: string): string {
	return typeName.startsWith(`${PROTO_PACKAGE}.`)
		? typeName.slice(PROTO_PACKAGE.length + 1)
		: typeName;
}
