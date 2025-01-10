
export class ProtobufConverterV3 {

    static from(schema, version, uuidFields, allOptional = false) {
        const result = new ProtobufConverterV3(0, version);
        result._name = schema.name;
        result._allOptional = allOptional;
        if (uuidFields) {
            result._uuidFields = uuidFields;
        }
        for (const field of schema.fields) {
            try {
                result.add(field);
            } catch (err) {
                console.warn(`Error occurred while adding`, field, err);
            }
        }
        return result;
    }

    static convertEnum(name, symbols) {
        const enumName = name.toUpperCase();
        const lines = [
            `enum ${enumName} {`
        ];
        for (let fieldNum = 0; fieldNum < symbols.length; ++fieldNum) {
            lines.push(`\t${symbols[fieldNum].toUpperCase()} = ${fieldNum};`)
        }
        lines.push(`}`);
        return {
            name: enumName,
            toLines:() => lines
        }
    }

    constructor(level = 0, version) {
        this._name = undefined;
        this._version = version;
        this._level = level;
        this._classEnum = undefined;
        this._symbols = new Map();
        this._fields = [];
        this._nestedClasses = [];
        this._builderFields = null;
        this._uuidFields = new Set();
        this._allOptional = false;
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
        }
        let isObject = typeof type === "object";
        let isArray = isObject && type.type === "array";
        if (isArray) {
            type = type.items;
        }
        isObject = typeof type === "object";
        if (isObject && type.type === "enum") {
            this._symbols.set(field.name, type.symbols);
            if (!this._classEnum) {
                this._classEnum = `${this._name}Enum`;
            }
            this._addField({
                name: field.name,
                type: this._classEnum,
            });

            // const nestedClass = ProtobufConverterV3.convertEnum(field.name, type.symbols);
            // // console.log(type.symbols);
            // this._nestedClasses.push(nestedClass);
            // this._addField({
            //     doc: field.doc ? field.doc : "" + "Possible values: " + type.symbols.join(", "),
            //     name: field.name,
            //     type: nestedClass.name,
            //     required,
            // });
            return;
        }
        if (isObject) {
            const nestedClass = ProtobufConverterV3.from(type, !!this._builderFields, this._uuidFields, this._allOptional);
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
        if (this._uuidFields.has(field.name) || field.name === "appData") {
            protoType = "bytes";
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
        else if (this._allOptional) result.push(`optional`);
        // else if (required) result.push(`required`);
        // else result.push(`optional`);
        
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
        if (this._classEnum) {
            this._nestedClasses.push(this._renderEnum());
        }
        for (const nestedClass of this._nestedClasses) {
            for (const nestedLine of nestedClass.toLines()) {
                result.push(`\t${nestedLine}`);
            }
        }
        result.push(...messageFields.map(line => `\t${line}`));
        result.push(`}`);
        return result;
    }

    _renderEnum() {
        const lines = [
            `enum ${this._classEnum} {`
        ];
        let fieldNum = 0;
        const values = new Set();
        for (const [fieldName, symbols] of this._symbols.entries()) {
            lines.push(`\t/* For ${fieldName} */`);
            for (let i = 0; i < symbols.length; ++i, fieldNum) {
                const symbol = symbols[i].toUpperCase();
                if (values.has(symbol)) {
                    continue;
                }
                values.add(symbol);
                lines.push(`\t${symbol} = ${fieldNum++};`)
            }    
        }
        
        lines.push(`}`);
        return {
            name: this._classEnum,
            toLines:() => lines
        }
    }
}