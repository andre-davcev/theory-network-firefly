import { Cluster } from '@firefly/core';

export enum ActionsCluster
{
    GetClusters  = '[Cluster] Get Clusters',
    SetClusterId = '[Cluster] Set Cluster Id',
    SetCluster   = '[Cluster] Set Cluster'
}

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
