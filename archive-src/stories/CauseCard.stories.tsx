import type { Meta, StoryObj } from '@storybook/react';

import { CauseCard } from '../components/CauseCard';
import { TEST_CAUSES } from '../domain/cause.fixture';
import { CauseCardActions } from '../components/CauseCardAction';
import { createConfig } from '../components/lens-binding';
import { LensProvider } from '@lens-protocol/react-web';
import { PUBLICATIONS_RAW } from '../libs/lens/publication.fixture';
import { AccountProvider } from '../components/AccountProvider';

const lensConfig = createConfig();

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta: Meta<typeof CauseCard> = {
  title: 'Example/CauseCard',
  component: CauseCard,
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
type Story = StoryObj<typeof CauseCard>;

export const Primary: Story = {
  args: {
    cause: TEST_CAUSES[0],
    actions: <div></div>,
  },
};

export const CollectionAcitons: Story = {
  args: {
    cause: TEST_CAUSES[0],
    actions: <CauseCardActions publication={PUBLICATIONS_RAW[1]} />,
  },
};