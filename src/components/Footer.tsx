import * as React from 'react';
import Container from '@mui/material/Container';
import Image from 'next/image';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';

export default function Footer() {
  return (
    <Paper
      sx={{
        marginTop: 'calc(10% + 60px)',
        width: '100%',
        bottom: 0,
      }}
      component="footer"
      square
      variant="outlined"
    >
      <Box
        sx={{
          flexGrow: 1,
          justifyContent: 'center',
          display: 'flex',
          my: 1,
        }}
      ></Box>

      <Box
        sx={{
          flexGrow: 1,
          justifyContent: 'center',
          display: 'flex',
          mb: 2,
        }}
      >
        <Typography variant="caption" color="initial">
          Lantana ©2023. Follow us
        </Typography>
      </Box>
    </Paper>
  );
}
