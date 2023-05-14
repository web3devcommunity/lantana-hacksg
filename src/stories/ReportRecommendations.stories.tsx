import type { Meta, StoryObj } from "@storybook/react";

import { getWagmiClient } from '@/libs/wagmi';
import { createConfig } from '@/components/lens-binding';
import { ReportRecommendations } from "@/components/ReportRecommendations";

const lensConfig = createConfig();
const wagmiClient = getWagmiClient();

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta: Meta<typeof ReportRecommendations> = {
    title: "Example/ReportRecommendations",
    component: ReportRecommendations,
    tags: ["autodocs"],
    argTypes: {
        backgroundColor: {
            control: "color",
        },
    }
};

export default meta;
type Story = StoryObj<typeof ReportRecommendations>;


export const Primary: Story = {
    args: {
        actions: <></>,

        label: "ReportRecommendations",
    },
};
