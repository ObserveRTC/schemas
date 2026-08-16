/**
 * The slice of `console` this package uses. `console` itself satisfies it, and
 * so do pino, bunyan and every other common logger, so callers can pass what
 * they already have.
 */
export interface Logger {
	debug(message: string, ...args: unknown[]): void;
	info(message: string, ...args: unknown[]): void;
	warn(message: string, ...args: unknown[]): void;
	error(message: string, ...args: unknown[]): void;
}

/**
 * The default. A library that writes to `console` on its own initiative is a
 * library you end up monkey-patching, so this one stays quiet until a logger is
 * passed in through {@link import('./options.js').CodecOptions}.
 */
export const noopLogger: Logger = {
	debug: () => undefined,
	info: () => undefined,
	warn: () => undefined,
	error: () => undefined,
};
