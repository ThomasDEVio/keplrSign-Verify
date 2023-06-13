import React, { useEffect, useState } from "react";
import { setCookie, getCookie, deleteCookie } from "cookies-next";

let WalletFromCookie = getCookie("wallet");

export const WalletContext = React.createContext({
  account: undefined,
  setAccount: () => {},
});

export const WalletContextProvider = (props) => {
  useEffect(() => {
    if(window.ethereum !== undefined && state.account !== "disconnected" && WalletFromCookie !== "disconnected" ){//&& WalletFromCookie !== "disconnected" test if disconnect works
        window.ethereum
        .request({ method: 'eth_accounts' })
        .then((accounts) => {
          let account = accounts[0].toLowerCase();
          let accountSavedInCookie = getCookie(account);
          let sign = accountSavedInCookie;

          if (sign == undefined) return;
          fetch(process.env.NEXT_PUBLIC_WHOLEPATH_FETCH + "/api/verifyFromMessage?signedMessage=" + sign)
            .then((res) => res.json())
            .then(async (result) => {
              if (result.verified === account) {
                setState({...state, account: account})
              } else {
                console.log("Accounts do not match, deleting cookie & trying again " + account + " " + result.verified);
                deleteCookie(account);
                return;
              }
            });
          })
        .catch((error) => {
            console.error(
            `Error fetching accounts: ${error.message}.
            Code: ${error.code}. Data: ${error.data}`
            );
        });
    }
}, [setState,state]);
  const setAccount = (account) => {
    setState({ ...state, account: account });
  };

  const initState = {
    account: undefined,
    setAccount: setAccount,
  };

  const [state, setState] = useState(initState);

  useEffect(() => {
    if (state.account) {
      console.log("this is the new account: " + state.account);
      setCookie('wallet', state.account, {sameSite: "strict", secure: true});
    }
    if(state.account === "disconnected"){
      setCookie("wallet", 'disconnected', {sameSite: "strict", secure: true});
    }
  }, [state]);

  return <WalletContext.Provider value={state}>{props.children}</WalletContext.Provider>;
};
