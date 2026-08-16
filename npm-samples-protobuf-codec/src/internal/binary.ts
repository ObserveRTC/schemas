/**
 * Byte helpers that work unchanged in Node, Deno, Bun and the browser.
 *
 * This package is meant to run inside the WebRTC client that produces the
 * samples, so nothing here may reach for `Buffer`.
 */

const textEncoder = new TextEncoder();
const textDecoder = new TextDecoder();

const BASE64_ALPHABET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';
const BASE64_LOOKUP = /* @__PURE__ */ (() => {
	const table = new Uint8Array(128).fill(255);
	for (let index = 0; index < BASE64_ALPHABET.length; index += 1) {
		table[BASE64_ALPHABET.charCodeAt(index)] = index;
	}
	return table;
})();

const HEX_BYTES = /* @__PURE__ */ (() =>
	Array.from({ length: 256 }, (_, byte) => byte.toString(16).padStart(2, '0')))();

export function utf8ToBytes(value: string): Uint8Array {
	return textEncoder.encode(value);
}

export function bytesToUtf8(value: Uint8Array): string {
	return textDecoder.decode(value);
}

/** A canonical 8-4-4-4-12 UUID packed into its 16 significant bytes. */
export function uuidToBytes(value: string): Uint8Array | undefined {
	const hex = value.replace(/-/g, '');
	if (hex.length !== 32 || !/^[0-9a-fA-F]{32}$/.test(hex)) return undefined;

	const bytes = new Uint8Array(16);
	for (let index = 0; index < 16; index += 1) {
		bytes[index] = Number.parseInt(hex.slice(index * 2, index * 2 + 2), 16);
	}
	return bytes;
}

export function bytesToUuid(value: Uint8Array): string | undefined {
	if (value.length !== 16) return undefined;

	let hex = '';
	for (let index = 0; index < 16; index += 1) hex += HEX_BYTES[value[index]!];

	return `${hex.slice(0, 8)}-${hex.slice(8, 12)}-${hex.slice(12, 16)}-${hex.slice(16, 20)}-${hex.slice(20)}`;
}

export function bytesToBase64(bytes: Uint8Array): string {
	let result = '';
	let index = 0;

	for (; index + 2 < bytes.length; index += 3) {
		const chunk = (bytes[index]! << 16) | (bytes[index + 1]! << 8) | bytes[index + 2]!;
		result +=
			BASE64_ALPHABET[(chunk >> 18) & 63]! +
			BASE64_ALPHABET[(chunk >> 12) & 63]! +
			BASE64_ALPHABET[(chunk >> 6) & 63]! +
			BASE64_ALPHABET[chunk & 63]!;
	}

	const remaining = bytes.length - index;
	if (remaining === 1) {
		const chunk = bytes[index]! << 16;
		result += `${BASE64_ALPHABET[(chunk >> 18) & 63]!}${BASE64_ALPHABET[(chunk >> 12) & 63]!}==`;
	} else if (remaining === 2) {
		const chunk = (bytes[index]! << 16) | (bytes[index + 1]! << 8);
		result += `${BASE64_ALPHABET[(chunk >> 18) & 63]!}${BASE64_ALPHABET[(chunk >> 12) & 63]!}${BASE64_ALPHABET[(chunk >> 6) & 63]!}=`;
	}

	return result;
}

/** Returns `undefined` for input that is not valid base64. */
export function base64ToBytes(value: string): Uint8Array | undefined {
	const body = value.replace(/[\r\n\t ]/g, '');
	const padded = body.replace(/=+$/, '');
	if (padded.length % 4 === 1) return undefined;

	const bytes = new Uint8Array(Math.floor((padded.length * 3) / 4));
	let bitBuffer = 0;
	let bitCount = 0;
	let offset = 0;

	for (let index = 0; index < padded.length; index += 1) {
		const code = padded.charCodeAt(index);
		const sextet = code < 128 ? BASE64_LOOKUP[code]! : 255;
		if (sextet === 255) return undefined;

		bitBuffer = (bitBuffer << 6) | sextet;
		bitCount += 6;
		if (bitCount >= 8) {
			bitCount -= 8;
			bytes[offset++] = (bitBuffer >> bitCount) & 0xff;
		}
	}

	return bytes;
}
