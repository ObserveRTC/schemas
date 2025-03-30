
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
        const result = [];
        if (this._description) {
            result.push(
                "/**",
                "* " + this._description,
                "*/",
            );
        }
        result.push("export type " + this._name + " = {")
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

function getTsType(avroType, addDoc = true) {
    let tsType;
    let tsObj;
    let tsDependencies;
    // check if it is a complex type
    if (typeof avroType !== 'string') { 
        const { type: subType, symbols, items, name } = avroType;
        if (subType === "array") {
            const { tsType: subTsType, tsObj: subTsObj, tsDependencies: subTsDependencies } = getTsType(items, addDoc);
            tsType = subTsType + "[]";
            tsObj = subTsObj;
            tsDependencies = subTsDependencies;
        } else if (subType === "enum") {
            if (name === "RTCStatsIceCandidatePairState") {
                const index = symbols.findIndex(s => s === "inProgress") ?? -1;

                if (index > -1) {
                    symbols[index] = "in-progress";
                }
            }
            tsType = `"` + symbols.join(`" | "`) + `"`;
        } else if (subType === "record") {
            tsType = name;
            const { mainTsObj, dependencies } = makeTsObj(avroType, addDoc);
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

function getAttachmentsTsType() {
    return {
        tsType: "Record<string, unknown>",
        tsObj: undefined,
        tsDependencies: undefined,
    }
}

function makeTsObj(avroSchema, addDoc = true) {
    const dependencies = [];
    const mainTsObj = new TsObj({
        name: avroSchema.name,
        desc: addDoc ? avroSchema.doc : undefined,
    });
    for (const field of avroSchema.fields) {
        const required = field.default === undefined;
        const fieldDoc = addDoc ? field.doc : undefined;
        const avroTypes = Array.isArray(field.type) ? field.type : [field.type];
        const tsTypes = [];
        for (const avroType of avroTypes) {
            if (avroType === "null") continue;
            const { tsType, tsObj, tsDependencies } = field.name === 'attachments' ? getAttachmentsTsType() : getTsType(avroType, addDoc);
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
            desc: addDoc ? field.doc : undefined,
            required,
        });
    }
    return {
        mainTsObj,
        dependencies,
    }
}

export function makeTsModule(avroSchema, schemaVersion, addDoc = true) {
    const {
        mainTsObj,
        dependencies,
    } = makeTsObj(avroSchema, addDoc);
    const exports = [];
    const modules = [];
    if (!avroSchema.name.includes("Report")) {
        modules.push(`\nexport const schemaVersion = "${schemaVersion}";\n`);
    }
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