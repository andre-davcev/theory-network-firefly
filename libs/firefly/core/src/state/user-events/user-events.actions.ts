import { Event } from '@firefly/core/models';

import { ActionsUserEvents } from './user-events.actions.enum';

export class ActionUserEventsGetData { static readonly type = ActionsUserEvents.GetData; constructor() { } }
export class ActionUserEventsGet     { static readonly type = ActionsUserEvents.Get;     constructor() { } }
export class ActionUserEventsAdd     { static readonly type = ActionsUserEvents.Add;     constructor(public payload: Event) { } }
export class ActionUserEventsRemove  { static readonly type = ActionsUserEvents.Remove;  constructor(public payload: string) { } }
export class ActionUserEventsSync    { static readonly type = ActionsUserEvents.Sync;    constructor(public payload: Event) { } }
