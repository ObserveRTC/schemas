import { Encoder, stringToBytesArray } from "./utils";
import { ClientMetaData as InputClientMetaData } from "./InputSamples";
import { ClientSample_ClientMetaData } from "./OutputSamples";

export interface ClientMetaDataEncoder extends Encoder<InputClientMetaData, ClientSample_ClientMetaData> {
	// no additional methods
}

export class DefaultClientMetaDataEncoder implements Encoder<InputClientMetaData, ClientSample_ClientMetaData> {

	public reset(): void {
		// no-op
	}

  public encode(sample: InputClientMetaData): ClientSample_ClientMetaData {
    return new ClientSample_ClientMetaData({
      type: sample.type,
			payload: sample.payload,
			peerConnectionId: sample.peerConnectionId ? stringToBytesArray(sample.peerConnectionId) : undefined,
			trackId: sample.trackId ? stringToBytesArray(sample.trackId) : undefined,
			ssrc: sample.ssrc ? BigInt(sample.ssrc) : undefined,
    });
  }
}
