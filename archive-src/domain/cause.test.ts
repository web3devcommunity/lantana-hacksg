import _ from 'lodash';
import { jest, describe, test, expect, it, beforeAll } from '@jest/globals';
import { mapPublicationAsCause } from './cause';
import { PUBLICATIONS_RAW } from '../libs/lens/publication.fixture';

describe('#cause', () => {
  test('#mapPublicationAsCause', () => {
    const publication = PUBLICATIONS_RAW[0];
    const cause = mapPublicationAsCause(publication);
    expect(cause?.descriptionShort).toEqual('Hello Josh :)');
  });
});
