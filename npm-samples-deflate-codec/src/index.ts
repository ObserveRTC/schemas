/**
 * `@observertc/samples-deflate-codec`
 *
 * A compressed delta codec for ObserveRTC `ClientSample`s — the wire format
 * for streaming samples and for storing them.
 *
 * A delta language of its own, built for the sample's shape: the first
 * message of a stream is a full snapshot, and every later message carries
 * only what changed — down to the individual stat field of each entry in
 * each peer-connection list, entries matched by id — everything exact,
 * including the per-entry collection `timestamp`. On top of that, field
 * names
 * are dictionary-coded (each name is sent once and referenced by a short
 * code after that), the coded message is deflate-compressed with the
 * platform's `CompressionStream` / `DecompressionStream`, and the header
 * byte identifies the message, so a decoder never has to be told what it
 * is reading.
 *
 * ## The wire format
 *
 * A message is one header byte (`0x01`) followed by a deflate stream
 * (zlib-wrapped) whose inflated bytes are a JSON envelope:
 *
 * ```
 * {
 *   "v": 1,                  // envelope version
 *   "t": 0 | 1,              // 0 = snapshot (chain head), 1 = delta
 *   "d": ["timestamp", ...], // dictionary names added by this message
 *   "n": 47,                 // dictionary size after this message (desync guard)
 *   "s": { "0": 1756, ... }  // the delta, field names as dictionary codes
 * }
 * ```
 *
 * The envelope is plain JSON on purpose: inflate a message and it is
 * readable.
 *
 * ## Usage
 *
 * ```ts
 * import { createClientSampleCodec } from '@observertc/samples-deflate-codec';
 *
 * const codec = createClientSampleCodec({ clientId: 'client-42' });
 *
 * const wire = await codec.encoder.encode(sample); // Uint8Array, send it
 * const rebuilt = await codec.decoder.decode(wire); // ClientSample
 * ```
 *
 * The plain delta is still available for inspection and for decoders that
 * keep their own state: `encoder.encodeToJson(sample)` /
 * `decoder.decodeJson(text)`.
 *
 * Zero runtime dependencies. `encode` and `decode` are async because the
 * platform's compression streams are.
 *
 * @packageDocumentation
 */

export { ClientSampleEncoder } from './ClientSampleEncoder.js';
export { ClientSampleDecoder } from './ClientSampleDecoder.js';
export type { DecodeResult } from './ClientSampleDecoder.js';
export { createClientSampleCodec } from './ClientSampleCodec.js';
export type { ClientSampleCodec } from './ClientSampleCodec.js';
export { DeflateCodecError, isDeflateCodecError } from './errors.js';
export type { DeflateCodecErrorCode, DeflateCodecErrorContext } from './errors.js';
export { FieldNameDictionary } from './dictionary.js';
export { ENVELOPE_VERSION, deserialize, serialize } from './serializer.js';
export type { CodedEnvelope } from './serializer.js';
export { applyDelta, diffSample } from './structuralDiff.js';
export type { SampleDelta } from './structuralDiff.js';
export { FORMAT_ID } from './deflate.js';
export { noopLogger } from './logger.js';
export type { Logger } from './logger.js';
export type { CodecOptions, EncoderOptions } from './options.js';
export type { ClientSampleDelta } from './types.js';
export type { ClientSample } from './generated/samples.js';
