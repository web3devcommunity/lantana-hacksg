import type { Meta, StoryObj } from '@storybook/react';

import { Feed } from '../components/Feed';
import { TEST_CAUSES } from '../domain/cause.fixture';
import { createFilters } from '../libs/lens/create-filters';
import { PublicationSortCriteria } from '@lens-protocol/react-web';
import { APP_VERSION_TAG } from '../env';
import { AccountProvider } from '../components/AccountProvider';

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction

const meta: Meta<typeof Feed> = {
  title: 'Example/Feed',
  component: Feed,
  tags: ['autodocs'],
  argTypes: {},
  decorators: [
    (Story) => (
      <AccountProvider>
        {/* 👇 Decorators in Storybook also accept a function. Replace <Story/> with Story() to enable it  */}
        <Story />
      </AccountProvider>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof Feed>;

export const All: Story = {
  args: {
    // PublicationSortCriteria
    metadataFilter: {},
  },
};

// const appFilter = createFilters({
// restrictPublicationTagsTo: {
//     all: ["lantanav202305100100"]
// }
// })?.metadataFilter

const appFilter = createFilters({
  restrictPublicationTagsTo: {
    all: [APP_VERSION_TAG],
  },
})?.metadataFilter;

export const AppOnly: Story = {
  args: {
    metadataFilter: appFilter,
  },
};

export const Latest: Story = {
  args: {
    sortCriteria: PublicationSortCriteria.Latest,
  },
};

export const TopCommented: Story = {
  args: {
    metadataFilter: {},
    sortCriteria: PublicationSortCriteria.TopCommented,
  },
};
