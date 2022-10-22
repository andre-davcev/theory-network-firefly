import { Interest } from './interest.model';
import { SubscriptionPartial } from '../models';

export type Subscription = Interest & SubscriptionPartial;
