import { WagmiConfig, configureChains, createClient } from "wagmi";
import { InjectedConnector } from "@wagmi/core/connectors/injected";
import { getDefaultProvider } from "ethers";
import { publicProvider } from "@wagmi/core/providers/public";
import { mainnet, polygon, optimism } from "@wagmi/core/chains";
import { particleWallet } from "@particle-network/rainbowkit-ext";

import {
  argentWallet,
  coinbaseWallet,
  imTokenWallet,
  injectedWallet,
  ledgerWallet,
  metaMaskWallet,
  omniWallet,
  rainbowWallet,
  trustWallet,
  walletConnectWallet,
} from "@rainbow-me/rainbowkit/wallets";
import { connectorsForWallets } from "@rainbow-me/rainbowkit";

// TODO lazy create
export const getWagmiClient = () => {
  // TODO fix with inject
  const { chains, provider, webSocketProvider } = configureChains(
    [mainnet, polygon, optimism],
    // [injectedProvider],
    [publicProvider()],
  );

  const popularWallets = {
    groupName: "Popular",
    wallets: [
      // particleWallet({ chains, authType: "google" }),
      // particleWallet({ chains, authType: "facebook" }),
      // particleWallet({ chains, authType: "apple" }),
      // particleWallet({ chains }),
      injectedWallet({ chains }),
      // rainbowWallet({ chains }),
      // coinbaseWallet({ appName: "RainbowKit demo", chains }),
      metaMaskWallet({ chains }),
      walletConnectWallet({ chains }),
    ],
  };

  const connectors = connectorsForWallets([
    popularWallets,
    {
      groupName: "Other",
      wallets: [
        argentWallet({ chains }),
        trustWallet({ chains }),
        omniWallet({ chains }),
        imTokenWallet({ chains }),
        ledgerWallet({ chains }),
      ],
    },
  ]);

  const client = createClient({
    autoConnect: true,
    connectors,
    provider: provider,
    webSocketProvider,
  });

  return {
    chains,
    provider,
    client,
  };
};
