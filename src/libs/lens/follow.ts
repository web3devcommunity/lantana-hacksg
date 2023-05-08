import { describe, it } from "node:test";
import { ethers } from "ethers";

let profileId: string;
const wallet = ethers.Wallet.createRandom();

const address = wallet.address


export const follow = async (wallet: ethers.Wallet, profileIdToFollow: string = '0x11') => {

  const lensClient = await createLensClient(wallet);

  const followTypedDataResult = await lensClient.profile.createFollowTypedData({
    follow: [
      {
        profile: profileIdToFollow
      },
    ]
  });


  const address = await wallet.getAddress();

  console.log('follow: result', result);

  const typedData = result.typedData;
  console.log('follow: typedData', typedData);

  
    // sign and broadcast the typed data
    const data = followTypedDataResult.unwrap();

    // sign with the wallet
    const signedTypedData = await wallet._signTypedData(
      data.typedData.domain,
      data.typedData.types,
      data.typedData.value
    );

    const broadcastResult = await lensClient.transaction.broadcast({
      id: data.id,
      signature: signedTypedData,
    });

  // const viaDispatcherResult = await lensClient.profile.followViaDispatcher({
  //   profileId,
  //   publicationId,
  //   contentURI,
  //   collectModule: {
  //     revertCollectModule: true, // collect disabled
  //   },
  //   referenceModule: {
  //     followerOnlyReferenceModule: false, // anybody can comment or mirror
  //   },
  // });
  


}
