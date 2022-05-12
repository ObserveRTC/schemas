function fieldComparator(a, b) {
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

class RedshiftSql {
    constructor({ name, desc}) {
        this._name = name;
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
        for (const { name, type, required } of this._fields) {
            const properties = [
                name,
                type,
            ];
            if (required) {
                properties.push("not null");
            }
            const column = properties.join(`\t`);
            result.push(`\t${column},`);
        }
        result.push(`)`);
        return result.join(`\n`);
    }

    _makeColumnCsvList() {
        return this._fields.map(field => field.name).join(`,`);
    }

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
            name,
            doc: field.doc,
            required,
            type,
        });
    }
    const { createTable, csvColumnList } = result.make();
    return {
        createTable,
        csvColumnList
    }
}