/**
 * The compression half of the wire format: a deflate stream (zlib-wrapped,
 * RFC 1950 — the platform's `'deflate'` label) over the coded envelope, with a
 * one-byte header in front so a receiver can tell this codec's message from
 * any other byte string before it spends a cycle inflating.
 *
 * No compression library is involved: the browser's and Node's native
 * `CompressionStream` / `DecompressionStream` produce and consume the same
 * stream, which is what keeps this package dependency-free. The price is that
 * `compress` and `decompress` are async — intrinsic to the platform API, and
 * immaterial for a stats stream that ticks once a second.
 *
 * The zlib wrapper is deliberate over raw deflate: it carries an adler32
 * checksum, so a truncated or corrupted message fails the inflate instead of
 * coming back as half a sample.
 */

/** Byte 0 of every message: this codec. */
export const FORMAT_ID = 0x01;

/** `payload` -> the bytes that go on the wire. */
export async function compress(payload: Uint8Array): Promise<Uint8Array> {
	const stream = new CompressionStream('deflate');
	const writer = stream.writable.getWriter();
	writer.write(new Uint8Array(payload));
	writer.close();

	const body = new Uint8Array(await new Response(stream.readable).arrayBuffer());
	const out = new Uint8Array(body.length + 1);
	out[0] = FORMAT_ID;
	out.set(body, 1);
	return out;
}

/**
 * The bytes that come off the wire -> the payload.
 *
 * @throws {Error} on a bad header, a truncated stream or garbage that will not
 * inflate — the caller turns that into a `MALFORMED_INPUT`.
 */
export async function decompress(bytes: Uint8Array): Promise<Uint8Array> {
	if (bytes.length < 1 || bytes[0] !== FORMAT_ID) {
		throw new Error(
			`Not a deflate-codec message (expected format byte ${FORMAT_ID.toString(16)}, got ${
				bytes.length >= 1 ? bytes[0]!.toString(16) : `a ${bytes.length}-byte slice`
			})`,
		);
	}

	const body = bytes.subarray(1);
	if (body.length === 0) throw new Error('Message carries no payload');

	try {
		const stream = new DecompressionStream('deflate');
		const writer = stream.writable.getWriter();
		writer.write(new Uint8Array(body));
		writer.close();
		return new Uint8Array(await new Response(stream.readable).arrayBuffer());
	} catch (error) {
		throw new Error(`Payload will not inflate: ${error instanceof Error ? error.message : String(error)}`, {
			cause: error,
		});
	}
}
