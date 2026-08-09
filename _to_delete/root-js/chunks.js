const INCLUDE_CHUNK_PATTERN = /\"@include-chunk ([\w-]+)\"/g;
const chunks = new Map();

export function add(chunkId, chunk) {
    if (chunks.has(chunkId)) {
        throw new Error(`${chunkId} has already been registered`);
    }
    chunks.set(chunkId, chunk);
    // console.log(chunkId, "has been added");
}

export function chunkIds() {
    return Array.from(chunks.keys());
}

export function paste(str) {
    let result = str;
    let match = INCLUDE_CHUNK_PATTERN.exec(str);
    const replaces = new Map();
    while (match !== null) {
        const chunkId = match[1];
        const chunk = chunks.get(chunkId);
        replaces.set(
            `"@include-chunk ${chunkId}"`,
            chunk
        );
        match = INCLUDE_CHUNK_PATTERN.exec(result);
    }
    for (const [from, to] of replaces.entries()) {
        result = result.replace(from, to);
    }
    // console.log(result);
    return result;
}