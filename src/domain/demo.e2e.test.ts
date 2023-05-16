import { TEST_CAUSES_RAW } from "./cause.fixture";

import _ from "lodash";
import { jest, describe, test, expect, it, beforeAll } from "@jest/globals";
import { mapPublicationAsEvent } from "./event";
import { PUBLICATIONS_RAW } from "../libs/lens/publication.fixture";
import { loadClientAuthenticated } from "@/libs/lens/client";

import { LensClient } from "@lens-protocol/client";
// we hijacked the jest runner to execute the data loading
// which is better done via ts-node .mjs

describe("#demo", () => {
  let lensClient: LensClient;
  let wallets: ethers.Wallet[] = Array(total);
  let profileIds: string[] = Array(total);

  beforeAll(async () => {
    // TODO simulate avatars
    // avatarUrl: '',
    await Promise.all(
      _.range(0, total - 1).map(async (i) => {
        wallets[i] = ethers.Wallet.createRandom();

        lensClient = await loadClientAuthenticated(wallets[i]);
        const handlePrefix = "";
        const handle = (handlePrefix || "w3btest") + _.random(1, 10000);
        const result = await createProfile(lensClient, wallets[i], handle);
        profileIds[i] = result?.profileId || "";
      }),
    );
  });

  test("#create cause and events", () => {});
});
