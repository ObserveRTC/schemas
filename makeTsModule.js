
class TsObj {
    constructor({ name, desc}) {
        this._name = name;
        this._description = desc;
        this._fields = [];
    }

    get name() {
        return this._name;
    }

    setDescriptionIfNotExists(value) {
        if (this._description) return;
        this._description = value;
    }

    addField({ name, type, desc, required }) {
        this._fields.push({ name, type, desc, required });
    }

    toString() {
        const result = [
            "/**",
            "* " + this._description,
            "*/",
            "export type " + this._name + " = {",
        ];
        this._fields.sort((a, b) => {
            const priorityA = a.required ? 10 : 0;
            const priorityB = b.required ? 10 : 0;
            return priorityB - priorityA;
        });
        for (const { name, type, desc, required } of this._fields) {
            if (desc) {
                result.push("\t/**");
                result.push("\t* " + desc);
                result.push("\t*/");
            }
            if (required) {
                result.push(`\t${name}: ${type};`);
            } else {
                result.push(`\t${name}?: ${type};`);
            }
            if (desc) {
                result.push("");
            }
        }
        result.push("}");
        return result.join("\n") + "\n";
    }
}

function getTsType(avroType) {
    let tsType;
    let tsObj;
    let tsDependencies;
    // check if it is a complex type
    if (typeof avroType !== 'string') { 
        const { type: subType, symbols, items, name } = avroType;
        if (subType === "array") {
            const { tsType: subTsType, tsObj: subTsObj, tsDependencies: subTsDependencies } = getTsType(items);
            tsType = subTsType + "[]";
            tsObj = subTsObj;
            tsDependencies = subTsDependencies;
        } else if (subType === "enum") {
            tsType = `"` + symbols.join(`" | "`) + `"`;
        } else if (subType === "record") {
            tsType = name;
            const { mainTsObj, dependencies } = makeTsObj(avroType);
            tsObj = mainTsObj;
            if (dependencies && 0 < dependencies.length) {
                tsDependencies = dependencies;
            }
        }
    } else if (avroType === "boolean" || avroType === "string") {
        tsType = avroType;
    } else if (avroType === "int" || avroType === "long" || avroType === "float" || avroType === "double") {
        tsType = "number";
    } else if (avroType === "bytes") {
        tsType = "string";
    }
    return {
        tsType,
        tsObj,
        tsDependencies,
    }
}

function makeTsObj(avroSchema) {
    const dependencies = [];
    const mainTsObj = new TsObj({
        name: avroSchema.name,
        desc: avroSchema.doc,
    });
    for (const field of avroSchema.fields) {
        const required = field.default === undefined;
        const fieldDoc = field.doc;
        const avroTypes = Array.isArray(field.type) ? field.type : [field.type];
        const tsTypes = [];
        for (const avroType of avroTypes) {
            if (avroType === "null") continue;
            const { tsType, tsObj, tsDependencies } = getTsType(avroType);
            if (tsObj) {
                dependencies.push(tsObj);
                if (tsDependencies) {
                    dependencies.push(...tsDependencies);
                }
                tsObj.setDescriptionIfNotExists(fieldDoc);
            }
            tsTypes.push(tsType);
        }
        // let avroType = required ? field.type : field.type[1];
        const tsType = tsTypes.join(" | ");
        mainTsObj.addField({
            name: field.name,
            type: tsType,
            desc: field.doc,
            required,
        });
    }
    return {
        mainTsObj,
        dependencies,
    }
}

export function makeTsModule(avroSchema) {
    const {
        mainTsObj,
        dependencies,
    } = makeTsObj(avroSchema);
    const exports = [];
    const modules = [];
    if (dependencies && 0 < dependencies.length) {
        while (0 < dependencies.length) {
            const dependency = dependencies.pop();
            modules.push(dependency.toString());
            exports.push(dependency.name);
        }
        // for (const dependency of dependencies) {
        //     modules.push(dependency.toString());
        //     exports.push(dependency.name);
        // }
    }
    modules.push(mainTsObj.toString());
    exports.push(mainTsObj.name);
    return {
        exports,
        module: modules.join("\n"),
    }
}