const decoder = new TextDecoder();

export function bytesArrayToString(bytes: Uint8Array): string {
	return decoder.decode(bytes);
}

export function byteArrayToUuid(byteArray: Uint8Array): string {
	if (byteArray.length !== 16) {
		throw new Error('Invalid byte array length for UUID conversion');
	}

	const toHex = (n: number) => n.toString(16).padStart(2, '0');
	const parts = [
		byteArray.subarray(0, 4),
		byteArray.subarray(4, 6),
		byteArray.subarray(6, 8),
		byteArray.subarray(8, 10),
		byteArray.subarray(10, 16),
	];

	return parts.map((part) => Array.from(part).map(toHex).join('')).join('-');
}
  