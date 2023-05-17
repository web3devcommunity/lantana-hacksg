import { AnyPublication, Post, UsePublicationArgs, useActiveProfile, useActiveWallet, useCollect, usePublication, useWalletLogin } from "@lens-protocol/react-web";
import { Button } from "@mui/base"

// https://github.com/lens-protocol/lens-sdk/blob/main/examples/web-wagmi/src/publications/UseCollect.tsx
import { PUBLICATIONS_RAW } from '../libs/lens/publication.fixture';

export const CollectButton = ({ publicationId }: { publicationId: string }) => {
    const { data, loading } = useActiveProfile();
    const collector = data!;




    const { data: publicationResult } = usePublication({ publicationId } as UsePublicationArgs);
    const publication = publicationResult as Post;
    const isCollected = publication?.hasCollectedByMe;
    console.log('isCollected', publication, isCollected, publication?.collectPolicy?.state)
    const { execute: login, error, isPending } = useWalletLogin();
    const { execute: collect } = useCollect({ collector, publication: publication as AnyPublication });
    const { data: activeWallet } = useActiveWallet();



    return (
        !publication ? (
            <div> Loading...</div >
        )
            : (
                <div onClick={() => {
                    collect();
                }}>
                    <Button>Donate</Button>
                </div>
            )
    )
}