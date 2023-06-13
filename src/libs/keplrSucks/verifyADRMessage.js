import { serializeSignDoc } from "./serializeSignDoc";
import { Bech32Address } from "@keplr-wallet/cosmos";
const crypto_1 = require("@keplr-wallet/crypto");

function checkAndValidateADR36AminoSignDoc(signDoc, bech32PrefixAccAddr, signer) {
  const hasOnlyMsgSignData = (() => {
    if (signDoc && signDoc.msgs && Array.isArray(signDoc.msgs)) {
      return true;
    } else {
      return false;
    }
  })();
  if (!hasOnlyMsgSignData) {
    return false;
  }

  if (signDoc.memo !== "") {
    throw new Error("Memo should be empty string for ADR-36 signing");
  }
  if (signDoc.account_number !== "0") {
    throw new Error('Account number should be "0" for ADR-36 signing');
  }
  if (signDoc.sequence !== "0") {
    throw new Error('Sequence should be "0" for ADR-36 signing');
  }
  if (signDoc.fee.gas !== "0") {
    throw new Error('Gas should be "0" for ADR-36 signing');
  }

  if (!signer) {
    throw new Error("Empty signer in the ADR-36 msg");
  }
  Bech32Address.validate(signer, bech32PrefixAccAddr);

  return true;
}
exports.checkAndValidateADR36AminoSignDoc = checkAndValidateADR36AminoSignDoc;
function makeADR36AminoSignDoc(data) {

  return {
    chain_id: "stargaze-1",
    account_number: "0",
    sequence: "0",
    fee: {
      gas: "0",
      amount: [{ denom: "ustars", amount: "0" }],
    },
    msgs: [data],
    memo: "",
  };
}
exports.makeADR36AminoSignDoc = makeADR36AminoSignDoc;
function verifyADR36AminoSignDoc(bech32PrefixAccAddr, signDoc, pubKey, signature, signer) {
  try {
    if (!checkAndValidateADR36AminoSignDoc(signDoc, bech32PrefixAccAddr, signer)) {
      throw new Error("Invalid sign doc for ADR-36");
    }
    const cryptoPubKey = new crypto_1.PubKeySecp256k1(pubKey);
    const expectedSigner = new Bech32Address(cryptoPubKey.getAddress()).toBech32(bech32PrefixAccAddr);
    if (expectedSigner !== signer) {
      throw new Error("Unmatched signer");
    }
    const msg = serializeSignDoc(signDoc);
    return cryptoPubKey.verify(msg, signature);
  } catch (error) {
    console.log(error);
    return false;
  }
}
exports.verifyADR36AminoSignDoc = verifyADR36AminoSignDoc;

export function verifyADR36Amino(bech32PrefixAccAddr, signer, data, pubKey, signature) {
  const signDoc = makeADR36AminoSignDoc(data);
  return verifyADR36AminoSignDoc(bech32PrefixAccAddr, signDoc, pubKey, signature, signer);
}
//# sourceMappingURL=amino.js.map
