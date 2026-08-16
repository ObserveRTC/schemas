# @observertc/samples-protobuf-codec

[![License](https://img.shields.io/badge/License-Apache%202.0-blue.svg)](https://opensource.org/licenses/Apache-2.0)

Protobuf codec for ObserveRTC `ClientSample`s.

It is a **delta** codec: each message on the wire carries the difference between
one sample and the one before it. That is where nearly all of the size saving
comes from — a WebRTC stats sample is mostly identifiers, codec parameters and
slow-moving counters that repeat verbatim every tick.

This package replaces `@observertc/samples-encoder` and
`@observertc/samples-decoder`, which were the same codec split across two
published artefacts.

> **Protobuf only.** The name says so on purpose. A sample stream can be
> diffed against other wire formats, and those belong in their own packages —
> the field mapping, the presence rules and the version compatibility story are
> all different.

## Install

```sh
npm install @observertc/samples-protobuf-codec
```

Ships both ESM and CommonJS builds with full type declarations. Node ≥ 20, and
any modern browser — nothing here touches `Buffer` or other Node built-ins.

## Usage

### Encoding, on the client

```ts
import { ClientSampleEncoder } from '@observertc/samples-protobuf-codec';

const encoder = new ClientSampleEncoder({ clientId });

setInterval(async () => {
  const sample = await collectClientSample();
  websocket.send(encoder.encode(sample));      // Uint8Array
}, 1000);
```

For a text-only transport there is `encodeToBase64(sample)`.

### Decoding, on the server

```ts
import { ClientSampleDecoder } from '@observertc/samples-protobuf-codec';

const decoder = new ClientSampleDecoder();

websocket.on('message', (bytes) => {
  const sample = decoder.decode(bytes);        // a complete ClientSample
  pipeline.push(sample);
});
```

One decoder per connection, and it must see that connection's messages in
order. See [Streams](#streams-are-ordered-and-stateful) below.

### Both halves at once

```ts
import { createClientSampleCodec } from '@observertc/samples-protobuf-codec';

const codec = createClientSampleCodec({ clientId, identifiers: { clientId: 'uuid' } });
const sample = codec.decoder.decode(codec.encoder.encode(input));
```

Building both from one options object is the point: the encoder and the decoder
have to agree about identifier packing, and the failure mode when they do not is
mojibake rather than an error.

## Streams are ordered and stateful

Message 5 says "jitter is now 12" and says nothing at all about the forty fields
that did not move. A decoder that has not seen messages 1–4 therefore cannot
reconstruct sample 5 — and this package tells you so, with a `STREAM_DESYNC`
error, rather than handing back an object that is quietly missing its
`trackIdentifier`.

Practical consequences:

- **One decoder per encoder.** They are a pair.
- **The transport must be ordered and lossless.** A WebSocket or an HTTP/2
  stream is fine. A datagram transport is not, unless you add your own ordering.
- **`reset()` is a keyframe.** Call it on both halves at the same point in the
  stream — after a reconnect, on a schedule, or whenever a new receiver needs
  to be able to join. The next message is a full snapshot readable by a decoder
  that has seen nothing.

```ts
encoder.reset();
const keyframe = encoder.encode(sample);
new ClientSampleDecoder().decode(keyframe);   // works
```

`clientId` is the one exception: it rides on every message, so a receiver can
always attribute a message without keeping routing state of its own.

### A field that stops being reported keeps its last value

A delta message says what changed. It has no way to say *"this field is gone"*,
so the decoder returns the running forward-fill of the stream: if sample 4
carries `jitter` and sample 5 does not, the decoded sample 5 still has sample
4's `jitter`.

That is almost always what you want from `getStats()` output, where a field
missing from one tick means the browser did not report it rather than that it
became meaningless. It does mean the decoder's output is "everything known
about this client so far", not "exactly the object the encoder was handed".

Collection membership works the other way round: the newest sample defines it.
An RTP stream, codec or candidate pair that stops appearing is understood to
have left the call, and its state is dropped on both sides — so if it comes
back, it is re-sent in full.

## Identifiers: `utf8` or `uuid`

Identifier fields (`callId`, `clientId`, `peerConnectionId`, `trackId` /
`trackIdentifier`) travel as `bytes`. If yours really are UUIDs, packing them
into their 16 significant bytes halves them:

```ts
const options = {
  clientId,
  identifiers: {
    callId: 'uuid',
    clientId: 'uuid',
    peerConnectionId: 'uuid',
    trackId: 'uuid',
  },
} satisfies EncoderOptions;
```

Default is `utf8` for all of them, because ObserveRTC does not require callers
to use UUIDs. A value configured as `uuid` that is not a UUID is an
`INVALID_VALUE` error at encode time, not a silent fallback.

## Errors

Everything this package throws is a `ProtobufCodecError` with a `code` and a
`context.path` pointing at the offending value:

| `code`            | Meaning                                                              |
| ----------------- | -------------------------------------------------------------------- |
| `MALFORMED_INPUT` | The bytes are not a `ClientSample` protobuf message.                  |
| `STREAM_DESYNC`   | The decoder has not seen enough of the stream to rebuild this sample. |
| `INVALID_VALUE`   | A value could not be converted between its plain and its wire form.   |
| `INVALID_OPTION`  | The codec was configured with something it cannot honour.             |

```ts
const result = decoder.tryDecode(bytes);
if (!result.ok) {
  metrics.increment('codec.decode_failed', { code: result.error.code });
  return;
}
```

The package writes nothing to `console` on its own. Pass a `logger` (anything
with `debug`/`info`/`warn`/`error`) if you want to hear about recoverable
oddities.

## API

| Export                            | What it is                                                            |
| --------------------------------- | --------------------------------------------------------------------- |
| `ClientSampleEncoder`             | `encode`, `encodeToBase64`, `encodeToMessage`, `reset`.                |
| `ClientSampleDecoder`             | `decode`, `decodeBase64`, `decodeFromMessage`, `tryDecode`, `reset`.   |
| `createClientSampleCodec`         | Both halves from one options object.                                   |
| `ProtobufCodecError`              | Every failure, with `code` and `context`.                              |
| `ClientSample` and friends        | The plain sample types, re-exported.                                   |
| `protobuf`                        | The generated protobuf bindings, namespaced.                           |
| `schemaVersion`, `PROTO_PACKAGE`  | What this build speaks.                                                |

`encodeToMessage` / `decodeFromMessage` work in protobuf messages rather than
bytes, for when the sample is going straight into another protobuf structure —
or when you want to look at what a delta actually contains.

## How it works

The codec keeps one small state machine per live thing in the call — the
client, each peer connection, each RTP stream, each ICE candidate pair — holding
the last value seen for every field. Encoding walks that tree and writes down
only what moved. Decoding walks the same tree and lays the arriving values back
over what it already had.

Two consequences worth knowing:

- **Collections are keyed, not positional.** Peer connections match on
  `peerConnectionId`, RTP streams on `ssrc`, everything else on `id`. The key is
  repeated on every message so entries stay matchable; an entry that stops
  appearing is understood to have left the call.
- **The field mapping is read from the protobuf descriptor at runtime.** Which
  fields exist, which are 64-bit, which are `bytes`, which nest — all of it comes
  off the descriptor rather than from hand-written per-field code. A field added
  upstream is carried by the codec without a line of new code.

## Wire compatibility

The `.proto` is the all-optional variant of `ClientSample`, where explicit
presence is what carries "this field changed". Field numbers are derived from
the Avro schema and are part of the contract.

The test suite pins the actual bytes for two recorded streams
(`test/fixtures/*.golden.json`). A change that alters them is a wire break and
needs a schema version bump — a round-trip test would not notice, because
encode and decode move together.

## Generated code

`src/generated/samples.ts` and `src/generated/protobuf.ts` are produced by the
[schema generator](../README.md) in this repository and must not be edited by
hand:

```sh
npm run generate:codec        # from the repository root
```

Everything else in `src/` is hand-written and schema-agnostic.

## Development

```sh
npm install
npm run typecheck
npm test
npm run test:update-goldens   # after a deliberate wire change
npm run build
```

## License

Apache-2.0
