// isomorphic
import { identity } from 'lodash';
import fetch from 'cross-fetch';

export enum ApiEndpoint {
  AiEsgRecommendations = '90c888c8-3698-445a-89fc-92d08881fa80/startTrigger?workflowApiKey=retool_wk_f1522e8edada4db48a1bfab82cae1687',
  CreateUser = 'dfa64b6f-e688-4312-932e-814e952a3175/startTrigger?workflowApiKey=retool_wk_8adb495e01a5454fb356f9dd9c008e19',
  GetUserByWalletAddress = '6e8d93b1-6ce2-4ef4-be67-e89708f3b73c/startTrigger?workflowApiKey=retool_wk_8788bc4ceec641bb89e425cb14ad75cc',
}
const withProxy = (url: string) => {
  return 'https://corsproxy.io/?' + encodeURIComponent(url);
};

interface invokeOptions {
  method: string;
  body?: any;
  isUseCors?: boolean;
}

export const invoke = (
  endpoint: string,
  options: invokeOptions = {
    method: 'GET',
  },
  body?: any,
) => {
  const url = `https://api.retool.com/v1/workflows/${endpoint}`;

  const wrapUrl = options?.isUseCors ? withProxy : identity<string>;

  console.log('request', url, options, body);
  return fetch(wrapUrl(url), {
    method: options.method,
    body: JSON.stringify(body),
    headers: {
      'Content-Type': 'application/json',
    },
  });
};

export const invokeAiEsgRecommendations = async () => {
  const results = await invoke(ApiEndpoint.AiEsgRecommendations, {
    method: 'GET',
    isUseCors: true,
  });

  return results;
};

export const invokeCreateUser = async (
  walletAddress: string,
  lensProfileId: string,
  lensHandle: string,
) => {
  const results = await invoke(
    ApiEndpoint.CreateUser,
    { method: 'POST' },
    {
      lens_profile_id: lensProfileId,
      lens_handle: lensHandle,
      wallet_address: walletAddress,
    },
  );

  return results;
};
