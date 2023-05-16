import { ReportRecommendations } from '@/components/ReportRecommendations';
import EnterpriseLayout from '../components/EnterpriseLayout';
import { Typography } from '@mui/material';

export default function Enterprise() {
  return (
    <EnterpriseLayout>
      <h1>Enterprise Page</h1>

      <div>
        <Typography>Supported Causes</Typography>

        <Typography>Beach Clean up</Typography>
        <ReportRecommendations causeData={{}} />

        <Typography>Tree Planning</Typography>
        <ReportRecommendations causeData={{}} />
      </div>
    </EnterpriseLayout>
  );
}
