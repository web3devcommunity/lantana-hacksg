import _, { keyBy } from 'lodash';
import { TEST_CAUSES, TEST_CAUSES_RAW } from './cause.fixture';
import { jest, describe, test, expect, it, beforeAll } from '@jest/globals';
import { mapEventAsPublication } from './event';
import { loadClientAuthenticated } from '@/libs/lens/client';

import { LensClient } from '@lens-protocol/client';
import { Wallet, ethers } from 'ethers';
import { createProfileWithWallet } from '@/libs/lens/profile';
import { Cause } from './cause';
import { generateHandle } from '@/libs/lens/utils';
import {
  CollectionStrategy,
  createPostWithClient,
} from '@/libs/lens/publication';
import { mapCauseAsPublication } from './cause';
import { uploadWithPaths } from '@/libs/storage/file';
import path from 'path';
import { TEST_PRIVATE_KEY, TEST_RECIPIENT_ADDRESS } from '@/env';
import { collect } from '@/libs/lens/collect';
import { profile } from 'console';
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

jest.setTimeout(5 * 60 * 1000);

const timer = (ms: number) => new Promise((res) => setTimeout(res, ms));
describe('#demo', () => {
  const causes = _.take(TEST_CAUSES, 1);
  const TOTAL_PROFILES_COUNT = causes.length;

  let wallets: ethers.Wallet[] = Array(TOTAL_PROFILES_COUNT);
  let profileIds: string[] = Array(TOTAL_PROFILES_COUNT);

  // funded
  let collectWallet: ethers.Wallet;

  beforeAll(async () => {
    // TODO simulate avatars
    // avatarUrl: '',

    await Promise.all(
      _.range(0, TOTAL_PROFILES_COUNT).map(async (i) => {
        let lensClient: LensClient;
        wallets[i] = ethers.Wallet.createRandom();
        const wallet = wallets[i];
        lensClient = await loadClientAuthenticated({ wallet });
        const handle = generateHandle();

        const result = await createProfileWithWallet(
          lensClient,
          wallet,
          handle,
        );

        console.log('create profile result', result);
        profileIds[i] = result?.profileId || '';
      }),
    );

    collectWallet = new Wallet(TEST_PRIVATE_KEY || '');
  });

  // TODO think about profile creating it

  test('#create cause and events', async () => {
    const results = await Promise.all(
      causes.map(async (cause: Cause, i: number) => {
        // use diff for rate limit
        const wallet = wallets[i];
        const lensClient = await loadClientAuthenticated({ wallet });
        const profileId = profileIds[i];

        const postInput = mapCauseAsPublication(cause);
        console.log(
          'wallet, profileId, post',
          i,
          wallet?.address,
          profileId,
          postInput,
        );
        const imageUrl = await withInternetUrl(cause.imageUrl);
        const createCauseResults = await createPostWithClient(lensClient)({
          ...postInput,
          imageUrl,
          profileId,
          collectModuleStrategy: CollectionStrategy.Wmatic,
          collectModuleOptions: {
            recipientAddress: TEST_RECIPIENT_ADDRESS,
          },
        });

        // avoid rate limit
        await timer(3000);

        const createEventResults = await Promise.all(
          cause.events.map(async (event, i) => {
            await timer(1000 * i);
            const postInput = mapEventAsPublication({
              ...event,
              causeKey: cause.key,
            });
            const imageUrl = await withInternetUrl(postInput.imageUrl);

            return createPostWithClient(lensClient)({
              ...postInput,
              imageUrl,
              profileId,
              content: event.descriptionShort || '',
              collectModuleStrategy: CollectionStrategy.Wmatic,
              collectModuleOptions: {
                recipientAddress: TEST_RECIPIENT_ADDRESS,
              },
            });
          }),
        );

        // const createEventResults = {};

        return {
          createCauseResults,
          createEventResults,
        };
      }),
    );

    const { createCauseResults } = results?.[0];

    const adminLensClient = await loadClientAuthenticated({
      wallet: collectWallet,
    });
    await adminLensClient.transaction.waitForIsIndexed(
      createCauseResults['txId'],
    );

    const publication = await adminLensClient.publication.fetch({
      txHash: createCauseResults.txHash,
    });

    await collect(adminLensClient)(collectWallet, publication!.id);
    // collectWallet
  });
});
