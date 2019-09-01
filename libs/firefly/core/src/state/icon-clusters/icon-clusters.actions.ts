import { SortField } from '@theory/state';
import { Cluster, IconCluster } from '@firefly/core/models';

import { ActionsIconClusters } from './icon-clusters.actions.enum';

export class ActionIconClustersReset     { static readonly type = ActionsIconClusters.Reset;     constructor() { } }
export class ActionIconClustersGetData   { static readonly type = ActionsIconClusters.GetData;   constructor() { } }
export class ActionIconClustersGet       { static readonly type = ActionsIconClusters.Get;       constructor() { } }
export class ActionIconClustersSet       { static readonly type = ActionsIconClusters.Set;       constructor(public payload: Record<string, IconCluster>) { } }
export class ActionIconClustersSort      { static readonly type = ActionsIconClusters.Sort;      constructor(public payload?: SortField) { } }
export class ActionIconClustersAdd       { static readonly type = ActionsIconClusters.Add;       constructor(public payload: Cluster) { } }
export class ActionIconClustersRemove    { static readonly type = ActionsIconClusters.Remove;    constructor(public payload: string) { } }
