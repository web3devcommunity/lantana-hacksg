import {
  invokeAiEsgRecommendations,
  invokeCreateUser,
  invokeGetCompaniesInfo,
} from './retool-api';
import { Experimental_CssVarsProvider } from '@mui/material';
import { jest, describe, expect, it, beforeAll } from '@jest/globals';
import { ethers } from 'ethers';
import { generateHandle } from './lens/utils';

jest.setTimeout(60 * 1000);
describe('retool-api', () => {
  it('#invokeAiEsgRecommendations', async () => {
    const causeDataFixture = {
      volunteers_count: 120,
      title: 'beach clean up in Singapore',
      total_donations_received_in_sgd: 4000,
      cause_category: 'Beach Clean up',
      waste_collected_in_kg: '5',
    };
    const res = await invokeAiEsgRecommendations(causeDataFixture);
    const results = await res.json();
    console.log('results', results);
  });

  it('#invokeCreateUser', async () => {
    const wallet = ethers.Wallet.createRandom();
    const handle = generateHandle();
    const profileId = '0xp1234';
    const res = await invokeCreateUser(wallet.address, profileId, handle);

    const results = await res.json();
    console.log('results', results);
    //duplicated
    const res2 = await invokeCreateUser(wallet.address, profileId, handle);
    const results2 = await res2.json();
    expect(res2.status).toEqual(500);
  });

  it('#invokeGetCompaniesInfo', async () => {
    const res = await invokeGetCompaniesInfo(['1']);

    const results = await res.json();
    console.log('results causes', results.companies[0].metadata.causes);
    expect(typeof results.companies[0].metadata.causes[0]).toEqual('string');
  });
});
