import { IonInfiniteScroll } from '@ionic/angular';

import { EventType } from '@firefly/shared/enums';

import { ActionsCalendar } from './calendar.actions.enum';
import { CalendarFilter } from './calendar.filter.model';

export class ActionCalendarSetType    { static readonly type = ActionsCalendar.SetType;    constructor(public type: EventType) { } }
export class ActionCalendarSetVirtual { static readonly type = ActionsCalendar.SetVirtual; constructor(public virtual: boolean) { } }
export class ActionCalendarFilter     { static readonly type = ActionsCalendar.Filter;     constructor(public filter?: CalendarFilter) { } }
export class ActionCalendarPage       { static readonly type = ActionsCalendar.Page;       constructor(public infiniteScroll: IonInfiniteScroll) { } }
