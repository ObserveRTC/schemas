# ObserveRTC Schemas

[![License](https://img.shields.io/badge/License-Apache%202.0-blue.svg)](https://opensource.org/licenses/Apache-2.0)

A comprehensive schema generator for WebRTC observability that creates type-safe language bindings and data structures for monitoring and analyzing WebRTC applications.

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Generated Projects](#generated-projects)
- [Schema Structure](#schema-structure)
- [Development](#development)
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
| [`@observertc/samples-protobuf-codec`](npm-samples-protobuf-codec/) | Protobuf delta codec — encodes and decodes samples | `./npm-samples-protobuf-codec/` |
| [`@observertc/samples-encoder`](npm-samples-encoder/) | Binary encoding utilities for samples *(superseded by the codec)* | `./npm-samples-encoder/` |
| [`@observertc/samples-decoder`](npm-samples-decoder/) | Binary decoding utilities for samples *(superseded by the codec)* | `./npm-samples-decoder/` |

### Other Formats

| Format               | Description                                        | Location               |
| -------------------- | -------------------------------------------------- | ---------------------- |
| **TypeScript**       | Type definitions for every schema                  | `outputs/typescript/`  |
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
│   ├── proto/              # Protocol Buffer files
│   └── avsc/               # Flattened Avro schemas
├── npm-samples-lib/        # Generated core TypeScript library
├── npm-samples-encoder/    # Encoding utilities
├── npm-samples-decoder/    # Decoding utilities
├── CHANGELOG.md            # Schema change history
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
