import type { Meta, StoryObj } from '@storybook/react';

import { Button } from './Button';
import { CollectButton } from '@/components/CollectButton';
import { AccountProvider } from '@/components/AccountProvider';
import { ConnectLens } from '@/components/ConnectLens';
import { Account } from '@/components/Account';
import { PUBLICATIONS_RAW } from '@/libs/lens/publication.fixture';
import React from 'react';
import { publicationId, usePublication } from '@lens-protocol/react-web';

const publication = PUBLICATIONS_RAW[0]


// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta: Meta<typeof CollectButton> = {
    title: 'Example/CollectButton',
    component: CollectButton,
    tags: ['autodocs'],
    argTypes: {
        backgroundColor: {
            control: 'color',
        },
    },
    decorators: [
        (Story) => (
            <AccountProvider>
                <div>
                    <Account />
                    {/* address:  {JSON.stringify(address)} */}
                    <ConnectLens />
                    <div style={{ minHeight: '200px' }}>
                        <Story />
                    </div>

                </div>
            </AccountProvider>
        ),
    ],
};

export default meta;
type Story = StoryObj<typeof CollectButton>;

export const Primary: Story = {
    args: {
        publicationId: PUBLICATIONS_RAW[0].id
    },
};

