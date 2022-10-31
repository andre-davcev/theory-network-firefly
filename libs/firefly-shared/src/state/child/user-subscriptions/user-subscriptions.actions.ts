import { DocumentSnapshot } from '@theory/firebase';
import { Subscription, SubscriptionPartial } from '@firefly/cloud';

import { ActionsUserSubscriptions } from './user-subscriptions.actions.enum';
import { InterestsFilter } from '../../composite/interests/interests.filter.model';

export class ActionUserSubscriptionsReset   { static readonly type = ActionsUserSubscriptions.Reset; }
export class ActionUserSubscriptionsGetData { static readonly type = ActionsUserSubscriptions.GetData; }
export class ActionUserSubscriptionsSetData { static readonly type = ActionsUserSubscriptions.SetData; constructor(public data: Record<string, SubscriptionPartial>, public fetch: boolean = false) { } }
export class ActionUserSubscriptionsGet     { static readonly type = ActionsUserSubscriptions.Get; }
export class ActionUserSubscriptionsAdd     { static readonly type = ActionsUserSubscriptions.Add;     constructor(public snapshot: DocumentSnapshot, public entity?: Subscription) { } }
export class ActionUserSubscriptionsRemove  { static readonly type = ActionsUserSubscriptions.Remove;  constructor(public id: string) { } }
export class ActionUserSubscriptionsSync    { static readonly type = ActionsUserSubscriptions.Sync;    constructor(public object: Subscription) { } }
export class ActionUserSubscriptionsFilter  { static readonly type = ActionsUserSubscriptions.Filter; constructor(public filter: InterestsFilter) { } }
