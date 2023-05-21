import * as _ from 'lodash';
import { EventList } from '@/components/EventList';
import SocialLayout from '@/components/SocialLayout';
import {
  Button,
  Grid,
  Typography,
  Backdrop,
  CircularProgress,
  Avatar,
} from '@mui/material';
import Image from 'next/image';
import { CauseAttestationList } from '@/components/CauseAttestationList';
import { TEST_CAUSE_ATTESTATION_RAW } from '@/domain/cause-attestation.fixture';
import { useRouter } from 'next/router';
import { createFilters } from '@/libs/lens/create-filters';
import { formatEntityTag, mapPublicationAsCause } from '@/domain/cause';
import { APP_VERSION_TAG, CURRENCY_LANTANA_ADDRESS } from '@/env';
import {
  PublicationId,
  useExplorePublications,
  usePublicationRevenue,
  useWhoCollectedPublication,
} from '@lens-protocol/react-web';
import styled from 'styled-components';
import { CollectButtonWrapper } from '@/components/CollectButtonWrapper';
import { Entity } from '@/domain/entity';
import { mapPublicationAsEvent } from '@/domain/event';

export default function CausePage() {
  const router = useRouter();

  const causeKey = router.query.key;

  // alternative approaches
  // - use publication id to query (missing in attribute now)
  // - cause key to filter from publications (but need cache in state)
  // - usePublications but profile id is required

  const StatsWrapper = styled.div`
    font-size: 2rem;
  `;

  const appFilter = createFilters({
    restrictPublicationTagsTo: {
      all: [
        APP_VERSION_TAG,
        // formatEntityTag(Entity.Cause, Entity.Lantana),
        formatEntityTag(causeKey as string, Entity.Cause),
      ],
    },
  })?.metadataFilter;

  const { data } = useExplorePublications({
    metadataFilter: appFilter,
  });

  const post = _.first(data);

  const eventFilter = createFilters({
    restrictPublicationTagsTo: {
      all: [
        APP_VERSION_TAG,
        formatEntityTag(Entity.Event, Entity.Lantana),
        formatEntityTag(causeKey as string, Entity.Cause),
      ],
    },
  })?.metadataFilter;

  const { data: eventPublications } = useExplorePublications({
    metadataFilter: eventFilter,
  });

  const publicationId = post?.id as PublicationId;

  const { data: whoCollected, loading: whoCollectedLoading } =
    useWhoCollectedPublication({
      limit: 10,
      publicationId,
    });

  const { data: revenue, loading } = usePublicationRevenue({
    publicationId,
  });

  //@ts-ignore
  const total = revenue?.totalAmount || 0;

  if (!post)
    return (
      <div>
        <Backdrop
          sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={!post}
        >
          <CircularProgress color="inherit" />
        </Backdrop>
      </div>
    );

  // event loaded separately

  const cause = mapPublicationAsCause(post);

  const events = (eventPublications || [])?.map(mapPublicationAsEvent);

  console.log('whoCollected', whoCollected, whoCollectedLoading, revenue);

  return (
    <SocialLayout>
      <Grid container>
        <Typography variant="h2" marginBottom={2}>
          {cause.title}
        </Typography>
      </Grid>
      <Grid container>
        <Grid item xs={1}>
          <Avatar sx={{ margin: '0px 7px 7px 7px' }}>N</Avatar>
        </Grid>
        <Grid item xs={11}>
          <Typography variant="h4" color="text.secondary">
            organized by
          </Typography>
          <Typography variant="h4">{cause.organizer.title}</Typography>
        </Grid>
      </Grid>
      <Image src={cause.imageUrl} width={600} height={400} alt={cause.title} />
      <Grid container sx={{ marginTop: '50px' }}>
        <Grid item xs={12} md={12}>
          <Typography variant="h3">Upcoming Events</Typography>
        </Grid>
        <Grid item xs={12} md={6}>
          <EventList events={events} />
        </Grid>
        <Grid item xs={12} md={6}>
          <StatsWrapper>
            <Typography variant="body1" color="text.secondary">
              Funding Received: ${total} <br />
              from {whoCollected?.length} people
            </Typography>
            <div>
              <CollectButtonWrapper
                publicationId={post.id}
                currencyAddress={CURRENCY_LANTANA_ADDRESS}
              >
                <Button>Donate</Button>
              </CollectButtonWrapper>
            </div>
          </StatsWrapper>
          <CauseAttestationList
            causeAttestations={TEST_CAUSE_ATTESTATION_RAW}
          />
        </Grid>
      </Grid>
    </SocialLayout>
  );
}
