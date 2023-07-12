import { Event, Interest, MetadataEvent, Place } from '@firefly/cloud';
import { CoreEnum } from '@theory/core';

import { DocumentSnapshot } from '@theory/firebase';
import { ActionsEvent } from './event.actions.enum';

export class ActionEventReset {
  static readonly type = ActionsEvent.Reset;
}
export class ActionEventGet {
  static readonly type = ActionsEvent.Get;
  constructor(public id: string) {}
}
export class ActionEventSet {
  static readonly type = ActionsEvent.Set;
  constructor(public snapshot: DocumentSnapshot, public data?: Event) {}
}
export class ActionEventPatch {
  static readonly type = ActionsEvent.Patch;
  constructor(public partial: Partial<Event>, public save: boolean = false) {}
}
export class ActionEventPatchMetadata {
  static readonly type = ActionsEvent.PatchMetadata;
  constructor(public metadata: Partial<MetadataEvent>) {}
}
export class ActionEventCreate {
  static readonly type = ActionsEvent.Create;
}
export class ActionEventUpdate {
  static readonly type = ActionsEvent.Update;
}
export class ActionEventSave {
  static readonly type = ActionsEvent.Save;
}
export class ActionEventDelete {
  static readonly type = ActionsEvent.Delete;
}
export class ActionEventSetId {
  static readonly type = ActionsEvent.SetId;
  constructor(
    public id: string = CoreEnum.IdNew,
    public isAlert: boolean = false
  ) {}
}

export class ActionEventImagesUpdate {
  static readonly type = ActionsEvent.ImagesUpdate;
}
export class ActionEventImageSet {
  static readonly type = ActionsEvent.ImageSet;
}
export class ActionEventSetIdAnonymousPending {
  static readonly type = ActionsEvent.SetIdAnonymousPending;
  constructor(public id: string) {}
}
export class ActionEventSetIdAnonymous {
  static readonly type = ActionsEvent.SetIdAnonymous;
  constructor(public id: string) {}
}
export class ActionEventPlaceSet {
  static readonly type = ActionsEvent.PlaceSet;
  constructor(public place?: Place) {}
}

export class ActionEventInterestAdd {
  static readonly type = ActionsEvent.InterestAdd;
  constructor(public interest: Interest, public pending: boolean = false) {}
}
export class ActionEventInterestRemove {
  static readonly type = ActionsEvent.InterestRemove;
  constructor(public interest: Interest, public pending: boolean = false) {}
}

export class ActionEventAccept {
  static readonly type = ActionsEvent.AcceptEvent;
  constructor(public interest?: Interest) {}
}
export class ActionEventDeny {
  static readonly type = ActionsEvent.DenyEvent;
}
export class ActionEventTimeSet {
  static readonly type = ActionsEvent.TimeSet;
  constructor(public key: string, public value: string) {}
}
