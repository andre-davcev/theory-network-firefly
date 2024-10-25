import { Subscription } from '@firefly/cloud';
import { StateChildModel } from '@theory/ngxs';

import { ListsFilter } from '../../composite';

export interface StateUserSubscriptionsModel
  extends StateChildModel<Subscription> {
  filter: ListsFilter;
}
