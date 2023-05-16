import { ethers } from "ethers";
import { loadClientAuthenticated } from "./client";
import {
  LensClient,
  ProfileFragment,
  isRelayerResult,
} from "@lens-protocol/client";
import { getProfileUrl, setDispatcher } from "./utils";

export const createProfileWithWallet = (
  lensClient: LensClient,
  wallet: ethers.Wallet,
  handle: string,
) => {
  return createProfile(lensClient, wallet._signTypedData.bind(wallet))(
    wallet.address,
    handle,
  );
};
// deduplciate with key value store
export const createProfile =
  (lensClient: LensClient, signTypedData: (...args: any) => any) =>
  async (walletAddress: string, handle: string) => {
    const profileCreateResult = await lensClient.profile.create({
      handle,
      // other request args
    });

    const profileCreateResultValue = profileCreateResult.unwrap();

    if (!isRelayerResult(profileCreateResultValue)) {
      console.log(`Something went wrong`, profileCreateResultValue);
      throw new Error("Error creating Profile");
    }

    console.log("profileCreateResultValue", profileCreateResultValue);

    await lensClient.transaction.waitForIsIndexed(
      profileCreateResultValue.txId,
    );

    const allOwnedProfiles = await lensClient.profile.fetchAll({
      ownedBy: [walletAddress],
    });

    const profile: ProfileFragment = allOwnedProfiles.items?.[0];
    const profileId = profile?.id!;
    console.log(
      "first profile by address",
      walletAddress,
      profileId,
      // JSON.stringify(allOwnedProfiles.items),
    );

    const { lensterUrl } = getProfileUrl(handle);

    console.log("lensterUrl", lensterUrl, "profileId", profileId);
    const dispatcherResults = await setDispatcher(signTypedData)(
      lensClient,
      // wallet,
      profileId,
    );

    return {
      handle,
      profileId,
      lensterUrl,
      dispatcherResults,
    };
  };
