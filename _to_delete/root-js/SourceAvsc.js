import fs from 'fs';
import { removeComments } from "./common.js";
import * as chunks from "./chunks.js";

export class SourceAvsc {
    constructor({ avsc, fileName, schemaType }) {
        this._fileName = fileName;
        this._schemaType = schemaType;
        this._source = avsc;
    }

    getSchemaType() {
        return this._schemaType;
    }

    getFileName() {
        return this._fileName;
    }

    getRaw() {
        return this._source;
    }

    getAvsc() {
        let result = this._source;
        result = chunks.paste(result);
        result = removeComments(result);
        const json = JSON.parse(result);
        result = JSON.stringify(json, null, 2);
        return result;
    }
}