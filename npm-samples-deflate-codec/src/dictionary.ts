/**
 * The append-only field-name dictionary shared by the two halves of the wire
 * format.
 *
 * Field names are the second-biggest thing in a delta after the numbers that
 * move, and a name like `remoteOutboundRtps` repeats in every message of a
 * call. The dictionary assigns each name a small integer the first time it is
 * seen on the stream; from then on the wire carries the code, not the name.
 *
 * The two halves cannot drift, because both are append-only and both derive
 * their additions from the same messages, in the same order: the encoder
 * adds a name while serialising a message and ships the new entries in that
 * message's `d` array, and the decoder appends exactly those entries, in that
 * order, before it reads the coded sample. A stream that is cut off mid-way
 * simply has a shorter dictionary on both ends.
 */
export class FieldNameDictionary {
	private readonly names: string[] = [];
	private readonly codes = new Map<string, number>();

	/**
	 * The code for `name`, adding the name to the dictionary if this is the
	 * first time the stream has seen it.
	 */
	public add(name: string): number {
		const existing = this.codes.get(name);
		if (existing !== undefined) return existing;

		const code = this.names.length;
		this.names.push(name);
		this.codes.set(name, code);
		return code;
	}

	/**
	 * The name behind `code`.
	 *
	 * @throws {Error} when the code has not been added to this dictionary —
	 * the caller turns that into a `MALFORMED_INPUT`.
	 */
	public name(code: number): string {
		const name = this.names[code];
		if (name === undefined) {
			throw new Error(`Dictionary code ${code} is not in the dictionary (size ${this.names.length})`);
		}
		return name;
	}

	/** The names added since the last call — the encoder's per-message `d`. */
	public drainAdditions(since: number): string[] {
		return this.names.slice(since);
	}

	/** Append entries received in a message's `d` array. */
	public append(entries: readonly string[]): void {
		for (const entry of entries) this.add(entry);
	}

	public get size(): number {
		return this.names.length;
	}

	/** A fresh stream starts with a fresh dictionary. */
	public reset(): void {
		this.names.length = 0;
		this.codes.clear();
	}
}
