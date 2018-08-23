import { Cluster } from '../../models/cluster.model';

export enum ActionsCluster
{
    GetClusters  = '[Cluster] Get Clusters',
    SetClusterId = '[Cluster] Set Cluster Id',
    SetCluster   = '[Cluster] Set Cluster'
}

export class GetClusters
{
    static readonly type = ActionsCluster.GetClusters;

    constructor() {}
}

export class SetClusterId
{
    static readonly type = ActionsCluster.SetClusterId;

    constructor(public payload: string) {}
}

export class SetCluster
{
    static readonly type = ActionsCluster.SetCluster;

    constructor(public payload: Cluster) {}
}
