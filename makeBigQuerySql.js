import { fieldComparator, nameConverter } from './common.js';

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

class BigQuerySql {
    constructor({ datasetId, tableId, desc}) {
        this._datasetId = datasetId;
        this._tableId = tableId;
        this._description = desc;
        this._fields = [];
    }

    get name() {
        return this._tableId;
    }

    addField({ name, type, desc, required }) {
        this._fields.push({ name, type, desc, required });
    }

    make() {
        this._fields.sort(fieldComparator);
        return {
            createTable: this._makeCreateTableString(),
        }
    }

    _makeCreateTableString() {
        const datasetId = this._datasetId;
        const tableName = this._tableId;
        const result = [
            `CREATE TABLE ${datasetId}.${tableName} (`
        ]
        const sortIds = new Set(Array.from(uuidFields).map(s => s.toLowerCase()));
        const sortKeys = [];
        const fieldsLength = this._fields.length;
        for (let i = 0; i < fieldsLength; ++i) {
            const { type, required } = this._fields[i];
            // const name = this._fields[i].name.toLowerCase();
            const name = this._fields[i].name;
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
        result.push(`)`);
        // result.push(`) PARTITION BY serviceId;`);
        // result.push(`ALTER TABLE ${tableName} ALTER diststyle KEY DISTKEY serviceid;`);
        // if (0 < sortKeys.length) {
        //     result.push(`ALTER TABLE ${tableName} ALTER COMPOUND SORTKEY (${sortKeys.join(", ")});`)
        // }
        return result.join(`\n`);
    }
}


function getBigQueryType(fieldName, avroFieldType) {
    if (avroFieldType === "string") {
        if (uuidFields.has(fieldName)) {
            return "STRING";
        }
        if (fieldName.endsWith("Id")) {
            return "STRING";
        }
        const lowerCase = fieldName.toLowerCase();
        if (lowerCase.endsWith("state") || lowerCase.endsWith("protocol")) {
            return "STRING";
        }
        return "STRING";
    }
    switch (avroFieldType) {
        case "float":
            return "FLOAT64";
        case "double":
            return "FLOAT64";
        case "long":
            return "INT64";
        case "boolean":
            return "BOOL";
        case "int":
            return "INT64";
        case "bytes":
            return "BYTES";
        default:
            throw new Error(`Unsoppurted type ${avroFieldType} to convert it to redshift sql type`)
    }
}

export function makeBigQuerySql(avroSchema) {
    const result = new BigQuerySql({
        datasetId: 'observer',
        tableId: avroSchema.name,
        desc: avroSchema.doc,
    });
    for (const field of avroSchema.fields) {
        const required = field.default === undefined;
        const name = field.name;
        const avroFieldType = required ? field.type : field.type[1];
        const type = getBigQueryType(name, avroFieldType);

        result.addField({
            // name: name.toLowerCase(),
            name: name,
            doc: field.doc,
            required,
            type,
        });
    }
    const { createTable } = result.make();
    return {
        createTable
    };
}


