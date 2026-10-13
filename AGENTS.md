# AGENTS.md

Guidance for coding agents (and humans) working in this repository. Read this
before changing a schema, the generator, or either codec — and read
[Developing a codec](#developing-a-codec) in full before writing a new one.

Companion documents: [`README.md`](README.md) (overview),
[`docs/GENERATOR.md`](docs/GENERATOR.md) (how the generator works),
[`CONTRIBUTING.md`](CONTRIBUTING.md) (process), [`CHANGELOG.md`](CHANGELOG.md)
(what changed and why — the 3.5.0–3.7.0 entries are the best worked examples
of a schema change rippling through both codecs).

---

## 1. What this repository is

A code generator. The Avro files in `sources/samples/` are the **single source
of truth**; everything else is derived from them:

| Path | What | Who writes it |
| --- | --- | --- |
| `sources/samples/*.avsc`, `*.chunk.avsc` | Schema sources (comments allowed, `"@include-chunk <id>"` placeholders) | **you** |
| `sources/version.txt` | Schema version, stamped into every artifact | **you** |
| `CHANGELOG.md` | Schema history, appended to the schema library README | **you** |
| `src/` | The generator (TypeScript, run with `tsx`) | **you** |
| `outputs/{avsc,typescript,cpp,proto}/`, `schemaList.md` | Generated outputs | generator — never hand-edit |
| `npm-samples-lib/` | `@observertc/sample-schemas-js` — plain types | generator (entirely) |
| `npm-samples-*-codec/src/generated/` | Types (and, for protobuf, buf output) inside each codec | generator — never hand-edit |
| `npm-samples-*-codec/` everything else | The codec implementations, tests, build config | **you** |
| `npm-samples-*/package.json` `version` | Bumped by the generator to `sources/version.txt` | generator |

Packages are versioned in lockstep with the schema version.

### Commands (repository root, Node ≥ 22)

```sh
npm install
npm run generate              # everything
npm run generate:codec        # proto + protobuf-codec + json-codec
npm run generate -- --only <artifacts>   # avsc,typescript,markdown,proto,samples-lib,protobuf-codec,json-codec,cpp
npm run generate:dry-run      # what would change, writes nothing
npm run schemas:validate      # avro-js validation + every field documented
npm run verify                # typecheck + staleness check (what CI should run)
```

Inside a codec package (`cd npm-samples-<x>-codec`):

```sh
npm install
npm run typecheck
npm test
npm run test:update-goldens   # ONLY after a deliberate wire change
npm run build                 # dual CJS + ESM into dist/
```

### Hard rules

1. **Never edit generated files.** Change the `.avsc` or the generator and
   regenerate. `npm run generate:check` fails on drift.
2. **Protobuf field numbers come from field order** (repeated/map, then
   required, then optional; each group alphabetical). Inserting a field that
   does not sort last in its group renumbers everything after it — a silent
   wire break. Always review the diff of `outputs/proto/`.
3. **Golden fixtures are the wire contract.** If `test/fixtures/*.golden.json`
   changes, that is a wire-format change: it needs a version bump and a
   CHANGELOG entry. Never update goldens just to make a test pass.
4. **Both codecs must keep identical semantics** (section 4). A change to one
   delta rule is a change to both.
5. **Codecs are browser code.** No `Buffer`, no `node:*` imports, no `console`
   in `src/`. Tests may use Node freely.
6. Do not touch the user's uncommitted work you did not create (check
   `git status` first).

---

## 2. Using the schema

### From TypeScript

```ts
import type { ClientSample } from '@observertc/sample-schemas-js';
// or, if you already depend on a codec — it re-exports the same types:
import type { ClientSample } from '@observertc/samples-json-codec';
```

