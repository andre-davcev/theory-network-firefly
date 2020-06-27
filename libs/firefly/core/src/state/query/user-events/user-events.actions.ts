import { Event } from '@firefly/cloud';

import { ActionsUserEvents } from './user-events.actions.enum';
import { firestore } from 'firebase/app';

export class ActionUserEventsReset   { static readonly type = ActionsUserEvents.Reset;   constructor() { } }
export class ActionUserEventsGetData { static readonly type = ActionsUserEvents.GetData; constructor() { } }
export class ActionUserEventsGet     { static readonly type = ActionsUserEvents.Get;     constructor() { } }
export class ActionUserEventsAdd     { static readonly type = ActionsUserEvents.Add;     constructor(public snapshot: firestore.DocumentSnapshot, public entity?: Event) { } }
export class ActionUserEventsRemove  { static readonly type = ActionsUserEvents.Remove;  constructor(public id: string) { } }
export class ActionUserEventsSync    { static readonly type = ActionsUserEvents.Sync;    constructor(public object: Event) { } }

export class ActionUserEventsDelete { static readonly type = ActionsUserEvents.Delete; constructor(public id: string) { } }
