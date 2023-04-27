import { 
	Samples as InputSamples 
} from './InputSamples';
import { ClientSampleEncoder } from "./ClientSampleEncoder";

import { Samples as OutputSamples, Samples_ClientSample, Samples_SfuSample } from './OutputSamples';
import { convertUint8ToBase64 } from './encodingTools';
import { SfuSampleEncoder } from './SfuSampleEncoder';

export class SamplesEncoder {
	private _clientSampleEncoders = new Map<string, ClientSampleEncoder>();
	private _sfuSampleEncoders = new Map<string, SfuSampleEncoder>();
	
	public encodeToBytes(input: InputSamples): Uint8Array {
		const output = this.encodeToProtobufSamples(input);
		return output.toBinary();
	}

	public encodeToBase64(input: InputSamples): string {
		const output = this.encodeToProtobufSamples(input);
		const bytes = output.toBinary();
		return convertUint8ToBase64(bytes);
	}

	public encodeToProtobufSamples(input: InputSamples): OutputSamples {
		const clientSamples: Samples_ClientSample[] = [];
		try {
			for (const clientSample of (input.clientSamples ?? [])) {
				
				let encoder = this._clientSampleEncoders.get(clientSample.clientId);
				if (!encoder) {
					encoder = new ClientSampleEncoder();
					this._clientSampleEncoders.set(clientSample.clientId, encoder);
				}
				const encodedSample = encoder.encodeToProtobufSamples(clientSample);
				clientSamples.push(encodedSample);
			}
		} catch (err ) {
			console.error(`Error occurred while encoding client sample`, err);
		}

		for (const [clientId, encoder] of Array.from(this._clientSampleEncoders.entries())) {
			if (encoder.visited) continue;
			this._clientSampleEncoders.delete(clientId);
		}


		const sfuSamples: Samples_SfuSample[] = [];
		try {
			for (const sfuSample of (input.sfuSamples ?? [])) {
				
				let encoder = this._sfuSampleEncoders.get(sfuSample.sfuId);
				if (!encoder) {
					encoder = new SfuSampleEncoder();
					this._sfuSampleEncoders.set(sfuSample.sfuId, encoder);
				}
				const encodedSample = encoder.encodeToProtobufSamples(sfuSample);
				sfuSamples.push(encodedSample);
			}
		} catch (err ) {
			console.error(`Error occurred while encoding client sample`, err);
		}

		for (const [clientId, encoder] of Array.from(this._sfuSampleEncoders.entries())) {
			if (encoder.visited) continue;
			this._sfuSampleEncoders.delete(clientId);
		}
		
		return new OutputSamples({
			clientSamples,
		});
	}
}