`ClientSample` is the root a client produces once per tick: identifiers
(`clientId`, `callId`), `timestamp`, `score` + `scoreReasons`, `attachments`,
one-off lists (`clientEvents`, `clientIssues`, `clientMetaItems`,
`extensionStats`) and `peerConnections[]`, each carrying the W3C stats
collections (`inboundRtps`, `outboundRtps`, `codecs`, `iceCandidatePairs`, …).
`Samples` is the envelope that also carries `SfuSample`/`TurnSample` chunks.
The full field reference is `schemaList.md`.

### From other languages

- `outputs/proto/ProtobufClientSampleV3Optional.proto` — the wire schema the
  protobuf codec uses (explicit presence on every scalar).
- `outputs/cpp/*.hpp` — header-only C++17 structs with `ToJson()`/`FromJson()`.
- `outputs/avsc/*.avsc` — flattened Avro (chunks expanded). Note the
  `AnyValue` record for payloads documents shape, not bytes.

### Type mapping worth knowing

- `timestamp` is a `double` everywhere except Avro (`long`), so
  sub-millisecond values survive JavaScript.
- `attachments` and every `payload` (on events, issues, meta items, extension
  stats) are opaque `Record<string, unknown>` that may nest to any depth
  (3.7.0). On the protobuf wire they are JSON strings.
- `scoreReasons` is `Record<string, number>` (3.6.0) — a primitive map.
- Identifier fields listed in `UUID_FIELDS` (`src/config.ts`) are `bytes` in
  proto so they can be UUID-packed.

---

## 3. Extending the schema

1. Edit the `.avsc` in `sources/samples/` (or the shared `*.chunk.avsc`).
   Optional fields are `["null", T]` with `"default": null`. Every field needs
   a `doc`.
2. Name new fields so they **sort last within their protobuf group**, or
   accept (and document) a wire break.
3. Bump `sources/version.txt` and add a `CHANGELOG.md` entry: what changed,
   why, wire impact for **each** codec, upgrade notes.
4. `npm run schemas:validate && npm run generate`.
5. Review `outputs/proto/` for renumbering.
6. Run both codec test suites. Then decide whether the codecs' layout tables
   need updating — the table below.

| Schema change | protobuf codec (`src/internal/layout.ts`) | JSON codec (`src/layout.ts`) |
| --- | --- | --- |
| New scalar field | nothing | nothing |
| New **required** field (non-optional in TS) | `REQUIRED_FIELDS['<Msg.Path>']` | `REQUIRED_FIELDS[<collection>]` / `ROOT_REQUIRED_FIELDS` |
| New repeated record keyed by `id` | nothing (default `entity`/`id`) | nothing (default key `id`) |
| New repeated record keyed by something else | `LIST_LAYOUTS` `{ mode: 'entity', key }` | `COLLECTION_KEYS` |
| New repeated **one-off** record (event-like) | `LIST_LAYOUTS` `{ mode: 'value' }` | `VALUE_LISTS` |
| New nested record diffed field by field | nothing (message ⇒ `struct`) | **`STRUCT_FIELDS`** — otherwise it is treated as opaque |
| New primitive map / primitive array | nothing (descriptor says so) | **`PRIMITIVE_MAPS` / `PRIMITIVE_LISTS`** — otherwise an object is opaque and *carried forward* |
| New opaque JSON field | generator `fieldTypeOverrides` → `string`, plus `JSON_FIELDS` | nothing |
| New UUID-able identifier | `UUID_FIELDS` in generator, `IDENTIFIER_SLOTS` | nothing |

The bold rows are where the codecs silently diverge if forgotten: protobuf
learns structure from its descriptor, the JSON codec treats any unlisted object
as an opaque blob. Add a test that pins the new behaviour in both.

---

## 4. The codec contract

`@observertc/samples-json-codec` and `@observertc/samples-protobuf-codec` are
**the same codec over different wire formats**. Any new codec must implement
exactly this contract so it is a drop-in swap.

### 4.1 Delta semantics

A message encodes the difference between this sample and the previous one on
the same stream.

1. **Unchanged ⇒ omitted.** The decoder keeps its last value
   (forward-fill). There is deliberately **no tombstone**: a field that stops
   being reported keeps its last value.
