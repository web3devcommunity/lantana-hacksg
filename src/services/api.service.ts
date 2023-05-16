import { loadClient, loadClientAuthenticated } from '@/libs/lens/client';
import { generateHandle } from '@/libs/lens/utils';
import fetch from 'cross-fetch';
import { signTypedData } from '@wagmi/core';
// move to API
export const saveAccount = async ({
  walletAddress,
  lensHandle,
  lensProfileId,
}: {
  walletAddress: string;
  lensHandle: string;
  lensProfileId: string;
}) => {
  return fetch('/profile', {
    method: 'POST',
    body: JSON.stringify({
      lensHandle,
      walletAddress: walletAddress,
      lensProfileId,
    }),
  });
};
