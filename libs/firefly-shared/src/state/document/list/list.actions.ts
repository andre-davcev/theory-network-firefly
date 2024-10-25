import { Query } from '@angular/fire/compat/firestore';

import { Event, List, MetadataList } from '@firefly/cloud';
import { CoreEnum } from '@theory/core';
import { DocumentSnapshot } from '@theory/firebase';

import { ActionsList } from './list.actions.enum';

export class ActionListReset {
  static readonly type = ActionsList.Reset;
}
export class ActionListDirty {
  static readonly type = ActionsList.Dirty;
}
export class ActionListGet {
  static readonly type = ActionsList.Get;
  constructor(public id: string) {}
}
export class ActionListSet {
  static readonly type = ActionsList.Set;
  constructor(public snapshot: DocumentSnapshot<List>, public data?: List) {}
}
export class ActionListPatch {
  static readonly type = ActionsList.Patch;
  constructor(public partial: Partial<List>, public save: boolean = false) {}
}
export class ActionListPatchMetadata {
  static readonly type = ActionsList.PatchMetadata;
  constructor(public metadata: Partial<MetadataList>) {}
}
export class ActionListCreate {
  static readonly type = ActionsList.Create;
}
export class ActionListUpdate {
  static readonly type = ActionsList.Update;
}
export class ActionListSave {
  static readonly type = ActionsList.Save;
}
export class ActionListDelete {
  static readonly type = ActionsList.Delete;
}
export class ActionListSetId {
  static readonly type = ActionsList.SetId;
  constructor(public id: string = CoreEnum.IdNew) {}
}
export class ActionListImagesUpdate {
  static readonly type = ActionsList.ImagesUpdate;
}
export class ActionListImageSet {
  static readonly type = ActionsList.ImageSet;
}

export class ActionListEventsGet {
  static readonly type = ActionsList.EventsGet;
}
export class ActionListEventsGetPending {
  static readonly type = ActionsList.EventsGetPending;
}
export class ActionListEventsGetAnonymous {
  static readonly type = ActionsList.EventsGetAnonymous;
}
export class ActionListEventsSet {
  static readonly type = ActionsList.EventsSet;
  constructor(public query: Query, public key: string) {}
}
export class ActionListEventsAdd {
  static readonly type = ActionsList.EventsAdd;
  constructor(public event: Event) {}
}
