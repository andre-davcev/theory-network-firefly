import { Event, Interest, MetadataInterest } from '@firefly/cloud';
import { CoreEnum } from '@theory/core';

import { ActionsInterest } from './interest.actions.enum';
import { DocumentSnapshot } from '@theory/firebase';
import { Query } from '@angular/fire/compat/firestore';

export class ActionInterestReset         { static readonly type = ActionsInterest.Reset;         constructor() { } }
export class ActionInterestDirty         { static readonly type = ActionsInterest.Dirty;         constructor() { } }
export class ActionInterestGet           { static readonly type = ActionsInterest.Get;           constructor(public id: string) { } }
export class ActionInterestSet           { static readonly type = ActionsInterest.Set;           constructor(public snapshot: DocumentSnapshot, public data?: Interest) { } }
export class ActionInterestPatch         { static readonly type = ActionsInterest.Patch;         constructor(public partial: Partial<Interest>, public save: boolean = false) { } }
export class ActionInterestPatchMetadata { static readonly type = ActionsInterest.PatchMetadata; constructor(public metadata: Partial<MetadataInterest>) { } }
export class ActionInterestCreate        { static readonly type = ActionsInterest.Create;        constructor() { } }
export class ActionInterestUpdate        { static readonly type = ActionsInterest.Update;        constructor() { } }
export class ActionInterestSave          { static readonly type = ActionsInterest.Save;          constructor() { } }
export class ActionInterestDelete        { static readonly type = ActionsInterest.Delete;        constructor() { } }
export class ActionInterestSetId         { static readonly type = ActionsInterest.SetId;         constructor(public id: string = CoreEnum.IdNew) { } }
export class ActionInterestImagesUpdate  { static readonly type = ActionsInterest.ImagesUpdate;  constructor() { } }
export class ActionInterestImageSet      { static readonly type = ActionsInterest.ImageSet;      constructor() { } }

export class ActionInterestEventsGet          { static readonly type = ActionsInterest.EventsGet;          constructor() { } }
export class ActionInterestEventsGetPending   { static readonly type = ActionsInterest.EventsGetPending;   constructor() { } }
export class ActionInterestEventsGetAnonymous { static readonly type = ActionsInterest.EventsGetAnonymous; constructor() { } }
export class ActionInterestEventsSet          { static readonly type = ActionsInterest.EventsSet;          constructor(public query: Query, public key: string) { } }
export class ActionInterestEventsAdd          { static readonly type = ActionsInterest.EventsAdd;          constructor(public event: Event) { }}
