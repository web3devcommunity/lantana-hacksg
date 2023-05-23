import type { Meta, StoryFn, StoryObj } from '@storybook/react';

import { NFTCard, NFTList } from '../components/NFTCard';
import { createFilters } from '@/libs/lens/create-filters';
import { PublicationSortCriteria } from '@lens-protocol/react-web';
import { AccountProvider } from '@/components/AccountProvider';
import { ALCHEMY_API_TOKEN_MUMBAI, ALCHEMY_API_TOKEN_OPTIMISM } from '@/env';


// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction

const meta: Meta<typeof NFTList> = {
    title: 'Example/NFTList',
    component: NFTList,
    tags: ['autodocs'],
    argTypes: {},
    decorators: [
        (Story: StoryFn) => (
            <AccountProvider>
                <Story />
            </AccountProvider>
        ),
    ],
};

export default meta;
type Story = StoryObj<typeof NFTList>;


export const Mumbai: Story = {
    args: {
        // Lens minted TODO
        contractAddress: '0xa4f68403fa88b9bbc9fd4f52b94d14e5d6a396ed',
        // userAddress: '0x5CA76c95a877bfE72e837B63464Db191faDe405F',
        network: 'mumbai',
    },
};

export const Hypercerts: Story = {
    args: {
        contractAddress: '0x822F17A9A5EeCFd66dBAFf7946a8071C265D1d07',
        userAddress: '0xd6ca1230e3c334daa0becf91baaa4e5c2470dffe',
        network: 'optimism',
    },
};

