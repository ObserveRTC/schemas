import { replaceAll } from "./common.js";

class MarkdownSchemaDescription {
    constructor() {
        this._title = null;
        this._description = null;
        this._preMarks = [];
        this._rows = [];
        this._postMarks = [];
        this._level = 0;
    }

    withLevel(value) {
        this._level = value;
        return this;
    }

    withPreDefinedMarkdown(markdown) {
        this._preMarks.push(markdown);
        return this;
    }

    withPostDefinedMarkdown(markdown) {
        this._postMarks.push(markdown);
        return this;
    }

    withTableRow({ name, required, type, description }) {
        if (!description) {
            console.warn(`Field ${this._title}.${name} does not have any description. Do you want to add one? It is prooved to be useful. `)
        }
        this._rows.push({
            name,
            required: required ? "Yes" : "No",
            type,
            description: replaceAll(description, "\n", "<br />"),
        });
        return this;
    }

    withDescription(value) {
        this._description = value;
        return this;
    }

    withTitle(value) {
        this._title = value;
        return this;
    }

    build() {
        const sectionIndent = "#".repeat(this._level + 2);
        const result = [
            sectionIndent + " " + this._title,
            // "---",
        ];

        if (this._description) {
            result.push("\n");
            result.push(this._description);
        }
        
        if (0 < this._preMarks.length) {
            result.push("\n");
            this._postMarks.forEach(preMd => {
                result.push("\n\n");
                result.push(preMd);
            });
        }
        const compareRows = (rowA, rowB) => {
            if (rowA.required === "Yes" && rowB.required === "No") {
                return -1;
            }
            if (rowA.required === "No" && rowB.required === "Yes") {
                return 1;
            }
            return 0;
        };
        if (0 < this._rows.length) {
            result.push("\n");
            result.push("Field | Type | Required | Description ");
            result.push("--- | --- | --- | ---");
            
            this._rows.sort(compareRows).forEach(row => {
                const resultRow = [row.name, row.type, row.required, row.description].join(' | ');
                result.push(resultRow);
            });
        }

        if (0 < this._postMarks.length) {
            result.push("\n");
            this._postMarks.forEach(postMd => {
                result.push("\n");
                result.push(postMd);
            });
        }

        return result.join('\n');
    }
}

/**
 * Make a markdown doc from avro schema
 * @param {avsc} avroSchema 
 */
export function makeMarkdownDoc(avroSchema) {
    const markdown = new MarkdownSchemaDescription()
        .withTitle(avroSchema.name)
        .withDescription(avroSchema.doc)
    ;
    avroSchema.fields.forEach(field => {
        const required = field.default === undefined;
        let description = field.doc;
        let type = required ? field.type : field.type[1];
        if (typeof type !== 'string') {
            if (type.type && type.type === 'enum') {
                type = "enum";
                description += " (Possible values are: " + field.type.symbols.join(",\n") + ")";
            }
        }
        markdown.withTableRow({
            name: field.name,
            description,
            required,
            type,
        });
       
    });
    const result = markdown.build();
    return result;
}