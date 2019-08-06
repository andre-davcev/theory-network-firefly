import { ActionsUserEvents } from './user-events.actions.enum';
import { Event, UserEvent } from '@firefly/core/models';
import { SortField } from '@theory/state';

export class ActionUserEventsReset     { static readonly type = ActionsUserEvents.Reset;     constructor() { } }
export class ActionUserEventsGetData   { static readonly type = ActionsUserEvents.GetData;   constructor() { } }
export class ActionUserEventsSet       { static readonly type = ActionsUserEvents.Set;       constructor(public payload: Record<string, UserEvent>) { } }
export class ActionUserEventsSort      { static readonly type = ActionsUserEvents.Sort;      constructor(public payload?: Array<SortField>) { } }
export class ActionUserEventsGet       { static readonly type = ActionsUserEvents.Get;       constructor() { } }
export class ActionUserEventsAdd       { static readonly type = ActionsUserEvents.Add;       constructor(public payload:  Event) { } }
export class ActionUserEventsRemove    { static readonly type = ActionsUserEvents.Remove;    constructor(public payload:  string) { } }
