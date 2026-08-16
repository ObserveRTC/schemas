import { ClientSampleDecoder } from './ClientSampleDecoder.js';
import { ClientSampleEncoder } from './ClientSampleEncoder.js';
import type { EncoderOptions } from './options.js';

/**
 * An encoder and a decoder built together, for the loopback cases: tests, local
 * pipelines, and anything that encodes and decodes in the same place.
 *
 * In production the two ends live in different processes and you construct
 * {@link ClientSampleEncoder} and {@link ClientSampleDecoder} directly.
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
