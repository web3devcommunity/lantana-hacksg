import { splitSignature } from 'ethers/lib/utils.js';
import { loadClientAuthenticated } from './client';
import { ethers } from 'ethers';

export const collect = async (wallet: ethers.Wallet, publicationId: string) => {
  const lensClient = await loadClientAuthenticated({ wallet });

  const typedDataResult = await lensClient.publication.createCollectTypedData({
    publicationId,
  });

  console.log('publicationId', publicationId);

  const data = typedDataResult.unwrap();

  // sign with the wallet
  const signedTypedData = await wallet._signTypedData(
    data.typedData.domain,
    data.typedData.types,
    data.typedData.value,
  );

  const broadcastResult = await lensClient.transaction.broadcast({
    id: data.id,
    signature: signedTypedData,
  });

  console.log('broadcastResult', broadcastResult.unwrap());
};
