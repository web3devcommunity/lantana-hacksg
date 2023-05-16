import _ from 'lodash';
import { loadClientAuthenticated } from './client';
import { jest, describe, test, expect, it, beforeAll } from '@jest/globals';

jest.setTimeout(5 * 60 * 1000);

import { ethers } from 'ethers';
import { collect } from './collect';
import { withIpfsGateway } from './utils';

describe('#utils', () => {
  test('#withIpfsGateway', async () => {
    const ipfsUrl =
      'ipfs://bafybeiaqec56wrbnnovq7ndj33iamtmohhhz4he452x6h2s3ibtttquwuu';

    const url = withIpfsGateway(ipfsUrl);

    expect(url).toEqual(
      'https://ipfs.io/ipfs/bafybeiaqec56wrbnnovq7ndj33iamtmohhhz4he452x6h2s3ibtttquwuu',
    );
  });
});
