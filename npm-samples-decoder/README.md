ObserveRTC Library for Decoding Samples
---

Monitor components provide samples in the ObserveRTC stack. This library is written to decode samples 
encoded by protobuf + object diffs (`@observertc/samples-encoder`). 

## API

### SamplesDecoder

```javascript
import { SamplesDecoder } from "@observertc/samples-decoder";
const decoder = new SamplesDecoder();

const encodedSamples = // assign the received encded sample

const samples = decoder.decodeFromBase64(encodedSamples);
```

### ClientSampleDecoder

```javascript
import { ClientSampleDecoder } from "@observertc/samples-decoder";
const decoder = new ClientSampleDecoder();

const encodedSample = // assign the received encded sample

const clientSample = decoder.decodeFromBase64(encodedSample);
```

### SfuSampleDecoder

```javascript
import { SfuSampleDecoder } from "@observertc/samples-decoder";
const decoder = new SfuSampleDecoder();

const encodedSample = // assign the received encded sample

const sfuSample = decoder.decodeFromBase64(encodedSample);
```