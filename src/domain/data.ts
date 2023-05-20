// aggregate data via lens / on-chain e.g. polygon/optimism

import { Post } from '@lens-protocol/react-web';
import { Cause, mapPublicationAsCause } from './cause';
import { LensClient, PublicationsQueryRequest } from '@lens-protocol/client';
import { LensPublication } from '@/libs/lens/utils';
import { findAttributeWithEntity } from '@/libs/lens/publication-entity';

export const aggregateCauseData = (publicaiton: LensPublication) => {
  const cause = mapPublicationAsCause(publicaiton);

  // const volunteersCount = publicaiton.stats;

  // load custom data from the attributes
  // const v = findAttributeWithEntity(publication, Entity.Cause);

  const donateCount = publicaiton?.stats?.totalAmountOfCollects;

  const donatePrice = publicaiton?.collectModule?.amount?.value;

  const donateTotal = donateCount * donatePrice;

  return {
    cause,
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
