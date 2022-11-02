import { Interest } from './interest.document';
import { SubscriptionPartial } from '../../library/models';

export type Subscription = Interest & SubscriptionPartial;
