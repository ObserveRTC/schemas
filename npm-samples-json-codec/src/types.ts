import type { ClientSample } from './generated/samples.js';

/**
 * What goes on the wire: a `ClientSample` with the unchanged parts left out.
 *
 * Every field is optional at every depth, because any of them may be the one
 * that did not move this tick. Collections are the exception in spirit if not
 * in type — a delta always lists every entry the sample has, since presence is
 * what tells the decoder an entry is still in the call.
 */
export type ClientSampleDelta = DeepPartial<ClientSample>;

type DeepPartial<T> = T extends readonly (infer Element)[]
	? DeepPartial<Element>[]
	: T extends Record<string, unknown>
		? { [Key in keyof T]?: DeepPartial<T[Key]> }
		: T;
