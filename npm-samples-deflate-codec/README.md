# @observertc/samples-deflate-codec

[![npm](https://img.shields.io/npm/v/@observertc/samples-deflate-codec.svg)](https://www.npmjs.com/package/@observertc/samples-deflate-codec)
[![License](https://img.shields.io/badge/License-Apache%202.0-blue.svg)](https://opensource.org/licenses/Apache-2.0)

Compressed delta codec for ObserveRTC `ClientSample`s. **Zero runtime
dependencies**, about 14 KB gzipped.

This is the wire format for streaming samples over a data channel: each
message is small enough to matter and self-contained enough to send as it
arrives. It carries a structural diff of its own, built for the shape of a
`ClientSample` — not a generic object diff:

1. **Structural diff.** The first message of a stream is a full snapshot.
   Every later message carries only what changed: scalars that moved, whole
   sub-objects that moved, and per-entry updates inside each peer-connection
   list, entries matched by `id`. A track that leaves the call is a bare
   `id`; a field that stops being reported is a `null` that deletes it; a
   list that empties stays an empty list. The diff is exact — the decoded
   sample is byte-for-byte the sample the encoder was handed (plus the
   `clientId`), not a forward-fill.
2. **Field-name dictionary coding.** Every name is sent once and referenced
   by a short integer code after that, so a delta that says "jitter on this
   stream is now 12" is a few dozen characters, not a few hundred.
3. **Per-message deflate**, using the platform's `CompressionStream` /
   `DecompressionStream` — no compression library in the bundle. The one
   header byte of every message identifies the codec, so a decoder never has
   to be told what it is reading.

## Size

Measured on a recorded 7-hour call — 3,431 samples, 32.5 MB of raw JSON,
encode + decode 2.6 s:

| Option | Total | Per sample |
| --- | ---: | ---: |
| Raw JSON, one string per sample | 32,557,734 B | 9,489 B |
| `samples-json-codec` deltas + per-message deflate | 3,744,376 B | 1,091 B |
| **This codec** | **2,851,034 B** | **831 B** (median 913, p95 952) |

For reference, gzipping the *whole file* at the end of the call gives
1,340,699 B (391 B/sample) — a storage number. A live stream cannot be
compressed as one file: messages are sent as they arrive, each independently.

## Install

```sh
npm install @observertc/samples-deflate-codec
```

ESM and CommonJS builds with full type declarations. Node ≥ 20 and any modern
browser — nothing here touches `Buffer` or any other Node built-in; the state
copies are the platform's own `structuredClone`.

## Usage

### Encoding, on the client

```ts
import { ClientSampleEncoder } from '@observertc/samples-deflate-codec';

const encoder = new ClientSampleEncoder({ clientId });

setInterval(() => {
  encoder.encode(collectClientSample()).then((bytes) => {
    dataChannel.send(bytes);
  });
}, 1000);
```

`encode` is async because the platform's compression stream is.
`encodeToBase64` is the same message as a string, for text-only transports.

### Decoding, on the server

```ts
import { ClientSampleDecoder } from '@observertc/samples-deflate-codec';

const decoder = new ClientSampleDecoder();

dataChannel.onmessage = (event) => {
  decoder.decode(new Uint8Array(event.data)).then((sample) => {
    pipeline.push(sample);
  });
};
```

One decoder per connection, in order. The decoded sample is yours — the
decoder keeps its own state, so a pipeline that annotates samples in place
cannot corrupt the stream.

### Both halves at once

```ts
import { createClientSampleCodec } from '@observertc/samples-deflate-codec';

const codec = createClientSampleCodec({ clientId });
const sample = await codec.decoder.decode(await codec.encoder.encode(input));
```

## The wire format

A message is one header byte (`0x01`) followed by a deflate stream
(zlib-wrapped) whose inflated bytes are a JSON envelope:

```json
{
  "v": 1,
  "t": 1,
  "d": ["jitter"],
  "n": 47,
  "s": { "0": 1756, "2": { "1": { "3": 12 } } }
}
```

`t` marks the message: `0` is a snapshot (a keyframe — the first message of
the stream, one after a `reset()`, or one the encoder sends whenever the
sample shape changed in a way the diff cannot express, such as the number of
peer connections moving), `1` is a delta. `d` are the field names this
message adds to the dictionary, `n` is the dictionary size after this message
(the desync guard), and `s` is the diff with field names as codes.

Inside a delta, a list is one of:

- `{ "l": [ ... ] }` — the whole list, replacing what the decoder has;
- `{ "e": [ ... ] }` — per-entry updates, each carrying at least the entry's
  `id`; a bare `id` string removes that entry;
- `null` — the list was removed;
- absent from the delta — the list is exactly what it was.

A field is a value, `null` (the field was removed), or absent (unchanged).

## Streams are ordered and stateful

A delta says "jitter is now 12" and says nothing about the forty fields that
did not move, so a decoder that has not seen the earlier messages cannot
rebuild the sample. The dictionary makes the failure explicit: every message
carries the dictionary size it expects, and a decoder that did not see the
stream from its start — one that joined cold, mid-stream — gets a
`MALFORMED_INPUT` with a `Dictionary desync` message instead of a sample
quietly built from the wrong field names. The diff layer fails the same way:
a delta whose entry ids do not line up with the accumulated state is a
`STREAM_DESYNC`, never a silently merged sample.

- **One decoder per encoder.** They are a pair.
- **The transport must be ordered and lossless.** A WebSocket, a data channel
  or an HTTP/2 stream is fine; a datagram transport is not, unless you add
  your own ordering.
- **`reset()` is a keyframe.** Call it on both halves at the same point in
  the stream — after a reconnect, on a schedule, or whenever a new receiver
  needs to be able to join. The next message is a full snapshot readable by a
  decoder that has seen nothing.

```ts
encoder.reset();
const keyframe = await encoder.encode(sample);
await new ClientSampleDecoder().decode(keyframe); // works
```

`clientId` is the exception: it rides on every message, so a receiver can
attribute one without routing state of its own.

### Exact, including the things that disappear

The codec is lossless in both directions: a field that stops being reported
is a `null` on the wire and is deleted from the decoder's state, a list that
empties stays a present, empty list, and an entry that leaves the call is
removed by its `id`. Decoded sample N is exactly the sample the encoder was
handed at N — there is no forward-fill to surprise an audit with later.

What the diff *remembers* is per-entry: inside each peer-connection list, an
entry is a small state object keyed by `id`, and only the fields that moved
travel. Everything outside those lists — top-level scalars, sub-objects such
as `attachments`, and the one-off value lists such as `clientEvents` — is one
opaque value, sent whole when it changes and remembered in between.

## Errors

Everything this package throws is a `DeflateCodecError` with a `code` and a
`context.path` pointing at the offending value:

| `code`            | Meaning                                                              |
| ----------------- | -------------------------------------------------------------------- |
| `MALFORMED_INPUT` | The input will not decode — bad bytes, a truncated message, a dictionary desync, a cycle, a snapshot whose shape is not a sample. |
| `STREAM_DESYNC`   | The decoder has not seen enough of the stream to rebuild this sample — a delta that does not line up with the accumulated state. |
| `INVALID_VALUE`   | A value cannot be represented — a missing entry `id`, a `NaN`, a `bigint`, a function. |
| `INVALID_OPTION`  | The codec was configured with something it cannot honour.             |

```ts
const result = await decoder.tryDecode(bytes);
if (!result.ok) {
  metrics.increment('codec.decode_failed', { code: result.error.code });
  return;
}
```

The encoder validates every sample before it diffs it, and the decoder
validates every snapshot. What gets reported, with the path that reached it:

- a missing or non-numeric top-level `timestamp`;
- a non-finite number anywhere (`JSON.stringify` turns it into `null` without
  complaint, which would silently corrupt the stream);
- a `bigint` (not representable at all);
- a function (not representable, and the one thing `structuredClone` would
  refuse);
- a cycle;
- an entry in a peer-connection list without a string `id`;
- a snapshot (keyframe) whose shape is not a sample.

A value carrying its own `toJSON`, such as a `Date`, is left to serialise
itself.

The package writes nothing to `console` on its own. Pass a `logger` if you
want to hear about recoverable oddities.

## API

| Export | What it is |
| --- | --- |
| `ClientSampleEncoder` | `encode`, `encodeToBase64`, `encodeToJson`, `reset`. |
| `ClientSampleDecoder` | `decode`, `decodeBase64`, `decodeJson`, `tryDecode`, `tryDecodeJson`, `reset`. |
| `createClientSampleCodec` | Both halves from one options object. |
| `DeflateCodecError` | Every failure, with `code` and `context`. |
| `ClientSampleDelta` | The plain delta type. |
| `ClientSample` and friends | The plain sample types, re-exported. |
| `FieldNameDictionary`, `serialize`, `deserialize`, `diffSample`, `applyDelta` | The format's pieces, for the curious and for tests. |

## How it works

Three layers, each an exact inverse of the last:

1. **Structural diff** — `src/structuralDiff.ts`: one `diffSample` and one
   `applyDelta` that are exact inverses, over the field vocabulary in
   `src/vocabulary.ts` (the lists in which entries are matched by `id`). The
   encoder advances its state by applying the delta it just produced, so
   whatever the encoder believes is, by construction, exactly what the
   decoder will believe.
2. **Dictionary** — `src/dictionary.ts`: field names mapped to short integer
   codes, with the additions of each message riding in that message's
   envelope.
3. **Compress** — `src/deflate.ts`: the platform's `CompressionStream` /
   `DecompressionStream` over the envelope, with a one-byte header in front.
   The zlib wrapper is deliberate: it carries an adler32 checksum, so a
   truncated or corrupted message fails the inflate instead of coming back
   as half a sample.

The plain delta is still available for inspection — `encodeToJson` /
`decodeJson` — uncompressed and uncoded, for a decoder that keeps its own
state or a log that should be readable.

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

The golden files in `test/golden/` pin the exact wire bytes — the base64 of
every message and its length. A wire change is impossible to make by accident
and easy to review on purpose.

## License

Apache-2.0
