

import { ActionsMobile } from './mobile.actions.enum';
import { Pages } from '@firefly/mobile/enums';
import { IonInfiniteScroll, IonSlides } from '@ionic/angular';
import { InterestType, EventType } from '@firefly/core';

export class ActionMobileLoadingShow       { static readonly type = ActionsMobile.LoadingShow;       constructor() {} }
export class ActionMobileLoadingHide       { static readonly type = ActionsMobile.LoadingHide;       constructor() {} }
export class ActionMobileToast             { static readonly type = ActionsMobile.Toast;             constructor(public payload: string) {} }
export class ActionMobileMenuOpened        { static readonly type = ActionsMobile.MenuOpened;        constructor() {} }
export class ActionMobileMenuClosed        { static readonly type = ActionsMobile.MenuClosed;        constructor() {} }
export class ActionMobileNavigateRoot      { static readonly type = ActionsMobile.NavigateRoot;      constructor(public page: Pages, public child?: string ) {} }
export class ActionMobileAuthSelect        { static readonly type = ActionsMobile.AuthSelect;        constructor() {} }
export class ActionMobileAuthSelected      { static readonly type = ActionsMobile.AuthSelected;      constructor(public page: Pages.Login | Pages.SignUp | Pages.ResetPassword ) {} }
export class ActionMobileSlideAlertRestore { static readonly type = ActionsMobile.SlideAlertRestore; constructor(public slides: IonSlides) { } }
export class ActionMobileSlideAlertIndex   { static readonly type = ActionsMobile.SlideAlertIndex;   constructor(public index: number) { } }

export class ActionMobileFilterInterests             { static readonly type = ActionsMobile.FilterInterests;             constructor(public type?: InterestType) { } }
export class ActionMobileFilterInterestsUnsubscribed { static readonly type = ActionsMobile.FilterInterestsUnsubscribed; constructor() { } }
export class ActionMobileFilterInterestsSubscribed   { static readonly type = ActionsMobile.FilterInterestsSubscribed;   constructor() { } }
export class ActionMobileFilterInterestsCreated      { static readonly type = ActionsMobile.FilterInterestsCreated;      constructor() { } }

export class ActionMobileFilterEvents         { static readonly type = ActionsMobile.FilterEvents;         constructor(public type?: EventType) { } }
export class ActionMobileFilterEventsUpcoming { static readonly type = ActionsMobile.FilterEventsUpcoming; constructor() { } }
export class ActionMobileFilterEventsCreated  { static readonly type = ActionsMobile.FilterEventsCreated;  constructor() { } }

export class ActionMobilePageInterests { static readonly type = ActionsMobile.PageInterests; constructor(public infiniteScroll: IonInfiniteScroll) { } }
export class ActionMobilePageEvents    { static readonly type = ActionsMobile.PageEvents;    constructor(public infiniteScroll: IonInfiniteScroll) { } }
