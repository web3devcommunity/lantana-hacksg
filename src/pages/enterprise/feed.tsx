import SocialLayout from '@/components/SocialLayout';
import Image from 'next/image';
import { Feed, FeedItems } from '../../components/Feed';
import { Box, Container, Grid, Typography } from '@mui/material';
import { APP_VERSION_TAG } from '@/env';
import { createFilters } from '@/libs/lens/create-filters';
import { PublicationId, PublicationSortCriteria, usePublication } from '@lens-protocol/react-web';
import { Event } from '@/domain/event';
import EnterpriseLayout from '@/components/EnterpriseLayout';
import Dashboard from '@/components/dashboard';



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
        publicationId: '0x82ce-0x03' as PublicationId,
    });

    const { data: publication2 } = usePublication({
        publicationId: '0x826e-0x17' as PublicationId,
    });

    return (
        <EnterpriseLayout>
            <Container>
                {/* <Box mb={4}>
                    <Typography variant="h2">{company.name}</Typography>
                </Box> */}
                <Typography variant="h4">Donating Causes</Typography>
                <Typography variant="h5" color="text.secondary">
                    Singapore
                </Typography>


                <br />
                <Box mb={4}>
                    {
                        publication1 && publication2 ? (<FeedItems publications={[publication1, publication2]}
                            linkFactory={(event: Event) => '/enterprise/cause/' + event.causeKey} />
                        ) : <Box sx={{ m: 2, minHeight: '300px' }}>Loading...</Box>
                    }
                </Box>


                {
                    /* 
                    
                    <Typography variant="h2">Recommended Causes to Donate</Typography>
                    
                    <Feed metadataFilter={appFilter} sortCriteria={PublicationSortCriteria.Latest} /> */
                }

            </Container>
        </EnterpriseLayout>
    );
}
