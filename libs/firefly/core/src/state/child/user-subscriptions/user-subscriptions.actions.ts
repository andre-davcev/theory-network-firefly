import { Subscription, SubscriptionPartial } from '@firefly/cloud';

import { ActionsUserSubscriptions } from './user-subscriptions.actions.enum';
import { DocumentSnapshot } from '@theory/firebase';

export class ActionUserSubscriptionsReset   { static readonly type = ActionsUserSubscriptions.Reset;   constructor() { } }
export class ActionUserSubscriptionsGetData { static readonly type = ActionsUserSubscriptions.GetData; constructor() { } }
export class ActionUserSubscriptionsSetData { static readonly type = ActionsUserSubscriptions.SetData; constructor(public data: Record<string, SubscriptionPartial>, public fetch: boolean = false) { } }
export class ActionUserSubscriptionsGet     { static readonly type = ActionsUserSubscriptions.Get;     constructor() { } }
export class ActionUserSubscriptionsAdd     { static readonly type = ActionsUserSubscriptions.Add;     constructor(public snapshot: DocumentSnapshot, public entity?: Subscription) { } }
export class ActionUserSubscriptionsRemove  { static readonly type = ActionsUserSubscriptions.Remove;  constructor(public id: string) { } }
export class ActionUserSubscriptionsSync    { static readonly type = ActionsUserSubscriptions.Sync;    constructor(public object: Subscription) { } }

export class ActionUserSubscriptionsSetSubscriptions { static readonly type = ActionsUserSubscriptions.SetSubscriptions; constructor(public subscriptions: Record<string, SubscriptionPartial>) { } }
