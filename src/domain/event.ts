import { parseISO } from 'date-fns';
import { User } from './user';
import { PublicationFragment } from '@lens-protocol/client';
import { PublicationInputBase } from '@/libs/lens/publication';
import { findEntityTag, formatEntityTag, parseEntityTag } from './cause';

export type Event = {
  key: string;
  // for convenience, link back to cause
  causeKey?: string;
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
  key: string;
  causeKey?: string;
  title: string;
  date?: string;
  imageUrl?: string;
  descriptionShort?: string;
  publicationId?: string;

  volunteers?: Partial<User>[];
  volunteersCount: number;
};

// TODO fix type from sdk
export type LensPublication = any;

export const mapPublicationAsEvent = (publication: LensPublication): Event => {
  const tags = publication?.metadata?.tags || [];

  const causeTag = findEntityTag(tags, 'cause');

  return {
    causeKey: parseEntityTag(causeTag || '')?.key,
    title: publication?.metadata?.name,
    date: parseISO(publication?.createdAt) || new Date(),
    // date: publication,
    imageUrl: publication?.metadata?.media?.[0]?.original.url,
    descriptionShort: publication?.metadata?.content,
    stats: publication?.stats,
    publicationId: publication?.id,
    // TODO fix hardcode
    key: 'beach-cleanup-sg',
    volunteers: [{ name: 'josh' }],
    volunteersCount: 234,
    // volunteers: event.volunteers,
    // volunteersCount: event.volunteersCount,
  };
};

export const mapEventAsPublication = (event: Event) => {
  return {
    name: event.title,
    content: event.descriptionShort,
    imageUrl: event.imageUrl,
    tags: [
      formatEntityTag(event.key, 'event'),
      formatEntityTag(event.causeKey!, 'cause'),
    ],
  };
};

export const asEvent = (event: EventInput): Event => {
  return {
    key: event.key,
    title: event.title!,
    date: parseISO(event.date!),
    imageUrl: event.imageUrl || '',
    descriptionShort: event.descriptionShort || '',
    stats: {},
    publicationId: event.publicationId,
    volunteers: event.volunteers || [],
    volunteersCount: event.volunteersCount,
  };
};
