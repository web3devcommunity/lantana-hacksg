import _ from 'lodash';
import { Cause, CauseInput } from './cause';
import { Event, EventInput, asEvent } from './event';
import { TEST_USERS_RAW } from './user.fixture';
import { APP_DEFAULT_LOGO_URL } from '@/env';

export const asCause = (causeInput: CauseInput): Cause => {
  return {
    ...causeInput,
    imageUrl: causeInput.imageUrl || APP_DEFAULT_LOGO_URL,
    descriptionShort: causeInput.descriptionShort || '',
    volunteers: causeInput.volunteers || [],
    events: causeInput.events.map(asEvent),
  };
};

// TODO: update correct images
// TODO: fix volunteers / remove comments

export const TEST_CAUSES_RAW: CauseInput[] = [
  {
    key: 'eco-warriors-sg',
    title: 'EcoWarriors SG Beach Clean Up',
    imageUrl: '/eco-warriors.jpg',
    descriptionShort: 'Working towards a sustainable environment',
    organizer: {
      title: 'EcoWarriors SG',
    },
    events: [
      {
        key: 'clean-up-1',
        title: 'Sustainable Community Clean-up',
        date: '2023-05-08T14:00:14Z',
        imageUrl: '/clean1.jpg',
        descriptionShort:
          '5kg of rubbish is collected. Join EcoWarriors for a community clean-up to make our environment cleaner and greener.',
        volunteers: _.take(TEST_USERS_RAW, 5),
        // volunteers: [ { name: 'John', }, { name: 'Emily' }, { name: 'Michael' }],
        volunteersCount: 25,
      },
      {
        key: 'walkathon-1',
        title: 'Environmental Awareness Walkathon',
        date: '2023-05-15T09:30:00Z',
        imageUrl: '/walkathon.jpg',
        descriptionShort:
          'Raise awareness about environmental issues by participating in our walkathon.',
        volunteers: _.take(TEST_USERS_RAW, 5),
        // volunteers: [ { name: 'Sophia' }, { name: 'David' }, { name: 'Emma' } ],
        volunteersCount: 40,
      },
      {
        key: 'garden-1',
        title: 'Community Garden Planting Day',
        date: '2023-05-22T10:00:00Z',
        imageUrl: '/garden.jpg',
        descriptionShort:
          'Help us create a vibrant community garden by planting trees and flowers.',
        volunteers: _.take(TEST_USERS_RAW, 5),
        // volunteers: [ { name: 'Oliver' }, { name: 'Ava' }, { name: 'Jacob' } ],
        volunteersCount: 15,
      },
      {
        key: 'cleanup-2',
        title: 'Coastal Cleanup and Marine Conservation',
        date: '2023-06-05T14:00:00Z',
        imageUrl: '/clean2.jpg',
        descriptionShort:
          'Join us in cleaning up the coast and promoting marine conservation.',
        volunteers: _.take(TEST_USERS_RAW, 5),
        // volunteers: [ { name: 'Mia' }, { name: 'Daniel' }, { name: 'Sophie' } ],
        volunteersCount: 30,
      },
    ],
    volunteers: _.take(TEST_USERS_RAW, 5),
    // volunteers: [{ name: 'Liam' }, { name: 'Olivia' }, { name: 'Ethan', } ],
    volunteersCount: 100,
  },
  {
    key: 'money-sense-academy',
    title: 'MoneySense Academy',
    imageUrl: '/money-sense.jpg',
    descriptionShort: 'Empowering youth through financial literacy',
    organizer: {
      title: 'MoneySense Academy',
    },
    events: [
      {
        key: 'workshop-1',
        title: 'Financial Literacy Workshop for Youth',
        date: '2023-05-10T15:00:00Z',
        imageUrl: '/finance-workshop.jpg',
        descriptionShort:
          'Equip the youth with essential financial knowledge through our workshop.',
        volunteers: _.take(TEST_USERS_RAW, 5),
        // volunteers: [ { name: 'Noah' }, { name: 'Sophia' }, { name: 'William' } ],
        volunteersCount: 20,
      },
    ],
    volunteers: _.take(TEST_USERS_RAW, 5),
    // volunteers: [{ name: 'Isabella' }, { name: 'Mason' }, { name: 'Abigail' } ],
    volunteersCount: 50,
  },
  {
    key: 'creative-kids-foundation',
    title: 'CreativeKids Foundation',
    imageUrl: '/creative-kids.jpg',
    descriptionShort: 'Nurturing creativity in children',
    organizer: {
      title: 'CreativeKids Foundation',
    },
    events: [
      {
        key: 'art-craft-1',
        title: "Children's Art and Craft Day",
        date: '2023-05-12T10:30:00Z',
        imageUrl: '/garden.jpg',
        // imageUrl: '/art-craft.jpg',
        descriptionShort:
          'Let your children explore their artistic side with our art and craft day.',
        volunteers: _.take(TEST_USERS_RAW, 5),
        // volunteers: [ { name: 'James' }, { name: 'Sophie' }, { name: 'Elijah' } ],
        volunteersCount: 30,
      },
    ],
    volunteers: _.take(TEST_USERS_RAW, 5),
    // volunteers: [{ name: 'Charlotte' }, { name: 'Benjamin' }, { name: 'Avery' } ],
    volunteersCount: 40,
  },
  {
    key: 'seniorcare-support',
    title: 'SeniorCare Support',
    imageUrl: '/seniorcare-support.jpg',
    descriptionShort: 'Caring for the elderly',
    organizer: {
      title: 'SeniorCare Support',
    },
    events: [
      {
        key: 'caregivers-1',
        title: 'Elderly Caregivers Support Group',
        date: '2023-05-20T11:00:00Z',
        imageUrl: '/garden.jpg',
        // imageUrl: '/caregivers.jpg',
        descriptionShort:
          'Join our support group and learn how to provide better care for the elderly.',
        volunteers: _.take(TEST_USERS_RAW, 5),
        // volunteers: [ { name: 'Harper' }, { name: 'Jackson' }, { name: 'Amelia' } ],
        volunteersCount: 15,
      },
      {
        key: 'bootcamp-1',
        title: 'Health and Fitness Bootcamp for Seniors',
        date: '2023-06-01T09:00:00Z',
        imageUrl: '/garden.jpg',
        // imageUrl: '/fitness-bootcamp.jpg',
        descriptionShort:
          'Promote healthy living among seniors through our fitness bootcamp.',
        volunteers: _.take(TEST_USERS_RAW, 5),
        // volunteers: [ { name: 'Liam' }, { name: 'Olivia' }, { name: 'Ethan' } ],
        volunteersCount: 25,
      },
      {
        key: 'technology-1',
        title: 'Technology Workshop for Senior Citizens',
        date: '2023-06-10T14:30:00Z',
        imageUrl: '/garden.jpg',
        // imageUrl: '/technology-workshop.jpg',
        descriptionShort:
          'Help seniors become more tech-savvy by participating in our workshop.',
        volunteers: _.take(TEST_USERS_RAW, 5),
        // volunteers: [ { name: 'Isabella' }, { name: 'Mason' }, { name: 'Abigail' } ],
        volunteersCount: 10,
      },
    ],
    volunteers: _.take(TEST_USERS_RAW, 5),
    // volunteers: [{ name: 'Oliver' }, { name: 'Ava' }, { name: 'Jacob' } ],
    volunteersCount: 50,
  },
  {
    key: 'shelter-aid-sg',
    title: 'Shelter Aid SG',
    imageUrl: '/garden.jpg',
    // imageUrl: '/shelter-aid.jpg',
    descriptionShort: 'Supporting the homeless and animals in need',
    organizer: {
      title: 'Shelter Aid SG',
    },
    events: [
      {
        key: 'food-drive-1',
        title: 'Food Drive for Homeless Shelters',
        date: '2023-05-08T11:00:00Z',
        imageUrl: '/garden.jpg',
        // imageUrl: '/food-drive.jpg',
        descriptionShort:
          'Donate food items for homeless shelters and make a difference in their lives.',
        volunteers: _.take(TEST_USERS_RAW, 5),
        // volunteers: [ { name: 'Mia' }, { name: 'Daniel' }, { name: 'Sophie' } ],
        volunteersCount: 20,
      },
      {
        key: 'animal-shelter-1',
        title: 'Animal Shelter Volunteering Day',
        date: '2023-05-15T13:00:00Z',
        imageUrl: '/garden.jpg',
        // imageUrl: '/animal-shelter.jpg',
        descriptionShort:
          'Spend a day at the animal shelter and provide care for our furry friends.',
        volunteers: _.take(TEST_USERS_RAW, 5),
        // volunteers: [ { name: 'Emily' }, { name: 'Michael' }, { name: 'Grace' } ],
        volunteersCount: 10,
      },
    ],
    volunteers: _.take(TEST_USERS_RAW, 5),
    // volunteers: [{ name: 'Joshua' }, { name: 'Emily' }, { name: 'Daniel' } ],
    volunteersCount: 30,
  },
  {
    key: 'youth-empowerment-foundation',
    title: 'Youth Empowerment Foundation',
    imageUrl: '/garden.jpg',
    // imageUrl: '/youth-empowerment.jpg',
    descriptionShort: 'Empowering the youth for a better future',
    organizer: {
      title: 'Youth Empowerment Foundation',
    },
    events: [
      {
        key: 'workshop-2',
        title: 'Youth Empowerment Workshop',
        date: '2023-05-10T14:00:00Z',
        imageUrl: '/garden.jpg',
        // imageUrl: '/youth-workshop.jpg',
        descriptionShort:
          'Equip young individuals with essential life skills through our empowering workshop.',
        volunteers: _.take(TEST_USERS_RAW, 5),
        // volunteers: [ { name: 'Noah' }, { name: 'Sophia' }, { name: 'William' } ],
        volunteersCount: 40,
      },
    ],
    volunteers: _.take(TEST_USERS_RAW, 5),
    // volunteers: [{ name: 'James' }, { name: 'Sophie' }, { name: 'Elijah', } ],
    volunteersCount: 50,
  },
  {
    key: 'community-builders-sg',
    title: 'Community Builders SG',
    imageUrl: '/garden.jpg',
    // imageUrl: '/community-builders.jpg',
    descriptionShort: 'Building a stronger community',
    organizer: {
      title: 'Community Builders SG',
    },
    events: [
      {
        key: 'mentoring-1',
        title: 'Career Mentoring for Underprivileged Students',
        date: '2023-05-10T16:00:00Z',
        imageUrl: '/garden.jpg',
        // imageUrl: '/career-mentoring.jpg',
        descriptionShort:
          'Guide underprivileged students towards a brighter future through career mentoring.',
        volunteers: _.take(TEST_USERS_RAW, 5),
        // volunteers: [ { name: 'Charlotte' }, { name: 'Benjamin' }, { name: 'Avery' } ],
        volunteersCount: 20,
      },
      {
        key: 'support-1',
        title: 'Supporting Children with Special Needs',
        date: '2023-05-17T09:00:00Z',
        imageUrl: '/garden.jpg',
        // imageUrl: '/special-needs-support.jpg',
        descriptionShort:
          'Provide support and care for children with special needs and their families.',
        volunteers: _.take(TEST_USERS_RAW, 5),
        // volunteers: [ { name: 'Harper' }, { name: 'Jackson' }, { name: 'Amelia' } ],
        volunteersCount: 15,
      },
      {
        key: 'volunteering-1',
        title: 'Volunteer at a Local Orphanage',
        date: '2023-05-24T10:00:00Z',
        imageUrl: '/garden.jpg',
        // imageUrl: '/volunteer-orphanage.jpg',
        descriptionShort:
          'Make a difference in the lives of orphaned children by volunteering at a local orphanage.',
        volunteers: _.take(TEST_USERS_RAW, 5),
        // volunteers: [ { name: 'Liam' }, { name: 'Olivia' }, { name: 'Ethan' } ],
        volunteersCount: 25,
      },
      {
        key: 'library-1',
        title: 'Community Library Renovation Project',
        date: '2023-06-07T14:00:00Z',
        imageUrl: '/garden.jpg',
        // imageUrl: '/library-renovation.jpg',
        descriptionShort:
          'Join us in renovating a community library and create a better learning environment.',
        volunteers: _.take(TEST_USERS_RAW, 5),
        // volunteers: [ { name: 'Isabella' }, { name: 'Mason' }, { name: 'Abigail' } ],
        volunteersCount: 30,
      },
      {
        key: 'equality-1',
        title: 'Advocating Gender Equality in the Workplace',
        date: '2023-06-14T13:30:00Z',
        imageUrl: '/garden.jpg',
        // imageUrl: '/gender-equality.jpg',
        descriptionShort:
          'Promote gender equality in the workplace through awareness campaigns and initiatives.',
        volunteers: _.take(TEST_USERS_RAW, 5),
        // volunteers: [ { name: 'Sophia' }, { name: 'David' }, { name: 'Emma' } ],
        volunteersCount: 20,
      },
      {
        key: 'refugee-1',
        title: 'Refugee Support and Integration Program',
        date: '2023-06-21T11:00:00Z',
        imageUrl: '/garden.jpg',
        // imageUrl: '/refugee-support.jpg',
        descriptionShort:
          'Support refugees in their journey towards integration into a new community.',
        volunteers: _.take(TEST_USERS_RAW, 5),
        // volunteers: [ { name: 'Oliver' }, { name: 'Ava' }, { name: 'Jacob' } ],
        volunteersCount: 35,
      },
    ],
    volunteers: _.take(TEST_USERS_RAW, 5),
    // volunteers: [{ name: 'Joshua' }, { name: 'Emily' }, { name: 'Daniel' } ],
    volunteersCount: 150,
  },
];

export const TEST_CAUSES: Cause[] = TEST_CAUSES_RAW.map(asCause);
