import { StateReferenceTableModel } from '@theory/state';
import { Event, UserEvent } from '@firefly/core/models';

export interface StateUserEventsModel extends StateReferenceTableModel<UserEvent, Event>
{

}
