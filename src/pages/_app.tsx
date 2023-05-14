import '../rainbowkit.css';
import React from 'react';
import { AccountProvider } from '@/components/AccountProvider';
import { AppProps } from 'next/app';

interface PageProps { }


const MyApp = ({ Component, pageProps }: AppProps<PageProps>) => {

    return (<div>
        <AccountProvider>
            <Component {...pageProps} />
        </AccountProvider>
    </div >);
}


export default MyApp;