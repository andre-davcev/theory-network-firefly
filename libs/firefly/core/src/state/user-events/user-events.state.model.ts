import { StateReferenceTableModel } from '@theory/ngxs';
import { Event, UserEvent } from '@firefly/core/models';

export interface StateUserEventsModel extends StateReferenceTableModel<UserEvent, Event>
{

}
