import fs from 'fs';
import { SourceAvsc } from './SourceAvsc.js';
import { makeMarkdownDoc } from "./makeMarkdownDoc.js";
import { NpmLib } from './NpmLib.js';
import { makeTsModule } from "./makeTsModule.js";
import avro from "avro-js";
import path from "path";
import * as chunks from "./chunks.js"
import * as protobufUtils from "./protobufUtils.js";
import { makeRedshiftSql } from "./makeRedshiftSql.js"
import { NpmMonitorLib } from './NpmMonitorLib.js';


const SOURCE_PATH = "./sources";
const NPM_LIB_PATH = "./npm-lib";
const NPM_MONITOR_BASE_PATH = "./npm-monitor-lib";
const W3C_STATS_IDENTIFIERS = "./sources/w3c/W3cStatsIdentifiers.ts";

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
    const markdownLists = [];
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
        const { markdownDoc, list } = makeMarkdownDoc(schema);
        markdownLists.push(...list);
// console.log(list);
        const { module, exports } = makeTsModule(schema);
        npmLib.addEntry({
            fileName,
            schemaName,
            schemaType,
            avsc,
            exports,
            typescript: module,
            markdown: markdownDoc,
        });
    }
    fs.writeFileSync(`schemaList.md`, markdownLists.join(`\n`))
    // generate protobuf schema if we can
    const samplesSource = sources.get("samples");
    const samplesProtoPath = "./ProtobufSamples.proto";
    if (samplesSource) {
        const schema = JSON.parse(samplesSource.getAvsc());
        const protobufSchema = protobufUtils.convertToProtobufSchema(schema);
        fs.writeFileSync(samplesProtoPath, protobufSchema);
        const protobufJson = await protobufUtils.makeProtobufJson(samplesProtoPath);
        npmLib.addProtobufSchema({
            fileName: "ProtobufSamples",
            protobufSchema,
            protobufJson,
        });

        const protobufSchemaV3 = protobufUtils.convertToProtobufSchemaV3(schema);
        const samplesProtoPathV3 = "./ProtobufSamplesV3.proto";
        fs.writeFileSync(samplesProtoPathV3, protobufSchemaV3);
        const protobufJsonV3 = await protobufUtils.makeProtobufJson(samplesProtoPathV3);
        fs.rmSync(samplesProtoPathV3);
        npmLib.addProtobufSchema({
            fileName: "ProtobufSamplesV3",
            protobufSchema: protobufSchemaV3,
            protobufJson: protobufJsonV3,
        });
    } else {
        console.warn(`There was no Samples avro schema to generate the protobuf schema`);
    }
    const version = fs.readFileSync(path.join(SOURCE_PATH, "version.txt"), 'utf-8');
    npmLib.changelog = fs.readFileSync(path.join(SOURCE_PATH, "CHANGELOG.md"), 'utf-8');
    npmLib.version = version
    npmLib.clear();
    npmLib.make();

    const npmMonitorLib = new NpmMonitorLib(NPM_MONITOR_BASE_PATH);
    npmMonitorLib.add({ 
        samplesTs: fs.readFileSync(path.join(NPM_LIB_PATH, "src", "samples", "Samples.ts")), 
        protobufSamples: fs.readFileSync(path.join(NPM_LIB_PATH, "src", "samples", "ProtobufSamples.ts")), 
        w3cStatsIdentifiers,
    });
    npmMonitorLib.version = version;
    npmMonitorLib.make();
    fs.copyFileSync(samplesProtoPath, path.join(NPM_MONITOR_BASE_PATH, "SamplesProtobuf.proto"));
    fs.rmSync(samplesProtoPath);

    const reportTypes = Array.from(sources.keys()).filter(sourceKey => sourceKey.includes("-report"));
    for (const reportType of reportTypes) {
        const avsc = sources.get(reportType).getAvsc()
        const avroSchema = JSON.parse(avsc);
        const { createTable, csvColumnList } = makeRedshiftSql(avroSchema);
        fs.writeFileSync(`./redshift/${reportType}.sql`, createTable);
        fs.writeFileSync(`./redshift/${reportType}-columns-order.csv`, csvColumnList);
    }
};

main();
