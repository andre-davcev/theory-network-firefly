import { List } from './list.document';

export interface SubscriptionPartial {
  on: boolean;
}

export type Subscription = List & SubscriptionPartial;
