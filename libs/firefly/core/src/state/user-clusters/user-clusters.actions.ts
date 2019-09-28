import { SortField } from '@theory/state';
import { Cluster, UserCluster } from '@firefly/core/models';

import { ActionsUserClusters } from './user-clusters.actions.enum';

export class ActionUserClustersReset   { static readonly type = ActionsUserClusters.Reset;   constructor() { } }
export class ActionUserClustersGetData { static readonly type = ActionsUserClusters.GetData; constructor() { } }
export class ActionUserClustersGet     { static readonly type = ActionsUserClusters.Get;     constructor() { } }
export class ActionUserClustersSet     { static readonly type = ActionsUserClusters.Set;     constructor(public payload: Record<string, UserCluster>) { } }
export class ActionUserClustersSort    { static readonly type = ActionsUserClusters.Sort;    constructor(public payload?: SortField) { } }
export class ActionUserClustersAdd     { static readonly type = ActionsUserClusters.Add;     constructor(public payload: Cluster) { } }
export class ActionUserClustersRemove  { static readonly type = ActionsUserClusters.Remove;  constructor(public payload: string) { } }
export class ActionUserClustersDelete  { static readonly type = ActionsUserClusters.Delete;  constructor() { } }
