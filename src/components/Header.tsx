import { AppBar, Box, Toolbar, Typography, useMediaQuery } from '@mui/material';
import { AccountDrawer } from './AccountDrawer';
import { Account } from './Account';

import Grid from '@mui/material/Grid';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { styled } from 'styled-components';
import Image from 'next/image';
import LogoImage from '../../public/logo.png';
import Link from 'next/link';
import { ConnectLens } from './ConnectLens';

const StyledAppBar = styled(AppBar)`
  color: black;
  background-color: #fff;
`;
export const Header = () => {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <StyledAppBar position="static" elevation={0}>
        <Toolbar>
          <Box sx={{ display: 'flex', m: 1 }}>
            <Image src={LogoImage} width={100} alt="Lantana" />
          </Box>
          <Box sx={{ display: 'flex', m: 2 }}>
            <Link href="/">Discover</Link>
          </Box>
          {/* <Box sx={{ display: 'flex', m: 2 }}>
            <Link href="/organize">Organize</Link>
          </Box> */}
          <Box sx={{ display: 'flex', m: 2 }}>
            <Link href="/enterprise/feed">Enterprise</Link>
          </Box>
          {/* <Box sx={{ display: 'flex', m: 2 }}>
            <Link href="/dashboard">Dashboard</Link>
          </Box> */}
          <Box sx={{ flexGrow: 1 }} />
          <AccountDrawer>
            <div>
              <Grid container direction="column">
                <Grid item>
                  <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                    Account
                  </Typography>
                </Grid>
                <Grid item>
                  <Account />
                </Grid>
                <Grid item sx={{ marginTop: '50px' }}>
                  <ConnectLens />
                </Grid>
              </Grid>
            </div>
          </AccountDrawer>
        </Toolbar>
      </StyledAppBar>
    </Box >
  );
};

export default Header;
