import _ from 'lodash';
import { loadClientAuthenticated } from './client';
import { jest, describe, test, expect, it, beforeEach } from '@jest/globals';

jest.setTimeout(5 * 60 * 1000);

import { ethers } from 'ethers';
import { collect } from './collect';
import { CollectionStrategy, createPostWithClient } from './publication';
import { generateHandle } from './utils';
import { createProfileWithWallet } from './profile';
import { LensClient, PublicationsQueryRequest } from '@lens-protocol/client';
import { asPublicationAttribute } from '@/domain/cause';
import { Entity } from '@/domain/entity';

describe('#collect', () => {
  let wallet: ethers.Wallet;
  let lensClient: LensClient;
  let handle;
  let profileId: string;

  beforeEach(async () => {
    wallet = ethers.Wallet.createRandom();
    lensClient = await loadClientAuthenticated({ wallet });
    handle = generateHandle();
    const results = await createProfileWithWallet(lensClient, wallet, handle);
    profileId = results.profileId;
  });

  test('collect with just created publicationId', async () => {
    const fixture = {
      imageUrl:
        'https://pbs.twimg.com/media/Fs4xCTGWYAULIW_?format=jpg&name=large',
      content: 'Thanks for doing Beach Cleanups',
      name: 'Happy Volunteering!',
      tags: ['cause-123'],
    };

    const results = await createPostWithClient(lensClient)({
      profileId,
      ...fixture,
      content: 'with collect free',
      collectModuleStrategy: CollectionStrategy.Free,
    });

    await lensClient.transaction.waitForIsIndexed(results.txId);

    const request: PublicationsQueryRequest = {
      profileId,
    };
    const fetchPublicationsResult = await lensClient.publication.fetchAll(
      request,
    );
    console.log('publicaitons', fetchPublicationsResult?.items);

    const [publication] = fetchPublicationsResult?.items || [];

    await collect(lensClient)(wallet, publication?.id);
  });
});
