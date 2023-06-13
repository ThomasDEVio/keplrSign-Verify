import { Buffer } from "buffer/";

export function encodeSecp256k1Pubkey(pubkey) {
  if (pubkey.length !== 33 || (pubkey[0] !== 0x02 && pubkey[0] !== 0x03)) {
    throw new Error("Public key must be compressed secp256k1, i.e. 33 bytes starting with 0x02 or 0x03");
  }
  return {
    type: "tendermint/PubKeySecp256k1",
    value: Buffer.from(pubkey).toString("base64"),
  };
}

export function encodeSecp256k1Signature(pubkey, signature) {
  if (signature.length !== 64) {
    throw new Error(
      "Signature must be 64 bytes long. Cosmos SDK uses a 2x32 byte fixed length encoding for the secp256k1 signature integers r and s."
    );
  }

  return {
    pub_key: encodeSecp256k1Pubkey(pubkey),
    signature: Buffer.from(signature).toString("base64"),
  };
}

export function serializeSignDoc(signDoc) {
  return Buffer.from(sortedJsonByKeyStringify(signDoc));
}


function sortObjectByKey(obj) {
    if (typeof obj !== "object" || obj === null) {
        return obj;
    }
    if (Array.isArray(obj)) {
        return obj.map(sortObjectByKey);
    }
    const sortedKeys = Object.keys(obj).sort();
    const result = {};
    sortedKeys.forEach((key) => {
        result[key] = sortObjectByKey(obj[key]);
    });
    return result;
}
function sortedJsonByKeyStringify(obj) {
    return JSON.stringify(sortObjectByKey(obj));
}