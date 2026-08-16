import { fromBinary } from '@bufbuild/protobuf';

import { ProtobufCodecError } from './errors.js';
import { ClientSampleSchema, type ClientSample as ProtobufClientSample } from './generated/protobuf.js';
import type { ClientSample } from './generated/samples.js';
import { noopLogger, type Logger } from './logger.js';
import { resolveIdentifierEncodings, type CodecOptions } from './options.js';
import { base64ToBytes } from './internal/binary.js';
import { buildMessagePlan } from './internal/plan.js';
import { RecordDecoder } from './internal/record.js';

/** The result of {@link ClientSampleDecoder.tryDecode}. */
export type DecodeResult =
	| { readonly ok: true; readonly sample: ClientSample }
	| { readonly ok: false; readonly error: ProtobufCodecError };

/**
 * Rebuilds full `ClientSample`s from the deltas an encoder produced.
 *
 * ```ts
 * const decoder = new ClientSampleDecoder();
 *
 * transport.on('message', (bytes) => {
 *   sink.write(decoder.decode(bytes));
 * });
 * ```
 *
 * One decoder per encoder, and it must see that encoder's messages in order,
 * starting from the first one (or from wherever the encoder was last
 * {@link ClientSampleEncoder.reset}). A decoder that joins late will throw
 * `STREAM_DESYNC` as soon as a required field turns out to have never arrived —
 * which is the point: a delta stream cannot be read from the middle, and
 * failing on the first message beats emitting subtly incomplete samples for the
 * rest of the call.
 */
export class ClientSampleDecoder {
	private readonly root: RecordDecoder;
	private readonly logger: Logger;
	private _decodedSampleCount = 0;

	public constructor(options: CodecOptions = {}) {
		this.logger = options.logger ?? noopLogger;

		const plan = buildMessagePlan(ClientSampleSchema, {
			identifiers: resolveIdentifierEncodings(options.identifiers),
		});
		this.root = new RecordDecoder(plan, { logger: this.logger });
	}

	/** How many samples this decoder has rebuilt since it was created or reset. */
	public get decodedSampleCount(): number {
		return this._decodedSampleCount;
	}

	/**
	 * Drop the accumulated state. Must happen at the same point in the stream as
	 * the matching {@link ClientSampleEncoder.reset}.
	 */
	public reset(): void {
		this.root.reset();
		this._decodedSampleCount = 0;
	}

	/**
	 * Decode one message.
	 *
	 * @throws {ProtobufCodecError} if the bytes are malformed, or if the stream
	 * state is not sufficient to rebuild a complete sample.
	 */
	public decode(bytes: Uint8Array): ClientSample {
		let message: ProtobufClientSample;
		try {
			message = fromBinary(ClientSampleSchema, bytes);
		} catch (cause) {
			throw new ProtobufCodecError(
				'MALFORMED_INPUT',
				'Bytes are not a valid ClientSample protobuf message',
				{ path: 'ClientSample', byteLength: bytes?.byteLength },
				{ cause },
			);
		}

		return this.decodeFromMessage(message);
	}

	/** Decode one base64-encoded message, as produced by `encodeToBase64`. */
	public decodeBase64(base64: string): ClientSample {
		const bytes = base64ToBytes(base64);
		if (!bytes) {
			throw new ProtobufCodecError('MALFORMED_INPUT', 'Input is not valid base64', {
				path: 'ClientSample',
			});
		}
		return this.decode(bytes);
	}

	/** Decode an already-parsed protobuf message. */
	public decodeFromMessage(message: ProtobufClientSample): ClientSample {
		const sample = this.root.decode(
			message as unknown as Record<string, unknown>,
			'ClientSample',
		) as ClientSample;

		this._decodedSampleCount += 1;
		return sample;
	}

	/**
	 * The non-throwing form, for the common case of decoding untrusted input in
	 * a hot loop where a `try`/`catch` per message reads badly.
	 *
	 * Note that a failure still advances nothing: the decoder's state is left as
	 * it was, so a later message from the same stream may well decode fine.
	 */
	public tryDecode(bytes: Uint8Array): DecodeResult {
		try {
			return { ok: true, sample: this.decode(bytes) };
		} catch (error) {
			if (error instanceof ProtobufCodecError) {
				this.logger.warn('failed to decode a ClientSample message', error);
				return { ok: false, error };
			}
			throw error;
		}
	}
}
