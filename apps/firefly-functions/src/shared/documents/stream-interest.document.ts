import { Interest } from './interest.document';
import { SubscriptionPartial } from './subscription.document';

export interface StreamInterestPartial {
  score: number;
}

export type StreamInterest = Interest &
  StreamInterestPartial &
  SubscriptionPartial;
