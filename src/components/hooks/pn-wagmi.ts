import {
  configureChains,
  createClient,
  WagmiConfig,
  useAccount,
  useConnect,
} from "wagmi";
import { mainnet, polygon, optimism, arbitrum } from "wagmi/chains";
import { publicProvider } from "wagmi/providers/public";
import "../../rainbowkit.css";
import { particleWallet } from "@particle-network/rainbowkit-ext";
import { useEffect, useMemo } from "react";
import { ParticleNetwork } from "@particle-network/auth";

import { LensProvider } from "@lens-protocol/react-web";
import { getWagmiClient } from "@/libs/wagmi";
import { ReactNode } from "react";
import { PN_PROJECT_ID, PN_CLIENT_KEY, PN_APP_ID } from "@/env";
import { useParticleProvider } from "@particle-network/connect-react-ui";

export const useParticleNetworkWagmi = () => {
  // this is required to initialize the particle network
  const particle = new ParticleNetwork({
    projectId: PN_PROJECT_ID as string,
    clientKey: PN_CLIENT_KEY as string,
    appId: PN_APP_ID as string,
  });

  // const provider = useParticleProvider();

  // implicit deps
  return useMemo(() => {
    if (!particle) {
      return null;
    }
    return getWagmiClient();
  }, [particle]);
};
