import { IonInfiniteScroll } from '@ionic/angular';

import { InterestType } from '@firefly/core/enums';

import { ActionsInterests } from './interests.actions.enum';

export class ActionInterestsSetType    { static readonly type = ActionsInterests.SetType;    constructor(public type: InterestType) { } }
export class ActionInterestsSetVirtual { static readonly type = ActionsInterests.SetVirtual; constructor(public virtual: boolean) { } }

export class ActionInterestsFilter             { static readonly type = ActionsInterests.Filter;             constructor(public type?: InterestType) { } }
export class ActionInterestsFilterUnsubscribed { static readonly type = ActionsInterests.FilterUnsubscribed; constructor() { } }
export class ActionInterestsFilterSubscribed   { static readonly type = ActionsInterests.FilterSubscribed;   constructor() { } }
export class ActionInterestsFilterCreated      { static readonly type = ActionsInterests.FilterCreated;      constructor() { } }

export class ActionInterestsPage { static readonly type = ActionsInterests.Page; constructor(public infiniteScroll: IonInfiniteScroll) { } }
