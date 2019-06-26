import { Cluster } from '../cluster';
import { SubscriptionKey } from './subscription.model.key';

export interface Subscription extends Cluster
{
    [SubscriptionKey.On]: boolean;
}
