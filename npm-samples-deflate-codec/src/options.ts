import type { Logger } from './logger.js';

export interface CodecOptions {
	/**
	 * Where the codec reports recoverable oddities. Defaults to a no-op logger,
	 * so the package is silent unless you ask it not to be.
	 */
	readonly logger?: Logger;
}

export interface EncoderOptions extends CodecOptions {
	/**
	 * The client this encoder speaks for. Every delta repeats it, so a receiver
	 * can attribute a message without keeping routing state of its own.
	 */
	readonly clientId: string;
}
