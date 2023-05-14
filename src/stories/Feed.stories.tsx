import type { Meta, StoryObj } from '@storybook/react';

import { Feed } from '../components/Feed';
import { TEST_CAUSES } from '@/domain/cause.fixture';
import { createFilters } from '@/libs/lens/create-filters';
import { LensProvider, PublicationSortCriteria } from '@lens-protocol/react-web';
import { getWagmiClient } from '@/libs/wagmi';
import { WagmiConfig } from 'wagmi';
import { createConfig } from '@/components/lens-binding';
import { APP_VERSION_TAG } from "../env";

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction

const lensConfig = createConfig();
const wagmiClient = getWagmiClient({});

const meta: Meta<typeof Feed> = {
    title: 'Example/Feed',
    component: Feed,
    tags: ['autodocs'],
    argTypes: {
        backgroundColor: {
            control: 'color',
        },
    },
    decorators: [
        (Story) => (
            <WagmiConfig client={wagmiClient}>
                <LensProvider config={lensConfig}>

                    {/* 👇 Decorators in Storybook also accept a function. Replace <Story/> with Story() to enable it  */}
                    <Story />
                </LensProvider>
            </WagmiConfig>
        ),
    ]
};

export default meta;
type Story = StoryObj<typeof Feed>;

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const All: Story = {
    args: {
        // PublicationSortCriteria
        metadataFilter: {},
        label: 'Feed',
    },
};

// const appFilter = createFilters({
// restrictPublicationTagsTo: {
//     all: ["lantanav202305100100"]
// }
// })?.metadataFilter

const appFilter = createFilters({
    restrictPublicationTagsTo: {
        all: ["beachsignalv2145"]
    }
})?.metadataFilter


export const AppOnly: Story = {
    args: {
        metadataFilter: appFilter,
        label: 'Feed',
    },
};

export const Latest: Story = {
    args: {
        sortCriteria: PublicationSortCriteria.Latest,
        label: 'Feed',
    },
};


export const TopCommented: Story = {
    args: {
        metadataFilter: {},
        sortCriteria: PublicationSortCriteria.TopCommented,
        label: 'Feed',
    },
};


