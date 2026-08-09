import { Encoder } from "./utils";
import { ExtensionStat as InputExtensionStats } from "./InputSamples";
import { ClientSample_ExtensionStat, ClientSample_ExtensionStatSchema } from "./OutputSamples";
import { create as createMessage, MessageInitShape } from "@bufbuild/protobuf";

export interface ExtensionStatsEncoder extends Encoder<InputExtensionStats, MessageInitShape<typeof ClientSample_ExtensionStatSchema>> {
	// no additional methods
}

export class DefaultExtensionStatsEncoder implements ExtensionStatsEncoder {

	public reset(): void {
		// no-op
	}

  public encode(sample: InputExtensionStats): MessageInitShape<typeof ClientSample_ExtensionStatSchema> {
    return {
      type: sample.type,
      payload: sample.payload,
    };
  }
}
