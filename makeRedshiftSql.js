function fieldComparator(a, b) {
    if (a.required && b.required) {
        return 10 + a.name.localeCompare(b.name);
    }
    if (!a.required && !b.required) {
        return a.name.localeCompare(b.name);
    }
    const priorityA = a.required ? 10 : 0;
    const priorityB = b.required ? 10 : 0;
    return priorityB - priorityA;
}

function nameConverter(fieldName) {
    // if (fieldName === "SSRC") {
    //     return "ssrc";
    // }
    fieldName = fieldName.replace("SSRC", "ssrc").replace("SFU", "sfu").replace("ICE", "ice");
    fieldName = fieldName[0].toLowerCase() + fieldName.slice(1);
    return fieldName.replace(/[A-Z]/g, (letter) => `_${letter.toLowerCase()}`);
}

const uuidFields = new Set([
    "callId",
    "clientId",
    "peerConnectionId",
    "trackId",
    "streamId",
    "sinkId",
    "sfuStreamId",
    "sfuSinkId",
    "sfuId",
    "transportId",
    "padId",
    "channelId",
]);

class RedshiftSql {
    constructor({ name, desc}) {
        this._name = nameConverter(name);
        this._description = desc;
        this._fields = [];
    }

    get name() {
        return this._name;
    }

    addField({ name, type, desc, required }) {
        this._fields.push({ name, type, desc, required });
    }

    make() {
        this._fields.sort(fieldComparator);
        return {
            createTable: this._makeCreateTableString(),
            csvColumnList: this._makeColumnCsvList(),
            knexSchema: this._makeKnexSchema(),
        }
    }

    _makeCreateTableString() {
        const tableName = this._name;
        const result = [
            `create table  IF NOT EXISTS ${tableName} (`
        ]
        const sortIds = new Set(Array.from(uuidFields).map(s => s.toLowerCase()));
        const sortKeys = [];
        const fieldsLength = this._fields.length;
        for (let i = 0; i < fieldsLength; ++i) {
            const { name, type, required } = this._fields[i];
            const properties = [
                name,
                type,
            ];
            if (required) {
                properties.push("not null");
            }
            if (sortIds.has(name)) {
                sortKeys.push(name);
            }
            const column = properties.join(`\t`);
            result.push(`\t${column}${i != fieldsLength - 1 ? ",":""}`);
            // result.push(`\t${column},`);
        }
        result.push(`) diststyle even;`);
        result.push(`ALTER TABLE ${tableName} ALTER diststyle KEY DISTKEY serviceid;`);
        if (0 < sortKeys.length) {
            result.push(`ALTER TABLE ${tableName} ALTER COMPOUND SORTKEY (${sortKeys.join(", ")});`)
        }
        return result.join(`\n`);
    }

    _makeKnexSchema() {
        const tableName = this._name;
        const result = [
            `const schemaName = "schema";`,
            `const tableName = "${tableName}";`,
            
            `exports.up = function (knex) {`,
            `\treturn knex.schema.withSchema(schemaName).createTable(tableName, (table) => {`,
        ];
        const fieldsLength = this._fields.length;
        for (let i = 0; i < fieldsLength; ++i) {
            const { name, type, required } = this._fields[i];
            const jsCommands = [];
            if (name === "timestamp") {
                jsCommands.push(`table.timestamp("timestamp", { useTz: false })`);
            } else if (name === "payload"){
                jsCommands.push(`unstructuredDataColumn(table, "payload")`);
            } else if (type === "CHAR(36)") {
                jsCommands.push(`table.specificType("${name}", "${type}")`);
            } else if (type === "VARCHAR(255)") {
                jsCommands.push(`table.string("${name}", 255)`);
            } else if (type === "VARCHAR(65535)") {
                jsCommands.push(`table.text("${name}")`);
            } else if (type === "REAL") {
                jsCommands.push(`table.text("${name}")`);
            } else if (type === "INTEGER") {
                jsCommands.push(`table.integer("${name}")`);
            } else if (type === "BIGINT") {
                jsCommands.push(`table.bigInteger("${name}")`);
            } else if (type === "BOOLEAN") {
                jsCommands.push(`table.boolean("${name}")`);
            } else {
                jsCommands.push(`table.specificType("${name}", "${type}")`);
            }
            if (required) {
                jsCommands.push("notNull()");
            }
            result.push(`\t\t${jsCommands.join(".")};`);
        }
        result.push(`\t});`);
        result.push(`};`);
        return result.join(`\n`);
    }

    _makeColumnCsvList() {
        if (this._fields.length < 1) return "";
        // return `"` + this._fields.map(field => field.name.toLowerCase()).join(`",\n"`) + `"`;
        return this._fields.map(field => field.name.toLowerCase()).join(`, `);
    }

}


function getRedshiftType(fieldName, avroFieldType) {
    if (avroFieldType === "string") {
        if (uuidFields.has(fieldName)) {
            return "CHAR(36)";
        }
        if (fieldName.endsWith("Id")) {
            return "VARCHAR(255)";
        }
        const lowerCase = fieldName.toLowerCase();
        if (lowerCase.endsWith("state") || lowerCase.endsWith("protocol")) {
            return "VARCHAR(255)";
        }
        return "VARCHAR(65535)";
    }
    switch (avroFieldType) {
        case "float":
            return "REAL";
        case "double":
            return "REAL";
        case "long":
            return "BIGINT";
        case "boolean":
            return "BOOLEAN";
        case "int":
            return "INTEGER";
        case "bytes":
            return "VARCHAR(4096)";
        default:
            throw new Error(`Unsoppurted type ${avroFieldType} to convert it to redshift sql type`)
    }
}

export function makeRedshiftSql(avroSchema) {
    const result = new RedshiftSql({ 
        name: avroSchema.name,
        desc: avroSchema.doc,
    });
    for (const field of avroSchema.fields) {
        const required = field.default === undefined;
        const name = field.name;
        const avroFieldType = required ? field.type : field.type[1];
        const type = getRedshiftType(name, avroFieldType);

        result.addField({
            name: name.toLowerCase(),
            doc: field.doc,
            required,
            type,
        });
    }
    const { createTable, csvColumnList, knexSchema } = result.make();
    return {
        createTable,
        csvColumnList,
        knexSchema
    }
}


