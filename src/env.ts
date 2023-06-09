export const LENSTER_APP_ID = 'lantana';
// manaully bump this to only loaded data of this version from lens
export const APP_VERSION_TAG = 'lantanav202305230101';

export const POLYGON_MUMBAI_CHAIN_ID = 80001;

export const APP_DEFAULT_LOGO_URL =
  'https://github.com/lens-protocol/lens-sdk/assets/1883877/1815c300-6833-4d4b-8e25-049f94b783f0';
// particle network proejct

// https://github.com/lens-protocol/token-list/blob/main/testnet-token-list.json
export const CURRENCY_WMATIC_ADDRESS =
  '0x9c3C9283D3e44854697Cd22D3Faa240Cfb032889';
export const CURRENCY_LANTANA_ADDRESS =
  '0x848A86624da050e82dD6cbc38860E9332BBFEE81';

export const CURRENCY_USDC_ADDRESS =
  '0x2058A9D7613eEE744279e3856Ef0eAda5FCbaA7e';

export const TEST_RECIPIENT_ADDRESS =
  process.env.TEST_RECIPIENT_ADDRESS ||
  '0xD6cA1230e3C334daA0BECf91BaaA4E5C2470dFFe';

// For simplicity exposed for frontend
export const ALCHEMY_API_TOKEN_GOERLI =
  process.env.NEXT_PUBLIC_ALCHEMY_API_TOKEN_GOERLI ||
  process.env.ALCHEMY_API_TOKEN_GOERLI;
export const ALCHEMY_API_TOKEN_MUMBAI =
  process.env.NEXT_PUBLIC_ALCHEMY_API_TOKEN_MUMBAI ||
  process.env.ALCHEMY_API_TOKEN_MUMBAI;
export const ALCHEMY_API_TOKEN_OPTIMISM =
  process.env.NEXT_PUBLIC_ALCHEMY_API_TOKEN_OPTIMISM ||
  process.env.ALCHEMY_API_TOKEN_OPTIMISM;

export const TEST_ORGANIZER_ACCOUNT_ADDRESS =
  process.env.TEST_ORGANIZER_ACCOUNT_ADDRESS;

export const PN_PROJECT_ID = process.env.NEXT_PUBLIC_PN_PROJECT_ID;

export const PN_APP_ID = process.env.NEXT_PUBLIC_PN_APP_ID;

export const PN_SERVER_KEY = process.env.PN_SERVER_KEY;

export const PN_CLIENT_KEY = process.env.NEXT_PUBLIC_PN_CLIENT_KEY;

export const TEST_PRIVATE_KEY = process.env.TEST_PRIVATE_KEY;

// created via current test private key

export const TEST_PROFILE_HANDLE = process.env.TEST_PROFILE_HANDLE;
export const TEST_PROFILE_ID = process.env.TEST_PROFILE_ID;
