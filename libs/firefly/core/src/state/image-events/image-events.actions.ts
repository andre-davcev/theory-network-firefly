import { SortField } from '@theory/state';
import { Event, ImageEvent } from '@firefly/core/models';

import { ActionsImageEvents } from './image-events.actions.enum';

export class ActionImageEventsReset   { static readonly type = ActionsImageEvents.Reset;   constructor() { } }
export class ActionImageEventsGetData { static readonly type = ActionsImageEvents.GetData; constructor(public fetch: boolean = true) { } }
export class ActionImageEventsGet     { static readonly type = ActionsImageEvents.Get;     constructor() { } }
export class ActionImageEventsSet     { static readonly type = ActionsImageEvents.Set;     constructor(public payload: Record<string, ImageEvent>) { } }
export class ActionImageEventsSort    { static readonly type = ActionsImageEvents.Sort;    constructor(public payload?: SortField) { } }
export class ActionImageEventsAdd     { static readonly type = ActionsImageEvents.Add;     constructor(public payload: Event) { } }
export class ActionImageEventsRemove  { static readonly type = ActionsImageEvents.Remove;  constructor(public payload: string) { } }
export class ActionImageEventsSync    { static readonly type = ActionsImageEvents.Sync;    constructor(public payload: Event) { } }
export class ActionImageEventsDelete  { static readonly type = ActionsImageEvents.Delete;  constructor() { } }
