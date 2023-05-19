import SocialLayout from '@/components/SocialLayout';
import Image from 'next/image';
import { Feed, FeedItems } from '../components/Feed';
import { Typography } from '@mui/material';
import { APP_VERSION_TAG } from '@/env';
import { createFilters } from '@/libs/lens/create-filters';
import { PublicationId, PublicationSortCriteria, usePublication } from '@lens-protocol/react-web';



export default function EnterpriseFeed() {

    // TODO fix to show only those I supported
    // just show 1. all causes & those selected

    // eventually corp will use treasury wallet to establish on-chain relationship
    const appFilter = createFilters({
        restrictPublicationTagsTo: {
            all: [APP_VERSION_TAG],
        },
    })?.metadataFilter;


    const { data: publication1 } = usePublication({
        publicationId: '0x77-0x0149' as PublicationId,
    });

    const { data: publication2 } = usePublication({
        publicationId: '0x77-0x0149' as PublicationId,
    });

    return (
        <SocialLayout>
            <main>
                <Typography variant="h2">Recommended Causes</Typography>
                <Typography variant="h4" color="text.secondary">
                    Singapore
                </Typography>
                <br />
                <Feed metadataFilter={appFilter} sortCriteria={PublicationSortCriteria.Latest} />

                <FeedItems publications={[publication1, publication2]} />;
            </main>
        </SocialLayout>
    );
}
