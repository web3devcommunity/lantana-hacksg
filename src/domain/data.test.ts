import * as _ from 'lodash';
import { jest, describe, test, expect, it, beforeAll } from '@jest/globals';
import { mapPublicationAsEvent } from './event';
import { PUBLICATIONS_RAW } from '../libs/lens/publication.fixture';
import { loadClientAuthenticated } from '@/libs/lens/client';
import { ethers } from 'ethers';
import { LensClient, PublicationsQueryRequest } from '@lens-protocol/client';
import { aggregateCauseData, loadCauseDataWithPublicationId } from './data';
import { Entity } from './entity';
import { Post } from '@lens-protocol/api-bindings';

describe('#data', () => {
  let lensClient: LensClient;

  beforeAll(async () => {
    const wallet = ethers.Wallet.createRandom();
    lensClient = await loadClientAuthenticated({
      wallet,
    });
  });

  test.skip('#loadCauseDataWithPublicationId', async () => {
    // TODO replace with demo
    const publicationIds = ['0x03b0-0x01'];
    const results = await loadCauseDataWithPublicationId(lensClient)(
      publicationIds,
    );

    console.log(results);
    const [causeData] = results;

    expect(causeData?.donateCount).toEqual(234);

    // const event = aggregateCauseData(publicationId);
    // expect(event?.descriptionShort).toEqual('Hello Josh :)');
  });

  test('#loadCauseDataWithPublicationId', async () => {
    const publicationIds = ['0x03b0-0x01'];
    const request: PublicationsQueryRequest = {
      publicationIds,
    };
    const results = await lensClient.publication.fetchAll(request);

    const [item] = results.items;
    console.log('item', item);

    const publication = {
      ...item,
      metadata: {
        ...(item as unknown as Post).metadata,
        attributes: [
          {
            displayType: null,
            traitType: Entity.EventCategory,
            value: 'beach-cleanup',
          },
          {
            displayType: null,
            traitType: Entity.WasteCollectedKg,
            value: 5.3,
          },
        ],
      },
    };

    const causeData = aggregateCauseData(publication);

    expect(causeData?.donateCount).toEqual(1);
    expect(causeData?.donatePrice).toEqual(0.1);
    expect(causeData?.[Entity.WasteCollectedKg]).toEqual(5.3);
    expect(causeData?.[Entity.EventCategory]).toEqual('beach-cleanup');
  });
});
