import { IonInfiniteScroll, IonSlides } from '@ionic/angular';

import { InterestType, EventType } from '@firefly/core/enums';

import { ActionsApp } from './app.actions.enum';

export class ActionAppLoadingShow       { static readonly type = ActionsApp.LoadingShow; constructor() {} }
export class ActionAppLoadingHide       { static readonly type = ActionsApp.LoadingHide; constructor() {} }

export class ActionAppSlideAlertRestore { static readonly type = ActionsApp.SlideAlertRestore; constructor(public slides: IonSlides) { } }
export class ActionAppSlideAlertIndex   { static readonly type = ActionsApp.SlideAlertIndex;   constructor(public index: number) { } }

export class ActionAppInterestTypeSet    { static readonly type = ActionsApp.InterestTypeSet;    constructor(public interestType: InterestType) { } }
export class ActionAppInterestVirtualSet { static readonly type = ActionsApp.InterestVirtualSet; constructor(public virtual: boolean) { } }

export class ActionAppEventTypeSet    { static readonly type = ActionsApp.EventTypeSet;    constructor(public eventType: EventType) { } }
export class ActionAppEventVirtualSet { static readonly type = ActionsApp.EventVirtualSet; constructor(public virtual: boolean) { } }

export class ActionAppFilterInterests             { static readonly type = ActionsApp.FilterInterests;             constructor(public type?: InterestType) { } }
export class ActionAppFilterInterestsUnsubscribed { static readonly type = ActionsApp.FilterInterestsUnsubscribed; constructor() { } }
export class ActionAppFilterInterestsSubscribed   { static readonly type = ActionsApp.FilterInterestsSubscribed;   constructor() { } }
export class ActionAppFilterInterestsCreated      { static readonly type = ActionsApp.FilterInterestsCreated;      constructor() { } }

export class ActionAppFilterEvents         { static readonly type = ActionsApp.FilterEvents;         constructor(public type?: EventType) { } }
export class ActionAppFilterEventsUpcoming { static readonly type = ActionsApp.FilterEventsUpcoming; constructor() { } }
export class ActionAppFilterEventsCreated  { static readonly type = ActionsApp.FilterEventsCreated;  constructor() { } }

export class ActionAppPageInterests { static readonly type = ActionsApp.PageInterests; constructor(public infiniteScroll: IonInfiniteScroll) { } }
export class ActionAppPageEvents    { static readonly type = ActionsApp.PageEvents;    constructor(public infiniteScroll: IonInfiniteScroll) { } }
