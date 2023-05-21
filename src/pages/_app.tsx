import '../rainbowkit.css';
import './index.css';
import React from 'react';
import { AccountProvider } from '@/components/AccountProvider';
import { AppProps } from 'next/app';

// defaultTheme
import theme from '../themes';
import { ThemeProvider } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';
import Footer from '@/components/Footer';
import Header from '@/components/Header';

interface PageProps {}

const MyApp = ({ Component, pageProps }: AppProps<PageProps>) => {
  const themes = theme({ mode: 'light' });
  return (
    <>
      <ThemeProvider theme={themes}>
        <CssBaseline />
        <AccountProvider>
          <Header />
          <Component {...pageProps} />
        </AccountProvider>
      </ThemeProvider>
      <Footer />
    </>
  );
};

export default MyApp;
