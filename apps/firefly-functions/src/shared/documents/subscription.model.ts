import { Interest } from './interest.model';
import { SubscriptionPartial } from '../../library/models';

export type Subscription = Interest & SubscriptionPartial;
