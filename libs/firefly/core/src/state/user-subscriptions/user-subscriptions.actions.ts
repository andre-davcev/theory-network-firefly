import { SortField } from '@theory/state';
import { Subscription, UserSubscription } from '@firefly/core/models';

import { ActionsUserSubscriptions } from './user-subscriptions.actions.enum';

export class ActionUserSubscriptionsReset     { static readonly type = ActionsUserSubscriptions.Reset;     constructor() { } }
export class ActionUserSubscriptionsGetData   { static readonly type = ActionsUserSubscriptions.GetData;   constructor() { } }
export class ActionUserSubscriptionsGet       { static readonly type = ActionsUserSubscriptions.Get;       constructor() { } }
export class ActionUserSubscriptionsSet       { static readonly type = ActionsUserSubscriptions.Set;       constructor(public payload: Record<string, UserSubscription>) { } }
export class ActionUserSubscriptionsSort      { static readonly type = ActionsUserSubscriptions.Sort;      constructor(public payload?: SortField) { } }
export class ActionUserSubscriptionsAdd       { static readonly type = ActionsUserSubscriptions.Add;       constructor(public payload: Subscription) { } }
export class ActionUserSubscriptionsRemove    { static readonly type = ActionsUserSubscriptions.Remove;    constructor(public payload: string) { } }
