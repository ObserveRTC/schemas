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
- [Contributing](#contributing)
- [License](#license)

## Overview

ObserveRTC Schemas provides a standardized way to describe WebRTC statistics, events, and metrics across different programming languages and data storage systems. The schema generator processes Avro schema definitions and creates type-safe bindings for TypeScript/JavaScript, SQL schemas for databases, and other format outputs.

## Features

- 📊 **Comprehensive WebRTC Stats Coverage** - Complete schema definitions for all WebRTC statistics
- 🔧 **Multi-Language Support** - Generates TypeScript/JavaScript, SQL, CSV, and Protocol Buffer bindings
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
| [`@observertc/samples-encoder`](npm-samples-encoder/) | Binary encoding utilities for samples       | `./npm-samples-encoder/` |
| [`@observertc/samples-decoder`](npm-samples-decoder/) | Binary decoding utilities for samples       | `./npm-samples-decoder/` |

### Database Schemas

| Format         | Description                       | Location                  |
| -------------- | --------------------------------- | ------------------------- |
| **BigQuery**   | Google BigQuery table schemas     | `outputs/sql/bigquery/`   |
| **Redshift**   | Amazon Redshift table definitions | `outputs/sql/redshift/`   |
| **PostgreSQL** | Standard SQL DDL statements       | `outputs/sql/postgresql/` |

### Other Formats

| Format               | Description                                     | Location         |
| -------------------- | ----------------------------------------------- | ---------------- |
| **Protocol Buffers** | `.proto` files for cross-language serialization | `outputs/proto/` |
| **CSV**              | Column headers and format specifications        | `outputs/csv/`   |
| **Avro**             | Compiled Avro schema definitions                | `outputs/avsc/`  |

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

- Node.js 16+
- npm or yarn

### Setup

```bash
git clone https://github.com/observertc/schemas.git
cd schemas
npm install
```

### Code Generation

Generate all language bindings and output formats from the Avro schema definitions:

```bash
node index.js
```

This command will:

1. Read and validate the Avro schema files from `sources/samples/`
2. Generate TypeScript/JavaScript type definitions and npm packages
3. Create SQL table schemas for BigQuery, Redshift, and PostgreSQL
4. Generate Protocol Buffer definitions for cross-language serialization
5. Create CSV format specifications and column headers
6. Compile Avro schemas for runtime validation
7. Output all generated files to their respective directories in `outputs/`

The generator processes the schema definitions and creates:

- Type-safe TypeScript interfaces in `npm-samples-lib/`
- Binary encoder/decoder utilities in `npm-samples-encoder/` and `npm-samples-decoder/`
- Database-specific DDL statements in `outputs/sql/`
- Protocol Buffer `.proto` files in `outputs/proto/`
- CSV specifications in `outputs/csv/`

### Building All Outputs

Generate all language bindings and formats:

```bash
npm run compile
```

This will:

1. Process Avro schema definitions in `sources/samples/`
2. Generate TypeScript types and npm packages
3. Create SQL table schemas for multiple databases
4. Generate Protocol Buffer definitions
5. Create CSV format specifications

### Project Structure

```
├── sources/                 # Source Avro schema definitions
│   └── samples/            # Sample schema files (.avsc)
├── outputs/                # Generated outputs
│   ├── typescript/         # Generated TS/JS code
│   ├── sql/               # Database schemas
│   ├── proto/             # Protocol Buffer files
│   ├── csv/               # CSV format specs
│   └── avsc/              # Compiled Avro schemas
├── npm-samples-lib/        # Generated core TypeScript library
├── npm-samples-encoder/    # Generated encoding utilities
├── npm-samples-decoder/    # Generated decoding utilities
└── scripts/               # Build and generation scripts
```

### Adding New Fields

1. Edit the appropriate `.avsc` file in `sources/samples/`
2. Add documentation for the new field
3. Run `npm run compile` to regenerate all outputs
4. Test the generated code
5. Update version numbers as appropriate

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

### Current Version: 3.0.0

Based on WebRTC Statistics API specifications and optimized for real-world WebRTC monitoring scenarios.

## Contributing

We welcome contributions! Please follow these steps:

### Getting Started

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Make your changes to the schema files in `sources/`
4. Run the build: `npm run compile`
5. Test all generated outputs
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
