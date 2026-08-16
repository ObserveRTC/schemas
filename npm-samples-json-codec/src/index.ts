/**
 * `@observertc/samples-json-codec`
 *
 * JSON delta codec for ObserveRTC `ClientSample`s. Each message carries the
 * difference between one sample and the last, shaped like a partial
 * `ClientSample` so a delta is readable on its own.
 *
 * Zero runtime dependencies. Same delta semantics as
 * `@observertc/samples-protobuf-codec` — the two are the same codec over
 * different wire formats, and either can be swapped for the other without
 * changing anything downstream.
 *
 * @packageDocumentation
 */

export { ClientSampleEncoder } from './ClientSampleEncoder.js';
export { ClientSampleDecoder, type DecodeResult } from './ClientSampleDecoder.js';
export { createClientSampleCodec, type ClientSampleCodec } from './ClientSampleCodec.js';

export {
	JsonCodecError,
	isJsonCodecError,
	type JsonCodecErrorCode,
	type JsonCodecErrorContext,
} from './errors.js';

export { noopLogger, type Logger } from './logger.js';
export type { CodecOptions, EncoderOptions } from './options.js';
export type { ClientSampleDelta } from './types.js';

/**
 * The plain sample types — `ClientSample` and everything it contains — plus
 * `schemaVersion`. These are the shapes you hand to the encoder and get back
 * from the decoder.
 */
export * from './generated/samples.js';
