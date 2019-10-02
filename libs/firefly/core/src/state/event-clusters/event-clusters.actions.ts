import { SortField } from '@theory/state';
import { Cluster, EventCluster } from '@firefly/core/models';

import { ActionsEventClusters } from './event-clusters.actions.enum';

export class ActionEventClustersReset   { static readonly type = ActionsEventClusters.Reset;   constructor() { } }
export class ActionEventClustersGetData { static readonly type = ActionsEventClusters.GetData; constructor(public fetch: boolean = true) { } }
export class ActionEventClustersGet     { static readonly type = ActionsEventClusters.Get;     constructor() { } }
export class ActionEventClustersSet     { static readonly type = ActionsEventClusters.Set;     constructor(public payload: Record<string, EventCluster>) { } }
export class ActionEventClustersSort    { static readonly type = ActionsEventClusters.Sort;    constructor(public payload?: SortField) { } }
export class ActionEventClustersAdd     { static readonly type = ActionsEventClusters.Add;     constructor(public payload: Cluster) { } }
export class ActionEventClustersRemove  { static readonly type = ActionsEventClusters.Remove;  constructor(public payload: string) { } }
export class ActionEventClustersDelete  { static readonly type = ActionsEventClusters.Delete;  constructor() { } }
