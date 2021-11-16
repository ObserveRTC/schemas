## ObserveRTC Schemas

This repository contains schemas ObserveRTC uses as inputs and outputs in its services.

### Usage 

The generated schemas can be found in the folder `generated-schemas`.

If you want to generate it yourself locally, here is how you can use the app we wrote for it. 
 
 
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


