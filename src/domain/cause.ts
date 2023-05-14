import { parseISO } from "date-fns";

export type Cause = {
  title: string;
  date: Date;
  imageUrl?: string;
  descriptionShort: string;
  stats: any;
  publicationId?: string;
};

export type CauseInput = {
  title: string;
  date: string;
  imageUrl?: string;
  descriptionShort?: string;
  publicationId?: string;
};

export const mapPublicationAsCause = (publication: any): Cause => {
  return {
    title: publication?.metadata?.name,
    date: parseISO(publication?.createdAt) || new Date(),
    // date: publication,
    imageUrl: publication?.metadata?.media?.[0]?.original.url,
    descriptionShort: publication?.metadata?.content,
    stats: publication?.stats,
    publicationId: publication?.id,
  };
};
