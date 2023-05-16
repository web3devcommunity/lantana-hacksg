import { invokeAiEsgRecommendations, invokeCreateUser } from './retool-api';
import { Experimental_CssVarsProvider } from '@mui/material';
import { jest, describe, expect, it, beforeAll } from '@jest/globals';
import { ethers } from 'ethers';
import { generateHandle } from './lens/utils';

jest.setTimeout(60 * 1000);
describe.skip('retool-api', () => {
  it('#invokeAiEsgRecommendations', async () => {
    const res = await invokeAiEsgRecommendations();
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
});
