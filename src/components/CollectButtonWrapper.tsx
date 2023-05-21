import {
    Amount, TokenAllowanceLimit, AnyPublication, Post,
    UsePublicationArgs, useActiveProfile, useActiveWallet, useApproveModule,
    useCollect, useEnabledModules, usePublication, useWalletLogin, useCurrencies, useWhoCollectedPublication,
    PublicationId,
    FeeCollectPolicy
} from "@lens-protocol/react-web";

// https://github.com/lens-protocol/lens-sdk/blob/main/examples/web-wagmi/src/publications/UseCollect.tsx
import { useState } from "react";
import { Alert, Chip } from "@mui/material";

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
    const { execute: collect, error: collectEror, isPending } = useCollect({ collector, publication: publication as AnyPublication });
    // TODO fix action


    const collectPolicy = publication?.collectPolicy as FeeCollectPolicy;

    return (
        !publication || !wallet?.address ? (
            <div> Loading...</div >
        )
            : (
                <>
                    {collectEror && !isPending &&
                        <Alert severity="error">{collectEror?.message}</Alert>
                    }
                    <div>Collect Price ${collectPolicy?.amount.toNumber()} </div>
                    {
                        isCollected ? <Chip label="Thank you for donating" variant="outlined" /> : (
                            <div onClick={async () => {
                                let results = await collect();
                                // could approve from the amount of policy while easier to approve in bulk at once
                                // @ts-ignore
                                if (collectEror?.name === 'InsufficientAllowanceError') {
                                    const approvalResults = await approve({
                                        spender: enabledModules?.collectModules.find(m => m.moduleName === 'FeeCollectModule')!.contractAddress!,
                                        amount: Amount.erc20(currencies!.find(c => c.address === currencyAddress)!, 0.5),
                                        limit: TokenAllowanceLimit.EXACT,

                                    });
                                    if (approvalResults.isSuccess()) {
                                        results = await collect();
                                        console.log('approvalResults', approvalResults)
                                    } else {
                                        console.log('error in approval', approvalResults)
                                    }

                                }
                                if (results) {
                                    console.log('collect', results)
                                    if (results.isSuccess()) {
                                        setIsCollected(true)
                                    }

                                }

                            }}>{children}</div>
                        )
                    }
                </>
            )
    )
}