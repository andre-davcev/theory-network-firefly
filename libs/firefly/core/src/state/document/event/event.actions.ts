import { Result } from 'ngx-mapbox-gl/lib/control/geocoder-control.directive';

import { CoreEnum } from '@theory/core';
import { Event, Interest } from '@firefly/cloud';

import { ActionsEvent } from './event.actions.enum';
import { firestore } from 'firebase';
import { MockImagePath } from '@firefly/core/mocks';

export class ActionEventReset  { static readonly type = ActionsEvent.Reset;   constructor() { } }
export class ActionEventGet    { static readonly type = ActionsEvent.Get;     constructor(public id: string) { } }
export class ActionEventSet    { static readonly type = ActionsEvent.Set;     constructor(public snapshot: firestore.DocumentSnapshot, public data?: Event) { } }
export class ActionEventPatch  { static readonly type = ActionsEvent.Patch;   constructor(public partial: Partial<Event>, public save: boolean = false) { } }
export class ActionEventCreate { static readonly type = ActionsEvent.Create;  constructor() { } }
export class ActionEventUpdate { static readonly type = ActionsEvent.Update;  constructor() { } }
export class ActionEventSave   { static readonly type = ActionsEvent.Save;    constructor() { } }
export class ActionEventDelete { static readonly type = ActionsEvent.Delete;  constructor() { } }
export class ActionEventSetId  { static readonly type = ActionsEvent.SetId;   constructor(public id: string = CoreEnum.IdNew) { } }

export class ActionEventImageClear   { static readonly type = ActionsEvent.ImageClear;   constructor() { } }
export class ActionEventImageUriSet  { static readonly type = ActionsEvent.ImageUriSet;  constructor(public dataUri: string) { } }
export class ActionEventImagePathSet { static readonly type = ActionsEvent.ImagePathSet; constructor(public bucketPath: string = MockImagePath) { } }
export class ActionEventImageCreate  { static readonly type = ActionsEvent.ImageCreate;  constructor() { } }

export class ActionEventLocationSet  { static readonly type = ActionsEvent.LocationSet;  constructor(public result: Result) { } }
export class ActionEventInterestAdd  { static readonly type = ActionsEvent.InterestAdd;  constructor(public interest: Interest) { }}
