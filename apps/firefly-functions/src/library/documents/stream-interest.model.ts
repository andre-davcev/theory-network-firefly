import { Interest } from './interest.model';
import { StreamInterestPartial, SubscriptionPartial } from '../models';

export type StreamInterest = Interest & StreamInterestPartial & SubscriptionPartial;
