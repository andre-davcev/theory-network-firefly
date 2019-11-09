import { StateReferenceTableModel } from '@theory/ngxs';
import { Cluster, EventCluster } from '@firefly/core/models';

export interface StateEventClustersModel extends StateReferenceTableModel<EventCluster, Cluster>
{

}
