import { Cluster } from './cluster.model';
import { SubscriptionKey } from './subscription/subscription.model.key';

export interface Subscription extends Cluster
{
    [SubscriptionKey.On]: boolean;
}
