import fs from "fs";
import path from "path";
// import * as typedoc from "typedoc";

const INDEX_TS_FILENAME = "index.ts";
const PACKAGE_JSON_FILE = "package.json";

export class NpmMonitorLib {
    constructor(basePath) {
        this._basePath = basePath;
        this._srcPath = path.join(basePath, "src");
        this._samplesTs = undefined;
        this._protobufSamples = undefined;
        this._w3cStatsIdentifiers = undefined;
        this._version = null;
    }

    set version(value) {
        this._version = value;
    }

    add({ samplesTs, protobufSamples, w3cStatsIdentifiers }) {
        this._protobufSamples = protobufSamples;
        this._samplesTs = samplesTs;
        this._w3cStatsIdentifiers = w3cStatsIdentifiers;
    }

    make() {
        const samplesOutputPath = path.join(this._srcPath, "samples", "Samples.ts");
        fs.writeFileSync(samplesOutputPath, this._samplesTs);
        // const protobufSamplesOutputPath = path.join(this._srcPath, "samples", "ProtobufSamples.ts");
        // fs.writeFileSync(protobufSamplesOutputPath, this._protobufSamples);
        const w3cOutputPath = path.join(this._srcPath, "w3c", "W3cStatsIdentifiers.ts");
        fs.writeFileSync(w3cOutputPath, this._w3cStatsIdentifiers);
        const indexTsPath = path.join(this._srcPath, INDEX_TS_FILENAME);
        if (this._version) {
            const packagePath = path.join(this._basePath, PACKAGE_JSON_FILE);
            let packageText = fs.readFileSync(packagePath);
            const packageJson = JSON.parse(packageText);
            packageJson["version"] = this._version;
            packageText = JSON.stringify(packageJson, null, 2);
            fs.writeFileSync(packagePath, packageText);
        }

        const indexLines = [
            `export * from "./samples/Samples";`,
            // `export { schema as ProtobufSamples } from "./samples/ProtobufSamples";`,
            `export * as W3CStats from "./w3c/W3cStatsIdentifiers";`,
            `export const version = "${this._version}";`,
        ]
        fs.writeFileSync(indexTsPath, indexLines.join("\n"));
    }
}