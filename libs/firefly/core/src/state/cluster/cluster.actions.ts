import { ActionsCluster } from './cluster.actions.enum';
import { Cluster } from '@firefly/core/models';

export class ActionClusterWatch
{
    static readonly type = ActionsCluster.WatchCluster;

    constructor(public payload: Cluster) { }
}

export class ActionGetClusters
{
    static readonly type = ActionsCluster.GetClusters;

    constructor() {}
}

export class ActionClusterSetIcon
{
    static readonly type = ActionsCluster.SetIcon;

    constructor(public payload: string) { }
}

export class ActionClusterSetId
{
    static readonly type = ActionsCluster.SetClusterId;

    constructor(public payload: string) {}
}

export class ActionClusterSet
{
    static readonly type = ActionsCluster.SetCluster;

    constructor(public payload: Cluster) {}
}

export class ActionUpdateCluster
{
    static readonly type = ActionsCluster.UpdateCluster;

    constructor() {}
}

export class ActionClusterCreate
{
    static readonly type = ActionsCluster.CreateCluster;

    constructor() { }
}
