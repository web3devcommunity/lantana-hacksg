import type { Meta, StoryObj } from "@storybook/react";
import { TEST_CAUSES } from "@/domain/cause.fixture";
import { EventList } from "@/components/EventList";
import { createConfig } from '@/components/lens-binding';
import { AccountProvider } from "@/components/AccountProvider";
import { asEvent } from "@/domain/event";

const lensConfig = createConfig();

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta: Meta<typeof EventList> = {
    title: "Example/Event",
    component: EventList,
    tags: ["autodocs"],
    argTypes: {
    },
    decorators: [
        (Story) => (
            <AccountProvider>

                {/* 👇 Decorators in Storybook also accept a function. Replace <Story/> with Story() to enable it  */}
                <Story />
            </AccountProvider>
        ),
    ]
};

export default meta;
type Story = StoryObj<typeof EventList>;


export const Primary: Story = {
    args: {
        events: TEST_CAUSES[0]?.events.map(asEvent),
    },
};