2. **Collections are defined by the newest sample.** Every message lists every
   entry the sample has; an entry that disappears has left the call and its
   state is dropped on both sides (re-sent in full if it returns). An
   absent or empty collection means "no entries", never "unchanged".
3. **Entity collections are keyed**, never positional. Keys:
   `peerConnections → peerConnectionId`; `inboundRtps`, `outboundRtps`,
   `remoteInboundRtps`, `remoteOutboundRtps → ssrc`; everything else → `id`.
   The key is written on every entry of every message. A missing key is
   `INVALID_VALUE` on encode, `STREAM_DESYNC`/`MALFORMED_INPUT` on decode.
4. **Value lists** (`clientEvents`, `clientIssues`, `clientMetaItems`,
   `extensionStats`) are one-off records: written whole, remembered never.
5. **Primitive lists and maps** (`scoreReasons`) are written whole whenever
   present, never carried forward; empty ≡ absent.
6. **Structs** (`psnrSum`, `qualityLimitationDurations`) are diffed field by
   field and omitted when unchanged.
7. **Opaque values** (`attachments`, `payload`) are compared by value, written
   whole when changed, deep-copied in and out, and validated first: `NaN`,
   `±Infinity` and `bigint` anywhere inside ⇒ `INVALID_VALUE` with the path;
   a cycle ⇒ `MALFORMED_INPUT`; functions/symbols/`undefined` dropped as JSON
   does; objects with `toJSON` (e.g. `Date`) serialise themselves.
8. **`clientId` is pinned**: taken from the encoder options and written on
   every message.
9. **Required fields are checked after merge** (`timestamp` at the root; per
   collection, the list in `layout.ts`). Encoder ⇒ `INVALID_VALUE`; decoder ⇒
   `STREAM_DESYNC` (it never saw the message that carried the field).
10. **Top-level non-finite numbers are rejected**, never coerced.
11. **`reset()` is a keyframe** on both halves: the next message is a full
    snapshot decodable by a fresh decoder.
12. **Encoder and decoder state cannot drift.** The JSON codec achieves this
    by advancing encoder state with `merge(previous, delta)` — the same function
    the decoder runs. The protobuf codec achieves it with mirrored
    `RecordEncoder`/`RecordDecoder` state machines. Pick one; do not keep "the
    sample I was given" as encoder state.
13. **Decoded samples are owned by the caller.** The decoder keeps its own
    copy so in-place enrichment downstream cannot corrupt the stream.
14. **A failed `tryDecode` advances nothing.**

### 4.2 API shape

```ts
export class ClientSampleEncoder {
  constructor(options: EncoderOptions);          // { clientId: string; logger?: Logger; ...format options }
  get encodedSampleCount(): number;
  reset(): void;
  encode(sample: ClientSample): <NativeWire>;    // Uint8Array for protobuf, delta object for JSON
  encodeTo<Format>(sample: ClientSample): ...;   // encodeToJson / encodeToBase64 / encodeToMessage
}

export class ClientSampleDecoder {
  constructor(options?: CodecOptions);
  get decodedSampleCount(): number;
  reset(): void;
  decode(input: <NativeWire>): ClientSample;
  decode<Format>(input): ClientSample;           // decodeJson / decodeBase64 / decodeFromMessage
  tryDecode(input): DecodeResult;                // { ok: true, sample } | { ok: false, error }
}

export function createClientSampleCodec(options: EncoderOptions): ClientSampleCodec; // { encoder, decoder, reset() }

export class <Format>CodecError extends Error { code; context: { path?: string } }
export function is<Format>CodecError(v: unknown): v is <Format>CodecError;
export { noopLogger, type Logger };
export * from './generated/samples.js';          // ClientSample & friends + schemaVersion
```

Error codes are fixed and shared — **do not invent new ones**:

| code | when |
| --- | --- |
| `MALFORMED_INPUT` | input is not a well-formed message of this format |
| `STREAM_DESYNC` | merged state lacks a required field — decoder missed earlier messages |
| `INVALID_VALUE` | a value cannot be represented (non-finite, missing key, bad UUID, …) |
| `INVALID_OPTION` | configuration the codec cannot honour (empty `clientId`, …) |

