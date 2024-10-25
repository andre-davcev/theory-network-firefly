import { List } from '@firefly/cloud';
import { StateQueryModel } from '@theory/ngxs';

import { ListsFilter } from '../../composite/lists/lists.filter.model';

export interface StateUserListsModel extends StateQueryModel<List> {
  filter: ListsFilter;
}
