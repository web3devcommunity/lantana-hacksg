import { TEST_CAUSES, TEST_CAUSES_RAW } from './cause.fixture';

import _ from 'lodash';
import { jest, describe, test, expect, it, beforeAll } from '@jest/globals';
import { mapEventAsPublication } from './event';
import { loadClientAuthenticated } from '@/libs/lens/client';

import { LensClient } from '@lens-protocol/client';
import { ethers } from 'ethers';
import { createProfileWithWallet } from '@/libs/lens/profile';
import { Cause } from './cause';
import { generateHandle } from '@/libs/lens/utils';
import { createPostWithClient } from '@/libs/lens/publication';
import { mapCauseAsPublication } from './cause';
import { uploadWithPaths } from '@/libs/storage/file';
import path from 'path';
// we hijacked the jest runner to execute the data loading
// which is better done via ts-node .mjs

const withInternetUrl = async (url: string) => {
  if (url.match(/http/)) {
    return url;
  }
  const src = path.resolve(__dirname, '../../public' + url);
  const cid = await uploadWithPaths([src]);
  return 'ipfs://' + cid + url;
};

jest.setTimeout(60 * 1000);
describe.skip('#demo', () => {
  const TOTAL_PROFILES_COUNT = 1;
  let lensClient: LensClient;
  let wallets: ethers.Wallet[] = Array(TOTAL_PROFILES_COUNT);
  let profileIds: string[] = Array(TOTAL_PROFILES_COUNT);

  beforeAll(async () => {
    // TODO simulate avatars
    // avatarUrl: '',
    await Promise.all(
      _.range(0, TOTAL_PROFILES_COUNT).map(async (i) => {
        wallets[i] = ethers.Wallet.createRandom();
        const wallet = wallets[i];
        lensClient = await loadClientAuthenticated({ wallet });
        const handle = generateHandle();

        const result = await createProfileWithWallet(
          lensClient,
          wallet,
          handle,
        );

        profileIds[i] = result?.profileId || '';
      }),
    );
  });

  // TODO think about profile creating it

  test('#create cause and events', async () => {
    const wallet = wallets[0];
    console.log('demo wallet', wallet?.address);

    await Promise.all(
      TEST_CAUSES.map(async (cause: Cause) => {
        const postInput = mapCauseAsPublication(cause);
        console.log('post', postInput);
        const imageUrl = await withInternetUrl(cause.imageUrl);
        const createCauseResults = await createPostWithClient(lensClient)(
          wallet,
          {
            ...postInput,
            imageUrl,
            profileId: profileIds[0],
          },
        );

        await Promise.all(
          cause.events.map(async (event) => {
            const postInput = mapEventAsPublication(event);
            const imageUrl = await withInternetUrl(postInput.imageUrl);

            return createPostWithClient(lensClient)(wallet, {
              ...postInput,
              imageUrl,
              profileId: profileIds[0],
              content: event.descriptionShort || '',
            });
          }),
        );
      }),
    );
  });
});
