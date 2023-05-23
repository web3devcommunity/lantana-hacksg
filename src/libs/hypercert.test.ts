import { jest, describe, expect, it, beforeAll } from '@jest/globals';
import { mapCauseAsHyperCertMetadata, mintHyperCert } from './hypercert';
import { ethers } from 'ethers';
import { TEST_CAUSES } from '@/domain/cause.fixture';
import { withInternetUrl } from './storage/file';
import datauri from 'datauri';
import path from 'path';

jest.setTimeout(60 * 1000);
describe('hypercert', () => {
  const apiToken = process.env.ALCHEMY_API_TOKEN_GOERLI!;

  const chainId = 5;
  const provider = new ethers.providers.AlchemyProvider(chainId, apiToken);

  const privateKey = process.env.TEST_ORGANIZER_PRIVATE_KEY!;

  const signer = new ethers.Wallet(privateKey, provider);

  it.skip('#mintHyperCert from cause', async () => {
    const cause = TEST_CAUSES?.[0];

    // override as ipfs not working
    // cause.imageUrl = await withInternetUrl(cause.imageUrl);

    // const src = path.resolve(__dirname, '../../public' + cause.imageUrl);
    // const image = await datauri(src);

    cause.imageUrl =
      'https://github-production-user-asset-6210df.s3.amazonaws.com/1883877/239870898-8e9a42e0-eb7a-45b3-ab8f-342981681006.png';
    const { data: metadata } = mapCauseAsHyperCertMetadata(cause);

    if (!metadata) throw new Error('metadata is undefined');
    console.log('metadata', metadata);
    const res = await mintHyperCert({
      chainId,
      signer,
      metadata,
    });

    console.log('https://goerli.etherscan.io/tx/' + res.results.hash);
    expect(res.claimData.name).toEqual(cause.title);
    expect(typeof res.results.hash).toEqual('string');
  });

  it('#withInternetUrl will not wrap directory', async () => {
    const url = await withInternetUrl('/clean1.jpg');
    expect(url.match(/clean1/)).toEqual(null);
  });
});
