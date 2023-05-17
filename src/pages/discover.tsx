import SocialLayout from '@/components/SocialLayout';
import { Feed } from '../components/Feed';
import { Typography } from '@mui/material';
import { APP_VERSION_TAG } from '@/env';
import { createFilters } from '@/libs/lens/create-filters';
import { PublicationSortCriteria } from '@lens-protocol/react-web';

export default function Discover() {
  const appFilter = createFilters({
    restrictPublicationTagsTo: {
      all: [APP_VERSION_TAG],
    },
  })?.metadataFilter;

  return (
    <SocialLayout>
      <main>
        <Typography variant="h2">Causes</Typography>
        <Typography variant="h4" color="text.secondary">
          Singapore
        </Typography>
        <br />
        <Feed
          metadataFilter={appFilter}
          sortCriteria={PublicationSortCriteria.Latest}
        />
      </main>
    </SocialLayout>
  );
}
