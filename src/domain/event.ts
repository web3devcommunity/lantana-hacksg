import { parseISO } from "date-fns";
import { User } from "./user";

export type Event = {
  causeKey: string;
  title: string;
  date: Date;
  imageUrl?: string;
  descriptionShort: string;
  stats: any;
  publicationId?: string;

  volunteers: Partial<User>[];
  volunteersCount: number;
};

export type EventInput = {
  causeKey: string;
  title: string;
  date?: string;
  imageUrl?: string;
  descriptionShort?: string;
  publicationId?: string;

  volunteers?: Partial<User>[];
  volunteersCount: number;
};

export const mapPublicationAsEvent = (publication: any): Event => {
  return {
    title: publication?.metadata?.name,
    date: parseISO(publication?.createdAt) || new Date(),
    // date: publication,
    imageUrl: publication?.metadata?.media?.[0]?.original.url,
    descriptionShort: publication?.metadata?.content,
    stats: publication?.stats,
    publicationId: publication?.id,
    // TODO fix hardcode
    causeKey: "beach-cleanup-sg",
    volunteers: [{ name: "josh" }],
    volunteersCount: 234,
    // volunteers: event.volunteers,
    // volunteersCount: event.volunteersCount,
  };
};

export const asEvent = (event: EventInput): Event => {
  return {
    causeKey: event.causeKey,
    title: event.title!,
    date: parseISO(event.date!),
    imageUrl: event.imageUrl || "",
    descriptionShort: event.descriptionShort || "",
    stats: {},
    publicationId: event.publicationId,
    volunteers: event.volunteers || [],
    volunteersCount: event.volunteersCount,
  };
};
