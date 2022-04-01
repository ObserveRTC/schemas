import fs from 'fs';
import { SourceAvsc } from './SourceAvsc.js';
import { makeMarkdownDoc } from "./makeMarkdownDoc.js";
import { NpmLib } from './NpmLib.js';
import { makeTsModule } from "./makeTsModule.js";
import avro from "avro-js";
import path from "path";
import * as chunks from "./chunks.js"
import { ProtobufConverter } from "./ProtobufConverter.js";

const SOURCE_PATH = "./sources";
const NPM_LIB_PATH = "./npm-lib";
const W3C_STATS_IDENTIFIERS = "./sources/w3c/W3cStatsIdentifiers.ts";

function convertToProtobufSchema(avroSchema) {
    const samplesProto = ProtobufConverter.from(avroSchema);
    const samplesProtoStr = samplesProto.toLines().join("\n");

    const samplesModule = [
        `syntax = "proto2";`,
        ``,
        // `option java_outer_classname = "Protobuf${samplesProto.name}";`,
        // `option java_package = "org.observertc.observer.samples";`,
        // ``,
        samplesProtoStr
    ].join("\n");
    return samplesModule;
    // fs.writeFileSync(outputPath, samplesModule);
}

function fetchChunks() {
    for (const schemaType of ["reports", "samples"]) {
        const schemaPath = path.join(SOURCE_PATH, schemaType);
        for (const file of fs.readdirSync(schemaPath)) {
            if (!file.endsWith(".chunk.avsc")) continue;
            // if (!file.endsWith(".avsc")) continue;
            const chunkId = file.substr(0, file.length - ".chunk.avsc".length);
            // const chunkId = file.substr(0, file.length - ".avsc".length);
            const filePath = path.join(schemaPath, file);
            const chunk = fs.readFileSync(filePath, 'utf-8');
            chunks.add(chunkId, chunk);
        }
    }
}

function fetchSources() {
    const sources = new Map();
    for (const schemaType of ["reports", "samples"]) {
        const schemaPath = path.join(SOURCE_PATH, schemaType);
        for (const file of fs.readdirSync(schemaPath)) {
            if (!file.endsWith("avsc")) continue;
            if (file.endsWith(".chunk.avsc")) continue;
            const fileName = file.substr(0, file.length - 5);
            const filePath = path.join(schemaPath, file);
            const avsc = fs.readFileSync(filePath, 'utf-8');
            const source = new SourceAvsc({
                fileName,
                avsc, 
                schemaType,
            });
            sources.set(fileName, source);
        }
    }
    return sources;
}

const main = async () => {
    fetchChunks();
    // console.log(chunks.chunkIds());
    const sources = fetchSources();
    const npmLib = new NpmLib(NPM_LIB_PATH);
    const w3cStatsIdentifiers = fs.readFileSync(W3C_STATS_IDENTIFIERS, 'utf-8');
    npmLib.addW3cStatsIdentifiers(w3cStatsIdentifiers);
    for (const [fileName, source] of sources) {
        const avsc = source.getAvsc();
        const schemaType = source.getSchemaType();
        let schema;
        try {
            schema = JSON.parse(avsc);
        } catch (err) {
            console.warn(avsc, err);
            break;
        }

        // throw exception if invalid
        try {
            avro.parse(schema);
        } catch (err) {
            console.warn(schema, err);
            break;
        }

        const schemaName = schema.name;
        const markdown = makeMarkdownDoc(schema);

        const { module, exports } = makeTsModule(schema);
        npmLib.addEntry({
            fileName,
            schemaName,
            schemaType,
            avsc,
            exports,
            typescript: module,
            markdown,
        });
    }
    // generate protobuf schema if we can
    const samplesSource = sources.get("samples");
    if (samplesSource) {
        const schema = JSON.parse(samplesSource.getAvsc());
        const protobufSchema = convertToProtobufSchema(schema);
        npmLib.addProtobufSchema({
            fileName: "ProtobufSamples.proto",
            protobufSchema,
        })
    } else {
        console.warn(`There was no Samples avro schema to generate the protobuf schema`);
    }
    npmLib.changelog = fs.readFileSync(path.join(SOURCE_PATH, "CHANGELOG.md"), 'utf-8');
    npmLib.version = fs.readFileSync(path.join(SOURCE_PATH, "version.txt"), 'utf-8');
    npmLib.clear();
    npmLib.make();
};

main();


// function makeReportSchema() {
//     const reportFileName = "report.avsc";
//     const schemaPath = path.join(SOURCE_PATH, "reports");
//     const reportSchema = JSON.parse(fs.readFileSync(path.join(schemaPath, reportFileName), 'utf-8'));
//     const fields = new Set();
//     for (const field of reportSchema.fields) {
//         fields.set(field.name, field);
//     }
//     for (const file of fs.readdirSync(schemaPath)) {
//         if (!file.endsWith("avsc") || file === reportFileName) continue;
//         const filePath = path.join(schemaPath, file);
//         const text = fs.readFileSync(filePath, 'utf-8');
//         const schema = JSON.parse(text);
//         for (const field of schema.fields) {
//             const existingField = fields.get(field.name);
//             if (!existingField) {
//                 fields.set(field.name, field);
//                 continue;
//             }
//             // merge existing field with the new field
//             existingField.doc
//             const types = new Set();
//             if (typeof existingField.type === "string") types.add(existingField.type);
//             else existingField.type.forEach(t => types.add(t));
            
//         }
        
//     }
// }