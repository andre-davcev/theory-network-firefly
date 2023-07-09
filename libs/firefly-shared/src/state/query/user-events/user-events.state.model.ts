import { StateQueryModel } from '@theory/ngxs';
import { Event } from '@firefly/cloud';

import { CalendarFilter } from '../../composite/calendar/calendar.filter.model';

export interface StateUserEventsModel extends StateQueryModel<Event> {
  filter: CalendarFilter;
}
