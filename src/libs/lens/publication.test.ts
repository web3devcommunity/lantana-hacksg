import _ from 'lodash';
import { loadClientAuthenticated } from './client';
import { jest, describe, test, expect, it, beforeAll } from '@jest/globals';
import { createPostWithClient } from './publication';
import { LensClient } from '@lens-protocol/client';

import { ethers } from 'ethers';
import { createProfile, createProfileWithWallet } from './profile';
import { generateHandle, getProfileUrl } from './utils';
import { APP_VERSION_TAG } from '@/env';

jest.setTimeout(5 * 60 * 1000);

describe.skip('#createPublication', () => {
  let wallet: ethers.Wallet;
  let lensClient: LensClient;
  let handle: string;
  let profileId: string;

  beforeAll(async () => {
    wallet = ethers.Wallet.createRandom();
    lensClient = await loadClientAuthenticated({ wallet });
    handle = generateHandle();
    const results = await createProfileWithWallet(lensClient, wallet, handle);
    profileId = results.profileId;
  });

  test('create', async () => {
    const imageUrl =
      'https://pbs.twimg.com/media/Fs4xCTGWYAULIW_?format=jpg&name=large';
    const content = 'Thanks for doing Beach Cleanups';
    const name = 'Happy Volunteering!';
    const results = await createPostWithClient(lensClient)(wallet, {
      profileId,
      imageUrl,
      content,
      name,
      tags: ['cause-123'],
    });

    console.log(
      'createPost results',
      handle,
      profileId,
      getProfileUrl(handle),
      results,
    );

    expect(results.contentMetadata.content).toEqual(content);
    expect(results.contentMetadata.name).toEqual(name);
    //@ts-ignore
    expect(results['reason']).not.toEqual('REJECTED');

    expect(results.contentMetadata.tags).toEqual([
      APP_VERSION_TAG,
      'cause-123',
    ]);
  });
});
