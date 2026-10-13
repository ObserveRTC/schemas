# ObserveRTC Schemas

[![License](https://img.shields.io/badge/License-Apache%202.0-blue.svg)](https://opensource.org/licenses/Apache-2.0)

A comprehensive schema generator for WebRTC observability that creates type-safe language bindings and data structures for monitoring and analyzing WebRTC applications.

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Generated Projects](#generated-projects)
- [Schema Structure](#schema-structure)
- [Development](#development)
  - [Developing your own codec](#developing-your-own-codec)
- [Versioning](#versioning)
- [Publishing](#publishing)
- [Contributing](#contributing)
- [License](#license)

## Overview

ObserveRTC Schemas provides a standardized way to describe WebRTC statistics, events, and metrics across different programming languages. The schema generator processes Avro schema definitions and creates type-safe TypeScript bindings, Protocol Buffer schemas, flattened Avro schemas and Markdown documentation.

## Features

- 📊 **Comprehensive WebRTC Stats Coverage** - Complete schema definitions for all WebRTC statistics
- 🔧 **Multiple Output Formats** - TypeScript type definitions, Protocol Buffer schemas, flattened Avro and Markdown documentation
- 🛡️ **Type Safety** - Provides full type safety across all generated languages
- 📈 **Real-time Monitoring** - Optimized for real-time WebRTC observability and monitoring
- 🔄 **Version Controlled** - Semantic versioning with clear upgrade paths
- 🏗️ **Extensible Architecture** - Support for custom fields and extensions

## Generated Projects

The schema generator produces several standalone npm packages and output formats:

### NPM Packages

| Package                                               | Description                                 | Repository               |
| ----------------------------------------------------- | ------------------------------------------- | ------------------------ |
| [`@observertc/schemas`](npm-samples-lib/)             | Core TypeScript/JavaScript type definitions | `./npm-samples-lib/`     |
| [`@observertc/samples-protobuf-codec`](npm-samples-protobuf-codec/) | Protobuf delta codec — smallest payload | `./npm-samples-protobuf-codec/` |
| [`@observertc/samples-json-codec`](npm-samples-json-codec/) | JSON delta codec — zero dependencies, ~2 KB | `./npm-samples-json-codec/` |
| [`@observertc/samples-deflate-codec`](npm-samples-deflate-codec/) | Compressed delta codec — structural diff, dictionary-coded, per-message deflate | `./npm-samples-deflate-codec/` |

The protobuf and JSON codecs implement the same generic delta: each message
carries only what changed since the previous sample. They share their
semantics, their error codes and their API shape, so they are
interchangeable. Pick protobuf when bytes on the wire are the binding
constraint, JSON when the transport already compresses and you would rather
have no dependencies and a readable payload.

The deflate codec speaks a delta of its own — structural, built for the shape
of a `ClientSample` — and adds field-name dictionary coding and per-message
deflate on top. Same error codes and API shape, a smaller wire.

### Removed packages

`@observertc/samples-encoder` and `@observertc/samples-decoder` are deprecated
and have been removed from this repository. Their last generated sources are in
git history at `cc8c7f8`; version 3.3.0 stays installable from npm, and its wire
format is unchanged, so an encoder or decoder already deployed still
interoperates with the codec and the two ends can migrate independently.

Use [`@observertc/samples-protobuf-codec`](npm-samples-protobuf-codec/), which
does both directions in one package.

### Other Formats

| Format               | Description                                        | Location               |
| -------------------- | -------------------------------------------------- | ---------------------- |
| **TypeScript**       | Type definitions for every schema                  | `outputs/typescript/`  |
| **C++**              | Header-only structs with `ToJson()` / `FromJson()` (nlohmann::json, C++17) | `outputs/cpp/` |
| **Protocol Buffers** | `.proto` files for cross-language serialization    | `outputs/proto/`       |
| **Avro**             | Flattened Avro schemas, with all chunks expanded    | `outputs/avsc/`        |
| **Markdown**         | Field-by-field reference for every schema           | `schemaList.md`        |

## Schema Structure

The schemas are organized into several main sample types:

### Core Sample Types

| Schema                 | Description                             |
| ---------------------- | --------------------------------------- |
| `ClientSample`         | End-user client statistics and metrics  |
| `PeerConnectionSample` | WebRTC peer connection statistics       |
| `SfuSample`            | Selective Forwarding Unit (SFU) metrics |
| `TurnSample`           | TURN server statistics                  |

### Nested Statistics

- **RTP Statistics** - Inbound/outbound RTP stream metrics
- **ICE Statistics** - ICE candidate and transport information
- **Media Statistics** - Audio/video codec and quality metrics
- **Transport Statistics** - Network transport layer information

### Key Features

- **Score Fields** - Quality scoring with detailed reasoning (`score` + `scoreReasons`)
- **Extensible Attachments** - Custom metadata support via `attachments` fields
- **Timestamp Precision** - High-resolution timing information
- **Comprehensive Coverage** - All WebRTC standard statistics

## Development

### Prerequisites

- Node.js 22+
- npm or yarn

### Setup

```bash
git clone https://github.com/observertc/schemas.git
cd schemas
npm install
```

### Code Generation

Generate every output format from the Avro schema definitions:

```bash
npm run generate
```

This will:

1. Read and validate the Avro schema files in `sources/samples/`
2. Write flattened Avro schemas to `outputs/avsc/`
3. Write TypeScript type definitions to `outputs/typescript/`
   and the C++ headers to `outputs/cpp/`
4. Write Protocol Buffer definitions to `outputs/proto/` and compile them to TypeScript with `buf`
5. Assemble the three npm packages and bump their versions
6. Write the Markdown reference to `schemaList.md` and the schema library README

The generator is a TypeScript CLI; `npm run generate -- --help` lists every
option and [`docs/GENERATOR.md`](docs/GENERATOR.md) documents how it works.
Useful shortcuts:

```bash
npm run generate:check      # fail if the committed outputs are stale (CI)
npm run generate:dry-run    # show what would change, write nothing
npm run generate:types      # regenerate only the TypeScript and Avro outputs
npm run generate:cpp        # regenerate only the C++ headers
npm run schemas:validate    # validate schemas and check every field is documented
npm run schemas:list        # list the discovered schemas and chunks
```

### Project Structure

```
├── sources/                 # Source Avro schema definitions
│   ├── samples/            # Sample schema files (.avsc) and reusable chunks
│   ├── w3c/                # W3C stats identifiers, copied into the library
│   └── version.txt         # Current schema version
├── src/                    # The generator (TypeScript)
├── outputs/                # Generated outputs
│   ├── typescript/         # Generated type definitions
│   ├── cpp/                # Generated C++ headers (header-only)
│   ├── proto/              # Protocol Buffer files
│   └── avsc/               # Flattened Avro schemas
├── npm-samples-lib/            # Generated core TypeScript library
├── npm-samples-protobuf-codec/ # Protobuf delta codec (encode + decode)
├── npm-samples-json-codec/     # JSON delta codec (encode + decode)
├── npm-samples-deflate-codec/  # Compressed delta codec (encode + decode)
├── CHANGELOG.md            # Schema change history
├── AGENTS.md               # Guide for agents: schema, extension, codec development
└── docs/GENERATOR.md       # How the generator works
```

### Adding New Fields

1. Edit the appropriate `.avsc` file in `sources/samples/`
2. Add documentation for the new field
3. Run `npm run generate` to regenerate all outputs
4. Test the generated code
5. Update version numbers as appropriate

> **Protobuf field numbers are derived from field order.** Inserting a field
> anywhere but the end of its group (repeated, then required, then optional;
> each sorted by name) renumbers every field after it, which breaks the wire
> format. Check the diff of `outputs/proto/` before merging.

### Schema Guidelines

- All fields should have clear documentation
- Use appropriate Avro types (`null` unions for optional fields)
- Follow naming conventions (camelCase for field names)
- Add `attachments` field for extensibility where appropriate

### Developing your own codec

The two codecs are one design over two wire formats, so a third — CBOR,
MessagePack, Avro binary, anything — should be the same design again. The full
contract and a step-by-step checklist are in [`AGENTS.md`](AGENTS.md#developing-a-codec);
this is the outline.

**1. Pick a template.**

| Your format is… | Start from | Why |
| --- | --- | --- |
| Self-describing (CBOR, MessagePack, …) | `npm-samples-json-codec/` | The delta is a plain object. Reuse `src/delta.ts` and `src/layout.ts` as they are and swap only the serialiser around `encode()` / `decode()`. |
| Schema-driven (Avro binary, FlatBuffers, …) | `npm-samples-protobuf-codec/` | Generate the format's schema in the generator, rewrite the descriptor walk and value converters in `src/internal/plan.ts`, and keep the format-agnostic state machines in `src/internal/record.ts`. |

```sh
cp -R npm-samples-json-codec npm-samples-<format>-codec
rm -rf npm-samples-<format>-codec/{dist,node_modules,test/fixtures/*.golden.json}
```

Rename the package to `@observertc/samples-<format>-codec` and the error class
to `<Format>CodecError`. Keep the dual CJS/ESM build files as they are.

**2. Keep the contract.** A new codec must be a drop-in swap for the other two:

- each message carries only what changed; an unchanged field is omitted and
  the decoder keeps its last value — there is no "field removed" marker;
- collections are keyed (`peerConnectionId`, `ssrc` for RTP streams, `id`
  otherwise), list every current entry, and drop entries that disappear;
- events, issues, meta items and extension stats are written whole and
  never remembered; `scoreReasons` is written whole and never carried forward;
- `attachments` and payloads are opaque, compared by value, and rejected if
  they contain `NaN`, `Infinity`, a `bigint` or a cycle;
- `clientId` rides on every message; `reset()` on both halves is a keyframe;
- the same API (`ClientSampleEncoder`, `ClientSampleDecoder`,
  `createClientSampleCodec`, `tryDecode`, `reset`) and the same four error
  codes: `MALFORMED_INPUT`, `STREAM_DESYNC`, `INVALID_VALUE`, `INVALID_OPTION`;
- runs in browsers: no `Buffer`, no Node built-ins, nothing written to
  `console`.

**3. Wire it into the generator**, which owns only `src/generated/` and the
package version:

- `src/targets/<format>-codec-lib.ts`, modelled on `json-codec-lib.ts`;
- `'<format>-codec'` in `ARTIFACTS` (plus `ARTIFACT_REQUIRES` if it needs
  another output), and a `<format>CodecLibDir` in `src/config.ts`;
- an `if (artifacts.has('<format>-codec'))` block in `src/pipeline.ts`;
- the artifact added to the `generate:codec` and `generate:packages` scripts.

```sh
npm run generate -- --only <format>-codec
```

**4. Port the tests.** Copy `test/` from the template. `test/support/stream.ts`
is a deterministic recorded call shared by every codec — keep it unchanged so
all codecs are tested on the same input. Assert on the emitted deltas, not
only on round trips, and commit byte-exact golden fixtures
(`npm run test:update-goldens`). Decoded output and error codes must match the
existing codecs for the same input.

**5. Release and document.** Add `.github/workflows/release-samples-<format>-codec-lib.yaml`
(copy the JSON codec's), register a Trusted Publisher for it on npmjs.com (see
[`docs/GENERATOR.md`](docs/GENERATOR.md#publishing)), and add the package to the
table above, the "Which codec do I want?" tables in each codec README,
`CONTRIBUTING.md` and `CHANGELOG.md`.

When the schema itself changes, check whether the codecs' layout tables need
updating. The protobuf codec reads structure from its descriptor, but the JSON
codec treats any unlisted object as an opaque blob. The table in
[`AGENTS.md`](AGENTS.md#3-extending-the-schema) lists each case.

## Versioning

ObserveRTC Schemas uses [Semantic Versioning](https://semver.org/) with the following conventions:

- **MAJOR.MINOR.PATCH** format
- **PATCH** - Library bugfixes and improvements
- **MINOR** - New fields, schema updates (typically matches WebRTC draft date: YYYYMMDD)
- **MAJOR** - Breaking changes to schema structure

The current version lives in `sources/version.txt` and is stamped into every
generated artifact. See [`CHANGELOG.md`](CHANGELOG.md) for the release history.

Based on WebRTC Statistics API specifications and optimized for real-world WebRTC monitoring scenarios.

## Publishing

The three npm packages are released by GitHub Actions using **npm trusted
publishing (OIDC)** — there is no `NPM_TOKEN`. Each package needs a Trusted
Publisher registered once on npmjs.com pointing at its workflow file; the exact
settings are in [`docs/GENERATOR.md`](docs/GENERATOR.md#publishing).

## Contributing

We welcome contributions! Please follow these steps:

### Getting Started

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Make your changes to the schema files in `sources/`
4. Run the build: `npm run generate`
5. Run `npm run verify` and check the generated outputs
6. Commit your changes: `git commit -m 'Add amazing feature'`
7. Push to the branch: `git push origin feature/amazing-feature`
8. Open a Pull Request

### Code Style

- Follow existing schema structure and naming conventions
- Add comprehensive documentation for new fields
- Include examples in field descriptions where helpful
- Test generated code in multiple target languages

## License

This project is licensed under the Apache License 2.0 - see the [LICENSE](LICENSE) file for details.

---

**ObserveRTC Schemas** - The foundation for standardized WebRTC observability across languages and platforms.
