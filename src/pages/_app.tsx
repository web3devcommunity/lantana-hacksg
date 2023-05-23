import '../rainbowkit.css';
import './index.css';
import React from 'react';
import { AccountProvider } from '@/components/AccountProvider';
import { AppProps } from 'next/app';
import green from '@mui/material/colors/green';
import { Secular_One } from 'next/font/google';

// If loading a variable font, you don't need to specify the font weight
const inter = Secular_One({
  subsets: ['latin'],
  weight: '400'
});


// defaultTheme
import themes from '../themes';
import { CssBaseline, ThemeProvider, createTheme } from '@mui/material';

const DEFAULT_FONT_FAMILY = [
  '-apple-system',
  'BlinkMacSystemFont',
  '"Segoe UI"',
  'Roboto',
  '"Helvetica Neue"',
  'Arial',
  'sans-serif',
  '"Apple Color Emoji"',
  '"Segoe UI Emoji"',
  '"Segoe UI Symbol"',
].join(',')

const theme = createTheme({


  palette: {
    // mode: 'dark',
    primary: green,
  },


  typography: {
    fontFamily: [
      'inherit'
    ].join(','),
    h2: {
      fontWeight: 500,
    },
    h4: {
      fontWeight: 700,
      fontFamily: DEFAULT_FONT_FAMILY
    },
    subtitle1: {
      fontFamily: DEFAULT_FONT_FAMILY
    },
    body1: {
      fontSize: 'larger'
    }
  },
});


interface PageProps { }

const MyApp = ({ Component, pageProps }: AppProps<PageProps>) => {
  return (
    <main className={inter.className}>
      {/* <CssBaseline /> */}
      <ThemeProvider theme={theme}>
        <AccountProvider>
          <Component {...pageProps} />
        </AccountProvider>
      </ThemeProvider>
    </main>
  );
};

export default MyApp;
