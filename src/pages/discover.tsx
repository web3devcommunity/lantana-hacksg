import SocialLayout from '@/components/SocialLayout';
import Image from 'next/image';
import { Feed } from '../components/Feed';
import { Typography } from '@mui/material';
import { APP_VERSION_TAG } from '@/env';
import { createFilters } from '@/libs/lens/create-filters';

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
        <Feed metadataFilter={appFilter} />
      </main>
    </SocialLayout>
  );
}