Messages are suffixed with `(at <path>)`; paths look like
`ClientSample.peerConnections[0].inboundRtps[1].jitter`.

Logging: `Logger` is the `debug/info/warn/error` slice of `console`; default
is `noopLogger`. `tryDecode` logs the swallowed error at `warn`.

---

## Developing a codec

A step-by-step for adding `@observertc/samples-<format>-codec` (CBOR,
MessagePack, Avro binary, FlatBuffers, …). Replace `<format>` throughout.

### Step 0 — Choose an architecture

| | **Schema-free walker** (JSON codec) | **Descriptor-driven plan** (protobuf codec) |
| --- | --- | --- |
| Use when | the format is self-describing (CBOR, MessagePack, JSON variants) | the format needs a schema/IDL at runtime (protobuf, Avro binary, FlatBuffers) |
| Core | `src/delta.ts`: pure `diffRecord` / `mergeRecord`, exact inverses | `src/internal/plan.ts` builds a `MessagePlan` from the descriptor; `src/internal/record.ts` runs `RecordEncoder` / `RecordDecoder` per live entity |
| Config | `src/layout.ts` keyed by **field name** | `src/internal/layout.ts` keyed by **message path** (`ClientSample.PeerConnectionSample.inboundRtps`) |
| Structure knowledge | none — must list structs, primitive maps and lists explicitly | read from the descriptor; only semantics (keys, value lists, required, JSON fields) are configured |
| Generated inputs | `src/generated/samples.ts` | `src/generated/samples.ts` + format bindings (e.g. `protobuf.ts`) |
| Dependencies | none | the format runtime |

**For a self-describing format, start from the JSON codec and swap only the
serialisation.** In most cases `delta.ts` and `layout.ts` can be reused
verbatim: the delta is a plain JS object, so `encode()` returns it and
`encodeTo<Format>()` / `decode<Format>()` wrap your serialiser around it.
That is the cheapest correct codec possible, and it inherits every semantic
from section 4 for free. Watch for format-specific value rules (e.g. CBOR can
carry `NaN` and `bigint` — still reject them, for parity).

**For a schema-driven format, start from the protobuf codec**: generate the
format's schema from the Avro sources in the generator, then rewrite
`plan.ts`'s descriptor walk and converters (`ValueConverter`:
`toWire`/`toPlain`/`equals`) for the new runtime. Keep `record.ts` — it is
format-agnostic over `MessagePlan`.

### Step 1 — Scaffold the package

```sh
cp -R npm-samples-json-codec npm-samples-<format>-codec   # or the protobuf one
rm -rf npm-samples-<format>-codec/{dist,node_modules,test/fixtures/*.golden.json}
```

Then edit:

- `package.json` — `name: @observertc/samples-<format>-codec`, description,
  keywords, `homepage`, `repository.directory`. Keep: `engines.node >=20`,
  `sideEffects: false`, the dual `exports` map (`import` → `dist/esm`,
  `require` → `dist/cjs`, each with `types`), `files`, and the scripts
  (`build`, `build:cjs`, `build:esm`, `typecheck`, `test`,
  `test:update-goldens`, `verify`, `prepare`, `prepublishOnly`). Put the format
  runtime in `dependencies`; keep it to one, or none.
- `tsconfig.json` (strict, `nodenext`, `noUncheckedIndexedAccess`, `lib`
  includes `dom`), `tsconfig.build.cjs.json`, `tsconfig.build.esm.json`
  (`esnext` + `bundler`) and `scripts/finalize-dist.mjs` (writes the
  `{"type": ...}` markers into `dist/esm` and `dist/cjs`) — copy unchanged.
- `src/errors.ts` — rename to `<Format>CodecError`, `is<Format>CodecError`,
  `<Format>CodecErrorCode`; keep the four codes verbatim.
