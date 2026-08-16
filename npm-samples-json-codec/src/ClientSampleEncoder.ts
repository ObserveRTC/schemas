import { diffRecord, mergeRecord, type DeltaContext, type JsonRecord } from './delta.js';
import { JsonCodecError } from './errors.js';
import type { ClientSample } from './generated/samples.js';
import { PINNED_ROOT_FIELDS } from './layout.js';
import { noopLogger, type Logger } from './logger.js';
import type { EncoderOptions } from './options.js';
import type { ClientSampleDelta } from './types.js';

const ENCODE_CONTEXT: DeltaContext = {
	missingFieldCode: 'INVALID_VALUE',
	missingFieldMessage: (field) => `The sample is missing its required "${field}"`,
};

/**
 * Turns a stream of `ClientSample`s into a stream of JSON deltas, each carrying
 * only what changed since the one before it.
 *
 * ```ts
 * const encoder = new ClientSampleEncoder({ clientId });
 *
 * setInterval(async () => {
 *   websocket.send(encoder.encodeToJson(await collectClientSample()));
 * }, 1000);
 * ```
 *
 * An encoder is bound to one client and one receiver. Its output is only
 * meaningful in order and in full: a delta says "jitter is now 12" and says
 * nothing about the forty fields that did not move. If your transport can drop
 * or reorder messages, fix that below the codec or call {@link reset} to start
 * a fresh snapshot.
 */
export class ClientSampleEncoder {
	private readonly clientId: string;
	private readonly logger: Logger;
	private previous: JsonRecord | undefined;
	private _encodedSampleCount = 0;

	public constructor(options: EncoderOptions) {
		if (typeof options?.clientId !== 'string' || options.clientId.length === 0) {
			throw new JsonCodecError('INVALID_OPTION', 'A non-empty "clientId" is required');
		}

		this.clientId = options.clientId;
		this.logger = options.logger ?? noopLogger;
	}

	/** How many samples this encoder has taken since it was created or reset. */
	public get encodedSampleCount(): number {
		return this._encodedSampleCount;
	}

	/**
	 * Drop the remembered state, so the next call encodes a complete snapshot.
	 *
	 * Use it when the receiver changes, when the transport reconnects, or on a
	 * fixed interval to keep the stream recoverable from a known point. The
	 * matching decoder must be reset at the same point in the stream.
	 */
	public reset(): void {
		this.previous = undefined;
		this._encodedSampleCount = 0;
	}

	/**
	 * Encode one sample to a delta object.
	 *
	 * The result is a fresh, fully owned structure — serialise it, batch it, or
	 * push it into an existing envelope. {@link encodeToJson} is there for when
	 * you just want the string.
	 */
	public encode(sample: ClientSample): ClientSampleDelta {
		if (sample === null || typeof sample !== 'object') {
			throw new JsonCodecError('INVALID_VALUE', 'Expected a ClientSample object', {
				path: 'ClientSample',
				received: sample,
			});
		}

		const next = { ...sample, clientId: this.clientId } as JsonRecord;
		const delta = diffRecord(this.previous, next, 'ClientSample', PINNED_ROOT_FIELDS);

		// State advances by applying the delta we just produced, not by keeping
		// the sample — so whatever the encoder now believes is exactly what the
		// decoder will believe, by construction rather than by inspection.
		this.previous = mergeRecord(this.previous, delta, 'ClientSample', ENCODE_CONTEXT);
		this._encodedSampleCount += 1;

		return delta as ClientSampleDelta;
	}

	/** Encode one sample straight to a JSON string. */
	public encodeToJson(sample: ClientSample): string {
		return JSON.stringify(this.encode(sample));
	}
}
