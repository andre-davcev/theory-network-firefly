import { Event } from '@firefly/core/models';
import { AssetKey, EventKey } from '@firefly/core/models';

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

export class ActionEventPatch
{
    static readonly type = ActionsEvent.Patch;

    constructor(public key: AssetKey | EventKey, public value: any ) { }
}
