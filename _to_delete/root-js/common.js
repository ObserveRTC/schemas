
export function parseVersion(version) {
    const arr = version.split('.');
    const major = parseInt(arr[0]) || 0;
    const minor = parseInt(arr[1]) || 0;
    const patch = parseInt(arr[2]) || 0;
    return {
        major,
        minor,
        patch
    }
}

export function removeComments(string){
    //Takes a string of code, not an actual function.
    return string.replace(/\/\*[\s\S]*?\*\/|\/\/.*/g,'').trim();//Strip comments
}

export function replaceAll(str, find, replace) {
    if (!str) {
        return str;
    }
    return str.replace(new RegExp(find, 'g'), replace);
}

export function fieldComparator(a, b) {
    if (a.required && b.required) {
        return 10 + a.name.localeCompare(b.name);
    }
    if (!a.required && !b.required) {
        return a.name.localeCompare(b.name);
    }
    const priorityA = a.required ? 10 : 0;
    const priorityB = b.required ? 10 : 0;
    return priorityB - priorityA;
}

export function nameConverter(fieldName) {
    // if (fieldName === "SSRC") {
    //     return "ssrc";
    // }
    fieldName = fieldName.replace("SSRC", "ssrc").replace("SFU", "sfu").replace("ICE", "ice");
    fieldName = fieldName[0].toLowerCase() + fieldName.slice(1);
    return fieldName.replace(/[A-Z]/g, (letter) => `_${letter.toLowerCase()}`);
}
