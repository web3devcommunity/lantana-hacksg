import { invokeAiEsgRecommendations } from '@/libs/retool-api';
import { Box } from '@mui/material';
import { useEffect, useState } from 'react';
import React from 'react';
import Alert from '@mui/material/Alert';
import CircularProgress from '@mui/material/CircularProgress';
import CheckIcon from '@mui/icons-material/Check';

// TOOD props data

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
      <Alert icon={<CheckIcon fontSize="inherit" />} severity="success">
        AI Recommendations for CSR Reporting. Base on OpenAI GPT 4.0
      </Alert>
      <Box>
        <h1>CSR</h1>
        {aiRecommendations.csr || (
          <Box>
            <CircularProgress />
            {' Loading'}
          </Box>
        )}
      </Box>

      <Alert icon={<CheckIcon fontSize="inherit" />} severity="success">
        AI Recommendations by ESG standards. Base on OpenAI GPT 4.0
      </Alert>

      <Box>
        <h1>GRI standard</h1>
        {aiRecommendations.gri || (
          <Box>
            <CircularProgress />
            {' Loading'}
          </Box>
        )}
      </Box>
      <Box>
        <h1>SASB standard</h1>
        {aiRecommendations.sasb || (
          <Box>
            <CircularProgress />
            {' Loading'}
          </Box>
        )}
      </Box>
    </div>
  );
};
