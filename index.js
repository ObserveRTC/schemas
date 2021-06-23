const avro = require('avro-js');
const fs = require('fs');
const TJS = require("typescript-json-schema");

const CONFIG = {
    reports: {
        // v2: {
        //     sourcePath: "./sources/reports/v2",
        // },
        v3: {
            sourcePath: "./sources/reports/v3",
        }
    },
    samples: {
        legacy: {
            sourcePath: "./sources/samples/legacy",
        },
        // v1: {
        //     sourcePath: "./sources/samples/v1",
        //     revision: 1,
        // },
        v2: {
            sourcePath: "./sources/samples/v2",
        },
    }
}

function parseVersion(version) {
    const arr = version.split('.');
    const major = parseInt(arr[0]) || 0;
    const minor = parseInt(arr[1]) || 0;
    const patch = parseInt(arr[2]) || 0;
    return {
        major,
        minor,
        patch
    }
}

function removeComments(string){
    //Takes a string of code, not an actual function.
    return string.replace(/\/\*[\s\S]*?\*\/|\/\/.*/g,'').trim();//Strip comments
}
// avro-js brokes with comments, java did not.
function parseReportSchemaFromPath(path) {
    const schemaText = fs.readFileSync(path, 'utf-8');
    const regexpRevision =  /@revision: (?<revision>\d+)/mg;
    const revisionMatch = regexpRevision.exec(schemaText);
    let revision = -1;
    if (revisionMatch && revisionMatch.groups && revisionMatch.groups.revision) {
        revision = revisionMatch.groups.revision;
    }
    const schemaString = removeComments(schemaText);
    const parsedSchema = avro.parse(schemaString);
    const parsedObject = JSON.parse(schemaString);
    return { parsedSchema, parsedObject, revision };
}

function createMediaTrackReportSchema({inbAudTrackSchemaParsedObj, inbVidTrackSchemaParsedObj, outbAudTrackSchemaParsedObj, outbVidTrackSchemaParsedObj}) {
    const result = {
        type: "record",
        name: "MediaTrackReport",
        namespace: "org.observertc.webrtc.schemas.reports",
        doc: "A General Flat merged Media Track Report for in-, outbound video and audio tracks",
        fields: [],
    };
    const allFields = new Set();
    [
        inbAudTrackSchemaParsedObj, 
        inbVidTrackSchemaParsedObj, 
        outbAudTrackSchemaParsedObj, 
        outbVidTrackSchemaParsedObj
    ].forEach(schemaObj => schemaObj.fields.forEach(field => allFields.add(field.name)));
    const onlyAudioFields = new Set(allFields);
    const onlyVideoFields = new Set(allFields);
    const onlyInboundFields = new Set(allFields);
    const onlyOutboundFields = new Set(allFields);

    inbAudTrackSchemaParsedObj.fields.forEach(field => {
        const foundInResult = 0 < result.fields.filter(resultField => resultField.name === field.name).length;
        if (!foundInResult) {
            result.fields.push(field);
        }
        onlyVideoFields.delete(field.name);
        onlyOutboundFields.delete(field.name);
    });
    inbVidTrackSchemaParsedObj.fields.forEach(field => {
        const foundInResult = 0 < result.fields.filter(resultField => resultField.name === field.name).length;
        if (!foundInResult) {
            result.fields.push(field);
        }
        onlyAudioFields.delete(field.name);
        onlyOutboundFields.delete(field.name);
    });
    outbAudTrackSchemaParsedObj.fields.forEach(field => {
        const foundInResult = 0 < result.fields.filter(resultField => resultField.name === field.name).length;
        if (!foundInResult) {
            result.fields.push(field);
        }
        onlyVideoFields.delete(field.name);
        onlyInboundFields.delete(field.name);
    });
    outbVidTrackSchemaParsedObj.fields.forEach(field => {
        const foundInResult = 0 < result.fields.filter(resultField => resultField.name === field.name).length;
        if (!foundInResult) {
            result.fields.push(field);
        }
        onlyAudioFields.delete(field.name);
        onlyInboundFields.delete(field.name);
    });
    result.fields.forEach(field => {
        if (onlyInboundFields.has(field.name)) {
            field.doc = "Only For Inbound Media Track Reports\n" + field.doc;
        }
        if (onlyOutboundFields.has(field.name)) {
            field.doc = "Only For Outbound Media Track Reports\n" + field.doc;
        }
        if (onlyAudioFields.has(field.name)) {
            field.doc = "Only For Audio Reports\n" + field.doc;
        }
        if (onlyVideoFields.has(field.name)) {
            field.doc = "Only For Video Reports\n" + field.doc;
        }
    });
    return result;
}

