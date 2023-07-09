import { StateChildModel } from '@theory/ngxs';
import { Alert } from '@firefly/cloud';

import { CalendarFilter } from '../../composite/calendar/calendar.filter.model';

export interface StateUserAlertsModel extends StateChildModel<Alert> {
  filter: CalendarFilter;
}
