## ObserveRTC Schemas

Schemas describe the communication between services in the ObserveRTC stack. The schema is manifested into different languages to make it easy to integrate ObserveRTC. Currently, the following language bindings are generated from the schema:

* [TypeScript/JavaScript](#npm) available as an npm library.
* [Redshift](redshift-tables/) to integrate reports for AWS Redshift.
* [CSV](csv-headers/) when exporting reports in CSV format from the observer, the order of the columns might be important.


# Versioning
Schemas use SemVer version numbers of `MAJOR`.`MINOR`.`PATCH`.

Increasing the number of `PATCH`, `MINOR`, or `MAJOR` implies the following:

 * `PATCH` indicates a change in the related libraries (e.g., bugfix in encoder/decoder).
 * `MINOR` Represents the day of the WebRTC Stats draft published the schema is based on (e.g.: 20241107)
 * `MAJOR` implies conceptual changes in the schema.


