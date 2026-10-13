import { FieldNameDictionary } from './dictionary.js';
import type { JsonRecord } from './guards.js';
import { DeflateCodecError } from './errors.js';

/**
 * The envelope that goes through the compressor: the delta with its field
 * names replaced by dictionary codes.
 *
 * ```
 * {
 *   "v": 1,                  // wire version
 *   "t": 0 | 1,              // 0 = snapshot (chain head), 1 = delta
 *   "d": ["timestamp", ...], // dictionary entries added by this message
 *   "n": 47,                 // dictionary size after this message (desync guard)
 *   "s": { "0": 1756, "1": [ { "2": "pc-01", ... } ] }
 * }
 * ```
 *
 * Coded names are integer dictionary codes, so a delta that says "jitter on
 * this stream is now 12" is a few hundred characters, not a few thousand —
 * and the compressor then does its usual work on top. The envelope is plain
 * JSON on purpose: inflate a message and it is readable.
 */
export interface CodedEnvelope {
	readonly v: 1;
	readonly t: 0 | 1;
	readonly d: string[];
	/** The dictionary size after this message — the desync guard. */
	readonly n: number;
	readonly s: unknown;
}

export const ENVELOPE_VERSION = 1 as const;

/**
 * `delta` -> the JSON text that gets compressed.
 *
 * `snapshot` marks the first message after a reset: a full sample, decodable
 * by a fresh decoder. It is the chain head of the delta stream.
 */
export function serialize(
	delta: JsonRecord,
	snapshot: boolean,
	dictionary: FieldNameDictionary,
): string {
	const before = dictionary.size;
	const coded = codeValue(delta, dictionary);
	const additions = dictionary.drainAdditions(before);

	const envelope: CodedEnvelope = {
		v: ENVELOPE_VERSION,
		t: snapshot ? 0 : 1,
		d: additions,
		n: dictionary.size,
		s: coded,
	};
	return JSON.stringify(envelope);
}

/** The JSON text -> the plain delta object, with dictionary entries applied. */
export function deserialize(text: string, dictionary: FieldNameDictionary): { delta: JsonRecord; snapshot: boolean } {
	let parsed: unknown;
	try {
		parsed = JSON.parse(text);
	} catch (error) {
		throw new DeflateCodecError('MALFORMED_INPUT', 'Envelope is not valid JSON', {}, {
			cause: error,
		});
	}

	if (typeof parsed !== 'object' || parsed === null || Array.isArray(parsed)) {
		throw new DeflateCodecError('MALFORMED_INPUT', 'Envelope is not an object');
	}

	const envelope = parsed as Partial<CodedEnvelope>;
	if (envelope.v !== ENVELOPE_VERSION) {
		throw new DeflateCodecError('MALFORMED_INPUT', `Unsupported envelope version ${String(envelope.v)}`);
	}
	if (envelope.t !== 0 && envelope.t !== 1) {
		throw new DeflateCodecError('MALFORMED_INPUT', `Envelope type must be 0 or 1, got ${String(envelope.t)}`);
	}
	if (envelope.s === undefined) {
		throw new DeflateCodecError('MALFORMED_INPUT', 'Envelope carries no sample');
	}
	if (envelope.d !== undefined && (!Array.isArray(envelope.d) || envelope.d.some((entry) => typeof entry !== 'string'))) {
		throw new DeflateCodecError('MALFORMED_INPUT', 'Envelope dictionary must be a list of names');
	}

	// The new names must be in the dictionary before the coded sample is read:
	// a message may use a name for the first time in the very field that names
	// it.
	dictionary.append(envelope.d ?? []);

	if (envelope.n !== dictionary.size) {
		throw new DeflateCodecError('MALFORMED_INPUT',
			`Dictionary desync: message expects ${String(envelope.n)} names, decoder has ${dictionary.size} — the stream was not read from its start`,
			{ path: 'd' });
	}

	const decoded = decodeValue(envelope.s, 's', dictionary);
	if (typeof decoded !== 'object' || decoded === null || Array.isArray(decoded)) {
		throw new DeflateCodecError('MALFORMED_INPUT', 'Coded sample is not an object');
	}
	return { delta: decoded as JsonRecord, snapshot: envelope.t === 0 };
}

function codeValue(value: unknown, dictionary: FieldNameDictionary): unknown {
	if (Array.isArray(value)) return value.map((entry) => codeValue(entry, dictionary));
	if (typeof value !== 'object' || value === null) return value;

	const coded: JsonRecord = {};
	for (const [key, entry] of Object.entries(value)) {
		coded[String(dictionary.add(key))] = codeValue(entry, dictionary);
	}
	return coded;
}

function decodeValue(value: unknown, path: string, dictionary: FieldNameDictionary): unknown {
	if (Array.isArray(value)) return value.map((entry, index) => decodeValue(entry, `${path}[${index}]`, dictionary));
	if (typeof value !== 'object' || value === null) return value;

	const decoded: JsonRecord = {};
	for (const [key, entry] of Object.entries(value)) {
		const code = Number(key);
		if (!Number.isInteger(code) || code < 0) {
			throw new DeflateCodecError('MALFORMED_INPUT', `Coded key "${key}" is not a dictionary code`, {
				path: `${path}.${key}`,
			});
		}
		let name: string;
		try {
			name = dictionary.name(code);
		} catch {
			throw new DeflateCodecError('MALFORMED_INPUT', `Dictionary code ${code} is unknown`, {
				path: `${path}.${key}`,
			});
		}
		decoded[name] = decodeValue(entry, `${path}.${name}`, dictionary);
	}
	return decoded;
}
