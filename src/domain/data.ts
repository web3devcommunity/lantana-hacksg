// aggregate data via lens / on-chain e.g. polygon/optimism
import * as _ from 'lodash';
import { Post } from '@lens-protocol/react-web';
import { Cause, mapPublicationAsCause } from './cause';
import { LensClient, PublicationsQueryRequest } from '@lens-protocol/client';
import { LensPublication } from '@/libs/lens/utils';
import { findAttributeWithEntity } from '@/libs/lens/publication-entity';
import { Entity, WhiteListedEntities } from './entity';

export const withDemoData = (publication: LensPublication) => {};

export const aggregateCauseData = (
  publication: LensPublication,
): Record<string, any> | null => {
  if (!publication) {
    return null;
  }
  const cause = mapPublicationAsCause(publication);

  // load custom data from the attributes

  const metadata = Object.fromEntries(
    WhiteListedEntities.map((entity) => {
      return [entity, findAttributeWithEntity(publication, entity)];
    }),
  );

  const donateCount = publication?.stats?.totalAmountOfCollects;

  const donatePrice = parseFloat(publication?.collectModule?.amount?.value);

  const donateTotal = donateCount * donatePrice;

  return {
    ..._.pick(cause, ['title', 'organizer']),
    ...metadata,
    donateCount,
    donatePrice,
    donateTotal,
  };
};

export const loadCauseDataWithPublicationId =
  (lensClient: LensClient) => async (publicationIds: string[]) => {
    // TODO replace with demo
    const request: PublicationsQueryRequest = {
      publicationIds,
    };
    const results = await lensClient.publication.fetchAll(request);

    return results.items.map((item) => aggregateCauseData(item));
  };

// suppose to load from cause keys
// export const loadCauseData = (causeKey: string)=>{

// }
