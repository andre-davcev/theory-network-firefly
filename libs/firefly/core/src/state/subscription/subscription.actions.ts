import { Subscription } from '@firefly/core/models';

import { ActionsSubscription } from './subscription.actions.enum';
import { CoreEnum } from '@theory/core';

export class ActionSubscriptionReset  { static readonly type = ActionsSubscription.Reset;   constructor() { } }
export class ActionSubscriptionGet    { static readonly type = ActionsSubscription.Get;     constructor(public payload: string = CoreEnum.IdNew) { } }
export class ActionSubscriptionSet    { static readonly type = ActionsSubscription.Set;     constructor(public payload: Subscription) { } }
export class ActionSubscriptionPatch  { static readonly type = ActionsSubscription.Patch;   constructor(public payload: Partial<Subscription>) { } }
export class ActionSubscriptionCreate { static readonly type = ActionsSubscription.Create;  constructor() { } }
export class ActionSubscriptionSave   { static readonly type = ActionsSubscription.Save;    constructor() { } }
export class ActionSubscriptionDelete { static readonly type = ActionsSubscription.Delete;  constructor() { } }
