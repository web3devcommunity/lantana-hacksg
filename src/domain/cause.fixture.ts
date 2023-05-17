import _ from 'lodash';
import { Cause, CauseInput } from './cause';
import { Event, EventInput, asEvent } from './event';
import { TEST_USERS_RAW } from './user.fixture';
import { APP_DEFAULT_LOGO_URL } from '@/env';

export const TEST_CAUSES_RAW: CauseInput[] = [
  {
    key: 'beach-cleanup-sg',
    title: 'Beach Clean up Singapore',
    imageUrl: '/clean1.jpg',
    descriptionShort:
      '25KG of rubbish is collected this afternoon at east coast beach, thanks to these volunteers',
    organizer: {
      title: 'Singapore Countil',
    },
    events: [
      {
        key: 'cleanup-event-1',
        title: 'Clean up@East Coast',
        date: '2023-05-08T14:00:14Z',
        imageUrl: '/clean1.jpg',
        descriptionShort:
          '25KG of rubbish is collected this afternoon at east coast beach, thanks to these volunteers',
        volunteers: _.take(TEST_USERS_RAW, 5),
        volunteersCount: 999,
      },
      {
        key: 'cleanup-event-2',
        title: 'Clean up@Punngol',
        date: '2023-05-08T14:00:14Z',
        imageUrl: '/clean2.jpg',
        descriptionShort:
          '25KG of rubbish is collected this afternoon at east coast beach, thanks to these volunteers',
        volunteers: _.take(TEST_USERS_RAW, 5),
        volunteersCount: 888,
      },
      {
        key: 'cleanup-event-3',
        title: 'Clean up@Changi',
        date: '2023-05-08T14:00:14Z',
        imageUrl: '/clean3.jpg',
        descriptionShort:
          '30KG of rubbish is collected this afternoon at east coast beach, thanks to these volunteers',
        volunteers: _.take(TEST_USERS_RAW, 5),
        volunteersCount: 888,
      },
    ],
    volunteers: _.take(TEST_USERS_RAW, 5),
    volunteersCount: 311,
  },
  {
    key: '365-trees',
    title: '365 Trees',
    imageUrl:
      'https://www.cambridgegardencentre.ca/wp-content/uploads/2020/06/Tree-Planting-2.jpg',
    descriptionShort: 'Every year we plan 365 tress in areas near HDB',
    organizer: {
      title: 'Singapore Countil',
    },
    events: [
      {
        key: 'tree-planting-1',
        title: 'Tree Planting',
        date: '2023-05-08T14:00:14Z',
        // imageUrl: '/clean1.jpg',
        descriptionShort: 'Plannting trees in Punggol',
        volunteers: _.take(TEST_USERS_RAW, 5),
        volunteersCount: 888,
      },
      {
        key: 'tree-planting-2',
        title: 'Tree Planting',
        date: '2023-05-08T14:00:14Z',
        // imageUrl: '/clean1.jpg',
        descriptionShort: 'Plannting trees in Upper East Coast',
        volunteers: _.take(TEST_USERS_RAW, 5),
        volunteersCount: 888,
      },
    ],
    volunteers: [
      {
        name: 'Josh',
      },
      {
        name: 'Vincent',
      },
      {
        name: 'Daryl',
      },
    ],
    volunteersCount: 178,
  },
];

export const asCause = (causeInput: CauseInput): Cause => {
  return {
    ...causeInput,
    imageUrl: causeInput.imageUrl || APP_DEFAULT_LOGO_URL,
    descriptionShort: causeInput.descriptionShort || '',
    volunteers: causeInput.volunteers || [],
    events: causeInput.events.map(asEvent),
  };
};

export const TEST_CAUSES: Cause[] = TEST_CAUSES_RAW.map(asCause);
