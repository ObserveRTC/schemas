export type LogLevel = 'silent' | 'error' | 'warn' | 'info' | 'debug';

const LEVEL_WEIGHT: Record<LogLevel, number> = {
	silent: 0,
	error: 1,
	warn: 2,
	info: 3,
	debug: 4,
};

const COLOR = {
	reset: '\u001b[0m',
	dim: '\u001b[2m',
	red: '\u001b[31m',
	yellow: '\u001b[33m',
	cyan: '\u001b[36m',
	green: '\u001b[32m',
} as const;

/**
 * Running totals shared by a logger and every child it spawns, so `--fail-on-warn`
 * can act on warnings raised deep inside a generator.
 */
export interface LogCounters {
	warnings: number;
	errors: number;
}

export interface LoggerOptions {
	readonly level?: LogLevel;
	readonly colors?: boolean;
	readonly scope?: string;
	readonly counters?: LogCounters;
}

export class Logger {
	public readonly counters: LogCounters;

	private readonly level: LogLevel;
	private readonly weight: number;
	private readonly colors: boolean;
	private readonly scope?: string;

	public constructor(options: LogLevel | LoggerOptions = {}) {
		const resolved: LoggerOptions = typeof options === 'string' ? { level: options } : options;
		this.level = resolved.level ?? 'info';
		this.weight = LEVEL_WEIGHT[this.level];
		this.colors = resolved.colors ?? process.stdout.isTTY === true;
		this.scope = resolved.scope;
		this.counters = resolved.counters ?? { warnings: 0, errors: 0 };
	}

	public child(scope: string): Logger {
		return new Logger({
			level: this.level,
			colors: this.colors,
			scope: this.scope ? `${this.scope}:${scope}` : scope,
			// Shared on purpose: a child's warnings count towards the run.
			counters: this.counters,
		});
	}

	public error(message: string, ...rest: unknown[]): void {
		this.counters.errors += 1;
		if (this.weight < LEVEL_WEIGHT.error) return;
		console.error(this.format('error', COLOR.red, message), ...rest);
	}

	public warn(message: string, ...rest: unknown[]): void {
		this.counters.warnings += 1;
		if (this.weight < LEVEL_WEIGHT.warn) return;
		console.warn(this.format('warn', COLOR.yellow, message), ...rest);
	}

	public info(message: string, ...rest: unknown[]): void {
		if (this.weight < LEVEL_WEIGHT.info) return;
		console.log(this.format('info', COLOR.cyan, message), ...rest);
	}

	public success(message: string, ...rest: unknown[]): void {
		if (this.weight < LEVEL_WEIGHT.info) return;
		console.log(this.format('done', COLOR.green, message), ...rest);
	}

	public debug(message: string, ...rest: unknown[]): void {
		if (this.weight < LEVEL_WEIGHT.debug) return;
		console.log(this.format('debug', COLOR.dim, message), ...rest);
	}

	private format(tag: string, color: string, message: string): string {
		const label = this.scope ? `${tag} ${this.scope}` : tag;
		const head = `[${label}]`;
		return this.colors ? `${color}${head}${COLOR.reset} ${message}` : `${head} ${message}`;
	}
}
