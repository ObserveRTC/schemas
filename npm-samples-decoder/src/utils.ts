const textDecoder = new TextDecoder();

export const logger = {
	debug: (...args: unknown[]) => {
		// console.debug(...args);
	},
	error: (...args: unknown[]) => {
		// console.error(...args);
	},
	warn: (...args: unknown[]) => {
		console.warn(...args);
	},
	info: (...args: unknown[]) => {
		console.info(...args);
	},
}

export interface Decoder<I, O> {
	actualValue?: O;
	decode(newValue?: I): O | undefined;
	reset(): void;
}
export interface AttachmentDecoder extends Decoder<string, Record<string, unknown>> {
	reset(): void;
}


export type ClientSampleDecoderSettings = {
	callIdIsUuid?: boolean;
	clientIdIsUuid?: boolean;
	peerConnectionIdIsUuid?: boolean;
	trackIdIsUuid?: boolean;
};

export interface AttachmentsDecoderFactory {
	createIceCandidatePairAttachmentDecoder(): AttachmentDecoder;
	createCodecStatsAttachmentDecoder(): AttachmentDecoder;
	createMediaSourceAttachmentDecoder(): AttachmentDecoder;
	createMediaPlayoutAttachmentDecoder(): AttachmentDecoder;
	createClientSampleAttachmentDecoder(): AttachmentDecoder;
	createPeerConnectionSampleAttachmentDecoder(): AttachmentDecoder;
	createCertificateAttachmentDecoder(): AttachmentDecoder;
	createIceCandidateAttachmentDecoder(): AttachmentDecoder;
	createIceTransportAttachmentDecoder(): AttachmentDecoder;
	createInboundTrackAttachmentDecoder(): AttachmentDecoder;
	createOutboundTrackAttachmentDecoder(): AttachmentDecoder;
	createInboundRtpAttachmentDecoder(): AttachmentDecoder;
	createOutboundRtpAttachmentDecoder(): AttachmentDecoder;
	createDataChannelAttachmentDecoder(): AttachmentDecoder;
	createRemoteInboundRtpAttachmentDecoder(): AttachmentDecoder;
	createRemoteOutboundRtpAttachmentDecoder(): AttachmentDecoder;
	createPeerConnectionTransportAttachmentDecoder(): AttachmentDecoder;
}

export class DefaultAttachmentDecoderFactory implements AttachmentsDecoderFactory {
	public createIceCandidatePairAttachmentDecoder(): AttachmentDecoder {
		return new DefaultAttachmentDecoder();
	}
	
	public createCodecStatsAttachmentDecoder(): AttachmentDecoder {
		return new DefaultAttachmentDecoder();
	}

	public createClientSampleAttachmentDecoder(): AttachmentDecoder {
		return new DefaultAttachmentDecoder();
	}

	public createInboundTrackAttachmentDecoder(): AttachmentDecoder {
		return new DefaultAttachmentDecoder();
	}

	public createOutboundTrackAttachmentDecoder(): AttachmentDecoder {
		return new DefaultAttachmentDecoder();
	}
	
	public createPeerConnectionSampleAttachmentDecoder(): AttachmentDecoder {
		return new DefaultAttachmentDecoder();
	}

	public createCertificateAttachmentDecoder(): AttachmentDecoder {
		return new DefaultAttachmentDecoder();
	}

	public createIceCandidateAttachmentDecoder(): AttachmentDecoder {
		return new DefaultAttachmentDecoder();
	}

	public createIceTransportAttachmentDecoder(): AttachmentDecoder {
		return new DefaultAttachmentDecoder();
	}

	public createInboundRtpAttachmentDecoder(): AttachmentDecoder {
		return new DefaultAttachmentDecoder();
	}

	public createOutboundRtpAttachmentDecoder(): AttachmentDecoder {
		return new DefaultAttachmentDecoder();
	}

	public createDataChannelAttachmentDecoder() {
		return new DefaultAttachmentDecoder();
	}

	public createRemoteInboundRtpAttachmentDecoder() {
		return new DefaultAttachmentDecoder();
	}

	public createRemoteOutboundRtpAttachmentDecoder() {
		return new DefaultAttachmentDecoder();
	}

	public createMediaSourceAttachmentDecoder() {
		return new DefaultAttachmentDecoder();
	}

	public createMediaPlayoutAttachmentDecoder() {
		return new DefaultAttachmentDecoder();
	}

	public createPeerConnectionTransportAttachmentDecoder() {
		return new DefaultAttachmentDecoder();
	}
}


export class DefaultAttachmentDecoder implements AttachmentDecoder {
	private _actual?: { value: string; data: Record<string, unknown> };

	public get actualValue() {
		return this._actual?.data;
	}
	
	public set actualValue(value: Record<string, unknown> | undefined) {
		if (!value) return;
		this._actual = {
			value: JSON.stringify(value),
			data: value,
		};
	}

	public constructor() {

	}

	public reset() {
		this._actual = undefined;
	}

	decode(newValue?: string) {
		if (!newValue) return this._actual?.data;
		if (this._actual && newValue === this._actual.value) return this._actual.data;
		if (newValue === undefined) return;

		this._actual = {
			value: newValue,
			data: JSON.parse(newValue),
		};

		return this._actual.data;
	}
}

