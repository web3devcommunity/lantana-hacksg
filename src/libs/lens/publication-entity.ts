import { Entity } from '@/domain/entity';
import { AnyPublication, Post } from '@lens-protocol/react-web';
import * as _ from 'lodash';
import { LensPublication } from './utils';

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

export const findAttributeWithEntity = (
  publication: LensPublication,
  entity: Entity,
) => {
  return (publication?.metadata?.attributes || []).find(
    (a: any) => a?.traitType === entity,
  )?.value;
};
