import type { Meta, StoryObj } from '@storybook/react';

import { CauseAttestationList } from '../components/CauseAttestationList';
import { TEST_CAUSES } from '@/domain/cause.fixture';
import { TEST_CAUSE_ATTESTATION_RAW } from '@/domain/cause-attestation.fixture';

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta: Meta<typeof CauseAttestationList> = {
    title: 'Example/CauseAttestationList',
    component: CauseAttestationList,
    tags: ['autodocs'],
    argTypes: {
        backgroundColor: {
            control: 'color',
        },
    },
};

export default meta;
type Story = StoryObj<typeof CauseAttestationList>;

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Primary: Story = {
    args: {
        causeAttestations: TEST_CAUSE_ATTESTATION_RAW,
        label: 'CauseAttestationList',
    },
};

