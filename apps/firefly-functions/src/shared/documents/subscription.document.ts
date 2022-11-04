import { Interest } from './interest.document';

export interface SubscriptionPartial
{
    on: boolean;
}

export type Subscription = Interest & SubscriptionPartial;
