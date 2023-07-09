import { Query } from '@angular/fire/compat/firestore';

import { CoreEnum } from '@theory/core';
import { DocumentSnapshot } from '@theory/firebase';
import { Event, Interest, MetadataInterest } from '@firefly/cloud';

import { ActionsInterest } from './interest.actions.enum';

export class ActionInterestReset {
  static readonly type = ActionsInterest.Reset;
  constructor() {}
}
export class ActionInterestDirty {
  static readonly type = ActionsInterest.Dirty;
  constructor() {}
}
export class ActionInterestGet {
  static readonly type = ActionsInterest.Get;
  constructor(public id: string) {}
}
export class ActionInterestSet {
  static readonly type = ActionsInterest.Set;
  constructor(public snapshot: DocumentSnapshot, public data?: Interest) {}
}
export class ActionInterestPatch {
  static readonly type = ActionsInterest.Patch;
  constructor(
    public partial: Partial<Interest>,
    public save: boolean = false
  ) {}
}
export class ActionInterestPatchMetadata {
  static readonly type = ActionsInterest.PatchMetadata;
  constructor(public metadata: Partial<MetadataInterest>) {}
}
export class ActionInterestCreate {
  static readonly type = ActionsInterest.Create;
}
export class ActionInterestUpdate {
  static readonly type = ActionsInterest.Update;
}
export class ActionInterestSave {
  static readonly type = ActionsInterest.Save;
}
export class ActionInterestDelete {
  static readonly type = ActionsInterest.Delete;
}
export class ActionInterestSetId {
  static readonly type = ActionsInterest.SetId;
  constructor(public id: string = CoreEnum.IdNew) {}
}
export class ActionInterestImagesUpdate {
  static readonly type = ActionsInterest.ImagesUpdate;
}
export class ActionInterestImageSet {
  static readonly type = ActionsInterest.ImageSet;
}

export class ActionInterestEventsGet {
  static readonly type = ActionsInterest.EventsGet;
}
export class ActionInterestEventsGetPending {
  static readonly type = ActionsInterest.EventsGetPending;
}
export class ActionInterestEventsGetAnonymous {
  static readonly type = ActionsInterest.EventsGetAnonymous;
}
export class ActionInterestEventsSet {
  static readonly type = ActionsInterest.EventsSet;
  constructor(public query: Query, public key: string) {}
}
export class ActionInterestEventsAdd {
  static readonly type = ActionsInterest.EventsAdd;
  constructor(public event: Event) {}
}
