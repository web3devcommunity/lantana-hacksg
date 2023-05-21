import { AppBar, Box, Toolbar, Typography, Button } from '@mui/material';
import { AccountDrawer } from './AccountDrawer';
import { Account } from './Account';
import Grid from '@mui/material/Grid';
import Image from 'next/image';
import LogoImage from '../../public/logo.png';
import { ConnectLens } from './ConnectLens';

export const Header = () => {
  return (
    <AppBar
      position="sticky"
      elevation={0}
      sx={{ height: '70px', backgroundColor: '#fffffe' }}
    >
      <Toolbar>
        <Box sx={{ display: 'flex' }}>
          <Image src={LogoImage} width={45} height={45} alt="Lantana" />
          <Typography
            variant="h3"
            component="a"
            href="/"
            sx={{
              fontFamily: 'monospace',
              textDecoration: 'none',
              margin: 1.5,
            }}
          >
            Lantana
          </Typography>
        </Box>
        {/* <Box sx={{ display: 'flex', m: 1.5 }}>
            <Button href="/">Discover</Button>
          </Box>
          <Box sx={{ display: 'flex', m: 2 }}>
            <Link href="/organize">Organize</Link>
          </Box>
          <Box sx={{ display: 'flex', m: 1.5 }}>
            <Button href="/enterprise/feed">Enterprise</Button>
          </Box>
          <Box sx={{ display: 'flex', m: 2 }}>
            <Link href="/dashboard">Dashboard</Link>
          </Box> */}
        <Box
          sx={{
            flexGrow: 1,
            display: { display: 'flex', justifyContent: 'flex-end' },
          }}
        >
          <Button
            href="/"
            variant="text"
            sx={{ color: 'black', fontSize: '15px' }}
          >
            Discover
          </Button>
          <Button
            href="/enterprise"
            variant="text"
            sx={{ color: 'black', fontSize: '15px' }}
          >
            Enterprise
          </Button>
          <Account />
        </Box>

        <AccountDrawer>
          <Grid
            container
            direction="column"
            spacing={2}
            justifyContent="center"
            alignItems="center"
            width="100%"
          >
            <Grid item marginTop="15px">
              <Typography variant="h4" sx={{ flexGrow: 1 }}>
                Profile
              </Typography>
            </Grid>
            <Grid item>
              <Account />
            </Grid>
            <Grid item>
              <ConnectLens />
            </Grid>
          </Grid>
        </AccountDrawer>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
