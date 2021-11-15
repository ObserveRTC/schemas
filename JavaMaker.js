
class POJOBuilder {
    constructor() {
        this._level = 0;
        this._className = null;
        this._description = null;
        this._fields = [];
        this._nestedClasses = [];
        this._typeMap = new Map();
    }

    withClassName(value) {
        this._className = value;
        return this;
    }

    withClassDescription(value) {
        this._description = value;
        return this;
    }

    withLevel(value) {
        this._level = value;
        return this;
    }

    withTypeMap(value) {
        this._typeMap = value;
        return this;
    }

    _getJavaType(fieldName, type, itemsType) {
        let result;
        if (this._typeMap && this._typeMap.has(fieldName)) {
            const typeCandidate = this._typeMap.get(fieldName);
            if (typeCandidate !== 'enum') {
                type = typeCandidate;
            }
        }
        if (type === "array") {
            result = this._getJavaType(fieldName, itemsType, null) + "[]";
        } else if (type === "string") {
            result = "String";
        } else if (type === "number") {
            result = 0 <= fieldName.indexOf("byte") ? "Long" : "Integer";
        } else if (type === "int") { 
            result = 0 <= fieldName.indexOf("byte") ? "Long" : "Integer";
        } else if (type === "long") { 
            result = "Long";
        } else if (type === "double") { 
            result = "Double";
        } else if (type === "float") { 
            result = "Float";
        } else if (type === "bytes") { // in java sample we will use the String
            result = "String"; 
        } else {
            result = type;
        }
        return result;
    }

    withField({ fieldName, type, description, itemsType }) {
        let fieldTypeString = this._getJavaType(fieldName, type, itemsType);
        const field = [
            "public",
            fieldTypeString,
            fieldName
        ].join(" ") + ";";
        const fieldWithDescription = [
            "/**",
            "* " + description,
            "*/",
            "@JsonProperty(\"" + fieldName + "\")",
            field,
            "",
        ].map(line => "\t".repeat(this._level + 1) + line).join("\n")
        this._fields.push(fieldWithDescription);
        return this;
    }

    withNestedClass(value) {
        this._nestedClasses.push(value);
        return this;
    }

    build() {
        const pojo = [];
        if (this._level < 1) {
            pojo.push(
                "package org.observertc.webrtc.observer.samples;",
                "",
                "import com.fasterxml.jackson.annotation.JsonIgnoreProperties;",
                "import com.fasterxml.jackson.annotation.JsonProperty;"
            );
        }
        pojo.push(
            "/** ",
            "* " + this._description,
            "*/",
            this._level < 1 ? "@JsonIgnoreProperties(ignoreUnknown = true)" : "",
            "public " + (0 < this._level ? "static" : "") +  " class " + this._className + " { ",
            "",
            ...this._fields,
            ...this._nestedClasses,
            "}"
        )
        const result = pojo.map(line => "\t".repeat(this._level) + line).join("\n");
        return result;
    }
}


function makePojo(jsonSchemaName, jsonSchema, level, reportTypes, recursiveWalk = true) {
    const pojo = new POJOBuilder()
        .withClassName(jsonSchemaName)
        .withClassDescription(jsonSchema.description)
        .withLevel(level)
        .withTypeMap(reportTypes)
    ;
    const definitions = jsonSchema.definitions;
    if (definitions) {
        for (const [defName, defSchema] of Object.entries(definitions)) {
            if (!recursiveWalk) continue;
            const embeddedClass = makePojoForSampleSchema(defName, defSchema, level + 1, reportTypes);
            pojo.withNestedClass(embeddedClass);
        }
    }
    
    const required = new Set(jsonSchema.required);
    const properties = jsonSchema.properties;
    if (properties) {
        for (const [fieldName, fieldProperties] of Object.entries(jsonSchema.properties)) {
            const refArr = fieldProperties["$ref"] ? fieldProperties["$ref"].split("/") : null;
            const type = fieldProperties.type ? fieldProperties.type : refArr[2];
            let itemsType = null;
            if (type === "array") {
                const items = fieldProperties["items"];
                if (items.type) {
                    itemsType = items.type;
                } else {
                    const itemsRefArr = items["$ref"] ? items["$ref"].split("/") : null;
                    itemsType = itemsRefArr[2];
                }
            }
            pojo.withField({
                fieldName,
                type,
                description: fieldProperties.description,
                itemsType,
            });
        }
    }
    
    const result = pojo.build();
    return result;
}