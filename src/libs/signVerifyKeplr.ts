export async function signKeplr(walletClient: any, address: String) {
  const chainId = "stargaze-1";

  try {
    const signature = await walletClient.signAmino(chainId, address, {
      chain_id: chainId,
      account_number: "0",
      sequence: "0",
      fee: {
        gas: "0",
        amount: [],
      },
      msgs: [process.env.NEXT_PUBLIC_SIGN_MESSAGE],
      memo: "",
    });
    if (!signature) {
      throw new Error("Signature is null");
    }
    return signature;
  } catch (error) {
    console.log(error);
  }
}

export async function verifyKeplr(signatureFromCookieDecoded: any, address: String) {
  const response = await fetch(process.env.NEXT_PUBLIC_WHOLEPATH_FETCH + "/api/verifySignature", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      signature: signatureFromCookieDecoded.signature,
      address: address,
    }),
  });
  const reply = await response.json();
  return reply;
}
