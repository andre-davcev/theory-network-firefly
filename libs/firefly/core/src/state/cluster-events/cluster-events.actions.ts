
import { ActionsClusterEvents } from './cluster-events.actions.enum';
import { Event } from '@firefly/core/models';

export class ActionImageEventsReset  { static readonly type = ActionsClusterEvents.Reset;  constructor() { } }
export class ActionImageEventsGet    { static readonly type = ActionsClusterEvents.Get;    constructor() { } }
export class ActionImageEventsAdd    { static readonly type = ActionsClusterEvents.Add;    constructor(public payload: Event) { } }
export class ActionImageEventsRemove { static readonly type = ActionsClusterEvents.Remove; constructor(public payload: string) { } }
