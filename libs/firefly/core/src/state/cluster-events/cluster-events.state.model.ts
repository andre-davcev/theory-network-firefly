import { StateReferenceTableModel } from '@theory/ngxs';
import { Event, ClusterEvent } from '@firefly/core/models';

export interface StateClusterEventsModel extends StateReferenceTableModel<ClusterEvent, Event>
{

}
