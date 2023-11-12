import { ThirdwebProvider, metamaskWallet, } from "@thirdweb-dev/react";
import Head from "next/head";
import { domainName } from "@/consts/yourDetails";
import "../styles/globals.css";
import type { AppProps } from "next/app";

// This is the chain your dApp will work on.
const activeChain = "mumbai";

function MyApp({ Component, pageProps } : AppProps ) {
  return (
    <ThirdwebProvider
      activeChain={activeChain}
      clientId={process.env.NEXT_PUBLIC_CLIENT_ID}
      authConfig={{
        domain: domainName,
        authUrl: "/api/auth",
      }}
      supportedWallets={[metamaskWallet()]}

    >
      <Head>
        <title>NFT Gated Website</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta
          name="description"
          content="Learn how to use the thirdweb Auth SDK to create an NFT Gated Website"
        />
      </Head>
      <Component {...pageProps} />
    </ThirdwebProvider>
  );
}

export default MyApp;
