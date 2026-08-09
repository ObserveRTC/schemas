export interface TsProperty {
	readonly name: string;
	/** Rendered TypeScript type expression, e.g. `string | number` or `Foo[]`. */
	readonly type: string | undefined;
	readonly doc?: string;
	readonly required: boolean;
}

/**
 * Builder for a single `export type X = { ... }` declaration.
 *
 * The rendering is intentionally fixed: required properties first (a stable
 * sort, so declaration order is preserved within each group), JSDoc above each
 * documented property, tab indentation, trailing newline. Changing any of it
 * rewrites every published `.d.ts`, so treat the shape as part of the contract.
 */
export class TsTypeAlias {
	private readonly properties: TsProperty[] = [];

	public constructor(
		public readonly name: string,
		private doc?: string,
	) {}

	/**
	 * Give the alias a description if it does not have one yet.
	 *
	 * A nested record usually carries no `doc` of its own; the field that
	 * references it does. The first referencing field wins.
	 */
	public setDocIfAbsent(doc: string | undefined): void {
		if (this.doc) return;
		this.doc = doc;
	}

	public addProperty(property: TsProperty): void {
		this.properties.push(property);
	}

	public render(): string {
		const lines: string[] = [];

		if (this.doc) {
			lines.push('/**', `* ${this.doc}`, '*/');
		}
		lines.push(`export type ${this.name} = {`);

		for (const property of this.sortedProperties()) {
			const { name, type, doc, required } = property;
			if (doc) {
				lines.push('\t/**', `\t* ${doc}`, '\t*/');
			}
			lines.push(`\t${name}${required ? '' : '?'}: ${type};`);
			if (doc) {
				lines.push('');
			}
		}

		lines.push('}');
		return `${lines.join('\n')}\n`;
	}

	/** Required properties first; `Array#sort` is stable, so ties keep their order. */
	private sortedProperties(): TsProperty[] {
		return [...this.properties].sort(
			(a, b) => (b.required ? 10 : 0) - (a.required ? 10 : 0),
		);
	}
}
