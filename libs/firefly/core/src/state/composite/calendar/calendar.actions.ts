import { IonInfiniteScroll } from '@ionic/angular';

import { EventType } from '@firefly/core/enums';

import { ActionsCalendar } from './calendar.actions.enum';

export class ActionCalendarSetType    { static readonly type = ActionsCalendar.SetType;    constructor(public type: EventType) { } }
export class ActionCalendarSetVirtual { static readonly type = ActionsCalendar.SetVirtual; constructor(public virtual: boolean) { } }

export class ActionCalendarFilter         { static readonly type = ActionsCalendar.Filter;         constructor(public type?: EventType) { } }
export class ActionCalendarFilterUpcoming { static readonly type = ActionsCalendar.FilterUpcoming; constructor() { } }
export class ActionCalendarFilterCreated  { static readonly type = ActionsCalendar.FilterCreated;  constructor() { } }

export class ActionCalendarPage { static readonly type = ActionsCalendar.Page; constructor(public infiniteScroll: IonInfiniteScroll) { } }
