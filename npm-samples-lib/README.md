# @observertc/sample-schemas-js

[![npm version](https://badge.fury.io/js/@observertc%2Fsample-schemas-js.svg)](https://badge.fury.io/js/@observertc%2Fsample-schemas-js)
[![License](https://img.shields.io/badge/License-Apache%202.0-blue.svg)](https://opensource.org/licenses/Apache-2.0)

TypeScript/JavaScript type definitions and schemas for ObserveRTC WebRTC observability samples. This library provides comprehensive, type-safe interfaces for all WebRTC statistics, events, and metrics used in the ObserveRTC ecosystem.

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Installation](#installation)
- [Quick Start](#quick-start)
- [Sample Types](#sample-types)
- [Usage Examples](#usage-examples)
- [Type Safety](#type-safety)
- [WebRTC Statistics Coverage](#webrtc-statistics-coverage)
- [Integration Patterns](#integration-patterns)
- [API Reference](#api-reference)
- [Migration Guide](#migration-guide)
- [Contributing](#contributing)

## Overview

This library contains TypeScript type definitions for all ObserveRTC sample schemas, providing a standardized way to work with WebRTC observability data. It covers the complete WebRTC Statistics API specification and includes custom extensions for enhanced monitoring capabilities.

## Features

### 🎯 **Complete Type Safety**

- Full TypeScript definitions for all WebRTC statistics
- Comprehensive interfaces for client, SFU, and TURN samples
- Type-safe field access with IntelliSense support

### 📊 **Comprehensive Coverage**

- **Client Samples** - End-user WebRTC statistics and events
- **PeerConnection Samples** - Complete peer connection metrics
- **SFU Samples** - Selective Forwarding Unit statistics
- **TURN Samples** - TURN server metrics and allocations

### 🔧 **Advanced Features**

- **Quality Scoring** - Built-in score and scoreReasons fields
- **Extensible Attachments** - Custom metadata support
- **High-Resolution Timestamps** - Microsecond precision timing
- **Nested Statistics** - RTP, ICE, codec, and transport metrics

### 🚀 **Developer Experience**

- Zero runtime dependencies
- Tree-shakeable ES modules
- CommonJS compatibility
- Comprehensive JSDoc documentation

## Installation

```bash
npm install @observertc/sample-schemas-js
```

### Peer Dependencies

This library works seamlessly with the ObserveRTC encoder/decoder ecosystem:

```bash
# For encoding samples
npm install @observertc/samples-encoder

# For decoding samples
npm install @observertc/samples-decoder
```

## Quick Start

### Basic Usage

```typescript
import {
  ClientSample,
  PeerConnectionSample,
  SfuSample,
  TurnSample,
} from "@observertc/sample-schemas-js";

// Create a client sample
const clientSample: ClientSample = {
  timestamp: Date.now(),
  clientId: "client-123",
  callId: "call-456",
  sampleSeq: 1,
  // Add your peer connection samples
  peerConnectionSamples: [],
};

// Create a peer connection sample
const pcSample: PeerConnectionSample = {
  peerConnectionId: "pc-789",
  timestamp: Date.now(),
  score: 0.85,
  scoreReasons: "Good connection quality with minimal packet loss",
  // Add nested statistics
  inboundTracks: [],
  outboundTracks: [],
  inboundRtps: [],
  outboundRtps: [],
};
```

### Working with RTP Statistics

```typescript
import {
  InboundRtpStats,
  OutboundRtpStats,
} from "@observertc/sample-schemas-js";

// Analyze inbound RTP performance
function analyzeInboundRtp(stats: InboundRtpStats) {
  const packetLossRate =
    stats.packetsLost && stats.packetsReceived
      ? stats.packetsLost / (stats.packetsReceived + stats.packetsLost)
      : 0;

  const jitterMs = (stats.jitter || 0) * 1000;

  return {
    quality: packetLossRate < 0.02 ? "good" : "poor",
    packetLossRate,
    jitterMs,
    kind: stats.kind,
    ssrc: stats.ssrc,
  };
}

// Monitor outbound quality limitations
function checkQualityLimitations(stats: OutboundRtpStats) {
  if (stats.qualityLimitationReason) {
    console.warn(`Quality limited by: ${stats.qualityLimitationReason}`);

    if (stats.qualityLimitationDurations) {
      const durations = stats.qualityLimitationDurations;
      console.log("Limitation durations:", {
        bandwidth: durations.bandwidth,
        cpu: durations.cpu,
        other: durations.other,
      });
    }
  }
}
```

## Sample Types

### Core Sample Types

| Type                   | Description                                | Use Case                                   |
| ---------------------- | ------------------------------------------ | ------------------------------------------ |
| `ClientSample`         | Complete client-side statistics collection | End-user monitoring, client-side analytics |
| `PeerConnectionSample` | WebRTC peer connection metrics             | Connection quality assessment, debugging   |
| `SfuSample`            | SFU (Selective Forwarding Unit) statistics | Server-side monitoring, capacity planning  |
| `TurnSample`           | TURN server metrics and allocations        | TURN server monitoring, relay analysis     |

### Nested Statistics Types

#### RTP Statistics

```typescript
interface InboundRtpStats {
  // Core identification
  timestamp: number;
  id: string;
  ssrc: number;
  kind: string;

  // Quality metrics
  packetsReceived?: number;
  packetsLost?: number;
  jitter?: number;

  // Video-specific
  framesDecoded?: number;
  framesDropped?: number;
  frameWidth?: number;
  frameHeight?: number;

  // Audio-specific
  audioLevel?: number;
  totalAudioEnergy?: number;
  concealedSamples?: number;

  // Advanced metrics
  totalProcessingDelay?: number;
  jitterBufferDelay?: number;
  // ... many more fields
}
```

#### ICE Statistics

```typescript
interface IceCandidatePairStats {
  id: string;
  timestamp: number;
  localCandidateId?: string;
  remoteCandidateId?: string;
  state?:
    | "new"
    | "inProgress"
    | "waiting"
    | "failed"
    | "succeeded"
    | "cancelled";
  nominated?: boolean;

  // Performance metrics
  currentRoundTripTime?: number;
  totalRoundTripTime?: number;
  availableOutgoingBitrate?: number;
  availableIncomingBitrate?: number;

  // Traffic statistics
  packetsSent?: number;
  packetsReceived?: number;
  bytesSent?: number;
  bytesReceived?: number;
}
```

#### Media Statistics

```typescript
interface MediaSourceStats {
  timestamp: number;
  id: string;
  kind: string;
  trackIdentifier?: string;

  // Audio source metrics
  audioLevel?: number;
  totalAudioEnergy?: number;
  echoReturnLoss?: number;

  // Video source metrics
  width?: number;
  height?: number;
  frames?: number;
  framesPerSecond?: number;
}
```

## Usage Examples

### Real-Time Quality Monitoring

```typescript
import {
  ClientSample,
  PeerConnectionSample,
} from "@observertc/sample-schemas-js";

class WebRTCQualityMonitor {
  private qualityThresholds = {
    excellent: 0.9,
    good: 0.7,
    fair: 0.5,
    poor: 0.3,
  };

  assessCallQuality(clientSample: ClientSample): QualityReport {
    const reports: QualityReport[] = [];

    clientSample.peerConnectionSamples?.forEach((pcSample) => {
      const report = this.assessPeerConnectionQuality(pcSample);
      reports.push(report);
    });

    return this.aggregateQualityReports(reports);
  }

  private assessPeerConnectionQuality(
    sample: PeerConnectionSample
  ): QualityReport {
    // Use built-in score if available
    if (sample.score !== undefined) {
      return {
        score: sample.score,
        reasons: sample.scoreReasons || "No details provided",
        category: this.scoreToCategory(sample.score),
      };
    }

    // Calculate custom quality score
    const metrics = this.extractQualityMetrics(sample);
    const score = this.calculateQualityScore(metrics);

    return {
      score,
      reasons: this.generateQualityReasons(metrics),
      category: this.scoreToCategory(score),
      details: metrics,
    };
  }

  private extractQualityMetrics(sample: PeerConnectionSample) {
    const metrics = {
      packetLoss: 0,
      jitter: 0,
      rtt: 0,
      frameDrops: 0,
      audioIssues: 0,
    };

    // Analyze inbound RTP streams
    sample.inboundRtps?.forEach((rtp) => {
      if (rtp.packetsLost && rtp.packetsReceived) {
        const lossRate =
          rtp.packetsLost / (rtp.packetsReceived + rtp.packetsLost);
        metrics.packetLoss = Math.max(metrics.packetLoss, lossRate);
      }

      if (rtp.jitter) {
        metrics.jitter = Math.max(metrics.jitter, rtp.jitter);
      }

      if (rtp.framesDropped && rtp.framesReceived) {
        const dropRate = rtp.framesDropped / rtp.framesReceived;
        metrics.frameDrops = Math.max(metrics.frameDrops, dropRate);
      }
    });

    // Analyze ICE candidate pairs for RTT
    sample.iceCandidatePairs?.forEach((pair) => {
      if (pair.currentRoundTripTime) {
        metrics.rtt = Math.max(metrics.rtt, pair.currentRoundTripTime);
      }
    });

    return metrics;
  }
}

interface QualityReport {
  score: number;
  reasons: string;
  category: "excellent" | "good" | "fair" | "poor";
  details?: any;
}
```

### SFU Performance Analysis

```typescript
import {
  SfuSample,
  SfuTransport,
  SfuInboundRtpPad,
} from "@observertc/sample-schemas-js";

class SfuPerformanceAnalyzer {
  analyzeSfuPerformance(sample: SfuSample): SfuPerformanceReport {
    return {
      sfuId: sample.sfuId,
      timestamp: sample.timestamp,
      transportAnalysis: this.analyzeTransports(sample.transports || []),
      streamAnalysis: this.analyzeStreams(sample.inboundRtpPads || []),
      resourceUtilization: this.calculateResourceUtilization(sample),
      alerts: this.generateAlerts(sample),
    };
  }

  private analyzeTransports(transports: SfuTransport[]): TransportAnalysis {
    const analysis: TransportAnalysis = {
      totalTransports: transports.length,
      activeTransports: 0,
      totalPacketLoss: 0,
      avgRtt: 0,
      bandwidthUtilization: 0,
    };

    transports.forEach((transport) => {
      // Check transport health
      if (
        transport.dtlsState === "connected" &&
        transport.iceState === "connected"
      ) {
        analysis.activeTransports++;
      }

      // Calculate packet loss
      const rtpLoss = transport.rtpPacketsLost || 0;
      const rtpReceived = transport.rtpPacketsReceived || 0;
      if (rtpReceived > 0) {
        analysis.totalPacketLoss += rtpLoss / rtpReceived;
      }

      // Bandwidth calculation
      const rtpBytes =
        (transport.rtpBytesReceived || 0) + (transport.rtpBytesSent || 0);
      analysis.bandwidthUtilization += rtpBytes;
    });

    analysis.avgPacketLoss =
      analysis.totalPacketLoss / Math.max(transports.length, 1);

    return analysis;
  }

  private generateAlerts(sample: SfuSample): Alert[] {
    const alerts: Alert[] = [];

    // Check for high packet loss on transports
    sample.transports?.forEach((transport) => {
      const lossRate = this.calculatePacketLossRate(transport);
      if (lossRate > 0.05) {
        // 5% packet loss threshold
        alerts.push({
          severity: "warning",
          type: "high_packet_loss",
          message: `Transport ${transport.transportId} has ${(
            lossRate * 100
          ).toFixed(2)}% packet loss`,
          transportId: transport.transportId,
        });
      }
    });

    // Check for stream issues
    sample.inboundRtpPads?.forEach((pad) => {
      if (pad.fractionLost && pad.fractionLost > 0.03) {
        alerts.push({
          severity: "warning",
          type: "stream_quality",
          message: `Stream ${pad.streamId} experiencing quality issues`,
          streamId: pad.streamId,
        });
      }
    });

    return alerts;
  }
}

interface SfuPerformanceReport {
  sfuId: string;
  timestamp: number;
  transportAnalysis: TransportAnalysis;
  streamAnalysis: any;
  resourceUtilization: any;
  alerts: Alert[];
}

interface Alert {
  severity: "info" | "warning" | "error";
  type: string;
  message: string;
  transportId?: string;
  streamId?: string;
}
```

### Custom Event Tracking

```typescript
import {
  ClientSample,
  ClientEvent,
  ClientIssue,
} from "@observertc/sample-schemas-js";

class WebRTCEventTracker {
  trackUserExperience(clientSample: ClientSample): UserExperienceMetrics {
    const events = clientSample.clientEvents || [];
    const issues = clientSample.clientIssues || [];

    return {
      callDuration: this.calculateCallDuration(events),
      connectionEvents: this.analyzeConnectionEvents(events),
      qualityIssues: this.categorizeIssues(issues),
      userActions: this.extractUserActions(events),
    };
  }

  private analyzeConnectionEvents(
    events: ClientEvent[]
  ): ConnectionEventSummary {
    const connectionEvents = events.filter(
      (event) =>
        event.name?.includes("CONNECTION") ||
        event.name?.includes("ICE") ||
        event.name?.includes("DTLS")
    );

    return {
      totalEvents: connectionEvents.length,
      reconnections: connectionEvents.filter((e) =>
        e.name?.includes("RECONNECT")
      ).length,
      iceRestarts: connectionEvents.filter((e) =>
        e.name?.includes("ICE_RESTART")
      ).length,
      connectionFailures: connectionEvents.filter((e) =>
        e.name?.includes("FAILED")
      ).length,
    };
  }

  private categorizeIssues(issues: ClientIssue[]): IssuesSummary {
    const categories = {
      audio: issues.filter((issue) =>
        issue.description?.toLowerCase().includes("audio")
      ),
      video: issues.filter((issue) =>
        issue.description?.toLowerCase().includes("video")
      ),
      network: issues.filter(
        (issue) =>
          issue.description?.toLowerCase().includes("network") ||
          issue.description?.toLowerCase().includes("connection")
      ),
      other: issues.filter(
        (issue) =>
          !issue.description?.toLowerCase().includes("audio") &&
          !issue.description?.toLowerCase().includes("video") &&
          !issue.description?.toLowerCase().includes("network")
      ),
    };

    return {
      total: issues.length,
      byCategory: {
        audio: categories.audio.length,
        video: categories.video.length,
        network: categories.network.length,
        other: categories.other.length,
      },
      severity: this.calculateSeverityDistribution(issues),
    };
  }
}
```

## Type Safety

### Strict Type Checking

```typescript
// All fields are properly typed
const sample: PeerConnectionSample = {
  peerConnectionId: "pc-123", // string (required)
  timestamp: Date.now(), // number (required)
  score: 0.85, // number | undefined
  scoreReasons: "Good quality", // string | undefined

  // TypeScript will enforce correct types for all nested objects
  inboundRtps: [
    {
      id: "inbound-rtp-1",
      timestamp: Date.now(),
      ssrc: 12345, // number (required)
      kind: "video", // string (required)
      packetsReceived: 1000, // number | undefined
      packetsLost: 5, // number | undefined
      jitter: 0.001, // number | undefined
    },
  ],
};
```

### Type Guards and Validation

```typescript
// Type guard functions for runtime validation
function isPeerConnectionSample(obj: any): obj is PeerConnectionSample {
  return (
    obj &&
    typeof obj.peerConnectionId === "string" &&
    typeof obj.timestamp === "number"
  );
}

function isInboundRtpStats(obj: any): obj is InboundRtpStats {
  return (
    obj &&
    typeof obj.id === "string" &&
    typeof obj.ssrc === "number" &&
    typeof obj.kind === "string"
  );
}

// Usage with type safety
function processSample(data: unknown) {
  if (isPeerConnectionSample(data)) {
    // TypeScript knows this is a PeerConnectionSample
    console.log(`Processing PC: ${data.peerConnectionId}`);

    data.inboundRtps?.forEach((rtp) => {
      if (isInboundRtpStats(rtp)) {
        // Type-safe access to RTP properties
        analyzeRtpStream(rtp);
      }
    });
  }
}
```

## WebRTC Statistics Coverage

### Complete W3C Specification Support

This library implements the complete [WebRTC Statistics API](https://www.w3.org/TR/webrtc-stats/) specification:

- ✅ **RTCStatsType** - All standard statistics types
- ✅ **RTCRtpStreamStats** - RTP stream statistics
- ✅ **RTCReceivedRtpStreamStats** - Received RTP statistics
- ✅ **RTCSentRtpStreamStats** - Sent RTP statistics
- ✅ **RTCInboundRtpStreamStats** - Inbound RTP statistics
- ✅ **RTCOutboundRtpStreamStats** - Outbound RTP statistics
- ✅ **RTCRemoteInboundRtpStreamStats** - Remote inbound statistics
- ✅ **RTCRemoteOutboundRtpStreamStats** - Remote outbound statistics
- ✅ **RTCMediaSourceStats** - Media source statistics
- ✅ **RTCVideoSourceStats** - Video source statistics
- ✅ **RTCAudioSourceStats** - Audio source statistics
- ✅ **RTCVideoPlayoutStats** - Video playout statistics
- ✅ **RTCAudioPlayoutStats** - Audio playout statistics
- ✅ **RTCPeerConnectionStats** - Peer connection statistics
- ✅ **RTCDataChannelStats** - Data channel statistics
- ✅ **RTCTransportStats** - Transport statistics
- ✅ **RTCIceCandidateStats** - ICE candidate statistics
- ✅ **RTCIceCandidatePairStats** - ICE candidate pair statistics
- ✅ **RTCCertificateStats** - Certificate statistics
- ✅ **RTCCodecStats** - Codec statistics

### Extended ObserveRTC Features

Beyond the W3C specification, this library includes:

- **Quality Scoring** - `score` and `scoreReasons` fields for automated quality assessment
- **Custom Attachments** - `attachments` field for extensible metadata
- **Enhanced Timestamps** - High-precision timing information
- **SFU Statistics** - Specialized statistics for SFU deployments
- **TURN Statistics** - TURN server and allocation metrics
- **Client Events** - Custom event tracking and issue reporting

## Integration Patterns

### With Monitoring Systems

```typescript
import { ClientSample } from "@observertc/sample-schemas-js";

// Integration with metrics collection
class MetricsCollector {
  collectMetrics(sample: ClientSample) {
    // Extract key performance indicators
    const metrics = this.extractKPIs(sample);

    // Send to your monitoring system
    this.sendToPrometheus(metrics);
    this.sendToDatadog(metrics);
    this.sendToElastic(metrics);
  }

  private extractKPIs(sample: ClientSample) {
    const kpis = new Map<string, number>();

    sample.peerConnectionSamples?.forEach((pcSample) => {
      // Overall quality score
      if (pcSample.score !== undefined) {
        kpis.set("webrtc.quality.score", pcSample.score);
      }

      // Aggregate packet loss
      const totalLoss = this.calculateTotalPacketLoss(pcSample);
      kpis.set("webrtc.network.packet_loss_rate", totalLoss);

      // Average jitter
      const avgJitter = this.calculateAverageJitter(pcSample);
      kpis.set("webrtc.network.jitter_ms", avgJitter * 1000);

      // Active streams count
      const streamCount =
        (pcSample.inboundRtps?.length || 0) +
        (pcSample.outboundRtps?.length || 0);
      kpis.set("webrtc.streams.active_count", streamCount);
    });

    return kpis;
  }
}
```

### With Real-Time Analytics

```typescript
// Real-time stream for processing samples
import { ClientSample } from "@observertc/sample-schemas-js";

class RealTimeAnalytics {
  private sampleBuffer: ClientSample[] = [];
  private windowSize = 10; // Process last 10 samples

  processSample(sample: ClientSample) {
    this.sampleBuffer.push(sample);

    if (this.sampleBuffer.length > this.windowSize) {
      this.sampleBuffer.shift();
    }

    // Real-time analysis
    const trends = this.analyzeTrends();
    const anomalies = this.detectAnomalies();
    const predictions = this.predictQuality();

    // Trigger alerts if needed
    this.checkAlertConditions(trends, anomalies);
  }

  private analyzeTrends(): QualityTrend[] {
    const trends: QualityTrend[] = [];

    // Analyze quality score trends
    const scores = this.sampleBuffer
      .flatMap((s) => s.peerConnectionSamples || [])
      .map((pc) => pc.score)
      .filter((score) => score !== undefined) as number[];

    if (scores.length >= 3) {
      const trend = this.calculateTrend(scores);
      trends.push({
        metric: "quality_score",
        direction:
          trend > 0.1 ? "improving" : trend < -0.1 ? "degrading" : "stable",
        magnitude: Math.abs(trend),
      });
    }

    return trends;
  }
}
```

## API Reference

### Core Interfaces

#### ClientSample

```typescript
interface ClientSample {
  timestamp: number;
  clientId: string;
  callId?: string;
  userId?: string;
  sampleSeq: number;

  // Nested samples
  peerConnectionSamples?: PeerConnectionSample[];
  clientEvents?: ClientEvent[];
  clientIssues?: ClientIssue[];
  clientMetaData?: ClientMetaData[];
  extensionStats?: ExtensionStat[];

  // Extensions
  attachments?: string;
}
```

#### PeerConnectionSample

```typescript
interface PeerConnectionSample {
  peerConnectionId: string;
  timestamp: number;

  // Quality assessment
  score?: number;
  scoreReasons?: string;

  // Statistics collections
  inboundTracks?: InboundTrackSample[];
  outboundTracks?: OutboundTrackSample[];
  codecs?: CodecStats[];
  inboundRtps?: InboundRtpStats[];
  remoteInboundRtps?: RemoteInboundRtpStats[];
  outboundRtps?: OutboundRtpStats[];
  remoteOutboundRtps?: RemoteOutboundRtpStats[];
  mediaSources?: MediaSourceStats[];
  mediaPlayouts?: MediaPlayoutStats[];
  peerConnectionTransports?: PeerConnectionTransportStats[];
  dataChannels?: DataChannelStats[];
  iceTransports?: IceTransportStats[];
  iceCandidates?: IceCandidateStats[];
  iceCandidatePairs?: IceCandidatePairStats[];
  certificates?: CertificateStats[];

  // Extensions
  attachments?: string;
}
```

For complete API documentation, see the generated TypeScript definitions in your IDE or the exported types.

## Migration Guide

### From Version 2.x to 3.x

```typescript
// Old (v2.x)
interface OldSample {
  peerConnectionId: string;
  // score field didn't exist
}

// New (v3.x)
interface NewSample {
  peerConnectionId: string;
  score?: number; // NEW: Quality scoring
  scoreReasons?: string; // NEW: Score details
  attachments?: string; // NEW: Extensible metadata
}

// Migration
function migrateSample(oldSample: any): PeerConnectionSample {
  return {
    ...oldSample,
    // Add new optional fields as needed
    score: calculateScore(oldSample),
    scoreReasons: generateReasons(oldSample),
    attachments: JSON.stringify(oldSample.customData || {}),
  };
}
```

## Contributing

We welcome contributions! Please follow these guidelines:

1. **Types**: Ensure all new fields have proper TypeScript types
2. **Documentation**: Add JSDoc comments for all public interfaces
3. **Compatibility**: Maintain backward compatibility when possible
4. **Testing**: Add tests for new type definitions

### Development Setup

```bash
git clone https://github.com/observertc/schemas.git
cd schemas/npm-samples-lib
npm install
npm run build
```

---

**Generated from ObserveRTC Schemas v3.0.0** - For the complete schema definitions and generation tools, see the [main repository](https://github.com/observertc/schemas).
