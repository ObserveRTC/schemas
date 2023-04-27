## ObserveRTC Schemas

Schemas describe the communication between services in the ObserveRTC stack. The schema is manifested into different languages to make it easy to integrate ObserveRTC. Currently, the following language bindings are generated from the schema:

* [TypeScript/JavaScript](#npm) available as an npm library.
* [Redshift](redshift-tables/) to integrate reports for AWS Redshift.
* [CSV](csv-headers/) when exporting reports in CSV format from the observer, the order of the columns might be important.


# Install

## NPM
```javascript
npm i @observertc/schemas
```


# Versioning
Schemas use SemVer version numbers of `MAJOR`.`MINOR`.`PATCH`.

Increasing the number of `PATCH`, `MINOR`, or `MAJOR` implies the following:

 * `PATCH` indicates a change in the related libraries (e.g., bugfix in encoder/decoder).
 * `MINOR` the source schema has been altered.
 * `MAJOR` implies conceptual changes in the schema.

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


