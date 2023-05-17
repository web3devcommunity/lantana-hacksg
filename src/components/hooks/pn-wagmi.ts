import React, { useMemo } from 'react';
import { Chain } from 'wagmi/chains';
import { ParticleNetwork } from '@particle-network/auth';
import { getWagmiClient } from '@/libs/wagmi';
import { PN_PROJECT_ID, PN_CLIENT_KEY, PN_APP_ID } from '@/env';

import { particleWallet } from '@particle-network/rainbowkit-ext';
export const useParticleNetworkWagmi = () => {
  // implicit deps, init particle before related wallets
  return useMemo(() => {
    const particle = new ParticleNetwork({
      projectId: PN_PROJECT_ID as string,
      clientKey: PN_CLIENT_KEY as string,
      appId: PN_APP_ID as string,
    });

    const wallletsFactory = ({ chains }: { chains: Chain[] }) => [
      particleWallet({ chains, authType: 'google' }),
      particleWallet({ chains, authType: 'facebook' }),
      particleWallet({ chains, authType: 'apple' }),
      particleWallet({ chains }),
    ];

    return getWagmiClient({ wallletsFactory });
  }, []);
};
