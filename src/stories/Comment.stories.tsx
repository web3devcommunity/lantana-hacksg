import { Meta, StoryFn, StoryObj } from '@storybook/react';

import { Button } from './Button';
import { CollectButtonWrapper } from '@/components/CollectButtonWrapper';
import { AccountProvider } from '@/components/AccountProvider';
import { ConnectLens } from '@/components/ConnectLens';
import { Account } from '@/components/Account';
import React from 'react';
import { CURRENCY_LANTANA_ADDRESS, CURRENCY_USDC_ADDRESS, CURRENCY_WMATIC_ADDRESS } from '@/env';
import { CommentComposer } from '@/components/CommentComposer';
import { useActiveProfile } from '@lens-protocol/react-web';
import {
    ContentFocus,
    ProfileOwnedByMe,
    useCreateComment,
    PublicationId,
    CollectPolicyType,
} from '@lens-protocol/react-web';
const publicationId = '0x82c2-0x04';


// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta: Meta<typeof CommentComposer> = {
    title: 'Example/CommentComposer',
    component: CommentComposer,
    tags: ['autodocs'],
    argTypes: {
    },
    decorators: [
        (Story) => (
            <AccountProvider>
                <div>
                    <Account />
                    <ConnectLens />
                    <Story />
                </div>
            </AccountProvider >
        ),
    ],
};

export default meta;
type Story = StoryObj<typeof CollectButtonWrapper>;


export const Basic: Story = {
    render: (args) => {
        // eslint-disable-next-line react-hooks/rules-of-hooks
        const { data: activeProfile } = useActiveProfile();
        if (!activeProfile) {
            return <></>
        }
        return <><CommentComposer publicationId={args.publicationId as PublicationId} publisher={activeProfile} /></>
    },

    args: {
        publicationId: CURRENCY_LANTANA_ADDRESS,
    },
};

