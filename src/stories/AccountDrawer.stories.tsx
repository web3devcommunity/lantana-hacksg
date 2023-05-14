// try to mimic settings at https://mui.com/material-ui/react-drawer/

import type { Meta, StoryObj } from '@storybook/react';

import { AccountDrawer } from '../components/AccountDrawer';


const meta: Meta<typeof AccountDrawer> = {
    title: 'Example/AccountDrawer',
    component: AccountDrawer,
    tags: ['autodocs'],
    argTypes: {
    }
};

export default meta;
type Story = StoryObj<typeof AccountDrawer>;

export const Primary: Story = {
    args: {
        children: (
            <div className="rainbowkit-connect-btn">
                Manage Account
            </div>
        ),
    },
};
