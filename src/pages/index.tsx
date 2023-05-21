import SocialLayout from '@/components/SocialLayout';
import { Feed } from '../components/Feed';
import { Typography, TextField } from '@mui/material';
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
      <Typography variant="h2" marginBottom={1}>
        Causes
      </Typography>
      <Typography variant="h4" color="text.secondary" marginBottom={1}>
        Singapore
      </Typography>

      <TextField
        size="small"
        type="search"
        id="search"
        placeholder="Search ..."
        sx={{
          display: 'flex',
          maxWidth: '600px',
          marginTop: '20px',
          marginBottom: '20px',
        }}
      ></TextField>

      <Feed
        metadataFilter={appFilter}
        sortCriteria={PublicationSortCriteria.Latest}
      />
    </SocialLayout>
  );
}
