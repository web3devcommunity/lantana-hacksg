import SocialLayout from '@/components/SocialLayout'
import Image from 'next/image'
import { Feed } from '../components/Feed';
import { Typography } from '@mui/material';

export default function Discover() {
  const metadataFilter = {

  }
  return (
    <SocialLayout>
      <main>
        <Typography variant="h2">Causes</Typography>
        <Typography variant="h4" color="text.secondary">Singapore</Typography>
        <br />
        <Feed metadataFilter={metadataFilter} />

      </main>
    </SocialLayout>

  )
}
