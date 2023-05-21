// entity = attribute in NFT
export enum Entity {
  Cause = 'cause',
  Event = 'event',
  Lantana = 'Lantana',
  VolunteerCount = 'volunteer-count',
  EventCategory = 'event-category',
  WasteCollectedKg = 'waste-collected-kg',
  TreesPlanntedCount = 'trees-planted-count',
}

// expect to be show in NFT
export const WhiteListedEntities = [
  Entity.VolunteerCount,
  Entity.EventCategory,
  Entity.WasteCollectedKg,
  Entity.TreesPlanntedCount,
];
