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