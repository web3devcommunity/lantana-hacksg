import * as _ from 'lodash';
import { jest, describe, test, expect, it, beforeAll } from '@jest/globals';
import { mapPublicationAsEvent } from './event';
import { PUBLICATIONS_RAW } from '../libs/lens/publication.fixture';
import { loadClientAuthenticated } from '@/libs/lens/client';
import { ethers } from 'ethers';
import { PublicationsQueryRequest } from '@lens-protocol/client';
import { loadCauseDataWithPublicationId } from './data';

describe('#data', () => {
  test('#loadCauseDataWithPublicationId', async () => {
    const wallet = ethers.Wallet.createRandom();
    const lensClient = await loadClientAuthenticated({
      wallet,
    });
    // TODO replace with demo
    const publicationIds = ['0x03b0-0x01'];
    const results = await loadCauseDataWithPublicationId(lensClient)(
      publicationIds,
    );

    console.log(results.items);

    // const event = aggregateCauseData(publicationId);
    // expect(event?.descriptionShort).toEqual('Hello Josh :)');
  });
});
