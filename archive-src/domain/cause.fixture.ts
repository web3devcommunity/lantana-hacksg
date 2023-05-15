import { asCause } from '../components/CauseCard';
import { Cause, CauseInput } from './cause';

export const TEST_CAUSES_RAW: CauseInput[] = [
  {
    title: 'Beach Clean up',
    date: '2023-05-08T14:00:14Z',
    imageUrl: '/clean1.jpg',
    descriptionShort:
      '25KG of rubbish is collected this afternoon at east coast beach, thanks to these volunteers',
  },
  {
    title: 'Trees planting',
    date: '2023-05-28T14:00:14Z',
    imageUrl: '/clean1.jpg',
    descriptionShort: 'We took a kayak trip for the beach clean up',
  },
];

export const TEST_CAUSES: Cause[] = TEST_CAUSES_RAW.map(asCause);
