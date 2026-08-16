/**
 * Every failure this package raises is a {@link ProtobufCodecError}, so a
 * caller can tell "the codec rejected this" from "something else threw" with a
 * single `instanceof` check, and can branch on {@link ProtobufCodecErrorCode}
 * rather than on message text.
 */
export type ProtobufCodecErrorCode =
	/** The bytes are not a valid `ClientSample` protobuf message. */
	| 'MALFORMED_INPUT'
	/**
	 * The message decoded, but the running state it was applied to does not
	 * describe a complete sample — almost always because the decoder did not see
	 * every earlier message of the same stream. See the class doc on
	 * `ClientSampleDecoder` for why that matters.
	 */
	| 'STREAM_DESYNC'
	/** A value could not be converted between its plain and its wire form. */
	| 'INVALID_VALUE'
	/** The codec was configured with something it cannot honour. */
	| 'INVALID_OPTION';

export interface ProtobufCodecErrorContext {
	/** Dotted path to the offending value, e.g. `peerConnections[0].timestamp`. */
	readonly path?: string;
	readonly [key: string]: unknown;
}

export class ProtobufCodecError extends Error {
	public override readonly name = 'ProtobufCodecError';

	public constructor(
		public readonly code: ProtobufCodecErrorCode,
		message: string,
		public readonly context: ProtobufCodecErrorContext = {},
		options?: { cause?: unknown },
	) {
		super(context.path ? `${message} (at ${context.path})` : message, options);
	}
}

export function isProtobufCodecError(value: unknown): value is ProtobufCodecError {
	return value instanceof ProtobufCodecError;
}
