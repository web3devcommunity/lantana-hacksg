import React, { useEffect, useState } from 'react';
import {
  usePublications,
  useFeed,
  useExplorePublications,
  useSearchPublications,
  PublicationMetadataFilters,
} from '@lens-protocol/react-web';

// dont nest hooks
export const createFilters = (params: Record<string, any>) => {
  const metadataFilter: PublicationMetadataFilters = {
    // restrictPublicationMainFocusTo?: PublicationMainFocus[];
    // restrictPublicationLocaleTo?: string;
    // showPublicationsWithContentWarnings?: {
    //   oneOf: PublicationContentWarning[];
    // };

    ...params,
  };

  return {
    metadataFilter,
  };
};
