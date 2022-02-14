import fs from 'fs';
import { SourceAvsc } from './SourceAvsc.js';
import { makeMarkdownDoc } from "./makeMarkdownDoc.js";
import { NpmLib } from './NpmLib.js';
import { makeTsModule } from "./makeTsModule.js";
import avro from "avro-js";
import path from "path";
import * as chunks from "./chunks.js"

const SOURCE_PATH = "./sources";
const NPM_LIB_PATH = "./npm-lib/src";
const W3C_STATS_IDENTIFIERS = "./sources/w3c/W3cStatsIdentifiers.ts";

function fetchChunks() {
    for (const schemaType of ["reports", "samples"]) {
        const schemaPath = path.join(SOURCE_PATH, schemaType);
        for (const file of fs.readdirSync(schemaPath)) {
            if (!file.endsWith(".avsc.chunk")) continue;
            const chunkId = file.substr(0, file.length - ".avsc.chunk".length);
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
    npmLib.clear();
    npmLib.make();
};

main();