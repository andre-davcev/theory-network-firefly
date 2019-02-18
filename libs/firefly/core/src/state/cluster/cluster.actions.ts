import { Cluster } from '@firefly/core/models';
import { ActionsCluster } from './cluster.actions.enum';

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

    constructor() {}
}

export class ActionUpdateCluster
{
    static readonly type = ActionsCluster.UpdateCluster;

    constructor() {}
}