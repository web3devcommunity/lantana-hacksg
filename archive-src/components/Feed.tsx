import IconButton, { IconButtonProps } from '@mui/material/IconButton';
import { useRouter } from 'next/router';

import { Inter } from 'next/font/google';
import Grid from '@mui/material/Grid';
import { Avatar, Button } from '@mui/material';
import Typography from '@mui/material/Typography';

import {
  usePublications,
  useFeed,
  useExplorePublications,
  useSearchPublications,
  useComments,
  PublicationTypes,
} from '@lens-protocol/react-web';
import { createFilters } from '../libs/lens/create-filters';
import {
  useActiveProfile,
  useActiveWallet,
  useWalletLogout,
} from '@lens-protocol/react-web';
import { CauseCard, asCause } from './CauseCard';
import { mapPublicationAsCause } from '../domain/cause';

const FeedItems = ({ publications }: { publications: any[] }) => {
  return (
    <div>
      <Grid container>
        {publications.map((publication, i) => {
          return (
            <Grid key={i} className="item">
              <CauseCard cause={mapPublicationAsCause(publication)} />
            </Grid>
          );
        })}
      </Grid>
    </div>
  );
};

export const Feed = ({
  metadataFilter,
  sortCriteria,
}: {
  metadataFilter: any;
  sortCriteria: any;
}) => {
  const {
    data: publications,
    loading,
    hasMore,
    next,
  } = useExplorePublications({
    limit: 10,
    sortCriteria,
    metadataFilter,
    publicationTypes: [PublicationTypes.Post],
  });

  if (!publications) {
    return <div />;
  }

  return <FeedItems publications={publications} />;
};
