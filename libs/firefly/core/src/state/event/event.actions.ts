import { Event } from '@firefly/core/models';
import { AssetKey, EventKey } from '@firefly/core/models';
import { CoreEnum } from '@theory/core';

import { ActionsEvent } from './event.actions.enum';
import { Result } from 'ngx-mapbox-gl/lib/control/geocoder-control.directive';

export class ActionGetEvents
{
    static readonly type = ActionsEvent.GetEvents;

    constructor() {}
}

export class ActionEventSetId
{
    static readonly type = ActionsEvent.SetId;

    constructor(public payload: string = CoreEnum.IdNew) { }
}

export class ActionEventSet
{
    static readonly type = ActionsEvent.SetEvent;

    constructor(public payload: Event) {}
}

export class ActionEventWatch
{
    static readonly type = ActionsEvent.WatchEvent;

    constructor(public id: string, public event: Event) { }
}

export class ActionEventPatch
{
    static readonly type = ActionsEvent.PatchEvent;

    constructor(public key: AssetKey | EventKey, public value: any ) { }
}

export class ActionEventSetLocation
{
    static readonly type = ActionsEvent.SetEventLocation;

    constructor(public payload: Result) { }
}

export class ActionEventSetImage
{
    static readonly type = ActionsEvent.SetImage;

    constructor(public payload: string) { }
}

export class ActionEventSave
{
    static readonly type = ActionsEvent.SaveEvent;

    constructor() { }
}

export class ActionEventCreate
{
    static readonly type = ActionsEvent.CreateEvent;

    constructor() { }
}

export class ActionEventUpdate
{
    static readonly type = ActionsEvent.UpdateEvent;

    constructor() { }
}
