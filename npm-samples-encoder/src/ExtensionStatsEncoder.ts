import { Encoder } from "./utils";
import { ExtensionStat as InputExtensionStats } from "./InputSamples";
import { StringToStringEncoder } from "./utils";
import { ClientSample_ExtensionStat } from "./OutputSamples";

export interface ExtensionStatsEncoder extends Encoder<InputExtensionStats, ClientSample_ExtensionStat> {
	// no additional methods
}

export class DefaultExtensionStatsEncoder implements ExtensionStatsEncoder {

	public reset(): void {
		// no-op
	}

  public encode(sample: InputExtensionStats): ClientSample_ExtensionStat {
    return new ClientSample_ExtensionStat({
      type: sample.type,
			payload: sample.payload,
    });
  }
}
