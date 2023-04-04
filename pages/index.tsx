import { useEffect, useState } from "react";
import { usePrivy } from "@privy-io/react-auth";
import { useSigner, useAccount, useSwitchNetwork } from "wagmi";

export default function Home() {
  const { login, logout } = usePrivy();
  const { ready, authenticated, user } = usePrivy();
  const { data: wagmiSigner } = useSigner();
  const { address: wagmiAddress, connector } = useAccount();
  const { switchNetwork } = useSwitchNetwork();
  const [address, setAddress] = useState<any | undefined>(undefined);
  const [signer, setSigner] = useState<any | undefined>(undefined);

  useEffect(() => {
    console.log({
      wagmiSigner,
      wagmiAddress,
      user,
      ready,
      authenticated,
      connector,
    });
    if (ready && authenticated) {
      setSigner(wagmiSigner);
      setAddress(wagmiAddress);
    } else {
      setSigner(undefined);
      setAddress(undefined);
    }
  }, [ready, user, authenticated, wagmiSigner, wagmiAddress, connector]);

  return (
    <>
      <button onClick={() => login()}>Login w privy</button>
      <button onClick={() => logout()}>Logout w privy</button>
      <h1>wagmi debug</h1>
      <p>Address: {address}</p>
      <p>!!Signer: {String(!!signer)}</p>
      <p>!!data from useSigner: {String(wagmiSigner)}</p>
    </>
  );
}
