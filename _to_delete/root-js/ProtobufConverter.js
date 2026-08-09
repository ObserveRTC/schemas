
export class ProtobufConverter {
    static from(schema, version) {
        const result = new ProtobufConverter(0, version);
        result._name = schema.name;
        for (const field of schema.fields) {
            try {
                result.add(field);
            } catch (err) {
                console.warn(`Error occurred while adding`, field, err);
            }
        }
        return result;
    }
    constructor(level = 0, version) {
        this._name = undefined;
        this._version = version;
        this._level = level;
        this._fields = [];
        this._nestedClasses = [];
        this._builderFields = null;
        this._uuidFields = new Set();
    }

    get name() {
        return this._name;
    }

    set level(value) {
        this._level = value;
    }

    addUuidField(...fieldNames) {
        this._uuidFields.add(...fieldNames);
    }

    add(field) {
        const types = field.type;
        let type;
        let required = true;
        if (typeof types === 'string') {
            type = types;
        } else if (types.length === 2) {
            type = types[1];
            required = false;
        } else if (typeof types === 'object') {
            type = types;
        }
        let isObject = typeof type === "object";
        let isArray = isObject && type.type === "array";
        if (isArray) {
            type = type.items;
        }
        isObject = typeof type === "object";
        if (isObject && type.type === "enum") {
            this._addField({
                doc: field.doc ? field.doc : "" + "Possible values: " + type.symbols.join(", "),
                name: field.name,
                type: "string",
                required,
            });
            return;
        }
        if (isObject) {
            const nestedClass = ProtobufConverter.from(type, !!this._builderFields, this._uuidFields);
            nestedClass.level = this._level + 1;
            // console.log("nestedBuilder", this._builderFields, !!this._builderFields);
            this._nestedClasses.push(nestedClass);
            this._addField({
                doc: field.doc ? field.doc : type.doc,
                name: field.name,
                type: nestedClass.name,
                isArray,
                required,
            });
            return;
        }
        let protoType = undefined;
        if (this._uuidFields.has(field.name)) {
            protoType = "UUID";
        } else {
            protoType = this._mapPrimitive(type);
        }

        this._addField({
            doc: field.doc,
            name: field.name,
            type: protoType,
            isArray,
            required,
        });
    }

    _mapPrimitive(type) {
        switch (type) {
            case "string":
                return "string";
            case "float":
                return "float";
            case "double":
                return "double";
            case "long":
                return "int64";
            case "boolean":
                return "bool";
            case "int":
                return "int32";
            case "bytes":
                return "bytes";
        }
        return undefined;
    }
    _addField({ doc, name, type, isArray, required }) {
        this._fields.push({
            doc,
            name,
            type,
            isArray,
            required,
        });
    }

    _getMessageField({ fieldNum, name, type, isArray, required }) {
        let result = [];

        if (isArray) result.push(`repeated`)
        else if (required) result.push(`required`);
        else result.push(`optional`);

        result.push(type);
        result.push(`${name} = ${fieldNum}`);

        // if (isArray) result.push(`[packed = true]`);

        const line = result.join(` `) + ";"
        return line;
    }

    toLines() {
        const arrayFields = [];
        const requiredFields = [];
        const optionalFields = [];
        for (const field of this._fields) {
            if (field.isArray) {
                arrayFields.push(field);
            } else if (field.required) {
                requiredFields.push(field);
            } else {
                optionalFields.push(field);
            }
        }
        [arrayFields, requiredFields, optionalFields].forEach(fields => {
            fields.sort((a, b) => {
                if (a.name < b.name) return -1;
                else if (b.name < a.name) return 1;
                else return 0;
            });
        });
        const messageFields = [];
        let fieldNum = 1;
        [arrayFields, requiredFields, optionalFields].forEach(fields => {
            fields.forEach(({name, type, isArray, required}) => {
                const messageField = this._getMessageField({
                    fieldNum,
                    name,
                    type,
                    isArray,
                    required
                });
                messageFields.push(messageField);
                ++fieldNum;
            })
        });
        const result = []
        if (this._level === 0) {
            result.push(
                `/**`,
                `* Schema Version: ${this._version}`,
                `*/`
            );
        }
        result.push(`message ${this.name} {`);
        for (const nestedClass of this._nestedClasses) {
            for (const nestedLine of nestedClass.toLines()) {
                result.push(`\t${nestedLine}`);
            }
        }
        result.push(...messageFields.map(line => `\t${line}`));
        result.push(`}`);
        return result;
    }
}