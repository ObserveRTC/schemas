import { Encoder, stringToBytesArray } from "./utils";
import { ClientMetaData as InputClientMetaData } from "./InputSamples";
import { ClientSample_ClientMetaData, ClientSample_ClientMetaDataSchema } from "./OutputSamples";
import { create as createMessage, MessageInitShape } from "@bufbuild/protobuf";

export interface ClientMetaDataEncoder extends Encoder<InputClientMetaData, MessageInitShape<typeof ClientSample_ClientMetaDataSchema>> {
	// no additional methods
}

export class DefaultClientMetaDataEncoder implements Encoder<InputClientMetaData, MessageInitShape<typeof ClientSample_ClientMetaDataSchema>> {

	public reset(): void {
		// no-op
	}

  public encode(sample: InputClientMetaData): MessageInitShape<typeof ClientSample_ClientMetaDataSchema> {
    return {
     	type: sample.type,
		payload: sample.payload,
		peerConnectionId: sample.peerConnectionId ? stringToBytesArray(sample.peerConnectionId) : undefined,
		trackId: sample.trackId ? stringToBytesArray(sample.trackId) : undefined,
		ssrc: sample.ssrc ? BigInt(sample.ssrc) : undefined,
    };
  }
}
