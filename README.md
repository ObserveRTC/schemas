## Schema Generator Helper App for ObserveRTC

```shell
optional arguments:
  -h, --help            show this help message and exit
  -o OUTPUTPATH, --outputPath OUTPUTPATH
                        The output path the schemas will be generated
  -ro REPORTSOUTPUT, --reportsOutput REPORTSOUTPUT
                        The explicit output path for the generated report schemas and markdowns.
  -so SAMPLESOUTPUT, --samplesOutput SAMPLESOUTPUT
                        The explicit output path for the generated sample schemas and markdowns.
  -m MARKDOWNS, --markdowns MARKDOWNS
                        flag to determine if markdown should be generated or not
  -av ADDSVERSIONTXT, --addsVersionTxt ADDSVERSIONTXT
                        flag to determine if the version.txt is added to the output or not
```

## Use cases

#### Generate schemas and markdown docs to `./generated/schemas`

```shell
    node index.js
```


#### Generate avro schema of the latest report outputs of `observer`

```shell
    node index.js -ro "./path/to/dest/dir/" -m=false -av=false
```

#### Generate json schema of the latest sample outputs of `observer-js`

```shell
    node index.js -so "./path/to/dest/dir/" -m=false -av=false
```

