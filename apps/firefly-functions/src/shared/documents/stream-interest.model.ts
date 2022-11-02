import { Interest } from './interest.model';
import { StreamInterestPartial, SubscriptionPartial } from '../../library/models';

export type StreamInterest = Interest & StreamInterestPartial & SubscriptionPartial;
