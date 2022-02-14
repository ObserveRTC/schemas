import fs from "fs";
import path from "path";

const README_MD_FILENAME = "README.md";
const INDEX_TS_FILENAME = "index.ts";

export class NpmLib {
    constructor(basePath) {
        this._basePath = basePath;
        this._entries = [];
        this._w3cStatsIdentifiers = null;
    }

    addEntry({ schemaName, exports, fileName, schemaType, avsc, typescript, markdown }) {
        this._entries.push({
            fileName,
            exports,
            schemaName,
            schemaType,
            avsc,
            typescript,
            markdown,
        });
    }

    addW3cStatsIdentifiers(w3cStatsIdentifiers) {
        this._w3cStatsIdentifiers = w3cStatsIdentifiers;
    }

    make() {
        const exports = [];
        const readmeMd = ["ObserveRTC Schemas", "---", ""];
        for (const entry of this._entries) {
            const {
                schemaName,
                // exports: moduleExports,
                schemaType,
                avsc,
                typescript,
                markdown,
            } = entry;
            const avscOutputFileName = path.join(schemaType, schemaName) + "Avsc";
            const avscOutputFilePath = path.join(this._basePath, avscOutputFileName);
            const tsOutputFileName = path.join(schemaType, schemaName);
            const tsOutputFilePath = path.join(this._basePath, tsOutputFileName);
            fs.writeFileSync(avscOutputFilePath + ".ts", "export const schema = " + avsc);
            fs.writeFileSync(tsOutputFilePath + ".ts", typescript);
            readmeMd.push(markdown, "\n");
            exports.push(`export { schema as Avro${schemaName} } from "./${avscOutputFileName}";`);
            exports.push(`export * from "./${tsOutputFileName}";`);
        }
        if (this._w3cStatsIdentifiers) {
            const w3cStatsIdentifiersPath = path.join(this._basePath, "w3c", "W3cStatsIdentifiers.ts");
            fs.writeFileSync(w3cStatsIdentifiersPath, this._w3cStatsIdentifiers);
            exports.push(`export * as W3CStats from "./w3c/W3cStatsIdentifiers";`);
        }
        
        const readmePath = path.join(this._basePath, README_MD_FILENAME);
        fs.writeFileSync(readmePath, readmeMd.join("\n"));
        const indexPath = path.join(this._basePath, INDEX_TS_FILENAME);
        fs.writeFileSync(indexPath, exports.join("\n"));
    }

    clear() {
        for (const schemaTypes of ["reports", "samples"]) {
            const schemasPath = path.join(this._basePath, schemaTypes);
            for (const file of fs.readdirSync(schemasPath)) {
                const filePath = path.join(this._basePath, schemaTypes, file);
                // console.log("Remove", filePath);
                fs.unlink(filePath, err => {
                    if (err) throw err;
                });
            }
        }
        const readmePath = path.join(this._basePath, README_MD_FILENAME);
        if (fs.existsSync(readmePath)) {
            fs.unlink(readmePath, err => {
                if (err) throw err;
            });
        }
    }
}