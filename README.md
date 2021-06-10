## Schema Generator for ObserveRTC

```shell
optional arguments:
  -h, --help            show this help message and exit
  -o OUTPUTPATH, --outputPath OUTPUTPATH
                        The output path the schemas will be generated
  -md MARKDOWNS, --markdowns MARKDOWNS
                        flag to determine if markdown should be generated or not
  -m META, --meta META  flag to determine if the meta.txt is added to the output path or not

```

## Use cases

#### Generate schemas and markdown docs to `./generated-schemas`

```shell
    node index.js
```


#### Generate only the schema files without meta or markdown to a different destination

```shell
    node index.js -o "./path/to/dest/dir/" -md=false -m=false
```

