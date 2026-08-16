/**
 * `@observertc/samples-protobuf-codec`
 *
 * Protobuf codec for ObserveRTC `ClientSample`s. It is a *delta* codec: each
 * message on the wire carries the difference between one sample and the last,
 * which is where nearly all of the size saving comes from — WebRTC stats are
 * dominated by identifiers and slow-moving counters that repeat verbatim from
 * one tick to the next.
 *
 * @packageDocumentation
 */

export { ClientSampleEncoder } from './ClientSampleEncoder.js';
export { ClientSampleDecoder, type DecodeResult } from './ClientSampleDecoder.js';
export { createClientSampleCodec, type ClientSampleCodec } from './ClientSampleCodec.js';

export {
	ProtobufCodecError,
	isProtobufCodecError,
	type ProtobufCodecErrorCode,
	type ProtobufCodecErrorContext,
} from './errors.js';

export { noopLogger, type Logger } from './logger.js';

export type {
	CodecOptions,
	EncoderOptions,
	IdentifierEncoding,
	IdentifierEncodings,
} from './options.js';

/**
 * The plain sample types — `ClientSample` and everything it contains — plus
 * `schemaVersion`. These are the shapes you hand to the encoder and get back
 * from the decoder.
 */
export * from './generated/samples.js';

/**
 * The generated protobuf bindings, namespaced to keep `ClientSample` here
 * meaning the plain sample type.
 *
 * Reach for these when you need the wire message itself: `protobuf.ClientSampleSchema`
 * is the descriptor `encodeToMessage` and `decodeFromMessage` speak in.
 */
export * as protobuf from './generated/protobuf.js';

/** The proto package the wire messages are declared in. */
export { PROTO_PACKAGE } from './internal/layout.js';
