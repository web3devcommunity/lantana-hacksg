import { de } from 'date-fns/locale';
import { Event, EventInput } from './event';
import { User } from './user';
import _ from 'lodash';
import { c } from '@wagmi/cli/dist/config-c09a23a5';
import { PublicationMetadataDisplayTypes } from '@lens-protocol/client';
import { LensPublication, withIpfsGateway } from '@/libs/lens/utils';
import { parseISO } from 'date-fns';
import { TEST_USERS_RAW } from './user.fixture';
import { Entity } from './entity';
import { findAttributeWithEntity } from '@/libs/lens/publication-entity';

export type CauseOrganizer = {
  title: string;
};
export type Cause = {
  key: string;
  title: string;

  organizer: CauseOrganizer;
  imageUrl: string;
  descriptionShort: string;
  events: Event[];
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

export type PublicationKeyValue = {
  entity: string;
  value: string | number;
};

export const asPublicationAttribute = ({
  entity,
  value,
}: PublicationKeyValue) => {
  return {
    traitType: entity,
    value: value.toString(),
  };
};

export const asPublicationTag = ({ entity, value }: PublicationKeyValue) => {
  return [entity, value].join('-');
};

// Could be Dynamic in the sense everytime someone mint the ERC1155 nft each attributes being different
export const mapCauseAsPublication = (cause: Cause) => {
  const { key, title, descriptionShort, imageUrl } = cause;

  const kvs = [
    {
      entity: Entity.Lantana,
      value: Entity.Cause,
    },
    {
      entity: Entity.Cause,
      value: cause.key,
    },
    {
      entity: Entity.VolunteerCount,
      value: cause.volunteersCount,
    },
  ];

  const attributes = kvs.map(asPublicationAttribute);
  const tags = kvs.map(asPublicationTag);
  return {
    imageUrl: imageUrl,
    name: 'Cause:' + title,
    content: descriptionShort,
    attributes,
    tags,
  };
};

// TODO refactor with mapPublicationAsEvent

export const mapPublicationAsCause = (publication: LensPublication): Cause => {
  const tags = publication?.metadata?.tags || [];

  const key = findAttributeWithEntity(publication, Entity.Cause) || '';

  return {
    key,
    title: publication?.metadata?.name,
    // TODO store in attribute
    organizer: {
      title: 'Eco Warriors SG',
    },

    imageUrl: withIpfsGateway(publication?.metadata?.media?.[0]?.original.url),
    descriptionShort: publication?.metadata?.content,
    // stats: publication?.stats,
    // publicationId: publication.id,
    // TODO load from followers
    // volunteers: event.volunteers,
    volunteers: _.take(TEST_USERS_RAW, 5),
    // TODO load from attributes
    // volunteersCount: event.volunteersCount,
    volunteersCount: _.random(45, 234),
    events: [],
  };
};

export const findEntityTag = (tags: string[], entityToFind: string) => {
  return _.find(tags, (tag) => {
    const { entity, key } = parseEntityTag(tag);

    return entity === entityToFind;
  });
};

export const formatEntityTag = (key: string, entity: string) =>
  [entity, key].join('-');

export const parseEntityTag = (tag: string) => {
  const [entity, ...rest] = tag.split('-');
  const key = rest.join('-');
  return { entity, key };
};
