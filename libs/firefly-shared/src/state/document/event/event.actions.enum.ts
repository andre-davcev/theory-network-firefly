export enum ActionsEvent {
  Reset = '[Event] Reset',
  Get = '[Event] Get',
  SetId = '[Event] SetId',
  Set = '[Event] Set',
  Patch = '[Event] Patch',
  PatchMetadata = '[Event] Patch Metadata',
  Save = '[Event] Save',
  Create = '[Event] Create',
  Update = '[Event] Update',
  Delete = '[Event] Delete',

  ImageClear = '[Event] Image Clear',
  ImageUriSet = '[Event] Image Uri Set',
  ImagePathSet = '[Event] Image Path Set',
  ImageCreate = '[Event] Image Create',
  ImagesUpdate = '[Event] Images Update',
  ImageSet = '[Event] Image Set',

  SetIdAnonymousPending = '[Event] SetIdAnonymousPending',
  SetIdAnonymous = '[Event] SetIdAnonymous',

  PlaceSet = '[Event] Place Set',
  InterestAdd = '[Event] Interest Add',
  InterestRemove = '[Event] Interest Remove',
  InterestPendingAdd = '[Event] Interest Pending Add',
  InterestPendingRemove = '[Event] Interest Pending Remove',
  AcceptEvent = '[Event] Accept Event',
  DenyEvent = '[Event] Deny Event',
  TimeSet = '[Event] Time Set'
}
