const textEncoder = new TextEncoder();

// export interface Logger {
// 	info(...args: string[]): void;
// 	warn(...args: string[]): void;
// 	error(...args: string[]): void;
// }

// export class DefaultLogger implements Logger {
// 	info(...args: string[]) {
// 		console.info(...args);
// 	}

// 	warn(...args: string[]) {
// 		console.warn(...args);
// 	}

// 	error(...args: string[]) {
// 		console.error(...args);
// 	}
// }

export interface Encoder<I, O> {
	actualValue?: I;
	encode(newValue?: I): O | undefined;
	reset(): void;
}
export interface AttachmentEncoder extends Encoder<Record<string, unknown>, string> {
	reset(): void;
}


export type ClientSampleEncoderSettings = {
	callIdIsUuid?: boolean;
	clientIdIsUuid?: boolean;
	peerConnectionIdIsUuid?: boolean;
	trackIdIsUuid?: boolean;
};

export interface AttachmentsEncoderFactory {
	createIceCandidatePairAttachmentEncoder(): AttachmentEncoder;
	createCodecStatsAttachmentEncoder(): AttachmentEncoder;
	createClientSampleAttachmentEncoder(): AttachmentEncoder;
	createPeerConnectionSampleAttachmentEncoder(): AttachmentEncoder;
	createCertificateAttachmentEncoder(): AttachmentEncoder;
	createIceCandidateAttachmentEncoder(): AttachmentEncoder;
	createIceTransportAttachmentEncoder(): AttachmentEncoder;
	createInboundTrackAttachmentEncoder(): AttachmentEncoder;
	createOutboundTrackAttachmentEncoder(): AttachmentEncoder;
	createInboundRtpAttachmentEncoder(): AttachmentEncoder;
	createOutboundRtpAttachmentEncoder(): AttachmentEncoder;
	createDataChannelAttachmentEncoder(): AttachmentEncoder;
	createRemoteInboundRtpAttachmentEncoder(): AttachmentEncoder;
	createRemoteOutboundRtpAttachmentEncoder(): AttachmentEncoder;
	createAudioSourceAttachmentEncoder(): AttachmentEncoder;
	createVideoSourceAttachmentEncoder(): AttachmentEncoder;
	createAudioPlayoutAttachmentEncoder(): AttachmentEncoder;
	createPeerConnectionTransportAttachmentEncoder(): AttachmentEncoder;
}

export class DefaultAttachmentEncoderFactory implements AttachmentsEncoderFactory {
	public createIceCandidatePairAttachmentEncoder(): AttachmentEncoder {
		return new DefaultAttachmentEncoder();
	}
	
	public createCodecStatsAttachmentEncoder(): AttachmentEncoder {
		return new DefaultAttachmentEncoder();
	}

	public createClientSampleAttachmentEncoder(): AttachmentEncoder {
		return new DefaultAttachmentEncoder();
	}

	public createInboundTrackAttachmentEncoder(): AttachmentEncoder {
		return new DefaultAttachmentEncoder();
	}

	public createOutboundTrackAttachmentEncoder(): AttachmentEncoder {
		return new DefaultAttachmentEncoder();
	}
	
	public createPeerConnectionSampleAttachmentEncoder(): AttachmentEncoder {
		return new DefaultAttachmentEncoder();
	}

	public createCertificateAttachmentEncoder(): AttachmentEncoder {
		return new DefaultAttachmentEncoder();
	}

	public createIceCandidateAttachmentEncoder(): AttachmentEncoder {
		return new DefaultAttachmentEncoder();
	}

	public createIceTransportAttachmentEncoder(): AttachmentEncoder {
		return new DefaultAttachmentEncoder();
	}

	public createInboundRtpAttachmentEncoder(): AttachmentEncoder {
		return new DefaultAttachmentEncoder();
	}

	public createOutboundRtpAttachmentEncoder(): AttachmentEncoder {
		return new DefaultAttachmentEncoder();
	}

	public createDataChannelAttachmentEncoder() {
		return new DefaultAttachmentEncoder();
	}

	public createRemoteInboundRtpAttachmentEncoder() {
		return new DefaultAttachmentEncoder();
	}

	public createRemoteOutboundRtpAttachmentEncoder() {
		return new DefaultAttachmentEncoder();
	}

	public createAudioSourceAttachmentEncoder() {
		return new DefaultAttachmentEncoder();
	}

