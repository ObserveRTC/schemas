# The schema generator

This repository is a code generator. The Avro files under `sources/` are the
single source of truth; everything else — the published npm packages, the
`.proto` files, the Markdown documentation — is derived from them.

The generator lives in `src/` and is written in TypeScript. Run it with:

```bash
npm run generate
```

It replaced a JavaScript implementation (`index.js` plus a dozen root-level
helpers) and produces byte-identical TypeScript, `.avsc` and `.proto` output;
the only differences are three Markdown defects it fixes. See
[Behaviour changes](#behaviour-changes). The legacy files were removed in the
same change — `git log -- index.js` if you need them.

---

## What the generator does

### Inputs

```
sources/
  version.txt                        3.2.0 — stamped into every artifact
  CHANGELOG.md                       appended to the schema library README
  w3c/W3cStatsIdentifiers.ts         copied verbatim into the schema library
  samples/
    ClientSample.avsc                root schema (also the protobuf root)
    samples.avsc                     Samples envelope
    PeerConnectionSample.chunk.avsc  reusable fragment
    SfuSample.chunk.avsc             reusable fragment
    TurnSample.chunk.avsc            reusable fragment
```

A `*.chunk.avsc` file is not a schema on its own. It is a JSON fragment spliced
into a schema wherever a `"@include-chunk <id>"` placeholder appears:

```json
{ "name": "peerConnections", "type": ["null", { "type": "array", "items": "@include-chunk PeerConnectionSample" }] }
```

The chunk id is the file name minus `.chunk.avsc`. Chunks exist because
`ClientSample` and `Samples` both embed the same large sub-schemas, and Avro has
no include mechanism of its own.

Sources may contain `/* … */` and `//` comments; they are stripped before
parsing.

### Pipeline

1. **Load.** Register every chunk, then read each non-chunk `.avsc`, expand its
   placeholders, strip comments, and `JSON.parse` it.
2. **Validate.** Hand each parsed schema to `avro-js`. An invalid schema aborts
   the run (`--lenient` downgrades that to a warning).
3. **Render, per schema.**
   - `outputs/avsc/<Name>.avsc` — the flattened schema, re-serialised with
     2-space indentation, for consumers who cannot resolve chunks.
   - `outputs/typescript/<Name>.ts` — `export type` declarations for the record
     and every nested record, plus `export const schemaVersion`.
   - Markdown: a `##` section per record with a field/description table, and a
     flat bullet outline.
4. **Protobuf** (from `ClientSample` only).
   - `outputs/proto/ProtobufClientSampleV3Optional.proto` — proto3 with explicit
     presence (`optional` on every scalar). This is the variant the wire format
     uses.
   - Run `buf generate` on it, producing
     `temp/outputs/proto/ProtobufClientSampleV3Optional_pb.ts` via
     `protoc-gen-es`.
   - `outputs/proto/ProtobufClientSampleV3.proto` — the same schema without
     explicit presence, published for reference.
5. **Assemble the npm packages.**
   - `npm-samples-lib` (`@observertc/sample-schemas-js`) — one module per schema
     under `src/samples/`, the W3C identifiers, a barrel `src/index.ts`, a
     README built from the per-schema Markdown plus `CHANGELOG.md`, and a
     version bump.
   - `npm-samples-encoder` — `src/InputSamples.ts` = plain types,
     `src/OutputSamples.ts` = protobuf types.
   - `npm-samples-decoder` — the same two files, swapped.
6. **Stamp.** `outputs/generated.txt` records the version and time.
   `schemaList.md` at the repository root collects every outline.

### The ordering constraint that is easy to break

`buf.gen.yaml` takes the whole `outputs/proto` **directory** as its input;
`--path` only narrows which file is *generated from*, not which files are
*parsed*. Every variant declares the same messages in the same package, so if
two variants are on disk when buf runs, it fails with duplicate-symbol errors.

The pipeline therefore: clears `outputs/proto`, writes the buf-visible variant,
runs buf, and only then writes the remaining variants. Both implementations do
this; the new one states it in one place
(`src/pipeline.ts` → `generateProtobuf`) instead of leaving it as an implicit
consequence of statement order.

---

## Legacy module map

Where each removed file went, for anyone reading an older commit.

| File | Role | Fate |
| --- | --- | --- |
| `index.js` | orchestration | → `src/pipeline.ts` + `src/cli.ts` |
| `chunks.js` | module-global chunk map | → `src/avro/chunk-registry.ts` |
| `SourceAvsc.js` | one source file | → `src/avro/source-loader.ts` |
| `common.js` | string helpers | → `src/core/jsonc.ts`, inlined elsewhere |
| `makeTsModule.js` | Avro → TypeScript | → `src/generators/typescript/` |
| `makeMarkdownDoc.js` | Avro → Markdown | → `src/generators/markdown/` |
| `ProtobufConverterV3.js` | Avro → proto3 | → `src/generators/protobuf/proto3-generator.ts` |
| `protobufUtils.js` | proto file assembly, buf invocation | → `src/generators/protobuf/` |
| `NpmLib.js` | schema library layout | → `src/targets/samples-lib.ts` |
| `NpmSamplesEncoderLib.js`, `NpmSamplesDecoderLib.js` | codec package layout | → `src/targets/codec-lib.ts` (one implementation, two roles) |
| `ProtobufConverter.js` | proto**2** converter | dropped — nothing consumed `ProtobufClientSample.proto` |
| `makeBigQuerySql.js`, `makeRedshiftSql.js` | SQL DDL | dropped — see below |
| `NpmMonitorLib.js` | fourth npm package | dropped — never instantiated |
| `purgatory.index.js` | 28 KB of superseded code | dropped |

### Dead code in the legacy generator

- **SQL output never worked.** `index.js` declares `bigQueryTables` and
  `redshiftTables`, never pushes to them, then writes both arrays to
  `outputs/sql/bigquery.sql` and `outputs/sql/redshift.sql` — which is why both
  files are 0 bytes on disk. `makeBigQuerySql` and `makeRedshiftSql` are
  imported and never called.
- **CSV output never existed.** `CSV_OUTPUTS_PATH` is created and cleared;
  nothing is ever written to it. `makeRedshiftSql` computes a `csvColumnList`
  that no caller reads.
- **`makeRedshiftSql` destructures `knexSchema`** from an object that has no
  such property and returns it — always `undefined`.
- **`ProtobufConverter` (proto2)** produces `ProtobufClientSample.proto`, which
  no package, workflow or downstream repository reads.
- **`argparse`, `json-schema-to-markdown`, `protobufjs` and `typedoc`** were
  dependencies the generator never used (`protobufjs`'s `pbjs` is wrapped in
  `makeProtobufJson`, which is never called; `typedoc` only appears in a
  commented-out block of `NpmLib.js`). All four have been removed from
  `package.json`.

### Bugs found in the legacy generator

| | Symptom |
| --- | --- |
| **Delete/write race** | `NpmLib.clear()` schedules `fs.unlink` callbacks, then `make()` writes the same filenames **synchronously**. The unlinks run on the libuv threadpool and can land after the writes, deleting freshly generated modules. It has evidently not fired in practice, but nothing prevents it. |
| **Errors thrown into callbacks** | `clear()` and `rmDir()` do `fs.unlink(p, err => { if (err) throw err })`. A throw inside that callback is an uncaught exception, not something `main()` can catch. |
| **`clear()` targets the wrong README** | It deletes `src/README.md`, which never exists; the README is written to the package root. |
| **Mashed Markdown headings** | `makeMarkdownDoc` concatenates the last nested section directly onto the parent heading, producing lines such as `attachments \| Additional information attached to this stats## PeerConnectionSample`. Six occurrences in the published README. |
| **`undefined` in the README** | `description += " (Possible values are: …)"` runs on a possibly-absent `doc`, producing `state \| undefined (Possible values are: …)`. |
| **`[object Object][]`** | For an array of primitives, `fieldType += "[]"` stringifies the Avro type object. Invisible only because the type column is commented out. |
| **Single-pass chunk expansion** | `chunks.paste` expands one level and calls `String#replace`, which replaces only the *first* occurrence. A chunk referencing another chunk, or a chunk included twice, silently produces broken JSON. The `exec` loop also mixes `lastIndex` state across two different strings. |
| **In-place schema mutation** | `getTsType` rewrites `RTCStatsIceCandidatePairState.symbols` on the parsed schema object. It happens to be harmless because the protobuf path re-parses from source, but it means generator order affects generator output. |
| **`replaceAll` does not escape** | `new RegExp(find, 'g')` treats its argument as a pattern. |
| **`addUuidField(...names)`** | `Set.add` takes one argument; every name after the first is discarded. |
| **`buf` failures are swallowed** | `createTypescriptModels` discards stdout and stderr, so a buf failure surfaces later as a confusing `ENOENT` on the file buf never wrote. |
| **Comment stripping is not string-aware** | A single regex over the file would eat the tail of any doc containing `//` — a URL, for instance. No current source triggers it. |
| **Deprecated API** | `Date#toGMTString`. |
| **`.//./outputs/...`** | `TYPESCRIPT_OUTPUTS_PATH` and friends are built as `` `./${OUTPUTS_PATH}/typescript` `` where `OUTPUTS_PATH` already starts with `./`. Works by accident on POSIX. |

---

## New architecture

```
src/
  cli.ts                              argument parsing, commands, exit codes
  config.ts                           all paths and conventions in one place
  pipeline.ts                         the run, top to bottom
  core/
    logger.ts                         levelled, scoped logging
    errors.ts                         typed errors carrying context
    file-writer.ts                    the only code that writes to disk
    jsonc.ts                          string-aware comment stripping
  avro/
    schema.ts                         Avro AST types + guards
    chunk-registry.ts                 chunk storage and recursive expansion
    source-loader.ts                  discovery, expansion, parsing
    validator.ts                      avro-js, lazily imported
  generators/
    typescript/ts-type-alias.ts       renders one `export type`
    typescript/generate.ts            Avro record → TypeScript module
    markdown/generate.ts              Avro record → Markdown + outline
    protobuf/proto3-generator.ts      Avro record → .proto
    protobuf/buf.ts                   buf invocation
  targets/
    npm-package.ts                    shared plan type + version bump
    samples-lib.ts                    @observertc/sample-schemas-js layout
    codec-lib.ts                      encoder and decoder layout
```

Four ideas carry most of the weight:

**Generators return strings; only `FileWriter` writes.** Every generator is a
pure function from a parsed schema to text. The pipeline collects the complete
set of files, then hands it to one writer. `--dry-run` and `--check` are a
consequence of that rather than a feature bolted on, and the delete/write race
cannot exist because deletes are awaited, in order, in the same object.

**Stale files are pruned, not pre-deleted.** Instead of emptying `src/samples/`
and rewriting it, the writer removes exactly the files in a generator-owned
directory that this run did *not* produce. A crash can no longer leave the tree
emptied, and `--check` reports genuine drift only.

**The special cases are data.** `callId: bytes`, `timestamp: double`,
`attachments: Record<string, unknown>`, the `RTCStatsIceCandidatePairState`
symbol rewrite — these were `if (name === …)` branches scattered through three
converters. They now live in `src/config.ts` as maps, with a comment explaining
each. Adding one is a one-line change in a reviewable place.

**Errors carry context.** `SourceParseError`, `SchemaValidationError`,
`ExternalToolError` and `UsageError` all print the file, field or command that
failed. Anything else reaching the top level is an internal bug and prints a
stack trace.

---

## CLI

### Scripts

Every common invocation has a script, so nobody has to remember flag spellings:

| Script | Runs |
| --- | --- |
| `npm run generate` | full run (`compile` is a synonym) |
| `npm run generate:check` | CI guard — exit 1 if any output is stale |
| `npm run generate:dry-run` | verbose report of what would change |
| `npm run generate:types` | `--only typescript,avsc` |
| `npm run generate:proto` | `--only proto` |
| `npm run generate:packages` | `--only proto,samples-lib,encoder,decoder` |
| `npm run generate:docs` | `--only markdown,samples-lib` |
| `npm run schemas:list` | list schemas, chunks and artifacts |
| `npm run schemas:validate` | validate schemas, fail on undocumented fields |
| `npm run schemas:clean` | remove generated outputs |
| `npm run typecheck` | `tsc --noEmit` |
| `npm run build` | emit `dist/` |
| `npm run verify` | `typecheck` + `generate:check` — also `npm test` |

Anything else goes through `npm run generate -- <flags>`.

### Commands

`generate` (default), `validate`, `list`, `clean`.

### Flags

| Flag | Effect |
| --- | --- |
| `--root <dir>` | repository root, default `process.cwd()` |
| `--only <list>` | comma-separated artifacts: `avsc, typescript, markdown, proto, samples-lib, encoder, decoder` |
| `--skip <list>` | as above, subtractive |
| `--dry-run` | compute everything, write nothing |
| `--check` | `--dry-run` plus exit 1 on any difference |
| `--no-docs` | omit schema documentation from the generated types |
| `--lenient` | warn on an invalid schema instead of failing |
| `--json` | machine-readable summary on stdout; ordinary logging goes quiet |
| `--fail-on-warn` | exit 1 if the run produced any warning |
| `--version` | print the schema version and exit |
| `--verbose` / `--quiet` | logging level |
| `-h`, `--help` | usage |

`encoder` and `decoder` embed the buf-generated TypeScript, so they require
`proto`; asking for one without the other is a usage error rather than a
confusing crash.

`--check` is the one worth wiring into CI. It fails when the committed outputs
do not match what the current sources would produce — the failure mode where
someone edits an `.avsc` and forgets to regenerate. Combined with `--json` it
gives a parseable list of the stale paths:

```json
{ "ok": false, "mode": "check", "changes": ["outputs/typescript/ClientSample.ts"], "warnings": 1 }
```

`--fail-on-warn` turns advisory warnings into failures. The one that fires today
is "field X has no description", so `npm run schemas:validate` doubles as a
documentation check: it renders the docs in memory purely to collect those
warnings, then throws the output away.

---

## Behaviour changes

Verified byte-identical to the legacy generator:

- `outputs/typescript/ClientSample.ts`, `outputs/typescript/Samples.ts`
- `outputs/avsc/ClientSample.avsc`, `outputs/avsc/Samples.avsc`
- `outputs/proto/ProtobufClientSampleV3Optional.proto`
- `outputs/proto/ProtobufClientSampleV3.proto`
- `npm-samples-lib/src/index.ts` and every `src/samples/*.ts`
- `npm-samples-encoder/src/*.ts`, `npm-samples-decoder/src/*.ts`

Three deliberate differences, all in Markdown:

1. **Headings start on their own line.** `…in seconds.## OutboundRtpStats`
   becomes two lines with a blank line between them. Six occurrences in
   `npm-samples-lib/README.md`.
2. **No stray `undefined`.** `state | undefined (Possible values are: …)`
   becomes `state | (Possible values are: …)`, in both the README and
   `schemaList.md`.
3. **`ProtobufClientSample.proto` is no longer written.** The proto2 variant had
   no consumer. Delete the committed file when you are satisfied nothing outside
   this repository reads it.

Three operational differences worth knowing:

- An **invalid Avro schema now fails the run.** The legacy generator warned and
  skipped it, which meant a broken schema silently removed types from the
  published package. `--lenient` restores the old behaviour.
- **`buf` failures now surface immediately**, with the command and its stderr.
- **Generated `package.json` files gain a trailing newline.** The legacy
  serialiser omitted it, so every editor that adds one made the file look
  modified. One-time diff on the three packages, then stable.
- **`schemaVersion` is emitted from `ClientSample` only**, not from every
  module. See [breakage 2](#three-latent-breakages-this-uncovered) — exporting
  it twice made `npm-samples-lib` fail to compile.

## Dependencies

The root `package.json` was trimmed to what the generator actually loads:

| Package | Version | Why |
| --- | --- | --- |
| `avro-js` | `^1.12.1` | schema validation (the only runtime dependency) |
| `@bufbuild/buf` | `^1.72.0` | `buf generate` |
| `@bufbuild/protoc-gen-es` | `^2.13.0` | proto → TypeScript |
| `@bufbuild/protobuf` | `^2.13.0` | runtime the generated protobuf code imports |
| `typescript` | `^7.0.2` | type-checking and `dist/` |
| `tsx` | `^4.23.11` | runs the CLI straight from TypeScript |
| `@types/node` | `^22.13.14` | pinned to the Node major the repo targets |

Removed as unused: `argparse`, `json-schema-to-markdown`, `protobufjs`,
`typedoc`.

### The three published packages

`npm-samples-lib`, `npm-samples-encoder` and `npm-samples-decoder` were bumped
to `typescript@^7` and `@types/node@^22`, which required their build config to
be rewritten. Each now uses:

```jsonc
"module": "nodenext",
"moduleResolution": "nodenext",
"rootDir": "./src",
"types": [ "node" ]        // [] for npm-samples-lib, which needs no globals
```

Why each of those:

- **`nodenext`, not `node`/`node10`.** `"moduleResolution": "node"` (and its
  modern alias `node10`) is deprecated and errors under TypeScript 6, then stops
  functioning in 7. It also predates the `exports` field, so it cannot resolve
  `@bufbuild/protobuf/codegenv2` — a subpath that exists only in the package's
  export map and has no directory on disk. `node16` resolves it but then rejects
  the import, because `@bufbuild/protobuf` is `"type": "module"` and Node 16
  cannot `require` an ES module. `nodenext` models Node 22, where it can.
- **The emit is still CommonJS.** None of the packages declares
  `"type": "module"`, so `nodenext` compiles every `.ts` as CJS. `dist/index.js`
  keeps using `require`, `main`/`types` keep pointing at the same files, and
  extensionless relative imports keep working. Consumers see no change.
- **`rootDir` is now explicit.** TypeScript 6 stopped inferring it (TS5011).
  Without it, output lands in `dist/src/` and `main: dist/index.js` breaks.
- **`types` is explicit** so a stray `@types/*` package in the tree cannot
  silently add globals to a published library.

`target`/`lib` were deliberately left at `es2018` (lib) and `es2020` (codecs).
Raising them changes the emitted JavaScript and therefore the minimum runtime;
the encoder in particular runs in browsers, so that is a decision to make on
purpose rather than as a side effect of a compiler upgrade.

## Three latent breakages this uncovered

Bringing the packages onto a current compiler surfaced three problems that were
already there. All three are fixed.

**1. `@observertc/samples-decoder` did not work at all.**
`ClientSampleDecoder.ts` imported `fromBinary` from
`@bufbuild/protobuf/dist/cjs/from-binary` — reaching past the package's public
API into a path that stopped existing when protobuf-es v2 renamed `dist/cjs` to
`dist/commonjs`. It fails at compile time *and* at runtime: requiring the
published `dist/index.js` throws `ERR_PACKAGE_PATH_NOT_EXPORTED`. `fromBinary`
is a normal root export, exactly as `toBinary` already was in the encoder, so
the fix is a one-line import change.

**2. `npm-samples-lib` did not compile.**
Both `samples/ClientSample.ts` and `samples/Samples.ts` exported
`export const schemaVersion`, and `src/index.ts` re-exports both with
`export *` — TS2308, ambiguous re-export. `schemaVersion` describes the schema
set rather than any one record, so the generator now emits it from exactly one
module (`ClientSample`, because the codec packages re-export it from there).
The package's public API is unchanged: `schemaVersion` is still exported from
the barrel.

**3. Neither failure was visible, because CI never builds.**
Both release workflows run `npm publish --ignore-scripts`, which skips
`prepare` — so `npm run build` never executes in CI and whatever `dist/` happens
to be committed is what gets published. The committed `dist/` is from March and
still declares `version = "3.0.0"` against a `package.json` of `3.2.0`.

Worth deciding separately: drop `--ignore-scripts` so `prepare` builds on
publish, or add an explicit build step to the workflows. Either way the
committed `dist/` directories should be rebuilt before the next release.

---

## A finding from the current working tree

`sources/samples/ClientSample.avsc` has an uncommitted `key` field on
`ClientIssue`. Regenerating renumbers the protobuf fields of that message:

```diff
  message ClientIssue {
    optional string type = 1;
-   optional string payload = 2;
-   optional double timestamp = 3;
+   optional string key = 2;
+   optional string payload = 3;
+   optional double timestamp = 4;
  }
```

Field numbers come from the field's position after sorting (repeated, then
required, then optional; each group alphabetical), so **inserting a field
anywhere but the end of its group renumbers everything after it** — a
wire-breaking change that no current check catches. A decoder built against
3.2.0 will read the new `payload` as `timestamp`.

Options, in increasing order of effort: name the field so it sorts last within
its group; pin explicit field numbers in the schema and have the generator
honour them; or add a check that compares field numbers against the previous
release and fails on a change.

---

## Working on the generator

```bash
npm install
npm run typecheck            # tsc --noEmit, strict
npm run generate -- --dry-run --verbose
npm run build                # emit dist/ (for CI, not needed locally)
```

`tsx` runs the TypeScript directly, so there is no build step in the inner loop.
Node's own type stripping is not enough here — the sources use `.js` extensions
in relative imports (required by `NodeNext`), which `tsx` resolves and plain
`node` does not.

### Adding a schema

Drop the `.avsc` in `sources/samples/`, run `npm run generate`. It is picked up
by directory scan; nothing needs registering. Directory entries are sorted, so
the order of re-exports in `src/index.ts` does not depend on the filesystem.

### Adding an output format

Write a generator under `src/generators/` that returns strings, add the artifact
name to `ARTIFACTS` in `src/config.ts`, and push its files in `runPipeline`. It
gets `--only`, `--skip`, `--dry-run` and `--check` support for free.
