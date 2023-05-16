import { de } from 'date-fns/locale';
import { Event, EventInput } from './event';
import { User } from './user';
import _ from 'lodash';
import { c } from '@wagmi/cli/dist/config-c09a23a5';

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

export const mapCauseAsPublication = (cause: Cause) => {
  const { key, title, descriptionShort, imageUrl } = cause;
  return {
    imageUrl: imageUrl,
    name: 'Cause:' + title,
    content: descriptionShort,
    tags: [formatEntityTag(key, 'cause')],
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
