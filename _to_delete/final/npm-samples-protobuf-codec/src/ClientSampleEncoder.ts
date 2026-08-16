import { create, toBinary, type MessageInitShape } from '@bufbuild/protobuf';

import { ProtobufCodecError } from './errors.js';
import { ClientSampleSchema, type ClientSample as ProtobufClientSample } from './generated/protobuf.js';
import type { ClientSample } from './generated/samples.js';
import { noopLogger, type Logger } from './logger.js';
import { resolveIdentifierEncodings, type EncoderOptions } from './options.js';
import { bytesToBase64 } from './internal/binary.js';
import { buildMessagePlan } from './internal/plan.js';
import { RecordEncoder } from './internal/record.js';

/**
 * Turns a stream of `ClientSample`s into a stream of protobuf messages, each
 * carrying only what changed since the one before it.
 *
 * ```ts
 * const encoder = new ClientSampleEncoder({ clientId });
 *
 * for await (const sample of samples) {
 *   transport.send(encoder.encode(sample));
 * }
 * ```
 *
 * An encoder is bound to one client and to one receiver. The messages it
 * produces are only meaningful in order and in full: message 5 says "jitter is
 * now 12" and says nothing about the forty fields that did not move, so a
 * receiver that missed message 4 cannot make sense of it. If your transport can
 * drop or reorder messages, either fix that below the codec or call
 * {@link ClientSampleEncoder.reset} to start a fresh snapshot.
 */
export class ClientSampleEncoder {
	private readonly root: RecordEncoder;
	private readonly clientId: string;
	private readonly logger: Logger;
	private _encodedSampleCount = 0;

	public constructor(options: EncoderOptions) {
		if (typeof options?.clientId !== 'string' || options.clientId.length === 0) {
			throw new ProtobufCodecError('INVALID_OPTION', 'A non-empty "clientId" is required');
		}

		this.clientId = options.clientId;
		this.logger = options.logger ?? noopLogger;

		const plan = buildMessagePlan(ClientSampleSchema, {
			identifiers: resolveIdentifierEncodings(options.identifiers),
		});

		// `clientId` rides along on every message rather than only on the first.
		// It costs a handful of bytes and it is what lets a receiver attribute a
		// message without holding per-connection routing state of its own.
		this.root = new RecordEncoder(plan, { logger: this.logger }, new Set(['clientId']));
	}

	/** How many samples this encoder has taken since it was created or reset. */
	public get encodedSampleCount(): number {
		return this._encodedSampleCount;
	}

	/**
	 * Drop the remembered state, so the next call encodes a complete snapshot.
	 *
	 * Use it when the receiver changes, when the transport reconnects, or on a
	 * fixed interval if you want the stream to be recoverable from a known point.
	 * The matching decoder must be reset at the same point in the stream.
	 */
	public reset(): void {
		this.root.reset();
		this._encodedSampleCount = 0;
	}

	/** Encode one sample to protobuf wire bytes. */
	public encode(sample: ClientSample): Uint8Array {
		return toBinary(ClientSampleSchema, this.encodeToMessage(sample));
	}

	/** Encode one sample to a base64 string, for text-only transports. */
	public encodeToBase64(sample: ClientSample): string {
		return bytesToBase64(this.encode(sample));
	}

	/**
	 * Encode one sample to a protobuf message without serialising it — useful
	 * when the message is going straight into another protobuf structure, or
	 * when you want to inspect what the delta actually contains.
	 */
	public encodeToMessage(sample: ClientSample): ProtobufClientSample {
		if (sample === null || typeof sample !== 'object') {
			throw new ProtobufCodecError('INVALID_VALUE', 'Expected a ClientSample object', {
				path: 'ClientSample',
				received: sample,
			});
		}

		const wire = this.root.encode(
			{ ...sample, clientId: this.clientId } as Record<string, unknown>,
			'ClientSample',
		);
		this._encodedSampleCount += 1;

		return create(ClientSampleSchema, wire as MessageInitShape<typeof ClientSampleSchema>);
	}
}
