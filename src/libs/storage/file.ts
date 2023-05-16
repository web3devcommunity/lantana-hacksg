import { File, Filelike, Web3Storage, getFilesFromPath } from 'web3.storage';

export const getClient = () => {
  const token = process.env.WEB3_STORAGE_TOKEN || '';
  return new Web3Storage({ token });
};
export const uploadWithPaths = async (paths: string[]) => {
  const storage = getClient();
  const files = await getFilesFromPath(paths);

  const cid = await storage.put(files as Iterable<Filelike>);

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
