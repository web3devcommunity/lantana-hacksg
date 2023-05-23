import { uploadWithValues, withInternetUrl } from '@/libs/storage/file';
import { NextApiRequest, NextApiResponse } from 'next';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { metadata } = req.body;

  const cid = await uploadWithValues([metadata]);

  res.send({
    url: withInternetUrl(cid),
  });
};

export default handler;
