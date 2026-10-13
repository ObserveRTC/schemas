/**
 * The package's boundary types and guards: what untrusted data (wire
 * envelopes, delta payloads) narrows to, and the one canonical guard for it.
 * Never recreate the guard at call sites — import it from here.
 */

/** A JSON object: the shape every envelope payload and delta narrows to. */
export type JsonRecord = Record<string, unknown>;

/** The canonical object guard for boundary data. Fields remain `unknown`. */
export function isRecord(value: unknown): value is JsonRecord {
	return value !== null && typeof value === 'object' && !Array.isArray(value);
}
