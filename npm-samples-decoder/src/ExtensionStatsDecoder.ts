import { Decoder } from "./utils";
import { ExtensionStat as OutputExtensionStats } from "./OutputSamples";
import { ClientSample_ExtensionStat as InputExtensionStats } from "./InputSamples";

const logger = console;

export interface ExtensionStatsDecoder extends Decoder<InputExtensionStats, OutputExtensionStats | undefined> {
    // no additional methods
}

export class DefaultExtensionStatsDecoder implements Decoder<InputExtensionStats, OutputExtensionStats | undefined> {

    public reset(): void {
        // no-op (maintains same pattern as encoder)
    }

    public decode(input: InputExtensionStats): OutputExtensionStats | undefined {
        if (!input.type) {
            logger.warn("Invalid extension stats sample: missing type");
            return undefined;
        }

        return {
            type: input.type,
            payload: input.payload, // payload is optional
        };
    }
}
