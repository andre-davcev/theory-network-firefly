import { StateReferenceTableModel } from '@theory/ngxs';
import { User, ClusterSubscriber } from '@firefly/core/models';

export interface StateClusterSubscribersModel extends StateReferenceTableModel<ClusterSubscriber, User>
{

}
