import { deepCopy, mergeRecord, type DeltaContext, type JsonRecord } from './delta.js';
import { JsonCodecError } from './errors.js';
import type { ClientSample } from './generated/samples.js';
import { noopLogger, type Logger } from './logger.js';
import type { CodecOptions } from './options.js';
import type { ClientSampleDelta } from './types.js';

const DECODE_CONTEXT: DeltaContext = {
	missingFieldCode: 'STREAM_DESYNC',
	missingFieldMessage: (field) =>
		`"${field}" has never been seen on this stream, so the sample cannot be reconstructed`,
};

/** The result of {@link ClientSampleDecoder.tryDecode}. */
export type DecodeResult =
	| { readonly ok: true; readonly sample: ClientSample }
	| { readonly ok: false; readonly error: JsonCodecError };

/**
 * Rebuilds full `ClientSample`s from the deltas an encoder produced.
 *
 * ```ts
 * const decoder = new ClientSampleDecoder();
 *
 * websocket.on('message', (text) => {
 *   pipeline.push(decoder.decodeJson(text));
 * });
 * ```
 *
 * One decoder per encoder, and it must see that encoder's messages in order,
 * from the first one (or from wherever the encoder was last reset). A decoder
 * that joins late throws `STREAM_DESYNC` as soon as a required field turns out
 * never to have arrived — which is the point: a delta stream cannot be read
 * from the middle, and failing on the first message beats emitting subtly
 * incomplete samples for the rest of the call.
 */
export class ClientSampleDecoder {
	private readonly logger: Logger;
	private previous: JsonRecord | undefined;
	private _decodedSampleCount = 0;

	public constructor(options: CodecOptions = {}) {
		this.logger = options.logger ?? noopLogger;
	}

	/** How many samples this decoder has rebuilt since it was created or reset. */
	public get decodedSampleCount(): number {
		return this._decodedSampleCount;
	}

	/**
	 * Drop the accumulated state. Must happen at the same point in the stream as
	 * the matching encoder's reset.
	 */
	public reset(): void {
		this.previous = undefined;
		this._decodedSampleCount = 0;
	}

	/**
	 * Apply one delta and return the sample it completes.
	 *
	 * The returned object is yours: the decoder keeps its own copy, so you can
	 * hold on to it or enrich it in place without corrupting the stream.
	 *
	 * @throws {JsonCodecError} if the delta is malformed, or if the accumulated
	 * state is not enough to rebuild a complete sample.
	 */
	public decode(delta: ClientSampleDelta): ClientSample {
		if (delta === null || typeof delta !== 'object' || Array.isArray(delta)) {
			throw new JsonCodecError('MALFORMED_INPUT', 'Expected a delta object', {
				path: 'ClientSample',
				received: delta,
			});
		}

		const merged = mergeRecord(
			this.previous,
			delta as JsonRecord,
			'ClientSample',
			DECODE_CONTEXT,
		);

		// Keep a copy rather than the object we are about to hand out — see
		// `deepCopy` for why that is not paranoia.
		this.previous = deepCopy(merged);
		this._decodedSampleCount += 1;

		return merged as ClientSample;
	}

	/** Parse and apply one delta, as produced by `encodeToJson`. */
	public decodeJson(text: string): ClientSample {
		let delta: unknown;
		try {
			delta = JSON.parse(text) as unknown;
		} catch (cause) {
			throw new JsonCodecError(
				'MALFORMED_INPUT',
				'Input is not valid JSON',
				{ path: 'ClientSample' },
				{ cause },
			);
		}

		return this.decode(delta as ClientSampleDelta);
	}

	/**
	 * The non-throwing form, for decoding untrusted input in a hot loop where a
	 * `try`/`catch` per message reads badly.
	 *
	 * A failure advances nothing — the decoder's state is left as it was, so a
	 * later message from the same stream may well decode fine.
	 */
	public tryDecode(delta: ClientSampleDelta): DecodeResult {
		return this.attempt(() => this.decode(delta));
	}

	/** {@link tryDecode}, for a JSON string. */
	public tryDecodeJson(text: string): DecodeResult {
		return this.attempt(() => this.decodeJson(text));
	}

	private attempt(run: () => ClientSample): DecodeResult {
		try {
			return { ok: true, sample: run() };
		} catch (error) {
			if (error instanceof JsonCodecError) {
				this.logger.warn('failed to decode a ClientSample delta', error);
				return { ok: false, error };
			}
			throw error;
		}
	}
}
