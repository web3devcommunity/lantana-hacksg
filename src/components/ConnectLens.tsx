import { Event, mapPublicationAsEvent } from '@/domain/event';
import { Button, Grid } from '@mui/material';
import { EventCard } from './EventCard';
import styled from 'styled-components';
import { useActiveProfile, useCreateProfile, useWalletLogin } from '@lens-protocol/react-web';
import { useAccount, useSigner } from 'wagmi';
import { generateHandle } from '@/libs/lens/utils';
import componentStyleOverrides from '@/themes/compStyleOverride';

// TODO group by upcoming vs past events
export const ConnectLens = () => {
    const { address, isConnected } = useAccount();
    const { execute: create } = useCreateProfile();
    const { data: signer, isError, isLoading } = useSigner();
    const activeProfileResults = useActiveProfile();
    const { execute: login, error, isPending } = useWalletLogin();
    const profile = activeProfileResults?.data!;

    return (
        <div>
            {address && profile?.handle ? <div>
                Lens:  {profile?.handle}
            </div> : (
                <Button
                    onClick={() => {
                        // after login, use sdk to load client will not be able the track the authenticated lens client
                        if (address) {
                            login(signer!).then(async () => {
                                // check if exists
                                if (profile?.handle) {
                                    return;
                                }
                                console.log('user profile not found', address, profile);
                                const handle = generateHandle();
                                const createResults = await create({ handle });
                                // createdResults do not return profile id and profile is not refreshed either
                                // should query explicitly
                                // await saveAccount({
                                //     walletAddress: address,
                                //     lensProfileId: profile.id,
                                //     lensHandle: profile.handle
                                // });

                                console.log(
                                    'generated account with handle',
                                    handle,
                                    createResults,
                                );
                            });
                        }
                    }}
                >
                    Connect Lens
                </Button>
            )


            }

        </div>
    );
};
