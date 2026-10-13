/**
 * What goes on the wire: a `ClientSample` with the unchanged parts left out,
 * down to the individual stat field of each entry in each peer-connection
 * list (see `structuralDiff.ts` for the rules).
 *
 * A peer-connection list in a delta is one of two shapes:
 *
 * - `{ l: [ … ] }` — the whole list (its id sequence changed: an entry was
 *   added, removed, or reordered);
 * - `{ e: [ … ] }` — per-entry changes: an object with an `id` and its
 *   changed fields updates the entry, an object with a field outside the
 *   list's vocabulary replaces it whole, and a bare string removes the entry
 *   with that id.
 */

/** A per-entry change: the entry's id plus its changed fields. */
export type EntryUpdate = { readonly id: string } & Record<string, unknown>;

/** A list delta: whole-list replacement, or per-entry changes. */
export type ListDelta =
	| { readonly l: readonly unknown[] }
	| { readonly e: readonly (EntryUpdate | string)[] };

/** A delta object: the sample's changed fields; peer-connection lists as above. */
export type ClientSampleDelta = Record<string, unknown> & {
	readonly peerConnections?: Array<Record<string, unknown>>;
};
