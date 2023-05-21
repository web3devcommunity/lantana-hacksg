import * as _ from 'lodash';
import React, { useEffect, useState } from 'react';
import Alert from '@mui/material/Alert';
import CheckIcon from '@mui/icons-material/Check';
import { useRouter } from 'next/router';
import {
  AiRecommendations,
  ReportRecommendations,
} from '@/components/ReportRecommendations';
import EnterpriseLayout from '../../../components/EnterpriseLayout';
import { Box, Container, Tabs, Typography } from '@mui/material';
import { formatEntityTag, mapPublicationAsCause } from '@/domain/cause';
import { createFilters } from '@/libs/lens/create-filters';
import { Entity } from '@/domain/entity';
import { APP_VERSION_TAG } from '@/env';
import { useExplorePublications } from '@lens-protocol/react-web';
import Image from 'next/image';
import CustomTabs from '@/components/CustomTabs';
import { aggregateCauseData } from '@/domain/data';
import { invokeAiEsgRecommendations } from '@/libs/retool-api';
import styled from 'styled-components';

export const EnterpriseTagCSRRecommendationTab = ({
  aiRecommendations,
}: {
  aiRecommendations: AiRecommendations;
}) => {
  return (
    <div>
      <ReportRecommendations aiRecommendations={aiRecommendations} />
    </div>
  );
};

const StyledRawData = styled.div`
  background-color: lightgray;
  min-height: 20rem;
`;

export const EnterpriseOpenDataTab = ({ causeData }: any) => {
  return (
    <Box>
      <Alert icon={<CheckIcon fontSize="inherit" />} severity="success">
        Open Social Graph Data on Polygon Network via Lens protocol
      </Alert>

      <Box sx={{ m: 2 }}>
        <StyledRawData>
          <code>{JSON.stringify(causeData, null, 4)}</code>
        </StyledRawData>
      </Box>
    </Box>
  );
};

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
    csr: '',
  });

  const cause = mapPublicationAsCause(post || {});

  const causeData = aggregateCauseData(post || {});

  // ensure not lazy load for perf
  useEffect(() => {
    invokeAiEsgRecommendations(causeData)
      .then(async (res) => {
        const results = await res.json();
        setAiRecommendations(results.recommendations);
      })
      .catch((err) => {
        console.log('Error loadding recommendations', err);
      });
  }, [causeData]);

  if (!post) {
    return <div>Loading...</div>;
  }

  // alternative approaches
  return (
    <EnterpriseLayout>
      <Container>
        <h1>Enterprise Page</h1>
        <Alert icon={<CheckIcon fontSize="inherit" />} severity="success">
          You are able to access on-chain open data for the cause
        </Alert>

        <Typography>Supporting Cause</Typography>
        <Typography variant="h4">{cause.title}</Typography>
        {cause.imageUrl && (
          <Image src={cause.imageUrl} width={600} height={400} alt="Lantana" />
        )}
        <div>
          <Box sx={{ marginTop: 3 }}>
            <Typography variant="h3">Cause Data and Recommendations</Typography>
          </Box>
          <CustomTabs
            tabs={[
              {
                tabLabel: 'On-Chain NFTs',
                tabChildren: <div>Link to related NFTs</div>,
              },
              {
                tabLabel: 'Open Data',
                tabChildren: <EnterpriseOpenDataTab causeData={causeData} />,
              },
              {
                tabLabel: 'Recommendations',
                tabChildren: (
                  <EnterpriseTagCSRRecommendationTab
                    aiRecommendations={aiRecommendations}
                  />
                ),
              },
            ]}
          ></CustomTabs>
        </div>
      </Container>
    </EnterpriseLayout>
  );
}
