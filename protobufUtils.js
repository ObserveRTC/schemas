
import { ProtobufConverter } from "./ProtobufConverter.js";
import { ProtobufConverterV3 } from "./ProtobufConverterV3.js";
import * as pbjs from "protobufjs/cli/pbjs.js";
import { exec } from 'child_process';

const uuidFields = new Set(
        [
        "trackIdentifier",
        "remoteClientId",
        "callId",
        "clientId",
        "peerConnectionId",
        "trackId",
        "streamId",
        "sinkId",
        "sfuStreamId",
        "sfuSinkId",
        "sfuId",
        // "transportId",
        "padId",
        "channelId",
    ]
);

export const makeProtobufJson = path => new Promise(resolve => {
    pbjs.main([ path ], function(err, output) {
        if (err)
            throw err;
        resolve(output);
    });
})

export function convertToProtobufSchema(avroSchema, version) {
    const samplesProto = ProtobufConverter.from(avroSchema, version);
    const samplesProtoStr = samplesProto.toLines().join("\n");

    const samplesModule = [
        `syntax = "proto2";`,
        ``,
        `package org.observertc.schemas.protobuf;`,
        ``,
        // `option java_outer_classname = "Protobuf${samplesProto.name}";`,
        // `option java_package = "org.observertc.observer.samples";`,
        // ``,
        samplesProtoStr
    ].join("\n");
    return samplesModule;
    // fs.writeFileSync(outputPath, samplesModule);
}

export function convertToProtobufSchemaV3(avroSchema, version, allOptional = false) {
    const samplesProto = ProtobufConverterV3.from(avroSchema, version, uuidFields, allOptional);
    const samplesProtoStr = samplesProto.toLines().join("\n");

    const samplesModule = [
        `syntax = "proto3";`,
        ``,
        `package org.observertc.schemas.protobuf;`,
        ``,
        // `option java_outer_classname = "Protobuf${samplesProto.name}";`,
        // `option java_package = "org.observertc.observer.samples";`,
        // ``,
        samplesProtoStr
    ].join("\n");
    return samplesModule;
    // fs.writeFileSync(outputPath, samplesModule);
}


export async function createTypescriptModels(protoPath, genOutput) {
    await new Promise((resolve, reject) => {
        const command = [
            `PATH=$PATH:$(pwd)/node_modules/.bin`,
            `protoc`,
            // `./node_modules/.bin/protoc-gen-es`,
            `-I . `,
            `--es_out ${genOutput}`,
            `--es_opt target=ts`,
            protoPath
        ].join(" ");
        exec(command, (error, stdout, stderr) => {
            if (error) reject(error);
            else resolve();
        });
    });
}