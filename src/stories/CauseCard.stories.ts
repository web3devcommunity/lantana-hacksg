import type { Meta, StoryObj } from '@storybook/react';

import { CauseCard } from '../components/CauseCard';
import { TEST_CAUSES } from '@/domain/cause.fixture';

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta: Meta<typeof CauseCard> = {
    title: 'Example/CauseCard',
    component: CauseCard,
    tags: ['autodocs'],
    argTypes: {
        backgroundColor: {
            control: 'color',
        },
    },
};

export default meta;
type Story = StoryObj<typeof CauseCard>;

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Primary: Story = {
    args: {
        cause: TEST_CAUSES[0],
        label: 'CauseCard',
    },
};

