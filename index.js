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
import { NpmSampleEncoderLib } from './NpmSamplesEncoderLib.js';
import { NpmSamplesDecoderLib } from './NpmSamplesDecoderLib.js';

const SOURCE_PATH = "./sources";
// const NPM_LIB_PATH = "./npm-lib";
// const NPM_MONITOR_BASE_PATH = "./npm-monitor-lib";
const TEMP_PATH = "./temp";
const OUTPUTS_PATH = "./outputs";
const TYPESCRIPT_OUTPUTS_PATH = `./${OUTPUTS_PATH}/typescript`;
const AVSC_OUTPUTS_PATH = `./${OUTPUTS_PATH}/avsc`;
const PROTO_OUTPUTS_PATH = `./${OUTPUTS_PATH}/proto`;
const CSV_OUTPUTS_PATH = `./${OUTPUTS_PATH}/csv`;
const SQL_OUTPUTS_PATH = `./${OUTPUTS_PATH}/sql`;

const NPM_SAMPLES_LIB_PATH = "./npm-samples-lib";
const NPM_REPORTS_LIB_PATH = "./npm-reports-lib";
const W3C_STATS_IDENTIFIERS = "./sources/w3c/W3cStatsIdentifiers.ts";

async function rmDir(folderPath) {
    const promises = [];
    for (const file of fs.readdirSync(folderPath)) {
        const filePath = path.join(folderPath, file);
        if (fs.lstatSync(filePath).isDirectory()) continue;
        const promise = new Promise(resolve => {
            fs.unlink(filePath, err => {
                if (err) throw err;
                resolve();
            });
        });
        promises.push(promise);
    }
    await Promise.all(promises);
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
    await Promise.all([
        rmDir(OUTPUTS_PATH),
        rmDir(TYPESCRIPT_OUTPUTS_PATH),
        rmDir(CSV_OUTPUTS_PATH),
        rmDir(SQL_OUTPUTS_PATH),
        rmDir(PROTO_OUTPUTS_PATH),
    ])
    fetchChunks();
    // console.log(chunks.chunkIds());
    
    const sources = fetchSources();
    const w3cStatsIdentifiers = fs.readFileSync(W3C_STATS_IDENTIFIERS, 'utf-8');
    const npmSamplesLib = new NpmLib(NPM_SAMPLES_LIB_PATH);
    const npmReportsLib = new NpmLib(NPM_REPORTS_LIB_PATH);
    const npmEncoderLib = new NpmSampleEncoderLib();
    const npmDecoderLib = new NpmSamplesDecoderLib();
    const version = fs.readFileSync(path.join(SOURCE_PATH, "version.txt"), 'utf-8');
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
        const addDoc = true;
        const { module, exports } = makeTsModule(schema, version, addDoc);
        
        fs.writeFileSync(path.join(TYPESCRIPT_OUTPUTS_PATH, `${schemaName}.ts`), module);

        if (isReport) {
            const { csvColumnList, createTable } = makeRedshiftSql(schema);
            if (csvColumnList) {
                fs.writeFileSync(path.join(CSV_OUTPUTS_PATH, `${schemaName}-csv-header.txt`), csvColumnList);
            } else {
                console.warn(`No csv header txt is generated for ${schemaName}`);
            }

            if (createTable) {
                fs.writeFileSync(path.join(SQL_OUTPUTS_PATH, `${schemaName}-redshift.sql`), createTable);
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
            npmDecoderLib.addSamplesTsCode(module);
            npmEncoderLib.addSamplesTsCode(module);
            npmSamplesLib.addEntry({
                fileName,
                schemaName,
                schemaType,
                exports,
                typescript: module,
                markdown: markdownDoc,
            });
        }
        fs.writeFileSync(path.join(AVSC_OUTPUTS_PATH, `${schemaName}.avsc`), avsc);
    }
    fs.writeFileSync(`schemaList.md`, markdownLists.join(`\n`))
    // generate protobuf schema if we can
    
    const samplesSource = sources.get("samples");
    if (samplesSource) {
        const schema = JSON.parse(samplesSource.getAvsc());
        const protobufSchema = protobufUtils.convertToProtobufSchema(schema, version);
        fs.writeFileSync(path.join(PROTO_OUTPUTS_PATH, "ProtobufSamples.proto"), protobufSchema);

        const protobufSchemaV3 = protobufUtils.convertToProtobufSchemaV3(schema, version);
        fs.writeFileSync(path.join(PROTO_OUTPUTS_PATH, "ProtobufSamplesV3.proto"), protobufSchemaV3);

        const protobufSchemaV3Optional = protobufUtils.convertToProtobufSchemaV3(schema, version, true);
        const v3schemaOptionalPath = path.join(PROTO_OUTPUTS_PATH, "ProtobufSamplesV3Optional.proto");
        fs.writeFileSync(v3schemaOptionalPath, protobufSchemaV3Optional);
        await protobufUtils.createTypescriptModels(v3schemaOptionalPath, path.join(TEMP_PATH));
        const protobufSchemaV3OptionalTs = fs.readFileSync(path.join(TEMP_PATH, "outputs", "proto", "ProtobufSamplesV3Optional_pb.ts"), 'utf-8');
        npmEncoderLib.addSamplesProtobufTsCode(protobufSchemaV3OptionalTs);
        npmDecoderLib.addSamplesProtobufTsCode(protobufSchemaV3OptionalTs);
        // console.log(protobufSchemaV3OptionalTs);
    } else {
        console.warn(`There was no Samples avro schema to generate the protobuf schema`);
    }
    
    const changelog = fs.readFileSync(path.join(SOURCE_PATH, "CHANGELOG.md"), 'utf-8');
    npmSamplesLib.version = version;
    npmReportsLib.version = version;
    npmEncoderLib.version = version;
    npmDecoderLib.version = version;
    
    npmSamplesLib.changelog = changelog;
    npmReportsLib.changelog = changelog;

    npmSamplesLib.clear();
    npmReportsLib.clear();
    npmEncoderLib.clear();
    npmDecoderLib.clear();

    npmSamplesLib.make();
    npmReportsLib.make();
    npmEncoderLib.make();
    npmDecoderLib.make();

    fs.writeFileSync(`${OUTPUTS_PATH}/generated.txt`, `Generated from schema version ${version} at ${new Date().toGMTString()}`);
};

main();
