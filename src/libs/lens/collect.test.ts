import _ from 'lodash';
import { loadClientAuthenticated } from './client';
import { jest, describe, test, expect, it, beforeAll } from '@jest/globals';

jest.setTimeout(5 * 60 * 1000);

import { ethers } from 'ethers';
import { collect } from './collect';

describe.skip('#collect', () => {
  test('collect with publicationId', async () => {
    const publicationId = '0x7fb1-0x01';
    const wallet = ethers.Wallet.createRandom();

    await collect(wallet, publicationId);
  });
});
