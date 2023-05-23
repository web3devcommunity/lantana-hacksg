import Image from 'next/image';
import { Typography, Box, Grid, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Chip } from '@mui/material';
import LocalFloristIcon from '@mui/icons-material/LocalFlorist';
import AccessibilityIcon from '@mui/icons-material/Accessibility';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';

import MaturityImage from '../../public/dashboard-maturity.png';
import ProgressImage from '../../public/dashboard-progress.png';
import EnterpriseLayout from '@/components/EnterpriseLayout';

const stats = [
  { title: 'Environment', icon: <LocalFloristIcon />, image: ProgressImage, percentage: 67, topics: 3, goals: 7 },
  { title: 'Social', icon: <AccessibilityIcon />, image: ProgressImage, percentage: 70, topics: 2, goals: 3 },
  { title: 'Governance', icon: <AccountBalanceIcon />, image: ProgressImage, percentage: 80, topics: 2, goals: 3 },
]

const goals = [
  { type: 'Environment', status: 'NOT STARTED', color: 'default', description: 'Accelerate a sustainable future through our products' },
  { type: 'Governance', status: 'IN PROGRESS', color: 'warning', description: 'Act with integrity' },
  { type: 'Environment', status: 'COMPLETED', color: 'success', description: 'Accelerate circular economy and reduce waste' },
]

const Dashboard = () => {
  return (
    <div style={{ padding: '16px', backgroundColor: '#5A5A6610' }}>
      {/* Top Row */}
      <Grid container spacing={2}>
        <Grid item xs={3}>
          <Box sx={{ p: 2, m: '1rem', borderRadius: '4px' }}>
            <Typography variant="h5" sx={{ marginBottom: '2rem' }}>SynTech's Sustainability pledges for 2023</Typography>
            <Typography variant="h2">72.23%</Typography>
            <Typography variant="subtitle1">Overall progress</Typography>
          </Box>
        </Grid>
        <Grid item xs={9}>
          <Box sx={{ p: 2, m: '1rem' }}>
            <Grid container spacing={2}>
              {stats.map((stat) => (
                <Grid item xs={4} key={stat.title} >
                  <Box sx={{ bgcolor: '#ffffff', borderRadius: '4px', p: '1rem', marginX: '0.5rem', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                    <Typography variant="subtitle1" sx={{ marginBottom: '1rem' }}>{stat.title} {stat.icon}</Typography>
                    <Image src={stat.image} alt="Progress" width={150} height={150} />
                    <Box sx={{ width: '90%', display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: '1rem' }}>
                      <Box sx={{ flexDirection: 'column', textAlign: 'center' }}>
                        <Typography variant="body2">Topics</Typography>
                        <Typography variant="h6">{stat.topics}</Typography>
                      </Box>
                      <Box sx={{ flexDirection: 'column', textAlign: 'center' }}>
                        <Typography variant="body2">Top Level Goals</Typography>
                        <Typography variant="h6">{stat.goals}</Typography>
                      </Box>
                    </Box>
                  </Box>
                </Grid>
              ))}
            </Grid>
          </Box>
        </Grid>
      </Grid>

      {/* Bottom Row */}
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <Box sx={{ p: 2, m: '1rem', bgcolor: '#ffffff', borderRadius: '4px' }}>
            <Typography variant="h6">Supported Causes</Typography>
            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell></TableCell>
                    <TableCell>FY20</TableCell>
                    <TableCell>FY21</TableCell>
                    <TableCell>FY22</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow>
                    <TableCell>Education & Literacy</TableCell>
                    <TableCell>44%</TableCell>
                    <TableCell>46%</TableCell>
                    <TableCell>4%</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Environment</TableCell>
                    <TableCell>15%</TableCell>
                    <TableCell>11%</TableCell>
                    <TableCell>72%</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Community</TableCell>
                    <TableCell>41%</TableCell>
                    <TableCell>2%</TableCell>
                    <TableCell>1%</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Homeless & Housing</TableCell>
                    <TableCell>-</TableCell>
                    <TableCell>2%</TableCell>
                    <TableCell>12%</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Mentoring</TableCell>
                    <TableCell>-</TableCell>
                    <TableCell>45%</TableCell>
                    <TableCell>1%</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
          </Box>
        </Grid>
        <Grid item xs={3}>
          <Box sx={{ p: 2, m: '1rem', bgcolor: '#ffffff', borderRadius: '4px' }}>
            <Typography variant="h6">ESG Maturity Levels Compared to Others</Typography>
            <Box sx={{ display: 'flex', justifyContent: 'center', marginY: '1rem' }}>
              <Image src={MaturityImage} alt="Maturity Levels" width={202} height={233} />
            </Box>
          </Box>
        </Grid>
        <Grid item xs={3}>
          <Box sx={{ p: 2, m: '1rem', bgcolor: '#ffffff', borderRadius: '4px' }}>
            <Typography variant="h6">Top Level Goals</Typography>
            {goals.map((goal) => (
              <Box key={goal.description} marginBottom={'0.5rem'}>
                {/* @ts-ignore */}
                <Typography variant="body2">{goal.type} <Chip label={goal.status} color={goal.color} size='small' /></Typography>
                <Typography variant="body2">{goal.description}</Typography>
              </Box>
            ))}
          </Box>
        </Grid>
      </Grid>
    </div>
  );
};

export default Dashboard;
