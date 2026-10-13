import { FieldNameDictionary } from './dictionary.js';
import type { JsonRecord } from './guards.js';
import { decompress } from './deflate.js';
import { DeflateCodecError, isDeflateCodecError } from './errors.js';
import type { ClientSample } from './generated/samples.js';
import { noopLogger, type Logger } from './logger.js';
import type { CodecOptions } from './options.js';
import { deserialize } from './serializer.js';
import { applyDelta, deepCopy } from './structuralDiff.js';

/** The result of {@link ClientSampleDecoder.tryDecode}. */
export type DecodeResult =
	| { readonly ok: true; readonly sample: ClientSample }
	| { readonly ok: false; readonly error: DeflateCodecError };

/**
 * Rebuilds full `ClientSample`s from the compressed messages an encoder
 * produced.
 *
 * ```ts
 * const decoder = new ClientSampleDecoder();
 *
 * dataChannel.onmessage = async (event) => {
 *   pipeline.push(await decoder.decode(event.data));
 * };
 * ```
 *
 * One decoder per encoder, and it must see that encoder's messages in order,
 * from the first one (or from wherever the encoder was last reset). A decoder
 * that joins late fails with `MALFORMED_INPUT` or `STREAM_DESYNC` — the point
 * is that a delta stream cannot be read from the middle, and failing on the
 * first message beats emitting subtly incomplete samples for the rest of the
 * call.
 *
 * `decode` is async because the decompression is the platform's
 * `DecompressionStream`; see the encoder's note on why that costs nothing here.
 */
export class ClientSampleDecoder {
	private readonly logger: Logger;
	private readonly dictionary = new FieldNameDictionary();
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
	 * Drop the accumulated state — merged sample and dictionary. Must happen at
	 * the same point in the stream as the matching encoder's reset.
	 */
	public reset(): void {
		this.previous = undefined;
		this.dictionary.reset();
		this._decodedSampleCount = 0;
	}

	/**
	 * Decompress one wire message and apply it, returning the sample it
	 * completes.
	 *
	 * @throws {DeflateCodecError} if the message is malformed, or if the
	 * accumulated state is not enough to rebuild a complete sample.
	 */
	public async decode(input: Uint8Array): Promise<ClientSample> {
		let payload: Uint8Array;
		try {
			payload = await decompress(input);
		} catch (error) {
			throw new DeflateCodecError('MALFORMED_INPUT', messageOf(error), {}, {
				cause: error,
			});
		}

		return this.apply(new TextDecoder().decode(payload));
	}

	/** {@link decode}, for a base64 string. */
	public async decodeBase64(text: string): Promise<ClientSample> {
		if (typeof text !== 'string') {
			throw new DeflateCodecError('MALFORMED_INPUT', 'Expected a base64 string');
		}
		return this.decode(fromBase64(text));
	}

	/**
	 * Apply one plain, uncoded delta object's JSON — the debugging and test
	 * form, matching the encoder's `encodeToJson`. Bypasses the dictionary and
	 * the compressor; do not mix it with a live compressed stream.
	 *
	 * `snapshot` marks a keyframe (the whole sample). Unset, it is inferred:
	 * a cold decoder treats the first delta as its keyframe.
	 */
	public decodeJson(text: string, snapshot?: boolean): ClientSample {
		let delta: JsonRecord;
		try {
			const parsed: unknown = JSON.parse(text);
			if (parsed === null || typeof parsed !== 'object' || Array.isArray(parsed)) {
				throw new DeflateCodecError('MALFORMED_INPUT', 'Expected a delta object', {
					path: 'ClientSample',
					received: parsed,
				});
			}
			delta = parsed as JsonRecord;
		} catch (error) {
			if (isDeflateCodecError(error)) throw error;
			throw new DeflateCodecError('MALFORMED_INPUT', 'Input is not valid JSON', {
				path: 'ClientSample',
			}, { cause: error });
		}

		return this.applyPlain(delta, snapshot ?? this.previous === undefined);
	}

	/** {@link decodeJson}, reporting the failure instead of throwing. */
	public tryDecodeJson(text: string): DecodeResult {
		try {
			return { ok: true, sample: this.decodeJson(text) };
		} catch (error) {
			if (isDeflateCodecError(error)) {
				this.logger?.warn(`Failed to decode sample from JSON: ${error.message}`);
				return { ok: false, error };
			}
			throw error;
		}
	}

	/** The non-throwing form, for decoding untrusted input in a hot loop. */
	public async tryDecode(input: Uint8Array): Promise<DecodeResult> {
		try {
			return { ok: true, sample: await this.decode(input) };
		} catch (error) {
			const codecError = toCodecError(error, 'Failed to decode a message');
			this.logger.warn('failed to decode a ClientSample message', codecError);
			return { ok: false, error: codecError };
		}
	}

	private apply(text: string): ClientSample {
		let decoded: { delta: JsonRecord; snapshot: boolean };
		try {
			decoded = deserialize(text, this.dictionary);
		} catch (error) {
			if (isDeflateCodecError(error)) throw error;
			throw new DeflateCodecError('MALFORMED_INPUT', messageOf(error), {}, {
				cause: error,
			});
		}

		return this.applyPlain(decoded.delta, decoded.snapshot);
	}

	private applyPlain(delta: JsonRecord, snapshot: boolean): ClientSample {
		if (!snapshot && this.previous === undefined) {
			throw new DeflateCodecError('STREAM_DESYNC',
				'Expected a snapshot (t=0) to start the stream — a delta was received first',
				{ path: 's' });
		}

		// A snapshot replaces the accumulated state outright — it is a chain
		// head, whether it is the first message or a mid-stream keyframe.
		// `applyDelta` validates the shape on the way in.
		const merged = applyDelta(this.previous, delta, snapshot);
		// The decoder hands the caller a copy, so in-place enrichment
		// downstream cannot corrupt the stream's memory.
		this.previous = merged;
		this._decodedSampleCount += 1;
		return deepCopy(merged) as ClientSample;
	}
}

function toCodecError(error: unknown, fallback: string): DeflateCodecError {
	if (isDeflateCodecError(error)) return error;
	return new DeflateCodecError('MALFORMED_INPUT', messageOf(error) || fallback, {}, {
		cause: error,
	});
}

function messageOf(error: unknown): string {
	return error instanceof Error ? error.message : String(error);
}

function fromBase64(text: string): Uint8Array {
	let binary: string;
	try {
		binary = atob(text);
	} catch (error) {
		throw new DeflateCodecError('MALFORMED_INPUT', 'Input is not valid base64', {}, {
			cause: error,
		});
	}
	const bytes = new Uint8Array(binary.length);
	for (let i = 0; i < binary.length; i++) bytes[i] = binary.charCodeAt(i);
	return bytes;
}
