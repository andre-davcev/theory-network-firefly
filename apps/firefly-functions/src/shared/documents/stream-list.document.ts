import { List } from './list.document';
import { SubscriptionPartial } from './subscription.document';

export interface StreamListPartial {
  score: number;
}

export type StreamList = List & StreamListPartial & SubscriptionPartial;
