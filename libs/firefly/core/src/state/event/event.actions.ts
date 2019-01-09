import { Event } from '@firefly/core/models';

import { ActionsEvent } from './event.actions.enum';

export class ActionGetEvents
{
    static readonly type = ActionsEvent.GetEvents;

    constructor() {}
}

export class ActionSetEventId
{
    static readonly type = ActionsEvent.SetEventId;

    constructor(public payload: string) { }
}

export class ActionSetEvent
{
    static readonly type = ActionsEvent.SetEvent;

    constructor(public payload: Event) {}
}
