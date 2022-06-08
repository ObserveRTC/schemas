
import { ProtobufConverter } from "./ProtobufConverter.js";
import { ProtobufConverterV3 } from "./ProtobufConverterV3.js";
import * as pbjs from "protobufjs/cli/pbjs.js";

export const makeProtobufJson = path => new Promise(resolve => {
    pbjs.main([ path ], function(err, output) {
        if (err)
            throw err;
        resolve(output);
    });
})

export function convertToProtobufSchema(avroSchema) {
    const samplesProto = ProtobufConverter.from(avroSchema);
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

export function convertToProtobufSchemaV3(avroSchema) {
    const samplesProto = ProtobufConverterV3.from(avroSchema);
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
