import _ from "lodash";
import {
  LensClient,
  ProfileFragment,
  development,
  isRelayerResult,
} from "@lens-protocol/client";

import { ethers } from "ethers";
import { loadClientAuthenticated } from "./client";
// we either
// - query ownedby wallet address to find latest created
// - poll txn until indexed to get profileid

// replies
export const getProfileUrl = (handle: string, type = "profile") => {
  const lensterUrl =
    "https://testnet.lenster.xyz/u/" + handle + "?type=" + type;

  return {
    lensterUrl,
  };
};

export const getPostUrl = (postId: string) => {
  const lensterUrl = "https://testnet.lenster.xyz/posts/" + postId;

  return {
    lensterUrl,
  };
};

// From official example, modify to wait with sdk instead,  mostly for testing
// https://github.com/lens-protocol/api-examples/blob/master/src/profile/create-profile.ts
// there is also lensClient.transaction.waitForIsIndexed

// avoid wallet deps, signTypedData
export const setDispatcher =
  (signTypedData: any) => async (lensClient: LensClient, profileId: string) => {
    const typedDataResult =
      await lensClient.profile.createSetDispatcherTypedData({
        profileId: profileId,
      });

    // typedDataResult is a Result object
    const data = typedDataResult.unwrap();

    // sign with the wallet
    const signedTypedData = await signTypedData(
      data.typedData.domain,
      data.typedData.types,
      data.typedData.value,
    );
    const broadcastResult = await lensClient.transaction.broadcast({
      id: data.id,
      signature: signedTypedData,
    });

    // broadcastResult is a Result object
    const broadcastResultValue = broadcastResult.unwrap();

    if (!isRelayerResult(broadcastResultValue)) {
      console.log(`Something went wrong`, broadcastResultValue);
      return;
    }

    console.log(
      `setDispatcher Transaction was successfuly broadcasted with txId ${broadcastResultValue.txId}`,
    );
  };

export const generateHandle = (handlePrefix = "lantanatestuser") => {
  return handlePrefix + _.random(1, 10000);
};
