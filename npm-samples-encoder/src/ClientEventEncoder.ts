import { Encoder, NumberToBigIntEncoder, stringToBytesArray, StringToUint8ArrayEncoder } from "./utils";
import { ClientEvent as InputClientEvent } from "./InputSamples";
import {
  StringToStringEncoder,
} from "./utils";
import { ClientSample_ClientEvent } from "./OutputSamples";

export interface ClientEventEncoder extends Encoder<InputClientEvent, ClientSample_ClientEvent> {
	// no additional methods
}

export class DefaultClientEventEncoder implements ClientEventEncoder {

	public reset(): void {
		// no-op
	}

  public encode(sample: InputClientEvent): ClientSample_ClientEvent {
    return new ClientSample_ClientEvent({
      type: sample.type,
      payload: sample.payload,
      peerConnectionId: sample.peerConnectionId ? stringToBytesArray(sample.peerConnectionId) : undefined,
			trackId: sample.trackId ? stringToBytesArray(sample.trackId) : undefined,
			ssrc: sample.ssrc ? BigInt(sample.ssrc) : undefined,
		});
  }
}
