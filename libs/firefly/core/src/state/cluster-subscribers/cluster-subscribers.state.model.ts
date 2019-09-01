import { StateReferenceTableModel } from '@theory/state';
import { User, ClusterSubscriber } from '@firefly/core/models';

export interface StateClusterSubscribersModel extends StateReferenceTableModel<ClusterSubscriber, User>
{

}
