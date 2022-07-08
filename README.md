## ObserveRTC Schemas

Schemas describes the communication between services in ObserveRTC stack. Schema is manifested into 
diffeerent languages to make it easy to integrate ObserveRTC.
Currently the following language bindings are generated from the schema:

 * [typescript/javascript](#npm) available as an npm library.
 * [Redshift](redshift-tables/) to integrate Reports for AWS Redshift.
 * [csv](csv-headers/) when exporting Reports in csv format from observer, the orders of the columns might be important


# Install

## NPM
```javascript
npm i @observertc/schemas
```


# Versioning

Schemas uses semver of `MAJOR`.`MINOR`.`PATCH` version number. 
In ObserveRTC this semver structure is mapped to `ConceptVersion`.`SamplesVersion`.`ReportsVersion`.

Increasing the number of `PATCH`, `MINOR`, or `MAJOR` imply the followings:
 * `PATCH` changes on the schema imply add, remove or modify fields in the Reports, but exclude any changes in the Samples
 * `MINOR` changes on the schema imply add, remove or modify fields in Reports and Samples.
 * `MAJOR` changes on the schema imply groundbreaking conceptual changes in the schema renders it incompatible with the previous concept.

## Change the schema

### Schema change requests

Depending on which minor (or major) version is coming, you can write it in the [discussion](https://github.com/ObserveRTC/schemas/discussions).


## Create PR for schema changes

Discussion is good to request a schema, PR is better.
Step to create a PR (after you cloned the repo):
1. create your branch
2. change the [source of the schemas](/sources), `sources/version.txt`, trace the change in the `sources/CHANGELOG.md`.
3. Generate `npm-lib` typescripts (see below)
4. open the PR




# Develop

To run the schema generator for npm-lib:

```javascript
  git clone https://github.com/observertc/schemas && \
  cd schemas && \
  npm i && \
  node index.js
```


