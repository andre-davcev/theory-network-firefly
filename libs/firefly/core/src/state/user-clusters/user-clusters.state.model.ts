import { StateReferenceTableModel } from '@theory/ngxs';
import { Cluster, UserCluster } from '@firefly/core/models';

export interface StateUserClustersModel extends StateReferenceTableModel<UserCluster, Cluster>
{

}
