import { fromBinary, toBinary } from '@bufbuild/protobuf';
import { describe, expect, it } from 'vitest';

import {
	ClientSampleDecoder,
	ClientSampleEncoder,
	protobuf,
	PROTO_PACKAGE,
	schemaVersion,
} from '../src/index.js';
import { buildSampleStream } from './support/stream.js';

describe('interop surface', () => {
	it('exposes the schema version and proto package it speaks', () => {
		expect(schemaVersion).toMatch(/^\d+\.\d+\.\d+$/);
		expect(PROTO_PACKAGE).toBe('org.observertc.schemas.protobuf');
		expect(protobuf.ClientSampleSchema.typeName).toBe(`${PROTO_PACKAGE}.ClientSample`);
	});

	it('hands out a real protobuf message that third-party tooling can read', () => {
		const encoder = new ClientSampleEncoder({ clientId: 'client-42' });
		const message = encoder.encodeToMessage(buildSampleStream({ sampleCount: 1 })[0]!);

		// Serialise and parse with the runtime directly, bypassing this package.
		const reparsed = fromBinary(
			protobuf.ClientSampleSchema,
			toBinary(protobuf.ClientSampleSchema, message),
		);

		expect(reparsed.clientId).toEqual(new TextEncoder().encode('client-42'));
		expect(reparsed.peerConnections).toHaveLength(1);
		expect(reparsed.peerConnections[0]!.inboundRtps[0]!.ssrc).toBe(1_234_567_890n);
	});

	it('accepts a message that was parsed elsewhere', () => {
		const samples = buildSampleStream({ sampleCount: 3 });
		const encoder = new ClientSampleEncoder({ clientId: 'client-42' });
		const decoder = new ClientSampleDecoder();

		for (const sample of samples) {
			const bytes = encoder.encode(sample);
			const message = fromBinary(protobuf.ClientSampleSchema, bytes);
			expect(decoder.decodeFromMessage(message)).toEqual({ ...sample, clientId: 'client-42' });
		}
	});

	it('an encoder and a decoder that disagree about uuid packing do not silently agree', () => {
		const sample = buildSampleStream({ sampleCount: 1 })[0]!;
		const encoder = new ClientSampleEncoder({
			clientId: '6b3f0e1a-2c4d-4f8b-9a1e-0d7c5b3a2f10',
			identifiers: { clientId: 'uuid' },
		});
		const decoder = new ClientSampleDecoder();

		// 16 raw bytes read as utf8 is mojibake rather than an error, which is
		// exactly why `createClientSampleCodec` exists. Pin the behaviour so the
		// README's warning stays true.
		expect(decoder.decode(encoder.encode(sample)).clientId).not.toBe(
			'6b3f0e1a-2c4d-4f8b-9a1e-0d7c5b3a2f10',
		);
	});
});
