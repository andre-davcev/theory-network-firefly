
import { ActionsImageEvents } from './image-events.actions.enum';
import { Event } from '@firefly/core/models';

export class ActionImageEventsReset  { static readonly type = ActionsImageEvents.Reset;  constructor() { } }
export class ActionImageEventsGet    { static readonly type = ActionsImageEvents.Get;    constructor() { } }
export class ActionImageEventsAdd    { static readonly type = ActionsImageEvents.Add;    constructor(public payload: Event) { } }
export class ActionImageEventsRemove { static readonly type = ActionsImageEvents.Remove; constructor(public payload: string) { } }
