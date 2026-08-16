# Contributing to ObserveRTC Schemas

Thank you for your interest in contributing to ObserveRTC Schemas! This project provides standardized schema definitions for WebRTC observability across multiple programming languages and data storage systems.

## Table of Contents

- [Code of Conduct](#code-of-conduct)
- [Getting Started](#getting-started)
- [Development Workflow](#development-workflow)
- [Schema Guidelines](#schema-guidelines)
- [Making Changes](#making-changes)
- [Testing](#testing)
- [Pull Request Process](#pull-request-process)
- [Release Process](#release-process)
- [Issue Reporting](#issue-reporting)
- [Community](#community)

## Code of Conduct

This project adheres to a code of conduct that we expect all contributors to follow. Please be respectful and constructive in all interactions.

## Getting Started

### Prerequisites

- **Node.js** 22+
- **npm** or **yarn**
- **Git**
- Basic understanding of:
  - WebRTC statistics and APIs
  - Avro schema definitions
  - TypeScript/JavaScript (for generated code review)

### Development Setup

1. **Fork and Clone**
   ```bash
   git clone https://github.com/YOUR_USERNAME/observertc-schemas.git
   cd observertc-schemas
   ```

2. **Install Dependencies**
   ```bash
   npm install
   ```

3. **Generate All Outputs**
   ```bash
   npm run generate
   ```
   This will process all Avro schemas and generate:
   - TypeScript type definitions
   - Protocol Buffer definitions, compiled to TypeScript with `buf`
   - Flattened Avro schemas
   - Markdown documentation
   - The three npm packages

4. **Verify Setup**
   Check that all generated files are created in:
   - `outputs/` directory for various formats
   - `npm-samples-lib/` for TypeScript library
   - `npm-samples-protobuf-codec/` for the protobuf delta codec
   - `npm-samples-encoder/` and `npm-samples-decoder/` for the superseded
     one-direction utilities

## Development Workflow

### Project Structure

```
├── sources/                 # Source Avro schema definitions
│   ├── samples/            # Core sample schema files (.avsc)
│   ├── w3c/               # W3C-specific schemas
│   └── version.txt        # Current schema version
├── outputs/                # Generated outputs (auto-generated)
│   ├── typescript/        # Generated type definitions
│   ├── proto/             # Protocol Buffer files
│   └── avsc/              # Flattened Avro schemas
├── npm-samples-*/          # Generated NPM packages
├── src/                   # The generator (TypeScript)
├── CHANGELOG.md           # Schema change history
├── docs/GENERATOR.md      # How the generator works
└── .github/               # GitHub workflows and templates
```

### Branch Strategy

- `main` - Stable release branch
- `develop` - Development integration branch
- `feature/feature-name` - Feature development
- `fix/issue-description` - Bug fixes
- `schema/schema-change-description` - Schema modifications

### Commit Convention

We follow conventional commits for clear change tracking:

```
type(scope): brief description

More detailed explanation if needed

- Breaking change details
- Migration notes
```

**Types:**
- `feat` - New schema fields or capabilities
- `fix` - Bug fixes in generation or schemas
- `docs` - Documentation changes
- `schema` - Schema structure changes
- `refactor` - Code refactoring without feature changes
- `test` - Test additions or modifications
- `chore` - Maintenance tasks

**Examples:**
```
feat(ClientSample): add networkType field for connection analysis

schema(PeerConnectionSample): add detailedIceStats for enhanced monitoring

fix(generator): resolve SQL generation for nullable arrays

docs(README): update schema change process documentation
```

## Schema Guidelines

### Schema Design Principles

1. **Backward Compatibility** - Additive changes only in minor versions
2. **Clear Documentation** - Every field must have meaningful documentation
3. **Consistent Naming** - Use camelCase for field names
4. **Appropriate Types** - Use correct Avro types with null unions for optional fields
5. **Extensibility** - Include `attachments` fields where appropriate for custom metadata

### Schema File Conventions

#### Field Documentation
```json
{
  "name": "fieldName",
  "type": ["null", "string"],
  "default": null,
  "doc": "Clear, concise description of what this field represents and when it's populated"
}
```

#### Required Fields for New Schemas
- `timestamp` - High-resolution timing information
- `attachments` - Extensibility for custom metadata (where applicable)
- Appropriate identifier fields (`clientId`, `peerConnectionId`, etc.)

#### Naming Conventions
- **Fields**: `camelCase` (e.g., `networkType`, `totalPacketsLost`)
- **Schemas**: `PascalCase` ending in appropriate suffix (e.g., `ClientSample`, `RtpInboundStats`)
- **Enums**: `UPPER_SNAKE_CASE` (e.g., `CONNECTION_STATE_CONNECTED`)

### Schema Change Process

#### 1. Planning Phase
- Open a [Schema Change Request](https://github.com/observertc/schemas/issues/new?template=schema-change-request.md) issue
- Describe the proposed changes and rationale
- Discuss impact on existing implementations
- Get community feedback

#### 2. Implementation Phase
- Create a feature branch: `git checkout -b schema/add-network-metrics`
- Modify the appropriate `.avsc` file in `sources/samples/`
- Update documentation within the schema
- Follow semantic versioning rules:
  - **PATCH**: Bug fixes, documentation
  - **MINOR**: New fields, backward-compatible changes
  - **MAJOR**: Breaking changes, field removals

#### 3. Validation Phase
- Run `npm run generate` to generate all outputs
- Run `npm run verify` (type-check plus a staleness check)
- Verify generated TypeScript types are correct
- Review the diff of `outputs/proto/` for renumbered fields
- Test with sample data if applicable

## Making Changes

### Types of Contributions

#### 1. Schema Modifications
**Adding New Fields:**
```json
{
  "name": "newMetric",
  "type": ["null", "double"],
  "default": null,
  "doc": "Description of the new metric and its measurement unit"
}
```

**Adding New Sample Types:**
1. Create new `.avsc` file in `sources/samples/`
2. Follow existing sample structure patterns
3. Include all required base fields
4. Add comprehensive field documentation

#### 2. Generator Improvements
- Enhance code generation scripts
- Improve output format quality
- Add support for new target languages/formats
- Fix generation bugs

#### 3. Documentation
- Update README files
- Improve schema documentation
- Add usage examples
- Create migration guides

### Development Commands

```bash
# Generate all outputs from schemas
npm run generate

# Regenerate a subset while iterating
npm run generate:types
npm run generate -- --only proto

# Show what would change without writing anything
npm run generate:dry-run

# Validate schemas and require every field to be documented
npm run schemas:validate

# Fail if the committed outputs are stale (what CI should run)
npm run verify

# Full option list
npm run generate -- --help
```

## Testing

### Manual Testing Checklist

After making changes, verify:

- [ ] **Schema Validation**: `npm run schemas:validate` passes
- [ ] **Staleness**: `npm run generate:check` reports nothing out of date
- [ ] **TypeScript Generation**: Generated TS types compile without errors
- [ ] **Protocol Buffers**: Generated `.proto` files are valid, and no existing field was renumbered
- [ ] **NPM Packages**: Generated packages have correct structure
- [ ] **Documentation**: Generated docs are accurate and complete

### Testing Generated Code

1. **TypeScript Validation**
   ```bash
   cd npm-samples-lib
   npm install
   npm run build
   ```

2. **Protobuf Validation**
   - Check the generated files in `outputs/proto/`
   - Confirm no previously published field number changed
   - Confirm `temp/outputs/proto/*_pb.ts` regenerated without buf errors

### Schema Compatibility Testing

When modifying existing schemas:
- Ensure existing valid data still validates
- Check that optional new fields don't break existing parsers
- Verify binary compatibility for protobuf changes

## Pull Request Process

### Before Submitting

1. **Branch Up-to-Date**: Rebase on latest `main`
2. **Generate Outputs**: Run `npm run generate` 
3. **Test Changes**: Follow testing checklist
4. **Commit Messages**: Use conventional commit format
5. **Documentation**: Update relevant docs

### PR Description Template

```markdown
## Description
Brief description of changes and motivation.

## Type of Change
- [ ] Schema modification (new fields, types)
- [ ] Generator improvement
- [ ] Bug fix
- [ ] Documentation update
- [ ] Breaking change

## Schema Changes
- **Modified Schemas**: List affected schema files
- **New Fields**: Describe new fields and their purpose
- **Breaking Changes**: Detail any compatibility issues

## Testing
- [ ] Generated TypeScript compiles successfully
- [ ] `npm run verify` passes
- [ ] Protocol buffers generate correctly, with no field renumbered
- [ ] Documentation is updated

## Versioning
- [ ] Version bump is appropriate (patch/minor/major)
- [ ] CHANGELOG.md updated (for schema changes)

## Additional Notes
Any additional context, dependencies, or migration notes.
```

### Review Process

1. **Automated Checks**: GitHub Actions will validate generation
2. **Maintainer Review**: Core team reviews schema changes
3. **Community Input**: For significant changes, community review period
4. **Testing**: Verify all outputs generate correctly

## Release Process

### Versioning Strategy

ObserveRTC Schemas follows [Semantic Versioning](https://semver.org/):

- **MAJOR.MINOR.PATCH** format
- **PATCH** (3.0.1): Bug fixes, documentation, generator improvements
- **MINOR** (3.1.0): New fields, backward-compatible schema changes
- **MAJOR** (4.0.0): Breaking changes, field removals, incompatible changes

### Release Workflow

1. **Version Planning**: Determine version bump based on changes
2. **Update Version Files**: 
   - `package.json` version
   - `sources/version.txt`
   - `CHANGELOG.md`
3. **Generate Release**: Automated workflows handle NPM package publishing
4. **Release Notes**: Document changes and migration notes

### NPM Package Releases

The project maintains three NPM packages with automated releases:
- `@observertc/schemas` - Core TypeScript definitions
- `@observertc/samples-protobuf-codec` - Protobuf delta codec (encode + decode)
- `@observertc/samples-encoder` - Binary encoding utilities *(superseded)*
- `@observertc/samples-decoder` - Binary decoding utilities *(superseded)*

GitHub Actions automatically publish new versions when changes are merged to `main`.

## Issue Reporting

### Schema Issues

Use the [Schema Change Request template](https://github.com/observertc/schemas/issues/new?template=schema-change-request.md) for:
- Missing WebRTC statistics
- Incorrect field types or documentation
- New use case requirements

### Bug Reports

For generator or tooling issues:

```markdown
**Bug Description**
Clear description of the issue

**Steps to Reproduce**
1. Command run
2. Expected vs actual output
3. Error messages

**Environment**
- Node.js version
- Operating system
- Schema version

**Additional Context**
Relevant schema files, generated output samples
```

### Feature Requests

For new capabilities:
- Describe the use case and motivation
- Provide examples of desired output
- Consider backward compatibility impact

## Community

### Communication Channels

- **GitHub Issues**: Bug reports, feature requests, schema changes
- **GitHub Discussions**: General questions, implementation help
- **Pull Requests**: Code review and collaboration

### Getting Help

- Check existing issues and documentation first
- Use GitHub Discussions for questions
- Tag maintainers for urgent issues
- Provide complete context and examples

### Recognition

Contributors are recognized through:
- Git commit attribution
- Release notes acknowledgments  
- Project documentation credits

## Additional Resources

- [WebRTC Statistics API Specification](https://w3c.github.io/webrtc-stats/)
- [Apache Avro Documentation](https://avro.apache.org/docs/)
- [ObserveRTC Project](https://observertc.org/)
- [Semantic Versioning](https://semver.org/)

---

**Thank you for contributing to ObserveRTC Schemas!** Your contributions help improve WebRTC observability across the entire ecosystem. 