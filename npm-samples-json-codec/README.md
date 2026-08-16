# @observertc/samples-json-codec

[![License](https://img.shields.io/badge/License-Apache%202.0-blue.svg)](https://opensource.org/licenses/Apache-2.0)

JSON delta codec for ObserveRTC `ClientSample`s. **Zero runtime dependencies**,
about 2 KB gzipped.

Each message carries the difference between one sample and the last — which is
where nearly all of the saving comes from, since a WebRTC stats sample is mostly
identifiers, codec parameters and slow-moving counters that repeat verbatim
every tick.

A delta is shaped like a partial `ClientSample`. Nothing is renamed, tagged or
wrapped, so you can read one without a decoder:

```json
{
  "timestamp": 1756000001000,
  "clientId": "client-42",
  "peerConnections": [
    {
      "peerConnectionId": "pc-01",
      "inboundRtps": [{ "ssrc": 1234567890, "bytesReceived": 81234, "jitter": 0.011 }]
    }
  ]
}
```

## Which codec do I want?

This one and [`@observertc/samples-protobuf-codec`](../npm-samples-protobuf-codec)
are the same codec over different wire formats. Same delta semantics, same
error codes, same API shape — you can swap one for the other without changing
anything downstream.

|                          | `samples-json-codec` | `samples-protobuf-codec` |
| ------------------------ | -------------------: | -----------------------: |
| Runtime dependencies     |             **none** |     `@bufbuild/protobuf` |
| Bundle, minified + gzip  |          **~2.1 KB** |                 ~29.8 KB |
| Payload, raw             |                2.73× |                       1× |
| Payload, gzipped         |            **1.41×** |                       1× |
| Readable on the wire     |                  yes |                       no |

Measured on the recorded eight-sample stream in `test/fixtures/`.

Take **JSON** when the transport already compresses (WebSocket
`permessage-deflate`, HTTP `Content-Encoding`, a log pipeline that gzips) — the
real cost is then about 40%, and you get a payload you can read in a log, a
2 KB bundle, and nothing to install. Take **protobuf** when bytes on the wire
are the binding constraint and you cannot rely on transport compression.

## Install

```sh
npm install @observertc/samples-json-codec
```

ESM and CommonJS builds with full type declarations. Node ≥ 20 and any modern
browser — nothing here touches `Buffer` or any other Node built-in.

## Usage

### Encoding, on the client

```ts
import { ClientSampleEncoder } from '@observertc/samples-json-codec';

const encoder = new ClientSampleEncoder({ clientId });

setInterval(async () => {
  websocket.send(encoder.encodeToJson(await collectClientSample()));
}, 1000);
```

`encode(sample)` returns the delta as an object instead, for when you want to
batch several, wrap them in an envelope, or look at what changed.

### Decoding, on the server

```ts
import { ClientSampleDecoder } from '@observertc/samples-json-codec';

const decoder = new ClientSampleDecoder();

websocket.on('message', (text) => {
  pipeline.push(decoder.decodeJson(String(text)));
});
```

One decoder per connection, and it must see that connection's messages in
order. The returned sample is yours — the decoder keeps its own copy, so a
pipeline that annotates samples in place cannot corrupt the stream.

### Both halves at once

```ts
import { createClientSampleCodec } from '@observertc/samples-json-codec';

const codec = createClientSampleCodec({ clientId });
const sample = codec.decoder.decode(codec.encoder.encode(input));
```

## Streams are ordered and stateful

A delta says "jitter is now 12" and says nothing about the forty fields that did
not move, so a decoder that has not seen the earlier messages cannot rebuild the
sample — and this package says so, with a `STREAM_DESYNC` error, rather than
handing back an object quietly missing its `trackIdentifier`.

- **One decoder per encoder.** They are a pair.
- **The transport must be ordered and lossless.** A WebSocket or an HTTP/2
  stream is fine; a datagram transport is not, unless you add your own ordering.
- **`reset()` is a keyframe.** Call it on both halves at the same point in the
  stream — after a reconnect, on a schedule, or whenever a new receiver needs to
  be able to join. The next message is a full snapshot readable by a decoder
  that has seen nothing.

```ts
encoder.reset();
const keyframe = encoder.encode(sample);
new ClientSampleDecoder().decode(keyframe);   // works
```

`clientId` is the exception: it rides on every message, so a receiver can
attribute one without routing state of its own.

### A field that stops being reported keeps its last value

There is deliberately no way to say *"this field is gone"* — the same as the
protobuf codec. The decoder returns the running forward-fill of the stream: if
sample 4 carries `jitter` and sample 5 does not, decoded sample 5 still has
sample 4's `jitter`.

That is almost always what you want from `getStats()` output, where a field
missing from one tick means the browser did not report it rather than that it
became meaningless. It does mean the decoder's output is "everything known about
this client so far", not "exactly the object the encoder was handed".

Collections work the other way round: the newest sample defines membership. An
RTP stream, codec or candidate pair that stops appearing has left the call, and
its state is dropped on both sides — so if it comes back, it is re-sent in full.
This is why a collection appears in every delta, with each entry carrying at
least its key, even when nothing inside it changed.

## Errors

Everything this package throws is a `JsonCodecError` with a `code` and a
`context.path` pointing at the offending value. The codes match the protobuf
codec's, so error handling ports across unchanged:

| `code`            | Meaning                                                              |
| ----------------- | -------------------------------------------------------------------- |
| `MALFORMED_INPUT` | The input is not a well-formed delta.                                 |
| `STREAM_DESYNC`   | The decoder has not seen enough of the stream to rebuild this sample. |
| `INVALID_VALUE`   | A value cannot be represented — a missing collection key, a `NaN`.    |
| `INVALID_OPTION`  | The codec was configured with something it cannot honour.             |

```ts
const result = decoder.tryDecodeJson(text);
if (!result.ok) {
  metrics.increment('codec.decode_failed', { code: result.error.code });
  return;
}
```

`NaN` and `Infinity` are rejected rather than encoded: `JSON.stringify` turns
them into `null` without complaint, which would silently corrupt the stream.

The package writes nothing to `console` on its own. Pass a `logger` if you want
to hear about recoverable oddities.

## API

| Export                        | What it is                                                      |
| ----------------------------- | ---------------------------------------------------------------- |
| `ClientSampleEncoder`         | `encode`, `encodeToJson`, `reset`.                               |
| `ClientSampleDecoder`         | `decode`, `decodeJson`, `tryDecode`, `tryDecodeJson`, `reset`.   |
| `createClientSampleCodec`     | Both halves from one options object.                             |
| `JsonCodecError`              | Every failure, with `code` and `context`.                        |
| `ClientSampleDelta`           | The wire type — a deep-partial `ClientSample`.                   |
| `ClientSample` and friends    | The plain sample types, re-exported.                             |
| `schemaVersion`               | What this build speaks.                                          |

## How it works

Two pure functions — a `diff` and a `merge` that are exact inverses — plus one
`previous` object per stream. That is the entire codec; `src/delta.ts` is under
300 lines and is worth reading if you are going to depend on the format.

The encoder advances its state by applying the delta it just produced, not by
keeping the sample it was given. So whatever the encoder believes is, by
construction, exactly what the decoder will believe.

Because JSON is self-describing, there is no field table and no schema at
runtime. The only configuration is `src/layout.ts`: which arrays are keyed
collections and by what field, which are event streams, and which objects are
opaque. A field added to the schema needs no change there.

## Generated code

`src/generated/samples.ts` is produced by the [schema generator](../README.md)
in this repository and must not be edited by hand:

```sh
npm run generate:codec        # from the repository root
```

Everything else in `src/` is hand-written.

## Development

```sh
npm install
npm run typecheck
npm test
npm run test:update-goldens   # after a deliberate wire change
npm run build
```

The golden fixture in `test/fixtures/` pins the exact deltas for a recorded
stream. Because the format is plain JSON, a diff there shows precisely which
field started or stopped being sent — a wire change is impossible to make by
accident and easy to review on purpose.

## License

Apache-2.0
