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
// const NPM_LIB_PATH = "./npm-lib";
// const NPM_MONITOR_BASE_PATH = "./npm-monitor-lib";
const OUTPUTS_PATH = "./outputs";
const NPM_SAMPLES_LIB_PATH = "./npm-samples-lib";
const NPM_REPORTS_LIB_PATH = "./npm-reports-lib";
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
    const w3cStatsIdentifiers = fs.readFileSync(W3C_STATS_IDENTIFIERS, 'utf-8');
    const npmSamplesLib = new NpmLib(NPM_SAMPLES_LIB_PATH);
    const npmReportsLib = new NpmLib(NPM_REPORTS_LIB_PATH);
    npmSamplesLib.addW3cStatsIdentifiers(w3cStatsIdentifiers);

    const markdownLists = [];
    for (const [fileName, source] of sources) {
        const avsc = source.getAvsc();
        const schemaType = source.getSchemaType();
        const isReport = fileName.includes("report");
        let schema;
        try {
            schema = JSON.parse(avsc);
             // throw exception if invalid
            try {
                avro.parse(schema);
            } catch (err) {
                console.warn(schema, err);
                continue;
            }
        } catch (err) {
            console.warn(avsc, err);
            continue;
        }
        const schemaName = schema.name;
        const { markdownDoc, list } = makeMarkdownDoc(schema);
        markdownLists.push(...list);
        // console.log(list);
        const { module, exports } = makeTsModule(schema);

        if (isReport) {
            const { csvColumnList, createTable } = makeRedshiftSql(schema);
            if (csvColumnList) {
                fs.writeFileSync(path.join(OUTPUTS_PATH, `${schemaName}-csv-header.txt`), csvColumnList);
            } else {
                console.warn(`No csv header txt is generated for ${schemaName}`);
            }

            if (createTable) {
                fs.writeFileSync(path.join(OUTPUTS_PATH, `${schemaName}-redshift.sql`), createTable);
            } else {
                console.warn(`No redshift sql is generated for ${schemaName}`);
            }
            
            
            npmReportsLib.addEntry({
                fileName,
                schemaName,
                schemaType,
                exports,
                typescript: module,
                markdown: markdownDoc,
            });
        } else {
            npmSamplesLib.addEntry({
                fileName,
                schemaName,
                schemaType,
                exports,
                typescript: module,
                markdown: markdownDoc,
            });
        }
        fs.writeFileSync(path.join(OUTPUTS_PATH, `${schemaName}.avsc`), avsc);
    }
    fs.writeFileSync(`schemaList.md`, markdownLists.join(`\n`))
    // generate protobuf schema if we can
    const version = fs.readFileSync(path.join(SOURCE_PATH, "version.txt"), 'utf-8');
    const samplesSource = sources.get("samples");
    if (samplesSource) {
        const schema = JSON.parse(samplesSource.getAvsc());
        const protobufSchema = protobufUtils.convertToProtobufSchema(schema, version);
        fs.writeFileSync(path.join(OUTPUTS_PATH, "ProtobufSamples.proto"), protobufSchema);

        const protobufSchemaV3 = protobufUtils.convertToProtobufSchemaV3(schema, version);
        fs.writeFileSync(path.join(OUTPUTS_PATH, "ProtobufSamplesV3.proto"), protobufSchemaV3);
    } else {
        console.warn(`There was no Samples avro schema to generate the protobuf schema`);
    }
    
    const changelog = fs.readFileSync(path.join(SOURCE_PATH, "CHANGELOG.md"), 'utf-8');
    npmSamplesLib.version = version;
    npmReportsLib.version = version;
    npmSamplesLib.changelog = changelog;
    npmReportsLib.changelog = changelog;
    npmSamplesLib.clear();
    npmReportsLib.clear();
    npmSamplesLib.make();
    npmReportsLib.make();

    fs.writeFileSync(`${OUTPUTS_PATH}/generated.txt`, `Generated from schema version ${version} at ${new Date().toGMTString()}`);
};

main();
