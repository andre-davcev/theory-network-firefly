import { SortField } from '@theory/state';
import { Subscription, UserSubscription } from '@firefly/core/models';

import { ActionsUserSubscriptions } from './user-subscriptions.actions.enum';

export class ActionUserSubscriptionsReset   { static readonly type = ActionsUserSubscriptions.Reset;   constructor() { } }
export class ActionUserSubscriptionsGetData { static readonly type = ActionsUserSubscriptions.GetData; constructor(public fetch: boolean = true) { } }
export class ActionUserSubscriptionsGet     { static readonly type = ActionsUserSubscriptions.Get;     constructor() { } }
export class ActionUserSubscriptionsSet     { static readonly type = ActionsUserSubscriptions.Set;     constructor(public payload: Record<string, UserSubscription>) { } }
export class ActionUserSubscriptionsSort    { static readonly type = ActionsUserSubscriptions.Sort;    constructor(public payload?: SortField) { } }
export class ActionUserSubscriptionsAdd     { static readonly type = ActionsUserSubscriptions.Add;     constructor(public payload: Subscription) { } }
export class ActionUserSubscriptionsRemove  { static readonly type = ActionsUserSubscriptions.Remove;  constructor(public payload: string) { } }
export class ActionUserSubscriptionsDelete  { static readonly type = ActionsUserSubscriptions.Delete;  constructor() { } }

export class ActionUserSubscriptionsOn  { static readonly type = ActionsUserSubscriptions.On;  constructor(public payload: string) { } }
export class ActionUserSubscriptionsOff { static readonly type = ActionsUserSubscriptions.Off; constructor(public payload: string) { } }