- `src/options.ts` — `CodecOptions { logger? }`, `EncoderOptions extends
  CodecOptions { clientId }`, plus any format options. If an option changes the
  bytes (like protobuf's `identifiers`), both halves must be constructed with
  it — document that and make `createClientSampleCodec` the recommended path.
- `src/index.ts` — the export list in 4.2, with a `@packageDocumentation`
  block stating it is the same codec as the other two.
- `README.md` — follow the existing codec READMEs' sections: install, usage
  (encode on client, decode on server, both halves), streams are ordered and
  stateful, forward-fill, errors table, API table, how it works, generated
  code, development. Add a column to the "Which codec do I want?" table in
  **all** codec READMEs.
- `LICENSE`, `.npmrc`, `.gitignore`, `vitest.config.ts` — copy.

### Step 2 — Wire it into the generator

The generator only owns `src/generated/` and the `version` in `package.json`.

1. **`src/targets/<format>-codec-lib.ts`** — copy `json-codec-lib.ts`. Export
   `plan<Format>CodecLib(args): Promise<TargetPlan>` returning the generated
   files plus `await planVersionBump(args.dir, args.version)`, and
   `managedDirs: [<dir>/src/generated]` so stale generated modules are pruned.
   If the codec needs a format schema, generate it with a new generator under
   `src/generators/<format>/` that **returns strings** (only `FileWriter`
   writes) and pass the result in through `args`.
2. **`src/config.ts`**:
   - add `'<format>-codec'` to `ARTIFACTS`;
   - if it needs another artifact's output, add it to `ARTIFACT_REQUIRES`
     (protobuf-codec requires `proto`);
   - add `<format>CodecLibDir` to `GeneratorConfig` and to `resolveConfig`
     (`path.join(root, 'npm-samples-<format>-codec')`).
3. **`src/pipeline.ts`** — add an `if (artifacts.has('<format>-codec'))`
   block after the existing codec blocks, calling your planner with
   `samplesTs: requireRootSchema(rendered, config).typescript`, and pass the
   result to `collect(...)`.
4. **Root `package.json`** — add `<format>-codec` to `generate:codec` and
   `generate:packages`.
5. **`docs/GENERATOR.md`** — the `--only` list, the scripts table, the
   pipeline's "assemble the npm packages" step, and the publishing table.
6. Run `npm run typecheck && npm run generate -- --only <format>-codec` and
   confirm `npm-samples-<format>-codec/src/generated/samples.ts` appears and the
   package version matches `sources/version.txt`. `--help` and `--only`
   validation pick the artifact up automatically.

### Step 3 — Implement

Keep the file layout of the template. Implementation checklist, each item
mapping to a rule in section 4:

- [ ] `ClientSampleEncoder` constructor rejects missing/empty `clientId` with
      `INVALID_OPTION`.
- [ ] `encode` rejects a non-object sample with `INVALID_VALUE` at path
      `ClientSample`, forces `clientId` from options, pins it.
- [ ] Diff omits unchanged scalars and structs; collections list every entry
      with its key; value lists, primitive lists and primitive maps are written
      whole.
- [ ] Opaque values: compare by value, validate (NaN/Infinity/bigint/cycle),
      deep-copy.
- [ ] Encoder state advances from the delta, not from the input sample.
- [ ] Decoder: wraps parse failures as `MALFORMED_INPUT` with `cause`; merges;
      checks required fields (`STREAM_DESYNC`); stores a **copy** of the result.
- [ ] `tryDecode` / `tryDecode<Format>` return a `DecodeResult`, rethrow
      non-codec errors, do not mutate state on failure.
- [ ] `reset()` on both halves zeroes state and the sample counter.
- [ ] No `Buffer`, no `node:*`, no `console` anywhere in `src/`. If you need
      base64/UTF-8/UUID helpers, reuse `npm-samples-protobuf-codec/src/internal/binary.ts`
      (`TextEncoder`/`TextDecoder` based).
- [ ] Every throw carries `context.path`.

### Step 4 — Test

Copy the template's `test/` directory; it is designed to be ported.

| File | Pins |
| --- | --- |
| `test/support/stream.ts` | Deterministic eight-sample call (mulberry32, seed `20260816`): counters that stall, booleans returning to `false`, zeros and empty strings, a track that joins at tick 3 and leaves at 6, attachments rebuilt equal every tick. **Copy unchanged** so every codec is tested on the same input. |
| `roundtrip.test.ts` | decode(encode(s)) equals `{ ...s, clientId }` for every sample. |
| `delta.test.ts` | Assertions on the **emitted message**: unchanged fields absent, moving fields present, keys pinned. A codec that re-sends everything passes round-trip tests and fails here. |
| `errors.test.ts` | Each error code for each trigger, `isXCodecError`, `tryDecode` leaves state intact, desync on a late-joining decoder. |
| `nested-payload.test.ts` | Deep payloads round-trip; NaN/Infinity/bigint at depth rejected with the right path; cycles rejected. |
| `fuzz.test.ts` | Seeded mangling (drop fields, nudge numbers, add/remove entries) — every sample still round-trips. Its local copies of the layout tables must match `layout.ts`. |
| `golden.test.ts` | Byte-exact fixtures in `test/fixtures/*.golden.json` with `schemaVersion`, `byteLengths`, and the messages (base64 or readable form). Also: goldens decode back to the original stream, and average delta < 70% of the first message. Create with `npm run test:update-goldens`, then commit. |
| *format-specific* | e.g. protobuf's `binary.test.ts` (helpers vs `Buffer` oracle) and `interop.test.ts` (messages readable by the format's own runtime, without this package). Add the equivalent for your format. |

