import type { Meta, StoryObj } from '@storybook/react';

import { EventCard } from '../components/EventCard';
import { TEST_CAUSES } from '@/domain/cause.fixture';
import { EventCardActions, EventCardActionsWithProfile } from '@/components/EventCardAction';
import { createConfig } from '@/components/lens-binding';
import { LensProvider, useActiveProfile } from '@lens-protocol/react-web';
import { PUBLICATIONS_RAW } from '@/libs/lens/publication.fixture';
import { AccountProvider } from '@/components/AccountProvider';
import { ConnectDecorator } from './ConnectDecorator';

const lensConfig = createConfig();

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta: Meta<typeof EventCard> = {
  title: 'Example/EventCard',
  component: EventCard,
  tags: ['autodocs'],
  argTypes: {},
  decorators: [
    ConnectDecorator
  ],
};


export default meta;
type Story = StoryObj<typeof EventCard>;

export const Primary: Story = {
  args: {
    event: TEST_CAUSES[0]?.events[0],
    actions: <div></div>,
  },
};

// TODO use proper publication instead of fixture for reloading publication state

export const EventAcitons: Story = {
  args: {
    event: TEST_CAUSES[0]?.events[0],
    actions: <EventCardActionsWithProfile
      publication={PUBLICATIONS_RAW[0]}

    />,
  },
};
