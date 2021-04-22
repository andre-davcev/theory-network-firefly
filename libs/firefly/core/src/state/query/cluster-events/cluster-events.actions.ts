
import { DocumentSnapshot } from '@theory/firebase';

import { Interest } from '@firefly/cloud';

import { ActionsUserInterests } from './cluster-events.actions.enum';

export class ActionUserInterestsReset   { static readonly type = ActionsUserInterests.Reset;   constructor() { } }
export class ActionUserInterestsGetData { static readonly type = ActionsUserInterests.GetData; constructor() { } }
export class ActionUserInterestsGet     { static readonly type = ActionsUserInterests.Get;     constructor() { } }
export class ActionUserInterestsAdd     { static readonly type = ActionsUserInterests.Add;     constructor(public snapshot: DocumentSnapshot, public entity?: Interest) { } }
export class ActionUserInterestsRemove  { static readonly type = ActionsUserInterests.Remove;  constructor(public id: string) { } }
export class ActionUserInterestsSync    { static readonly type = ActionsUserInterests.Sync;    constructor(public object: Interest) { } }
