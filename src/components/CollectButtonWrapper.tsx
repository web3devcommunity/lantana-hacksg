import {
    Amount, TokenAllowanceLimit, AnyPublication, Post,
    UsePublicationArgs, useActiveProfile, useActiveWallet, useApproveModule,
    useCollect, useEnabledModules, usePublication, useWalletLogin, useCurrencies, useWhoCollectedPublication,
    PublicationId
} from "@lens-protocol/react-web";

// https://github.com/lens-protocol/lens-sdk/blob/main/examples/web-wagmi/src/publications/UseCollect.tsx
import { useState } from "react";
import { Chip } from "@mui/material";

export const CollectButtonWrapper = ({ publicationId, currencyAddress, children }: { publicationId: string, currencyAddress: string, children: React.ReactNode }) => {
    const { data, loading } = useActiveProfile();
    const { data: wallet } = useActiveWallet();
    const { data: enabledModules } = useEnabledModules();
    const { execute: approve } = useApproveModule();
    const collector = data!;
    const { data: currencies = [], error: currenciesError, loading: currenciesLoading } = useCurrencies();
    const { data: publicationResult } = usePublication({ publicationId } as UsePublicationArgs);
    const publication = publicationResult as Post;

    // publication will not refresh on collect, handle that manually
    const [isCollected, setIsCollected] = useState(publication?.hasCollectedByMe);
    // TODO query if alraeady approved

    // approve first (not necessary for sandbox env)
    const { execute: login, error, isPending } = useWalletLogin();
    const { execute: collect, error: collectEror } = useCollect({ collector, publication: publication as AnyPublication });
    const { data: activeWallet } = useActiveWallet();
    // TODO fix action


    return (
        !publication || !wallet?.address ? (
            <div> Loading...</div >
        )
            : (
                <>
                    {collectEror && <div>{collectEror?.message}</div>}
                    {
                        isCollected ? <Chip label="Thank you for donating" variant="outlined" /> : (
                            <div onClick={async () => {
                                let results = await collect();
                                // could approve from the amount of policy while easier to approve in bulk at once
                                // @ts-ignore
                                if (collectEror?.name === 'InsufficientFundsError') {
                                    await approve({
                                        spender: enabledModules?.collectModules.find(m => m.moduleName === 'FeeCollectModule')!.contractAddress!,
                                        amount: Amount.erc20(currencies!.find(c => c.address === currencyAddress)!, 0.5),
                                        limit: TokenAllowanceLimit.EXACT,

                                    });
                                    results = await collect();

                                }
                                if (results) {
                                    console.log('collect', results)
                                    setIsCollected(true)
                                }

                            }}>{children}</div>
                        )
                    }
                </>
            )
    )
}