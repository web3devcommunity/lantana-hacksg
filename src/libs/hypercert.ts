import { jest } from '@jest/globals';
import {
  HypercertMinting,
  HypercertMetadata,
  formatHypercertData,
} from '@hypercerts-org/hypercerts-sdk/dist/index';

import { ethers } from 'ethers';
import { TEST_ORGANIZER_ACCOUNT_ADDRESS } from '@/env';
import { Cause } from '@/domain/cause';
import _ from 'lodash';

export const mapCauseAsHyperCertMetadata = (cause: Cause) => {
  const rawData = {
    name: cause.title,
    description: cause.descriptionShort,
    // seems ipfs not being picked up
    // Consider making any images at a width between 320 and 1080 pixels and aspect ratio between 1.91:1 and 4:5 inclusive.
    image: cause.imageUrl,
    version: '0.0.1',
    external_url: 'https://lantana.social',
    workScope: [cause.title],
    excludedWorkScope: [],
    impactScope: [cause.title],
    excludedImpactScope: [],
    properties: [
      // TODO attributes
      // {
      // impact_location: {
      //   name: 'Singapore',
      // },
      // work_location: {
      //   name: 'Singapore',
      // },
      // },
    ],
    workTimeframeStart: new Date().getTime() / 1000,
    workTimeframeEnd: new Date().getTime() / 1000,
    impactTimeframeStart: new Date().getTime() / 1000,
    impactTimeframeEnd: new Date().getTime() / 1000,
    contributors: [cause?.organizer?.title],
    rights: [],
    excludedRights: [],
  };

  // seems goerli contract outdated
  // return formatHypercertData(rawData);

  return {
    data: _.pick(rawData, [
      'name',
      'description',
      'external_url',
      'image',
      'version',
      'properties',
    ]),
  };
};

export const mintHyperCert = async ({
  chainId,
  signer,
  metadata,
}: {
  chainId: 5 | 10;
  signer: ethers.Signer;
  metadata: HypercertMetadata;
}) => {
  // TODO update sdk to v1.0
  const { mintHypercert } = HypercertMinting({
    provider: signer as unknown as ethers.providers.BaseProvider,
    chainConfig: {
      chainId,
      graphName: 'hypercerts-testnet',
      contractAddress: '0x822F17A9A5EeCFd66dBAFf7946a8071C265D1d07',
    },
  });
  const properties: HypercertMetadata['properties'] = [
    // {
    //   ...metadata?.properties,
    // },
  ];

  const claimData = {
    ...metadata,
    properties,
  };

  console.log('claimData', claimData);
  const results = await mintHypercert(
    TEST_ORGANIZER_ACCOUNT_ADDRESS!,
    claimData,
    10,
    2,
  );
  console.log('results', results);

  return {
    claimData,
    results,
  };
};
