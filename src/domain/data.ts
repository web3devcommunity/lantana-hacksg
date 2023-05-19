// aggregate data via lens / on-chain e.g. polygon/optimism

import { Post } from '@lens-protocol/react-web';
import { Cause, mapPublicationAsCause } from './cause';
import { LensClient, PublicationsQueryRequest } from '@lens-protocol/client';

export const aggregateCauseData = (publicaiton: Post) => {
  const cause = mapPublicationAsCause(publicaiton);

  const volunteersCount = publicaiton.stats;

  return {
    cause,
  };
};

export const loadCauseDataWithPublicationId =
  (lensClient: LensClient) => async (publicationIds: string[]) => {
    // TODO replace with demo
    const request: PublicationsQueryRequest = {
      publicationIds,
    };
    const results = await lensClient.publication.fetchAll(request);

    const item = results.items[0];
    return {};
  };

// suppose to load from cause keys
// export const loadCauseData = (causeKey: string)=>{

// }
