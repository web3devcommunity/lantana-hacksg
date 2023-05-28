import { Box, Divider, Grid } from '@mui/material';
import React from 'react';
import Alert from '@mui/material/Alert';
import CheckIcon from '@mui/icons-material/Check';

// TOOD props data

export const displayGri = (gri: string) => {

  const griData = JSON.parse(gri || '{}');

  return Object.keys(griData).map(
    (key: string) => {
      return (
        <>
          <Grid item xs={4} key={key}>
            {key}
          </Grid>
          <Grid item xs={8}>
            {griData?.[key]?.description}
          </Grid>
          {/* <Grid item xs={8}>
            {JSON.stringify(griData?.[key].data)}
          </Grid> */}
        </>
      )
    }
  )
}

export interface AiRecommendations {
  gri?: string;
  sasb?: string;
  csr?: string;
}

export const ReportRecommendations = ({
  aiRecommendations,
}: {
  aiRecommendations: AiRecommendations;
}) => {
  // Not asking openAI to return HTML directly as its css is hard to customize, also not a good secure practice

  return (
    <div>

      <Alert icon={<CheckIcon fontSize="inherit" />} severity="success">AI Recommendations for CSR Reporting. Base on OpenAI GPT 4.0</Alert>
      <Box>
        <h1>CSR</h1>
        {aiRecommendations?.csr || 'Loading...'}
      </Box>
      <Divider />
      <Alert icon={<CheckIcon fontSize="inherit" />} severity="success">AI Recommendations by ESG standards. Base on OpenAI GPT 4.0</Alert>

      <Box>
        <h1>GRI standard</h1>

        <Grid container>
          {
            aiRecommendations?.gri ? displayGri(aiRecommendations.gri) : 'Loading...'
          }
        </Grid>
      </Box>
      <Box>
        <h1>SASB standard</h1>
        {aiRecommendations.sasb || 'Loading...'}
      </Box>


    </div>
  );
};
