/**
 * Every failure this package raises is a {@link DeflateCodecError}, so a
 * caller can tell "the codec rejected this" from "something else threw" with
 * one `instanceof`, and can branch on the code rather than on message text.
 *
 * The codes match `@observertc/samples-json-codec` and
 * `@observertc/samples-protobuf-codec` deliberately: the three packages are
 * the same codec over different wire formats, and a caller that handles one
 * should be able to swap in the other without rewriting its error handling.
 */
export type DeflateCodecErrorCode =
	/** The input is not a well-formed message of this format. */
	| 'MALFORMED_INPUT'
	/**
	 * The message merged, but the running state it was applied to does not
	 * describe a complete sample — almost always because the decoder did not
	 * see every earlier message of the same stream.
	 */
	| 'STREAM_DESYNC'
	/** A value could not be represented in the delta. */
	| 'INVALID_VALUE'
	/** The codec was configured with something it cannot honour. */
	| 'INVALID_OPTION';

export interface DeflateCodecErrorContext {
	/** Dotted path to the offending value, e.g. `peerConnections[0].timestamp`. */
	readonly path?: string;
	readonly [key: string]: unknown;
}

export class DeflateCodecError extends Error {
	public override readonly name = 'DeflateCodecError';

	public constructor(
		public readonly code: DeflateCodecErrorCode,
		message: string,
		public readonly context: DeflateCodecErrorContext = {},
		options?: { cause?: unknown },
	) {
		super(context.path ? `${message} (at ${context.path})` : message, options);
	}
}

export function isDeflateCodecError(value: unknown): value is DeflateCodecError {
	return value instanceof DeflateCodecError;
}
