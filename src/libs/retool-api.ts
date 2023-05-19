// isomorphic
import { identity } from 'lodash';
import fetch from 'cross-fetch';

export enum ApiEndpoint {
  AiEsgRecommendations = '90c888c8-3698-445a-89fc-92d08881fa80/startTrigger?workflowApiKey=retool_wk_f1522e8edada4db48a1bfab82cae1687',
  CreateUser = 'dfa64b6f-e688-4312-932e-814e952a3175/startTrigger?workflowApiKey=retool_wk_8adb495e01a5454fb356f9dd9c008e19',
  GetUserByWalletAddress = '6e8d93b1-6ce2-4ef4-be67-e89708f3b73c/startTrigger?workflowApiKey=retool_wk_8788bc4ceec641bb89e425cb14ad75cc',
  GetCompaniesInfo = '8bc2fcc8-b89e-4d93-ae06-0b0c45603bc0/startTrigger?workflowApiKey=retool_wk_30511be917b7453fb67e4620da965460',
}

https: const withProxy = (url: string) => {
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
  bodyOrParams?: any,
) => {
  const url = `https://api.retool.com/v1/workflows/${endpoint}`;

  const wrapUrl = options?.isUseCors ? withProxy : identity<string>;

  const search =
    options?.method === 'GET'
      ? '&' + new URLSearchParams(bodyOrParams).toString()
      : '';

  console.log('request', url, options, search, bodyOrParams);
  return fetch(wrapUrl(url + search), {
    method: options.method,
    body: options?.method === 'GET' ? undefined : JSON.stringify(bodyOrParams),
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

export const invokeGetCompaniesInfo = async (companyIds: string[]) => {
  const results = await invoke(
    ApiEndpoint.GetCompaniesInfo,
    { method: 'GET' },
    {
      companyIds,
    },
  );

  return results;
};
