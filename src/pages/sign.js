import React from "react";
import styles from "./styles.module.scss";
import { useWallet } from "@noahsaso/cosmodal";
import { signKeplr, verifyKeplr } from "../libs/signVerifyKeplr";
import { getCookie } from "cookies-next";

const TestSigner = () => {
  const { address, walletClient } = useWallet();
  var signatureFromCookie = getCookie("signature");

  return (
    <div className={styles.home_container}>
      <div className={styles.home_wrapper}>
        <h1>Test</h1>
        <button onClick={async() => {console.log(await signKeplr(walletClient,address)); alert('done')}}>Sign</button>
        <button onClick={async() => {alert(await verifyKeplr(JSON.parse(atob(signatureFromCookie)), address));}}>Verify cookie</button>
      </div>
    </div>
  );
};

export default TestSigner;
