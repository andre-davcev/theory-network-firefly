import { SubscriptionPartial } from '@firefly/cloud';

import { ListType } from '../../../enums';

export interface ListsFilter {
  type: ListType;
  virtual: boolean;
  subscriptions: Record<string, SubscriptionPartial>;
}
