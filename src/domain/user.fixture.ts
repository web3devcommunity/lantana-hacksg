import { User } from "./user";
import _ from 'lodash';
import { faker } from '@faker-js/faker';
export const TEST_USERS_RAW: User[] = [
  {
    name: 'Cindy',
    title: 'Sustainability Manager at Deloitte',
    badges: [
        {
            title: 'sustainability-expert'
        }
    ]
},
{
    name: 'James',
    title: 'President at Public Hygiene Council',
    badges: [
        {
            title: 'sustainability-expert'
        }
    ]
},

]


_.range(0,30).forEach(i=>{
    TEST_USERS_RAW.push({
        name: faker.name.fullName(),
        title: faker.lorem.word(),
        badges:[]
    });
});

