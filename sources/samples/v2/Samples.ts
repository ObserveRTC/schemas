// @revision: 1

import { ClientSample } from "./ClientSample";
import { SfuSample } from "./SfuSample";

/**
 * A compound object hold samples and control flags
 */
export interface Samples {
    /**
     * array of client samples
     */
    clientSamples?: ClientSample[];

    /**
     * array of sfu samples
     */
    sfuSamples?: SfuSample[];

    // control flags
}