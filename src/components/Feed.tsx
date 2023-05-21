import Grid from '@mui/material/Grid';
import { Avatar, Button, Link } from '@mui/material';
import Typography from '@mui/material/Typography';

import {
  usePublications,
  useFeed,
  useExplorePublications,
  useSearchPublications,
  useComments,
  PublicationTypes,
  PublicationSortCriteria,
} from '@lens-protocol/react-web';
import { createFilters } from '@/libs/lens/create-filters';
import {
  useActiveProfile,
  useActiveWallet,
  useWalletLogout,
} from '@lens-protocol/react-web';
import { CauseCard } from './CauseCard';
import { Event, mapPublicationAsEvent } from '@/domain/event';
import { EventCard } from './EventCard';
import { EventCardActions } from './EventCardAction';
import { styled } from 'styled-components';

// we want to use feed of lens directly
// will need to group by cause

// for now simplify with event card

const FeedItemsWrapper = styled.div`
  a {
    text-decoration: none;
  }
`;

export const FeedItems = ({
  publications,
  linkFactory = (event: Event) => `/cause/${event.causeKey}`,
}: {
  publications: any[];
  linkFactory?: (event: Event) => string;
}) => {
  const { data } = useActiveProfile();
  const actions = EventCardActions({ profile: data });
  // filter out void content: 'Happy Volunteering'
  return (
    <FeedItemsWrapper>
      <Grid container spacing={4}>
        {publications.map((publication, i) => {
          const event = mapPublicationAsEvent(publication);
          if (event.title != 'Happy Volunteering!')
            return (
              <Grid
                item
                key={i}
                display="flex"
                justifyContent="center"
                alignItems="center"
              >
                <Link href={linkFactory(event)}>
                  <EventCard event={event} actions={actions} />
                </Link>
              </Grid>
            );
        })}
      </Grid>
    </FeedItemsWrapper>
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
