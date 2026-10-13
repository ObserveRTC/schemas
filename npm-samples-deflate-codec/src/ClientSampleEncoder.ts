import { FieldNameDictionary } from './dictionary.js';
import type { JsonRecord } from './guards.js';
import { compress } from './deflate.js';
import { DeflateCodecError } from './errors.js';
import type { ClientSample } from './generated/samples.js';
import { noopLogger, type Logger } from './logger.js';
import type { EncoderOptions } from './options.js';
import { serialize } from './serializer.js';
import { applyDelta, diffSample, type SampleDelta } from './structuralDiff.js';

const text = new TextEncoder();

/**
 * Turns a stream of `ClientSample`s into a stream of compressed messages, each
 * carrying only what changed since the one before it.
 *
 * ```ts
 * const encoder = new ClientSampleEncoder({ clientId });
 *
 * setInterval(async () => {
 *   dataChannel.send(await encoder.encode(await collectClientSample()));
 * }, 1000);
 * ```
 *
 * An encoder is bound to one client and one receiver. Its output is only
 * meaningful in order and in full: a delta says "jitter is now 12" and says
 * nothing about the forty fields that did not move. If your transport can drop
 * or reorder messages, fix that below the codec or call {@link reset} to start
 * a fresh snapshot. `reset` also starts a fresh field-name dictionary, so the
 * first message after it is self-contained.
 *
 * `encode` is async because the compression is the platform's
 * `CompressionStream`; for a stats stream that ticks once a second the
 * difference is not measurable.
 */
export class ClientSampleEncoder {
	private readonly clientId: string;
	private readonly logger: Logger;
	private readonly dictionary = new FieldNameDictionary();
	private previous: JsonRecord | undefined;
	private _encodedSampleCount = 0;

	public constructor(options: EncoderOptions) {
		if (typeof options?.clientId !== 'string' || options.clientId.length === 0) {
			throw new DeflateCodecError('INVALID_OPTION', 'A non-empty "clientId" is required');
		}

		this.clientId = options.clientId;
		this.logger = options.logger ?? noopLogger;
	}

	/** How many samples this encoder has taken since it was created or reset. */
	public get encodedSampleCount(): number {
		return this._encodedSampleCount;
	}

	/**
	 * Drop the remembered state — delta state and dictionary — so the next call
	 * encodes a complete snapshot.
	 *
	 * Use it when the receiver changes, when the transport reconnects, or on a
	 * fixed interval to keep the stream recoverable from a known point. The
	 * matching decoder must be reset at the same point in the stream.
	 */
	public reset(): void {
		this.previous = undefined;
		this.dictionary.reset();
		this._encodedSampleCount = 0;
	}

	/**
	 * Encode one sample to a wire message: a one-byte header, then a deflate
	 * stream of the coded delta (see the package documentation for the format).
	 */
	public async encode(sample: ClientSample): Promise<Uint8Array> {
		const { delta, snapshot } = this.diff(sample);
		return compress(text.encode(serialize(delta, snapshot, this.dictionary)));
	}

	/** {@link encode}, as a base64 string for transports that only carry text. */
	public async encodeToBase64(sample: ClientSample): Promise<string> {
		return toBase64(await this.encode(sample));
	}

	/**
	 * Encode one sample to the plain, uncoded delta object's JSON — uncompressed,
	 * no dictionary. The debugging and test form: it is what the message says
	 * before the format's two layers are applied.
	 */
	public encodeToJson(sample: ClientSample): string {
		const { delta } = this.diff(sample);
		return JSON.stringify(delta);
	}

	private diff(sample: ClientSample): SampleDelta {
		if (sample === null || typeof sample !== 'object') {
			throw new DeflateCodecError('INVALID_VALUE', 'Expected a ClientSample object', {
				path: 'ClientSample',
				received: sample,
			});
		}

		const next = { ...sample, clientId: this.clientId } as JsonRecord;
		const { delta, snapshot } = diffSample(this.previous, next);

		// State advances by applying the delta we just produced, not by keeping
		// the sample — so whatever the encoder now believes is exactly what the
		// decoder will believe, by construction rather than by inspection.
		this.previous = applyDelta(this.previous, delta, snapshot);
		this._encodedSampleCount += 1;

		return { delta, snapshot };
	}
}

function toBase64(bytes: Uint8Array): string {
	let binary = '';
	const CHUNK = 0x8000;
	for (let i = 0; i < bytes.length; i += CHUNK) {
		binary += String.fromCharCode(...bytes.subarray(i, i + CHUNK));
	}
	return btoa(binary);
}
