/**
 * Strip `//` and block comments from a JSON document without touching comment
 * markers that appear inside string literals.
 *
 * The legacy implementation was a single regex over the whole file, which would
 * happily eat the tail of any doc string containing `//` (a URL, for example).
 * No current source triggers that, so this is behaviour-preserving today and
 * simply stops being a trap tomorrow.
 */
export function stripJsonComments(source: string): string {
	let out = '';
	let index = 0;

	while (index < source.length) {
		const char = source[index]!;

		if (char === '"') {
			const end = findStringEnd(source, index);
			out += source.slice(index, end);
			index = end;
			continue;
		}

		if (char === '/' && source[index + 1] === '/') {
			const newline = source.indexOf('\n', index);
			index = newline === -1 ? source.length : newline;
			continue;
		}

		if (char === '/' && source[index + 1] === '*') {
			const end = source.indexOf('*/', index + 2);
			index = end === -1 ? source.length : end + 2;
			continue;
		}

		out += char;
		index += 1;
	}

	return out.trim();
}

/** Index just past the closing quote of the string literal starting at `start`. */
function findStringEnd(source: string, start: number): number {
	let index = start + 1;
	while (index < source.length) {
		const char = source[index]!;
		if (char === '\\') {
			index += 2;
			continue;
		}
		if (char === '"') return index + 1;
		index += 1;
	}
	return source.length;
}
