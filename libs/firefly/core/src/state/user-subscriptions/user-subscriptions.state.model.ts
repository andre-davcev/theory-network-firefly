import { Cluster, UserSubscriptions } from '@firefly/core/models';

export interface StateUserSubscriptionsModel
{
    loaded : boolean;
    empty  : UserSubscriptions;
    data   : UserSubscriptions;
    onMap  : Record<string, Cluster>;
    offMap : Record<string, Cluster>;
}
