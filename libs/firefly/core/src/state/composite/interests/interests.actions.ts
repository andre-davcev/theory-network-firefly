import { IonInfiniteScroll } from '@ionic/angular';

import { InterestType } from '@firefly/core/enums';

import { ActionsInterests } from './interests.actions.enum';

export class ActionInterestsSetType            { static readonly type = ActionsInterests.SetType;            constructor(public type: InterestType) { } }
export class ActionInterestsSetVirtual         { static readonly type = ActionsInterests.SetVirtual;         constructor(public virtual: boolean) { } }
export class ActionInterestsFilter             { static readonly type = ActionsInterests.Filter;             constructor(public type?: InterestType) { } }
export class ActionInterestsPage               { static readonly type = ActionsInterests.Page;               constructor(public infiniteScroll: IonInfiniteScroll) { } }
export class ActionInterestsWatchSubscriptions { static readonly type = ActionsInterests.WatchSubscriptions; constructor() { } }
