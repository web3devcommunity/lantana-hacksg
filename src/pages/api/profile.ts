import { loadClientAuthenticated } from '@/libs/lens/client';
import { createProfile } from '@/libs/lens/utils';
import { invokeCreateUser } from '@/libs/retool-api';
import { NextApiRequest, NextApiResponse } from 'next';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { wallet_address, lens_handle, lens_profile_id } = req.body;

  await invokeCreateUser(wallet_address, lens_profile_id, lens_handle);
  // res.end("ok");
};

export default handler;
