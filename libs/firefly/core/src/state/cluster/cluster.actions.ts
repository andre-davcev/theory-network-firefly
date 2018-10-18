import { Cluster, ActionsCluster } from '@firefly/core';

export class ActionGetClusters
{
    static readonly type = ActionsCluster.GetClusters;

    constructor() {}
}

export class ActionSetClusterId
{
    static readonly type = ActionsCluster.SetClusterId;

    constructor(public payload: string) {}
}

export class ActionSetCluster
{
    static readonly type = ActionsCluster.SetCluster;

    constructor(public payload: Cluster) {}
}