function replaceAll(str, find, replace) {
    if (!str) {
        return str;
    }
    return str.replace(new RegExp(find, 'g'), replace);
  }

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
            "---",
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
            result.push("Name | Type | Required | Description ");
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

function makeMarkdownDocFromReportSchema(avroSchema, typeMap) {
    const markdown = new MarkdownSchemaDescription()
        .withTitle(avroSchema.name)
        .withDescription(avroSchema.doc)
    ;
    avroSchema.fields.forEach(field => {
        const required = field.default === undefined;
        const type = required ? field.type : field.type[1];
        markdown.withTableRow({
            name: field.name,
            description: field.doc,
            required,
            type,
        });
        if (typeMap) {
            typeMap.set(field.name, type);
        }
    });
    
    
    const result = markdown.build();
    return result;
}

function makeMarkdownDocFromJsonSchema(jsonSchemaName, jsonSchema, level = 0) {
    const markdown = new MarkdownSchemaDescription()
        .withTitle(jsonSchemaName)
        .withDescription(jsonSchema.description)
        .withLevel(level)
    ;
    const definitions = jsonSchema.definitions;
    if (definitions) {
        for (const [defName, defSchema] of Object.entries(definitions)) {
            const defMarkdownText = makeMarkdownDocFromJsonSchema(defName, defSchema, level + 1);
            markdown.withPostDefinedMarkdown(defMarkdownText);
        }
    }
    
    const required = new Set(jsonSchema.required);
    const properties = jsonSchema.properties;
    if (properties) {
        for (const [fieldName, fieldProperties] of Object.entries(jsonSchema.properties)) {
            const refArr = fieldProperties["$ref"] ? fieldProperties["$ref"].split("/") : null;
            const type = fieldProperties.type ? fieldProperties.type : refArr[2];
            markdown.withTableRow({
                name: fieldName,
                required: required.has(fieldName),
                type,
                description: fieldProperties.description,
            });
        }
    }
    
    const result = markdown.build();
    return result;
}

