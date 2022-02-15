Sources of ObserveRTC schemas
---

Source of the schemas follows the [Avro](https://avro.apache.org/) format, 
and each language binding contains the avro schema.

The source specific files, however contains have to be parsed and transformed in order to be compatible with the avro format. Source schema files contain comments, and generator interpreted annotation.

Schema descriptive files parsed by the generator are end with `.avsc`.
Included schema chunks end with `.avsc.chunk`. In schema file you can include chunks by adding `"@include-chunk [chunkName]"`.

Whenever the schema is changed `CHANGELOG` and `version.txt` must be modified. After generation and bindings the version inside version.txt gonna be the new schema version, and the Changelog is included in the published schema library.