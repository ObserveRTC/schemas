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


const UUID_FIELDS_TYPE = "VARCHAR(254)";

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
            const { type, required } = this._fields[i];
            const name = this._fields[i].name.toLowerCase();
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

    _makeColumnCsvList() {
        if (this._fields.length < 1) return "";
        // return `"` + this._fields.map(field => field.name.toLowerCase()).join(`",\n"`) + `"`;
        // return this._fields.map(field => field.name.toLowerCase()).join(`, `);
        // console.log(this._fields);
        return this._fields.map(field => field.name).join(`, `);
    }

}


function getRedshiftType(fieldName, avroFieldType) {
    if (avroFieldType === "string") {
        if (uuidFields.has(fieldName)) {
            return UUID_FIELDS_TYPE;
        }
        if (fieldName.endsWith("Id")) {
            return "VARCHAR(1024)";
        }
        const lowerCase = fieldName.toLowerCase();
        if (lowerCase.endsWith("state") || lowerCase.endsWith("protocol")) {
            return "VARCHAR(1024)";
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
            // name: name.toLowerCase(),
            name: name,
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


