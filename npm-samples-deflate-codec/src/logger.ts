/**
 * The slice of `console` this package uses. `console` satisfies it, and so do
 * pino, bunyan and everything else common, so callers can pass what they have.
 */
export interface Logger {
	debug(message: string, ...args: unknown[]): void;
	info(message: string, ...args: unknown[]): void;
	warn(message: string, ...args: unknown[]): void;
	error(message: string, ...args: unknown[]): void;
}

/**
 * The default. A library that writes to `console` on its own initiative is a
 * library you end up monkey-patching.
 */
export const noopLogger: Logger = {
	debug: () => undefined,
	info: () => undefined,
	warn: () => undefined,
	error: () => undefined,
};
