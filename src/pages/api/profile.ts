import { createProfile } from "@/libs/lens/utils";
import { invokeCreateUser } from "@/libs/retool-api";
import { NextApiRequest, NextApiResponse } from "next";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { wallet_address, handle } = req.body;
  const createdProfile = await createProfile(wallet_address, handle);

  console.log("createdProfile", createdProfile);

  await invokeCreateUser(wallet_address, createdProfile.profileId, handle);
  res.end("ok");
};

export default handler;
