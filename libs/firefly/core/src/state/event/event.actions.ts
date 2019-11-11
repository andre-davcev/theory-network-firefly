import { Result } from 'ngx-mapbox-gl/lib/control/geocoder-control.directive';

import { CoreEnum } from '@theory/core';
import { Event } from '@firefly/core/models';

import { ActionsEvent } from './event.actions.enum';

export class ActionEventReset  { static readonly type = ActionsEvent.Reset;   constructor() { } }
export class ActionEventGet    { static readonly type = ActionsEvent.Get;     constructor(public payload: string) { } }
export class ActionEventSetId  { static readonly type = ActionsEvent.SetId;   constructor(public payload: string = CoreEnum.IdNew) { } }
export class ActionEventSet    { static readonly type = ActionsEvent.Set;     constructor(public payload: Event) { } }
export class ActionEventPatch  { static readonly type = ActionsEvent.Patch;   constructor(public payload: Partial<Event>) { } }
export class ActionEventCreate { static readonly type = ActionsEvent.Create;  constructor() { } }
export class ActionEventSave   { static readonly type = ActionsEvent.Save;    constructor() { } }
export class ActionEventDelete { static readonly type = ActionsEvent.Delete;  constructor() { } }

export class ActionEventImageAdd    { static readonly type = ActionsEvent.ImageAdd;    constructor() { } }
export class ActionEventImageRemove { static readonly type = ActionsEvent.ImageRemove; constructor() { } }
export class ActionEventLocationSet { static readonly type = ActionsEvent.LocationSet; constructor(public payload: Result) { } }
export class ActionEventTimeSet     { static readonly type = ActionsEvent.TimeSet;     constructor(public key: 'start' | 'end', public value: string) { } }
