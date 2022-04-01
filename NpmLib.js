import fs from "fs";
import path from "path";
// import * as typedoc from "typedoc";

const README_MD_FILENAME = "README.md";
const INDEX_TS_FILENAME = "index.ts";
const PACKAGE_JSON_FILE = "package.json";

export class NpmLib {
    constructor(basePath) {
        this._basePath = basePath;
        this._srcPath = path.join(basePath, "src");
        this._entries = [];
        this._w3cStatsIdentifiers = null;
        this._version = null;
        this._changelog = null;
        this._protobufEntries = [];
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

    addProtobufSchema({ fileName, protobufSchema}) {
        this._protobufEntries.push({
            fileName,
            protobufSchema,
        })
    }

    addW3cStatsIdentifiers(w3cStatsIdentifiers) {
        this._w3cStatsIdentifiers = w3cStatsIdentifiers;
    }

    set version(value) {
        this._version = value
    }

    set changelog(value) {
        this._changelog = value;
    }

    make() {
        const toc = {};
        const exports = [];
        const schemaMarkdowns = [];
        for (const entry of this._entries) {
            const {
                schemaName,
                exports: moduleExports,
                schemaType,
                avsc,
                typescript,
                markdown,
            } = entry;
            const avscOutputFileName = path.join(schemaType, schemaName) + "Avsc";
            const avscOutputFilePath = path.join(this._srcPath, avscOutputFileName);
            const tsOutputFileName = path.join(schemaType, schemaName);
            const tsOutputFilePath = path.join(this._srcPath, tsOutputFileName);
            fs.writeFileSync(avscOutputFilePath + ".ts", "export const schema = " + avsc);
            fs.writeFileSync(tsOutputFilePath + ".ts", typescript);
            schemaMarkdowns.push(markdown, "\n");
            exports.push(`export { schema as Avro${schemaName} } from "./${avscOutputFileName}";`);
            exports.push(`export * from "./${tsOutputFileName}";`);
            if (!toc[schemaType]) {
                toc[schemaType] = [];
            }
            if (moduleExports && 0 < moduleExports.length) {
                for (const moduleExport of moduleExports) {
                    toc[schemaType].push(moduleExport);
                }
            }
        }
        for (const protobufEntry of this._protobufEntries) {
            const { fileName, protobufSchema } = protobufEntry;
            const protobufFileName = path.join(this._srcPath, "assets", fileName);
            fs.writeFileSync(protobufFileName, protobufSchema);
        }
        if (this._w3cStatsIdentifiers) {
            const w3cStatsIdentifiersPath = path.join(this._srcPath, "w3c", "W3cStatsIdentifiers.ts");
            fs.writeFileSync(w3cStatsIdentifiersPath, this._w3cStatsIdentifiers);
            exports.push(`export * as W3CStats from "./w3c/W3cStatsIdentifiers";`);
        }
        const readmeMd = ["ObserveRTC Schemas", "---", "Javascript bindings for ObserveRTC schemas"];
        for (const [schemaType, schemaNames] of Object.entries(toc)) {
            readmeMd.push(`- [${schemaType}](#${schemaType})`);
            for (const schemaName of schemaNames) {
                readmeMd.push(`\t* [${schemaName}](#${schemaName})`);
            }
        }
        if (this._changelog) {
            readmeMd.push(`- [Changelog](#Changelog)`);
        }
        readmeMd.push(...schemaMarkdowns);
        if (this._changelog) {
            readmeMd.push("## Changelog");
            readmeMd.push(this._changelog);
        }
        const readmePath = path.join(this._basePath, README_MD_FILENAME);
        fs.writeFileSync(readmePath, readmeMd.join("\n"));
        if (this._version) {
            const packagePath = path.join(this._basePath, PACKAGE_JSON_FILE);
            let packageText = fs.readFileSync(packagePath);
            const packageJson = JSON.parse(packageText);
            packageJson["version"] = this._version;
            packageText = JSON.stringify(packageJson, null, 2);
            fs.writeFileSync(packagePath, packageText);
            exports.push(`export const version = "${this._version}";`);
        }
        const indexPath = path.join(this._srcPath, INDEX_TS_FILENAME);
        fs.writeFileSync(indexPath, exports.join("\n"));
    }

    // async _generateDocs() {
    //     const app = new TypeDoc.Application();
    //     // If you want TypeDoc to load tsconfig.json / typedoc.json files
    //     app.options.addReader(new TypeDoc.TSConfigReader());
    //     app.options.addReader(new TypeDoc.TypeDocReader());

    //     app.bootstrap({
    //         // typedoc options here
    //         entryPoints: ["src/index.ts"],
    //     });

    //     const project = app.convert();

    //     if (project) {
    //         // Project may not have converted correctly
    //         const outputDir = "docs";

    //         // Rendered docs
    //         await app.generateDocs(project, outputDir);
    //         // Alternatively generate JSON output
    //         await app.generateJson(project, outputDir + "/documentation.json");
    //     }
    // }

    clear() {
        for (const schemaTypes of ["reports", "samples"]) {
            const schemasPath = path.join(this._srcPath, schemaTypes);
            for (const file of fs.readdirSync(schemasPath)) {
                const filePath = path.join(this._srcPath, schemaTypes, file);
                // console.log("Remove", filePath);
                fs.unlink(filePath, err => {
                    if (err) throw err;
                });
            }
        }
        const readmePath = path.join(this._srcPath, README_MD_FILENAME);
        if (fs.existsSync(readmePath)) {
            fs.unlink(readmePath, err => {
                if (err) throw err;
            });
        }
    }
}