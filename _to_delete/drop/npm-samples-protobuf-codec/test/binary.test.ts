import { describe, expect, it } from 'vitest';

import {
	base64ToBytes,
	bytesToBase64,
	bytesToUtf8,
	bytesToUuid,
	utf8ToBytes,
	uuidToBytes,
} from '../src/internal/binary.js';

/**
 * These helpers exist so the package never touches `Buffer` — it runs inside the
 * browser that produces the samples. `Buffer` is fine to *test* against, though,
 * and makes a good independent oracle.
 */
describe('binary helpers', () => {
	it('agrees with Buffer on base64, at every padding length', () => {
		for (let length = 0; length < 64; length += 1) {
			const bytes = Uint8Array.from({ length }, (_, index) => (index * 37 + 11) & 0xff);
			expect(bytesToBase64(bytes), `length ${length}`).toBe(Buffer.from(bytes).toString('base64'));
			expect(base64ToBytes(bytesToBase64(bytes))).toEqual(bytes);
		}
	});

	it('accepts base64 with and without padding, and whitespace', () => {
		const bytes = new Uint8Array([1, 2, 3, 4, 5]);
		const encoded = bytesToBase64(bytes);

		expect(base64ToBytes(encoded)).toEqual(bytes);
		expect(base64ToBytes(encoded.replace(/=+$/, ''))).toEqual(bytes);
		expect(base64ToBytes(`${encoded.slice(0, 4)}\n${encoded.slice(4)}`)).toEqual(bytes);
	});

	it('rejects strings that are not base64', () => {
		expect(base64ToBytes('a')).toBeUndefined();
		expect(base64ToBytes('****')).toBeUndefined();
		expect(base64ToBytes('ab$d')).toBeUndefined();
	});

	it('round-trips uuids through their 16 significant bytes', () => {
		const uuid = '6b3f0e1a-2c4d-4f8b-9a1e-0d7c5b3a2f10';
		const bytes = uuidToBytes(uuid)!;

		expect(bytes).toHaveLength(16);
		expect(bytesToUuid(bytes)).toBe(uuid);
		// Half the size of the textual form — the entire reason these are bytes.
		expect(bytes.byteLength * 2).toBeLessThan(uuid.length);
	});

	it('normalises uppercase uuids and rejects anything else', () => {
		expect(bytesToUuid(uuidToBytes('6B3F0E1A-2C4D-4F8B-9A1E-0D7C5B3A2F10')!)).toBe(
			'6b3f0e1a-2c4d-4f8b-9a1e-0d7c5b3a2f10',
		);
		expect(uuidToBytes('not-a-uuid')).toBeUndefined();
		expect(uuidToBytes('')).toBeUndefined();
		expect(bytesToUuid(new Uint8Array(15))).toBeUndefined();
	});

	it('round-trips utf8, including characters outside the BMP', () => {
		for (const value of ['', 'plain', 'ümlaut', '日本語', '👋🏽 done']) {
			expect(bytesToUtf8(utf8ToBytes(value))).toBe(value);
		}
	});
});