	public createVideoSourceAttachmentEncoder() {
		return new DefaultAttachmentEncoder();
	}

	public createAudioPlayoutAttachmentEncoder() {
		return new DefaultAttachmentEncoder();
	}

	public createPeerConnectionTransportAttachmentEncoder() {
		return new DefaultAttachmentEncoder();
	}
}

export class DefaultAttachmentEncoder implements AttachmentEncoder {
	private _actualValueRef?: Record<string, unknown>;

	public constructor() {

	}

	public reset() {
		this._actualValueRef = undefined;
	}

	encode(newValue?: Record<string, unknown>) {
		if (this._actualValueRef && newValue === this._actualValueRef) return;
		if (newValue === undefined) return;
		this._actualValueRef = newValue;

		return JSON.stringify(newValue);
	}
}

export class OneTimePassEncoder<T> implements Encoder<T, T> {
	private _value: T | undefined;

	public get actualValue() {
		return this._value;
	}

	public reset() {
		this._value = undefined;
	}

	encode(newValue?: T) {
		if (this._value !== undefined) return;
		this._value = newValue;
		return newValue;
	}
}

export class OneTimePassUuidToByteArrayEncoder implements Encoder<string, Uint8Array> {
	private _done?: boolean;

	public reset() {
		this._done = undefined;
	}

	encode(newValue?: string) {
		if (newValue === undefined) return;
		if (this._done) return;
		this._done = true;
		return uuidToByteArray(newValue);
	}
}

export class OneTimePassStringToUint8ArrayEncoder implements Encoder<string, Uint8Array> {
	private _done?: boolean;

	public reset() {
		this._done = undefined;
	}

	encode(newValue?: string) {
		if (newValue === undefined) return;
		if (this._done) return;
		this._done = true;
		return textEncoder.encode(newValue);
	}
}

export class StringToStringEncoder implements Encoder<string, string> {
	private _value: string | undefined;

	public get actualValue() {
		return this._value;
	}

	public reset() {
		this._value = undefined;
	}

	encode(newValue?: string) {
		if (!newValue) return;
		if (newValue === this._value) return;
		this._value = newValue;
		return newValue;
	}
}

export class StringToUint8ArrayEncoder implements Encoder<string, Uint8Array> {
	private _value: string | undefined;

	public get actualValue() {
		return this._value;
	}

	public reset() {
		this._value = undefined;
	}

	encode(newValue?: string) {
		if (!newValue) return;
		if (newValue === this._value) return;
		this._value = newValue;
		return textEncoder.encode(newValue);
	}
}

export class StringToNumberEncoder implements Encoder<string, number> {
	private _value: string | undefined;

	public get actualValue() {
		return this._value;
	}

	public reset() {
		this._value = undefined;
	}

	encode(newValue?: string) {
		if (newValue === undefined) return;
		if (newValue === this._value) return;
		this._value = newValue;
		return Number(newValue);
	}
}

export class NumberToBigIntEncoder implements Encoder<number, bigint> {
	private _value: number | undefined;

	public get actualValue() {
		return this._value;
	}

	public reset() {
		this._value = undefined;
	}

	encode(newValue?: number) {
		if (newValue === undefined) return;
		if (newValue === this._value) return;
		this._value = newValue;
		return BigInt(newValue);
	}
}

export class NumberToNumberEncoder implements Encoder<number, number> {
	private _value: number | undefined;

	public get actualValue() {
		return this._value;
	}

	public reset() {
		this._value = undefined;
	}

	encode(newValue?: number) {
		if (newValue === undefined) return;
		if (newValue === this._value) return;
		this._value = newValue;
		return newValue;
	}
}

export class BooleanToBooleanEncoder implements Encoder<boolean, boolean> {
	private _value: boolean | undefined;

	public get actualValue() {
		return this._value;
	}

	public reset() {
		this._value = undefined;
	}

	encode(newValue?: boolean) {
		if (!newValue) return;
		if (newValue === this._value) return;
		this._value = newValue;
		return newValue;
	}
}


export function stringToBytesArray(str: string): Uint8Array {
	return textEncoder.encode(str);
}

export function uuidToByteArray(uuid: string): Uint8Array {
	const hex = uuid.replace(/[-]/g, '');
	const byteArray = new Uint8Array(16);

	for (let i = 0, j = 0; i < 32; i += 2, j++) {
		byteArray[j] = parseInt(hex.substr(i, 2), 16);
	}

	return byteArray;
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