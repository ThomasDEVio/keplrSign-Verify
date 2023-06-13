import { signKeplr, verifyKeplr } from "../../libs/signVerifyKeplr";
import React, { useState, useEffect } from "react";
import { Box } from "@mui/material";
import { useRouter } from "next/router";
import ConnectButton from ".././connect_button";
import { useWallet } from "@noahsaso/cosmodal";
import { setCookie, getCookie, deleteCookie } from "cookies-next";

async function signMessage(walletClient, wallet) {
  var signatureFromCookie = getCookie("signature");
  console.log("Cookie found");
  if (signatureFromCookie == undefined) {
    //request sign
    const signatureFresh = await signKeplr(walletClient, wallet);
    alert("signed message: " + JSON.stringify(signatureFresh));
    if (signatureFresh == undefined) return alert("Signature failed, please try again");
    const base64Signature = btoa(JSON.stringify(signatureFresh));
    setCookie("signature", base64Signature, { sameSite: "strict", secure: true });
    return;
  }
  if (typeof signatureFromCookie == "string") {
    //test if signature is valid
    const signatureValid = await verifyKeplr(JSON.parse(atob(signatureFromCookie)), wallet);
    if (!signatureValid) {
      console.log("Signature invalid");
      alert("Signature invalid");
      deleteCookie("signature");
      return;
    } else {
      alert("Signature valid");
      deleteCookie("signature");
      return;
    }
  }
}

const Header = () => {
  const hideMenu = React.useRef<any>(null);
  const [flag, setFlag] = useState(false);
  const Path = useRouter();

  const { error, address, walletClient } = useWallet();
  const wallet = address;

  useEffect(() => {
    if (flag) {
      hideMenu.current.style.height = "100vh";
    } else {
      hideMenu.current.style.height = "0px";
    }
  }, [flag]);

  return (
    <div>
      <Box ref={hideMenu}>
        <div>
          <ConnectButton />
          <button onClick={() => signMessage(walletClient, wallet)}>Sign</button>
        </div>
      </Box>
    </div>
  );
};

export default Header;
