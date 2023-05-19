import * as _ from 'lodash';
import { loadClientAuthenticated } from './client';
import { jest, describe, test, expect, it, beforeAll } from '@jest/globals';
import { CollectionStrategy, createPostWithClient } from './publication';
import { CollectModules, LensClient } from '@lens-protocol/client';

import { ethers } from 'ethers';
import { createProfileWithWallet } from './profile';
import { generateHandle, getProfileUrl } from './utils';
import {
  APP_VERSION_TAG,
  CURRENCY_LANTANA_ADDRESS,
  TEST_RECIPIENT_ADDRESS,
} from '@/env';
import { asPublicationAttribute } from '@/domain/cause';
import { Entity } from '@/domain/entity';

jest.setTimeout(5 * 60 * 1000);

// unstable and being rejected sometimes / on CI, to be investigated
describe('#createPublication', () => {
  let wallet: ethers.Wallet;
  let lensClient: LensClient;
  let handle: string;
  let profileId: string;

  const fixture = {
    imageUrl:
      'https://pbs.twimg.com/media/Fs4xCTGWYAULIW_?format=jpg&name=large',
    content: 'Thanks for doing Beach Cleanups',
    name: 'Happy Volunteering!',
  };

  beforeAll(async () => {
    wallet = ethers.Wallet.createRandom();
    lensClient = await loadClientAuthenticated({ wallet });
    handle = generateHandle();
    const results = await createProfileWithWallet(lensClient, wallet, handle);
    profileId = results.profileId;
  });

  test.skip('create', async () => {
    const mockAttribute = asPublicationAttribute({
      entity: Entity.Cause,
      value: 'beach-cleanup',
    });
    const results = await createPostWithClient(lensClient)(wallet, {
      profileId,
      ...fixture,
      attributes: [mockAttribute],
      tags: ['cause-123'],
    });

    console.log(
      'createPost results',
      handle,
      profileId,
      getProfileUrl(handle),
      results,
    );

    expect(results.contentMetadata.content).toEqual(fixture?.content);
    expect(results.contentMetadata.name).toEqual(fixture?.name);
    //@ts-ignore
    expect(results['reason']).not.toEqual('REJECTED');

    expect(
      _.find(results.contentMetadata.attributes, mockAttribute),
    ).toBeTruthy();

    expect(results.contentMetadata.tags).toEqual([
      APP_VERSION_TAG,
      'cause-123',
    ]);
  });

  test('create with collect strategies', async () => {
    const lensClient = await loadClientAuthenticated({ wallet });
    const result = await lensClient.modules.fetchEnabledCurrencies();

    const resultsFree = await createPostWithClient(lensClient)(wallet, {
      profileId,
      ...fixture,
      content: 'with collect free',
      collectModuleStrategy: CollectionStrategy.Free,
    });
    const resultsWmatic = await createPostWithClient(lensClient)(wallet, {
      profileId,
      ...fixture,
      content: 'with collect wmatic',
      collectModuleStrategy: CollectionStrategy.Wmatic,
      collectModuleOptions: {
        recipientAddress: TEST_RECIPIENT_ADDRESS,
      },
    });

    // will need to be whitelist first
    // https://api-sandbox-mumbai.lens.dev/

    // const resultsLantana = await createPostWithClient(lensClient)(wallet, {
    //   profileId,
    //   ...fixture,
    //   content: 'with collect lantana',
    //   collectModuleStrategy: CollectionStrategy.Lantana,
    //   collectModuleOptions: {
    //     recipientAddress: TEST_RECIPIENT_ADDRESS,
    //   },
    // });
  });
});
