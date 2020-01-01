import { StreamCluster } from '@firefly/cloud';

import { ActionsUserStream } from './user-stream.actions.enum';
import { firestore } from 'firebase/app';

export class ActionUserStreamReset   { static readonly type = ActionsUserStream.Reset;   constructor() { } }
export class ActionUserStreamGetData { static readonly type = ActionsUserStream.GetData; constructor(public id: string, public fetch: boolean = false) { } }
export class ActionUserStreamSetData { static readonly type = ActionsUserStream.SetData; constructor(public data: Record<string, StreamCluster>, public fetch: boolean = false) { } }
export class ActionUserStreamGet     { static readonly type = ActionsUserStream.Get;     constructor() { } }
export class ActionUserStreamAdd     { static readonly type = ActionsUserStream.Add;     constructor(public snapshot: firestore.DocumentSnapshot, public entity?: StreamCluster) { } }
export class ActionUserStreamRemove  { static readonly type = ActionsUserStream.Remove;  constructor(public id: string) { } }
export class ActionUserStreamSync    { static readonly type = ActionsUserStream.Sync;    constructor(public object: StreamCluster) { } }
