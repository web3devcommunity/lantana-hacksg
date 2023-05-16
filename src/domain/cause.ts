import { Event, EventInput } from "./event";
import { User } from "./user";

export type CauseOrganizer = {
  title: string;
};
export type Cause = {
  key: string;
  title: string;
  imageUrl?: string;
  descriptionShort: string;
  events: Event[];
  organizer: CauseOrganizer;
  volunteers: Partial<User>[];
  volunteersCount: number;
};

export type CauseInput = {
  key: string;
  title: string;
  organizer: CauseOrganizer;
  imageUrl?: string;
  descriptionShort?: string;
  events: EventInput[];
  volunteers?: Partial<User>[];
  volunteersCount: number;
};
