import { StateReferenceTableModel } from '@theory/state';
import { Event, ClusterEvent } from '@firefly/core/models';

export interface StateClusterEventsModel extends StateReferenceTableModel<ClusterEvent, Event>
{

}
