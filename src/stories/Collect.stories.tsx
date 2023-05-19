import type { Meta, StoryObj } from '@storybook/react';

import { Button } from './Button';
import { CollectButtonWrapper } from '@/components/CollectButtonWrapper';
import { AccountProvider } from '@/components/AccountProvider';
import { ConnectLens } from '@/components/ConnectLens';
import { Account } from '@/components/Account';
import { PUBLICATIONS_RAW } from '@/libs/lens/publication.fixture';
import React from 'react';
import { CURRENCY_LANTANA_ADDRESS, CURRENCY_USDC_ADDRESS, CURRENCY_WMATIC_ADDRESS } from '@/env';

const publicationId = '0x81f0-0x01'

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta: Meta<typeof CollectButtonWrapper> = {
    title: 'Example/CollectButtonWrapper',
    component: CollectButtonWrapper,
    tags: ['autodocs'],
    argTypes: {
    },
    decorators: [
        (Story, args) => (
            <AccountProvider>
                <div>
                    <Account />
                    <a target="_blank" href={"https://testnet.lenster.xyz/posts/" + args.publicationId}>Lens Url</a>

                    <ConnectLens />
                    <div style={{ minHeight: '200px' }}>
                        <Story />
                    </div>
                </div>
            </AccountProvider >
        ),
    ],
};

export default meta;
type Story = StoryObj<typeof CollectButtonWrapper>;

export const Wmatic: Story = {
    args: {
        publicationId,
        currencyAddress: CURRENCY_WMATIC_ADDRESS
    },
};

export const Usdc: Story = {
    args: {
        publicationId,
        currencyAddress: CURRENCY_USDC_ADDRESS
    },
};

export const Lantana: Story = {
    args: {
        publicationId,
        currencyAddress: CURRENCY_LANTANA_ADDRESS
    },
};

