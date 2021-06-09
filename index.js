const avro = require('avro-js');
const fs = require('fs');
const TJS = require("typescript-json-schema");

const CONFIG = {
    reports: {
        // v2: {
        //     sourcePath: "./sources/reports/v2",
        //     revision: 3,
        // },
        v3: {
            sourcePath: "./sources/reports/v3",
            revision: 1,
        }
    },
    samples: {
        legacy: {
            sourcePath: "./sources/samples/legacy",
            revision: 1,
        },
        // v1: {
        //     sourcePath: "./sources/samples/v1",
        //     revision: 1,
        // },
        v2: {
            sourcePath: "./sources/samples/v2",
            revision: 1,
        },
    }
}
// const CONFIG = {
//     reports: {
//         sourcePath: "./sources/reports",
//         version: "3.0.0"
//     },
//     samples: {
//         sourcePath: "./sources/samples",
//         version: "2.0.0",
//     }
// };

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
    const schemaString = removeComments(schemaText);
    const parsedSchema = avro.parse(schemaString);
    const parsedObject = JSON.parse(schemaString);
    return { parsedSchema, parsedObject };
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
        this._rows.push({
            name,
            value: required ? "Required " + type : "Optional " + type,
            description,
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

        if (0 < this._rows.length) {
            result.push("\n");
            result.push("Name | Value | Description ");
            result.push("--- | --- | ---");
    
            this._rows.forEach(row => {
                const resultRow = [row.name, row.value, row.description].join(' | ');
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

function makeMarkdownDocFromReportSchema(avroSchema) {
    const markdown = new MarkdownSchemaDescription()
        .withTitle(avroSchema.name)
        .withDescription(avroSchema.doc)
    ;
    avroSchema.fields.forEach(field => {
        const required = field.default === undefined;
        markdown.withTableRow({
            name: field.name,
            description: field.doc,
            required,
            type: required ? field.type : field.type[1],
        })
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
    const baseSamples = samples.map(sample => basePath + "/" + sample + ".ts")
    const program = TJS.getProgramFromFiles(
        baseSamples,
        compilerOptions,
        basePath
    );

    // We can either get the schema for one file and one type...
    // const schema = TJS.generateSchema(program, "ClientSample", settings);
    const generator = TJS.buildGenerator(program, settings);
    const result = new Map();
    samples.forEach(sample => {
        const schema = generator.getSchemaForSymbol(sample);
        result.set(sample, schema);
    });
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

        this._reportV3Names = [
            "outbound-audio-track-report",
            "outbound-video-track-report",
            "inbound-audio-track-report",
            "inbound-video-track-report",
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
        await this._generateReportsSchema({
            sourcePath: CONFIG.reports.v3.sourcePath,
            revision: CONFIG.reports.v3.revision,
            outputPath: this._outputPath + "/reports/v3",
            reportNames: this._reportV3Names,
        });

        await this._generateSamplesSchema({
            sourcePath: CONFIG.samples.legacy.sourcePath,
            revision: CONFIG.samples.legacy.revision,
            outputPath: this._outputPath + "/samples/legacy",
            sampleNames: this._sampleLegacyNames,
        });

        await this._generateSamplesSchema({
            sourcePath: CONFIG.samples.v2.sourcePath,
            revision: CONFIG.samples.v2.revision,
            outputPath: this._outputPath + "/samples/v2",
            sampleNames: this._sampleV2Names,
        });
        // await this._generateSamplesSchema();
    }

    async _generateReportsSchema({ sourcePath, revision, outputPath, reportNames }) {
        return new Promise((resolve, reject) => {
            fs.mkdir(outputPath, { recursive: true }, (err) => {
                if (err) {
                    reject(err);
                    return;
                }
                for (const reportName of reportNames) {
                    const srcPath = sourcePath + "/" + reportName + ".avsc";
                    const dstPathBase = outputPath + "/" + reportName;
                    const { parsedObject } = parseReportSchemaFromPath(srcPath);
                    const savedSchemaText = JSON.stringify(parsedObject, null, 2)
                    fs.writeFileSync(dstPathBase + ".avsc", savedSchemaText);
                    console.log("REPORT SCHEMA: " + reportName + " is successfully generated");
                    if (this._markdownDocs === true) {
                        const markdown = makeMarkdownDocFromReportSchema(parsedObject)
                        fs.writeFileSync(dstPathBase + ".md", markdown);
                        console.log("REPORT MARKDOWN: " + reportName + " is successfully generated");
                    }
                }
                if (this._addMetaFile === true) {
                    fs.writeFileSync(outputPath + "/meta.txt", [
                        "revision: " + revision
                    ].join("\n"));
                }
                resolve();
            });
        });
    }

    async _generateSamplesSchema({ sourcePath, outputPath, revision, sampleNames}) {
        return new Promise((resolve, reject) => {
            fs.mkdir(outputPath, { recursive: true }, (err) => {
                if (err) {
                    reject(err);
                    return;
                }
                
                const schemas = parseSampleSchemaFromPath({
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
                }
                if (this._addMetaFile === true) {
                    fs.writeFileSync(outputPath + "/meta.txt", [
                        "revision: " + revision
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



