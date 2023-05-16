import _ from "lodash";
import { Cause, CauseInput } from "./cause";
import { Event, EventInput, asEvent } from "./event";
import { TEST_USERS_RAW } from "./user.fixture";

export const TEST_CAUSES_RAW: CauseInput[] = [
  {
    key: "beach-cleanup-sg",
    title: "Beach Clean up Singapore",
    imageUrl: "/clean1.jpg",
    descriptionShort:
      "25KG of rubbish is collected this afternoon at east coast beach, thanks to these volunteers",
    organizer: {
      title: "Singapore Countil",
    },
    events: [
      {
        title: "Clean up@East Coast",
        date: "2023-05-08T14:00:14Z",
        imageUrl: "/clean1.jpg",
        descriptionShort:
          "25KG of rubbish is collected this afternoon at east coast beach, thanks to these volunteers",
        volunteers: _.take(TEST_USERS_RAW, 5),
        volunteersCount: 999,
      },
      {
        title: "Clean up@Punngol",
        date: "2023-05-08T14:00:14Z",
        imageUrl: "/clean1.jpg",
        descriptionShort:
          "25KG of rubbish is collected this afternoon at east coast beach, thanks to these volunteers",
        volunteers: _.take(TEST_USERS_RAW, 5),
        volunteersCount: 888,
      },
    ],
    volunteers: _.take(TEST_USERS_RAW, 5),
    volunteersCount: 311,
  },
  {
    key: "365-trees",
    title: "365 Trees",
    imageUrl: "/clean1.jpg",
    descriptionShort: "Every year we plan 365 tress in areas near HDB",
    organizer: {
      title: "Singapore Countil",
    },
    events: [
      {
        title: "Beach Clean up",
        date: "2023-05-08T14:00:14Z",
        imageUrl: "/clean1.jpg",
        descriptionShort:
          "25KG of rubbish is collected this afternoon at east coast beach, thanks to these volunteers",
      },
      {
        title: "Beach Clean up",
        date: "2023-05-08T14:00:14Z",
        imageUrl: "/clean1.jpg",
        descriptionShort:
          "25KG of rubbish is collected this afternoon at east coast beach, thanks to these volunteers",
      },
    ],
    volunteers: [
      {
        name: "Josh",
      },
      {
        name: "Vincent",
      },
      {
        name: "Daryl",
      },
    ],
    volunteersCount: 178,
  },
];

export const asCause = (causeInput: CauseInput): Cause => {
  return {
    ...causeInput,
    events: causeInput.events.map(asEvent),
  };
};

export const TEST_CAUSES: Cause[] = TEST_CAUSES_RAW.map(asCause);
