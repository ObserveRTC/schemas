ObserveRTC Client Sample Encoder
---

Encoder for ClientSamples. 
This encoder library developed for transporting ObserveRTC Samples from browser / SFU to a server using protobuf.


## API

### ClientSampleEncoder

### SfuSampleEncoder

## Performance

### ClientSampleEncoder

The following measurements were obtained by executing a test using one SFU and `N` number of participants joining the same SFU. The sampling and sending period was `5` seconds, the total time for the test was `60 ` seconds (12 samples), and the measurements are represent the size of the encoded message in bytes. For `2`, `3`, and `5` participants, the measurements were taken from the last participant who joined the call.

|  | Min | Max | Median | Average |
|---|---|---|---|---|
| 1 participant | 324 | 2279 | 343 | 507.16 |
| 2 participants | 735 | 4446 | 787 | 1081.58 |
| 3 participants | 960 | 4904 | 1060 | 1378.66 |
| 5 participants | 1595 | 5744 | 1651 | 1963.15 |



