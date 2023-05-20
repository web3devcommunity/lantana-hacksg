import { invokeAiEsgRecommendations } from '@/libs/retool-api';
import { Box } from '@mui/material';
import { useEffect, useState } from 'react';
import React from 'react';
import Alert from '@mui/material/Alert';
import CheckIcon from '@mui/icons-material/Check';

// TOOD props data
export const ReportRecommendations = ({
  causeData,
}: {
  causeData: Record<string, any>;
}) => {
  const [aiRecommendations, setAiRecommendations] = useState({
    gri: '',
    sasb: '',
  });

  useEffect(() => {
    invokeAiEsgRecommendations().then(async (res) => {
      const results = await res.json();
      setAiRecommendations(results.recommendations);
    });
  }, []);

  // Not asking openAI to return HTML directly as its css is hard to customize, also not a good secure practice

  return (
    <div>
      <Alert icon={<CheckIcon fontSize="inherit" />} severity="success">AI Recommendations by ESG standards. Base on OpenAI GPT 4.0</Alert>


      <Box>
        <h1>GRI standard</h1>
        {aiRecommendations.gri || 'Loading...'}
      </Box>
      <Box>
        <h1>SASB standard</h1>
        {aiRecommendations.sasb || 'Loading...'}
      </Box>
    </div>
  );
};
