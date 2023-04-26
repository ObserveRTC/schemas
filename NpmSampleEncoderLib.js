import fs from "fs";
import path from "path";
// import * as typedoc from "typedoc";

const README_MD_FILENAME = "README.md";
const INDEX_TS_FILENAME = "index.ts";
const PACKAGE_JSON_FILE = "package.json";

export class NpmSampleEncoderLib {
    constructor() {
        this._basePath = './npm-sample-encoder';
        this._srcPath = path.join(this._basePath, "src");
        this._inputSamplesPath = path.join(this._srcPath, "InputSamples.ts");
        this._outputSamplesPath = path.join(this._srcPath, "OutputSamples.ts");
        this._samplesTsCode = undefined;
        this._protobufSamplesTsCode = undefined;
    }

    addSamplesTsCode(tsCode) {
        this._samplesTsCode = tsCode;
    }

    addSamplesProtobufTsCode(protobufTsCode) {
        this._protobufSamplesTsCode = protobufTsCode;
    }

    set version(value) {
        this._version = value
    }

    make() {
        fs.writeFileSync(this._inputSamplesPath, this._samplesTsCode);
        fs.writeFileSync(this._outputSamplesPath, this._protobufSamplesTsCode);
    }

    clear() {
        if (fs.existsSync(this._inputSamplesPath)) {
            fs.rmSync(this._inputSamplesPath);
        }
        if (fs.existsSync(this._outputSamplesPath)) {
            fs.rmSync(this._outputSamplesPath);
        }
    }
}