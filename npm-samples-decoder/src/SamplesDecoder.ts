import { 
	ClientSample,
	Samples as OutputSamples 
} from "./OutputSamples";
import { ClientSampleDecoder } from "./ClientSampleDecoder";

import { Samples as InputSamples } from './InputSamples';
import { byteArrayToUuid } from "./decodingTools";

export class SamplesDecoder {
	private _clientSampleDecoders = new Map<string, ClientSampleDecoder>();

	public decodeFromUint8Array(input: Uint8Array): OutputSamples {
		const inputSamples = InputSamples.fromBinary(input);
		return this.decodeToProtobufSamples(inputSamples);
	}

	public decodeFromBase64(input: string): OutputSamples {
		const bytes = Buffer.from(input, 'base64');
		const inputSamples = InputSamples.fromBinary(bytes);
		return this.decodeToProtobufSamples(inputSamples);
	}

	public decodeToProtobufSamples(input: InputSamples): OutputSamples {
		const clientSamples: ClientSample[] = [];
		try {
			for (const encodedClientSample of (input.clientSamples ?? [])) {
				if (!encodedClientSample.clientId) {
					continue;
				}
				const clientId = byteArrayToUuid(encodedClientSample.clientId);
				let decoder = this._clientSampleDecoders.get(clientId);
				if (!decoder) {
					decoder = new ClientSampleDecoder();
					this._clientSampleDecoders.set(clientId, decoder);
				}
				const clientSample = decoder.decodeProtobufSample(encodedClientSample);
				clientSamples.push(clientSample);
			}
		} catch (err ) {
			console.error(`Error occurred while decoding client sample`, err);
		}

		for (const [clientId, decoder] of Array.from(this._clientSampleDecoders.entries())) {
			if (decoder.visited) continue;
			this._clientSampleDecoders.delete(clientId);
		}
		const result: OutputSamples = {
			clientSamples,
		}
		return result;
	}
}