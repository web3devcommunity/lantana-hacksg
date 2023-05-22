import _, { keyBy } from 'lodash';
import { TEST_CAUSES, TEST_CAUSES_RAW } from './cause.fixture';
import { jest, describe, test, expect, it, beforeAll } from '@jest/globals';
import { mapEventAsPublication } from './event';
import { loadClientAuthenticated } from '@/libs/lens/client';

import { LensClient } from '@lens-protocol/client';
import { ethers } from 'ethers';
import { createProfileWithWallet } from '@/libs/lens/profile';
import { Cause } from './cause';
import { generateHandle } from '@/libs/lens/utils';
import {
  CollectionStrategy,
  createPostWithClient,
} from '@/libs/lens/publication';
import { mapCauseAsPublication } from './cause';
import { uploadWithPaths, withInternetUrl } from '@/libs/storage/file';
import path from 'path';
import { TEST_RECIPIENT_ADDRESS } from '@/env';
// we hijacked the jest runner to execute the data loading
// which is better done via ts-node .mjs

jest.setTimeout(60 * 1000);
describe('#demo', () => {
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
            const postInput = mapEventAsPublication({
              ...event,
              causeKey: cause.key,
            });
            const imageUrl = await withInternetUrl(postInput.imageUrl);

            return createPostWithClient(lensClient)(wallet, {
              ...postInput,
              imageUrl,
              profileId: profileIds[0],
              content: event.descriptionShort || '',
              collectModuleStrategy: CollectionStrategy.Wmatic,
              collectModuleOptions: {
                recipientAddress: TEST_RECIPIENT_ADDRESS,
              },
            });
          }),
        );
      }),
    );
  });
});
