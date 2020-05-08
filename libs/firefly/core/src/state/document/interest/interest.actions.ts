import { Interest, MetadataInterest } from '@firefly/cloud';
import { CoreEnum } from '@theory/core';

import { ActionsInterest } from './interest.actions.enum';
import { firestore } from 'firebase/app';
import { MockIconPath } from '@firefly/core/mocks';

export class ActionInterestReset         { static readonly type = ActionsInterest.Reset;         constructor() { } }
export class ActionInterestDirty         { static readonly type = ActionsInterest.Dirty;         constructor() { } }
export class ActionInterestGet           { static readonly type = ActionsInterest.Get;           constructor(public id: string) { } }
export class ActionInterestSet           { static readonly type = ActionsInterest.Set;           constructor(public snapshot: firestore.DocumentSnapshot, public data?: Interest) { } }
export class ActionInterestPatch         { static readonly type = ActionsInterest.Patch;         constructor(public partial: Partial<Interest>, public save: boolean = false) { } }
export class ActionInterestPatchMetadata { static readonly type = ActionsInterest.PatchMetadata; constructor(public metadata: Partial<MetadataInterest>) { } }
export class ActionInterestCreate        { static readonly type = ActionsInterest.Create;        constructor() { } }
export class ActionInterestUpdate        { static readonly type = ActionsInterest.Update;        constructor() { } }
export class ActionInterestSave          { static readonly type = ActionsInterest.Save;          constructor() { } }
export class ActionInterestDelete        { static readonly type = ActionsInterest.Delete;        constructor() { } }
export class ActionInterestSetId         { static readonly type = ActionsInterest.SetId;         constructor(public id: string = CoreEnum.IdNew) { } }

export class ActionInterestSetIdAnonymous { static readonly type = ActionsInterest.SetIdAnonymous;   constructor(public id: string = CoreEnum.IdNew) { } }

export class ActionInterestEventsGet   { static readonly type = ActionsInterest.EventsGet; constructor() { } }
export class ActionInterestEventsReset { static readonly type = ActionsInterest.EventsReset; constructor() { }}

export class ActionInterestEventsGetAnonymous   { static readonly type = ActionsInterest.EventsGetAnonymous; constructor() { } }
