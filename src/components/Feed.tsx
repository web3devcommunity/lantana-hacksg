import IconButton, { IconButtonProps } from '@mui/material/IconButton';
import { useRouter } from 'next/router'

import { Inter } from 'next/font/google'
import Grid from '@mui/material/Grid'
import { Avatar, Button, Link } from '@mui/material'
import Typography from '@mui/material/Typography';

import { usePublications, useFeed, useExplorePublications, useSearchPublications, useComments, PublicationTypes } from '@lens-protocol/react-web';
import { createFilters } from '@/libs/lens/create-filters';
import { useActiveProfile, useActiveWallet, useWalletLogout } from '@lens-protocol/react-web';
import { CauseCard } from './CauseCard';
import { mapPublicationAsEvent } from '@/domain/event';
import { EventCard } from './EventCard';

// we want to use feed of lens directly
// will need to group by cause

// for now simplify with event card

const FeedItems = ({ publications }: { publications: any[] }) => {

    return (
        <div>
            <Grid container spacing={6}>
                {
                    publications.map((publication, i) => {
                        const event = mapPublicationAsEvent(publication);
                        return (
                            <Grid item key={i} className="item">
                                <Link href={`/cause/${event.causeKey}`}>
                                    <EventCard event={event} />
                                </Link>
                            </Grid>
                        )
                    })
                }
            </Grid>
        </div >
    )
}


export const Feed = ({ metadataFilter, sortCriteria }: { metadataFilter: any, sortCriteria: any }) => {
    const {
        data: publications,
        loading,
        hasMore,
        next,
    } = useExplorePublications({
        limit: 10,
        sortCriteria,
        metadataFilter,
        publicationTypes: [PublicationTypes.Post],
    });

    if (!publications) {
        return <div />
    }

    return <FeedItems publications={publications} />



};
