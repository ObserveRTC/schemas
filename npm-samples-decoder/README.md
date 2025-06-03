# @observertc/samples-decoder

[![npm version](https://badge.fury.io/js/@observertc%2Fsamples-decoder.svg)](https://badge.fury.io/js/@observertc%2Fsamples-decoder)
[![License](https://img.shields.io/badge/License-Apache%202.0-blue.svg)](https://opensource.org/licenses/Apache-2.0)

Binary decoder for ObserveRTC WebRTC client-side observability samples. This library provides decoding of compressed WebRTC statistics back to their original format, enabling processing and analytics on the server side.

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Installation](#installation)
- [Quick Start](#quick-start)
- [Constructor Options](#constructor-options)
- [actualValue Property](#actualvalue-property)
- [Real-World Example with Client Monitor](#real-world-example-with-client-monitor)
- [Decoding Strategy](#decoding-strategy)
- [API Reference](#api-reference)
- [Performance](#performance)
- [Advanced Usage](#advanced-usage)
- [Integration Examples](#integration-examples)
- [Error Handling](#error-handling)
- [Troubleshooting](#troubleshooting)
- [Contributing](#contributing)

## Overview

The ObserveRTC ClientSampleDecoder reverses the compression process applied by the encoder, reconstructing full WebRTC client-side observability data from binary Protocol Buffer messages. It handles:

1. **Differential Decompression** - Reconstructs complete samples from delta changes
2. **Protocol Buffer Deserialization** - Binary data parsing
3. **State Management** - Maintains decoder state for accurate reconstruction
4. **Type Safety** - Full TypeScript support for decoded samples

## Features

### 🚀 **Optimized Performance**

- **Efficient Decoding** - Designed for real-time analytics
- **Memory Conscious** - Optimized memory usage with object pooling
- **Streaming Support** - Process samples as they arrive

### 📦 **Client-Side Sample Support**

- **ClientSample** - Decode client-side WebRTC statistics
- **PeerConnectionSample** - Decode peer connection metrics
- **RTP Statistics** - Decode inbound and outbound RTP stream data
- **ICE Statistics** - Decode ICE candidate and transport data

### 🔧 **Flexible Input Formats**

- **Base64 Strings** - Decode from HTTP/JSON transport
- **Uint8Array** - Decode from binary transports (WebSocket, gRPC)
- **Protocol Buffers** - Direct protobuf message processing

### 🛡️ **Production Ready**

- **TypeScript Support** - Full type safety and IntelliSense
- **Error Recovery** - Graceful handling of malformed data
- **Stateful Operations** - Automatic state reconstruction for differential decoding

## Installation

```bash
npm install @observertc/samples-decoder
```

### Peer Dependencies

```bash
# Required for type definitions
npm install @observertc/sample-schemas-js

# Protocol Buffers runtime (automatically included)
# @bufbuild/protobuf is included as a dependency
```

## Quick Start

### Basic ClientSample Decoding

```typescript
import { ClientSampleDecoder } from '@observertc/samples-decoder';
import type { ClientSample } from '@observertc/sample-schemas-js';

// Create decoder instance
const decoder = new ClientSampleDecoder();

// Decode from Base64 (from HTTP/JSON transport)
const base64EncodedData = "CgQIyAEQAhIFCgMIA.."; // From encoder
const decodedSample: ClientSample = decoder.decodeFromBase64(base64EncodedData);

// Decode from binary (from WebSocket transport)
const binaryData = new Uint8Array([...]); // From encoder
const decodedFromBinary: ClientSample = decoder.decodeFromBytes(binaryData);

// Access decoded data
if (decodedSample) {
  console.log(`Client ${decodedSample.clientId} at ${decodedSample.timestamp}`);

  decodedSample.peerConnections?.forEach(pcSample => {
    console.log(`PC ${pcSample.peerConnectionId} score: ${pcSample.score}`);

    pcSample.inboundRtps?.forEach(rtp => {
      console.log(`RTP ${rtp.ssrc}: ${rtp.packetsReceived} packets received`);
    });
  });
}
```

## Constructor Options

### ClientSampleDecoder Constructor

```typescript
constructor(settings?: Partial<ClientSampleDecoderSettings>)
```

#### Parameters

- **`settings`** (optional): Configuration options for decoding behavior that must match the encoder settings.

#### Settings Interface

```typescript
interface ClientSampleDecoderSettings {
  clientIdIsUuid?: boolean;
  callIdIsUuid?: boolean; 
  peerConnectionIdIsUuid?: boolean;
  trackIdIsUuid?: boolean;
}
```

#### Settings Explanation

- **`clientIdIsUuid`** (default: `false`)
  - When `true`: Decodes `clientId` from compact 16-byte UUID representation
  - When `false`: Decodes `clientId` from UTF-8 string
  - **Important**: Must match the encoder's `clientIdIsUuid` setting

- **`callIdIsUuid`** (default: `false`)
  - When `true`: Decodes `callId` fields from compact 16-byte UUID representations
  - When `false`: Decodes `callId` fields from UTF-8 strings
  - **Important**: Must match the encoder's `callIdIsUuid` setting

- **`peerConnectionIdIsUuid`** (default: `false`)
  - When `true`: Decodes `peerConnectionId` fields from compact 16-byte UUID representations
  - When `false`: Decodes `peerConnectionId` fields from UTF-8 strings
  - **Important**: Must match the encoder's `peerConnectionIdIsUuid` setting

- **`trackIdIsUuid`** (default: `false`)
  - When `true`: Decodes `trackId` fields in RTP statistics from compact 16-byte UUID representations
  - When `false`: Decodes `trackId` fields from UTF-8 strings
  - **Important**: Must match the encoder's `trackIdIsUuid` setting

#### Constructor Examples

```typescript
// Basic usage with string IDs
const decoder1 = new ClientSampleDecoder();

// Optimized for UUID-based identifiers (must match encoder settings)
const decoder2 = new ClientSampleDecoder({
  clientIdIsUuid: true,
  callIdIsUuid: true,
  peerConnectionIdIsUuid: true,
  trackIdIsUuid: true
});

// Mixed approach - only some IDs are UUIDs
const decoder3 = new ClientSampleDecoder({
  callIdIsUuid: true,      // Call IDs are UUIDs
  peerConnectionIdIsUuid: false,  // PC IDs are strings like "pc-1", "pc-2"
  trackIdIsUuid: false     // Track IDs are strings
});

// Production decoder with settings matching encoder
const productionDecoder = new ClientSampleDecoder({
  clientIdIsUuid: true,    // 16 bytes -> 36-char UUID
  callIdIsUuid: true,      // Conference room UUIDs
  peerConnectionIdIsUuid: false,  // Generated strings like "RTCPeerConnection_1"
  trackIdIsUuid: false     // WebRTC track IDs are typically not UUIDs
});
```

**Critical Note**: The decoder settings **must exactly match** the encoder settings that were used to encode the data. Mismatched settings will result in decoding errors or corrupted data.

## actualValue Property

### Why actualValue is Necessary

**Critical for Advanced Decoding Scenarios**: The `actualValue` property is essential when you need to manually control the differential decoding state. Differential encoding/decoding works by only transmitting changes between samples, not complete data. The decoder maintains an internal "baseline" state to reconstruct full samples from these delta changes.

**When Normal Decoding Isn't Enough**: In most cases, the decoder automatically manages this state as it processes a continuous stream of encoded samples. However, there are scenarios where you need to manually set or reset this baseline:

1. **🔄 Recovery from Connection Loss** - When your data stream is interrupted and you need to resume from a known state
2. **🎯 Precise State Control** - When testing or validating specific decoding behavior  
3. **⚖️ Load Balancing** - When synchronizing multiple decoder instances
4. **📊 Analytics Replay** - When replaying data streams from specific checkpoints

### Understanding Differential Decoding State

The `actualValue` property is a powerful feature that allows you to manually set the baseline state for differential decoding. This is particularly useful for advanced scenarios where you need precise control over the decoding process.

```typescript
interface ClientSampleDecoder {
  get actualValue(): ClientSample | undefined;
  set actualValue(sample: ClientSample | undefined);
}
```

### How actualValue Works

```typescript
import { ClientSampleDecoder } from '@observertc/samples-decoder';

const decoder = new ClientSampleDecoder();

// 1. Set a baseline sample manually
const baselineSample: ClientSample = {
  timestamp: 1000,
  clientId: "client-123",
  callId: "call-456",
  score: 0.8,
  scoreReasons: "Good quality",
  peerConnections: [
    {
      peerConnectionId: "pc-1",
      score: 0.85,
      inboundRtps: [
        {
          ssrc: 12345,
          packetsReceived: 100,
          packetsLost: 2,
        },
      ],
    },
  ],
};

// Set the baseline - this prepares the decoder for differential updates
decoder.actualValue = baselineSample;

// 2. Now decode differential updates
const encodedDifferentialUpdate = "..."; // From encoder with changes
const decodedUpdate = decoder.decodeFromBase64(encodedDifferentialUpdate);

// The decoder will apply the differential changes to the baseline
console.log(decodedUpdate.peerConnections[0].inboundRtps[0].packetsReceived); // e.g., 150 (100 + 50 change)
```

### Why This Matters: Differential Encoding Explained

```typescript
// Without actualValue - automatic state management
const decoder = new ClientSampleDecoder();

// First sample: encoder sends FULL data (establishes baseline)
const fullSample = decoder.decodeFromBase64("CgQIyAEQAh..."); // Complete sample
// Decoder now has internal baseline: packetsReceived = 100

// Second sample: encoder sends ONLY changes (+50 packets)
const deltaUpdate = decoder.decodeFromBase64("CgQI1AEQAx..."); // Only delta
// Decoder reconstructs: 100 + 50 = 150 packets

// With actualValue - manual state control
const controlledDecoder = new ClientSampleDecoder();

// You can set the baseline manually
controlledDecoder.actualValue = {
  // ... your known baseline sample
  peerConnections: [{ 
    inboundRtps: [{ packetsReceived: 100 }] 
  }]
};

// Now delta updates will be applied to YOUR baseline
const reconstructed = controlledDecoder.decodeFromBase64("CgQI1AEQAx...");
// Result: YOUR_baseline + delta = accurate reconstruction
```

### Use Cases for actualValue

#### 1. **Resuming Decoding After Interruption**

```typescript
class ResilientDecoder {
  private decoder = new ClientSampleDecoder();
  private lastKnownSample: ClientSample | null = null;

  decodeWithResumption(encodedData: string): ClientSample | null {
    try {
      return this.decoder.decodeFromBase64(encodedData);
    } catch (error) {
      if (this.lastKnownSample && error.message.includes('differential')) {
        // Reset decoder state with last known good sample
        console.log("Resuming decoder from last known state");
        this.decoder.actualValue = this.lastKnownSample;
        
        // Retry decoding
        return this.decoder.decodeFromBase64(encodedData);
      }
      throw error;
    }
  }

  onSuccessfulDecode(sample: ClientSample) {
    this.lastKnownSample = sample; // Save for potential recovery
  }
}
```

#### 2. **Synchronizing Multiple Decoders**

```typescript
class MultiStreamDecoder {
  private primaryDecoder = new ClientSampleDecoder();
  private backupDecoder = new ClientSampleDecoder();

  syncDecoders(referenceSample: ClientSample) {
    // Synchronize both decoders to the same state
    this.primaryDecoder.actualValue = referenceSample;
    this.backupDecoder.actualValue = referenceSample;
    
    console.log("Both decoders synchronized to timestamp:", referenceSample.timestamp);
  }

  decodeWithBackup(encodedData: string): ClientSample | null {
    try {
      const result = this.primaryDecoder.decodeFromBase64(encodedData);
      
      // Keep backup in sync
      if (result) {
        this.backupDecoder.actualValue = result;
      }
      
      return result;
    } catch (error) {
      console.warn("Primary decoder failed, switching to backup");
      return this.backupDecoder.decodeFromBase64(encodedData);
    }
  }
}
```

#### 3. **Testing and Validation**

```typescript
describe('ClientSampleDecoder differential behavior', () => {
  it('should correctly apply differential updates', () => {
    const decoder = new ClientSampleDecoder();
    
    // Set known baseline
    const baseline: ClientSample = {
      timestamp: 1000,
      clientId: "test-client",
      peerConnections: [{
        peerConnectionId: "test-pc",
        inboundRtps: [{
          ssrc: 123,
          packetsReceived: 100,
        }]
      }]
    };
    
    decoder.actualValue = baseline;
    
    // Encode a differential update separately
    const encoder = new ClientSampleEncoder("test-client");
    encoder.encodeToBase64(baseline); // Set encoder baseline
    
    const update: ClientSample = {
      ...baseline,
      timestamp: 2000,
      peerConnections: [{
        ...baseline.peerConnections[0],
        inboundRtps: [{
          ...baseline.peerConnections[0].inboundRtps[0],
          packetsReceived: 150, // +50 packets
        }]
      }]
    };
    
    const encodedUpdate = encoder.encodeToBase64(update);
    const decodedUpdate = decoder.decodeFromBase64(encodedUpdate);
    
    expect(decodedUpdate.peerConnections[0].inboundRtps[0].packetsReceived).toBe(150);
  });
});
```

#### 4. **Stream Replay and Analysis**

```typescript
class StreamReplayAnalyzer {
  private decoder = new ClientSampleDecoder();
  private samples: ClientSample[] = [];

  replayFromCheckpoint(checkpointSample: ClientSample, encodedUpdates: string[]) {
    // Start replay from a specific checkpoint
    this.decoder.actualValue = checkpointSample;
    this.samples = [checkpointSample];
    
    console.log(`Starting replay from timestamp ${checkpointSample.timestamp}`);
    
    for (const encodedUpdate of encodedUpdates) {
      const decoded = this.decoder.decodeFromBase64(encodedUpdate);
      if (decoded) {
        this.samples.push(decoded);
        this.analyzeQualityTrend(decoded);
      }
    }
  }

  private analyzeQualityTrend(sample: ClientSample) {
    if (this.samples.length >= 2) {
      const prev = this.samples[this.samples.length - 2];
      const current = sample;
      
      if (prev.score && current.score) {
        const trend = current.score - prev.score;
        console.log(`Quality trend: ${trend > 0 ? '↑' : trend < 0 ? '↓' : '→'} ${trend.toFixed(3)}`);
      }
    }
  }
}
```

### actualValue Best Practices

1. **Always check for null/undefined** before setting actualValue
2. **Use it sparingly** - Normal decoding doesn't require manual state management
3. **Ensure type compatibility** - The sample structure should match expected format
4. **Clean up resources** - Reset decoder when switching contexts

```typescript
// Good practice example
class ManagedDecoder {
  private decoder = new ClientSampleDecoder();

  setBaseline(sample: ClientSample | null) {
    if (sample && this.isValidSample(sample)) {
      this.decoder.actualValue = sample;
      console.log(`Decoder baseline set to timestamp ${sample.timestamp}`);
    } else {
      console.warn("Invalid baseline sample provided");
    }
  }

  private isValidSample(sample: ClientSample): boolean {
    return !!(sample.timestamp && sample.clientId);
  }

  reset() {
    this.decoder.reset();
    console.log("Decoder state cleared");
  }
}

## Real-World Example with Client Monitor

This example shows how to decode real WebRTC statistics that were collected using `@observertc/client-monitor-js` and encoded on the client side:

### Client-Side Data Collection and Encoding

First, the client side collects and encodes real WebRTC data:

```typescript
// Client-side code (browser)
import { ClientMonitor } from "@observertc/client-monitor-js";
import { SamplesEncoder } from "@observertc/samples-encoder";

const monitor = new ClientMonitor({
  collectingPeriodInMs: 5000,
  samplingPeriodInMs: 1000,
});

const encoder = new SamplesEncoder();

monitor.onSampleCreated = (clientSample: ClientSample) => {
  // Encode real WebRTC statistics
  const encodedData = encoder.encodeToBase64({
    clientSamples: [clientSample],
  });

  // Send to server for analysis
  fetch("/api/webrtc-analytics", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      data: encodedData,
      timestamp: Date.now(),
      clientId: clientSample.clientId,
    }),
  });
};

monitor.addStatsProvider(peerConnection);
monitor.start();
```

### Server-Side Decoding and Analytics

The server receives and decodes the real WebRTC data for analysis:

```typescript
import express from "express";
import { SamplesDecoder } from "@observertc/samples-decoder";

const app = express();
const decoder = new SamplesDecoder();

// Analytics storage and processing
class WebRTCAnalyticsProcessor {
  private qualityHistory = new Map<
    string,
    Array<{ timestamp: number; score: number }>
  >();
  private rtpMetrics = new Map<
    string,
    Array<{ timestamp: number; packetsLost: number; jitter: number }>
  >();

  async processDecodedSamples(
    samples: Samples,
    metadata: { timestamp: number; clientId: string }
  ) {
    if (!samples.clientSamples) return;

    for (const clientSample of samples.clientSamples) {
      await this.analyzeClientSample(clientSample, metadata);
    }
  }

  private async analyzeClientSample(clientSample: ClientSample, metadata: any) {
    const clientId = clientSample.clientId;

    // Process peer connection quality scores
    clientSample.peerConnectionSamples?.forEach((pcSample) => {
      if (pcSample.score !== undefined) {
        this.addQualityScore(clientId, {
          timestamp: pcSample.timestamp,
          score: pcSample.score,
        });
      }

      // Analyze RTP statistics
      pcSample.inboundRtps?.forEach((rtp) => {
        if (rtp.packetsLost !== undefined && rtp.jitter !== undefined) {
          this.addRtpMetrics(clientId, {
            timestamp: rtp.timestamp || pcSample.timestamp,
            packetsLost: rtp.packetsLost,
            jitter: rtp.jitter,
          });
        }
      });
    });

    // Generate insights
    const insights = this.generateClientInsights(clientId);
    console.log(`📊 Client ${clientId} insights:`, insights);

    // Store in database or send alerts
    await this.storeAnalytics(clientId, clientSample, insights);
  }

  private addQualityScore(
    clientId: string,
    score: { timestamp: number; score: number }
  ) {
    if (!this.qualityHistory.has(clientId)) {
      this.qualityHistory.set(clientId, []);
    }
    const history = this.qualityHistory.get(clientId)!;
    history.push(score);

    // Keep only last 100 scores
    if (history.length > 100) {
      history.shift();
    }
  }

  private addRtpMetrics(
    clientId: string,
    metrics: { timestamp: number; packetsLost: number; jitter: number }
  ) {
    if (!this.rtpMetrics.has(clientId)) {
      this.rtpMetrics.set(clientId, []);
    }
    const history = this.rtpMetrics.get(clientId)!;
    history.push(metrics);

    // Keep only last 50 measurements
    if (history.length > 50) {
      history.shift();
    }
  }

  private generateClientInsights(clientId: string) {
    const qualityScores = this.qualityHistory.get(clientId) || [];
    const rtpMetrics = this.rtpMetrics.get(clientId) || [];

    const avgQuality =
      qualityScores.length > 0
        ? qualityScores.reduce((sum, q) => sum + q.score, 0) /
          qualityScores.length
        : 0;

    const avgPacketLoss =
      rtpMetrics.length > 0
        ? rtpMetrics.reduce((sum, m) => sum + m.packetsLost, 0) /
          rtpMetrics.length
        : 0;

    const avgJitter =
      rtpMetrics.length > 0
        ? rtpMetrics.reduce((sum, m) => sum + m.jitter, 0) / rtpMetrics.length
        : 0;

    return {
      avgQuality: Number(avgQuality.toFixed(3)),
      avgPacketLoss: Number(avgPacketLoss.toFixed(0)),
      avgJitter: Number((avgJitter * 1000).toFixed(2)), // Convert to ms
      sampleCount: qualityScores.length,
      status:
        avgQuality > 0.8 ? "excellent" : avgQuality > 0.6 ? "good" : "poor",
    };
  }

  private async storeAnalytics(
    clientId: string,
    sample: ClientSample,
    insights: any
  ) {
    // Store to your database of choice
    console.log(`💾 Storing analytics for ${clientId}:`, {
      timestamp: sample.timestamp,
      insights,
      peerConnections: sample.peerConnectionSamples?.length || 0,
    });
  }
}

// Initialize analytics processor
const analyticsProcessor = new WebRTCAnalyticsProcessor();

// API endpoint to receive encoded WebRTC data
app.post("/api/webrtc-analytics", express.json(), async (req, res) => {
  try {
    const { data: encodedData, timestamp, clientId } = req.body;

    // Decode the real WebRTC statistics
    const decodedSamples = decoder.decodeFromBase64(encodedData);

    console.log(`📥 Received data from client ${clientId}:`);
    console.log(
      `  - Client samples: ${decodedSamples.clientSamples?.length || 0}`
    );
    console.log(`  - Encoded size: ${encodedData.length} characters`);

    // Process the decoded data
    await analyticsProcessor.processDecodedSamples(decodedSamples, {
      timestamp,
      clientId,
    });

    res.json({
      success: true,
      processed: decodedSamples.clientSamples?.length || 0,
      timestamp: Date.now(),
    });
  } catch (error) {
    console.error("❌ Failed to decode WebRTC data:", error);
    res.status(400).json({
      error: "Failed to decode samples",
      details: error.message,
    });
  }
});

app.listen(3000, () => {
  console.log("🚀 WebRTC Analytics Server running on port 3000");
});
```

### Real-Time Dashboard Integration

Create a real-time dashboard that decodes and displays live WebRTC analytics:

```typescript
import { WebSocketServer } from "ws";
import { SamplesDecoder } from "@observertc/samples-decoder";

const wss = new WebSocketServer({ port: 8080 });
const decoder = new SamplesDecoder();

// Connected dashboard clients
const dashboardClients = new Set<WebSocket>();

wss.on("connection", (ws, req) => {
  const url = new URL(req.url!, `http://${req.headers.host}`);
  const clientType = url.searchParams.get("type");

  if (clientType === "dashboard") {
    // Dashboard client connected
    dashboardClients.add(ws);
    console.log("📊 Dashboard client connected");

    ws.on("close", () => {
      dashboardClients.delete(ws);
      console.log("📊 Dashboard client disconnected");
    });
  } else {
    // WebRTC client sending data
    console.log("📱 WebRTC client connected");

    ws.on("message", async (data: Buffer) => {
      try {
        // Decode binary WebRTC data
        const decodedSamples = decoder.decodeFromBytes(new Uint8Array(data));

        // Process each client sample
        decodedSamples.clientSamples?.forEach((clientSample) => {
          const dashboardData = {
            type: "webrtc-update",
            clientId: clientSample.clientId,
            timestamp: clientSample.timestamp,
            summary: {
              peerConnections: clientSample.peerConnectionSamples?.length || 0,
              avgQuality: calculateAverageQuality(
                clientSample.peerConnectionSamples || []
              ),
              issues: detectIssues(clientSample.peerConnectionSamples || []),
            },
            rawData: clientSample,
          };

          // Broadcast to all dashboard clients
          dashboardClients.forEach((dashboardWs) => {
            if (dashboardWs.readyState === WebSocket.OPEN) {
              dashboardWs.send(JSON.stringify(dashboardData));
            }
          });
        });

        console.log(
          `✅ Processed ${decodedSamples.clientSamples?.length} client samples`
        );
      } catch (error) {
        console.error("❌ Failed to decode WebSocket data:", error);
        ws.send(
          JSON.stringify({
            type: "error",
            message: "Failed to decode samples",
          })
        );
      }
    });
  }
});

function calculateAverageQuality(
  peerConnections: PeerConnectionSample[]
): number {
  const scores = peerConnections
    .map((pc) => pc.score)
    .filter((score) => score !== undefined) as number[];

  return scores.length > 0
    ? scores.reduce((sum, score) => sum + score, 0) / scores.length
    : 0;
}

function detectIssues(peerConnections: PeerConnectionSample[]): string[] {
  const issues: string[] = [];

  peerConnections.forEach((pc) => {
    if (pc.score !== undefined && pc.score < 0.5) {
      issues.push(`Low quality score: ${pc.score.toFixed(2)}`);
    }

    pc.inboundRtps?.forEach((rtp) => {
      if (rtp.packetsLost && rtp.packetsReceived) {
        const lossRate =
          rtp.packetsLost / (rtp.packetsReceived + rtp.packetsLost);
        if (lossRate > 0.05) {
          issues.push(`High packet loss: ${(lossRate * 100).toFixed(1)}%`);
        }
      }

      if (rtp.jitter && rtp.jitter > 0.05) {
        issues.push(`High jitter: ${(rtp.jitter * 1000).toFixed(1)}ms`);
      }
    });
  });

  return issues;
}

console.log(
  "🚀 Real-time WebRTC analytics server started on ws://localhost:8080"
);
```

### Frontend Dashboard Usage

```typescript
// Dashboard frontend code
import { useEffect, useState } from "react";

interface WebRTCUpdate {
  clientId: string;
  timestamp: number;
  summary: {
    peerConnections: number;
    avgQuality: number;
    issues: string[];
  };
}

function WebRTCDashboard() {
  const [clients, setClients] = useState<Map<string, WebRTCUpdate>>(new Map());

  useEffect(() => {
    const ws = new WebSocket("ws://localhost:8080?type=dashboard");

    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);

      if (data.type === "webrtc-update") {
        setClients((prev) => new Map(prev.set(data.clientId, data)));
      }
    };

    return () => ws.close();
  }, []);

  return (
    <div>
      <h2>Live WebRTC Analytics</h2>
      <div>Active Clients: {clients.size}</div>

      {Array.from(clients.values()).map((client) => (
        <div
          key={client.clientId}
          style={{
            border: "1px solid #ccc",
            margin: "10px",
            padding: "10px",
            backgroundColor:
              client.summary.avgQuality > 0.8
                ? "#e8f5e8"
                : client.summary.avgQuality > 0.5
                ? "#fff3cd"
                : "#f8d7da",
          }}
        >
          <h3>Client: {client.clientId}</h3>
          <p>Quality: {(client.summary.avgQuality * 100).toFixed(1)}%</p>
          <p>Connections: {client.summary.peerConnections}</p>
          {client.summary.issues.length > 0 && (
            <div>
              <strong>Issues:</strong>
              <ul>
                {client.summary.issues.map((issue, i) => (
                  <li key={i}>{issue}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
```

## Decoding Strategy

### Differential Decompression

The decoder reconstructs complete samples from differential changes:

```typescript
import { ClientSampleDecoder } from "@observertc/samples-decoder";

const decoder = new ClientSampleDecoder();

// First encoded sample contains full data
const encoded1 = "CgQIyAEQAhIFCgMIA..."; // Full sample
const decoded1 = decoder.decodeFromBase64(encoded1);
console.log("Full sample:", decoded1);

// Second encoded sample contains only changes
const encoded2 = "CgQI1AEQAxIFCgMIA..."; // Differential data
const decoded2 = decoder.decodeFromBase64(encoded2);
console.log("Reconstructed sample:", decoded2);

// The decoder automatically applies changes to reconstruct complete data
console.log(
  "Packets received increased from:",
  decoded1.peerConnectionSamples?.[0]?.inboundRtps?.[0]?.packetsReceived,
  "to:",
  decoded2.peerConnectionSamples?.[0]?.inboundRtps?.[0]?.packetsReceived
);
```

### Protocol Buffer Reconstruction

Each sample type is reconstructed from optimized Protocol Buffer schemas:

```typescript
// The decoder handles the complex process of:
// 1. Parsing Protocol Buffer binary data
// 2. Applying differential changes to previous state
// 3. Reconstructing complete sample objects
// 4. Ensuring type safety throughout the process

const decoder = new ClientSampleDecoder();

// Internal process (handled automatically):
// 1. protobuf.decode(binaryData) -> protobuf message
// 2. applyDifferentialChanges(protobufMessage, previousState) -> updated state
// 3. convertToTypedSample(updatedState) -> ClientSample
```

## API Reference

### SamplesDecoder

Universal decoder for all sample types:

```typescript
class SamplesDecoder {
  /**
   * Decode samples from Base64 string
   * @param encodedData - Base64 encoded string from encoder
   * @returns Decoded samples object
   */
  decodeFromBase64(encodedData: string): Samples;

  /**
   * Decode samples from binary format
   * @param encodedData - Uint8Array containing binary data from encoder
   * @returns Decoded samples object
   */
  decodeFromBytes(encodedData: Uint8Array): Samples;

  /**
   * Reset decoder state (clears differential decompression cache)
   */
  reset(): void;

  /**
   * Get current decoder state for debugging
   * @returns Internal decoder state
   */
  getState(): any;
}

interface Samples {
  clientSamples?: ClientSample[];
  sfuSamples?: SfuSample[];
  turnSamples?: TurnSample[];
}
```

### ClientSampleDecoder

Specialized decoder for client-side WebRTC samples:

```typescript
class ClientSampleDecoder {
  /**
   * Decode client sample from Base64
   * @param encodedData - Base64 encoded string
   * @returns Decoded client sample
   */
  decodeFromBase64(encodedData: string): ClientSample;

  /**
   * Decode client sample from binary
   * @param encodedData - Uint8Array containing binary data
   * @returns Decoded client sample
   */
  decodeFromBytes(encodedData: Uint8Array): ClientSample;

  /**
   * Get current decoder state for debugging
   * @returns Internal decoder state
   */
  getState(): any;

  /**
   * Reset decoder state
   */
  reset(): void;
}
```

### SfuSampleDecoder

Optimized decoder for SFU statistics:

```typescript
class SfuSampleDecoder {
  decodeFromBase64(encodedData: string): SfuSample;
  decodeFromBytes(encodedData: Uint8Array): SfuSample;
  reset(): void;
  getState(): any;
}
```

### Individual Component Decoders

For fine-grained control, individual component decoders are available:

```typescript
// RTP Statistics Decoders
class InboundRtpDecoder {
  decode(protobufMessage: InboundRtpStatsProto): InboundRtpStats;
  reset(): void;
}

class OutboundRtpDecoder {
  decode(protobufMessage: OutboundRtpStatsProto): OutboundRtpStats;
  reset(): void;
}

// ICE Statistics Decoders
class IceCandidatePairStatsDecoder {
  decode(protobufMessage: IceCandidatePairStatsProto): IceCandidatePairStats;
  reset(): void;
}

class IceTransportDecoder {
  decode(protobufMessage: IceTransportStatsProto): IceTransportStats;
  reset(): void;
}

// Media Decoders
class MediaSourceDecoder {
  decode(protobufMessage: MediaSourceStatsProto): MediaSourceStats;
  reset(): void;
}

class CodecStatsDecoder {
  decode(protobufMessage: CodecStatsProto): CodecStats;
  reset(): void;
}
```

## Performance

The decoder utilizes Protocol Buffer deserialization and differential decompression to reconstruct WebRTC statistics from binary data. Performance characteristics will vary based on:

- Sample complexity and encoded data size
- Frequency of decoding operations
- Hardware specifications
- JavaScript engine optimizations

Performance considerations:
- Reuse decoder instances to maintain state for differential decoding
- Consider processing samples in batches for better throughput
- Monitor memory usage with large datasets
- Handle decoding errors gracefully in production environments

## Advanced Usage

### Stream Processing

```typescript
import { SamplesDecoder } from "@observertc/samples-decoder";
import { Transform, Readable, Writable } from "stream";

class SampleDecodingStream extends Transform {
  private decoder = new SamplesDecoder();

  constructor() {
    super({ objectMode: true });
  }

  _transform(chunk: Buffer, encoding: string, callback: Function) {
    try {
      // Decode incoming binary chunks
      const decodedSamples = this.decoder.decodeFromBytes(
        new Uint8Array(chunk)
      );

      // Push decoded samples downstream
      this.push(decodedSamples);
      callback();
    } catch (error) {
      callback(error);
    }
  }
}

// Usage in stream pipeline
const webSocketStream = new Readable({
  /* WebSocket source */
});
const decodingStream = new SampleDecodingStream();
const analyticsStream = new Writable({
  objectMode: true,
  write(samples: Samples, encoding, callback) {
    // Process decoded samples for real-time analytics
    processSamplesForAnalytics(samples);
    callback();
  },
});

webSocketStream.pipe(decodingStream).pipe(analyticsStream);
```

### Batch Processing

```typescript
import { ClientSampleDecoder } from "@observertc/samples-decoder";

class BatchSampleProcessor {
  private decoder = new ClientSampleDecoder();
  private processingStats = {
    totalProcessed: 0,
    totalTime: 0,
    errors: 0,
  };

  async processBatch(encodedSamples: string[]): Promise<ClientSample[]> {
    const startTime = performance.now();
    const decodedSamples: ClientSample[] = [];

    for (const encodedSample of encodedSamples) {
      try {
        const decoded = this.decoder.decodeFromBase64(encodedSample);
        decodedSamples.push(decoded);
        this.processingStats.totalProcessed++;
      } catch (error) {
        console.error("Decoding error:", error);
        this.processingStats.errors++;
      }
    }

    const endTime = performance.now();
    this.processingStats.totalTime += endTime - startTime;

    return decodedSamples;
  }

  getProcessingStats() {
    return {
      ...this.processingStats,
      avgProcessingTime:
        this.processingStats.totalTime / this.processingStats.totalProcessed,
      errorRate:
        this.processingStats.errors / this.processingStats.totalProcessed,
    };
  }
}
```

### Real-Time Analytics Pipeline

```typescript
import { SamplesDecoder } from "@observertc/samples-decoder";
import type {
  ClientSample,
  PeerConnectionSample,
} from "@observertc/sample-schemas-js";

class RealTimeAnalyticsPipeline {
  private decoder = new SamplesDecoder();
  private analytics = {
    qualityScores: new Map<string, number[]>(),
    packetLossRates: new Map<string, number[]>(),
    jitterValues: new Map<string, number[]>(),
  };

  processIncomingData(encodedData: string | Uint8Array) {
    // Decode samples
    const samples =
      typeof encodedData === "string"
        ? this.decoder.decodeFromBase64(encodedData)
        : this.decoder.decodeFromBytes(encodedData);

    // Process each client sample
    samples.clientSamples?.forEach((clientSample) => {
      this.processClientSample(clientSample);
    });

    // Generate real-time insights
    return this.generateInsights();
  }

  private processClientSample(sample: ClientSample) {
    const clientId = sample.clientId;

    sample.peerConnectionSamples?.forEach((pcSample) => {
      // Track quality scores
      if (pcSample.score !== undefined) {
        this.addToMetric(
          this.analytics.qualityScores,
          clientId,
          pcSample.score
        );
      }

      // Analyze RTP statistics
      pcSample.inboundRtps?.forEach((rtp) => {
        // Calculate packet loss rate
        if (rtp.packetsLost && rtp.packetsReceived) {
          const lossRate =
            rtp.packetsLost / (rtp.packetsReceived + rtp.packetsLost);
          this.addToMetric(this.analytics.packetLossRates, clientId, lossRate);
        }

        // Track jitter
        if (rtp.jitter) {
          this.addToMetric(this.analytics.jitterValues, clientId, rtp.jitter);
        }
      });
    });
  }

  private addToMetric(
    metricMap: Map<string, number[]>,
    clientId: string,
    value: number
  ) {
    if (!metricMap.has(clientId)) {
      metricMap.set(clientId, []);
    }

    const values = metricMap.get(clientId)!;
    values.push(value);

    // Keep only last 100 values for real-time analysis
    if (values.length > 100) {
      values.shift();
    }
  }

  private generateInsights() {
    const insights = {
      overallHealth: this.calculateOverallHealth(),
      topIssues: this.identifyTopIssues(),
      trends: this.calculateTrends(),
      alerts: this.generateAlerts(),
    };

    return insights;
  }

  private calculateOverallHealth(): number {
    const allQualityScores = Array.from(this.analytics.qualityScores.values())
      .flat()
      .slice(-50); // Last 50 scores

    return allQualityScores.length > 0
      ? allQualityScores.reduce((sum, score) => sum + score, 0) /
          allQualityScores.length
      : 0;
  }
}
```

## Integration Examples

### Express.js Server

```typescript
import express from "express";
import { SamplesDecoder } from "@observertc/samples-decoder";

const app = express();
const decoder = new SamplesDecoder();

app.post("/api/webrtc-samples", express.json(), (req, res) => {
  try {
    // Decode incoming samples
    const encodedData = req.body.data;
    const decodedSamples = decoder.decodeFromBase64(encodedData);

    // Process samples
    processSamples(decodedSamples);

    // Store in database
    await storeSamples(decodedSamples);

    res.json({ success: true, samplesProcessed: countSamples(decodedSamples) });
  } catch (error) {
    console.error("Decoding error:", error);
    res.status(400).json({ error: "Invalid sample data" });
  }
});

async function processSamples(samples: Samples) {
  // Real-time analytics processing
  samples.clientSamples?.forEach((clientSample) => {
    updateRealTimeMetrics(clientSample);
    checkForAlerts(clientSample);
  });

  samples.sfuSamples?.forEach((sfuSample) => {
    updateSfuMetrics(sfuSample);
  });
}
```

### WebSocket Real-Time Processing

```typescript
import { WebSocketServer } from "ws";
import { SamplesDecoder } from "@observertc/samples-decoder";

const wss = new WebSocketServer({ port: 8080 });
const decoder = new SamplesDecoder();

wss.on("connection", (ws) => {
  console.log("New WebRTC monitoring connection");

  ws.on("message", (data: Buffer) => {
    try {
      // Decode binary data from WebSocket
      const decodedSamples = decoder.decodeFromBytes(new Uint8Array(data));

      // Process in real-time
      const insights = processRealTimeInsights(decodedSamples);

      // Send insights back to client
      ws.send(
        JSON.stringify({
          type: "insights",
          data: insights,
        })
      );

      // Broadcast to other monitoring clients
      broadcastToMonitoringClients(decodedSamples);
    } catch (error) {
      console.error("WebSocket decoding error:", error);
      ws.send(
        JSON.stringify({
          type: "error",
          message: "Failed to decode samples",
        })
      );
    }
  });
});
```

### Kafka Consumer Integration

```typescript
import { Kafka } from "kafkajs";
import { SamplesDecoder } from "@observertc/samples-decoder";

const kafka = new Kafka({ brokers: ["localhost:9092"] });
const consumer = kafka.consumer({ groupId: "webrtc-analytics" });
const decoder = new SamplesDecoder();

async function startConsumer() {
  await consumer.connect();
  await consumer.subscribe({ topic: "webrtc-samples" });

  await consumer.run({
    eachMessage: async ({ message }) => {
      try {
        // Decode samples from Kafka message
        const decodedSamples = decoder.decodeFromBytes(
          new Uint8Array(message.value!)
        );

        // Process for analytics
        await processForAnalytics(decodedSamples);

        // Store in time-series database
        await storeInTimeSeriesDB(decodedSamples);
      } catch (error) {
        console.error("Kafka message decoding error:", error);
      }
    },
  });
}

async function processForAnalytics(samples: Samples) {
  // Extract metrics for time-series analysis
  const metrics = extractTimeSeriesMetrics(samples);

  // Update real-time dashboards
  updateDashboards(metrics);

  // Check for anomalies
  const anomalies = detectAnomalies(metrics);
  if (anomalies.length > 0) {
    await triggerAlerts(anomalies);
  }
}
```

### React Dashboard Integration

```typescript
import { useEffect, useState } from "react";
import { SamplesDecoder } from "@observertc/samples-decoder";
import type { Samples } from "@observertc/sample-schemas-js";

function useWebRTCDecoder(webSocketUrl: string) {
  const [decoder] = useState(() => new SamplesDecoder());
  const [latestSamples, setLatestSamples] = useState<Samples | null>(null);
  const [connectionState, setConnectionState] = useState<
    "connecting" | "connected" | "disconnected"
  >("disconnected");

  useEffect(() => {
    const ws = new WebSocket(webSocketUrl);
    setConnectionState("connecting");

    ws.onopen = () => {
      setConnectionState("connected");
    };

    ws.onmessage = (event) => {
      try {
        // Handle different message formats
        let decodedSamples: Samples;

        if (typeof event.data === "string") {
          // JSON message with Base64 data
          const message = JSON.parse(event.data);
          decodedSamples = decoder.decodeFromBase64(message.data);
        } else {
          // Binary WebSocket message
          const binaryData = new Uint8Array(event.data);
          decodedSamples = decoder.decodeFromBytes(binaryData);
        }

        setLatestSamples(decodedSamples);
      } catch (error) {
        console.error("Failed to decode samples:", error);
      }
    };

    ws.onclose = () => {
      setConnectionState("disconnected");
    };

    return () => {
      ws.close();
    };
  }, [webSocketUrl, decoder]);

  return { latestSamples, connectionState, decoder };
}

// Usage in component
function WebRTCDashboard() {
  const { latestSamples, connectionState } = useWebRTCDecoder(
    "ws://localhost:8080"
  );

  const qualityMetrics = useMemo(() => {
    if (!latestSamples?.clientSamples) return [];

    return latestSamples.clientSamples.map((sample) => ({
      clientId: sample.clientId,
      timestamp: sample.timestamp,
      avgScore: calculateAverageScore(sample.peerConnectionSamples || []),
      activeConnections: sample.peerConnectionSamples?.length || 0,
    }));
  }, [latestSamples]);

  return (
    <div>
      <h1>WebRTC Analytics Dashboard</h1>
      <div>Status: {connectionState}</div>

      {qualityMetrics.map((metric) => (
        <div key={metric.clientId}>
          <h3>Client {metric.clientId}</h3>
          <p>Quality Score: {(metric.avgScore * 100).toFixed(1)}%</p>
          <p>Active Connections: {metric.activeConnections}</p>
        </div>
      ))}
    </div>
  );
}
```

## Error Handling

### Graceful Error Recovery

```typescript
import { ClientSampleDecoder } from "@observertc/samples-decoder";

class RobustDecoder {
  private decoder = new ClientSampleDecoder();
  private errorCount = 0;
  private lastResetTime = Date.now();

  decodeWithErrorHandling(encodedData: string): ClientSample | null {
    try {
      return this.decoder.decodeFromBase64(encodedData);
    } catch (error) {
      this.handleDecodingError(error, encodedData);
      return null;
    }
  }

  private handleDecodingError(error: any, encodedData: string) {
    this.errorCount++;

    // Log detailed error information
    console.error("Decoding error:", {
      error: error.message,
      dataLength: encodedData.length,
      errorCount: this.errorCount,
      timeSinceLastReset: Date.now() - this.lastResetTime,
    });

    // Reset decoder state if too many errors
    if (this.errorCount > 5) {
      console.warn("Too many decoding errors, resetting decoder state");
      this.decoder.reset();
      this.errorCount = 0;
      this.lastResetTime = Date.now();
    }

    // Try to recover from specific error types
    if (error.message.includes("differential state")) {
      console.log("Resetting decoder due to differential state corruption");
      this.decoder.reset();
    }
  }
}
```

### Validation and Sanitization

```typescript
import { SamplesDecoder } from "@observertc/samples-decoder";

class ValidatingDecoder {
  private decoder = new SamplesDecoder();

  decodeAndValidate(encodedData: string | Uint8Array): Samples {
    // Basic input validation
    if (typeof encodedData === "string" && encodedData.length === 0) {
      throw new Error("Empty encoded data string");
    }

    if (encodedData instanceof Uint8Array && encodedData.length === 0) {
      throw new Error("Empty encoded data array");
    }

    // Decode the data
    const samples =
      typeof encodedData === "string"
        ? this.decoder.decodeFromBase64(encodedData)
        : this.decoder.decodeFromBytes(encodedData);

    // Validate decoded structure
    this.validateSamples(samples);

    // Sanitize data
    return this.sanitizeSamples(samples);
  }

  private validateSamples(samples: Samples) {
    // Validate client samples
    samples.clientSamples?.forEach((sample, index) => {
      if (!sample.clientId) {
        throw new Error(`Client sample ${index} missing clientId`);
      }

      if (!sample.timestamp || sample.timestamp < 0) {
        throw new Error(`Client sample ${index} has invalid timestamp`);
      }

      // Validate nested peer connection samples
      sample.peerConnectionSamples?.forEach((pcSample, pcIndex) => {
        if (!pcSample.peerConnectionId) {
          throw new Error(`PC sample ${pcIndex} missing peerConnectionId`);
        }
      });
    });

    // Validate SFU samples
    samples.sfuSamples?.forEach((sample, index) => {
      if (!sample.sfuId) {
        throw new Error(`SFU sample ${index} missing sfuId`);
      }
    });
  }

  private sanitizeSamples(samples: Samples): Samples {
    return {
      clientSamples: samples.clientSamples?.map(this.sanitizeClientSample),
      sfuSamples: samples.sfuSamples?.map(this.sanitizeSfuSample),
      turnSamples: samples.turnSamples?.map(this.sanitizeTurnSample),
    };
  }

  private sanitizeClientSample(sample: ClientSample): ClientSample {
    return {
      ...sample,
      // Ensure score is within valid range
      peerConnectionSamples: sample.peerConnectionSamples?.map((pc) => ({
        ...pc,
        score:
          pc.score !== undefined
            ? Math.max(0, Math.min(1, pc.score))
            : undefined,
        // Remove potentially harmful data
        scoreReasons: pc.scoreReasons?.slice(0, 1000), // Limit length
      })),
    };
  }
}
```

## Troubleshooting

### Common Issues

#### Decoder State Corruption

```typescript
// Problem: Decoder producing incorrect results
const decoder = new ClientSampleDecoder();

// Solution: Periodic state reset
let sampleCount = 0;
const resetInterval = 100;

function decodeWithPeriodicReset(encodedData: string): ClientSample {
  if (++sampleCount % resetInterval === 0) {
    decoder.reset(); // Clear differential state
    console.log(`Reset decoder state after ${sampleCount} samples`);
  }

  return decoder.decodeFromBase64(encodedData);
}
```

#### Memory Leaks

```typescript
// Problem: Decoder consuming excessive memory
class ManagedDecoder {
  private decoder = new SamplesDecoder();
  private lastGC = Date.now();
  private gcInterval = 60000; // 1 minute

  decode(encodedData: string | Uint8Array): Samples {
    const result =
      typeof encodedData === "string"
        ? this.decoder.decodeFromBase64(encodedData)
        : this.decoder.decodeFromBytes(encodedData);

    // Periodic garbage collection
    if (Date.now() - this.lastGC > this.gcInterval) {
      this.decoder.reset();
      this.lastGC = Date.now();

      if (global.gc) {
        global.gc();
      }
    }

    return result;
  }
}
```

#### Performance Issues

```typescript
// Problem: Slow decoding performance
class OptimizedDecoder {
  private decoderPool: SamplesDecoder[] = [];
  private poolSize = 5;

  constructor() {
    // Pre-warm decoder pool
    for (let i = 0; i < this.poolSize; i++) {
      this.decoderPool.push(new SamplesDecoder());
    }
  }

  async decodeAsync(encodedData: string): Promise<Samples> {
    // Use decoder pool to avoid blocking
    const decoder = this.decoderPool.pop() || new SamplesDecoder();

    try {
      const result = decoder.decodeFromBase64(encodedData);
      return result;
    } finally {
      // Return decoder to pool
      if (this.decoderPool.length < this.poolSize) {
        this.decoderPool.push(decoder);
      }
    }
  }
}
```

### Debug Mode

```typescript
import { SamplesDecoder } from "@observertc/samples-decoder";

class DebuggableDecoder {
  private decoder = new SamplesDecoder();
  private debug = process.env.NODE_ENV === "development";

  decode(encodedData: string | Uint8Array): Samples {
    if (this.debug) {
      const startTime = performance.now();
      console.log(
        `Decoding ${typeof encodedData} data of length:`,
        typeof encodedData === "string"
          ? encodedData.length
          : encodedData.length
      );
    }

    const result =
      typeof encodedData === "string"
        ? this.decoder.decodeFromBase64(encodedData)
        : this.decoder.decodeFromBytes(encodedData);

    if (this.debug) {
      const endTime = performance.now();
      console.log(`Decoding took ${endTime - startTime}ms`);
      console.log("Decoded samples:", {
        clientSamples: result.clientSamples?.length || 0,
        sfuSamples: result.sfuSamples?.length || 0,
        turnSamples: result.turnSamples?.length || 0,
      });
      console.log("Decoder state:", this.decoder.getState());
    }

    return result;
  }
}
```

## Contributing

We welcome contributions to improve the decoder performance and reliability:

### Development Setup

```bash
git clone https://github.com/observertc/schemas.git
cd schemas/npm-samples-decoder
npm install
npm run build
```

### Guidelines

1. **Performance**: Maintain or improve decoding performance
2. **Compatibility**: Ensure compatibility with encoder output
3. **Testing**: Add tests for new decoding features
4. **Documentation**: Update docs for API changes

---

**Part of the ObserveRTC Ecosystem** - Works seamlessly with [@observertc/samples-encoder](../npm-samples-encoder) and [@observertc/sample-schemas-js](../npm-samples-lib) for complete WebRTC observability solutions.
