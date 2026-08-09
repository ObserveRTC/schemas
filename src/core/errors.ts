/**
 * Base class for every error the generator raises on purpose. Anything that is
 * not a `SchemaGenError` bubbling out of the CLI is an internal bug and is
 * printed with its stack trace.
 */
export class SchemaGenError extends Error {
	public constructor(
		message: string,
		public readonly context?: Record<string, unknown>,
		options?: { cause?: unknown },
	) {
		super(message, options as ErrorOptions);
		this.name = new.target.name;
	}

	public describe(): string {
		if (!this.context || Object.keys(this.context).length === 0) return this.message;
		const details = Object.entries(this.context)
			.map(([key, value]) => `  ${key}: ${formatValue(value)}`)
			.join('\n');
		return `${this.message}\n${details}`;
	}
}

/** A source `.avsc` file could not be read, chunk-expanded or JSON-parsed. */
export class SourceParseError extends SchemaGenError {}

/** A schema parsed as JSON but is not a valid Avro schema. */
export class SchemaValidationError extends SchemaGenError {}

/** An external tool (buf / protoc-gen-es) failed. */
export class ExternalToolError extends SchemaGenError {}

/** The user asked for something impossible on the command line. */
export class UsageError extends SchemaGenError {}

function formatValue(value: unknown): string {
	if (typeof value === 'string') return value;
	if (value instanceof Error) return value.message;
	try {
		return JSON.stringify(value);
	} catch {
		return String(value);
	}
}
