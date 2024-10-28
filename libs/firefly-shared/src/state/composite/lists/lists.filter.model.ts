import { SubscriptionPartial } from '@firefly/cloud';

import { TagList } from '../../../enums';

export interface ListsFilter {
  tag: TagList;
  virtual: boolean;
  subscriptions: Record<string, SubscriptionPartial>;
}
