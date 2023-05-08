import _ from 'lodash';
import { jest, describe, expect, it, beforeAll } from "@jest/globals";
import { ethers } from "ethers";

import { LensClient, development } from "@lens-protocol/client";
import { follow} from './follow';
import { createClient } from './client'

describe("follow", () => {
  let client: LensClient;
  let wallet: ethers.Wallet;
  let profileId: string;

  beforeAll(async () => {
     wallet = ethers.Wallet.createRandom();
     client = createClient(wallet);
     const handlePrefix = '';
     handle = (handlePrefix || 'w3btest')+ _.random(1, 10000);
    const createdProfile =  await createProfile(lensClient, wallet, handle);
    profileId = createdProfile?.id;
  });

    it( 'should create a profile', async () => {
      const profileIdToFollow = '0x773d'
      const followResults =  await follow(wallet, profileIdToFollow);

      expect(followResults).toEqual(123)
    });
});