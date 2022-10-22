import { Subscription, MetadataInterest } from '@firefly/cloud';

import { ActionsSubscription } from './subscription.actions.enum';
import { CoreEnum } from '@theory/core';
import { DocumentSnapshot } from '@theory/firebase';

export class ActionSubscriptionReset         { static readonly type = ActionsSubscription.Reset;         constructor() { } }
export class ActionSubscriptionGet           { static readonly type = ActionsSubscription.Get;           constructor(public id: string) { } }
export class ActionSubscriptionSet           { static readonly type = ActionsSubscription.Set;           constructor(public snapshot: DocumentSnapshot, public data?: Subscription) { } }
export class ActionSubscriptionPatch         { static readonly type = ActionsSubscription.Patch;         constructor(public partial: Partial<Subscription>, public save: boolean = false) { } }
export class ActionSubscriptionPatchMetadata { static readonly type = ActionsSubscription.PatchMetadata; constructor(public metadata: Partial<MetadataInterest>) { } }
export class ActionSubscriptionCreate        { static readonly type = ActionsSubscription.Create;        constructor() { } }
export class ActionSubscriptionUpdate        { static readonly type = ActionsSubscription.Update;        constructor() { } }
export class ActionSubscriptionSave          { static readonly type = ActionsSubscription.Save;          constructor() { } }
export class ActionSubscriptionDelete        { static readonly type = ActionsSubscription.Delete;        constructor() { } }
export class ActionSubscriptionSetId         { static readonly type = ActionsSubscription.SetId;         constructor(public id: string = CoreEnum.IdNew) { } }
