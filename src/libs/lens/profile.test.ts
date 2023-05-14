import _ from "lodash";
import { jest, describe, expect, it, beforeAll } from "@jest/globals";
import { ethers } from "ethers";
import { createProfile, getProfileUrl } from "./utils";
import { LensClient, development } from "@lens-protocol/client";
import { loadClient, loadClientAuthenticated } from "./client";
import { generateHandle } from "./utils";

jest.setTimeout(60 * 1000);
describe("profile", () => {
  let client: LensClient;
  let wallet: ethers.Wallet;
  let profileId: string;

  beforeAll(async () => {
    wallet = ethers.Wallet.createRandom();
    client = await loadClientAuthenticated({ wallet });
  });

  it("should create a profile", async () => {
    const handle = generateHandle();
    const profile = await createProfile(
      client,
      wallet._signTypedData.bind(wallet),
    )(wallet.address, handle);

    const { profileId, lensterUrl, dispatcherResults } = profile!;

    expect(!!lensterUrl.match(handle)).toEqual(true);
    expect(typeof profileId).toEqual("string");
  });
});
