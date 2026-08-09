import {
	isArray,
	isEnum,
	isFieldRequired,
	isRecord,
	isUnion,
	type AvroField,
	type AvroRecord,
	type AvroType,
} from '../../avro/schema.js';
import type { Logger } from '../../core/logger.js';

export interface MarkdownOptions {
	readonly logger: Logger;
	/** Heading level of the record's own section. Nested records share it. */
	readonly headingLevel?: number;
	/** Warn about fields with no `doc`. */
	readonly warnOnMissingDocs?: boolean;
}

export interface MarkdownDoc {
	/** The full document: nested records first, then the record itself. */
	readonly markdown: string;
	/** Flat bullet outline of every record and field, for `schemaList.md`. */
	readonly outline: string[];
}

interface TableRow {
	readonly name: string;
	readonly required: boolean;
	readonly description: string;
}

/**
 * Render an Avro record as Markdown: one `##` section per record with a
 * two-column field table, nested records emitted before the record that
 * references them.
 */
export function generateMarkdownDoc(record: AvroRecord, options: MarkdownOptions): MarkdownDoc {
	const headingLevel = options.headingLevel ?? 2;
	const nestedSections: string[] = [];
	const outline: string[] = [];
	const rows: TableRow[] = [];

	for (const field of record.fields) {
		const namedType = resolveDocumentedType(field);

		if (isRecord(namedType)) {
			const nested = generateMarkdownDoc(namedType, options);
			nestedSections.push(nested.markdown);
			outline.push(...nested.outline);
		} else if (isArray(namedType) && isRecord(namedType.items)) {
			const nested = generateMarkdownDoc(namedType.items, options);
			nestedSections.push(nested.markdown);
			outline.push(...nested.outline);
		}

		rows.push({
			name: field.name,
			required: isFieldRequired(field),
			description: describeField(field, namedType, record.name, options),
		});
	}

	// The table and the outline must agree on order, so both consume the same
	// sorted view.
	const orderedRows = sortRequiredFirst(rows);

	const section = renderSection({
		title: record.name,
		description: record.doc,
		headingLevel,
		rows: orderedRows,
	});

	if (orderedRows.length > 0) {
		outline.push(
			record.name,
			...orderedRows.map((row) => ` * **${row.name}**: ${row.description}`),
		);
	}

	// Sections are joined with a blank line. The legacy generator concatenated
	// the last nested section straight onto the parent heading, producing lines
	// such as `...attachments | ...## PeerConnectionSample`.
	return { markdown: [...nestedSections, section].join('\n\n'), outline };
}

/**
 * The type used for documentation purposes: for an optional field that is the
 * second member of its `["null", T]` union, otherwise the declared type.
 */
function resolveDocumentedType(field: AvroField): AvroType {
	if (!isUnion(field.type)) return field.type;
	return field.type[1] ?? field.type[0] ?? 'null';
}

function describeField(
	field: AvroField,
	namedType: AvroType,
	recordName: string,
	options: MarkdownOptions,
): string {
	let description = field.doc ?? '';

	if (!description && options.warnOnMissingDocs !== false) {
		options.logger.warn(
			`Field ${recordName}.${field.name} has no description — adding one is worth the minute it costs`,
		);
	}

	if (isEnum(namedType)) {
		// The legacy generator did `description += ...` on a possibly undefined
		// doc, which is why `state | undefined (Possible values are: ...)` shows
		// up in the published README.
		const values = `(Possible values are: ${namedType.symbols.join(',\n')})`;
		description = description ? `${description} ${values}` : values;
	}

	return description.split('\n').join('<br />');
}

interface SectionArgs {
	title: string;
	description?: string;
	headingLevel: number;
	rows: readonly TableRow[];
}

function renderSection({ title, description, headingLevel, rows }: SectionArgs): string {
	const lines: string[] = [`${'#'.repeat(headingLevel)} ${title}`];

	if (description) {
		lines.push('\n', description);
	}

	if (rows.length > 0) {
		lines.push('\n', 'Field | Description ', '--- | ---');
		for (const row of rows) {
			const label = row.required ? `${row.name} (**Mandatory**)` : row.name;
			lines.push(`${label} | ${row.description}`);
		}
	}

	return lines.join('\n');
}

/** Stable: required fields first, declaration order preserved within a group. */
function sortRequiredFirst(rows: readonly TableRow[]): TableRow[] {
	return [...rows].sort((a, b) => Number(b.required) - Number(a.required));
}
