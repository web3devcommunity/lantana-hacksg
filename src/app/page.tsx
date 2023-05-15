import React from 'react';
import { Inter } from 'next/font/google';
import ConnectWallet from './components/ConnectWallet';

const inter = Inter({ subsets: ['latin'] });

export default function Home() {
  return (
    <React.StrictMode>
      <ConnectWallet />
    </React.StrictMode>
  );
}
