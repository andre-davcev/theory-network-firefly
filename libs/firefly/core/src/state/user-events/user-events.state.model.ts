import { Event, UserEvent } from '@firefly/core/models';
import { StateReferenceTableModel } from '@theory/state';

export interface StateUserEventsModel extends StateReferenceTableModel<Event, UserEvent>
{

}
