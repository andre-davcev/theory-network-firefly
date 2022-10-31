import { DocumentSnapshot } from '@theory/firebase';
import { Event } from '@firefly/cloud';

import { ActionsUserEvents } from './user-events.actions.enum';
import { CalendarFilter } from '../../composite/calendar/calendar.filter.model';

export class ActionUserEventsReset   { static readonly type = ActionsUserEvents.Reset; }
export class ActionUserEventsGetData { static readonly type = ActionsUserEvents.GetData; }
export class ActionUserEventsGet     { static readonly type = ActionsUserEvents.Get; }
export class ActionUserEventsAdd     { static readonly type = ActionsUserEvents.Add;     constructor(public snapshot: DocumentSnapshot, public entity?: Event) { } }
export class ActionUserEventsRemove  { static readonly type = ActionsUserEvents.Remove;  constructor(public id: string) { } }
export class ActionUserEventsSync    { static readonly type = ActionsUserEvents.Sync;    constructor(public object: Event) { } }
export class ActionUserEventsFilter  { static readonly type = ActionsUserEvents.Filter;  constructor(public filter?: CalendarFilter) { } }

export class ActionUserEventsDelete { static readonly type = ActionsUserEvents.Delete; constructor(public id: string) { } }
