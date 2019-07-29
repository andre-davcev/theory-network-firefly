import { ActionsUserEvents } from './user-events.actions.enum';
import { Event } from '@firefly/core/models';

export class ActionUserEventsReset  { static readonly type = ActionsUserEvents.Reset;  constructor() { } }
export class ActionUserEventsGet    { static readonly type = ActionsUserEvents.Get;    constructor() { } }
export class ActionUserEventsAdd    { static readonly type = ActionsUserEvents.Add;    constructor(public payload: Event) { } }
export class ActionUserEventsRemove { static readonly type = ActionsUserEvents.Remove; constructor(public payload: string) { } }
