import _ from 'lodash';
import {
  LensClient,
  ProfileFragment,
  development,
  isRelayerResult,
} from '@lens-protocol/client';

import { ethers } from 'ethers';
import { loadClientAuthenticated } from './client';
// we either
// - query ownedby wallet address to find latest created
// - poll txn until indexed to get profileid

// TODO fix type from sdk
export type LensPublication = any;

// replies
export const getProfileUrl = (handle: string, type = 'profile') => {
  const lensterUrl =
    'https://testnet.lenster.xyz/u/' + handle + '?type=' + type;

  return {
    lensterUrl,
  };
};

export const getPostUrl = (postId: string) => {
  const lensterUrl = 'https://testnet.lenster.xyz/posts/' + postId;

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

export const generateHandle = (handlePrefix = 'lantanatestuser') => {
  return handlePrefix + _.random(1, 10000);
};

export const withIpfsGateway = (url: string) => {
  if (url && url.startsWith('ipfs://')) {
    return url.replace('ipfs://', 'https://ipfs.io/ipfs/');
  }
  return url;
};

// testnet only for now
export const getHypercertsUrl = ({
  contractAddress = '0x822f17a9a5eecfd66dbaff7946a8071c265d1d07',
  tokenId,
}: {
  contractAddress: string;
  tokenId: string;
}) => {
  return `https://testnet.hypercerts.org/app/view#claimId=${contractAddress}-${tokenId}`;
};

export const getExplorerUrl = (
  network: string,
  contractAddress: string,
  tokenId: string,
) => {
  if (network === 'goerli') {
    return `https://goerli.etherscan.io/token/${contractAddress}?a=${tokenId}`;
  }
  return `https://mumbai.polygonscan.com/address/${contractAddress}?a=${tokenId}`;
};

export const getAvatarUrl = () => {
  return `https://mui.com/static/images/avatar/${_.random(1, 7)}.jpg`;
};
