import { Decoder, bytesArrayToString } from "./utils";
import { ClientMetaData as OutputClientMetaData } from "./OutputSamples";
import { ClientSample_ClientMetaData as InputClientMetaData } from "./InputSamples";
import { logger } from "./Logger";

export interface ClientMetaDataDecoder extends Decoder<InputClientMetaData, OutputClientMetaData | undefined> {
    // no additional methods
}

export class DefaultClientMetaDataDecoder implements Decoder<InputClientMetaData, OutputClientMetaData | undefined> {

    public reset(): void {
        // no-op
    }

    public decode(input: InputClientMetaData): OutputClientMetaData | undefined {
        if (!input.type) {
            logger.warn("Invalid client metadata sample: missing type");
            return undefined;
        }

        return {
            type: input.type,
            payload: input.payload,
            peerConnectionId: input.peerConnectionId ? bytesArrayToString(input.peerConnectionId) : undefined,
            trackId: input.trackId ? bytesArrayToString(input.trackId) : undefined,
            ssrc: input.ssrc ? Number(input.ssrc) : undefined,
        };
    }
}
