# @observertc/samples-encoder

[![npm version](https://badge.fury.io/js/@observertc%2Fsamples-encoder.svg)](https://badge.fury.io/js/@observertc%2Fsamples-encoder)
[![License](https://img.shields.io/badge/License-Apache%202.0-blue.svg)](https://opensource.org/licenses/Apache-2.0)

Binary encoder for ObserveRTC WebRTC client-side observability samples. This library provides encoding of WebRTC statistics using differential compression and Protocol Buffers for transport optimization.

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Installation](#installation)
- [Quick Start](#quick-start)
- [Constructor Options](#constructor-options)
- [Real-World Example with Client Monitor](#real-world-example-with-client-monitor)
- [Encoding Strategy](#encoding-strategy)
- [API Reference](#api-reference)
- [Performance](#performance)
- [Advanced Usage](#advanced-usage)
- [Integration Examples](#integration-examples)
- [Troubleshooting](#troubleshooting)
- [Contributing](#contributing)

## Overview

The ObserveRTC ClientSampleEncoder transforms WebRTC client-side observability data into compressed binary formats for transmission. It achieves size reductions through:

1. **Differential Encoding** - Only transmitting changes since the last sample
2. **Protocol Buffer Serialization** - Binary encoding format
3. **UUID Optimization** - Efficient encoding of UUID identifiers
4. **Stateful Compression** - Maintaining state across encoding operations

## Features

### 🚀 **Optimized Performance**

- **Size Reduction** - Compression through differential encoding
- **Efficient Encoding** - Designed for real-time applications
- **Memory Conscious** - Reusable encoder instances

### 📦 **Client-Side Sample Support**

- **ClientSample** - Complete client-side statistics encoding
- **PeerConnectionSample** - WebRTC peer connection metrics encoding
- **RTP Statistics** - Inbound and outbound RTP stream encoding
- **ICE Statistics** - ICE candidate and transport encoding

### 🔧 **Flexible Output Formats**

- **Base64 Strings** - Web-safe string encoding for HTTP transport
- **Uint8Array** - Binary data for WebSocket or other binary transports
- **Protocol Buffers** - Direct protobuf message access

### 🛡️ **Production Ready**

- **TypeScript Support** - Full type safety and IntelliSense
- **Error Handling** - Comprehensive error reporting and recovery
- **Stateful Operations** - Automatic state management for optimal compression

## Installation

```bash
npm install @observertc/samples-encoder
```

### Peer Dependencies

```bash
# Required for type definitions
npm install @observertc/sample-schemas-js

# Protocol Buffers runtime (automatically included)
# @bufbuild/protobuf is included as a dependency
```

## Quick Start

### Basic ClientSample Encoding

```typescript
import { ClientSampleEncoder } from "@observertc/samples-encoder";
import type { ClientSample } from "@observertc/sample-schemas-js";

// Create encoder instance
const encoder = new ClientSampleEncoder("client-123");

// Prepare sample data
const clientSample: ClientSample = {
  timestamp: Date.now(),
  clientId: "client-123",
  callId: "call-456",
  sampleSeq: 1,
  score: 0.85,
  scoreReasons: "Good connection quality",
  peerConnections: [
    {
      peerConnectionId: "pc-789",
      timestamp: Date.now(),
      score: 0.90,
      scoreReasons: "Excellent audio quality",
      inboundRtps: [
        {
          ssrc: 12345,
          packetsReceived: 100,
          packetsLost: 2,
          jitter: 0.015,
        },
      ],
    },
  ],
};

// Encode to Base64 (ideal for HTTP/JSON transport)
const base64Encoded = encoder.encodeToBase64(clientSample);
console.log(`Encoded size: ${base64Encoded.length} characters`);

// Encode to binary (ideal for WebSocket transport)
const binaryEncoded = encoder.encodeToBytes(clientSample);
console.log(`Binary size: ${binaryEncoded.length} bytes`);

// Send via your transport mechanism
sendToServer(base64Encoded);
```

## Constructor Options

### ClientSampleEncoder Constructor

```typescript
constructor(clientId: string, settings?: Partial<ClientSampleEncoderSettings>)
```

#### Parameters

- **`clientId`** (required): The unique identifier for the client. This is encoded once and reused across all samples from this encoder instance.

- **`settings`** (optional): Configuration options for encoding behavior.

#### Settings Interface

```typescript
interface ClientSampleEncoderSettings {
  clientIdIsUuid?: boolean;
  callIdIsUuid?: boolean; 
  peerConnectionIdIsUuid?: boolean;
  trackIdIsUuid?: boolean;
}
```

#### Settings Explanation

- **`clientIdIsUuid`** (default: `false`)
  - When `true`: Encodes the `clientId` as a compact 16-byte UUID representation
  - When `false`: Encodes the `clientId` as a UTF-8 string
  - **Use case**: Set to `true` if your client IDs are UUIDs (e.g., "550e8400-e29b-41d4-a716-446655440000") to save ~20 bytes per encoding

- **`callIdIsUuid`** (default: `false`)
  - When `true`: Encodes `callId` fields as compact 16-byte UUID representations
  - When `false`: Encodes `callId` fields as UTF-8 strings
  - **Use case**: Set to `true` if your call IDs are UUIDs to optimize encoding size

- **`peerConnectionIdIsUuid`** (default: `false`)
  - When `true`: Encodes `peerConnectionId` fields as compact 16-byte UUID representations
  - When `false`: Encodes `peerConnectionId` fields as UTF-8 strings
  - **Use case**: Set to `true` if your peer connection IDs are UUIDs

- **`trackIdIsUuid`** (default: `false`)
  - When `true`: Encodes `trackId` fields in RTP statistics as compact 16-byte UUID representations
  - When `false`: Encodes `trackId` fields as UTF-8 strings
  - **Use case**: Set to `true` if your WebRTC track IDs are UUIDs

#### Constructor Examples

```typescript
// Basic usage with string IDs
const encoder1 = new ClientSampleEncoder("web-client-001");

// Optimized for UUID-based identifiers
const encoder2 = new ClientSampleEncoder("550e8400-e29b-41d4-a716-446655440000", {
  clientIdIsUuid: true,
  callIdIsUuid: true,
  peerConnectionIdIsUuid: true,
  trackIdIsUuid: true
});

// Mixed approach - only some IDs are UUIDs
const encoder3 = new ClientSampleEncoder("client-123", {
  callIdIsUuid: true,      // Call IDs are UUIDs
  peerConnectionIdIsUuid: false,  // PC IDs are strings like "pc-1", "pc-2"
  trackIdIsUuid: false     // Track IDs are strings
});

// Encoder for production with optimized settings
const productionEncoder = new ClientSampleEncoder(clientId, {
  clientIdIsUuid: true,    // 36-char UUID -> 16 bytes (56% space saving)
  callIdIsUuid: true,      // Conference room UUIDs
  peerConnectionIdIsUuid: false,  // Generated strings like "RTCPeerConnection_1"
  trackIdIsUuid: false     // WebRTC track IDs are typically not UUIDs
});
```

#### Performance Impact of Settings

| Setting | String Size | UUID Size | Space Saving |
|---------|-------------|-----------|--------------|
| 36-char UUID | ~38 bytes | 16 bytes | ~58% |
| 20-char string | ~22 bytes | N/A | Use string encoding |
| 10-char string | ~12 bytes | N/A | Use string encoding |

**Recommendation**: Only set UUID flags to `true` if your identifiers are actual UUIDs. Using UUID encoding on non-UUID strings will cause encoding errors.

## Real-World Example with Client Monitor

For practical applications, use `@observertc/client-monitor-js` to automatically collect real WebRTC statistics and encode them:

### Installation

```bash
npm install @observertc/client-monitor-js @observertc/samples-encoder
```

### Complete Integration Example

```typescript
import { ClientMonitor } from "@observertc/client-monitor-js";
import { ClientSampleEncoder } from "@observertc/samples-encoder";

class WebRTCAnalytics {
  private monitor: ClientMonitor;
  private encoder: ClientSampleEncoder;

  constructor(private peerConnection: RTCPeerConnection, clientId: string) {
    // Initialize client monitor with your peer connection
    this.monitor = new ClientMonitor({
      collectingPeriodInMs: 5000, // Collect stats every 5 seconds
      samplingPeriodInMs: 1000, // Sample WebRTC stats every second
    });

    // Create encoder with optimized settings for your ID format
    this.encoder = new ClientSampleEncoder(clientId, {
      clientIdIsUuid: clientId.includes('-'), // Auto-detect UUID format
      callIdIsUuid: true, // Assuming call IDs are UUIDs
      peerConnectionIdIsUuid: false, // PC IDs are typically strings
    });

    // Start monitoring
    this.monitor.addStatsProvider(peerConnection);
    this.monitor.onSampleCreated = this.handleSample.bind(this);
  }

  private handleSample(clientSample: ClientSample): void {
    try {
      // Encode the real ClientSample data
      const encodedData = this.encoder.encodeToBase64(clientSample);

      // Send to your analytics backend
      this.sendToAnalytics(encodedData, clientSample);

      console.log(
        `Encoded ${clientSample.peerConnections?.length} peer connections`
      );
      console.log(`Compressed size: ${encodedData.length} characters`);
    } catch (error) {
      console.error("Failed to encode client sample:", error);
    }
  }

  private async sendToAnalytics(
    encodedData: string,
    originalSample: ClientSample
  ): Promise<void> {
    // Calculate compression ratio
    const originalSize = JSON.stringify(originalSample).length;
    const encodedSize = encodedData.length * 1.33; // Base64 overhead
    const compressionRatio = (1 - encodedSize / originalSize) * 100;

    try {
      await fetch("/api/webrtc-analytics", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          data: encodedData,
          metadata: {
            timestamp: originalSample.timestamp,
            clientId: originalSample.clientId,
            compressionRatio: `${compressionRatio.toFixed(1)}%`,
            originalSize: originalSize,
            encodedSize: Math.round(encodedSize),
          },
        }),
      });

      console.log(
        `✅ Sent analytics data (${compressionRatio.toFixed(1)}% compression)`
      );
    } catch (error) {
      console.error("❌ Failed to send analytics:", error);
    }
  }

  public start(): void {
    this.monitor.start();
    console.log("🚀 Started WebRTC monitoring and encoding");
  }

  public stop(): void {
    this.monitor.stop();
    console.log("⏹️ Stopped WebRTC monitoring");
  }
}

// Usage in your WebRTC application
async function setupWebRTCWithAnalytics() {
  const peerConnection = new RTCPeerConnection({
    iceServers: [{ urls: "stun:stun.l.google.com:19302" }],
  });

  // Initialize analytics with real monitoring
  const clientId = crypto.randomUUID(); // UUID format
  const analytics = new WebRTCAnalytics(peerConnection, clientId);

  // Start collecting and encoding real WebRTC stats
  analytics.start();

  // Your WebRTC application setup...
  const localStream = await navigator.mediaDevices.getUserMedia({
    video: true,
    audio: true,
  });

  localStream.getTracks().forEach((track) => {
    peerConnection.addTrack(track, localStream);
  });

  // WebRTC negotiation...
  const offer = await peerConnection.createOffer();
  await peerConnection.setLocalDescription(offer);

  // The analytics will automatically collect and encode real statistics
  // from your active WebRTC session

  return { peerConnection, analytics };
}
```

## Encoding Strategy

### Differential Compression

The encoder achieves high compression ratios by only transmitting field changes:

```typescript
import { ClientSampleEncoder } from "@observertc/samples-encoder";

const encoder = new ClientSampleEncoder("client-1");

// First sample - full data transmitted
const sample1: ClientSample = {
  timestamp: 1000,
  clientId: "client-1",
  peerConnections: [
    {
      peerConnectionId: "pc-1",
      inboundRtps: [
        {
          id: "inbound-1",
          ssrc: 12345,
          packetsReceived: 100,
          packetsLost: 1,
        },
      ],
    },
  ],
};

const encoded1 = encoder.encodeToBase64(sample1);
console.log(`Full sample size: ${encoded1.length}`);

// Second sample - only changes transmitted
const sample2: ClientSample = {
  timestamp: 2000, // Changed
  clientId: "client-1", // Same (not transmitted)
  peerConnections: [
    {
      peerConnectionId: "pc-1", // Same (not transmitted)
      inboundRtps: [
        {
          id: "inbound-1", // Same (not transmitted)
          ssrc: 12345, // Same (not transmitted)
          packetsReceived: 150, // Changed (+50)
          packetsLost: 2, // Changed (+1)
        },
      ],
    },
  ],
};

const encoded2 = encoder.encodeToBase64(sample2);
console.log(`Differential size: ${encoded2.length}`); // Much smaller!
```

### Protocol Buffer Optimization

ClientSample is optimized with custom Protocol Buffer schemas:

```protobuf
// Simplified example of ClientSample protobuf schema
message ClientSample {
  optional int64 timestamp = 1;
  optional bytes clientId = 2;
  optional bytes callId = 3;
  optional double score = 4;
  optional string scoreReasons = 5;
  repeated PeerConnectionSample peerConnections = 6;
  // ... other fields
}

message PeerConnectionSample {
  optional bytes peerConnectionId = 1;
  optional double score = 2;
  optional string scoreReasons = 3;
  repeated InboundRtpStats inboundRtps = 4;
  repeated OutboundRtpStats outboundRtps = 5;
  // ... other nested types
}
```

## API Reference

### ClientSampleEncoder

Specialized encoder for client-side WebRTC samples:

```typescript
class ClientSampleEncoder {
  /**
   * Create a new ClientSampleEncoder
   * @param clientId - The unique identifier for this client
   * @param settings - Optional encoding configuration
   */
  constructor(clientId: string, settings?: Partial<ClientSampleEncoderSettings>);

  /**
   * Encode client sample to Base64
   * @param sample - Client sample data
   * @returns Base64 encoded string
   */
  encodeToBase64(sample: ClientSample): string;

  /**
   * Encode client sample to binary
   * @param sample - Client sample data
   * @returns Uint8Array containing binary data
   */
  encodeToBytes(sample: ClientSample): Uint8Array;

  /**
   * Get current encoder state for debugging
   * @returns Internal encoder state
   */
  getState(): any;

  /**
   * Reset encoder state (clears differential compression cache)
   */
  reset(): void;

  /**
   * Check if encoder was used in last encoding cycle
   * @returns true if encoder processed data recently
   */
  get visited(): boolean;

  /**
   * Access encoder settings
   */
  readonly settings: ClientSampleEncoderSettings;
}

interface ClientSampleEncoderSettings {
  clientIdIsUuid?: boolean;
  callIdIsUuid?: boolean;
  peerConnectionIdIsUuid?: boolean;
  trackIdIsUuid?: boolean;
}
```

## Performance

The encoder utilizes differential compression and Protocol Buffer serialization to reduce data size for transport. Performance characteristics will vary based on:

- Sample complexity and size
- Frequency of data changes (differential encoding is more effective with incremental updates)
- Hardware specifications
- JavaScript engine optimizations

For optimal performance:
- Reuse encoder instances to maintain compression state
- Consider batching multiple samples when possible
- Monitor memory usage in long-running applications

## Advanced Usage

### Custom Encoding Pipeline

```typescript
import { ClientSampleEncoder } from "@observertc/samples-encoder";

class CustomWebRTCEncoder {
  private encoder: ClientSampleEncoder;

  constructor(clientId: string) {
    this.encoder = new ClientSampleEncoder(clientId, {
      clientIdIsUuid: true,
      callIdIsUuid: true,
    });
  }

  encodeClientSample(sample: ClientSample): Uint8Array {
    // Pre-process sample data
    const optimizedSample = this.preprocessSample(sample);

    // Apply custom compression
    const compressedSample = this.applyCustomCompression(optimizedSample);

    // Encode with differential compression
    return this.encoder.encodeToBytes(compressedSample);
  }

  private preprocessSample(sample: ClientSample): ClientSample {
    // Remove unnecessary fields for bandwidth optimization
    return {
      ...sample,
      peerConnections: sample.peerConnections?.map((pc) => ({
        ...pc,
        // Keep only essential RTP statistics
        inboundRtps: pc.inboundRtps?.filter(
          (rtp) => rtp.packetsReceived && rtp.packetsReceived > 0
        ),
        outboundRtps: pc.outboundRtps?.filter(
          (rtp) => rtp.packetsSent && rtp.packetsSent > 0
        ),
      })),
    };
  }

  private applyCustomCompression(sample: ClientSample): ClientSample {
    // Custom field-level optimizations
    return {
      ...sample,
      peerConnections: sample.peerConnections?.map((pc) => ({
        ...pc,
        // Round floating point values to reduce precision
        score: pc.score ? Math.round(pc.score * 100) / 100 : undefined,
        inboundRtps: pc.inboundRtps?.map((rtp) => ({
          ...rtp,
          jitter: rtp.jitter ? Math.round(rtp.jitter * 1000) / 1000 : undefined,
          framesPerSecond: rtp.framesPerSecond
            ? Math.round(rtp.framesPerSecond)
            : undefined,
        })),
      })),
    };
  }
}
```

### Batch Encoding

```typescript
import { ClientSampleEncoder } from "@observertc/samples-encoder";

class BatchClientEncoder {
  private encoder: ClientSampleEncoder;
  private sampleBuffer: ClientSample[] = [];
  private batchSize = 10;

  constructor(clientId: string) {
    this.encoder = new ClientSampleEncoder(clientId);
  }

  addSample(sample: ClientSample) {
    this.sampleBuffer.push(sample);

    if (this.sampleBuffer.length >= this.batchSize) {
      this.flushBatch();
    }
  }

  private flushBatch() {
    if (this.sampleBuffer.length === 0) return;

    // Encode each sample in sequence for optimal differential compression
    const encodedSamples = this.sampleBuffer.map(sample => 
      this.encoder.encodeToBase64(sample)
    );

    // Send batch to server
    this.sendBatch(encodedSamples);

    // Clear buffer
    this.sampleBuffer = [];
  }

  private sendBatch(encodedSamples: string[]) {
    fetch("/api/webrtc-samples", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ samples: encodedSamples }),
    });
  }
}
```

### Stream Processing

```typescript
import { ClientSampleEncoder } from "@observertc/samples-encoder";

class StreamingClientEncoder {
  private encoder: ClientSampleEncoder;
  private compressionStats = {
    totalSamples: 0,
    totalOriginalSize: 0,
    totalEncodedSize: 0,
  };

  constructor(clientId: string) {
    this.encoder = new ClientSampleEncoder(clientId);
  }

  *encodeStream(sampleStream: Iterable<ClientSample>): Generator<Uint8Array> {
    for (const sample of sampleStream) {
      // Estimate original size
      const originalSize = JSON.stringify(sample).length;

      // Encode sample
      const encoded = this.encoder.encodeToBytes(sample);

      // Update statistics
      this.compressionStats.totalSamples++;
      this.compressionStats.totalOriginalSize += originalSize;
      this.compressionStats.totalEncodedSize += encoded.length;

      yield encoded;
    }
  }

  getCompressionRatio(): number {
    if (this.compressionStats.totalOriginalSize === 0) return 0;

    return (
      1 -
      this.compressionStats.totalEncodedSize /
        this.compressionStats.totalOriginalSize
    );
  }

  getStats() {
    return {
      ...this.compressionStats,
      compressionRatio: this.getCompressionRatio(),
      avgOriginalSize:
        this.compressionStats.totalOriginalSize /
        this.compressionStats.totalSamples,
      avgEncodedSize:
        this.compressionStats.totalEncodedSize /
        this.compressionStats.totalSamples,
    };
  }
}
```

## Integration Examples

### React Hook Integration

```typitten
import { useEffect, useRef, useState } from "react";
import { ClientMonitor } from "@observertc/client-monitor-js";
import { ClientSampleEncoder } from "@observertc/samples-encoder";

function useWebRTCEncoder(peerConnection: RTCPeerConnection | null, clientId: string) {
  const monitorRef = useRef<ClientMonitor | null>(null);
  const encoderRef = useRef(new ClientSampleEncoder(clientId, {
    clientIdIsUuid: clientId.includes('-'),
  }));
  
  const [analyticsData, setAnalyticsData] = useState<{
    samplesCollected: number;
    totalDataSent: number;
    avgCompressionRatio: number;
  }>({
    samplesCollected: 0,
    totalDataSent: 0,
    avgCompressionRatio: 0,
  });

  useEffect(() => {
    if (!peerConnection) return;

    // Create monitor instance
    const monitor = new ClientMonitor({
      collectingPeriodInMs: 5000,
      samplingPeriodInMs: 1000,
    });

    monitor.addStatsProvider(peerConnection);

    monitor.onSampleCreated = (clientSample: ClientSample) => {
      // Encode real WebRTC data
      const encodedData = encoderRef.current.encodeToBase64(clientSample);

      // Calculate metrics
      const originalSize = JSON.stringify(clientSample).length;
      const encodedSize = encodedData.length * 1.33;
      const compressionRatio = (1 - encodedSize / originalSize) * 100;

      // Update analytics state
      setAnalyticsData((prev) => ({
        samplesCollected: prev.samplesCollected + 1,
        totalDataSent: prev.totalDataSent + encodedData.length,
        avgCompressionRatio: (prev.avgCompressionRatio + compressionRatio) / 2,
      }));

      // Send to backend
      sendEncodedData(encodedData);
    };

    monitor.start();
    monitorRef.current = monitor;

    return () => {
      monitor.stop();
      monitorRef.current = null;
    };
  }, [peerConnection, clientId]);

  const sendEncodedData = async (encodedData: string) => {
    try {
      await fetch("/api/webrtc-stats", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ data: encodedData }),
      });
    } catch (error) {
      console.error("Failed to send encoded data:", error);
    }
  };

  return {
    analyticsData,
    stop: () => monitorRef.current?.stop(),
  };
}

// Usage in React component
function VideoCallComponent() {
  const [peerConnection, setPeerConnection] =
    useState<RTCPeerConnection | null>(null);
  const clientId = useMemo(() => crypto.randomUUID(), []);
  const { analyticsData, stop } = useWebRTCEncoder(peerConnection, clientId);

  useEffect(() => {
    const pc = new RTCPeerConnection();
    setPeerConnection(pc);

    return () => {
      stop();
      pc.close();
    };
  }, []);

  return (
    <div>
      <h3>WebRTC Analytics</h3>
      <p>Client ID: {clientId}</p>
      <p>Samples Collected: {analyticsData.samplesCollected}</p>
      <p>Data Sent: {(analyticsData.totalDataSent / 1024).toFixed(2)} KB</p>
      <p>Avg Compression: {analyticsData.avgCompressionRatio.toFixed(1)}%</p>
    </div>
  );
}
```

### WebSocket Integration

```typescript
import { ClientSampleEncoder } from "@observertc/samples-encoder";

class WebRTCWebSocketClient {
  private encoder: ClientSampleEncoder;
  private ws: WebSocket;

  constructor(clientId: string, websocketUrl: string) {
    this.encoder = new ClientSampleEncoder(clientId, {
      clientIdIsUuid: true,
      callIdIsUuid: true,
    });
    
    this.ws = new WebSocket(websocketUrl);
    this.setupWebSocket();
  }

  private setupWebSocket() {
    this.ws.onopen = () => {
      console.log("WebSocket connected");
      
      // Send client identification
      this.ws.send(JSON.stringify({
        type: "client-connected",
        clientId: this.encoder.settings,
      }));
    };

    this.ws.onmessage = (event) => {
      const message = JSON.parse(event.data);
      
      if (message.type === "request-stats") {
        this.sendCurrentStats();
      }
    };
  }

  public sendClientSample(sample: ClientSample) {
    try {
      // Encode as binary for WebSocket
      const encodedData = this.encoder.encodeToBytes(sample);
      
      // Send binary data
      this.ws.send(encodedData);
      
      console.log(`Sent ${encodedData.length} bytes via WebSocket`);
    } catch (error) {
      console.error("Failed to encode and send sample:", error);
    }
  }

  private async sendCurrentStats() {
    // Get current WebRTC stats and send
    if (this.peerConnection) {
      const stats = await this.peerConnection.getStats();
      const sample = this.convertStatsToSample(stats);
      this.sendClientSample(sample);
    }
  }
}
```

## Troubleshooting

### Common Issues

#### Large Encoded Sizes

```typescript
// Problem: Encoded samples larger than expected
const encoder = new ClientSampleEncoder("client-123");

// Solution 1: Reset encoder state periodically
setInterval(() => {
  encoder.reset(); // Clear differential state
}, 60000); // Every minute

// Solution 2: Filter unnecessary data
function optimizeSample(sample: ClientSample): ClientSample {
  return {
    ...sample,
    peerConnections: sample.peerConnections?.map((pc) => ({
      ...pc,
      // Remove empty arrays
      inboundRtps: pc.inboundRtps?.filter((rtp) => rtp.packetsReceived > 0),
      outboundRtps: pc.outboundRtps?.filter((rtp) => rtp.packetsSent > 0),
      // Remove undefined/null nested objects
      iceCandidatePairs: pc.iceCandidatePairs?.filter((pair) => pair.state),
    })),
  };
}
```

#### Memory Leaks

```typescript
// Problem: Encoder consuming too much memory
class ManagedClientEncoder {
  private encoder: ClientSampleEncoder;
  private sampleCount = 0;
  private readonly resetInterval = 100; // Reset every 100 samples

  constructor(clientId: string) {
    this.encoder = new ClientSampleEncoder(clientId);
  }

  encode(sample: ClientSample): string {
    // Periodic reset to prevent memory buildup
    if (++this.sampleCount % this.resetInterval === 0) {
      this.encoder.reset();
    }

    return this.encoder.encodeToBase64(sample);
  }
}
```

#### UUID Encoding Errors

```typescript
// Problem: Using UUID settings with non-UUID strings
const encoder = new ClientSampleEncoder("client-123", {
  clientIdIsUuid: true, // ❌ Wrong! "client-123" is not a UUID
});

// Solution: Verify ID format before setting UUID flags
function createOptimizedEncoder(clientId: string) {
  const isUuidFormat = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(clientId);
  
  return new ClientSampleEncoder(clientId, {
    clientIdIsUuid: isUuidFormat,
    callIdIsUuid: true, // Assume call IDs are always UUIDs
    peerConnectionIdIsUuid: false, // PC IDs are typically strings
  });
}
```

### Debug Mode

```typescript
import { ClientSampleEncoder } from "@observertc/samples-encoder";

class DebuggableClientEncoder {
  private encoder: ClientSampleEncoder;
  private debug = process.env.NODE_ENV === "development";

  constructor(clientId: string) {
    this.encoder = new ClientSampleEncoder(clientId, {
      clientIdIsUuid: clientId.includes('-'),
    });
  }

  encode(sample: ClientSample): string {
    if (this.debug) {
      const originalSize = JSON.stringify(sample).length;
      console.log(`Original sample size: ${originalSize} bytes`);
    }

    const encoded = this.encoder.encodeToBase64(sample);

    if (this.debug) {
      console.log(`Encoded size: ${encoded.length} characters`);
      console.log(
        `Compression ratio: ${
          (1 - (encoded.length / JSON.stringify(sample).length) * 1.33) * 100
        }%`
      );
      console.log("Encoder visited:", this.encoder.visited);
    }

    return encoded;
  }
}
```

## Contributing

We welcome contributions to improve the encoder performance and capabilities:

### Development Setup

```bash
git clone https://github.com/observertc/schemas.git
cd schemas/npm-samples-encoder
npm install
npm run build
```

### Guidelines

1. **Performance**: Maintain or improve encoding performance
2. **Compatibility**: Ensure backward compatibility with decoder
3. **Testing**: Add tests for new encoding features
4. **Documentation**: Update docs for API changes

---

**Part of the ObserveRTC Ecosystem** - Works seamlessly with [@observertc/samples-decoder](../npm-samples-decoder) and [@observertc/sample-schemas-js](../npm-samples-lib) for complete WebRTC observability solutions.
