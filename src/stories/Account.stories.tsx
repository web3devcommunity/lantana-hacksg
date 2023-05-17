import React from 'react';

import type { Meta, StoryObj } from '@storybook/react';

import { Account } from '../components/Account';
import {
  useAccount,
  useSigner,
} from 'wagmi';
import '../rainbowkit.css';
import { useEffect, useMemo } from 'react';
import {
  LensProvider,
  useActiveProfile,
  useActiveWallet,
  useCreateProfile,
  useWalletLogin,
} from '@lens-protocol/react-web';
import { PN_PROJECT_ID, PN_APP_ID } from '@/env';
import { AccountProvider } from '@/components/AccountProvider';
import { useWalletLogout } from '@lens-protocol/react-web';
import { generateHandle } from '@/libs/lens/utils';
import { ConnectLens } from '@/components/ConnectLens';

const WagmiStateWrapper = ({ children }: { children: React.ReactElement }) => {
  const { address } = useAccount();

  // const { isLoading, isSuccess } = useConnect();

  return (
    <div>
      <div>
        PN_PROJECT_ID: ${PN_PROJECT_ID} <br />
        PN_APP_ID: ${PN_APP_ID} <br />
        wagmi address: {address}
      </div>
      {children}
    </div>
  );
};


const SignUpWidget = () => {
  const { address, isConnected } = useAccount();
  const { data: signer, isError, isLoading } = useSigner();

  const { execute: login, error, isPending } = useWalletLogin();
  const { execute: logout } = useWalletLogout();

  const { data: activeWallet } = useActiveWallet();

  const [isReady, setIsReady] = React.useState(false);

  useEffect(() => {
    console.log('isConnected', isConnected, address, activeWallet?.address);
    if (isConnected) {
      if (activeWallet && address !== activeWallet?.address) {
        // there are times lens.development.activeProfiles / lens.development.wallets in localstorage not matching current ui state
        // find profile from cache and reset if not matching, (via e.g. restart) if there is error  "Pofile not owned by the active wallet"
        // happens when re-connecting wallet with different address
        logout().then(() => {
          setIsReady(true);
        });
      } else {
        setIsReady(true);
      }
    }
  }, [address, activeWallet?.address, isConnected]);

  if (!isReady) {
    return <div></div>;
  }

  // seems lens load from cache even wallet not collected / using another wallet
  return <ConnectLens />;
};

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta: Meta<typeof Account> = {
  title: 'Example/Account',
  component: Account,
  tags: ['autodocs'],
  argTypes: {},
  decorators: [
    (Story) => (
      <AccountProvider>
        <div>
          <WagmiStateWrapper>
            <div style={{ minHeight: '200px' }}>
              <Story />
            </div>
          </WagmiStateWrapper>
          <SignUpWidget />
        </div>
      </AccountProvider>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof Account>;

export const Primary: Story = {
  args: {
    primary: true,
    label: 'Account',
  },
};
