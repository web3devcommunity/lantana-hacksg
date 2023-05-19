import { Account } from "@/components/Account";
import { AccountProvider } from "@/components/AccountProvider";
import { ConnectLens } from "@/components/ConnectLens";
import { Args, StoryFn } from "@storybook/react";

export const ConnectDecorator =
    (Story: StoryFn, args: Args) => (
        <AccountProvider>
            <div>
                <Account />
                {args.publicationId && <a target="_blank" href={"https://testnet.lenster.xyz/posts/" + args.publicationId}>Lens Url</a>}


                <ConnectLens />
                <div style={{ minHeight: '200px' }}>
                    <Story />
                </div>
            </div>
        </AccountProvider >
    )