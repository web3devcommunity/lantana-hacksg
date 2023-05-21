import _ from 'lodash';
import { jest, describe, expect, it, beforeAll } from '@jest/globals';
import { ethers, utils, BigNumber, providers } from 'ethers';
import { CollectModules, LensClient, development } from '@lens-protocol/client';
import { loadClient, loadClientAuthenticated } from './client';
import { generateHandle } from './utils';
import { createProfileWithWallet } from './profile';
import {
  ALCHEMY_API_TOKEN_MUMBAI,
  CURRENCY_WMATIC_ADDRESS,
  POLYGON_MUMBAI_CHAIN_ID,
  TEST_PRIVATE_KEY,
} from '@/env';

jest.setTimeout(60 * 1000);
describe('profile', () => {
  let lensClient: LensClient;
  let wallet: ethers.Wallet;
  let profileId: string;

  beforeAll(async () => {
    // wallet = ethers.Wallet.createRandom();
    wallet = new ethers.Wallet(TEST_PRIVATE_KEY!);

    lensClient = await loadClientAuthenticated({ wallet });
  });

  it('should create a profile', async () => {
    const handle = generateHandle();
    const profile = await createProfileWithWallet(lensClient, wallet, handle);
    const { profileId, lensterUrl, dispatcherResults } = profile!;
    expect(!!lensterUrl.match(handle)).toEqual(true);
    expect(typeof profileId).toEqual('string');
  });

  it('sign approval', async () => {
    const result = await lensClient.modules.generateCurrencyApprovalData({
      currency: CURRENCY_WMATIC_ADDRESS,
      value: '10.0',
      // collectModule: CollectModules.LimitedFeeCollectModule,
      collectModule: CollectModules.FeeCollectModule,
    });

    const data = result.unwrap();
    const signedTransaction = await wallet.signTransaction({
      ...data,
      nonce: 0,
      gasLimit: 50000,
      chainId: POLYGON_MUMBAI_CHAIN_ID,
      gasPrice: BigNumber.from('50000000000'),
    });

    console.log('signedTransaction', signedTransaction);

    const provider = new providers.AlchemyProvider(
      POLYGON_MUMBAI_CHAIN_ID,
      ALCHEMY_API_TOKEN_MUMBAI,
    );

    const sentTxn = await provider.sendTransaction(signedTransaction);
    console.log('sentTxn', sentTxn);
    // not working for now, manual approve via ui
  });
});
