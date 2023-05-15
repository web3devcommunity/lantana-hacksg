import { CauseCard } from './CauseCard';
import { WagmiConfig } from 'wagmi';
import { createConfig } from './lens-binding';
import { useParticleNetworkWagmi } from './hooks/pn-wagmi';
import { RainbowKitProvider } from '@rainbow-me/rainbowkit';
import { LensProvider } from '@lens-protocol/react-web';
import React from 'react';

const lensConfig = createConfig();

export const AccountProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const wagmi = useParticleNetworkWagmi();
  if (!wagmi) return <></>;

  const { client: wagmiClient, chains } = wagmi;

  return (
    <LensProvider config={lensConfig}>
      <WagmiConfig client={wagmiClient}>
        <RainbowKitProvider chains={chains}>{children}</RainbowKitProvider>
      </WagmiConfig>
    </LensProvider>
  );
};
