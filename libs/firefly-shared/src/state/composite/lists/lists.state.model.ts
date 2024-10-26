import { Tag } from '@theory/ionic';

import { TagList } from '../../../enums';
import { ListsFilter } from './lists.filter.model';

export interface StateListsModel {
  filter: ListsFilter;
  tag: Tag<TagList> | null;
}
