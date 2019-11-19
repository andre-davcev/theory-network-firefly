import { StateQueryModel } from '@theory/ngxs';
import { Event } from '@firefly/core/models';
import { ServiceEvents } from '@firefly/core/services';

export interface StateUserEventsModel extends StateQueryModel<Event, ServiceEvents>
{

}
