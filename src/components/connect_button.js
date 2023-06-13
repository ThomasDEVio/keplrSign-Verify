import { useWalletManager, useWallet, WalletConnectionStatus } from "@noahsaso/cosmodal";
import { Button, Typography } from "@mui/material";
export default function WalletConnect() {

  const { connect, disconnect } = useWalletManager();
  const { status, error, address } = useWallet();
  if(error) console.log(error)
  return status === WalletConnectionStatus.Connected ? (
    <Button  onClick={disconnect}>
      <Typography variant="h6">
        {address.substring(0, 5)}...{address.substring(address.length - 9)}
      </Typography>
    </Button>
  ) : (
    <>
      <Button onClick={connect}>
        <Typography variant="h6" style={{textTransform:"capitalize"}}>Connect Wallet</Typography>
      </Button>
      
      {/* {error && <p>{error instanceof Error ? error.message : `${error}`}</p>} */}
    </>
  );
}
