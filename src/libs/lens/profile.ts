import { ethers } from "ethers";
import { loadClientAuthenticated } from "./client";
import { isRelayerResult } from "@lens-protocol/client";
import { getProfileUrl, setDispatcher } from "./utils";

// deduplciate with key value store

export const createProfile = async (wallet: ethers.Wallet, handle: string) => {
  const address = wallet.address;
  const lensClient = await loadClientAuthenticated({ wallet });
  const profileCreateResult = await lensClient.profile.create({
    handle,
  });

  const profileCreateResultValue = profileCreateResult.unwrap();

  if (!isRelayerResult(profileCreateResultValue)) {
    console.error(`Something went wrong`, profileCreateResultValue);
    return;
  }

  await lensClient.transaction.waitForIsIndexed(profileCreateResultValue.txId);

  const allOwnedProfiles = await lensClient.profile.fetchAll({
    ownedBy: [address],
  });

  const profile = allOwnedProfiles.items?.[0];
  const profileId = profile?.id || "";

  const { lensterUrl } = getProfileUrl(handle);

  console.log(
    "lensterUrl",
    lensterUrl,
    "profileId",
    profileId,
    "first address",
    address,
  );

  const dispatcherResults = await setDispatcher(
    wallet._signTypedData.bind(wallet),
  )(lensClient, profileId);

  return {
    profileId,
    lensterUrl,
    dispatcherResults,
  };
};
