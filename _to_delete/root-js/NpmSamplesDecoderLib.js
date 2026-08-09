import fs from "fs";
import path from "path";
// import * as typedoc from "typedoc";

const PACKAGE_JSON_FILE = "package.json";

export class NpmSamplesDecoderLib {
    constructor() {
        this._basePath = './npm-samples-decoder';
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
        fs.writeFileSync(this._inputSamplesPath, this._protobufSamplesTsCode);
        fs.writeFileSync(this._outputSamplesPath, this._samplesTsCode);

        if (this._version) {
            const packagePath = path.join(this._basePath, PACKAGE_JSON_FILE);
            let packageText = fs.readFileSync(packagePath);
            const packageJson = JSON.parse(packageText);
            packageJson["version"] = this._version;
            packageText = JSON.stringify(packageJson, null, 2);
            fs.writeFileSync(packagePath, packageText);
        }
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