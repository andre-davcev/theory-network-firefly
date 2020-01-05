import { Subscription } from '@firefly/cloud';

import { ActionsUserSubscriptions } from './user-subscriptions.actions.enum';
import { firestore } from 'firebase/app';

export class ActionUserSubscriptionsReset   { static readonly type = ActionsUserSubscriptions.Reset;   constructor() { } }
export class ActionUserSubscriptionsGetData { static readonly type = ActionsUserSubscriptions.GetData; constructor() { } }
export class ActionUserSubscriptionsSetData { static readonly type = ActionsUserSubscriptions.SetData; constructor(public data: Record<string, Subscription>, public fetch: boolean = false) { } }
export class ActionUserSubscriptionsGet     { static readonly type = ActionsUserSubscriptions.Get;     constructor() { } }
export class ActionUserSubscriptionsAdd     { static readonly type = ActionsUserSubscriptions.Add;     constructor(public snapshot: firestore.DocumentSnapshot, public entity?: Subscription) { } }
export class ActionUserSubscriptionsRemove  { static readonly type = ActionsUserSubscriptions.Remove;  constructor(public id: string) { } }
export class ActionUserSubscriptionsSync    { static readonly type = ActionsUserSubscriptions.Sync;    constructor(public object: Subscription) { } }
