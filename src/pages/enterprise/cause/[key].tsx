import * as _ from 'lodash';
import React, { useEffect, useState } from 'react';
import Alert from '@mui/material/Alert';
import CheckIcon from '@mui/icons-material/Check';
import { useRouter } from "next/router";
import { AiRecommendations, ReportRecommendations } from '@/components/ReportRecommendations';
import EnterpriseLayout from '../../../components/EnterpriseLayout';
import { Box, Container, Grid, Tabs, Typography } from '@mui/material';
import { formatEntityTag, mapPublicationAsCause } from "@/domain/cause";
import { createFilters } from "@/libs/lens/create-filters";
import { Entity } from "@/domain/entity";
import { APP_VERSION_TAG } from "@/env";
import { PublicationId, useExplorePublications, usePublicationRevenue, useWhoCollectedPublication } from "@lens-protocol/react-web";
import Image from 'next/image';
import CustomTabs from '@/components/CustomTabs';
import { aggregateCauseData } from '@/domain/data';
import { invokeAiEsgRecommendations } from '@/libs/retool-api';
import styled from 'styled-components';
import { getHypercertsUrl } from '@/libs/lens/utils';
import { NFTCard, NFTList } from '@/components/NFTCard';



export const EnterpriseTagCSRRecommendationTab = ({ aiRecommendations }: { aiRecommendations: AiRecommendations }) => {

    return (
        <div><ReportRecommendations aiRecommendations={aiRecommendations} /></div>
    )
}

const StyledRawData = styled.div`
    background-color: lightgray;
    min-height: 20rem;
`

export const EnterpriseOpenDataTab = ({ causeData }: any) => {

    return (
        <Box>
            <Alert icon={<CheckIcon fontSize="inherit" />} severity="success">
                Open Social Graph Data on Polygon Network via Lens protocol
            </Alert>

            <Box sx={{ m: 2 }} >
                <StyledRawData><code>{JSON.stringify(causeData, null, 4)}</code></StyledRawData>
            </Box>
        </Box >
    )
}

export const EnterpriseStatsTabs = ({ publicationId }: { publicationId: PublicationId }) => {
    const { data: whoCollected, loading: whoCollectedLoading } = useWhoCollectedPublication({
        limit: 10,
        publicationId
    });

    const hypercertsContractAddress = '0x822f17a9a5eecfd66dbaff7946a8071c265d1d07';
    const hypercertsTokenId = '131008711264561308433399223861230761410560';

    // TODO
    const collectionContractAddress = '0xfe324CD94d32258ad9dBFF2C47beaf6E0E82b02C'

    const { data: revenue } = usePublicationRevenue({
        publicationId
    });

    return (
        <Grid container direction="column" spacing={4}>
            <Grid item xs={12} >
                <Typography variant="h6">Collected NFTs</Typography>
                <Box style={{ maxWidth: '800px' }}>
                    <NFTList

                        contractAddress={collectionContractAddress}
                        network={"mumbai"}
                    />
                </Box>

            </Grid>
            {/* 
            <Grid item xs={12}>
                <Typography variant="h6">Stats</Typography>
                {JSON.stringify(whoCollected)}

                {JSON.stringify(revenue)}
            </Grid> */}
            <Grid item xs={4}>
                <Typography variant="h6">HyperCert</Typography>
                <NFTCard
                    contractAddress={hypercertsContractAddress}
                    tokenId={hypercertsTokenId}
                    tokenType={"ERC1155"}
                    network={"optimism"}
                />
                <a href={getHypercertsUrl({ contractAddress: hypercertsContractAddress, tokenId: hypercertsTokenId })}
                    target="_blank">View Hyper Cert </a>

            </Grid>
        </Grid >


    )

}

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


    const [aiRecommendations, setAiRecommendations] = useState({
        gri: '',
        sasb: '',
        csr: ''
    });

    const cause = mapPublicationAsCause(post || {});

    const causeData = aggregateCauseData(post || {});

    const publicationId = post?.id!;
    // ensure not lazy load for perf
    useEffect(() => {
        if (!post) {
            return;
        }
        invokeAiEsgRecommendations(causeData).then(async (res) => {
            const results = await res.json();
            setAiRecommendations(results.recommendations);
        }).catch((err) => {
            console.log('Error loadding recommendations', err)
        });
    }, [publicationId]);



    // alternative approaches

    return (
        <EnterpriseLayout>

            <Container>
                <Typography variant="h5" color="text.secondary">Supporting Cause</Typography>
                <Typography variant="h4">{cause.title}</Typography>

                <Grid container alignItems="flex-start" spacing={2}>
                    <Grid item xs={12}>
                        <Alert icon={<CheckIcon fontSize="inherit" />} severity="success">You are able to access on-chain open data for the cause</Alert>
                    </Grid>

                    <Grid item xs={6}>
                        {
                            cause.imageUrl && <Image src={cause.imageUrl} width={600} height={400} alt="Lantana" />
                        }
                    </Grid>
                </Grid>

                <div>
                    <Box sx={{ marginTop: 3 }}>
                        <Typography variant="h5">Open Data and Recommendations</Typography>
                    </Box>
                    <CustomTabs tabs={
                        [
                            {
                                tabLabel: 'On-Chain NFTs',
                                tabChildren: (
                                    publicationId && <EnterpriseStatsTabs publicationId={publicationId as PublicationId} />

                                )
                            },
                            {
                                tabLabel: 'Open Data',
                                tabChildren: (
                                    <EnterpriseOpenDataTab causeData={causeData} />
                                )
                            },
                            {
                                tabLabel: 'Recommendations',
                                tabChildren: (
                                    <EnterpriseTagCSRRecommendationTab aiRecommendations={aiRecommendations} />
                                )
                            }
                        ]
                    }></CustomTabs>
                </div>


            </Container>
        </EnterpriseLayout>
    );
}