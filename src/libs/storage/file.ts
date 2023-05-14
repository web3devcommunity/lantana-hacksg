import { File, Filelike, Web3Storage, getFilesFromPath } from "web3.storage";

export const uploadWithPaths = async (paths: string[]) => {
  const token = process.env.WEB3_STORAGE_TOKEN || "";
  const storage = new Web3Storage({ token });
  const files = await getFilesFromPath(paths);

  const cid = await storage.put(files as Iterable<Filelike>);

  return cid;
};

export const uploadWithValues = async (values: any[]) => {
  const token = process.env.WEB3_STORAGE_TOKEN || "";
  const storage = new Web3Storage({ token });

  const files = values.map((v, i) => {
    const buffer = Buffer.from(JSON.stringify(v));
    return new File([buffer], i.toString());
  }) as Iterable<Filelike>;

  const cid = await storage.put(files, {
    wrapWithDirectory: false,
  });

  return cid;
};
