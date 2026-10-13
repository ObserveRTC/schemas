import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { describe, expect, it } from 'vitest';

import { ClientSampleDecoder, ClientSampleEncoder } from '../src/index.js';
import { buildSampleStream } from './support/stream.js';

/**
 * The golden files pin the exact bytes on the wire: the base64 of every
 * message and its byte length, one entry per message. A change to the wire
 * format is legitimate only when it is deliberate — update the goldens then,
 * never silently.
 */
const CLIENT_ID = 'client-42';
const GOLDEN_FILE = join(__dirname, 'golden', 'json.json');

interface Golden {
	clientId: string;
	messages: string[];
	byteLengths: number[];
}

function readGolden(): Golden {
	const golden = JSON.parse(readFileSync(GOLDEN_FILE, 'utf8')) as Golden;
	if (golden.clientId !== CLIENT_ID) throw new Error(`golden file ${GOLDEN_FILE} names the wrong client`);
	return golden;
}

function b64(bytes: Uint8Array): string {
	return Buffer.from(bytes).toString('base64');
}

async function encodeStream(): Promise<Golden> {
	const encoder = new ClientSampleEncoder({ clientId: CLIENT_ID });
	const messages: string[] = [];
	const byteLengths: number[] = [];
	for (const sample of buildSampleStream()) {
		const bytes = await encoder.encode(sample);
		messages.push(b64(bytes));
		byteLengths.push(bytes.length);
	}
	return { clientId: CLIENT_ID, messages, byteLengths };
}

describe('golden wire format', () => {
	it('regenerates the goldens when asked', async () => {
		if (!process.env.UPDATE_GOLDENS) return;
		mkdirSync(GOLDEN_FILE.slice(0, GOLDEN_FILE.lastIndexOf('/')), { recursive: true });
		writeFileSync(GOLDEN_FILE, JSON.stringify(await encodeStream(), null, '\t') + '\n');
	});

	it('encodes the sample stream to exactly the golden bytes', async () => {
		if (!existsSync(GOLDEN_FILE))
			throw new Error(`missing golden ${GOLDEN_FILE} — run with UPDATE_GOLDENS=1`);

		expect(await encodeStream()).toEqual(readGolden());
	});

	it('decodes the golden bytes back to the samples exactly', async () => {
		const golden = readGolden();
		const samples = buildSampleStream();

		const decoder = new ClientSampleDecoder();
		for (const [index, message] of golden.messages.entries()) {
			const decoded = await decoder.decode(Buffer.from(message, 'base64'));
			expect(decoded, `golden message ${index}`).toEqual({ ...samples[index], clientId: CLIENT_ID });
		}
		expect(decoder.decodedSampleCount).toBe(golden.messages.length);
	});
});
