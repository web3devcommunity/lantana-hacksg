import type { Meta, StoryFn, StoryObj } from '@storybook/react';

import { NFTCard } from '../components/NFTCard';
import { createFilters } from '@/libs/lens/create-filters';
import { PublicationSortCriteria } from '@lens-protocol/react-web';
import { AccountProvider } from '@/components/AccountProvider';
import { ALCHEMY_API_TOKEN_MUMBAI, ALCHEMY_API_TOKEN_OPTIMISM } from '@/env';

import { Network } from "alchemy-sdk";

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction

const meta: Meta<typeof NFTCard> = {
    title: 'Example/NFTCard',
    component: NFTCard,
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
type Story = StoryObj<typeof NFTCard>;


export const Mumbai: Story = {
    args: {
        // Lens minted TODO
        contractAddress: '0xa4f68403fa88b9bbc9fd4f52b94d14e5d6a396ed',
        tokenId: '1',
        tokenType: 'ERC721',
        network: 'mumbai',
    },
};

export const Hypercerts: Story = {
    args: {
        contractAddress: '0x822F17A9A5EeCFd66dBAFf7946a8071C265D1d07',
        tokenId: '131348993631482246896862598468662529622016',
        tokenType: 'ERC1155',
        network: 'optimism',
        externalUrl: 'https://hypercerts.io',
    },
};

// TODO list
// userAddress: '0x073e73198326cd6Fa1BF85938548Ce89f9e22497',