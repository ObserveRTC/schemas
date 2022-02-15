## ObserveRTC Schemas

This repository contains schemas for ObserveRTC.

## Use the Schema

For npm projects:

```javascript
npm i @observertc/schemas
```

### Change the schema

#### Schema change requests

[Create an issue](https://github.com/ObserveRTC/schemas/issues/new?assignees=&labels=&template=schema-change-request.md) and state the request.

#### Create PR for schema changes

Discussion is good to request a schema, PR is better.
Step to create a PR (after you cloned the repo):
1. create your branch
2. change the [source of the schemas](/sources), `sources/version.txt`, trace the change in the `sources/CHANGELOG.md`.
3. Generate `npm-lib` typescripts (see below)
4. open the PR

### Generate npm-lib typescripts

To run the schema generator for npm-lib:

```javascript
  git clone https://github.com/observertc/schemas && \
  cd schemas && \
  npm i && \
  node index.js
```


