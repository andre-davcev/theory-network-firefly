import { Interest } from './interest.document';
import { StreamInterestPartial, SubscriptionPartial } from '../../library/models';

export type StreamInterest = Interest & StreamInterestPartial & SubscriptionPartial;
