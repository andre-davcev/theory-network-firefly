import { StreamInterest } from '@firefly/cloud';

import { ActionsCityStream } from './city-stream.actions.enum';
import { firestore } from 'firebase/app';

export class ActionCityStreamReset   { static readonly type = ActionsCityStream.Reset;   constructor() { } }
export class ActionCityStreamGetData { static readonly type = ActionsCityStream.GetData; constructor(public id: string, public fetch: boolean = false) { } }
export class ActionCityStreamSetData { static readonly type = ActionsCityStream.SetData; constructor(public data: Record<string, StreamInterest>, public fetch: boolean = false) { } }
export class ActionCityStreamGet     { static readonly type = ActionsCityStream.Get;     constructor() { } }
export class ActionCityStreamAdd     { static readonly type = ActionsCityStream.Add;     constructor(public snapshot: firestore.DocumentSnapshot, public entity?: StreamInterest) { } }
export class ActionCityStreamRemove  { static readonly type = ActionsCityStream.Remove;  constructor(public id: string) { } }
export class ActionCityStreamSync    { static readonly type = ActionsCityStream.Sync;    constructor(public object: StreamInterest) { } }
