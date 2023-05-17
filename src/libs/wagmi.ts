import { Chain, WagmiConfig, configureChains, createClient } from 'wagmi';
import { publicProvider } from '@wagmi/core/providers/public';
import { polygonMumbai, mainnet, polygon, optimism } from '@wagmi/core/chains';

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
} from '@rainbow-me/rainbowkit/wallets';
import { Wallet, connectorsForWallets } from '@rainbow-me/rainbowkit';

// TODO lazy create
export const getWagmiClient = ({
  wallletsFactory = () => [],
}: {
  wallletsFactory?: ({ chains }: { chains: Chain[] }) => Wallet[];
}) => {
  // TODO fix with inject
  const { chains, provider, webSocketProvider } = configureChains(
    // [mainnet, polygon, optimism],
    [polygonMumbai],
    // [injectedProvider],
    [publicProvider()],
  );

  const wallets = wallletsFactory({ chains });
  const popularWallets = {
    groupName: 'Popular',
    wallets: [
      ...wallets,
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
      groupName: 'Other',
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