export class OneTimePassDecoder<T> implements Decoder<T, T> {
	public actualValue: T | undefined;

	public reset() {
		this.actualValue = undefined;
	}

	decode(newValue?: T) {
		if (this.actualValue !== undefined) return;
		this.actualValue = newValue;
		return newValue;
	}
}

export class OneTimePassUuidByteArrayToStringDecoder implements Decoder<Uint8Array, string> {
	public actualValue?: string;

	public reset() {
		this.actualValue = undefined;
	}

	decode(newValue?: Uint8Array) {
		if (newValue === undefined || this.actualValue) return this.actualValue;
		this.actualValue = uuidByteArrayToString(newValue);

		return this.actualValue;
	}
}

export class OneTimePassByteArrayToStringDecoder implements Decoder<Uint8Array, string> {
	public actualValue?: string;

	public reset() {
		this.actualValue = undefined;
	}

	decode(newValue?: Uint8Array) {
		if (newValue === undefined || this.actualValue) return this.actualValue;
		
		this.actualValue = textDecoder.decode(newValue);
		
		return this.actualValue;
	}
}

export class StringToStringDecoder implements Decoder<string, string> {
	public actualValue: string | undefined;

	public reset() {
		this.actualValue = undefined;
	}

	decode(newValue?: string) {
		if (newValue === undefined) return this.actualValue;
		
		this.actualValue = newValue;
		
		return newValue;
	}
}

export class Uint8ArrayToStringDecoder implements Decoder<Uint8Array, string> {
	public actualValue: string | undefined;

	public reset() {
		this.actualValue = undefined;
	}

	decode(newValue?: Uint8Array) {
		if (!newValue) return this.actualValue;
		this.actualValue = textDecoder.decode(newValue);

		return this.actualValue;
	}
}

export class NumberToStringDecoder implements Decoder<number, string> {
	public actualValue: string | undefined;

	public reset() {
		this.actualValue = undefined;
	}

	decode(newValue?: number) {
		if (newValue === undefined) return this.actualValue;
		this.actualValue = `${newValue}`;

		return this.actualValue;
	}
}

export class BigIntToNumberDecoder implements Decoder<bigint, number> {
	public actualValue: number | undefined;

	public reset() {
		this.actualValue = undefined;
	}

	decode(newValue?: bigint) {
		if (newValue === undefined) return this.actualValue;
		this.actualValue = Number(newValue);

		return this.actualValue;
	}
}

export class NumberToNumberDecoder implements Decoder<number, number> {
	public actualValue: number | undefined;

	public reset() {
		this.actualValue = undefined;
	}

	decode(newValue?: number) {
		if (newValue === undefined) return this.actualValue;

		this.actualValue = newValue;

		return newValue;
	}
}

export class BooleanToBooleanDecoder implements Decoder<boolean, boolean> {
	public actualValue: boolean | undefined;

	public reset() {
		this.actualValue = undefined;
	}

	decode(newValue?: boolean) {
		if (!newValue) return this.actualValue;
		this.actualValue = newValue;

		return newValue;
	}
}


export function bytesArrayToString(bytes: Uint8Array): string {
	return textDecoder.decode(bytes);
}

export function uuidByteArrayToString(byteArray: Uint8Array): string {
	if (byteArray.length !== 16) {
		throw new Error('Invalid byte array length for UUID conversion');
	}

	const toHex = (n: number) => n.toString(16).padStart(2, '0');
	const parts = [
		byteArray.subarray(0, 4),
		byteArray.subarray(4, 6),
		byteArray.subarray(6, 8),
		byteArray.subarray(8, 10),
		byteArray.subarray(10, 16),
	];

	return parts.map((part) => Array.from(part).map(toHex).join('')).join('-');
}
  


/* Base64 string to array encoding */
function uint6ToB64(nUint6: number) {
	return nUint6 < 26
	  ? nUint6 + 65
	  : nUint6 < 52
	  ? nUint6 + 71
	  : nUint6 < 62
	  ? nUint6 - 4
	  : nUint6 === 62
	  ? 43
	  : nUint6 === 63
	  ? 47
	  : 65;
  }
  

export function convertUint8ToBase64(aBytes: Uint8Array) {
	let nMod3 = 2;
	let sB64Enc = "";
  
	const nLen = aBytes.length;
	let nUint24 = 0;
	for (let nIdx = 0; nIdx < nLen; nIdx++) {
	  nMod3 = nIdx % 3;
	  // To break your base64 into several 80-character lines, add:
	  //   if (nIdx > 0 && ((nIdx * 4) / 3) % 76 === 0) {
	  //      sB64Enc += "\r\n";
	  //    }
  
	  nUint24 |= aBytes[nIdx] << ((16 >>> nMod3) & 24);
	  if (nMod3 === 2 || aBytes.length - nIdx === 1) {
		sB64Enc += String.fromCodePoint(
		  uint6ToB64((nUint24 >>> 18) & 63),
		  uint6ToB64((nUint24 >>> 12) & 63),
		  uint6ToB64((nUint24 >>> 6) & 63),
		  uint6ToB64(nUint24 & 63)
		);
		nUint24 = 0;
	  }
	}
	return (
	  sB64Enc.substring(0, sB64Enc.length - 2 + nMod3) +
	  (nMod3 === 2 ? "" : nMod3 === 1 ? "=" : "==")
	);
}