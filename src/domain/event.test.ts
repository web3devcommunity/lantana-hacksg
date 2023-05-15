import _ from "lodash";
import { jest, describe, test, expect, it, beforeAll } from "@jest/globals";
import { mapPublicationAsEvent } from "./event";
import { PUBLICATIONS_RAW } from "../libs/lens/publication.fixture";

describe("#event", () => {
  test("#mapPublicationAsEvent", () => {
    const publication = PUBLICATIONS_RAW[0];
    const event = mapPublicationAsEvent(publication);
    expect(event?.descriptionShort).toEqual("Hello Josh :)");
    expect(event?.date.getTime()).toEqual(1650098005000);
  });
});