**Cross-codec parity.** For the shared stream, your decoded samples must equal
the JSON codec's decoded samples, and the same bad inputs must raise the same
codes. If you can, add a test that imports the sibling package's built output,
or at minimum compare against the JSON codec's golden messages decoded.

Measure and report in the README: bundle size (min+gzip), raw and gzipped
payload relative to protobuf, on the recorded stream.

### Step 5 — Release

1. Copy `.github/workflows/release-samples-json-codec-lib.yaml` to
   `release-samples-<format>-codec-lib.yaml`, change `name` and
   `working-directory`. It typechecks, tests (goldens gate the publish),
   builds, then publishes — `latest` on `main`, a prerelease tag on PRs.
2. Register a Trusted Publisher for the new package on npmjs.com
   (organisation `observertc`, repository `schemas`, the exact workflow file
   name) — see [`docs/GENERATOR.md#publishing`](docs/GENERATOR.md#publishing).
   > The committed workflows still contain `NPM_TOKEN` publish steps while
   > `docs/GENERATOR.md` describes OIDC trusted publishing
   > (`permissions: id-token: write`, `npm install -g npm@latest`, no token).
   > Follow the documented OIDC setup for a new workflow, and do not assume a
   > working `NPM_TOKEN` secret exists.
3. Update the root `README.md` packages table, `CONTRIBUTING.md` package list,
   and add a `CHANGELOG.md` entry announcing the package.

### Done means

- `npm run verify` passes at the root (generated files fresh).
- `npm run verify` and `npm run build` pass inside the new package.
- Golden fixtures committed; parity with the JSON codec demonstrated.
- No change to either existing codec's goldens.
- Docs updated: package README, root README, CONTRIBUTING, GENERATOR, CHANGELOG.

---

## 5. Changing an existing codec

- Read `src/delta.ts` (JSON) or `src/internal/record.ts` + `plan.ts`
  (protobuf) first; both are commented with the reasoning behind each rule.
- Make the same change in the other codec in the same PR, with matching tests.
- If goldens move: it is a wire change. Bump `sources/version.txt`, describe
  the change and its compatibility (can an old decoder read the new stream?)
  in `CHANGELOG.md`, then `npm run test:update-goldens`.
- Bug fixes that do not move goldens are PATCH-level.
