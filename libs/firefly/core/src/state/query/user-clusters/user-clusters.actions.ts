
import { firestore } from 'firebase/app';

import { Cluster } from '@firefly/core/documents';

import { ActionsUserClusters } from './user-clusters.actions.enum';

export class ActionUserClustersReset   { static readonly type = ActionsUserClusters.Reset;   constructor() { } }
export class ActionUserClustersGetData { static readonly type = ActionsUserClusters.GetData; constructor() { } }
export class ActionUserClustersGet     { static readonly type = ActionsUserClusters.Get;     constructor() { } }
export class ActionUserClustersAdd     { static readonly type = ActionsUserClusters.Add;     constructor(public snapshot: firestore.DocumentSnapshot, public entity?: Cluster) { } }
export class ActionUserClustersRemove  { static readonly type = ActionsUserClusters.Remove;  constructor(public id: string) { } }
export class ActionUserClustersSync    { static readonly type = ActionsUserClusters.Sync;    constructor(public object: Cluster) { } }
