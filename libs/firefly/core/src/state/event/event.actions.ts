import { Event } from '@firefly/core/models';
import { CoreEnum } from '@theory/core';

import { ActionsEvent } from './event.actions.enum';
import { Result } from 'ngx-mapbox-gl/lib/control/geocoder-control.directive';

export class ActionEventReset       { static readonly type = ActionsEvent.Reset;     constructor() { }}
export class ActionEventGet         { static readonly type = ActionsEvent.Get;       constructor(public payload: string = CoreEnum.IdNew) { } }
export class ActionEventCreate      { static readonly type = ActionsEvent.Create;    constructor() { } }
export class ActionEventDelete      { static readonly type = ActionsEvent.Delete;    constructor() { } }
export class ActionEventPatch       { static readonly type = ActionsEvent.Patch;     constructor() { } }
export class ActionEventPatchForm   { static readonly type = ActionsEvent.PatchForm; constructor(public payload: Event) {} }
export class ActionEventLocationSet { static readonly type = ActionsEvent.LocationSet;   constructor(public payload: Result) { } }
export class ActionEventImageSet    { static readonly type = ActionsEvent.ImageSet;      constructor(public payload?: string) { } }
export class ActionEventTimeSet     { static readonly type = ActionsEvent.TimeSet;       constructor(public key: 'start' | 'end', public value: string) { } }
