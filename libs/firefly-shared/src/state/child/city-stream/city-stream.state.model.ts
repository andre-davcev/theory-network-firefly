import { StateChildModel } from '@theory/ngxs';

import { StreamList } from '@firefly/cloud';

import { ListsFilter } from '../../composite';

export interface StateCityStreamModel extends StateChildModel<StreamList> {
  filter: ListsFilter;

  subscriptionsNew: Record<string, string>;
  subscriptionsSet: boolean;
  cityStreamSet: boolean;
}
