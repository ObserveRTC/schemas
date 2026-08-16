import { ClientSampleDecoder } from './ClientSampleDecoder.js';
import { ClientSampleEncoder } from './ClientSampleEncoder.js';
import type { EncoderOptions } from './options.js';

/**
 * An encoder and a decoder built from one set of options, so the two halves of
 * a delta stream cannot drift apart.
 *
 * The identifier encodings have to match on both sides — a `uuid`-packed
 * `clientId` read back as `utf8` produces garbage rather than an error — and
 * getting that wrong by configuring the halves separately is the single easiest
 * mistake to make with this package. Building both from one object removes it.
 *
 * In production the two ends usually live in different processes, and you will
 * construct {@link ClientSampleEncoder} and {@link ClientSampleDecoder}
 * directly. This is for the loopback cases: tests, local pipelines, and
 * anything that encodes and decodes in the same place.
 */
export interface ClientSampleCodec {
	readonly encoder: ClientSampleEncoder;
	readonly decoder: ClientSampleDecoder;
	/** Reset both halves, so the next sample encodes and decodes as a snapshot. */
	reset(): void;
}

export function createClientSampleCodec(options: EncoderOptions): ClientSampleCodec {
	const encoder = new ClientSampleEncoder(options);
	const decoder = new ClientSampleDecoder(options);

	return {
		encoder,
		decoder,
		reset(): void {
			encoder.reset();
			decoder.reset();
		},
	};
}
