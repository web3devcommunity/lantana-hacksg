import * as _ from 'lodash';
import { parseISO } from 'date-fns';
import { User } from './user';
import { PublicationFragment } from '@lens-protocol/client';
import { PublicationInputBase } from '@/libs/lens/publication';
import {
  asPublicationAttribute,
  findEntityTag,
  formatEntityTag,
  parseEntityTag,
} from './cause';
import { APP_DEFAULT_LOGO_URL } from '@/env';
import { LensPublication } from '@/libs/lens/utils';
import { TEST_USERS_RAW } from './user.fixture';
import { Entity } from './entity';

export type Event = {
  key: string;
  // for convenience, link back to cause
  causeKey?: string;
  title: string;
  date: Date;
  imageUrl: string;
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

export const mapPublicationAsEvent = (publication: LensPublication): Event => {
  const causeKey = publication.metadata.attributes.find(
    (a: any) => a?.traitType === 'cause',
  )?.value;

  return {
    causeKey,
    title: publication?.metadata?.name,
    date: parseISO(publication?.createdAt) || new Date(),
    // date: publication,
    imageUrl: publication?.metadata?.media?.[0]?.original.url,
    descriptionShort: publication?.metadata?.content,
    stats: publication?.stats,
    publicationId: publication.id,
    key: 'beach-cleanup-sg',
    // TODO load from followers
    // volunteers: event.volunteers,
    volunteers: _.take(TEST_USERS_RAW, 5),
    // TODO load from attributes
    // volunteersCount: event.volunteersCount,
    volunteersCount: 234,
  };
};

export const mapEventAsPublication = (event: Event) => {
  const kvs = [
    {
      entity: Entity.Cause,
      value: event.causeKey!,
    },
    {
      entity: Entity.Event,
      value: event.key,
    },
  ];
  const attributes = kvs.map(asPublicationAttribute);

  return {
    name: event.title,
    content: event.descriptionShort,
    imageUrl: event.imageUrl,
    attributes,
    tags: [
      formatEntityTag(Entity.Event, Entity.Lantana),
      formatEntityTag(event.key, Entity.Event),
      formatEntityTag(event.causeKey!, Entity.Cause),
    ],
  };
};

export const asEvent = (event: EventInput): Event => {
  return {
    key: event.key,
    title: event.title!,
    date: parseISO(event.date!),
    imageUrl: event.imageUrl || APP_DEFAULT_LOGO_URL,
    descriptionShort: event.descriptionShort || '',
    stats: {},
    publicationId: event.publicationId,
    volunteers: event.volunteers || [],
    volunteersCount: event.volunteersCount,
  };
};
