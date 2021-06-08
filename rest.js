// Require the framework and instantiate it
const fastify = require('fastify')({ logger: true })
const avro = require('avro-js');
const fs = require('fs');
const PORT = 6688;

function removeComments(string){
    //Takes a string of code, not an actual function.
    return string.replace(/\/\*[\s\S]*?\*\/|\/\/.*/g,'').trim();//Strip comments
}
// avro-js brokes with comments, java did not.
function parseAvroSchemaFromPath(path) {
    console.log(path);
    const schemaText = fs.readFileSync(path, 'utf-8');
    const schemaString = removeComments(schemaText);
    const parsedSchema = avro.parse(schemaString);
    const parsedObject = JSON.parse(schemaString);
    return { parsedSchema, parsedObject };
}


function makeMdDoc(avroSchema) {
    const result = [
        "## " + avroSchema.name,
        "---",
        avroSchema.doc,
        "\n",
        "Name | Value | Description ",
        "--- | --- | ---",
    ];
    
    avroSchema.fields.forEach(field => {
        const value = field.default === undefined ? "Required " + field.type : "Optional " + field.type[1] + " (default: " + field.default + ")";
        const row = [field.name, value, field.doc].join(' | ');
        result.push(row)
    });
    return result.join('\n');
}

function makeReportEndpoint(schemaName) {
    const baseURI = "/" + schemaName;
    // let schema = JSON.parse(schemaBytes);
    let schemaResponse;
    let schemaObj;
    try {
        const path = "./reports/" + schemaName + ".avsc";
        const { parsedSchema, parsedObject } = parseAvroSchemaFromPath(path);
        schemaResponse = parsedSchema;
        schemaObj = parsedObject;
    } catch (error) {
        schemaResponse = error;
    }

    let mdResponse;
    try {
        mdResponse = makeMdDoc(schemaObj);
    } catch (error) {
        mdResponse = error;
    }
    
    fastify.get(baseURI, async () => {
        const path = "./reports/" + schemaName + ".avsc";
        const { parsedSchema, parsedObject } = parseAvroSchemaFromPath(path);
        schemaResponse = parsedSchema;
        return schemaResponse;
    });
    fastify.get(baseURI + "/md", async () => {
        return mdResponse;
    });
}

fastify.get('/', async (request, reply) => {
    return "ObserveRTC schema repository provider REST API"
})

// TEST:



const start = async () => {
    try {
        const reportSchemaNames = [
            "outbound-audio-track-report",
            "outbound-video-track-report",
            "inbound-audio-track-report",
            "inbound-video-track-report",
            "pc-transport-report",
            "pc-meta-report",
            "pc-data-channel-report",
            "observer-sentinel-report",
            "client-meta-report",
            "observed-extension-report",
            "call-meta-report"
        ];
        reportSchemaNames.forEach(schemaName => {
            makeReportEndpoint(schemaName);
        })
        
        await fastify.listen(PORT)
    } catch (err) {
        fastify.log.error(err)
        process.exit(1)
    }
}
start();