function parseSampleSchemaFromPath({ samples, basePath, outputPath }) {
    // optionally pass argument to schema generator
    const settings = {
        out: outputPath,
        required: true,
    };

    // optionally pass ts compiler options
    const compilerOptions = {
        strictNullChecks: true,
    };

    // optionally pass a base path
    const baseSamples = samples.map(sample => basePath + "/" + sample + ".ts");
    const revisions = new Map();
    const regexpRevision =  /@revision: (?<revision>\d+)/mg;
    for (let i = 0; i < samples.length; ++i) {
        const baseSample = baseSamples[i];
        const sample = samples[i];
        const schemaText = fs.readFileSync(baseSample, 'utf-8');
        const revisionMatch = regexpRevision.exec(schemaText);
        if (revisionMatch && revisionMatch.groups && revisionMatch.groups.revision) {
            const revision = revisionMatch.groups.revision;
            revisions.set(sample, revision); 
        }
    }
    baseSamples.forEach(baseSample => {
        
    });
    
    const program = TJS.getProgramFromFiles(
        baseSamples,
        compilerOptions,
        basePath
    );

    // We can either get the schema for one file and one type...
    // const schema = TJS.generateSchema(program, "ClientSample", settings);
    const generator = TJS.buildGenerator(program, settings);
    const schemas = new Map();
    samples.forEach(sample => {
        const schema = generator.getSchemaForSymbol(sample);
        schemas.set(sample, schema);
    });
    return { schemas, revisions };
}

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
            type = this._typeMap.get(fieldName);
        }
        if (type === "array") {
            result = this._getJavaType(fieldName, itemsType, null) + "[]";
        } else if (type === "string") {
            result = "String";
        } else if (type === "number") {
            result = 0 <= fieldName.indexOf("byte") ? "long" : "int";
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


function makePojoForSampleSchema(jsonSchemaName, jsonSchema, level, reportTypes) {
    const pojo = new POJOBuilder()
        .withClassName(jsonSchemaName)
        .withClassDescription(jsonSchema.description)
        .withLevel(level)
        .withTypeMap(reportTypes)
    ;
    const definitions = jsonSchema.definitions;
    if (definitions) {
        for (const [defName, defSchema] of Object.entries(definitions)) {
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
            // const items = fieldProperties["items"];
            // const type = fieldProperties.type ? fieldProperties.type : refArr[2];
            // const itemsType = type === "array" ? items.type : null;
            // console.log(fieldName, type, itemsType);
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

class SchemaGenerator {
    static builder() {
        const generator = new SchemaGenerator();
        const result = {
            withMarkdownDocs: value => {
                generator._markdownDocs = value;
                return result;
            },
            withOutputPath: value => {
                generator._outputPath = value;
                return result;
            },
            withReportsOutputPath: value => {
                generator._reportOutputPath = value;
                return result;
            },
            withSamplesOutputPath: value => {
                generator._sampleOutputPath = value;
                return result;
            },
            withMeta: value => {
                generator._addMetaFile = value;
                return result;
            },
            build: () => {
                return generator;
            }
        }
        return result;
    }

    constructor() {
        this._outputPath = "./generated-schemas";
        this._reportOutputPath = null;
        this._sampleOutputPath = null;
        this._markdownDocs = true;
        this._addsVersionTxt = true;

        this._reportV2Names = [
            "report",
        ];
        
        this._mediaTrackReportNames = {
            inbAudTrackSchemaParsedObj: "inbound-audio-track-report",
            inbVidTrackSchemaParsedObj: "inbound-video-track-report",
            outbAudTrackSchemaParsedObj: "outbound-audio-track-report", 
            outbVidTrackSchemaParsedObj: "outbound-video-track-report",
        }

        this._reportV3Names = [
            this._mediaTrackReportNames.inbAudTrackSchemaParsedObj,
            this._mediaTrackReportNames.inbVidTrackSchemaParsedObj,
            this._mediaTrackReportNames.outbAudTrackSchemaParsedObj,
            this._mediaTrackReportNames.outbVidTrackSchemaParsedObj,
            "pc-transport-report",
            "pc-data-channel-report",
            "call-event-report",
            "client-extension-report",
            "client-meta-report",
            "observer-event-report"
        ];

        this._sampleLegacyNames = [
            "PeerConnectionSample",
        ];

        this._sampleV2Names = [
            "ClientSample",
        ];
    }

    async generate() {
        const reportTypes = await this._generateReportsSchema({
            sourcePath: CONFIG.reports.v3.sourcePath,
            revision: CONFIG.reports.v3.revision,
            outputPath: this._outputPath + "/reports/v3",
            reportNames: this._reportV3Names,
            mediaTrackReportNames: this._mediaTrackReportNames,
        });

        await this._generateSamplesSchema({
            sourcePath: CONFIG.samples.legacy.sourcePath,
            revision: CONFIG.samples.legacy.revision,
            outputPath: this._outputPath + "/samples/legacy",
            sampleNames: this._sampleLegacyNames,
            generateJava: false,
        });

        await this._generateSamplesSchema({
            sourcePath: CONFIG.samples.v2.sourcePath,
            revision: CONFIG.samples.v2.revision,
            outputPath: this._outputPath + "/samples/v2",
            sampleNames: this._sampleV2Names,
            generateJava: true,
            reportTypes,
        });
        // await this._generateSamplesSchema();
    }

    async _generateReportsSchema({ sourcePath, revision, outputPath, reportNames, mediaTrackReportNames }) {
        return new Promise((resolve, reject) => {
            fs.mkdir(outputPath, { recursive: true }, (err) => {
                if (err) {
                    reject(err);
                    return;
                }
                const reverseFields = Object.entries(mediaTrackReportNames).map(([key, value]) => [value, key]);
                const mediaTrackReportNamesMap = new Map(reverseFields);
                const mediaTrackReportParsedObj = {};
                const typeMap = new Map();
                const revisions = new Map();
                for (const reportName of reportNames) {
                    const srcPath = sourcePath + "/" + reportName + ".avsc";
                    const dstPathBase = outputPath + "/" + reportName;
                    const { parsedObject, revision } = parseReportSchemaFromPath(srcPath);
                    if (revision) {
                        revisions.set(reportName, revision);
                    }
                    if (mediaTrackReportNamesMap.has(reportName)) {
                        const fieldName = mediaTrackReportNamesMap.get(reportName);
                        mediaTrackReportParsedObj[fieldName] = parsedObject;
                    }
                    const savedSchemaText = JSON.stringify(parsedObject, null, 2);
                    fs.writeFileSync(dstPathBase + ".avsc", savedSchemaText);
                    console.log("REPORT SCHEMA: " + reportName + " is successfully generated");
                    if (this._markdownDocs === true) {
                        const markdown = makeMarkdownDocFromReportSchema(parsedObject, typeMap)
                        fs.writeFileSync(dstPathBase + ".md", markdown);
                        console.log("REPORT MARKDOWN: " + reportName + " is successfully generated");
                    }
                }
                const mediaTrackParsedObj = createMediaTrackReportSchema(mediaTrackReportParsedObj);
                const mediaTrackJSONStr = JSON.stringify(mediaTrackParsedObj, null, 2)
                const mediaTrackReportFileName = "media-track-report"
                fs.writeFileSync(outputPath + "/" + mediaTrackReportFileName + ".avsc", mediaTrackJSONStr);
                if (this._markdownDocs === true) {
                    const markdown = makeMarkdownDocFromReportSchema(mediaTrackParsedObj, typeMap)
                    fs.writeFileSync(outputPath + "/" + mediaTrackReportFileName + ".md", markdown);
                    console.log("REPORT MARKDOWN: MediaTrackReport is successfully generated");
                }

                if (this._addMetaFile === true) {
                    const revisionText = [];
                    for (const [sample, revision] of revisions) {
                        revisionText.push("\t" + sample + ": " + revision);
                    }
                    fs.writeFileSync(outputPath + "/meta.txt", [
                        "Revisions:",
                        ...revisionText,
                    ].join("\n"));
                }
                resolve(typeMap);
            });
        });
    }

    async _generateSamplesSchema({ sourcePath, outputPath, sampleNames, generateJava, reportTypes }) {
        return new Promise((resolve, reject) => {
            fs.mkdir(outputPath, { recursive: true }, (err) => {
                if (err) {
                    reject(err);
                    return;
                }
                
                const {schemas, revisions} = parseSampleSchemaFromPath({
                    samples: sampleNames,
                    basePath: sourcePath,
                    outputPath,
                });
                
                for (const [sampleName, generatedSchema] of schemas.entries()) {
                    const generatedSchemaText = JSON.stringify(generatedSchema, null, 2);
                    fs.writeFileSync(outputPath + "/" + sampleName + ".json", generatedSchemaText);
                    console.log("SAMPLE SCHEMA: " + sampleName + " is successfully generated");
                    if (this._markdownDocs === true) {
                        try {
                            const markdown = makeMarkdownDocFromJsonSchema(sampleName, generatedSchema)
                            fs.writeFileSync(outputPath + "/" + sampleName + ".md", markdown);
                            console.log("SAMPLE MARKDOWN: " + sampleName + " is successfully generated");    
                        } catch (error) {
                            console.error("SAMPLE MARKDOWN: Unsuccessfull documentation creation: " + error);
                        }
                    }
                    if (generateJava) {
                        const pojo = makePojoForSampleSchema(sampleName, generatedSchema, 0, reportTypes);
                        fs.writeFileSync(outputPath + "/" + sampleName + ".java", pojo);
                    }
                }
                if (this._addMetaFile === true) {
                    const revisionText = [];
                    for (const [sample, revision] of revisions) {
                        revisionText.push("\t" + sample + ": " + revision);
                    }
                    fs.writeFileSync(outputPath + "/meta.txt", [
                        "Revisions:",
                        ...revisionText,
                    ].join("\n"));
                }
                resolve();
            });
        });
    }
}

const { ArgumentParser } = require('argparse');
const { version } = require('./package.json');

const parser = new ArgumentParser({
    description: 'Schema Generator Helper App for ObserveRTC',
    add_help: true,
});

parser.add_argument('-o', '--outputPath', { help: 'The output path the schemas will be generated', default: "./generated-schemas" });
parser.add_argument('-md', '--markdowns', { help: 'flag to determine if markdown should be generated or not', default: true });
parser.add_argument('-m', '--meta', { help: 'flag to determine if the meta.txt is added to the output path or not', default: true });

const parsedArgs = parser.parse_args();
const generatorBuilder = SchemaGenerator.builder()
    .withOutputPath(parsedArgs.outputPath)
    .withMarkdownDocs(parsedArgs.markdowns)
    .withMeta(parsedArgs.meta)

const start = async () => {
    try {
        const generator = generatorBuilder.build();
        generator.generate();
    } catch (err) {
        console.error(err);
        process.exit(1)
    }
}

start();



