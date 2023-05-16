import '../rainbowkit.css';
import './index.css';
import React from 'react';
import { AccountProvider } from '@/components/AccountProvider';
import { AppProps } from 'next/app';

// defaultTheme
import themes from '../themes';
import { CssBaseline } from '@mui/material';


interface PageProps { }


const MyApp = ({ Component, pageProps }: AppProps<PageProps>) => {

    return (<React.Fragment>
        {/* <CssBaseline /> */}
        <AccountProvider>
            <Component {...pageProps} />
        </AccountProvider>
    </React.Fragment >);
}


export default MyApp;