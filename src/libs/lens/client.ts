import { Environment, LensClient, development } from "@lens-protocol/client";

import { ethers } from "ethers";
import { lazyLoadAsyncFactory } from "../lazy-load";

// wagmi doesnt expose ethers.Wallet even in older version
// simplify to delegate login by useWalletLogin for UI
export const loadClient = lazyLoadAsyncFactory(
  async (
    { environment }: { environment: Environment } = {
      environment: development,
    },
  ) => {
    return new LensClient({
      environment,
    });
  },
);

export const loadClientAuthenticated = lazyLoadAsyncFactory(
  async ({
    wallet,
    environment = development,
  }: {
    wallet: ethers.Wallet;
    environment: Environment;
  }) => {
    const lensClient = new LensClient({
      environment,
    });

    const address = await wallet.getAddress();

    const challenge = await lensClient.authentication.generateChallenge(
      address,
    );
    const signature = await wallet.signMessage(challenge);

    await lensClient.authentication.authenticate(address, signature);

    await lensClient.authentication.isAuthenticated();

    return lensClient;
  },
);
