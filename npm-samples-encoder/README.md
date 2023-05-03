ObserveRTC Library for Encoding Samples
---

Monitor components provide samples in the ObserveRTC stack. This library is written to encode the provided transport and use as little bandwidth as possible for transportation. It achieves this by applying the following methods:

1. Calculate the difference between the last and the current sample.
2. Convert the delta sample to a Protobuf sample.


## API

### SamplesEncoder

```javascript
import { SamplesEncoder } from "@observertc/samples-encoder";

const encoder = new SamplesEncoder();
const encodedSample = encoder.encodeToBase64(samples);
// or if you want to Uint8Array
const encodedSampleArray = encoder.encodeToBytes(samples);

// send the encoded sample

```

### ClientSampleEncoder

```javascript
import { ClientSampleEncoder } from "@observertc/samples-encoder";

const encoder = new ClientSampleEncoder();
clientMonitor.on("sample-created", ({ clientSample }) => {
	const encodedSample = encoder.encodeToBase64(clientSample);
	// or if you want to Uint8Array
	const encodedSampleArray = encoder.encodeToBytes(clientSample);

	// send the encoded sample
});
```

### SfuSampleEncoder

```javascript
import { SfuSampleEncoder } from "@observertc/samples-encoder";

const encoder = new SfuSampleEncoder();
const encodedSample = encoder.encodeToBase64(sfuSample);
// or if you want to Uint8Array
const encodedSampleArray = encoder.encodeToUint8Array(sfuSample);

// send the encoded sample
```

## Performance

### ClientSampleEncoder

The following measurements were obtained by executing a test using one SFU and `N` number of participants joining the same SFU. The sampling and sending period was `5` seconds, the total time for the test was `60 ` seconds (12 samples). For `2`, `3`, and `5` participants, the measurements were taken from the last participant who joined the call.

|  | Min | Max | Median | Average |
|---|---|---|---|---|
| 1 participant | 0.32 | 2.27 | 0.34 | 0.50 |
| 2 participants | 0.73 | 4.44 | 0.78 | 1.08 |
| 3 participants | 0.96 | 4.90 | 1.06 | 1.37 |
| 5 participants | 1.59 | 5.74 | 1.65 | 1.96 |

The measurements are represent the size of the encoded message in KiloBytes



