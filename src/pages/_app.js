import Head from "next/head";
import React, { useState, useEffect } from "react";
import { createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import thunk from "redux-thunk";
import rootReducer from "../redux";
import { WalletManagerProvider, ChainInfoID, WalletType } from "@noahsaso/cosmodal";
import Header from "../components/header";

const createStoreWithMiddleware = applyMiddleware(thunk)(createStore);
const store = createStoreWithMiddleware(rootReducer);
let classes = {
  modalContent: "cosmodal_className",
  modalOverlay: "cosmodal_className",
  modalHeader: "cosmodal_className",
  modalSubheader: "cosmodal_className",
  modalCloseButton: "cosmodal_className",
  walletList: "cosmodal_className",
  wallet: "cosmodal_className",
  walletImage: "cosmodal_Modal_Image",
  walletInfo: "cosmodal_className",
  walletName: "cosmodal_className",
  walletDescription: "cosmodal_className",
  textContent: "cosmodal_className",
};
let walletConnectMetadata = {
  name: "Rebels",
  description: "Rebels official website",
  url: "https://rebelsnft.net",
  icons: "https://rebelsnft.net/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Flogo.915173f7.png&w=256&q=75",
};

export function ClientOnly({ children, ...delegated }) {
  const { setUseKeplrDesktop } = delegated;
  const [hasMounted, setHasMounted] = useState(false);
  useEffect(() => {
    if (typeof window !== "undefined") {
      if (window?.keplr) {
        setUseKeplrDesktop(true);
      } else {
        setUseKeplrDesktop(false);
      }
    }

    setHasMounted(true);
  }, [setUseKeplrDesktop]);
  if (!hasMounted) {
    return null;
  }
  return <div>{children}</div>;
}

function MyApp({ Component, pageProps }) {
  // eslint-disable-next-line no-unused-vars
  const [useKeplrDesktop, setUseKeplrDesktop] = useState(null);
  return (
    <ClientOnly setUseKeplrDesktop={setUseKeplrDesktop}>
      <Head>
        <title>Rebels</title>
      </Head>

      <WalletManagerProvider
        defaultChainId={ChainInfoID.Stargaze1}
        enabledWalletTypes={[WalletType.Keplr, WalletType.WalletConnectKeplr]}
        classNames={classes}
        localStorageKey="keplr_wallet"
        walletConnectClientMeta={walletConnectMetadata}
        showEnablingModalOnAutoconnect={false}
      >
        <Provider store={store}>
          <Header />
          <Component {...pageProps} />
        </Provider>
      </WalletManagerProvider>
    </ClientOnly>
  );
}

export default MyApp;

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// import reportWebVitals from './reportWebVitals';
// reportWebVitals();
