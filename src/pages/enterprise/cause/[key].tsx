import * as _ from 'lodash';
import React from 'react';
import Alert from '@mui/material/Alert';
import CheckIcon from '@mui/icons-material/Check';
import { useRouter } from "next/router";
import { ReportRecommendations } from '@/components/ReportRecommendations';
import EnterpriseLayout from '../../../components/EnterpriseLayout';
import { Container, Tabs, Typography } from '@mui/material';
import { formatEntityTag, mapPublicationAsCause } from "@/domain/cause";
import { createFilters } from "@/libs/lens/create-filters";
import { Entity } from "@/domain/entity";
import { APP_VERSION_TAG } from "@/env";
import { useExplorePublications } from "@lens-protocol/react-web";
import Image from 'next/image';
import CustomTabs from '@/components/CustomTabs';
import { aggregateCauseData } from '@/domain/data';

export default function EnterpriseCausePage() {
    const router = useRouter();

    const causeKey = router.query.key;

    const appFilter = createFilters({
        restrictPublicationTagsTo: {
            all: [
                APP_VERSION_TAG,
                formatEntityTag(Entity.Cause, Entity.Lantana),
                formatEntityTag(causeKey as string, Entity.Cause),
            ],
        },
    })?.metadataFilter;

    const { data } = useExplorePublications({
        metadataFilter: appFilter,
    });

    const post = _.first(data);

    if (!post) {
        return <div>Loading...</div>
    }

    const cause = mapPublicationAsCause(post);

    const causeData = aggregateCauseData(post);

    // alternative approaches

    return (
        <EnterpriseLayout>

            <Container>
                <h1>Enterprise Page</h1>
                <Alert icon={<CheckIcon fontSize="inherit" />} severity="success">You are able to access on-chain open data for the cause</Alert>

                <Typography >Supporting Cause</Typography>
                <Typography variant="h4">{cause.title}</Typography>
                {
                    cause.imageUrl && <Image src={cause.imageUrl} width={600} height={400} alt="Lantana" />
                }
                <div>
                    <Typography variant="h3">on chain data</Typography>
                    <CustomTabs tabs={
                        [
                            {
                                tabLabel: 'On-Chain NFTs',
                                tabChildren: (
                                    <div>

                                        Link to related NFTs

                                    </div>
                                )
                            },
                            {
                                tabLabel: 'Open Data',
                                tabChildren: (
                                    <div>{JSON.stringify(causeData, null, 4)}</div>
                                )
                            }
                        ]
                    }></CustomTabs>
                </div>


                <Typography variant="h4">Recommendations</Typography>
                <Typography variant="h6">CSR</Typography>
                <Typography variant="h6">ESG</Typography>
                <ReportRecommendations causeData={{}} />

                <Typography>Tree Planning</Typography>
                {/* <ReportRecommendations causeData={{}} /> */}
            </Container>
        </EnterpriseLayout>
    );
}