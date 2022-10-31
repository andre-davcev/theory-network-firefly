import { IonInfiniteScroll } from '@ionic/angular';

import { InterestType } from '../../../enums';

import { ActionsInterests } from './interests.actions.enum';
import { InterestsFilter } from './interests.filter.model';
import { SubscriptionPartial } from '@firefly/cloud';

export class ActionInterestsSetType            { static readonly type = ActionsInterests.SetType;            constructor(public type: InterestType) { } }
export class ActionInterestsSetVirtual         { static readonly type = ActionsInterests.SetVirtual;         constructor(public virtual: boolean) { } }
export class ActionInterestsSetSubscriptions   { static readonly type = ActionsInterests.SetSubscriptions;   constructor(public subscriptions: Record<string, SubscriptionPartial>, public save?: boolean) { } }
export class ActionInterestsFilter             { static readonly type = ActionsInterests.Filter;             constructor(public filter?: InterestsFilter) { } }
export class ActionInterestsPage               { static readonly type = ActionsInterests.Page;               constructor(public infiniteScroll?: IonInfiniteScroll) { } }

export class ActionInterestsSubscriptionToggle  { static readonly type = ActionsInterests.SubscriptionToggle; constructor(public id: string, public permanent: boolean = false) { } }
export class ActionInterestsSubscriptionAdd     { static readonly type = ActionsInterests.SubscriptionAdd;    constructor(public id: string) { } }
export class ActionInterestsSubscriptionRemove  { static readonly type = ActionsInterests.SubscriptionRemove; constructor(public id: string) { } }
export class ActionInterestsSubscriptionOnOff   { static readonly type = ActionsInterests.SubscriptionOnOff;  constructor(public id: string, public on: boolean) { } }
