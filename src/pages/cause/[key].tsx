import { EventList } from '@/components/EventList';
import SocialLayout from '@/components/SocialLayout';
import { Grid, Typography } from '@mui/material';
import Image from 'next/image';
import { CauseAttestationList } from '@/components/CauseAttestationList';
import { TEST_CAUSE_ATTESTATION_RAW } from '@/domain/cause-attestation.fixture';
import { useRouter } from 'next/router';
import { TEST_CAUSES } from '@/domain/cause.fixture';

export default function CausePage() {
  const router = useRouter();

  // TODO fix hardcode
  // query causes via api
  // const events = cause.events;
  const cause = TEST_CAUSES[0];
  const events = cause.events;

  return (
    <SocialLayout>
      <main>
        <Typography variant="h2"> {cause.title}</Typography>
        <Typography variant="h4" color="text.secondary">
          organized by {cause.organizer.title}
        </Typography>

        <Grid container sx={{ marginTop: '50px' }}>
          <Grid item xs={12} md={12}>
            <Typography variant="h2">Upcoming Events</Typography>
          </Grid>
          <Grid item xs={12} md={6}>
            <EventList events={events} />
          </Grid>
          <Grid item xs={12} md={6}>
            <div>Funding Received: $123,456</div>
            <CauseAttestationList
              causeAttestations={TEST_CAUSE_ATTESTATION_RAW}
            />
          </Grid>
        </Grid>
      </main>
    </SocialLayout>
  );
}
