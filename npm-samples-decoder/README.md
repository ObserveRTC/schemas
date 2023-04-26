ObserveRTC Library for Decoding Samples
---

## API

### ClientSampleDecoder

```javascript
import { ClientSampleDecoder } from "@observertc/samples-decoder";
const decoder = new ClientSampleDecoder();

const encodedSample = // assign the received encded sample

const clientSample = decoder.decodeFromBase64(encodedSample);
```

### SfuSampleDecoder




