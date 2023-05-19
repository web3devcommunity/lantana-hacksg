import _ from 'lodash';
import { jest, describe, test, expect, it, beforeAll } from '@jest/globals';
import { mapPublicationAsEvent } from './event';
import { PUBLICATIONS_RAW } from '../libs/lens/publication.fixture';
import { Entity } from './entity';

describe('#event', () => {
  test('#mapPublicationAsEvent', () => {
    const publication = PUBLICATIONS_RAW[0];
    publication.metadata.attributes = [
      {
        //@ts-ignore
        displayType: 'string',
        traitType: Entity.Cause,
        value: 'eco-warriors-sg',
      },
      {
        //@ts-ignore
        displayType: 'string',
        traitType: Entity.Event,
        value: 'cleanup',
      },
    ];

    const event = mapPublicationAsEvent(publication);
    expect(event?.descriptionShort).toEqual('Hello Josh :)');
    expect(event?.date.getTime()).toEqual(1650098005000);
    expect(event?.causeKey).toEqual('eco-warriors-sg');
    expect(event?.key).toEqual('cleanup');
  });
});
