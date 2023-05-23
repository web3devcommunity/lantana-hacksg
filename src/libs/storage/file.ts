import path from 'path';
import { File, Filelike, Web3Storage, getFilesFromPath } from 'web3.storage';

export const getClient = () => {
  const token = process.env.WEB3_STORAGE_TOKEN || '';
  return new Web3Storage({ token });
};
export const uploadWithPaths = async (paths: string[], storageOptions = {}) => {
  const storage = getClient();
  const files = await getFilesFromPath(paths);

  const cid = await storage.put(files as Iterable<Filelike>, storageOptions);

  return cid;
};

export const uploadWithValues = async (values: any[]) => {
  const storage = getClient();
  const files = values.map((v, i) => {
    const buffer = Buffer.from(JSON.stringify(v));
    return new File([buffer], i.toString());
  }) as Iterable<Filelike>;

  const cid = await storage.put(files, {
    wrapWithDirectory: false,
  });

  return cid;
};

export const withInternetUrl = async (url: string) => {
  if (url.match(/http/)) {
    return url;
  }
  const src = path.resolve(__dirname, '../../../public' + url);
  const cid = await uploadWithPaths([src], {
    wrapWithDirectory: false,
  });
  return 'ipfs://' + cid;
};
