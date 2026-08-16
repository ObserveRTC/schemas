import type { Logger } from './logger.js';

/**
 * How an identifier is packed into the `bytes` fields on the wire.
 *
 * `uuid` stores the 16 significant bytes of a canonical UUID, which is half the
 * size of its textual form and is why these fields are `bytes` at all. `utf8`
 * stores the string as-is and is the safe default, because ObserveRTC does not
 * require callers to use UUIDs for their identifiers.
 *
 * The encoder and the decoder of one stream must agree: a `uuid`-encoded
 * identifier read back as `utf8` yields mojibake rather than an error.
 */
export type IdentifierEncoding = 'utf8' | 'uuid';

/**
 * Per-identifier wire encoding. Keys are the logical identifiers, not the field
 * names: `trackId` covers both `ClientMetaData.trackId` and the
 * `trackIdentifier` field carried by RTP and media-source stats.
 */
export interface IdentifierEncodings {
	readonly callId?: IdentifierEncoding;
	readonly clientId?: IdentifierEncoding;
	readonly peerConnectionId?: IdentifierEncoding;
	readonly trackId?: IdentifierEncoding;
}

export interface CodecOptions {
	/**
	 * Wire encoding for each identifier. Defaults to `utf8` for all of them.
	 *
	 * @example
	 * ```ts
	 * { identifiers: { clientId: 'uuid', callId: 'uuid' } }
	 * ```
	 */
	readonly identifiers?: IdentifierEncodings;

	/**
	 * Where the codec reports recoverable oddities — an identifier that did not
	 * parse as a UUID, a dropped list entry. Defaults to a no-op logger, so the
	 * package is silent unless you ask it not to be.
	 */
	readonly logger?: Logger;
}

export interface ResolvedIdentifierEncodings {
	readonly callId: IdentifierEncoding;
	readonly clientId: IdentifierEncoding;
	readonly peerConnectionId: IdentifierEncoding;
	readonly trackId: IdentifierEncoding;
}

export interface EncoderOptions extends CodecOptions {
	/**
	 * The client this encoder speaks for. Every encoded message repeats it, so
	 * that a decoder joining mid-stream can still attribute the samples.
	 */
	readonly clientId: string;
}

export function resolveIdentifierEncodings(
	identifiers: IdentifierEncodings | undefined,
): ResolvedIdentifierEncodings {
	return {
		callId: identifiers?.callId ?? 'utf8',
		clientId: identifiers?.clientId ?? 'utf8',
		peerConnectionId: identifiers?.peerConnectionId ?? 'utf8',
		trackId: identifiers?.trackId ?? 'utf8',
	};
}
